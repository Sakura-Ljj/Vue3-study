<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-03-02 15:46:58
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-02 15:51:52
 * @FilePath: \vue3project\src\router\grouter\RouterLink.vue
 * @Description:  实现简易的 RouterLink
-->
<template>
    <a :href="`#${props.to}`">
        <slot />
    </a>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    to: { type: String, required: true }
})

</script>
