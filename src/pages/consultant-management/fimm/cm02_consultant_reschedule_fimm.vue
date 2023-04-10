<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <va-card>
          <div v-if="!dataReady">
            <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
              </div>
          </div>
          <div v-else>
            <h4 style="margin-top:0">Consultant Details</h4>
            <br />
            <div>
              <tabs
                :tabs="tabs"
                :currentTab="currentTab"
                :wrapper-class="'default-tabs'"
                :tab-class="'default-tabs__item'"
                :tab-active-class="'default-tabs__item_active'"
                :line-class="'default-tabs__active-line'"
                @onClick="handleClick"
              />
              <div class="content">
                <div v-if="currentTab === 'tab1'">
                  <div class="ml-4">
                    <br />
                    <table id="consultant-profile" class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 15%">Name</td>
                          <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                        </tr>
                        <tr>
                          <td>New NRIC</td>
                          <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                        </tr>
                        <tr>
                          <td>Date of Birth</td>
                          <td>{{ currentConsultant.CONSULTANT_DOB }}</td>
                        </tr>

                        <tr>
                          <td>Address</td>
                          <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}</td>
                        </tr>
                        <tr>
                          <td>Postcode</td>
                          <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_POSTAL }}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_CITY }}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_STATE }}</td>
                        </tr>
                        <tr>
                          <td>Telephone Number</td>
                          <td>{{ currentConsultant.CONSULTANT_PHONENO }}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                        </tr>
                        <tr>
                          <td>Highest Qualification</td>
                          <td>{{ currentConsultant.CONSULTANT_HIGHEST_QUALIFICATION }}</td>
                        </tr>
                        <tr>
                          <td>Consultant Status</td>
                          <td>{{ currentConsultant.REGISTRATION_STATUS }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <vue-form-generator
                      :model="model"
                      :schema="fileUploadSchema"
                      :options="formOptions"
                      ref="fileUploadForm"
                    >
                    </vue-form-generator>
                  </div>
                </div>
                <div v-if="currentTab === 'tab2'">
                  <div class="ml-4">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 15%">Category</td>
                          <td>{{ currentConsultant.CONSULTANT_CATEGORY }}</td>
                        </tr>
                        <tr>
                          <td>Apprienticeship Program</td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td>Company Distributor</td>
                          <td>{{ currentConsultant.DISTRIBUTOR }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="currentTab === 'tab3'">
                  <div class="ml-4">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr style="width: 100%">
                          <vue-form-generator
                            :model="model"
                            :schema="fileUploadSchema"
                            :options="formOptions"
                            ref="fileUploadForm"
                          >
                          </vue-form-generator>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="currentTab === 'tab4'">
                  <div class="ml-3">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 15%">Examination Type</td>
                          <td>{{ currentConsultant.COURSE_TYPE }}</td>
                        </tr>

                        <tr>
                          <td>Result</td>
                          <td>
                            FAIL
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Certificate
                          </td>
                          <td>
                            Not Available
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                            >
                              View</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Bankruptcy Check
                          </td>
                          <td>
                            Pass
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                            >
                              View</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Bankruptcy Remark
                          </td>
                          <td>
                            Insert remark here
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />

            <vue-form-generator
              :model="model"
              :schema="examSchema"
              :options="formOptions"
              ref="examForm"
              @model-updated="onModelUpdated"
            ></vue-form-generator>
            <br />

            <va-card>
              <div style="display:flex; justify-content:space-between;" class="row">
                <div class="flex xs12 md5  ">
                  <datepicker
                    placeholder="dd-MM-yyyy"
                    format="dd-MMM-yyyy"
                    input-class="form-control bgcolor col-md-12"
                    v-model="model.EXAM_PREFERRED_DATE"
                    :typeable="false"
                    @closed="isDatePicked"
                    name="uniquename"
                  ></datepicker>
                </div>

                <div class="flex md3 offset--md3">
                  <div style="display:flex; justify-content: flex-end;" class="row ">
                    <!-- <h5 v-if="viewType == 1" class="col-2">
                          <b-badge v-b-toggle.collapse-2 class="mr-1" variant="secondary">
                            <i class="fa fa-search"></i>
                          </b-badge>
                        </h5> -->
                    <h5 class="col-2">
                      <b-badge @click="switchView(1)" class="mr-1" variant="secondary">
                        <i class="fa fa-table"></i>
                      </b-badge>
                    </h5>
                    <h5 class="col-2">
                      <b-badge @click="switchView(2)" class="mr-1" variant="secondary">
                        <i class="fa fa-calendar-o"></i>
                      </b-badge>
                    </h5>
                  </div>
                  <div class="row">
                    <va-input :placeholder="$t('Search')" v-model="search" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>
                <!-- <div
                      style="display:flex; align-items:center;"
                      v-if="viewType == 1"
                      class="col-6 float-right"
                    >
                      <div
                        style="display:flex; align-items:center"
                        class="form-group form-group-sm has-search"
                      >
                        <span
                          style="margin-right:20px"
                          class="fa fa-search form-control-feedback"
                        ></span>
                        <input
                          v-model="search"
                          type="text"
                          class="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div> -->
              </div>
              <b-collapse id="collapse-2" class="mt-2">
                <va-card>
                  <vue-form-generator :model="model" :schema="schema"> </vue-form-generator>
                  <button
                    @click.prevent="reset"
                    type="button"
                    class="ml-2 btn btn-fill btn-sm btn-danger"
                  >
                    Reset
                  </button>
                  <button type="button" class="ml-2 btn btn-fill btn-sm btn-primary">
                    Search
                  </button>
                </va-card>
              </b-collapse>
              <div class="col-ml-2">
                <FullCalendar v-if="viewType == 2" :options="calendarOptions" />
                <small>* Choose 1 exam sessions</small>

                <!-- {{ examSitesAPI }} -->
                <va-data-table
                  v-if="viewType == 1"
                  :fields="fields.examSessions"
                  :data="filteredExamSessions"
                  no-data-label="No Data Available"
                  :per-page="10"
                  :datacount="filteredExamSessions.length"
                  :dataperpage="10"
                  clickable
                >
                  <template slot="index" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                  <template slot="ACTION" slot-scope="props">
                    <h4 @click="setSelectedExamSession(props)" style="margin:0; font-size:20px">
                      <span class="badge badge-success mr-1">
                        <i class="fa fa-plus"></i>
                      </span>
                    </h4>
                  </template>
                </va-data-table>
              </div>
            </va-card>

            <va-card v-if="this.model.EXAM_CENTRE_LOCATION.length">
              <small>* Selected Exam List</small>
              <va-data-table
                v-if="viewType == 1"
                :fields="fields.examSessions"
                :data="model.EXAM_CENTRE_LOCATION"
                no-data-label="No data found"
                :per-page="parseInt(perPage)"
                :datacount="model.EXAM_CENTRE_LOCATION.length"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="index" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
                <template slot="ACTION" slot-scope="props">
                  <h4 @click="removeSelectedExamSession(props)" style="margin:0; font-size:20px">
                    <span class="badge badge-danger mr-1">
                      <i class="fa fa-minus"></i>
                    </span>
                  </h4>
                </template>
              </va-data-table>
            </va-card>

            <br />
            <br />
            <button
            @click="$router.go(-1)"
            type="submit" class="btn btn-primary btn-fill float-left btn-md">
            <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div class="float-right">
              <!-- <button

                @click="saveAsDraft"
                type="button"
                class="btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-edit" /> &nbsp;Save as Draft
              </button> -->

              <button type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                <i class="fa fa-paper-plane" /> Submit
              </button>
            </div>
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
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import HorizontalScroll from 'vue-horizontal-scroll';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import moment from 'moment';
import Tabs from 'vue-tabs-with-active-line';

import RepositoryFactory from '../../../repositories/RepositoryFactory';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component('multiselect', Multiselect);

const SettingGeneral = RepositoryFactory.get('settinggeneral');

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Tabs,
  },
  props: {
    value: File,
  },
  /* -------------------------------------------------------------------------- */
  /*                                  startdata                                 */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      dataReady: false,
      tabs: [
        {
          title: 'Applicant Profile',
          value: 'tab1',
        },
        {
          title: 'Type of Applicant',
          value: 'tab2',
        },
        {
          title: 'Uploaded Document',
          value: 'tab3',
        },
        {
          title: 'Examination & Bankcruptcy Check Result',
          value: 'tab4',
        },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      examSessionsAPI: [
        {
          id: '1',
          sessionid: '232',
          siteid: 'ASLC',
          examDate: '23-7-2021',
          sessionTime: '2:00:00 PM', //1624255200
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '2',
          sessionid: '237',
          siteid: 'ASLC',
          examDate: '2-8-2021',
          sessionTime: '9:00:00 AM', //1624255200
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '3',
          sessionid: '238',
          siteid: 'ASLC',
          examDate: '2-8-2021',
          sessionTime: '11:00:00 AM', //1624255200
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '4',
          sessionid: '216',
          siteid: 'PSITCP0X',
          examDate: '15-7-2021',
          sessionTime: '11:00:00 AM', //1624255200
          day: 'Thursday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableSit: '25',
          selected: false,
        },
        {
          id: '5',
          sessionid: '229',
          siteid: 'PSITCP0X',
          examDate: '16-7-2021',
          sessionTime: '10:00:00 AM', //1624255200
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableSit: '25',
          selected: false,
        },
      ],
      examSitesAPI: [],
      statesAPI: [],

      currentTab: 'tab1',
      currentConsultant: {},
      search: '',
      viewType: 1,
      SELECTED_EXAM_SESSION: [],

      // exam

      // filterSelected: null,
      examType: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        backgroundColor: '#ff0000',
        eventColor: '#378006',
        eventClick: this.handleDateClick,
        events: [
          { title: 'Available', date: '2020-11-01', display: 'background' },
          { title: 'Available', date: '2020-11-02', display: 'background' },
        ],
      },

      fields: {
        examSessions: [
          // A virtual column that doesn't exist in items
          { name: '__slot:index', title: 'No' },
          // A column that needs custom formatting
          { name: 'examDate', title: 'Exam Date' },
          { name: 'sessionTime', title: 'Session Time' },
          { name: 'day', title: 'Day' },
          { name: 'centreName', title: 'Centre Name' },
          { name: 'centreLocation', title: 'Centre Location' },
          { name: 'availableSit', title: 'Available Sit' },
          { name: '__slot:ACTION', title: 'Action' },
        ],
      },

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
                  return this.centreLocation;
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
      // fields: [
      //   // A virtual column that doesn't exist in items
      //   { key: 'index', label: 'No' },
      //   // A column that needs custom formatting
      //   { key: 'examDate', label: 'Exam Date' },
      //   { key: 'sessionTime', label: 'Session Time' },
      //   { key: 'day', label: 'Day' },
      //   { key: 'centreName', label: 'Centre Name' },
      //   { key: 'centreLocation', label: 'Centre Location' },
      //   { key: 'availableSit', label: 'Available Sit' },
      //   { key: 'actions', label: 'Action' },
      // ],

      examTimetableList: [
        {
          id: '1',
          sessionid: '232',
          siteid: 'ASLC',
          examDate: '23-7-2021',
          sessionTime: '2:00:00 PM', //1624255200
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '2',
          sessionid: '237',
          siteid: 'ASLC',
          examDate: '2-8-2021',
          sessionTime: '9:00:00 AM', //1624255200
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '3',
          sessionid: '238',
          siteid: 'ASLC',
          examDate: '2-8-2021',
          sessionTime: '11:00:00 AM', //1624255200
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableSit: '25',
        },
        {
          id: '4',
          sessionid: '216',
          siteid: 'PSITCP0X',
          examDate: '15-7-2021',
          sessionTime: '11:00:00 AM', //1624255200
          day: 'Thursday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableSit: '25',
          selected: false,
        },
        {
          id: '5',
          sessionid: '229',
          siteid: 'PSITCP0X',
          examDate: '16-7-2021',
          sessionTime: '10:00:00 AM', //1624255200
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableSit: '25',
          selected: false,
        },
      ],
      centerExam: [
        {
          siteid: 'ASLC',
          sitename: 'Alor Setar Learning Centre',
          address: 'Open University Malaysia (OUM)',
          city: 'Alor Setar',
          state: 'Kedah',
        },
        {
          siteid: 'ASLC',
          sitename: 'PreSIT Center Profile X',
          address: 'Jalan Gasing',
          city: 'Petaling Jaya',
          state: 'Selangor',
        },
        {
          siteid: 'PSITCP0Y',
          sitename: 'PreSIT Center Profile Y',
          address: 'Jalan Meru',
          city: 'Ipoh',
          state: 'Perak',
        },
      ],

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

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION2                            */
        /* -------------------------------------------------------------------------- */
        CONSULTANT_CATEGORY: null,
        CONSULTANT_STATUS: null,
        STAFF_POSITION: null,
        CMSRL: null,
        CMSRL_NO: null,
        CMSRL_EXPIRY_DATE: null,
        CMSRL_CERT_DOCS: null,
        RECRUITER_NRIC_NO: null,
        RECRUITER_CMSRL_NO: null,
        APPRENTICESHIP_DOCS: null,

        DISTRIBUTOR: null,
        LICENSE_TYPE: [],
        UTS: false, // not used in post methods
        PRS: false, // not used in post methods

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION3                            */
        /* -------------------------------------------------------------------------- */
        // exam

        PROFILE_UPLOADED_DOCUMENTS: [],

        COURSE_TYPE: '1',

        EXEMPTION_QUALIFIED: false,

        // EXEMPTION MODEL
        EXEMPTION_CATEGORY: null,
        STAFF_CEO_DOCS: null,
        STAFF_DIRECTOR_EXPERIENCE_YEARS: null,
        STAFF_DIRECTOR_DOCS: null,
        FUND_MANAGER_DOCS: null,
        FUND_MANAGER_CMSRL_NO: null,
        FUND_MANAGER_CMSRL_EXPIRY: null,
        FINANCIAL_PLANNER_ACTIVE_DOCS: null,
        FINANCIAL_PLANNER_FPAM_MODULE1_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_FPAM_MODULE3_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_FPAM_CFP_IFP_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_MFPC_MODULE1_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_MFPC_MODULE3_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_MFPC_MODULE6_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_MFPC_CERTIFIED_COMPLETION_DATE: null,
        FINANCIAL_PLANNER_MFPAA_COMPLETION_DATE: null,
        UNIT_TRUST_PRSFP_ATTENDANCE_CERT: null,
        INSURANCE_AGENT_CERT: null,
        DECLARATION_OF_CERT: null,

        EXAM_PREFERRED_STATE: null,
        EXAM_PREFERRED_SITE: null,
        EXAM_PREFERRED_DATE: null,
        EXAM_CENTRE_LOCATION: [],

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION4                            */
        /* -------------------------------------------------------------------------- */
        OTHER_DOCS: null,
        REGISTRATION_STATUS: null,
        PUBLISH_STATUS: null,
      },

      // // form 1 - select distributor

      currentRowClicked: '',

      examSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'EXAM_PREFERRED_STATE',
                label: 'State',
                placeholder: 'Select state',
                // required: true,
                // validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_STATE',
                  value: 'SETTING_GENERAL_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.statesAPI;
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'EXAM_PREFERRED_SITE',
                label: 'Exam Center',
                placeholder: 'Select Exam Center',
                // required: true,
                // validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'siteid',
                  label: 'sitename',
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

      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFILE_UPLOADED_DOCUMENTS',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },
  async created() {
    await this.getConsultantRecordByID(this.$route.params.id).then(res => {
      this.dataReady = true
    });
    await this.getAllStates();
    await this.getDocumentByID(this.$route.params.id); // Pass in consultant ID as params
    await this.getSite();
    await this.getExamCourses();
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

  computed: {
    states() {
      return this.statesAPI;
      // return [...new Set(this.postcodeAPI.map(el => el.STATE))];
    },
    filteredExamSessions() {
      const search = this.search.toLowerCase();
      if (this.search) {
        return this.examSessionsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.examSessionsAPI;
    },

    filteredExamSites() {
      if (this.model.EXAM_PREFERRED_STATE) {
        const preferredState = this.model.EXAM_PREFERRED_STATE.SET_STATE.toLowerCase();
        return this.examSitesAPI.filter(el => el.state.toLowerCase().match(preferredState));
      }
      return [];
    },

    isPreferencesSet() {
      const isState = this.model.EXAM_PREFERRED_STATE;
      const isSite = this.model.EXAM_PREFERRED_SITE;
      const isDate = this.model.EXAM_PREFERRED_DATE;

      console.log('isState: ', !!isState);
      console.log('isSite: ', !!isSite);
      console.log('isDate: ', !!isDate);
      if (!!isState && !!isSite && !!isDate) return true;

      return false;
    },

    candidateRegisterPreferenceParams() {
      return {
        applicationid: this.APPLICATION_ID,
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
        token: JSON.parse(localStorage.getItem('user')).access_token,
        // coursename: 'CUTE',
        // siteid: 'ASLC',
        // startfrom: '1624147200',
        coursename: this.model.COURSE_TYPE,
        siteid: this.model.EXAM_PREFERRED_SITE.siteid,
        startfrom: this.model.EXAM_PREFERRED_DATE.valueOf(),
      };
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    getConsultantRecordByID: async function(data) {
      const response = await services02module2.getConsultantByID(data);
      console.log(response);
      console.log('test', response.data);

      this.currentConsultant = response;

      console.log('LATEST', this.currentConsultant);

    },

    isExamSessionSelected(array, props) {
      return array.findIndex(el => el.sessionid === props.rowData.sessionid);
    },

    removeSelectedExamSession(props) {
      const index = this.isExamSessionSelected(this.model.EXAM_CENTRE_LOCATION, props);

      this.model.EXAM_CENTRE_LOCATION.splice(index, 1);
    },
    setSelectedExamSession(props) {
      const index = this.isExamSessionSelected(this.model.EXAM_CENTRE_LOCATION, props);
      if (index >= 0) return;
      if (this.model.EXAM_CENTRE_LOCATION.length >= 1) return;

      this.model.EXAM_CENTRE_LOCATION.push(props.rowData);

      console.log(this.model.EXAM_CENTRE_LOCATION);
    },

    isDatePicked() {
      console.log(`isdatepicked ${this.model.EXAM_PREFERRED_DATE}`, this.isPreferencesSet);

      if (this.isPreferencesSet) {
        console.log('yaaaaa');
        this.getExamListPreference(this.examListPreferenceParams);
      }
    },

    getExamCourses: async function() {
      try {
        // const response = await servicesmodule2.getExamCourses();
        const response = await servicesmodule2.getExamCoursesProxy();
      } catch (error) {
        console.log(error);
      }
    },

    getSite: async function() {
      try {
        // const response = await servicesmodule2.getSite();
        const response = await servicesmodule2.getSiteProxy();

        this.examSitesAPI = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    getExamListPreference: async function(data) {
      try {
        console.log('inside exam list preference');
        // const response = await servicesmodule2.getExamListPreference(data);

        const response = await servicesmodule2.getExamListPreferenceProxy(data);
        console.log('exam list preference:', response);
      } catch (error) {
        console.log(error);
      }
    },

    getDocumentByID: async function(data) {
      console.log('inside get consultant by id');
      const response = await services02module2.getConsultantByID(data);

      response.DOCUMENTS.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf');

        el.DOC_BLOB = new File([el.DOC_BLOB], el.DOC_ORIGINAL_NAME + '.' + el.DOC_FILETYPE, {
          type: el.DOC_BLOB.type,
        });

        const data = {
          name: el.DOC_ORIGINAL_NAME + '.' + el.DOC_FILETYPE,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        };

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
      });

      console.log('getConsultantRecords: ', this.model.PROFILE_UPLOADED_DOCUMENTS);
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      console.log(byteArrays);

      return new File(byteArrays, 'pot', { type: contentType });
    },
    onSubmitConsultant: async function() {
      console.log('Start function submit');
      this.$refs['declaration-personal-details'].show();
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

    // setSelectedExamSession(items) {
    //   if (items.length > 3) {
    //     this.$refs['selectableTable'].unselectRow(this.currentRowClicked);
    //   } else {
    //     this.selectedExamList = items;
    //   }
    // },

    /* -------------------------------------------------------------------------- */
    /*                               updatefunction                               */
    /* -------------------------------------------------------------------------- */

    onModelUpdated(newVal, schema) {
      // console.log(newVal);
      console.log(`schema: ${schema}`, 'value:', newVal);
      if (schema == 'CONSULTANT_CITIZEN') {
        if (newVal == 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema == 'CONSULTANT_NRIC_PHOTO') {
        console.log(newVal);
        console.log('NRIC_PHOTO', this.model.CONSULTANT_NRIC_PHOTO);
      } else if (schema == 'SPM_DOCS') {
        console.log(newVal);
        console.log('SPM_DOCS', typeof this.model.SPM_DOCS);
      } else if (schema == 'CONSULTANT_RACE') {
        if (newVal.name == 'OTHERS') {
          this.visibleOtherRace = true;
        } else {
          this.visibleOtherRace = false;
        }
      } else if (schema == 'CONSULTANT_HIGHEST_QUALIFICATION') {
        if (newVal.name.split(' ')[0] == 'SPM') {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name.split(' ')[0] == 'STPM') {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name == 'DIPLOMA') {
          this.showHighestEducationUploader(newVal);
        } else if (newVal.name == 'DEGREE') {
          this.showHighestEducationUploader(newVal);
        } else {
          this.showHighestEducationUploader(newVal);
        }
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
        this.model.CONSULTANT_CORRESPONDENT_POSTAL = newVal;
        return this.postcodeAPI.filter(el => {
          if (el.POSTCODE == newVal.POSTCODE) {
            this.model.CONSULTANT_CORRESPONDENT_CITY = el.CITY;
          }
        });
      } else if (schema == 'CONSULTANT_CORRESPONDENT_COUNTRY') {
        this.model.CONSULTANT_CORRESPONDENT_COUNTRY = newVal;
      } else if (schema == 'CONSULTANT_CORRESPONDENT_STATE') {
        this.model.CONSULTANT_CORRESPONDENT_STATE = newVal;
      } else if (schema == 'CONSULTANT_PERMANENT_POSTAL') {
        console.log(newVal);
        this.model.CONSULTANT_PERMANENT_POSTAL = newVal;
        return this.postcodeAPI.filter(el => {
          if (el.POSTCODE == newVal.POSTCODE) {
            this.model.CONSULTANT_PERMANENT_CITY = el.CITY;
          }
        });
      } else if (schema == 'CONSULTANT_CORRESPONDENT_COUNTRY') {
        this.model.CONSULTANT_CORRESPONDENT_COUNTRY = newVal;
      } else if (schema == 'CONSULTANT_PERMANENT_STATE') {
        this.model.CONSULTANT_PERMANENT_STATE = newVal;
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
      } else if (schema == 'CONSULTANT_CATEGORY') {
        if (newVal == 1) {
          // this.visibleConsultant = false;
          this.visibleCategoryStaff = true;
          // this.visibleCMSRL_Yes = true;
        } else {
          // this.visibleConsultant = true;
          this.visibleCategoryStaff = false;
          // this.visibleCMSRL_Yes = false;
        }
      } else if (schema == 'CMSRL') {
        if (newVal == 1) {
          this.visibleCMSRL_Yes = true;
          this.visibleCMSRL_No = false;
        } else {
          this.visibleCMSRL_Yes = false;
          this.visibleCMSRL_No = true;
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
        //   el.COURSE_TYPE_NAME.match('CPRE'),
        // ).CONSULTANT_COURSE_TYPE_ID;
      } else if (schema == 'UTS') {
        console.log(newVal);
      } else if (schema == 'PRS') {
        console.log(newVal);
      } else if (schema == 'EXEMPTION_CATEGORY') {
        console.log(schema, newVal);
        // this.visibleExemptionQualified = true;
        x;
      } else if (schema == 'EXAM_PREFERRED_STATE') {
        this.model.EXAM_PREFERRED_STATE = newVal;

        if (!this.filteredExamSites.length) this.model.EXAM_PREFERRED_SITE = null;

        console.log('EXAM_PREFERRED_STATE: ', this.isPreferencesSet);
        if (this.isPreferencesSet) {
          console.log('yaaaaa');
          console.log(this.examListPreferenceParams);
          this.getExamListPreference(this.examListPreferenceParams);
        }

        // this.visibleExemptionQualified = true;
      } else if (schema == 'EXAM_PREFERRED_SITE') {
        this.model.EXAM_PREFERRED_SITE = newVal;
        console.log('EXAM_PREFERRED_SITE: ', this.isPreferencesSet);

        if (this.isPreferencesSet) {
          console.log('yaaaaa');
          console.log(this.examListPreferenceParams);

          this.getExamListPreference(this.examListPreferenceParams);
        }
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */

    async getAllStates() {
      try {
        const states = await SettingGeneral.getAllStates();
        this.statesAPI = states.data.data;
      } catch (error) {
        console.log(error);
      }
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
