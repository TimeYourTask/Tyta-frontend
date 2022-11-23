module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',

    'plugin:react/recommended',
    'react-app',

    'plugin:import/errors',
    'plugin:import/warnings',

    'plugin:prettier/recommended',
    'prettier',

    'airbnb',
  ],
  plugins: ['react', 'jsx-a11y', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'object-curly-newline': 'off',
    'require-yield': 'off',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'no-case-declarations': 'error',
    'require-atomic-updates': 'off',
    'no-prototype-builtins': 'off',
    'max-classes-per-file': 'off',
    'no-trailing-spaces': 'error',
    'array-callback-return': ['error', { allowImplicit: true }],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-useless-escape': 'off',
    'no-restricted-globals': ['error', 'find', 'close', 'name', 'location'],
    'no-unused-expressions': 'error',
    'no-return-await': 'error',
    'object-shorthand': 'error',
    'no-async-promise-executor': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'operator-linebreak': ['error', 'after', { overrides: { '&&': 'after' } }],

    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-wrap-multilines': ['error', { prop: false }],
    'react/jsx-props-no-spreading': 'off',
  },
};
