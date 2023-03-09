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
            <button class="tw-mr-5" @click="add">Add</button>
            <button @click="asyncAdd">Async Add</button>
        </div>
        <div class="tw-text-center">{{count}} * 2 = {{double}}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
// import { useStore } from '../store/gvuex'
import { useStore } from 'vuex'

const { state, commit, getters, dispatch } = useStore()
const count = computed(() => state.count)
const double = computed(() => getters.double)
const add = () => {
    commit('add')
}
const asyncAdd = () => {
    dispatch('asyncAdd')
}
</script>
