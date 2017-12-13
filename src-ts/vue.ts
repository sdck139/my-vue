
export interface Option {
    data: Object
}

export class Vue {
    _data: Object
    _methods: Object
    constructor(public options: Option) {
        this._data = options.data
    }
}
