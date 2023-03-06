<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:10:25
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-02 17:26:18
 * @FilePath: \vue3project\src\pages\vue3BasicPractice.vue
 * @Description:
-->

<template>
    <h1>This is Home</h1>
    <Todolist />
    <!-- <Rate :score="score" theme="orange" @updateRate="updateRate"/> -->
    <!-- 使用 v-model 则可以省去传递 updateRate 方法-->
    <Rate v-model="score" theme="orange" />
    <h1>你的评分是{{score}}</h1>
</template>
<script setup>
import { ref } from 'vue'
import Todolist from '../components/todolist.vue'
import Rate from '../components/rate.vue'

const score = ref(3)

// const updateRate = num => {
//     score.value = num
// }
</script>
