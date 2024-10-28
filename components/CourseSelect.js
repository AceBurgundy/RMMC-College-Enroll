import { Component, uniqueId } from '../Component.js';

export default class CourseSelect extends Component {
  constructor() {
    super();

    const radioOptions = ["College", "Masteral", "SHS", "TVET"];

    const selectData = {
      College: [
        { value: "082", text: "Associate in Computer Technology" },
        { value: "010", text: "BS in Accountancy" },
        { value: "174", text: "BS in Business Administration - FINANCIAL MANAGEMENT" },
        { value: "176", text: "BS in Business Administration - MARKETING MANAGEMENT" },
        { value: "179", text: "BS in Business Administration - OPERATION MANAGEMENT" },
        { value: "080", text: "BS in Computer Science" },
        { value: "100", text: "BS in Customs Administration" },
        { value: "220", text: "BS in Environmental Science" },
        { value: "180", text: "BS in Hospitality Management" },
        { value: "160", text: "BS in Information Technology" },
        { value: "013", text: "BS in Internal Auditing" },
        { value: "012", text: "BS in Management Accounting" },
        { value: "230", text: "BS in Mathematics" },
        { value: "140", text: "BS in Office Administration - OFFICE MANAGEMENT" },
        { value: "170", text: "BS in Real Estate Management" },
        { value: "150", text: "BS in Social Work" },
        { value: "181", text: "BS in Tourism Management" },
        { value: "219", text: "BTL Education - HOME ECONOMICS" },
        { value: "600", text: "Bachelor of Arts in Communication" },
        { value: "601", text: "Bachelor of Arts in English Language" },
        { value: "602", text: "Bachelor of Arts in Psychology" },
        { value: "530", text: "Bachelor of Culture and Arts Education" },
        { value: "218", text: "Bachelor of Early Childhood Education" },
        { value: "217", text: "Bachelor of Elementary Education" },
        { value: "083", text: "Bachelor of Library & Info Science" },
        { value: "603", text: "Bachelor of Performing Arts - DANCE" },
        { value: "138", text: "Bachelor of Physical Education" },
        { value: "604", text: "Bachelor of Public Administration" },
        { value: "139", text: "Bachelor of Science in Biology" },
        { value: "050", text: "Bachelor of Science in Civil Engineering - Structural Engineering" },
        { value: "091", text: "Bachelor of Science in Criminology" },
        { value: "130", text: "Bachelor of Science in Exercise and Sports Science" },
        { value: "750", text: "Bachelor of Science in Midwifery" },
        { value: "760", text: "Bachelor of Science in Nursing" },
        { value: "700", text: "Bachelor of Science in Pharmacy" },
        { value: "133", text: "Bachelor of Secondary Education - MATHEMATICS" },
        { value: "134", text: "Bachelor of Secondary Education - SCIENCE" },
        { value: "132", text: "Bachelor of Secondary Education - FILIPINO" },
        { value: "131", text: "Bachelor of Secondary Education - ENGLISH" },
        { value: "135", text: "Bachelor of Secondary Education - MAPEH" },
        { value: "136", text: "Bachelor of Secondary Education - PHYSICAL SCIENCE" },
        { value: "137", text: "Bachelor of Secondary Education - SOCIAL STUDIES" },
        { value: "137", text: "Bachelor of Secondary Education - GENERAL SCIENCE" },
      ],
      Masteral: [
        { value: "303", text: "MS in Criminal Justice - CRIMINOLOGY" },
        { value: "302", text: "Master of Arts - ENGLISH" },
        { value: "301", text: "Master of Arts - GUIDANCE AND COUNSELING" },
        { value: "300", text: "Master of Arts - EDUCATIONAL MANAGEMENT" },
      ],
      SHS: [
        { value: "201", text: "SHS - ABM" },
        { value: "202", text: "SHS - HUMSS" },
        { value: "203", text: "SHS - STEM" },
        { value: "204", text: "SHS - GAS" },
      ],
      TVET: [
        { value: "990", text: "Technical Vocational Education Training" },
      ]
    }

    const radioId = `course-radio-${uniqueId()}`;
    const selectId = `course-select-${uniqueId()}`;

    this.scripts = () => {
      const radioContainer = document.getElementById(radioId);
      const select = document.getElementById(selectId);

      radioContainer.addEventListener('change', (event) => {
        if (event.target.name === 'selected-course') {
          const selectedRadio = event.target.value;
          const options = selectData[selectedRadio] || [];

          select.innerHTML = options
            .map(option => `<option value="${option.value}">${option.text}</option>`)
            .join('');
        }
      });
    }

    this.template = /*html*/`
      <div class="column gap-large left">
        <div class="control-field-group column gap left" id="${radioId}">
          <div class="radio-field__options row gap-default">
            ${
              radioOptions.map(option => `
                <label class="radio-field__label">
                  <input
                    type="radio"
                    name="selected-course"
                    value="${option}"
                    class="radio-field__input">
                  ${option}
                </label>
              `).join('')
            }
          </div>
          <p class="control-field__info">Changes you make here will update the options below</p>
        </div>

        <div class="control-field-group column gap left">
          <select
            name="selected-course-details"
            id="${selectId}"
            class="select-field__input">
            <option disabled selected>Select an option above</option>
          </select>
          <p class="control-field__info">Choose a more specific option for the form</p>
        </div>
      </div>
    `;
  }
}