/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-25 14:53:54
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-14 18:03:44
 * @FilePath: \vue3project\server\mysql\index.js
 * @Description: mysql 数据库使用的封装
 */

const mysql = require('mysql2/promise')
// 原来的node-mysql插件跟mysql 8.0版本的连接之间有权限问题, 所以更换成了node-mysql2
const databaseConfig = require('./mysqlConfig')

module.exports = async function requestData ({ sql, values }) {
    // 创建数据库连接
    const connection = await mysql.createConnection(databaseConfig)

    // 数据库操作
    const [result = []] = await connection.query(sql, values)

    // 关闭数据库连接
    await connection.end()

    return result
}
