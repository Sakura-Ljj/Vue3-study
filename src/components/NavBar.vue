<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-09-18 14:50:05
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-20 16:10:04
 * @FilePath: \vue3project\src\components\Navbar.vue
 * @Description: 导航栏组件
-->
<template>
    <div v-show="clientWidth >= 820" class="header tw-mb-3">
        <div class="tw-max-w-full tw-flex tw-justify-around">
            <div class="logo tw-text-blue-400 tw-py-2">LOGO</div>
            <ul class="tw-flex">
                <li
                    v-for="item in props.navBar"
                    :key="item.path"
                    :class="['nav-item', route.path === item.path ? 'curr-nav' : '']"
                    @click="toPath(item.path)"
                >
                    {{item.text}}
                </li>
            </ul>
            <div v-if="!props.loading" class="tw-flex tw-items-center">
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
    <div v-show="clientWidth < 820">
        <div class="tw-py-2 tw-bg-blue-400 tw-pl-2 tw-flex tw-items-center tw-justify-center tw-relative" @click="drawer = !drawer">
            <el-icon color="#FFFFFF" size="30" class="mobile-drawer-icon"><Menu /></el-icon>
            <span class="tw-text-lg tw-text-white">{{navBar.find(item => item.path === route.path).text}}</span>
        </div>
        <el-drawer
            v-model="drawer"
            direction="ltr"
            size="65%"
            :show-close="false"
            class="tw-relative"
        >
            <template #header>
                <div class="tw-mb-20" />
            </template>
            <div class="mobile-avatar" @click="toLogin">
                <el-avatar :src="user.userInfo.avatar ? `/api/common/getImage?url=${user.userInfo.avatar}` : ''" :size="70" class="tw-mb-3">
                    <el-icon size="40"><UserFilled /></el-icon>
                </el-avatar>
                <div class="tw-text-center">
                    <template v-if="user.userInfo.userId">
                        <div>
                            <span class="tw-mr-2">{{user.userInfo.nickName || 'NickName'}}</span>
                            <el-tag>{{roleMap[user.userInfo.role] || '普通成员'}}</el-tag>
                        </div>
                    </template>
                    <span v-else>未登录</span>
                </div>
            </div>
            <ul>
                <li
                    v-for="item in props.navBar"
                    :key="item.path"
                    :class="['mobile-nav-item', route.path === item.path ? 'mobile-curr-nav' : '']"
                    @click="toPath(item.path)"
                >
                    <span>{{item.text}}</span>
                </li>
            </ul>
        </el-drawer>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store/userStore'
import { ElMessageBox, ElMessage } from 'element-plus'
import commonConfig from '@utils/commonConfig'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const props = defineProps({
    loading: { type: Boolean, default: false },
    navBar: { type: Array, default: () => [] }
})

const { roleMap } = commonConfig

const clientWidth = ref(document.body.clientWidth)
window.addEventListener('resize', () => {
    clientWidth.value = document.body.clientWidth
})

const drawer = ref(false)

const toPath = (path) => {
    router.push(path)
    drawer.value = false
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

.mobile-nav-item {
  @apply tw-py-3 tw-rounded tw-pl-3
}

.mobile-curr-nav {
  @apply tw-bg-blue-400/50 tw-text-white
}

.mobile-drawer-icon {
  position: absolute !important;
  left: 0.5rem !important
}

.mobile-avatar {
  position: absolute;
  top: 20px;
  left: calc(20px + 0.75rem)
}

/* element plus 的 dropdown有bug focus-visible的时候会显示一个黑色的外边框 */
.user-info:focus-visible {
outline: unset;
}
</style>
