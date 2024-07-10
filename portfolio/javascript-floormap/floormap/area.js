const Loading = () => (
  <div className="fp-loading">
    <div className="loading">
      <span>
        <span style={{ "--i": 0 }}>L</span>
        <span style={{ "--i": 1 }}>o</span>
        <span style={{ "--i": 2 }}>a</span>
        <span style={{ "--i": 3 }}>d</span>
        <span style={{ "--i": 4 }}>i</span>
        <span style={{ "--i": 5 }}>n</span>
        <span style={{ "--i": 6 }}>g</span>
      </span>
    </div>
  </div>
);

const MainArea = () => {
  const mapText = {
    categories: {
      tc: ["全齡健康展區", "年度主題館", "醫療機構展區", "智慧醫療展區", "精準醫療展區", "活動進行中"],
      en: ["Consumer Health Products", "Featured Pavilions", "Medical Institutes & Hospitals", "Medical Devices & Equipment", "Diagnostics, Laboratory Equipment & Services", "Event in progress"],
    },
    link: { tc: "zh", en: "en" },
    title: { tc: "展場平面圖", en: "Floor Plan" },
    event: { tc: "活動進行中", en: "Event in progress" },
    header: { tc: "重點必看", en: "Highlights" },
    headerTags: { tc: ["重要活動", "健康大檢測", "醫師力大挑戰"], en: ["Key Events"] },
    download: { tc: "下載", en: "Download" },
    searchPlaceholder: { tc: "關鍵字搜索", en: "Search" },
    remove: { tc: "清除標籤", en: "Clear all" },
    clear: { tc: "清除搜索條件", en: "Clear search" },
    exhibitor: { tc: "聯展單位", en: "Co-exhibitors" },
    activity: { tc: "相關活動", en: "Events" },
  };
  const types = ["booth", "room"];
  const graphRef = useRef(null);
  const svgRef = useRef(null);
  const [floorData, setFloorData] = useState({ loaded: false, data: [] });
  const [searchCondition, setSearchCondition] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      string: params.get("string") || "",
      regex: params.get("regex") || new RegExp("", "i"),
      tag: params.get("tag") || "",
      floor: params.get("floor") || "1",
      lang: params.get("lang") || (/^zh/i.test(navigator.language) ? "tc" : "en"),
    };
  });
  const [elementStatus, setElementStatus] = useState(() => {
    const isMobile = /windows phone|android|iPad|iPhone|iPod/i.test(navigator.userAgent || window.opera);
    const tagsHeight = 80;
    const sidebarWidth = 40;
    return {
      test: null,
      inputTimer: null,
      load: false,
      isMobile: isMobile,
      width: window.innerHeight - sidebarWidth,
      height: window.innerHeight - tagsHeight,
      colors: new ColorPicker(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6)", "rgb(128, 0, 75, 0.2)"], mapText.categories[searchCondition.lang], "rgba(255,255,255)"),
      boothInfoData: {},
      smallScreen: false,
      sidebar: true,
      advanced: false,
      boothInfo: false,
      realSize: { w: 19830, h: 16950 },
      tagsHeight: tagsHeight,
      sidebarWidth: sidebarWidth,
      dragStatus: { moving: false, previousTouch: null, previousTouchLength: null, x: 0, y: 0 },
      distance: 0,
      zoom: { scale: 0.9, x: 0, y: 0 },
      mapText: {
        link: mapText.link[searchCondition.lang],
        title: mapText.title[searchCondition.lang],
        event: mapText.event[searchCondition.lang],
        header: mapText.header[searchCondition.lang],
        headerTags: mapText.headerTags[searchCondition.lang],
        download: mapText.download[searchCondition.lang],
        searchPlaceholder: mapText.searchPlaceholder[searchCondition.lang],
        remove: mapText.remove[searchCondition.lang],
        clear: mapText.clear[searchCondition.lang],
        exhibitor: mapText.exhibitor[searchCondition.lang],
        activity: mapText.activity[searchCondition.lang],
      },
    };
  });
  const checkText = (targetElements) => searchCondition.regex.test(targetElements.join(" ").replace(/\r|\n/g, "").replace("臺", "台"));
  const memoFloorData = useMemo(
    () =>
      floorData.data.map((d, i) => {
        let tags = d.tag ? d.tag[searchCondition.lang] : [],
          eventTime = [];
        if (d.event) {
          const now = new Date();
          eventTime = d.event.map((e) => ({
            timeList: e.timeList.map((time) => ({ start: new Date(time.start), end: new Date(time.end) })),
            title: e.title[searchCondition.lang],
            topic: e.topic[searchCondition.lang],
            active: e.timeList.some((time) => {
              const start = new Date(time.start);
              const end = new Date(time.end);
              const nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
              const startDate = new Date(`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} 00:00:00`);
              const endDate = new Date(`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} 23:59:59`);
              const startTime = new Date(`${nowDate} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`);
              const endTime = new Date(`${nowDate} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
              return startDate < now && now < endDate && startTime < now && now < endTime && e.title[searchCondition.lang].length > 0;
            }),
          }));
          tags = eventTime.some((e) => e.active) ? tags.concat([mapText.event[searchCondition.lang]]) : tags;
        }
        return { ...d, id: d.id ? d.id : `${d.type}-${d.floor}-${i}`, floor: d.floor.toString(), cat: d.cat ? d.cat[searchCondition.lang] : false, topic: d.topic ? d.topic[searchCondition.lang] : false, tag: tags, text: d.text ? d.text[searchCondition.lang] : [], size: d.size ? d.size[searchCondition.lang] : 1, event: eventTime, corps: d.corps ? d.corps.map((corp, i) => ({ corpId: `${d.id}-${i}`, org: corp.org[searchCondition.lang], info: corp.info[searchCondition.lang] })) : false, draw: true };
      }),
    [searchCondition.lang, floorData.data]
  );
  const filterFloorData = useMemo(() => {
    const res = [];
    memoFloorData.forEach((d) => {
      const corps = d.corps ? d.corps.map((corp) => corp.org) : [];
      const infos = d.corps ? d.corps.map((corp) => corp.info) : [];
      const targets = [d.id, d.text.join(""), d.cat, d.topic, ...d.tag];
      const isType = types.includes(d.type);
      const hasTag = isType && searchCondition.tag.length === 0 ? true : [d.id, d.cat, d.topic, ...d.tag].includes(searchCondition.tag);
      let hasText = isType && checkText([...targets, ...infos, ...corps]);
      const opacity = (hasText && hasTag) || d.type === "icon" ? 0.8 : 0.1;
      if (d.corps) {
        d.corps.forEach((corp, i) => {
          hasText = checkText([...targets, corp.info, corp.org]);
          res.push({ ...d, ...corp, opacity: opacity, draw: i === 0, sidebar: hasText && hasTag });
        });
      } else {
        res.push({ ...d, opacity: opacity, draw: true, sidebar: isType });
      }
    });
    return res;
  }, [searchCondition.regex, searchCondition.tag, searchCondition.floor, searchCondition.lang, memoFloorData]);
  const searchActions = (name, value) => {
    switch (name) {
      case "search":
        clearTimeout(elementStatus.inputTimer);
        const inputTimer = setTimeout(() => setElementStatus((prev) => ({ ...prev, inputTimer: null })), 500);
        setSearchCondition((prev) => ({ ...prev, string: value }));
        setElementStatus((prev) => ({ ...prev, advanced: false, inputTimer: inputTimer }));
        break;
      default:
        setSearchCondition((prev) => ({ ...prev, [name]: value }));
    }
  };
  const regexEscape = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const handleSearchChange = ({ target: { name, value } }) => searchActions(name, value);
  const handleResize = () => {
    setTimeout(() => {
      setElementStatus((prev) => {
        const smallScreen = window.innerWidth < 768;
        const sidebar = prev.load ? (smallScreen ? prev.sidebar : !smallScreen) : smallScreen ? false : true;
        const { innerWidth: width, innerHeight: height } = window;
        const sidebarWidth = smallScreen ? (sidebar ? height * 0.6 : height - 117) : sidebar ? 300 : 30;
        const tagsHeight = smallScreen ? 100 : 80;
        console.log(sidebarWidth);
        return { ...prev, width: smallScreen ? width : width - sidebarWidth, height: height - prev.tagsHeight, load: true, smallScreen: smallScreen, sidebar: sidebar, sidebarWidth: sidebarWidth, tagsHeight: tagsHeight };
      });
    }, 50);
  };

  const handleBoothInfo = (d) => {
    setElementStatus((prev) => ({ ...prev, boothInfo: true, boothInfoData: d }));
    setSearchCondition((prev) => ({ ...prev, floor: d.floor }));
  };
  const defaultViewbox = (animate = true) => {
    if (animate) animation();
    setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, x: 0, y: 0 }, zoom: { scale: 1, x: 0, y: 0 } }));
  };
  const zoomCalculator = (clientX, clientY, r, rMax = 10) => {
    const box = graphRef.current.getBoundingClientRect();
    setElementStatus((prev) => {
      let scale = prev.zoom.scale * r;
      scale = scale < 0.9 ? 0.9 : scale > rMax ? rMax : scale;
      let w = svgRef.current.clientWidth * prev.zoom.scale;
      let h = svgRef.current.clientHeight * prev.zoom.scale;
      let x = (graphRef.current.clientWidth - w) / 2 + prev.zoom.x + prev.dragStatus.x;
      let y = (graphRef.current.clientHeight - h) / 2 + prev.zoom.y + prev.dragStatus.y;
      let originX = clientX - box.x - x - w / 2;
      let originY = clientY - box.y - y - h / 2;
      let xNew = originX - (originX / prev.zoom.scale) * scale + prev.zoom.x;
      let yNew = originY - (originY / prev.zoom.scale) * scale + prev.zoom.y;
      return { ...prev, zoom: { scale: scale, x: xNew, y: yNew } };
    });
  };
  const dragCalculator = (x, y, force = false) => {
    if (elementStatus.dragStatus.moving || force) setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, x: prev.dragStatus.x + x, y: prev.dragStatus.y + y } }));
  };
  const animation = () => {
    svgRef.current.style.transition = "0.4s";
    setTimeout(() => (svgRef.current.style.transition = null), 400);
  };
  const fetchData = async () => {
    const data = await fetch("https://astalsi401.github.io/warehouse/show/floormap.json").then((res) => res.json());
    setFloorData({ data: data, loaded: true });
  };
  useEffect(() => {
    fetchData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => handleResize, [elementStatus.sidebar, elementStatus.smallScreen]);
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    for (const [k, v] of Object.entries(searchCondition)) {
      if (k !== "regex") v.length === 0 ? searchParams.delete(k) : searchParams.set(k, v);
    }
    url.search = searchParams.toString();
    history.pushState(null, "", url.href);
  }, [searchCondition]);
  useEffect(() => {
    setElementStatus((prev) => ({
      ...prev,
      boothInfoData: Object.keys(prev.boothInfoData).length === 0 ? {} : filterFloorData.find((d) => d.id === prev.boothInfoData.id && d.corpId === prev.boothInfoData.corpId),
      colors: prev.colors.categories(mapText.categories[searchCondition.lang]),
      mapText: {
        link: mapText.link[searchCondition.lang],
        title: mapText.title[searchCondition.lang],
        event: mapText.event[searchCondition.lang],
        header: mapText.header[searchCondition.lang],
        headerTags: mapText.headerTags[searchCondition.lang],
        download: mapText.download[searchCondition.lang],
        searchPlaceholder: mapText.searchPlaceholder[searchCondition.lang],
        remove: mapText.remove[searchCondition.lang],
        clear: mapText.clear[searchCondition.lang],
        exhibitor: mapText.exhibitor[searchCondition.lang],
        activity: mapText.activity[searchCondition.lang],
      },
    }));
    document.title = mapText.title[searchCondition.lang];
  }, [searchCondition.lang]);
  useEffect(() => {
    if (elementStatus.inputTimer) return;
    setSearchCondition((prev) => ({
      ...prev,
      regex: new RegExp(
        regexEscape(prev.string.replace("臺", "台"))
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => `(?=.*${s})`)
          .join(""),
        "i"
      ),
    }));
  }, [searchCondition.string, elementStatus.inputTimer]);
  if (!floorData.loaded) return <Loading />;
  return (
    <StrictMode>
      <div className="fp-main" style={{ "--sidebar-width": `${elementStatus.sidebarWidth}px`, "--tags-height": `${elementStatus.tagsHeight}px` }}>
        <Sidebar data={filterFloorData.filter((d) => types.includes(d.type))} elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} handleBoothInfo={handleBoothInfo} svgRef={svgRef} graphRef={graphRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} defaultViewbox={defaultViewbox} animation={animation} />
        <div
          className="fp-graph d-flex align-items-center"
          onClick={() => {
            if (elementStatus.smallScreen) setElementStatus((prev) => ({ ...prev, sidebar: false }));
          }}
        >
          <Header elementStatus={elementStatus} setElementStatus={setElementStatus} searchCondition={searchCondition} setSearchCondition={setSearchCondition} defaultViewbox={defaultViewbox} />
          <Floormap data={filterFloorData.filter((d) => d.floor === searchCondition.floor && d.draw)} elementStatus={elementStatus} setElementStatus={setElementStatus} handleBoothInfo={handleBoothInfo} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} graphRef={graphRef} svgRef={svgRef} zoomCalculator={zoomCalculator} dragCalculator={dragCalculator} defaultViewbox={defaultViewbox} animation={animation} />
        </div>
      </div>
    </StrictMode>
  );
};
