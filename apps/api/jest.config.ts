import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  displayName: "api",
  testMatch: ["**/*.spec.ts"],
};

export default config;
