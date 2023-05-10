class App extends React.Component {
  constructor(props) {
    super(props);
    document.title = this.props.title;
  }
  render() {
    return (
      <div>
        <Header category={this.props.category} />
        <main id="main-content" className={this.props.class}>
          <h1 className="my-5 text-center">{this.props.title}</h1>
          <Content />
        </main>
      </div>
    );
  }
}
