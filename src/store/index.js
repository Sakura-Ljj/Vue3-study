/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-02-14 17:28:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-02-23 17:47:38
 * @FilePath: \vue3project\src\store\index.js
 * @Description:
 */
import { createStore } from 'vuex'
// import { createStore } from './gvuex'

const store = createStore({
    state () {
        return {
            count: 0
        }
    },

    mutations: {
        add (state) {
            state.count++
        }
    }
})

export default store
