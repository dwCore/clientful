var clientful = require('../')()
var cut = require('../cut')

clientful.render(function () {
  return cut(`
    Greetings martian. The time is:
      ${nestedDate()}
    THERE SHOULD BE NO SPACE ABOVE THIS LINE
    That is all for now
  `)
})

setInterval(() => clientful.render(), 1000)

function nestedDate () {
  return cut(`
    ${new Date()}
  `)
}
