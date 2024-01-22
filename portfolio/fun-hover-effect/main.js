const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <DemoFrame src="./frame1.html" />
          html:
          <CodeChunkFromFile path="./hover-effect.html" lang="html" />
          css:
          <CodeChunkFromFile path="./hover-effect.css" lang="css" />
          js:
          <CodeChunkFromFile path="./hover-effect.js" lang="js" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
