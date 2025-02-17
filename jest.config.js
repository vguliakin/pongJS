export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/index.js'],
  coverageReporters: ['html', 'text'],
};
