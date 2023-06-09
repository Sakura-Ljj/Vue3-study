/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-09 17:16:44
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-09 17:58:57
 * @FilePath: \vue3project\server\routes\userRoutes.js
 * @Description: 用户相关路由
 */
const routes = [
    {
        path: '/user/login',
        method: 'get',
        handler: require('../contorller/userContorller').userLoginApi
    }
]

module.exports = routes
