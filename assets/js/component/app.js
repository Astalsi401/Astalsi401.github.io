class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header category={this.props.category} />
        <main id="main-content" className="container shadow-lg p-3">
          <h1 className="my-5 text-center">{this.props.title}</h1>
          <Content />
        </main>
      </div>
    );
  }
}
