<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-11 11:50:31
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-17 19:23:45
 * @FilePath: \vue3project\src\pages\login\index.vue
 * @Description: 登录页面
-->
<template>
    <div class="tw-bg-slate-500 tw-h-screen tw-flex tw-justify-center tw-items-center">
        <div class="tw-w-80 tw-bg-white tw-bg-opacity-80 tw-p-5 tw-rounded-md">
            <div class="tw-text-center tw-text-blue-400 tw-mt-3 tw-mb-5 tw-cursor-pointer">LOGO</div>
            <el-form ref="ruleFormRef" :model="form" label-width="80px" label-position="left" :rules="rules" class="tw-mb-7">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" placeholder="输入用户名" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="输入密码" show-password />
                </el-form-item>
            </el-form>
            <div class="tw-text-center">
                <!-- 这样传递可以在使用 ruleFormRef 时少获取一级 vaule-->
                <el-button type="primary" @click="submit(ruleFormRef)">登录</el-button>
                <el-button @click="registerUser(ruleFormRef)">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import userApi from '@api/userApi'
import { useUserStore } from '@store/userStore'
import { ElMessage } from 'element-plus'

const { login, register } = userApi
const user = useUserStore()
const router = useRouter()

const ruleFormRef = ref()

const form = reactive({
    userName: '',
    password: ''
})

const rules = reactive({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submit = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        await login(form)
        ElMessage.success('登录成功')
        await user.getUserInfo()
        router.replace('/indexPage')
    } catch (e) {}
}

const registerUser = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        await register(form)
        ElMessage.success('注册成功')
    } catch (e) {}
}

</script>
