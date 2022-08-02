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
  global: ['hentity'],
  rules: {
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-quotes': 0,
    'implicit-arrow-linebreak': 0,
    'func-names': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'class-methods-use-this': 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'function-paren-newline': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0,
    semi: 0,
  },
}
