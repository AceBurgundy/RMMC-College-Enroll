import { Component, css, uniqueId } from '../../Component.js';
import { element } from '../../Helpers.js';

/**
 * A custom component for creating a select field with options, multi-select support, and validation.
 *
 * @extends Component
 */
export default class SelectField extends Component {
  /**
   * Creates a new SelectField instance.
   *
   * @param {Object} options - Options for the SelectField.
   * @param {string} options.name - The name attribute for the select field.
   * @param {boolean} [options.required=false] - Whether at least one selection is required.
   * @param {Array<string>|Array<Object>} options.options - List of options for the select dropdown.
   *      Can be an array of strings or an array of objects with 'value' and 'text' properties.
   * @param {boolean} [options.multiple=false] - Allows multiple selections if true.
   * @param {string} [options.placeholder] - Used as the text for the first option.
   * @param {string} [options.info] - Informational text to display below the select field.
   */
  constructor({ name, required = false, options, multiple = false, placeholder, info }) {
    super();

    css(import.meta, [
      "style.css"
    ]);

    if (!name) {
      throw new Error("name parameter cannot be empty");
    }

    if (!Array.isArray(options) || options.length === 0) {
      throw new Error("options parameter must be a non-empty array");
    }

    const selectId = `select-field__${uniqueId()}`;
    let [errorMessageId, message, setErrorMessage] = this.state('', 'select-field__error');

    this.scripts = () => {
      const selectField = element(`#${selectId}`);

      const evaluate = () => {
        const hasSelection = multiple
          ? Array.from(selectField.selectedOptions).length > 0
          : selectField.value !== '';

        setErrorMessage(required && !hasSelection ? 'Please select an option.' : '');
      };

      selectField.addEventListener('change', evaluate);
      selectField.addEventListener('blur', evaluate);
    };

    // Helper function to render options based on type
    const renderOptions = () => options.map(option => {
      if (typeof option === 'string') {
        return /*html*/`<option value="${option}">${option}</option>`;
      }

      if (typeof option === 'object' && option.value && option.text) {
        return /*html*/`<option value="${option.value}">${option.text}</option>`;
      }

      throw new Error("Each option must be a string or an object with 'value' and 'text' properties");
    }).join('');

    this.template = /*html*/`
      <div class="control-field-group column gap left">
        <p class="control-field__error" id="${errorMessageId}">${message}</p>
        <select
          name="${name}"
          id="${selectId}"
          ${multiple ? "multiple" : ''}
          ${required ? "required" : ''}
          class="select-field__input">
            <option disabled selected>${placeholder ?? 'Select an option'}</option>
            ${renderOptions()}
        </select>
        <p class="control-field__info">${info ?? ''}</p>
      </div>
    `;
  }
}
