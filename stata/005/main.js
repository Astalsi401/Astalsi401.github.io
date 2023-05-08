class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} lang="stata" />
            <CodeChunk code={``} lang="output" />
          </div>
        ),
      },
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} lang="stata" />
            <CodeChunk code={``} lang="output" />
          </div>
        ),
      },
    ];
  }
  render() {
    return (
      <div>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </div>
    );
  }
}
