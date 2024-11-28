import {
  checkIfAllTestReposAreReady,
  cleanAllTestRepos,
  exampleRepos,
  getCommandToCdIntoTestRepo,
  getTestDirectory,
  prepareAllTestRepos,
  runChainedCommands,
  updateAllTestRepos,
} from "./testHelpers";

const cliCommand = "identify-monorepo-root";

let testDirectory;

beforeAll(() => {
  testDirectory = getTestDirectory();

  const allTestReposAreReady = checkIfAllTestReposAreReady();

  if (!allTestReposAreReady) {
    console.log("Test repositories are not ready yet...");
    cleanAllTestRepos();
    prepareAllTestRepos();
    console.log("...now they are.");
  } else {
    console.log(
      "Test repositories are ready, let's make sure they are up-to-date..."
    );
    updateAllTestRepos();
    console.log("...now they are.");
  }
});

describe("Tests for the identify-monorepo-root CLI tool", () => {
  describe("Tests targeting the 'npm' repo", () => {
    const npmConfig = exampleRepos.npm;

    describe("Tests targeting the uninstalled repo, without a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "npm",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--uninstalled-without-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "npm",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${npmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--uninstalled-without-lockfile`
        );
      });
    });

    describe("Tests targeting the uninstalled repo, with a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "npm",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--uninstalled-with-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "npm",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${npmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--uninstalled-with-lockfile`
        );
      });
    });

    describe("Tests targeting the installed repo", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("npm", "installed");
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--installed`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("npm", "installed");
        const output = runChainedCommands([
          cdCommand,
          `cd ./${npmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-npm--installed`
        );
      });
    });
  });
  describe("Tests targeting the 'pnpm' repo", () => {
    const pnpmConfig = exampleRepos.pnpm;

    describe("Tests targeting the uninstalled repo, without a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "pnpm",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--uninstalled-without-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "pnpm",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${pnpmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--uninstalled-without-lockfile`
        );
      });
    });

    describe("Tests targeting the uninstalled repo, with a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "pnpm",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--uninstalled-with-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "pnpm",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${pnpmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--uninstalled-with-lockfile`
        );
      });
    });

    describe("Tests targeting the installed repo", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("pnpm", "installed");
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--installed`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("pnpm", "installed");
        const output = runChainedCommands([
          cdCommand,
          `cd ./${pnpmConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-pnpm--installed`
        );
      });
    });
  });
  describe("Tests targeting the 'yarn-berry' repo", () => {
    const yarnBerryConfig = exampleRepos["yarn-berry"];

    describe("Tests targeting the uninstalled repo, without a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-berry",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--uninstalled-without-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-berry",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnBerryConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--uninstalled-without-lockfile`
        );
      });
    });

    describe("Tests targeting the uninstalled repo, with a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-berry",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--uninstalled-with-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-berry",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnBerryConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--uninstalled-with-lockfile`
        );
      });
    });

    describe("Tests targeting the installed repo", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("yarn-berry", "installed");
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--installed`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo("yarn-berry", "installed");
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnBerryConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-berry--installed`
        );
      });
    });
  });
  describe("Tests targeting the 'yarn-classic' repo", () => {
    const yarnClassicConfig = exampleRepos["yarn-classic"];

    describe("Tests targeting the uninstalled repo, without a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--uninstalled-without-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "uninstalled-without-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnClassicConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--uninstalled-without-lockfile`
        );
      });
    });

    describe("Tests targeting the uninstalled repo, with a lockfile", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--uninstalled-with-lockfile`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "uninstalled-with-lockfile"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnClassicConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--uninstalled-with-lockfile`
        );
      });
    });

    describe("Tests targeting the installed repo", () => {
      it("Runs CLI in root directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "installed"
        );
        const output = runChainedCommands([cdCommand, cliCommand]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--installed`
        );
      });
      it("Runs CLI in some random sub directory", () => {
        const cdCommand = getCommandToCdIntoTestRepo(
          "yarn-classic",
          "installed"
        );
        const output = runChainedCommands([
          cdCommand,
          `cd ./${yarnClassicConfig.randomSubDir}`,
          cliCommand,
        ]);
        expect(output).toEqual(
          `${testDirectory}/monorepo-example-yarn-classic--installed`
        );
      });
    });
  });
});
