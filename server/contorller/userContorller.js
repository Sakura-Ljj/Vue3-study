/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-09 17:33:44
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-08-30 17:40:35
 * @FilePath: \vue3project\server\contorller\userContorller.js
 * @Description: 用户相关 CGI
 */
const requestData = require('../mysql')
const { pbkdf2Encrypt, pbkdf2Decrypt } = require('../utils/crypto')
const errorCode = require('../config/errorCode')
const { myError } = require('../utils/commonUtils')

async function userLoginApi ({ userName, password }, req, res) {
    if (!userName || !password) throw myError(errorCode.REQUEST_PARAMS_ERROR_CODE, '参数错误')

    // 利用用户名查询数据库中用户存储的随机盐与密码
    const [{ userPassword, salt, userId, userAccount } = {}] = await requestData({
        sql: 'select userPassword, salt, userId, userAccount from is_user_account where userAccount = ? limit 1',
        values: [userName]
    })

    if (!userAccount) throw myError(errorCode.REQUEST_PARAMS_ERROR_CODE, '用户名不存在')

    const result = pbkdf2Decrypt(password, salt)

    if (userPassword !== result) throw myError(errorCode.REQUEST_PARAMS_ERROR_CODE, '密码错误')

    // 登录成功获取用户信息记录进sesstion
    req.session.userInfo = { userId }
}

function userLogoutApi (event, req) {
    req.session.userInfo = undefined
}

async function userRegisterApi ({ password, userName }) {
    if (!userName || !password) throw myError(errorCode.REQUEST_PARAMS_ERROR_CODE, '参数错误')

    // 查询用户名是否已存在
    const [res] = await requestData({
        sql: 'select userId from is_user_account where userAccount = ? limit 1',
        values: [userName]
    })
    if (res) throw myError(errorCode.REQUEST_PARAMS_ERROR_CODE, '用户名已存在')

    const { result, salt } = pbkdf2Encrypt(password)

    // 把加密后的密码与随机盐存储到数据库
    const insertData = {
        userAccount: userName,
        userPassword: result,
        salt
    }
    const { insertId } = await requestData({
        sql: 'insert into is_user_account set ?',
        values: [insertData]
    })

    await requestData({
        sql: 'insert into is_user_info set ?',
        values: [{ userId: insertId }]
    })
}

async function getUserApi (event, req, res) {
    console.log(req.session.userInfo, '------------')
    if (!req.session.userInfo) return {}

    const { userId } = req.session.userInfo

    return requestData({
        sql: 'select * from is_user_info where userId = ? limit 1',
        values: [userId]
    }).then(res => res[0])
}

async function editUserApi ({ nickName, signature, mobile, email, sex }, req) {
    const updateValue = {
        nickName,
        signature,
        mobile,
        email,
        sex
    }
    const { userInfo } = req.session

    return requestData({
        sql: 'update is_user_info set ? where userId = ? limit 1',
        values: [updateValue, userInfo.userId]
    })
}

module.exports = {
    userLoginApi,
    getUserApi,
    userRegisterApi,
    userLogoutApi,
    editUserApi
}
