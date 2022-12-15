/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2022-12-15 10:35:27
 * @FilePath: \vue3project\src\main.js
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import './style.css';
import 'tailwindcss/tailwind.css'; // 引入tailwindcss

const app = createApp(App)

app.use(router)

app.mount('#app')
