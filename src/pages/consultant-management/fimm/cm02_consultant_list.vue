<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
            <div v-if="!dataReady" style="margin-top: 25%">
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle mr-1"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </div>
            
            <div v-else>
              <template v-if="!currentConsultant">
                  <va-card>
                    <h4 style="margin-top:0px; margin-bottom:20px">
                      List of Consultant
                    </h4>

                    <div style="display:flex; justify-content:flex-end; align-items:center">
                      <div class="flex md3 offset--md3">
                        <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                          <va-icon name="fa fa-search" slot="prepend" />
                        </va-input>
                      </div>
                    </div>

                    <!-- CONSULTANT TABLE -->
                    <va-data-table
                      :fields="fields.consultant"
                      :data="filteredConsultant"
                      no-data-label="No data found"
                      :per-page="parseInt(perPage)"
                      :datacount="filteredConsultant.length"
                      :dataperpage="parseInt(perPage)"
                      clickable
                    >
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
                        </div>
                      </template>
                    </va-data-table>
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
                  <consultant-info :consultantData="currentConsultant"></consultant-info>

                  <div class="float-left">
                    <button
                      @click="currentConsultant = null"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                </va-card>
              </template>
            </div>
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
import * as services05module1 from '@/app/module1/services05'
import RepositoryFactory from '../../../repositories/RepositoryFactory';
// Consultant Profile Data display
import ConsultantInfo from "@/modules/consultant-management/components/applicant_profile/consultant_info";

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
  components: { ConsultantInfo },

  data() {
    return {
      dataReady: false,
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

      filter: null,
      distributorData: '',
      consultants: null,
      currentConsultant: null,
      currentPage: 1,
      perPage: 10,
      visible: {
        TERMINATION_FORM: false,
        TERMINATION_TYPE_OTHER_SPECIFY: false,
      },
      model: {
        TERMINATION_TYPE: '',
        TERMINATION_TYPE_OTHER_SPECIFY: '',
        TERMINATION_DATE: '',
        SELECTED_CONSULTANT: '',
        REMARKS_COMMENTS: '',
        CONSULTANTS: [],
      },
      // fields: [
      //   // A virtual column that doesn't exist in items
      //   { key: 'actions', label: '' },
      //   // A column that needs custom formatting
      //   { key: 'CONSULTANT_NAME', label: 'Consultant Name' },
      //   { key: 'CONSULTANT_NRIC', label: 'NRIC No' },
      //   { key: 'CONSULTANT_PASSPORT_NO', label: 'Passport No' },
      //   { key: 'CONSULTANT_FIMM_NO', label: 'FIMM No' },
      //   { key: 'SCHEME', label: 'Consultant Type' },
      // ],
      fields: {
        distributor: [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DIST_PHONE_NO', title: 'PHONE NO' },
          { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
          { name: 'TOTAL_CONSULTANT_TERMINATED', title: 'TOTAL CONSULTANT TERMINATED' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],

        consultant: [
          { name: '__slot:index', title: 'NO' },
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_MOBILE_NO', title: 'PHONE NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'TYPE_SCHEMAS', title: 'CONSULTANT TYPE' },
          { name: 'CONSULTANT_STATUS', title: 'STATUS' },
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
        distributor: '',
        consultant: '',
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
                validator: 'required',
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
                type: 'input',
                inputType: 'date',
                label: 'Termination Date',
                model: 'TERMINATION_DATE',
                placeholder: 'Enter Termination Date',
                required: true,
                validator: 'date',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other',
                model: 'TERMINATION_TYPE_OTHER_SPECIFY',
                placeholder: 'Please specify',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'required',
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
                required: true,
                row: 10,
                max: 1000,
                label: 'Remarks / Comments',
                model: 'REMARKS_COMMENTS',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.getDistributorDetails();

    // await this.getConsultantRecord().then(res => {
    //   this.dataReady = true;
    // });
    // await this.getFilterConsultantRecord();
    // this.consultants = await services02module2.getConsultant();
    // await console.log(this.consultants)
  },
  computed: {
    filteredConsultant() {
      const search = this.search.consultant.toLowerCase();
      if (this.search && this.consultants) {
        return this.consultants.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultants;
    },
  },
  methods: {
     // get distributor details
    getDistributorDetails: async function () {
      const user = localStorage.getItem('user')
      const response = await services05module1.getdistributordetails(JSON.parse(user).user_id)
      this.distributorData = response;
      this.getConsultantRecord();
    },

    async getConsultantRecord() {
      //const response = await ConsultantRecord.getAllConsultantRecord();
      const response = await services02module2.getConsultantUnderDistributor(this.distributorData.DISTRIBUTOR_ID);
      this.consultants = response;
      this.dataReady = true;
    },

    async viewCurrentConsultant(props) {
      this.currentConsultant = props.rowData;
    },

    // async getFilterConsultantRecord() {
    //   const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
    //   console.log('this is filter cons records', filter_cons_records);
    // },

    viewConsultant(consultant) {
      console.log(consultant.rowData)
      this.$router.push({ name: 'consultant-details' ,params: { id: consultant.rowData.CONSULTANT_ID }})
    },
    registerConsultant(consultant) {
      console.log(consultant.rowData)
      this.$router.push({ name: 'consultant-registration-fimm' ,params: { id: consultant.rowData.CONSULTANT_ID }})
    },
    resignConsultant(consultant) {
      console.log(consultant.rowData)
      this.$router.push({ name: 'consultant-resignation-fimm' ,params: { id: consultant.rowData.CONSULTANT_ID }})
    },
    rescheduleConsultant(consultant) {
      console.log(consultant.rowData)
      this.$router.push({ name: 'consultant-reschedule-fimm' ,params: { id: consultant.rowData.CONSULTANT_ID }})
    },
    appealConsultant(consultant) {
      console.log(consultant.rowData)
      this.$router.push({ name: 'consultant-appeal-fimm' ,params: { id: consultant.rowData.CONSULTANT_ID }})
    },
    onRowSelected(items) {
      this.model.SELECTED_CONSULTANT = items[0];
      console.log(this.model.SELECTED_CONSULTANT);
    },
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema === 'TERMINATION_TYPE') {
        this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false;
        if (newVal.value.match('Other')) {
          this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true;
        }
      }
    },
    submitTerminate: async function() {
      console.log(this.model);

      let form1 = this.$refs.tabForm2.validate();
      if (form1) {
        let data = {
          TERMINATION_TYPE : this.model.TERMINATION_TYPE.value,
          CONSULTANT_ID: 1,
          CREATE_BY: 2,
          TERMINATION_REMARK: this.model.REMARKS_COMMENTS,
          TERMINATION_DATE:  moment(this.model.TERMINATION_DATE).format()
        }
        const returnresponse = await services02module2.postTerminateConsultant(data);
        console.log(returnresponse)
      }
    },

    // addConsultant(data) {
    //   console.log(data);
    //   this.selectedConsultant = data;
    //   console.log(this.selectedConsultant);
    // },
  },
};
</script>
