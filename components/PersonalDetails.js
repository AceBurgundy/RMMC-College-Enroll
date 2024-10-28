import { Component, css } from '../Component.js';
import SelectField from '../widgets/select-inputs/SelectField.js';
import RadioField from '../widgets/select-inputs/RadioField.js';
import StringField from '../widgets/inputs/StringField.js';

css(import.meta, [
  "./styles/form-section.css"
]);

export default class PersonalDetails extends Component {
  constructor() {
    super();

    const selectData = {
      semester: [
        { value: "3", text: "SUMMER 2023-2024" },
        { value: "1", text: "1st semester" },
        { value: "2", text: "2nd semester" },
      ],
      schoolYear: [
        { value: "2023-2024", text: "2023-2024" },
        { value: "2024-2025", text: "2024-2025" },
      ],
      ethnic: [
        { value: "Blaan", text: "Blaan" },
        { value: "T'boli", text: "T'boli" },
        { value: "Taut Bato", text: "Taut Bato" },
        { value: "Tausug", text: "Tausug" },
        { value: "Tawbuid", text: "Tawbuid" },
        { value: "Ternateño", text: "Ternateño" },
        { value: "Tiruray", text: "Tiruray" },
        { value: "Tsinoy", text: "Tsinoy" },
        { value: "Waray", text: "Waray" },
        { value: "Yakan", text: "Yakan" },
        { value: "Yogad", text: "Yogad" },
        { value: "Adasen", text: "Adasen" },
        { value: "Agta", text: "Agta" },
        { value: "Aklanon", text: "Aklanon" },
        { value: "Alangan", text: "Alangan" },
        { value: "Alta", text: "Alta" },
        { value: "Amerasian", text: "Amerasian" },
        { value: "Ati", text: "Ati" },
        { value: "Atta", text: "Atta" },
        { value: "Badjao", text: "Badjao" },
        { value: "Bagobo", text: "Bagobo" },
        { value: "Balangao", text: "Balangao" },
        { value: "Balangingi", text: "Balangingi" },
        { value: "Bangon", text: "Bangon" },
        { value: "Bantoanon", text: "Bantoanon" },
        { value: "Banwaon", text: "Banwaon" },
        { value: "Batak", text: "Batak" },
        { value: "Bicolano", text: "Bicolano" },
        { value: "Binukid", text: "Binukid" },
        { value: "Boholano", text: "Boholano" },
        { value: "Bolinao", text: "Bolinao" },
        { value: "Bontoc", text: "Bontoc" },
        { value: "Buhid", text: "Buhid" },
        { value: "Butuanon", text: "Butuanon" },
        { value: "Caluyanon", text: "Caluyanon" },
        { value: "Capiznon", text: "Capiznon" },
        { value: "Caviteño", text: "Caviteño" },
        { value: "Cebuano", text: "Cebuano" },
        { value: "Cotabateño", text: "Cotabateño" },
        { value: "Davaoeño", text: "Davaoeño" },
        { value: "Ermiteño", text: "Ermiteño" },
        { value: "Ga dang", text: "Ga dang" },
        { value: "Gaddang", text: "Gaddang" },
        { value: "Hanunoo", text: "Hanunoo" },
        { value: "Higaonon", text: "Higaonon" },
        { value: "Ibaloi", text: "Ibaloi" },
        { value: "Ibanag", text: "Ibanag" },
        { value: "Ifugao", text: "Ifugao" },
        { value: "Ikalahan", text: "Ikalahan" },
        { value: "Illanun", text: "Illanun" },
        { value: "Ilocano", text: "Ilocano" },
        { value: "Ilonggo", text: "Ilonggo" },
        { value: "Ilongot", text: "Ilongot" },
        { value: "Inonhan", text: "Inonhan" },
        { value: "Iraya", text: "Iraya" },
        { value: "Isinai", text: "Isinai" },
        { value: "Isneg", text: "Isneg" },
        { value: "Itneg", text: "Itneg" },
        { value: "Ivatan", text: "Ivatan" },
        { value: "Kagayanen", text: "Kagayanen" },
        { value: "Kalagan", text: "Kalagan" },
        { value: "Kalinga", text: "Kalinga" },
        { value: "Kamayo", text: "Kamayo" },
        { value: "Kankanaey", text: "Kankanaey" },
        { value: "Kapampangan", text: "Kapampangan" },
        { value: "Karao", text: "Karao" },
        { value: "Kasiguranin", text: "Kasiguranin" },
        { value: "Kinaray-a", text: "Kinaray-a" },
        { value: "Korean Filipinos", text: "Korean Filipinos" },
        { value: "Magahat", text: "Magahat" },
        { value: "Maguindanaon", text: "Maguindanaon" },
        { value: "Malaweg", text: "Malaweg" },
        { value: "Malaynon", text: "Malaynon" },
        { value: "Mamanwa", text: "Mamanwa" },
        { value: "Mandaya", text: "Mandaya" },
        { value: "Manguwangan", text: "Manguwangan" },
        { value: "Manobo", text: "Manobo" },
        { value: "Maranao", text: "Maranao" },
        { value: "Masbateño", text: "Masbateño" },
        { value: "Palawano", text: "Palawano" },
        { value: "Palaweño", text: "Palaweño" },
        { value: "Pangasinense", text: "Pangasinense" },
        { value: "Paranan", text: "Paranan" },
        { value: "Porohanon", text: "Porohanon" },
        { value: "Ratagnon", text: "Ratagnon" },
        { value: "Romblomanon", text: "Romblomanon" },
        { value: "Sama", text: "Sama" },
        { value: "Sambal", text: "Sambal" },
        { value: "Sangil", text: "Sangil" },
        { value: "Sangir", text: "Sangir" },
        { value: "Sinauna", text: "Sinauna" },
        { value: "Spanish Filipinos", text: "Spanish Filipinos" },
        { value: "Subanen, Central", text: "Subanen, Central" },
        { value: "Sulod", text: "Sulod" },
        { value: "Surigaonon", text: "Surigaonon" },
        { value: "Tadyawan", text: "Tadyawan" },
        { value: "Tagabawa", text: "Tagabawa" },
        { value: "Tagalog", text: "Tagalog" },
        { value: "Tagbanwa", text: "Tagbanwa" },
        { value: "Tasaday", text: "Tasaday" },
        { value: "Tau't Bato", text: "Tau't Bato" },
        { value: "Tausug", text: "Tausug" },
        { value: "Tawbuid", text: "Tawbuid" },
        { value: "Ternateño", text: "Ternateño" },
        { value: "Tiruray", text: "Tiruray" },
        { value: "Tsinoy", text: "Tsinoy" },
        { value: "Waray", text: "Waray" },
        { value: "Yakan", text: "Yakan" },
        { value: "Yogad", text: "Yogad" },
        { value: "Zamboangueño", text: "Zamboangueño" }
      ],
      dialects: [
        { value: "Aklanon", text: "Aklanon" },
        { value: "Bantoanon", text: "Bantoanon" },
        { value: "Binol-anon", text: "Binol-anon" },
        { value: "Bolinao", text: "Bolinao" },
        { value: "Botolan", text: "Botolan" },
        { value: "Buhi", text: "Buhi" },
        { value: "Butuanon", text: "Butuanon" },
        { value: "Canaman", text: "Canaman" },
        { value: "Capiznon", text: "Capiznon" },
        { value: "Caviteño", text: "Caviteño" },
        { value: "Cebuano bisaya", text: "Cebuano bisaya" },
        { value: "Chavacano", text: "Chavacano" },
        { value: "Cuyonon", text: "Cuyonon" },
        { value: "Daraga", text: "Daraga" },
        { value: "English", text: "English" },
        { value: "Español", text: "Español" },
        { value: "Gubatnon Biko", text: "Gubatnon Biko " },
        { value: "Hiligaynon", text: "Hiligaynon" },
        { value: "Ibanag", text: "Ibanag" },
        { value: "Ifuntok", text: "Ifuntok" },
        { value: "Ilokano", text: "Ilokano" },
        { value: "Ilonggo", text: "Ilonggo" },
        { value: "Itawis", text: "Itawis" },
        { value: "Jama Mapun", text: "Jama Mapun" },
        { value: "Kapampangan", text: "Kapampangan" },
        { value: "Kinaray-a", text: "Kinaray-a" },
        { value: "Maguindanao", text: "Maguindanao" },
        { value: "Malaysian &amp; Indonesian", text: "Malaysian &amp; Indonesian" },
        { value: "Manobo", text: "Manobo" },
        { value: "Maranao", text: "Maranao" },
        { value: "Masbateño", text: "Masbateño" },
        { value: "Pangasinan", text: "Pangasinan" },
        { value: "Rinconada Bikol", text: "Rinconada Bikol" },
        { value: "Romblomanon", text: "Romblomanon" },
        { value: "Sambali", text: "Sambali" },
        { value: "Sangil", text: "Sangil" },
        { value: "Sinama", text: "Sinama" },
        { value: "Sorsoganon", text: "Sorsoganon" },
        { value: "Surigaonon", text: "Surigaonon" },
        { value: "Tagalog", text: "Tagalog" },
        { value: "Tausug", text: "Tausug" },
        { value: "Ternateño", text: "Ternateño" },
        { value: "Waray", text: "Waray" },
        { value: "Yakan", text: "Yakan" }
      ],
      religions: [
        "Aglipayan",
        "Alliance",
        "Assembly of God",
        "Baptists",
        "Born Again",
        "Buddhist",
        "Christian Church Fellowship International",
        "Church of Christ",
        "Crusaders of the Divine Church of Christ Inc.",
        "Evangelicals(PCEC)",
        "Faith Tabernacle Church",
        "Four Square Church",
        "Iglesia Filipiniana Independencia",
        "Iglesia Ni Cristo",
        "Iglesia sa Dios Espiritu Santo Inc.",
        "Igreja Catolica Apostolica Brasileira nas Filipinas",
        "Islam",
        "Jehovahs Witnesses",
        "Jesus Is Lord Church Worldwide",
        "Lutheran",
        "National Council of Churches in the Philippines",
        "Pentecost",
        "Philippine Benevolent Missionaries Association",
        "Philippine Independent Catholic Church",
        "Protestants",
        "Roman Catholic",
        "Seventh day Adventist",
        "The Church of Jesus Christ of Latter day Saints",
        "Tribal Religions",
        "Union Espiritista Cristiana de Filipinas, Inc.",
        "United Church of Christ of the Philippines",
        "Wesleyan"
      ]
    };

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Personal Details
        </div>

        <div class="two-column">
          <div>
            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Given Name</p>
                <p>Provide your complete given name</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "given-name",
                    required: true,
                    placeholder: "Juan"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Middle Name</p>
                <p>Provide your complete middle name</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "middle-name",
                    required: true,
                    placeholder: "Crisostomo"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Last Name</p>
                <p>Provide your complete last name</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "last-name",
                    required: true,
                    placeholder: "Dela Cruz"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Citizenship</p>
                <p>Provide your citizenship</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "citizenship",
                    placeholder: "FILIPINO"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Address</p>
                <p>Provide your complete address</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "complete-address",
                    placeholder: "block, lot, street, subdivision, barangay, city, province, region"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Civil Status</p>
                <p>Select your civil status</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new RadioField({
                    name: "civil-status",
                    options: ["Single", "Married", "Widowed"]
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Gender</p>
                <p>Select a gender</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new RadioField({
                    name: "gender",
                    options: ["Male", "Female"]
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Indigenous?</p>
                <p>Mark if you are a member of the indigenous community</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new RadioField({
                    name: "gender",
                    options: ["Yes", "No"]
                  })
                }
              </div>
            </div>

          </div>

          <div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Email</p>
                <p>Enter a working email</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "email",
                    placeholder: "Juandelacruz@gmail.com",
                    info: "This email will be used to send you updates, newsletter and notifications from the school or about your enrollment"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Ethnicity</p>
                <p>Choose your ethnicity</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new SelectField({
                    name: "ethnic",
                    options: selectData.ethnic
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Dialect</p>
                <p>Choose your dialect</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new SelectField({
                    name: "dialect",
                    options: selectData.dialects
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Religion</p>
                <p>Choose your religion</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new SelectField({
                    name: "religion",
                    options: selectData.religions
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Birth Place</p>
                <p>Provide your complete birth place</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "birth-place",
                    placeholder: "General Santos City"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Contact Number</p>
                <p>Provide a working contact number</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new StringField({
                    name: "contact-number",
                    placeholder: "XXXXXXXXXXX",
                    info: "Contact number must be accesible"
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Entry Type</p>
                <p>Choose what your enrollment is for</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new RadioField({
                    name: "entry-type",
                    options: ["New", "Transferee", "Returnee"]
                  })
                }
              </div>
            </div>

            <div class="form__section__input-group">
              <div class="form__section__input-group__left column gap">
                <p>Documents</p>
                <p>Choose what documents are you able to submit</p>
              </div>
              <div class="form__section__input-group__right column left">
                ${
                  new SelectField({
                    name: "documents",
                    multiple: true,
                    options: ["F137", "BC", "GMC", "M-contract", "OTR", "F138/card", "HD"]
                  })
                }
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }
}