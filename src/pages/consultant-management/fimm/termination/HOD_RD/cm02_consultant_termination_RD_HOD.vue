<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <template v-if="!currentDistributor">
            <div v-if="!isReady" style="margin-top: 25%">
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle mr-1"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </div>
            <va-card v-else>
              <template >
                <h4 style="margin-top:0">List of Consultant Termination</h4>
              </template>

              <div style="display:flex; justify-content:flex-end; align-items:center">
                <div class="">
                  <va-input :placeholder="$t('Search')" v-model="search.distributor" removable>
                    <va-icon name="fa fa-search" slot="prepend" />
                  </va-input>
                </div>
              </div>

              <!-- DISTRIBUTOR TABLE -->
              <va-data-table
                :fields="distributorFields"
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
                  <h4 @click="setCurrentDistributor(props)" style="margin:0; font-size:20px">
                      <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2">
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
  const Termination = RepositoryFactory.get('termination');

  export default {

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
    async created() {
      await this.getHodDistributors();
    },
    computed: {
      distributorFields() {
        return [
          { name: '__slot:index', title: 'NO' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DIST_MOBILE_NUMBER', title: 'PHONE NUMBER' },
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

    },
    methods: {
      async getHodDistributors() {
        this.distributorsAPI = await services02module2.getHodDistributorRecords();
        this.isReady = true;
        console.log('this is distributors', this.distributorsAPI);
      },

      async setCurrentDistributor(props) {
        localStorage.setItem('DIST_INFO',JSON.stringify(props.rowData));
        this.$router.push('/fimm/consultant-termination-statusList-RD-HOD');
        this.currentDistributor = props.rowData.DIST_NAME;
      },
    },
  };
</script>
<style scoped></style>
