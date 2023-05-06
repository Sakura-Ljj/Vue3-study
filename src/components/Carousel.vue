<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 19:23:16
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-05-06 19:23:37
 * @FilePath: \vue3project\src\components\carousel.vue
 * @Description:
-->
<template>
    <swiper
        navigation
        :modules="data.modules"
        loop
        autoplay
        class="mySwiper"
    >
        <swiper-slide v-for="item in data.swiper_data" :key="item.text" class="img">{{item.text}}</swiper-slide>
    </swiper>
</template>

<script setup>
import { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { reactive } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'

const data = reactive({
    modules: [Navigation, Autoplay],
    swiper_data: [
        {
            text: '模拟官网 1'
        },
        {
            text: '模拟官网 2'
        },
        {
            text: '模拟官网 3'
        },
        {
            text: '模拟官网 4'
        },
        {
            text: '模拟官网 5'
        }
    ]

})
</script>
<style scoped>
.img {
  @apply tw-bg-white tw-flex tw-justify-center tw-items-center;
  height: 512px;
}
</style>
