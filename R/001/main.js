class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} language="R"></CodeChunk>
            <CodeChunk code={``} language="output"></CodeChunk>
          </div>
        ),
      },
      {
        title: "",
        content: (
          <div>
            <CodeChunk code={``} language="R"></CodeChunk>
            <CodeChunk code={``} language="output"></CodeChunk>
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
