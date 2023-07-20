<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-18 11:25:12
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-20 14:46:04
 * @FilePath: \vue3project\src\pages\user\info.vue
 * @Description: 修改个人信息页面
-->
<template>
    <div class="tw-text-center tw-bg-slate-500 tw-h-screen">
        <div class="tw-bg-white tw-w-1/2 tw-rounded-b-lg tw-mx-auto tw-py-5">
            <div
                class="tw-relative tw-inline-block"
                @mouseenter="showMask = !showMask"
                @mouseleave="showMask = !showMask"
            >
                <el-avatar :src="user.userInfo.avatar ? `/api/common/getImage?url=${user.userInfo.avatar}` : ''" :size="80">
                    <el-icon size="30"><UserFilled /></el-icon>
                </el-avatar>

                <el-avatar v-show="showMask" :size="80" class="avatar-mask">
                    <el-upload
                        action="/api/common/uploadFile"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                    >
                        <el-icon size="30"><CameraFilled /></el-icon>
                    </el-upload>
                </el-avatar>
            </div>

            <div class="tw-my-3 tw-flex tw-flex-col tw-items-center tw-text-gray-500">
                <el-tag class="tw-mb-3">Role</el-tag>
                <div class="tw-mb-3 hover:tw-text-gray-400 tw-cursor-pointer">
                    <span class="tw-mr-2">NickName</span>
                    <el-icon><EditPen /></el-icon>
                </div>
                <div class="tw-text-sm hover:tw-text-gray-400 tw-cursor-pointer">
                    <span class="tw-mr-2">这个人什么都没有留下</span>
                    <el-icon><EditPen /></el-icon>
                </div>
            </div>

            <el-form ref="ruleFormRef" :model="form" label-width="120px" class="tw-w-1/2 tw-overflow-hidden tw-mx-auto" :rules="rules">
                <el-form-item label="电话号码" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机号" />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div class="tw-text-center">
                <!-- 这样传递可以在使用 ruleFormRef 时少获取一级 vaule-->
                <el-button type="primary" @click="submit(ruleFormRef)">确认修改</el-button>
                <el-button @click="router.back(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/userStore'
import { ElMessage } from 'element-plus'

const user = useUserStore()
const router = useRouter()

const showMask = ref(false)
const ruleFormRef = ref()

const form = reactive({
    mobile: '',
    email: '',
    sex: 1
})

const rules = reactive({
    mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
})

onMounted(async () => {
    await user.getUserInfo()
})

const submit = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        ElMessage.success('修改成功')
    } catch (e) {}
}

const handleAvatarSuccess = async (response, uploadFile) => {
    user.userInfo.avatar = response.data?.src
}
</script>

<style scoped>
.avatar-mask {
    position: absolute;
    left: 0;
    cursor: pointer;
    background: #000;
    opacity: 0.5;
}
</style>
