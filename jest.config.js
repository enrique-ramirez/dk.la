module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'frontend/src/**/*.js',
    '!frontend/src/**/*.test.js',
    '!frontend/src/app.js',
    '!frontend/src/utils/intl-enzyme.js',
    '!frontend/src/store/schemas/**/*.js',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 91,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
  moduleDirectories: ['node_modules', 'frontend/src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/jest/fileMock.js',
    '^.+\\.(css)$': 'identity-obj-proxy',
  },
  setupTestFrameworkScriptFile: './config/jest/setupTests',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
}
