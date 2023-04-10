<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h4 style="margin-top:0px; margin-bottom:20px">
              Candidate Appeal Application
            </h4>

            <br />

            <vue-form-generator
              :model="model"
              :schema="appealSchema"
              :options="formOptions"
              ref="tabForm2"
              @model-updated="onModelUpdated"
              @validated="onValidated"
            >
            </vue-form-generator>

            <br />

            <br />
            <div class="float-right">
              <button
                @click="submitTerminate"
                type="button"
                class="ml-1 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Submit
              </button>
            </div>
            <div class="float-left">
              <button
                @click="goToViewProfilePage"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-step-backward" /> &nbsp; Previous
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

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import HorizontalScroll from 'vue-horizontal-scroll';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import moment from 'moment';

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
const Termination = RepositoryFactory.get('termination');

export default {
  data() {
    return {
      appealType: [
        {
          label: 'Exam Related Appeal',
          value: '1',
        },
        {
          label: 'Termination',
          value: '2',
        },
        {
          label: 'Bankruptcy',
          value: '3',
        },
      ],

      examRelatedType: [
        {
          label: 'Exam Result',
          value: 1,
        },
        {
          label: 'Fee Waiver',
          value: 2,
        },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      visible: {
        APPEAL_EXAM_TYPE: false,
      },
      model: {
        APPEAL_TYPE: '',
        APPEAL_EXAM_TYPE: '',
        APPEAL_DATE: '',
        APPEAL_REMARK: '',
        CONSULTANT_ID: '',
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
      },

      appealSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Appeal Type',
                model: 'APPEAL_TYPE',
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
                  return this.appealType;
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'APPEAL_DATE',
                placeholder: 'Enter Termination Date',
                required: true,
                validator: 'date',
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                label: 'Exam related appeal type',
                model: 'APPEAL_EXAM_TYPE',
                placeholder: 'Please specify',
                required: true,
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.examRelatedType;
                },
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE;
                },
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE;
                },
              },

              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'APPEAL_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
              {
                labels: 'Upload Document',
                text: 'Choose document(s)',
                model: 'APPEAL_DOCUMENT',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
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
    goToViewProfilePage() {
      this.$router.push({ path: 'consultant-profile-Consultant' });
    },
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

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema === 'APPEAL_TYPE') {
        console.log(newVal);
        this.visible.APPEAL_EXAM_TYPE = false;
        if (newVal.label === 'Exam Related Appeal') this.visible.APPEAL_EXAM_TYPE = true;
      }
    },
    onValidated(isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    },
    submitTerminate: async function() {
      // let form1 = this.$refs.tabForm2.validate();
      // if (form1) {
      let data = {
        TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
        TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
        CONSULTANT_ID: this.model.CONSULTANT_ID,
        CREATE_BY: this.model.CREATE_BY,
        TERMINATION_REMARK: this.model.TERMINATION_REMARK,
        TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
      };

      console.log(data);

      const response = await Termination.postTermination(data);
      // const returnresponse = await services02module2.postTerminateConsultant(data);
      console.log(response);
      // }
    },

    //     addConsultant(data) {
    //   console.log(data);
    //   this.selectedConsultant = data;
    //   console.log(this.selectedConsultant);
    // },
  },
};
</script>
<style scoped></style>
