module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-unresolved': 0,
    'jsx-quotes': 0,
    'implicit-arrow-linebreak': 0,
    'func-names': 0,
    semi: 0,
  },
}
