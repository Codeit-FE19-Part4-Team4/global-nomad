module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?<emoji>.*?)\s*(?<type>\w+):\s*(?<subject>.+)$/,
      headerCorrespondence: ['emoji', 'type', 'subject'],
    },
  },
  rules: {
    'type-case': [0],
    'subject-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'Init',
        'Feat',
        'Fix',
        'Refactor',
        'Chore'
      ],
    ],
  },
};
