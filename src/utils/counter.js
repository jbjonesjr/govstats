require('dotenv').config()

let counter_debug = false || process.env.counter_debug

let localStorage
if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./scratch')
}

module.exports = function (type) {
  this.type = type
  this.getValues = function () {
    if (typeof (localStorage) !== 'undefined') {
      var vals = false
      if (localStorage[this.type]) {
        vals = JSON.parse(localStorage[this.type])
        vals = vals.sort(function (a, b) { return parseInt(b) - parseInt(a) })
        return vals
      }
    } else {
      return null
    }
  }

  this.printValues = function () {
    if (typeof (localStorage) !== 'undefined') {
      var vals = false
      if (localStorage[this.type]) {
        vals = JSON.parse(localStorage[this.type])
        vals = vals.sort(function (a, b) { return parseInt(b) - parseInt(a) })
        let returnString = false
        vals.forEach((itm, idx) => {
          if (itm != null) {
            if (!returnString) {
              returnString = []
            }
            returnString.push(`| ${(idx + 1 + '').padEnd(2)}. ${itm.name.padEnd(35)} : ${(itm.val + '').padEnd(5)} |`)
          }
        })
        return returnString.join('\n')
      }
    } else {
      return null
    }
  }

  this.printMarkdownTable = function () {
    if (typeof (localStorage) !== 'undefined') {
      var vals = false
      if (localStorage[this.type]) {
        vals = JSON.parse(localStorage[this.type])
        vals = vals.sort(function (a, b) { return parseInt(b) - parseInt(a) })
        let returnString = false
        vals.forEach((itm, idx) => {
          if (itm != null) {
            if (!returnString) {
              returnString = []
            }
            returnString.push(`| ${(idx + 1 + '').padEnd(2)} | ${itm.name.padEnd(35)} | ${(itm.val + '').padEnd(5)} |`)
          }
        })
        return returnString.join('\n')
      }
    } else {
      return null
    }
  }

  this.updateValue = function (name, current) {
    if (current === undefined) {
      return
    }
    if (typeof (localStorage) !== 'undefined') {
      if (localStorage[this.type]) {
        let vals = JSON.parse(localStorage[this.type])
        vals = vals.sort(function (a, b) {
          if (a == null) {
            return 1
          } else if (b == null) {
            return -1
          } else {
            return parseInt(b.val) - parseInt(a.val)
          }
        })
        // sort first so you know that as soon as you get a >>, you can shift right
        for (var i = 0; i < 10 && i < vals.length; i++) {
          let val
          if (vals[i] == null) {
            val = 0
          } else {
            val = parseInt(vals[i].val)
          }
          if (current > val) {
            val = current
            vals.splice(i, 0, { name: name, val: current })
            vals.length = 10
            break
          }
        }

        if (JSON.stringify(vals) !== localStorage[this.type]) {
          this.addValue({ name: name, val: current }, vals)
        }
      } else {
        this.addValue({ name: name, val: current })
      }
    }
  }
  this.addValue = function (obj, full) {
    if (counter_debug === true) {
      console.log('adding ', obj, ' to ', type)
    }
    if (!full) {
      full = [obj]
      full.length = 10
    }
    localStorage[this.type] = JSON.stringify(full)
  }
}
