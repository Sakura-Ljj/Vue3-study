/*
 * @Author: DESKTOP-H44236O\Sora 1430008132@qq.com
 * @Date: 2023-06-01 22:08:37
 * @LastEditors: DESKTOP-H44236O\Sora 1430008132@qq.com
 * @LastEditTime: 2023-06-01 23:46:23
 * @FilePath: \Vue3-study\src\utils\importImage.js
 * @Description: 导入图片工具
 */
export const getAssetURL = (image) => {
    // 参数一: 相对路径
    // 参数二: 当前路径的URL
    return new URL(`../assets/images/${image}`, import.meta.url).href
}
