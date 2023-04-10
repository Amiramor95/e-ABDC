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
                <h4 style="margin-top:0px; margin-bottom:20px">
                  List of Consultant Termination Request
                </h4>
              </template>
              <p style="margin:0; font-size: 1.1rem">
                DISTRIBUTOR NAME - {{ currentDistributor}}
              </p>

              <!-- CONSULTANT TABLE -->
              <!-- select-mode="single" -->
              <br>
              <br>
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
<!--                     <span v-b-tooltip.hover title="edit" class="badge badge-primary mr-2" @click="bulkListByDraft(props)" v-if="props.rowData.TERMINATION_STATUS==1">-->
<!--                        <i class="fa fa-edit"></i>-->
<!--                      </span>-->
<!--                      <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" v-else @click="viewListPage(props)">-->
<!--                        <i class="fa fa-eye"></i>-->
<!--                      </span>-->

                    <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" @click="viewListPage(props)">
                        <i class="fa fa-eye" v-if="props.rowData.FIMM_STATUS==15 || props.rowData.FIMM_STATUS==3 || props.rowData.FIMM_STATUS==5 || props.rowData.FIMM_STATUS==7"></i>
                        <i class="fa fa-edit" v-else></i>
                      </span>


                  </h4>
                </template>
              </va-data-table>
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
  async created () {
    const DIST_INFO=JSON.parse(localStorage.getItem('DIST_INFO'));
    this.currentDistributor=DIST_INFO.DIST_NAME;
    this.consultantsAPI=await services02module2.getAllApprovalTerminationCEO(DIST_INFO.DISTRIBUTOR_ID);
    this.isReady=true;
  },
  
  async mounted() {

  },

  data() {
    return {
      isReady: false,

      currentConsultant: null,
      currentDistributor: null,

      formOptions: {
        validateAfterChanged: true,
      },

      search: {
        distributor: '',
        consultant: '',
      },

      consultantsAPI: [],

      distributorsAPI: null,

      currentPage: 1,
      perPage: '10',
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
    back() {
      this.$router.push('/fimm/consultant-termination-CEO')
    }, // back button
    //

    viewListPage(props){
      localStorage.setItem('APPROVAL_STATUS',props.rowData.FIMM_STATUS);
      localStorage.setItem('SUBMISSION_ID',props.rowData.TERMINATION_SUBMISSION_ID);
      this.$router.push('/fimm/consultant-termination-bulk-CEO');
    },

    async viewCurrentConsultant(props) {
      try {
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
  },
};
</script>
<style scoped></style>
