let weather;
const getWeather = async (lat, long) => {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,cloudcover,precipitation_probability&daily=weathercode&timezone=GMT`);
  weather = await res.json();
};
getWeather(25.05, 121.53);
