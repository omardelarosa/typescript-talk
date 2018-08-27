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

const ContentContainer: Component = ({ contents = '' }: { contents?: string }) => contents ? contents : /*html*/`<div>No content</div>`;

const AppComponent: Component = ({ contents = '' }: { contents?: string }) => /*html*/ `
    <div class="wrapper">
        <header class="main-head">
            <a href="/app">Demo Markdown App</a>
        </header>
        <div class="content-wrapper">
            <nav class="main-nav">
                ${FileListContainer()}
            </nav>
            <article class="content">
                ${ContentContainer({ contents })}
            </article>
        </div>
        <footer class="main-footer">The footer</footer>
    </div>
`;

export default {
    AppComponent,
    FileListContainer,
    FileLinks
};
