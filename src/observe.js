/*
*
* 为data内数据设置set和get钩子，并执行相应方法进行数据绑定
*
*/

const Dep = require('./watcher').Dep
const _ = require('./util')

const observe = function(data) {
  if (!_.isObject(data)) return
  Object.keys(data).forEach(function(key) {
    define(data, key, data[key])
  })
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
