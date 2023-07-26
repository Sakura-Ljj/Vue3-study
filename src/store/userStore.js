/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-17 19:00:44
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-26 15:39:46
 * @FilePath: \vue3project\src\store\userStore.js
 * @Description: 用户信息全局共享文件
 */
import { defineStore } from 'pinia'
import userApi from '../api/userApi'

const { getUserInfo, logout } = userApi

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {}
    }),

    actions: {
        async getUserInfo () {
            const { data = {} } = await getUserInfo()
            this.userInfo = data
        },

        async userLogout () {
            await logout()
            this.userInfo = {}
        }
    }
})
