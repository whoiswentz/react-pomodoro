module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react', 
    'react-hooks', 
    'react-refresh',
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
