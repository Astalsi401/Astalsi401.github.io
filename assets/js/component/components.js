const active = "active";
const toggleActive = (stateActive) => (stateActive ? active : "");

class SidebarChild extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className={`children ${toggleActive(this.props.childrenActive)}`}>
        {this.props.sections.map((s, i) => (
          <li key={i}>
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
  click = () => this.setState((prev) => ({ childrenActive: !prev.childrenActive }));
  render() {
    if (this.state.indexLoaded) {
      return (
        <aside id="sidebar" className={this.props.sidebarActive ? active : undefined}>
          <h1 className="my-5 text-center">
            <a id="sidebarAnchor" className="text-decoration-none" href={this.state.index.href}>
              {this.state.index.category}
            </a>
          </h1>
          <ul className="menu">
            {this.state.index.pages.map((p, i) => (
              <li key={i} className={p.section ? `has-children` : ""} onClick={this.click}>
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
class Accessibility extends React.Component {
  constructor(props) {
    super(props);
    this.access = [
      { href: "#main-content", text: "Skip to main content" },
      { href: "#sidebarAnchor", text: "Skip to sidebar" },
    ];
  }
  render() {
    return (
      <div className="accessibility">
        {this.access.map((a) => (
          <a key={a.text} href={a.href}>
            {a.text}
          </a>
        ))}
      </div>
    );
  }
}
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarActive: false };
    this.wrapperRef = React.createRef();
    document.removeEventListener("mousedown", this.clickOut);
    document.removeEventListener("focusin", this.hadleFocusIn);
  }
  hadleFocusIn = (e) => this.setState({ sidebarActive: this.wrapperRef.current.contains(e.target) ? true : false });
  click = () => this.setState((prev) => ({ sidebarActive: !prev.sidebarActive }));
  clickOut = (e) => this.setState((prev) => ({ sidebarActive: this.wrapperRef.current && !this.wrapperRef.current.contains(e.target) ? false : prev.sidebarActive }));
  componentDidMount() {
    document.addEventListener("mousedown", this.clickOut);
    document.addEventListener("focusin", this.hadleFocusIn);
  }
  render() {
    return (
      <div>
        <Accessibility />
        <header id="header" ref={this.wrapperRef}>
          <nav id="navbar">
            <div className={`hamberger ${toggleActive(this.state.sidebarActive)}`} onClick={this.click}>
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
      </div>
    );
  }
}

class CodeChunk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  componentDidMount() {
    Prism.highlightAll();
  }
  copy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(this.props.code);
    this.setState({ active: true });
    setTimeout(() => {
      this.setState({ active: false });
    }, 2000);
  };
  render() {
    return (
      <pre>
        <a href="#" className={`copyBtn ${toggleActive(this.state.active)}`} onClick={this.copy}>
          <svg viewBox="0 0 10 10">
            <path fill="none" d="M4.5 1 L7.5 1 Q8.5 1,8.5 2 L8.5 6 Q8.5 7,7.5 7 L4.5 7 Q3.5 7,3.5 6 L3.5 2 Q3.5 1,4.5 1"></path>
            <path fill="none" d="M2.5 3 L5.5 3 Q6.5 3,6.5 4 L6.5 8 Q6.5 9,5.5 9 L2.5 9 Q1.5 9,1.5 8 L1.5 4 Q1.5 3,2.5 3"></path>
          </svg>
        </a>
        <code children={this.props.code} className={`lang-${this.props.lang}`} />
      </pre>
    );
  }
}
class CodeChunkFromFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", loaded: false };
  }
  componentDidMount() {
    fetch(this.props.path)
      .then((res) => res.text())
      .then((data) => {
        this.setState({
          code: data,
          loaded: true,
        });
      });
  }
  render() {
    if (this.state.loaded) {
      return <CodeChunk code={this.state.code} lang={this.props.lang} />;
    }
  }
}
class Block extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className={`my-4 ${this.props.class ? this.props.class : ""}`}>
        {this.props.title ? (
          <h3 id={this.props.id} className="mt-3">
            {this.props.title}
          </h3>
        ) : (
          ""
        )}
        {this.props.content}
      </section>
    );
  }
}
class Label extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <label className="my-2 w-100">
        {this.props.label && <div>{this.props.label}：</div>}
        <input className="p-1" name={this.props.name} step={this.props.step} placeholder={this.props.placeholder} value={this.props.value} />
      </label>
    );
  }
}

class ZoomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.ref = React.createRef();
  }
  zoom = (e) => {
    let overflow = document.querySelector(".overflow-auto");
    if (overflow && overflow.contains(e.target)) e.target.style.position = this.state.active ? "relative" : "absolute";
    this.setState({ active: !this.state.active });
  };
  componentDidMount() {
    window.addEventListener("resize", () => this.setState({ active: false }));
  }
  render() {
    let elem = this.ref.current && this.ref.current.getBoundingClientRect();
    let scale = elem ? Math.min(window.innerWidth / elem.width, window.innerHeight / elem.height) : 1;
    let translate = elem ? `${(window.innerWidth / 2 - elem.x) / scale - elem.width / 2}px, ${(window.innerHeight / 2 - elem.y) / scale - elem.height / 2}px` : "0,0";
    let imgSty = { transform: this.state.active ? `scale(${scale}) translate(${translate})` : "scale(1) translate(0)" };
    return (
      <div id={this.props.id && this.pages.id} className={`${this.props.class ? this.props.class : ""} imgBlock ${toggleActive(this.state.active)}`}>
        <img ref={this.ref} className="w-100" loading="lazy" src={this.props.src} alt={this.props.alt && this.props.alt} style={imgSty} onClick={this.zoom} />
      </div>
    );
  }
}

class IndexPage extends React.Component {
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
        <div className="index my-5">
          {this.props.subtitle && <h2 className="text-center text-x-large text-bold">{this.props.subtitle}</h2>}
          <ul className="mx-auto my-3 text-center w-lg-50 w-100">
            {this.state.index.pages.map((page) => (
              <li key={page.page} className="my-2">
                <a className="p-2" href={page.href}>
                  {page.page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
