module.exports = {
  verbose: true,
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(ts|js)',
    '<rootDir>/src/**/?(*.)(test).(ts|js)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/setupBeforeEachTest.ts'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { isolatedModules: true }],
  },
  moduleNameMapper: {
    '@lib(.*)$': '<rootDir>/src/lib/$1',
  },
  testRunner: 'jest-circus/runner',
};
