<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template>
              <div v-if="!isReady" style="margin-top: 25%">
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle mr-2"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </div>
              <va-card v-else>
                <template>
                  <h4 style="margin-top:0px; margin-bottom:20px">
                    List of Consultant Termination
                  </h4>
                </template>
                <p style="margin:0; font-size: 1.1rem">
                  DISTRIBUTOR NAME - {{ currentDistributor}}
                </p>
                <div style="display:flex; justify-content:flex-end; align-items:center">
                  <div class="flex md3 offset--md3">
                    <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>

                <!-- CONSULTANT TABLE -->
                <!-- select-mode="single" -->

                <div v-if="!isReady">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </div>

                <div v-if="isDraft">
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
                    :track-by="'UNIQUE_CONSULTANT_LICENSE_ID'"
                  >
                    <template slot="checkbox" slot-scope="props">
                      <va-checkbox
                        @change="checkBox"
                        class="col-2"
                        v-model="props.rowData.STATUS"
                      />
                    </template>

                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                          <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                            <i class="fa fa-eye"></i>
                          </span>
                      </h4>
                    </template>
                  </va-data-table-extended>
                </div>
                <br />

                <template>
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="bulkForm"
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

                  <div class="float-right">
                    <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      @click="submitTerminationForm"
                      type="button"
                      class="ml-1 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Terminate
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
    const DIST_INFO=JSON.parse(localStorage.getItem('DIST_INFO'));
    this.isDraft=JSON.parse(localStorage.getItem('isDraft'));

    this.currentDistributor=DIST_INFO.DIST_NAME;
    this.model.DIST_ID=DIST_INFO.DISTRIBUTOR_ID;

    var SUBMISSION_ID=localStorage.getItem('SUBMISSION_ID');
    this.model.TERMINATION_SUBMISSION_ID = SUBMISSION_ID;

    if(this.isDraft){
      this.getDraftedData(DIST_INFO.DISTRIBUTOR_ID, SUBMISSION_ID);
    }else{
      await this.getConsultantRecord(DIST_INFO.DISTRIBUTOR_ID);
    }
  },

  data() {
    return {
      show_overlay: false,
      isReady: false,
      isDraft: false,
      draftedTermination:"",
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
          // {
          //   name: '__checkbox',
          //   titleClass: 'center aligned',
          //   dataClass: 'center aligned',
          // },
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
        PROFILE_UPLOADED_DOCUMENTS: [],

        TERMINATION_SUBMISSION_ID:'',
        TERMINATION_TYPE:'',
        TERMINATION_TYPE_OTHER_SPECIFY: '',
        TERMINATION_DATE: '',
        DIST_ID:null,
        CONSULTANTS: [],
        CONSULTANT_ID: [],
        TERMINATION_REMARK: '',
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
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'Max 1000 characters',
                model: 'TERMINATION_REMARK',
                placeholder: 'Enter Remarks or Comments',
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
      if (this.isDraft) {
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
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }else{
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
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }
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
      if (this.search && this.consultantsAPI) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultantsAPI;
    },
    // mappedSelectedConsultantArray() {
    //   if (this.model.CONSULTANT_ID.length)
    //     return this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },
  methods: {
      async getDraftedData(DIST_ID, SUBMISSION_ID){
        const response=await services02module2.getAllDraftedTermination(DIST_ID, SUBMISSION_ID);
        this.consultantsAPI = response;
        response.forEach(element => {
          this.model.CONSULTANTS.push(
            {
              CONSULTANT_ID: element.CONSULTANT_ID,
              CONSULTANT_TYPE_ID: element.CONSULTANT_TYPE_ID,
            }
          );
          this.model.TERMINATION_DATE=element.TERMINATION_DATE;
          this.model.TERMINATION_REMARK=element.TERMINATION_REMARK;
          this.model.TERMINATION_SUBMISSION_ID=element.TERMINATION_SUBMISSION_ID;
          if(element.TERMINATION_TYPE==7){
            this.model.TERMINATION_TYPE= {
              label: 'Non-compliance',
              value: '7',
            };
          }
          else if(element.TERMINATION_TYPE==8){
            this.model.TERMINATION_TYPE=
              {
                label: 'Bankruptcy',
                value: '8',
              };
          }
          else if(element.TERMINATION_TYPE==9){
            this.model.TERMINATION_TYPE=
              {
                label: 'Misconduct',
                value: '9',
              };
          }
          else if(element.TERMINATION_TYPE==10){
            this.model.TERMINATION_TYPE=
              {
                label: 'Other (please specify)',
                value: '10',
              };
          }

          //if(element.TERMINATION_TYPE_OTHER_SPECIFY !=null && element.TERMINATION_TYPE_OTHER_SPECIFY !=""){
          if(element.TERMINATION_TYPE_ID==10){ 
            this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true;
            this.model.TERMINATION_TYPE_OTHER_SPECIFY=element.TERMINATION_TYPE_OTHER_SPECIFY;
          }
          else{
            this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false;
            this.model.TERMINATION_TYPE_OTHER_SPECIFY="";
          }

        //Get Termination Document
        if(element.TERMINATION_ID){
          this.getTerminationDocument(element.TERMINATION_ID);
        }

        });
        this.draftedTerminationCount=response.length;
        this.isReady = true;
      },
    back() {
      this.$router.push('/fimm/consultant-termination-statusList-RD')
    }, // back button

    handleClick(newTab) {
      this.currentTab = newTab;
    },
    // async getConsultantRecordByTSID(TS_ID){
    //     const response=await services02module2.getAllTerminationByTS_ID(TS_ID);
    //     this.consultantsAPI=response
    //     this.isReady = true;
    //     // this.model.TERMINATION_REMARK=
    //
    // },
    async getConsultantRecord(id) {
      //console.log('inside get consultant record');
      const response = await services02module2.getConsultantsByDistributorID(id);
      this.consultantsAPI = response;
      this.isReady = true;

      // this.isBusy = false;
      //console.log(this.consultantsAPI);
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
        localStorage.setItem('isEditable',true);
        localStorage.setItem('currentConsultant',JSON.stringify(props.rowData));
        this.$router.push('/fimm/consultant-termination-details-RD');
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
      if(this.draftedTerminationCount>0){
        alert('You have already drafted termination!')
        this.$router.go();
      }
      else{
        const index = this.model.CONSULTANT_ID.findIndex(
          el => el === props.rowData.CONSULTANT_ID,
        );

        if (index >= 0) {
          this.model.CONSULTANT_ID.splice(index, 1);
        } else {
          this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
        }
        //console.log(this.model.CONSULTANT_ID);
      }
    },

    toggleCheckboxAll(isChecked){
      const consultant_id =  this.consultantsAPI.reduce((acc,element) => {
          return acc.concat(
            {
              CONSULTANT_ID: element.CONSULTANT_ID,
              CONSULTANT_TYPE_ID: element.CONSULTANT_TYPE_ID,
            }
          )
      },[])
      
      this.model.CONSULTANTS = isChecked ? consultant_id : []
      //console.log(this.model.CONSULTANTS)
    },

    toggleCheckbox(payload){
      const {fieldName,isChecked} = payload
      const consultId = fieldName.CONSULTANT_ID

      if(!isChecked){
          const elIndex = this.model.CONSULTANTS.findIndex(x => {
            return x.CONSULTANT_ID === fieldName.CONSULTANT_ID
          })
          if(elIndex > -1){
            this.model.CONSULTANTS.splice(elIndex,1)
          }
      }else{
        this.model.CONSULTANTS.push(
          {
            CONSULTANT_ID: fieldName.CONSULTANT_ID,
            CONSULTANT_TYPE_ID: fieldName.CONSULTANT_TYPE_ID,
          }
        )
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
    validateBulkForm() {
      return this.$refs['bulkForm'].validate();
    },
    validateSingleForm() {
      return this.$refs['singleForm'].validate();
    },

    saveAsDraft: async function() {
      if(this.model.CONSULTANTS.length>0){
        if (confirm("Are you sure you want to save as draft?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("CONSULTANTS", JSON.stringify(this.model.CONSULTANTS));
          data.append("DIST_ID", this.model.DIST_ID);
          data.append("CREATE_BY",this.model.CREATE_BY);
          const user = localStorage.getItem("user");
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
          data.append("PUBLISH_STATUS",0);
          data.append("APPROVAL_STATUS",0);
          data.append("TERMINATION_STATUS", 1);
          data.append("TERMINATION_REMARK", this.model.TERMINATION_REMARK ? this.model.TERMINATION_REMARK : '');
          data.append("TERMINATION_SUBMISSION_ID", this.model.TERMINATION_SUBMISSION_ID ? this.model.TERMINATION_SUBMISSION_ID : '');
          data.append("TERMINATION_DATE", this.model.TERMINATION_DATE ? moment(this.model.TERMINATION_DATE).format('YYYY-MM-DD') : '');
          data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE ? this.model.TERMINATION_TYPE.value : '');
          data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY ? this.model.TERMINATION_TYPE_OTHER_SPECIFY : '');
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }
          const response = await Termination.postTermination(data);
          this.show_overlay = false;
          this.$router.push('/fimm/consultant-termination-statusList-RD')
        }
      }else{
        alert('Please select consultants for action');
      }
    },
    submitTerminationForm: async function() {
      if(this.model.CONSULTANTS.length>0){
        if (confirm("Are you sure you want to terminate?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("TERMINATION_STATUS", 15);
          data.append("CONSULTANTS", JSON.stringify(this.model.CONSULTANTS));
          data.append("DIST_ID", this.model.DIST_ID);
          data.append("CREATE_BY",this.model.CREATE_BY);

          const user = localStorage.getItem("user");
          var noted = "SUBMITTED BY " + JSON.parse(user).USER_GROUP_NAME;
          data.append("NOTE", noted);
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

          data.append("APPROVAL_STATUS",15);
          data.append("PUBLISH_STATUS",1);
          data.append("TERMINATION_REMARK", this.model.TERMINATION_REMARK ? this.model.TERMINATION_REMARK : '');
          data.append("TERMINATION_SUBMISSION_ID", this.model.TERMINATION_SUBMISSION_ID ? this.model.TERMINATION_SUBMISSION_ID : '');
          data.append("TERMINATION_DATE", this.model.TERMINATION_DATE ? moment(this.model.TERMINATION_DATE).format('YYYY-MM-DD') : '');
          data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE ? this.model.TERMINATION_TYPE.value : '');
          data.append("TERMINATION_TYPE_OTHER_SPECIFY", this.model.TERMINATION_TYPE_OTHER_SPECIFY ? this.model.TERMINATION_TYPE_OTHER_SPECIFY : '');
          data.append("TERMINATION_BY",  "FIMM");
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
          }


          const approvalLevel = await services06Module0.getApprovalLevel(9, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-termination-RD_HOD");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT-TERMINATION) New entry pending for RD-HOD Approval"
          );


          const response = await Termination.postTermination(data);
          this.show_overlay = false;
          this.$router.push('/fimm/consultant-termination-statusList-RD')
        }
      }else{
        alert('Please select consultants for action');
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
        this.model.TERMINATION_DOCUMENT = [];
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

  },
};
</script>
<style scoped></style>
