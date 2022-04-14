import html from "html-literal";

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

export default st => html`
  <section id="home">
    <h2>Enter a Missouri location to explore its weather factors:</h2>
    <form id="cityChoice">
      <label for="city">Select city or town:</label>
      <select name="city">
        <option value="39.099724,-94.578331">Kansas City</option>
        <option value="38.627003,-90.199402">St Louis</option>
      </select>

     
      <p><input type="submit" value="show weather data"/></p>
      
    </form>
    ${st.table}
  </section>
`;

// <!-- <h3>
//       Weather in ${st.weather.city} ${kelvinToFahrenheit(st.weather.temp)}F,
//       feels like ${kelvinToFahrenheit(st.weather.feelsLike)}F, humidity is
//       ${st.weather.humidity}, wind speed is ${st.weather.wind}, air pressure is
//       ${st.weather.pressure}, cloud cover is ${st.weather.clouds}
//     </h3> -->