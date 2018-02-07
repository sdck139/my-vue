import { Watcher } from './watcher'

export class Dep {
  static target = null
  public subs
  constructor() {
    this.subs = []
  }
  //添加订阅者的方法
  addSub(sub) {
    this.subs.push(sub)
  }
  //发布信息的方法（让订阅者们全部更新view）
  notify() {
    this.subs.forEach(function (sub) {
        sub.update()
    })
  }
}
