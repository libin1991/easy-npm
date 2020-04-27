/*
 * 类似vuex中的接口进行状态管理
 * 利用postMessage和onMessage的方式进行跨页面间通信,类似浏览器的postMessage
 */

function getShortRoute(route) {
    return route.match(/\/(.+)\//)[1];
}

function genericSubscribe(fn, subs) {
    if (subs.indexOf(fn) < 0) {
        subs.push(fn);
    }
    return () => {   // 闭包,取消订阅
        const i = subs.indexOf(fn);
        if (i > -1) {
            subs.splice(i, 1);
        }
    }
}

export default class Store {
    constructor(config) {
        this.state = config.state || {};
        this.mutations = config.mutations || {};
        this.actions = config.actions || {};
        this.getters = config.getters || {};
        this._pages = [];
        this._messages = [];
        this._subscribers = [];
        this.$getter = {};
        this.subs = [];   // 存储计算属性订阅函数
    }

    get getter() {
        return this.$getter;
    }

    set getter(v) {
        throw new Error('getter is read-only');
    }

    install(page) {   //  let index = this._pages.indexOf(page) 无效
        page._shortRoute = getShortRoute(page.route);
        let index = this._pages.findIndex((item) => {
            return item.route === page.route;
        });
        if (index > -1) {
            this._pages.splice(index, 1);
        }
        this._pages.unshift(page);
        this.computed(page, page.computed);
        this.watch(page, page.watch);
        this.setState();
    }

    uninstall(page) {
        let index = this._pages.findIndex((item) => {
            return item.route === page.route;
        });
        if (index > -1) {
            this._pages.splice(index, 1);
        }
    }

    replaceState(data) {
        this.setState(data);
    }

    setState(data) {
        if (typeof data === 'object') {
            Object.assign(this.state, data);
        }
        if (Object.keys(this.getters).length > 0) {
            Object.keys(this.getters).map((item, index) => {
                this.$getter[item] = this.getters[item](this.state);
            });
        }
        this._pages.forEach(page => {
            page.setData({
                $state: this.state,
                $getter: this.$getter
            });
        });
    }

    commit(type, payload) {
        let mutation = this.mutations[type];
        let result = mutation && mutation(this.state, payload);
        this.setState();
        // 触发订阅
        this._subscribers.forEach(sub => sub(type, this.state));
        return result;
    }

    dispatch(type, payload) {
        let action = this.actions[type];
        return action && action(this, payload);
    }

    postMessage(routes, data) {
        if (!Array.isArray(routes)) {
            routes = [routes];
        }
        routes.forEach(route => {
            this._pages.forEach(page => {
                if (page._shortRoute === route) {
                    page.onMessage && page.onMessage(data);
                }
            });
        });
    }

    subscribe(fn) {
        return genericSubscribe(fn, this._subscribers)
    }

    watch(page, obj = {}) {  // 由于setData是覆盖式更新,所以没必要递归添加监听
        Object.keys(obj).forEach(key => {
            this.defineReactive(page, key, page.data[key], function (value) {
                obj[key].call(page, value);
            });
        });
    }

    computed(page, obj = {}) {
        let keys = Object.keys(obj);
        let dataKeys = Object.keys(page.data);
        dataKeys.forEach(dataKey => {
            this.defineReactive(page, dataKey, page.data[dataKey]);
        });
        let firstComputedObj = keys.reduce((prev, next) => {
            page.data.ComputedTarget = function () {
                page.setData({
                    [next]: obj[next].call(page)
                });
            };
            prev[next] = obj[next].call(page);
            delete page.data.ComputedTarget;
            return prev;
        }, {});
        page.setData(firstComputedObj);
    }

    defineReactive(page, key, val, fn) {
        const that = this;
        const {
            data
        } = page;
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                if (data.ComputedTarget) {
                    that.subs.push(data.ComputedTarget);
                }
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                };
                fn && fn(newVal);
                setTimeout(() => {
                    if (that.subs.length) {
                        that.subs.forEach(sub => sub());
                    }
                }, 0);
                val = newVal;
            }
        });
    }
}