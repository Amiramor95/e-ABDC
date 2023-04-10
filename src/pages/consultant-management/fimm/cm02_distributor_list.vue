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

          <div>
            <template v-if="!currentDistributor">
              <va-card>
                <h1>List of Distributor</h1>
                <br />
                <div style="display:flex; justify-content:flex-end; align-items:center">
                    <div class="flex md3 offset--md3">
                      <va-input :placeholder="$t('Search')" v-model="search.distributor" removable>
                        <va-icon name="fa fa-search" slot="prepend" />
                      </va-input>
                    </div>
                  </div>
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
                      <h4 @click="viewDistributor(props)" style="margin:0; font-size:20px">
                        <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                  </va-data-table>
                </va-card>
            </template>

            <template v-else>
              <template v-if="!currentConsultant">
                <va-card>
                  <h4 style="margin-top:0px; margin-bottom:20px">
                    List of Consultant
                  </h4>

                  <h6 style="margin-top:0px; margin-bottom:20px">
                    Distributor Name - {{ currentDistributor.DIST_NAME }}
                  </h6>

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
// const ConsultantRecord = RepositoryFactory.get('consultantrecord');
const DistributorRecord = RepositoryFactory.get('distributorrecords');

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
      distributors: null,
      consultants: null,
      currentDistributor: null,
      currentConsultant: null,
      selectedConsultant: null,
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
     
      fields: {
        distributor: [
          { name: '__slot:index', title: 'NO' },
          { name: 'DIST_CODE', title: 'DISTRIBUTOR CODE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DT_TYPES', title: 'DISTRIBUTOR TYPE' },
          { name: 'DIST_DATE_INCORP', title: 'DATE INCORP' },
          { name: 'DIST_REGI_NUM1', title: 'REGISTER NUMBER 1' },
          { name: 'DIST_REGI_NUM2', title: 'REGISTER NUMBER 2' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],

        consultant: [
          { name: '__slot:index', title: 'NO' },
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },

          // A column that needs custom formatting
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

  async created() {
    await this.getDistributorRecord();
  },

  async mounted() {
    // await this.getConsultantRecord().then(res => {
    //   this.dataReady = true;
    // });

    // await this.getDistributorRecord().then(res => {
    //   this.dataReady = true;
    // });

    // await this.getFilterConsultantRecord();
    // this.consultants = await services02module2.getConsultant();
    // await console.log(this.consultants)
  },

  computed: {
    filteredDistributor() {
      const search = this.search.distributor.toLowerCase();
      if (this.search && this.distributors) {
        return this.distributors.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.distributors;
    },

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
    async getDistributorRecord() {
      //const response = await DistributorRecord.getDistributorRecords();
      const response = await services02module2.getAllDistributorList();
      this.distributors = response;
      this.dataReady = true;
    },

    async viewDistributor(props) {
      this.currentDistributor = props.rowData;
      await this.getConsultantsList(props.rowData.DISTRIBUTOR_ID);
    },

    async getConsultantsList(distId) {
      const response = await services02module2.getConsultantUnderDistributor(distId);
      this.consultants = response;
    },

    async viewCurrentConsultant(props) {
      this.currentConsultant = props.rowData;
    },
  },
};
</script>
