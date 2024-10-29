import { Component } from '../../../../Component.js';

export default class InputGroup extends Component {
  /**
   * Creates an input group with a title, info, and a set of inputs.
   * @param {Object} options - The options for creating the input group.
   * @param {string} options.title - The title of the input group.
   * @param {string} options.info - Additional information about the input group.
   * @param {string} options.inputs - The HTML for the input elements.

   * @returns {string} The HTML for the input group.
  */
  constructor({ title, info, inputs }) {
    super();

    this.template = /*html*/`
      <div class="form__section__input-group">
        <div class="form__section__input-group__left column gap">
          <p>${ title }</p>
          <p>${ info }</p>
        </div>
        <div class="form__section__input-group__right column left just-center">
          ${ inputs }
        </div>
      </div>
    `;
  }
}