/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-21 11:03:31
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-21 11:18:39
 * @FilePath: \vue3project\src\store\practiceStore.js
 * @Description: Vue3练习相关的全局共享文件
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePractice = defineStore('practice', () => {
    const count = ref(0)

    const double = computed(() => count.value * 2)

    const add = () => {
        count.value++
    }

    const asyncAdd = () => {
        setTimeout(() => {
            add()
        }, 1000)
    }
    return { count, double, add, asyncAdd }
})
