<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-03-02 11:35:58
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-02 17:29:02
 * @FilePath: \vue3project\src\router\grouter\routerView.vue
 * @Description: 实现简易的 RouterView
-->
<template>
    <component :is="comp" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from './index'

const router = useRouter()
// 当 hash 值发生改变时 router.current 会改变就会触发 computed 重新计算从而匹配对应路径的组件渲染
const comp = computed(() => {
    const route = router.routes.find(item => item.path === router.current.value)
    // 因为路由文件中的组件是通过懒加载的方式引入的所以需要 defineAsyncComponent 去进行处理才可以正常显示
    return route ? defineAsyncComponent(route.component) : null
})
</script>
