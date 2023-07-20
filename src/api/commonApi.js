/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-07-19 17:37:59
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-07-19 19:19:11
 * @FilePath: \vue3project\src\api\commonApi.js
 * @Description: 工具类相关API
 */

import axios from '@utils/axios'

export default {
    getImage: url => {
        return axios.get(`/common/getImage?url=${url}`)
    }
}
