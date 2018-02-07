import { compileNameAndData } from '../utils'

export class Watch {
  _watchFormat = []
  _data
  _watch
  _vue
  constructor(vm) {
    this._data = vm._data
    this._watch = vm._watch
    this._vue = vm
    this._init()
  }
  _init() {
    const self = this
    for (let key in this._watch) {
      const {name, data} = compileNameAndData(this._vue, key)
      self._watchFormat.push({
        data: data,
        name: name,
        func: this._watch[key]
      })
    }
  }

  searchAndRun(data, name) {
    const self = this
    this._watchFormat.forEach(v => {
      if (data == v.data && name == v.name) v.func.call(self._vue)
    })
  }
}