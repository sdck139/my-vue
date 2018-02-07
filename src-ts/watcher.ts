import { Dep } from './dep'

export class Watcher {
  private name
  private node
  private data
  private value
  constructor(name, node, data) {
    Dep.target = this
    this.name = name
    this.node = node
    this.data = data
    this.update()
    Dep.target = null
  }
  update() {
    //触发对应data属性值的get函数
    this.get()
    this.node.nodeValue = this.value
  }
  get() {
    this.value = this.data[this.name]
  }
}
