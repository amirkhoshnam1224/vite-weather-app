module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(axios)/)"],
  moduleNameMapper: {
    '\\.svg$': 'identity-obj-proxy', // استفاده از identity-obj-proxy برای مدیریت svg ها
  },
};
