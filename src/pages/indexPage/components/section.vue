<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-01 15:56:33
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-19 19:24:02
 * @FilePath: \vue3project\src\pages\indexPage\components\section.vue
 * @Description:
-->
<template>
    <div v-if="pageInfo.type === 'section'" class="tw-flex-1">
        <img src="@assets/icons/consult.svg" alt="" class="tw-w-14 tw-h-14" />
        <h1 class="tw-my-5">{{props.pageInfo.title}}</h1>
        <div class="tw-text-blue-400 tw-mb-3">{{props.pageInfo.tips}}</div>
        <div class="tw-text-gray-400">{{props.pageInfo.content}}</div>
        <div class="btn-border hover:tw-bg-blue-400 tw-text-gray-800 hover:tw-text-white tw-mt-10">
            <div class="tw-flex tw-items-center">
                <Share class="tw-w-8 tw-mr-2" />
                <span>{{props.pageInfo.btn_text}}</span>
            </div>
        </div>
    </div>
    <div v-if="pageInfo.type === 'img'" :class="['tw-flex-1', 'tw-relative', imgClass[direction]]">
        <img :class="['img', `img-${direction}`]" :src="pageInfo.url" />
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
    pageInfo: { type: Object, default: () => {} },
    direction: { type: String }
})

const imgClass = ref({
    left: 'tw-pr-7',
    right: ''
})
</script>

<style scoped>
.btn-border {
    display: inline-block;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 5px;
    height: 40px;
    padding: 10px 25px;
    line-height: 40px;
    cursor: pointer;
}

.img {
  @apply tw-bg-slate-400 tw-h-full tw-w-full tw-absolute;
}

.img-left {
    right: calc(1.75rem / 2 - 1px);
}
</style>
