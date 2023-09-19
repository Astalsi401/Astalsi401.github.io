const { useState, useEffect, useRef, useMemo } = React;
const active = "active";
const toggleActive = (stateActive) => (stateActive ? active : "");

function SidebarChild({ sections, childrenActive }) {
  return (
    <ul className={`children ${toggleActive(childrenActive)}`}>
      {sections.map((s, i) => (
        <li key={i}>
          <a className="ps-4 text-decoration-none" href={s.href}>
            {s.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Sidebar({ category, sidebarActive }) {
  const [index, setIndex] = useState({});
  const [indexLoaded, setIndexLoaded] = useState(false);
  const [childrenActive, setChildrenActive] = useState(false);
  const click = () => setChildrenActive((prev) => !prev);
  useEffect(() => {
    fetch("https://astalsi401.github.io/assets/js/json/index.json")
      .then((res) => res.json())
      .then((data) => {
        setIndex(data.index.find((d) => d.category === category));
        setIndexLoaded(true);
      });
  }, [category]);
  if (indexLoaded) {
    return (
      <aside id="sidebar" className={sidebarActive ? "active" : undefined}>
        <h1 className="my-5 text-center">
          <a id="sidebarAnchor" className="text-decoration-none" href={index.href}>
            {index.category}
          </a>
        </h1>
        <ul className="menu">
          {index.pages.map((p, i) => (
            <li key={i} className={p.section ? "has-children" : ""} onClick={click}>
              <a className="px-3 text-decoration-none text-large text-bold" href={p.href}>
                {p.page}
              </a>
              {p.section && <SidebarChild sections={p.section} childrenActive={childrenActive} />}
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

function Accessibility() {
  const access = [
    { href: "#main-content", text: "Skip to main content" },
    { href: "#sidebarAnchor", text: "Skip to sidebar" },
  ];
  return (
    <div className="accessibility">
      {access.map((a) => (
        <a key={a.text} href={a.href}>
          {a.text}
        </a>
      ))}
    </div>
  );
}

function Header({ category }) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const wrapperRef = useRef(null);
  const handleFocusIn = ({ target }) => setSidebarActive(wrapperRef.current.contains(target) ? true : false);
  const handleClick = () => setSidebarActive((prev) => !prev);
  const handleClickOut = ({ target }) => setSidebarActive((prev) => (wrapperRef.current && !wrapperRef.current.contains(target) ? false : prev));
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);
  return (
    <>
      <Accessibility />
      <header id="header" ref={wrapperRef}>
        <nav id="navbar">
          <div className={`hamberger ${toggleActive(sidebarActive)}`} onClick={handleClick}>
            <span></span>
          </div>
          <a href="https://astalsi401.github.io/" className="home">
            <svg viewBox="0 0 500 500">
              <path d="M250 100 L450 230,350 230,350 400,150 400,150 230,50 230,250 100"></path>
            </svg>
          </a>
        </nav>
        <Sidebar sidebarActive={sidebarActive} category={category} />
      </header>
    </>
  );
}

function CodeChunk({ code, lang }) {
  const [active, setActive] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 2000);
  };
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre>
      <a className={`copyBtn ${toggleActive(active)}`} onClick={copy}>
        <svg viewBox="0 0 10 10">
          <path fill="none" d="M4.5 1 L7.5 1 Q8.5 1,8.5 2 L8.5 6 Q8.5 7,7.5 7 L4.5 7 Q3.5 7,3.5 6 L3.5 2 Q3.5 1,4.5 1"></path>
          <path fill="none" d="M2.5 3 L5.5 3 Q6.5 3,6.5 4 L6.5 8 Q6.5 9,5.5 9 L2.5 9 Q1.5 9,1.5 8 L1.5 4 Q1.5 3,2.5 3"></path>
        </svg>
      </a>
      <code children={code} className={`lang-${lang}`} />
    </pre>
  );
}

function CodeChunkFromFile({ path, lang }) {
  const [code, setCode] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((data) => {
        setCode(data);
        setLoaded(true);
      });
  }, [path]);
  if (loaded) {
    return <CodeChunk code={code} lang={lang} />;
  }
}

function Block({ className, title, titleClass, id, content }) {
  return (
    <section className={`my-4 ${className ? className : ""}`}>
      {title ? (
        <h3 id={id} className={`mt-3 ${titleClass ? titleClass : ""}`}>
          {title}
        </h3>
      ) : (
        ""
      )}
      {content}
    </section>
  );
}

function Label({ label, name, step, placeholder, value }) {
  return (
    <label className="my-2 w-100">
      {label && <div>{label}：</div>}
      <input className="p-1" name={name} step={step} placeholder={placeholder} value={value} />
    </label>
  );
}

function ZoomImage({ id, className, src, alt }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const zoom = ({ target }) => {
    let overflow = document.querySelector(".overflow-auto");
    if (overflow && overflow.contains(target)) target.style.position = active ? "relative" : "absolute";
    setActive(!active);
  };
  useEffect(() => {
    const handleResize = setActive(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let elem = ref.current && ref.current.getBoundingClientRect();
  let scale = elem ? Math.min(window.innerWidth / elem.width, window.innerHeight / elem.height) : 1;
  let translate = elem ? `${(window.innerWidth / 2 - elem.x) / scale - elem.width / 2}px, ${(window.innerHeight / 2 - elem.y) / scale - elem.height / 2}px` : "0,0";
  let imgSty = { transform: active ? `scale(${scale}) translate(${translate})` : "scale(1) translate(0)" };
  return (
    <div id={id && id} className={`${className ? className : ""} imgBlock ${toggleActive(active)}`}>
      <img ref={ref} className="w-100" loading="lazy" src={src} alt={alt && alt} style={imgSty} onClick={zoom} />
    </div>
  );
}

function IndexPage({ subtitle, category }) {
  const [index, setIndex] = useState({});
  const [indexLoaded, setIndexLoaded] = useState(false);
  useEffect(() => {
    fetch("https://astalsi401.github.io/assets/js/json/index.json")
      .then((res) => res.json())
      .then((data) => {
        setIndex(data.index.find((d) => d.category === category));
        setIndexLoaded(true);
      });
  }, [category]);
  if (indexLoaded) {
    return (
      <div className="index my-5">
        {subtitle && <h2 className="text-center text-x-large text-bold">{subtitle}</h2>}
        <ul className="mx-auto my-3 text-center w-lg-50 w-100">
          {index.pages.map((page) => (
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
