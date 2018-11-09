module.exports = {
  query: `query fetchOrgRepos($org: String!, $size: String!, $cursor: String){
      repositoryOwner(login: $org) {
      ... on User {
        name
        repositories(first: $size, after: $cursor) {
          totalCount
          edges {
            cursor
            node {
              nameWithOwner
              isFork
              stargazers {
                stargazerCount: totalCount
              }
              forkCount
              watchers {
                watchCount: totalCount
              }
            }
          }
        }
      }
      ... on Organization {
        name
        repositories(first: $size, after: $cursor) {
          totalCount
          edges {
            cursor
            node {
              nameWithOwner
              isFork
              stargazers {
                stargazerCount: totalCount
              }
              forkCount
              watchers {
                watchCount: totalCount
              }
            }
          }
        }
      }
    }
  }`,
  headers: {},
  fields: ['stars', 'forks', 'watchers', 'contributors', 'dependents', 'commits'],
  processors: { 'stars': 'stargazers.stargazerCount', 'forks': 'forkCount', 'watchers': 'watchers.watchCount', 'contributors': '', 'commits': '', 'dependents': ''
  }
}
