module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'max-len': ['warn', {
      code: 120,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    indent: 'warn',
    'comma-dangle': 'warn',
    'space-in-parens': 'warn',
    'no-multi-spaces': 'warn',
    'key-spacing': 'warn',
    'comma-spacing': 'warn',
    'array-bracket-spacing': 'warn',
    'object-curly-newline': 'warn',
    'object-curly-spacing': 'warn',
    'arrow-body-style': 'warn',
    semi: [
      'warn',
      'never',
    ],
    'no-plusplus': [
      'error',
      { allowForLoopAfterthoughts: true },
    ],
    'arrow-parens': [
      'warn',
      'as-needed',
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxBOF: 0,
      },
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Style imports
          ['^.+\\.css$'],
          // react related packages, other packages
          ['^react', '(\\w-/)*'],
          // Side effect imports, Alias, Relative
          ['^@pages'],
          ['^@components'],
          [
            '^\\u0000',
            '^@assets',
            '^@store',
            '^@router',
            '^@',
            '^\\.',
          ],
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-useless-constructor': 'off',
    'no-shadow': 'off',
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'any', prev: '*', next: ['if', 'for', 'return'] },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'throw',
          'try',
          'while',
          'do',
          'switch',
          'function',
          'multiline-const',
        ],
      },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
    ],
    'class-methods-use-this': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allow: [
          '_id',
        ],
      },
    ],
    camelcase: 'off',
    'no-trailing-spaces': 'warn',
    'no-param-reassign': ['error', { props: false }],

    '@typescript-eslint/type-annotation-spacing': [
      'warn',
      {
        after: true,
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
        },
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    // unnecessary rules https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/no-unstable-nested-components': ['warn', {
      allowAsProps: true,
    }],
    'react/jsx-curly-spacing': 'warn',
    'jsx-quotes': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn', {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
