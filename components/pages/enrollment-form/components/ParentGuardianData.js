import { Component, css } from '../../../../Component.js';

import RadioField from '../../../../widgets/select-inputs/RadioField.js';
import StringField from '../../../../widgets/inputs/StringField.js';
import InputGroup from './InputGroup.js';

export default class ParentGuardianForm extends Component {
  constructor() {
    super();

    css(import.meta, [
      "../styles/form-section.css"
    ]);

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Parent and Guardian Information
        </div>

        <div class="two-column">
          ${
            [
              new InputGroup({
                title: "Full Name (Parent)",
                info: "Please enter the full name of the parent.",
                inputs: new StringField({
                  name: "parent_full_name",
                  placeholder: "Full Name",
                  info: "This is the legal full name of the parent."
                })
              }),
              new InputGroup({
                title: "Contact Number (Parent)",
                info: "Enter a valid contact number for the parent.",
                inputs: new StringField({
                  name: "parent_contact_number",
                  placeholder: "Contact Number",
                  info: "Include the area code."
                })
              }),
              new InputGroup({
                title: "Address (Parent)",
                info: "Provide the full address of the parent.",
                inputs: new StringField({
                  name: "parent_address",
                  placeholder: "Address",
                  info: "Include street, city, and postal code."
                })
              }),
              new InputGroup({
                title: "Relationship",
                info: "What is the relationship to the student?",
                inputs: new StringField({
                  name: "parent_relationship",
                  placeholder: "Relationship",
                  info: "E.g., Mother, Father, Guardian."
                })
              }),
              new InputGroup({
                title: "House",
                info: "Select whether the house is owned or rented.",
                inputs: new RadioField({
                  name: "parent_house",
                  options: ["Own", "Rented"],
                  info: "Indicate ownership status."
                })
              }),
              new InputGroup({
                title: "Full Name (Guardian)",
                info: "Please enter the full name of the guardian.",
                inputs: new StringField({
                  name: "guardian_full_name",
                  placeholder: "Guardian's Full Name",
                  info: "This is the legal full name of the guardian."
                })
              }),
              new InputGroup({
                title: "Contact Number (Guardian)",
                info: "Enter a valid contact number for the guardian.",
                inputs: new StringField({
                  name: "guardian_contact_number",
                  placeholder: "Guardian's Contact Number",
                  info: "Include the area code."
                })
              }),
              new InputGroup({
                title: "Address (Guardian)",
                info: "Provide the full address of the guardian.",
                inputs: new StringField({
                  name: "guardian_address",
                  placeholder: "Guardian's Address",
                  info: "Include street, city, and postal code."
                })
              })
            ].join('')
          }
        </div>
      </div>
    `;
  }
}
