import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "src",
  displayName: "ui",
  testMatch: ["**/*.spec.ts", "**/*.spec.tsx"],
};

export default config;
