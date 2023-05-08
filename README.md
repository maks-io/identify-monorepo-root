# identify-monorepo-root 🌱

[![Version](https://img.shields.io/npm/v/identify-monorepo-root)](https://www.npmjs.com/package/identify-monorepo-root)

Find the root directory of any given monorepo (works with npm, yarn, pnpm, turbo, etc.).

Can be used as command line / cli tool, or as classical dependency.

## CLI
### Global install

Via npm:

```bash
npm i -g google-sheets-data-fetcher
```

Via yarn:

```bash
yarn global add identify-monorepo-root
```

### npx
Instead of a global install you can also use it via `npx`:

```bash
npx identify-monorepo-root
```

### Usage

After installation you can use it by running the following command inside any given repository.

```bash
identify-monorepo-root
```

Of course you don't have to necessarily be in the root directory of the repo, otherwise this would defeat this library's purpose 🤓.

## Classical dependency
### Install

```
npm install --save identify-monorepo-root
```

Or if you use Yarn:

```
yarn add identify-monorepo-root
```

### Usage

```Typescript
import { identifyMonorepoRoot } from "identify-monorepo-root";

const monorepoRoot: string = identifyMonorepoRoot();
```
