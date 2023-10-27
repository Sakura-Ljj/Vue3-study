<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-10-27 14:59:30
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-10-27 14:59:45
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
                <div :class="isMobile ? 'mobile-img' : 'img'" />
                <div :class="isMobile ? 'mobile-qr-code' : 'qr-code'">
                    <img :src="getAssetURL('qrcode.jpg')" class="tw-w-32 tw-h-32 tw-block" />

                    <span class="tw-text-sm tw-text-gray-500">就等你了哟~</span>
                </div>
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
