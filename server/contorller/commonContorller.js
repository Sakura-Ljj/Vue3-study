/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-19 10:35:45
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-04 11:14:48
 * @FilePath: \vue3project\server\contorller\commonContorller.js
 * @Description: 工具类CGI
 */

const { formidable } = require('formidable')
const path = require('path')
const fs = require('fs')
const { DateFormat } = require('../utils/commonUtils')
const requestData = require('../mysql')

const tempDir = path.join(__dirname, '../', 'temp')

/**
 * @description: 上传头像接口
 * @param {Object} event
 * @param {Object} req
 * @return {*}
 */
async function uploadFile (event, req) {
    const { userId } = req.session.userInfo || {}
    const date = DateFormat(new Date(), 'YYYY-MM-dd')
    const tempImgDir = path.join(tempDir, 'image/avatar', date)

    fs.mkdirSync(tempImgDir, { recursive: true })

    const options = {
        uploadDir: tempImgDir, // 上传目录
        keepExtensions: true // 保存文件后缀名
    }
    const form = formidable(options)

    const [, { file = [] }] = await form.parse(req)

    const oldPath = file[0].filepath
    const newName = new Date().getTime().toString() + path.extname(file[0].originalFilename)
    const newPath = path.join(path.dirname(oldPath), newName)

    fs.renameSync(oldPath, newPath)

    const url = `image/avatar/${date}/${newName}`

    // 写入数据库
    await requestData({
        sql: 'update is_user_info set ? where userId = ?',
        values: [{ avatar: url }, userId]
    })

    return { src: url }
}

/**
 * @description: 获取图片接口
 * @param {Object} event
 * @return {*}
 */
function getImage (event) {
    const { url } = event
    const path = `${tempDir}/${url}`
    const data = fs.readFileSync(path)

    return data
}

module.exports = {
    uploadFile,
    getImage
}
