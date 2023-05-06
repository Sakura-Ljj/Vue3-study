/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:08:48
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-05-06 16:12:22
 * @FilePath: \vue3project\src\router\index.js
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from './grouter/index'

const routes = [
    {
        path: '/',
        name: 'vue3BasicPractice',
        component: () => import('../pages/vue3BasicPractice.vue')
    },
    {
        path: '/vuexPractice',
        name: 'vuexPractice',
        component: () => import('../pages/vuexPractice.vue')
    },
    {
        path: '/vuePracticeJSX',
        name: 'vuexPracticeJSX',
        component: () => import('../pages/vuePracticeJSX.vue')
    },
    {
        path: '/indexPage',
        name: 'indexPage',
        component: () => import('../pages/indexPage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(), // 使用 hash 路由模式
    routes
})

export default router
