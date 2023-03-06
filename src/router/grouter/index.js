/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-03-01 16:18:47
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-02 17:48:24
 * @FilePath: \vue3project\src\router\grouter\index.js
 * @Description:  实现简单的 vue-router
 */
import { ref, inject } from 'vue'
import RouterView from './RouterView.vue'
import RouterLink from './RouterLink.vue'

const ROUTER_KEY = '__router__'

const createRouter = (options) => {
    return new Router(options)
}

const useRouter = () => {
    return inject(ROUTER_KEY)
}

const createWebHashHistory = () => {
    const bindEvents = (fn) => {
        window.addEventListener('hashchange', fn)
    }
    return {
        bindEvents,
        url: window.location.hash.slice(1) || '/' // 当前页面的 url
    }
}

class Router {
    constructor (options) {
        this.history = options.history
        this.routes = options.routes
        this.current = ref(this.history.url)

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1)
        })
    }

    install (app) {
        app.provide(ROUTER_KEY, this)
        app.component('RouterView', RouterView)
        app.component('RouterLink', RouterLink)
    }
}

export { createRouter, useRouter, createWebHashHistory }
