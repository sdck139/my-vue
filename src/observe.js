const Dep = require('./watcher').Dep

const observe = function(data) {
  if (!isObject(data)) return
  Object.keys(data).forEach(function(key) {
    define(data, key, data[key])
  })
}

function isObject(data) {
  return data !== null && typeof data == 'object'
}

function define(data, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      if (Dep.target) dep.addSub(Dep.target)
      return val
    },
    set: function(newVal) {
      val = newVal
      dep.notify()
    }
  })
}

module.exports = observe
