module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ['plugin:prettier/recommended'],
  rules: {
    'no-unused-vars': ['off'],
    'no-console': 'warn',
    semi: 'error',
  },
};
