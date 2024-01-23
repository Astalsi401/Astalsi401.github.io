const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <div class="row">
            <div class="col-sm-8 mx-auto">
              <DemoFrame src="./frame1/frame1.html" />
            </div>
          </div>
          Js:
          <CodeChunkFromFile path="./frame1/image-zoom-onhover.js" lang="js" />
          Scss:
          <CodeChunkFromFile path="./image-zoom-onhover.scss" lang="scss" />
          Html:
          <CodeChunkFromFile path="./frame1/image-zoom-onhover.html" lang="html" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
