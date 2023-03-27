module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    // ../../../../src/test
    "**/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Add this line to support ECMAScript modules
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(.*\\.mjs$))"],
};
