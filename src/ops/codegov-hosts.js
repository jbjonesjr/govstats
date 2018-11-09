let CodeGov = require('../utils/codegov')

let rawbins = {}
let sortable = []
let githubbins = []
let githubiobins = []
let govbins = []
let badbins = []
let nasabins = []
let projects = {}

module.exports = {
  init: async function (projectsinput) {
    projects = projectsinput || await CodeGov.listAll()

    projects.repos.forEach(repo => {
      if (repo.sourceHost.indexOf('nasa.gov') !== -1) {
        nasabins.push(repo)
      } else if (repo.sourceHost.indexOf('.gov') !== -1) {
        govbins.push(repo)
      } else if (repo.sourceHost === '') {
        badbins.push(repo)
      } else if (repo.sourceHost.indexOf('github.com') !== -1) {
        githubbins.push(repo)
      } else if (repo.sourceHost.indexOf('github.com') !== -1) {
        githubiobins.push(repo)
      } else {
        let host = repo.sourceHost
        if (repo.sourceHost.indexOf('mathworks.com') !== -1) {
          host = 'mathworks.com'
        }
        if (rawbins.hasOwnProperty(host)) {
          rawbins[host].push(repo.sourceTuple)
        } else {
          rawbins[host] = [repo.sourceTuple]
        }
      }
    })

    for (var key in rawbins) {
      sortable.push([key, rawbins[key].length])
    }
    sortable.push(['other .gov hosted (dot.gov, etc)', govbins.length])
    sortable.push(['github', githubbins.length])
    sortable.push(['github.io', githubiobins.length])
    sortable.push(['*.nasa.gov', nasabins.length])

    sortable.sort(function (a, b) {
      return b[1] - a[1]
    })
  },

  printResults: function () {
    const totes = projects.repos.length
    const valid = projects.repos.length - badbins.length
    console.log(`Total code.gov projects: ${totes}`)
    console.log(`Publicly accessible code.gov projects: ${valid}`)
    console.log('---------------- Hosted on --------------------------')
    sortable.forEach(key => {
      console.log(`| ${key[0].padEnd(36)} - ${(key[1] + '').padEnd(5)} ${(Math.floor((key[1] / valid) * 100, 3) + '%').padEnd(4)} | `)
    })
    console.log('-----------------------------------------------------\n')
  }
}
