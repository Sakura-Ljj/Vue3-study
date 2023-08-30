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

#### Vite中配置process.env.NODE_ENV

**Vite**配置环境变量的方式与**webpack**不同, **webpack**中配置环境变量可以直接在package.json文件的script中直接进行配置, 获取方式也不一样, **Vite**中使用`process.env.NODE_ENV`是获取不到环境变量的, 需要使用`import.meta.env`

在**nodejs**中配置环境变量使用了一个`cross-env`的依赖, 这个依赖可以解决不同的系统环境下配置环境变量方式不同的问题, 使用方法只需要在script中配置对应的启动命令即可

```json
"script": {
    "start:dev": "cross-env NODE_ENV=dev node index.js", // 后面的路径是nodejs的启动文件
    "start": "cross-env NODE_ENV=prod node index.js"
}
// 启动nodejs的时候用对应的命令就可以设置对应的环境变量
```

### Linux服务器搭建Git远程仓库

- 在linux服务器上创建一个用于操作git仓库的用户

```powershell
adduser git 

passwd git // 设置用户密码
```

- 创建GIT仓库

  - 创建一个裸仓库

  ```powershell
  git init --bare test.git 
  
  ## 这样创建的仓库不会生成一个.git文件夹, 原.git文件夹内的东西会直接暴露在test.git文件加中
  ## 这样创建的仓库不会包含工作区, 即不能在这个目录下执行一般使用git的相关命令
  
  ## 这样创建的裸仓库在服务器上是看不到文件信息的, 只会存储提交记录, 但是正常clone这个仓库一样有文件
  ## 如果需要让git与项目分离可以单独创建一个工作区目录然后通过修改git hooks里的post-receive文件指定工作区目录
  
  ## 创建一个工作区目录初始化为本地仓库并与远程裸仓库关联
  
  mkdir test
  cd test
  git init
  git remote add origin ~/test.git
  
  ## post-receive
  vim post-receive
  
  # 指定部署目录
  DIR=~/test
  git --work-tree=${DIR} clean -fd
  # 强制检出
  git --work-tree=${DIR} checkout -f
  
  ## 给予 post-receive 执行权限
  chmod +x post-receive
  ```

  - 直接创建本地仓库`

  ```powershell
  git init test.git 
  
  ## 这样创建的仓库会生成一个本地仓库
  ## 这样创建的仓库可以使用git的相关命令但是在客户端进行push的时候会提示远端的分支没有检出
  ## 这是就需要在远端的git仓库设置一下
  git config receive.denyCurrentBranch ignore
  
  ## 然后远端的仓库也是需要设置一下post-receive文件指定一下工作目录
  vim post-receive
  
  #!/bin/sh
  unset GIT_DIR
  cd..
  git checkout -f
  ```

  - 注意: 第一次提交都需要加上 `-u`  参数

    ```powershell
    git push -u origin master
    ```

### window客户端使用ssh免密远程Linux服务器

- 先在windos客户端生成公钥和私钥
- 然后把公钥文件上传到Linux服务器, 可以使用`scp`命令

```powershell
scp windows文件路径 username@host:Linux服务器接收文件路径
```

- 然后在`~`路径下新建目录`.ssh`并创建文件`authorized_keys`, 并把刚才上传到服务器的公钥追加到文件中

```powershell
cat file1 >> file2
```

- 然后给予`authorized_keys`600权限, 给予`.ssh`文件夹700权限

```powershell
chmod 600 authorized_keys	## 600权限为只有所有者有读和写的权限
chmod 700 .ssh	## 700权限为只有所有者有读和写及执行权限
```

- 然后在root用户下修改SSH配置文件

```powershell
vim /etc/ssh/sshd_config

## 如果没有就添加以下三条语句, 如果被注释了就放开注释
RSAAuthentication yes 
PubkeyAuthentication yes 
AuthorizedKeysFile .ssh/authorized_keys
```

- 最后重启SSH服务

```powershell
sudo service sshd restart
```

### Linux服务器安装配置Redis

- 进入Redis官网获取下载连接, 在Linux服务器中使用`wget`＋连接下载Redis压缩包
- 使用`tar`命令解压Redis压缩包

```powershell
tar -zvxf fileName.tar.gz

## -z 代表tar包被gzip压缩过(后缀是.tar.gz), 所以需要用gzip解压
## -v 代表解压过程显示详细信息
## -x 代表是解压文件操作
## -f 后面跟的是需要解压或压缩的文件名称
```

- 解压后把文件目录放置到`/usr/local`下并重命名为redis

```powershell
mv 解压后文件存放的path /usr/loacl/redis
```

- cd到redis目录下运行`make`命令进行编译
- 输入以下命令进行安装

```powershell
make PREFIX=/usr/loacl/redis install

## PREFIX= 是用与指定安装存放目录, 方便后续删除
## 不指定的话可执行文件会存放在/usr/local/bin
## 库文件会存放在/usr/local/lib
## 配置文件会存放在/usr/local/etc
## 其他资源文件会存放在/usr/local/share
```

- 启动redis

```powershell
./bin/redis-server ./redis-conf &

## & 在启动脚本最后跟 & 操作符可以使脚本在后台运行, 不占用当前控制台窗口
## 也可以在redis-conf文件中把daemonize的属性设置为 yes, 也可以达到上面的效果

## 如果想要在关闭控制台后依旧运行脚本, 可以在启动脚本的命令前加 nohup
nohup ./bin/redis-server ./redis-conf &
```

- 使用`ps`命令查看redis进程是否正在运行

```powershell
ps -aux | grep redis
```

- 本地连接redis服务, 可以使用redis-cli
- 设置redis的密码

```powershell
## 在redis-conf配置文件中找到requirepass配置项, 默认是注释掉的, 需要解开注释然后在后面加上密码即可

## 在redis-cli中可以使用命令查看密码, 设置密码

auth password ## 获取redis-cli权限
config get requirepass ## 获取密码
config set requirepass password ## 设置密码
shutdown ## 关闭redis服务

## ps: 使用命令在redis-cli中设置密码是不会写入到redis-conf配置文件中的, 所以使用redis-conf启动redis的话还是需要修改配置文件

```

### Linux服务器安装配置Nginx

- 先下载安装nginx必须用到的依赖

```powershell
yum -y install gcc-c++ pcre-devel zlib-devel openssl openssl-devel
```

- 去nginx官网复制下载连接, 使用`wget`命令下载压缩包

```powershell
wget nginx下载链接
```

- 解压nginx

```powershell
tar -zxvf nginx
```

- 把nginx目录迁移到`/usr/local`目录下
- 进入nginx目录执行configure文件
- 执行`make`命令
- 执行`make PREFIX=下载目录 install`安装
- 配置环境变量, 全局可以启动nginx

```powershell
## 进入 /etc/profile文件
vim /etc/profile

## 在文件最底部添加以下内容
PATH=$PATH:/usr/local/nginx/sbin
export PATH

## 重新执行 profile文件
source /etc/profile
```

- nginx配置文件

```powershell
## 启动nginx服务
nginx

## 使用配置文件启动nginx服务
nginx -c nginx.conf

## 重启nginx服务
nginx -s reload

## nginx配置文件

server{
	listen 8080; ## 监听监控
	server_name localhost; ## 指定IP或域名
	location /{
		root path ## 项目地址
		index index.html index.htm ## 项目的index页面
	}
	location /api/{
		proxy_pass http://localhost:8000 ## 前端请求转发到这个IP地址上
	}
}
```

### Linux服务器安装配置Mysql

- 先检查自己的Linux系统有个下载过Mysql及相关的内容

```powershell
rpm -qa | grep mysql
rpm -qa | grep mariadb

## 如果存在内容则删除
rpm -n --nodeps xxx
```

- 去Mysql官网获取下载地址, 使用wget下载
- 下载后可以使用`md5sum`命令查看下载的包的MD5与官网的是否一致

```powershell
md5sum package...
```

- 安装Mysql软件包

```powershell
rpm -ivh package...
```

- 安装Mysql

```powershell
yum install mysql-server
```

- 启动Mysql服务

```powershell
systemctl start mysqld

## 检查Mysql服务状态
systemctl status mysqld
```

- 查询Mysql root用户的临时密码

```powershell
grep 'remporary password' /var/log/mysqld.log
```

- 设置Mysql新密码

```powershell
## 初次更改默认密码
mysql_secure_installation

## Mysql密码规则需要强安全性密码(包含8-12个字符, 并且是数字、字母和符号的组合)
```

- 登录Mysql服务器

```powershell
mysql -uroot -pPassword -h localhost
```