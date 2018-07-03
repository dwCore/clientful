var clientful = require('../')({fullscreen: true})
var entry = require('../entry')()
var fs = require('fs')

var src = fs.readFileSync(__filename, 'utf-8')
var tmp = src
var upper = false

clientful.render(function () {
  return tmp
})

entry.on('enter', function () {
  upper = !upper
  tmp = upper ? src.toUpperCase() : src
  clientful.render()
})
