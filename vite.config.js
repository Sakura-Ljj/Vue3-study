/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-08-28 15:09:58
 * @FilePath: \vue3project\vite.config.js
 * @Description: 构建配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './', // 公共基础路径

    server: {
        proxy: { // 配置代理解决 Cookie 跨域问题
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },

    // preview: {
    //     port: 3000, // 指定开发服务器端口
    //     strictPort: true, // 若端口已被占用则会直接退出
    //     https: false, // 启用 TLS + HTTP/2
    //     open: true, // 启动时自动在浏览器中打开应用程序
    //     proxy: { // 配置自定义代理规则
    //         '/api': {
    //             target: 'http://localhost',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, '')
    //         }
    //     },
    //     cors: true // 配置 CORS
    // },

    plugins: [vue(), vueJSX()],

    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@api': path.resolve(__dirname, './src/api'),
            '@store': path.resolve(__dirname, './src/store')
        }
    },

    build: {
        emptyOutDir: true,
        outDir: '../dist' // 打包输出路径
    }
})
