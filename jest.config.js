const path = require('path')

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ './src/setupTests.js'],
    resetMocks: true,
    moduleDirectories: ['node_modules', path.join(__dirname, 'src/test/setup')],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
        'jest-watch-select-projects',
    ],
    globals: {
        'jest': {
            config: './jsconfig.json'
        }
    }
}