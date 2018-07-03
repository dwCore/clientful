var cut = require('./cut')
var os = require('os')

module.exports = cutAndNewline

function cutAndNewline (s) {
  return cut(s) + os.EOL
}
