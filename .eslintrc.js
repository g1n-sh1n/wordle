module.exports = {
    root: true,
    env: {
      node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      requireConfigFile: false,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential', // 支持 Vue 3
    ],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
  