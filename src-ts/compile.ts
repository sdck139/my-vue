import { Watcher } from './watcher'
import { compileNameAndData} from './utils'

export class Compiler {
  private _vue
  private _methods
  constructor(vm) {
    this._vue = vm
    this._methods = vm._methods
    this._init(vm.$el)
  }
  _init(el) {
    const _el = this.isElementNode(el) ? el : document.querySelector(el)
    const dom = this.node2Fragment(_el)
    _el.appendChild(dom)
  }
  node2Fragment(el) {
      const fragment = document.createDocumentFragment()
      let child
      // 将原生节点拷贝到fragment
      while (child = el.firstChild) {
          this.compile(child)
          fragment.appendChild(child)
      }
      return fragment
  }
  isElementNode(el) {
    return typeof el !== 'string'
  }
  compile(el) {
    //节点类型为元素
    if (el.nodeType === 1) {
      this.compileElement(el)
    } else if (el.nodeType === 3) {
      this.compileText(el)
    }
  }
  compileElement(el) {
    this._init(el)
    const self = this
    const attrs = el.attributes
    for (let i = 0; i < attrs.length; i++) {
        this.compileUtils(el, attrs[i])
    }
  }
  compileText(el) {
    const reg = /\{\{(.*)\}\}/
    if (reg.test(el.nodeValue)) {
      let names = reg.exec(el.nodeValue)[1]
      const {data, name} = compileNameAndData(this._vue, names)
      //将data的值赋给该node
      el.nodeValue = data[name]
      if (!el.parentElement.hasAttribute('v-once')) new Watcher(name, el, data)
    }
  }
  compileUtils(el, attr) {
    const self = this
    let directives = {
      'v-model': function(el, name, value) {
        const result = compileNameAndData(self._vue, value)
        const data = result.data
        const dataName = result.name
        const regx = /radio|checkbox/
        if (el.type == 'radio') {
          el.addEventListener('change', function (e) {
            //给对应的data属性赋值，并触发该属性的set函数
            data[dataName] = e.target.value
          })
        } else if (el.type == 'checkbox') {
          console.log(el.value)
          el.addEventListener('change', function (e) {
            //给对应的data属性赋值，并触发该属性的set函数
            if (e.target.checked) data[dataName].push(e.target.value)
            else data[dataName] = data[dataName].filter(v => !new RegExp(e.target.value).test(v))
          })
        } else {
          el.addEventListener('input', function (e) {
            //给对应的data属性赋值，并触发该属性的set函数
            data[dataName] = e.target.value
          })
          el.value = data[dataName]
        }
      },
      '@click': function(el, name, value) {
        el.addEventListener('click', function(e) {
          const reg = /([A-z]+)\(([A-z_,'\s0-9]*)\)|([A-z]+)/
          const result = value.match(reg)
          const methodName = result[1]
          const args = result[2].split(',')
          for (let i = 0; i < args.length; i++) {
            args[i] = args[i].trim().replace(/'/g, '"')
            args[i] = JSON.parse(args[i])
          }
          self._methods[methodName].call(self._vue, ...args)
        })
      },
      'v-html': function(el, name, value) {
        el.innerHTML = value
      },
      ':class': function (el, name, value) {
        value = value.replace(/\'/g, '\"')
        for (let key in value) {
          console.log(key)
          const result = compileNameAndData(self._vue, value[key])
          const data = result.data
          const dataName = result.name
          if (data[dataName]) el.classList.add(key)
        }
        // console.log()
      }
    }
    const name = attr.nodeName
    const value = attr.nodeValue
    if (Object.keys(directives).indexOf(name) > -1) directives[name](el, name, value)
    else this.compileBind(el, name, value)
  }

  compileBind(el, name, value) {
    const reg = /^:|^v-bind:/
    if (reg.test(name)) {
      const result = compileNameAndData(this._vue, value)
      const data = result.data
      const dataName = result.name

      const nameIndex = name.indexOf(':')
      const realName = name.slice(nameIndex + 1, name.length)
      el.removeAttribute(name)
      el.setAttribute(realName, data[dataName])
    }
  }
}
