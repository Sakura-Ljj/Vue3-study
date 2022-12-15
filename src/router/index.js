/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:08:48
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2022-12-14 16:48:01
 * @FilePath: \vue3project\src\router\index.js
 * @Description: 
 */
import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../pages/about.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(), // 使用 hash 路由模式
    routes
})

export default router;