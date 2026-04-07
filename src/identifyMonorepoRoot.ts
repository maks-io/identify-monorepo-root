import * as fs from "node:fs";
import * as path from "node:path";

const LOCKFILE_NAMES = ["pnpm-lock.yaml", "yarn.lock", "package-lock.json"] as const;
const MONOREPO_MANIFEST_KEYS = [
  "packageManager",
  "workspaces",
  "private",
  "pnpm",
  "turbo",
] as const;

type PackageManifest = {
  private?: boolean;
  workspaces?: unknown;
  packageManager?: unknown;
  pnpm?: unknown;
  turbo?: unknown;
};

const isFilesystemRoot = (directory: string): boolean => {
  const parentDirectory = path.dirname(directory);
  return directory === parentDirectory;
};

const readPackageManifest = (directory: string): PackageManifest | null => {
  const packageJsonPath = path.join(directory, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageManifest;
  } catch {
    return null;
  }
};

const hasLockfile = (directory: string): boolean =>
  LOCKFILE_NAMES.some((lockfileName) => fs.existsSync(path.join(directory, lockfileName)));

const looksLikeMonorepoRoot = (directory: string): boolean => {
  if (hasLockfile(directory)) {
    return true;
  }

  const manifest = readPackageManifest(directory);
  if (!manifest) {
    return false;
  }

  if (manifest.workspaces) {
    return true;
  }

  if (manifest.packageManager || manifest.pnpm || manifest.turbo) {
    return true;
  }

  return Boolean(manifest.private && MONOREPO_MANIFEST_KEYS.some((key) => key in manifest));
};

export const identifyMonorepoRoot = (startDirectory = process.cwd()): string | null => {
  let currentDirectory = path.resolve(startDirectory);
  let lastManifestDirectory: string | null = null;

  while (true) {
    if (looksLikeMonorepoRoot(currentDirectory)) {
      return currentDirectory;
    }

    if (readPackageManifest(currentDirectory)) {
      lastManifestDirectory = currentDirectory;
    }

    if (isFilesystemRoot(currentDirectory)) {
      return lastManifestDirectory;
    }

    currentDirectory = path.dirname(currentDirectory);
  }
};
