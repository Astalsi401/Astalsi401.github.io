const Content = () => {
  const sections = [
    {
      title: "how to make an arc in span in css?",
      content: (
        <>
          OP link:{" "}
          <a href="https://stackoverflow.com/q/77212899" target="_blank">
            https://stackoverflow.com/q/77212899
          </a>
        </>
      ),
    },
    {
      title: "My solution",
      content: (
        <>
          <DemoFrame src="./frame/frame1.html" aspectRatio="8 / 3" />
          html:
          <CodeChunkFromFile path="./frame/arc.html" lang="html" />
          css:
          <CodeChunkFromFile path="./frame/arc.css" lang="scss" />
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};
