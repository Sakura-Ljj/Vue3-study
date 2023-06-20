/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-09 16:58:03
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-06-09 17:06:42
 * @FilePath: \vue3project\server\config\errorCode.js
 * @Description: 错误状态处理
 */
// 请求参数错误
const REQUEST_PARAMS_ERROR_CODE = 400

// 无权限访问
const NO_AUTH_ERROR_CODE = 401

// 访问被禁止
const FORBIDDEN_ERROR_CODE = 403

// 服务器错误
const SYSTEM_ERROR_CODE = 500

module.exports = {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
    FORBIDDEN_ERROR_CODE,
    SYSTEM_ERROR_CODE
}
