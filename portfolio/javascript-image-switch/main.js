const Content = () => {
  const sections = [
    {
      title: "1.",
      content: (
        <>
          <DemoFrame src="./frame1/frame1.html" />
          Js:
          <CodeChunkFromFile path="./frame1/image-switch.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./frame1/image-switch.scss" lang="scss" />
          Html:
          <CodeChunkFromFile path="./frame1/image-switch.html" lang="html" />
        </>
      ),
    },
    {
      title: "2.",
      content: (
        <>
          <DemoFrame src="./frame2/frame2.html" />
          Js:
          <CodeChunkFromFile path="./frame2/image-switch2.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./frame2/image-switch2.scss" lang="scss" />
          Html:
          <CodeChunkFromFile path="./frame2/image-switch2.html" lang="html" />
        </>
      ),
    },
  ];
  return sections.map((s) => <Block title={s.title} content={s.content} />);
};
