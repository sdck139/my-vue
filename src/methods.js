const Methods = function(methods) {
  Object.keys(methods).forEach((key) => {
    window[key] = methods[key]
  })
}

module.exports = Methods

