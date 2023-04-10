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
                     <span v-b-tooltip.hover title="edit" class="badge badge-primary mr-2" @click="bulkListByDraft(props)" 
                      v-if="props.rowData.APPROVAL_STATUS==15 || props.rowData.APPROVAL_STATUS==1 || props.rowData.APPROVAL_STATUS==8 || props.rowData.APPROVAL_STATUS==5">
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

  export default {
    components: { Tabs },

    async created () {
      const DIST_INFO = JSON.parse(localStorage.getItem('user'));
      this.currentDistributor = DIST_INFO;
      this.consultantsAPI=await services02module2.getRenewalReviewerStatusList(DIST_INFO.USER_DIST_ID);
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
          CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
        },
      };
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
      bulkListByDraft(props){
        localStorage.setItem('REVIEWER_TS_ID',props.rowData.APPROVAL_STATUS);
        localStorage.setItem('FIMM_STATUS',props.rowData.FIMM_STATUS);
        localStorage.setItem('SUBMISSION_DATE',props.rowData.SUBMISSION_DATE);
        // localStorage.setItem('draftRenewalReviewer',JSON.stringify(props.rowData));
        // localStorage.setItem('isDraft',true);
        this.$router.push('/distributor/consultant-non-renewal-Reviewer-list');
      },

      viewListPage(props){
        localStorage.setItem('REVIEWER_TS_ID',props.rowData.APPROVAL_STATUS);
        localStorage.setItem('FIMM_STATUS',props.rowData.FIMM_STATUS);
        localStorage.setItem('SUBMISSION_DATE',props.rowData.SUBMISSION_DATE);
        this.$router.push('/distributor/consultant-non-renewal-Reviewer-list');
      },

      handleClick(newTab) {
        this.currentTab = newTab;
      },

      async getDistributors() {
        this.distributorsAPI = await services02module2.getDistributorRecords();
        this.isReady = true;
        console.log('this is distributors', this.distributorsAPI);
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

      async getFilterConsultantRecord() {
        const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
        console.log('this is filter cons records', filter_cons_records);
      },
    },
  };
</script>
<style scoped></style>
