<!--
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2023-05-06 16:09:47
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-05-11 19:34:33
 * @FilePath: \vue3project\src\pages\indexPage.vue
 * @Description:
-->
<template>
    <div class="grid" />
    <div class="tw-flex section tw-pt-20 tw-mt-3">
        <div class="tw-flex-1 tw-p-5">
            <img src="../assets/consult.svg" alt="" class="tw-w-14 tw-h-14" />
            <h1 class="tw-my-5">Title title</h1>
            <div class="tw-text-blue-400 tw-mb-3">Tips tips...</div>
            <div class="tw-text-gray-400">Content、content、conent、content...</div>
            <div class="btn-border hover:tw-bg-blue-400 tw-text-gray-800 hover:tw-text-white tw-mt-10">
                <span>触发跳转详情</span>
            </div>
        </div>
        <div class="tw-flex-1">right</div>
    </div>
</template>

<script setup>
</script>
<style scoped>
.section::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid rgba(30,30,30,.3);
    border-radius: 50%;
    top: -12px;
    left: calc(50% - 5px);
}

.grid {
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    left: 50%;
    background-image: linear-gradient(180deg,#b2b2b2,#b2b2b2 2px,transparent 0,transparent 5px);
    background-size: 1px 5px;
}

.btn-border {
    display: inline-block;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 5px;
    padding: 20px 25px;
    cursor: pointer;
}
</style>
