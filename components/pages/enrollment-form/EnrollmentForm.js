import { Component, css, redirect, uniqueId } from '../../../Component.js';

import PreviousScholasticData from './components/PreviousScholasticData.js';
import StudentClinicalBasalData from './components/StudentClinicalBasalData.js';
import ParentGuardianForm from './components/ParentGuardianData.js';
import YearCourseSemester from './components/YearCourseSemester.js';
import PersonalDetails from './components/PersonalDetails.js';
import FormFooter from './components/FormFooter.js';
import FormHeader from './components/FormHeader.js';
import Success from "../success/Success.js";

import { element } from '../../../Helpers.js';

css(import.meta, [
  "./styles/enrollment-form.css"
]);

export default class EnrollmentForm extends Component {
  constructor() {
    super();

    const formId = `enrollment-form-${uniqueId()}`;

    this.scripts = () => {
      const form = element(`#${formId}`);

      // Setup database columns
      window.onload = event => {
        event.preventDefault();

        const formElements = Array.from(form.elements);
        const uniqueNames = [
          ...new Set(
            formElements
              .map(element => element.name)
              .filter(name => name && name !== 'profile_image')
            )
          ];

        const data = { columns: uniqueNames };

        fetch('rmmc-enroll/backend/setup.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === undefined) return;
          alert(data.message);
        })
        .catch(error => console.error('Error:', error));
      };

      form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('rmmc-enroll/backend/save.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === undefined) return;
          if (!data.success) return alert(data.message);
          const isStudentId = !isNaN(parseFloat(data.message)) && [...data.message.toString()].length === 9;

          if (isStudentId) {
            return redirect({
              component: Success,
              componentArgument: { id_number: data.message },
              path: "/success"
            });
          }
        })
        .catch(error => {
          alert("Something went wrong");
          console.error('Error:', error);
        });
      };
    }

    this.template = /*html*/`
      <form id="${formId}" class="enrollment-form container column gap-default">
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
    `;
  }
}