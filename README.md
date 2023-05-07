# identify-monorepo-root 🌱

[![Version](https://img.shields.io/npm/v/identify-monorepo-root)](https://www.npmjs.com/package/identify-monorepo-root)

Find the root directory of any given monorepo (works with npm, yarn, pnpm, turbo, etc.)

## Install

```
npm install --save identify-monorepo-root
```

Or if you use Yarn:

```
yarn add identify-monorepo-root
```

## Usage

```Typescript
import { identifyMonorepoRoot } from "identify-monorepo-root";

const monorepoRoot: string = identifyMonorepoRoot();
```
