const Observe = function(data) {
  if (!isObject(data)) return
  Object.keys(data).forEach(function(key) {
    define(data, key, data[key])
  })
}

function isObject(data) {
  return data !== null && typeof data == 'object'
}

function define(data, key, val) {
  Observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val
    },
    set: function(newVal) {
      alert('变化：' + val + '->' + newVal)
      val = newVal
    }
  })
}