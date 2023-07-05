class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: <div className="col-12"></div>,
      },
      {
        title: "",
        content: <></>,
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
