const container = document.getElementById("container");
getWeather("Barcelona").then((data) => {
  container.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
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
