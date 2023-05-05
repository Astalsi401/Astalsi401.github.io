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
            <div className="col-sm-6 col-md-4 col-lg-3 p-2" key={page.page}>
              <a className="d-block bg-white shadow-sm w-100 h-100 text-center text-decoration-none portfolio" href={page.href} target="_blank">
                <div className="w-100 ratio-16by9 portfolioThumb">
                  <div className="tags">
                    {page.tags.map((tag) => (
                      <div className="tag text-small px-1 m-1 rounded-1">{tag}</div>
                    ))}
                  </div>
                  <img className="w-100 h-100 object-fit-cover" src={page.thumbnail} alt={page.page} />
                </div>
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
