import { Component, css } from '../Component.js';

import SelectField from '../widgets/select-inputs/SelectField.js';
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
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "parent-full-name",
                    placeholder: "Full Name"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Contact Number (Parent)</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "parent-contact-number",
                    placeholder: "Contact Number"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Address (Parent)</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "parent-address",
                    placeholder: "Address"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Relationship</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "parent-relationship",
                    placeholder: "Relationship"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>House</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new RadioField({
                    name: "parent-house",
                    options: ["Own", "Rented"]
                  })
                }
              </div>
            </div>

            <!-- Guardian Information Section -->
            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Full Name (Guardian)</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "guardian-full-name",
                    placeholder: "Guardian's Full Name"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Contact Number (Guardian)</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "guardian-contact-number",
                    placeholder: "Guardian's Contact Number"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Address (Guardian)</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "guardian-address",
                    placeholder: "Guardian's Address"
                  })
                }
              </div>
            </div>

         </div>
      </div>
    `;
  }
}
