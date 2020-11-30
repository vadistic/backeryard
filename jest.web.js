module.exports = {
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/test/web', '<rootDir>/components', '<rootDir>/pages', '<rootDir>/ui'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.graphql?$': ['graphql-let/jestTransformer', { subsequentTransformer: 'babel-jest' }],
    '\\.graphqls$': 'jest-transform-graphql',
  },
}
