module.exports = cut

function cut (s) {
  if (!/^\r?\n/.test(s)) return s
  return deIndent(s).trim()
}

function deIndent (s) {
  if (!/^\r?\n/.test(s)) return s
  var indent = (s.match(/\n([ ]+)/m) || [])[1] || ''
  s = indent + s
  return s.split('\n')
    .map(l => replace(indent, l))
    .join('\n')
}

function replace (prefix, line) {
  return line.slice(0, prefix.length) === prefix ? line.slice(prefix.length) : line
}
