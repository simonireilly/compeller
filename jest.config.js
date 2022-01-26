/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/.*/fixtures/', '<rootDir>/example/*'],
  moduleNameMapper: {
    '^compeller/(.*)$': '<rootDir>/src/$1',
  },
};
