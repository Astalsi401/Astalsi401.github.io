class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} language="stata" />
            <CodeChunk code={``} language="output" />
          </div>
        ),
      },
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} language="stata" />
            <CodeChunk code={``} language="output" />
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
