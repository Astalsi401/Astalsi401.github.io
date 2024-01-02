const Content = () => {
  const sections = [
    {
      title: "Hover arrows",
      content: (
        <div className="col-12">
          <div class="fp-back center">
            <span></span>
          </div>
        </div>
      ),
    },
    {
      content: (
        <>
          Html:
          <CodeChunk code={`<div class="fp-back center">\n  <span></span>\n</div>`} lang="html" />
          Scss:
          <CodeChunkFromFile path="./css-animations-1.scss" lang="scss" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};
