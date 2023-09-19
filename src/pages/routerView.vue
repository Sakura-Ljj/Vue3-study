<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-18 17:29:47
 * @FilePath: \vue3project\src\pages\routerView.vue
 * @Description:
-->
<template>
    <div v-if="navBar.some(item => item.path === route.path)">
        <NavBar :loading="loading" :nav-bar="navBar" />

        <Carousel v-if="route.path.includes('indexPage')" />

        <div class="tw-container tw-m-auto">
            <router-view :key="route.fullPath" />
        </div>
    </div>
    <router-view v-else :key="route.fullPath" />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRoute } from 'vue-router'
import Carousel from '../components/Carousel.vue'
import NavBar from '../components/Navbar.vue'

const user = useUserStore()
const route = useRoute()

const navBar = ref([
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
    },
    {
        text: 'IS动漫社模拟官网',
        path: '/index/indexPage'
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
