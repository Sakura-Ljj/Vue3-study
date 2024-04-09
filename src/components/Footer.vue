<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-10-27 14:59:30
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-10-31 11:41:02
 * @FilePath: \vue3project\src\components\Footer.vue
 * @Description: 底边栏组件
-->
<template>
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
                <div :class="isMobile ? 'mobile-qr-code' : 'qr-code'">
                    <img :src="getAssetURL('qrcode.jpg')" class="tw-w-32 tw-h-32 tw-block" />
                    <span class="tw-text-sm tw-text-gray-500">就等你了哟~</span>
                </div>
                <img :src="getAssetURL('IS_poster.png')" :class="isMobile ? 'mobile-img' : 'img'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
import { getAssetURL } from '@utils/importImage'

const isMobile = inject('isMobile')
</script>

<style scoped>
.qr-code {
  position: absolute;
  text-align: center;
  right: 230px;
  top: -80px;
}

.img {
  @apply tw-w-52 tw-h-64 tw-object-cover;
  position: absolute;
  top: -165px;
  right: 0;
}

.mobile-qr-code {
  position: absolute;
  text-align: center;
  right: 0;
  top: -160px;
}

.mobile-img {
  @apply tw-w-36 tw-h-48 tw-object-cover;
  position: absolute;
  top: -170px;
  left: 15px;
}
</style>
