<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-01 15:56:33
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-22 14:10:51
 * @FilePath: \vue3project\src\pages\indexPage\components\section.vue
 * @Description:
-->
<template>
    <div v-if="pageInfo.type === 'section'" class="min-[400px]:tw-w-1/2 tw-px-8 tw-box-border">
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

    <div v-if="pageInfo.type === 'img'" class="min-[400px]:tw-w-1/2 max-[400px]:tw-mb-5 tw-relative tw-h-80">
        <img :class="['img', `min-[400px]:img-${direction}`]" :src="pageInfo.url" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    pageInfo: { type: Object, default: () => {} },
    direction: { type: String }
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
  left: 1px
}
</style>
