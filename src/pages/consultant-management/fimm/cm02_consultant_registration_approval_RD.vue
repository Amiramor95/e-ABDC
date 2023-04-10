<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!currentDistributor">
              <va-card>
                <h4 style="margin-top:0px; margin-bottom:20px">
                  List of New Candidate Application (RD)
                </h4>

                <!-- <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input
                      v-model="filter.distributor"
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div> -->
                
                <div style="display:flex; justify-content:flex-end; align-items:center">
                  <div class="flex md3 offset--md3">
                    <va-input :placeholder="$t('Search')" v-model="search.distributor" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
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
              </va-card>
            </template>

            <template v-else>
              <template v-if="!viewVirtualCard">
                <template v-if="!currentConsultant">
                  <va-card>
                    <h4 style="margin-top:0px; margin-bottom:20px">
                      List of New Consultant Application
                    </h4>
                    <h6 style="margin-top:0px; margin-bottom:20px">
                      Distributor Name - {{ currentDistributor.DIST_NAME }}
                    </h6>
                    <!-- <div class="col-3">
                      <div
                        style="display: flex; align-items:center"
                        class="form-group form-group-sm has-search"
                      >
                        <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                        <input
                          v-model="filter.consultant"
                          type="text"
                          class="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div> -->
                    <div style="display:flex; justify-content:flex-end; align-items:center">
                      <div class="flex md3 offset--md3">
                        <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                          <va-icon name="fa fa-search" slot="prepend" />
                        </va-input>
                      </div>
                    </div>
                    <!-- CONSULTANT TABLE -->
                    <!-- select-mode="single" -->
                    <va-data-table
                      :fields="fields.consultant"
                      :data="filteredConsultant"
                      no-data-label="No data found"
                      :per-page="parseInt(perPage)"
                      :datacount="filteredConsultant.length"
                      :dataperpage="parseInt(perPage)"
                      clickable
                    >
                      <!-- <template slot="checkbox" slot-scope="props">
                    <b-form-checkbox
                      v-model="props.rowData.selected"
                      @change="setCurrentConsultant(props)"
                    >
                    </b-form-checkbox>
                  </template> -->
                      <template slot="index" slot-scope="row">
                        {{ row.rowIndex + 1 }}
                      </template>
                      <template slot="ACTION" slot-scope="props">
                        <div class="d-flex align-items-center">
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

                          <h5 class="mt-1" v-if="props.rowData.APPR_FIMM_TS_ID == 3">
                            <span
                              v-b-tooltip.hover
                              title="View"
                              v-on:click="generateVirtualCard(props)"
                              class="badge badge-primary mr-2"
                            >
                              Virtual card
                            </span>
                          </h5>
                        </div>
                      </template>
                    </va-data-table>
                    <br />

                    <br />

                    <div class="float-left">
                      <button
                        @click="currentDistributor = null;"
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
                                <tr>
                                  <td>License Type</td>
                                  <td>{{ currentConsultant.TYPE_NAME }} ({{ currentConsultant.TYPE_FULL_NAME }})</td>
                                </tr>
                                <tr>
                                  <td>Distributor</td>
                                  <td>{{ currentConsultant.DIST_NAME }}</td>
                                </tr>
                                <!-- <tr>
                                  <td>Apprienticeship Program</td>
                                  <td>-</td>
                                </tr> -->
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div v-if="currentTab === 'tab3'">
                          <div class="ml-4">
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
                                    <td v-if="currentConsultant.RESULT==0">
                                      Fail
                                    </td>
                                    <td v-else-if="currentConsultant.RESULT==1">
                                      Pass
                                    </td>
                                    <td v-else>
                                      -
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Certificate
                                    </td>
                                    <td>
                                      <!-- Not Available -->
                                      <a
                                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                        target="_blank"
                                      >
                                        View</a
                                      >
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div v-if="currentTab === 'tab4'">
                          <div class="ml-3">
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

                        <div v-if="currentTab === 'tab5'">
                          <div class="ml-3">
                            <br />
                            <table class="table table-striped">
                              <tbody>
                                <tr>
                                  <td>
                                    Bankruptcy Status
                                  </td>
                                  <td>
                                    <span v-if="currentConsultant.BANKRUPTCY_STATUS==0">No</span>
                                    <span v-else>Yes</span>
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    Bankruptcy Date
                                  </td>
                                  <td>
                                    {{currentConsultant.BANKRUPTCY_DATE}}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </va-card>
                  <br />
                  <va-card>
                    <h4 style="margin-top:0">Application Approval</h4>
                    <br />

                    <div v-if="currentConsultant.APPR_FIMM_TS_ID==15">
                      <vue-form-generator
                        :model="model"
                        :schema="tabSchema2"
                        :options="formOptions"
                        ref="tabForm2"
                        @model-updated="onModelUpdated"
                        @validated="onValidated"
                      >
                      </vue-form-generator>
                    </div>

                    <div v-else>
                      <vue-form-generator
                        :model="model3"
                        :schema="tabSchema3"
                        :options="formOptions"
                        ref="tabForm3"
                        @model-updated="onModelUpdated"
                        @validated="onValidated"
                      >
                      </vue-form-generator>
                    </div>

                    <div class="mt-3" v-if="model.SUPPORTED_UPLOADED_DOCUMENTS.length>=1">
                      <vue-form-generator
                        :model="model"
                        :schema="approvalDocumentSchema"
                        :options="formOptions"
                        ref="approvalDocumentFile"
                      >
                      </vue-form-generator>
                    </div>
                    <br />
                  </va-card>
                  <br />

                  <va-card>
                    <div class="ml-2 col-md-12">
                      Approval Log
                      <downloadExcel
                        :json_data="caDetailsRecordList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="column"
                      ></downloadExcel>

                      <button
                        v-if="visibleLog"
                        v-b-toggle.collapse-3
                        type="button"
                        class="float-right btn-fill btn-md"
                      >
                        <i class="fa fa-eye-slash"></i>
                      </button>
                      <button
                        v-else
                        v-b-toggle.collapse-3
                        type="button"
                        class="float-right btn-fill btn-md"
                      >
                        <i class="fa fa-eye"></i>
                      </button>

                      <hr />
                      <b-collapse id="collapse-3" class="mt-2" v-model="visibleLog">
                        <div class="row">
                          <div class="flex md2 offset--md10">
                            <va-input :placeholder="$t('Search')" v-model="search.log" removable>
                              <va-icon name="fa fa-search" slot="prepend" />
                            </va-input>
                          </div>
                        </div>
                        <va-data-table
                          :fields="fields.log"
                          :data="logAPI"
                          no-data-label="No data found"
                          :per-page="parseInt(perPage)"
                          :datacount="logAPI.length"
                          :dataperpage="parseInt(perPage)"
                          clickable
                        >
                          <template slot="no" slot-scope="row">
                            {{ row.rowIndex + 1 }}
                          </template>
                          <!-- <template slot="remarks" slot-scope="props">
                            {{ props.rowData.APPR_REMARK }}
                            <span
                              v-b-tooltip.hover
                              v-on:click="readMore(props.rowData)"
                              title="Read more"
                              class="badge badge-primary mr-2"
                            >
                              <i class="fa fa-eye"></i
                            ></span>
                          </template>
                          <template slot="updates" slot-scope="props">
                            {{ props.rowData.LATEST_UPDATE }}
                          </template> -->
                        </va-data-table>
                      </b-collapse>
                    </div>

                    <br />
                    <br />

                    <div>
                      <div class="float-left">
                        <button
                          @click="resetConsultantData"
                          type="button"
                          class="btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-step-backward" /> &nbsp; Previous
                        </button>
                      </div>
                      <div class="float-right" v-if="currentConsultant.APPR_FIMM_TS_ID==15">
                        <!-- <button type="button" @click="saveAsDraft" class="btn btn-info btn-fill btn-md">
                          <i class="fa fa-edit" /> &nbsp;Save as Draft
                        </button>
                        <button
                          @click="updateRegistrationApproval(8)"
                          type="button"
                          class="ml-2 btn btn-warning btn-fill btn-md"
                        >
                          <i class="fa fa-paper-plane" /> &nbsp; Return
                        </button> -->
                        <button
                          @click="updateRegistrationApproval(5, 'Are you sure to reject?')"
                          type="button"
                          class="ml-2 btn btn-danger btn-fill btn-md"
                        >
                          <i class="fa fa-ban" /> &nbsp; Reject
                        </button>
                        <button
                          @click="updateRegistrationApproval(3, 'Are you sure to approve?')"
                          type="button"
                          class="ml-2 btn btn-success btn-fill btn-md"
                        >
                          <i class="fa fa-paper-plane" /> &nbsp; Approve
                        </button>
                      </div>
                    </div>
                  </va-card>
                </template>
              </template>

              <template v-else>
                <va-card>
                  <virtual-card :consultantData="consultantDetails"
                  :consultantApprovalData="consultantFIMMApprovalData"></virtual-card>

                  <div class="float-left">
                    <button
                      @click="viewVirtualCard = false;"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                </va-card>
              </template>
            </template>
          </b-overlay>
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
import * as servicesModule3 from '../../../app/module3/services01';
import Tabs from 'vue-tabs-with-active-line';

// Consultant Profile Data display
import ProfileView from "@/modules/consultant-management/components/applicant_profile/profile";
import ExemptionData from "@/modules/consultant-management/components/applicant_profile/exemption_data";
import VirtualCard from "@/modules/consultant-management/pages/virtual_card";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.component(Vudal);
// register globally
Vue.component('multiselect', Multiselect);

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');
const Termination = RepositoryFactory.get('termination');

export default {
  components: { Tabs, Vudal, ProfileView, ExemptionData, VirtualCard},
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
        },
        {
          title: "Bankruptcy Check",
          value: "tab5"
        }
      ],

      currentTab: 'tab1',
      show_overlay: false,

      currentDistributor: null,
      currentConsultant: null,
      viewVirtualCard: false,
      consultantDetails: null,
      visibleLog: false,

      isBusy: true,
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
        distributor: [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          // { name: 'DIST_CODE', title: 'DISTRIBUTOR CODE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DT_TYPES', title: 'DISTRIBUTOR TYPE' },
          { name: 'TOTAL_CONSULTANT', title: 'TOTAL APPLICATION' },
          { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
          { name: 'TS_PARAM', title: 'STATUS' },
          // { name: 'DIST_PHONE_NO', title: 'PHONE NO' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        consultant: [
          // {
          //   name: '__checkbox',
          //   titleClass: 'center aligned',
          //   dataClass: 'center aligned',
          // },
          // A virtual column that doesn't exist in items
          // {
          //   name: '__slot:checkbox',
          //   title: 'SELECTED',
          // },
          { name: '__slot:index', title: 'NO' },
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },

          // A column that needs custom formatting
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_MOBILE_NO', title: 'PHONE NUMBER' },
          { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
          { name: 'TYPE_NAME', title: 'CONSULTANT TYPE' },
          { name: 'TS_PARAM', title: 'STATUS' },

          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        log: [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'DATE',
            title: 'Date',
            sortField: 'CREATE_TIMESTAMP',
          },
          {
            name: 'GROUP_NAME',
            title: 'Group',
            sortField: 'GROUP_NAME',
          },
          {
            name: 'DIST_NAME',
            title: 'Creation By',
            sortField: 'USER_NAME',
          },
          {
            name: 'TS_PARAM',
            title: 'Activity',
            sortField: 'TS_PARAM',
          },

          // {
          //   name: "LATEST_UPDATE",
          //   title: "Latest Update",
          //   sortField: "LATEST_UPDATE",
          // },
          {
            name: 'APPR_REMARK',
            title: 'Remarks/Comments',
            sortField: 'APPR_REMARK',
          },
          {
            name: 'CREATE_TIMESTAMP',
            title: 'Latest Update',
            sortField: 'LATEST_UPDATE',
          },
        ],
      },
      // filter: {
      //   distributor: null,
      //   consultant: null,
      // },
      search: {
        distributor: '',
        consultant: '',
      },

      distributorsAPI: [],
      consultantsAPI: [],
      logAPI: [],
      consultantFIMMApprovalData: '',

      // distributor: [],
      // consultants: null,

      currentPage: 1,
      perPage: '10',

      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],
        FILTER_APPLICATION_TYPE: null,
        REMARK_COMMENTS: "",
        SUPPORTED_DOCUMENTS: "",
        SUPPORTED_UPLOADED_DOCUMENTS: [],
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',

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
              }
            ],
          },
        ],
      },

      tabSchema3: {
        groups: [
           {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                rows: 10,
                max: 1000,
                label: "Remarks / Comments",
                hint: "maximum of 1000 characters",
                model: "REMARK_COMMENTS",
                placeholder: "Enter Remarks or Comments",
                styleClasses: "col-md-12",
                disabled: true,
              },
            ]
          }
        ],
      },

      approvalDocumentSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Uploaded Documents",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "SUPPORTED_UPLOADED_DOCUMENTS",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
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
    await this.getDistributorsConsultantRecords();
    // await this.getConsultantRecord();
    // await this.getDocumentByID('241');
  },

  computed: {
    filteredDistributor() {
      const search = this.search.distributor.toLowerCase();
      if (this.search) {
        return this.distributorsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.distributorsAPI;
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
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },

    async getDistributorsConsultantRecords() {
      this.show_overlay = true;
      this.distributorsAPI = await services02module2.getDistributorsConsultantRecords();
      this.show_overlay = false;
    },

    async setCurrentDistributor(props) {
      await this.getConsultantRecord(props.rowData);
      this.currentDistributor = props.rowData;
    },

    async getConsultantRecord(data) {
      const response = await services02module2.getConsultantDataByDistributor(data);
      this.consultantsAPI = response;
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
      try {
        this.currentConsultant = props.rowData;
        await this.getApplicationApprovalLog(
          props.rowData.CONSULTANT_ID,
          props.rowData.CONSULTANT_TYPE_ID, 
          props.rowData.CONSULTANT_APPLICATION_TYPE
        );
        await this.getDocumentByID(props.rowData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS');
      } catch (error) {
        console.log(error);
      }
    },

    getApplicationApprovalLog: async function (consultId, consultantType, applicationType) {
      const response = await services02module2.getApplicationApprovalLog(consultId, consultantType, applicationType);
      this.logAPI = response;
      this.getConsultantApprovalDocument(consultId, consultantType, applicationType, 'REGISTRATION_APPROVAL_DOCUMENT');
    },

    generateVirtualCard(props){
      this.consultantDetails = props.rowData;
      this.getConsultantApprovalData();
      this.viewVirtualCard = true;
    },

    async getConsultantApprovalData () {
      try {
        await services04module2.consultantFIMMApprovalData(
          this.consultantDetails.CONSULTANT_ID,
          this.consultantDetails.CONSULTANT_TYPE_ID,
          this.consultantDetails.CONSULTANT_APPLICATION_TYPE,
        )
          .then((response) => {
            this.consultantFIMMApprovalData = response
          })
      } catch (error) {
        console.log(error)
      }
    },

    setCurrentConsultant(props) {
      console.log('inside setCurrentConsultant');
      const index = this.model.CONSULTANT_ID.findIndex(
        el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID,
      );

      console.log(props);

      if (index >= 0) {
        this.model.CONSULTANT_ID.splice(index, 1);
      } else {
        this.model.CONSULTANT_ID.push(props.rowData);
      }
      console.log(this.model.CONSULTANT_ID);
    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema === 'TERMINATION_TYPE') {
        // this.visible.TERMINATION_TYPE = newVal.value;
        this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false;
        if (newVal.label.match('Other')) {
          this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true;
        }
      }
    },
    onValidated(isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    },

    saveAsDraft: async function(status) {},

    updateRegistrationApproval: async function(status, confirm_text) {
      if(confirm(confirm_text)){
            try {
              const data = new FormData();
              data.append("ACTION", status); // Refer admin management module for TASK STATUS
              data.append("DISTRIBUTOR_ID", this.currentDistributor.DISTRIBUTOR_ID);
              data.append("CONSULTANT_ID", this.currentConsultant.CONSULTANT_ID);
              data.append("CONSULTANT_TYPE_ID", this.currentConsultant.CONSULTANT_TYPE_ID);
              data.append("CONSULTANT_APPLICATION_TYPE", this.currentConsultant.CONSULTANT_APPLICATION_TYPE);
              data.append("APPR_REMARK", this.model.REMARK_COMMENTS);
              data.append("NOTI_APPROVE_REMARK", '(CONSULTANT REGISTRATION) Approved by RD');
              data.append("NOTI_REJECT_REMARK", '(CONSULTANT REGISTRATION) Rejected by RD');
              data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
              data.append("APPR_GROUP_ID_ADMIN", "3");  //Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
              data.append("APPR_GROUP_ID_CONST", "1");  //Group ID for for Notification to Consultant in am/CONSULTANT_MANAGE_GROUP
              data.append("APPR_GROUP_ID_RD", "4");
              data.append("APPR_PUBLISH_STATUS", "1"); // Publish Status Submit
              data.append("CREATE_BY", this.model.CREATE_BY);
              if(status == 3){ //APPROVED
                data.append("TS_ID", "3"); //Prefer admin_management DB -> TASK_STATUS for TS_ID
              }else if(status == 5){ //REJECTED
                data.append("TS_ID", "5");
              }
              for (let i = 0; i < this.model.SUPPORTED_DOCUMENTS.length; i++) {
                data.append("FILES[]", this.model.SUPPORTED_DOCUMENTS[i]);
              }
              data.append("FIELD_NAME", 'REGISTRATION_APPROVAL_RD');
              data.append("TABLE_NAME", 'REGISTRATION_APPROVAL_DOCUMENT');

              if (status!=3 && this.model.REMARK_COMMENTS == "") {
                Vue.$toast.open({
                  message: "Please write some remarks / comments",
                  type: 'error',
                });
              }else{    
                this.show_overlay = true;     
                const response = await services02module2.approveRegistrationStatus(data);
                if(response){
                    this.resetConsultantData();
                    this.getConsultantRecord(this.currentDistributor);
                    this.show_overlay = false;
                    // if(status == 3) {
                    //     // let route = this.$router.resolve({ name: 'VirtualCard', params: { id: this.currentConsultant.CONSULTANT_ID } });
                    //     // window.open(route.href, '_blank');
                    //     //this.$router.push({ name: 'VirtualCard', params: { id: this.currentConsultant.CONSULTANT_ID } })
                    // }else{
                    //   this.resetConsultantData();
                    //   this.getConsultantRecord(this.currentDistributor);
                    //   this.show_overlay = false;
                    // }
                }
              }
            } catch (error) {
              console.log(error);
            }
      }
    },

    resetConsultantData () {
      this.currentConsultant = null;
      this.model.PROFILE_UPLOADED_DOCUMENTS = [];
      this.model.SUPPORTED_UPLOADED_DOCUMENTS = [];
      this.model.REMARK_COMMENTS = '';
      this.model.SUPPORTED_DOCUMENTS = [];
      this.logAPI = [];
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

    getConsultantApprovalDocument: async function(consultId, consultantType, applicationType, tableName) {
      const response = await services04module2.consultantApprovalDocument(consultId, consultantType, applicationType, tableName);
      this.model.SUPPORTED_UPLOADED_DOCUMENTS = [];
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
          docID: el.CONSULTANT_APPROVAL_DOC_ID,
          name: el.DOC_ORIGINAL_NAME + " - By " + el.CREATE_BY  + "." + el.DOC_FILETYPE,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };
        this.model.SUPPORTED_UPLOADED_DOCUMENTS.push(data);
      });
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

      return new File(byteArrays, 'pot', { type: contentType });
    },
  },
};
</script>
