/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-10 17:17:29
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-10 17:46:45
 * @FilePath: \vue3project\server\utils\crypto.js
 * @Description: 加密解密算法
 */

const crypto = require('crypto')
const iterations = 4096 // 加密迭代次数
const keylen = 64 // 生成密钥长度
const digest = 'sha256' // 加密哈希函数

module.exports = {
    pbkdf2Encrypt: (password) => {
        const salt = crypto.randomBytes(32).toString('hex') // 生成 32 字节的随机数作为盐值
        const result = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)

        return {
            salt,
            result: result.toString('hex')
        }
    },

    pbkdf2Decrypt: (password, salt) => {
        const result = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
        return result.toString('hex')
    }
}
