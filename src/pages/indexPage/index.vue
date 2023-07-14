<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 16:09:47
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-10 18:02:40
 * @FilePath: \vue3project\src\pages\indexPage\index.vue
 * @Description:
-->
<template>
    <div class="grid" />
    <div v-for="(item, index) in data.page_info" :key="index" class="tw-flex section tw-py-20 tw-my-3">
        <div v-if="item.left.type === 'section'" class="tw-flex-1">
            <Section :page-info="item.left" />
        </div>
        <div v-else class="tw-flex-1 tw-pr-7 tw-relative">
            <img class="img img-left" :src="item.left.url" />
        </div>

        <div v-if="item.right.type === 'section'" class="tw-flex-1">
            <Section :page-info="item.right" />
        </div>
        <div v-else class="tw-flex-1 tw-pl-7 tw-relative">
            <img class="img img-right" :src="item.right.url" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Section from './components/section.vue'
import { getAssetURL } from '@utils/importImage'

const data = reactive({
    page_info: [
        {
            left: {
                type: 'section',
                title: 'Title title',
                tips: 'Tips tips...',
                content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eius molestiae, inventore temporibus amet earum quidem et repudiandae facere aliquam in possimus architecto adipisci voluptatibus optio nobis sed rerum illo.',
                btn_text: '触发跳转详情'
            },
            right: {
                type: 'img',
                url: getAssetURL('content_img_2.png')
            }
        },
        {
            left: {
                type: 'img',
                url: getAssetURL('content_img_1.png')
            },
            right: {
                type: 'section',
                title: 'Title title',
                tips: 'Tips tips...',
                content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste eius molestiae, inventore temporibus amet earum quidem et repudiandae facere aliquam in possimus architecto adipisci voluptatibus optio nobis sed rerum illo.',
                btn_text: '触发跳转详情'
            }
        }
    ]
})
</script>

<style scoped>
.section {
  position: relative;
}

.section::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid rgba(30,30,30,.3);
    background: #fff;
    border-radius: 50%;
    top: -12px;
    left: calc(50% - 5px);
}

.grid::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid rgba(30,30,30,.3);
    border-radius: 50%;
    bottom: -12px;
    left: -5.5px;
}

.grid {
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    left: 50%;
    background-image: linear-gradient(180deg,#b2b2b2,#b2b2b2 2px,transparent 0,transparent 5px);
    background-size: 1px 5px;
}

.img {
  @apply tw-bg-slate-400 tw-h-full tw-w-full tw-absolute;
}

.img-left {
    right: calc(1.75rem / 2 - 1px);
}

.img-right {
    left: calc(1.75rem / 2);
}
</style>
