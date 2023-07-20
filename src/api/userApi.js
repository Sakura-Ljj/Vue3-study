/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-14 17:29:27
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-17 16:40:15
 * @FilePath: \vue3project\src\api\userApi.js
 * @Description: 用户相关API
 */
import axios from '@utils/axios'

export default {
    login: data => {
        return axios.post('/user/login', data)
    },

    logout: () => {
        return axios.get('/user/logout')
    },

    register: data => {
        return axios.post('/user/register', data)
    },

    getUserInfo: () => {
        return axios.get('/user/getUser')
    }
}
