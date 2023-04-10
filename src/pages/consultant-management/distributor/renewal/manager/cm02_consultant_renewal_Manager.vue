<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
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
                  Consultant Non-Renewal List
                </h4>
              </template>
              <br>


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
                <template slot="ACTION" slot-scope="props">
                  <h4 style="margin:0; font-size:20px">
                     <span v-b-tooltip.hover title="edit" class="badge badge-primary mr-2" @click="bulkListByDraft(props)" v-if="props.rowData.FIMM_APPROVAL_STATUS==15 || props.rowData.FIMM_APPROVAL_STATUS==1">
                        <i class="fa fa-edit"></i>
                      </span>
                    <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" v-else @click="viewListPage(props)">
                        <i class="fa fa-eye"></i>
                      </span>


                  </h4>
                </template>
              </va-data-table>
            </va-card>
          </template>

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

      selected: [],
      currentConsultant: null,
      currentDistributor: null,

      isBusy: true,

      formOptions: {
        validateAfterChanged: true,
      },

      fields: {
        consultant: [
          { name: '__slot:checkbox', title: 'checkbox' },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
      },
      // filter: {
      //   distributor: null,
      //   consultant: null,
      // },
      search: '',

      consultantsAPI: [],

      currentPage: 1,
      perPage: '10',

      model: {
        RENEWAL_REMARK: '',
        SUPPORTED_DOCUMENT: [],
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
                model: 'RENEWAL_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
              {
                labels: 'SUPPORTED DOCUMENT',
                text: 'Choose a File',
                model: 'SUPPORTED_DOCUMENT',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
    };
  },

  async created () {
    const DIST_INFO = JSON.parse(localStorage.getItem('user'));
    this.currentDistributor = DIST_INFO;
    this.consultantsAPI=await services02module2.getRenewalManagerStatusList(DIST_INFO.USER_DIST_ID);
    this.isReady=true;
  },

  computed: {
    consultantFields() {
      return [
        { name: '__slot:index', title: 'NO' },
        { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
        { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
        { name: 'TS_PARAM', title: 'STATUS' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ];
    },
    filteredConsultant() {
      const search = this.search.toLowerCase();
      if (this.search) {
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
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    bulkList(){
      this.$router.push('/distributor/consultant-renewal-Manager-list');
    },

    bulkListByDraft(props){
      localStorage.setItem('MANAGER_TS_ID',props.rowData.FIMM_STATUS);
      localStorage.setItem('SUBMISSION_DATE',props.rowData.SUBMISSION_DATE);
      // localStorage.setItem('draftRenewalReviewer',JSON.stringify(props.rowData));
      // localStorage.setItem('isDraft',true);
      this.$router.push('/distributor/consultant-non-renewal-Manager-list');
    },

    viewListPage(props){
      localStorage.setItem('MANAGER_TS_ID',props.rowData.FIMM_STATUS);
      localStorage.setItem('SUBMISSION_DATE',props.rowData.SUBMISSION_DATE);
      this.$router.push('/distributor/consultant-non-renewal-Manager-list');
    },
    async getConsultantRecord() {
      console.log('inside get consultant record');
      const response = await ConsultantRecord.getConsultantRecord();
      this.consultantsAPI = response.data.data;

      // this.isBusy = false;
      console.log(this.consultantsAPI);
    },
    async getAllTermination() {
      const termination = await Termination.getAllTermination();
      console.log('this is termination', termination.data.data);
    },

    viewCurrentConsultant(props) {
      this.currentConsultant = props.rowData;
    },

    setCurrentConsultant(props) {
      console.log('inside setCurrentConsultant');
      const index = this.model.CONSULTANT_ID.findIndex(
        el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID,
      );

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
      }
    },
    onValidated(isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    },
    submitRejectConsultantRenewal: async function() {
      let data = {
        TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
        TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
        CONSULTANT_ID: this.model.CONSULTANT_ID,
        CREATE_BY: this.model.CREATE_BY,
        TERMINATION_REMARK: this.model.TERMINATION_REMARK,
        TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
      };

      console.log(data);
      // const response = await Termination.postTermination(data);
      // console.log(response);
      // }
    },
    submitApproveConsultantRenewal: async function() {
      let data = {
        TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
        TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
        CONSULTANT_ID: this.model.CONSULTANT_ID,
        CREATE_BY: this.model.CREATE_BY,
        TERMINATION_REMARK: this.model.TERMINATION_REMARK,
        TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
      };

      console.log(data);
      // const response = await Termination.postTermination(data);
      // console.log(response);
      // }
    },
    submitTerminate: async function() {
      let data = {
        TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
        TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
        CONSULTANT_ID: this.model.CONSULTANT_ID,
        CREATE_BY: this.model.CREATE_BY,
        TERMINATION_REMARK: this.model.TERMINATION_REMARK,
        TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
      };

      console.log(data);
      // const response = await Termination.postTermination(data);
      // console.log(response);
      // }
    },
    submitTerminate: async function() {
      let data = {
        TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
        TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
        CONSULTANT_ID: this.model.CONSULTANT_ID,
        CREATE_BY: this.model.CREATE_BY,
        TERMINATION_REMARK: this.model.TERMINATION_REMARK,
        TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
      };

      console.log(data);
      // const response = await Termination.postTermination(data);
      // console.log(response);
      // }
    },

    // isConsultantAdded(array, props) {
    //   return array.findIndex(el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID);
    // },

    // removeInsufficientCPDLIST(props) {
    //   const index = this.isConsultantAdded(this.model.INSUFFICIENT_CPD_LIST, props);

    //   this.model.INSUFFICIENT_CPD_LIST.splice(index, 1);
    // },

    // setInsufficientCPDList(props) {
    //   const index = this.isConsultantAdded(this.model.INSUFFICIENT_CPD_LIST, props);

    //   if (index >= 0) return;
    //   this.model.INSUFFICIENT_CPD_LIST.push(props.rowData);
    // },
  },
};
</script>
<style scoped></style>
