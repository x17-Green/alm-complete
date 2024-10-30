import globals from "globals";
import eslintPluginImport from "eslint-plugin-import"; // Updated to use import
import eslintPluginJest from "eslint-plugin-jest"; // Updated to use import

export default [
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
                process: "readonly",
                __dirname: "readonly",
            },
        },
        plugins: {
            import: eslintPluginImport, // Updated to use imported variable
            jest: eslintPluginJest, // Updated to use imported variable
        },
        rules: {
            'max-classes-per-file': 'off',
            'no-underscore-dangle': 'off',
            'no-console': 'off',
            'no-shadow': 'off',
            'no-restricted-syntax': [
                'error',
                'LabeledStatement',
                'WithStatement',
            ],
            'import/no-extraneous-dependencies': 'error',
            'import/prefer-default-export': 'off',
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                },
            ],
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
        },
        ignores: [
            "babel.config.js", // Ignoring specific files
        ],
    },
    {
        files: ['*.test.js', '*.spec.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
];
