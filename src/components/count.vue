<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-02-14 17:55:56
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 17:51:04
 * @FilePath: \vue3project\src\components\count.vue
 * @Description:
-->
<template>
    <div class="tw-mt-5">
        <button @click="add">{{count}}</button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
// import { useStore } from '../store/gvuex'
import { useStore } from 'vuex'

const { state, commit } = useStore()
const count = computed(() => state.count)
const add = () => {
    commit('add')
}
</script>
