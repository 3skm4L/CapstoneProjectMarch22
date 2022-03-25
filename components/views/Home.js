import html from "html-literal";

export default () => html`
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
