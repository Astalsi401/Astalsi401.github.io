"https://archive-api.open-meteo.com/v1/archive?latitude=25.05&longitude=121.53&start_date=1940-01-01&end_date=2023-05-03&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=GMT";

class scaleLinear {
  constructor(domain = [0, 1], range = [0, 1]) {
    this.domain = domain; //輸入範圍
    this.range = range; //輸出範圍
  }
  scale = (val) => {
    if (val < this.domain[0]) return this.range[0];
    if (val > this.domain[1]) return this.range[1];
    return this.range[0] + ((val - this.domain[0]) / (this.domain[1] - this.domain[0])) * (this.range[1] - this.range[0]);
  };
}
const extent = (vals, plus = 0) => [Math.min(...vals) - plus, Math.max(...vals) + plus];
function Content() {
  return (
    <div>
      <section className="my-4">
        <TempGraph />
      </section>
    </div>
  );
}

function TempGraph() {
  const [temp, setTemp] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [xScale, setXScale] = React.useState(new scaleLinear());
  const [yScale, setYScale] = React.useState(new scaleLinear());
  const graphRef = React.useRef(null);

  const handleResize = () => {
    const { width, height } = graphRef.current.getBoundingClientRect();
    setWidth(width);
    setHeight(height);
    setXScale((prev) => new scaleLinear(prev.domain, [0, width]));
    setYScale((prev) => new scaleLinear(prev.domain, [0, height]));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { daily } = await fetch(`./db/temp.json`).then((res) => res.json());
        const tempData = Object.values(
          daily.time
            .map((d, i) => {
              const date = new Date(d);
              const timestemp = new Date(`${date.getFullYear()}-${date.getMonth() + 1}`);
              return { year: date.getFullYear(), month: date.getMonth(), timestemp: Math.floor(timestemp.getTime() / 864000000), time: `${date.getFullYear()}-${date.getMonth() + 1}`, mean: (daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2, max: daily.temperature_2m_max[i], min: daily.temperature_2m_min[i], rain: daily.rain_sum[i] };
            })
            .reduce((acc, { year, month, timestemp, time, mean, max, min, rain }) => {
              acc[time] = acc[time] || { year, month, timestemp, time, max: -Infinity, min: Infinity, rain: 0, days: 0, mean: 0 };
              acc[time].max = Math.max(acc[time].max, max);
              acc[time].min = Math.min(acc[time].min, min);
              acc[time].rain += typeof rain === "number" ? rain : 0;
              acc[time].mean += typeof mean === "number" ? mean : 0;
              acc[time].days++;
              return acc;
            }, {})
        ).map((d) => ({ ...d, mean: d.mean / d.days }));
        setTemp(tempData);
        setXScale((prev) => new scaleLinear(extent(tempData.map((d) => d.year)), prev.range));
        setYScale((prev) => new scaleLinear(extent(tempData.map((d) => d.month)), prev.range));
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (!loaded)
    return (
      <div id="graph" ref={graphRef}>
        Loading...
      </div>
    );
  console.log(yScale.range, yScale.domain, height, yScale.scale(1));
  return (
    <div>
      <div id="graph" ref={graphRef}>
        <svg>
          <g className="rects">
            {temp.map((d) => (
              <rect key={d.time} x={xScale.scale(d.year)} y={yScale.scale(d.month)} width={1} height={height / 12} data-date={d.time} data-maxtemp={d.max} data-mintemp={d.min} data-meantemp={d.mean}></rect>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
