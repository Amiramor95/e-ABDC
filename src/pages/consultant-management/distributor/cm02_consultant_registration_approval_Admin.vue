<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!currentConsultant">
              <va-card>
                <h4 style="margin-top:0px; margin-bottom:20px">
                  Registration Approval
                </h4>
                <br />

                <vue-form-generator
                  :model="model3"
                  :schema="paymentSchema"
                  :options="formOptions"
                  ref="tabForm2"
                  @model-updated="onModelUpdated"
                  @validated="onValidated"
                >
                </vue-form-generator>
                <br />

                <h4 style="margin-top:0px; margin-bottom:20px">
                  List of New Consultant Application
                </h4>

                <div class="row justify-content-between align-items-center">
                  <div class="col-xl-6 col-lg-8 col-12">
                    <vue-form-generator
                      :model="model"
                      :schema="applicationTypeSchema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                  </div>
                  
                  <div class="col-lg-3 col-12">
                    <va-input
                      :placeholder="$t('Search')"
                      v-model="search.consultant"
                      removable
                    >
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>
                <br />
                <!-- <div
                    style="display: flex; align-items:center"
                    class=" col-4 form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input
                      v-model="search.consultant"
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                  </div> -->
                <!-- <vue-form-generator
                    :model="model"
                    :schema="applicationTypeSchema"
                    :options="formOptions"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator> -->

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
                  <template slot="checkbox" slot-scope="props">
                    <b-form-checkbox
                      v-model="props.rowData.selected"
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
                <br />
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
                              <td v-if="!changeAgentType">{{ consultantLicenseData.CANDIDATE_CATEGORY_NAME }}
                                <span
                                  style="cursor: pointer;"
                                  v-b-tooltip.hover
                                  title="Edit Agent Type"
                                  class="badge badge-primary mx-2"
                                  @click="changeConsultantAgentType"
                                >
                                  <i class="fa fa-edit" style="font-size:16px; padding:1px;"></i
                                  ></span>
                              </td>

                              <td v-else>
                                <div>
                                  <b-form-group>
                                    <b-form-radio-group
                                      v-model="model.AGENT_CATEGORY"
                                      :options="agent_types"
                                      name="radio-agent-type"
                                    ></b-form-radio-group>
                                  </b-form-group>

                                  <div v-if="model.AGENT_CATEGORY == 1">
                                    <b-form-group
                                      label="Select position:"
                                      label-for="positions"
                                      label-cols-lg="3"
                                      label-cols-md="2"
                                      description=""
                                    >

                                      <select id="positions" class="form-control col-lg-9 col-md-10 p-0"
                                        v-model="model.AGENT_POSITION_CATEGORY" placeholder="Select a position">
                                        <option
                                          v-for="position in agent_positions"
                                          v-bind:key="position.ID"
                                          :value="position.ID"
                                        >
                                          {{position.NAME}}
                                        </option>
                                      </select>
                                    </b-form-group>

                                    <div v-if="model.AGENT_POSITION_CATEGORY">
                                      <b-form-group
                                        label="Position:"
                                        label-cols-lg="3"
                                        label-cols-md="2"
                                        label-for="input-1"
                                        description=""
                                        v-if="model.AGENT_POSITION_CATEGORY === 3"
                                      >
                                        <b-form-input
                                          id="positions"
                                          v-model="model.AGENT_POSITION"
                                          placeholder="Position's name"
                                          class="col-lg-9 col-md-10"
                                        ></b-form-input>
                                      </b-form-group>
                                    </div>
                                  </div>
                                </div>

                                <span
                                  style="cursor: pointer;"
                                  class="badge badge-primary mr-2 p-2"
                                  @click="saveAgentType"
                                >
                                  Save</span>

                                <span
                                  style="cursor: pointer;"
                                  class="badge badge-danger mx-0 p-2"
                                  @click="changeAgentType=false; model.AGENT_CATEGORY=''; model.AGENT_POSITION_CATEGORY=''; model.AGENT_POSITION='';"
                                >
                                  Cancel</span>
                              </td>
                            </tr>
                            <tr v-if="consultantLicenseData.CANDIDATE_CATEGORY_NAME== 'STAFF'">
                              <td style="width: 15%">Position</td>
                              <td>
                                {{ consultantLicenseData.CANDIDATE_POSITION_CATEGORY_NAME }}
                                <span v-if="consultantLicenseData.CANDIDATE_POSITION_CATEGORY_NAME=='OTHERS'"> - {{ consultantLicenseData.CANDIDATE_POSITION}}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>License Type</td>
                              <td>{{ consultantLicenseData.TYPE_NAME }} ({{ consultantLicenseData.TYPE_FULL_NAME }})</td>
                            </tr>
                            <tr>
                              <td>Distributor</td>
                              <td>{{ consultantLicenseData.DIST_NAME }}</td>
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
                                  <td v-if="currentConsultant.EXAM_RESULT==0">
                                    Fail
                                  </td>
                                  <td v-else-if="currentConsultant.EXAM_RESULT==1">
                                    Pass
                                  </td>
                                  <td v-else>
                                    Exam not given
                                  </td>
                              </tr>

                              <tr>
                                <td>
                                  Certificate
                                </td>
                                <td>
                                  <router-link :to="{ name: 'exam-certificate'}" target="_blank">View</router-link>
                                </td>
                                <!-- <td v-if="currentConsultant.EXAM_RESULT==1">
                                  <router-link :to="{ name: 'user'}" target="_blank">View</router-link>
                                </td>
                                <td v-else>
                                  Not Available
                                </td> -->
                              </tr>
                            </tbody>
                          </table>

                          <hr>

                          <!-- Get Exam session Details -->
                          <div v-if="currentConsultant">
                            <examination-session-details :consultantData="currentConsultant"></examination-session-details>
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
              </va-card>
              <br />

              <va-card>
                <h4 style="margin-top:0">Application Approval</h4>
                <br />
                <div v-if="currentConsultant.APPR_PUBLISH_STATUS==0">
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
                    :model="model2"
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

              <va-card class="mt-4">
                <div class="ml-2">
                  Approval Log

                  <button
                    v-if="visibleLog"
                    v-b-toggle.approval-log-admin
                    type="button"
                    class="float-right btn-fill btn-md"
                  >
                    <i class="fa fa-eye-slash"></i>
                  </button>
                  <button
                    v-else
                    v-b-toggle.approval-log-admin
                    type="button"
                    class="float-right btn-fill btn-md"
                  >
                    <i class="fa fa-eye"></i>
                  </button>

                  <hr />
                  <b-collapse id="approval-log-admin" class="mt-2" v-model="visibleLog">
                    <div class="row">
                      <div class="flex md2 offset--md10">
                        <va-input
                          :placeholder="$t('Search')"
                          v-model="search.log"
                          removable
                        >
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
                      <template slot="APPR_REMARK" slot-scope="props">
                        <!-- {{ props.rowData.APPR_REMARK }} -->
                        <span
                          v-b-tooltip.hover
                          v-on:click="readMore(props.rowData)"
                          title="Read more"
                          class="mr-2"
                        >
                          <i class="fa fa-window-restore"></i>
                        </span>
                      </template>
                      <!-- <template slot="updates" slot-scope="props">
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

                  <div class="float-right" v-if="currentConsultant.APPR_PUBLISH_STATUS==0">
                    <!-- <button
                        @click="saveAsDraft"
                        type="button"
                        class="btn btn-info btn-fill btn-md"
                      >
                        <i class="fa fa-edit" /> &nbsp;Save as Draft
                      </button> -->
                    <button
                      @click="updateRegistrationApproval(8, 'Are you sure to return?')"
                      type="button"
                      class="ml-2 btn btn-warning btn-fill btn-md"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Return
                    </button>
                    <button
                      @click="updateRegistrationApproval(5, 'Are you sure to reject?')"
                      type="button"
                      class="ml-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Reject
                    </button>
                    <button
                      @click="updateRegistrationApproval(14, 'Are you sure to review?')"
                      type="button"
                      class="ml-2 btn btn-success btn-fill btn-md"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Review
                    </button>
                  </div>
                </div>
              </va-card>
            </template>
          </b-overlay>

          <vudal name="readMoreModal" class="widthModal">
            <div class="header">
              Remark<i class="close icon">&times;</i>
            </div>
            <div class="content">
              <b-textarea rows="5" v-model="read_remark" disabled></b-textarea>
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
        </div>
      </div>
    </div>
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

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import * as services06Module0 from '../../../app/module0/services06'
import moment from 'moment'

import * as servicesmodule0 from '../../../app/module0/services'
import * as services05module1 from '@/app/module1/services05'
import * as servicesmodule2 from '../../../app/module2/services'
import * as services02module2 from '../../../app/module2/services02'
import * as services04module2 from '../../../app/module2/services04'
import * as services05module6 from '../../../app/module6/services05'

import RepositoryFactory from '../../../repositories/RepositoryFactory'
import TerminationRepository from '../../../repositories/module2/TerminationRepository'
import * as servicesModule3 from '../../../app/module3/services01'
import Tabs from 'vue-tabs-with-active-line'
import { getConsultantById } from '../../../app/module2/services01'

// Consultant Profile Data display
import ProfileView from '@/modules/consultant-management/components/applicant_profile/profile'
import ExaminationSessionDetails from '@/modules/consultant-management/components/applicant_profile/examination_sessions_details'
import ExemptionData from '@/modules/consultant-management/components/applicant_profile/exemption_data'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
// register globally
Vue.component('multiselect', Multiselect)

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord')
const Termination = RepositoryFactory.get('termination')

export default {
  components: { Tabs, Vudal, ProfileView, ExaminationSessionDetails, ExemptionData },
  data () {
    return {
      tabs: [
        {
          title: 'Applicant Profile',
          value: 'tab1',
        },
        {
          title: 'Type of Consultant',
          value: 'tab2',
        },
        {
          title: 'Examination',
          value: 'tab3',
        },
        {
          title: 'Uploaded Document',
          value: 'tab4',
        },
      ],

      currentTab: 'tab1',

      currentDistributor: null,
      currentConsultant: null,
      showApplicationApproval: false,

      isBusy: true,
      show_overlay: false,
      changeAgentType: false,
      applicationType: [
        {
          label: 'New',
          value: '1',
        },
        {
          label: 'Re-register',
          value: '2',
        },
        {
          label: 'Re-sit',
          value: '3',
        },
      ],

      // for agent types
      agent_types: [
        {
          text: 'Staff',
          value: 1,
        },
        {
          text: 'Consultant',
          value: 2,
        },
      ],

      agent_positions: [
        {
          ID: 1,
          NAME: 'CEO',
        },
        {
          ID: 2,
          NAME: 'DIRECTOR',
        },
        {
          ID: 3,
          NAME: 'OTHERS',
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
          { name: 'TYPE_NAME', title: 'CONSULTANT TYPE' },
          { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
          { name: 'WAIVER', title: 'WAIVER' },
          { name: 'EXAMINATION_TYPE', title: 'EXAMINATION TYPE' },
          { name: 'TS_PARAM', title: 'STATUS' },
          { name: 'TOTAL_AMOUNT_FEE', title: 'FEE AMOUNT (RM)' },
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
            name: '__slot:APPR_REMARK',
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

      search: {
        consultant: '',
      },
      filter: {
        consultant: '',
      },
      // filter: {
      //   distributor: null,
      //   consultant: null,
      // },

      consultantsAPI: [],
      currentConsultant: null,
      consultantApproval: '',
      distributorData: '',
      consultants: null,
      consultantLicenseData: '',
      visibleLog: false,
      logAPI: [],
      read_remark: '',
      distributorWallet: {},

      currentPage: 1,
      perPage: '10',
      visible: {
        TERMINATION_FORM: false,
        TERMINATION_TYPE_OTHER_SPECIFY: false,
      },
      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],
        FILTER_APPLICATION_TYPE: null,
        REMARK_COMMENTS: '',
        SUPPORTED_DOCUMENTS: [],
        SUPPORTED_UPLOADED_DOCUMENTS: [],
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
        // CONSULTANTS: [],

        AGENT_CATEGORY: '',
        AGENT_POSITION_CATEGORY: '',
        AGENT_POSITION: '',
      },

      model2: {
        APPR_REMARK: '',
      },

      model3: {
        AVAILABLE_BALANCE: '',
        DEDUCTION_AMOUNT: '',
        REMAINING_AMOUNT: '',
      },

      // fields.distributor: ,
      // fields: ,

      paymentSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Pre-Payment Balance (RM)',
                model: 'AVAILABLE_BALANCE',
                placeholder: 'Pre-Payment Balance',
                required: true,
                validator: 'string',
                styleClasses: 'col-lg-4 col-md-6',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Amount to be Deducted (RM)',
                model: 'DEDUCTION_AMOUNT',
                placeholder: 'Amount to be Deducted',
                required: true,
                validator: 'string',
                styleClasses: 'col-lg-4 col-md-6',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Balance after Deduction (RM)',
                model: 'REMAINING_AMOUNT',
                placeholder: 'Balance after Deduction',
                required: true,
                validator: 'string',
                styleClasses: 'col-lg-4 col-md-6',
                disabled: true,
              },
            ],
          },
        ],
      },

      applicationTypeSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'FILTER_APPLICATION_TYPE',
                placeholder: 'Filter by Application Type',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: true,
                },

                values: (model, schema) => {
                  return this.applicationType
                },
              },
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
                labels: 'Upload Document',
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'SUPPORTED_DOCUMENTS',
                type: 'vfg-consultant-custom-multiple-file',
                styleClasses: 'col-md-12',
                hint: 'Accepted format : (.pdf)',
                required: false,
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
            styleClasses: 'row',
            fields: [
              {
                labels: 'Approval Documents',
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'SUPPORTED_UPLOADED_DOCUMENTS',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    }
  },

  created () {
    this.getDistributorDetails()
  },

  computed: {
    filteredConsultant () {
      const search = this.search.consultant.toLowerCase()
      const isFiltering = this.model.FILTER_APPLICATION_TYPE
      const isSearching = !!this.search.consultant

      if ((isFiltering && isSearching) || isSearching) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key =>
            `${el[key]}`.toLowerCase().match(search),
          )
        })
      }

      if (isFiltering) {
        return this.consultantsAPI.filter(el =>
          el.APPLICATION_TYPE.toLowerCase().match(
            this.model.FILTER_APPLICATION_TYPE.label.toLowerCase(),
          ),
        )
      }

      return this.consultantsAPI
    },
  },

  methods: {
    handleClick (newTab) {
      this.currentTab = newTab
    },

    async readMore (data) {
      this.$modals.readMoreModal.$show()
      this.read_remark = data.APPR_REMARK
    },

    // get distributor details
    getDistributorDetails: async function () {
      this.show_overlay = true
      const user = localStorage.getItem('user')
      const response = await services05module1.getdistributordetails(JSON.parse(user).user_id)
      this.distributorData = response
      this.getDistributorWallet(JSON.parse(user).user_id)
    },

    async getDistributorWallet (userId) {
      // const response = await services02module2.getDistributorWallet();
      const response = await services05module6.getdistributordetails(userId)
      this.distributorWallet = response
      this.getConsultantRecord()
    },

    async getConsultantRecord () {
      // const response = await ConsultantRecord.getConsultantRecord();
      const response = await services04module2.getConsultantForAdminApproval(this.distributorData.DISTRIBUTOR_ID)
      this.consultantsAPI = response
      this.amountToDeduct()
      this.show_overlay = false
    },

    setCurrentDistributor (props) {
      console.log(props)
      this.currentDistributor = props.rowData.DIST_NAME
    },

    async viewCurrentConsultant (props) {
      try {
        this.currentConsultant = props.rowData
        this.getConsultantLicenseType()
        this.getConsultantApprovalData()
        await this.getApplicationApprovalLog(
          props.rowData.CONSULTANT_ID,
          props.rowData.CONSULTANT_TYPE_ID,
          props.rowData.CONSULTANT_APPLICATION_TYPE,
        )
        await this.getDocumentByID(props.rowData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS')
      } catch (error) {
        console.log(error)
      }
    },

    async getConsultantLicenseType () {
      try {
        await services04module2.consultantLicenseType(
          this.currentConsultant.CONSULTANT_ID,
          this.currentConsultant.CONSULTANT_TYPE_ID,
          this.currentConsultant.CONSULTANT_APPLICATION_TYPE,
        )
          .then((response) => {
            this.consultantLicenseData = response
          })
      } catch (error) {
        console.log(error)
      }
    },

    async getConsultantApprovalData () {
      try {
        await services04module2.consultantApprovalData(
          this.currentConsultant.CONSULTANT_ID,
          3,
          this.currentConsultant.CONSULTANT_TYPE_ID,
          this.currentConsultant.CONSULTANT_APPLICATION_TYPE,
        ) // 3 = APPR_GROUP_ID_ADMIN
          .then((response) => {
            this.consultantApproval = response
            this.model2 = _.cloneDeep(this.consultantApproval)
          })
      } catch (error) {
        console.log(error)
      }
    },

    getApplicationApprovalLog: async function (consultId, consultantType, applicationType) {
      const response = await services02module2.getApplicationApprovalLog(consultId, consultantType, applicationType)
      this.logAPI = response
      this.getConsultantApprovalDocument(consultId, consultantType, applicationType, 'REGISTRATION_APPROVAL_DOCUMENT')
    },

    amountToDeduct () {
      // Getting Available Balance
      const current_balance = parseFloat(this.distributorWallet.AVAILABLE_BALANCE)
      if(current_balance < 0){
        this.model3.AVAILABLE_BALANCE = 0
      }else{
        this.model3.AVAILABLE_BALANCE = parseFloat(current_balance.toFixed(2))
      }

      // Calculating Amount to Deduct
      const consultants = this.consultantsAPI
      var amount_to_deduct = 0
      consultants.forEach(el => {
        if (el.APPR_STATUS_ID == 15) { // Pending for Distributor Review
          if (el.TOTAL_AMOUNT_FEE == null) {
            el.TOTAL_AMOUNT_FEE = 0
          }
          amount_to_deduct = parseFloat(amount_to_deduct) + parseFloat(el.TOTAL_AMOUNT_FEE)
        }
      })
      this.model3.DEDUCTION_AMOUNT = parseFloat(amount_to_deduct.toFixed(2))

      // Calculating Remaining Amount
      if(this.model3.AVAILABLE_BALANCE <= this.model3.DEDUCTION_AMOUNT){
        this.model3.REMAINING_AMOUNT = 0;
      }else{
        const remaining_amount = current_balance - amount_to_deduct
        this.model3.REMAINING_AMOUNT = parseFloat(remaining_amount.toFixed(2))
      }
    },

    onModelUpdated (newVal, schema) {
      console.log(schema)
      // if (schema === "FILTER_APPLICATION_TYPE") {
      //   // this.visible.TERMINATION_TYPE = newVal.value;

      //   console.log(
      //     this.consultantsAPI.filter(el =>
      //       el.APPLICATION_TYPE.toLowerCase().match(
      //         this.model.FILTER_APPLICATION_TYPE.label.toLowerCase()
      //       )
      //     )
      //   );
      // }
    },

    onValidated (isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error)
    },

    saveAsDraft: async function (status) {},

    updateRegistrationApproval: async function (status, confirm_text) {
      if (confirm(confirm_text)) {
        try {
          if (status === 14 && parseFloat(this.model3.AVAILABLE_BALANCE) < parseFloat(this.model3.DEDUCTION_AMOUNT)) {
            Vue.$toast.open({
              message: 'Insufficient Pre-Payment Balance to proceed actions.',
              type: 'error',
            })
          } else{
            const data = new FormData()
            data.append('ACTION', status) // Refer admin management module for TASK STATUS
            data.append('DISTRIBUTOR_ID', this.distributorData.DISTRIBUTOR_ID)
            data.append('CONSULTANT_ID', this.currentConsultant.CONSULTANT_ID)
            data.append('CONSULTANT_TYPE_ID', this.currentConsultant.CONSULTANT_TYPE_ID)
            data.append('CONSULTANT_APPLICATION_TYPE', this.currentConsultant.CONSULTANT_APPLICATION_TYPE)
            data.append('NOTI_APPROVE_REMARK', '(CONSULTANT REGISTRATION) Reviewed by Admin')
            data.append('NOTI_RETURN_REMARK', '(CONSULTANT REGISTRATION) Returned by Admin')
            data.append('NOTI_REJECT_REMARK', '(CONSULTANT REGISTRATION) Rejected by Admin')
            data.append('APPR_REMARK', this.model.REMARK_COMMENTS)
            data.append('APPR_GROUP_ID_MANAGER', '1') // Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
            data.append('APPR_GROUP_ID_ADMIN', '3') // Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
            data.append('APPR_GROUP_ID_CONST', '1') // Group ID for for Notification to Consultant in am/CONSULTANT_MANAGE_GROUP
            if (status == 14) { // REVIEWED
              data.append('TS_ID', '14') // Prefer admin_management DB -> TASK_STATUS for TS_ID
            } else if (status == 8) { // RETURNED
              data.append('TS_ID', '8')
            } else if (status == 5) { // REJECTED
              data.append('TS_ID', '5')
            }
            data.append('APPR_PUBLISH_STATUS', '1') // Publish Status Submit
            data.append('CREATE_BY', this.model.CREATE_BY)
            for (let i = 0; i < this.model.SUPPORTED_DOCUMENTS.length; i++) {
              data.append('FILE[]', this.model.SUPPORTED_DOCUMENTS[i])
            }
            data.append('FIELD_NAME', 'REGISTRATION_APPROVAL_ADMIN')
            data.append('TABLE_NAME', 'REGISTRATION_APPROVAL_DOCUMENT')

            // (processflowID,approval_level_index)
            // const approvalEntryLevel = await services06Module0.getApprovalLevelDistributor(5, 1);
            // data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

            // const approvalLevel = await services06Module0.getApprovalLevelDistributor(5, 2);
            // data.append("APPR_LIST", JSON.stringify(approvalLevel));

            if (status != 14 && this.model.REMARK_COMMENTS == '') {
              Vue.$toast.open({
                message: 'Please write some remarks / comments',
                type: 'error',
              })
            } else {
              this.show_overlay = true
              const response = await services02module2.postRegistrationStatus(data)
              if (response) {
                this.show_overlay = false
                this.resetConsultantData()
                this.getConsultantRecord()
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    resetConsultantData () {
      this.currentConsultant = null
      this.consultantApproval = null
      this.consultantLicenseData = ''
      this.model.PROFILE_UPLOADED_DOCUMENTS = []
      this.model.SUPPORTED_UPLOADED_DOCUMENTS = []
      this.model.REMARK_COMMENTS = ''
      this.model.SUPPORTED_DOCUMENTS = []
      this.logAPI = []
      this.changeAgentType = false
    },

    changeConsultantAgentType () {
      if (confirm('Are you sure to change Agent Type?')) {
        this.changeAgentType = true
        this.model.AGENT_CATEGORY = this.consultantLicenseData.CANDIDATE_CATEGORY
        this.model.AGENT_POSITION_CATEGORY = this.consultantLicenseData.CANDIDATE_POSITION_CATEGORY
        this.model.AGENT_POSITION = this.consultantLicenseData.CANDIDATE_POSITION
      } else {
        return false
      }
    },

    async saveAgentType () {
      if (confirm('Are you sure to submit?')) {
        try {
          const data = new FormData()
          data.append('CONSULTANT_ID', this.currentConsultant.CONSULTANT_ID)
          data.append('AGENT_CATEGORY', this.model.AGENT_CATEGORY)

          if (this.model.AGENT_CATEGORY == 2) {
            data.append('AGENT_POSITION_CATEGORY', '')
            data.append('AGENT_POSITION', '')
          } else {
            data.append('AGENT_POSITION_CATEGORY', this.model.AGENT_POSITION_CATEGORY ? this.model.AGENT_POSITION_CATEGORY : '')

            if (this.model.AGENT_POSITION_CATEGORY == 3) {
              data.append('AGENT_POSITION', this.model.AGENT_POSITION ? this.model.AGENT_POSITION : '')
            } else {
              data.append('AGENT_POSITION', '')
            }
          }

          this.show_overlay = true
          const response = await services04module2.updateConsultantLicenseDetail(data)
          if (response) {
            this.show_overlay = false
            this.getConsultantLicenseType()
            this.changeAgentType = false
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        return false
      }
    },

    getDocumentByID: async function (consultId, other_documents) {
      const response = await services02module2.getConsultantDocuments(consultId, other_documents)
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

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
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data)
      })
    },

    getConsultantApprovalDocument: async function (consultId, consultantType, applicationType, tableName) {
      const response = await services04module2.consultantApprovalDocument(consultId, consultantType, applicationType, tableName)
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CONSULTANT_APPROVAL_DOC_ID,
          name: el.DOC_ORIGINAL_NAME + ' - By ' + el.CREATE_BY + '.' + el.DOC_FILETYPE,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.SUPPORTED_UPLOADED_DOCUMENTS.push(data)
      })
    },

    b64toBlobPDF (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      // console.log(byteArrays);

      return new File(byteArrays, 'pot', { type: contentType })
    },

    // getDocumentByID: async function(consultId, other_documents) {
    //   const response = await services02module2.getConsultantByID(consultId, other_documents);
    //   response.DOCUMENTS.forEach(el => {
    //     el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

    //     el.DOC_BLOB = new File(
    //       [el.DOC_BLOB],
    //       el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
    //       {
    //         type: el.DOC_BLOB.type
    //       }
    //     );

    //     const data = {
    //       docID: el.CA_DOCUMENT_ID,
    //       name: el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
    //       size: el.DOC_FILESIZE,
    //       type: el.DOC_FILETYPE,
    //       ext: "exe",
    //       url: window.URL.createObjectURL(el.DOC_BLOB)
    //     };

    //     this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
    //   });

    //   console.log(
    //     "getConsultantDocuments: ",
    //     this.model.PROFILE_UPLOADED_DOCUMENTS
    //   );
    // },

    // // fix this
    // setCurrentConsultantAll(scope) {
    //   if (this.mappedSelectedConsultantArray.length) {
    //     this.$refs['consultantTable'].clearSelected();
    //   } else {
    //     this.$refs['consultantTable'].selectAllRows();
    //   }
    // },

    // setCurrentConsultant(props) {
    //   console.log('inside setCurrentConsultant');
    //   const index = this.model.CONSULTANT_ID.findIndex(
    //     el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID,
    //   );

    //   console.log(props);

    //   if (index >= 0) {
    //     this.model.CONSULTANT_ID.splice(index, 1);
    //   } else {
    //     this.model.CONSULTANT_ID.push(props.rowData);
    //   }
    //   console.log(this.model.CONSULTANT_ID);
    // },
  },
}
</script>
