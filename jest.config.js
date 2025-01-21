const presets = require("jest-preset-angular/presets");

module.exports = {
  ...presets.createCjsPreset(),
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["/__tests__/test-utils/"],
};
