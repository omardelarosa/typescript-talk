class: center, middle

# Using TypeScript 3.0 as Your Only Build Tool*

*but only sometimes

---

### About Me

- I'm Omar Delarosa
- I work at Grubhub making food delivery web UIs.
- Before that, I used to work at Vice making publishing web UIs.
- Used TypeScript extensively at both jobs.

---

### Agenda
- "Why TypeScript?"
- Cool Features For Complicated Projects Overview
- Building a brand new TypeScript project
- Integrating TypeScript into an existing project

---
class: center, middle

## Why TypeScript?

---

### First Things First
- TypeScript everywhere isn't the point of TypeScript
- ... but it can be.
- It's not a substitute for vanilla JS.
- ... but it can be.
- Most people didn't get into JS for strong typing (I get it.)
- ... but when its there, it's proverbial "game changer".

---

class: center, middle

## What Is TypeScript exactly?

---

### TypeScript Defined

- TypeScript is a super set of JavaScript.
- It supports many "new" features of the language often found in proposals or specs (i.e. `ES{YYYY}`)
- TypeScript is a compiler
- TypeScript is a type-checker
- TypeScript is (kinda) opt-in

---

### Recommended Reading
- [Architectural Overview](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview)

---

### TypeScript 3.0

- Not a drastic change from earlier version
- Includes a few really awesome features
- Becomes even better at building your code with `--build` flag

---
class: center, middle

## What TypeScript 3.0 Will and Wont Do For You
### (Despite lots of new build helpers)

---

### TypeScript 3.0 Still Wont ...
- Bundle your non-JS assets
- Minify your code
- Optimize your bundles

---

## TypeScript 3.0 Still Will
- Turn your code's `async` / `await`s, `{...{}}`s, etc into to highly comptaible vanilla JS.
- Let you add type annotation information to your code.
- Enhance the quality of your code editor's code analysis

---

class: center, middle

## TypeScript 2.0 to 3.0: The Good Parts
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
declare function bind<T, U extends any[], V>(f: (x: T, ...args: U) => V, x: T): (...args: U) => V;

declare function f3(x: number, y: string, z: boolean): void;

const f2 = bind(f3, 42);  // (y: string, z: boolean) => void
const f1 = bind(f2, "hello");  // (z: boolean) => void
const f0 = bind(f1, true);  // () => void

f3(42, "hello", true);
f2("hello", true);
f1(true);
f0();
```

---

class: center, middle

## v2.0: Golden Oldies

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

### Virtual Directories with `rootDirs`

```typescript
{
  "compilerOptions": {
    "rootDirs": [
      "src/views",
      "generated/templates/views"
    ]
  }
}
```

---

### Wildcard character in module names

Easier importing of none-code resources

```typescript
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
```

---
### Glob Support in `tsconfig.json`

```typescript
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```
---

### Further Reading

- [Wiki: What's New In TypeScript](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript)
-

---
