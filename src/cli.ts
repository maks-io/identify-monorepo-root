#!/usr/bin/env node
import minimist from "minimist";
import { getHelp } from "./getHelp";
import { identifyMonorepoRoot } from "./identifyMonorepoRoot";

const packageJson = require("../package.json");
const argv = minimist(process.argv.slice(2));

const { h, help, v, version, ...rest } = argv;

const remainingOptions = Object.keys(rest).filter((key) => key !== "_");
if (remainingOptions.length > 0) {
  console.error(`Unknown option '${remainingOptions[0]}'.`);
  console.error(getHelp(true));
  process.exit(1);
}

if (h || help) {
  console.log(getHelp(true));
  process.exit(0);
}

if (v || version) {
  console.log(packageJson.version);
  process.exit(0);
}

const output = identifyMonorepoRoot();
if (output) {
  console.log(output);
  process.exit(0);
}

console.error("Could not identify a monorepo root from the current working directory.");
process.exit(1);
