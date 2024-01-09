const Content = () => {
  const sections = [
    {
      title: "生醫非主管員工薪資",
      content: (
        <>
          <DemoFrame src="./frame1.html" aspectRatio="4 / 2" />
          <CodeChunkFromFile path="./graph/js/非主管員工薪資-plot.js" lang="js" />
        </>
      ),
    },
    {
      title: "上市各類股非主管員工平均薪資",
      content: (
        <>
          <DemoFrame src="./frame2.html" aspectRatio="8 / 7" />
          <CodeChunkFromFile path="./graph/js/非主管員工薪資-bar.js" lang="js" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
