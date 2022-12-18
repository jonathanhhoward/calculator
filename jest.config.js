module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["/__tests__/test-utils/"],
};
