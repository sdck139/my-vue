const Observe = require('./observe')
const Compile = require('./complile')
const Methods = require('./methods')
const _ = require('lodash')
const Vue = function(option) {
  // this = option.data
  // this = _.assign(this, option.data)
  for (key in option.data) {
    this[key] = option.data[key]
  }
  console.log(this)
  console.log(typeof this)
  Observe(this)
  this.$data = option.data
  // Methods(option.methods)
  this.$methods = option.methods
  new Compile(option.$el, this)
}

window.Vue = Vue