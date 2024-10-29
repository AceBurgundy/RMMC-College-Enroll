import { Component, css } from '../Component.js';
import SelectField from '../widgets/select-inputs/SelectField.js';
import NumberField from '../widgets/inputs/NumberField.js';
import CourseSelect from './CourseSelect.js';

css(import.meta, [
  "./styles/form-section.css"
]);

export default class YearCourseSemester extends Component {
  constructor() {
    super();

    const selectData = {
      semester: [
        { value: "3", text: "SUMMER 2023-2024" },
        { value: "1", text: "1st semester" },
        { value: "2", text: "2nd semester" },
      ],
      schoolYear: [
        { value: "2023-2024", text: "2023-2024" },
        { value: "2024-2025", text: "2024-2025" },
      ],
    };

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Year Course Semester
        </div>

        <div class="two-column">
          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Selected Course</p>
              <p>Select a course you want to enroll in to</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${new CourseSelect()}
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Semester</p>
              <p>Select a semester your course will be enrolled at</p>
            </div>
            <div class="form__section__input-group__right row center left">
              ${
                new SelectField({
                  name: "semester",
                  options: selectData.semester
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Year</p>
              <p>Choose a school year as the final requirement</p>
            </div>
            <div class="form__section__input-group__right row center left">
              ${
                new SelectField({
                  name: "school-year",
                  options: selectData.schoolYear
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Entrance Exam Results</p>
              <p>Provide your entrance exam score</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new NumberField({
                  name: "entrance-exam-result",
                  required: true,
                  placeholder: "0"
                })
              }
            </div>
          </div>
        </div>
              
      </div>
    `;
  }
}
