const Wall = ({ d, drawPath }) => <path stroke="black" fill={d.fill} strokeWidth={d.strokeWidth} d={`M${d.x} ${d.y}${drawPath(d.p)}`} />;
const Pillar = ({ d, drawPath }) => {
  const path = d.p.map((p) => ({ node: p.node, x: p.x + d.x, y: p.y + d.y }));
  return <path fill="rgba(0, 0, 0, 0.2)" d={`M${d.x} ${d.y}${drawPath(path)}`} />;
};
const Text = ({ d }) => (
  <text textAnchor="middle" fontWeight="bold" fill={d.color} fontSize={400 * d.size} x={d.x} y={d.y}>
    {d.text.join("")}
  </text>
);
const Room = ({ d, i, size, elementStatus, handleBoothClick, drawPath }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const icon_l = 500;
  const opacity = d.type === "room" && elementStatus.boothInfo && elementStatus.boothInfoData.id === d.id ? 1 : d.opacity;
  return (
    <g className={`${d.type}${opacity === 1 ? " active" : ""}`} transform={`translate(${d.x},${d.y})`} onClick={d.type === "room" ? () => handleBoothClick(d) : null}>
      <path stroke={"black"} strokeWidth={d.strokeWidth} fill={d.text.length === 0 || d.type === "icon" ? "none" : "#f1f1f1"} fillOpacity={d.opacity} d={`M0 0${drawPath(d.p)}`} />
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <text key={`text-${i}-${j}`} textAnchor="middle" fontWeight="bold" fill="black" fillOpacity={d.opacity} y={j * lineHeight}>
            {t}
          </text>
        ))}
      </g>
      {d.icon.length > 0 ? (
        <>
          <clipPath id={`${d.type}-${d.floor}-${i}`}>
            <rect className="icon" width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} />
          </clipPath>
          <image width={icon_l} height={icon_l} x={(d.w - icon_l) / 2} y={(d.h - icon_l) / 2} visibility="visible" clipPath={`url(#icon-${d.floor}-${i})`} xlinkHref={icon_base64[d.icon]} opacity={d.opacity} />
        </>
      ) : (
        <></>
      )}
    </g>
  );
};
const BoothText = ({ t, j, lineHeight, opacity, boothWidth }) => {
  const textRef = useRef();
  const [text, setText] = useState(t);
  const getTextWidth = useCallback(() => {
    let self = textRef.current,
      textLength = self.getComputedTextLength(),
      txt = self.textContent;
    while (textLength > boothWidth && txt.length > 0) {
      txt = txt.slice(0, -1);
      self.textContent = txt + "\u2026";
      textLength = self.getComputedTextLength();
    }
    return txt;
  });
  useEffect(() => {
    setText(t);
  }, [t]);
  useEffect(() => {
    getTextWidth();
  }, [text]);
  return (
    <text key={`key-${j}`} ref={textRef} textAnchor="middle" fontWeight="bold" fill="black" fillOpacity={opacity} y={j * lineHeight}>
      {text}
    </text>
  );
};

const Booth = ({ d, size, elementStatus, handleBoothClick, drawPath }) => {
  const fontSize = size * d.size;
  const lineHeight = fontSize * 1.2;
  const opacity = elementStatus.boothInfo && elementStatus.boothInfoData.id === d.id ? 1 : d.opacity;
  return (
    <g key={d.id} id={d.id} className={`booth ${opacity === 1 ? "active" : ""}`} transform={`translate(${d.x},${d.y})`} onClick={() => handleBoothClick(d)}>
      <path stroke={"black"} fill={elementStatus.colors.scale(d.cat)} strokeWidth={1} fillOpacity={opacity} d={`M0 0${drawPath(d.p)}`} />;
      <g transform={`translate(${d.w / 2},${d.h / 2 - ((d.text.length - 1) * lineHeight) / 2})`} fontSize={fontSize}>
        {d.text.map((t, j) => (
          <BoothText t={t} j={j} lineHeight={lineHeight} opacity={opacity} boothWidth={d.w} />
        ))}
      </g>
      <text className="booth-id" fill="black" fillOpacity={opacity} fontSize={size * 0.3} x={20} y={d.h - 20}>
        {d.id}
      </text>
    </g>
  );
};

const Elements = ({ type, data, size, elementStatus, handleBoothClick }) => {
  const drawPath = (path) => path.map((p) => (p.node === "L" ? `${p.node}${p.x} ${p.y}` : `${p.node}${p.x1} ${p.y1} ${p.x2} ${p.y2} ${p.x} ${p.y}`)).join("") + "Z";
  const elementActions = {
    wall: (d, i) => <Wall d={d} drawPath={drawPath} />,
    pillar: (d, i) => <Pillar d={d} drawPath={drawPath} />,
    text: (d, i) => <Text d={d} />,
    room: (d, i) => <Room d={d} i={i} size={size} elementStatus={elementStatus} handleBoothClick={handleBoothClick} drawPath={drawPath} />,
    icon: (d, i) => <Room d={d} i={i} size={size} drawPath={drawPath} />,
    booth: (d, i) => <Booth d={d} size={size} elementStatus={elementStatus} handleBoothClick={handleBoothClick} drawPath={drawPath} />,
  };
  return <g className={`${type}-g`}>{data.filter((d) => d.type === type).map((d, i) => elementActions[type](d, i))}</g>;
};
const Floormap = ({ data, elementStatus, setElementStatus, handleBoothInfo, searchCondition, setSearchCondition, handleSearchChange, graphRef, svgRef, zoomCalculator, dragCalculator, defaultViewbox, animation }) => {
  const [viewBox, setViewBox] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const handleStart = (e) => {
    let distance = e.touches ? e.touches[0].clientX + e.touches[0].clientY : e.clientX + e.clientY;
    setElementStatus((prev) => ({ ...prev, test: true, dragStatus: { ...prev.dragStatus, moving: true }, distance: distance }));
  };
  const handleEnd = (e) => {
    let distance = e.changedTouches ? e.changedTouches[0].clientX + e.changedTouches[0].clientY : e.clientX + e.clientY;
    setElementStatus((prev) => ({ ...prev, test: false, dragStatus: { ...prev.dragStatus, moving: false, previousTouch: null, previousTouchLength: null }, distance: distance - prev.distance }));
  };
  const handleTouchDragZoom = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setElementStatus((prev) => {
        if (prev.dragStatus.previousTouch) dragCalculator(touch.clientX - prev.dragStatus.previousTouch.clientX, touch.clientY - prev.dragStatus.previousTouch.clientY);
        return { ...prev, dragStatus: { ...prev.dragStatus, previousTouch: touch, previousTouchLength: e.touches.length } };
      });
    } else {
      if (elementStatus.dragStatus.previousTouchLength && elementStatus.dragStatus.previousTouchLength !== e.touches.length) {
        handleEnd(e);
        return;
      }
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const x = (touch1.clientX + touch2.clientX) / 2;
      const y = (touch1.clientY + touch2.clientY) / 2;
      const d = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setElementStatus((prev) => ({ ...prev, dragStatus: { ...prev.dragStatus, previousTouch: d } }));
      if (elementStatus.dragStatus.previousTouch) zoomCalculator(x, y, d / elementStatus.dragStatus.previousTouch);
    }
  };
  const handleMouseDrag = ({ movementX, movementY }) => dragCalculator(movementX, movementY);
  const handleWheelZoom = ({ clientX, clientY, deltaY }) => {
    let r = deltaY > 0 ? 0.95 : deltaY < 0 ? 1.05 : 1;
    zoomCalculator(clientX, clientY, r);
  };
  const handleBoothClick = (d) => {
    if (elementStatus.distance !== 0) return;
    if (elementStatus.boothInfo && elementStatus.boothInfoData.id === d.id) {
      setElementStatus((prev) => ({ ...prev, boothInfo: false }));
    } else {
      handleBoothInfo(d);
    }
  };
  useEffect(() => setViewBox({ x1: 0, y1: 0, x2: elementStatus.realSize.w, y2: elementStatus.realSize.h }), [elementStatus.realSize]);
  return (
    <div className="fp-floormap d-flex align-items-center" style={{ height: elementStatus.height + elementStatus.tagsHeight }}>
      <Selector searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleSearchChange={handleSearchChange} graphRef={graphRef} zoomCalculator={zoomCalculator} defaultViewbox={defaultViewbox} animation={animation} />
      <div className={`fp-viewBox ${elementStatus.dragStatus.moving ? "moving" : ""}`} ref={graphRef} onWheel={handleWheelZoom} onMouseDown={handleStart} onMouseUp={handleEnd} onMouseLeave={handleEnd} onMouseMove={handleMouseDrag} onTouchStart={handleStart} onTouchEnd={handleEnd} onTouchCancel={handleEnd} onTouchMove={handleTouchDragZoom}>
        <svg id="floormap" className={elementStatus.boothInfo ? "active" : ""} ref={svgRef} style={{ translate: `${elementStatus.zoom.x + elementStatus.dragStatus.x}px ${elementStatus.zoom.y + elementStatus.dragStatus.y}px`, scale: `${elementStatus.zoom.scale}`, backgroundColor: "#f1f1f1" }} width={elementStatus.width} height={elementStatus.height} viewBox={`${viewBox.x1} ${viewBox.y1} ${viewBox.x2} ${viewBox.y2}`} xmlns="http://www.w3.org/2000/svg">
          <Elements type="wall" data={data} />
          <Elements type="pillar" data={data} />
          <Elements type="text" data={data} />
          <Elements type="room" data={data} size={200} elementStatus={elementStatus} handleBoothClick={handleBoothClick} />
          <Elements type="icon" data={data} size={200} />
          <Elements type="booth" data={data} size={250} elementStatus={elementStatus} handleBoothClick={handleBoothClick} />
        </svg>
      </div>
    </div>
  );
};
