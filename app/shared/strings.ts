import { POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME } from "./constants";

const getFilePathFromReqPath = (pathStr: string): string => {
  return pathStr.replace(POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME);
};

const getFileExtension = (pathStr: string): string => {
  const match = pathStr.match(/(\.[a-z0-9]+)$/gi);
  if (match) {
    return match[0];
  }
  return "";
};

export default {
  getFilePathFromReqPath,
  getFileExtension
};
