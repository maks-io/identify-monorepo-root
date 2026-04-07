import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { identifyMonorepoRoot } from "./identifyMonorepoRoot";

const makeTempDirectory = (): string =>
  fs.mkdtempSync(path.join(os.tmpdir(), "identify-monorepo-root-"));

const writeJson = (filePath: string, value: unknown): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

describe("identifyMonorepoRoot", () => {
  it("returns the nearest workspace root when a lockfile is present", () => {
    const repoRoot = makeTempDirectory();
    const packageDirectory = path.join(repoRoot, "packages", "demo");

    fs.mkdirSync(packageDirectory, { recursive: true });
    writeJson(path.join(repoRoot, "package.json"), {
      private: true,
      workspaces: ["packages/*"],
    });
    fs.writeFileSync(path.join(repoRoot, "package-lock.json"), "");

    expect(identifyMonorepoRoot(packageDirectory)).toBe(repoRoot);
  });

  it("treats packageManager metadata as a valid root signal", () => {
    const repoRoot = makeTempDirectory();
    const packageDirectory = path.join(repoRoot, "apps", "web");

    fs.mkdirSync(packageDirectory, { recursive: true });
    writeJson(path.join(repoRoot, "package.json"), {
      name: "workspace-root",
      packageManager: "npm@10.9.4",
    });

    expect(identifyMonorepoRoot(packageDirectory)).toBe(repoRoot);
  });

  it("falls back to the nearest directory with package.json when no stronger root marker exists", () => {
    const packageRoot = makeTempDirectory();
    const nestedDirectory = path.join(packageRoot, "src", "nested");

    fs.mkdirSync(nestedDirectory, { recursive: true });
    writeJson(path.join(packageRoot, "package.json"), {
      name: "single-package-project",
    });

    expect(identifyMonorepoRoot(nestedDirectory)).toBe(packageRoot);
  });

  it("returns null when it cannot find a package manifest or lockfile", () => {
    const directory = makeTempDirectory();
    expect(identifyMonorepoRoot(directory)).toBeNull();
  });
});
