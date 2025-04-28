import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginPreferArrow from 'eslint-plugin-prefer-arrow';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import storybook from 'eslint-plugin-storybook';
import prettierConfig from 'eslint-config-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: true,
                        tsconfigRootDir: import.meta.dirname,
                    },
                },
            },
            pluginReactConfig,
            ...pluginQuery.configs['flat/recommended'],
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                vitest: true,
                ...globals.browser,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: pluginImport,
            '@typescript-eslint': tsPlugin,
            'prefer-arrow': pluginPreferArrow,
            'unused-imports': pluginUnusedImports,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'import/no-default-export': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                },
            ],
            'no-implicit-coercion': 'error',
            'prefer-template': 'error',
            'prefer-arrow/prefer-arrow-functions': [
                'error',
                {
                    disallowPrototype: true,
                    singleReturnOnly: false,
                    classPropertiesAllowed: false,
                },
            ],

            //typescript
            '@typescript-eslint/strict-boolean-expressions': [
                'warn',
                { allowString: false, allowNumber: false, allowNullableObject: false },
            ],
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/require-array-sort-compare': [
                'error',
                { ignoreStringArrays: true },
            ],

            // react
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/destructuring-assignment': 'error',
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'error',
            'react/jsx-fragments': 'error', // React Fragment の書き方を統一
            'react/jsx-curly-brace-presence': 'error', // Props と children で不要な中括弧を削除
            'react/jsx-no-useless-fragment': 'error', // 不要な React Fragment を削除
            'react/self-closing-comp': 'error', // 子要素がない場合は自己終了タグを使う
            'react/jsx-pascal-case': 'error', // コンポーネント名をパスカルケースに統一
            'react/no-danger': 'error', // dangerouslySetInnerHTML を許可しない
            'react/prop-types': 'off', // Props の型チェックは TS で行う & 誤検知があるため無効化
            'react/jsx-props-no-spreading': 'off',

            //unused-imports
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    ...storybook.configs['flat/recommended'],
    {
        files: ['**/*.stories.@(ts|tsx|js)'],
        rules: {
            'import/no-default-export': 'off',
        },
    },
    prettierConfig
);
