function Watcher(data, node, name) {
  //Dep.target是一个Dep的静态属性,表示当前观察者。
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.data = data;
  //订阅者执行一次更新视图
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  update: function () {
      //触发对应data属性值的get函数
      this.get();
      this.node.nodeValue = this.value;
  },
  get: function () {
      this.value = this.data[this.name]
  }
}

function Dep() {
  //主题的订阅者们
  this.subs = [];
}

Dep.prototype = {
  //添加订阅者的方法
  addSub: function (sub) {
      this.subs.push(sub);
  },
  //发布信息的方法（让订阅者们全部更新view）
  notify: function () {
      this.subs.forEach(function (sub) {
          sub.update();
      })
  }
}

exports.Dep = Dep

exports.Watcher = Watcher