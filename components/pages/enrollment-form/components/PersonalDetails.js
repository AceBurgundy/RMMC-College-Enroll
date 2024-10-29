import { Component, css } from '../../../../Component.js';
import SelectField from '../../../../widgets/select-inputs/SelectField.js';
import RadioField from '../../../../widgets/select-inputs/RadioField.js';
import StringField from '../../../../widgets/inputs/StringField.js';
import NumberField from '../../../../widgets/inputs/NumberField.js';
import EmailField from '../../../../widgets/inputs/EmailField.js';
import InputGroup from './InputGroup.js';

css(import.meta, ["../styles/form-section.css"]);

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
        "Blaan",             "T'boli",          "Taut Bato",          "Tausug",           "Tawbuid",
        "Ternateño",         "Tiruray",         "Tsinoy",             "Waray",            "Yakan",
        "Yogad",             "Adasen",          "Agta",               "Aklanon",          "Alangan",
        "Alta",              "Amerasian",       "Ati",                "Atta",             "Badjao",
        "Bagobo",            "Balangao",        "Balangingi",         "Bangon",           "Bantoanon",
        "Banwaon",           "Batak",           "Bicolano",           "Binukid",          "Boholano",
        "Bolinao",           "Bontoc",          "Buhid",              "Butuanon",         "Caluyanon",
        "Capiznon",          "Caviteño",        "Cebuano",            "Cotabateño",       "Davaoeño",
        "Ermiteño",          "Ga dang",         "Gaddang",            "Hanunoo",          "Higaonon",
        "Ibaloi",            "Ibanag",          "Ifugao",             "Ikalahan",         "Illanun",
        "Ilocano",           "Ilonggo",         "Ilongot",            "Inonhan",          "Iraya",
        "Isinai",            "Isneg",           "Itneg",              "Ivatan",           "Kagayanen",
        "Kalagan",           "Kalinga",         "Kamayo",             "Kankanaey",        "Kapampangan",
        "Maguindanaon",      "Malaweg",         "Malaynon",           "Mamanwa",          "Mandaya",
        "Manguwangan",       "Manobo",          "Maranao",            "Masbateño",        "Palawano",
        "Palaweño",          "Pangasinense",    "Paranan",            "Porohanon",        "Ratagnon",
        "Romblomanon",       "Sama",            "Sambal",             "Sangil",           "Sangir",
        "Tadyawan",          "Tagabawa",        "Tagalog",            "Tagbanwa",         "Tasaday",
        "Tau't Bato",        "Tausug",          "Tawbuid",            "Ternateño",        "Tiruray",
        "Tsinoy",            "Waray",           "Yakan",              "Yogad",            "Zamboangueño",
        "Karao",             "Kasiguranin",     "Kinaray-a",          "Magahat",          "Korean Filipinos",
        "Spanish Filipinos", "Sinauna",         "Subanen, Central",   "Sulod",            "Surigaonon",
      ],
      dialects: [
        "Aklanon",        "Bantoanon",      "Binol-anon",             "Bolinao",       "Botolan",
        "Buhi",           "Butuanon",       "Canaman",                "Capiznon",      "Caviteño",
        "Cebuano bisaya", "Chavacano",      "Cuyonon",                "Daraga",        "English",
        "Español",        "Gubatnon Biko",  "Hiligaynon",             "Ibanag",        "Ifuntok",
        "Ilokano",        "Ilonggo",        "Itawis",                 "Jama Mapun",    "Kapampangan",
        "Kinaray-a",      "Maguindanao",    "Malaysian & Indonesian", "Manobo",        "Maranao",
        "Masbateño",      "Pangasinan",     "Rinconada Bikol",        "Romblomanon",   "Sambali",
        "Sangil",         "Sinama",         "Sorsoganon",             "Surigaonon",    "Tagalog",
        "Tausug",         "Ternateño",      "Waray",                  "Yakan"
      ],
      religions: [
        "Aglipayan",                                       "Alliance",
        "Assembly of God",                                 "Baptists",
        "Born Again",                                      "Buddhist",
        "Christian Church Fellowship International",       "Church of Christ",
        "Crusaders of the Divine Church of Christ Inc.",   "Evangelicals(PCEC)",
        "Faith Tabernacle Church",                         "Four Square Church",
        "Iglesia Filipiniana Independencia",               "Iglesia Ni Cristo",
        "Iglesia sa Dios Espiritu Santo Inc.",             "Igreja Catolica Apostolica Brasileira nas Filipinas",
        "Islam",                                           "Jehovahs Witnesses",
        "Jesus Is Lord Church Worldwide",                  "Lutheran",
        "National Council of Churches in the Philippines", "Pentecost",
        "Philippine Benevolent Missionaries Association",  "Philippine Independent Catholic Church",
        "Protestants",                                     "Roman Catholic",
        "Seventh day Adventist",                           "The Church of Jesus Christ of Latter day Saints",
        "Tribal Religions",                                "Union Espiritista Cristiana de Filipinas, Inc.",
        "United Church of Christ of the Philippines",      "Wesleyan"
      ]
    };

    this.template = /*html*/`
      <div class="form__section">

        <div class="form__section__title">
          Personal Details
        </div>

        <div class="two-column">
          ${
            [
              new InputGroup({
                title: "Given Name",
                info: "Provide your complete given name.",
                inputs: new StringField({
                  name: "given_name",
                  required: true,
                  placeholder: "Juan",
                  info: "Please enter your first name."
                })
              }),
              new InputGroup({
                title: "Middle Name",
                info: "Provide your complete middle name.",
                inputs: new StringField({
                  name: "middle_name",
                  required: true,
                  placeholder: "Crisostomo",
                  info: "Enter your middle name."
                })
              }),
              new InputGroup({
                title: "Last Name",
                info: "Provide your complete last name.",
                inputs: new StringField({
                  name: "last_name",
                  required: true,
                  placeholder: "Dela Cruz",
                  info: "Enter your last name."
                })
              }),
              new InputGroup({
                title: "Citizenship",
                info: "Provide your citizenship.",
                inputs: new StringField({
                  name: "citizenship",
                  placeholder: "FILIPINO",
                  info: "Enter your citizenship."
                })
              }),
              new InputGroup({
                title: "Address",
                info: "Provide your complete address.",
                inputs: new StringField({
                  name: "complete_address",
                  placeholder: "Block, Lot, Street, Subdivision, Barangay, City, Province, Region",
                  info: "Provide your full residential address."
                })
              }),
              new InputGroup({
                title: "Civil Status",
                info: "Select your civil status.",
                inputs: new RadioField({
                  name: "civil_status",
                  options: ["Single", "Married", "Widowed"],
                  info: "Choose your current civil status."
                })
              }),
              new InputGroup({
                title: "Gender",
                info: "Select a gender.",
                inputs: new RadioField({
                  name: "gender",
                  options: ["Male", "Female"],
                  info: "Select your gender."
                })
              }),
              new InputGroup({
                title: "Indigenous",
                info: "Mark if you are a member of the indigenous community.",
                inputs: new RadioField({
                  name: "indigenous",
                  options: ["Yes", "No"],
                  info: "Indicate if you belong to an indigenous community."
                })
              }),
              new InputGroup({
                title: "Email",
                info: "Enter a working email.",
                inputs: new EmailField({
                  name: "email",
                  required: true,
                  placeholder: "Juandelacruz@gmail.com",
                  info: "This email will be used for updates, newsletters, and notifications from the school."
                })
              }),
              new InputGroup({
                title: "Ethnicity",
                info: "Choose your ethnicity.",
                inputs: new SelectField({
                  name: "ethnic",
                  options: selectData.ethnic,
                  info: "Select your ethnic background."
                })
              }),
              new InputGroup({
                title: "Dialect",
                info: "Choose your dialect.",
                inputs: new SelectField({
                  name: "dialect",
                  options: selectData.dialects,
                  info: "Select your primary dialect."
                })
              }),
              new InputGroup({
                title: "Religion",
                info: "Choose your religion.",
                inputs: new SelectField({
                  name: "religion",
                  options: selectData.religions,
                  info: "Select your religious affiliation."
                })
              }),
              new InputGroup({
                title: "Birth Place",
                info: "Provide your complete birth place.",
                inputs: new StringField({
                  name: "birth_place",
                  placeholder: "General Santos City",
                  info: "Enter the city or town where you were born."
                })
              }),
              new InputGroup({
                title: "Contact Number",
                info: "Provide a working contact number.",
                inputs: new NumberField({
                  name: "contact_number",
                  placeholder: "XXXXXXXXXXX",
                  info: "Ensure your contact number is accessible."
                })
              }),
              new InputGroup({
                title: "Entry Type",
                info: "Choose what your enrollment is for.",
                inputs: new RadioField({
                  name: "entry_type",
                  options: ["New", "Transferee", "Returnee"],
                  info: "Select how you are enrolling."
                })
              }),
              new InputGroup({
                title: "Documents",
                info: "Choose what documents you are able to submit.",
                inputs: new SelectField({
                  name: "documents",
                  multiple: true,
                  options: ["F137", "BC", "GMC", "M-contract", "OTR", "F138/card", "HD"],
                  info: "Select all applicable documents."
                })
              })
            ].join('')
          }
        </div>

      </div>
    `;
  }
}