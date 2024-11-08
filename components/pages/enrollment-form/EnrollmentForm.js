import { Component, redirect, uniqueId } from '../../../Component.js';
import FormFooter from './components/FormFooter.js';
import FormHeader from './components/FormHeader.js';
import ParentGuardianForm from './components/ParentGuardianData.js';
import PersonalDetails from './components/PersonalDetails.js';
import PreviousScholasticData from './components/PreviousScholasticData.js';
import StudentClinicalBasalData from './components/StudentClinicalBasalData.js';
import YearCourseSemester from './components/YearCourseSemester.js';
import Success from "../success/Success.js";
import { element } from '../../../Helpers.js';

export default class EnrollmentForm extends Component {
  constructor() {
    super();

    const formId = `enrollment-form-${uniqueId()}`;

    this.scripts = () => {
      const form = element(`#${formId}`);

      form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost/rmmc-enroll/backend/save.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === undefined) return;

          if (data.success, data.message, !isNaN(parseFloat(data.message)), [...data.message.toString()].length === 9) {
            return redirect({
              component: Success,
              componentArgument: { id_number: data.message },
              path: "/success"
            });
          }

          if (!data.success) {
            alert(data.message)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };
    }

    this.template = /*html*/`
      <form id="${formId}" class="container column gap-default">
        ${
          [
            new FormHeader(),
            new YearCourseSemester(),
            new PersonalDetails(),
            new PreviousScholasticData(),
            new ParentGuardianForm(),
            new StudentClinicalBasalData(),
            new FormFooter()
          ].join('')
        }
      </form>
    `
  }
}