const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <DemoFrame src="./frame1.html" />
          <CodeChunkFromFile path="./graph/js/treemap.js" lang="js" />
          <CodeChunkFromFile path="./graph/css/treemap.css" lang="css" />
          <CodeChunkFromFile path="./graph/html/treemap.html" lang="html" />
        </>
      ),
    },
  ];
  return sections.map((s) => <Block title={s.title} content={s.content} />);
};
