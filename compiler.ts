import { readFileSync } from "fs";
import ts from "typescript";
// const tsconfig = require("./tsconfig.json");
// import { compile } from "./resolver";

interface Update {
  text: string;
  range: number[];
}

const fileNames = process.argv.slice(2);
// compile(fileNames, fileNames);

const rewriteImport = (update: Update): string => {
  const location = update.text.match(/\"\@.*"/g);
  console.log("LOC", location);
  return update.text;
};

export function mjsify(sourceFile: ts.SourceFile) {
  const updates: Update[] = [];
  mjsifyNode(sourceFile);
  // ts.forEachChild(sourceFile);
  // console.log("FILE", sourceFile);

  function mjsifyNode(node: ts.Node) {
    switch (node.kind) {
      // case ts.SyntaxKind.ImportClause:
      case ts.SyntaxKind.ImportDeclaration:
        const text = node.getFullText();
        // console.log("IMPORT STATEMENT", node.getFullText());
        const update = {
          text,
          range: [node.getFullStart(), node.getEnd()]
        };
        updates.push(update);
        break;
      default:
        break;
    }

    ts.forEachChild(node, mjsifyNode);
  }

  return updates;
}

fileNames.forEach(fileName => {
  let sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  // ts.compile;
  // sourceFile.update("hhhh");
  const updates = mjsify(sourceFile);

  updates.forEach(rewriteImport);
});

function compile(fileNames: string[], configpath: string): void {
  const confFile = JSON.parse(readFileSync(configpath).toString());
  // console.log("CONF FILE", confFile);
  const parsedCMDLine = ts.parseJsonConfigFileContent(
    confFile,
    ts.sys,
    process.cwd()
  );
  const options = parsedCMDLine.options;
  // console.log("OPTIONS", options);
  // return;
  let program = ts.createProgram(fileNames, {
    ...options,
    outDir: "dist",
    configFilePath: configpath
  });
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(
        `${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`
      );
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile(process.argv.slice(2), "tsconfig.json");
