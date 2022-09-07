const container = document.getElementById("container");
const temp = document.getElementById("tempVal");
const hum = document.getElementById("humVal");
const feels = document.getElementById("feelsVal");
const summary = document.getElementById("summary");
const icon = document.getElementById("icon");

getWeather("Barcelona").then((data) => {
  temp.textContent = Math.round(data.main.temp);
  hum.textContent = data.main.humidity;
  feels.textContent = Math.round(data.main.feels_like);
  summary.textContent = data.weather[0].description;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
});
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=328f6f4253135075c7f774bc325350c4`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {}
}
