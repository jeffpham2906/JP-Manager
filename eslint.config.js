import eslintConfigPrettier from 'eslint-config-prettier'
export default [
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'vue/setup-compiler-macros': true,
    },
  },
  eslintConfigPrettier,
]
