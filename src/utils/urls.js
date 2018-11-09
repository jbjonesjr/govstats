const mainregex = /(github\.com|gitlab\.com|bitbucket\.org|sourceforge\.net|drupal\.org\/project)\/?(.*)/

const githubioregex = /\/\/(.*).github.io\/(.*)/

const nasaregex = /(software\.nasa\.gov\/software|ti\.arc\.nasa\.gov\/opensource\/projects|opensource\.gsfc\.nasa\.gov\/projects)\/?(.*)/

const acquiaregex = /http[s]?:\/\/.*\.(acquia\.com)\/(.*)\/trunk\/docroot\/sites\/all\/modules\/(.*)/

const govregex = /[http[s]?:\/\/]?(.*\.gov)\/?(.*)/

const restregex = /[http[s]?:\/\/]?(.*\.(com|org|net|edu))\/?(.*)/

let generateMapEntry = function (url) {
  if (!url || url === 'null') {
    return { key: '', value: '' }
  }

  let res = mainregex.exec(url, 'i')
  if (res) {
    return { key: res[1], value: stripdotgit(res[2]) }
  } else {
    res = githubioregex.exec(url, 'i')
    if (res) {
      return { key: `github.io`, value: `${stripdotgit(res[1])}/${res[2]}` }
    } else {
      res = nasaregex.exec(url, 'i')
      if (res) {
        return { key: res[1], value: stripdotgit(res[2]) }
      } else {
        res = govregex.exec(url, 'i')
        if (res) {
          return { key: res[1], value: stripdotgit(res[2]) }
        } else {
          res = acquiaregex.exec(url, 'i')
          if (res) {
            return { key: res[1], value: stripdotgit(res[2]) }
          } else {
            res = restregex.exec(url, 'i')
            if (res) {
              return { key: res[1], value: stripdotgit(res[3]) }
            } else {
              let url_split = url.split('/')
              if (url_split.length !== 1)
                return { key: url_split[1], value: url.substr(url.indexOf(url_split[1]) + url_split[1].length + 1) }
              else
                return { key: url, value: url }
            }
          }
        }
      }
    }
  }
}

let stripdotgit = function (url) {
  if (url) {
    return url.replace('.git', '')
  } else {
    return url
  }
}

module.exports = {
  generateMapEntry: generateMapEntry
}
