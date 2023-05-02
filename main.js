class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: [], indexLoaded: false };
  }
  componentDidMount() {
    fetch("https://astalsi401.github.io/assets/js/json/index.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          index: data.index.find((d) => d.category === this.props.category),
          indexLoaded: true,
        });
      });
  }
  render() {
    if (this.state.indexLoaded) {
      return (
        <div className="container-sm py-5">
          <h1 className="my-5 py-5 text-center text-xxx-large">Home</h1>
          <div className="my-5 py-5 px-sm-5 d-flex flex-wrap justify-content-center">
            {this.state.index.pages.map((d) => (
              <div key={d.page} className="m-2 p-1 homePageIcon">
                <a href={d.href} className="text-decoration-none">
                  <img src={d.icon} alt="" className="d-block w-100 mx-auto" />
                  <span className="d-block text-center">{d.page}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
