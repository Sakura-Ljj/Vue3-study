/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 17:04:03
 * @FilePath: \vue3project\src\main.js
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './style.css'
import 'tailwindcss/tailwind.css' // 引入tailwindcss
import store from './store/index'
const app = createApp(App)

app.use(router)
    .use(store)
    .mount('#app')
