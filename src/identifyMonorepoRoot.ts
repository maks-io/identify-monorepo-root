import * as path from "path";
import { whoAmINow } from "who-am-i-now";

type Trilean = "true" | "false" | "maybe";

export const identifyMonorepoRoot = (): string | null => {
  const who = whoAmINow();

  if (!who.isServerApp) {
    throw new Error(
      "Library 'identify-monorepo-root' can only be used server side."
    );
  }

  let fs;
  try {
    fs = require("fs");
  } catch (e) {
    // do nothing
  }

  const isMonorepoRootDir = (currentDir: string): Trilean => {
    const files = fs.readdirSync(currentDir);

    // check for a package.json file with certain properties:
    const packageJsonFile = files.find((f) => f === "package.json");
    if (packageJsonFile) {
      const packageJsonContent = fs.readFileSync(
        path.resolve(currentDir, "package.json"),
        "utf-8"
      );
      const packageJson = JSON.parse(packageJsonContent);

      if (
        Array.isArray(packageJson.workspaces) ||
        Array.isArray(packageJson.workspaces?.packages) ||
        packageJson.packageManager
      ) {
        return "true";
      }

      return "maybe";
    }

    // check for existence of pnpm-workspace.yaml file:
    const pnpmWorkspaceFile = files.find((f) => f === "pnpm-workspace.yaml");
    if (pnpmWorkspaceFile) {
      return "true";
    }

    // check for a lerna.json file with certain properties:
    const lernaJsonFile = files.find((f) => f === "lerna.json");
    if (lernaJsonFile) {
      const lernaJsonContent = fs.readFileSync(
        path.resolve(currentDir, "lerna.json"),
        "utf-8"
      );
      const lernaJson = JSON.parse(lernaJsonContent);

      if (Array.isArray(lernaJson.packages)) {
        return "true";
      }
    }

    // check for package manager lock files:
    const lockFile = files.find(
      (f) =>
        f === "pnpm-lock.yaml" || f === "yarn.lock" || f === "package-lock.json"
    );
    if (lockFile) {
      return "true";
    }

    return "false";
  };

  let isRoot: Trilean = "false";
  let lastPossibleRootDir: string | null = null;
  let currentDir = process.cwd() || __dirname;

  while (true) {
    isRoot = isMonorepoRootDir(currentDir);

    if (isRoot === "maybe") {
      lastPossibleRootDir = currentDir;
    } else if (isRoot === "true") {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break; // stop at root directory
    }

    currentDir = parentDir;
  }

  return lastPossibleRootDir;
};
