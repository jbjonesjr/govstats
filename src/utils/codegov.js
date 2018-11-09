let urlutils = require('./urls')
const CodeGovAPIClient = require('@code.gov/api-client').CodeGovAPIClient
require('dotenv').config({ debug: false })
let readlineutils = require('../utils/fsextended')

let exclusionFile = 'data/main-exclusion-orgs.list'
let excludedOrgs = []
let codegovclient

let _fetch = function () {
  // should this be await??
  let projs = codegovclient.listAll(6000)
  return projs
}

module.exports = {
  init: async function () {
    codegovclient = new CodeGovAPIClient({
      debug: true,
      base: 'https://api.code.gov/',
      api_key: process.env.api_key || 'DEMO_KEY'
    })

    excludedOrgs = await readlineutils.readlineToArray(exclusionFile)
  },
  listAll_raw: async function () {
    let allprojs = await _fetch()
    return allprojs
  },
  listAll: async function () {
    let allprojs = await this.listAll_raw()
    allprojs.repos.forEach((project, idx, arr) => {
      let parseResult = urlutils.generateMapEntry(project.repositoryURL)
      project.sourceHost = parseResult.key.toLowerCase()
      project.sourceTuple = parseResult.value.toLowerCase()
      arr[idx] = project
    })
    return allprojs
  },
  persistence: {
    storeGitHubOrgs: function (projects) {
      let uOrg = {}
      let touched = []
      projects.repos.forEach(project => {
        if (project.sourceHost.indexOf('github') !== -1) {
          let orgname = project.sourceTuple.split('/')[0]
          if (this.isOrgValid(orgname)) {
            if (uOrg.hasOwnProperty(orgname)) {
              uOrg[orgname].add(project.sourceTuple.split('/')[1])
            } else {
              uOrg[orgname] = new Set()
              uOrg[orgname].add(project.sourceTuple.split('/')[1])
            }
          } else {
            if (!touched.includes(orgname)) {
              // console.log(`${orgname} isn't valid anymore?!`)
              touched.push(orgname)
            }
          }
        }
      })
      console.log(`${touched.length} orgs excluded`)
      console.log(touched)
      console.log(`${Object.keys(uOrg).length} orgs included`)
      let repoCount = 0
      Object.keys(uOrg).forEach(key => {
        repoCount += uOrg[key].length
      })
      console.log(`${repoCount} repos included`)
      return uOrg
    },
    organizeByOrg: async function (projects) {
      return this.storeGitHubOrgs(projects)
    },
    isOrgValid: function (orgName) {
      return !excludedOrgs.includes(orgName)
    }
  }
}
