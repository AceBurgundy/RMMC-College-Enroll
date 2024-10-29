import { Component } from '../../../Component.js';

export default class Success extends Component {
  /**
   *
   * @param {String} id_number - The id number to be rendered
   */
  constructor({ id_number }) {
    super();

    this.scripts = () => {
      alert(`Your id number is: ${id_number}`);
    }

    this.template = /*html*/`
      <p></p>
    `
  }
}