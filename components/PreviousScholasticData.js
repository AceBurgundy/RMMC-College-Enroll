import { Component, css } from '../Component.js';

import SelectField from '../widgets/select-inputs/SelectField.js';
import StringField from '../widgets/inputs/StringField.js';

css(import.meta, [
  "./styles/form-section.css"
]);

export default class PreviousScholasticData extends Component {
  constructor() {
    super();

    const selectData = {
      elementarySchoolYears: [
        "1969-1970", "1970-1971", "1971-1972", "1972-1973", "1973-1974", "1974-1975", "1975-1976",
        "1976-1977", "1977-1978", "1978-1979", "1979-1980", "1980-1981", "1981-1982", "1982-1983",
        "1983-1984", "1984-1985", "1985-1986", "1986-1987", "1987-1988", "1988-1989", "1989-1990",
        "1990-1991", "1991-1992", "1992-1993", "1993-1994", "1994-1995", "1995-1996", "1996-1997",
        "1997-1998", "1998-1999", "1999-2000", "2000-2001", "2001-2002", "2002-2003", "2003-2004",
        "2004-2005", "2005-2006", "2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011",
        "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018",
        "2018-2019", "2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"
      ],
      higherSchoolYears: [
        "1999-2000", "2000-2001", "2001-2002", "2002-2003", "2003-2004",
        "2004-2005", "2005-2006", "2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011",
        "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018",
        "2018-2019", "2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"
      ],
    };

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Previous Scholastic Data
        </div>

        <div class="two-column">
          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Elementary Completed</p>
              <p>Choose where you completed elementary education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "elementary-school-name",
                  placeholder: "X Elementary School",
                  info: "Enter the name of your elementary school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Section</p>
              <p>Specify your section during elementary school.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "elementary-school-section",
                  placeholder: "e.g., Hanay",
                  info: "Enter your section name in elementary school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Year</p>
              <p>Select the year you completed elementary education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new SelectField({
                  name: "elementary-school-year",
                  options: selectData.elementarySchoolYears,
                  info: "Choose the school year of your elementary completion."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Junior High Completed</p>
              <p>Specify where you completed junior high education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "junior-high-school-name",
                  placeholder: "X Junior High School",
                  info: "Enter the name of your junior high school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Address</p>
              <p>Provide the address of your junior high school.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "junior-high-school-address",
                  placeholder: "Block, Lot, Street, etc.",
                  info: "Enter the full address of your junior high school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Year</p>
              <p>Select the year you completed junior high education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new SelectField({
                  name: "junior-high-school-year",
                  options: selectData.higherSchoolYears,
                  info: "Choose the school year of your junior high completion."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>Senior High Completed</p>
              <p>Specify where you completed senior high education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "senior-high-school-name",
                  placeholder: "X Senior High School",
                  info: "Enter the name of your senior high school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Address</p>
              <p>Provide the address of your senior high school.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new StringField({
                  name: "senior-high-school-address",
                  placeholder: "Block, Lot, Street, etc.",
                  info: "Enter the full address of your senior high school."
                })
              }
            </div>
          </div>

          <div class="form__section__input-group">
            <div class="form__section__input-group__left column gap">
              <p>School Year</p>
              <p>Select the year you completed senior high education.</p>
            </div>
            <div class="form__section__input-group__right column left">
              ${
                new SelectField({
                  name: "senior-high-school-year",
                  options: selectData.higherSchoolYears,
                  info: "Choose the school year of your senior high completion."
                })
              }
            </div>
          </div>
        </div>
        
      </div>
    `;
  }
}
