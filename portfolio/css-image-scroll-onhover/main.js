class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div className="col-md-8 mx-auto shadow-sm">
            <div className="scroll-on-hover"></div>
          </div>
        ),
      },
      {
        title: "",
        content: (
          <div>
            Html:
            <CodeChunk code={`<div class="scroll-on-hover"></div>`} lang="html" />
            Scss:
            <CodeChunkFromFile path="./image-scroll-onhover.scss" lang="scss" />
          </div>
        ),
      },
    ];
  }
  render() {
    return (
      <div>
        {this.section.map((section, i) => (
          <Block key={i} title={section.title} content={section.content} />
        ))}
      </div>
    );
  }
}