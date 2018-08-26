import { readFileSync } from "fs";

const loadFile = (
  path: string,
  options?: { silent?: boolean }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const fd = readFileSync(path);
      resolve(fd.toString());
    } catch (e) {
      console.error(`${e.message}`);
      if (options && options.silent) {
        resolve("");
      } else {
        reject(new Error(`File read error: "${path}"`));
      }
    }
  });
};
export default {
  loadFile
};
