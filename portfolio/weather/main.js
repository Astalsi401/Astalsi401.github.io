function Content() {
  const [weather, setWeather] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [loc, setLoc] = React.useState({ lat: 25.05, long: 121.53, city: "臺北市" });
  const [cities, setCities] = React.useState([]);
  const [wmo, setWmo] = React.useState({});

  const handleLocationChange = React.useCallback(
    (e) => {
      setLoc(cities.find((c) => c.city === e.target.value));
    },
    [cities]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      // https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,cloudcover,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=GMT
      try {
        const [weatherData, citiesData, wmoData] = await Promise.all([fetch(`./db/testData.json`).then((res) => res.json()), fetch("./db/臺灣鄉鎮市區經緯度.json").then((res) => res.json()), fetch("./db/wmo.json").then((res) => res.json())]);
        setWeather(weatherData);
        setCities(citiesData);
        setWmo(wmoData);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [loc]);

  if (loaded) {
    const { time, weathercode, temperature_2m_max, temperature_2m_min, precipitation_probability_mean } = weather.daily;
    const forecast = time.map((t, i) => {
      t = new Date(t);
      return {
        time: `${t.getMonth() + 1}/${t.getDate()}`,
        wmo: weathercode[i],
        temp_max: `${temperature_2m_max[i]}°C`,
        temp_min: `${temperature_2m_min[i]}°C`,
        prob: `${precipitation_probability_mean[i]}%`,
      };
    });
    return (
      <div className="container-fluid px-2">
        <div className="row my-2">
          <div class="col-sm-3">
            <select name="city" id="city" onChange={handleLocationChange}>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>
          <div class="col-sm-9">
            <div>
              <span className="text-bold">目前溫度</span>
              <br />
              {weather.current_weather.temperature}
            </div>
            <div>
              <span className="text-bold">WMO Weather interpretation codes</span>
              <br />
              {weather.current_weather.weathercode}
            </div>
            <div>
              <span className="text-bold">雲量</span>
              <br />
              {weather.current_weather.cloudcover}
            </div>
            <div>
              <span className="text-bold">降雨機率</span>
              <br />
              {weather.current_weather.precipitation_probability}
            </div>
          </div>
        </div>
        <div className="row my-2">
          {forecast.map((d) => (
            <div key={d.time} className="col-md-8 mx-auto">
              <div>{d.time}</div>
              <div>{d.wmo}</div>
              <div>{d.temp_max}</div>
              <div>{d.temp_min}</div>
              <div>{d.prob}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}
