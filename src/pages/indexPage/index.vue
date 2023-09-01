<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 16:09:47
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-01 17:47:13
 * @FilePath: \vue3project\src\pages\indexPage\index.vue
 * @Description:
-->
<template>
    <div class="tw-relative tw-mb-10">
        <div class="grid" />
        <div v-for="(item, index) in data.page_info" :key="index" class="tw-flex section tw-py-20 tw-my-3">
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
            <div v-for="(item, index) in data.join_us_info" :key="index" class="join_us_section tw-px-">
                <div class="tw-h-60 tw-bg-gray-600 tw-mb-4" />
                <h1 class="tw-mb-4">{{item.title}}</h1>
                <div class="tw-text-lg tw-text-gray-600">{{item.introduce}}</div>
            </div>
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
    left: -4.5px;
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

.join_us_section {
    width: calc(100% / 3 - 2.5rem);
    text-align: center;
    padding: 0 1.25rem;
    margin-bottom: 2.5rem;
}
</style>
