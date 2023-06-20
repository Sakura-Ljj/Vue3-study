/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-20 17:36:13
 * @FilePath: \vue3project\vite.config.js
 * @Description: 构建配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: { // 配置代理解决 Cookie 跨域问题
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },

    plugins: [vue(), vueJSX()],

    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    }
})
