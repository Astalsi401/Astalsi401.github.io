function Content() {
  const [weather, setWeather] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [loc, setLoc] = React.useState({ lat: 25.05, long: 121.53, city: "臺北市" });
  const [cities, setCities] = React.useState([]);

  const handleLocationChange = React.useCallback(
    (e) => {
      setLoc(cities.find((c) => c.city === e.target.value));
    },
    [cities]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      // https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,cloudcover,precipitation_probability&daily=weathercode&timezone=GMT
      try {
        const [weatherData, citiesData] = await Promise.all([fetch(`./db/testData.json`).then((res) => res.json()), fetch("./db/臺灣鄉鎮市區經緯度.json").then((res) => res.json())]);
        setWeather(weatherData);
        setCities(citiesData);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [loc]);

  if (loaded) {
    return (
      <div>
        <select name="city" id="city" onChange={handleLocationChange}>
          {cities.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>
        <div>{weather.latitude}</div>
      </div>
    );
  }
  return <div>Loading...</div>;
}
