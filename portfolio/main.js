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
            <div className="col-sm-6 col-lg-4 ">
              <a className="d-block w-100 ratio-16by9" href={page.href}>
                <img className="thumbnail" src={page.thumbnail} alt="" />
                {page.page}
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
        <Portfolio category="Portfolio"></Portfolio>
      </div>
    );
  }
}
