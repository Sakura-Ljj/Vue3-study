### Vue 3 + Vite

#### 创建项目

```powershell
npm init vite // 初始化项目
npm install // 安装项目依赖
npm run dev // 启动项目
```

#### 编辑Vue 3项目路由

```javascript
import {createRouter, createWebHashHistory} from 'vue-router'

// createWebHashHistory 创建一个带有 hash 历史记录

const routes = [
	{
		path: '/',
		name: 'Home'
		component: () => import('path') // 组件路径
	}
	...
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router;
```

#### 编辑App.vue文件

```vue
<router-link to="/"></router-link> <!-- 用于路由跳转 -->
<router-view></router-view> <!-- 用于显示路由 -->
```

#### 编辑main.js文件

```javascript
import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App) // 创建vue实例

app.use(router) // 使用路由文件

app.mount('#app') // 将 id 为 app 的页面挂在到实例上
```

#### Composition API(组合式API)

##### setup函数

 `setup`是一个专门用于组合式 API 的特殊钩子函数, 要在组件模板中使用响应式状态, 需要在`setup()`函数中定义并返回, 当使用单文件组件时, 可以使用`<script setup>`来取代繁琐的`setup()`函数

##### ref()函数

`ref()`是用于创建响应式数据, 对于`ref()`返回的响应式数据我们需要用`.value`的方式才能获取和修改

```vue
<template>
	<div @click="add">{{ count }}</div>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(0)
const add = () => {
    count.value++
}
</script>
```

##### 计算属性computed()函数

在Vue3中计算属性可以脱离Vue的组件机制单独使用

- 创建一个只读的计算属性

  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)
  
  console.log(plusOne.value) // 2
      
   plusOne.value++ // 报错
  </script>
  ```

- 创建一个可写的计算属性

  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const count = ref(1)
  const plusOne = computed({
      get: () => count.value + 1,
      set: (val) => {
      	count.value = val - 1
  	}
  })
  plusOne.value = 1
  console.log(count.value) // 0
  </script>
  ```

##### watchEffect()函数

`watchEffect()`函数是一个立即执行的一个函数, 同时会响应式的追踪其依赖, 在依赖更改时会重新执行

```vue
<script setup>
import { watchEffect, ref } from 'vue'
const count = ref(0)
watchEffect(() => console.log(count.value)) // 输出 0
count.value++ // 输出 1
</script>
```

##### 组件的数据传递

###### defineProps()函数

用于接收组件外传递的数据, 与`props`选项相同的值

```vue
<Components :foo="test"></Components> 

<script setup>
// 组件内
import { defineProps } from 'vue'
   
 const props = defineProps({
     foo: String,	// 类型限制
 })
</script>
```

###### defineEmits()函数

用于接收组件外传递的自定义方法, 与emits选项相同的值

```vue
<Compoments @change="onChange" @delete="onDelete"></Compoments>

<script setup>
// 组件内
import { defineEmits } from 'vue'
 
 const emits = defineEmits(['change', 'delete'])
 
 onChange() {
     emits('change', num)
 }
    
 onDelete() {
     emits('delete', num)
 }
</script>
```

如果使用`v-model`给组件传递参数则可以省去发出参数改变通知的事件, 通过`update:modelValue`这个emit事件发出通知即可

```vue
<Components v-model="test"></Components>

<script setup>
// 组件内
import { defineProps, defineEmits } from 'vue'

const { modelValue } = defineProps({
    modelValue: String
})

const emits = defineEmits(['update:modelValue'])

onChange() {
    emits('update:modelValue', num)
}
</script>
```

