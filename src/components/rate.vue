<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-16 11:28:05
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 16:20:45
 * @FilePath: \vue3project\src\components\rate.vue
 * @Description:
-->
<template>
    <div :class="[themeObj[props.theme], 'tw-tw-float-right']">
        <div class="tw-relative tw-inline-block tw-text-lg tw-cursor-pointer">
            <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
            <span class="tw-absolute tw-inline-block tw-inset-0 tw-overflow-hidden" :style="fontWidth">
                <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)" @click="onRate(num)">★</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const themeObj = {
    red: 'tw-text-red',
    orange: 'tw-text-orange-500',
    green: 'tw-text-green-700'
}

/**
 * 使用 v-model 给组件传递参数则可以省去传递接受参数的方法, 可以在外面接收参数
 *
 */

// const { score, theme } = defineProps({
//     score: Number,
//     theme: {type: String, default: 'red'}
// })
const props = defineProps({
    modelValue: Number,
    theme: { type: String, default: 'red' }
})

// const emits = defineEmits('updateRate')

const emits = defineEmits(['update:modelValue'])

// const width = ref(score)
const width = ref(props.modelValue)

const mouseOver = num => {
    width.value = num
}

const onRate = num => {
    // emits('updateRate', num)
    emits('update:modelValue', num)
}

const fontWidth = computed(() => `width: calc(16px * ${width.value});`)

// const rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - score, 10 - score))
</script>
