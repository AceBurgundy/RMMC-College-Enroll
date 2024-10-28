import { Component, css, uniqueId } from '../../Component.js';

css(import.meta, [
  "./style.css"
]);

/**
 * A custom component for creating a text input field with validation and error handling.
 *
 * @extends Component
 */
export default class StringField extends Component {
  /**
   * Creates a new StringField instance.
   *
   * @param {Object} options - Options for the StringField.
   * @param {string} options.name - The name attribute for the input field.
   * @param {boolean} [options.required=false] - Whether the field is required.
   * @param {string} [options.placeholder] - The placeholder text for the input field.
   * @param {string} [options.info] - Informational text to display below the input field.
   */
  constructor({ name, required, placeholder, info }) {
    super();

    if (!name) {
      throw new Error("name parameter cannot be empty");
    }

    const inputId = `string-field__input-${uniqueId()}`;
    let [errorMessageId, message, setErrorMessage] = this.state('', 'string-field__error');

    this.scripts = () => {
      const inputField = document.getElementById(inputId);

      const evaluate = () => {
        const isEmpty = required && inputField.value.trim() === '';
        setErrorMessage(isEmpty ? 'This field is required.' : '');
      };

      inputField.addEventListener('keyup', evaluate);
      inputField.addEventListener('click', evaluate);
    };

    this.template = /*html*/`
      <div class="string-field-group column gap left">
        <p class="string-field__error" id="${errorMessageId}">${message}</p>
        <input type="text" name="${name}" id="${inputId}" class="string-field__input" ${required ? "required" : ''} placeholder="${placeholder ?? ''}">
        <p class="string-field__info">${info ?? ''}</p>
      </div>
    `;
  }
}
