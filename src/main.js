/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-17 14:53:05
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
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入所有图标
// import store from './store/index'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
    // .use(store)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')
