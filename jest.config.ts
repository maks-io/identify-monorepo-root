import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  ...createDefaultPreset(),
  setupFiles: ["<rootDir>/jest.setup.ts"],
};

export default config;
