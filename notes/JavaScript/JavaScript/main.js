const Content = () => {
  const sections = [
    {
      title: "fetch獲取儲存於github的檔案",
      content: (
        <>
          <CodeChunkFromFile path={"./JavaScript/fetchFromGithub.js"} lang="js" />
          原文：
          <a href="https://betterprogramming.pub/how-to-fetch-files-from-github-in-javascript-e0ed2c72aeb4" target="_blank">
            How to Fetch Files From GitHub in JavaScript
          </a>
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};
