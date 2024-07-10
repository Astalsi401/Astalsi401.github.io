const FilterIcon = () => {
  return (
    <>
      <span />
      <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="filter-bar" d="M0 0H350A20 20 90 1 1 350 40H0A20 20 90 1 1 0 0" />
        </defs>
        <use xlinkHref="#filter-bar" x={75} y={100} />
        <use xlinkHref="#filter-bar" x={75} y={230} />
        <use xlinkHref="#filter-bar" x={75} y={360} />
      </svg>
    </>
  );
};

const Search = ({ searchCondition, setSearchCondition, elementStatus, setElementStatus, handleSearchChange }) => {
  const searched = searchCondition.string.length === 0 && searchCondition.tag.length === 0;
  return (
    <div className="fp-search d-flex align-items-center justify-content-center">
      <div className={`fp-filter px-1 ${elementStatus.advanced ? "active" : ""}`} onClick={() => setElementStatus((prev) => ({ ...prev, advanced: !prev.advanced }))}>
        <FilterIcon />
      </div>
      <div className="fp-input d-flex flex-wrap align-items-center px-1">
        {searchCondition.tag.length !== 0 && (
          <div className="fp-input-tag shadow text-small" title={elementStatus.mapText.remove} onClick={() => setSearchCondition((prev) => ({ ...prev, tag: "" }))} style={{ "--cat": elementStatus.colors.scale(searchCondition.tag) }}>
            {searchCondition.tag}
          </div>
        )}
        <input className="fp-input-text d-block text-large" name="search" type="text" value={searchCondition.string} onChange={handleSearchChange} placeholder={elementStatus.mapText.searchPlaceholder} />
      </div>
      <div
        className={`fp-toggle d-flex align-items-center justify-content-center ${searched ? "" : "active"}`}
        title={searched ? "" : elementStatus.mapText.clear}
        onClick={() => {
          if (elementStatus.sidebar) setSearchCondition((prev) => ({ ...prev, string: "", tag: "" }));
        }}
      >
        <span />
      </div>
    </div>
  );
};

const Category = ({ title, data, col, setSearchCondition, setElementStatus }) => {
  const sum = data.reduce((acc, d) => {
    const key = d[col];
    acc[key] ? acc[key]++ : (acc[key] = 1);
    return acc;
  }, {});
  return (
    <div className="py-3 my-3">
      <div className="text-x-large text-bold px-2">{title}</div>
      {Object.keys(sum)
        .filter((d) => !["false", ""].includes(d))
        .map((d) => (
          <div
            key={`${title}-${d}`}
            className="fp-category px-4 py-1"
            onClick={() => {
              setSearchCondition((prev) => ({ ...prev, tag: d }));
              setElementStatus((prev) => ({ ...prev, advanced: false }));
            }}
          >
            {d} ({sum[d]})
          </div>
        ))}
    </div>
  );
};

const Advanced = ({ data, setElementStatus, setSearchCondition, elementStatus }) => {
  return (
    <div className={`fp-advanced py-5 ${elementStatus.advanced ? "active" : ""}`}>
      {[
        { title: "展區", col: "cat" },
        { title: "主題", col: "topic" },
      ].map((d) => (
        <Category key={d.title} title={d.title} data={data} col={d.col} setSearchCondition={setSearchCondition} setElementStatus={setElementStatus} />
      ))}
    </div>
  );
};

const Result = ({ d, elementStatus, handleBoothInfo, svgRef, graphRef, zoomCalculator, animation, dragCalculator }) => {
  const isBooth = d.type === "booth";
  const id = isBooth ? `${d.id}-${d.org}` : `${d.text.join("")}-${d.floor}`;
  const bg = isBooth ? elementStatus.colors.scale(d.cat) : "#acacac";
  const name = isBooth ? d.org : d.text.join("");
  const loc = isBooth ? `${d.id} / ${d.floor}F` : `${d.floor}F`;
  const handleResultClick = () => {
    if (!elementStatus.sidebar) return;
    handleBoothInfo(d);
    animation();
    // 定位選取攤位中心點至地圖中心點
    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = d.x + d.w / 2;
    svgPoint.y = d.y + d.h / 2;
    const CTM = svgRef.current.getScreenCTM();
    const transformedPoint = svgPoint.matrixTransform(CTM);
    const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = graphRef.current;
    const center = { x: w / 2 + x, y: elementStatus.smallScreen ? (elementStatus.sidebarWidth + elementStatus.tagsHeight) / 2 : h / 2 + y };
    zoomCalculator(transformedPoint.x, transformedPoint.y, 1.5, 1.5);
    dragCalculator(center.x - transformedPoint.x, center.y - transformedPoint.y, true);
  };
  return (
    <div id={id} className="fp-result-item d-flex align-items-center px-2 py-1" style={{ "--cat": bg }} onClick={handleResultClick}>
      <div className="fp-result-item-name text-large">{name}</div>
      <div className="fp-result-item-loc text-small">{loc}</div>
    </div>
  );
};

const ResultList = ({ data, elementStatus, handleBoothInfo, svgRef, graphRef, zoomCalculator, animation, defaultViewbox, dragCalculator }) => {
  return (
    <div className="fp-result pb-5">
      {data
        .filter((d) => d.opacity > 0.1 && d.text.length !== 0)
        .map((d) => (
          <Result d={d} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
        ))}
    </div>
  );
};

const Event = ({ timeList, title, topic, active }) => {
  const [showEventInfo, setShowEventInfo] = useState(false);
  const format = (datetime) => (Array(2).join("0") + datetime).slice(-2);
  return (
    <div className={`fp-event my-1 p-1 ${active ? "active" : ""}`} onClick={() => setShowEventInfo(!showEventInfo)}>
      <span style={{ "--i": 0 }}></span>
      <span style={{ "--i": 2 }}></span>
      <div className="text-small">{topic}</div>
      <div>{title}</div>
      <div className={`${timeList.length > 1 ? "time-list" : ""} ${showEventInfo ? "active" : ""}`}>
        {timeList.map((time) => {
          const startDate = `${format(time.start.getMonth() + 1)}/${format(time.start.getDate())}`;
          const startTime = `${format(time.start.getHours())}:${format(time.start.getMinutes())}`;
          const endDate = `${format(time.end.getMonth() + 1)}/${format(time.end.getDate())}`;
          const endTime = `${format(time.end.getHours())}:${format(time.end.getMinutes())}`;
          const timeString = startDate === endDate ? `${startDate} ${startTime}-${endTime}` : `${startDate}-${endDate} ${startTime}-${endTime}`;
          return <div className="text-small">{timeString}</div>;
        })}
      </div>
    </div>
  );
};

const BoothInfoDetail = ({ data, setSearchCondition, elementStatus, setElementStatus }) => {
  const {
    boothInfoData: { type, text, org, id, floor, cat, topic, tag, info, event, note, corpId },
  } = elementStatus;
  const isBooth = type === "booth";
  const loc = isBooth ? [cat, topic] : [note];
  const tags = Object.keys(elementStatus.boothInfoData).length === 0 ? [] : [...loc, ...tag].filter((d) => d !== "");
  const booth = data.find((d) => d.id === id);
  const corps = booth && booth.corps ? booth.corps : [];
  const events = event.filter((d) => d.title !== "");
  const handleTagClick = (value) => {
    setSearchCondition((prev) => ({ ...prev, tag: value, string: "" }));
    setElementStatus((prev) => ({ ...prev, boothInfo: false }));
  };
  const handleCorpClick = (corpId) => setElementStatus((prev) => ({ ...prev, boothInfoData: data.find((d) => d.corpId === corpId) }));
  return (
    <div className="fp-info pb-5">
      <div className="fp-info-item d-flex align-items-center px-2 py-1">
        <div className="fp-result-item-name text-x-large text-bold">{text.join("")}</div>
        <div className="fp-result-item-loc text-small">{isBooth ? `${id} / ${floor}F` : `${floor}F`}</div>
      </div>
      <div className="p-2 text-large">{org}</div>
      <div className="fp-booth-tags d-flex flex-wrap p-2">
        {tags.map((tag) => (
          <div className="fp-input-tag shadow text-small" style={{ "--cat": elementStatus.colors.scale(tag) }} onClick={() => handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      </div>
      {corps.length > 1 && (
        <div className="p-2">
          <div className="my-1 text-large">{elementStatus.mapText.exhibitor}</div>
          <div className="my-1 fp-booth-tags d-flex flex-wrap">
            {corps.map((d) => (
              <div className="fp-input-tag shadow text-small" style={{ "--cat": d.corpId === corpId ? "rgb(0, 0, 128, 0.3)" : elementStatus.colors.scale("") }} onClick={() => handleCorpClick(d.corpId)}>
                {d.org}
              </div>
            ))}
          </div>
        </div>
      )}
      {info && (
        <div className="p-2 text-small">
          {info.split("\n").map((d) => (
            <div>{d}</div>
          ))}
        </div>
      )}
      {events.length > 0 && (
        <div className="p-2">
          <div className="my-1 text-large">{elementStatus.mapText.activity}</div>
          <div className="my-1">
            {events.map((d) => (
              <Event {...d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BoothInfo = ({ data, setSearchCondition, elementStatus, setElementStatus }) => {
  return (
    <div className={`fp-booth-info ${elementStatus.boothInfo ? "active" : ""}`}>
      <div className="fp-back-btn shadow" onClick={() => setElementStatus((prev) => ({ ...prev, boothInfo: false }))}>
        <div className="fp-back d-flex align-items-center justify-content-center mx-auto active">
          <span />
        </div>
      </div>
      {elementStatus.boothInfo && elementStatus.boothInfoData && <BoothInfoDetail data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />}
    </div>
  );
};

const Sidebar = ({ data, elementStatus, setElementStatus, searchCondition, setSearchCondition, handleSearchChange, handleBoothInfo, svgRef, graphRef, zoomCalculator, dragCalculator, defaultViewbox, animation }) => {
  const handleSidear = () => {
    if (elementStatus.sidebar) return;
    setElementStatus((prev) => ({ ...prev, sidebar: !prev.sidebar }));
  };
  return (
    <div className={`fp-sidebar shadow ${elementStatus.sidebar ? "active" : ""}`} onClick={handleSidear}>
      <Search searchCondition={searchCondition} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} handleSearchChange={handleSearchChange} />
      {elementStatus.sidebar || elementStatus.smallScreen ? (
        <>
          <Advanced data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
          <ResultList data={data.filter((d) => d.sidebar && d.text.length > 0)} elementStatus={elementStatus} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} animation={animation} defaultViewbox={defaultViewbox} />
          <BoothInfo data={data} setSearchCondition={setSearchCondition} elementStatus={elementStatus} setElementStatus={setElementStatus} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
