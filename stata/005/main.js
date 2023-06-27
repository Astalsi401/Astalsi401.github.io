class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <>
            <CodeChunk code={``} lang="stata" />
            <CodeChunk code={``} lang="output" />
          </>
        ),
      },
      {
        title: "",
        content: (
          <>
            <CodeChunk code={``} lang="stata" />
            <CodeChunk code={``} lang="output" />
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}
