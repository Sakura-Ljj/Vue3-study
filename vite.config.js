/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-07 10:50:07
 * @FilePath: \vue3project\vite.config.js
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJSX()]
})
