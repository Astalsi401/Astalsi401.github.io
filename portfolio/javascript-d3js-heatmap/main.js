const Content = () => {
  const sections = [
    {
      title: "Monthly Global Land-Surface Temperature",
      content: (
        <>
          <DemoFrame src="./frame1.html" />
          <CodeChunkFromFile path="./graph/js/heatmap.js" lang="js" />
        </>
      ),
    },
  ];
  return sections.map((s) => <Block title={s.title} content={s.content} />);
};
