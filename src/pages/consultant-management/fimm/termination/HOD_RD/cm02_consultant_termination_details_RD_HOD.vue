<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template>
              <div v-if="!isReady" style="margin-top: 25%">
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </div>
            
              <va-card v-else>
                <template>
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
                    <vue-form-generator
                      v-if="APPROVAL_STATUS==1 || APPROVAL_STATUS==15"
                      :model="model"
                      :schema="tabSchema2"
                      :options="formOptions"
                      ref="singleForm"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>

                    <vue-form-generator
                      v-else
                      :model="model"
                      :schema="tabSchema3"
                      :options="formOptions"
                      ref="singleForm"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                    <br />

                    <div class="float-left">
                      <button
                        @click="back"
                        type="button"
                        class="btn btn-primary btn-fill btn-md"
                      >
                        <i class="fa fa-step-backward" /> &nbsp; Previous
                      </button>
                    </div>

                    <div class="float-right" v-if="APPROVAL_STATUS==1 || APPROVAL_STATUS==15" >
                      <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                        <i class="fa fa-edit" /> Save as Draft
                      </button>
                      <button @click="rejectTermination" type="button" class="ml-1 btn btn-danger btn-fill btn-md">
                        <i class="fa fa-times" /> &nbsp;Reject
                      </button>
                      <button @click="returnTermination" type="button" class="ml-1 btn btn-warning btn-fill btn-md">
                        <i class="fa fa-undo" /> Return
                      </button>
                      <button
                        @click="submitTerminationForm"
                        type="button"
                        class="ml-1 btn btn-danger btn-fill btn-md"
                      >
                        <i class="fa fa-ban" /> Terminate
                      </button>
                    </div>
                </template>
              </va-card>
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
import * as services06Module0 from '../../../../../app/module0/services06';
import moment from 'moment';
import * as servicesmodule0 from '../../../../../app/module0/services';
import * as servicesmodule2 from '../../../../../app/module2/services';
import * as services02module2 from '../../../../../app/module2/services02';
import RepositoryFactory from '../../../../../repositories/RepositoryFactory';
import TerminationRepository from '../../../../../repositories/module2/TerminationRepository';
import * as servicesModule3 from '../../../../../app/module3/services01';

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
  components: { Tabs },
  async mounted() {
    this.APPROVAL_STATUS=localStorage.getItem('APPROVAL_STATUS');
    const DIST_INFO=JSON.parse(localStorage.getItem('DIST_INFO'));
    this.currentDistributor=DIST_INFO.DIST_NAME;
    this.model.DIST_ID=DIST_INFO.DISTRIBUTOR_ID;

    this.isEditable=JSON.parse(localStorage.getItem('isEditable'));

    this.currentConsultant=JSON.parse(localStorage.getItem('currentConsultant'));
    this.model.CONSULTANT_ID.push(this.currentConsultant.CONSULTANT_ID);
    this.model.TERMINATION_ID.push(this.currentConsultant.TERMINATION_ID);
    this.model.TERMINATION_REMARK=this.currentConsultant.TERMINATION_REMARK;
    this.model.APPR_REMARK=this.currentConsultant.APPR_REMARK;
    this.model.TERMINATION_SUBMISSION_ID=this.currentConsultant.TERMINATION_SUBMISSION_ID;
    this.model.TERMINATION_DATE=this.currentConsultant.TERMINATION_DATE;


    if(this.currentConsultant.TERMINATION_TYPE_ID==7){
      this.model.TERMINATION_TYPE= {
        label: 'Non-compliance',
        value: '7',
      };
    }
    else if(this.currentConsultant.TERMINATION_TYPE_ID==8){
      this.model.TERMINATION_TYPE=
        {
          label: 'Bankruptcy',
          value: '8',
        };
    }
    else if(this.currentConsultant.TERMINATION_TYPE_ID==9){
      this.model.TERMINATION_TYPE=
        {
          label: 'Misconduct',
          value: '9',
        };
    }
    else if(this.currentConsultant.TERMINATION_TYPE_ID==10){
      this.model.TERMINATION_TYPE=
        {
          label: 'Other (please specify)',
          value: '10',
        };
    }
    if(this.currentConsultant.TERMINATION_TYPE_ID==10){ 
      this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true;
      this.model.TERMINATION_TYPE_OTHER_SPECIFY=this.currentConsultant.TERMINATION_TYPE_OTHER_SPECIFY;
    }
    else{
      this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false;
      this.model.TERMINATION_TYPE_OTHER_SPECIFY="";
    }

    //Get Termination Document
    if(this.currentConsultant.TERMINATION_ID){
      this.getTerminationDocument(this.currentConsultant.TERMINATION_ID);
    }
  },


  data() {
    return {
      show_overlay: false,
      APPROVAL_STATUS:null,
      isReady: true,
      isEditable:null,
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
      currentDistributor: null,
      isBulk: true,
      isBusy: true,
      terminationType: [
        {
          label: 'Non-compliance',
          value: '7',
        },
        {
          label: 'Bankruptcy',
          value: '8',
        },
        {
          label: 'Misconduct',
          value: '9',
        },
        {
          label: 'Other (please specify)',
          value: '10',
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
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DIST_PHONE_NO', title: 'PHONE NUMBER' },
          { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        consultant: [
          // A virtual column that doesn't exist in items
          {
            name: '__slot:checkbox',
            title: 'NO',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
      },

      search: {
        distributor: '',
        consultant: '',
      },

      consultantsAPI: [],

      distributorsAPI: null,

      currentPage: 1,
      perPage: '10',
      visible: {
        TERMINATION_FORM: false,
        TERMINATION_TYPE_OTHER_SPECIFY: false,
      },
      model: {
        DIST_ID:null,
        TERMINATION_SUBMISSION_ID:'',
        TERMINATION_TYPE:'',
        TERMINATION_TYPE_OTHER_SPECIFY: '',
        TERMINATION_DATE: '',
        CONSULTANT_ID: [],
        TERMINATION_ID:[],
        TERMINATION_REMARK: '',
        APPR_REMARK: '',
        TERMINATION_DOCUMENT: [],
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Termination Type',
                model: 'TERMINATION_TYPE',
                placeholder: 'Enter Termination Type',
                styleClasses: 'col-md-6',
                required: true,
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.terminationType;
                },
              },

              {
                type: "vfg-functional-date2",
                inputType: 'date',
                labels: "Termination Date",
                placeholder: "Enter Termination Date",
                model: "TERMINATION_DATE",
                styleClasses: 'col-md-6',
                format: "dd-MMM-yyyy",
                required: true,
                validator: 'date',
                disabled:true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other',
                model: 'TERMINATION_TYPE_OTHER_SPECIFY',
                placeholder: 'Please specify',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },

              {
                type: 'textArea',
                rows: 5,
                max: 1000,
                label: 'Remarks / Comments By RD',
                hint: 'Max 1000 characters',
                model: 'TERMINATION_REMARK',
                placeholder: 'Enter Remarks or Comments',
                disabled:true,
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                rows: 5,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'Max 1000 characters',
                model: 'APPR_REMARK',
                placeholder: 'Enter Remarks or Comments',
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
              }
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
                type: 'vueMultiSelect',
                label: 'Termination Type',
                model: 'TERMINATION_TYPE',
                placeholder: 'Enter Termination Type',
                styleClasses: 'col-md-6',
                disabled: true,
                required: true,
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.terminationType;
                },
              },

              {
                type: "vfg-functional-date2",
                inputType: 'date',
                labels: "Termination Date",
                placeholder: "Enter Termination Date",
                model: "TERMINATION_DATE",
                styleClasses: 'col-md-6',
                format: "dd-MMM-yyyy",
                required: true,
                validator: 'date',
                disabled:true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other',
                model: 'TERMINATION_TYPE_OTHER_SPECIFY',
                placeholder: 'Please specify',
                required: true,
                disabled: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },

              {
                type: 'textArea',
                rows: 5,
                max: 1000,
                label: 'Remarks / Comments By RD',
                hint: 'Max 1000 characters',
                model: 'TERMINATION_REMARK',
                placeholder: 'Enter Remarks or Comments',
                disabled:true,
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                rows: 5,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'Max 1000 characters',
                model: 'APPR_REMARK',
                placeholder: 'Enter Remarks or Comments',
                disabled: true,
                styleClasses: 'col-md-12',
              },
              {
                theme: 'list',
                labels: "Uploaded Document",
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'TERMINATION_DOCUMENT',
                type: 'vfg-custom-file-view2',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    distributorFields() {
      if (this.isBulk) {
        return [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }

      return [
        { name: '__slot:index', title: 'NO' },
        // A column that needs custom formatting
        { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
        { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
        { name: 'DIST_MOBILE_NUMBER', title: 'PHONE NUMBER' },
        { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ];
    },
    consultantFields() {
      if (this.isBulk) {
        return [
          {
            name: '__slot:checkbox',
            title: 'SELECTED',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }

      return [
        { name: '__slot:index', title: 'NO' },
        { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
        { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
        { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
        { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
        { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
        { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
        { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
        { name: 'EFFECTIVE_DATE', title: 'EFFECTIVE DATE' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ];
    },
    filteredDistributor() {
      const search = this.search.distributor.toLowerCase();
      if (this.search && this.distributorsAPI) {
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
  },
  methods: {
    date: function (date) {
        return moment(date).format("DD-MMM-yyyy");
    },

    back() {
      this.$router.go('-1')
    }, // back button

    handleClick(newTab) {
      this.currentTab = newTab;
    },
    async getConsultantRecord(id) {
      console.log('inside get consultant record');
      const response = await services02module2.getConsultantsByDistributor(id);
      this.consultantsAPI = response;
      // this.isBusy = false;
      console.log(this.consultantsAPI);
    },
    async getTerminationType() {
      const response = await services02module2.getTerminationType();
      console.log('get Termination Type: ', response.data);
    },

    async getAllTermination() {
      const termination = await services02module2.getAllTermination();
      console.log('this is termination', termination.data);
    },

    async getDistributors() {
      this.distributorsAPI = await services02module2.getDistributorRecords();
      this.isReady = true;
       console.log('this is distributors', this.distributorsAPI);
    },

    async viewCurrentConsultant(props) {
      try {
        this.currentConsultant = props.rowData;
        await this.getDocumentByID(props.rowData.CONSULTANT_ID);
      } catch (error) {
        console.log(error);
      }
    },
    async setCurrentDistributor(props) {
      console.log(props);
      await this.getConsultantRecord(props.rowData.DISTRIBUTOR_ID);
      this.currentDistributor = props.rowData.DIST_NAME;
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
    validateBulkForm() {
      return this.$refs['bulkForm'].validate();
    },
    validateSingleForm() {
      return this.$refs['singleForm'].validate();
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
        //this.model.TERMINATION_DOCUMENT = [];
        this.model.TERMINATION_DOCUMENT.push(data);
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

      if (confirm("Are you sure to save as draft?")) {
        this.show_overlay = true;
        const data = new FormData();
        data.append("APPROVAL_STATUS", 1);
        data.append("LATEST_UPDATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_ID",this.model.TERMINATION_ID);
        data.append("APPR_REMARK", this.model.APPR_REMARK ? this.model.APPR_REMARK : '');
        data.append("CREATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY);
        data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE.value);

        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        data.append("APPR_PUBLISH_STATUS",0);
        for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
          data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
        }

        const response = await services02module2.updateTerminateConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
        this.show_overlay = false;
        this.$router.push('/fimm/consultant-termination-statusList-RD-HOD')

      }
    },

    rejectTermination: async function() {

      if (confirm("Are you sure to reject?")) {
        this.show_overlay = true;
        const data = new FormData();
        data.append("APPROVAL_STATUS", 5);
        data.append("LATEST_UPDATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_ID",this.model.TERMINATION_ID);
        data.append("APPR_REMARK", this.model.APPR_REMARK ? this.model.APPR_REMARK : '');
        data.append("CREATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY);
        data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE.value);

        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("APPR_PUBLISH_STATUS",1);
        for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
          data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
        }

        const response = await services02module2.updateTerminateConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
        this.show_overlay = false;
        this.$router.push('/fimm/consultant-termination-statusList-RD-HOD')

      }
    },

    returnTermination: async function() {

      if (confirm("Are you sure to return?")) {
        this.show_overlay = true;
        const data = new FormData();
        data.append("APPROVAL_STATUS", 7);
        data.append("LATEST_UPDATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_ID",this.model.TERMINATION_ID);
        data.append("APPR_REMARK", this.model.APPR_REMARK ? this.model.APPR_REMARK : '');
        data.append("CREATE_BY",this.model.CREATE_BY);
        data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY);
        data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE.value);


        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("APPR_PUBLISH_STATUS",1);
        for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
          data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
        }

        const response = await services02module2.updateTerminateConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
        this.show_overlay = false;
        this.$router.push('/fimm/consultant-termination-statusList-RD-HOD')

      }
    },


    submitTerminationForm: async function() {

        if (confirm("Are you sure to submit?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("APPROVAL_STATUS", 3);
          data.append("LATEST_UPDATE_BY", this.model.CREATE_BY);
          data.append("TERMINATION_ID",this.model.TERMINATION_ID);
          data.append("APPR_REMARK", this.model.APPR_REMARK ? this.model.APPR_REMARK : '');
          data.append("CREATE_BY",this.model.CREATE_BY);
          data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY);
          data.append("TERMINATION_TYPE", this.model.TERMINATION_TYPE.value);

          const user = localStorage.getItem("user");
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
          var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
          data.append("NOTE", noted);

          data.append("APPR_PUBLISH_STATUS",1);
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }

          const approvalLevel = await services06Module0.getApprovalLevel(9, 2);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-termination-GM");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT-TERMINATION) New entry pending for GM Approval"
          );


          const response = await services02module2.updateTerminateConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
          this.show_overlay = false;
          this.$router.push('/fimm/consultant-termination-statusList-RD-HOD')
      }
    },
    async getFilterConsultantRecord() {
      const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
      console.log('this is filter cons records', filter_cons_records);
    },
  },
};
</script>
<style scoped></style>
