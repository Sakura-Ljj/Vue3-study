/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-06-05 19:27:58
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-09-04 15:16:31
 * @FilePath: \vue3project\server\utils\setRoute.js
 * @Description: 全局路由配置
 */

const errorCode = require('../config/errorCode')
const { myError, DateFormat } = require('../utils/commonUtils')

const setRoute = (method, handlerFunc, isCheckSession = false) => {
    const handle = async (req, res) => {
        const dateTime = DateFormat(new Date(), 'YYYY-MM-dd hh:mm:ss')
        // 过滤 IP
        const requestClientIp = getClientIp(req)
        if (!requestClientIp) throw myError(errorCode.FORBIDDEN_ERROR_CODE, '无权限访问')

        // 是否检测登录态
        if (isCheckSession && !req.session.userInfo) throw myError(errorCode.FORBIDDEN_ERROR_CODE, '登录信息已失效')

        // 暂时只有 GET 和 POST 请求先这样处理着
        let event
        if (method === 'get') {
            event = req.query
        } else {
            event = req.body
        }

        let result
        try {
            const startTime = new Date().getTime()
            let params
            if (event.file) {
                const eventCopy = { ...event }
                eventCopy.file = undefined
                params = JSON.stringify(eventCopy)
            } else {
                params = JSON.stringify(event)
            }
            console.log(`[${dateTime}], req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`)

            result = await handlerFunc(event, req, res)

            // 不需要封装相应结果的接口
            const filterPath = [
                '/api/common/getImage'
            ]

            if (!filterPath.includes(req.path)) {
                // 封装相应结果
                result = {
                    code: 200,
                    msg: 'suc',
                    data: result
                }
            }
            console.log(`[${dateTime}], req end path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}, costTime = ${new Date().getTime() - startTime}`)
        } catch (e) {
            if (e.code) {
                result = {
                    code: e.code,
                    msg: e.message,
                    data: null
                }
            } else {
                result = {
                    code: 500,
                    msg: 'service error',
                    data: null
                }
            }
            console.error(`[${dateTime}], req error path = ${req.path}, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}, err = ${e}`)
        }
        res.send(result)
    }
    return handle
}

function getClientIp (req) {
    if (!req) return ''

    return (
        req.headers['x-forwarded-for'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress ||
        req.id
    )
}

module.exports.setRoute = setRoute
