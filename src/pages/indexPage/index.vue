<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 16:09:47
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-22 11:59:57
 * @FilePath: \vue3project\src\pages\indexPage\index.vue
 * @Description:
-->
<template>
    <div class="tw-relative tw-mb-10">
        <div class="grid max-[400px]:tw-left-5 min-[400px]:tw-left-1/2" />
        <div v-for="(item, index) in data.page_info" :key="index" :class="[isMobile ? ['tw-pb-20', 'tw-mt-5'] : ['tw-flex', 'tw-items-center', 'tw-py-20', 'tw-my-3'], 'section']">
            <Section :page-info="item.left" direction="left" />
            <Section :page-info="item.right" direction="right" />
        </div>
    </div>
    <div>
        <div class="tw-text-center tw-mb-10">
            <h1 class="tw-mb-5 tw-text-5xl">加入我们</h1>
            <h4 class="tw-text-gray-600 tw-text-xl">一个汇集各种二次元元素, 各种亚文化元素, 各种技术人才的温暖大家庭</h4>
        </div>
        <div class="tw-flex tw-flex-wrap">
            <div v-for="(item, index) in data.join_us_info" :key="index" class="join_us_section">
                <div class="tw-h-60 tw-bg-gray-600 tw-mb-4" />
                <h1 class="tw-mb-4">{{item.title}}</h1>
                <div class="tw-text-lg tw-text-gray-600">{{item.introduce}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import Section from './components/section.vue'
import { getAssetURL } from '@utils/importImage'

const isMobile = inject('isMobile')

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
    ],

    join_us_info: [
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        },
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        },
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        },
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        },
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        },
        {
            title: 'Title Title',
            introduce: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur',
            imgUrl: ''
        }
    ]
})

if (isMobile) {
    data.page_info.forEach(item => {
        if (item.right.type === 'img') {
            const section = JSON.parse(JSON.stringify(item.left))
            item.left = JSON.parse(JSON.stringify(item.right))
            item.right = section
        }
    })
}
</script>

<style scoped>
.section {
  position: relative;
}

.grid::after {
    content: '';
    position: absolute;
    width: 11px;
    height: 11px;
    border: 1px solid rgba(30,30,30,.3);
    border-radius: 50%;
    bottom: -12px;
    left: -6px;
}

@media (min-width: 400px) {
  .grid::before {
      content: '';
      position: absolute;
      width: 11px;
      height: 11px;
      border: 1px solid rgba(30,30,30,.3);
      border-radius: 50%;
      top: -12px;
      left: -6px;
  }
}

.grid {
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    background-image: linear-gradient(180deg,#b2b2b2,#b2b2b2 2px,transparent 0,transparent 5px);
    background-size: 1px 5px;
}

.join_us_section {
    @apply min-[400px]:tw-w-1/3;
    text-align: center;
    padding: 0 1.25rem;
    margin-bottom: 2.5rem;
    box-sizing: border-box;
}
</style>
