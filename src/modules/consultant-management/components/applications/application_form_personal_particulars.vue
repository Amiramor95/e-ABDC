<template>
  <b-overlay no-center :show="overlay_show" rounded="sm">
    <!-- // Personal particulars -->
    <template #overlay>
      <b-spinner
        label="Loading..."
        variant="info"
        scale="2"
        shift-v="8"
        shift-h="8"
        class="position-absolute"
        style="top: 0; right: 0"
      ></b-spinner>
    </template>
    <div class="row">
    <div class="col-md-6">
      <br /><br />
      <!-- {{ model }} -->
      <vue-form-generator
        :model="model"
        :schema="schemaApplicantInfo"
        :options="formOptions"
        ref="formApplicantInfo"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>

      <b-form-group
        label="Other Subjects Credit in SPM:"
        label-for="input-default"
        class="pt-4 p-3 col-md-8"
      >
        <b-form-input
          v-model="text"
          placeholder="Subject's name"
          class="mt-2"
        ></b-form-input>
        <b-form-input
          v-model="text"
          placeholder="Subject's name"
          class="mt-2"
        ></b-form-input>
        <b-form-input
          v-model="text"
          placeholder="Subject's name"
          class="mt-2"
        ></b-form-input>
      </b-form-group>

      <br />
      <br />
      <div class="ml-3"><h5>Correspondent Address</h5></div>

      <br />
      <input-address-section
        class="col-md-8 pl-0"
        :model="model_address"
        @update="on_address_update"
        ref="formApplicantAddress"
      ></input-address-section>
      <br />
      <br />
      <div class="ml-3">
        <h5>Permanent Address</h5>
        <div>
          <input
            type="checkbox"
            id="sameAddress"
            name="sameAddress"
            v-model="copyCorrespondence"
            @change="copyCorrespondenceToPermanent"
          />
          <label
            style="margin-left: 10px; margin-bottom: 0px"
            for="sameAddress"
          >
            Tick if Permanent Address is same as Correspondence Address
          </label>
        </div>
      </div>

      <br />

      <input-address-section
        class="col-md-8 pl-0"
        :model="model_address_permanent"
        @update="on_address_permanent_update"
        ref="formApplicantAddressPermanent"
      ></input-address-section>
    </div>
    <div class="col-md-6 mt-5">
      <personal-info></personal-info>

      <hr class="mt-5">

      <personal-education class="mt-3"></personal-education>

      <hr class="mt-5">

      <personal-addresses class="mt-3"></personal-addresses>
    </div>
    </div>
  </b-overlay>
</template>

<script>
/*
Component flow

- Create formDataModel
- Create inputsModel
- Show loading
- APIsDependenciesCounter = 0
- Load APIs - inputs data
- Watch for props/parent data loaded - formDataModel
- When data loaded ->
- Map loaded Dependencies data to inputsModel - dropdowns/ checkboxes
- Map loaded ConsultantApplication data to formDataModel
- Update form UI
- Hide loading

Events
- data_loaded
- model_updated

*/
import InputAddressSection from "./personal-particulars/address";
import PersonalAddresses from "./personal-particulars/addresses";
import PersonalInfo from "./personal-particulars/personal_info";
import PersonalEducation from "./personal-particulars/education";
import * as services02module0 from "../../../../app/module0/services02";
import * as GeneralSettingsAPI from "../../services/general";

export default {
  components: {
    InputAddressSection,
    PersonalInfo,
    PersonalEducation,
    PersonalAddresses
  },
  props: {
    // The parameters the component accepts
    parentDataLoaded: Boolean,
    formDataModel: Object,
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      overlay_show: true,
      formDataDependencyCounter: 0,
      text: '',
      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION1                            */
      /* -------------------------------------------------------------------------- */
      visibleIc: true,
      visiblePassport: false,
      visibleOtherRace: false,
      visibleOtherLanguage: false,

      visibleEducation: {
        SPM: false,
        STPM: false,
        DIPLOMA: false,
        DEGREE: false,
        PROFESSIONAL: false,
        PROFESSIONAL_CFP: false,
      },

      visibleCFP: false,
      // section 1
      citizenship: [
        { name: "MALAYSIAN", value: 1 },
        { name: "NON-MALAYSIAN", value: 2 },
      ],

      CONSULTANT_GENDER: [
        { name: "MALE", value: "1" },
        { name: "FEMALE", value: "2" },
      ],
      races: [
        { name: "MALAY", value: "1" },
        { name: "CHINESE", value: "2" },
        { name: "INDIAN", value: "3" },
        { name: "OTHERS", value: "4" },
      ],
      qualifications: [
        { name: "SPM OR SPM EQUIVALENT", value: 1 },
        { name: "STPM OR STPM EQUIVALENT", value: 2 },
        { name: "DIPLOMA", value: 3 },
        { name: "DEGREE", value: 4 },
        { name: "PROFESSIONAL CERTIFICATES", value: 5 },
      ],
      math: [
        { name: "YES", value: 1 },
        { name: "NO", value: 2 },
      ],
      subjects: [
        { name: "CREDIT IN SEJARAH", value: 1 },
        { name: "CREDIT IN PENDIDIKAN ISLAM", value: 2 },
      ],
      languages: [
        { name: "MALAY", value: 1 },
        { name: "CHINESE", value: 2 },
        { name: "ENGLISH", value: 3 },
        { name: "OTHERS", value: 4 },
        { name: "NIL", value: 5 },
      ],
      certificates: [
        { name: "CERTIFIED FINANCIAL PLANNER (CFP)", value: 1 },
        { name: "ISLAMIC FINANCIAL PLANNER (IFP)", value: 2 },
        { name: "REGISTERED FINANCIAL PLANNER (RFP)", value: 3 },
        { name: "SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)", value: 4 },
      ],
      country: [{ name: "MALAYSIA", id: 1, selected: true }],

      copyCorrespondence: false,

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */

        APPLICATION_ID: null,
        CONSULTANT_NAME: null,
        CONSULTANT_CITIZEN: null,
        CONSULTANT_NRIC: null,
        CONSULTANT_NRIC_OLD: null,
        // CONSULTANT_PASSPORT_NO: null,
        // CONSULTANT_PASSPORT_EXPIRY_NO: null,
        CONSULTANT_NRIC_PHOTO: null,
        CONSULTANT_PASSPORT_PHOTO: null,
        CONSULTANT_GENDER: null,
        CONSULTANT_DOB: null,
        CONSULTANT_RACE: null,
        CONSULTANT_OTHER_RACE: null,
        CONSULTANT_PHONENO: null,
        CONSULTANT_HOUSE_NO: null,
        CONSULTANT_EMAIL: null,
        CONSULTANT_HIGHEST_QUALIFICATION: null,

        MATH: null,
        OTHER_SUBJECT: null,
        LANGUAGE: null,
        OTHER_LANGUAGE: null,
        SPM_DOCS: null,
        STPM_DOCS: null,
        DIPLOMA_DOCS: null,
        DEGREE_DOCS: null,
        DEGREE_MAJOR: null,
        DEGREE_MINOR: null,
        PROFESSIONAL_CERTIFICATE: null,
        PROFESSIONAL_CFP_DOCS: null,
        // correspondence
        CONSULTANT_CORRESPONDENT_COUNTRY: null,
        CONSULTANT_CORRESPONDENT_STATE: null,
        CONSULTANT_CORRESPONDENT_CITY: null,
        CONSULTANT_CORRESPONDENT_POSTAL: null,
        CONSULTANT_CORRESPONDENT_ADDR1: null,
        CONSULTANT_CORRESPONDENT_ADDR2: null,
        CONSULTANT_CORRESPONDENT_ADDR3: null,
        // permanent
        CONSULTANT_PERMANENT_COUNTRY: null,
        CONSULTANT_PERMANENT_STATE: null,
        CONSULTANT_PERMANENT_CITY: null,
        CONSULTANT_PERMANENT_POSTAL: null,
        CONSULTANT_PERMANENT_ADDR1: null,
        CONSULTANT_PERMANENT_ADDR2: null,
        CONSULTANT_PERMANENT_ADDR3: null,
      },
      inputsModel: {
        /* -------------------------------------------------------------------------- */
        /*                             DROPDOWN_MODEL                                 */
        /* -------------------------------------------------------------------------- */
        CONSULTANT_RACE_MODEL: null,
        CONSULTANT_HIGHEST_QUALIFICATION_MODEL: null,
        PROFESSIONAL_CERTIFICATE_MODEL: null,
        OTHER_SUBJECT_MODEL: null,
        LANGUAGE_MODEL: null,
        CONSULTANT_CORRESPONDENT_COUNTRY_MODEL: null,
        CONSULTANT_CORRESPONDENT_STATE_MODEL: null,
        CONSULTANT_CORRESPONDENT_POSTAL_MODEL: null,
        CONSULTANT_PERMANENT_COUNTRY_MODEL: null,
        CONSULTANT_PERMANENT_STATE_MODEL: null,
        CONSULTANT_PERMANENT_POSTAL_MODEL: null,
      },
      model_address: {
        country: null,
        state: null,
        city: null,
        postcode: null,
        address_1: null,
        address_2: null,
        address_3: null,
      },
      model_address_permanent: {
        country: null,
        state: null,
        city: null,
        postcode: null,
        address_1: null,
        address_2: null,
        address_3: null,
      },
      // Section 1
      schemaApplicantInfo: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'Application ID',
              //   model: 'APPLICATION_ID',
              //   placeholder: 'Enter Application ID',
              //   required: true,
              //   validator: 'required',
              //   styleClasses: 'col-md-12 text-uppercase',
              // },
              {
                type: "input",
                inputType: "text",
                label: "Applicant Name",
                model: "CONSULTANT_NAME",
                placeholder: "Enter your name",
                required: true,
                validator: "required",
                styleClasses: "col-md-10 text-uppercase",
                // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              },
              {
                type: "label",
                styleClasses: "col-md-2",
              },
              {
                labels: "UPLOAD PASSPORT SIZE PHOTO",
                text: "Choose a Photo",
                model: "PASSPORT_SIZE_PHOTO",
                type: "vfg-custom-file",
                styleClasses: "col-md-6",
                required: true,
              },
              {
                type: "label",
                styleClasses: "col-md-6",
              },

              {
                type: "radios",
                label: "Citizenship",
                model: "CONSULTANT_CITIZEN",
                required: true,
                validator: "required",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "pt-4 col-md-12 display-inline text-uppercase",
              },
              {
                type: "vfg-the-mask",
                labels: "New NRIC Number",
                model: "CONSULTANT_NRIC",
                required: true,
                validator: "required",
                placeholder: "Enter NRIC number",
                mask: "######-##-####",
                styleClasses: "col-md-5 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
              },
              {
                type: "vfg-the-mask",
                labels: "Old NRIC Number",
                model: "CONSULTANT_NRIC_OLD",
                // required: true,
                // validator: 'required',
                placeholder: "Enter old NRIC number",
                mask: "######-##-####",
                styleClasses: "col-md-5 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport Number",
                model: "CONSULTANT_PASSPORT_NO",
                placeholder: "Enter Passport Number",
                required: true,
                validator: "required",
                styleClasses: "col-md-5 text-uppercase",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport expiry date",
                required: true,
                validator: "required",
                model: "CONSULTANT_PASSPORT_EXPIRY_NO",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-5 text-uppercase",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },

              {
                labels: "Upload NRIC Photo (Front)",
                text: "Choose a File",
                model: "CONSULTANT_NRIC_PHOTO_FRONT",
                type: "vfg-custom-file",
                styleClasses: "pt-4 col-md-5",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
                validator: "required",
              },

              {
                labels: "Upload NRIC Photo (Back)",
                text: "Choose a File",

                model: "CONSULTANT_NRIC_PHOTO_BACK",
                type: "vfg-custom-file",
                styleClasses: "pt-4 col-md-5",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
                validator: "required",
              },

              {
                labels: "Upload Passport Photo",
                text: "Choose a File",
                model: "CONSULTANT_PASSPORT_PHOTO",
                type: "vfg-custom-file",
                styleClasses: "pt-4 col-md-5",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
                required: true,
                validator: "required",
              },
              {
                type: "radios",
                label: "Gender",
                model: "CONSULTANT_GENDER",
                required: true,
                validator: "required",
                values: () => {
                  return this.CONSULTANT_GENDER;
                },
                styleClasses: "pt-4 col-md-12 display-inline",
              },
              {
                type: "input",
                inputType: "date",
                label: "Date of Birth",
                model: "CONSULTANT_DOB",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: ["required", this.isAbove21],
                styleClasses: "col-md-5 text-uppercase",
              },
              {
                type: "label",
                styleClasses: "col-md-6",
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_RACE_MODEL",
                label: "Race",
                placeholder: "Enter race",
                required: true,
                validator: "required",
                styleClasses: "col-md-5",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.races;
                },
              },

              {
                type: "input",
                inputType: "text",
                label: "Other Race",
                model: "CONSULTANT_OTHER_RACE",
                placeholder: "Please specify",
                required: true,
                validator: "required",
                styleClasses: "col-md-5 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleOtherRace;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-12",
              },
              {
                labels: "Mobile Phone Number",
                model: "CONSULTANT_PHONENO",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                labels: "House Phone Number",
                model: "CONSULTANT_HOUSE_NO",
                type: "vfg-the-mask",
                placeholder: "Enter house phone number",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
              },

              {
                type: "label",
                styleClasses: "pt-4 col-md-12",
              },

              {
                type: "input",
                inputType: "email",
                label: "Email",
                model: "CONSULTANT_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
              },
              {
                type: "label",
                styleClasses: "col-md-6",
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_HIGHEST_QUALIFICATION_MODEL",
                label: "Highest Qualification",
                placeholder: "Enter highest qualification",
                required: true,
                validator: "required",
                styleClasses: "pt-4 col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "value",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.qualifications;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Major in",
                model: "DEGREE_MAJOR",
                placeholder: "Please specify",

                styleClasses: "col-md-4 text-uppercase",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Minor in",
                model: "DEGREE_MINOR",
                placeholder: "Please specify",

                styleClasses: "col-md-4 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: "vueMultiSelect",
                model: "PROFESSIONAL_CERTIFICATE_MODEL",
                label: "Professional Certificate",
                placeholder: "Enter professional certificate",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.certificates;
                },
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL;
                },
              },
              {
                labels:
                  "Upload Supported Document For Professional Certificate",
                text: "Choose a File",
                model: "PROFESSIONAL_CFP_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL;
                },
              },
              {
                labels:
                  "Upload Supported Document For SPM or SPM Equivalent Qualification",
                text: "Choose A FILE",
                model: "SPM_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-6",

                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return this.visibleEducation.SPM;
                // },
              },
              {
                labels:
                  "Supported Document For STPM Or STPM Equivalent Qualification",
                text: "Choose A FILE",
                model: "STPM_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return this.visibleEducation.STPM;
                // },
              },
              {
                labels: "Supported Document For Diploma",
                text: "Choose a File",
                model: "DIPLOMA_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return this.visibleEducation.DIPLOMA;
                // },
              },
              {
                labels: "Supported Document For Degree Qualification",
                text: "Choose a File",
                model: "DEGREE_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return this.visibleEducation.DEGREE;
                // },
              },

              {
                type: "radios",
                label: "Credit in Mathemathic",
                model: "MATH",
                required: true,
                validator: "required",
                values: () => {
                  return this.math;
                },
                styleClasses: "pt-4 col-md-12 display-inline",
              },
              {
                type: "vueMultiSelect",
                model: "OTHER_SUBJECT_MODEL",
                label: "Credit Other Subject",
                placeholder: "Enter credit other subject",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.subjects;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-6",
              },

              {
                type: "vueMultiSelect",
                model: "LANGUAGE_MODEL",
                label: "Credit in Language",
                placeholder: "Enter credit in language",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.languages;
                },
              },

              {
                type: "label",
                visible: (model, field, form) => {
                  return !this.visibleOtherLanguage;
                },
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                label: "Other Language",
                model: "OTHER_LANGUAGE",
                placeholder: "Please specify",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleOtherLanguage;
                },
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  methods: {
    on_address_update: function (value) {
      console.log(value);
      this.model_address = value;
    },
    on_address_permanent_update: function (value) {
      console.log(value);
      this.model_address_permanent = value;
    },
    copyCorrespondenceToPermanent() {
      const varNames = ["CITY", "ADDR1", "ADDR2", "ADDR3"];
      const dropdowns = ["COUNTRY", "STATE", "POSTAL"];

      if (this.copyCorrespondence) {
        varNames.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}`] =
            this.model[`CONSULTANT_CORRESPONDENT_${el}`];
        });
        dropdowns.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}_MODEL`] =
            this.model[`CONSULTANT_CORRESPONDENT_${el}_MODEL`];
        });
      } else {
        varNames.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = "";
        });
        dropdowns.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}_MODEL`] = null;
        });
      }
    },
    mapDropDownToModel: function () {
      this.model.CONSULTANT_RACE_MODEL = this.races.find(
        (race) => race.value == this.model.CONSULTANT_RACE
      );
      this.model.CONSULTANT_HIGHEST_QUALIFICATION_MODEL =
        this.qualifications.find(
          (qualification) =>
            qualification.value == this.model.CONSULTANT_HIGHEST_QUALIFICATION
        );
      this.model.PROFESSIONAL_CERTIFICATE_MODEL = this.certificates.find(
        (certificate) =>
          certificate.value == this.model.PROFESSIONAL_CERTIFICATE
      );
      this.model.OTHER_SUBJECT_MODEL = this.subjects.find(
        (subject) => subject.value == this.model.OTHER_SUBJECT
      );
      this.model.LANGUAGE_MODEL = this.languages.find(
        (language) => language.value == this.model.LANGUAGE
      );
    },

    mapParentDataToFormDataModel: function (payload) {
      var properties = Object.keys(this.model);
      var vm = this.model;
      properties.forEach(function (key) {
        vm[key] = payload[key];
      });

      this.model_address = {
        country: null,
        state: null,
        city: null,
        postcode: null,
        address_1: null,
        address_2: null,
        address_3: null,
      };
      this.model_address_permanent = {
        country: null,
        state: null,
        city: null,
        postcode: null,
        address_1: null,
        address_2: null,
        address_3: null,
      };
      this.model = payload;
    },

    showHighestEducationUploader(newVal) {
      for (let qualification in this.visibleEducation) {
        this.visibleEducation[qualification] = false;
      }
      this.visibleEducation[newVal.name.split(" ")[0]] = true;
    },

    isAbove21() {
      var today = new Date();
      var birthDate = new Date(this.model.CONSULTANT_DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 21) return ["Age must be 21 or above"];
    },

    onModelUpdated(newVal, schema) {
      console.log(`schema: ${schema}`, "value:", newVal);
      if (schema == "CONSULTANT_CITIZEN") {
        if (newVal == 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema == "CONSULTANT_NRIC_PHOTO") {
        console.log(newVal);
        console.log("NRIC_PHOTO", this.model.CONSULTANT_NRIC_PHOTO);
      } else if (schema == "SPM_DOCS") {
        console.log(newVal);
        console.log("SPM_DOCS", typeof this.model.SPM_DOCS);
      } else if (schema == "CONSULTANT_RACE_MODEL") {
        this.model.CONSULTANT_RACE = newVal.value;
        if (newVal.name == "OTHERS") {
          this.visibleOtherRace = true;
        } else {
          this.visibleOtherRace = false;
        }
      } else if (schema == "CONSULTANT_HIGHEST_QUALIFICATION_MODEL") {
        this.model.CONSULTANT_HIGHEST_QUALIFICATION = newVal.value;
        if (newVal.name.split(" ")[0] == "SPM") {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name.split(" ")[0] == "STPM") {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name == "DIPLOMA") {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name == "DEGREE") {
          this.showHighestEducationUploader(newVal);
        } else {
          this.showHighestEducationUploader(newVal);
        }
      } else if (schema == "LANGUAGE_MODEL") {
        this.model.LANGUAGE = newVal.value;
        if (newVal.name == "OTHERS") {
          this.visibleOtherLanguage = true;
        } else {
          this.visibleOtherLanguage = false;
        }
      } else if (schema == "PROFESSIONAL_CERTIFICATE_MODEL") {
        this.model.PROFESSIONAL_CERTIFICATE = newVal.value;
        if (newVal.name == "CERTIFIED FINANCIAL PLANNER (CFP)") {
          this.visibleEducation.PROFESSIONAL_CFP = true;
        } else {
          this.visibleEducation.PROFESSIONAL_CFP = false;
        }
      } else if (schema == "races") {
        if (newVal.name == "Others") {
          this.otherRace = true;
        } else {
          this.otherRace = false;
        }
      } else if (schema == "citizenship") {
        this.model.CONSULTANT_DOB = null;
      } else if (schema == "icNo") {
        // console.log('dob :' + this.model.CONSULTANT_DOB);
        if (newVal.substr(11, 1) != "") {
          console.log("last character :" + newVal.substr(11, 1));
          var Year = newVal.substring(0, 2);
          var Month = newVal.substring(2, 4);
          var Day = newVal.substring(4, 6);

          var cutoff = new Date().getFullYear() - 2000;
          // console.log('year :' + cutoff);

          var dob =
            (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
          this.model.CONSULTANT_DOB = dob;
          // console.log('dob :' + dob);
          // console.log((Year > cutoff ? '19' : '20') + Year);
          const yearBirth = (Year > cutoff ? "19" : "20") + Year;
          if (parseInt(yearBirth) <= 1970) {
            // console.log('1970 and below');
            this.visibleOldIc = true;
          } else {
            // console.log('above');
            this.visibleOldIc = false;
          }
          if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
            // console.log('The number is even. f');
            this.model.CONSULTANT_GENDER = "1";
          } else {
            // console.log('The number is odd. l');
            this.model.CONSULTANT_GENDER = "2";
          }
        }
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */

    async getRequiredDocument(data) {
      try {
        const required_document = await servicesmodule0.getDocument(data);
      } catch (error) {
        console.log(error);
      }
    },
    async getDistributorByConsultantID(data) {
      alert(data);
      try {
        const required_document = await services02module0.getConsultantByDistributorID(data);
      } catch (error) {
        console.log(error);
      }
    },

    getFormData() {
      console.log(this.model);
      return this.model;
    },
  },

  computed: {},
  watch: {
    parentDataLoaded: function (val) {
      alert(val);
      this.formDataDependencyCounter = this.formDataDependencyCounter + 1;
      this.mapParentDataToFormDataModel(this.formDataModel);
    },
    formDataDependencyCounter: function (val) {
      // after all these APIs loaded, remove loader
      var total_dependent_apis = ["parentDataLoaded"];
      if (val >= total_dependent_apis.length) {
        this.overlay_show = false;
        this.mapDropDownToModel();
      }
    },
    "model.CONSULTANT_NRIC": function (val) {
      // console.log("dob :" + this.model.CONSULTANT_DOB);
      if (val.substr(11, 1) != "") {
        console.log("last character :" + val.substr(11, 1));
        var Year = val.substring(0, 2);
        var Month = val.substring(2, 4);
        var Day = val.substring(4, 6);

        var cutoff = new Date().getFullYear() - 2000;
        console.log("year :" + cutoff);

        var dob =
          (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
        this.model.CONSULTANT_DOB = dob;
        console.log("dob :" + dob);
        console.log((Year > cutoff ? "19" : "20") + Year);
        const yearBirth = (Year > cutoff ? "19" : "20") + Year;
        if (parseInt(yearBirth) <= 1970) {
          console.log("1970 and below");
          // this.visibleOldIc = true;
        } else {
          console.log("above");
          // this.visibleOldIc = false;
        }
        if (parseInt(val.substr(11, 1)) % 2 == 0) {
          console.log("The number is even. Female");
          this.model.CONSULTANT_GENDER = "2";
        } else {
          console.log("The number is odd. Male");
          this.model.CONSULTANT_GENDER = "1";
        }
      }
    },
  },
  created() {
    alert(this.CONSULTANT_GENDER);
    console.log(this.user);
    console.log(this.formDataModel);

    this.overlay_show = false;
    this.mapParentDataToFormDataModel(this.formDataModel);
    this.mapDropDownToModel();
    /* ---------------------------------- TAB1 ---------------------------------- */
  },
};
</script>
