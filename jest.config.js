/**
 * Set __NEXT_TRAILING_SLASH to configure trailing slashes for tests
 * Temp workaround for https://github.com/vercel/next.js/issues/16094
 */
const { trailingSlash } = require("./next.config");

process.env = { ...process.env, __NEXT_TRAILING_SLASH: trailingSlash };

module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    // "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.module\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/components/$1",

    // Resolve Cannot fine module '#ansi-styles'
    // https://github.com/chalk/chalk/issues/532
    "#(.*)": "<rootDir>/node_modules/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    "\\.md$": "jest-raw-loader",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!unified)/.*$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testEnvironment: "jsdom",
};
