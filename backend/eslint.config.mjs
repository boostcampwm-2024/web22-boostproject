import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['**/.*'] }, js.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser
    },
    parser: tseslint.parser
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin
  },
  rules: {
    eqeqeq: ['error', 'always'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error']
  }
});
