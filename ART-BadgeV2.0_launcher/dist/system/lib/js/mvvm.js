"use strict";

function warn(t) { console.log("【mvvm warn】-----\x3e>> " + t) }

function isObject(t) { return null !== t && "object" == typeof t }

function noop() {}

function def(t, e, n, i) { Object.defineProperty(t, e, { value: n, enumerable: !!i, writable: !0, configurable: !0 }) }

function hasOwn(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }

function remove(t, e) { if (t.length) { e = t.indexOf(e); if (-1 < e) return t.splice(e, 1) } }

function parseExps(t) { t = t.replace(/[\[\]]/g, ".").replace(/\.\./g, "."); return "." === t[t.length - 1] && (t = t.slice(0, t.length - 1)), t.split(".") }
var utils = { def: def, warn: warn, noop: noop, hasOwn: hasOwn, remove: remove, isObject: isObject, parseExps: parseExps },
    depId = 0;

function Dep() { this.id = depId++, this.subs = [] }
Dep.prototype = { addSub: function(t) { this.subs.push(t) }, depend: function() { Dep.target && Dep.target.addDep(this) }, removeSub: function(t) { utils.remove(this.subs, t) }, notify: function() { for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++) t[e].update() } }, Dep.target = null;
var dep = Dep;

function Set() { this.set = Object.create(null) }
Set.prototype = { constructor: Set, has: function(t) { return !0 === this.set[t] }, add: function(t) { this.set[t] = !0 }, clear: function() { this.set = Object.create(null) } };
var set = Set,
    CONSTANTS = {},
    ENV = CONSTANTS.ENV_DEV;
CONSTANTS.ENV_DEV = "development", CONSTANTS.ENV_PRO = "production", CONSTANTS.ENV_TEST = "test";
var constants = { ENV: ENV, CONSTANTS: CONSTANTS },
    watcherId = 0;

function Watcher(t, e, n, i) { this.vm = t, this.lazy = !!i && !!i.lazy, this.cb = n, this.id = ++watcherId, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new set, this.newDepIds = new set, "function" == typeof e ? this.getter = e : (this.getter = this.parseGetter(e.trim()), this.getter || (this.getter = utils.noop(), "production" !== constants.ENV && utils.warn('Failed watching path: "' + e + '".Watcher only accepts simple dot-delimited paths. For full control, use a function instead.'))), this.value = this.lazy ? void 0 : this.get() }
Watcher.prototype = { constructor: Watcher, get: function() { pushTarget(this); var t = this.getter.call(this.vm, this.vm); return popTarget(), this.cleanupDeps(), t }, cleanupDeps: function() { for (var t = this.deps.length; t--;) { var e = this.deps[t];
            this.newDepIds.has(e.id) || e.removeSub(this) } var n = this.depIds;
        this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0 }, addDep: function(t) { var e = t.id;
        this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this)) }, update: function() { this.lazy ? this.dirty = !0 : this.run() }, run: function() { var t = this.get(),
            e = this.value;
        t !== e && (this.value = t, this.cb.call(this.vm, t, e)) }, evaluate: function() { this.value = this.get(), this.dirty = !1 }, depend: function() { for (var t = this.deps.length; t--;) this.deps[t].depend() }, parseGetter: function(t) { return function(e) { return utils.parseExps(t).forEach(function(t) { e = e[t] }), e } } };
var targetStack = [];

function pushTarget(t) { targetStack.push(t), dep.target = t }

function popTarget() { targetStack.pop(), dep.target = targetStack[targetStack.length - 1] }
var watcher = Watcher;

function Compile(t, e, n) { this.init(t, e, n) }
Compile.prototype = { constructor: Compile, init: function(t, e, n) { this.$vm = e, this.$widgets = t, this.$page = n, this.bindEvent(this.$page), this.$widgets && this.compileWidget(this.$widgets) }, compileWidget: function(t) { var o = this;
        Object.keys(t).forEach(function(i) { t[i].forEach(function(t) { var e = t.directive.substring(2),
                    n = t.bindData,
                    t = t.widgetAttr;
                compileUtil[e] && compileUtil[e](o, i, t, n) }) }) }, bindEvent: function(a) { a.getElementById = function(o) { return { bind: function(i, t) { var e;
                    e = i, t = t, a._btab || (a._btab = {}), a._btab[o] || (a._btab[o] = {}), a._btab[o][e] || (a._btab[o][e] = []), a._btab[o][e].push(t);
                    t = {};
                    t[o] = {}, t[o][i] = function(t) { for (var e = a._btab[o][i], n = 0; n < e.length; n++) e[n](t) }, a.setData(t) } } } } };
var compileUtil = { on: function(e, t, n, i) { e.$page.getElementById(t).bind("on" + n, function(t) { e.$vm.$options.methods[i] && e.$vm.$options.methods[i].call(e.$vm, t) }) }, bind: function(t, e, n, i) { bindData(t, e, n, i, "bind") }, show: function(t, e, n, i) { bindData(t, e, n, i, "show") }, text: function(t, e, n, i) { bindData(t, e, n, i, "text") }, model: function(e, t, n, i) { bindData(e, t, n, i, "model"); var o = getVMVal(e.$vm, i);
        e.$page.getElementById(t).bind("onchange", function(t) { t = t.detail.value;
            o !== t && (setVMVal(e.$vm, i, t), o = t) }) } };

function bindData(n, i, o, t, e) { var a = updater[e + "Updater"];
    a && a(n, i, o, getVMVal(n.$vm, t)), new watcher(n.$vm, t, function(t, e) { a && a(n, i, o, t) }) }

function getVMVal(e, t) { return utils.parseExps(t).forEach(function(t) { e = e[t] }), e }

function setVMVal(t, n, i) { var o = t;
    (n = utils.parseExps(n)).forEach(function(t, e) { e < n.length - 1 ? (Array.isArray(o) && o.splice(+t, 1, o[t]), o = o[t]) : Array.isArray(o) ? o.splice(+t, 1, i) : o[t] = i }) }
var updater = { showUpdater: function(t, e, n, i) { var o = {};
        o[e] = { visible: i }, t.$page.setData(o) }, bindUpdater: function(t, e, n, i) { setDataToWidget(t, e, n, i) }, modelUpdater: function(t, e, n, i) { setDataToWidget(t, e, n, i) }, textUpdater: function(t, e, n, i) { setDataToWidget(t, e, n, i) } };

function setDataToWidget(t, e, n, i) { var o = {},
        a = {};
    a[n] = i, o[e] = a, t.$page.setData(o) }
var compile = Compile,
    arrayProto = Array.prototype,
    arrayMethods = Object.create(arrayProto),
    methodsToPatch = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
methodsToPatch.forEach(function(a) { var s = arrayProto[a];
    utils.def(arrayMethods, a, function() { for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]; var n, i = s.apply(this, t),
            o = this.__ob__; switch (a) {
            case "push":
            case "unshift":
                n = t; break;
            case "splice":
                n = t.slice(2) } return n && o.observeArray(n), o.dep.notify(), i }) });
var array = { arrayMethods: arrayMethods },
    arrayKeys = Object.getOwnPropertyNames(array.arrayMethods);

function Observer(t) { this.data = t, this.dep = new dep, utils.def(t, "__ob__", this), Array.isArray(t) ? ("__proto__" in {} ? protoAugment(t, array.arrayMethods) : copyAugment(t, array.arrayMethods, arrayKeys), this.observeArray(t)) : this.walk(t) }

function observe(t) { if (utils.isObject(t)) return utils.hasOwn(t, "__ob__") && t.__ob__ instanceof Observer ? t.__ob__ : new Observer(t) }

function protoAugment(t, e) { t.__proto__ = e }

function copyAugment(t, e, n) { for (var i = 0, o = n.length; i < o; i++) { var a = n[i];
        utils.def(t, a, e[a]) } }

function dependArray(t) { for (var e, n = 0, i = t.length; n < i; n++)(e = t[n]) && e.__ob__ && e.__ob__.dep.depend(), Array.isArray(e) && dependArray(e) }
Observer.prototype = { constructor: Observer, walk: function(e) { var n = this;
        Object.keys(e).forEach(function(t) { n.defineReactive(e, t, e[t]) }) }, observeArray: function(t) { for (var e = 0, n = t.length; e < n; e++) observe(t[e]) }, defineReactive: function(n, t, i) { var o, a, s, r = new dep,
            e = Object.getOwnPropertyDescriptor(n, t);
        e && !1 === e.configurable || (o = e && e.get, a = e && e.set, o && !a || 2 !== arguments.length || (i = n[t]), s = observe(i), Object.defineProperty(n, t, { enumerable: !0, configurable: !0, get: function() { var t = o ? o.call(n) : i; return dep.target && (r.depend(), s && (s.dep.depend(), Array.isArray(t) && dependArray(t))), t }, set: function(t) { var e = o ? o.call(n) : i;
                t === e || t != t && e != e || o && !a || (a ? a.call(n, t) : i = t, s = observe(t), r.notify()) } })) } };
var observer = observe;

function MVVM(t, e) { e ? t && this.init(t, e) : t && this.init(t) }

function defineComputed(t, e, n) { "function" == typeof n ? ((n = { enumerable: !0, configurable: !0, get: utils.noop(), set: utils.noop() }).get = createComputedGetter(e), Object.defineProperty(t, e, n)) : utils.warn('Computed property must be a function.Please checked the computed property "' + e + '"') }

function createComputedGetter(e) { return function() { var t = this._computedWatchers && this._computedWatchers[e]; if (t) return t.dirty && t.evaluate(), dep.target && t.depend(), t.value } }
MVVM.prototype = { constructor: MVVM, init: function(t, e) { this.$page = e || {}, Page(this.$page), this.$data = t.data || {}, this.$options = t || {}, this._initData(this.$data), this._initLifecycle(this, t), t.computed && this._initComputed(this, t.computed), t.methods && this._initMethods(this, t.methods), this.$compile = new compile(t.widgets, this, this.$page) }, insertCustomPanel: function(t, e, n) { var i = {},
            o = this.$options;
        i[t] = { panel: { page: this.$page, items: e } }, this.$page.setData(i), n && (Object.keys(n).forEach(function(t) { o.widgets[t] = n[t] }), this.$compile.init(n, this, this.$page)) }, _initData: function(n) { var t = this;
        Object.keys(n).forEach(function(e) { Object.defineProperty(t, e, { enumerable: !0, configurable: !0, get: function() { return n[e] }, set: function(t) { t !== n[e] && (n[e] = t) } }) }), observer(n) }, _initComputed: function(i, o) { var a = i._computedWatchers = Object.create(null);
        Object.keys(o).forEach(function(t) { var e = o[t],
                n = "function" == typeof e ? e : null; "production" !== constants.ENV && null == n && utils.warn('Computed property must be a function or getter is missing.Please checked the computed property "' + t + '"'), a[t] = new watcher(i, n || utils.noop(), utils.noop(), { lazy: !0 }), t in i ? "production" !== constants.ENV && t in i.$data && utils.warn('The computed property "' + t + '" is already defined in data.Do not repeat defined') : defineComputed(i, t, e) }) }, _initMethods: function(e, n) { Object.keys(n).forEach(function(t) { "production" !== constants.ENV && ("function" != typeof n[t] && utils.warn('Method "' + t + '" has type "' + typeof n[t] + '" in the component definition. Did you reference the function correctly?'), t in e && utils.warn('Method "' + t + '" was exist in the mvvm instance. Please check the method name and do not use the repeat name in data, computed, methods')), e[t] = "function" != typeof n[t] ? function() {} : n[t] }) }, _initLifecycle: function(e, t) { "function" == typeof t.onLoad && (this.$page.onLoad = function(t) { e.$options.onLoad.call(e, t) }), "function" == typeof t.onShow && (this.$page.onShow = function(t) { e.$options.onShow.call(e, t) }), "function" == typeof t.onHide && (this.$page.onHide = function(t) { e.$options.onHide.call(e, t) }), "function" == typeof t.onResume && (this.$page.onResume = function(t) { e.$options.onResume.call(e, t) }), "function" == typeof t.onUpdate && (this.$page.onUpdate = function(t) { e.$options.onUpdate.call(e, t) }), "function" == typeof t.onExit && (this.$page.onExit = function(t) { e.$options.onExit.call(e, t) }) } };
var mvvm = MVVM;
module.exports = MVVM;