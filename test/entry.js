const Vue = require('../src/main')

const vm = new Vue({
  data: {
    message: 'hello'
  }
})
console.log(vm.data)
const test = function () {
  vm.data.message = 'no'
  console.log(vm.data)
}

window.test = test