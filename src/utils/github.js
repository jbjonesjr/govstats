const probot = require('probot')


/*
Would be nice if octokit.request could read the rate limit response and throttle accordingly
https://github.com/GSA/code-gov-integrations/blob/master/libs/github/utils.js
*/

async function getClient (pat) {
  let pr = probot.createProbot({ githubToken: pat })
  const app = pr.load(() => {})
  let github = await app.auth({ secret: 'foo' })
  return github
}

function parseRateLimit (ghResponse) {
  return {
    limit: ghResponse['x-ratelimit-limit'],
    remaining: ghResponse['x-ratelimit-remaining'],
    reset: ghResponse['x-ratelimit-reset']
  }
}

async function handleRateLimit (rateLimit) {
  const remaining = rateLimit.remaining
  const limit = rateLimit.limit
  const reset = rateLimit.reset
  const now = new Date().getMilliseconds()
  const waitTime = now - reset
  console.log('!!!!! wait time remaining:', new Date(reset * 1000))
  const percentRemaining = remaining / limit

  return percentRemaining <= 0.15
    ? new Promise((resolve) => setTimeout(async () => resolve(await getRateLimit()), waitTime))
    : rateLimit
}

async function getRateLimit (github) {
  const response = await github.misc.getRateLimit()
  console.log('response from getRateLimt', response)

  return response.data.resources.core
}

module.exports = {
  parseRateLimit,
  handleRateLimit,
  getRateLimit,
  getClient
}
