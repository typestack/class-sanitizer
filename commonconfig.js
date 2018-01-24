module.exports = {
  rules: [
    {
      validation: 'camelCase',
      patterns: ['**/*'],
    },
    {
      validation: 'PascalCase',
      patterns: [
        'src/metadata/*.ts',
        'src/Sanitizer.ts',
        'src/SanitizeTypes.ts',
        'src/SanitizerInterface.ts',
      ],
    },
    {
      validation: 'ignore',
      patterns: ['__tests__/*', 'LICENSE', 'README.md'],
    },
  ],
};
