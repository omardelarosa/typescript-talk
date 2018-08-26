import { POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME } from "./constants";
const EXTENSION_RE = /(\.[a-z0-9]+)$/gi;

const getFilePathFromReqPath = (pathStr: string): string => {
  return pathStr.replace(POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME);
};

const getFileExtension = (pathStr: string): string => {
  const match = pathStr.match(EXTENSION_RE);
  if (match) {
    return match[0];
  }
  return "";
};

const getPathWithoutExtension = (pathStr: string): string => {
  return pathStr.replace(EXTENSION_RE, "");
};

const getFilePublicPath = (pathStr: string): string => {
  return getPathWithoutExtension(
    pathStr.replace(MARKDOWN_DIR_NAME, POSTS_PUBLIC_PATH)
  );
};

export default {
  getFilePathFromReqPath,
  getFileExtension,
  getFilePublicPath,
  getPathWithoutExtension
};
