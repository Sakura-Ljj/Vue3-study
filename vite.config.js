/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-10-13 15:33:57
 * @FilePath: \vue3project\vite.config.js
 * @Description: 构建配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path'
import CompressionVitePlugin from 'vite-plugin-compression'
import imageminVitePlugin from 'vite-plugin-imagemin'

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

    plugins: [
        vue(),

        vueJSX(),

        new CompressionVitePlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /.js$|.css$|.html$/,
            threshold: 10240, // 对超过10k的数据压缩
            minRatio: 0.8 // 压缩率小于0.8才会压缩
        }),

        imageminVitePlugin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 20
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    }
                ]
            }
        })
    ],

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
