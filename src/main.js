const Observe = require('./observe')
const Compile = require('./complile')
const Methods = require('./methods')
window.Vue = function(option) {
  this.$data = option.data
  Observe(this.$data)
  new Compile(option.$el, this.$data)
  Methods(option.methods)
}

