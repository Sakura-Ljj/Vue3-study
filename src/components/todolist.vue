<template>
    <div>
      <div class="tw-flex tw-text-center tw-text-white">
          <div class="tw-flex-1 tw-mr-5 tw-bg-gray tw-rounded-md">待完成({{ active }})</div>
          <div class="tw-flex-1 tw-bg-gray tw-rounded-md">所有事项({{ all }})</div>
      </div>

      <div>
        <span>输入事项: </span>
        <input type="text" v-model="title" @keydown.enter="addTodo" class="tw-mb-5">
      </div>

      <div class="tw-flex tw-mb-3 tw-justify-around">
          <div>
              <span>全选</span>
              <input type="checkbox" v-model="allDone">
          </div>
          <button @click="clear">清理已完成事项</button>
      </div>

        <ul v-if="todos.length">
          <li v-for="(item, index) in todos" :key="item.key" class="tw-mb-3">
              <input type="checkbox" v-model="item.done" class="tw-mr-3">
              <span :class="{'tw-text-blue-500': item.done}">{{ item.title }}</span>
              <span class="tw-ml-3 tw-font-black tw-text-red tw-cursor-pointer" @click="delTodo(index)">X</span>
          </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStorage } from '../utils/useStorage';

const title = ref("")
const key = ref(0)
const todos = useStorage('todos', [])

const addTodo = () => {
    const addTodo = {
        title: title.value,
        done: false,
        key: key.value++
    }
    todos.value.push(addTodo)
    title.value = ""
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