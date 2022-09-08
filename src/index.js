import format from "date-fns";
import "./style.css";

const plainHTML = `<div id="container">
    <div id="header"><span id="cityVal"></span>, <span id="dateVal">September 8, 09:32</span></div>
    <div id="main">
      <div id="left">
        <div id="humidity">Humidity: <span id="humVal"></span>%</div>
        <div id="temp">
          <div id="tempVal"></div><sup>°C</sup>
        </div>
        <div id="feelsLike">Feels like <span id="feelsVal"></span>°</div>
      </div>
      <div id="right">
        <img id='icon' src="https://openweathermap.org/img/wn/01d@4x.png" alt="">
        <div id="summary"></div>
      </div>
    </div>
    <div id="search">
      <div><input type="text" id="searchBox"></input>
      </div>
      <div>
        <button id='searchButton'>Search</button>
      </div>
    </div>
    <div id='error'>Ooooops, city not found!</div>
  </div>`;

document.body.innerHTML = plainHTML;

const container = document.getElementById("container");
const temp = document.getElementById("tempVal");
const hum = document.getElementById("humVal");
const feels = document.getElementById("feelsVal");
const summary = document.getElementById("summary");
const icon = document.getElementById("icon");
const city = document.getElementById("cityVal");

getWeather("Barcelona").then((data) => {
  city.textContent = data.name;
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
