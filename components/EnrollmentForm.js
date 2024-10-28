import { Component, uniqueId } from '../Component.js';
import ParentGuardianForm from './ParentGuardianData.js';
import PersonalDetails from './PersonalDetails.js';
import PreviousScholasticData from './PreviousScholasticData.js';
import YearCourseSemester from './YearCourseSemester.js';

export default class EnrollmentForm extends Component {
  constructor() {
    super();

    const formId = `enrollment-form-${uniqueId()}`;

    this.scripts = () => {
      const form = document.getElementById(formId);

      form.onsubmit = () => {

      };
    }

    this.template = /*html*/`
      <form id="${formId}" class="container column gap-default">
        ${
          [
            new YearCourseSemester(),
            new PersonalDetails(),
            new PreviousScholasticData(),
            new ParentGuardianForm()
          ].join('')
        }
      </form>
    `
  }
}