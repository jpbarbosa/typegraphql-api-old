import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['build/'],
  setupFilesAfterEnv: ['./src/test-utils/jestSetup.ts'],
};

export default config;
