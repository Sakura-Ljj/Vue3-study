/*
 * @Author: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @Date: 2022-12-14 16:40:26
 * @LastEditors: TENCENT\v_jnnjieluo v_jnnjieluo@tencent.com
 * @LastEditTime: 2023-03-13 10:59:16
 * @FilePath: \vue3project\.eslintrc.cjs
 * @Description:
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:vue-scoped-css/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        semi: [2, 'never'], // 禁止尾部使用分号“ ; ”
        'no-var': 'error', // 禁止使用 var
        indent: ['error', 4], // 缩进4格
        'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
        quotes: [2, 'single'], // 使用单引号
        'vue/html-closing-bracket-newline': 'off', // 不强制换行
        // 'vue/singleline-html-element-content-newline': 'off', // 不强制换行
        // 'vue/max-attributes-per-line': ['error', {
        //   singleline: { max: 5 },
        //   multiline: { max: 5 }
        // }], //vue template模板元素第一行最多5个属性
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': [2, 4, { alignAttributesVertically: false }],
        'vue/mustache-interpolation-spacing': [2, 'never'],
        'vue/html-self-closing': [2, { html: { void: 'always' } }],
        'vue/max-attributes-per-line': [2, { singleline: Infinity }],
        'vue/v-on-function-call': 2,

        'vue/array-bracket-spacing': [2, 'never'],
        'vue/arrow-spacing': [2, { before: true, after: true }],
        'vue/block-spacing': [2, 'always'],
        'vue/brace-style': [2, '1tbs', { allowSingleLine: true }],
        'vue/comma-dangle': [2, 'always-multiline'],
        'vue/eqeqeq': [2, 'allow-null'],
        'vue/key-spacing': [2, { beforeColon: false, afterColon: true }],
        'vue/object-curly-spacing': [2, 'always'],
        'vue/space-infix-ops': 2,
        'vue/space-unary-ops': [2, { words: true, nonwords: false }],

        'vue/require-default-prop': 0,
        'vue/require-v-for-key': 0,
        'vue/return-in-computed-property': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue-scoped-css/no-parsing-error': 'off',
        'vue-scoped-css/require-scoped': 'error',
        'vue-scoped-css/no-unused-selector': 'warn'
    // 其它的规则可以去eslint查看，根据自己需要进行添加
    }
}
