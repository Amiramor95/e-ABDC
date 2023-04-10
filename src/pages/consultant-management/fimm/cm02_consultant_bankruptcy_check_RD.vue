<template>
  <div>
      <b-overlay :show="show_overlay" rounded="sm">
          <div class="row">
            <div class="col-12">
              <template v-if="!currentDistributor">
                <va-card>
                  <div v-if="!isReady">
                    <div class="text-center text-success my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong>Loading...</strong>
                      </div>
                  </div>
                  <div v-else>
                    <h4 style="margin-top:0px; margin-bottom:20px">
                      Bankruptcy Check
                    </h4>
                    <h6 style="margin-top:0px; margin-bottom:20px">
                      List of Distributor
                    </h6>

                    <div class="col-3">
                      <div
                        style="display: flex; align-items:center"
                        class="form-group form-group-sm has-search"
                      >
                        <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                        <input
                          v-model="search.distributor"
                          type="text"
                          class="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div>

                    <!-- DISTRIBUTOR TABLE -->
                    <va-data-table
                      :fields="fields.distributor"
                      :data="filteredDistributor"
                      no-data-label="No data found"
                      :per-page="parseInt(perPage)"
                      :datacount="filteredDistributor.length"
                      :dataperpage="parseInt(perPage)"
                      clickable
                    >
                      <template slot="index" slot-scope="row">
                        {{ row.rowIndex + 1 }}
                      </template>
                      <template slot="ACTION" slot-scope="props">
                        <h5 class="mt-1">
                          <span
                            v-b-tooltip.hover
                            title="View"
                            v-on:click="setCurrentDistributor(props)"
                            class="badge badge-primary mr-2"
                          >
                            <i class="fa fa-eye"></i
                          ></span>
                        </h5>
                      </template>
                    </va-data-table>
                  </div>
                </va-card>
              </template>

              <template v-else>
                <template v-if="!currentConsultant">
                  <va-card>
                    <h4 style="margin-top:0px; margin-bottom:20px">
                      <span v-if="!showCheckedConsultants">Generated Bankruptcy Checking List</span>
                      <span v-else>Bankruptcy Checked List</span>
                    </h4>
                    <h6 style="margin-top:0px; margin-bottom:20px">
                      Distributor Name - {{ currentDistributor.DIST_NAME }}
                    </h6>

                    <div class="row">
                      <div class="col-3">
                        <div
                          style="display: flex; align-items:center"
                          class="form-group form-group-sm has-search"
                        >
                          <span
                            style="margin-right:10px"
                            class="fa fa-search form-control-feedback"
                          ></span>
                          <input
                            v-model="search.consultant"
                            type="text"
                            class="form-control"
                            placeholder="Search"
                          />
                        </div>
                      </div>
                      <div class="col float-right">
                        <div class="float-right">
                          <h5>
                            <!-- <span
                              v-b-tooltip.hover
                              title="Approved By RD"
                              v-on:click="approvedByRD"
                              class="badge badge-success mr-2"
                            >
                            <i class="fa fa-check-circle"></i
                            ></span> -->

                            <span
                              v-b-tooltip.hover
                              title="Change View List"
                              v-on:click="exchangeView"
                              class="badge badge-primary"
                            >
                              <i class="fa fa-exchange"></i
                              ></span>
                          </h5>
                        </div>
                      </div>
                    </div>

                    <!-- CONSULTANT TABLE -->
                    <div v-if="!showCheckedConsultants">
                      <va-data-table
                        :fields="fields.consultant"
                        :data="filteredConsultant"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="filteredConsultant.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                      >
                        <template slot="checkbox" slot-scope="props">
                          <b-form-checkbox v-if="props.rowData.STATUS_ID==14 || props.rowData.STATUS_ID==15"
                            :checked="true"
                            @change="setCurrentConsultant(props)"
                            :disabled="true"
                          >
                          </b-form-checkbox>

                          <b-form-checkbox v-else
                            v-model="props.rowData.STATUS"
                            @change="setCurrentConsultant(props)"
                          >
                          </b-form-checkbox>
                        </template>

                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h5 class="mt-1">
                            <span
                              v-b-tooltip.hover
                              title="View"
                              v-on:click="viewCurrentConsultant(props)"
                              class="badge badge-primary mr-2"
                            >
                              <i class="fa fa-eye"></i
                            ></span>
                          </h5>
                        </template>
                      </va-data-table>
                    </div>

                    <div v-else>
                      <va-data-table
                        :fields="fields.consultant"
                        :data="filteredCheckedconsultantsAPI"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="filteredCheckedconsultantsAPI.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                      >
                        <template slot="checkbox" slot-scope="props">
                          <b-form-checkbox
                            :checked="true"
                            @change="setCurrentConsultant(props)"
                            :disabled="true"
                          >
                          </b-form-checkbox>
                        </template>

                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h5 class="mt-1">
                            <span
                              v-b-tooltip.hover
                              title="View"
                              v-on:click="viewCurrentConsultant(props)"
                              class="badge badge-primary mr-2"
                            >
                              <i class="fa fa-eye"></i
                            ></span>
                          </h5>
                        </template>
                      </va-data-table>
                    </div>
                    <br />

                    <br />

                    <div class="float-right">
                      <button
                        @click="requestBulkBankruptcyCheck"
                        type="button"
                        class="ml-1 btn btn-primary btn-fill btn-md"
                      >
                        <i class="fa fa-paper-plane" /> &nbsp; Request for Bankruptcy Check
                      </button>
                    </div>
                    <div class="float-left">
                      <button
                        @click="resetDistributorData"
                        type="button"
                        class="btn btn-primary btn-fill btn-md"
                      >
                        <i class="fa fa-step-backward" /> &nbsp; Previous
                      </button>
                    </div>
                  </va-card>
                </template>

                <template v-else>
                  <va-card>
                    <h4 style="margin-top:0">Bankcruptcy Check - Consultant Profile</h4>
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
                            <profile-view :consultantData="currentConsultant"></profile-view>
                          </div>
                        </div>

                        <div v-if="currentTab === 'tab2'">
                          <div class="ml-4">
                            <br />
                            <table class="table table-striped">
                              <tbody>
                                <tr>
                                  <td style="width: 15%">Agent Type</td>
                                  <td>{{ currentConsultant.CANDIDATE_CATEGORY }}</td>
                                </tr>
                                <tr v-if="currentConsultant.CANDIDATE_CATEGORY == 'STAFF'">
                                  <td style="width: 15%">Position</td>
                                  <td>
                                    {{ currentConsultant.CANDIDATE_POSITION_CATEGORY }} 
                                    <span v-if="currentConsultant.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ currentConsultant.CANDIDATE_POSITION}}</span>
                                  </td>
                                </tr>
                                <!-- <tr>
                                  <td>License Type</td>
                                  <td>{{ currentConsultant.TYPE_NAME }} ({{ currentConsultant.TYPE_FULL_NAME }})</td>
                                </tr>
                                <tr>
                                  <td>Distributor</td>
                                  <td>{{ currentConsultant.DIST_NAME }}</td>
                                </tr> -->
                              </tbody>
                            </table>

                            <table class="table table-striped mb-5">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">License Type</th>
                                  <th scope="col">Distributor</th>
                                  <th scope="col">Distribution Point</th>
                                  <th scope="col">Application Type</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(consultant_license, index) in consultantLicenses" :key="index">
                                  <td scope="row">{{++index}}</td>
                                  <td>{{consultant_license.TYPE_FULL_NAME}}</td>
                                  <td>{{consultant_license.DIST_NAME}}</td>
                                  <td>
                                    <span v-if="consultant_license.DIST_POINT_NAME">{{consultant_license.DIST_POINT_NAME}}</span>
                                    <span v-else class="text-center">-</span>
                                  </td>
                                  <td>{{consultant_license.APPLICATION_TYPE_NAME}}</td>
                                  <td>{{consultant_license.LICENSE_STATUS}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div v-if="currentTab === 'tab3'">
                          <div class="ml-3">
                            <br />
                            <div v-if="currentConsultant.license_exemption">
                              <exemption-data :consultantData="currentConsultant"></exemption-data>
                            </div>

                            <div v-else>
                              <table class="table table-striped">
                                <tbody>
                                  <tr>
                                    <td style="width: 15%">Examination Type</td>
                                    <td>{{ currentConsultant.EXAMINATION_TYPE }}</td>
                                  </tr>

                                  <tr>
                                    <td>Result</td>
                                    <td>
                                      <!-- FAIL -->
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Certificate
                                    </td>
                                    <td>
                                      Not Available
                                      <!-- <a
                                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                        target="_blank"
                                      >
                                        View</a
                                      > -->
                                    </td>
                                  </tr>
                                  <!-- <tr>
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
                                  </tr> -->
                                </tbody>
                              </table>

                              <hr>
                              <!-- Selected sessions table -->
                              <div class="booked-exam-sessions">
                                <div class="">Booked Exam Sessions:</div>
                                  
                                <b-table
                                      bordered
                                      outlined
                                      hover
                                      :items="selected_sessions"
                                      :fields="fields.exam_sessions"
                                      show-empty
                                      head-variant="light"
                                      sticky-header
                                  >
                                    <!-- index column -->
                                    <template #cell(index)="data">
                                      {{ data.index + 1 }}
                                    </template>

                                    <!-- Session Time column -->
                                    <template #cell(SESSION_TIME)="data">
                                      {{ data.item.START_TIME }} - {{ data.item.END_TIME }}
                                    </template>

                                    <!-- Location column -->
                                    <template #cell(GOOGLE_MAP_LINK)="data">
                                      <a :href="data.item.GOOGLE_MAP_LINK" target="_blank" style="color: #007bff;">{{data.item.GOOGLE_MAP_LINK}}</a>
                                    </template>
                                </b-table>
                              </div>                    
                            </div>
                          </div>
                        </div>

                        <div v-if="currentTab === 'tab4'">
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

                        <div class="float-left">
                          <button
                            @click="resetConsultantData"
                            type="button"
                            class="btn btn-primary btn-fill btn-md"
                          >
                            <i class="fa fa-step-backward" /> &nbsp; Previous
                          </button>
                        </div>

                        <div class="float-right" v-if="!consultantBankruptcyCheckData">
                          <button
                            @click="requestBankruptcyCheck"
                            type="button"
                            class="ml-1 btn btn-primary btn-fill btn-md"
                          >
                            <i class="fa fa-paper-plane" /> &nbsp; Request for Bankruptcy Check
                          </button>
                        </div>
                      </div>
                    </div>
                  </va-card>
                </template>
              </template>
            </div>
          </div>
      </b-overlay>

      <b-modal v-model="checkBankruptcyModal1" centered title="">
        <div class="d-block text-center">
            <h5>Bankruptcy Record detected.</h5>
            <h6>Notified to Applicant and Distributor.</h6>
        </div>
        <template #modal-footer="{ ok }">
          <b-button size="sm" variant="success" @click="ok()">
            OK
          </b-button>
        </template>
      </b-modal>

      <b-modal v-model="checkBankruptcyModal2" centered title="">
        <div class="d-block text-center">
            <h5>No any Bankruptcy Record detected.</h5>
        </div>
        <template #modal-footer="{ ok }">
          <b-button size="sm" variant="success" @click="ok()">
            OK
          </b-button>
        </template>
      </b-modal>
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

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import HorizontalScroll from 'vue-horizontal-scroll';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import * as services06Module0 from '../../../app/module0/services06';
import moment from 'moment';
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';
import * as services04module2 from '../../../app/module2/services04';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import TerminationRepository from '../../../repositories/module2/TerminationRepository';
import Tabs from 'vue-tabs-with-active-line';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.component(Vudal);
// register globally
Vue.component('multiselect', Multiselect);

// Consultant Profile Data display
import ProfileView from "@/modules/consultant-management/components/applicant_profile/profile";
import ExemptionData from "@/modules/consultant-management/components/applicant_profile/exemption_data";

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');
const Termination = RepositoryFactory.get('termination');

export default {
  components: { Tabs, ProfileView, ExemptionData },
  data() {
    return {
      isReady: false,
      // tabs: [
      //   {
      //     title: 'Applicant Profile',
      //     value: 'tab1',
      //   },
      //   {
      //     title: 'Type of Applicant',
      //     value: 'tab2',
      //   },
      //   {
      //     title: 'Uploaded Document',
      //     value: 'tab3',
      //   },
      //   {
      //     title: 'Examination & Bankruptcy Check',
      //     value: 'tab4',
      //   },
      // ],
      tabs: [
        {
          title: "Applicant Profile",
          value: "tab1"
        },
        {
          title: "Type of Consultant",
          value: "tab2"
        },
        {
          title: "Examination",
          value: "tab3"
        },
        {
          title: "Uploaded Document",
          value: "tab4"
        }
      ],

      currentTab: 'tab1',

      currentDistributor: null,
      currentConsultant: null,
      consultantLicenses: [],
      consultantBankruptcyCheckData: "",
      isBusy: true,
      show_overlay: false,
      showCheckedConsultants: false,
      selected_sessions: [],
      bankruptcy_details : '',
      bankruptcy_infos : '',

      // bankruptcy_infos : {
      //   DEFENDANT_NAME: 'CONSULTANT_43',
      //   NEW_IC: '185415891151',
      //   OLD_IC: '99999-99-99',
      //   ADJUDICATION_ORDER_DATE	: '2013-12-14',
      //   CASE_NO: '1001',
      //   CREDITOR: '',
      //   SOLICITOR_CODE: '7801',
      //   SOLICITOR_NAME: 'Thomas Philips Advocates',
      //   SOLICITOR_TEL: '03-62015678',
      //   SOLICITOR_FAX: '03-62035678',
      //   REF2: ''
      // },
      checkBankruptcyModal1: false,
      checkBankruptcyModal2: false,

      fields: {
        distributor: [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'DIST_CODE', title: 'DISTRIBUTOR CODE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          // { name: 'DIST_PHONE_NO', title: 'PHONE NO' },
          // { name: 'TOTAL_APPLICATION', title: 'TOTAL APPLICATION' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        consultant: [
          // {
          //   name: '__checkbox',
          //   titleClass: 'center aligned',
          //   dataClass: 'center aligned',
          // },
          // A virtual column that doesn't exist in items
          {
            name: '__slot:checkbox',
            title: 'SELECTED',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'SUBMISSION_DATE', title: 'LAST UPDATE' },
          // A column that needs custom formatting
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'TYPE_SCHEMAS', title: 'CONSULTANT TYPE' },
          { name: 'CONSULTANT_STATUS', title: 'CONSULTANT STATUS' },
          { name: 'ACTION_BY_CONSULTANT', title: 'ACTION BY CONSULTANT' },
          { name: 'BANKRUPTCY_STATUS', title: 'BANKRUPTCY STATUS' },
          { name: 'STATUS_CHECKING', title: 'STATUS CHECKING' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        exam_sessions: [
          { key: 'index', class: 'text-center' },
          { key: 'DATE', label: 'Exam Date', class: 'text-center' },
          { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
          { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
          { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
          { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
          { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
          {
            key: 'AVAILABLE_SEAT',
            label: 'Available Seats',
            class: 'text-center',
          },
        ],
      },

      search: {
        distributor: '',
        consultant: '',
      },

      consultantsAPI: [],
      CheckedconsultantsAPI: [],
      distributorsAPI: [],

      currentPage: 1,
      perPage: '10',
      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],
        CONSULTANTS: [],
        CONSULTANT_ID: [],
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
      },

      model2: {

      },

      formOptions: {
        validateAfterChanged: true,
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "PROFILE_UPLOADED_DOCUMENTS",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
    };
  },
  async mounted() {
    // await this.getConsultantRecord();
  },
  async created() {
    await this.getDistributors();
  },
  computed: {
    filteredDistributor() {
      const search = this.search.distributor.toLowerCase();
      if (this.search) {
        return this.distributorsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultantsAPI;
    },

    filteredConsultant() {
      const search = this.search.consultant.toLowerCase();
      if (this.search) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultantsAPI;
    },

    filteredCheckedconsultantsAPI(){
      const search = this.search.consultant.toLowerCase();
      if (this.search) {
        return this.CheckedconsultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.CheckedconsultantsAPI;
    }
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },

    exchangeView(){
      this.showCheckedConsultants = !this.showCheckedConsultants ;
    },

    async getDistributors() {
      this.distributorsAPI = await services02module2.getAllDistributorList();
      this.isReady = true;
    },

    async setCurrentDistributor(props) {
      //console.log(props);
      await this.getConsultantRecord(props.rowData.DISTRIBUTOR_ID);
      this.currentDistributor = props.rowData;
    },

    async getConsultantRecord(distId) {
      this.show_overlay = true;
      const response = await services04module2.getConsultantsForBankruptcyCheck(distId); 
      if(response){
          this.consultantsAPI = response;
          await this.getCheckedConsultantRecord(distId)
      }
      // this.isBusy = false;
    },

    async getCheckedConsultantRecord(distId) {
      const response = await services04module2.getBankruptcyCheckedConsultants(distId); 
      if(response){
          this.CheckedconsultantsAPI = response;
          this.show_overlay = false;
      }
      // this.isBusy = false;
    },
    
    // fix this
    setCurrentConsultantAll(scope) {
      if (this.mappedSelectedConsultantArray.length) {
        this.$refs['consultantTable'].clearSelected();
      } else {
        this.$refs['consultantTable'].selectAllRows();
      }
    },

    async viewCurrentConsultant(props) {
      this.currentConsultant = props.rowData;
      this.getLicenseDetails();
      this.getConsultantBankruptcyCheckData();
      this.getConsultantExamSessions();
      await this.getDocumentByID(props.rowData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS');
    },

    async getLicenseDetails() {
        try {
          const response = await services02module2.getDistributorDetails(this.currentConsultant.USER_ID);
          this.consultantLicenses = response;
        } catch (error) {
          console.log(error);
        }
    },

    async getConsultantBankruptcyCheckData() {
      try {
        await services04module2.consultantBankruptcyCheckData(this.currentConsultant.CONSULTANT_ID)
        .then((response)=>{
          this.consultantBankruptcyCheckData = response;
          this.model2 = _.cloneDeep(this.consultantBankruptcyCheckData);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getConsultantExamSessions() {
      try {
        await services04module2.get_booked_exams_sessions(this.currentConsultant.CONSULTANT_ID, this.currentConsultant.CONSULTANT_APPLICATION_TYPE)
        .then((response)=>{
          this.selected_sessions = [];
          this.selected_sessions=response.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    // setCurrentConsultant(props) {
    //   const index = this.model.CONSULTANT_ID.findIndex(
    //     el => el === props.rowData.CONSULTANT_ID,
    //   );

    //   if (index >= 0) {
    //     this.model.CONSULTANT_ID.splice(index, 1);
    //   } else {
    //     this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
    //   }
    // },

    setCurrentConsultant(props) {
      const index = this.model.CONSULTANTS.findIndex(
        el => el === props.rowData,
      );

      if (index >= 0) {
        this.model.CONSULTANTS.splice(index, 1);
      } else {
        this.model.CONSULTANTS.push(props.rowData);
      }
    },

    resetDistributorData(){
      this.currentDistributor = null; 
      this.consultantsAPI=[];
    },

    resetConsultantData(){
      this.currentConsultant = null; 
      this.model.PROFILE_UPLOADED_DOCUMENTS = [];
      this.selected_sessions= []; 
      this.consultantBankruptcyCheckData= "";
      this.model2 = {};
      this.bankruptcy_details = '';
      this.bankruptcy_infos = '';
    },

    requestBankruptcyCheck: async function() {
      if(confirm("Are you sure to Submit?")){
        try {
          this.show_overlay = true;
          const response = await servicesmodule0.bankruptcyCheck(
            'I', //EntityType, //required // (Always “I” for individual bankruptcy report)
            this.currentConsultant.CONSULTANT_NAME,//EntityName, //required
            this.currentConsultant.CONSULTANT_NRIC,//EntityId, //required
            this.currentConsultant.CONSULTANT_MOBILE_NO,//MobileNo, //either one
            this.currentConsultant.CONSULTANT_EMAIL,//EmailAddress, //either one
            this.currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1//LastKnownAddress, //either one
            //Ref2 // Billing reference ( this should be a running number)
          );
        if(response){
            //console.log('Bankruptcy Check Response', response);
            this.bankruptcy_details=response;

            if(this.bankruptcy_details.bankruptcy_info){
              if(this.bankruptcy_details.bankruptcy_info.case){
                this.bankruptcy_infos = this.bankruptcy_details.bankruptcy_info.case.item;
                this.saveBankruptcyData();
                // this.checkBankruptcyModal1 = true;
                // this.show_overlay = false;
              }else{
                // this.checkBankruptcyModal2 = true;
                // this.show_overlay = false;
              }
            }

            this.saveConsultantBankruptcyDetail();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 

    async saveConsultantBankruptcyDetail(){
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_ID", this.currentDistributor.DISTRIBUTOR_ID);
        data.append("CONSULTANT_ID", this.currentConsultant.CONSULTANT_ID);
        data.append("CREATE_BY", JSON.parse(localStorage.getItem("user")).user_id);
        data.append("ACTION_BY_CONSULTANT", 0); // 0-NO, 1-YES
        data.append("TS_ID", 15); //Prefer admin_management DB -> TASK_STATUS for TS_ID
        if(this.bankruptcy_infos){
          data.append("BANKRUPTCY_STATUS", 1); //0-NO 1-YES
        }else{
          data.append("BANKRUPTCY_STATUS", 0);
        }
        if(this.bankruptcy_infos){
          data.append("BANKRUPTCY_DATE", this.bankruptcy_infos.adjudication_order_date);
        }else{
          data.append("BANKRUPTCY_DATE", '');
        }
        
        await services04module2.saveConsultantBankruptcyDetails(data)
        .then((response) => {
            this.resetConsultantData();
            this.getConsultantRecord(this.currentDistributor.DISTRIBUTOR_ID);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async saveBankruptcyData(){
        try {
          this.show_overlay = true;
          const data = new FormData();
          data.append("DEFENDANT_NAME", this.bankruptcy_infos.defendant_name);
          data.append("NEW_IC", this.bankruptcy_infos.new_ic);
          data.append("OLD_IC", this.bankruptcy_infos.old_ic);
          data.append("ADJUDICATION_ORDER_DATE", this.bankruptcy_infos.adjudication_order_date);
          data.append("CASE_NO", this.bankruptcy_infos.case_no);
          //data.append("CREDITOR", this.bankruptcy_infos.CREDITOR);
          data.append("SOLICITOR_CODE", this.bankruptcy_infos.solicitor_code);
          data.append("SOLICITOR_NAME", this.bankruptcy_infos.solicitor_name);
          data.append("SOLICITOR_TEL", this.bankruptcy_infos.solicitor_tel);
          data.append("SOLICITOR_FAX", this.bankruptcy_infos.solicitor_fax);
          data.append("REF2", this.bankruptcy_infos.adjudication_order_ref);
          const response = await services04module2.saveConsultantBankruptcyData(data);
            // if(response){
            //     Vue.$toast.open({
            //       message: response.message,
            //       type: 'success',
            //     });
            // }
        } catch (error) {
          console.log(error);
        }
    },

    requestBulkBankruptcyCheck() {
      if(this.model.CONSULTANTS.length>0){
        if(confirm("Are you sure to Submit?")){
          this.show_overlay = true;
          this.bankruptcy_details = [],
          this.model.CONSULTANTS.forEach(data => {
            //console.log(data);
            try {
              servicesmodule0.bankruptcyCheck(
                'I', //EntityType, //required // (Always “I” for individual bankruptcy report)
                data.CONSULTANT_NAME,//EntityName, //required
                data.CONSULTANT_NRIC,//EntityId, //required
                data.CONSULTANT_MOBILE_NO,//MobileNo, //either one
                data.CONSULTANT_EMAIL,//EmailAddress, //either one
                data.CONSULTANT_CORRESPONDENT_ADDR1//LastKnownAddress, //either one
                //Ref2 // Billing reference ( this should be a running number)
              ).then((response) => {
                  this.bankruptcy_details.push(response);
                  //console.log('Bankruptcy Details',this.bankruptcy_details);
                  this.saveBulkConsultantBankruptcyDetail(data.CONSULTANT_ID);
              });
            } catch (error) {
              console.log(error);
            }
          });
        }
      }else{
        alert('Please select consultants for request');
      }
    },

    saveBulkConsultantBankruptcyDetail(consultId){
      try {
        this.bankruptcy_details.forEach(el => {
            try {
              const data = new FormData();
              data.append("DISTRIBUTOR_ID", this.currentDistributor.DISTRIBUTOR_ID);
              data.append("CONSULTANT_ID", consultId);
              data.append("CREATE_BY", JSON.parse(localStorage.getItem("user")).user_id);
              data.append("ACTION_BY_CONSULTANT", 0); // 0-NO, 1-YES
              data.append("TS_ID", 15); //Prefer admin_management DB -> TASK_STATUS for TS_ID
              if(el.bankruptcy_info){
                if(el.bankruptcy_info.case){
                  if(Array.isArray(el.bankruptcy_info.case.item)){
                    data.append("BANKRUPTCY_STATUS", 1); //0-NO 1-YES
                    data.append("BANKRUPTCY_DATE", el.bankruptcy_info.case.item[0].adjudication_order_date);

                    this.bankruptcy_infos = el.bankruptcy_info.case.item[0];
                    this.saveBankruptcyData();
                  }else{
                    data.append("BANKRUPTCY_STATUS", 1); //0-NO 1-YES
                    data.append("BANKRUPTCY_DATE", el.bankruptcy_info.case.item.adjudication_order_date);
                    this.bankruptcy_infos = el.bankruptcy_info.case.item;
                    this.saveBankruptcyData();
                  }
                }else{
                  data.append("BANKRUPTCY_STATUS", 0);
                  data.append("BANKRUPTCY_DATE", '');
                }
              }
              
              services04module2.saveConsultantBankruptcyDetails(data);
            } catch (error) {
              console.log(error);
            }
        });
        this.bankruptcy_details = [];
        this.bankruptcy_infos= '';
        this.model.CONSULTANTS = [];
        this.getConsultantRecord(this.currentDistributor.DISTRIBUTOR_ID);
      } catch (error) {
        console.log(error);
      }
    },

    getDocumentByID: async function(consultId, other_documents) {
      const response = await services02module2.getConsultantDocuments(consultId, other_documents);
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };
        
        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
      });
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return new File(byteArrays, "pot", { type: contentType });
    }
  },
};
</script>
