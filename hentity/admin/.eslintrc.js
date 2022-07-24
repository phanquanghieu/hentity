module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/no-unresolved': 0,
    'jsx-quotes': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': 0,
    'no-shadow': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-wrap-multilines': 0,
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'comma-dangle': 0,
    'react/button-has-type': 0,
    'no-use-before-define': 0,
    'react/no-array-index-key': 0,
    semi: 0,
  },
}
