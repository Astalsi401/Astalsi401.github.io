const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <DemoFrame src="./frame1/frame1.html" />
          Js:
          <CodeChunkFromFile path="./frame1/image-zoom.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./frame1/image-zoom-normal.scss" lang="scss" />
          Html:
          <CodeChunkFromFile path="./frame1/image-zoom.html" lang="html" />
        </>
      ),
    },
    {
      title: "針對grid進行修改",
      content: (
        <>
          <DemoFrame src="./frame2/frame2.html" />
          Js:
          <CodeChunkFromFile path="./frame2/image-zoom-grid.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./frame2/image-zoom-grid.scss" lang="scss" />
          Html:
          <CodeChunkFromFile path="./frame2/image-zoom-grid.html" lang="html" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
