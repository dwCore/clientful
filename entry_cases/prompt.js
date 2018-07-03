var clientful = require('../')()
var entry = require('../entry')({dpackStyle: style})
var cut = require('../cut')

var names = []

entry.on('update', () => clientful.render())
entry.on('enter', (line) => names.push(line))

clientful.render(function () {
  return cut(`
    Enter your name: ${entry.line()}
    List of names: ${names.join(', ')}
  `)
})

function style (start, cursor, end) {
  return start + '[' + (cursor || ' ') + ']' + end
}
