const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['build/'],
  setupFilesAfterEnv: ['./src/testUtils/setup.ts'],
};

module.exports = config;
