const Observe = require('./observe')
const Compile = require('./complile')
const Methods = require('./methods')
const _ = require('lodash')
const Vue = function(option) {
  // this = option.data
  // this = _.assign(this, option.data)
  console.log(this)
  this.$data = option.data
  for (key in this.$data) {
    this[key] = this.$data[key]
  }
  Observe(this)
  // Methods(option.methods)
  this.$methods = option.methods
  new Compile(option.$el, this)
}

window.Vue = Vue