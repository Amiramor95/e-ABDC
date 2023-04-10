<template>
  <div class="">
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="row">
        <div class="col-12">
          <va-card v-if="!currentConsultant">
            <h4 style="margin-top:0">List of Consultant Appeal Application</h4>
            <br />

            <div class="row justify-content-between align-items-center">
              <div class="col-xl-6 col-lg-8 col-12">
                <vue-form-generator
                  :model="filterModel"
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

            <va-data-table
              :fields="fields.consultant"
              :data="filteredConsultant"
              no-data-label="No data found"
              :per-page="20"
              :datacount="filteredConsultant.length"
              :dataperpage="20"
              clickable
            >
              <!-- <template slot="actions" slot-scope="props">
                <b-form-checkbox
                  v-model="props.rowData.selected"
                  @change="setCurrentConsultant(props)"
                />
              </template> -->

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
          </va-card>

          <template v-else>
            <va-card>
              <h4 style="margin-top:0">Consultant Application Details</h4>
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
                              :model="model2"
                              :schema="OtherDocumentsSchema"
                              :options="formOptions"
                              ref="OtherDocumentsSchema"
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
            </va-card>
            <br />

            <va-card>
              <h4 style="margin-top:0px; margin-bottom:20px">
                Appeal Application
              </h4>
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
              <vue-form-generator
                :model="model2"
                :schema="appealDocumentViewSchema"
                :options="formOptions"
                ref="appealDocumentViewSchema"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>

              <!-- v-if="this.model.CONSULTANT_ID.length" -->
            </va-card>
            <br />
            <va-card>
              <h4 style="margin-top:0px; margin-bottom:20px">
                Status and Justification
              </h4>
              <br />

              <div v-if="currentConsultant.APPEAL_STATUS_ID==15 || currentConsultant.APPEAL_STATUS_ID==7">
                <vue-form-generator
                  :model="model2"
                  :schema="tabSchema3"
                  :options="formOptions"
                  ref="tabForm2"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
              </div>

              <div v-else>
                <vue-form-generator
                  :model="model"
                  :schema="tabSchema4"
                  :options="formOptions"
                  ref="tabForm3"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
              </div>

              <br />
              <!-- v-if="this.model.CONSULTANT_ID.length" -->

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
              <div class="float-right" v-if="currentConsultant.APPEAL_STATUS_ID==15 || currentConsultant.APPEAL_STATUS_ID==7">
                <button
                  @click="approveAppeal(8, 'Are you sure to return?')"
                  type="button"
                  class="ml-2 btn btn-warning btn-fill btn-md"
                >
                  <i class="fa fa-paper-plane" /> &nbsp; Return
                </button>
                <button
                  @click="approveAppeal(5, 'Are you sure to reject?')"
                  type="button"
                  class="ml-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-ban" /> &nbsp; Reject
                </button>
                <button
                  @click="approveAppeal(14, 'Are you sure to approve?')"
                  type="button"
                  class="ml-2 btn btn-success btn-fill btn-md"
                >
                  <i class="fa fa-paper-plane" /> &nbsp; Approve
                </button>
              </div>
            </va-card>

            <va-card class="mt-4">
              <div class="ml-2">
                Approval Log

                <button
                  v-if="visibleLog"
                  v-b-toggle.appeal-approval-log-admin
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-eye-slash"></i>
                </button>
                <button
                  v-else
                  v-b-toggle.appeal-approval-log-admin
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-eye"></i>
                </button>

                <hr />
                <b-collapse id="appeal-approval-log-admin" class="mt-2" v-model="visibleLog">
                  <div class="row">
                    <div class="flex md2 offset--md10">
                      <va-input
                        :placeholder="$t('Search')"
                        v-model="filter.log"
                        removable
                      >
                        <va-icon name="fa fa-search" slot="prepend" />
                      </va-input>
                    </div>
                  </div>
                  <va-data-table
                    :fields="fields.log"
                    :data="appeallogAPI"
                    no-data-label="No data found"
                    :per-page="parseInt(perPage)"
                    :datacount="appeallogAPI.length"
                    :dataperpage="parseInt(perPage)"
                    clickable
                  >
                    <template slot="no" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>
                    <template slot="APPR_REMARK" slot-scope="props">
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
            </va-card>
          </template>
        </div>
      </div>
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
import moment from 'moment'

import RepositoryFactory from '../../../repositories/RepositoryFactory'
import Tabs from 'vue-tabs-with-active-line'
import * as services02module2 from '../../../app/module2/services02'
import * as services04module2 from '../../../app/module2/services04'
import * as services05module1 from '../../../app/module1/services05'

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

      applicationTypeFilter: [
        {
          label: 'Termination',
          value: '1',
        },
        {
          label: 'Bankruptcy',
          value: '2',
        },
        {
          label: 'Exam Related',
          value: '3',
        },
      ],

      currentTab: 'tab1',
      distributorData: '',
      currentConsultant: null,
      consultantLicenses: [],
      show_overlay: false,
      isBusy: true,
      visibleLog: false,
      appeallogAPI: [],
      currentPage: 1,
      perPage: '10',
      read_remark: '',
      appealType: [
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
          { name: '__slot:index', title: 'NO' },
          { name: 'CREATED_AT', title: 'SUBMISSION DATE', sortField: 'CREATED_AT' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME', sortField: 'CONSULTANT_NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC', sortField: 'CONSULTANT_NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO', sortField: 'CONSULTANT_PASSPORT_NO' },
          { name: 'TYPE_SCHEMAS', title: 'CONSULTANT TYPE', sortField: 'TYPE_SCHEMAS' },
          { name: 'APPEAL_TYPE', title: 'APPEAL TYPE', sortField: 'APPEAL_TYPE' },
          { name: 'TS_PARAM', title: 'STATUS', sortField: 'TS_PARAM' },
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

      filter: {
        distributor: '',
        consultant: '',
        log: '',
      },

      search: {
        consultant: '',
      },

      consultantsAPI: [],

      visible: {
        TERMINATION_FORM: false,
        TERMINATION_TYPE_OTHER_SPECIFY: false,
        DATE: true,
        DISCHARGE_DATE: false,
      },

      filterModel: {
        FILTER_APPEAL_TYPE: null,
      },

      model: {
        DATE: '',
      },

      model2: {
        DIST_ADMIN_REMARK: '',
        APPEAL_DOCUMENT: [],
        OTHER_UPLOADED_DOCUMENTS: [],
      },

      applicationTypeSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'FILTER_APPEAL_TYPE',
                placeholder: 'Filter by Appeal Type',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: true,
                },

                values: (model, schema) => {
                  return this.applicationTypeFilter
                },
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
                type: 'text',
                label: 'Appeal Type',
                model: 'APPEAL_TYPE_ID',
                styleClasses: 'col-md-6',
                required: true,
                visible: false,
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Appeal Type',
                model: 'APPEAL_TYPE',
                styleClasses: 'col-md-6',
                disabled: true,
              },
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remark by Consultant',
                hint: 'maximum of 500 characters',
                model: 'CONSULTANT_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
                disabled: true,
              },
              {
                type: 'vfg-functional-date2',
                inputType: 'date',
                labels: 'Date',
                noLabel: true,
                model: 'APPEAL_DATE',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                disabled: true,
                validator: 'date',
                visible: (model, field, form) => {
                  return this.visible.DATE
                },
              },
              {
                type: 'vfg-functional-date2',
                inputType: 'date',
                labels: 'Discharge Date',
                noLabel: true,
                model: 'DATE',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                disabled: true,
                validator: 'date',
                visible: (model, field, form) => {
                  return this.visible.DISCHARGE_DATE
                },
              },
            ],
          },
        ],
      },
      appealDocumentViewSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                labels: 'Uploaded Document',
                accept: '.pdf',
                multiple: false,
                text: 'Choose document(s)',
                model: 'APPEAL_DOCUMENT',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: true,
                disabled: true,
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
                label: 'REMARK',
                hint: 'maximum of 500 characters',
                model: 'DIST_ADMIN_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      tabSchema4: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'REMARK',
                hint: 'maximum of 500 characters',
                model: 'DIST_ADMIN_REMARK',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
                disabled: true,
              },
            ],
          },
        ],
      },

      OtherDocumentsSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'OTHER_UPLOADED_DOCUMENTS',
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
  // async mounted() {
  //   await this.getConsultantRecord();
  //   // await this.getFilterConsultantRecord();
  // },
  computed: {
    filteredConsultant () {
      const search = this.search.consultant.toLowerCase()
      const isFiltering = this.filterModel.FILTER_APPEAL_TYPE
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
          el.APPEAL_TYPE.toLowerCase().match(
            this.filterModel.FILTER_APPEAL_TYPE.label.toLowerCase(),
          ),
        )
      }

      return this.consultantsAPI
    },
  },

  methods: {
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

      await this.getConsultantRecord()
    },

    handleClick (newTab) {
      this.currentTab = newTab
    },
    async getConsultantRecord () {
      // const response = await ConsultantRecord.getConsultantRecord();
      const response = await services04module2.getAppealForAdminApproval(this.distributorData.DISTRIBUTOR_ID)
      this.consultantsAPI = response
      this.show_overlay = false
    },
    // async getFilterConsultantRecord() {
    //   const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
    //   console.log('this is filter cons records', filter_cons_records);
    // },

    async viewCurrentConsultant (props) {
      this.currentConsultant = props.rowData
      this.model = _.cloneDeep(this.currentConsultant)
      this.getLicenseDetails()
      this.getAppealDocuments(this.model.APPEAL_DOCUMENT_ID)
      await this.getAppealApprovalLog(props.rowData.CONSULTANT_ID)
      await this.getDocumentByID(props.rowData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS')
    },

    async getLicenseDetails () {
      try {
        const response = await services02module2.getDistributorDetails(this.currentConsultant.USER_ID)
        this.consultantLicenses = response
      } catch (error) {
        console.log(error)
      }
    },

    getAppealApprovalLog: async function (consultId) {
      const response = await services04module2.getAppealApprovalLog(consultId)
      this.appeallogAPI = response
    },

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

    onModelUpdated (newVal, schema) {
      console.log(schema)
      if (schema === 'TERMINATION_TYPE') {
        // this.visible.TERMINATION_TYPE = newVal.value;
        this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false
        if (newVal.label.match('Other')) {
          this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true
        }
      } else if (schema == 'APPEAL_TYPE_ID') {
        if (newVal == 3) {
          this.visible.DATE = false
          this.visible.DISCHARGE_DATE = true
        } else {
          this.visible.DATE = true
          this.visible.DISCHARGE_DATE = false
        }
      }
    },

    // onValidated(isValid, errors) {
    //   console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    // },
    approveAppeal: async function (status, confirm_text) {
      if (confirm(confirm_text)) {
        try {
          const data = new FormData()
          data.append('ACTION', status) // Refer admin management module for TASK STATUS
          data.append('DISTRIBUTOR_ID', this.distributorData.DISTRIBUTOR_ID)
          data.append('CONSULTANT_ID', this.currentConsultant.CONSULTANT_ID)
          data.append('DIST_ADMIN_REMARK', this.model2.DIST_ADMIN_REMARK == null ? '' : this.model2.DIST_ADMIN_REMARK)
          data.append('NOTI_APPROVE_REMARK', '(CONSULTANT APPEAL) Approved by Admin')
          data.append('NOTI_RETURN_REMARK', '(CONSULTANT APPEAL) Returned by Admin')
          data.append('NOTI_REJECT_REMARK', '(CONSULTANT APPEAL) Rejected by Admin')
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
          data.append('CREATE_BY', JSON.parse(localStorage.getItem('user')).user_id)

          if (status != 14 && this.model2.DIST_ADMIN_REMARK == '') {
            Vue.$toast.open({
              message: 'Please write some remarks / comments',
              type: 'error',
            })
          } else {
            this.show_overlay = true
            const response = await services04module2.appealdistributorAdminReview(data)
            if (response) {
              this.show_overlay = false
              Vue.$toast.open({
                message: response.message,
                type: 'success',
              })
              this.resetConsultantData()
              this.getConsultantRecord()
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    resetConsultantData () {
      this.model = {}
      this.model2.DIST_ADMIN_REMARK == ''
      this.model2.APPEAL_DOCUMENT = []
      this.currentConsultant = null
      this.consultantLicenses = []
      this.appeallogAPI = []
      this.model2.OTHER_UPLOADED_DOCUMENTS = []
    },

    getAppealDocuments: async function (CA_DOCUMENT_ID) {
      const response = await services02module2.getConsultantDocuments('', '', '', CA_DOCUMENT_ID)
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

        this.model2.APPEAL_DOCUMENT = []
        this.model2.APPEAL_DOCUMENT.push(data)
      })
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

        this.model2.OTHER_UPLOADED_DOCUMENTS.push(data)
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

      return new File(byteArrays, 'pot', { type: contentType })
    },
  },
}
</script>
<style scoped></style>
