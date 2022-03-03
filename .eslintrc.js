module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
        // 'prettier/prettier': [
        //     'error',
        //     {
        //         endOfLine: 'auto',
        //     },
        // ],
        'no-unused-vars': ['off'],
        'no-console': 'warn',
        semi: 'error',
    },
};
