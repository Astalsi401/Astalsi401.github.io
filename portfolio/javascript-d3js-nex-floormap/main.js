const Floormap = ({ data, width, height, lang, floor }) => {
  const title = { 1: { tc: "1F 民眾展區", en: "1F Community Area" }, 4: { tc: "4F 專業展區", en: "4F Industrial Area" } }[floor][lang];
  const graphRef = useRef();
  const floorData = useMemo(() => data.filter((d) => d.floor === floor && d.draw === 1), [data, floor]);
  useEffect(() => {
    if (floorData.length === 0) return;
    graphRef.current.innerHTML = "";
    new Floor(title, d3.select(graphRef.current), width, height, floorData, lang);
  }, [floorData, lang]);
  return <div className="graph" ref={graphRef}></div>;
};

const FloormapSearchResult = ({ data, regexString }) => {
  if (regexString.source === /(?:)/i.source) return <div className="search-results"></div>;
  const searcResult = useMemo(() => data.filter((d) => d.type === "booth" && d.opacity === 1), [regexString]);
  return (
    <div className="search-results py-2">
      {searcResult.map((d) => (
        <div className="bg-gray my-1">
          <div>{d.id}</div>
          <div>{d.text}</div>
        </div>
      ))}
    </div>
  );
};

const FloormapArea = () => {
  const [floorData, setFloorData] = useState([]);
  const [regexString, setRegexString] = useState(new RegExp(""));
  const [searchString, setSearchString] = useState("");
  const [lang, setLang] = useState("en");
  useEffect(() => {
    // https://astalsi401.github.io/warehouse/show/floormap.json
    // ../../../../../warehouse/show/floormap.json
    fetch("https://astalsi401.github.io/warehouse/show/floormap.json")
      .then((res) => res.json())
      .then((data) => {
        setFloorData(data);
      });
    if (/^zh/i.test(navigator.language)) setLang("tc");
  }, []);
  const regexEscape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const handleSearchChange = ({ target: { value } }) => {
    setSearchString(value);
  };
  const handleSearchClick = () => {
    setRegexString(
      new RegExp(
        regexEscape(searchString)
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => `(?=.*${s})`)
          .join(""),
        "i"
      )
    );
  };
  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) handleSearchClick();
  };
  const handleLangChange = ({ target: { value } }) => {
    setLang(value);
  };
  const memoFloorData = useMemo(() => floorData.map((d) => ({ ...d, cat: d.cat ? d.cat[lang] : false, text: d.text ? d.text[lang] : [], size: d.size ? d.size[lang] : 1, note: d.note ? d.note[lang] : false })), [lang, floorData]);
  const filterFloorData = useMemo(() => memoFloorData.map((d) => ({ ...d, opacity: d.type === "booth" && [d.id, d.text.join("")].some((info) => regexString.test(info)) ? 1 : 0.3 })), [regexString, memoFloorData, lang]);
  return (
    <>
      <div className="my-2">
        <div className="d-flex w-100 w-sm-50 mx-auto">
          <label className="search-input d-block">
            <input className="d-block w-100 p-2 rounded-1" value={searchString} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
          </label>
          <button className="search-btn" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <FloormapSearchResult data={filterFloorData} regexString={regexString} />
      </div>
      <div className="my-2">
        {{ tc: "切換平面圖語言", en: "Choose a language" }[lang]}：
        <select name="lang" className="lang my-2" value={lang} onChange={handleLangChange}>
          <option value="tc">中文</option>
          <option value="en">Eng</option>
        </select>
        <Floormap data={filterFloorData} width={19730} height={19010} lang={lang} floor={1} />
        <Floormap data={filterFloorData} width={19830} height={21010} lang={lang} floor={4} />
      </div>
    </>
  );
};

const Content = () => {
  return (
    <>
      <Block
        content={
          <div className="my-2">
            原圖發布於醫療科技展官網，請至
            <a href="https://expo.taiwan-healthcare.org/zh/exhibit.php" target="_blank">
              參展辦法
            </a>
            頁面查看最新版本。
          </div>
        }
      />
      <Block title="攤位搜尋" titleClass={"text-center"} id="booth-search" content={<FloormapArea />} />
      <Block content={<CodeChunkFromFile path="./graph/js/floormap.js" lang="js" />} />
      <Block content={<CodeChunkFromFile path="./graph/js/floormap-draw.js" lang="js" />} />
    </>
  );
};
