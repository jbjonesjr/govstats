const gql = require('../queries/internal-dependents-graphql')
const Counter = require('../utils/counter')
const GitHub = require('../utils/github')

/* @TODO:
 * use external counter/leaderboard tooling instead of my counter lib???
 * https://github.com/eschan/scoreboard
 * https://www.npmjs.com/package/node-leaderboard
 * https://redis.io/
 */

let results = []
let counters = []
let github = null

let init = async function (github_pat) {
  github = await GitHub.getClient(github_pat)

  for (let field in gql.fields) {
    counters[field] = new Counter(field)
  }
}

let processRepo = function (repoName, repoNode) {
  for (let field in gql.processors) {
    counters[field].updateValue(repoName, repoNode[gql.processors[field]])
  }
}

let printResults = function () {
  for (let field in gql.fields) {
    console.log('## {field}:\n {counters[field].printValues()} \n\n')
  }
}

let loadDependents = function (organizedOrgs) {
  if (process.env.debug) {
    console.log(`${new Date()} -- loadDependents( Set[])`)
  }
  console.log(`Valid GitHub orgs:\n${Object.keys(organizedOrgs)}`)
  let loads = Object.keys(organizedOrgs).map(org => {
    organizedOrgs[org].forEach(repo => {
      loadDependentsForRepo(org, repo)
    })
  })

  Promise.all(loads).then((res, rej) => {
    console.debug(`${new Date()} -- promise complete`)
  //  printResults()
  })
}

// Returns promise that loads the data
let loadDependentsForRepo = function (orgName, repoName) {
  if (process.env.debug === true) {
    console.log(`${new Date()} -- loadDependentsForRepo(${orgName}, ${repoName})`)
  }
  return new Promise((resolve, reject) => {
    let hdr = {}
    hdr[process.env.headername] = process.env.headervalue
    github.query(gql.query, {
      owner: orgName,
      repo: repoName
    }, Object.assign(gql.headers, hdr)).then(function (res) {
      if (process.env.debug) {
        console.debug(`${new Date()} -- loadDependentsForRepo::github.query/callback`)
      }

      let manifests = res.repository.dependencyGraphManifests
      let dependents = res.repository.dependencyGraphPackages
      // console.log(manifests)
      console.log(dependents)
      /*    if (!(orgName in results)) {
        results[orgName] = res
      } else {
        results[orgName] = updateData(results[orgName], res)
      }

      // Helper logic
      let repos = res.organization.repositories
      const loadComplete = (repos.totalCount === results[orgName].organization.repositories.edges.length)

      console.log(`Processing complete: ${loadComplete ? 'Load complete' : 'Not enough counted so far'} for ${orgName}: ${results[orgName].organization.repositories.edges.length} out of ${repos.totalCount}`)
      if (!loadComplete) {
        loadAttributesForOrg(orgName, repos.edges[repos.edges.length - 1].cursor)
      } else {
        repos.edges.forEach(itm => {
          processRepo(itm.node.nameWithOwner, itm.node)
          resolve('sucess!')
        })
      } */
    }).catch(error => {
      console.log(`error ${orgName}, ${repoName}`)
      console.log(error)
    })
  })
}

module.exports = {
  init,
  loadDependents,
  printResults
}
