const Content = () => {
  const sections = [
    {
      title: "SNQ認證地圖",
      content: (
        <>
          <DemoFrame src="./frame1/frame1.html" />
          Js:
          <CodeChunkFromFile path="./frame1/snq-map.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./frame1/snq-map.css" lang="css" />
          Html:
          <CodeChunkFromFile path="./frame1/snq-map.html" lang="html" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
