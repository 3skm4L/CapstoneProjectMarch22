import html from "html-literal";

export default () => html`
  <section id="contact">
    <h2>
      I welcome your comments and feedback about my web app. I will read all
      provided feedback carefully and respond if necessary. I will also use your
      input to improve my app to better address your needs
    </h2>
    <form class="form" action="https://formspree.io/f/xwkybokv" method="POST">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label for="email"
          >Your email (so that I can respond to you, if needed):</label
        >
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label for="state">State:</label>
        <input type="text" id="state" name="state" />
      </div>
      <div>
        <label for="feedback">Your comments:</label>
        <textarea id="feedback" name="feedback" style="height:200px"></textarea>
      </div>
      <input type="submit" value="Submit" />
    </form>
  </section>
`;
