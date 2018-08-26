import { POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME } from "./constants";

const getFilePathFromReqPath = (pathStr: string): string => {
  return pathStr.replace(POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME);
};

export default {
  getFilePathFromReqPath
};
