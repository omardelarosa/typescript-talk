import API from "@app/shared/api.js";

export class BrowserApp {
  public postsURLs: string[];
  public postFileNames: string[];
  constructor() {
    this.setup();
  }

  private async setup(): Promise<void> {
    // Fetch post index metadata
    try {
      const response = await fetch("/posts");
      const json = await response.json();
      const paths = json.files.map(API.strings.getFilePublicPath);
      this.postsURLs = paths;
      this.postFileNames = json.files;
    } catch (err) {
      console.log(err);
      // Giving this a named error
      throw new Error("BrowserApp setup error!");
    }
  }
}

export default BrowserApp;
