class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: {}, indexLoaded: false };
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
        <div className="row">
          {this.state.index.pages.map((page) => (
            <div className="col-sm-6 col-md-4 col-lg-3 p-2 portfolio">
              <a className="d-block bg-white shadow-sm w-100 h-100 text-center text-decoration-none" href={page.href} target="_blank">
                <img className="w-100 ratio-16by9 object-fit-cover" src={page.thumbnail} alt="" />
                <div className="py-2">{page.page}</div>
              </a>
            </div>
          ))}
        </div>
      );
    }
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: {}, indexLoaded: true };
  }

  render() {
    return (
      <div>
        <Portfolio category="Portfolio" />
      </div>
    );
  }
}