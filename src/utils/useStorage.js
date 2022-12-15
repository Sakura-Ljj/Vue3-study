/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-15 17:19:30
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2022-12-15 17:47:09
 * @FilePath: \vue3project\src\utils\useStorage.js
 * @Description: 
 */
import { ref, watchEffect } from 'vue';

const useStorage = (name, default_value) => {
    const data = ref(JSON.parse(localStorage.getItem(name)) || default_value)

    watchEffect(() => {
        localStorage.setItem(name, JSON.stringify(data.value))
    })

    return data
}

export { useStorage }