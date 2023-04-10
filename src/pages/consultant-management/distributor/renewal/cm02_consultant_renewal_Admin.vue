<template>
  <div class="">
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="row">
        <div class="col-12">
          <template v-if="!currentConsultant">
            <div>
              <va-card v-if="!viewMode">
                <h4 style="margin-top:0">List of Consultant Renewal Request</h4>
                <div
                  style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    "
                >
                  <div class="flex md3 offset--md3">
                    <div style="display: flex; justify-content: flex-end">
                      <h4 style="margin: 0; margin-bottom: 10px">
                          <span
                            v-b-tooltip.hover
                            title="Bulk"
                            class="badge badge-success mr-2"
                            @click="getSubmittedRenewalList"
                          >
                            <i class="fa fa-plus"></i>
                          </span>
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input
                      v-model="search.consultant"
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div>

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
                    <h5 class="mt-1">
                  <span
                    v-if="props.rowData.TS_ID==1"
                    v-b-tooltip.hover
                    title="Edit"
                    v-on:click="viewListPage(props)"
                    class="badge badge-primary mr-2"
                  >
                    <i class="fa fa-edit"></i
                    ></span>
                      <span
                        v-else
                        v-b-tooltip.hover
                        title="View"
                        v-on:click="viewListPage(props)"
                        class="badge badge-success mr-2"
                      >
                    <i class="fa fa-eye"></i
                    ></span>
                    </h5>
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </template>
        </div>
      </div>
    </b-overlay>
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
  import * as services06Module0 from '../../../../app/module0/services06';
  import moment from 'moment';
  import * as servicesmodule0 from '../../../../app/module0/services';
  import * as servicesmodule2 from '../../../../app/module2/services';
  import * as services02module2 from '../../../../app/module2/services02';
  import * as services05module1 from '@/app/module1/services05'
  import RepositoryFactory from '../../../../repositories/RepositoryFactory';
  import TerminationRepository from '../../../../repositories/module2/TerminationRepository';
  import * as servicesModule1 from '../../../../app/module1/services01'
  import * as service07Module4 from '../../../../app/module4/services07'

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
    async mounted() {
      this.getRenewalConsultant();
      // this.getDistributorDetails();
    },

    data() {
      return {
        distributorData: '',
        currentConsultant: null,

        viewMode:false,
        draftRenewal:null,
        show_overlay: true,
        isDraft: false,
        selected: [],
        currentDistributor: null,
        USERID: null,

        formOptions: {
          validateAfterChanged: true,
        },

        fields: {
          consultant: [
            { name: '__slot:index', title: 'NO' },
            { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
            { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
            { name: 'TS_PARAM', title: 'STATUS' },
            { name: '__slot:ACTION', title: 'ACTION' },
          ],
          insufficient: [
            { name: '__slot:index', title: 'NO' },
            { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
            { name: 'CONSULTANT_NRIC', title: 'NRIC' },
            { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
            { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
            { name: 'CONSULTANT_PHONENO', title: 'PHONE NO' },
            { name: 'CONSULTANT_TYPE', title: 'TYPE' },
            { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
            { name: 'TOTAL_CPD_POINT', title: 'CPD POINTS' },
            { name: 'TS_PARAM', title: 'STATUS' },
            { name: '__slot:ACTION', title: 'ACTION' },
          ],
        },

        search: {
          consultant: '',
          insufficient: '',
        },
        // filter: {
        //   distributor: null,
        //   consultant: null,
        // },

        consultantsAPI: [],
        insufficientAPI: [],

        fileRecords: [],
        fileRecordsForUpload: [],


        currentPage: 1,
        perPage: '10',

        model: {
          BULK_UPLOAD: '',
          INSUFFICIENT_CONSULTANT_ID: [],

          CONSULTANT_ID:[],



        },
        // fields: ,

        tabSchema2: {
          groups: [
            {
              styleClasses: 'row',
              fields: [
                {
                  labels: 'Bulk Upload',
                  text: 'Choose a File',
                  model: 'BULK_UPLOAD',
                  type: 'vfg-custom-multiple-file',
                  styleClasses: 'col-md-12',
                },
              ],
            },
          ],
        },
      };
    },

    computed: {
      filteredConsultant() {
        const search = this.search.consultant.toLowerCase();
        if (this.search) {
          return this.consultantsAPI.filter(el => {
            return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
          });
        }

        return this.consultantsAPI;
      },
      filteredInsufficient() {
        const search = this.search.insufficient.toLowerCase();
        if (this.search) {
          return this.insufficientAPI.filter(el => {
            return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
          });
        }

        return this.insufficientAPI;
      },
    },
    methods: {
      async viewListPage(props) {
        localStorage.setItem(
          "RENEWAL_STATUS",
          props.rowData.TS_ID
        );

        if(props.rowData.TS_ID==1){
          this.$router.push(
            "/distributor/consultant-renewal-Admin-list"
          );
        }
        else{
          this.$router.push(
            "/distributor/consultant-renewal-Admin-list-status"
          );
        }
      },

      async getSubmittedRenewalList() {
        this.$router.push('/distributor/consultant-renewal-Admin-list')
      },

      handleClick(newTab) {
        this.currentTab = newTab;
      },
      viewCurrentConsultant(props) {
        this.currentConsultant = props.rowData;
      },
      back(){
        this.$router.push('/distributor/consultant-renewal-Admin')
      },

      // get distributor details
      getDistributorDetails: async function () {
        this.show_overlay = true;
        const user = localStorage.getItem('user')
        const response = await services05module1.getdistributordetails(JSON.parse(user).user_id)
        this.distributorData = response;

        await this.getRenewalConsultant(this.distributorData.DISTRIBUTOR_ID);

      },

      async uploadExcel() {
        const token = this.USER.access_token;
        this.uploadHeaders = { Authorization: "Bearer " + token };

        var response = await this.$refs.vueFileAgent.upload(
          "/api/module2/import_new_renewable?CREATE_BY=" +
          this.USERID,
          this.uploadHeaders,
          this.fileRecordsForUpload
        );

        const data=response[0].data.data;

        //
        // this.model.INSUFFICIENT_CONSULTANT_ID=[];
        // this.insufficientAPI=[];
        //
        if(this.isDraft){
          data.forEach((element)=>{
            this.model.INSUFFICIENT_CONSULTANT_ID.push(element.CONSULTANT_ID);
            this.insufficientAPI.push(element);
          })
        }
        else{
          this.model.INSUFFICIENT_CONSULTANT_ID=[];

          data.forEach((element)=>{
            this.model.INSUFFICIENT_CONSULTANT_ID.push(element.CONSULTANT_ID);
          })
          if (response[0].data.data) {
            this.insufficientAPI = response[0].data.data;
            // console.log(response[0].data.data);
            // this.model.INSUFFICIENT_CONSULTANT_ID=response[0].data.data;

          }
        }

        // if (response[0].data.data) {
        //   this.insufficientAPI = response[0].data.data;
        //   this.model.INSUFFICIENT_CONSULTANT_ID=response[0].data.data.CONSULTANT_ID;
        //   this.fileRecordsForUpload = [];
        // }
      },

      filesSelected: function (fileRecordsNewlySelected) {
        //  this.uploadFileObject = [];
        var validFileRecords = fileRecordsNewlySelected.filter(
          (fileRecord) => !fileRecord.error
        );
        this.fileRecordsForUpload =
          this.fileRecordsForUpload.concat(validFileRecords);
        this.uploadFileObject = this.fileRecordsForUpload[0].file;
      },



      onBeforeDelete: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUpload.splice(i, 1);
          var k = this.fileRecords.indexOf(fileRecord);
          if (k !== -1) this.fileRecords.splice(k, 1);
          this.uploadFileOject = [];
          for (i = 0; i < this.fileRecordsForUpload.length; i++) {
            this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
          }
          this.value = this.uploadFileOject;
        } else {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        }
      },

      async getRenewalConsultant() {
        this.show_overlay = true;
        const user = localStorage.getItem('user')
        const response = await services02module2.getAllRenewalForAdmin(JSON.parse(user).USER_DIST_ID);
        this.consultantsAPI = response;
        this.show_overlay = false;

      },

      async getDraftedRenewalConsultant(distId, SUBMISSION_DATE, TS_ID) {
        const response = await services02module2.getDraftedRenewalConsultant(distId, SUBMISSION_DATE, TS_ID);
        this.insufficientAPI = response;
        this.show_overlay = false;
      },

      async getInsufficientRecord(distId) {
        const response = await services02module2.getInsufficientRecord(distId);
        this.insufficientAPI = response;
        response.forEach((element)=>{
          this.model.INSUFFICIENT_CONSULTANT_ID.push(element.CONSULTANT_ID);
        })
        this.getDraftInsufficientList(distId);
      },

      async getDraftInsufficientList(distId, SUBMISSION_DATE, TS_ID) {
        const response = await services02module2.getDraftinsufficientList(distId, SUBMISSION_DATE, TS_ID);
        response.forEach((element)=>{
          this.insufficientAPI.push(element);
          this.model.INSUFFICIENT_CONSULTANT_ID.push(element.CONSULTANT_ID);
        })
        this.show_overlay = false;
      },

      setInsufficientCPDList(props) {
        const index = this.isConsultantAdded(this.insufficientAPI, props);

        if (index >= 0){
          alert('You cannot add same consultant Data twice.');
          return
        };
        this.insufficientAPI.push(props.rowData);
        this.model.INSUFFICIENT_CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
        this.consultantsAPI.splice(this.consultantsAPI.indexOf(props.rowData), 1);
        //this.consultantsAPI.splice(index, 1);
      },

      isConsultantAdded(array, props) {
        return array.findIndex(el => el.CONSULTANT_LICENSE_ID === props.rowData.CONSULTANT_LICENSE_ID);
      },

      removeInsufficientCPDLIST(props) {
        const index = this.isConsultantAdded(this.insufficientAPI, props);

        this.insufficientAPI.splice(index, 1);
        this.model.INSUFFICIENT_CONSULTANT_ID.splice(index, 1);
        this.consultantsAPI.push(props.rowData);
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

      saveRenewalandTerminationData: async function() {

        if (confirm("Are you sure you want to save as draft?")) {
          this.show_overlay = true;
          let data = new FormData();
          data.append("TS_ID", 1);
          data.append('PUBLISH_STATUS',0);
          // data.append("CONSULTANT_ID", JSON.stringify(this.model.CONSULTANT_ID));

          const user=JSON.parse(localStorage.getItem('user'));
          data.append('CREATE_BY',user.user_id);
          data.append('DIST_ID',user.USER_DIST_ID);
          data.append("RENEWAL_CONSULTANTS", JSON.stringify(this.consultantsAPI));
          data.append("INSUFFICIENT_CONSULTANTS", JSON.stringify(this.insufficientAPI));
          data.append("INSUFFICIENT_CONSULTANT_ID", JSON.stringify(this.model.INSUFFICIENT_CONSULTANT_ID));

          const response = await services02module2.postConsultantRenewal(data);
          this.getRenewalConsultant(this.distributorData.DISTRIBUTOR_ID);
          //this.$router.push('/distributor/consultant-renewal-Admin')
        }
      },

      submitRenewalandTerminationData: async function() {

        if (confirm("Are you sure you want to submit?")) {
          this.show_overlay = true;
          let data = new FormData();
          data.append("TS_ID", 15);
          data.append('PUBLISH_STATUS',1);

          const user=JSON.parse(localStorage.getItem('user'));
          data.append('CREATE_BY',user.user_id);
          data.append('DIST_ID',user.USER_DIST_ID);
          data.append("RENEWAL_CONSULTANTS", JSON.stringify(this.consultantsAPI));
          data.append("INSUFFICIENT_CONSULTANTS", JSON.stringify(this.insufficientAPI));
          data.append("INSUFFICIENT_CONSULTANT_ID", JSON.stringify(this.model.INSUFFICIENT_CONSULTANT_ID));

          const approvalLevel = await services06Module0.getApprovalLevelDistributor(39, 2);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //dashboard notification
          data.append("NOTI_LOCATION", "consultant-renewal-Reviewer");
          data.append(
            "NOTI_REMARK",
            "(CONSULTANT NON-RENEWAL) New entry pending for Approval"
          );

          const response = await services02module2.postConsultantRenewal(data);
          this.getRenewalConsultant(this.distributorData.DISTRIBUTOR_ID);

          //this.$router.push('/distributor/consultant-renewal-Admin')
        }
      },
    },
  };
</script>
<style scoped></style>
