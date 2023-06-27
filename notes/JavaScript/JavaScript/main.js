class Content extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      code1: 'function getgit(owner, repo, path) {\n  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)\n    .then((d) => d.json())\n    .then((d) => fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`))\n    .then((d) => d.json())\n    .then((d) => JSON.parse(atob(d.content)))\n    .then((json) => {\n      console.log(json);\n    });\n}\ngetgit("Astalsi401", "ibmiWork", "test/test.json");',
    };
    this.section = [
      {
        title: "fetch獲取儲存於github的檔案",
        content: (
          <>
            <CodeChunk code={this.data.code1} lang="js" />
            <a href="https://betterprogramming.pub/how-to-fetch-files-from-github-in-javascript-e0ed2c72aeb4">原文</a>
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}
