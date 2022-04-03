import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  addEventListeners(st);
}

function addEventListeners(st) {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

router.hooks({
  before: (done, params) => {
    let view = "Home";

    if (params && params.data && params.data.view) {
      view = capitalize(params.data.view);
    }

    if (view === "Home") {
      console.log(process.env.OPENWEATHERMAPAPI);
      console.log(process.env.NODE_ENV);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAPAPI}&q=st.%20louis`
        )
        .then(response => {
          state.Home.weather = {};
          state.Home.weather.city = response.data.name;
          state.Home.weather.temp = response.data.main.temp;
          state.Home.weather.feelsLike = response.data.main.feels_like;
          state.Home.weather.description = response.data.weather[0].main;
          state.Home.weather.humidity = response.data.main.humidity;
          state.Home.weather.pressure = response.data.main.pressure;
          state.Home.weather.wind = response.data.wind.speed;
          state.Home.weather.clouds = response.data.clouds.all;
          done();
        })
        .catch(err => console.log(err));
    }
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

//console.log(process.env.NAME);
