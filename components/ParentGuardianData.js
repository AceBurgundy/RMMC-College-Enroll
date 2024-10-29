import { Component, css } from '../Component.js';

import RadioField from '../widgets/select-inputs/RadioField.js';
import StringField from '../widgets/inputs/StringField.js';

css(import.meta, [
  "./styles/form-section.css"
]);

export default class ParentGuardianForm extends Component {
  constructor() {
    super();

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Parent and Guardian Information
        </div>

        <div class="two-column">
          <!-- Parent Information Section -->
          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Full Name (Parent)</p>
              <p>Please enter the full name of the parent.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "parent-full-name",
                  placeholder: "Full Name",
                  info: "This is the legal full name of the parent."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Contact Number (Parent)</p>
              <p>Enter a valid contact number for the parent.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "parent-contact-number",
                  placeholder: "Contact Number",
                  info: "Include the area code."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Address (Parent)</p>
              <p>Provide the full address of the parent.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "parent-address",
                  placeholder: "Address",
                  info: "Include street, city, and postal code."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Relationship</p>
              <p>What is the relationship to the student?</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "parent-relationship",
                  placeholder: "Relationship",
                  info: "E.g., Mother, Father, Guardian."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>House</p>
              <p>Select whether the house is owned or rented.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new RadioField({
                  name: "parent-house",
                  options: ["Own", "Rented"],
                  info: "Indicate ownership status."
                })
              }
            </div>
          </div>

          <!-- Guardian Information Section -->
          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Full Name (Guardian)</p>
              <p>Please enter the full name of the guardian.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "guardian-full-name",
                  placeholder: "Guardian's Full Name",
                  info: "This is the legal full name of the guardian."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Contact Number (Guardian)</p>
              <p>Enter a valid contact number for the guardian.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "guardian-contact-number",
                  placeholder: "Guardian's Contact Number",
                  info: "Include the area code."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Address (Guardian)</p>
              <p>Provide the full address of the guardian.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "guardian-address",
                  placeholder: "Guardian's Address",
                  info: "Include street, city, and postal code."
                })
              }
            </div>
          </div>

        </div>
      </div>
    `;
  }
}
