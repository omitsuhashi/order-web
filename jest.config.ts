import { Config } from 'jest';
import nextJest from 'next/jest';

const createConfig = nextJest({
  dir: './',
});

const jestConfig: Config = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createConfig(jestConfig);
