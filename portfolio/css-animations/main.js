class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
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
  }
  render() {
    return (
      <>
        {this.section.map((section, i) => (
          <Block key={i} title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}
