module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest"],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testMatch: ["**/__tests__/**/*.(spec|test).(ts|tsx)"],
};
