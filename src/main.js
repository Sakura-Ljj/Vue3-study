/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-05-26 17:19:54
 * @FilePath: \vue3project\src\main.js
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus' // 引入Element plus
import './style.css'
import 'tailwindcss/tailwind.css' // 引入tailwindcss
import 'element-plus/dist/index.css' // 引入Element plus的css文件
import { Share } from '@element-plus/icons-vue' // 引入图标
import store from './store/index'
const app = createApp(App)
app.component(Share.name, Share)

app.use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
