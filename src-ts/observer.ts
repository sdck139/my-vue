/*
*
* 为data内数据设置set和get钩子，并执行相应方法进行数据绑定
*
*/

import { Dep } from './dep'
import { compileNameAndData } from './utils'
import * as _ from 'lodash'

export class Observe {
  _vue
  constructor(vm) {
    this._vue = vm
    this._init(this._vue)
  }
  _init(data) {
    const self = this
    if (!_.isObject(data)) return
    Object.keys(data).forEach(function(key) {
      self.define(data, key, data[key])
    })
  }
  define(data, key, val) {
    this._init(val)
    const self = this
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
        self._vue._watchOb.searchAndRun(data, key)
      }
    })
  }
}