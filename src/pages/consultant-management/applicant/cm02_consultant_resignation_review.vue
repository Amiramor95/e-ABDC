<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h1>List of Consultant Resignation Request</h1>
            <br />
            <div class="col-3">
              <div class="form-group form-group-sm has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input v-model="filter" type="text" class="form-control" placeholder="Search" />
              </div>
            </div>
            <b-table
              hover
              selectable
              select-mode="single"
              :items="consultants"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              responsive="md"
              :busy="isBusy"
              @row-selected="onRowSelected"
            >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell()="data">
                <span class="description">{{ data.value }}</span>
              </template>
              <template #cell(actions)="data">
                <span  class="ml-1 btn btn-success btn-fill btn-md">
                     <i class="fa fa-eye" />
                </span>
              </template>
            </b-table>
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
            <div class="float-right">
              <button
                @click="submitTerminate"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Approve
              </button>
            </div>
          </va-card>
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
  data() {
    return {
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
      consultants: null,
      selectedConsultant: null,
      currentPage: 1,
      perPage: 5,
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
      fields: [
       
        // A column that needs custom formatting
        { key: 'CONSULTANT_NAME', label: 'Consultant Name' },
        { key: 'CONSULTANT_NRIC', label: 'NRIC No' },
        { key: 'CONSULTANT_PASSPORT_NO', label: 'Passport No' },
        { key: 'CONSULTANT_FIMM_NO', label: 'FIMM No' },
        { key: 'SCHEME', label: 'Consultant Type' },
         // A virtual column that doesn't exist in items
        { key: 'actions', label: 'Action' },
      ],

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
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
  async mounted() {
    await this.getConsultantRecord();
    // await this.getFilterConsultantRecord();
    // this.consultants = await services02module2.getConsultant();
    // await console.log(this.consultants)
  },
  methods: {
    async getConsultantRecord() {
      console.log('inside get consultant record');
      const response = await ConsultantRecord.getConsultantRecord();
      this.consultants = response.data.data;
      this.isBusy = false;
      console.log(this.consultants);
    },
    // async getFilterConsultantRecord() {
    //   const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
    //   console.log('this is filter cons records', filter_cons_records);
    // },
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

    //     addConsultant(data) {
    //   console.log(data);
    //   this.selectedConsultant = data;
    //   console.log(this.selectedConsultant);
    // },
  },
};
</script>
