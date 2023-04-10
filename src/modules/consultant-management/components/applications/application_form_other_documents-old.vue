<template>
  <div>
    <br />
    <br />
    <vue-form-generator :model="model" :schema="tabSchema7" :options="formOptions" ref="tabForm7" @model-updated="onModelUpdated"></vue-form-generator>

    <b-modal ref="declaration-personal-details" :hide-header="true" :hide-header-close="true">
      <div class="d-block text-center">
        <h4>Declaration of Personal Details</h4>
      </div>
      <div class="d-block text-left">
        <h6>By submitting this application to FIMM, I hereby confirm that</h6>
        <ul>
          <li>i.</li>
          <li>ii.</li>
          <li>iii.</li>
        </ul>
      </div>

      <template #modal-footer>
        <div>
          <button type="button" class="ml-2 btn btn-primary btn-fill btn-md" @click="submitRegistrationForm">OK</button>
        </div>
      </template>
    </b-modal>

    <br />
    <br />
    <br />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import moment from "moment";
import * as servicesmodule0 from "../../../../app/module0/services";
import * as servicesmodule2 from "../../../../app/module2/services";
import * as services02module2 from "../../../../app/module2/services02";
import * as services02module0 from "../../../../app/module0/services02";
import * as services06module1 from "../../../../app/module1/services06";
import RepositoryFactory from "../../../../repositories/RepositoryFactory";
import { getRequiredDocumentById } from "../../../../app/module0/services";

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ApprovalLevel = RepositoryFactory.get("approvallevel");
const SettingPostcode = RepositoryFactory.get("settingpostcode");
const SettingGeneral = RepositoryFactory.get("settinggeneral");
const ConsultantExamType = RepositoryFactory.get("consultantexamtype");
const DistributorRecords = RepositoryFactory.get("distributorrecords");
// const ConsultantExamSession = RepositoryFactory.get('consultantexamsession');
// const DistributorType = RepositoryFactory.get('distributortype');
// const ConsultantRecord = RepositoryFactory.get('consultantrecord');
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    value: File,
  },

  /* -------------------------------------------------------------------------- */
  /*                                  startdata                                 */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      token: JSON.parse(localStorage.getItem("user")).access_token,
      isDisabled: true,
      postcodeAPI: [],
      statesAPI: [],
      cityAPI: [],
      countriesAPI: [],
      examTypeAPI: [],
      resultAPI: null,
      examSitesAPI: [],
      search: "",
      examSessionsAPI: [],
      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION1                            */
      /* -------------------------------------------------------------------------- */
      visible: false,
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

      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION2                            */
      /* -------------------------------------------------------------------------- */
      visibleCategoryStaff: false,
      visibleConsultant: false,
      visibleCMSRL_Yes: false,
      visibleCMSRL_No: false,
      visibleUTS: false,
      visiblePRS: false,

      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION3                            */
      /* -------------------------------------------------------------------------- */
      visibleExemptionQualified: false,

      visibleExemption: {
        STAFF_CEO: false,
        STAFF_DIRECTOR: false,
        FUND_MANAGER: false,
        FINANCIAL_PLANNER: false,
        UNIT_TRUST: false,
        INSURANCE_AGENT: false,
      },

      // showCenterExam:false,
      // showExamDate: false,
      // showtable:false,

      visibleModal: {
        DECLARATION_OF_PERSONAL_DETAILS: false,
      },

      viewType: 1,

      // section 1
      citizenship: [
        { name: "MALAYSIAN", value: 1 },
        { name: "NON-MALAYSIAN", value: 2 },
      ],

      CONSULTANT_GENDER: [
        { name: "MALE", value: 1 },
        { name: "FEMALE", value: 2 },
      ],
      race: [
        { name: "MALAY", value: 1 },
        { name: "CHINESE", value: 2 },
        { name: "INDIAN", value: 3 },
        { name: "OTHERS", value: 4 },
      ],
      qualification: [
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
      subject: [
        { name: "CREDIT IN SEJARAH", value: 1 },
        { name: "CREDIT IN PENDIDIKAN ISLAM", value: 2 },
      ],
      language: [
        { name: "MALAY", value: 1 },
        { name: "CHINESE", value: 2 },
        { name: "ENGLISH", value: 3 },
        { name: "OTHERS", value: 4 },
        { name: "NIL", value: 5 },
      ],
      certificate: [
        { name: "CERTIFIED FINANCIAL PLANNER (CFP)", value: 1 },
        { name: "ISLAMIC FINANCIAL PLANNER (IFP)", value: 2 },
        { name: "REGISTERED FINANCIAL PLANNER (RFP)", value: 3 },
        { name: "SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)", value: 4 },
      ],
      country: [{ name: "MALAYSIA", id: 1, selected: true }],

      copyCorrespondence: false,
      // section 2
      category: [
        { name: "Staff", value: 1 },
        { name: "Consultant", value: 2 },
      ],
      cmsrl: [
        { name: "Yes", value: 1 },
        { name: "No", value: 2 },
      ],

      distributorAPI: [
        // { id: 1, name: 'ENG JIA SECURITIES SDN BHD', LICENSE_TYPE: 'UTS' },
        // { id: '4', name: 'HONG LEONG ASSET FUND MANAGEMENT BHD', LICENSE_TYPE: 'PTS' },
      ],

      uts: [{ name: "UNIT TRUST SCHEME CONSULTANT", value: 1 }],
      prs: [{ name: "PRIVATE RETIREMENT SCHEME CONSULTANT", value: 2 }],

      // exam

      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        backgroundColor: "#ff0000",
        eventColor: "#378006",
        eventClick: this.handleDateClick,
        events: [
          { title: "Available", date: "2020-11-01", display: "background" },
          { title: "Available", date: "2020-11-02", display: "background" },
        ],
      },

      fields: {
        examSessions: [
          // A virtual column that doesn't exist in items
          { name: "__slot:index", title: "No" },
          // A column that needs custom formatting
          { name: "examDate", title: "Exam Date" },
          { name: "sessionTime", title: "Session Time" },
          { name: "day", title: "Day" },
          { name: "centreName", title: "Centre Name" },
          { name: "centreLocation", title: "Centre Location" },
          { name: "availableSit", title: "Available Sit" },
          { name: "__slot:ACTION", title: "Action" },
        ],
      },

      centerExam: [
        {
          siteid: "ASLC",
          sitename: "Alor Setar Learning Centre",
          address: "Open University Malaysia (OUM)",
          city: "Alor Setar",
          state: "Kedah",
        },
        {
          siteid: "ASLC",
          sitename: "PreSIT Center Profile X",
          address: "Jalan Gasing",
          city: "Petaling Jaya",
          state: "Selangor",
        },
        {
          siteid: "PSITCP0Y",
          sitename: "PreSIT Center Profile Y",
          address: "Jalan Meru",
          city: "Ipoh",
          state: "Perak",
        },
      ],

      sessionYear: "",
      examDate: "",
      sessionTime: "",
      day: "",
      centreLoc: "",
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "sessionYear",
                label: "Session Year",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "sessionTime",
                label: "Session Time",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "date",
                label: "Start Date",
                model: "date",
                format: "DD-MM-YYYY",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "date",
                label: "End Date",
                model: "date",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "centreLoc",
              //   label: "Centre Location",
              //   styleClasses: "col-md-6"
              // },
              {
                type: "select",
                model: "centreLoc",
                label: "Center Location",
                values: (model, schema) => {
                  return this.centreLocation;
                },
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
      // search

      currentPage: 1,
      perPage: "10",

      insuranceAgentCertificates: [
        {
          label:
            "Certificate Examination in Investment-Link Life Insurance (CEILLI)",
          value: "1",
        },
        {
          label:
            "Takaful Business Examination (TBE) (for completion before 2012)",
          value: "2",
        },
        {
          label:
            "Takaful Business Examination (TBE) – Part A and Part C (2 certificates (for completion after 2012)",
          value: "3",
        },
        {
          label:
            "Certificate from Malaysian Takaful Association (MTA) – General & Family",
          value: "4",
        },
      ],

      exemptionCategory: [
        {
          name: "CEO",
          // value: 'STAFF_CEO',
          value: "1",
        },
        {
          name: "DIRECTORS",
          // value: 'STAFF_DIRECTOR',
          value: "2",
        },
        {
          name: "FUND MANAGER",
          // value: 'FUND_MANAGER',/
          value: "3",
        },
        {
          name: "FINANCIAL PLANNER",
          // value: 'FINANCIAL_PLANNER',
          value: "4",
        },
        {
          name: "PRS FAMILIARISATION PROGRAM (PRSFP) - Insurance Agent",
          // value: 'INSURANCE_AGENT',
          value: "5",
        },
        {
          name: "PRS FAMILIARISATION PROGRAM (PRSFP) - Unit Trust Consultant",
          // value: 'UNIT_TRUST',
          value: "6",
        },
      ],

      model:{
        documentFile : "",
      },

      // model: {
      //   /* -------------------------------------------------------------------------- */
      //   /*                             MODEL_DATA_SECTION1                            */
      //   /* -------------------------------------------------------------------------- */

      //   APPLICATION_ID: 5,
      //   CONSULTANT_NAME: null,
      //   CONSULTANT_CITIZEN: null,
      //   CONSULTANT_NRIC: null,
      //   CONSULTANT_NRIC_OLD: null,
      //   // CONSULTANT_PASSPORT_NO: null,
      //   // CONSULTANT_PASSPORT_EXPIRY_NO: null,
      //   CONSULTANT_NRIC_PHOTO: null,
      //   CONSULTANT_PASSPORT_PHOTO: null,
      //   CONSULTANT_GENDER: null,
      //   CONSULTANT_DOB: null,
      //   CONSULTANT_RACE: null,
      //   CONSULTANT_OTHER_RACE: null,
      //   CONSULTANT_PHONENO: null,
      //   CONSULTANT_HOUSE_NO: null,
      //   CONSULTANT_EMAIL: null,
      //   CONSULTANT_HIGHEST_QUALIFICATION: null,

      //   MATH: null,
      //   OTHER_SUBJECT: null,
      //   LANGUAGE: null,
      //   OTHER_LANGUAGE: null,
      //   SPM_DOCS: null,
      //   STPM_DOCS: null,
      //   DIPLOMA_DOCS: null,
      //   DEGREE_DOCS: null,
      //   DEGREE_MAJOR: null,
      //   DEGREE_MINOR: null,
      //   PROFESSIONAL_CERTIFICATE: null,
      //   PROFESSIONAL_CFP_DOCS: null,
      //   // correspondence
      //   CONSULTANT_CORRESPONDENT_COUNTRY: null,
      //   CONSULTANT_CORRESPONDENT_STATE: null,
      //   CONSULTANT_CORRESPONDENT_CITY: null,
      //   CONSULTANT_CORRESPONDENT_POSTAL: null,
      //   CONSULTANT_CORRESPONDENT_ADDR1: null,
      //   CONSULTANT_CORRESPONDENT_ADDR2: null,
      //   CONSULTANT_CORRESPONDENT_ADDR3: null,
      //   // permanent
      //   CONSULTANT_PERMANENT_COUNTRY: null,
      //   CONSULTANT_PERMANENT_STATE: null,
      //   CONSULTANT_PERMANENT_CITY: null,
      //   CONSULTANT_PERMANENT_POSTAL: null,
      //   CONSULTANT_PERMANENT_ADDR1: null,
      //   CONSULTANT_PERMANENT_ADDR2: null,
      //   CONSULTANT_PERMANENT_ADDR3: null,

      //   /* -------------------------------------------------------------------------- */
      //   /*                             MODEL_DATA_SECTION2                            */
      //   /* -------------------------------------------------------------------------- */
      //   CONSULTANT_CATEGORY: null,
      //   CONSULTANT_STATUS: null,
      //   STAFF_POSITION: null,
      //   CMSRL: null,
      //   CMSRL_NO: null,
      //   CMSRL_EXPIRY_DATE: null,
      //   CMSRL_CERT_DOCS: null,
      //   RECRUITER_NRIC_NO: null,
      //   RECRUITER_CMSRL_NO: null,
      //   APPRENTICESHIP_DOCS: null,

      //   DISTRIBUTOR: null,
      //   LICENSE_TYPE: [],
      //   UTS: false, // not used in post methods
      //   PRS: false, // not used in post methods

      //   /* -------------------------------------------------------------------------- */
      //   /*                             MODEL_DATA_SECTION3                            */
      //   /* -------------------------------------------------------------------------- */
      //   // exam

      //   COURSE_TYPE: "1",

      //   EXEMPTION_QUALIFIED: false,

      //   // EXEMPTION MODEL
      //   EXEMPTION_CATEGORY: null,
      //   STAFF_CEO_DOCS: null,
      //   STAFF_DIRECTOR_EXPERIENCE_YEARS: null,
      //   STAFF_DIRECTOR_DOCS: null,
      //   FUND_MANAGER_DOCS: null,
      //   FUND_MANAGER_CMSRL_NO: null,
      //   FUND_MANAGER_CMSRL_EXPIRY: null,
      //   FINANCIAL_PLANNER_ACTIVE_DOCS: null,
      //   FINANCIAL_PLANNER_FPAM_MODULE1_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_FPAM_MODULE3_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_FPAM_CFP_IFP_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_MFPC_MODULE1_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_MFPC_MODULE3_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_MFPC_MODULE6_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_MFPC_CERTIFIED_COMPLETION_DATE: null,
      //   FINANCIAL_PLANNER_MFPAA_COMPLETION_DATE: null,
      //   UNIT_TRUST_PRSFP_ATTENDANCE_CERT: null,
      //   INSURANCE_AGENT_CERT: null,
      //   DECLARATION_OF_CERT: null,

      //   EXAM_PREFERRED_STATE: null,
      //   EXAM_PREFERRED_SITE: null,
      //   EXAM_PREFERRED_DATE: null,
      //   EXAM_CENTRE_LOCATION: [],

      //   /* -------------------------------------------------------------------------- */
      //   /*                             MODEL_DATA_SECTION4                            */
      //   /* -------------------------------------------------------------------------- */
      //   OTHER_DOCS: null,
      //   REGISTRATION_STATUS: null,
      //   PUBLISH_STATUS: null,
      // },

      // Section 1
      tabSchema1: {
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
                styleClasses: "col-md-12 text-uppercase",
                // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              },
              // {
              //   labels: 'UPLOAD PASSPORT SIZE PHOTO',
              //   text: 'Choose a Photo',
              //   model: 'PASSPORT_SIZE_PHOTO',
              //   type: 'vfg-custom-file',
              //   styleClasses: 'col-md-12',
              //   required: true,
              // },
              {
                type: "radios",
                label: "Citizenship",
                model: "CONSULTANT_CITIZEN",
                required: true,
                validator: "required",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-4 display-inline text-uppercase",
              },
              {
                type: "vfg-the-mask",
                labels: "New NRIC Number",
                model: "CONSULTANT_NRIC",
                required: true,
                validator: "required",
                placeholder: "Enter NRIC number",
                mask: "######-##-####",
                styleClasses: "col-md-4 text-uppercase",
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
                styleClasses: "col-md-4 text-uppercase",
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
                styleClasses: "col-md-4 text-uppercase",
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
                styleClasses: "col-md-4 text-uppercase",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },

              {
                labels: "Upload NRIC Photo (Front and Back)",
                text: "Choose a File",

                model: "CONSULTANT_NRIC_PHOTO",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
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
                styleClasses: "col-md-12",
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
                styleClasses: "col-md-4 display-inline",
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
                styleClasses: "col-md-4 text-uppercase",
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_RACE",
                label: "Race",
                placeholder: "Enter race",
                required: true,
                validator: "required",
                styleClasses: "col-md-4",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.race;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-4",
              },
              {
                type: "label",
                styleClasses: "col-md-4",
              },
              {
                type: "input",
                inputType: "text",
                label: "Other Race",
                model: "CONSULTANT_OTHER_RACE",
                placeholder: "Please specify",
                required: true,
                validator: "required",
                styleClasses: "col-md-4 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleOtherRace;
                },
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
                placeholder: "Enter house number",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "email",
                label: "Email",
                model: "CONSULTANT_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "required",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_HIGHEST_QUALIFICATION",
                label: "Highest Qualification",
                placeholder: "Enter highest qualification",
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
                  return this.qualification;
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
                model: "PROFESSIONAL_CERTIFICATE",
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
                  return this.certificate;
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
                  "Upload Supported Document For STPM Or STPM Equivalent Qualification",
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
                labels: "Upload Supported Document For Diploma",
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
                labels: "Upload Supported Document For Degree Qualification",
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
                styleClasses: "col-md-4 display-inline",
              },
              {
                type: "vueMultiSelect",
                model: "OTHER_SUBJECT",
                label: "Credit Other Subject",
                placeholder: "Enter credit other subject",
                required: true,
                validator: "required",
                styleClasses: "col-md-4 ",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.subject;
                },
              },

              {
                type: "vueMultiSelect",
                model: "LANGUAGE",
                label: "Credit in Language",
                placeholder: "Enter credit in language",
                required: true,
                validator: "required",
                styleClasses: "col-md-4",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.language;
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
      // form 1- address correspondent
      tabSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_CORRESPONDENT_COUNTRY",
                label: "Country",
                placeholder: "Enter origin country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  // value: 'SETTING_GENERAL_ID',
                  searchable: true,
                },

                values: (model, schema) => {
                  return this.countries;
                },
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_CORRESPONDENT_STATE",
                label: "State",
                placeholder: "Enter state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SET_GENERAL_ID",
                  label: "SET_STATE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "City",
                model: "CONSULTANT_CORRESPONDENT_CITY",
                placeholder: "Enter city",
                styleClasses: "col-md-6 text-uppercase",
                required: true,
                validator: "required",
              },

              {
                type: "vueMultiSelect",
                model: "CONSULTANT_CORRESPONDENT_POSTAL",
                label: "Postcode",
                placeholder: "Enter postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_POSTCODE_ID",
                  label: "POSTCODE",
                  value: "SETTING_POSTCODE_ID",
                  searchable: true,
                },
                values: (model, schema) => {
                  // if (this.postcode.POSTCODE) return this.postcode.POSTCODE;
                  return this.postcode;
                },
              },

              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "CONSULTANT_CORRESPONDENT_ADDR1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "required",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_CORRESPONDENT_ADDR2",
                placeholder: "Enter street address",
                hint: "Street address line 2",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_CORRESPONDENT_ADDR3",
                placeholder: "Enter street address",
                hint: "Street address line 3",
                styleClasses: "col-md-12 text-uppercase",
              },
            ],
          },
        ],
      },
      // form 1 - permanent address
      tabSchema3: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_PERMANENT_COUNTRY",
                label: "Country",
                placeholder: "Enter origin country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  // value: 'SETTING_GENERAL_ID',
                  searchable: true,
                },
                // visible: (model, field, form) => {
                //   return this.visiblePassport;
                // },
                values: (model, schema) => {
                  return this.countries;
                },
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_PERMANENT_STATE",
                label: "State",
                placeholder: "Enter state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 text-uppercase",
                selectOptions: {
                  multiple: false,
                  key: "SET_GENERAL_ID",
                  label: "SET_STATE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states;
                },
              },

              {
                type: "input",
                inputType: "text",
                label: "City",
                model: "CONSULTANT_PERMANENT_CITY",
                placeholder: "Enter city",
                styleClasses: "col-md-6 ",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "CONSULTANT_PERMANENT_POSTAL",
                label: "Postcode",
                placeholder: "Enter postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_POSTCODE_ID",
                  label: "POSTCODE",
                  value: "SETTING_POSTCODE_ID",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "CONSULTANT_PERMANENT_ADDR1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "required",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_PERMANENT_ADDR2",
                placeholder: "Enter street address",
                hint: "Street address line 2",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_PERMANENT_ADDR3",
                placeholder: "Enter street address",
                hint: "Street address line 3",
                styleClasses: "col-md-12 text-uppercase",
              },
            ],
          },
        ],
      },

      // section 2
      tabSchema4: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                model: "CONSULTANT_CATEGORY",
                required: true,
                validator: "required",
                values: () => {
                  return this.category;
                },
                styleClasses: "col-md-7 display-inline",
              },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "STAFF_POSITION",
                placeholder: "Enter your position",
                required: true,
                validator: "required",

                styleClasses: "col-md-12 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
              {
                type: "radios",
                label: "CMSRL",
                model: "CMSRL",
                required: true,
                validator: "required",

                values: () => {
                  return this.cmsrl;
                },
                styleClasses: "col-md-12 display-inline",
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "CMSRL No",
                model: "CMSRL_NO",
                placeholder: "Enter CMRSL Number",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                type: "input",
                inputType: "date",
                label: "CMSRL Expiry Date",
                model: "CMSRL_EXPIRY_DATE",
                placeholder: "Enter CMSRL expiry date",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "required",

                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },
              {
                labels: "Upload CMSRL Certificate",
                text: "Choose a File",
                model: "CMSRL_CERT_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                labels: "Recruiter NRIC Number",
                model: "RECRUITER_NRIC_NO",
                type: "vfg-the-mask",
                placeholder: "Enter Recruiter NRIC",
                mask: "######-##-####",
                styleClasses: "col-md-6 ",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) &&
                    this.visibleCategoryStaff
                  );
                },
                required: true,
              },
              {
                type: "input",
                inputType: "text",
                label: "Recruiter CMSRL Number",
                model: "RECRUITER_CMSRL_NO",
                placeholder: "Enter Recruiter CMRSL Number",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",

                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) &&
                    this.visibleCategoryStaff
                  );
                },
              },

              {
                labels: "Apprenticenship Program",
                text: "Choose a File",
                model: "APPRENTICESHIP_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_No && this.visibleCategoryStaff;
                },
                hint: "Upload Certificate from any Module 1 CFP/IFP/RFP/shariah RFP or Exemption Letter from FPAM",
              },
            ],
          },
        ],
      },

      // form 1 - select distributor
      tabSchema5: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DISTRIBUTOR",
                label: "List of Distributor",
                placeholder: "Enter distributor",
                // required: true,
                // validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_ID",
                  label: "DIST_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.filteredDistributor;
                },
              },

              {
                type: "checklist",
                listBox: true,
                label: "Your Registration Type",
                model: "LICENSE_TYPE",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                checklistOptions: {
                  value: "exam_type",
                  name: "label",
                },
                values: (model, schema) => {
                  return this.registrationType;
                },

                visible: (model, field, form) => {
                  return this.registrationType.length;
                },
              },
            ],
          },
        ],
      },

      // // form 1 - select distributor

      currentRowClicked: "",

      examSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "EXAM_PREFERRED_STATE",
                label: "State",
                placeholder: "Select state",
                // required: true,
                // validator: 'required',
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_STATE",
                  value: "SETTING_GENERAL_ID",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.statesAPI;
                },
              },
              {
                type: "vueMultiSelect",
                model: "EXAM_PREFERRED_SITE",
                label: "Exam Center",
                placeholder: "Select Exam Center",
                // required: true,
                // validator: 'required',
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "siteid",
                  label: "sitename",
                  searchable: false,
                },

                values: (model, schema) => {
                  return this.filteredExamSites;
                },
                // visible: (model, field, form) => {
                //   return this.showExamDate
                // },
              },
              // {
              //   labels: 'Preferred Exam Date',
              //   type: 'vfg-functional-date',
              //   inputType: 'date',
              //   placeholder: 'Select preferred date',
              //   model: 'EXAM_PREFERRED_DATE',
              //   disabled: this.isDisabled,
              //   noLabel: true,
              //   noClearButton: true,
              //   format: 'dd-MM-yyyy',
              //   styleClasses: 'col-md-6',
              //   // required: true,
              //   // visible: (model, field, form) => {
              //   //   return this.showtable
              //   // },
              // },
            ],
          },
        ],
      },

      exemptionSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "EXEMPTION_CATEGORY",
                label: "Exemption Category",
                placeholder: "Select a category",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  value: "value",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.exemptionCategory;
                },
                visible: (model, field, form) => {
                  return this.visibleExemptionQualified;
                },
              },
              {
                styleClasses: "col-md-6",
                type: "label",
                visible: (model, field, form) => {
                  return this.visibleExemptionQualified;
                },
              },
              {
                labels:
                  "1. Appointment approval by the SC/relevant authority for appointment",
                text: "Choose a File",
                model: "STAFF_CEO_DOCS",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_CEO;
                },
              },
              {
                type: "input",
                inputType: "number",
                label:
                  "Years of Experience in Unit Trust/Fund Management Industry",
                model: "STAFF_DIRECTOR_EXPERIENCE_YEARS",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_DIRECTOR;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-8",
              },
              {
                labels: "1. Resume or Curriculum Vitae",
                text: "Choose a File",
                model: "STAFF_DIRECTOR_DOCS",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_DIRECTOR;
                },
              },

              {
                labels: "Upload CMSRL",
                text: "Choose a File",
                model: "FUND_MANAGER_DOCS",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "CMSRL No",
                model: "FUND_MANAGER_CMSRL_NO",
                placeholder: "Enter CMRSL Number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER;
                },
              },

              {
                type: "input",
                inputType: "date",
                label: "CMSRL Expiry Date",
                model: "FUND_MANAGER_CMSRL_EXPIRY",
                placeholder: "Enter CMSRL expiry date",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER;
                },
              },
              {
                label: "Active Membership of the Association/Organisation",
                text: "Choose a File",
                model: "FINANCIAL_PLANNER_ACTIVE_DOCS",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                label: "a) FPAM -CFP/IFP/Both",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Module 1 Completion Date",
                model: "FINANCIAL_PLANNER_FPAM_MODULE1_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Module 3 Completion Date",
                model: "FINANCIAL_PLANNER_FPAM_MODULE3_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "ii) CFP/IFP -Certified Completion Date",
                model: "FINANCIAL_PLANNER_FPAM_CFP_IFP_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                label: "b) MFPC",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                label: "i) RFP/Shariah RFP - Partial Completion",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Module 1 Completion Date",
                model: "FINANCIAL_PLANNER_MFPC_MODULE1_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Module 3 Completion Date",
                model: "FINANCIAL_PLANNER_MFPC_MODULE3_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Module 6 Completion Date",
                model: "FINANCIAL_PLANNER_MFPC_MODULE6_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "ii) RFP/Shariah RFP - Certified Completion Date",
                model: "FINANCIAL_PLANNER_MFPC_CERTIFIED_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "label",
                label: "c) MFPAA",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: "input",
                inputType: "date",
                label: "Completion Date",
                model: "FINANCIAL_PLANNER_MFPAA_COMPLETION_DATE",
                placeholder: "Enter date of birth",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },

              {
                label: "PRSFP Certificate of Attendance",
                text: "Choose a File",
                model: "UNIT_TRUST_PRSFP_ATTENDANCE_CERT",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.UNIT_TRUST;
                },
              },
              {
                type: "vueMultiSelect",
                model: "INSURANCE_AGENT_CERT",
                label: "List of Insurance Certificate",
                // placeholder: 'Select a category',
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "label",
                  value: "id",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.insuranceAgentCertificates;
                },

                visible: (model, field, form) => {
                  return this.visibleExemption.INSURANCE_AGENT;
                },
              },
              // {
              //   type: 'input',
              //   inputType: 'checkbox',
              //   model: 'DECLARATION_OF_CERT',
              //   label: 'Declaration of Certification',

              //   required: true,
              //   validator: 'required',
              //   styleClasses: 'col-md-12',
              //   selectOptions: {
              //     multiple: false,
              //     // key: 'id',
              //     // label: 'name',
              //     // value: 'id',
              //     searchable: false,
              //   },
              //   values: (model, schema) => {
              //     return this.exemptionCategory;
              //   },
              //   visible: (model, field, form) => {
              //     return this.visibleExemption.INSURANCE_AGENT;
              //   },
              // },
            ],
          },
        ],
      },

      tabSchema7: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                // type: 'input',
                // inputType: 'file',
                // labels: "Other Document",
                // text: "Choose a File",
                // model: "OTHER_DOCS",
                // type: "vfg-custom-multiple-file",
                // styleClasses: "col-md-12",

                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileOne",
                type: "vfg-custom-multiple-file-edit-Divestment",
                styleClasses: "col-md-12",
                required: true,
                hint: "Accepted format : (.pdf)"
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

  watch: {
    "model.CONSULTANT_NRIC": function (val) {
      console.log("dob :" + this.model.CONSULTANT_DOB);
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

  // async created() {
  //   /* ---------------------------------- TAB1 ---------------------------------- */
  //   await this.getAllCountries();
  //   await this.getAllPostcodes();
  //   await this.getAllStates();

  //   /* ---------------------------------- TAB2 ---------------------------------- */
  //   // await this.getDistributorCandidateAcceptance();
  //   await this.getDistributorRecords();

  //   // for Re-registration, check result when switching from tab2 to tab3
  //   // if completed, complete modal will pop up, if fail, fail modal will be shown instead
  //   // beforeTab2Switch function to trigger result checking
  //   await this.getResult({
  //     applicationid: this.model.APPLICATION_ID,
  //     token: this.token,
  //   });

  //   /* ---------------------------------- TAB3 ---------------------------------- */
  //   // await this.getExamListPreference(this.examListPreferenceParams);
  //   await this.getSite();
  //   await this.getExamCourses();

  //   /* ---------------------------------- TAB4 ---------------------------------- */
  //   await this.getRequiredDocument(this.token);

  //   // await this.getAllConsultantExamType();

  //   await this.processPreferences();
  //   // await this.getAppeal();

  //   // await this.getRegistrationStatus();
  //   // await this.getConsultantRecords();

  //   // await this.getDistributorType();
  //   // await this.getAllConsultantExamSessions();
  //   // await this.getAllApprovalLevel();

  //   // await this.getConsultantType();
  //   // await this.getAllWaiverFeeList();
  //   // await this.getAllConsFeeList();
  // },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    //get data to save
    getDataToSave() {
      let dataToSave = {
        // OTHER_FILE_UPLOAD: this.ref.tabForm7,
        OTHER_FILE_UPLOAD: null,
      };
      return dataToSave;
    },

    copyCorrespondenceToPermanent() {
      const varName = [
        "COUNTRY",
        "STATE",
        "CITY",
        "POSTAL",
        "ADDR1",
        "ADDR2",
        "ADDR3",
      ];

      if (this.copyCorrespondence) {
        varName.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}`] =
            this.model[`CONSULTANT_CORRESPONDENT_${el}`];
        });
      } else {
        varName.forEach((el) => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = "";
        });
      }
    },

    onComplete() {
      alert(JSON.stringify(this.model));
    },

    // validateTab(ref) {
    //   return this.$refs[ref].validate();
    // },
    validateTab1() {
      return this.$refs["tabForm1"].validate();
    },
    validateTab2() {
      return this.$refs["tabForm2"].validate();
    },
    validateTab3() {
      return this.$refs["tabForm3"].validate();
    },
    validateTab4() {
      return this.$refs["tabForm4"].validate();
    },
    validateTab5() {
      return this.$refs["tabForm5"].validate();
    },
    validateExemptionForm() {
      return this.$refs["exemptionForm"].validate();
    },
    validateExamForm() {
      return this.$refs["examForm"].validate();
    },
    beforeTab1Switch: async function () {
      console.log("inside beforeTab1Switch");

      // const schema1validated = await this.validateTab1();
      // const schema2validated = await this.validateTab2();
      // const schema3validated = await this.validateTab3();

      // const schemas = [schema1validated, schema2validated, schema3validated];

      // const validated = schemas.every(el => el.length < 1);

      // console.log('validation status:', validated);

      // if (validated) return true;
      // return false;
      return true;
    },
    beforeTab2Switch: async function () {
      console.log("inside beforeTab2Switch");

      // const schema4validated = await this.validateTab4();
      // const schema5validated = await this.validateTab5();

      // const schemas = [schema4validated, schema5validated];

      // const validated = schemas.every(el => el.length < 1);

      // console.log('validation status:', validated);

      // if (validated) {

      //   // this if else block will only be triggered in Re-registration
      //   if (this.resultAPI.result.match('PASS')) {
      //     // show examinationValid
      //     this.showModal('exemptionPASS');
      //     this.EXEMPTION_QUALIFIED = this.resultAPI;
      //   } else {
      //     // show examinationRequired modal
      //     this.showModal('exemptionFAIL');
      //     this.EXEMPTION_QUALIFIED = null;
      //   }

      //   return true;
      // }
      return true; // can be removed if validation above is active
    },
    beforeTab3Switch() {
      // console.log(this.model);
      // const schemaExemptionForm = await this.validateTab4();
      // const schemaExamForm = await this.validateTab5();

      // const schemas = [schemaExemptionForm, schemaExamForm];

      // const validated = schemas.every(el => el.length < 1);

      // console.log('validation status:', validated);

      // if (validated){
      //   return true
      // } else {
      //   return false
      // }

      return true;
    },

    nextTab: async function () {
      console.log("Test");
      // const returnresponse = await services02module2.postRegisterConsultant(this.model);
    },

    generateModelDataForm(status) {
      this.model.PUBLISH_STATUS = status;
      this.model.REGISTRATION_STATUS = status + 1;
      console.log(this.model);
      const data = new FormData();
      const fileType = [
        "CONSULTANT_NRIC_PHOTO",
        "CONSULTANT_PASSPORT_PHOTO",
        "SPM_DOCS",
        "STPM_DOCS",
        "DIPLOMA_DOCS",
        "DEGREE_DOCS",
        "PROFESSIONAL_CFP_DOCS",
        "CMSRL_CERT_DOCS",
        "APPRENTICESHIP_DOCS",
        "STAFF_CEO_DOCS",
        "STAFF_DIRECTOR_DOCS",
        "FUND_MANAGER_DOCS",
        "FINANCIAL_PLANNER_ACTIVE_DOCS",
        "OTHER_DOCS",
      ];

      const multiSelect = [
        "CONSULTANT_RACE",
        "CONSULTANT_HIGHEST_QUALIFICATION",
        "LANGUAGE",
        "PROFESSIONAL_CERTIFICATE",
        "OTHER_SUBJECT",
        "DISTRIBUTOR",
        "EXEMPTION_CATEGORY",
        "INSURANCE_AGENT_CERT",
      ];

      for (const [key, value] of Object.entries(this.model)) {
        let isFile = fileType.some((el) => el === `${key}`);
        // console.log(key, value);
        let isMultiSelect = multiSelect.some((el) => el === `${key}`);

        if (isMultiSelect) console.log(key, value, typeof value);

        if (isMultiSelect && value !== null) {
          // If data is multiselect, append data.value
          data.append(`${key}`, value.value);
        } else if (`${key}`.match("POSTAL") && value !== null) {
          // if data is POSTAL
          data.append(`${key}`, value.SETTING_POSTCODE_ID);
        } else if (
          (`${key}`.match("COUNTRY") || `${key}`.match("STATE")) &&
          value !== null
        ) {
          // if data is COUNTRY or STATE
          data.append(`${key}`, value.SETTING_GENERAL_ID);
        } else if (isFile && value !== null) {
          // if data is File
          console.log("isBlob:", value instanceof Blob);
          console.log(isFile, key, value);
          typeof value === "object"
            ? data.append(`${key}`, value, value.name)
            : Object.prototype.toString.call(data) == "[object Array]"
              ? value.forEach((el) => data.append(`${key}`, el, el.name))
              : false;
        } else if (value !== null) {
          // else
          data.append(`${key}`, value);
        }
      }
      console.log(data);

      return data;
    },

    saveAsDraft: async function () {
      console.log("inside save as draft");
      const data = this.generateModelDataForm(0);

      try {
        const doesConsultantExist = await this.getConsultantByID("225");

        console.log(doesConsultantExist);

        if (doesConsultantExist) {
          const response = await services02module2.updateRegisterConsultant(
            data
          );
        } else {
          const response = await services02module2.postRegisterConsultant(data);
        }

        console.log(response);
        return response;
        // const response = await services02module2.postRegisterConsultant(data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    submitRegistrationForm: async function () {
      const data = this.generateModelDataForm(1);

      const response = await services02module2.postRegisterConsultant(data);
      console.log(response);

      this.$refs["declaration-personal-details"].hide();
    },

    displayDeclarationModal: async function () {
      this.$refs["declaration-personal-details"].show();
    },

    showModal(ref) {
      this.$refs[`${ref}`].show();
    },
    hideModal(ref) {
      this.$refs[`${ref}`].hide();
    },
    // processPreferences: async function() {
    //   var dataid = 136;
    //   try {
    //     const response = await servicesmodule2.getProcessPreference(dataid);
    //     onsole.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    switchView(type) {
      this.viewType = type;
    },
    handleDateClick: function (calEvent, jsEvent, view) {
      console.log(JSON.stringify(calEvent.event));
      //  var dt = calEvent.date;
      alert(
        "Event Clicked on : " +
        this.moment(calEvent.event.start).format("DD-MM-yyyy, h:mm:ss a")
      );
    },
    validateExpiryDate(value) {
      if (value != null) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " GMT";
        const dateTime = date + " " + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        // date expiry
        const expiryDate = this.model.USER_PASS_EXP;
        const dateExpiry =
          expiryDate.getFullYear() +
          "-" +
          (expiryDate.getMonth() + 1) +
          "-" +
          expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ":" +
          expiryDate.getMinutes() +
          ":" +
          expiryDate.getSeconds() +
          " GMT";
        const dateTimeExpiry = dateExpiry + " " + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log("expired");
          return ["Expired"];
        } else {
          console.log("not expired");
          // return ["Expired"];
        }
      } else {
        console.log("ssdfdsf");
      }
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },

    showHighestEducationUploader(newVal) {
      for (let qualification in this.visibleEducation) {
        this.visibleEducation[qualification] = false;
      }
      this.visibleEducation[newVal.name.split(" ")[0]] = true;
    },

    setIsExemptionQualified() {
      // this.model.EXEMPTION_QUALIFIED = !this.model.EXEMPTION_QUALIFIED;
    },

    isExamSessionSelected(array, props) {
      return array.findIndex((el) => el.sessionid === props.rowData.sessionid);
    },

    removeSelectedExamSession(props) {
      const index = this.isExamSessionSelected(
        this.model.EXAM_CENTRE_LOCATION,
        props
      );

      this.model.EXAM_CENTRE_LOCATION.splice(index, 1);
    },
    setSelectedExamSession(props) {
      // if (this.model.EXAM_CENTRE_LOCATION.length >= 3) return;
      const index = this.isExamSessionSelected(
        this.model.EXAM_CENTRE_LOCATION,
        props
      );
      if (index >= 0) return;
      if (this.model.EXAM_CENTRE_LOCATION.length >= 3) return;

      this.model.EXAM_CENTRE_LOCATION.push(props.rowData);

      console.log(this.model.EXAM_CENTRE_LOCATION);
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

    /* -------------------------------------------------------------------------- */
    /*                               updatefunction                               */
    /* -------------------------------------------------------------------------- */

    onModelUpdated(newVal, schema) {
      // console.log(newVal);
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
      } else if (schema == "CONSULTANT_RACE") {
        if (newVal.name == "OTHERS") {
          this.visibleOtherRace = true;
        } else {
          this.visibleOtherRace = false;
        }
      } else if (schema == "CONSULTANT_HIGHEST_QUALIFICATION") {
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
      } else if (schema == "LANGUAGE") {
        if (newVal.name == "OTHERS") {
          this.visibleOtherLanguage = true;
        } else {
          this.visibleOtherLanguage = false;
        }
      } else if (schema == "PROFESSIONAL_CERTIFICATE") {
        if (newVal.name == "CERTIFIED FINANCIAL PLANNER (CFP)") {
          this.visibleEducation.PROFESSIONAL_CFP = true;
        } else {
          this.visibleEducation.PROFESSIONAL_CFP = false;
        }
      } else if (schema == "CONSULTANT_CORRESPONDENT_POSTAL") {
        this.model.CONSULTANT_CORRESPONDENT_POSTAL = newVal;
        return this.postcodeAPI.filter((el) => {
          if (el.POSTCODE == newVal.POSTCODE) {
            this.model.CONSULTANT_CORRESPONDENT_CITY = el.CITY;
          }
        });
      } else if (schema == "CONSULTANT_CORRESPONDENT_COUNTRY") {
        this.model.CONSULTANT_CORRESPONDENT_COUNTRY = newVal;
      } else if (schema == "CONSULTANT_CORRESPONDENT_STATE") {
        this.model.CONSULTANT_CORRESPONDENT_STATE = newVal;
      } else if (schema == "CONSULTANT_PERMANENT_POSTAL") {
        console.log(newVal);
        this.model.CONSULTANT_PERMANENT_POSTAL = newVal;
        return this.postcodeAPI.filter((el) => {
          if (el.POSTCODE == newVal.POSTCODE) {
            this.model.CONSULTANT_PERMANENT_CITY = el.CITY;
          }
        });
      } else if (schema == "CONSULTANT_CORRESPONDENT_COUNTRY") {
        this.model.CONSULTANT_CORRESPONDENT_COUNTRY = newVal;
      } else if (schema == "CONSULTANT_PERMANENT_STATE") {
        this.model.CONSULTANT_PERMANENT_STATE = newVal;
      } else if (schema == "race") {
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
      } else if (schema == "CONSULTANT_CATEGORY") {
        if (newVal == 1) {
          // this.visibleConsultant = false;
          this.visibleCategoryStaff = true;
          // this.visibleCMSRL_Yes = true;
        } else {
          // this.visibleConsultant = true;
          this.visibleCategoryStaff = false;
          // this.visibleCMSRL_Yes = false;
        }
      } else if (schema == "CMSRL") {
        if (newVal == 1) {
          this.visibleCMSRL_Yes = true;
          this.visibleCMSRL_No = false;
        } else {
          this.visibleCMSRL_Yes = false;
          this.visibleCMSRL_No = true;
        }
      } else if (schema == "DISTRIBUTOR") {
        const DIST_VARIATION_TYPE = ["UTMC", "PRP", "IPRA", "IUTA"];
        const DIST_TYPE =
          newVal.distributor_type.distributor_type.DIST_TYPE_VARIATION;
        // console.log(DIST_TYPE);
        this.visibleUTS = false;
        this.visiblePRS = false;

        const matched = DIST_VARIATION_TYPE.some((el) => DIST_TYPE.match(el));

        matched ? (this.visibleUTS = true) : (this.visiblePRS = true);
        // if (!matched) {
        //   this.visiblePRS = true;
        // } else {
        //   this.visibleUTS = true;
        // }
      } else if (schema == "LICENSE_TYPE") {
        console.log("this is LICENSE_TYPE: ", newVal);

        this.model.UTS = false;
        this.model.PRS = false;

        if (newVal.length === 2) {
          console.log("inside if");
          this.model.UTS = true;
          this.model.PRS = true;
        } else {
          console.log("inside else");
          if (newVal[0].match("CUTE")) this.model.UTS = true;
          if (newVal[0].match("CPRE")) this.model.PRS = true;

          console.log(this.model.UTS, this.model.PRS);
        }

        //  console.log('COURSE_TYPE: ', this.model.COURSE_TYPE);

        //   this.model.COURSE_TYPE = this.examType.filter(el =>
        //   el.COURSE_TYPE_NAME.match('CPRE'),
        // ).CONSULTANT_COURSE_TYPE_ID;
      } else if (schema == "UTS") {
        console.log(newVal);
      } else if (schema == "PRS") {
        console.log(newVal);
      } else if (schema == "EXEMPTION_CATEGORY") {
        console.log(schema, newVal);
        // this.visibleExemptionQualified = true;
        x;
      } else if (schema == "EXAM_PREFERRED_STATE") {
        this.model.EXAM_PREFERRED_STATE = newVal;

        if (!this.filteredExamSites.length)
          this.model.EXAM_PREFERRED_SITE = null;

        console.log("EXAM_PREFERRED_STATE: ", this.isPreferencesSet);
        if (this.isPreferencesSet) {
          console.log("yaaaaa");
          console.log(this.examListPreferenceParams);
          this.getExamListPreference(this.examListPreferenceParams);
        }

        // this.visibleExemptionQualified = true;
      } else if (schema == "EXAM_PREFERRED_SITE") {
        this.model.EXAM_PREFERRED_SITE = newVal;
        console.log("EXAM_PREFERRED_SITE: ", this.isPreferencesSet);

        if (this.isPreferencesSet) {
          console.log("yaaaaa");
          console.log(this.examListPreferenceParams);

          this.getExamListPreference(this.examListPreferenceParams);
        }
      }
    },

    isDatePicked() {
      console.log(
        `isdatepicked ${this.model.EXAM_PREFERRED_DATE}`,
        this.isPreferencesSet
      );

      if (this.isPreferencesSet) {
        console.log("yaaaaa");
        this.getExamListPreference(this.examListPreferenceParams);
      }
    },

    onExemptionModelUpdated(newVal, schema) {
      if (schema === "EXEMPTION_CATEGORY") {
        // console.log(newVal);
        Object.keys(this.visibleExemption).forEach((el) => {
          this.visibleExemption[`${el}`] = false;
          if (el.match(newVal.value)) {
            this.visibleExemption[`${el}`] = true;
          }
        });
        console.log(this.visibleExemption);
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */

    async getAllPostcodes() {
      try {
        const postcodes = await SettingPostcode.getAllPostcodes();
        this.postcodeAPI = postcodes.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getAllStates() {
      try {
        const states = await SettingGeneral.getAllStates();
        this.statesAPI = states.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCountries() {
      try {
        const countries = await SettingGeneral.getAllCountries();
        this.countriesAPI = countries.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDistributorRecords() {
      try {
        const distributor_records =
          await DistributorRecords.getDistributorRecords();
        this.distributorAPI = distributor_records.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    // getDistributorCandidateAcceptance: async function() {
    //   const response = await services06module1.getAcceptanceList();
    // },

    getConsultantByID: async function (data) {
      try {
        const response = await services02module2.getConsultantByID(data);

        if (response.data) return true;

        return false;
      } catch (error) {
        console.log(error);
      }
    },

    getConsultantType: async function () {
      try {
        const response = await servicesmodule0.getConsultantType();
      } catch (error) {
        console.log(error);
      }
    },

    async getRequiredDocument(data) {
      try {
        const required_document = await servicesmodule0.getDocument(data);
      } catch (error) {
        console.log(error);
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                                  ems_proxy                                 */
    /* -------------------------------------------------------------------------- */

    getResult: async function (applicationID) {
      try {
        // const response = await servicesmodule2.getResult(applicationID);
        const response = await servicesmodule2.getResultProxy(applicationID);

        this.resultAPI = response;
        if (response) return true;
      } catch (error) {
        return false;
      }
    },
    getExamCourses: async function () {
      try {
        // const response = await servicesmodule2.getExamCourses();
        const response = await servicesmodule2.getExamCoursesProxy();
      } catch (error) {
        console.log(error);
      }
    },

    getSite: async function () {
      try {
        // const response = await servicesmodule2.getSite();
        const response = await servicesmodule2.getSiteProxy();

        this.examSitesAPI = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    getExamListPreference: async function (data) {
      try {
        console.log("inside exam list preference");
        // const response = await servicesmodule2.getExamListPreference(data);

        const response = await servicesmodule2.getExamListPreferenceProxy(data);
        console.log("exam list preference:", response);
      } catch (error) {
        console.log(error);
      }
    },

    processPreferences: async function () {
      try {
        // const response = await servicesmodule2.getProcessPreference(this.model.APPLICATION_ID);
        const response = await servicesmodule2.getProcessPreferenceProxy(100);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    getAppeal: async function () {
      var dataid = 136;
      try {
        // const response = await servicesmodule2.getProcessPreference(this.model.APPLICATION_ID);
        const response = await servicesmodule2.getAppealProxy();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    getConsultantRecords: async function () {
      try {
        const response = await services02module2.getConsultant();
      } catch (error) {
        console.log(error);
      }
    },

    async getAllConsultantExamType() {
      try {
      } catch (error) {
        console.log(error);
      }
      const exam_type = await ConsultantExamType.getAllConsultantExamType();
      this.examTypeAPI = exam_type.data.data;
    },

    getRegistrationStatus: async function () {
      try {
      } catch (error) {
        console.log(error);
      }
      const response = await services02module2.registrationStatus();
    },
    // async getDistributorType() {
    //   const distributor_type = await DistributorType.getDistributorType();
    //   // console.log('this is distributor list', distributor_type.data.data);
    // },
    // async getAllConsultantExamSessions() {
    //   const exam_session = await ConsultantExamSession.getAllConsultantExamSessions();
    //   console.log('this is consultant exam session', exam_session);
    // },
  },

  computed: {
    /* -------------------------------------------------------------------------- */
    /*                                   params                                   */
    /* -------------------------------------------------------------------------- */
    candidateRegisterPreferenceParams() {
      return {
        applicationid: this.model.APPLICATION_ID,
        companycode: this.model.DISTRIBUTOR.DIST_CODE,
        companyname: this.model.DISTRIBUTOR.DIST_NAME,
        coursetypeid: this.model.COURSE_TYPE,
        email: this.model.CONSULTANT_EMAIL,
        name: this.model.CONSULTANT_NAME,
        idnumber: this.model.CONSULTANT_NRIC,
        mobile: this.model.CONSULTANT_PHONENO,
        sessionid1: this.model.EXAM_CENTRE_LOCATION[0].sessionid,
        sessionid2: this.model.EXAM_CENTRE_LOCATION[1].sessionid,
        sessionid3: this.model.EXAM_CENTRE_LOCATION[2].sessionid,
      };
    },
    examListPreferenceParams() {
      return {
        token: this.token,
        // coursename: 'CUTE',
        // siteid: 'ASLC',
        // startfrom: '1624147200',
        coursename: this.model.COURSE_TYPE,
        siteid: this.model.EXAM_PREFERRED_SITE.siteid,
        startfrom: this.model.EXAM_PREFERRED_DATE.valueOf(),
      };
    },
    isPreferencesSet() {
      const isState = this.model.EXAM_PREFERRED_STATE;
      const isSite = this.model.EXAM_PREFERRED_SITE;
      const isDate = this.model.EXAM_PREFERRED_DATE;

      console.log("isState: ", !!isState);
      console.log("isSite: ", !!isSite);
      console.log("isDate: ", !!isDate);
      if (!!isState && !!isSite && !!isDate) return true;

      return false;
    },

    filteredExamSites() {
      if (this.model.EXAM_PREFERRED_STATE) {
        const preferredState =
          this.model.EXAM_PREFERRED_STATE.SET_STATE.toLowerCase();
        return this.examSitesAPI.filter((el) =>
          el.state.toLowerCase().match(preferredState)
        );
      }
      return [];
    },
    filteredDistributor() {
      if (this.distributorAPI.length) {
        return this.distributorAPI.filter(
          (el) => el.DIST_NAME && el.distributor_type
        );
      }

      return this.distributorAPI;
    },
    filteredExamSessions() {
      const search = this.search.toLowerCase();
      if (this.search) {
        return this.examSessionsAPI.filter((el) => {
          return Object.keys(el).some((key) =>
            `${el[key]}`.toLowerCase().match(search)
          );
        });
      }

      return this.examSessionsAPI;
    },

    examType() {
      return this.examTypeAPI;
    },
    registrationType() {
      if (this.visibleUTS && this.visiblePRS) {
        return [
          {
            exam_type: "CUTE",
            label: "UNIT TRUST SCHEME CONSULTANT",
            value: 1,
          },
          {
            exam_type: "CPRE",
            label: "PRIVATE RETIREMENT SCHEME CONSULTANT",
            value: 2,
          },
        ];
      } else if (this.visibleUTS) {
        return [
          {
            exam_type: "CUTE",
            label: "UNIT TRUST SCHEME CONSULTANT",
            value: "1",
          },
        ];
      } else if (this.visiblePRS) {
        return [
          {
            exam_type: "CPRE",
            label: "PRIVATE RETIREMENT SCHEME CONSULTANT",
            value: "2",
          },
        ];
      } else {
        return [];
      }
    },
    postcode() {
      if (this.postcodeAPI.length) {
        return this.postcodeAPI;
      }
      return this.postcodeAPI;
    },

    states() {
      if (this.postcodeAPI.length) {
        return this.statesAPI;
        // return [...new Set(this.postcodeAPI.map(el => el.STATE))];
      }
      return this.statesAPI;
    },

    countries() {
      if (this.countriesAPI.length) {
        return this.countriesAPI;
      }
      return [];
    },
  },
};
</script>
