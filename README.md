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

#### Vuex

当数据需要多个组件之间共享的时候就需要用到`Vuex`了, `Vuex`就相当于项目中的管家, 集中式的存储并管理应用所有的组件数据，一般用到`Vuex`的场景有用户登录后的基本信息、权限数据等等

##### Vuex的数据存储

```js
// 创建一个index.js文件用于Vuex的数据存储
import { createStore } from 'vuex'

const store = createStore({
    state() { // state里面的是数据
        return {
            count: 0
        }
    },
    mutations: { 
        // mutations里面创建的方法会把state作为参数传进来, 通过state参数就可以完成数据修改
        add(state) {
            store.count++
        }
    }
})

export default store
```

##### 注册Vuex

```js
// 在vue的入口文件main.js中注册vuex就可以在全局使用了
const app = createaApp(app)
app.use(vuex)
	.use(route)
	.mount('#app')
```

##### state的获取 | state的修改(mutations)

```vue
<!-- 在组件内获取和修改store中的数据 -->
<template>
	<div @click="add">
        {{count}}
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const { state, commit } = useStore()
// 获取state中的count
const count = computed(() => state.count)

const add = () => {
    // 使用mutations中的add方法修改count
    commit('add')
}
</script>
```

##### 浅浅实现一个简易Vuex

利用`vue`中的`inject`和`provide`方法, 进实现了`state`及`mutations`

```js
import { inject, reactive } from 'vue'

// 用于获取 store 的标识
const STORE_KEY = '__store__'

// 暴露两个方法 useStore() createStore()
const useStore = () => {
    // 使用 useStore 的时候获取 store
    return inject(STORE_KEY)
}

const createStore = (options) => {
    return new Store(options)
}

// 创建 Store 类
class Store {
    constructor (options) {
        this.$options = options
        this._state = reactive({
            data: options.state()
        })
        this._mutations = options.mutations
    }

    // 读取 state 的时候直接返回响应式数据 _state.data
    get state () {
        return this._state.data
    }

    // 提供 commit 函数用于执行配置好的 mutations
    commit = (type, payload) => {
        const entry = this._mutations[type]
        entry && entry(this.state, payload)
    }

    // 再 main.js 入口处 app.use(store) 的时候会执行这个函数
    install (app) {
        app.provide(STORE_KEY, this)
    }
}
export { useStore, createStore }
```

##### getters

`getters`在`Vuex`中的作用类似与`computed`

```js
import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    getters: {
        double(state) {
            return state.count * 2
        }
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})

export default store
```

在`Vue`件中调用

```vue
<template>
	<div>
		<span>{{count}} * 2 = {{double}}</span>
        <button @click="add">Add</button>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
    
const { state, commit, getters } = useStore()
const count = computed(() => state.count)
const double = computed(() => getters.double)

const add = () => {
    commit('add')
}
</script>
```

##### actions

当数据需要异步修改的时候则把这些逻辑放在`actions`中, 一般是数据是通过接口请求回来进行处理

需要注意的是`actions`并不能直接修改`state`数据, 而是通过`mutations`去修改, 在`actions`中声明的方法都可以在参数中结构出`commit`用于执行`mutations`中的方法, 来对`state`数据进行修改

```js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    getters: {
        double(state) {
            return state.count * 2
        }
    },
    mutations: {
        add(state) {
            state.count++
        }
    },
    actions: {
        asyncAdd({commit}) {
            setTimeout(() => { // 使用setTimeout模拟异步请求
                commit('add')
            },1000)
        }
    }
})
```

在`Vue`组件中使用`dispatch`调用

```vue
<template>
	<div>
		<span>{{count}} * 2 = {{double}}</span>
        <button @click="add">Add</button>
        <button @click="asyncAdd">Async Add</button>
	</div>
</template>

<script setup>
import { computed } from 'vue'
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
```

#### vue-router

- 以前前端的开发模式
  - 以前的前端是不能控制路由的, 需要依赖后端项目的路由系统, 一般前端项目会部署在后端项目的模板里, 当用户访问路由的时候, 就会请求到后端路由系统, 后端路由系统就会匹配对应的模板, 发送给浏览器渲染, 这样的优点是前端开发会相对快速, 缺点是每次切换路由都需要刷新一次页面, 交互体验及性能都不太好
- 现在的前端开发模式
  - 现在的前端可以控制路由, 不在需要依赖后端, 做到了前后端可以单独部署, 及前后端分离, 现在不论是什么URL地址都只渲染一个前端入口文件 index.html, 当用户访问路由时会通过 js 去计算当前路由地址匹配的组件然后进行渲染, 这样就不会每次切换路由都刷新页面, 交互体验大大提升, 这就是**单页面应用程序(SPA, single page application)**应用的雏形

##### 路由模式

- **hash**模式

  - **http://www.xxx.com/#/login**
  - 通过对**hashchange**事件的监听，在**hash**值发生改变时在函数中进行动态的页面切换

  ```js
  window.addEventListener('hashchange', fn)
  ```

- **history**模式

  - **http://www.xxx.com/login/**
  - 随着HTML5的标准发布, 带来了两个API: **pushState** 和 **replaceState**, 通过这两个API改变URL地址, 会触发**popstate**事件，通过监听**popstate**事件, 在通过**pushState** 或 **replaceState** 修改路由时在函数中实现对页面的更新操作

  ```js
  window.addEventListener('popstate', fn)
  ```

##### 浅浅实现一个简易的hash路由

```js
import { ref, inject } from 'vue'
import RouterView from './RouterView.vue'
import RouterLink from './RouterLink.vue'

const ROUTER_KEY = '__router__'

const createRouter = (options) => {
    return new Router(options)
}

const useRouter = () => {
    return inject(ROUTER_KEY)
}

const createWebHashHistory = () => {
    const bindEvents = (fn) => {
        window.addEventListener('hashchange', fn)
    }
    return {
        bindEvents,
        url: window.location.hash.slice(1) || '/' // 当前页面的 url
    }
}

class Router {
    constructor (options) {
        this.history = options.history
        this.routes = options.routes
        this.current = ref(this.history.url)

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1)
        })
    }

    install (app) {
        app.provide(ROUTER_KEY, this)
        app.component('RouterView', RouterView)
        app.component('RouterLink', RouterLink)
    }
}

export { createRouter, useRouter, createWebHashHistory }
```

编写RouterView 和 RouterLink

```vue
<!-- RouterView -->
<template>
    <component :is="comp" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from './index'

const router = useRouter()
// 当hash值发生改变时router.current会改变就会触发computed重新计算从而匹配对应路径的组件渲染
const comp = computed(() => {
    const route = router.routes.find(item => item.path === router.current.value)
    // 因为路由文件中的组件是通过懒加载的方式引入的所以需要 defineAsyncComponent 去进行处理才可以正常显示
    return route ? defineAsyncComponent(route.component) : null
})
</script>
```

```vue
<!-- RouterLink -->
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
```

#### Vue3中的JSX

##### h函数

**h函数**可以创建一个虚拟DOM节点, 可以实现一个动态化场景比较多的需求, 比如动态化需求较大的组件

比如实现一个标签名需要动态处理的场景

```jsx
import { defineComponent, h } from 'vue'
// 使用defineComponent定义一个组件, 组件内部配置props和setup
export default defineComonent({
    const props: {
    	level: {
    		type: Number,
    		required: true
		}
	}
    setup(props, {slots}) {
    	return () => h(
        	'h' + props.level, // 标签名
            {}, // prop 或 attribute
            slots.default() // 子节点
        )
	}
})
```

然后在vue文件中引入

```vue
<template>
<Heading :level="1">
	Hello World
</Heading>
<!-- 显示出来就是 -->
<h1>
	Hello World    
</h1>
</template>

<script setup>
import Heading from '...';
</script>
```

**h函数**可以处理动态性比较高的场景, 但如果场景过于复杂, 写起来会十分繁琐, 需要各种对象的嵌套, **h函数**是返回虚拟DOM, 所以可以换成更方便的**JSX**语法

```jsx
import { defineComponent } from 'vue'

export default defineComponent({
    const props = {
    	level: {
    		type: Number,
    		required: true
		}
	}
    setup(props, {slots}){
        const tag = `h${props.level}`
    	return () => <tag>{slots.default()}</tag>
	}
})
```

##### Vue3中写JSX

需要先安装一个**JSX**的插件, 然后在构建工具vite中进行配置

```js
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [vue(), vuejsx()]
})
```

使用**jsx**实现一个简易的todoList

```jsx
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    setup(){
        const data = reactive({
            title: '',
            todo: [
                {
                    title: '吃饭',
                    done: true
                },
                {
                    title: '睡觉',
                    done: false
                },
                {
                    title: '打豆豆',
                    done: false
                }
            ]
        })
        const addTodo = () => {
            if(!data.title) return
            data.todo.push({ title: data.title, done: false })
            data.title = ''
        }
        return () => 
        	<div>
        		<input type="text" vModel={data.title}/>
            	<button onClick={addTodo}>添加</button>
            	<ul>
            		{
                        data.todo.length
                        	? data.todo.map(item => {
                            	return <li>
                            		<input type="checkbox" vModel={item.done}/>
                                	<span>item.title</span>
                            	</li>
                        	})
                        	: <li>no Data</li>
                    }
            	</ul>
        	</div>
    }
})
```

##### template与JSX的区别

template语法相对于JSX语法来说比较固定, 灵活性没有JSX高, 在需要支持动态性更高的需求的时候, 因为template的语法限制, 就不能更优雅的去支持这种高动态性的需求, JSX还可以在一个文件中返回多个组件, 而template中只能返回一个组件, 但template的优势是对于虚拟DOM的计算优化更好, 在Vue3中template的语法会尽可能高效的利用缓存, 在虚拟DOM计算Diff过程中可以做到更快, 在Vue3中如何选择template和JSX, 大部分时候最优的还是template语法, 只有在一些动态性较高的需求的时候可以尝试使用JSX看看能否更优雅的实现
