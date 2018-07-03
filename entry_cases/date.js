var clientful = require('../')()
var cut = require('../cut')

clientful.render(function () {
  return cut(`
    Greetings martian. The time is:
      ${new Date()}
    Enjoy the ecosystem.
  `)
})

setInterval(() => clientful.render(), 1000)
