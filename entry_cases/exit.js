var clientful = require('../')()
var cut = require('../cut')

var text = 'lowercase'

process.once('SIGINT', function () {
  text = 'UPPERCASE'
  clientful.render(render)
  process.nextTick(process.exit)
})

clientful.render(render)

setInterval(() => clientful.render(), 1000)

function render () {
  return cut(`
    Greetings martian.
    Error should happen on last line:
    ${text}
  `)
}
