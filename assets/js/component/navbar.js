const toggleActive = (active) => {
  return active ? " active" : "";
};

class SidebarChild extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className={`children${toggleActive(this.props.childrenActive)}`}>
        {this.props.sections.map((s) => (
          <li>
            <a className="ps-4 text-decoration-none" href={s.href}>
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: {}, indexLoaded: false, childrenActive: false };
    this.click = this.click.bind(this);
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
  click() {
    this.setState((prev) => ({ childrenActive: !prev.childrenActive }));
  }
  render() {
    if (this.state.indexLoaded) {
      return (
        <aside id="sidebar" className={toggleActive(this.props.sidebarActive)}>
          <h1 className="text-center my-5">{this.state.index.category}</h1>
          <ul className="menu">
            {this.state.index.pages.map((p) => (
              <li className={p.section && `has-children${toggleActive(this.state.childrenActive)}`} onClick={this.click}>
                <a className="px-3 text-decoration-none" href={p.href}>
                  {p.page}
                </a>
                {p.section && <SidebarChild sections={p.section} childrenActive={this.state.childrenActive} />}
              </li>
            ))}
          </ul>
        </aside>
      );
    }
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarActive: false };
    this.click = this.click.bind(this);
    this.clickOut = this.clickOut.bind(this);
    this.wrapperRef = React.createRef();
  }
  click() {
    this.setState((prev) => ({ sidebarActive: !prev.sidebarActive }));
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.clickOut);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickOut);
  }
  clickOut(event) {
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) this.setState({ sidebarActive: false });
  }
  render() {
    return (
      <div ref={this.wrapperRef}>
        <nav id="navbar">
          <div className={`hamberger${toggleActive(this.state.sidebarActive)}`} onClick={this.click}>
            <span></span>
          </div>
          <a href="https://astalsi401.github.io/" className="home">
            <svg viewBox="0 0 500 500">
              <path d="M250 100 L450 230,350 230,350 400,150 400,150 230,50 230,250 100"></path>
            </svg>
          </a>
        </nav>
        <Sidebar sidebarActive={this.state.sidebarActive} category={this.props.category} />
      </div>
    );
  }
}
class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container shadow-lg p-3">
        <h1 className="text-center">{this.props.title}</h1>
        <Main />
      </div>
    );
  }
}
