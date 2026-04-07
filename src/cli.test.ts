import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const makeTempDirectory = (): string =>
  fs.mkdtempSync(path.join(os.tmpdir(), "identify-monorepo-root-cli-"));

describe("CLI", () => {
  it("prints the detected root path", () => {
    const repoRoot = makeTempDirectory();
    const packageDirectory = path.join(repoRoot, "packages", "demo");

    fs.mkdirSync(packageDirectory, { recursive: true });
    fs.writeFileSync(
      path.join(repoRoot, "package.json"),
      `${JSON.stringify({ private: true, workspaces: ["packages/*"] }, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(repoRoot, "package-lock.json"), "");

    const result = spawnSync("node", [path.join(process.cwd(), "build", "cli.js")], {
      cwd: packageDirectory,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(fs.realpathSync.native(repoRoot));
  });

  it("fails on unknown options", () => {
    const result = spawnSync("node", [path.join(process.cwd(), "build", "cli.js"), "--wat"], {
      encoding: "utf8",
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Unknown option");
  });
});
