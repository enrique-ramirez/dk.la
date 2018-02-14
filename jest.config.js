module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/app.js',
    '!src/utils/intl-enzyme.js',
    '!src/store/schemas/**/*.js',
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
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/jest/fileMock.js',
    '^.+\\.(css)$': 'identity-obj-proxy',
    '^config$': '<rootDir>/config/settings.js',
  },
  setupTestFrameworkScriptFile: './config/jest/setupTests',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
}
