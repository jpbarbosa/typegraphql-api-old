import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['build/'],
  setupFilesAfterEnv: ['./src/testUtils/setup.ts'],
};

export default config;
