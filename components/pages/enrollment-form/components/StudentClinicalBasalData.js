import { Component, css } from '../../../../Component.js';

import StringField from '../../../../widgets/inputs/StringField.js';
import SelectField from '../../../../widgets/select-inputs/SelectField.js';
import InputGroup from './InputGroup.js';

css(import.meta, [
  "../styles/form-section.css"
]);

export default class YearCourseSemester extends Component {
  constructor() {
    super();

    this.template = /*html*/`
      <div class="form__section">
        <div class="form__section__title">
          Student Clinical-Basal Data
        </div>

        <div class="two-column">
          ${
            [
              new InputGroup({
                title: "Age",
                info: "Please enter the age of the student in years.",
                inputs: new StringField({
                  name: "age",
                  placeholder: "Age",
                  info: "Enter the age in years."
                })
              }),
              new InputGroup({
                title: "Height (cm)",
                info: "Enter the height of the student in centimeters.",
                inputs: new StringField({
                  name: "height",
                  placeholder: "Height in cm",
                  info: "Provide height in centimeters."
                })
              }),
              new InputGroup({
                title: "Weight (kg)",
                info: "Enter the weight of the student in kilograms.",
                inputs: new StringField({
                  name: "weight",
                  placeholder: "Weight in kg",
                  info: "Provide weight in kilograms."
                })
              }),
              new InputGroup({
                title: "Blood Type",
                info: "Select the student's blood type.",
                inputs: new SelectField({
                  name: "blood_type",
                  options: ["A", "B", "AB", "O", "Unknown"],
                  info: "Choose from A, B, AB, O, or Unknown."
                })
              }),
              new InputGroup({
                title: "Congenital Diseases/Disabilities (if any)",
                info: "List any congenital diseases or disabilities.",
                inputs: [
                  new StringField({
                    name: "congenital_diseases",
                    placeholder: "Diseases/Disabilities",
                    info: "Describe any congenital diseases or disabilities."
                  }),
                  new StringField({
                    name: "date_diagnosed",
                    placeholder: "Date Diagnosed",
                    info: "Provide the date of diagnosis."
                  })
                ].join('')
              }),
              new InputGroup({
                title: "Previous Hospitalizations Due to Illness/Surgical Operation (if any)",
                info: "Provide dates of any previous hospitalizations.",
                inputs: [
                  new StringField({
                    name: "hospitalization_date_1",
                    placeholder: "Date 1",
                    info: "Enter the date of the first hospitalization."
                  }),
                  new StringField({
                    name: "hospitalization_date_2",
                    placeholder: "Date 2",
                    info: "Enter the date of the second hospitalization."
                  })
                ].join('')
              }),
              new InputGroup({
                title: "Allergies (if any)",
                info: "List any allergies, including medicine, food, and others.",
                inputs: new StringField({
                  name: "allergies",
                  placeholder: "List allergies",
                  info: "Mention all allergies that you have."
                })
              }),
              new InputGroup({
                title: "Medication (Emergency/Maintenance) & Indication(s) (if any)",
                info: "List any medications along with their indications.",
                inputs: [
                  new StringField({
                    name: "medication_1",
                    placeholder: "Medication 1",
                    info: "Enter the first medication name."
                  }),
                  new StringField({
                    name: "medication_2",
                    placeholder: "Medication 2",
                    info: "Enter the second medication name."
                  })
                ].join('')
              })
            ].join('')
          }
        </div>
      </div>
    `;
  }
}