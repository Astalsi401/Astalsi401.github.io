const Content = () => {
  const sections = [
    {
      title: "How to add a panel, in Javascript, that resize vertically inside another panel?",
      content: (
        <>
          OP links:
          <br />
          <a href="https://stackoverflow.com/q/77730121" target="_blank">
            https://stackoverflow.com/q/77730121
          </a>
          <br />
          <a href="https://stackoverflow.com/q/77776758" target="_blank">
            https://stackoverflow.com/q/77776758
          </a>
          <br />
          <a href="https://stackoverflow.com/q/77796720" target="_blank">
            https://stackoverflow.com/q/77796720
          </a>
        </>
      ),
    },
    {
      title: "My solution",
      content: (
        <>
          <DemoFrame src="./frame1.html" aspectRatio="16 / 9" />
          html:
          <CodeChunkFromFile path="pane-resize.html" lang="html" />
          css:
          <CodeChunkFromFile path="pane-resize.css" lang="scss" />
          js:
          <CodeChunkFromFile path="pane-resize.js" lang="js" />
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};
