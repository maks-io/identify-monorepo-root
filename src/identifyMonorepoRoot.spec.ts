import path from "node:path";
import process from "node:process";

import { jest } from "@jest/globals";
import { vol } from "memfs";

import { identifyMonorepoRoot } from "./identifyMonorepoRoot";

jest.mock("who-am-i-now", () => ({
  whoAmINow: () => ({
    isServerApp: true,
  }),
}));

const givenCurrentDir = (currentDir: string) => {
  jest.spyOn(process, "cwd").mockImplementationOnce(() => currentDir);
};

describe("identify monorepo root", () => {
  beforeEach(() => {
    vol.reset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("general", () => {
    test("detects root if inside root dir", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");

      vol.fromJSON({
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
          workspaces: ["apps/*"],
        }),
      });

      givenCurrentDir(rootDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'workspaces' definition", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
          workspaces: ["apps/*"],
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'workspaces' definition with nested path", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui", "react");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "react-ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
          workspaces: ["apps/ui/*"],
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'workspaces.packages' definition", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
          workspaces: {
            packages: ["apps/*"],
          },
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'packageManager' definition", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
          packageManager: "yarn@1.0.0",
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'package.json' existence (lastPossibleRootDir)", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("returns null if failed to detect root", () => {
      const someDir = path.resolve(__dirname);

      vol.fromJSON({
        [path.resolve(someDir, "some.txt")]: "",
      });

      givenCurrentDir(someDir);

      expect(identifyMonorepoRoot()).toBeNull();
    });
  });

  describe("npm", () => {
    test("detects root by 'package-lock.json' existence", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
        [path.resolve(rootDir, "package-lock.json")]: "<some_content>",
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });
  });

  describe("yarn", () => {
    test("detects root by 'yarn.lock' existence", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
        [path.resolve(rootDir, "yarn.lock")]: "<some_content>",
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });
  });

  describe("pnpm", () => {
    test("detects root by 'pnpm-workspace.yaml' existence", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
        [path.resolve(rootDir, "pnpm-workspace.yaml")]: "<some_content>",
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });

    test("detects root by 'pnpm-lock.yaml' existence", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
        [path.resolve(rootDir, "pnpm-lock.yaml")]: "<some_content>",
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });
  });

  describe("lerna", () => {
    test("detects root by 'lerna.json' definition", () => {
      const rootDir = path.resolve(__dirname, "monorepo-root");
      const workspaceDir = path.resolve(rootDir, "apps", "ui");

      vol.fromJSON({
        [path.resolve(workspaceDir, "package.json")]: JSON.stringify({
          name: "ui",
        }),
        [path.resolve(rootDir, "package.json")]: JSON.stringify({
          name: "root",
          private: true,
        }),
        [path.resolve(rootDir, "lerna.json")]: JSON.stringify({
          packages: ["apps/*"],
        }),
      });

      givenCurrentDir(workspaceDir);

      expect(identifyMonorepoRoot()).toBe(rootDir);
    });
  });
});
