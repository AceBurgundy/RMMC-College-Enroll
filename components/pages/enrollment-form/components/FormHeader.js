import { Component, css } from "../../../../Component.js";

export default class FormHeader extends Component {
  constructor() {
    super();

    css(import.meta, [
      "../styles/header.css"
    ]);

    this.template = /*html*/ `
      <section class="form-header">
          <p>Student Data Profile</p>
          <p>Data Privacy Notice:</p>
          <p>The "school" Ramon Magsaysay Memorial Colleges is committed to respect each student's personal privacy in compliance with Data Privacy Act of 2012 while
            <br>
            ensuring its ability to fully carry out its responsibilities.<br><br>It is undestood that you agree to share your personal information by continuing to fill-up this form.
          </p>
      </section>
    `;
  }
}
