/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-19 10:54:53
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-19 10:54:58
 * @FilePath: \vue3project\server\routes\commonRouters.js
 * @Description: 工具类相关路由
 */

const routes = [
    {
        path: '/common/uploadFile',
        method: 'post',
        handler: require('../contorller/commonContorller').uploadFile,
        isCheckSession: true
    },
    {
        path: '/common/getImage',
        method: 'get',
        handler: require('../contorller/commonContorller').getImage,
        isCheckSession: true
    }
]

module.exports = routes
