import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  displayName: 'types',
  testMatch: ['**/*.spec.ts']
};

export default config;
