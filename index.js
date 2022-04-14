import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header()}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  // addEventListeners(st);
  // showData();
}

// function addEventListeners(st) {
//   // add menu toggle to bars icon in nav bar
//   document
//     .querySelector(".fa-bars")
//     .addEventListener("click", () =>
//       document.querySelector("nav > ul").classList.toggle("hidden--mobile")
//     );
// }

router.hooks({
  before: async (done, params) => {
    let view = "Home";

    if (params && params.data && params.data.view) {
      view = capitalize(params.data.view);
    }

    if (view === "Home") {
      if (params.params && params.params.city){
        console.log(params);
      const [lat, lon] = params.params.city.split(",");
      console.log('location[0]', 'location[1]');
      const response = await axios.get(
        `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&appid=a06d776079658e2dbf85d08865f15762`
      )
        state.Home.table = generateTable(response.data);
    }
    } else {
      console.log("test");
    }
    done();
  }
});

router
  .on({
    "/": () => {
      render(state.Home);
    },
    ":view": params => {
      let view = capitalize(params.data.view);
      render(state[view]);
    }
  })
  .resolve();

function generateTable(data){
  console.log(data);

  let rainAmount = 0;
  let lowTemp = data.list[0].main.temp;
  let highTemp = data.list[0].main.temp;;
  let lowWind = data.list[0].wind.speed;
  let highWind = data.list[0].wind.speed;;
  let pressure = 0;
  let lowHumid = data.list[0].main.humidity;
  let highHumid = data.list[0].main.humidity;
  let lowCloud = 0;
  let highCloud = 0;

  data.list.forEach((day, index) => {
    rainAmount += day.rain ? day.rain["1h"] : 0;
    pressure += (index === 0) ? 0 : Math.abs(day.main.pressure - data.list[index - 1].main.pressure);
    if (day.main.temp < lowTemp) lowTemp = day.main.temp;
    if (day.main.temp > highTemp) highTemp = day.main.temp;
    if (day.wind.speed < lowWind) lowWind = day.wind.speed;
    if (day.wind.speed > highWind) highWind = day.wind.speed;

    if (day.main.humidity < lowHumid) lowHumid = day.main.humidity;
    if (day.main.humidity > highHumid)
      highHumid = day.main.humidity;

    if (day.clouds.all < lowCloud) lowCloud = day.clouds.all;
    if (day.clouds.all > highCloud) highCloud = day.clouds.all;

  })
  
  const tables = `<table style="border: 1px solid black;">
  <thead>
    <th style="border: 1px solid black;">Hour of the day</th>
    <th style="border: 1px solid black;">Avg temp for the hour</th>
    <th style="border: 1px solid black;">Cloud cover</th>
    <th style="border: 1px solid black;">Wind speed</th>
    <th style="border: 1px solid black;">Barometric pressure</th>
    <th style="border: 1px solid black;">Rain</th>
    <th style="border: 1px solid black;">Humidity</th>
  </thead>
  <tbody>
   ${data.list.map((hour, index) => {
    return `<tr>
    <td style="border: 1px solid black;">${index + 1}</td>
    <td style="border: 1px solid black;">${kelvinToFahrenheit(hour.main.temp)}</td>
    <td style="border: 1px solid black;">${hour.clouds.all}</td>
    <td style="border: 1px solid black;">${hour.wind.speed}</td>
    <td style="border: 1px solid black;">${hour.main.pressure}</td>
    <td style="border: 1px solid black;">${hour.rain ? hour.rain["1h"] : "0"}</td>
    <td style="border: 1px solid black;">${hour.main.humidity}</td>
    
    </tr>`
   })}
  </tbody>
  </table>

  <table>
   <thead>
   <th style="border: 1px solid black;">Fluctuation in temperature</th>
   <th style="border: 1px solid black;">Fluctuations in cloud cover</th>
   <th style="border: 1px solid black;">Fluctuations in wind speed</th>
   <th style="border: 1px solid black;">Fluctuations in barometric pressure (absolute sum of hourly changes)</th>
   <th style="border: 1px solid black;">Precipitation amount (rain)</th>
  <th style="border: 1px solid black;">Fluctuations in humidity</th>
   </thead>
   <tbody>
   <tr>
        <td style="border: 1px solid black;">${kelvinToFahrenheit(highTemp) - kelvinToFahrenheit(lowTemp)}</td>
        <td style="border: 1px solid black;">${highCloud - lowCloud}</td>
        <td style="border: 1px solid black;">${highWind - lowWind}</td>
        <td style="border: 1px solid black;">${pressure}</td>
        <td style="border: 1px solid black;">${rainAmount}</td>
        <td style="border: 1px solid black;">${highHumid - lowHumid}</td>
   </tr>
   </tbody>
    </table>`;
  return tables;
}
//console.log(process.env.NAME);
const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);