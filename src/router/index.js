/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:08:48
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-26 15:09:57
 * @FilePath: \vue3project\src\router\index.js
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from './grouter/index'
import routerView from '../pages/routerView.vue'
import { useUserStore } from '../store/userStore'

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
                component: () => import('../pages/user/info.vue'),
                meta: {
                    isCheckSession: true
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(), // 使用 hash 路由模式
    routes
})

// 全局路由拦截, 检测即将进入的路由需不需要检测登录态
router.beforeResolve(async to => {
    const user = useUserStore()
    if (to.meta.isCheckSession) {
        await user.getUserInfo()
        if (!user.userInfo.userId) return '/index/indexPage'
    }
})

export default router
