<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 15:49:46
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2022-12-15 10:58:48
 * @FilePath: \vue3project\src\App.vue
 * @Description: 
-->
<template>
  <div class="tw-flex tw-flex-col tw-items-center">
      <div>
          <router-link to="/">首页</router-link> | 
          <router-link to="/about">关于</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>
