const fs = require('fs')
const readline = require('readline')

module.exports = {

  readlineToArray: function(filename) {
    let data = []
    return new Promise((resolve, reject) => {

      let inputStream = fs.createReadStream(filename, (err) => {
        if (err) {
          console.err('error opening stream for excluded orgs', err)
        }
      })
      const rl = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity
      })

      rl.on('line', (line) => {
        data.push(line)
      }).on('close', () => {
        resolve(data)
      })
    })
  }
}
