<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-11 11:50:31
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-20 16:37:39
 * @FilePath: \vue3project\src\pages\user\login.vue
 * @Description: 登录页面
-->
<template>
    <div class="tw-h-screen tw-relative">
        <TransitionGroup name="flip-list" tag="div">
            <img
                v-for="(url, index) in carouselList"
                v-show="currIdx === index"
                :key="url"
                :src="getAssetURL(url)"
                class="tw-absolute tw-object-cover tw-w-full tw-h-full"
            />
        </TransitionGroup>

        <div class="login-box">
            <div class="tw-text-center tw-text-blue-400 tw-mt-3 tw-mb-5 tw-cursor-pointer">LOGO</div>
            <el-form
                ref="ruleFormRef"
                :model="form"
                label-width="80px"
                label-position="left"
                :rules="rules"
                class="tw-mb-3 tw-overflow-hidden"
                hide-required-asterisk
            >
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="form.userName" placeholder="账号" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="输入密码" show-password />
                </el-form-item>

                <el-form-item v-if="type === 'register'" label="确认密码" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" placeholder="输入密码" show-password />
                </el-form-item>

                <div v-show="type === 'login'" class="tw-text-xs tw-text-gray-500 tw-cursor-pointer tw-text-right">
                    <span class=" hover:tw-text-blue-400">忘记密码?</span>
                </div>
            </el-form>
            <div class="tw-text-center">
                <!-- 这样传递可以在使用 ruleFormRef 时少获取一级 vaule-->
                <template v-if="type === 'login'">
                    <el-button type="primary" @click="submit(ruleFormRef)">登录</el-button>
                    <el-button @click="toRegister(ruleFormRef)">注册</el-button>
                </template>
                <template v-if="type === 'register'">
                    <el-button type="primary" @click="registerUser(ruleFormRef)">确认注册</el-button>
                    <el-button @click="back(ruleFormRef)">返回登录</el-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import userApi from '@api/userApi'
import { useUserStore } from '@store/userStore'
import { ElMessage } from 'element-plus'
import { getAssetURL } from '@utils/importImage'

const { login, register } = userApi
const user = useUserStore()
const router = useRouter()

const ruleFormRef = ref()
const currIdx = ref(0)
const type = ref('login')

const form = reactive({
    userName: '',
    password: '',
    confirmPassword: ''
})

const confirmPassword = (rule, value, callback) => {
    if (!value) return callback(new Error('确认密码不得为空'))

    if (value !== form.password) return callback(new Error('两次输入的密码不一致'))

    callback()
}

const rules = reactive({
    userName: [{ required: true, message: '用户名不得为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不得为空', trigger: 'blur' }],
    confirmPassword: [{ validator: confirmPassword, trigger: 'blur' }]
})

const carouselList = reactive(['login_carousel_1.png', 'login_carousel_2.png'])

onMounted(() => {
    setInterval(() => {
        if ((currIdx.value + 1) > (carouselList.length - 1)) {
            currIdx.value = 0
            return
        }
        currIdx.value++
    }, 7000)
})

const submit = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        await login(form)
        ElMessage.success('登录成功')
        await user.getUserInfo()
        router.replace('/index/indexPage')
    } catch (e) {}
}

const toRegister = ruleFormRef => {
    ruleFormRef.resetFields()
    type.value = 'register'
}

const registerUser = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        await register(form)
        ElMessage.success('注册成功')
        back()
    } catch (e) {}
}

const back = ruleFormRef => {
    ruleFormRef.resetFields()
    type.value = 'login'
}

</script>

<style scoped>
.login-box {
    @apply  tw-w-full tw-bg-white tw-bg-opacity-70 tw-py-5 tw-px-10 tw-rounded-md tw-box-border min-[400px]:tw-w-96;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.flip-list-move{
    transition: transform 2s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 2s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
}
</style>
