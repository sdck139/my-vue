const _ = require('./util')
const Observe = require('./observe')

exports._init = function(option) {
  this._data = {}
  this._methods = {}

  this._data = options.data || {}

  this._initScope()
}

exports._initScope() = function() {
  this._initData()
}

exports._initData() = function() {
  Observe(this)
}

exports._proxy = function(key) {
  const self = this
  Object.defineProperty(self, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return self._data[key]
    },
    set: function(newVal) {
      self._data[key] = newVal
    }
  })
}
