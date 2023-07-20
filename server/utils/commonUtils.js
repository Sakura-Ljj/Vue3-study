/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-19 15:12:25
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-19 15:14:52
 * @FilePath: \vue3project\server\utils\commonUtils.js
 * @Description: 常用公共方法
 */

function DateFormat (newDate, format) {
    const date = {
        'M+': newDate.getMonth() + 1,
        'd+': newDate.getDate(),
        'h+': newDate.getHours(),
        'm+': newDate.getMinutes(),
        's+': newDate.getSeconds(),
        'q+': Math.floor((newDate.getMonth() + 3) / 3),
        'S+': newDate.getMilliseconds()
    }

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    for (const k in date) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : (`00${date[k]}`).substr((`${date[k]}`).length))
        }
    }
    return format
}

function myError (errCode, errMessage) {
    return { code: errCode, message: errMessage }
}

module.exports = {
    DateFormat,
    myError
}
