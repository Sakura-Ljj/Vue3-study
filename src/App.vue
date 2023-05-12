<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-05-11 16:52:20
 * @FilePath: \vue3project\src\App.vue
 * @Description:
-->
<template>
    <div>
        <div class="header tw-mb-3">
            <div class="tw-max-w-full tw-flex tw-justify-between tw-mx-60">
                <div class="logo tw-text-blue-400">LOGO</div>
                <ul class="tw-flex">
                    <li
                        v-for="item in data.navBar"
                        :key="item.path"
                        :class="['nav-item', route.path === item.path ? 'curr-nav' : '']"
                        @click="toPath(item.path)">
                        {{item.text}}
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="route.path.includes('indexPage')" class="carousel">
            <Carousel />
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Carousel from './components/Carousel.vue'
const router = useRouter()
const route = useRoute()
const data = reactive({
    navBar: [
        {
            text: '响应式数据及Vue3基础学习',
            path: '/'
        },
        {
            text: 'Vuex学习',
            path: '/vuexPractice'
        },
        {
            text: 'Vue中的JSX',
            path: '/vuePracticeJSX'
        },
        {
            text: 'IS动漫社模拟官网',
            path: '/indexPage'
        }
    ]
})

const toPath = (path) => {
    router.push(path)
}

</script>
<style scoped>
.logo {
    width: 50px;
    height:50px;
    line-height: 50px;
    cursor: pointer;
}

.header {
    border-bottom: 1px solid #989a9c;
}

.nav-item {
    @apply tw-mr-5 tw-cursor-pointer hover:tw-text-blue-400 tw-flex tw-items-center;
}

.curr-nav {
    @apply tw-text-blue-400;
    border-bottom: 2px solid;
}

.carousel {
    @apply tw-m-auto;
    width: 1851px;
}
.main {
    @apply tw-container tw-m-auto tw-relative;
}

</style>
