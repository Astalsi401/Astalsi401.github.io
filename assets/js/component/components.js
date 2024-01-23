const { useState, useEffect, useRef, useMemo } = React;
const active = "active";
const domain = location.origin;
const sidebarAnchor = "sidebarAnchor";
const toggleActive = (stateActive) => (stateActive ? active : "");
const useIndexData = (category) => {
  const [index, setIndex] = useState({});
  const [indexLoaded, setIndexLoaded] = useState(false);
  const fetchIndex = async (category) => {
    const res = await fetch(`${domain}/assets/js/json/index.json`);
    const data = await res.json();
    setIndex(data.index.find((d) => d.category === category));
    setIndexLoaded(true);
  };
  useEffect(() => fetchIndex(category), [category]);
  return { index, indexLoaded };
};

function SidebarChild({ sections, childrenActive }) {
  return (
    <ul className={`children ${toggleActive(childrenActive)}`}>
      {sections.map((s) => (
        <li key={s.title}>
          <a className="ps-4 text-decoration-none" href={s.href}>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Sidebar({ category, sidebarActive, wrapperRef }) {
  const { index, indexLoaded } = useIndexData(category);
  const [childrenActive, setChildrenActive] = useState(false);
  const click = () => setChildrenActive((prev) => !prev);
  if (indexLoaded) {
    return (
      <aside id="sidebar" className={sidebarActive ? "active" : undefined} ref={wrapperRef}>
        <h1 className="pt-5 pb-3 text-center">
          <a id={sidebarAnchor} className="text-decoration-none" href={`${domain}${index.href}`}>
            {index.category}
          </a>
        </h1>
        <ul className="py-3 menu">
          {index.pages.map((p, i) => (
            <li key={i} className={`${p.section ? "has-children" : ""}`} onClick={click}>
              <a className={`px-3 text-decoration-none text-large text-bold ${p.href == location.pathname ? "current" : ""}`} href={/^http?:/.test(p.href) ? p.href : `${domain}${p.href}`}>
                <span>{p.page}</span>
              </a>
              {p.section && <SidebarChild sections={p.section} childrenActive={childrenActive} />}
            </li>
          ))}
        </ul>
        <div className="pt-3 pb-5 d-flex justify-content-center align-items-center">
          <a className="social-link d-block" href="https://github.com/Astalsi401" target="_blank" title="My GitHub">
            <img src={`${domain}/assets/images/github-mark.svg`} alt="github-mark" />
          </a>
        </div>
      </aside>
    );
  }
}

function Accessibility() {
  const access = [
    { href: "#main-content", text: "Skip to main content" },
    { href: `#${sidebarAnchor}`, text: "Skip to sidebar" },
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

const ProgressBar = () => {
  const [percent, setPercent] = useState(0);
  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setPercent(((winScroll / height) * 100).toFixed(2));
  };
  useEffect(() => {
    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="progress" style={{ "--percent": percent }} />;
};

function Header({ category }) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const handleFocusIn = ({ target }) => setSidebarActive(wrapperRef.current.contains(target) ? true : false);
  const handleClick = () => setSidebarActive((prev) => !prev);
  const handleClickOut = ({ target }) => setSidebarActive((prev) => (wrapperRef.current && !wrapperRef.current.contains(target) && !btnRef.current.contains(target) ? false : prev));
  const handleClickFrame = ({ data }) => {
    if (data.window && data.window === "iframe") setSidebarActive(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("message", handleClickFrame);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("message", handleClickFrame);
    };
  }, []);
  return (
    <>
      <Accessibility />
      <header id="header">
        <nav id="navbar">
          <div className={`hamberger ${toggleActive(sidebarActive)}`} onClick={handleClick} ref={btnRef}>
            <span />
          </div>
          <a href={domain} className="home">
            <svg viewBox="0 0 500 500">
              <path d="M250 100 L450 230,350 230,350 400,150 400,150 230,50 230,250 100" />
            </svg>
          </a>
        </nav>
        <ProgressBar />
        <Sidebar sidebarActive={sidebarActive} category={category} wrapperRef={wrapperRef} />
      </header>
    </>
  );
}

function CodeChunk({ code, lang }) {
  const [active, setActive] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };
  useEffect(() => Prism.highlightAll(), []);
  return (
    <pre>
      <a className={`copyBtn ${toggleActive(active)}`} onClick={copy}>
        <svg viewBox="0 0 10 10">
          <path fill="none" d="M4.5 1 L7.5 1 Q8.5 1,8.5 2 L8.5 6 Q8.5 7,7.5 7 L4.5 7 Q3.5 7,3.5 6 L3.5 2 Q3.5 1,4.5 1" />
          <path fill="none" d="M2.5 3 L5.5 3 Q6.5 3,6.5 4 L6.5 8 Q6.5 9,5.5 9 L2.5 9 Q1.5 9,1.5 8 L1.5 4 Q1.5 3,2.5 3" />
        </svg>
      </a>
      <code children={code} className={`lang-${lang}`} />
    </pre>
  );
}

function CodeChunkFromFile({ path, lang }) {
  const [code, setCode] = useState("");
  const [loaded, setLoaded] = useState(false);
  const fetchCode = async () => {
    const res = await fetch(path);
    const data = await res.text();
    setCode(data);
    setLoaded(true);
  };
  useEffect(() => fetchCode(), [path]);
  if (loaded) {
    return <CodeChunk code={code} lang={lang} />;
  }
}

const DemoFrame = ({ src }) => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(0);
  const handleMessage = ({ data, source }) => {
    if (data.height && source === iframeRef.current.contentWindow) setHeight(data.height);
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return (
    <div className="my-2 p-2 demo-frame">
      <iframe className="w-100" style={{ height: height }} src={src} ref={iframeRef} />
    </div>
  );
};

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

function Label({ label, name, type, step, min, max, placeholder, value }) {
  return (
    <label className="my-2 w-100">
      {label && <div>{label}：</div>}
      <input className="p-1" name={name} type={type} step={step} min={min} max={max} placeholder={placeholder} value={value} />
    </label>
  );
}

function ZoomImage({ id, className, src, alt }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const zoom = ({ target }) =>
    setActive((prev) => {
      let newState = !prev;
      let overflow = document.querySelector(".overflow-auto");
      if (overflow && overflow.contains(target)) target.style.position = newState ? "absolute" : "relative";
      document.body.style.overflowY = newState ? "hidden" : "auto";
      return newState;
    });
  const handleResize = () => setActive(false);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  const { index, indexLoaded } = useIndexData(category);
  if (indexLoaded) {
    return (
      <div className="index my-5">
        {subtitle && <h2 className="text-center text-x-large text-bold">{subtitle}</h2>}
        <ul className="mx-auto my-3 text-center w-lg-50 w-100">
          {index.pages.map((page) => (
            <li key={page.page} className="my-2">
              <a className="p-2" href={`${domain}${page.href}`}>
                {page.page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
