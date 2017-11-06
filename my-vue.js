const Vue = function(obj) {
  this.data = obj.data
  Observe(this.data)
}

