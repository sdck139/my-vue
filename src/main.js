const Observe = require('./observe')
const Compile = require('./complile')
window.Vue = function(option) {
  this.data = option.data
  Observe(this.data)
  new Compile(option.$el, this.data)
}

