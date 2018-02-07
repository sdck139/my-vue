import { Observe } from './observer'
import { Compiler } from './compile'
import { Watch } from './lifecycle'

export class Vue {
    _data: Object
		_methods: Object
		_watch: Object
		$beforeCreate: Function
		$created: Function
		$beforeMount: Function
		$mounted: Function
		$beforeUpdate: Function
		$updated: Function
		$activated: Function
		$deactivated: Function
		$beforeDestroy: Function
		$destroyed: Function
		$errorCaptured: Function
		$el
		_watchOb

    constructor(options) {
			this._data = options.data
			this._methods = options.methods
			this._watch = options.watch || {}
			this.$beforeCreate = options.beforeCreate || function() {}
			this.$created = options.created || function() {}
			this.$beforeMount = options.beforeMount || function() {}
			this.$mounted = options.mounted || function() {}
			this.$beforeUpdate = options.beforeUpdate || function() {}
			this.$updated = options.updated || function() {}
			this.$activated = options.activated || function() {}
			this.$deactivated = options.deactivated || function() {}
			this.$beforeDestroy = options.beforeDestroy || function() {}
			this.$destroyed = options.destroyed || function() {}
			this.$errorCaptured = options.errorCaptured || function() {}
			this._init(options)
		}
		
    _init(options) {
			this._initEvent()
			this.$beforeCreate()
			// this._initInjectionsAndReactivity()
			this._initScope()
			this.$created()
			this.$beforeMount()
			this.$el = options.$el
			this.$mounted()
			new Compiler(this)
		}

		_initScope() {
			// beforeUpdate updated都在initData里
			this._initData()
			for (let key in this._data) {
				this._proxy(this, key)
			}
			this._watchOb = new Watch(this)
		}
		
		_initEvent() {
			// TODO
		}

		_initData() {
			new Observe(this)
		}
		
		_proxy(self, key) {
			Object.defineProperty(self, key, {
				enumerable: true,
				configurable: true,
				get: function() {
					return self._data[key]
				},
				set: function(newVal) {
					self._data[key] = newVal
				}
			})
		}
}
