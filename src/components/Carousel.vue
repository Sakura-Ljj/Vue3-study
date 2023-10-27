<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 19:23:16
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-10-25 15:45:14
 * @FilePath: \vue3project\src\components\carousel.vue
 * @Description: 轮播图组件
-->
<template>
    <swiper
        :navigation="false"
        :modules="data.modules"
        loop
        :autoplay="{
            pauseOnMouseEnter: !isMobile,
            disableOnInteraction: false,
        }"
        class="mySwiper"
    >
        <swiper-slide v-for="item in data.swiper_data" :key="item.text" :class="['img', item.bg, 'tw-bg-wh', 'tw-cursor-pointer']" @mouseenter="data.pause = false" @mouseleave="data.pause = true">
            <div>{{item.text}}</div>
            <div class="btn-tips tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
                <span class="tw-ml-5">底部简介信息底部简介信息底部简介信息底部简介信息底部简介信息底部简介信息底部简介信息底部简介信息</span>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup>
import { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { reactive, inject } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'

const isMobile = inject('isMobile')

const data = reactive({
    modules: [Navigation, Autoplay],

    swiper_data: [
        {
            text: '模拟官网 1',
            bg: 'tw-bg-red'
        },
        {
            text: '模拟官网 2',
            bg: 'tw-bg-blue-900'
        },
        {
            text: '模拟官网 3',
            bg: 'tw-bg-green-900'
        },
        {
            text: '模拟官网 4',
            bg: 'tw-bg-white'
        },
        {
            text: '模拟官网 5',
            bg: 'tw-bg-yellow-900'
        }
    ]

})
</script>
<style scoped>
.img {
  @apply tw-flex tw-justify-center tw-items-center tw-h-96 max-[400px]:tw-h-72;
}

.btn-tips {
  @apply tw-bg-black tw-bg-opacity-40 tw-py-2 tw-w-full tw-absolute tw-bottom-0 tw-text-white
}
</style>
