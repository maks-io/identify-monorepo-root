# identify-monorepo-root 🌱

[![Version](https://img.shields.io/npm/v/identify-monorepo-root)](https://www.npmjs.com/package/identify-monorepo-root)

Find the root directory of a monorepo from anywhere inside it.

The package works as a small CLI and as a library. It detects common monorepo root markers such as `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `workspaces`, and `packageManager`.

## Installation

```bash
npm install identify-monorepo-root
```

You can also run it without a global install:

```bash
npx identify-monorepo-root
```

## CLI usage

Run the command from any nested directory inside the repository:

```bash
identify-monorepo-root
```

The CLI prints the detected root path and exits with status code `1` when no root can be identified.

## Library usage

```ts
import { identifyMonorepoRoot } from "identify-monorepo-root";

const monorepoRoot = identifyMonorepoRoot();
```

You may also pass a starting directory explicitly:

```ts
const monorepoRoot = identifyMonorepoRoot("/path/inside/repository");
```

## Development

This repository uses `npm`, not Yarn or pnpm.

Useful commands:

```bash
npm test
npm run build
npm run verify
```

Commits are expected to use conventional commit messages. Local raw `git commit` is blocked by Husky on purpose; use the interactive helper instead:

```bash
npm run commit
```

That helper is intentionally a small local script instead of `commitizen` to avoid extra transitive maintenance and vulnerability surface.

## Release workflow

Releases are automated with `semantic-release` in GitHub Actions.

- CI runs `npm ci` and `npm run verify`.
- Releases run on pushes to `main` or `master`, plus manual workflow dispatch.
- The workflow is designed for protected branches and does not rely on pushing version or changelog commits back to git.
- Git tags, npm releases, and GitHub Releases are the release source of truth.
- Because of that, the `package.json` version committed on `main` can lag behind the latest published version.
- The release workflow is set up for npm Trusted Publishing via GitHub Actions OIDC. No long-lived `NPM_TOKEN` should be required once the npm package is configured for trusted publishing.

You can preview the release process locally with:

```bash
npm run release:dry-run
```
