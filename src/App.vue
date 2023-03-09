<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-06 19:25:44
 * @FilePath: \vue3project\src\App.vue
 * @Description:
-->
<template>
    <div>
        <div class="header tw-mb-3">
            <div class="tw-max-w-7xl tw-mx-auto tw-flex tw-items-center tw-justify-between tw-py-3">
                <div class="logo" />
                <ul class="tw-flex">
                    <li
                        v-for="item in data.navBar"
                        :key="item.path"
                        :class="['tw-mr-5', 'tw-cursor-pointer', 'hover:tw-text-blue-400', data.active_path === item.path ? 'tw-text-blue-400' : '']"
                        @click="toPath(item.path)">
                        {{item.text}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="tw-container tw-mx-auto">
            <router-view />
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const data = reactive({
    navBar: [
        {
            text: '响应式数据及Vue3基础学习',
            path: '/'
        },
        {
            text: 'Vuex学习',
            path: '/vuexPractice'
        },
        {
            text: 'Vue中的JSX',
            path: '/vuePracticeJSX'
        }
    ],
    active_path: '/'
})

const toPath = (path) => {
    data.active_path = path
    router.push(path)
}

</script>
<style scoped>
.logo {
    width: 50px;
    height:50px;
    background-color: aquamarine;
}

.header {
    border-bottom: 1px solid #989a9c;
}
</style>
