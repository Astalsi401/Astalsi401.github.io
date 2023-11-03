class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <>
            <div className="py-5">
              <div className="loading1">
                <span>
                  <span style={{ "--i": 0 }}>L</span>
                  <span style={{ "--i": 1 }}>o</span>
                  <span style={{ "--i": 2 }}>a</span>
                  <span style={{ "--i": 3 }}>d</span>
                  <span style={{ "--i": 4 }}>i</span>
                  <span style={{ "--i": 5 }}>n</span>
                  <span style={{ "--i": 6 }}>g</span>
                </span>
              </div>
            </div>
            <div className="my-2">
              HTML:
              <CodeChunk code={`<div className="loading1">\n  <span>Loading</span>\n</div>`} lang="html" />
            </div>
            <div className="my-2">
              SCSS:
              <CodeChunkFromFile path="./loadingAnimation1.scss" lang="scss" />
            </div>
          </>
        ),
      },
      {
        title: "",
        content: (
          <>
            <div className="py-5">
              <code>.loading2-1</code>
              <div className="loading2-1">
                <span style={{ "--i": 0 }} />
                <span style={{ "--i": 1 }} />
                <span style={{ "--i": 2 }} />
                <span style={{ "--i": 3 }} />
              </div>
              <code>.loading2-2</code>
              <div className="loading2-2">
                <span style={{ "--i": 0 }} />
                <span style={{ "--i": 1 }} />
                <span style={{ "--i": 2 }} />
                <span style={{ "--i": 3 }} />
              </div>
            </div>
            <div className="my-2">
              HTML:
              <CodeChunk code={`<div class="py-5">\n    <div class="loading2-1">\n        <span style="--i: 0;"></span>\n        <span style="--i: 1;"></span>\n        <span style="--i: 2;"></span>\n        <span style="--i: 3;"></span>\n    </div>\n    <div class="loading2-2">\n        <span style="--i: 0;"></span>\n        <span style="--i: 1;"></span>\n        <span style="--i: 2;"></span>\n        <span style="--i: 3;"></span>\n    </div>\n</div>`} lang="html" />
            </div>
            <div className="my-2">
              SCSS:
              <CodeChunkFromFile path="./loadingAnimation2.scss" lang="scss" />
            </div>
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
