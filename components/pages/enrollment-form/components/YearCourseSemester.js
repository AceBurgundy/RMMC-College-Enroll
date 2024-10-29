import { Component, css } from '../../../../Component.js';
import SelectField from '../../../../widgets/select-inputs/SelectField.js';
import NumberField from '../../../../widgets/inputs/NumberField.js';
import CourseSelect from './CourseSelect.js';
import InputGroup from './InputGroup.js';

css(import.meta, ["../styles/form-section.css"]);

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
          ${
            [
              new InputGroup({
                title: "Selected Course",
                info: "Choose the course you want to enroll in.",
                inputs: new CourseSelect()
              }),
              new InputGroup({
                title: "Semester",
                info: "Select the semester you want to enroll in.",
                inputs: new SelectField({
                  name: "semester",
                  options: selectData.semester,
                  info: "Choose a semester for your enrollment."
                })
              }),
              new InputGroup({
                title: "School Year",
                info: "Choose the school year you want to enroll in.",
                inputs: new SelectField({
                  name: "school_year",
                  options: selectData.schoolYear,
                  info: "Select the academic year."
                })
              }),
              new InputGroup({
                title: "Entrance Exam Results",
                info: "Enter your entrance exam score.",
                inputs: new NumberField({
                  name: "entrance_exam_result",
                  placeholder: "0",
                  info: "Provide your score for the entrance exam."
                })
              })
            ].join('')
          }
        </div>
      </div>
    `;
  }
}
