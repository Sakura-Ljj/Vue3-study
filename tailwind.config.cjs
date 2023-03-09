/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 17:48:27
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-06 17:02:09
 * @FilePath: \vue3project\tailwind.config.cjs
 * @Description: tailwindcss配置文档
 */

// 如果使用vs code进行开发, 可以下载tailwind css官方拓展插件 `Tailwind CSS IntelliSense`, 方便使用tailwind css进行开发
module.exports = {
    purge: [
        // 这里是用于构建的时候可以检测以下路径定义的文件用到的类名, 没用到的会在构建的时候删除, 属于按需加载
        './src/pages/*.vue',
        './src/components/*.vue',
        './src/*.vue'
    ],

    darkMode: false, // or 'media' or 'class'

    theme: {
        extend: {
            colors: {
                red: '#F26A62',
                gray: '#989a9c',
                'gray-100': '#F7F7F8',
                blue: {
                    500: '#267EF0'
                }
            }
        },

        screens: {
            mobile: '1145px'
            // => @media (min-width: 1145px) { ... }

            // 'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }

            // 'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        }
    },
    variants: {
        extend: { // 这里是开启某些 css 属性没有的变体, 如 focus, last 具体看tailwindcss文档
            margin: ['last']
        }
    },
    plugins: [],

    corePlugins: {
        preflight: false
    },

    prefix: 'tw-' // 这个给 tailwindcss 中的类名添加的前缀
}
