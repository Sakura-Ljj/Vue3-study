<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:10:25
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2022-12-16 14:21:01
 * @FilePath: \vue3project\src\pages\Home.vue
 * @Description: 
-->

<template>
    <h1>This is Home</h1>
    <Todolist />
    <Rate :score="score" theme="orange" @updateRate="updateRate"/>
</template>
<script setup>
import { ref } from 'vue';
import Todolist from '../components/todolist.vue';
import Rate from '../components/rate.vue';

const score = ref(3)

const updateRate = num => {
    score.value = num
}
</script>
