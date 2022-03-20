"use strict";
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': ['off', 'always-multiline'],
        'no-param-reassign': ['error', { props: false }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
        semi: ['error', 'always'],
        indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }],
        camelcase: 'off',
    },
};
