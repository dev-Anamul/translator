module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
