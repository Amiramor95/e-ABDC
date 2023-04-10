<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!isBulk">
                <div v-if="!isReady" style="margin-top: 25%">
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle mr-1"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </div>

                <div v-else>
                  <va-card>
                    <h4 style="margin-top:0px; margin-bottom:20px">
                        List of Consultant Termination Request
                    </h4>

                    <!-- CONSULTANT TABLE -->
                    <va-data-table
                      :fields="consultantSubmissionFields"
                      :data="filteredSubmissionConsultant"
                      no-data-label="No data found"
                      :per-page="parseInt(perPage)"
                      :datacount="filteredSubmissionConsultant.length"
                      :dataperpage="parseInt(perPage)"
                      clickable
                    >
                        <template slot="index" slot-scope="row">
                            {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h4 style="margin:0; font-size:20px">
                            <span v-b-tooltip.hover title="Edit" class="badge badge-primary mr-2" @click="bulkListByDraft(props)"  v-if="props.rowData.APPROVAL_STATUS==15 || props.rowData.APPROVAL_STATUS==1">
                              <i class="fa fa-edit" ></i>
                            </span>

                            <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" @click="viewListPage(props)" v-else>
                                <i class="fa fa-eye"></i>
                              </span>
                          </h4>
                        </template>
                    </va-data-table>
                  </va-card>
                </div>
            </template>

            <template v-else>
              <template v-if="!currentConsultant">
                <va-card>
                  <div class="row">
                    <div class="col-8">
                      <h4 style="margin-top:0">List of Consultant Termination Submission</h4>
                    </div>

                    <!-- <div class="col-4 float-right">
                      <div class="float-right">
                        <h5>
                          <span
                            v-b-tooltip.hover
                            title="Approved By HOD-RD"
                            v-on:click="approvedByRD"
                            class="badge badge-success mr-2"
                          >
                          <i class="fa fa-check-circle"></i
                          ></span>

                        <span
                          v-b-tooltip.hover
                          title="Change View List"
                          v-on:click="exchange"
                          class="badge badge-primary"
                        >
                          <i class="fa fa-exchange"></i
                          ></span>
                        </h5>
                      </div>
                    </div> -->
                  </div>
                  <br />

                  <div style="display:flex; justify-content:flex-end; align-items:center">
                    <div class="flex md3 offset--md3">
                      <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                        <va-icon name="fa fa-search" slot=".consultantprepend" />
                      </va-input>
                    </div>
                  </div>
                  
                  <div class="col-ml-2">
                    <div v-if="isBulk && isDraft">
                      <va-data-table
                        :fields="consultantFields"
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
                            :checked="true"
                            :disabled="true"
                          >
                          </b-form-checkbox>
                        </template>

                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="TERMINATION_REMARK" slot-scope="props">
                            <span
                              v-b-tooltip.hover
                              v-on:click="readMore(props.rowData)"
                              title="Read more"
                              class="badge mr-2"
                            >
                          <i class="fa fa-window-restore"></i
                          ></span>
                        </template>
                        
                        <template slot="ACTION" slot-scope="props">
                          <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                              <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                                <i class="fa fa-eye"></i>
                              </span>
                          </h4>
                        </template>
                      </va-data-table>
                    </div>
                    
                    <div v-else>
                      <va-data-table-extended
                        :fields="consultantFields"
                        :data="filteredConsultant"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="filteredConsultant.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                        @checkboxToggledAllExtended="toggleCheckboxAll"
                        @checkboxToggledExtended="toggleCheckbox"
                        :track-by="'TERMINATION_ID'"
                      >
                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="TERMINATION_REMARK" slot-scope="props">
                            <span
                              v-b-tooltip.hover
                              v-on:click="readMore(props.rowData)"
                              title="Read more"
                              class="badge mr-2"
                            >
                          <i class="fa fa-window-restore"></i
                          ></span>
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h4 style="margin:0; font-size:20px">

                            <span v-b-tooltip.hover title="edit" class="badge badge-primary mr-2" @click="viewCurrentConsultant(props)" v-if="props.rowData.APPROVAL_STATUS==1">
                              <i class="fa fa-edit"></i>
                            </span>

                            <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" v-else @click="viewCurrentConsultant(props)">
                              <i class="fa fa-eye"></i>
                            </span>
                          </h4>
                        </template>
                      </va-data-table-extended>
                    </div>
                  </div>
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

                  <div class="float-left">
                    <button
                      @click="resetForm()"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>

                  <div class="float-right">
                    <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      @click="returnTermination"
                      type="button"
                      class="ml-2 btn btn-warning btn-fill btn-md text-white"
                    >
                      <i class="fa fa-undo" /> &nbsp; Return
                    </button>
                    <button
                      @click="rejectTermination"
                      type="button"
                      class="ml-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Reject
                    </button>
                    <button
                      @click="submitTerminationApproval"
                      type="button"
                      class="ml-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Terminate
                    </button>
                  </div>
                </va-card>
              </template>

              <template v-else>
                <div v-if="!isReady" style="margin-top: 25%">
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle mr-1"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </div>

                <va-card v-else>
                  <h4 style="margin-top:0">Consultant Details</h4>
                  <br />
                  <div>
                    <div class="content">
                      <div v-if="currentTab === 'tab1'">
                        <div class="ml-4">
                          <br />
                            <table id="consultant-profile" class="table table-striped">
                              <tbody>
                                <tr>
                                  <td style="width: 25%">Name</td>
                                  <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                                </tr>

                                <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC">
                                  <td>New NRIC</td>
                                  <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                                </tr>
                                <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC_OLD">
                                  <td>Old NRIC Number</td>
                                  <td>{{ currentConsultant.CONSULTANT_NRIC_OLD }}</td>
                                </tr>

                                <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_NO">
                                  <td>Passport no</td>
                                  <td>{{ currentConsultant.CONSULTANT_PASSPORT_NO }}</td>
                                </tr>

                                <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO">
                                  <td>Passport Expiry Date</td>
                                  <td>{{ date(currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
                                </tr>
                                <tr>
                                  <td>Date of Birth</td>
                                  <td>{{ date(currentConsultant.CONSULTANT_DOB) }}</td>
                                </tr>

                                <tr>
                                  <td>Race</td>
                                  <td>{{ currentConsultant.CONSULTANT_RACE_VALUE }} 
                                    <span v-if="currentConsultant.CONSULTANT_RACE_VALUE=='OTHERS'"> - {{currentConsultant.CONSULTANT_OTHER_RACE}}</span>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Mobile Phone Number</td>
                                  <td>{{ currentConsultant.CONSULTANT_MOBILE_NO }}</td>
                                </tr>

                                <tr>
                                  <td>House Number</td>
                                  <td>{{ currentConsultant.CONSULTANT_HOUSE_NO }}</td>
                                </tr>

                                <tr>
                                  <td>Email</td>
                                  <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                                </tr>

                                <!-- Correspondent Address -->
                                <tr>
                                  <td colspan="4" style="font-weight:bold;">
                                    Correspondent Address
                                  </td>
                                </tr>

                                <tr>
                                  <td>Country</td>
                                  <td>
                                    {{currentConsultant.CORRESPONDENT_COUNTRY}}
                                  </td>
                                </tr>
                                <tr>
                                  <td>State</td>
                                  <td>
                                    {{currentConsultant.CORRESPONDENT_STATE}}
                                  </td>
                                </tr>
                                <tr>
                                  <td>City</td>
                                  <td>
                                    {{currentConsultant.CORRESPONDENT_CITY}}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Postcode</td>
                                  <td>
                                    {{ currentConsultant.CORRESPONDENT_POSTAL }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Address</td>
                                  <td>
                                    {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}
                                  </td>
                                </tr>
                                <tr v-if="currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2">
                                  <td>Address 2</td>
                                  <td>
                                    {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2 }}
                                  </td>
                                </tr>
                                <tr v-if="currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3">
                                  <td>Address 3</td>
                                  <td>
                                    {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3 }}
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
                  <br />
                  <div>
                    <vue-form-generator
                      v-if="currentConsultant.APPROVAL_STATUS==1 || currentConsultant.APPROVAL_STATUS==15"
                      :model="model"
                      :schema="tabSchema3"
                      :options="formOptions"
                      ref="tabForm3"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>

                    <vue-form-generator
                      v-else
                      :model="model"
                      :schema="disabledRemark"
                      :options="formOptions"
                      ref="tabForm2"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                  </div>

                  <br />

                  <div class="float-left">

                  <button
                      @click="resetForm"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>

                  <div class="float-right" v-if="!(currentConsultant.APPROVAL_STATUS==3 || currentConsultant.APPROVAL_STATUS==5 || currentConsultant.APPROVAL_STATUS==7)">
                    <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      @click="returnTermination"
                      type="button"
                      class="ml-2 btn btn-warning btn-fill btn-md text-white"
                    >
                      <i class="fa fa-undo" /> &nbsp; Return
                    </button>
                    <button
                      @click="rejectTermination"
                      type="button"
                      class="ml-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Reject
                    </button>
                    <button
                      @click="submitTerminationApproval"
                      type="button"
                      class="ml-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Terminate
                    </button>
                  </div>
                </va-card>
              </template>
            </template>
          </b-overlay>
        </div>

        <vudal name="readModal" class="widthModal">
          <div class="header">
            Remark<i class="close icon">&times;</i>
          </div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="readMoreSchema"
              :options="formOptions"
            />
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
import * as servicesModule3 from '../../../app/module3/services01';
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

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');
const Termination = RepositoryFactory.get('termination');

export default {
  components: { Tabs, Vudal },

  data() {
    return {
      show_overlay: false,
      isReady:false,
      APPROVAL_TERMINATION:null,
      draftedTerminationCount:0,
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
          title: 'Examination & Bankruptcy Check',
          value: 'tab4',
        },
      ],

      currentTab: 'tab1',
      currentConsultant: null,
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
        consultant: [
          { name: '__slot:checkbox', title: 'SELECTED' },
          { name: '__slot:index', title: 'NO' },
          { name: 'CREATED_TIMESTAMP', title: 'SUBMISSION DATE' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          // { name: 'CONSULTANT_PHONENO', title: 'PHONE NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
          { name: 'TERMINATION_DATE', title: 'EFFECTIVE DATE' },
          { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
          { name: 'TS_PARAM', title: 'STATUS' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        log: [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'CREATE_TIMESTAMP',
            title: 'Date',
            sortField: 'CREATE_TIMESTAMP',
          },
          {
            name: 'GROUP_NAME',
            title: 'Group',
            sortField: 'GROUP_NAME',
          },
          {
            name: 'USER_NAME',
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
            name: '__slot:remarks',
            title: 'Remarks/Comments',
            sortField: 'APPR_REMARK',
          },
          {
            name: '__slot:updates',
            title: 'Latest Update',
            sortField: 'LATEST_UPDATE',
          },
        ],
      },

      search: {
        consultant: '',
        log: '',
      },
      isBulk: false,
      isDraft: false,
      consultantSubmissionListManager: [],
      consultantsAPI: [],
      logAPI: [],
      currentPage: 1,
      perPage: '10',
      visible: {
        TERMINATION_FORM: false,
      },
      model2: {
        APPROVAL_REMARK: '',
      },
      model: {
        DIST_ID: '',
        CONSULTANTS: [],
        CONSULTANT_ID: [],
        TERMINATION_ID: [],
        APPROVAL_REMARK: '',
        TERMINATION_DOCUMENT: [],
        TERMINATION_DOCUMENT_UPLOADED: [],
        readRemark: "",
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
                model: 'APPROVAL_REMARK',
                placeholder: 'Enter Remarks or Comments',
                hint: 'Max 1000 characters',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
              {
                theme: 'list',
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "TERMINATION_DOCUMENT",
                type: "vfg-consultant-termination-file",
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
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                model: 'APPROVAL_REMARK',
                placeholder: 'Enter Remarks or Comments',
                hint: 'Max 1000 characters',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
              {
                theme: 'list',
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "TERMINATION_DOCUMENT",
                type: "vfg-consultant-termination-file",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.pdf)",
                required: false
              },
              {
                theme: 'list',
                labels: "Uploaded Document",
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'TERMINATION_DOCUMENT_UPLOADED',
                type: 'vfg-custom-file-view2',
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      disabledRemark: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'Max 1000 characters',
                model: 'APPROVAL_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
                disabled:true
              },
            ],
          },
        ],
      },

      readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "readRemark",
                rows: 5,
                validator: "string",
                styleClasses: "col-md-12",
                disabled:true
              },
            ],
          },
        ],
      }
    };
  },
  async created() {
    const user_info=JSON.parse(localStorage.getItem('user'));
    this.model.DIST_ID = user_info.USER_DIST_ID;
    this.getConsultantSubmissionListManager(this.model.DIST_ID);

    // await this.getTerminationType();
  },

  async mounted () {

  },

  computed: {
    consultantSubmissionFields() {
        return [
            { name: '__slot:index', title: 'NO' },
            { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
            { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
            { name: 'TS_PARAM', title: 'STATUS' },
            { name: '__slot:ACTION', title: 'ACTION' },
        ];
    },

    consultantFields() {
      if (this.isBulk && !this.isDraft) {
       return [
          {
            name: '__checkbox', 
            titleClass: 'center aligned',
            dataClass: 'center aligned' 
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
          { name: 'TERMINATION_DATE', title: 'TERMINATION DATE' },
          { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }else if(this.isBulk && this.isDraft){
        return [
          {
            name: '__slot:checkbox',
            title: 'DRAFTED',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
          { name: 'TERMINATION_DATE', title: 'EFFECTIVE DATE' },
          { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }
    },

    filteredSubmissionConsultant() {
      return this.consultantSubmissionListManager;
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

    mappedSelectedConsultantArray() {
      if (this.model.TERMINATION_ID.length)
        return this.model.TERMINATION_ID.map(el => el.TERMINATION_ID);

      return [];
    },
  },

  methods: {
    date: function (date) {
        return moment(date).format("DD-MMM-yyyy");
    },

    async readMore(data) {
      this.$modals.readModal.$show();
      this.model.readRemark = data.TERMINATION_REMARK;
    },

    approvedByRD () {
      this.$router.push('/distributor/consultant-termination-approved-by-HOD-RD')
    },

    exchange () {
      this.$router.push('/distributor/consultant-termination-Second_Level_status_list')
    },

    back(){
      this.$router.push('/distributor/consultant-termination-Second_Level_status_list')
    },

    resetForm(){
      if(this.isBulk && this.currentConsultant){
        this.isBulk = true;
      }else if(this.isBulk && this.isDraft && this.currentConsultant){
        this.isBulk = true;
      }else{
        this.isBulk = false;
        this.isDraft = false;
      }
      this.currentConsultant = null;
      this.model.CONSULTANT_ID = [];
      this.model.TERMINATION_ID = [];
      this.model.APPROVAL_REMARK = '';
      this.model.TERMINATION_DOCUMENT = [];
      this.model.TERMINATION_DOCUMENT_UPLOADED = [];
      this.model.readRemark = '';
    },

    getConsultantSubmissionListManager: async function(distId) {
        this.consultantSubmissionListManager = await services02module2.getAllTerminationForManager(distId);
        //await this.getConsultantApprTermination();
        this.isReady=true;
    },

    bulkListByDraft(props){
      this.show_overlay = true;
      this.getPendingApprovalData(this.model.DIST_ID, props.rowData.APPROVAL_STATUS, props.rowData.TERMINATION_SUBMISSION_ID);
    },

    async getPendingApprovalData(DIST_ID, APPROVAL_STATUS, SUBMISSION_ID){
      const response=await services02module2.getPendingApprovalDataManager(DIST_ID, JSON.stringify([APPROVAL_STATUS]), SUBMISSION_ID);
      this.consultantsAPI = response;
      if(APPROVAL_STATUS == 1){
        this.isDraft = true;
        response.forEach(element => {
          this.model.TERMINATION_ID.push(element.TERMINATION_ID);
        });
      }else{
        this.isDraft = false;
      }
      this.isBulk = true;
      this.show_overlay = false;
    },

    async viewListPage(props){
      localStorage.setItem('APPROVAL_STATUS',props.rowData.APPROVAL_STATUS);
      localStorage.setItem('SUBMISSION_ID',props.rowData.TERMINATION_SUBMISSION_ID);
      this.$router.push('/distributor/consultant-termination-viewList-Distributor-Manager');
    },


    // async getConsultantApprTermination() {
    //   const response = await services02module2.getConsultantApprTermination(JSON.stringify([1,15]));
    //   this.consultantsAPI = response;

    //   response.forEach(element => {
    //     if(element.APPR_REMARK !=null && element.APPR_REMARK != '' && element.APPROVAL_STATUS==1){
    //       this.model.TERMINATION_ID.push(element.TERMINATION_ID);
    //       this.draftedTerminationCount=1;
    //     }
    //   });

    //   this.show_overlay = false;
    // },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    async getTerminationType() {
      const response = await services02module2.getTerminationType();
      console.log('get Termination Type: ', response);
    },

    viewCurrentConsultant(props) {
      this.model.TERMINATION_ID=[];
      this.model.TERMINATION_ID.push(props.rowData.TERMINATION_ID);
      this.model.APPROVAL_REMARK=props.rowData.APPR_REMARK;
      this.currentConsultant = props.rowData;
      this.model2.APPROVAL_REMARK=props.rowData.APPR_REMARK

      //Get Termination Document
      if(props.rowData.TERMINATION_ID){
        this.getTerminationDocument(props.rowData.TERMINATION_ID);
      }
    },

    setCurrentConsultant(props) {
      // if(this.draftedTerminationCount !=0){
      //   alert('You have already drafted termination!')
      //   this.$router.go();
      // }
      // else{
        const index = this.model.TERMINATION_ID.findIndex(
          el => el === props.rowData.TERMINATION_ID,
        );

        if (index >= 0) {
          this.model.TERMINATION_ID.splice(index, 1);
        } else {
          this.model.TERMINATION_ID.push(props.rowData.TERMINATION_ID);
        }
      // }
    },


    toggleCheckboxAll(isChecked){
      const termination_id =  this.consultantsAPI.reduce((acc,element) => {
          return acc.concat(element.TERMINATION_ID)
      },[])
      
      this.model.TERMINATION_ID = isChecked ? termination_id : []
    },

    toggleCheckbox(payload){
      const {fieldName,isChecked} = payload
      if(!isChecked){
          const elIndex = this.model.TERMINATION_ID.findIndex(x => {
            return x === fieldName.TERMINATION_ID
          })
          if(elIndex > -1){
            this.model.TERMINATION_ID.splice(elIndex,1)
          }
      }else{
        this.model.TERMINATION_ID.push(fieldName.TERMINATION_ID)
      }
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

    getTerminationDocument: async function(termination_id) {
      const response = await Termination.getTerminationDocumentByID(
        termination_id
      );
      response.forEach(element => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        const data = {
          docID: element.TERMINATION_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + " - By " + element.CREATE_BY  + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };
        this.model.TERMINATION_DOCUMENT_UPLOADED.push(data);
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },


    saveAsDraft: async function() {
      if(this.model.TERMINATION_ID.length>0){
        if (confirm("Are you sure you want to save as draft?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("APPROVAL_STATUS", 1);
          data.append("TERMINATION_ID", JSON.stringify(this.model.TERMINATION_ID));
          data.append("CREATE_BY",this.model.CREATE_BY);
          data.append("PUBLISH_STATUS",0);
          data.append("APPROVAL_REMARK", this.model.APPROVAL_REMARK ? this.model.APPROVAL_REMARK : '');
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
              data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
            }
          const response = await services02module2.updateTerminateConsultantApproval(data);
          this.show_overlay = false;
          this.resetForm();
          this.getConsultantSubmissionListManager(this.model.DIST_ID);
          this.isBulk = false;
          //this.$router.push('/distributor/consultant-termination-Second_Level_status_list');

        }
      }else{
        alert('Please select consultants for action');
      }
    },

    returnTermination: async function() {
      if(this.model.TERMINATION_ID.length>0){
        if (confirm("Are you sure you want to return termination?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("APPROVAL_STATUS", 7);
          data.append("TERMINATION_ID", JSON.stringify(this.model.TERMINATION_ID));
          data.append("CREATE_BY", this.model.CREATE_BY);
          data.append("PUBLISH_STATUS", 0);
          data.append("APPROVAL_REMARK", this.model.APPROVAL_REMARK ? this.model.APPROVAL_REMARK : '');
          data.append("DIST_ID",JSON.parse(localStorage.getItem('user')).USER_DIST_ID);
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }

          const approvalLevel = await services06Module0.getApprovalLevelDistributor(9, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-termination-Distributor");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT-TERMINATION) Returned By Manager"
          );

          const response = await services02module2.updateTerminateConsultantApproval(data);
          this.show_overlay = false;
          this.resetForm();
          this.getConsultantSubmissionListManager(this.model.DIST_ID);
          this.isBulk = false;
          //this.$router.push('/distributor/consultant-termination-Second_Level_status_list');

        }
      }else{
        alert('Please select consultants for action');
      }
    },

    rejectTermination: async function() {
      if(this.model.TERMINATION_ID.length>0){
        if (confirm("Are you sure you want to reject termination?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("APPROVAL_STATUS", 5);
          data.append("TERMINATION_ID", JSON.stringify(this.model.TERMINATION_ID));
          data.append("CREATE_BY", this.model.CREATE_BY);
          data.append("PUBLISH_STATUS", 0);
          data.append("APPROVAL_REMARK", this.model.APPROVAL_REMARK ? this.model.APPROVAL_REMARK : '');
          data.append("DIST_ID",JSON.parse(localStorage.getItem('user')).USER_DIST_ID);
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }

          const approvalLevel = await services06Module0.getApprovalLevelDistributor(9, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-termination-Distributor");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT-TERMINATION) Rejected By Manager"
          );

          const response = await services02module2.updateTerminateConsultantApproval(data);
          this.show_overlay = false;
          this.resetForm();
          this.getConsultantSubmissionListManager(this.model.DIST_ID);
          this.isBulk = false;
          //this.$router.push('/distributor/consultant-termination-Second_Level_status_list');

        }
      }else{
        alert('Please select consultants for action');
      }
    },

    submitTerminationApproval: async function() {
      if(this.model.TERMINATION_ID.length>0){
        if (confirm("Are you sure you want to terminate?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("APPROVAL_STATUS", 3);
          data.append("TERMINATION_ID", JSON.stringify(this.model.TERMINATION_ID));
          data.append("CREATE_BY",this.model.CREATE_BY);
          data.append("PUBLISH_STATUS",1);
          data.append("APPROVAL_REMARK", this.model.APPROVAL_REMARK ? this.model.APPROVAL_REMARK : '');

          data.append("TERMINATION_BY",  "DISTRIBUTOR");
          data.append("DIST_ID",JSON.parse(localStorage.getItem('user')).USER_DIST_ID);
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }

          const approvalLevel = await services06Module0.getApprovalLevelDistributor(9, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-termination-Distributor");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT-TERMINATION) Approved By Manager"
          );

          const response = await services02module2.updateTerminateConsultantApproval(data);
          this.show_overlay = false;
          this.resetForm();
          this.getConsultantSubmissionListManager(this.model.DIST_ID);
          this.isBulk = false;

          //this.$router.push('/distributor/consultant-termination-Second_Level_status_list');
        }
      }else{
        alert('Please select consultants for action');
      }
    },

  },
};
</script>

<style scoped>
a {
  margin-left: 15px;
}
</style>
