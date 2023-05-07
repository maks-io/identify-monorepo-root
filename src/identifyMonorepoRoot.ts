import * as path from "path";
import whoAmINow from "who-am-i-now";

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

  const isDirRoot = (currentDir: string): Trilean => {
    const files = fs.readdirSync(currentDir);

    // check for package manager lock files:
    const lockFile = files.find(
      (f) =>
        f === "pnpm-lock.yaml" || f === "yarn.lock" || f === "package-lock.json"
    );
    if (lockFile) {
      return "true";
    }

    // check for a package.json file with certain properties:
    const packageJson = files.find((f) => f === "package.json");
    if (packageJson) {
      const packageJsonFile = fs.readFileSync(
        path.resolve(currentDir, "package.json"),
        "utf-8"
      );
      if (packageJsonFile.packageManager) {
        return "true";
      }
      return "maybe";
    }

    return "false";
  };

  let isRoot: Trilean = "false";
  let lastPossibleRootDir: string;
  let currentDir = __dirname;
  while (true) {
    currentDir = path.resolve(currentDir, "..");
    isRoot = isDirRoot(currentDir);
    if (isRoot === "maybe") {
      lastPossibleRootDir = currentDir;
    } else if (isRoot === "true") {
      break;
    }
    if (currentDir === "/") {
      break;
    }
  }

  if (isRoot === "true") {
    return currentDir;
  } else if (lastPossibleRootDir) {
    return lastPossibleRootDir;
  } else {
    return null;
  }
};
