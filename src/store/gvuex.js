/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-02-23 15:00:03
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 17:29:42
 * @FilePath: \vue3project\src\store\gvuex.js
 * @Description: 浅写一个简单的 Vuex
 */
import { inject, reactive } from 'vue'

// 用于获取 store 的标识
const STORE_KEY = '__store__'

// 暴露两个方法 useStore() createStore()
const useStore = () => {
    // 使用 useStore 的时候获取 store
    return inject(STORE_KEY)
}

const createStore = (options) => {
    return new Store(options)
}

// 创建 Store 类
class Store {
    constructor (options) {
        this.$options = options
        this._state = reactive({
            data: options.state()
        })
        this._mutations = options.mutations
    }

    // 读取 state 的时候直接返回响应式数据 _state.data
    get state () {
        return this._state.data
    }

    // 提供 commit 函数用于执行配置好的 mutations
    commit = (type, payload) => {
        const entry = this._mutations[type]
        entry && entry(this.state, payload)
    }

    // 再 main.js 入口处 app.use(store) 的时候会执行这个函数
    install (app) {
        app.provide(STORE_KEY, this)
    }
}
export { useStore, createStore }
