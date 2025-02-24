import { jest } from "@jest/globals";

jest.mock("fs", () => require("memfs"));
