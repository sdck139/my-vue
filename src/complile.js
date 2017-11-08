const Watcher = require('./watcher').Watcher

function Compiler(el, data) {
  this.$el = document.querySelector(el)
  const dom = this.node2Fragment(this.$el, data)
  const temp = document.getElementById(el)
  document.body.appendChild(dom)
}

Compiler.prototype = {
  node2Fragment: function(el, data) {
      var fragment = document.createDocumentFragment(), child
      // 将原生节点拷贝到fragment
      while (child = el.firstChild) {
          this.compile(child, data)
          fragment.appendChild(child)
      }
      return fragment
  },
  isElementNode: function(node) {
    return node.nodeName !== '#text'
  },
  compile: function(node, data) {
    var reg = /\{\{(.*)\}\}/;
    //节点类型为元素
    if (node.nodeType === 1) {
        var attr = node.attributes;
        for (var i = 0; i < attr.length; i++) {
            //匹配v-model这个属性名称
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue;
                node.addEventListener('input', function (e) {
                  //给对应的data属性赋值，并触发该属性的set函数
                    data[name] = e.target.value;
                });
                //将data的值赋给gainode
                node.value = data[name];
            }
        }
    };
    //节点类型为text
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1;
            name = name.trim();
            //将data的值赋给该node
            node.nodeValue = data[name];
            new Watcher(data, node, name)
        }
    }
  },
  compileElement: function(el) {

  },
  compileText: function(el) {

  }
}

module.exports = Compiler