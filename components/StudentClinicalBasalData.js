import { Component, css } from '../Component.js';
import SelectField from '../widgets/select-inputs/SelectField.js';
import StringField from '../widgets/inputs/StringField.js';

css(import.meta, [
  "./styles/form-section.css"
]);

export default class StudentClinicalBasalData extends Component {
  constructor() {
    super();

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Student Clinical-Basal Data
        </div>

        <div class="two-column">
          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Age</p>
              <p>Please enter the age of the student in years.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "age",
                  placeholder: "Age",
                  info: "Enter the age in years."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Height (cm)</p>
              <p>Enter the height of the student in centimeters.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "height",
                  placeholder: "Height in cm",
                  info: "Provide height in centimeters."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Weight (kg)</p>
              <p>Enter the weight of the student in kilograms.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "weight",
                  placeholder: "Weight in kg",
                  info: "Provide weight in kilograms."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Blood Type</p>
              <p>Select the student's blood type.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new SelectField({
                  name: "blood-type",
                  options: ["A", "B", "AB", "O", "Unknown"],
                  info: "Choose from A, B, AB, O, or Unknown."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Congenital Diseases/Disabilities (if any)</p>
              <p>List any congenital diseases or disabilities.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                [
                  new StringField({
                    name: "congenital-diseases",
                    placeholder: "Diseases/Disabilities",
                    info: "Describe any congenital diseases or disabilities."
                  }),
                  new StringField({
                    name: "date-diagnosed",
                    placeholder: "Date Diagnosed",
                    info: "Provide the date of diagnosis."
                  })
                ].join('')
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Previous Hospitalizations Due to Illness/Surgical Operation (if any)</p>
              <p>Provide dates of any previous hospitalizations.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "hospitalization-date-1",
                  placeholder: "Date 1",
                  info: "Enter the date of the first hospitalization."
                })
              }
              ${
                new StringField({
                  name: "hospitalization-date-2",
                  placeholder: "Date 2",
                  info: "Enter the date of the second hospitalization."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Allergies (if any)</p>
              <p>List any allergies, including medicine, food, and others.</p>
            </div>
            <div class="form__section__input-group__right column left just-center">
              ${
                new StringField({
                  name: "allergies",
                  placeholder: "List allergies",
                  info: "Mention all allergies that you have."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Medication (Emergency/Maintenance) & Indication(s) (if any)</p>
              <p>List any medications along with their indications.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "medication-1",
                  placeholder: "Medication 1",
                  info: "Enter the first medication name."
                })
              }
              ${
                new StringField({
                  name: "medication-2",
                  placeholder: "Medication 2",
                  info: "Enter the second medication name."
                })
              }
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
