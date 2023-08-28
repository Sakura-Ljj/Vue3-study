<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-02-14 17:55:56
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-07 11:21:32
 * @FilePath: \vue3project\src\components\count.vue
 * @Description:
-->
<template>
    <div>
        <div class="tw-mb-5">
            <button class="tw-mr-5" @click="practice.add">Add</button>
            <button @click="practice.asyncAdd">Async Add</button>
        </div>
        <div class="tw-text-center">{{practice.count}} * 2 = {{practice.double}}</div>
    </div>
</template>

<script setup>
// import { useStore } from '../store/gvuex'
import { usePractice } from '../store/practiceStore'

const practice = usePractice()

</script>
