import { readFile, existsSync } from "fs";

const loadFile = (
  path: string,
  options?: { silent?: boolean }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileExists = existsSync(path);
    if (!fileExists) {
      if (options && options.silent) {
        return resolve("");
      } else {
        return reject(new Error(`File does not exist: "${path}"`));
      }
    }
    readFile(path, (err, fd) => {
      if (err) {
        console.error(`${err.message}`);
        if (options && options.silent) {
          return resolve("");
        } else {
          return reject(new Error(`File read error: "${path}"`));
        }
      }

      resolve(fd.toString());
    });
  });
};
export default {
  loadFile
};
