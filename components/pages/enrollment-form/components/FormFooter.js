import { Component, css } from "../../../../Component.js";

css(import.meta, [
  "../styles/footer.css"
]);

export default class FormFooter extends Component {
  constructor() {
    super();

    this.template = /*html*/`
      <section class="form-footer">
        <p>Data Privacy Agreement</p>
				<br>
        <p>
          I hereby allow the school "Ramon Magsaysay Memorial Colleges Inc." to collect, use and process my personal data for legitimate educational or institutional interest as determined and enumerated in the Privacy Statement and other like circumstances, and allow its authorized personnel to process the information.
          <br><br>
          I am confirming that data entered with this admission is true and correct; and I understand that Ramon Magsaysay Memorial Colleges reserves the right to revise any decision made on the basis of the information I provide should be found to be untrue or incorrect.
          <br><br>
          Start of classes will be announced soon!
        </p>
				<br><br>
				<div class="row center spaced">
					<div class="row center gap">
						<input type="checkbox" required> Yes, I Agree
					</div>
					<button type="submit">Submit</button>
				</div>
      </section>
    `;
  }
}
