class: center, middle

## Using TypeScript 3.0 as Your Only Build Tool

---

### About Me

#### - I'm Omar Delarosa

#### - I work at Grubhub making food delivery web UIs.

#### - Before that, I used to work at Vice making publishing web UIs.

#### - Used TypeScript extensively at both jobs.

---

### Agenda

#### - "Why TypeScript?"

#### - "Cool" Features Overview

#### - Annotated Code Demo

---

class: center, middle

## Why TypeScript?

---

### First Things First

#### - Not everyone needs TypeScript

#### - TypeScript !== Flow

#### - Do not stop using Webpack, Rollup, bundlers

---

class: center, middle

## What Is TypeScript exactly?

---

### TypeScript Defined

#### - TypeScript is a super set of JavaScript.

#### - It supports many "new" features of the language often found in proposals or specs (i.e. `ES{YYYY}`)

#### - TypeScript is a compiler

#### - TypeScript is a type-checker

#### - TypeScript is (kinda) opt-in

---

### How Does TypeScript Help You? (TBD)

#### - Larger codebases that benefit from type annotations and type checking

#### - When you want limited runtime overhead

#### - Browser/Node interop

#### - Recommended Reading [Architectural Overview](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview)

---

### TypeScript 3.0

#### - Not a drastic change from earlier version

#### - Includes a few really awesome features

#### - Becomes even better at building your code with `--build` flag

---

class: center, middle

## What TypeScript 3.0 Will and Wont Do For You

---

### TypeScript 3.0 Still Wont ...

#### - Bundle your non-JS assets like images

#### - Minify your code

#### - Optimize your bundles

---

## TypeScript 3.0 Still Will

#### - Turn your code's `async` / `await`s, `{...{}}`s, etc into to highly comptaible vanilla JS.

#### - Let you add type annotation information to your code.

#### - Enhance the quality of your code editor's code analysis

---

class: center, middle

## TypeScript 3.0: The Good Parts

### TypeScript features that help reduce complexity in larger projects

---

### v3.0: Cool New Stuff

---

### Optional elements in tuple types

Tuple types now permit a ? postfix on element types to indicate that the element is optional

```typescript
let t: [number, string?, boolean?];
t = [42, "hello", true];
t = [42, "hello"];
t = [42];
```

---

### Generic rest parameters

A rest parameter is permitted to have a generic type that is constrained to an array type, and type inference can infer tuple types for such generic rest parameters.

(Nicely typed higher-order functions!)

```typescript
declare function bind<T, U extends any[], V>(
  f: (x: T, ...args: U) => V,
  x: T
): (...args: U) => V;

declare function f3(x: number, y: string, z: boolean): void;

const f2 = bind(f3, 42); // (y: string, z: boolean) => void
const f1 = bind(f2, "hello"); // (z: boolean) => void
const f0 = bind(f1, true); // () => void

f3(42, "hello", true);
f2("hello", true);
f1(true);
f0();
```

---

class: center, middle

## Project demo

### A Thin Markdown CMS

---

class: center, middle

## TypeScript Features To Look out For In This Project

---

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

---

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

---

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

---

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

---

### `tsc` as entry to build scripts

`tsc` is the primary node compilation tool used in the `npm` scripts:

```json
    "build": "npm run clean && ./node_modules/.bin/tsc --build",
    "build:watch": "./node_modules/.bin/tsc --build --watch",
    "build:watch:debug": "./node_modules/.bin/tsc --build --watch --verbose",
```

---

class: center, middle

## About This Project

---

### Caveats

#### - No Webpack, More Boilerplate

#### - Relies on SystemJS Browser-side (Can be Avoided With Webpack)

#### - Build Could Be Faster, More Optimized

#### - Assumes all client/server code is "safe" for the public

#### - Not widely browser compatible

#### - No UI Frameworks (i.e. no React, Angular, Vue, etc);

---

### File Structure

| **path**    | **description**        |
| :---------- | :--------------------- |
| `lib/`      | Untranspiled JS        |
| `dist/`     | Build output           |
| `app/`      | TypeScript source code |
| `markdown/` | Sample markdown docs   |
| `config/`   | configuration files    |

---

### Build Tasks

| **name**            | **description**                                       |
| :------------------ | :---------------------------------------------------- |
| `start`             | starts server                                         |
| `dev`               | starts `server:watch` and `build:watch` concurrently. |
| `dev:debug`         | Same as `dev` but more `---verbose`                   |
| `server`            | starts server                                         |
| `server:watch`      | starts server with nodemon                            |
| `build`             | cleans and fully rebuilds                             |
| `build:watch`       | lazy-builds on file changes                           |
| `build:watch:debug` | same as `build:watch` but more `--verbose`            |
| `clean`             | blows away `dist/`                                    |
