let CodeGov = require('./src/utils/codegov')
let RepoAttributes = require('./src/ops/repo-attributes-github')
let CodeGovStats = require('./src/ops/codegov-hosts')

let main = async function () {
  await CodeGov.init()

  const projects = await CodeGov.listAll()
  const orgs = await CodeGov.persistence.organizeByOrg(projects)
  await CodeGovStats.init(projects)
  CodeGovStats.printResults()

  await RepoAttributes.init(process.env.PAT)
  RepoAttributes.loadAttributes(orgs)
}

main()
