const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <DemoFrame src="./frame1.html" />
          <CodeChunkFromFile path="./graph/js/choropleth-map.js" lang="js" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
