<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 17:33:31
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 16:34:36
 * @FilePath: \vue3project\src\components\todolist.vue
 * @Description:
-->
<template>
    <div>
        <div class="tw-flex tw-text-center tw-text-white">
            <div class="tw-flex-1 tw-mr-5 tw-bg-gray tw-rounded-md">待完成({{active}})</div>
            <div class="tw-flex-1 tw-bg-gray tw-rounded-md">所有事项({{all}})</div>
        </div>

        <div class="tw-mb-5">
            <span>输入事项: </span>
            <input v-model="title" type="text" @keydown.enter="addTodo" />
            <div v-if="showErrMsg" class="tw-text-rose-500 tw-text-center">输入事项不允许为空</div>
        </div>

        <div class="tw-flex tw-mb-3 tw-justify-around">
            <div>
                <span>全选</span>
                <input v-model="allDone" type="checkbox" />
            </div>
            <button @click="clear">清理已完成事项</button>
        </div>

        <ul v-if="todos.length">
            <transition-group name="flip-list" tag="ul">
                <li v-for="(item, index) in todos" :key="item.key" class="tw-mb-3">
                    <input v-model="item.done" type="checkbox" class="tw-mr-3" />
                    <span :class="{ 'tw-text-blue-500': item.done }">{{item.title}}</span>
                    <span class="tw-ml-3 tw-font-black tw-text-red tw-cursor-pointer" @click="delTodo(index)">X</span>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStorage } from '../utils/useStorage'

const title = ref('')
const key = ref(0)
const todos = useStorage('todos', [])
const showErrMsg = ref(false)

const addTodo = () => {
    if (!title.value) {
        if (showErrMsg.value) return
        showErrMsg.value = true
        setTimeout(() => {
            showErrMsg.value = false
        }, 1500)
        return
    }
    const addTodo = {
        title: title.value,
        done: false,
        key: key.value++
    }
    todos.value.push(addTodo)
    title.value = ''
}

const delTodo = (index) => {
    todos.value.splice(index, 1)
}

const clear = () => {
    todos.value = todos.value.filter(item => !item.done)
}

const active = computed(() => todos.value.filter(item => !item.done).length)
const all = computed(() => todos.value.length)
const allDone = computed({
    get: () => !active.value && !!all.value, // checkBox的value一定得是Boolean类型的, 所以需要转换
    set: (val) => {
        todos.value.forEach(item => { item.done = val })
    }
})
</script>

<style scoped>
.flip-list-move{
    transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
