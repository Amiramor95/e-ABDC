<template>
  <div v-if="!isBusy">
    <b-card>
      <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
      </div>
    </b-card>
  </div>

  <div v-else>
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="row">
        <div class="col-12">
          <va-card v-if="!currentConsultant">
            <h4 style="margin-top:0px; margin-bottom:20px">
              Bankruptcy Check
            </h4>
            <h6 style="margin-top:0px; margin-bottom:20px">
              Generate Bankruptcy List
            </h6>
            <div class="row">
              <div class="col-3">
                <div
                  style="display: flex; align-items:center"
                  class="form-group form-group-sm has-search"
                >
                  <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
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
            <div v-if="showCheckedConsultants">
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
                  <b-form-checkbox v-if="props.rowData.STATUS_ID==14"
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

            <div v-else>
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
                  <b-form-checkbox
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

            <br />
            <vue-form-generator
              :model="model"
              :schema="tabSchema2"
              :options="formOptions"
              ref="tabForm2"
              @validated="onValidated"
            >
            </vue-form-generator>
            <br />

            <br />

            <div class="float-right">
              <button
                @click="requestBulkConsultantAction"
                type="button"
                class="ml-2 btn btn-warning btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Request for Consultant Action
              </button>
            </div>
            <br />
          </va-card>

          <va-card v-else>
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
              </div>
            </div>
            <br />

            <div v-if="!consultantBankruptcyApproval">
              <vue-form-generator
                :model="model"
                :schema="tabSchema2"
                :options="formOptions"
                ref="tabForm2"
                @validated="onValidated"
              >
              </vue-form-generator>
            </div>

            <div v-else>
              <vue-form-generator
                :model="model2"
                :schema="tabSchema3"
                :options="formOptions"
                ref="tabForm3"
                @validated="onValidated"
              >
              </vue-form-generator>

              <br />

              <vue-form-generator
                :model="model"
                :schema="approvalDocumentSchema"
                :options="formOptions"
                ref="approvalDocumentFile"
              >
              </vue-form-generator>
            </div>
            <br />

            <div class="float-left">
              <button
                @click="resetConsultantData"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-step-backward" /> &nbsp; Previous
              </button>
            </div>
            <div class="float-right" v-if="!consultantBankruptcyApproval">
              <button
                @click="requestConsultantAction"
                type="button"
                class="ml-2 btn btn-warning btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Request for Consultant Action
              </button>
            </div>
          </va-card>
        </div>
      </div>
    </b-overlay>
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
import * as services05module1 from "../../../app/module1/services05";
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
      consultantBankruptcyApproval: "",
      isBusy: false,
      show_overlay: false,
      showCheckedConsultants: false,
      selected_sessions: '',
      terminationType: [
        {
          label: 'Disqualified',
          value: '1',
        },
        {
          label: 'Other (please specify)',
          value: '2',
        },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      fields: {
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
          { name: 'DATE', title: 'LAST UPDATE' },
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
      filter: {
        distributor: null,
        consultant: null,
      },
      search: {
        distributor: '',
        consultant: '',
      },
      consultants: null,
      CheckedconsultantsAPI: [],

      currentPage: 1,
      perPage: '10',

      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],
        REMARK_COMMENTS: '',
        SUPPORTED_DOCUMENTS: [],
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
        CONSULTANTS: [],
      },

      model2: {

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

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'REMARK_COMMENTS',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
              {
                theme: 'list',
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "SUPPORTED_DOCUMENTS",
                type: "vfg-consultant-custom-multiple-file",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.pdf)",
                required: false
              },
            ],
          },
        ],
      },

      tabSchema3: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'APPR_REMARK',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
                disabled: true,
              },
            ],
          },
        ],
      },

      approvalDocumentSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                theme: "list",
                labels: "Uploaded Documents",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "SUPPORTED_DOCUMENTS",
                type: "vfg-custom-file-view2",
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

  created() {
    this.getDistributorDetails();
  },

  async mounted() {
    //await this.getConsultantRecord();
  },

  computed: {
    filteredConsultant() {
      const search = this.search.consultant.toLowerCase();
      if (this.search) {
        return this.consultants.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultants;
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
    // get distributor details
    getDistributorDetails: async function() {
      const user = localStorage.getItem("user");
      const response = await services05module1.getdistributordetails(JSON.parse(user).user_id);
      this.currentDistributor = response;
      this.getConsultantRecord();
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    exchangeView(){
      this.showCheckedConsultants = !this.showCheckedConsultants ;
    },

    async getConsultantRecord() {
      const response = await services04module2.getConsultantsForBankruptcyAdminReview(this.currentDistributor.DISTRIBUTOR_ID); 
      if(response){
          this.consultants = response;
          this.getCheckedConsultantRecord();
      }
    },

    async getCheckedConsultantRecord() {
      const response = await services04module2.getConsultantsBankruptcyCheckedByAdmin(this.currentDistributor.DISTRIBUTOR_ID); 
      if(response){
          this.CheckedconsultantsAPI = response;
          this.isBusy = true;
      }
    },

    // setCurrentDistributor(props) {
    //   console.log(props);
    //   this.currentDistributor = props.rowData.DIST_NAME;
    // },

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
      this.getConsultantBankruptcyApprovalData();
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

    async getConsultantBankruptcyApprovalData() {
      try {
        await services04module2.consultantBankruptcyApprovalData(this.currentConsultant.CONSULTANT_ID)
        .then((response)=>{
          this.consultantBankruptcyApproval = response;
          this.model2 = _.cloneDeep(this.consultantBankruptcyApproval);
          this.getConsultantBankruptcyApprovalDocument();
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
    //     el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID,
    //   );

    //   console.log(props);

    //   if (index >= 0) {
    //     this.model.CONSULTANT_ID.splice(index, 1);
    //   } else {
    //     this.model.CONSULTANT_ID.push(props.rowData);
    //   }
    // },

    setCurrentConsultant(props) {
      console.log(props);
      const index = this.model.CONSULTANTS.findIndex(
        el => el === props.rowData,
      );

      if (index >= 0) {
        this.model.CONSULTANTS.splice(index, 1);
      } else {
        this.model.CONSULTANTS.push(props.rowData);
      }
    },

    onValidated(isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    },

    requestConsultantAction: async function() {
      if(confirm('Are you sure to submit?')){
        try {
          const data = new FormData();
          data.append("CONSULTANT_ID", this.currentConsultant.CONSULTANT_ID);
          data.append("APPR_GROUP_ID_ADMIN", "3");  //Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
          data.append("APPR_GROUP_ID_CONST", "1");  //Group ID for for Notification to Consultant in am/CONSULTANT_MANAGE_GROUP
          data.append("APPR_REMARK", this.model.REMARK_COMMENTS);
          data.append("TS_ID", 14); //Prefer admin_management DB -> TASK_STATUS for TS_ID
          data.append("APPR_PUBLISH_STATUS", 1); //	1: SUBMIT 0:SAVE AS DRAFT
          data.append("CREATE_BY", this.model.CREATE_BY);
          for (let i = 0; i < this.model.SUPPORTED_DOCUMENTS.length; i++) {
            data.append("FILE[]", this.model.SUPPORTED_DOCUMENTS[i]);
          }

          data.append("FIELD_NAME", 'BANKRUPTCY_CHECK_DOCUMENT');
          data.append("TABLE_NAME", 'BANKRUPTCY_CHECK_DOCUMENT');
          
          this.show_overlay = true;
          const response = await services04module2.saveConsultantBankruptcyApproval(data);
          if(response){
            this.show_overlay = false;
            this.resetConsultantData();
            this.getConsultantRecord();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    requestBulkConsultantAction: async function() {
      if(this.model.CONSULTANTS.length>0){
        if(confirm('Are you sure to submit?')){
          try {
            this.show_overlay = true;
            const items = this.model.CONSULTANTS;
            const formData = new FormData();
            formData.append("APPR_GROUP_ID_ADMIN", "3");  //Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
            formData.append("APPR_GROUP_ID_CONST", "1");  //Group ID for for Notification to Consultant in am/CONSULTANT_MANAGE_GROUP
            formData.append("APPR_REMARK", this.model.REMARK_COMMENTS);
            formData.append("TS_ID", 14); //Prefer admin_management DB -> TASK_STATUS for TS_ID
            formData.append("APPR_PUBLISH_STATUS", 1); //	1: SUBMIT 0:SAVE AS DRAFT
            formData.append("CREATE_BY", this.model.CREATE_BY);
            for (let j = 0; j < this.model.SUPPORTED_DOCUMENTS.length; j++) {
              formData.append("FILE[]", this.model.SUPPORTED_DOCUMENTS[j]);
            }

            formData.append("FIELD_NAME", 'BANKRUPTCY_CHECK_DOCUMENT');
            formData.append("TABLE_NAME", 'BANKRUPTCY_CHECK_DOCUMENT');

            for (let i = 0; i < items.length; i++) {
              // formData.append(`items[${i}][APPR_GROUP_ID_ADMIN]`, "3")
              // formData.append(`items[${i}][APPR_GROUP_ID_CONST]`, "1")
              // formData.append(`items[${i}][APPR_REMARK]`, this.model.REMARK_COMMENTS)
              // formData.append(`items[${i}][TS_ID]`, 14)
              // formData.append(`items[${i}][APPR_PUBLISH_STATUS]`, 1)
              // formData.append(`items[${i}][CREATE_BY]`, JSON.parse(localStorage.getItem('user')).user_id)
              // formData.append(`items[${i}][FIELD_NAME]`, "BANKRUPTCY_CHECK_DOCUMENT")
              // formData.append(`items[${i}][TABLE_NAME]`, "BANKRUPTCY_CHECK_DOCUMENT")
              // for (let j = 0; j < this.model.SUPPORTED_DOCUMENTS.length; j++) {
              //   formData.append(`items[${i}][FILE[]]`, this.model.SUPPORTED_DOCUMENTS[j])
              // }

              for (const key of Object.keys(items[i])) {
                formData.append(`items[${i}][${key}]`, items[i][key])
              }
            }
            
            const response = await services04module2.saveBulkConsultantBankruptcyApproval(formData);
            if(response){
              this.show_overlay = false;
              this.resetConsultantData();
              this.getConsultantRecord();
            }
          } catch (error) {
            console.log(error);
          }
        }
      }else{
        alert('Please select consultants for request');
      }
    },

    resetConsultantData(){
      this.currentConsultant = null; 
      this.model.REMARK_COMMENTS = '',
      this.model.SUPPORTED_DOCUMENTS = []; 
      this.consultantBankruptcyApproval= "";
      this.model2 = {};
      this.model.PROFILE_UPLOADED_DOCUMENTS = [];
      this.selected_sessions= []; 
      this.model.CONSULTANTS=[];
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

    getConsultantBankruptcyApprovalDocument: async function() {
      if(this.consultantBankruptcyApproval && this.consultantBankruptcyApproval.DOCUMENTS){
        const items = this.consultantBankruptcyApproval.DOCUMENTS;
        items.forEach(el => {
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

          el.DOC_BLOB = new File(
            [el.DOC_BLOB],
            el.DOC_ORIGINAL_NAME,
            {
              type: el.DOC_BLOB.type
            }
          );

          const data = {
            docID: el.CONSULTANT_APPROVAL_DOC_ID,
            name: el.DOC_ORIGINAL_NAME + " - By " + el.CREATE_BY  + "." + el.DOC_FILETYPE,
            size: el.DOC_FILESIZE,
            type: el.DOC_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(el.DOC_BLOB)
          };
          
          this.model.SUPPORTED_DOCUMENTS.push(data);
        });
      }
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
