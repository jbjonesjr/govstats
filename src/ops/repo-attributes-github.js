const gql = require('../queries/' + process.env.query + '-graphql')
const Counter = require('../utils/counter')
const GitHub = require('../utils/github')
let fs = require('fs')

/* @TODO:
 * use external counter/leaderboard tooling instead of my counter lib???
 * https://github.com/eschan/scoreboard
 * https://www.npmjs.com/package/node-leaderboard
 * https://redis.io/
 */

let totalCount = 0
let missingCount = 0
let results = []
let badresults = {}
let counters = []
let github = null
let exclusionFile = 'data/exclused-orgs.list'

let init = async function (github_pat) {
  github = await GitHub.getClient(github_pat)

  gql.fields.forEach(field => {
    counters[field] = new Counter(field)
  })

  fs.unlink(exclusionFile, (err) => {
    if (err && err.errno !== -2) {
      console.log(err)
    }
    console.log(`successfully deleted ${exclusionFile}`)
  })
}

let updateData = function (currentResults, newResults) {
  if (process.env.debug === true) {
    console.log(`${new Date()} --  updateData ${newResults.repositoryOwner.name}(${newResults.repositoryOwner.repositories.length})`)
  }

  if (!newResults ||
  currentResults.repositoryOwner.repositories.edges[0].node.nameWithOwner === newResults.repositoryOwner.repositories.edges[0].node.nameWithOwner) {
    console.log('These are error conditions')
    console.log('not sure what if anything could cause them?')
    console.log('XXXXXXX LOOK FOR THIS. err 314')
    return currentResults
  }

  const newRepos = newResults.repositoryOwner.repositories.edges
  const previousRepos = currentResults.repositoryOwner.repositories.edges
  let fullResult = currentResults

  if (process.env.debug === true) {
    console.debug('prev first repo: ', previousRepos[0].node.nameWithOwner)
    console.debug('new result first repo: ', newRepos[0].node.nameWithOwner)
    console.log(`Update starting: Current store size: ${previousRepos.length}, adding:  ${newRepos.length}`)
  }

  fullResult = {
    ...currentResults,
    repositoryOwner: {
      ...currentResults.repositoryOwner,
      repositories: {
        ...currentResults.repositoryOwner.repositories,
        edges: [...previousRepos, ...newRepos]
      }
    }
  }

  return fullResult
}

let processRepo = function (repoName, repoNode) {
  gql.fields.forEach(field => {
    let processor = gql.processors[field]

    if (repoNode.isFork && field === 'contributors') {
      // no op console.log(repoName, repoNode.isFork)
    } else {
      if (!processor.includes('.')) {
        counters[field].updateValue(repoName, repoNode[processor])
      } else {
        counters[field].updateValue(repoName, repoNode[processor.split('.')[0]][processor.split('.')[1]])
      }
    }
  })
}

let printResults = function () {
  console.log(`---------------- Bad Repos -------------------------`)
  // console.log(badresults)
  console.log('---------------------------------------------------\n')
  gql.fields.forEach(field => {
    console.log(`---------------- ${field} -------------------------`)
    console.log(`${counters[field].printValues()}`)
    console.log('---------------------------------------------------\n')
    console.log('\n\n\n')
    console.log(`${counters[field].printMarkdownTable()}`)
  })
  console.log(`total parsed: ${totalCount}`)
  console.log(`overall, ${missingCount} repos/projects no longer exist on GitHub (or are private)`)
  console.log('two projects that use the same repo are only counted once')
}

let loadAttributes = function (organizedOrgs) {
  if (process.env.debug === true) {
    console.debug(`${new Date()} -- loadAttributes`)
  }
  console.log(`Valid GitHub orgs:\n${Object.keys(organizedOrgs)}`)
  let loads = Object.keys(organizedOrgs).map(org => loadAttributesForOrg(org, null, 66,  organizedOrgs[org]))

  Promise.all(loads).then((res, rej) => {
    console.debug(`${new Date()} -- promise complete`)
    printResults()
  })
}

let loadAttributesForOrg = function (orgName, startCursor, size, validreponames) {
  if (process.env.debug === true) {
    console.log(`${new Date()} -- loadAttributesForOrg(${orgName}, ${startCursor}, [reponames])`)
  }

  return new Promise((resolve, reject) => {
    let hdr = {}
    hdr[process.env.headername] = process.env.headervalue
    github.query(gql.query, {
      org: orgName,
      cursor: startCursor,
      size: size
    }, Object.assign(gql.headers, hdr)).then(function (res) {
      if (process.env.debug === true) {
        console.debug(`${new Date()} -- loadAttributesForOrg::github.query/callback`)
      }

      if (!(orgName in results)) {
        results[orgName] = res
      } else {
        results[orgName] = updateData(results[orgName], res)
      }

      // Helper logic
      let repos = res.repositoryOwner.repositories
      const loadComplete = (repos.totalCount === results[orgName].repositoryOwner.repositories.edges.length)

      console.log(`Processing complete: ${loadComplete ? 'Load complete' : 'Not enough counted so far'} for ${orgName}: ${results[orgName].repositoryOwner.repositories.edges.length} out of ${repos.totalCount}`)
      if (!loadComplete) {
        loadAttributesForOrg(orgName, repos.edges[repos.edges.length - 1].cursor, 50,  validreponames).then((res) => {
          resolve(orgName)
        })
      } else {
        let orgCount = 0
        let remainingrepos = new Set(validreponames)
        results[orgName].repositoryOwner.repositories.edges.forEach(itm => {
          let reponame = itm.node.nameWithOwner.split('/')[1]
          if (validreponames.has(reponame.toLowerCase())) {
            processRepo(itm.node.nameWithOwner, itm.node)
            totalCount++
            orgCount++
            remainingrepos.delete(reponame)
          } else {
            if (badresults.hasOwnProperty(orgName)) {
              badresults[orgName].push(reponame)
            } else {
              badresults[orgName] = [reponame]
            }
          }
        })
        let localmiss = Array.from(validreponames).length - orgCount
        missingCount += localmiss

        if (localmiss > 0) {
          console.log(`${orgName} is short ${localmiss} repos`)
          if (localmiss > 5) {
            console.log(`${orgName} was missing the following repos: `, remainingrepos)
          }
        }
        resolve(orgName)
      }
    }).catch((error) => {
      console.log(`Error received during ${orgName} fetch, ${error}`)

      fs.open(exclusionFile, 'a', function (err, fd) {
        if (err) {
          return console.log('error opening file: ', err)
        }

        fs.appendFile(fd, orgName + '\n', function (err) {
          if (err) {
            return console.log('error when writing to file', err)
          }
        })
      })
    })
  })
}

module.exports = {
  init,
  loadAttributes,
  printResults
}
