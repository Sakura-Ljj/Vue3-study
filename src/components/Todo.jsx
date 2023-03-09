/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-03-07 16:53:37
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-08 15:41:32
 * @FilePath: \vue3project\src\components\Todo.jsx
 * @Description:
 */
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    setup () {
        const data = reactive({
            title: '',
            todo: [
                {
                    title: '吃饭',
                    done: true
                },
                {
                    title: '睡觉',
                    done: false
                },
                {
                    title: '打豆豆',
                    done: false
                }
            ]
        })
        const addTodo = () => {
            if (!data.title) return
            data.todo.push({ title: data.title, done: false })
            data.title = ''
        }
        return () =>
            <div>
                <input type="text" vModel={data.title} />
                <button onClick={addTodo}>添加</button>
                <ul>
                    {
                        data.todo.length
                            ? data.todo.map(item => {
                                return <li>
                                    <input type="checkbox" vModel={item.done} />
                                    <span>{item.title}</span>
                                </li>
                            })
                            : <li>no Data</li>
                    }
                </ul>
            </div>
    }
})
