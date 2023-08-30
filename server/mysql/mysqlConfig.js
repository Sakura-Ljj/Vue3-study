/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-25 14:54:09
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-08-30 16:45:24
 * @FilePath: \vue3project\server\mysql\mysqlConfig.js
 * @Description: mysql 数据库配置
 */
const devConfig = {
    host: 'localhost', // 数据库地址
    // prot: '3306', // 数据库端口号
    database: 'is_portal', // 数据库名
    user: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    waitForConnections: true, // 为true时，连接排队等待可用连接。为false将立即抛出错误
    connectionLimit: 10, // 单次可创建最大连接数
    queueLimit: 0, // 连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

const proConfig = {
    host: 'localhost', // 数据库地址
    // prot: '', // 数据库端口号
    database: 'is_portal', // 数据库名
    user: 'root', // 数据库用户名
    password: '5201314Sora!', // 数据库密码
    waitForConnections: true, // 为true时，连接排队等待可用连接。为false将立即抛出错误
    connectionLimit: 10, // 单次可创建最大连接数
    queueLimit: 0, // 连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : proConfig
