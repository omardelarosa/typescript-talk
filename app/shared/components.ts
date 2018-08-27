export type Component = (props?: object, children?: Component[]) => string;

const FileLinks: Component = ({ files }: { files: string[] }) => {
  const filesHTMLArr = files.map(f => {
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
  return /*html*/ `
    <ul>
        ${filesHTMLArr.join("\n")}
    </ul>
      `;
};

const FileListContainer: Component = () => /*html*/ `
    <div class="file-list-container"></div>
`;

const AppComponent: Component = (props = {}) => /*html*/ `
    <h1>Welcome</h1>
    ${FileListContainer()}
`;

export default {
  AppComponent,
  FileListContainer,
  FileLinks
};
