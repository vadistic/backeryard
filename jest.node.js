module.exports = {
  testEnvironment: 'node',

  roots: ['<rootDir>/test/node', '<rootDir>/services', '<rootDir>/utils'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.graphql?$': ['graphql-let/jestTransformer', { subsequentTransformer: 'babel-jest' }],
    '\\.graphqls$': 'jest-transform-graphql',
  },
  setupFilesAfterEnv: ['<rootDir>/test/node/setup.ts'],
}
