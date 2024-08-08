const { defaults } = require('jest-config');

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JavaScript and TypeScript files
  },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  transformIgnorePatterns: ['/node_modules/'], // Transform everything except node_modules
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports if needed
  },
};
