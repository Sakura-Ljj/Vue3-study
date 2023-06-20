/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-09 17:33:44
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-14 11:46:04
 * @FilePath: \vue3project\server\contorller\userContorller.js
 * @Description: 用户相关 CGI
 */
function userLoginApi (event, req, res) {
    const userInfo = {
        user_name: 'ljj',
        sex: '男'
    }
    req.session.userInfo = userInfo
    return userInfo
}

function getUserApi (event, req, res) {
}

module.exports = {
    userLoginApi,
    getUserApi
}
