class: center, middle

# Using TypeScript 3.0 as Your Only Build Tool

---

class: center, middle

## About Me

---

class: center, middle

### I'm Omar Delarosa

---

class: center, top

### I work at Grubhub.

![](http://photos.prnewswire.com/prn/20130820/CG66276LOGO?max=700)

---

class: center, top

### I used to work at Vice

![](https://pmcvariety.files.wordpress.com/2013/10/vice_logo_0.jpg?w=640)

---

class: center, middle

### Used TypeScript extensively at both jobs.

![](https://cdn-images-1.medium.com/max/500/1*rfcuHd_GMkZ7VmyLiRMKGA.png)

---

### Agenda

#### - "Why TypeScript?"

#### - "Cool" Features Overview

#### - Annotated Code Demo

---

class: center, middle

## Why TypeScript?

# 🤔

---

class: center, top

### Haters Gonna Hate

![](https://media.giphy.com/media/10jXAG6N4nw57a/giphy.gif)

---

class: center, middle

### Not everyone needs TypeScript

![](https://media.giphy.com/media/l2YWF3PqWrgndQOyI/giphy.gif)

---

class: center, top

### Flow?

```typescript
TypeScript !== Flow;
```

![](https://sdtimes.com/wp-content/uploads/2014/11/1118.sdt-flow.png)

---

class: center, top

### Keep Using Webpack, Rollup, bundlers

![](https://cdn-images-1.medium.com/max/800/1*rtjClMZ8sq3cLFT9Aq8Xyg.png)

---

class: center, middle

## What Is TypeScript exactly?

---

class: center, middle

### TypeScript is a super set of JavaScript.

```javascript
const TypeScript = Set(["JS", "TypeScript", "ES6"]);
```

---

class: center, middle

### It supports many "new" features of the language often found in proposals or specs

```typescript
const TypeScript = Set([`ES${currentYear}`]);
```

---

class: center, middle

### TypeScript is a compiler

---

class: center, middle

### TypeScript is a compile-time type-checker

---

class: center, middle

### TypeScript is (kinda) opt-in

---

class: center, middle

## How Does TypeScript Help You?

---

class: center, top

### Wrangling Large Projects

## ![](https://qph.fs.quoracdn.net/main-qimg-f8b7d2fd534420e58972b470760d69e0)

---

class: center, top

### Lower Runtime Overhead

![](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/01/1484692637bundle-2.png)

---

class: center, top

### Unviersal Browser/Node Interop

![](https://cdn-images-1.medium.com/max/865/1*01koRbmizHhOodkjtV1vmw.png)

---

class: center, top

### Recommended Reading:

#### [TypeScript: Architectural Overview](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview)

![](https://raw.githubusercontent.com/wiki/Microsoft/TypeScript/images/architecture.png)

---

class: center, middle

## What TypeScript 3.0 Will and Won't Do For You

---
class: center, middle
### TypeScript 3.0 Still Won't ...

---
class: center, top
#### Bundle things

![](https://user-images.githubusercontent.com/24613274/36348958-62c27380-1484-11e8-958b-dfe5df5e838e.gif)

---
class: center, top
#### Minify your code
![](https://media.giphy.com/media/JUh0yTz4h931K/giphy.gif)

---
class: center, top
#### Optimize your bundles
![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/500px-Knapsack.svg.png)

---

class: center, middle

## TypeScript 3.0: The Good Parts

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
## TypeScript "Classic" Features

---
class: top
#### Transpile Edgy JS Features

```javascript
const c = { ...a, ...b }; // Spread

// async / await
const later = async () => {
  const response = await fetch('/someapi');
  return response;
};

// jsx
const MyComponent = (props: ComponentProps) => (
  <div secretMessage={props.message}>
  </div>
)
```
---
class: top
#### Let you add type annotation information to your code.

```typescript
interface Foo {
  message: string,
  someNumber: number;
}

function doubleAndLog(f: Foo): number {
  const double = f.someNumber * 2;
  console.log(double, f.someMessage);
  return double;
}
```

---
class: center, top
#### Enhance the quality of your code editor's code analysis
![](https://code.visualstudio.com/assets/docs/editor/intellisense/intellisense.gif)

---

class: center, middle

## Demo Project Time!

---

### Caveats

#### - Relies on SystemJS Browser-side (Can be Avoided With Webpack, etc)

#### - Not Optimized

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

---

### Sample Project

<iframe src="http://localhost:3000/app" width="640" height="480" frameborder=0></iframe>