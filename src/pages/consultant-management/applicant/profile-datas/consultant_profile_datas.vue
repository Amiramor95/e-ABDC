<template>
  <div class="content">
    <div v-if="!currentConsultantDataLoaded">
      <b-card>
        <div class="text-center">
          <b-spinner variant="success" label="Spinning"></b-spinner>
          <p>Loading Data</p>
        </div>
      </b-card>
    </div>
    <b-overlay :show="overlay_show" rounded="sm" v-else>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <va-card>
              <vudal name="simpleModal" class="widthModal">
                <div class="header">
                  Error<i class="close icon">&times;</i>
                </div>
                <div class="content">
                  <h5>
                    <vue-form-generator
                      :model="model"
                      :schema="descriptionSchema"
                      :options="formOptions"
                    />
                  </h5>
                </div>
                <div class="actions">
                  <button
                    type="button"
                    class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-times" /> &nbsp; Close
                  </button>
                </div>
              </vudal>
              <!-- color="#FF5050"
                error-color="#a94442" -->
              <h4 style="margin-top:0">Edit Consultant Profile</h4>

              <form-wizard
                title=""
                subtitle=""
                @on-complete="onComplete"
                finish-button-text="Submit"
                ref="wizardForm"
              >
                <!-- section 1 -->
                <tab-content
                  icon="fa fa-user"
                  title="1. Personal Particulars of Applicant"
                  :before-change="beforeTab1Switch"
                >
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema1"
                    :options="formOptions"
                    ref="tabForm1"
                    @model-updated="onModelUpdated"
                  >
                    <!-- @validated="onValidated" -->
                  </vue-form-generator>
                  <personal-education
                    ref="consultantPersonalEducation"
                    :savedConsultantData="currentConsultantData"
                    :savedConsultantEducationData="currentConsultantData.consultant_education"
                    :consultantQualificationDatas="currentConsultantData.educational_qualifications"
                    :consultantCreditSubject="currentConsultantData.credit_subjects"
                    :general_settings="general_settings"
                    :qualification="general_settings.CONSULTANT_QUALIFICATIONS"
                    class="mt-5"
                  ></personal-education>
                  <br />

                  <div class="ml-3"><h5>Correspondent Address</h5></div>
                  <br />

                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="tabForm2"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
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
                      <label style="margin-left: 10px; margin-bottom: 0px" for="sameAddress">
                        Tick if Permanent Address is same as Correspondence Address</label
                      >
                    </div>
                  </div>
                  <br />

                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema3"
                    :options="formOptions"
                    ref="tabForm3"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                </tab-content>

                <!-- section 2 -->
                <tab-content
                  icon="fa fa-info"
                  title="2. Type of Consultant"
                  :before-change="beforeTab2Switch"
                >
                  <profile-consultant-type
                    :general_settings="general_settings"
                    :savedConsultantData="currentConsultantData"
                    :savedConsultantLicenseData="currentConsultantLicenseData">
                  </profile-consultant-type>
                </tab-content>

                <!-- section 3 -->
                <tab-content
                  icon="fa fa-info"
                  title="3. Examination"
                  :before-change="beforeTab3Switch">
                  <div v-if="currentConsultantDataLoaded">
                    <form-examination-consultant
                      ref="refExamination"
                      :savedConsultantExamData="currentConsultantData"
                      :parentDataLoaded="applicationFormDataLoaded"
                      :formDataModel="applicationFormData"
                      @exemptionClicked="onExemptionClicked"
                    ></form-examination-consultant>
                  </div>
                  <!--                  <profile-consultant-examination-->
                  <!--                    :savedConsultantData="currentConsultantData"-->
                  <!--                    :savedConsultantExamData="currentConsultantData.examination">-->
                  <!--                  </profile-consultant-examination>-->
                </tab-content>

                <!-- section 4 -->
                <tab-content
                  icon="fa fa-folder"
                  title="4. Other Document"
                >
                  Other document
                  <profile-other-document ref="profileOtherDocument" :savedConsultantData="currentConsultantData"></profile-other-document>
                </tab-content>

                <template slot="footer"
                  slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }">
                  <div class="float-left">
                    <button
                      v-if="activeTabIndex > 0"
                      @click="prevTab"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                  <div class="float-right">
                    <button
                      v-if="!isLastStep"
                      @click="nextTab"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Next &nbsp; <i class="fa fa-step-forward" />
                    </button>
                    <button
                      :disabled="model.DIST_PUBLISH_STATUS"
                      @click="onSubmitDraft"
                      type="button"
                      v-if="!isConsultantProfileInProgress || submitTrue"
                      class="btn btn-info btn-fill btn-md ml-2"
                    >
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      @click="onSubmitData"
                      v-if="!isConsultantProfileInProgress || submitTrue"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp;Submit
                    </button>
                  </div>
                </template>
              </form-wizard>
            </va-card>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import * as services02module2 from '../../../../app/module2/services02'
import RepositoryFactory from '../../../../repositories/RepositoryFactory'

import ProfileConsultantType from './consultant_profile_consultant_type'
// import ProfileConsultantExamination from './consultant_profile_examination'
import ProfileOtherDocument from './consultant_profile_other_document'
import * as GeneralSettingsAPI from '../../../../modules/consultant-management/services/general'
import moment from 'moment'
import * as consultantProfileServices from '../../../../app/module2/consultant-profile/consultantProfileServices'
import PersonalEducation from '../../../../modules/consultant-management/components/applications/personal-particulars/consultant_education'
import InputOTP from '../../../../modules/consultant-management/components/inputs/input_otp'
import InputEmailOTP from '../../../../modules/consultant-management/components/inputs/input_email_otp'
import FormExaminationConsultant from '../../../../modules/consultant-management/components/applications/form_examination_consultant'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.use(VueFormWizard)
Vue.component(Vudal)
// register globally
Vue.component('multiselect', Multiselect)

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const DistributorRecords = RepositoryFactory.get('distributorrecords')
const DistributorType = RepositoryFactory.get('distributortype')

Vue.component('field-cm-input-otp', InputOTP)
Vue.component('field-cm-input-email-otp', InputEmailOTP)

export default {

  components: {
    ProfileConsultantType,
    FormExaminationConsultant,
    // ProfileConsultantExamination,
    ProfileOtherDocument,
    PersonalEducation,
    Vudal,
  },
  props: {
    value: File,
    // parameters the component accepts
    general_settings: Object,
    applicant_details: Object,
    currentConsultantData: Object,
    citizenship: {
      type: Array,
    },
    gender: {
      type: Array,
    },
    race: {
      type: Array,
    },
    qualification: {
      type: Array,
    },
    currentConsultantLicenseData: Object,
    consultant_exemption_data: Boolean,
    staffpositions: {
      type: Array,
    },
  },

  watch: {
    'model.CONSULTANT_NRIC': function (val) {
      console.log('dob :' + this.model.CONSULTANT_DOB)
      if (val.substr(11, 1) != '') {
        console.log('last character :' + val.substr(11, 1))
        var Year = val.substring(0, 2)
        var Month = val.substring(2, 4)
        var Day = val.substring(4, 6)

        var cutoff = new Date().getFullYear() - 2000
        console.log('year :' + cutoff)

        var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day
        this.model.CONSULTANT_DOB = dob
        console.log('dob :' + dob)
        console.log((Year > cutoff ? '19' : '20') + Year)
        const yearBirth = (Year > cutoff ? '19' : '20') + Year
        if (parseInt(yearBirth) <= 1970) {
          console.log('1970 and below')
          // this.visibleOldIc = true;
        } else {
          console.log('above')
          // this.visibleOldIc = false;
        }
        // if (parseInt(val.substr(11, 1)) % 2 == 0) {
        //   console.log('The number is even. Female');
        //   this.model.CONSULTANT_GENDER = '2';
        // } else {
        //   console.log('The number is odd. Male');
        //   this.model.CONSULTANT_GENDER = '1';
        // }
      }
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  startdata                                 */
  /* -------------------------------------------------------------------------- */
  data () {
    return {
      applicationFormData: {},
      applicationFormDataLoaded: false,
      // examSchema: true,
      currentConsultantDataLoaded: false,
      visibleUploadVerificationDocuments: false,
      // visibleUploadVerificationDocuments: false,
      isConsultantProfileInProgress: true,
      submitTrue: true,
      overlay_show: false,
      isDraft: false,
      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION1                            */
      /* -------------------------------------------------------------------------- */
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      visibleOtherRace: false,
      visibleMobileNumberTac: false,
      visibleEmailTac: false,
      visibleOtherLanguage: false,

      visibleEducation: {
        SPM: false,
        SPMV: false,
        STPM: false,
        DIPLOMA: false,
        DEGREE: false,
        PROFESSIONAL: false,
        visibleOtherLanguage: false,
        PROFESSIONAL_CFP: false,
        PROFESSIONAL_IFP: false,
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

      //* ***************************************** */
      // section 1
      countriesAPI: [],
      math: [
        { name: 'YES', value: '1' },
        { name: 'NO', value: '2' },
      ],
      subject: [
        { name: 'CREDIT IN SEJARAH', value: '1' },
        { name: 'CREDIT IN PENDIDIKAN ISLAM', value: '2' },
      ],
      language: [
        { name: 'MALAY', value: '1' },
        { name: 'CHINESE', value: '2' },
        { name: 'ENGLISH', value: '3' },
        { name: 'OTHERS', value: '4' },
      ],
      certificate: [
        { name: 'CERTIFIED FINANCIAL PLANNER (CFP)', value: '1' },
        { name: 'ISLAMIC FINANCIAL PLANNER (IFP)', value: '2' },
        { name: 'REGISTERED FINANCIAL PLANNER (RFP)', value: '3' },
        { name: 'SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)', value: '4' },
      ],
      country: [{ name: 'MALAYSIA', id: '1', selected: true }],
      postcodeAPI: [],
      statesAPI: [],
      cityAPI: [],
      permanentCityAPI: [],
      raceAPI: [],
      copyCorrespondence: false,

      // exam
      examType: [],
      currentPageSelected: 1,
      perPageSelected: 5,
      filterSelected: null,
      fieldSelectedExam: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'examDate', label: 'Exam Date' },
        { key: 'sessionTime', label: 'Session Time' },
        { key: 'day', label: 'Day' },
        { key: 'centreName', label: 'Centre Name' },
        { key: 'centreLocation', label: 'Centre Location' },
        { key: 'availableSit', label: 'Available Sit' },
        // { key: 'actions', label: 'Action' },
      ],
      selectedExamList: [],
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'sessionYear',
                label: 'Session Year',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'sessionTime',
                label: 'Session Time',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Start Date',
                model: 'date',
                format: 'DD-MM-YYYY',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'End Date',
                model: 'date',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "centreLoc",
              //   label: "Centre Location",
              //   styleClasses: "col-md-6"
              // },
              {
                type: 'select',
                model: 'centreLoc',
                label: 'Center Location',
                values: (model, schema) => {
                  return this.centreLocation
                },
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
      // search
      sessionYear: '',
      examDate: '',
      sessionTime: '',
      day: '',
      centreLoc: '',
      APPLICATION_ID: '',

      currentPage: 1,
      perPage: 5,
      filter: null,
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'examDate', label: 'Exam Date' },
        { key: 'sessionTime', label: 'Session Time' },
        { key: 'day', label: 'Day' },
        { key: 'centreName', label: 'Centre Name' },
        { key: 'centreLocation', label: 'Centre Location' },
        { key: 'availableSit', label: 'Available Sit' },
        { key: 'actions', label: 'Action' },
      ],
      applicationType: [
        {
          name: 'I want to be both UTS and PRS Consultant [General + UTS + PRS]',
          value: '1',
        },
        {
          name: 'I want to be UTS Consultant only [General + UTS]',
          value: '2',
        },
        {
          name: 'I want to be PRS Consultant only [General + PRS]',
          value: '3',
        },
        {
          name: 'I am qualified* for exemption [Exemption]',
          value: '4',
        },
        // { name: "CUTA", value: "3" }
      ],

      insuranceAgentCertificates: [
        { label: 'Certificate Examination in Investment-Link Life Insurance (CEILLI)' },
        { label: 'Takaful Business Examination (TBE) (for completion before 2012)' },
        {
          label:
            'Takaful Business Examination (TBE) – Part A and Part C (2 certificates (for completion after 2012)',
        },
        { label: 'Certificate from Malaysian Takaful Association (MTA) – General & Family' },
      ],
      model: {

        CONSULTANT_NAME: '',
        CONSULTANT_CITIZEN: '',
        CONSULTANT_NRIC: '',
        CONSULTANT_NRIC_OLD: '',
        CONSULTANT_PASSPORT_NO: '',
        CONSULTANT_PASSPORT_EXPIRY_NO: '',
        CONSULTANT_NRIC_PHOTO_FRONT: [],
        CONSULTANT_NRIC_PHOTO_BACK: [],
        CONSULTANT_PASSPORT_PHOTO: [],
        CONSULTANT_GENDER: '',
        CONSULTANT_DOB: '',
        CONSULTANT_RACE: '',
        CONSULTANT_OTHER_RACE: '',
        CONSULTANT_MOBILE_NO: '',
        PHONE: '',
        PHONE_TAC: '',
        EMAIL_TAC: '',
        CONSULTANT_HOUSE_NO: '',
        CONSULTANT_EMAIL: '',

        CONSULTANT_PROFILE_PHOTO: [],
        CONSULTANT_HIGHEST_QUALIFICATION: '',

        MATH: '',
        OTHER_SUBJECT: '',
        LANGUAGE: '',
        OTHER_LANGUAGE: '',
        SPM_DOCS: '',
        STPM_DOCS: '',
        DIPLOMA_DOCS: '',
        DEGREE_DOCS: '',
        DEGREE_MAJOR: '',
        DEGREE_MINOR: '',
        PROFESSIONAL_CERTIFICATE: '',
        PROFESSIONAL_CFP_DOCS: '',
        // correspondence
        CONSULTANT_CORRESPONDENT_COUNTRY: '',
        CONSULTANT_CORRESPONDENT_STATE: '',
        CONSULTANT_CORRESPONDENT_CITY: '',
        CONSULTANT_CORRESPONDENT_POSTAL: '',
        CONSULTANT_CORRESPONDENT_ADDR1: '',
        CONSULTANT_CORRESPONDENT_ADDR2: '',
        CONSULTANT_CORRESPONDENT_ADDR3: '',
        // permanent
        CONSULTANT_PERMANENT_COUNTRY: '',
        CONSULTANT_PERMANENT_STATE: '',
        CONSULTANT_PERMANENT_CITY: '',
        CONSULTANT_PERMANENT_POSTAL: '',
        CONSULTANT_PERMANENT_ADDR1: '',
        CONSULTANT_PERMANENT_ADDR2: '',
        CONSULTANT_PERMANENT_ADDR3: '',

        BANKRUPTCY_STATUS: '',
        CREATE_BY: (JSON.parse(localStorage.getItem('user_id'))),
        DRAFT: 0,
        DESCRIPTION: '',
        CONSULTANT_EDUCATION_PROPS: '',

      },
      // Section 1
      tabSchema1: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'Application ID',
              //   model: 'APPLICATION_ID',
              //   placeholder: 'Enter Application ID',
              //   required: true,
              //   validator: 'string',
              //   styleClasses: 'col-md-12 text-uppercase',
              //   // cleaveOptions:
              //   // uppercase: true,
              //   // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              // },
              {
                type: 'input',
                inputType: 'text',
                label: 'Applicant Name',
                model: 'CONSULTANT_NAME',
                placeholder: 'Enter your name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
                // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              },
              {
                // accept: ".jpeg,.png",
                labels: 'Profile Photo',
                theme: 'grid',
                multiple: false,
                text: 'Upload passport size photo',
                model: 'CONSULTANT_PROFILE_PHOTO',
                type: 'vfg-consultant-custom-profile-photo',
                styleClasses: 'col-md-12',
                required: true,
                hint: 'Accepted format : (.jpeg,.png)',
              },
              {
                type: 'radios',
                label: 'Citizenship',
                model: 'CONSULTANT_CITIZEN',
                required: true,
                radiosOptions: {
                  value: 'SETTING_GENERAL_ID',
                  name: 'SET_PARAM',
                },
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-4 display-inline text-uppercase',
              },
              {
                disabled: true,
                type: 'vfg-the-mask',
                labels: 'New NRIC Number',
                model: 'CONSULTANT_NRIC',
                placeholder: 'Enter NRIC Number',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                required: true,
              },
              {
                disabled: true,
                type: 'input',
                inputType: 'text',
                label: 'Old NRIC Number',
                model: 'CONSULTANT_NRIC_OLD',
                placeholder: 'Enter old NRIC number',
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Passport Number',
                model: 'CONSULTANT_PASSPORT_NO',
                placeholder: 'Enter Passport Number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                labels: 'Passport Expiry Date',
                type: 'vfg-functional-date2',
                placeholder: 'Passport expiry date',
                model: 'CONSULTANT_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                required: true,
              },

              {
                labels: 'Upload NRIC Photo (FRONT)',
                theme: 'list',
                multiple: false,
                text: 'Choose a File',
                model: 'CONSULTANT_NRIC_PHOTO',
                type: 'vfg-custom-nric',
                styleClasses: 'col-md-6',
                hint: 'Accepted format : (.jpeg,.png,.pdf)',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                required: true,
              },
              {
                labels: 'Upload NRIC Photo (Back)',
                theme: 'list',
                multiple: false,
                text: 'Choose a File',
                model: 'CONSULTANT_NRIC_PHOTO_BACK',
                type: 'vfg-custom-nric',
                styleClasses: 'col-md-6',
                hint: 'Accepted format : (.jpeg,.png,.pdf)',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                required: true,
              },

              {
                labels: 'Upload Passport Photo',
                theme: 'list',
                multiple: false,
                type: 'vfg-custom-nric',
                hint: 'Accepted format : (.jpeg,.png,.pdf)',
                model: 'CONSULTANT_PASSPORT_PHOTO',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                required: true,
              },
              {
                disabled: true,
                type: 'radios',
                label: 'Gender',
                model: 'CONSULTANT_GENDER',
                required: true,
                radiosOptions: {
                  value: 'SETTING_GENERAL_ID',
                  name: 'SET_PARAM',
                },
                values: () => {
                  return this.gender
                },
                styleClasses: 'col-md-4 display-inline',
              },
              {
                disabled: true,
                type: 'input',
                inputType: 'date',
                label: 'Date of Birth',
                model: 'CONSULTANT_DOB',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase',
              },
              {
                disabled: true,
                type: 'vueMultiSelect',
                model: 'CONSULTANT_RACE',
                label: 'Race',
                placeholder: 'Enter race',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  value: 'SETTING_GENERAL_ID',
                  name: 'SET_PARAM',
                  key: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  console.log(this.race)
                  return this.race
                },
              },
              {
                styleClasses: 'col-md-4',
              },
              {
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other Race',
                model: 'CONSULTANT_OTHER_RACE',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleOtherRace
                },
              },
              {
                labels: 'Mobile Phone Number',
                model: 'CONSULTANT_MOBILE_NO',
                type: 'vfg-the-mask',
                placeholder: 'Enter telephone number',
                mask: '0#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
              },
              {
                labels: 'Request Mobile TAC',
                model: 'PHONE_TAC',
                type: 'cm-input-otp',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleMobileNumberTac
                },
              },
              {
                labels: 'House Phone Number',
                model: 'CONSULTANT_HOUSE_NO',
                type: 'vfg-the-mask',
                placeholder: 'Enter house number',
                mask: '0#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                model: 'CONSULTANT_EMAIL',
                placeholder: 'Enter email address',
                required: true,
                validator: 'email',
                styleClasses: 'col-md-6',
              },
              {
                labels: 'Request Email OTP',
                model: 'EMAIL_TAC',
                type: 'cm-input-email-otp',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleEmailTac
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'BANKRUPTCY_STATUS',
                label: 'Bankruptcy Status',
                styleClasses: 'col-md-6',
                readonly: true,
              },
            ],
          },
        ],
      },
      // form 1- address correspondent
      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_CORRESPONDENT_COUNTRY',
                label: 'Country',
                placeholder: 'Enter origin country',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  value: 'SETTING_GENERAL_ID',
                  key: 'SET_PARAM',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.countriesAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_CORRESPONDENT_STATE',
                label: 'State',
                placeholder: 'Enter state',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'SET_PARAM',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.statesAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_CORRESPONDENT_CITY',
                label: 'City',
                placeholder: 'Enter City',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
                selectOptions: {
                  multiple: false,
                  key: 'SET_CITY_NAME',
                  label: 'SET_CITY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.cityAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_CORRESPONDENT_POSTAL',
                label: 'Postcode',
                placeholder: 'Enter postcode',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  key: 'POSTCODE_NO',
                  label: 'POSTCODE_NO',
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcodeAPI
                },
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'CONSULTANT_CORRESPONDENT_ADDR1',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'CONSULTANT_CORRESPONDENT_ADDR2',
                placeholder: 'Enter street address',
                hint: 'Street address line 2',
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'CONSULTANT_CORRESPONDENT_ADDR3',
                placeholder: 'Enter street address',
                hint: 'Street address line 3',
                styleClasses: 'col-md-12 text-uppercase',
              },
            ],
          },
        ],
      },
      // form 1 - permanent address
      tabSchema3: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_PERMANENT_COUNTRY',
                label: 'Country',
                placeholder: 'Enter origin country',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  value: 'SETTING_GENERAL_ID',
                  key: 'SET_PARAM',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.countriesAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_PERMANENT_STATE',
                label: 'State',
                placeholder: 'Enter state',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'SET_PARAM',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.statesAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_PERMANENT_CITY',
                label: 'City',
                placeholder: 'Enter City',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
                selectOptions: {
                  multiple: false,
                  key: 'SET_CITY_NAME',
                  label: 'SET_CITY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.permanentCityAPI
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_PERMANENT_POSTAL',
                label: 'Postcode',
                placeholder: 'Enter postcode',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  key: 'POSTCODE_NO',
                  label: 'POSTCODE_NO',
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcodeAPI
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'CONSULTANT_PERMANENT_ADDR1',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'CONSULTANT_PERMANENT_ADDR2',
                placeholder: 'Enter street address',
                hint: 'Street address line 2',
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'CONSULTANT_PERMANENT_ADDR3',
                placeholder: 'Enter street address',
                hint: 'Street address line 3',
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                labels: 'Upload Supported Document for Verification of (New Address or Name or Nationality)',
                model: 'REVIEW_DOCS',
                accept: '.pdf',
                type: 'vfg-custom-multiple-file-general',
                styleClasses: 'col-md-12',
                hint: 'Accepted format : (.pdf)',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleUploadVerificationDocuments
                },
              },
            ],
          },
        ],
      },

      currentRowClicked: '',

      examSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'EXAM_STATE',
                label: 'State',
                placeholder: 'Enter state',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_STATE',
                  value: 'SETTING_GENERAL_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.statesAPI
                },
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "centerExam",
              //   label: "Exam Center",
              //   placeholder: "Enter Exam Center",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "siteid",
              //     label: "sitename",
              //     searchable: false,
              //   },
              //   values: (model, schema) => {
              //     return this.centerExam;
              //   },
              //   // visible: (model, field, form) => {
              //   //   return this.showExamDate
              //   // },
              // },
              {
                labels: 'Preferred Exam Date',
                type: 'vfg-functional-date',
                inputType: 'date',
                placeholder: 'Preferred exam date',
                model: 'EXAM_PREFERRED_DATE',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                // visible: (model, field, form) => {
                //   return this.showtable
                // },
              },
            ],
          },
        ],
      },

      exemptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'EXEMPTION_MODEL.EXEMPTION_CATEGORY',
                label: 'Exemption Category',
                placeholder: 'Select a category',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  value: 'value',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.exemptionCategory
                },
                visible: (model, field, form) => {
                  return this.visibleExemptionQualified
                },
              },
              {
                styleClasses: 'col-md-6',

                visible: (model, field, form) => {
                  return this.visibleExemptionQualified
                },
              },
              {
                labels: '1. Appointment approval by the SC/relevant authority for appointment',
                text: 'Choose a File',
                model: 'EXEMPTION_MODEL.STAFF_CEO_DOCS',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_CEO
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Years of Experience in Unit Trust/Fund Management Industry',
                model: 'EXEMPTION_MODEL.STAFF_DIRECTOR_EXPERIENCE_YEARS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_DIRECTOR
                },
              },
              {
                styleClasses: 'col-md-8',
              },
              {
                labels: '1. Resume or Curriculum Vitae',
                text: 'Choose a File',
                model: 'EXEMPTION_MODEL.STAFF_DIRECTOR_DOCS',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.STAFF_DIRECTOR
                },
              },

              {
                labels: 'Upload CMSRL',
                text: 'Choose a File',
                model: 'EXEMPTION_MODEL.FUND_MANAGER_DOCS',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'CMSRL No',
                model: 'EXEMPTION_MODEL.FUND_MANAGER_CMSRL_NO',
                placeholder: 'Enter CMRSL Number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER
                },
              },

              {
                type: 'input',
                inputType: 'date',
                label: 'CMSRL Expiry Date',
                model: 'EXEMPTION_MODEL.FUND_MANAGER_CMSRL_EXPIRY',
                placeholder: 'Enter CMSRL expiry date',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visibleExemption.FUND_MANAGER
                },
              },
              {
                label: 'Active Membership of the Association/Organisation',
                text: 'Choose a File',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_ACTIVE_DOCS',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'label',
                label: 'a) FPAM -CFP/IFP/Both',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Module 1 Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_FPAM_MODULE1_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Module 3 Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_FPAM_MODULE3_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'ii) CFP/IFP -Certified Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_FPAM_CFP_IFP_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'label',
                label: 'b) MFPC',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'label',
                label: 'i) RFP/Shariah RFP - Partial Completion',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Module 1 Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_MFPC_MODULE1_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Module 3 Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_MFPC_MODULE3_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Module 6 Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_MFPC_MODULE6_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'ii) RFP/Shairah RFP - Certified Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_MFPC_CERTIFIED_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'label',
                label: 'c) MFPAA',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Completion Date',
                model: 'EXEMPTION_MODEL.FINANCIAL_PLANNER_MFPAA_COMPLETION_DATE',
                placeholder: 'Enter date of birth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER
                },
              },

              {
                label: 'PRSFP Certificate of Attendance',
                text: 'Choose a File',
                model: 'EXEMPTION_MODEL.UNIT_TRUST_PRSFP_ATTENDANCE_CERT',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleExemption.UNIT_TRUST
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'EXEMPTION_MODEL.INSURANCE_AGENT_CERT',
                label: 'List of Insurance Certificate',
                // placeholder: 'Select a category',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  // key: 'id',
                  label: 'label',
                  value: 'label',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.insuranceAgentCertificates
                },

                visible: (model, field, form) => {
                  return this.visibleExemption.INSURANCE_AGENT
                },
              },
              // {
              //   type: 'input',
              //   inputType: 'checkbox',
              //   model: 'EXEMPTION_MODEL.DECLARATION_OF_CERT',
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
            styleClasses: 'row',
            fields: [
              {
                labels: 'Other Document',
                text: 'Choose a File',
                model: 'supportedFile',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
      descriptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                model: 'DESCRIPTION',
                rows: 5,
                validator: 'string',
                styleClasses: 'col-md-12',
                readonly: true,
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },

  async mounted () {
    // this.$refs.wizardForm.activeAll()
    // this.allTabsActive()
    await this.getAllCountries()
    await this.getAllRaces()
    this.copyCorrespondence = (this.currentConsultantData.SELECTED_SAME_ADDRESS === 1)
    this.isConsultantProfileUpdateInProcess()
    this.getVerifyDocuments()
    this.loadConsultantEducationModel()
    this.getProfilePhoto()
    this.getNricBackDoc()
    this.getPassportPhoto()

    if (this.model.CONSULTANT_CITIZEN === 286) {
      this.visiblePassport = false
      this.visibleIc = true
    } else {
      this.visiblePassport = true
      this.visibleIc = false
    }
  },

  created () {
    if (this.currentConsultantData) {
      this.model = _.cloneDeep(this.currentConsultantData)
      this.model.REVIEW_DOCS = []
      this.model.DESCRIPTION = ''
      this.model.CONSULTANT_NRIC_PHOTO_FRONT = []
      this.model.CONSULTANT_NRIC_PHOTO_BACK = []
      this.model.CONSULTANT_PASSPORT_PHOTO = []
      this.model.PHONE = this.model.CONSULTANT_MOBILE_NO ? this.model.CONSULTANT_MOBILE_NO.toString() : ''
      this.getNricFrontDoc()
      // this.getPassportPhoto()
    }

    if (this.currentConsultantLicenseData) {
      this.model2 = _.cloneDeep(this.currentConsultantLicenseData)
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    // APIs
    getApplicationForm: async function (data) {
      try {
        const response = await services02module2.getConsultantByID(data)
        if (response) {
          this.applicationFormData = response
          this.applicationFormDataLoaded = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    onExemptionClicked (value) { // Event Clicked Function from Child Component
      if (value == true) {
        this.consultant_exemption_data = true
      } else {
        this.consultant_exemption_data = false
      }
    },
    async loadConsultantEducationModel () {
      this.model.CONSULTANT_EDUCATION_PROPS = {
        ref: 'personalEducation',
        savedConsultantData: this.currentConsultantData,
        savedConsultantEducationData: this.currentConsultantData.consultant_education,
        consultantQualificationDatas: this.currentConsultantData.educational_qualifications,
        consultantCreditSubject: this.currentConsultantData.credit_subjects,
        // personal_particulars :"personal_particulars"
        general_settings: this.general_settings,
        qualification: this.general_settings.CONSULTANT_QUALIFICATIONS,
      }
    },
    async isConsultantProfileUpdateInProcess () {
      this.isConsultantProfileInProgress = await consultantProfileServices.isConsultantProfileUpdateInProgress(
        { CONSULTANT_ID: this.currentConsultantData.CONSULTANT_ID },
      )
    },
    async getVerifyDocuments () {
      if (this.currentConsultantData.CONSULTANT_PROFILE_ID) {
        const response = await consultantProfileServices.getVerifyDocsByConsultantId({
          CONSULTANT_PROFILE_ID: this.currentConsultantData.CONSULTANT_PROFILE_ID,
        })
        // alert(JSON.stringify(response));
        response.forEach(element => {
          element.DOC_BLOB = consultantProfileServices.b64toBlobPDF(
            element.DOC_BLOB,
            'application/pdf',
          )
          element.DOC_BLOB = new File(
            [element.DOC_BLOB],
            element.DOC_ORIGINAL_NAME,
            { type: element.DOC_BLOB.type },
          )
          const data = {
            docID: element.CA_DOCUMENT_ID,
            name: element.DOC_ORIGINAL_NAME,
            size: element.DOC_FILESIZE,
            type: element.DOC_FILETYPE,
            ext: 'exe',
            url: window.URL.createObjectURL(element.DOC_BLOB),
          }

          // this.model.REVIEW_DOCS = []
          this.model.REVIEW_DOCS.push(data)
        })
      }
    },
    viewDescription (description) {
      this.model.DESCRIPTION = description
      this.$modals.simpleModal.$show()
    },
    goToViewProfilePage () {
      // this.$router.push({ path: 'consultant-profile-Consultant' });
      this.$router.push({ path: 'applicant-profile' })
    },
    allTabsActive () {
      this.$refs.wizardForm.activeAll()
    },
    copyCorrespondenceToPermanent () {
      const varName = ['COUNTRY', 'STATE', 'CITY', 'POSTAL', 'ADDR1', 'ADDR2', 'ADDR3']

      if (this.copyCorrespondence) {
        varName.forEach(el => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = this.model[`CONSULTANT_CORRESPONDENT_${el}`]
        })
      } else {
        varName.forEach(el => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = ''
        })
      }
    },
    beforeTab1Switch () {
      // console.log(this.model);
      return true
    },
    beforeTab2Switch () {
      return true
    },
    beforeTab3Switch () {
      return true
    },

    onComplete () {
      alert(JSON.stringify(this.model))
    },

    async onSubmitData () {
      if (this.visibleMobileNumberTac && !this.model.PHONE_TAC) {
        alert('Phone tac required')
        return
      }
      if (this.model.CONSULTANT_PROFILE_PHOTO === null) {
        alert('Please upload consultant profile photo')
        return
      }
      if (this.model.CONSULTANT_HOUSE_NO === null) {
        alert('Please insert consultant house no')
        return
      }
      if (this.model.CONSULTANT_CITIZEN === 286) {
        if (!this.model.CONSULTANT_NRIC_PHOTO.length) {
          alert('Please upload consultant nric photo front')
          return
        }
        if (!this.model.CONSULTANT_NRIC_PHOTO_BACK.length) {
          alert('Please upload consultant nric photo back')
          return
        }
      }
      if (this.model.CONSULTANT_CITIZEN === 287) {
        if (!this.model.CONSULTANT_PASSPORT_PHOTO.length) {
          alert('Please upload consultant passport photo')
          return
        }
        if (this.model.CONSULTANT_PASSPORT_NO === '""') {
          alert('Please fill consultant passport no')
          return
        }
        if (this.model.CONSULTANT_PASSPORT_EXPIRY_NO === null) {
          alert('Please fill consultant expirty no')
          return
        }
      }
      if (this.visibleUploadVerificationDocuments && (!this.model.REVIEW_DOCS.length)) {
        alert('Please Upload Verification Documents for New Data')
      } else {
        // console.log(this.appendData('SUBMIT'))
        try {
          this.overlay_show = true
          await services02module2.consultantProfileUpdate(this.appendData('SUBMIT'))
            .then((response) => {
              this.overlay_show = false
              this.isConsultantProfileInProgress = true
              this.submitTrue = false
              // console.log('Update Profile', response);
            })
          // await this.isConsultantProfileUpdateInProcess()
        } catch (error) {
          // this.overlay_show = false
          console.log(error)
        }
      }
    },
    async onSubmitDraft () {
      if (this.model.CONSULTANT_PROFILE_PHOTO === null) {
        alert('Please upload consultant profile photo')
        return
      }
      if (this.model.CONSULTANT_HOUSE_NO === null) {
        alert('Please insert consultant house no')
        return
      }
      if (this.model.CONSULTANT_CITIZEN === 286) {
        if (!this.model.CONSULTANT_NRIC_PHOTO.length) {
          alert('Please upload consultant nric photo front')
          return
        }
        if (!this.model.CONSULTANT_NRIC_PHOTO_BACK.length) {
          alert('Please upload consultant nric photo back')
          return
        }
      }
      if (this.model.CONSULTANT_CITIZEN === 287) {
        if (!this.model.CONSULTANT_PASSPORT_PHOTO.length) {
          alert('Please upload consultant passport photo')
          return
        }
        if (this.model.CONSULTANT_PASSPORT_NO === '""') {
          alert('Please fill consultant passport no')
          return
        }
        if (this.model.CONSULTANT_PASSPORT_EXPIRY_NO === null) {
          alert('Please fill consultant expirty no')
          return
        }
      }
      if (this.visibleUploadVerificationDocuments && (!this.model.REVIEW_DOCS.length)) {
        alert('Please Upload Verification Documents for New Data')
      } else {
        try {
          this.overlay_show = true
          const data = this.appendData('DRAFT')
          data.append('DRAFT', 1)
          await services02module2.consultantProfileUpdate(data)
            .then((response) => {
              this.overlay_show = false
              // this.findConsultantByUserId()
              // this.$refs.consultantPersonalEducation.refreshAll()
              // setTimeout(() => {
              //   this.$router.push({ path: 'applicant-profile' })
              // }, 2000)
            })
        } catch (error) {
          console.log(error)
        }
      }
    },
    getProfilePhoto: async function () {
      let response = ''
      console.log(this.currentConsultantData)
      if (this.currentConsultantData.CONSULTANT_PROFILE_ID) { // if draft
        response = await consultantProfileServices.getDraftedDocsByConsultantIdAndTableName(
          {
            CONSULTANT_PROFILE_ID: this.currentConsultantData.CONSULTANT_PROFILE_ID,
            TABLE_NAME: 'CONSULTANT_PROFILE_PHOTO',
          })
        if (!response.length) {
          response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_PROFILE_PHOTO')
        }
      } else {
        response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_PROFILE_PHOTO')
      }
      response.forEach(el => {
        if (el.DOC_MIMETYPE == 'image/jpeg') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/jpeg')
        } else if (el.DOC_MIMETYPE == 'image/png') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/png')
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          ID: el.ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.CONSULTANT_PROFILE_PHOTO = []
        this.model.CONSULTANT_PROFILE_PHOTO.push(data)
      })
    },

    getNricFrontDoc: async function () {
      let response = ''
      if (this.currentConsultantData.CONSULTANT_PROFILE_ID) { // if draft
        response = await consultantProfileServices.getDraftedDocsByConsultantIdAndTableName(
          {
            CONSULTANT_PROFILE_ID: this.currentConsultantData.CONSULTANT_PROFILE_ID,
            TABLE_NAME: 'CONSULTANT_NRIC_PHOTO_FRONT',
          })
        if (!response.length) {
          response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_FRONT')
        }
      } else {
        response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_FRONT')
      }
      response.forEach(el => {
        if (el.DOC_MIMETYPE == 'image/jpeg') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/jpeg')
        } else if (el.DOC_MIMETYPE == 'image/png') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/png')
        } else if (el.DOC_MIMETYPE == 'application/pdf') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        } else {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          ID: el.ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.CONSULTANT_NRIC_PHOTO = []
        this.model.CONSULTANT_NRIC_PHOTO.push(data)
      })
    },

    getPassportPhoto: async function () {
      let response = ''
      if (this.currentConsultantData.CONSULTANT_PROFILE_ID) { // if draft
        response = await consultantProfileServices.getDraftedDocsByConsultantIdAndTableName(
          {
            CONSULTANT_PROFILE_ID: this.currentConsultantData.CONSULTANT_PROFILE_ID,
            TABLE_NAME: 'CONSULTANT_PASSPORT_PHOTO',
          })
        if (!response.length) {
          response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_PASSPORT_PHOTO')
        }
      } else {
        response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_PASSPORT_PHOTO')
      }
      response.forEach(el => {
        if (el.DOC_MIMETYPE == 'image/jpeg') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/jpeg')
        } else if (el.DOC_MIMETYPE == 'image/png') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/png')
        } else if (el.DOC_MIMETYPE == 'application/pdf') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        } else {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          ID: el.ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.CONSULTANT_PASSPORT_PHOTO = []
        this.model.CONSULTANT_PASSPORT_PHOTO.push(data)
      })
    },

    getNricBackDoc: async function () {
      let response = ''
      if (this.currentConsultantData.CONSULTANT_PROFILE_ID) { // if draft
        response = await consultantProfileServices.getDraftedDocsByConsultantIdAndTableName(
          {
            CONSULTANT_PROFILE_ID: this.currentConsultantData.CONSULTANT_PROFILE_ID,
            TABLE_NAME: 'CONSULTANT_NRIC_PHOTO_BACK',
          })
        if (!response.length) {
          response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_BACK')
        }
      } else {
        response = await services02module2.getConsultantDocuments(this.currentConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_BACK')
      }
      response.forEach(el => {
        if (el.DOC_MIMETYPE == 'image/jpeg') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/jpeg')
        } else if (el.DOC_MIMETYPE == 'image/png') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/png')
        } else if (el.DOC_MIMETYPE == 'application/pdf') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        } else {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          ID: el.ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }
        this.model.CONSULTANT_NRIC_PHOTO_BACK = []
        this.model.CONSULTANT_NRIC_PHOTO_BACK.push(data)
      })
    },
    findConsultantByUserId (userId) {
      // services02module2.findConsultantByUserIdForProfileUpdateApproval(userId).then((response) => {
      //   this.currentConsultantData = response
      //   this.getPassportPhoto()
      //   this.getNricFrontDoc()
      //   this.getNricBackDoc()
      //   this.getProfilePhoto()
      // })
    },

    appendData (TYPE) {
      const formData = new FormData()
      if (this.visibleMobileNumberTac) {
        formData.append('PHONE_TAC', JSON.parse(this.model.PHONE_TAC))
      }
      if (this.visibleEmailTac) {
        formData.append('EMAIL_TAC', JSON.parse(this.model.EMAIL_TAC))
      }
      formData.append('CONSULTANT_NAME', this.model.CONSULTANT_NAME)
      formData.append('CONSULTANT_CORRESPONDENT_POSTAL', this.model.CONSULTANT_CORRESPONDENT_POSTAL.SETTING_POSTCODE_ID)
      formData.append('CONSULTANT_CORRESPONDENT_CITY', this.model.CONSULTANT_CORRESPONDENT_CITY.SETTING_CITY_ID)
      formData.append('CONSULTANT_CORRESPONDENT_STATE', this.model.CONSULTANT_CORRESPONDENT_STATE.SETTING_GENERAL_ID)
      formData.append('CONSULTANT_CORRESPONDENT_COUNTRY', this.model.CONSULTANT_CORRESPONDENT_COUNTRY.SETTING_GENERAL_ID)
      formData.append('CONSULTANT_CORRESPONDENT_COUNTRY', this.model.CONSULTANT_CORRESPONDENT_COUNTRY.SETTING_GENERAL_ID)
      formData.append('CONSULTANT_CORRESPONDENT_ADDR1', this.model.CONSULTANT_CORRESPONDENT_ADDR1)
      formData.append('CONSULTANT_CORRESPONDENT_ADDR2', this.model.CONSULTANT_CORRESPONDENT_ADDR2)
      formData.append('CONSULTANT_CORRESPONDENT_ADDR3', this.model.CONSULTANT_CORRESPONDENT_ADDR3)

      formData.append('CONSULTANT_PERMANENT_ADDR1', this.model.CONSULTANT_PERMANENT_ADDR1)
      formData.append('CONSULTANT_PERMANENT_ADDR2', this.model.CONSULTANT_PERMANENT_ADDR2)
      formData.append('CONSULTANT_PERMANENT_ADDR3', this.model.CONSULTANT_PERMANENT_ADDR3)
      formData.append('CONSULTANT_PERMANENT_POSTAL', this.model.CONSULTANT_PERMANENT_POSTAL.SETTING_POSTCODE_ID)
      formData.append('CONSULTANT_PERMANENT_CITY', this.model.CONSULTANT_PERMANENT_CITY.SETTING_CITY_ID)
      formData.append('CONSULTANT_PERMANENT_STATE', this.model.CONSULTANT_PERMANENT_STATE.SETTING_GENERAL_ID)
      formData.append('CONSULTANT_PERMANENT_COUNTRY', this.model.CONSULTANT_PERMANENT_COUNTRY.SETTING_GENERAL_ID)
      formData.append('SELECTED_SAME_ADDRESS', this.copyCorrespondence ? 1 : 0)

      if (this.model.CONSULTANT_PASSPORT_EXPIRY_NO && this.model.CONSULTANT_CITIZEN === 287) {
        formData.append('CONSULTANT_PASSPORT_EXPIRY_NO', moment(this.model.CONSULTANT_PASSPORT_EXPIRY_NO).format('YYYY-MM-DD'))
        for (let i = 0; i < this.model.CONSULTANT_PASSPORT_PHOTO.length; i++) {
          formData.append('CONSULTANT_PASSPORT_PHOTO[' + i + ']',
            this.stringifyDataIfComplexObject2(this.model.CONSULTANT_PASSPORT_PHOTO[i]))
        }
      }
      formData.append('CONSULTANT_NRIC', this.model.CONSULTANT_NRIC)
      formData.append('CONSULTANT_PASSPORT_NO', this.model.CONSULTANT_PASSPORT_NO)
      formData.append('CONSULTANT_HOUSE_NO', this.model.CONSULTANT_HOUSE_NO)
      formData.append('CONSULTANT_MOBILE_NO', this.model.CONSULTANT_MOBILE_NO)
      formData.append('CONSULTANT_EMAIL', this.model.CONSULTANT_EMAIL)
      formData.append('CREATE_BY', (JSON.parse(localStorage.getItem('user_id'))))
      formData.append('CONSULTANT_ID', this.currentConsultantData.CONSULTANT_ID)
      formData.append('CONSULTANT_CITIZEN', this.model.CONSULTANT_CITIZEN)
      // if(this.showUploadDocumentIfDataChanged()) {
      const childRef = this.$refs.consultantPersonalEducation
      // consultant qualifications
      const items = childRef.educations
      for (let i = 0; i < items.length; i++) {
        for (const key of Object.keys(items[i])) {
          if (key === 'EDUCATIONAL_QUALIFICATON_DOCS') {
            if (items[i].EDUCATIONAL_QUALIFICATON_DOCS) {
              for (let j = 0; j < items[i].EDUCATIONAL_QUALIFICATON_DOCS.length; j++) {
                formData.append(`items[${i}][${key}][` + j + ']',
                  this.stringifyDataIfComplexObject2(items[i].EDUCATIONAL_QUALIFICATON_DOCS[j]))
              }
            }
          } else {
            formData.append(`items[${i}][${key}]`, items[i][key])
          }
        }
      }
      // consultant education datas
      formData.append('MATH', childRef.model.MATH)
      formData.append('LANGUAGE', childRef.model.LANGUAGE)
      formData.append('OTHER_LANGUAGE', childRef.model.OTHER_LANGUAGE)
      formData.append('CREDIT_SUBJECT', childRef.model.CREDIT_SUBJECT)
      if (childRef.model.PROFESSIONAL_CERTIFICATE) {
        formData.append('PROFESSIONAL_CERTIFICATE', childRef.model.PROFESSIONAL_CERTIFICATE)
      }
      formData.append('SUBJECTS', JSON.stringify(childRef.subjects))

      if (childRef.document.PROFESSIONAL_CERTIFICATE_DOCS) {
        for (let i = 0; i < childRef.document.PROFESSIONAL_CERTIFICATE_DOCS.length; i++) {
          formData.append('PROFESSIONAL_CERTIFICATE_DOCS[' + i + ']',
            this.stringifyDataIfComplexObject2(childRef.document.PROFESSIONAL_CERTIFICATE_DOCS[i]))
        }
      }

      for (let i = 0; i < this.model.CONSULTANT_PROFILE_PHOTO.length; i++) {
        formData.append('CONSULTANT_PROFILE_PHOTO[' + i + ']',
          this.stringifyDataIfComplexObject2(this.model.CONSULTANT_PROFILE_PHOTO[i]))
      }
      if (this.model.CONSULTANT_CITIZEN === 286) {
        for (let i = 0; i < this.model.CONSULTANT_NRIC_PHOTO.length; i++) {
          formData.append('CONSULTANT_NRIC_PHOTO_FRONT[' + i + ']',
            this.stringifyDataIfComplexObject2(this.model.CONSULTANT_NRIC_PHOTO[i]))
        }
        for (let i = 0; i < this.model.CONSULTANT_NRIC_PHOTO_BACK.length; i++) {
          formData.append('CONSULTANT_NRIC_PHOTO_BACK[' + i + ']',
            this.stringifyDataIfComplexObject2(this.model.CONSULTANT_NRIC_PHOTO_BACK[i]))
        }

        // formData.append('CONSULTANT_NRIC_PHOTO_BACK[0]',
        //   this.stringifyDataIfComplexObject2(this.model.CONSULTANT_NRIC_PHOTO_BACK))
      }
      // if (TYPE === 'SUBMIT') {
      const documentArr = []
      for (let i = 0; i < this.model.REVIEW_DOCS.length; i++) {
        const val = this.stringifyDataIfComplexObject2(this.model.REVIEW_DOCS[i])
        if (val) {
          documentArr.push(val)
        }
      }
      if (documentArr.length) {
        for (let i = 0; i < documentArr.length; i++) {
          formData.append('VERIFY_DOCS[' + i + ']', documentArr[i])
        }
        // }
      }

      // append child other documents
      const otherDocumentRef = this.$refs.profileOtherDocument
      if (otherDocumentRef.model.OTHERS_DOCUMENTS) {
        for (let i = 0; i < otherDocumentRef.model.OTHERS_DOCUMENTS.length; i++) {
          formData.append('OTHER_DOCUMENTS_DOCS[' + i + ']',
            this.stringifyDataIfComplexObject2(otherDocumentRef.model.OTHERS_DOCUMENTS[i]))
        }
      }

      return formData
    },
    stringifyDataIfComplexObject (data) {
      if ('docID' in data) {
        return JSON.stringify(data)
      } else if ('file' in data) {
        return data.file
      }
    },
    stringifyDataIfComplexObject2 (data) {
      if ('docID' in data) {
        return JSON.stringify(data)
      } else { return data }
    },
    switchView (type) {
      this.viewType = type
    },
    handleDateClick: function (calEvent, jsEvent, view) {
      //  var dt = calEvent.date;
      alert(
        'Event Clicked on : ' + this.moment(calEvent.event.start).format('DD-MM-yyyy, h:mm:ss a'),
      )
    },
    validateExpiryDate (value) {
      if (value != null) {
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        const time =
          today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' GMT'
        const dateTime = date + ' ' + time

        const unixTimeNow = Date.parse(dateTime)
        console.log(unixTimeNow)

        // date expiry
        const expiryDate = this.model.USER_PASS_EXP
        const dateExpiry =
          expiryDate.getFullYear() + '-' + (expiryDate.getMonth() + 1) + '-' + expiryDate.getDate()
        const timeExpiry =
          expiryDate.getHours() +
          ':' +
          expiryDate.getMinutes() +
          ':' +
          expiryDate.getSeconds() +
          ' GMT'
        const dateTimeExpiry = dateExpiry + ' ' + timeExpiry
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry)
        console.log(unixTimeExpiryDate)

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log('expired')
          return ['Expired']
        } else {
          console.log('not expired')
          // return ["Expired"];
        }
      } else {
        console.log('ssdfdsf')
      }
    },
    validateFourthTab () {
      return this.$refs.fourthTabForm.validate()
    },

    // removeExamSession(data) {
    //   console.log(JSON.stringify(data.item));
    //   this.selectedExamList.unshift(data.item);
    // },

    // addExamSession(data) {
    //   console.log(JSON.stringify(data.item));
    //   this.selectedExamList.shift(data.item);
    //   // if (this.selectedExamList.length < this.noOfSession) {
    //   //   this.selectedExamList.shift(data.item);
    //   // }
    // },
    showmodal () {},

    setIsExemptionQualified () {
      this.model.EXEMPTION_QUALIFIED = !this.model.EXEMPTION_QUALIFIED
      console.log(this.model.EXEMPTION_QUALIFIED)
    },

    setCurrentRowClicked (item, index) {
      this.currentRowClicked = index
    },
    setSelectedExamSession (items) {
      if (items.length > 3) {
        this.$refs.selectableTable.unselectRow(this.currentRowClicked)
      } else {
        this.selectedExamList = items
      }
    },

    showHighestEducationUploader (newVal) {
      for (const qualification in this.visibleEducation) {
        this.visibleEducation[qualification] = false
      }
      this.visibleEducation[newVal.name.split(' ')[0]] = true
    },

    /* -------------------------------------------------------------------------- */
    /*                               updatefunction                               */
    /* -------------------------------------------------------------------------- */
    showUploadDocumentIfDataChanged () {
      const FIELDS = [
        'CONSULTANT_NAME',
        'CONSULTANT_PASSPORT_NO',
        'CONSULTANT_CORRESPONDENT_COUNTRY',
        'CONSULTANT_CORRESPONDENT_STATE',
        'CONSULTANT_CORRESPONDENT_CITY',
        'CONSULTANT_CORRESPONDENT_POSTAL',
        'CONSULTANT_CORRESPONDENT_ADDR1',
        'CONSULTANT_CORRESPONDENT_ADDR2',
        'CONSULTANT_CORRESPONDENT_ADDR3',

        // 'SELECTED_SAME_ADDRESS',
        'CONSULTANT_PERMANENT_COUNTRY',
        'CONSULTANT_PERMANENT_STATE',
        'CONSULTANT_PERMANENT_CITY',
        'CONSULTANT_PERMANENT_POSTAL',
        'CONSULTANT_PERMANENT_ADDR1',
        'CONSULTANT_PERMANENT_ADDR2',
        'CONSULTANT_PERMANENT_ADDR3',
      ]
      let VAL = false
      FIELDS.forEach((field) => {
        const MODEL_VALUE = function (model) {
          switch (field) {
            case 'CONSULTANT_CORRESPONDENT_COUNTRY':
            case 'CONSULTANT_CORRESPONDENT_STATE':
            case 'CONSULTANT_PERMANENT_COUNTRY':
            case 'CONSULTANT_PERMANENT_STATE':
              return model[field] ? model[field].SETTING_GENERAL_ID : ''

            case 'CONSULTANT_CORRESPONDENT_CITY':
            case 'CONSULTANT_PERMANENT_CITY':
              return model[field] ? model[field].SETTING_CITY_ID : ''

            case 'CONSULTANT_CORRESPONDENT_POSTAL':
            case 'CONSULTANT_PERMANENT_POSTAL':
              return model[field] ? model[field].SETTING_POSTCODE_ID : ''

            default:
              return model[field]
          }
        }
        // console.log(this.currentConsultantData[field] + ' model ' + MODEL_VALUE(this.model))
        if (this.currentConsultantData[field] !== MODEL_VALUE(this.model)) {
          VAL = true
          return 0
        }
      })
      return VAL
    },

    showRequestTacNumberIfChanged (field) {
      // console.log('change tack number', this.currentConsultantData[field])
      // console.log(this.model.CONSULTANT_MOBILE_NO)
      if (this.currentConsultantData[field] !== ('0' + this.model.CONSULTANT_MOBILE_NO)) {
        return true
      }
      return false
    },

    showRequestTacNumberEmailIfChanged (field) {
      if (this.currentConsultantData[field] !== this.model.CONSULTANT_EMAIL) {
        return true
      }
      return false
    },

    onModelUpdated (newVal, schema) {
      if (schema !== 'REVIEW_DOCS') {
        this.visibleUploadVerificationDocuments = this.showUploadDocumentIfDataChanged()
      } else {
        // this.visibleUploadVerificationDocuments = false
      }
      console.log(schema)
      if (schema === 'CONSULTANT_MOBILE_NO') {
        this.model.PHONE = this.model.CONSULTANT_MOBILE_NO ? this.model.CONSULTANT_MOBILE_NO.toString() : ''
        this.visibleMobileNumberTac = this.showRequestTacNumberIfChanged('CONSULTANT_MOBILE_NO')
        return
      } else if (schema === 'CONSULTANT_EMAIL') {
        this.visibleEmailTac = this.showRequestTacNumberEmailIfChanged('CONSULTANT_EMAIL')
        return
      }
      if (schema === 'CONSULTANT_EDUCATION_PROPS') return
      if (schema == 'CONSULTANT_CITIZEN') {
        if (newVal == 286) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema == 'CONSULTANT_RACE') {
        if (newVal.SET_PARAM == 'OTHERS') {
          this.visibleOtherRace = true
        } else {
          this.visibleOtherRace = false
        }
      } else if (schema == 'CONSULTANT_HIGHEST_QUALIFICATION') {
        if (newVal.CONSULTANT_QUALIFICATION_ID == 1) {
          this.showHighestEducationUploader()
          this.visibleEducation.SPM = true
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 2) {
          this.showHighestEducationUploader()
          this.visibleEducation.SPMV = true
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 3) {
          this.showHighestEducationUploader()
          this.visibleEducation.STPM = true
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 11) {
          this.showHighestEducationUploader()
          this.visibleEducation.DEGREE = true
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 12) {
          this.showHighestEducationUploader()
          this.visibleEducation.DIPLOMA = true
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 13) {
          this.showHighestEducationUploader()
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 15) {
          this.showHighestEducationUploader()
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 14) {
          this.showHighestEducationUploader()
        } else if (newVal.CONSULTANT_QUALIFICATION_ID == 16) {
          this.showHighestEducationUploader()
        }
      } else if (schema == 'LANGUAGE') {
        if (newVal.name == 'OTHERS') {
          this.visibleOtherLanguage = true
        } else {
          this.visibleOtherLanguage = false
        }
      } else if (schema == 'PROFESSIONAL_CERTIFICATE') {
        if (newVal.name == 'CERTIFIED FINANCIAL PLANNER (CFP)') {
          this.visibleEducation.PROFESSIONAL_CFP = true
        } else {
          this.visibleEducation.PROFESSIONAL_CFP = false
        }
      // } else if (schema == 'CONSULTANT_CORRESPONDENT_POSTAL') {
      //   return this.postcodeAPI.filter(el => {
      //     if (el.POSTCODE == newVal) {
      //       this.model.CONSULTANT_CORRESPONDENT_POSTAL = el.POSTCODE
      //       this.model.CONSULTANT_CORRESPONDENT_COUNTRY = el.COUNTRY
      //       this.model.CONSULTANT_CORRESPONDENT_STATE = el.STATE
      //       this.model.CONSULTANT_CORRESPONDENT_CITY = el.CITY
      //     }
      //   })
      // } else if (schema == 'CONSULTANT_PERMANENT_POSTAL') {
      //   return this.postcodeAPI.filter(el => {
      //     if (el.POSTCODE == newVal) {
      //       this.model.CONSULTANT_PERMANENT_POSTAL = el.POSTCODE
      //       this.model.CONSULTANT_PERMANENT_COUNTRY = el.COUNTRY
      //       this.model.CONSULTANT_PERMANENT_STATE = el.STATE
      //       this.model.CONSULTANT_PERMANENT_CITY = el.CITY
      //     }
      //   })
      // } else if (schema == 'CONSULTANT_PERMANENT_COUNTRY') {
      //   this.model.CONSULTANT_PERMANENT_COUNTRY = newVal
      } else if (schema == 'citizenship') {
        this.model.CONSULTANT_DOB = null
      } else if (schema == 'CONSULTANT_NRIC') {
        console.log('dob :' + this.model.CONSULTANT_DOB)
        if (newVal.substr(11, 1) != '') {
          console.log('last character :' + newVal.substr(11, 1))
          var Year = newVal.substring(0, 2)
          var Month = newVal.substring(2, 4)
          var Day = newVal.substring(4, 6)

          var cutoff = new Date().getFullYear() - 2000
          console.log('year :' + cutoff)

          var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day
          this.model.CONSULTANT_DOB = dob
          console.log('dob :' + dob)
          console.log((Year > cutoff ? '19' : '20') + Year)
          const yearBirth = (Year > cutoff ? '19' : '20') + Year
          if (parseInt(yearBirth) <= 1970) {
            console.log('1970 and below')
            this.visibleOldIc = true
          } else {
            console.log('above')
            this.visibleOldIc = false
          }
          // if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
          //   console.log('The number is even. f');
          //   this.model.CONSULTANT_GENDER = '1';
          // } else {
          //   console.log('The number is odd. l');
          //   this.model.CONSULTANT_GENDER = '2';
          // }
        }
      } else if (schema == 'CANDIDATE_CATEGORY') {
        if (newVal == 1) {
          // this.visibleConsultant = false;
          this.visibleCategoryStaff = true
          // this.visibleCMSRL_Yes = true;
        } else {
          // this.visibleConsultant = true;
          this.visibleCategoryStaff = false
          // this.visibleCMSRL_Yes = false;
        }
      } else if (schema == 'CANDIDATE_POSITION_CATEGORY') {
        if (newVal.ID == 1) {
          this.model2.CANDIDATE_POSITION_CATEGORY = 1
        } else if (newVal.ID == 2) {
          this.model2.CANDIDATE_POSITION_CATEGORY = 2
        }
      } else if (schema == 'CMSRL') {
        if (newVal == 1) {
          this.visibleCMSRL_Yes = true
          this.visibleCMSRL_No = false
        } else {
          this.visibleCMSRL_Yes = false
          this.visibleCMSRL_No = true
        }
      } else if (schema == 'DISTRIBUTOR') {
        if (newVal.name == 'ENG JIA SECURITIES SDN BHD') {
          this.model.PRS = true
          this.model.UTS = !this.model.PRS
          this.visiblePRS = true
          this.visibleUTS = false
        } else {
          this.model.UTS = true
          this.model.PRS = !this.model.UTS
          this.visiblePRS = false
          this.visibleUTS = true
        }
      } else if (schema == 'EXEMPTION_CATEGORY') {
        console.log(schema, newVal)
        // this.visibleExemptionQualified = true;
        // console.log(newVal);
      } else if (schema === 'CONSULTANT_CORRESPONDENT_COUNTRY') {
        this.cityAPI = []
        // this.statesAPI = []
        // this.postcodeAPI = []
        this.model.CONSULTANT_CORRESPONDENT_CITY = null
        this.model.CONSULTANT_CORRESPONDENT_STATE = null
        this.model.CONSULTANT_CORRESPONDENT_POSTAL = null
        this.getAllStates(this.model.CONSULTANT_CORRESPONDENT_COUNTRY.SETTING_GENERAL_ID)
      } else if (schema === 'CONSULTANT_CORRESPONDENT_POSTAL') {
        this.getCity(this.model.CONSULTANT_CORRESPONDENT_POSTAL.SETTING_CITY_ID, true)
      } else if (schema === 'CONSULTANT_CORRESPONDENT_CITY') {
        this.getAllPostcodes(this.model.CONSULTANT_CORRESPONDENT_CITY.SETTING_CITY_ID)
      } else if (schema === 'CONSULTANT_CORRESPONDENT_STATE') {
        this.getCity(this.model.CONSULTANT_CORRESPONDENT_STATE.SETTING_GENERAL_ID)
      } else if (schema === 'CONSULTANT_PERMANENT_COUNTRY') {
        this.permanentCityAPI = []
        // this.statesAPI = []
        // this.postcodeAPI = []
        this.model.CONSULTANT_PERMANENT_CITY = null
        this.model.CONSULTANT_PERMANENT_STATE = null
        this.model.CONSULTANT_PERMANENT_POSTAL = null
        this.getAllStatesForPermanent(this.model.CONSULTANT_PERMANENT_COUNTRY.SETTING_GENERAL_ID)
      } else if (schema === 'CONSULTANT_PERMANENT_POSTAL') {
        this.getCityForPermanent(this.model.CONSULTANT_PERMANENT_POSTAL.SETTING_CITY_ID, true)
      } else if (schema === 'CONSULTANT_PERMANENT_CITY') {
        this.getAllPostcodesForPermanent(this.model.CONSULTANT_PERMANENT_CITY.SETTING_CITY_ID)
      } else if (schema === 'CONSULTANT_PERMANENT_STATE') {
        this.getCityForPermanent(this.model.CONSULTANT_PERMANENT_STATE.SETTING_GENERAL_ID)
      }
    },

    // showHighestEducationUploader () {
    //   for (const qualification in this.visibleEducation) {
    //     this.visibleEducation[qualification] = false
    //   }
    // },

    onExemptionModelUpdated (newVal, schema) {
      if (schema === 'EXEMPTION_MODEL.EXEMPTION_CATEGORY') {
        // console.log(newVal);
        Object.keys(this.visibleExemption).forEach(el => {
          this.visibleExemption[`${el}`] = false
          if (el.match(newVal.value)) {
            this.visibleExemption[`${el}`] = true
          }
        })
        console.log(this.visibleExemption)
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */
    async getAllPostcodes (city_id) {
      const resPostcodes = await GeneralSettingsAPI.get_postcodes(city_id)
      this.postcodeAPI = resPostcodes.data
      this.model.CONSULTANT_CORRESPONDENT_POSTAL = this.postcodeAPI.find(
        (postcode) => postcode.SETTING_POSTCODE_ID === this.model.CONSULTANT_CORRESPONDENT_POSTAL)
    },
    async getAllPostcodesForPermanent (city_id) {
      const resPostcodes = await GeneralSettingsAPI.get_postcodes(city_id)
      this.postcodeAPI = resPostcodes.data
      this.model.CONSULTANT_PERMANENT_POSTAL = this.postcodeAPI.find(
        (postcode) => postcode.SETTING_POSTCODE_ID === this.model.CONSULTANT_PERMANENT_POSTAL)
      this.visibleUploadVerificationDocuments = false
      if (this.model.REVIEW_DOCS.length) {
        setTimeout(() => {
          this.visibleUploadVerificationDocuments = true
        }, 3000)
      }
    },
    async getAllCountries () {
      const resCountries = await GeneralSettingsAPI.get_countries()
      this.countriesAPI = resCountries.data
      this.model.CONSULTANT_CORRESPONDENT_COUNTRY = this.countriesAPI.find(
        (country) => country.SETTING_GENERAL_ID === this.model.CONSULTANT_CORRESPONDENT_COUNTRY)
      this.getAllStates(this.model.CONSULTANT_CORRESPONDENT_COUNTRY.SETTING_GENERAL_ID)
      this.model.CONSULTANT_PERMANENT_COUNTRY = this.countriesAPI.find(
        (country) => country.SETTING_GENERAL_ID === this.model.CONSULTANT_PERMANENT_COUNTRY)
      this.getAllStatesForPermanent(this.model.CONSULTANT_PERMANENT_COUNTRY.SETTING_GENERAL_ID)
    },
    async getAllRaces () {
      this.model.CONSULTANT_RACE = this.race.find(
        (race) => race.SETTING_GENERAL_ID === this.model.CONSULTANT_RACE)
      this.model.CONSULTANT_RACE = this.model.CONSULTANT_RACE.SET_PARAM
    },
    async getDistributorRecords () {
      const distributor_records = await DistributorRecords.getDistributorRecords()
      this.distributor = distributor_records.data.data
      // console.log('this is distributor list', distributor_records.data.data);
    },
    async getDistributorType () {
      const distributor_type = await DistributorType.getDistributorType()
      // console.log('this is distributor list', distributor_type.data.data);
    },
    async getAllStates (country_id) {
      const res_states = await GeneralSettingsAPI.get_states(country_id)
      this.statesAPI = res_states.data
      this.model.CONSULTANT_CORRESPONDENT_STATE = this.statesAPI.find(
        (state) => state.SETTING_GENERAL_ID === this.model.CONSULTANT_CORRESPONDENT_STATE,
      )
      if (this.model.CONSULTANT_CORRESPONDENT_STATE) {
        this.getCity(this.model.CONSULTANT_CORRESPONDENT_STATE.SETTING_GENERAL_ID)
      }
    },
    async getAllStatesForPermanent (country_id) {
      const res_states = await GeneralSettingsAPI.get_states(country_id)
      this.statesAPI = res_states.data
      this.model.CONSULTANT_PERMANENT_STATE = this.statesAPI.find(
        (state) => state.SETTING_GENERAL_ID === this.model.CONSULTANT_PERMANENT_STATE,
      )
      if (this.model.CONSULTANT_PERMANENT_STATE) {
        this.getCityForPermanent(this.model.CONSULTANT_PERMANENT_STATE.SETTING_GENERAL_ID)
      }
    },
    async getCity (state_id, update = false) {
      const res_cities = await GeneralSettingsAPI.get_cities(state_id)
      this.cityAPI = res_cities.data
      if (!update) {
        this.model.CONSULTANT_CORRESPONDENT_CITY = this.cityAPI.find(x => x.SETTING_CITY_ID === this.model.CONSULTANT_CORRESPONDENT_CITY)
        this.getAllPostcodes(this.model.CONSULTANT_CORRESPONDENT_CITY.SETTING_CITY_ID)
      }
    },
    async getCityForPermanent (state_id, update = false) {
      const res_cities = await GeneralSettingsAPI.get_cities(state_id)
      this.permanentCityAPI = res_cities.data
      if (!update) {
        this.model.CONSULTANT_PERMANENT_CITY = this.permanentCityAPI.find(x => x.SETTING_CITY_ID === this.model.CONSULTANT_PERMANENT_CITY)
        this.getAllPostcodesForPermanent(this.model.CONSULTANT_PERMANENT_CITY.SETTING_CITY_ID)
      }
      this.currentConsultantDataLoaded = true
    },
    // async getAllConsultantExamSessions() {
    //   const exam_session = await ConsultantExamSession.getAllConsultantExamSessions();
    //   // console.log('this is consultant exam session', exam_session);
    // },
    // async getAllConsultantExamType() {
    //   console.log('inside exam type');
    //   const exam_type = await ConsultantExamType.getAllConsultantExamType();
    //   this.examType = exam_type.data.data;
    //   console.log('this is consultant exam type', exam_type.data.data);
    // },
  },
}
</script>

<!-- New step! Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.wizard-header {
  display: none;
}
.wizard-tab-content {
  padding: 0;
}
input::placeholder {
  /* Recent browsers */
  text-transform: none;
}
.text-uppercase input {
  text-transform: uppercase !important;
}
.text-uppercase label {
  /* Recent browsers */
  text-transform: none;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}

.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
/* .text-uppercase {
  text-transform: uppercase;
} */
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>
