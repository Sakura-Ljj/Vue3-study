/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:08:48
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-18 17:19:06
 * @FilePath: \vue3project\src\router\index.js
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from './grouter/index'
import routerView from '../pages/routerView.vue'

const routes = [
    // 重定向到首页
    {
        path: '/',
        redirect: '/index/indexPage'
    },
    {
        path: '/index',
        component: routerView,
        children: [
            {
                path: 'indexPage',
                name: 'indexPage',
                component: () => import('../pages/indexPage/index.vue')
            }
        ]
    },
    {
        path: '/practice',
        component: routerView,
        children: [
            {
                path: 'vue3BasicPractice',
                name: 'vue3BasicPractice',
                component: () => import('../pages/vue3BasicPractice.vue')
            },
            {
                path: 'vuexPractice',
                name: 'vuexPractice',
                component: () => import('../pages/vuexPractice.vue')
            },
            {
                path: 'vuePracticeJSX',
                name: 'vuePracticeJSX',
                component: () => import('../pages/vuePracticeJSX.vue')
            }
        ]
    },
    {
        path: '/user',
        component: routerView,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../pages/user/login.vue')
            },
            {
                path: 'info',
                name: 'info',
                component: () => import('../pages/user/info.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(), // 使用 hash 路由模式
    routes
})

export default router
