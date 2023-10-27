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
        <div class="tw-bg-white">
            <div class="tw-container tw-m-auto tw-py-10 tw-relative tw-box-border max-[400px]:tw-px-5">
                <div class="tw-flex tw-items-center">
                    <div class="tw-w-10 tw-h-10 tw-rounded tw-bg-blue-400 tw-mr-5" />
                    <div v-if="isMobile">
                        <p>现正无限征求同好中~</p>
                        <p>欢迎各种萌新咸鱼大腿关注噢_(:P</p>
                    </div>
                    <span v-else>现正无限征求同好中~欢迎各种萌新咸鱼大腿关注噢_(:P</span>
                </div>
                <div>
                    <div :class="isMobile ? 'mobile-img' : 'img'" />
                    <div :class="isMobile ? 'mobile-qr-code' : 'qr-code'">
                        <img :src="getAssetURL('qrcode.jpg')" class="tw-w-32 tw-h-32 tw-block" />

                        <span class="tw-text-sm tw-text-gray-500">就等你了哟~</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view v-else :key="route.fullPath" />
</template>
<script setup>
import { onMounted, ref, inject } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRoute } from 'vue-router'
import Carousel from '../components/Carousel.vue'
import NavBar from '../components/NavBar.vue'
import { getAssetURL } from '@utils/importImage'

const user = useUserStore()
const route = useRoute()
const isMobile = inject('isMobile')

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

<style scoped>
.qr-code {
  position: absolute;
  text-align: center;
  top: -80px;
  right: 0;
}

.img {
  @apply tw-w-24 tw-h-36 tw-bg-gray-700 tw-rounded;
  position: absolute;
  right: 180px;
  top: -110px;
}

.mobile-qr-code {
  position: absolute;
  text-align: center;
  right: 0;
  top: -160px;
}

.mobile-img {
  @apply tw-w-24 tw-h-36 tw-bg-gray-700 tw-rounded;
  position: absolute;
  top: -160px;
  left: 15px;
}
</style>
