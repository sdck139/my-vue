const Watcher = require('./watcher').Watcher

function Compiler(el, data) {
  this.$data = data
  this.init(el)
}

Compiler.prototype = {
  init: function(el) {
    const $el = this.isElementNode(el) ? el : document.querySelector(el)
    const dom = this.node2Fragment($el, this.$data)
    $el.appendChild(dom)
  },
  node2Fragment: function(el) {
      const fragment = document.createDocumentFragment()
      let child
      // 将原生节点拷贝到fragment
      while (child = el.firstChild) {
          this.compile(child, this.$data)
          fragment.appendChild(child)
      }
      return fragment
  },
  isElementNode: function(el) {
    return typeof el !== 'string'
  },
  compile: function(el) {
    //节点类型为元素
    if (el.nodeType === 1) {
      this.compileElement(el)
    } else if (el.nodeType === 3) {
      this.compileText(el)
    }
  },
  compileElement: function(el) {
    this.init(el)
    const self = this
    const attrs = el.attributes
    for (i in attrs) {
        this.compileUtils(el, attrs[i])
    }
  },
  compileText: function(el) {
    const reg = /\{\{(.*)\}\}/
    if (reg.test(el.nodeValue)) {
      let name = RegExp.$1
      name = name.trim()
      //将data的值赋给该node
      el.nodeValue = this.$data[name]
      new Watcher(this.$data, el, name)
    }
  },
  compileUtils: function(el, attr) {
    const self = this
    let utils = {
      'v-model': function(el, name, value) {
        el.addEventListener('input', function (e) {
          //给对应的data属性赋值，并触发该属性的set函数
          self.$data[value] = e.target.value
        })
        el.value = self.$data[value]
      }
      
    }
    const name = attr.nodeName
    const value = attr.nodeValue
    if (Object.keys(utils).indexOf(name) > -1) utils[name](el, name, value)
  }
}

module.exports = Compiler