var buffgap = require('buffgap')
var events = require('events')
var util = require('util')

var SMCUP = Buffer.from([0x1b, 0x5b, 0x3f, 0x31, 0x30, 0x34, 0x39, 0x68])
var RMCUP = Buffer.from([0x1b, 0x5b, 0x3f, 0x31, 0x30, 0x34, 0x39, 0x6c])
var CLEAR = Buffer.from([0x1b, 0x5b, 0x33, 0x4a, 0x1b, 0x5b, 0x48, 0x1b, 0x5b, 0x32, 0x4a])

module.exports = Clientful

function Clientful (opts) {
  if (!(this instanceof Clientful)) return new Clientful(opts)
  if (!opts) opts = {}
  if (typeof opts === 'function') opts = {render: opts}

  events.EventEmitter.call(this)

  this.destroyed = false
  this.fullscreen = !!opts.fullscreen
  this.out = process.stdout
  this.out.on('resize', this._onresize.bind(this))
  this.buffgap = buffgap(this._dimension())

  this._destroy = this.destroy.bind(this)
  this._isFullscreen = false

  process.on('SIGWINCH', noop)
  process.on('exit', this._destroy)

  if (opts.render) this.render(opts.render)
}

util.inherits(Clientful, events.EventEmitter)

Object.defineProperty(Clientful.prototype, 'height', {
  enumerable: true,
  get: function () {
    return this.buffgap.height
  }
})

Object.defineProperty(Clientful.prototype, 'width', {
  enumerable: true,
  get: function () {
    return this.buffgap.width
  }
})

Clientful.prototype.render = function (fn) {
  if (this.fullscreen && !this._isFullscreen) {
    this._isFullscreen = true
    this.out.write(SMCUP)
    this.out.write(CLEAR)
  }
  if (fn) this._render = fn
  this.emit('render')
  this.out.write(this.buffgap.update(this._render()))
}

Clientful.prototype.destroy = function () {
  if (this.destroyed) return
  this.destroyed = true
  process.removeListener('SIGWINCH', noop)
  process.removeListener('exit', this._destroy)
  if (this._isFullscreen) this.out.write(RMCUP)
  this.emit('destroy')
}

Clientful.prototype._onresize = function () {
  this.buffgap.resize(this._dimension())
  this.emit('resize')
  this.render()
}

Clientful.prototype._dimension = function () {
  return {
    width: this.out.columns,
    height: this.out.rows
  }
}

function noop () {
  return ''
}
