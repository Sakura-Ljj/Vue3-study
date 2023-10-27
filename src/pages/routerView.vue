<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-10-27 12:02:09
 * @FilePath: \vue3project\src\pages\routerView.vue
 * @Description:
-->
<template>
    <div v-if="navBar.some(item => item.path === route.path)" class="tw-bg-gray-100">
        <!-- Top -->
        <NavBar :loading="loading" :nav-bar="navBar" />
        <!-- 轮播图 -->
        <Carousel v-if="route.path.includes('indexPage')" class="min-[400px]:tw-w-4/5 max-[400px]:tw-w-full tw-m-auto" />
        <!-- Main -->
        <div class="tw-container tw-m-auto">
            <router-view :key="route.fullPath" />
        </div>
        <!-- Footer -->
        <Footer v-if="route.path.includes('indexPage')" />
    </div>
    <router-view v-else :key="route.fullPath" />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRoute } from 'vue-router'
import Carousel from '../components/Carousel.vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

const user = useUserStore()
const route = useRoute()

const navBar = ref([
    {
        text: 'IS动漫社模拟官网',
        path: '/index/indexPage'
    },
    {
        text: '响应式数据及Vue3基础学习',
        path: '/practice/vue3BasicPractice'
    },
    {
        text: 'Vuex学习',
        path: '/practice/vuexPractice'
    },
    {
        text: 'Vue中的JSX',
        path: '/practice/vuePracticeJSX'
    }
])

const loading = ref(false)

onMounted(async () => {
    loading.value = true
    try {
        await user.getUserInfo()
        loading.value = false
    } catch (e) {
        loading.value = false
    }
})
</script>
