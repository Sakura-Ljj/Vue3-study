/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-14 11:26:10
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-20 17:24:23
 * @FilePath: \vue3project\src\utils\axios.js
 * @Description: axios 请求拦截器&响应拦截器
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const myAxios = axios.create({
    baseURL: '/api', // 这里直接配置服务器请求地址(http://localhose:3000)代表直接请求, 会产生跨域问题
    headers: {}, // 添加自定义请求头
    withCredentials: true
})

// 添加请求拦截器
myAxios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(({ data, config, headers, request }) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const resultConfig = {
        config,
        headers,
        request
    }
    if (data.code !== 200) {
        ElMessage.error(data.msg)
        return Promise.reject(data)
    }
    return {
        resultConfig,
        ...data
    }
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default myAxios
