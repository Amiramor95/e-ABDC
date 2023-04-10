<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <template>
            <div v-if="!isReady" style="margin-top: 25%">
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle mr-1"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </div>
            <va-card v-else>
              <template>
                <div class="row">
                  <div class="col-8">
                    <h4 style="margin-top:0">
                      List of Consultant Termination Request
                    </h4>
                  </div>
                  <div class="col-4 float-right">
                    <div class="float-right">
                      <h5>
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
                  </div>

                </div>

              </template>
              <!-- CONSULTANT TABLE -->
              <!-- select-mode="single" -->

              <div v-if="!isReady">
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </div>
              <va-data-table
                :fields="consultantFields"
                :data="filteredConsultant"
                no-data-label="No data found"
                :per-page="parseInt(perPage)"
                :datacount="filteredConsultant.length"
                :dataperpage="parseInt(perPage)"
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
                      <!-- <span v-b-tooltip.hover title="edit" class="badge badge-primary mr-2" @click="bulkListByDraft(props)" v-if="props.rowData.TERMINATION_STATUS==1">
                        <i class="fa fa-edit"></i>
                      </span> -->

                      <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" @click="viewCurrentConsultant(props)">
                        <i class="fa fa-eye"></i>
                      </span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>
          </template>

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
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import TerminationRepository from '../../../repositories/module2/TerminationRepository';
import * as servicesModule3 from '../../../app/module3/services01';

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

export default {
  components: { Tabs, Vudal },
  
  async created () {
    this.consultantsAPI=await services02module2.getApprovalTerminationStatus();
    this.isReady=true;
  },

  async mounted() {

  },


  data() {
    return {
      isReady: false,
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

        TERMINATION_TYPE: '',
        TERMINATION_TYPE_OTHER_SPECIFY: '',
        TERMINATION_DATE: '',
        CONSULTANT_ID: [],
        TERMINATION_REMARK: '',
        readRemark: '',
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
              // {
              //   type: 'input',
              //   inputType: 'date',
              //   label: 'Termination Date',
              //   model: 'TERMINATION_DATE',
              //   placeholder: 'Enter Termination Date',
              //   required: true,
              //   validator: 'date',
              //   styleClasses: 'col-md-6',
              // },
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
                // validator: 'number',
                styleClasses: 'col-md-12',
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
      },
    };
  },
  computed: {
    consultantFields() {
      return [
        // { name: '__slot:index', title: 'NO' },
        // // { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
        // { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
        // { name: 'TS_PARAM', title: 'STATUS' },
        // { name: '__slot:ACTION', title: 'ACTION' },


        { name: '__slot:index', title: 'NO' },
        { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
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
      // const search = this.search.consultant.toLowerCase();
      // if (this.search) {
      //   return this.consultantsAPI.filter(el => {
      //     return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
      //   });
      // }

      return this.consultantsAPI;
    },
    // mappedSelectedConsultantArray() {
    //   if (this.model.CONSULTANT_ID.length)
    //     return this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },
  methods: {
    async readMore(data) {
      this.$modals.readModal.$show();
      this.model.readRemark = data.TERMINATION_REMARK;
    },

    exchange () {
      this.$router.push('/distributor/consultant-termination-Second_Level')
    },
    back() {
      this.$router.push('/distributor/consultant-termination-RD')
    }, // back button

    bulkList(){
      this.$router.push('/distributor/consultant-bulk-termination-RD');
    },

    bulkListByDraft(props){
      localStorage.setItem('TS_ID',props.rowData.TERMINATION_STATUS);
      localStorage.setItem('isDraft',true);
      this.$router.push('/fimm/consultant-bulk-termination-RD');
    },

    viewListPage(props){
      localStorage.setItem('APPROVAL_TERMINATION',JSON.stringify(props.rowData));
      this.$router.push('/fimm/consultant-termination-Second_Level');
    },

    handleClick(newTab) {
      this.currentTab = newTab;
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
        localStorage.setItem('currentConsultant',JSON.stringify(props.rowData));
        this.$router.push('/distributor/consultant-termination-detail-distirbutor');
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
        el => el === props.rowData.CONSULTANT_ID,
      );

      if (index >= 0) {
        this.model.CONSULTANT_ID.splice(index, 1);
      } else {
        this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
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

    saveAsDraft: async function() {

      if (confirm("Are you sure you want to proceed this action?")) {

        const data = new FormData();
        data.append("TERMINATION_STATUS", 15);
        data.append("CONSULTANT_ID", JSON.stringify(this.model.CONSULTANT_ID));
        data.append("CREATE_BY",this.model.CREATE_BY);
        data.append("PUBLISH_STATUS",0);
        data.append("TERMINATION_REMARK", this.model.TERMINATION_REMARK);
        data.append("TERMINATION_DATE",moment(this.model.TERMINATION_DATE).format('YYYY-MM-DD'));
        data.append("TERMINATION_TYPE",this.model.TERMINATION_TYPE.value);
        const response = await Termination.postTermination(data);
        this.model.CONSULTANT_ID=[];
        this.model.TERMINATION_REMARK="";
        this.model.TERMINATION_TYPE="";
        this.model.TERMINATION_DATE="";

      }
    },
    submitTerminationForm: async function() {
      if (this.isBulk) {
        const isBulkValidated = await this.validateBulkForm();
      }

      const isSingleValidated = await this.validateSingleForm();

      if (isBulkValidated || isSingleValidated) {
        let data = {
          TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
          TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
          CONSULTANT_ID: this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID),
          CREATE_BY: this.model.CREATE_BY,
          TERMINATION_REMARK: this.model.TERMINATION_REMARK,
          TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
          APPROVAL_STATUS: 2,
        };

        if (this.currentConsultant) data.CONSULTANT_ID = this.currentConsultant.CONSULTANT_ID;

        const response = await services02module2.postTerminateConsultant(data);
        return response;
      }

      return false;
      // }
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

    async getFilterConsultantRecord() {
      const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
      console.log('this is filter cons records', filter_cons_records);
    },

    // fix this
    // setCurrentConsultantAll(scope) {
    //   if (this.mappedSelectedConsultantArray.length) {
    //     this.$refs['consultantTable'].clearSelected();
    //   } else {
    //     this.$refs['consultantTable'].selectAllRows();
    //   }
    //   // this.mappedSelectedConsultantArray.length
    //   // ? this.$refs['consultantTable'].clearSelected()
    //   // : this.$refs['consultantTable'].selectAllRows();
    // },

    // setCurrentConsultant() {
    //   console.log(this.selected);
    //   // alert("here");
    //   // console.log(this.selected);
    //   if (document.getElementById('checkboxId_' + id).checked) {
    //     this.checkboxArray.push(screenId);
    //   } else {
    //     const indexToRemove = this.checkboxArray.indexOf(screenId);
    //     if (indexToRemove > -1) {
    //       this.checkboxArray.splice(indexToRemove, 1);
    //     }
    //   }
    // },

    // onRowSelected(items) {
    //   this.model.CONSULTANT_ID = items;
    //   console.log(this.model.CONSULTANT_ID);
    // },
  },
};
</script>
<style scoped></style>
