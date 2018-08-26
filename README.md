# TypeScript Composite Project

## Goals

- use TypeScript as the primary build tool
- Avoid `webpack`, `rollup` and other bundling tools
- share common libraries across server and client
- render markup in environment agnostic ways.

## File Structure

| **path**    | **description**        |
| ----------- | ---------------------- |
| `lib/`      | Untranspiled JS        |
| `dist/`     | Build output           |
| `app/`      | TypeScript source code |
| `markdown/` | Sample markdown docs   |
| `config/`   | configuration files    |

## Tasks

| **name**            | **description**                                       |
| ------------------- | ----------------------------------------------------- |
| `start`             | starts server                                         |
| `dev`               | starts `server:watch` and `build:watch` concurrently. |
| `dev:debug`         | Same as `dev` but more `---verbose`                   |
| `server`            | starts server                                         |
| `server:watch`      | starts server with nodemon                            |
| `build`             | cleans and fully rebuilds                             |
| `build:watch`       | lazy-builds on file changes                           |
| `build:watch:debug` | same as `build:watch` but more `--verbose`            |
| `clean`             | blows away `dist/`                                    |

## TypeScript 3.0 Feature Highlights

### Path Mapping

Sometimes modules are not directly located under baseUrl. Loaders use a mapping configuration to map module names to files at run-time.

The TypeScript compiler supports the declaration of such mappings using `"paths"` property in `tsconfig.json` files.

```json
{
  "compilerOptions": {
    "baseUrl": "./node_modules",
    "paths": {
      "jquery": ["jquery/dist/jquery.slim.min"]
    }
}
```

### `tsconfig` composition

Using a project-level tsconfig to "compose" sub-project programs.

```bash
project/
├── app/
│    ├── browser
│    │   └── tsconfig.json
│    ├── server
│    │   └── tsconfig.json
│    └── shared
│        └── tsconfig.json
└── tsconfig.json
```

### `tsconfig` 's brand new `composite: true`

Allow smart "references" to subprojects.

```json
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./app/browser"
    }
  ]
}
```

### `tsconfig` inheritance

Use a shared base, override individual options

```json
{
  "extends": "../configs/tsconfig.base",
  "compilerOptions": {
    "module": "es6"
  }
}
```

### `tsc` as entry to build scripts

`tsc` is the primary node compilation tool used in the `npm` scripts:

```json
    "build": "npm run clean && ./node_modules/.bin/tsc --build",
    "build:watch": "./node_modules/.bin/tsc --build --watch",
    "build:watch:debug": "./node_modules/.bin/tsc --build --watch --verbose",
```
