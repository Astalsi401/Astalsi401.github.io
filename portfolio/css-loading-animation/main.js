class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <div className="py-5">
              <div className="loading">
                <span>Loading</span>
              </div>
            </div>
            <CodeChunk code={`<div className="loading">\n  <span>Loading</span>\n</div>`} lang="html" />
            <CodeChunkFromFile path="./loadingAnimation.scss" lang="scss" />
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
