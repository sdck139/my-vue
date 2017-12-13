const Compile = require('./complile')
const Methods = require('./methods')
const _ = require('./util') 
// const _ = require('lodash')
const Vue = function(option) {
  this._init(option)
  for (key in option.data) {
    this[key] = option.data[key]
  }
  Observe(this)
  this.$data = option.data
  this.$methods = option.methods
  new Compile(option.$el, this)
}

window.Vue = Vue