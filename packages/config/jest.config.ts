import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  displayName: "config",
  testMatch: ["**/*.spec.ts"],
};

export default config;
