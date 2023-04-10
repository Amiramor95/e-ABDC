<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <va-card>
            <form-wizard
              @on-complete="onComplete"
              color="#FF5050"
              error-color="#a94442"
              finish-button-text="Submit"
              ref="wizardForm"
            >
              <h3 slot="title"></h3>
              <!-- section 1 -->
              <tab-content
                icon="fa fa-user"
                title="1. Personal Particulars of Applicant"
                :before-change="beforeTab1Switch"
              >
                <br /><br />
                <vue-form-generator
                  :model="model"
                  :schema="tabSchema1"
                  :options="formOptions"
                  ref="tabForm1"
                  @model-updated="onModelUpdated"
                >
                  <!-- @validated="onValidated" -->
                </vue-form-generator>
                <br />
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
                <br />
                <div style="display:flex; align-items:center" class="ml-3">
                  <h5>Permanent Address</h5>
                  <div style="margin-left: 20px; align-items:center">
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
              </tab-content>
              <!-- section 2 -->
              <tab-content
                icon="fa fa-info"
                title="2. Type of Consultant"
                :before-change="beforeTab2Switch"
              >
                <br />
                <br />
                <vue-form-generator
                  :model="model"
                  :schema="tabSchema4"
                  :options="formOptions"
                  ref="tabForm4"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
                <br />
                <br />

                <div class="ml-3">
                  <h5>Choose your preferred distributor :</h5>
                </div>
                <br />
                <!-- <va-card> -->
                <div>
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema5"
                    :options="formOptions"
                    ref="tabForm5"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                </div>

                <!-- <div class="float-right">
                    <button
                      @click="accept"
                      type="button"
                      class="ml-1 btn btn-success btn-fill btn-md"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Accept
                    </button>
                  </div> -->
                <!-- </va-card> -->
              </tab-content>
              <!-- section 3 -->
              <tab-content
                icon="fa fa-tasks"
                title="3. Examination"
                :before-change="beforeTab3Switch"
              >
                <br />
                <br />
                <div>
                  <h6 style="margin-bottom:15px;">EXAMINATION TYPE</h6>

                  <!-- <ul id="example-1">
                    <li v-for="item in examType" :key="item.CONSULTANT_EXAM_TYPE_ID">
                      {{ item.EXAM_TYPE_NAME }}
                    </li>
                  </ul> -->

                  <p style="margin-bottom:20px" v-if="this.model.UTS">CUTE</p>
                  <p style="margin-bottom:20px" v-if="this.model.PRS">CPRE</p>

                  <input
                    type="checkbox"
                    id="allow-exemption"
                    name="allow-exemption"
                    v-model="visibleExemptionQualified"
                    @change="setIsExemptionQualified"
                  />

                  <label style="margin-left: 10px; margin-bottom:none" for="allow-exemption">
                    I am Qualified for Exemption</label
                  >
                  <br />
                  <br />
                  <br />
                </div>

                <vue-form-generator
                  v-if="visibleExemptionQualified"
                  :model="model"
                  :schema="exemptionSchema"
                  :options="formOptions"
                  ref="fourthTabForm"
                  @model-updated="onExemptionModelUpdated"
                ></vue-form-generator>

                <vue-form-generator
                  :model="model"
                  :schema="examSchema"
                  :options="formOptions"
                  ref="fourthTabForm"
                  @model-updated="onModelUpdated"
                ></vue-form-generator>
                <br />
                <!-- selected exam table -->
                <!-- style="border:1px solid red" -->

                <va-card v-if="!visibleExemptionQualified">
                  <div class="row float-right">
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
                  <br />
                  <br />
                  <div v-if="viewType == 1" class="col-3">
                    <div
                      style="display:flex; align-items:center"
                      class="form-group form-group-sm has-search"
                    >
                      <span
                        style="margin-right:20px"
                        class="fa fa-search form-control-feedback"
                      ></span>
                      <input
                        v-model="filter"
                        type="text"
                        class="form-control"
                        placeholder="Search"
                      />
                    </div>
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
                    <small>* Choose 3 exam sessions</small>
                    <b-table
                      v-if="viewType == 1"
                      hover
                      selectable
                      no-select-on-click
                      :items="examTimetableList"
                      :fields="examTableFields"
                      :current-page="currentPage"
                      :per-page="perPage"
                      :filter="filter"
                      responsive="md"
                      ref="selectableTable"
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                      <template #cell()="data">
                        <span class="description">{{ data.value }}</span>
                      </template>
                      <template #cell(ACTION)="data">
                        <h4 @click="setSelectedExamSession(data)" style="margin:0; font-size:20px">
                          <span class="badge badge-success mr-1">
                            <i class="fa fa-plus"></i>
                          </span>
                        </h4>
                      </template>
                    </b-table>
                  </div>
                  <div class="row col ml-2 mt-2">
                    <b-pagination
                      size="md"
                      :total-rows="examTimetableList.length"
                      :per-page="perPage"
                      v-model="currentPage"
                    />
                    <b-form-fieldset horizontal class="col-1">
                      <b-form-select
                        :options="[
                          { text: 3, value: 3 },
                          { text: 5, value: 5 },
                          { text: 10, value: 10 },
                          { text: 15, value: 15 },
                        ]"
                        v-model="perPage"
                      >
                      </b-form-select>
                    </b-form-fieldset>
                  </div>
                </va-card>

                <va-card v-if="!visibleExemptionQualified && this.SELECTED_EXAM_SESSION.length">
                  <small>* Selected Exam List</small>
                  <b-table
                    v-if="viewType == 1"
                    hover
                    :items="SELECTED_EXAM_SESSION"
                    :fields="examTableFields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    responsive="md"
                  >
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell()="data">
                      <span class="description">{{ data.value }}</span>
                    </template>
                    <template #cell(ACTION)="data">
                      <h4 @click="removeSelectedExamSession(data)" style="margin:0; font-size:20px">
                        <span class="badge badge-danger mr-1">
                          <i class="fa fa-minus"></i>
                        </span>
                      </h4>
                    </template>
                  </b-table>
                </va-card>
              </tab-content>
              <!-- section 4 -->
              <tab-content icon="fa fa-folder" title="4. Other Document">
                <br />
                <br />
                <vue-form-generator
                  :model="model"
                  :schema="tabSchema7"
                  :options="formOptions"
                  ref="tabForm7"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>

                <b-modal
                  ref="declaration-personal-details"
                  :hide-header="true"
                  :hide-header-close="true"
                >
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
                      <button
                        type="button"
                        class="ml-2 btn btn-primary btn-fill btn-md"
                        @click="onSubmitDeclaration"
                      >
                        Submit
                      </button>
                    </div>
                  </template>
                </b-modal>

                <br /><br /><br />
              </tab-content>

              <br />
              <br />
              <!-- button -->
              <template slot="footer" slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }">
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
                    :disabled="model.DIST_PUBLISH_STATUS"
                    @click="submit(1)"
                    type="button"
                    class="btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>
                  <!-- <button
                    v-if="isLastStep"
                    @click="showmodal"
                    type="button"
                    class="ml-2 btn b,tn-warning btn-fill btn-md"
                  >
                    <i class="fa fa-play-circle" /> &nbsp;Preview
                  </button> -->
                  <button
                    v-if="!isLastStep"
                    @click="nextTab"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Next &nbsp; <i class="fa fa-step-forward" />
                  </button>
                  <button
                    v-if="isLastStep"
                    @click="onSubmitConsultant"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> Submit
                  </button>
                  <!-- <button
                    v-if="isLastStep"
                    @click="processPreferences"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Payment Verified
                  </button> -->
                </div>
              </template>
            </form-wizard>
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
import HorizontalScroll from 'vue-horizontal-scroll';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import * as services06Module0 from '../../../app/module0/services06';
import moment from 'moment';
import { parse } from 'vue-currency-input';
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import { getAllExamTypeList } from '../../../app/module0/services02';
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
const ConsultantExamSession = RepositoryFactory.get('consultantexamsession');
// const ConsultantExamType = RepositoryFactory.get('consultantexamtype');
const SettingPostcode = RepositoryFactory.get('settingpostcode');
const SettingGeneral = RepositoryFactory.get('settinggeneral');
const DistributorRecords = RepositoryFactory.get('distributorrecords');
const DistributorType = RepositoryFactory.get('distributortype');

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    value: File,
  },
  async mounted() {
    // await this.getExamCourses();
    // this.getSite();
    // this.getExamListPreference();
    // this.getProcessPreference();
    await this.getAllPostcodes();
    await this.getAllCountries();
    await this.getDistributorRecords();
    await this.getDistributorType();
    await this.getAllStates();
    //await this.getCurrentConsultant();

    // await this.getAllConsultantExamSessions();
    // await this.getAllConsultantExamType();
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
  /* -------------------------------------------------------------------------- */
  /*                                  startdata                                 */
  /* -------------------------------------------------------------------------- */
  data() {
    return {
      // examSchema: true,

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

      //* ***************************************** */
      // section 1
      citizenship: [
        { name: 'MALAYSIAN', value: '1', selected: true },
        { name: 'NON-MALAYSIAN', value: '2' },
      ],
      countriesAPI: [
        { name: 'AFGHANISTAN' },
        {
          name: 'UNITED STATES',
        },
        { name: 'BANGLADESH' },
        {
          name: 'DENMARK',
        },
      ],
      CONSULTANT_GENDER: [
        { name: 'MALE', value: '1' },
        { name: 'FEMALE', value: '2' },
      ],
      race: [
        { name: 'MALAY', id: '1' },
        { name: 'CHINESE', id: '2' },
        { name: 'INDIAN', id: '3' },
        { name: 'OTHERS', id: '4' },
      ],
      qualification: [
        { name: 'SPM OR SPM EQUIVALENT', id: '1' },
        { name: 'STPM OR STPM EQUIVALENT', id: '2' },
        { name: 'DIPLOMA', id: '3' },
        { name: 'DEGREE', id: '4' },
        { name: 'PROFESSIONAL CERTIFICATES', id: '5' },
      ],
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
      current_consultant: null,
      cityAPI: [],
      copyCorrespondence: false,
      // section 2
      category: [
        { name: 'Staff', value: '1' },
        { name: 'Consultant', value: '2' },
      ],
      cmsrl: [
        { name: 'Yes', value: '1' },
        { name: 'No', value: '2' },
      ],

      distributor: [
        { id: '1', name: 'ENG JIA SECURITIES SDN BHD', registration_type: 'UTS' },
        { id: '4', name: 'HONG LEONG ASSET FUND MANAGEMENT BHD', registration_type: 'PTS' },
      ],
      uts: [{ name: 'UNIT TRUST SCHEME CONSULTANT', value: '1' }],
      prs: [{ name: 'PRIVATE RETIREMENT SCHEME CONSULTANT', value: '2' }],

      // exam
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
      currentPageSelected: 1,
      perPageSelected: 5,
      filterSelected: null,
      examTableFields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'examDate', label: 'Exam Date' },
        { key: 'sessionTime', label: 'Session Time' },
        { key: 'day', label: 'Day' },
        { key: 'centreName', label: 'Centre Name' },
        { key: 'centreLocation', label: 'Centre Location' },
        { key: 'availableSit', label: 'Available Sit' },
        { key: 'ACTION', label: 'Action' },
      ],
      SELECTED_EXAM_SESSION: [],
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

      exemptionCategory: [
        {
          name: 'CEO',
          value: 'STAFF_CEO',
          id: '1',
        },
        {
          name: 'DIRECTORS',
          value: 'STAFF_DIRECTOR',
          id: '2',
        },
        {
          name: 'FUND MANAGER',
          value: 'FUND_MANAGER',
          id: '3',
        },
        {
          name: 'FINANCIAL PLANNER',
          value: 'FINANCIAL_PLANNER',
          id: '4',
        },
        {
          name: 'PRS FAMILIARISATION PROGRAM (PRSFP) - Insurance Agent',
          value: 'INSURANCE_AGENT',
          id: '5',
        },
        {
          name: 'PRS FAMILIARISATION PROGRAM (PRSFP) - Unit Trust Consultant',
          value: 'UNIT_TRUST',
          id: '6',
        },
      ],
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

      TAB1_REQUIRED: [
        'APPLICATION_ID',
        'APPLICANT_NAME',
        'CONSULTANT_CITIZENSHIP',
        'CONSULTANT_NRIC',
        'CONSULTANT_NRIC_OLD',
        'CONSULTANT_PASSPORT_NO',
        'CONSULTANT_PASSPORT_EXPIRY_NO',
        'CONSULTANT_NRIC_PHOTO',
        'CONSULTANT_PASSPORT_PHOTO',
        'CONSULTANT_GENDER',
        'CONSULTANT_DOB',
        'CONSULTANT_RACE',
        'CONSULTANT_OTHER_RACE',
        'CONSULTANT_MOBILE_NO',
        'CONSULTANT_HOUSE_NO',
        'CONSULTANT_EMAIL',
        'CONSULTANT_HIGHEST_QUALIFICATION',
        'MATH',
        'OTHER_SUBJECT',
        'LANGUAGE',
        'SPM_DOCS',
        'STPM_DOCS',
        'DIPLOMA_DOCS',
        'DEGREE_DOCS',
        'DEGREE_MAJOR',
        'DEGREE_MINOR',
        'PROFESSIONAL_CERTIFICATE',
        'PROFESSIONAL_CFP_DOCS',
        'CONSULTANT_CORRESPONDENT_COUNTRY',
        'CONSULTANT_CORRESPONDENT_STATE',
        'CONSULTANT_CORRESPONDENT_CITY',
        'CONSULTANT_CORRESPONDENT_POSTAL',
        'CONSULTANT_CORRESPONDENT_ADDR1',
        'CONSULTANT_CORRESPONDENT_ADDR2',
        'CONSULTANT_CORRESPONDENT_ADDR3',
        'CONSULTANT_PERMANENT_COUNTRY',
        'CONSULTANT_PERMANENT_STATE',
        'CONSULTANT_PERMANENT_CITY',
        'CONSULTANT_PERMANENT_POSTAL',
        'CONSULTANT_PERMANENT_ADDR1',
        'CONSULTANT_PERMANENT_ADDR2',
        'CONSULTANT_PERMANENT_ADDR3',
      ],

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
        APPLICATION_ID: '',
        APPLICANT_NAME: '',
        CONSULTANT_CITIZENSHIP: '',
        CONSULTANT_NRIC: '',
        CONSULTANT_NRIC_OLD: '',
        CONSULTANT_PASSPORT_NO: '',
        CONSULTANT_PASSPORT_EXPIRY_NO: '',
        CONSULTANT_NRIC_PHOTO: Blob,
        CONSULTANT_PASSPORT_PHOTO: '',
        CONSULTANT_GENDER: '',
        CONSULTANT_DOB: '',
        CONSULTANT_RACE: '',
        CONSULTANT_OTHER_RACE: '',
        CONSULTANT_MOBILE_NO: '',
        CONSULTANT_HOUSE_NO: '',
        CONSULTANT_EMAIL: '',
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

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION2                            */
        /* -------------------------------------------------------------------------- */
        CATEGORY: '',
        STAFF_POSITION: '',
        CMSRL: '',
        CMSRL_NO: '',
        CMSRL_EXPIRY_DATE: '',
        CMSRL_CERT_DOCS: '',
        RECRUITER_NRIC_NO: '',
        RECRUITER_CMSRL_NO: '',
        APPRENTICESHIP_DOCS: '',

        DISTRIBUTOR: '',
        // REGISTRATION_TYPE: [],
        UTS: '',
        PRS: '',

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION3                            */
        /* -------------------------------------------------------------------------- */
        // exam
        // applicationType: '',

        EXEMPTION_QUALIFIED: false,

        EXEMPTION_MODEL: {
          EXEMPTION_CATEGORY: '',
          STAFF_CEO_DOCS: '',
          STAFF_DIRECTOR_EXPERIENCE_YEARS: '',
          STAFF_DIRECTOR_DOCS: '',
          FUND_MANAGER_DOCS: '',
          FUND_MANAGER_CMSRL_NO: '',
          FUND_MANAGER_CMSRL_EXPIRY: '',
          FINANCIAL_PLANNER_ACTIVE_DOCS: '',
          FINANCIAL_PLANNER_FPAM_MODULE1_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_FPAM_MODULE3_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_FPAM_CFP_IFP_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_MFPC_MODULE1_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_MFPC_MODULE3_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_MFPC_MODULE6_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_MFPC_CERTIFIED_COMPLETION_DATE: '',
          FINANCIAL_PLANNER_MFPAA_COMPLETION_DATE: '',
          UNIT_TRUST_PRSFP_ATTENDANCE_CERT: '',
          INSURANCE_AGENT_CERT: [],
          DECLARATION_OF_CERT: '',
        },

        EXAM_STATE: '',
        EXAM_PREFERRED_DATE: '',
        EXAM_LOCATION: [],

        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION4                            */
        /* -------------------------------------------------------------------------- */
        OTHER_DOCS: '',
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
              //   label: 'FIRST NAME',
              //   model: 'CONSULTANT_FIRST_NAME',
              //   placeholder: 'Enter First Name',
              //   required: true,
              //   validator: 'string',
              //   styleClasses: 'col-md-4 ',
              //   cleaveOptions: { blocks: [0, 9999], uppercase: true },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'MIDDLE NAME',
              //   model: 'CONSULTANT_MIDDLE_NAME',
              //   placeholder: 'Enter Middle Name',
              //   required: true,
              //   validator: 'string',
              //   styleClasses: 'col-md-4',
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'LAST NAME',
              //   model: 'CONSULTANT_LAST_NAME',
              //   placeholder: 'Enter Last Name',
              //   required: true,
              //   validator: 'string',
              //   styleClasses: 'col-md-4',
              // },
              {
                type: 'input',
                inputType: 'text',
                label: 'Application ID',
                model: 'APPLICATION_ID',
                placeholder: 'Enter Application ID',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
                // cleaveOptions:
                // uppercase: true,
                // cleaveOptions: { blocks: [0, 9999], uppercase: true },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Applicant Name',
                model: 'APPLICANT_NAME',
                placeholder: 'Enter your name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
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
                type: 'radios',
                label: 'Citizenship',
                model: 'CONSULTANT_CITIZENSHIP',
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: 'col-md-4 display-inline text-uppercase',
              },
              {
                type: 'vfg-the-mask',
                labels: 'New NRIC Number',
                model: 'CONSULTANT_NRIC',
                required: true,
                placeholder: 'Enter NRIC Number',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Old NRIC Number',
                model: 'CONSULTANT_NRIC_OLD',
                placeholder: 'Enter old NRIC number',
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase text-uppercase',
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
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },
              {
                labels: 'Passport Expiry Date',
                type: 'vfg-functional-date',
                placeholder: 'Passport expiry date',
                model: 'CONSULTANT_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
                required: true,
              },
              // {
              //   type: 'vueMultiSelect',
              //   model: 'CONSULTANT_COUNTRY',
              //   label: 'Country Name',
              //   placeholder: 'Enter origin country',
              //   required: true,
              //   validator: 'required',
              //   styleClasses: 'col-md-4',
              //   selectOptions: {
              //     multiple: false,
              //     searchable: true,
              //   },
              //   visible: (model, field, form) => {
              //     return this.visiblePassport;
              //   },
              //   values: (model, schema) => {
              //     return this.countries;
              //   },
              // },
              {
                labels: 'Upload NRIC Photo (Front and Back)',
                text: 'Choose a File',
                model: 'CONSULTANT_NRIC_PHOTO',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
              },

              {
                labels: 'Upload Passport Photo',
                text: 'Choose a File',
                model: 'CONSULTANT_PASSPORT_PHOTO',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
                required: true,
              },
              {
                type: 'radios',
                label: 'Gender',
                model: 'CONSULTANT_GENDER',
                required: true,
                values: () => {
                  return this.CONSULTANT_GENDER;
                },
                styleClasses: 'col-md-4 display-inline',
              },
              {
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
                type: 'vueMultiSelect',
                model: 'CONSULTANT_RACE',
                label: 'Race',
                placeholder: 'Enter race',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.race;
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
                  return this.visibleOtherRace;
                },
              },
              {
                labels: 'Mobile Phone Number',
                model: 'CONSULTANT_MOBILE_NO',
                type: 'vfg-the-mask',
                placeholder: 'Enter telephone number',
                mask: '01#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
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
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_HIGHEST_QUALIFICATION',
                label: 'Highest Qualification',
                placeholder: 'Enter highest qualification',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.qualification;
                },
              },
              {
                labels: 'Upload Supported Document For SPM or SPM Equivalent Qualification',
                text: 'Choose A FILE',
                model: 'SPM_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.SPM;
                },
              },
              {
                labels: 'Upload Supported Document For STPM Or STPM Equivalent Qualification',
                text: 'Choose A FILE',
                model: 'STPM_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleEducation.STPM;
                },
              },
              {
                labels: 'Upload Supported Document For Diploma',
                text: 'Choose a File',
                model: 'DIPLOMA_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleEducation.DIPLOMA;
                },
              },
              {
                labels: 'Upload Supported Document For Degree Qualification',
                text: 'Choose a File',
                model: 'DEGREE_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Major in',
                model: 'DEGREE_MAJOR',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Minor in',
                model: 'DEGREE_MINOR',
                placeholder: 'Please specify',
                validator: 'string',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                styleClasses: 'col-md-4 ',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'PROFESSIONAL_CERTIFICATE',
                label: 'Professional Certificate',
                placeholder: 'Enter professional certificate',
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
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
                labels: 'Upload Supported Document For Professional Certificate',
                text: 'Choose a File',
                model: 'PROFESSIONAL_CFP_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL_CFP;
                },
              },
              {
                type: 'radios',
                label: 'Credit in Mathemathic',
                model: 'MATH',
                required: true,
                values: () => {
                  return this.math;
                },
                styleClasses: 'col-md-4 display-inline',
              },
              {
                type: 'vueMultiSelect',
                model: 'OTHER_SUBJECT',
                label: 'Credit Other Subject',
                placeholder: 'Enter credit other subject',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4 ',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.subject;
                },
              },

              {
                type: 'vueMultiSelect',
                model: 'LANGUAGE',
                label: 'Credit in Language',
                placeholder: 'Enter credit in language',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.language;
                },
              },

              {
                visible: (model, field, form) => {
                  return !this.visibleOtherLanguage;
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other Language',
                model: 'OTHER_LANGUAGE',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6 text-uppercase',
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
                type: 'input',
                inputType: 'text',
                label: 'City',
                model: 'CONSULTANT_CORRESPONDENT_CITY',
                placeholder: 'Enter city',
                styleClasses: 'col-md-6 text-uppercase',
                required: true,
                validator: 'required',
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
                  // key: 'id',
                  // label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states;
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
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  // if (this.postcode.POSTCODE) return this.postcode.POSTCODE;
                  return this.postcode;
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
                type: 'vueMultiSelect',
                model: 'CONSULTANT_PERMANENT_STATE',
                label: 'State',
                placeholder: 'Enter state',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6 text-uppercase',
                selectOptions: {
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states;
                },
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'City',
                model: 'CONSULTANT_PERMANENT_CITY',
                placeholder: 'Enter city',
                styleClasses: 'col-md-6 ',
                required: true,
                validator: 'required',
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
                  multiple: false,

                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode;
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
            ],
          },
        ],
      },

      // section 2
      tabSchema4: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'radios',
                model: 'CATEGORY',
                required: true,
                values: () => {
                  return this.category;
                },
                styleClasses: 'col-md-7 display-inline',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Position',
                model: 'STAFF_POSITION',
                placeholder: 'Enter your position',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
              {
                type: 'radios',
                label: 'CMSRL',
                model: 'CMSRL',
                required: true,
                values: () => {
                  return this.cmsrl;
                },
                styleClasses: 'col-md-12 display-inline',
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'CMSRL No',
                model: 'CMSRL_NO',
                placeholder: 'Enter CMRSL Number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                type: 'input',
                inputType: 'date',
                label: 'CMSRL Expiry Date',
                model: 'CMSRL_EXPIRY_DATE',
                placeholder: 'Enter CMSRL expiry date',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },
              {
                labels: 'Upload CMSRL Certificate',
                text: 'Choose a File',
                model: 'CMSRL_CERT_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                labels: 'Recruiter NRIC Number',
                model: 'RECRUITER_NRIC_NO',
                type: 'vfg-the-mask',
                placeholder: 'Enter Recruiter NRIC',
                mask: '######-##-####',
                styleClasses: 'col-md-6 ',
                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) && this.visibleCategoryStaff
                  );
                },
                required: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Recruiter CMSRL Number',
                model: 'RECRUITER_CMSRL_NO',
                placeholder: 'Enter Recruiter CMRSL Number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) && this.visibleCategoryStaff
                  );
                },
              },

              {
                labels: 'Apprenticenship Program',
                text: 'Choose a File',
                model: 'APPRENTICESHIP_DOCS',
                type: 'vfg-custom-file',
                styleClasses: 'col-md-12',
                visible: (model, field, form) => {
                  return this.visibleCMSRL_No && this.visibleCategoryStaff;
                },
                hint:
                  'Upload Certificate from any Module 1 CFP/IFP/RFP/shariah RFP or Exemption Letter from FPAM',
              },

              // {
              //   type: 'radios',
              //   label: 'CMSRL',
              //   model: 'CMSRL',

              //   required: true,
              //   values: () => {
              //     return this.cmsrl;
              //   },
              //   styleClasses: 'col-md-3 display-inline',
              //   visible: (model, field, form) => {
              //     return this.visibleCMSRL_Yes;
              //   },
              // },
            ],
          },
        ],
      },
      // tabSchema4: {
      //   groups: [
      //     {
      //       styleClasses: 'row',
      //       fields: [
      //         {
      //           type: 'radios',
      //           model: 'CATEGORY',
      //           required: true,
      //           values: () => {
      //             return this.category;
      //           },
      //           styleClasses: 'col-md-7 display-inline',
      //         },
      //         {
      //           type: 'input',
      //           inputType: 'text',
      //           label: 'Position',
      //           model: 'position',
      //           placeholder: 'Enter your position',
      //           required: true,
      //           validator: 'string',
      //           styleClasses: 'col-md-12',
      //           visible: (model, field, form) => {
      //             return this.visibleCategoryStaff;
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
      // form 1 - select distributor
      tabSchema5: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'DISTRIBUTOR',
                label: 'List of Distributor',
                placeholder: 'Enter distributor',
                // required: true,
                // validator: "required",
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'DISTRIBUTOR_ID',
                  label: 'DIST_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distributor;
                },
              },
              {
                type: 'radios',
                label: 'Your Registration Type',
                model: 'UTS',
                required: true,
                values: () => {
                  return this.uts;
                },
                styleClasses: 'col-md-6 display-inline',
                visible: (model, field, form) => {
                  return this.visibleUTS;
                },
              },
              {
                type: 'radios',
                label: 'Your Registration Type',
                model: 'PRS',
                required: true,
                values: () => {
                  return this.prs;
                },
                styleClasses: 'col-md-6 display-inline',
                visible: (model, field, form) => {
                  return this.visiblePRS;
                },
              },
            ],
          },
        ],
      },

      // // form 1 - select distributor
      // tabSchema5: {
      //   groups: [
      //     {
      //       styleClasses: 'row',
      //       fields: [
      //         {
      //           type: 'vueMultiSelect',
      //           model: 'DISTRIBUTOR',
      //           label: 'List of Distributor',
      //           placeholder: 'Enter distributor',
      //           // required: true,
      //           // validator: "required",
      //           styleClasses: 'col-md-12',
      //           selectOptions: {
      //             multiple: false,
      //             key: 'DISTRIBUTOR_ID',
      //             label: 'DIST_NAME',
      //             searchable: true,
      //           },
      //           values: (model, schema) => {
      //             return this.distributor;
      //           },
      //         },
      //         {
      //           type: 'radios',
      //           label: 'Your Registration Type',
      //           model: 'UTS',
      //           required: true,
      //           values: () => {
      //             return this.uts;
      //           },
      //           styleClasses: 'col-md-6 display-inline',
      //           visible: (model, field, form) => {
      //             return this.visibleUTS;
      //           },
      //         },
      //         {
      //           type: 'radios',
      //           label: 'Your Registration Type',
      //           model: 'PRS',
      //           required: true,
      //           values: () => {
      //             return this.prs;
      //           },
      //           styleClasses: 'col-md-6 display-inline',
      //           visible: (model, field, form) => {
      //             return this.visiblePRS;
      //           },
      //         },
      //         {
      //           type: 'radios',
      //           label: 'CMSRL',
      //           model: 'CMSRL',
      //           required: true,
      //           values: () => {
      //             return this.cmsrl;
      //           },
      //           styleClasses: 'col-md-12 display-inline',
      //         },
      //         {
      //           type: 'input',
      //           inputType: 'text',
      //           label: 'CMSRL No',
      //           model: 'cmsrlNo',
      //           placeholder: 'Enter CMRSL Number',
      //           required: true,
      //           validator: 'string',
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes;
      //           },
      //         },
      //         {
      //           labels: 'Upload CMSRL Certificate',
      //           text: 'Choose a File',
      //           model: 'cmsrlFile',
      //           type: 'vfg-custom-file',
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes;
      //           },
      //         },
      //         {
      //           type: 'input',
      //           inputType: 'date',
      //           label: 'CMSRL Expiry Date',
      //           model: 'cmsrlExpDate',
      //           placeholder: 'Enter CMSRL expiry date',
      //           format: 'YYYY-MM-DD HH:mm:ss',
      //           required: true,
      //           validator: 'string',
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes;
      //           },
      //         },
      //         {
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes;
      //           },
      //         },
      //         {
      //           labels: 'Apprenticenship Program',
      //           text: 'Choose a File',
      //           model: 'moduleFile',
      //           type: 'vfg-custom-file',
      //           styleClasses: 'col-md-12',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_No;
      //           },
      //           hint:
      //             'Upload Certificate from any Module 1 CFP/IFP/RFP/shariah RFP or Exemption Letter from FPAM',
      //         },
      //         {
      //           labels: 'Recruiter NRIC',
      //           model: 'recruiterNricNo',
      //           type: 'vfg-the-mask',
      //           placeholder: 'Enter Recruiter NRIC',
      //           mask: '######-##-####',
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes || this.visibleCMSRL_No;
      //           },
      //           required: true,
      //         },
      //         {
      //           type: 'input',
      //           inputType: 'text',
      //           label: 'Recruiter CMSRL No',
      //           model: 'recruiterCmsrlNo',
      //           placeholder: 'Enter Recruiter CMRSL Number',
      //           required: true,
      //           validator: 'string',
      //           styleClasses: 'col-md-6',
      //           visible: (model, field, form) => {
      //             return this.visibleCMSRL_Yes || this.visibleCMSRL_No;
      //           },
      //         },
      //         // {
      //         //   type: 'radios',
      //         //   label: 'CMSRL',
      //         //   model: 'CMSRL',

      //         //   required: true,
      //         //   values: () => {
      //         //     return this.cmsrl;
      //         //   },
      //         //   styleClasses: 'col-md-3 display-inline',
      //         //   visible: (model, field, form) => {
      //         //     return this.visibleCMSRL_Yes;
      //         //   },
      //         // },
      //       ],
      //     },
      //   ],
      // },

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
                  return this.statesAPI;
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'centerExam',
                label: 'Exam Center',
                placeholder: 'Enter Exam Center',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'siteid',
                  label: 'sitename',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.centerExam;
                },
                // visible: (model, field, form) => {
                //   return this.showExamDate
                // },
              },
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
                  return this.exemptionCategory;
                },
                visible: (model, field, form) => {
                  return this.visibleExemptionQualified;
                },
              },
              {
                styleClasses: 'col-md-6',

                visible: (model, field, form) => {
                  return this.visibleExemptionQualified;
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
                  return this.visibleExemption.STAFF_CEO;
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
                  return this.visibleExemption.STAFF_DIRECTOR;
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
                  return this.visibleExemption.STAFF_DIRECTOR;
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
                  return this.visibleExemption.FUND_MANAGER;
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
                  return this.visibleExemption.FUND_MANAGER;
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
                  return this.visibleExemption.FUND_MANAGER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: 'label',
                label: 'a) FPAM -CFP/IFP/Both',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: 'label',
                label: 'b) MFPC',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: 'label',
                label: 'i) RFP/Shariah RFP - Partial Completion',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
                },
              },
              {
                type: 'label',
                label: 'c) MFPAA',
                visible: (model, field, form) => {
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.FINANCIAL_PLANNER;
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
                  return this.visibleExemption.UNIT_TRUST;
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
                  return this.insuranceAgentCertificates;
                },

                visible: (model, field, form) => {
                  return this.visibleExemption.INSURANCE_AGENT;
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

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    // getExamCourses: async function() {
    //   const response = await this.getExamCourses();
    //   this.examCourses = respone;
    //   console.log(this.examCourses);
    // },
    copyCorrespondenceToPermanent() {
      const varName = ['COUNTRY', 'STATE', 'CITY', 'POSTAL', 'ADDR1', 'ADDR2', 'ADDR3'];

      if (this.copyCorrespondence) {
        varName.forEach(el => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = this.model[`CONSULTANT_CORRESPONDENT_${el}`];
        });
      } else {
        varName.forEach(el => {
          this.model[`CONSULTANT_PERMANENT_${el}`] = '';
        });
      }
    },
    accept: async function() {},
    onComplete() {
      alert(JSON.stringify(this.model));
    },
    beforeTab1Switch() {
      console.log(this.model);
      // let form1 = this.$refs.tabForm1.validate();
      // let form2 = this.$refs.tabForm2.validate();
      // let form3 = this.$refs.tabForm3.validate();
      // return form1 && form2 && form3;
      return true;
    },
    beforeTab2Switch() {
      console.log(this.model);
      // let form4 = this.$refs.tabForm4.validate();
      // let form5 = this.$refs.tabForm5.validate();
      //  return form4 && form5
      return true;
    },
    beforeTab3Switch() {
      console.log(this.model);
      // this.$refs.fourthTabForm.validate();
      //  return fourthTabForm
      return true;
    },

    nextTab: async function() {
      console.log('Test');
      const returnresponse = await services02module2.postRegisterConsultant(this.model);
    },

    // onValidated(isValid, errors) {
    //   console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    // },

    onSubmitDeclaration: async function() {
      console.log(this.visibleModal.DECLARATION_OF_PERSONAL_DETAILS);
      this.visibleModal.DECLARATION_OF_PERSONAL_DETAILS = true;
      console.log(this.visibleModal.DECLARATION_OF_PERSONAL_DETAILS);
      if (confirm('Declaring that the details inserted is correct ? ')) {
        const fs = require('fs');
        var candidate = {
          APPLICATION_ID: 136,
          companycode: 'ASB01',
          companyname: 'Amanah Saham Bumiputra',
          coursename: 'CUTE',
          email: 'asyraf.matrozai@araken.biz',
          name: 'NoorHidayah Binti Mohd Faizal',
          idnumber: '890408035156',
          mobile: '+60142310327',
          sessionid1: 232,
          sessionid2: 237,
          sessionid3: 238,
        };
        // var candidate = {"APPLICATION_ID": 131 ,"companycode": "ASB01","companyname": "Amanah Saham Bumiputra","coursename": "CUTE","email": "johari@fimm.com.my","name": "Muhamad Khairul Bin Azhar","idnumber": "930121105532","mobile": "+601121253742","sessionid": 220};
        let txtdata = new FormData();
        let data = new FormData();
        let imageblob = this.model.CONSULTANT_NRIC_PHOTO;
        console.log(this.model.CONSULTANT_NRIC_PHOTO);
        // let imgphoto = new File(this.model.CONSULTANT_NRIC_PHOTO, 'image3.png');
        // console.log(imgphoto);
        console.log(candidate);
        const datajson = JSON.stringify(candidate);
        const datablob = new Blob([datajson], { type: 'application/json' });
        // data.append('imagefile', fs.createReadStream(imgphoto));
        console.log('pass 1');
        // data.append('imagefile', imgphoto);
        console.log('pass 1 withour error');
        console.log('pass 2');
        data.append('candidate', datablob);
        console.log('pass 2 withour error');
        var datareps = 116;
        for (var pair of data.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
        try {
          console.log('Start function submit');
          const returnresponse = await services02module2.postRegisterConsultant(this.model);
          const response = await servicesmodule2.postCandidateRegisterPreference(data);
          console.log(response);
          console.log('--------Seperate---------');
          console.log(returnresponse);
          //this.$router.push(-1)
        } catch (error) {
          console.log(error);
        }
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }

      this.$refs['declaration-personal-details'].hide();
    },

    onSubmitConsultant: async function() {
      console.log('Start function submit');
      this.$refs['declaration-personal-details'].show();
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

    showmodal() {},

    setIsExemptionQualified() {
      this.model.EXEMPTION_QUALIFIED = !this.model.EXEMPTION_QUALIFIED;
      console.log(this.model.EXEMPTION_QUALIFIED);
    },

    removeSelectedExamSession(data) {
      const index = this.examTimetableList.findIndex(el => el.sessionid === data.item.sessionid);
      this.$refs['selectableTable'].unselectRow(index);
      this.SELECTED_EXAM_SESSION.splice(data.index, 1);
    },
    setSelectedExamSession(data) {
      if (this.SELECTED_EXAM_SESSION.length >= 3) return;

      this.$refs['selectableTable'].selectRow(data.index);
      this.SELECTED_EXAM_SESSION.push(data.item);
      console.log(this.SELECTED_EXAM_SESSION);
    },

    showHighestEducationUploader(newVal) {
      for (let qualification in this.visibleEducation) {
        this.visibleEducation[qualification] = false;
      }
      this.visibleEducation[newVal.name.split(' ')[0]] = true;
    },

    /* -------------------------------------------------------------------------- */
    /*                               updatefunction                               */
    /* -------------------------------------------------------------------------- */

    onModelUpdated(newVal, schema) {
      // console.log(newVal);
      console.log(`schema: ${schema}`, `value: ${newVal.name}`);
      if (schema == 'CONSULTANT_CITIZENSHIP') {
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
        console.log('dob :' + this.model.CONSULTANT_DOB);
        if (newVal.substr(11, 1) != '') {
          console.log('last character :' + newVal.substr(11, 1));
          var Year = newVal.substring(0, 2);
          var Month = newVal.substring(2, 4);
          var Day = newVal.substring(4, 6);

          var cutoff = new Date().getFullYear() - 2000;
          console.log('year :' + cutoff);

          var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
          this.model.CONSULTANT_DOB = dob;
          console.log('dob :' + dob);
          console.log((Year > cutoff ? '19' : '20') + Year);
          const yearBirth = (Year > cutoff ? '19' : '20') + Year;
          if (parseInt(yearBirth) <= 1970) {
            console.log('1970 and below');
            this.visibleOldIc = true;
          } else {
            console.log('above');
            this.visibleOldIc = false;
          }
          if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
            console.log('The number is even. f');
            this.model.CONSULTANT_GENDER = '1';
          } else {
            console.log('The number is odd. l');
            this.model.CONSULTANT_GENDER = '2';
          }
        }
      } else if (schema == 'CATEGORY') {
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
        if (newVal.name == 'ENG JIA SECURITIES SDN BHD') {
          this.model.PRS = true;
          this.model.UTS = !this.model.PRS;
          this.visiblePRS = true;
          this.visibleUTS = false;
        } else {
          this.model.UTS = true;
          this.model.PRS = !this.model.UTS;
          this.visiblePRS = false;
          this.visibleUTS = true;
        }
      } else if (schema == 'EXEMPTION_CATEGORY') {
        console.log(schema, newVal);
        // this.visibleExemptionQualified = true;
        // console.log(newVal);
      }
      // else if (schema == 'StateExam'){
      //   if (newVal == !null)
      //   {
      //     this.showCenterExam = true
      //   }else{
      //     this.showCenterExam = false
      //   }
      // }
      // else if (schema == 'CenterExam'){
      //   if (newVal != null)
      //   {
      //     this.showExamDate = true
      //   }else{
      //     this.showExamDate = false
      //   }
      // }
    },

    onExemptionModelUpdated(newVal, schema) {
      if (schema === 'EXEMPTION_MODEL.EXEMPTION_CATEGORY') {
        // console.log(newVal);
        Object.keys(this.visibleExemption).forEach(el => {
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
      const postcodes = await SettingPostcode.getAllPostcodes();
      this.postcodeAPI = postcodes.data.data;
      // console.log('this is postcode', this.postcodeAPI);
    },
    async getAllCountries() {
      const countries = await SettingGeneral.getAllCountries();
      // console.log('this is countries', countries.data.data);
    },
    async getDistributorRecords() {
      const distributor_records = await DistributorRecords.getDistributorRecords();
      this.distributor = distributor_records.data.data;
      // console.log('this is distributor list', distributor_records.data.data);
    },
    async getDistributorType() {
      const distributor_type = await DistributorType.getDistributorType();
      console.log('this is distributor list', distributor_type.data.data);
    },
    async getAllStates() {
      const states = await SettingGeneral.getAllStates();
      this.statesAPI = states.data.data;
    },
    async getCurrentConsultant(){
          this.current_consultant = await services02module2.getCurrentConsultant();
          console.log(this.current_consultant);
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

  /* -------------------------------------------------------------------------- */
  /*                                startcomputed                               */
  /* -------------------------------------------------------------------------- */
  computed: {
    postcode() {
      if (this.postcodeAPI.length) {
        return this.postcodeAPI.map(el => el.POSTCODE);
      }
      return this.postcodeAPI;
    },

    states() {
      if (this.postcodeAPI.length) {
        return [...new Set(this.postcodeAPI.map(el => el.STATE))];
      }
      return this.statesAPI;
    },

    countries() {
      if (this.countriesAPI.length) {
        return this.countriesAPI.map(el => el.name);
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
