import html from "html-literal";

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

export default st => html`
  <section id="home">
    <h2>Enter a US location to explore its weather factors:</h2>
    <form class="form">
      <label for="state">Select state:</label>
      <select name="state">
        <option value="AK">Alaska</option>
        <!--is there an API to list all states or should it be done manually?-->
        <option value="AZ">Arizona</option>
        <option value="AL">Alabama</option>
      </select>
    </form>
    <h3>
      Weather in ${st.weather.city} ${kelvinToFahrenheit(st.weather.temp)}F,
      feels like ${kelvinToFahrenheit(st.weather.feelsLike)}F, humidity is
      ${st.weather.humidity}, wind speed is ${st.weather.wind}, air pressure is
      ${st.weather.pressure}, cloud cover is ${st.weather.clouds}
    </h3>
  </section>

  <section>
    <form>
      <label for="city">Select city or town:</label>
      <select name="city">
        <!--I can't possibly list all cities in every state - is there an APi for this?-->
      </select>
    </form>
  </section>
  <section>
    <h2>Select weather factors to track:</h2>
    <form class="form">
      <input type="checkbox" name="barp" value="barometric_presssure" />
      <label for="barp">Barometric pressure</label>
      <input type="checkbox" name="temp" value="temperature" />
      <label for="temp">Temperature</label>
    </form>
  </section>
`;
