<template>
  <div class="">
    <div class="">
      <div style="display:flex; justify-content:center" class="row">
        <div class="col-10">
          <va-card>
            <h4>Sign up</h4>
            <br />
            <vue-form-generator
              :model="model"
              :schema="registrationSchema"
              :options="formOptions"
              ref="tabForm1"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>

            <div class="float-right">
              <button
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
                @click="submitRegistrationForm"
              >
                Submit
              </button>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import Vudal from 'vudal';
import VueFormGenerator from 'vue-form-generator';
import 'vue-form-generator/dist/vfg-core.css';
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import moment from 'moment';
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';
import * as services02module0 from '../../../app/module0/services02';
import * as services06module2 from '../../../app/module2/services06';
import * as services06module1 from '../../../app/module1/services06';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import { getRequiredDocumentById } from '../../../app/module0/services';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component('multiselect', Multiselect);

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ApprovalLevel = RepositoryFactory.get('approvallevel');

export default {
  /* -------------------------------------------------------------------------- */
  /*                                  startdata                                 */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      citizenship: [
        { name: 'MALAYSIAN', value: '1', selected: true },
        { name: 'NON-MALAYSIAN', value: '2' },
      ],

      postcodeAPI: [],

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */

        // CONSULTANT_FIRST_NAME: '',
        // CONSULTANT_MIDDLE_NAME: '',
        // CONSULTANT_LAST_NAME: '',
        // PASSPORT_SIZE_PHOTO: '',
        // CONSULTANT_FULL_NAME: `${this.CONSULTANT_FIRST_NAME} ${this.CONSULTANT_MIDDLE_NAME} ${this.CONSULTANT_LAST_NAME}`,
        // CONSULTANT_COUNTRY: '',
        // CONSULTAT_PASSPOR_T_EXPIRY_NO: '',
        APPLICATION_ID: 5,
        USER_ID: '',
        CITIZENSHIP: '1',
        CONSULTANT_NRIC: '',
        CONSULTANT_NRIC_OLD: '',
        CONSULTANT_PASSPORT_NO: '',
        CONSULTANT_PASSPORT_EXPIRY_NO: '',
        // CONSULTANT_NRIC_PHOTO: Blob,

        CONSULTANT_CONFIRM_EMAIL: '',
        CONSULTANT_CONFIRM_EMAIL: '',
      },

      // Section 1
      registrationSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'User ID',
                model: 'USER_ID',
                placeholder: 'Enter your name',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
                // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              },
              {
                type: 'label',
                styleClasses: 'col-md-6 ',
              },
              {
                type: 'radios',
                label: 'Citizenship',
                model: 'CITIZENSHIP',
                required: true,
                validator: 'required',
                values: () => {
                  return this.citizenship;
                },
                styleClasses: 'col-md-3 display-inline text-uppercase',
              },
              {
                type: 'vfg-the-mask',
                labels: 'New NRIC Number',
                model: 'CONSULTANT_NRIC',
                required: true,
                validator: 'required',
                placeholder: 'Enter NRIC number',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
              },
              {
                type: 'vfg-the-mask',
                labels: 'Old NRIC Number',
                model: 'CONSULTANT_NRIC_OLD',
                required: true,
                validator: 'required',
                placeholder: 'Enter old NRIC number',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Passport Number',
                model: 'CONSULTANT_PASSPORT_NO',
                placeholder: 'Enter Passport Number',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },
              {
                labels: 'Passport Expiry Date',
                type: 'vfg-functional-date',
                placeholder: 'Passport expiry date',
                required: true,
                validator: 'required',
                model: 'CONSULTANT_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },

              {
                type: 'label',
                styleClasses: 'col-md-4',
              },
              {
                type: 'label',
                styleClasses: 'col-md-4',
              },

              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                model: 'CONSULTANT_EMAIL',
                placeholder: 'Enter email address',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
              },

              {
                type: 'label',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Confirm Email',
                model: 'CONSULTANT_CONFIRM_EMAIL',
                placeholder: 'Enter email address',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
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
    'model.CONSULTANT_NRIC': function(val) {
      console.log('dob :' + this.model.CONSULTANT_DOB);
      if (val.substr(11, 1) != '') {
        console.log('last character :' + val.substr(11, 1));
        var Year = val.substring(0, 2);
        var Month = val.substring(2, 4);
        var Day = val.substring(4, 6);

        var cutoff = new Date().getFullYear() - 2000;
        console.log('year :' + cutoff);

        var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
        this.model.CONSULTANT_DOB = dob;
        console.log('dob :' + dob);
        console.log((Year > cutoff ? '19' : '20') + Year);
        const yearBirth = (Year > cutoff ? '19' : '20') + Year;
        if (parseInt(yearBirth) <= 1970) {
          console.log('1970 and below');
          // this.visibleOldIc = true;
        } else {
          console.log('above');
          // this.visibleOldIc = false;
        }
        if (parseInt(val.substr(11, 1)) % 2 == 0) {
          console.log('The number is even. Female');
          this.model.CONSULTANT_GENDER = '2';
        } else {
          console.log('The number is odd. Male');
          this.model.CONSULTANT_GENDER = '1';
        }
      }
    },
  },

  async mounted() {
    // await this.checkDuplicateIC('971025145153');
    await this.checkDuplicateUserID('test123');
    await this.checkDuplicateEmail('zulhusnihariz97@gmail.com');
    // await this.getAllCountries();
    // await this.getAllPostcodes();
    // await this.getAllStates();
    // await this.getDistributorRecords();
    // await this.getAllConsultantExamType();
  },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    checkDuplicateIC: async function() {
      console.log('inside checkDuplicateIC');
      const response = await services06module2.checkDuplicateIC();
      // const response = await DistributorCandidateAcceptance.getAllDistributorCandidateAcceptance();
      console.log('checkDuplicateIC:', response);
    },
    checkDuplicateUserID: async function() {
      console.log('inside checkDuplicateUser');
      const response = await services06module2.checkDuplicateUserID();
      // const response = await DistributorCandidateAcceptance.getAllDistributorCandidateAcceptance();
      console.log('checkDuplicateUser:', response);
    },
    checkDuplicateEmail: async function() {
      console.log('inside checkDuplicateEmail');
      const response = await services06module2.checkDuplicateEmail();
      // const response = await DistributorCandidateAcceptance.getAllDistributorCandidateAcceptance();
      console.log('checkDuplicateEmail:', response);
    },

    validateTab1() {
      return this.$refs['tabForm1'].validate();
    },

    nextTab: async function() {
      console.log('Test');
      // const returnresponse = await services02module2.postRegisterConsultant(this.model);
    },

    // onValidated(isValid, errors) {
    //   console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    // },

    submitRegistrationForm: async function() {
      console.log('model: ', this.model);
      // if (confirm('Declaring that the details inserted is correct ? ')) {
      //   const fs = require('fs');
      //   var candidate = {
      //     APPLICATION_ID: 136,
      //     companycode: 'ASB01',
      //     companyname: 'Amanah Saham Bumiputra',
      //     coursename: 'CUTE',
      //     email: 'asyraf.matrozai@araken.biz',
      //     name: 'NoorHidayah Binti Mohd Faizal',
      //     idnumber: '890408035156',
      //     mobile: '+60142310327',
      //     sessionid1: 232,
      //     sessionid2: 237,
      //     sessionid3: 238,
      //   };
      //   // var candidate = {"APPLICATION_ID": 131 ,"companycode": "ASB01","companyname": "Amanah Saham Bumiputra","coursename": "CUTE","email": "johari@fimm.com.my","name": "Muhamad Khairul Bin Azhar","idnumber": "930121105532","mobile": "+601121253742","sessionid": 220};
      //   let txtdata = new FormData();
      //   let data = new FormData();
      //   let imageblob = this.model.CONSULTANT_NRIC_PHOTO;
      //   console.log(this.model.CONSULTANT_NRIC_PHOTO);
      //   // let imgphoto = new File(this.model.CONSULTANT_NRIC_PHOTO, 'image3.png');
      //   // console.log(imgphoto);
      //   console.log(candidate);
      //   const datajson = JSON.stringify(candidate);
      //   const datablob = new Blob([datajson], { type: 'application/json' });
      //   // data.append('imagefile', fs.createReadStream(imgphoto));
      //   console.log('pass 1');
      //   // data.append('imagefile', imgphoto);
      //   console.log('pass 1 withour error');
      //   console.log('pass 2');
      //   data.append('candidate', datablob);
      //   console.log('pass 2 withour error');
      //   var datareps = 116;
      //   for (var pair of data.entries()) {
      //     console.log(pair[0] + ', ' + pair[1]);
      //   }
      //   try {
      //     console.log('Start function submit');
      // const returnresponse = await services02module2.postRegisterConsultant(this.model);

      // console.log(returnresponse);

      // const response = await servicesmodule2.postCandidateRegisterPreference(
      //   this.candidateRegisterPreferenceParams,
      // );
      // console.log(response);
      // //     console.log('--------Seperate---------');
      // //     console.log(returnresponse);
      // //     //this.$router.push(-1)
      // //   } catch (error) {
      // //     console.log(error);
      // //   }
      // // } else {
      // //   // Do nothing!
      // //   console.log('Thing was not saved to the database.');
      // // }

      // this.$refs['declaration-personal-details'].hide();
    },

    switchView(type) {
      this.viewType = type;
    },
    handleDateClick: function(calEvent, jsEvent, view) {
      console.log(JSON.stringify(calEvent.event));
      //  var dt = calEvent.date;
      alert(
        'Event Clicked on : ' + this.moment(calEvent.event.start).format('DD-MM-yyyy, h:mm:ss a'),
      );
    },
    validateExpiryDate(value) {
      if (value != null) {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time =
          today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' GMT';
        const dateTime = date + ' ' + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        // date expiry
        const expiryDate = this.model.USER_PASS_EXP;
        const dateExpiry =
          expiryDate.getFullYear() + '-' + (expiryDate.getMonth() + 1) + '-' + expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ':' +
          expiryDate.getMinutes() +
          ':' +
          expiryDate.getSeconds() +
          ' GMT';
        const dateTimeExpiry = dateExpiry + ' ' + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log('expired');
          return ['Expired'];
        } else {
          console.log('not expired');
          // return ["Expired"];
        }
      } else {
        console.log('ssdfdsf');
      }
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },

    /* -------------------------------------------------------------------------- */
    /*                               updatefunction                               */
    /* -------------------------------------------------------------------------- */

    onModelUpdated(newVal, schema) {
      // console.log(newVal);
      console.log(`schema: ${schema}`, `value: ${newVal}`);
      if (schema == 'CITIZENSHIP') {
        if (newVal == 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema == 'CONSULTANT_RACE') {
        if (newVal.name == 'OTHERS') {
          this.visibleOtherRace = true;
        } else {
          this.visibleOtherRace = false;
        }
      } else if (schema == 'CONSULTANT_HIGHEST_QUALIFICATION') {
      } else if (schema == 'LANGUAGE') {
        if (newVal.name == 'OTHERS') {
          this.visibleOtherLanguage = true;
        } else {
          this.visibleOtherLanguage = false;
        }
      } else if (schema == 'PROFESSIONAL_CERTIFICATE') {
        if (newVal.name == 'CERTIFIED FINANCIAL PLANNER (CFP)') {
          this.visibleEducation.PROFESSIONAL_CFP = true;
        } else {
          this.visibleEducation.PROFESSIONAL_CFP = false;
        }
      } else if (schema == 'CONSULTANT_CORRESPONDENT_POSTAL') {
        return this.postcodeAPI.filter(el => {
          if (el.POSTCODE == newVal) {
            this.model.CONSULTANT_CORRESPONDENT_POSTAL = el.POSTCODE;
            this.model.CONSULTANT_CORRESPONDENT_COUNTRY = el.COUNTRY;
            this.model.CONSULTANT_CORRESPONDENT_STATE = el.STATE;
            this.model.CONSULTANT_CORRESPONDENT_CITY = el.CITY;
          }
        });
      } else if (schema == 'CONSULTANT_PERMANENT_POSTAL') {
        return this.postcodeAPI.filter(el => {
          if (el.POSTCODE == newVal) {
            this.model.CONSULTANT_PERMANENT_POSTAL = el.POSTCODE;
            this.model.CONSULTANT_PERMANENT_COUNTRY = el.COUNTRY;
            this.model.CONSULTANT_PERMANENT_STATE = el.STATE;
            this.model.CONSULTANT_PERMANENT_CITY = el.CITY;
          }
        });
      } else if (schema == 'CONSULTANT_PERMANENT_COUNTRY') {
        this.model.CONSULTANT_PERMANENT_COUNTRY = newVal;
      } else if (schema == 'race') {
        if (newVal.name == 'Others') {
          this.otherRace = true;
        } else {
          this.otherRace = false;
        }
      } else if (schema == 'citizenship') {
        this.model.CONSULTANT_DOB = null;
      } else if (schema == 'icNo') {
        // console.log('dob :' + this.model.CONSULTANT_DOB);
        if (newVal.substr(11, 1) != '') {
          console.log('last character :' + newVal.substr(11, 1));
          var Year = newVal.substring(0, 2);
          var Month = newVal.substring(2, 4);
          var Day = newVal.substring(4, 6);

          var cutoff = new Date().getFullYear() - 2000;
          // console.log('year :' + cutoff);

          var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
          this.model.CONSULTANT_DOB = dob;
          // console.log('dob :' + dob);
          // console.log((Year > cutoff ? '19' : '20') + Year);
          const yearBirth = (Year > cutoff ? '19' : '20') + Year;
          if (parseInt(yearBirth) <= 1970) {
            // console.log('1970 and below');
            this.visibleOldIc = true;
          } else {
            // console.log('above');
            this.visibleOldIc = false;
          }
          if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
            // console.log('The number is even. f');
            this.model.CONSULTANT_GENDER = '1';
          } else {
            // console.log('The number is odd. l');
            this.model.CONSULTANT_GENDER = '2';
          }
        }
      } else if (schema == 'DISTRIBUTOR') {
        const DIST_VARIATION_TYPE = ['UTMC', 'PRP', 'IPRA', 'IUTA'];
        const DIST_TYPE = newVal.distributor_type.distributor_type.DIST_TYPE_VARIATION;
        // console.log(DIST_TYPE);
        this.visibleUTS = false;
        this.visiblePRS = false;

        const matched = DIST_VARIATION_TYPE.some(el => DIST_TYPE.match(el));

        matched ? (this.visibleUTS = true) : (this.visiblePRS = true);
        // if (!matched) {
        //   this.visiblePRS = true;
        // } else {
        //   this.visibleUTS = true;
        // }
      } else if (schema == 'LICENSE_TYPE') {
        console.log('this is LICENSE_TYPE: ', newVal);

        this.model.UTS = false;
        this.model.PRS = false;

        if (newVal.length === 2) {
          console.log('inside if');
          this.model.UTS = true;
          this.model.PRS = true;
        } else {
          console.log('inside else');
          if (newVal[0].match('CUTE')) this.model.UTS = true;
          if (newVal[0].match('CPRE')) this.model.PRS = true;

          console.log(this.model.UTS, this.model.PRS);
        }

        //  console.log('COURSE_TYPE: ', this.model.COURSE_TYPE);

        //   this.model.COURSE_TYPE = this.examType.filter(el =>
        //   el.EXAM_TYPE_NAME.match('CPRE'),
        // ).CONSULTANT_EXAM_TYPE_ID;
      } else if (schema == 'EXEMPTION_CATEGORY') {
        console.log(schema, newVal);
        // this.visibleExemptionQualified = true;
        //  this.model.EXAM_PREFERRED_DATE.valueOf()
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */

    async getAllApprovalLevel() {
      const approval_level = await ApprovalLevel.getAllApprovalLevel();
      console.log('this is approval level', approval_level);
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
          name: this.model.USER_ID,
          idnumber: this.model.CONSULTANT_NRIC,
          mobile: this.model.CONSULTANT_MOBILE_NO,
          sessionid1: this.SELECTED_EXAM_SESSION[0].sessionid,
          sessionid2: this.SELECTED_EXAM_SESSION[1].sessionid,
          sessionid3: this.SELECTED_EXAM_SESSION[2].sessionid,
        };
      },
    },
  },
};
</script>

<!-- New step! Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
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
