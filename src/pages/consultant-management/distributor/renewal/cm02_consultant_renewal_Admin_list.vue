<template>
  <div class="">
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="row">
        <div class="col-12">
          <template v-if="!currentConsultant">
            <div>
              <va-card v-if="!viewMode">
                <h4 style="margin-top:0">List of Consultant</h4>

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
                    v-b-tooltip.hover
                    title="Add"
                    v-on:click="setInsufficientCPDList(props)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-plus"></i
                    ></span>
                    </h5>
                  </template>
                </va-data-table>
              </va-card>

              <br />
              <va-card>
                <h4 style="margin-top:0px; margin-bottom:20px">
                  Insufficient CPD Listing
                </h4>
                <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input
                      v-model="search.insufficient"
                      type="text"
                      class="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <!-- CONSULTANT TABLE -->
                <!-- select-mode="single" -->
                <va-data-table
                  :fields="fields.insufficient"
                  :data="filteredInsufficient"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="filteredInsufficient.length"
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
                    <h5 class="mt-1">

                       <span
                         v-if="viewMode"
                         v-b-tooltip.hover
                         title="View"
                         @click="viewCurrentConsultant(props)"
                         class="badge badge-primary mr-2"
                       >
                    <i class="fa fa-eye"></i
                    ></span>


                  <span
                    v-else
                    v-b-tooltip.hover
                    title="Remove"
                    v-on:click="removeInsufficientCPDLIST(props)"
                    class="badge badge-danger mr-2"
                  >
                    <i class="fa fa-minus"></i
                    ></span>
                    </h5>
                  </template>
                </va-data-table>
                <br />
                <br />


                <!-- start upload excel -->
                <form id="uploadParticipantForm" v-if="!viewMode">
                  <div class="ml-1 col-md-12">
                    <div id="app">
                      <p>Bulk Upload</p>
                      <VueFileAgent
                        ref="vueFileAgent"
                        :theme="'list'"
                        :multiple="false"
                        :deletable="true"
                        :meta="true"
                        :linkable="true"
                        :accept="'.xlsx'"
                        :maxSize="'2MB'"
                        :helpText="'Choose document'"
                        :errorText="{
                    type: 'Invalid file type. Only .xlsx is Allowed',
                    size: 'Files should not exceed 2MB in size',
                  }"
                        @select="filesSelected($event)"
                        @beforedelete="onBeforeDelete($event)"
                        v-model="fileRecords"
                      ></VueFileAgent>
                    </div>
                  </div>
                  <br />
                  <div class="float-left ml-3">
                    <button
                      @click="uploadExcel"
                      type="button"
                      class="ml-1 btn btn-success btn-fill btn-md"
                    >
                      <i class="fa fa-plus" /> &nbsp; Upload
                    </button>
                  </div>
                </form>
                <!-- end upload excel -->

                <br />

                <br />
                <div class="float-left ">
                  <button
                    @click="back"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div v-if="!viewMode" class="float-right">
                  <button
                    @click="saveRenewalandTerminationData"
                    type="button"
                    class="btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>
                  <button
                    @click="submitRenewalandTerminationData"
                    type="button"
                    class="ml-1 btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Submit
                  </button>
                </div>
                <!-- <div class="float-left">
                  <button
                    @click="currentDistributor = null"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div> -->
              </va-card>
            </div>
          </template>

          <template v-else>
            <va-card>
              <h4 style="margin-top:0">Consultant Details</h4>
              <br />
              <div class="ml-4">
                <br />
                <table id="consultant-profile" class="table table-striped">
                  <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                  </tr>
                  <tr>
                    <td>New NRIC</td>
                    <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>{{ currentConsultant.CONSULTANT_DOB }}</td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}</td>
                  </tr>
                  <tr>
                    <td>Postcode</td>
                    <td>{{ currentConsultant.POSTCODE }}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{{ currentConsultant.CITY }}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{{ currentConsultant.STATE }}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{{ currentConsultant.COUNTRY }}</td>
                  </tr>
                  <tr>
                    <td>Telephone Number</td>
                    <td>{{ currentConsultant.CONSULTANT_MOBILE_NO }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                  </tr>
                  <tr>
                    <td>Highest Qualification</td>
                    <td>{{ currentConsultant.CONSULTANT_HIGHEST_QUALIFICATION }}</td>
                  </tr>
                  <tr>
                    <td>Consultant Status</td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div class="float-left">
                <button
                  @click="currentConsultant=null"
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
    this.draftRenewal=JSON.parse(localStorage.getItem('draftRenewal'));
    this.isDraft=JSON.parse(localStorage.getItem('isDraft'));

    this.USER = JSON.parse(localStorage.getItem("user"));
    this.viewMode = JSON.parse(localStorage.getItem("viewMode"));
    this.USERID = this.USER.user_id;

    this.getDistributorDetails();
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
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
          { name: 'CONSULTANT_PHONENO', title: 'PHONE NO' },
          { name: 'CONSULTANT_TYPE', title: 'TYPE' },
          { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
          { name: 'TOTAL_CPD_POINT', title: 'CPD POINTS' },
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

      if(this.isDraft){
        await this.getRenewalConsultant(this.distributorData.DISTRIBUTOR_ID);

        // await this.getDraftedRenewalConsultant(this.distributorData.DISTRIBUTOR_ID, this.draftRenewal.SUBMISSION_DATE,this.draftRenewal.TS_ID);
        await this.getDraftInsufficientList(this.distributorData.DISTRIBUTOR_ID, this.draftRenewal.SUBMISSION_DATE, this.draftRenewal.TS_ID);
      }

      else{
        await this.getRenewalConsultant(this.distributorData.DISTRIBUTOR_ID);
      }
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

    async getRenewalConsultant(distId) {
      const response = await services02module2.getRenewalConsultant(distId);
      this.consultantsAPI = response;
      await this.getInsufficientRecord(distId);
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
