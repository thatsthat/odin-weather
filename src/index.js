import { format } from "date-fns-tz";
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
        <img id='icon' alt="">
        <div id="summary"></div>
      </div>
    </div>
    <div id="search">
      <div><input type="text" id="searchBox"></input>
      </div>
      <div id="buttonsRow">
        <div>
          <button id='searchButton'>Search</button>
        </div>
          <div id="tempToggle">
          <div>
            <input type="radio" id="C" name="tFormat" value="C">
            <label for="C">°C</label>
          </div>
          <div>
            <input type="radio" id="F" name="tFormat" value="F">
            <label for="F">°F</label>
          </div>
         </div>
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
const cityVal = document.getElementById("cityVal");
const date = document.getElementById("dateVal");
const errorMessage = document.getElementById("error");
const myButton = document.getElementById("searchButton");
const inpBox = document.getElementById("searchBox");

myButton.addEventListener("click", () => {
  getWeather(inpBox.value);
  inpBox.value = "";
});

// 'Enter' key is equivalent to done button click
inpBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) myButton.click();
});

getWeather("Barcelona");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=328f6f4253135075c7f774bc325350c4`,
      { mode: "cors" }
    );
    const data = await response.json();
    cityVal.textContent = data.name;
    const dt = new Date((data.dt + data.timezone) * 1000);
    //date.textContent = new Date(data.dt * 1000);
    const formattedDate = `${dt.toUTCString()}`;
    date.textContent = dt.toLocaleString("en-GB", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    temp.textContent = Math.round(data.main.temp);
    hum.textContent = data.main.humidity;
    feels.textContent = Math.round(data.main.feels_like);
    summary.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  } catch (error) {
    console.log(error);
    errorMessage.style.display = "block";
  }
}
