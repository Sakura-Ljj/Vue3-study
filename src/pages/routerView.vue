<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-08-30 15:05:54
 * @FilePath: \vue3project\src\pages\routerView.vue
 * @Description:
-->
<template>
    <div v-if="pageData.navBar.some(item => item.path === route.path)">
        <div class="header tw-mb-3">
            <div class="tw-max-w-full tw-flex tw-justify-between tw-mx-60">
                <div class="logo tw-text-blue-400 tw-py-2">LOGO</div>
                <ul class="tw-flex">
                    <li
                        v-for="item in pageData.navBar"
                        :key="item.path"
                        :class="['nav-item', route.path === item.path ? 'curr-nav' : '']"
                        @click="toPath(item.path)">
                        {{item.text}}
                    </li>
                </ul>
                <div v-if="!pageData.loading" class="tw-flex tw-items-center">
                    <div v-if="user.userInfo.userId">
                        <el-dropdown>
                            <div class="tw-flex tw-cursor-pointer tw-items-center user-info">
                                <el-avatar :src="user.userInfo.avatar ? `/api/common/getImage?url=${user.userInfo.avatar}` : ''" class="tw-mr-2">
                                    <el-icon size="30"><UserFilled /></el-icon>
                                </el-avatar>
                                <div>{{user.userInfo.nickName || 'NickName'}}</div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item icon="User" @click="toEditUserInfo">查看个人信息</el-dropdown-item>
                                    <el-dropdown-item icon="Lock">更改密码</el-dropdown-item>
                                    <el-dropdown-item divided @click="userLogout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <el-button v-else type="primary" @click="toLogin">登录</el-button>
                </div>
            </div>
        </div>
        <div v-if="route.path.includes('indexPage')" class="carousel">
            <Carousel />
        </div>
        <div class="main">
            <router-view :key="route.fullPath" />
        </div>
    </div>
    <router-view v-else :key="route.fullPath" />
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Carousel from '../components/Carousel.vue'
import { useUserStore } from '../store/userStore'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const pageData = reactive({
    navBar: [
        {
            text: '响应式数据及Vue3基础学习',
            path: '/practice/vue3BasicPractice'
        },
        {
            text: 'Vuex学习',
            path: '/practice/vuexPractice'
        },
        {
            text: 'Vue中的JSX',
            path: '/practice/vuePracticeJSX'
        },
        {
            text: 'IS动漫社模拟官网',
            path: '/index/indexPage'
        }
    ],

    loading: false
})

const toPath = (path) => {
    router.push(path)
}

const toLogin = () => {
    router.push('/user/login')
}

const toEditUserInfo = () => {
    router.push('/user/info')
}

const userLogout = async () => {
    try {
        await ElMessageBox.confirm('确认退出登录?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        })
        await user.userLogout()
        ElMessage.success('成功退出')
    } catch (e) {
        ElMessage.info('成功取消')
    }
}

onMounted(async () => {
    pageData.loading = true
    try {
        await user.getUserInfo()
        pageData.loading = false
    } catch (e) {
        pageData.loading = false
    }
})
</script>
<style scoped>
.logo {
  width: 50px;
  height:50px;
  line-height: 50px;
  cursor: pointer;
}

.header {
  border-bottom: 1px solid #DDE6ED;
  position: sticky;
  top: 0;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.1);
  background: #fff;
  opacity: .95;
  z-index: 999;
}

.nav-item {
  @apply tw-mr-5 tw-cursor-pointer hover:tw-text-blue-400 tw-flex tw-items-center;
}

.curr-nav {
  @apply tw-text-blue-400;
  border-bottom: 2px solid;
}

.carousel {
  @apply tw-m-auto;
  width: 1851px;
}
.main {
  @apply tw-container tw-m-auto;
}

/* element plus 的 dropdown有bug focus-visible的时候会显示一个黑色的外边框 */
.user-info:focus-visible {
outline: unset;
}
</style>
