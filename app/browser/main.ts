import API from "@app/shared/api.js";

export class BrowserApp {
  public postsURLs: string[];
  public postFileNames: string[];
  constructor() {
    this.setup().then(this.appDidLoad);
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

  public appDidLoad = () => {
    // Show file list
    this.renderFileList();
  };

  public renderFileList() {
    // Show file list
    const fileListContainer = document.querySelector(".file-list-container");

    if (fileListContainer) {
      const fileLinks = this.postsURLs.map(f => {
        return /*html*/ `
          <li>
            <a class="post-link" href="${f}">${f}</a>
            <span class="post-other-links">
              (
              <a class="post-link-md" href="${f}.md">md</a>
              <a class="post-link-json" href="${f}.json">json</a>
              )
            </span>
          </li>
          `;
      });
      fileListContainer.innerHTML = /*html*/ `
        <ul>
          ${fileLinks.join("\n")}
        </ul>
      `;
    }
  }
}

export default BrowserApp;
