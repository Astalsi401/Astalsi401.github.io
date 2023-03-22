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
                <a className="px-3 text-decoration-none text-large text-bold" href={p.href}>
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
      <header id="header" ref={this.wrapperRef}>
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
      </header>
    );
  }
}

class CodeChunk extends React.Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
  }
  copy() {
    let copyText = document.createElement("input");
    copyText.value = this.props.code;
    document.body.appendChild(copyText);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    document.body.removeChild(copyText);
  }
  render() {
    return (
      <pre>
        <svg className="copyBtn" viewBox="0 0 10 10" onClick={this.copy}>
          <path fill="none" d="M4.5 1 L7.5 1 Q8.5 1,8.5 2 L8.5 6 Q8.5 7,7.5 7 L4.5 7 Q3.5 7,3.5 6 L3.5 2 Q3.5 1,4.5 1"></path>
          <path fill="none" d="M2.5 3 L5.5 3 Q6.5 3,6.5 4 L6.5 8 Q6.5 9,5.5 9 L2.5 9 Q1.5 9,1.5 8 L1.5 4 Q1.5 3,2.5 3"></path>
        </svg>
        <code dangerouslySetInnerHTML={{ __html: this.props.code }} />
      </pre>
    );
  }
}
class Block extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="my-4">
        <h3 id={this.props.id} className="mt-3">
          {this.props.title}
        </h3>
        {this.props.content}
      </section>
    );
  }
}
