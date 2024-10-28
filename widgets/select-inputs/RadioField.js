import { Component, css, uniqueId } from '../../Component.js';

css(import.meta, [
  "style.css"
]);

/**
 * A custom component for creating a radio button field with options, multiple selection support, and validation.
 *
 * @extends Component
 */
export default class RadioField extends Component {
  /**
   * Creates a new RadioField instance.
   *
   * @param {Object} options - Options for the RadioField.
   * @param {string} options.name - The name attribute for the radio buttons.
   * @param {boolean} [options.required=false] - Whether at least one selection is required.
   * @param {Array<string>} options.options - List of options for the radio buttons.
   * @param {boolean} [options.multiple=false] - Whether each option should have a unique name based on its label.
   * @param {string} [options.info] - Informational text to display below the radio buttons.
   */
  constructor({ name, required, options, multiple, info }) {
    super();

    if (!name) {
      throw new Error("name parameter cannot be empty");
    }

    if (!Array.isArray(options) || options.length === 0) {
      throw new Error("options parameter must be a non-empty array of strings");
    }

    const fieldId = `radio-field__${uniqueId()}`;
    let [errorMessageId, message, setErrorMessage] = this.state('', 'radio-field__error');

    this.scripts = () => {
      const radioButtons = document.querySelectorAll(`[name^="${name}"]`);

      const evaluate = () => {
        const isSelected = Array.from(radioButtons).some(radio => radio.checked);
        setErrorMessage(required && !isSelected ? 'Please select an option.' : '');
      };

      radioButtons.forEach(radio => {
        radio.addEventListener('change', evaluate);
      });
    };

    this.template = /*html*/`
      <div class="control-field-group column gap left" id="${fieldId}">
        <p class="control-field__error" id="${errorMessageId}">${message}</p>
        <div class="radio-field__options row gap-default">
          ${
            options.map(option => `
              <label class="radio-field__label">
                <input
                  type="radio"
                  name="${multiple ? `${name}-${option}` : name}"
                  value="${option}"
                  class="radio-field__input">
                ${option}
              </label>
            `).join('')
          }
        </div>
        <p class="control-field__info">${info ?? ''}</p>
      </div>
    `;
  }
}
