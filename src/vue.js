const Compile = require('./complile')
const Methods = require('./methods')
const _ = require('./util') 
// const _ = require('lodash')
const Vue = function(option) {
  this._init(option)
  Observe(this)
  new Compile(option.$el, this)
}

window.Vue = Vue