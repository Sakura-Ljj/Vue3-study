<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-18 11:25:12
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-26 19:00:35
 * @FilePath: \vue3project\src\pages\user\info.vue
 * @Description: 修改个人信息页面
-->
<template>
    <div class="tw-bg-slate-500 tw-h-screen">
        <div class="tw-bg-white tw-w-1/4 tw-rounded-b-lg tw-mx-auto tw-py-5 tw-px-10">
            <div :class="[isEdit ? 'tw-text-center' : ['tw-flex', 'tw-justify-between'], 'tw-mb-5']">
                <div :class="isEdit ? '' : ['tw-flex', 'tw-items-center']">
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

                    <div :class="['tw-text-gray-500', isEdit ? '' : 'tw-ml-3']">
                        <div class="tw-mb-2">
                            <span v-show="!isEdit" class="tw-text-lg tw-font-bold tw-mr-2">{{user.userInfo.nickName || 'NickName'}}</span>
                            <el-tag :class="isEdit ? 'tw-mt-2' : ''">{{roleMap[user.userInfo.role] || '普通成员'}}</el-tag>
                        </div>
                        <div v-show="!isEdit" class="tw-text-sm">{{user.userInfo.signature || '这个人什么都没有留下'}}</div>
                    </div>
                </div>

                <div>
                    <el-button v-show="!isEdit" size="small" @click="isEdit = true">修改资料</el-button>
                </div>
            </div>

            <el-form
                ref="ruleFormRef"
                :model="form"
                label-width="100px"
                :class="['tw-w-96', isEdit ? 'tw-mx-auto' : '']"
                :rules="rules"
                label-position="left"
                :show-message="isEdit ? '' : false"
                :hide-required-asterisk="isEdit ? false : true"
            >
                <template v-if="isEdit">
                    <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="form.nickName" placeholder="请输入昵称" />
                    </el-form-item>

                    <el-form-item label="个性签名" prop="signature">
                        <el-input v-model="form.signature" placeholder="请输入个性签名" />
                    </el-form-item>
                </template>

                <el-form-item label="电话号码" prop="mobile">
                    <el-input v-if="isEdit" v-model="form.mobile" placeholder="请输入手机号" />
                    <div v-else>{{user.userInfo.mobile || '- -'}}</div>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-if="isEdit" v-model="form.email" placeholder="请输入邮箱" />
                    <div v-else>{{user.userInfo.email || '- -'}}</div>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-if="isEdit" v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">保密</el-radio>
                    </el-radio-group>
                    <div v-else>{{sexMap[user.userInfo.sex] || '- -'}}</div>
                </el-form-item>
            </el-form>

            <div v-if="isEdit" class="tw-text-center">
                <!-- 这样传递可以在使用 ruleFormRef 时少获取一级 vaule-->
                <el-button type="primary" @click="submit(ruleFormRef)">确认修改</el-button>
                <el-button @click="isEdit = false">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useUserStore } from '@store/userStore'
import { ElMessage } from 'element-plus'
import userApi from '@api/userApi'
import commonConfig from '@utils/commonConfig'

const user = useUserStore()
const { editUser } = userApi
const { roleMap } = commonConfig

const showMask = ref(false)
const ruleFormRef = ref()
const isEdit = ref(false)

const form = reactive({
    nickName: '',
    signature: '',
    mobile: '',
    email: '',
    sex: ''
})

const checkMobile = (rule, value, callback) => {
    if (!value) return callback(new Error('手机号不得为空'))

    if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test(value)) {
        return callback(new Error('手机号格式有误'))
    }

    callback()
}

const rules = reactive({
    nickName: [
        { required: true, message: '昵称不得为空', trigger: 'blur' },
        { max: 16, message: '昵称不得超过16个字符', trigger: 'blur' }
    ],
    signature: [
        { required: true, message: '个性签名不得为空', trigger: 'blur' },
        { max: 64, message: '个性签名不得超过64字符', trigger: 'blur' }
    ],
    mobile: [{ validator: checkMobile, trigger: 'blur' }],
    email: [
        { required: true, message: '邮箱不得为空', trigger: 'blur' },
        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
    ],
    sex: [{ required: true, message: '性别不得为空', trigger: 'change' }]
})

onMounted(async () => {
    const { nickName, signature, mobile, email, sex } = user.userInfo
    form.nickName = nickName
    form.signature = signature
    form.mobile = mobile
    form.email = email
    form.sex = sex
})

const submit = async ruleFormRef => {
    try {
        await ruleFormRef.validate()
        await editUser(form)
        await user.getUserInfo()
        isEdit.value = false
        ElMessage.success('修改成功')
    } catch (e) {}
}

const handleAvatarSuccess = async (response, uploadFile) => {
    user.userInfo.avatar = response.data?.src
}

const sexMap = {
    1: '男',
    2: '女',
    3: '保密'
}
</script>

<style lang="scss" scoped>
.avatar-mask {
    position: absolute;
    left: 0;
    cursor: pointer;
    background: #000;
    opacity: 0.5;
}
</style>
