<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-01 16:27:51
 * @FilePath: \vue3project\src\App.vue
 * @Description:
-->
<template>
    <div class="tw-flex tw-flex-col tw-items-center">
        <div>
            <router-link to="/">响应式数据及Vue3基础学习</router-link> |
            <router-link to="/vuexPractice">Vuex学习</router-link>
        </div>
        <router-view />
    </div>
</template>
