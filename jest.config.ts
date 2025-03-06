export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                useESM: true // Habilita ES Modules
            }
        ]
    },
    extensionsToTreatAsEsm: [".ts"], // Trata archivos TS como ES Modules
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    }
}
