import { Component, uniqueId } from '../../../Component.js';
import { element } from '../../../Helpers.js';

export default class Success extends Component {
  /**
   *
   * @param {String} email - The students email to generate id from
   */
  constructor({ email }) {
    super();

    const formId = `create-id-form-${uniqueId()}`;

    this.scripts = () => {
      const form = element(`#${formId}`);

      form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('rmmc-enroll/backend/generate_id.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === undefined) return;
          alert(data.message);
        })
        .catch(error => {
          alert("Something went wrong");
          console.error('Error:', error);
        });
      };
    }

    this.template = /*html*/`
      <p>Generate ID for: </p>
      <form id="${formId}">
        <input type="hidden" name="email" value="${email}">
        <button type="submit">${email}</button>
      </form>
    `
  }
}