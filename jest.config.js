export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const roots = ['<rootDir>/tests'];
export const setupFiles = ['<rootDir>/tests/setup.ts'];
export const collectCoverageFrom = ['<rootDir>/src/**/*.ts', '!**/node_modules/**'];