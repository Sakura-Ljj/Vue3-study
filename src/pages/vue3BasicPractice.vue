<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:10:25
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-08-28 15:41:48
 * @FilePath: \vue3project\src\pages\vue3BasicPractice.vue
 * @Description:
-->

<template>
    <TodoList />
    <!-- <Rate :score="score" theme="orange" @updateRate="updateRate"/> -->
    <!-- 使用 v-model 则可以省去传递 updateRate 方法-->
    <div class="tw-float-right">
        <Rate v-model="score" theme="orange" />
        <div>服务评分{{score}}星</div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TodoList from '../components/todoList.vue'
import Rate from '../components/Rate.vue'

const score = ref(3)

// const updateRate = num => {
//     score.value = num
// }
</script>
