class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: {}, indexLoaded: false };
    this.logo = {
      python: "https://astalsi401.github.io/assets/images/python-logo.svg",
      css: "https://astalsi401.github.io/assets/images/CSS3-logo.svg",
      js: "https://astalsi401.github.io/assets/images/js-logo.svg",
    };
    this.ref = React.createRef();
  }
  handleMouseEnter = (e) => {
    const { height } = e.currentTarget.getBoundingClientRect();
    if (e.currentTarget.querySelector(".page-view")) {
      e.currentTarget.querySelector(".page-view").style.transform = `translateY(calc(-100% + ${height}px))`;
      e.currentTarget.querySelector(".page-view").style.transition = "4s";
    }
  };
  handleMouseLeave = (e) => {
    if (e.currentTarget.querySelector(".page-view")) e.currentTarget.querySelector(".page-view").style.transform = `translateY(0)`;
  };
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
                <div className={`w-100 ratio-16by9 portfolioThumb overflow-hidden ${this.logo[page.thumbnail] ? "page-logo" : "page-view"}`} style={{ backgroundImage: `url(${this.logo[page.thumbnail] ? this.logo[page.thumbnail] : page.thumbnail})` }}>
                  <div className="tags">
                    {page.tags.map((tag, i) => (
                      <div key={tag} className="tag text-small px-1 m-1 rounded-1 shadow-sm" style={{ "--i": i }}>
                        {tag}
                      </div>
                    ))}
                  </div>
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
