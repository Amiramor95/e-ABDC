<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template>
              <div v-if="!isReady" style="margin-top: 25%">
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle mr-2"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </div>

              <va-card v-else>
                <vudal name="simpleModal" class="widthModal">
                  <div class="header">
                    Remark<i class="close icon">&times;</i>
                  </div>
                  <div class="content">
                    <vue-form-generator
                      :model="model"
                      :schema="readMoreSchema"
                      :options="formOptions"
                    />
                  </div>
                  <div class="actions">
                    <button
                      type="button"
                      class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-times" /> &nbsp; Close
                    </button>
                  </div>
                </vudal>
                <template>
                  <h4 style="margin-top:0px; margin-bottom:20px">
                    List of Consultant Termination
                  </h4>
                </template>
                <p style="margin:0; font-size: 1.1rem">
                  DISTRIBUTOR NAME - {{ currentDistributor}}
                </p>
                <div style="display:flex; justify-content:flex-end; align-items:center">
                  <div class="flex md3 offset--md3">
                    <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>

                <!-- CONSULTANT TABLE -->
                <!-- select-mode="single" -->

                <div v-if="!isReady">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </div>

                <div v-if="APPROVAL_STATUS==1 || APPROVAL_STATUS==3 || APPROVAL_STATUS==5 || APPROVAL_STATUS==7">
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
                        v-model="props.rowData.STATUS"
                        @change="setCurrentConsultant(props)"
                        :checked="true"
                        :disabled="true"
                      >
                      </b-form-checkbox>
                    </template>

                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="TERMINATION_REMARK" slot-scope="props">
                      <span
                        v-if="props.rowData.TERMINATION_REMARK != '-'"
                        v-b-tooltip.hover
                        v-on:click="readMore(props.rowData)"
                        title="Read more"
                        class="badge mr-2"
                      >
                    <i class="fa fa-window-restore"></i
                    ></span>
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                          <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                            <i class="fa fa-edit" v-if="props.rowData.STATUS==1"></i>
                            <i class="fa fa-eye" v-else></i>
                          </span>
                      </h4>
                    </template>
                  </va-data-table>
                </div>

                <div v-else>
                  <va-data-table-extended
                    :fields="consultantFields"
                    :data="filteredConsultant"
                    no-data-label="No data found"
                    :per-page="parseInt(perPage)"
                    :datacount="filteredConsultant.length"
                    :dataperpage="parseInt(perPage)"
                    clickable
                    @checkboxToggledAllExtended="toggleCheckboxAll"
                    @checkboxToggledExtended="toggleCheckbox"
                    :track-by="'TERMINATION_ID'"
                  >
                    <template slot="checkbox" slot-scope="props">
                        <va-checkbox
                          @change="checkBox"
                          class="col-2"
                          v-model="props.rowData.STATUS"
                        />
                    </template>

                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="TERMINATION_REMARK" slot-scope="props">
                      <span
                        v-if="props.rowData.TERMINATION_REMARK != '-'"
                        v-b-tooltip.hover
                        v-on:click="readMore(props.rowData)"
                        title="Read more"
                        class="badge mr-2"
                      >
                    <i class="fa fa-window-restore"></i
                    ></span>
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                          <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                            <i class="fa fa-edit" v-if="props.rowData.STATUS==1"></i>
                            <i class="fa fa-eye" v-else></i>
                          </span>
                      </h4>
                    </template>
                  </va-data-table-extended>
                </div>
                <br />

                <template>
                  <vue-form-generator
                    :model="model"
                    v-if="APPROVAL_STATUS==1 || APPROVAL_STATUS==15"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="bulkForm"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>

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

                  <div class="float-right" v-if="APPROVAL_STATUS==1 || APPROVAL_STATUS==15" >
                    <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button @click="rejectTermination" type="button" class="ml-1 btn btn-danger btn-fill btn-md">
                      <i class="fa fa-times" /> &nbsp;Reject
                    </button>
                    <button @click="returnTermination" type="button" class="ml-1 btn btn-warning btn-fill btn-md">
                      <i class="fa fa-undo" /> &nbsp;Return
                    </button>
                    <button
                      @click="submitTerminationForm"
                      type="button"
                      class="ml-1 btn btn-success btn-fill btn-md"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Approve
                    </button>
                  </div>
                </template>

              </va-card>
            </template>
          </b-overlay>
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
    components: { Tabs,Vudal },
    async mounted() {
      const DIST_INFO=JSON.parse(localStorage.getItem('DIST_INFO'));

      this.APPROVAL_STATUS=localStorage.getItem('APPROVAL_STATUS');

      // this.isDraft=JSON.parse(localStorage.getItem('isDraft'));
      this.currentDistributor=DIST_INFO.DIST_NAME;

      var SUBMISSION_ID=localStorage.getItem('SUBMISSION_ID');
      this.model.TERMINATION_SUBMISSION_ID = SUBMISSION_ID;

      if(this.APPROVAL_STATUS==1){ // Drafted Data
        this.getDraftedData(DIST_INFO.DISTRIBUTOR_ID, SUBMISSION_ID);
      }else{
        await this.getConsultantRecord(DIST_INFO.DISTRIBUTOR_ID, SUBMISSION_ID);
      }

      //this.isReady=true;
    },


    data() {
      return {
        show_overlay: false,
        APPROVAL_STATUS: '',
        isReady: false,
        draftedTermination:"",
        draftedTerminationCount:0,

        currentConsultant: null,
        currentDistributor: null,

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
          showRemark: "",

          TERMINATION_ID: [],
          FIMM_REMARK: '',
          TERMINATION_DOCUMENT: [],
          CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
        },

        formOptions: {
          validateAfterChanged: true
        },

        readMoreSchema: {
          groups: [
            {
              styleClasses: "row",
              fields: [
                {
                  type: "textArea",
                  model: "showRemark",
                  rows: 5,
                  validator: "string",
                  styleClasses: "col-md-12",
                  disabled:true
                },
              ],
            },
          ],
        },

        tabSchema2: {
          groups: [
            {
              styleClasses: 'row',
              fields: [
                {
                  type: 'textArea',
                  rows: 10,
                  max: 1000,
                  label: 'Remarks / Comments',
                  hint: 'Max 1000 characters',
                  model: 'FIMM_REMARK',
                  placeholder: 'Enter Remarks or Comments',
                  styleClasses: 'col-md-12',
                },
                {
                  theme: 'list',
                  labels: "Upload Document",
                  accept: ".pdf",
                  multiple: true,
                  text: "Choose a File",
                  model: "TERMINATION_DOCUMENT",
                  type: "vfg-consultant-termination-file",
                  styleClasses: "col-md-12",
                  hint: "Accepted format : (.pdf)",
                  required: false
                }
              ],
            },
          ],
        },
      };
    },
    computed: {
      distributorFields() {
        if (this.isBulk) {
          return [
            { name: '__slot:index', title: 'NO' },
            // A column that needs custom formatting
            { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
            { name: '__slot:ACTION', title: 'ACTION' },
          ];
        }

        return [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DIST_MOBILE_NUMBER', title: 'PHONE NUMBER' },
          { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      },
      consultantFields() {
        if (this.APPROVAL_STATUS==1) {
          return [
            {
              name: '__slot:checkbox',
              title: 'DRAFTED',
            },
            { name: '__slot:index', title: 'NO' },
            { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
            { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
            { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
            { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
            { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
            { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
            { name: 'TERMINATION_DATE', title: 'TERMINATION DATE' },
            { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
            { name: 'TS_PARAM', title: 'STATUS' },
            { name: '__slot:ACTION', title: 'ACTION' },
          ];
        }else if(this.APPROVAL_STATUS==3 || this.APPROVAL_STATUS==5 || this.APPROVAL_STATUS==7){
            return[
              { name: '__slot:index', title: 'NO' },
              { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
              { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
              { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
              { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
              { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
              { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
              { name: 'TERMINATION_DATE', title: 'TERMINATION DATE' },
              { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
              { name: 'TS_PARAM', title: 'STATUS' },
              { name: '__slot:ACTION', title: 'ACTION' },
            ]
        }else{
          return [
            {
              name: '__checkbox', 
              titleClass: 'center aligned',
              dataClass: 'center aligned' 
            },
            { name: '__slot:index', title: 'NO' },
            { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
            { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
            { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
            { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
            { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
            { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
            { name: 'TERMINATION_DATE', title: 'TERMINATION DATE' },
            { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
            { name: 'TS_PARAM', title: 'STATUS' },
            { name: '__slot:ACTION', title: 'ACTION' },
          ]
        }
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
        const search = this.search.consultant.toLowerCase();
        if (this.search && this.consultantsAPI) {
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
      async readMore(data) {
        this.$modals.simpleModal.$show();
        this.model.showRemark = data.TERMINATION_REMARK;
      },

      async getDraftedData(DIST_ID, SUBMISSION_ID){
        const response=await services02module2.getDraftTerminationApprovalCEO(DIST_ID, SUBMISSION_ID);
        this.consultantsAPI = response;
        response.forEach(element => {
          this.model.FIMM_REMARK=element.FIMM_REMARK_CEO;
          this.model.TERMINATION_ID.push(element.TERMINATION_ID);
        });
        this.draftedTerminationCount=response.length;
        this.isReady = true;
        // const response=await services02module2.getDraftTerminationApproval(DIST_ID);
        //
        // response.forEach(element => {
        //   this.model.FIMM_REMARK=element.FIMM_REMARK;
        //   this.model.TERMINATION_ID.push(element.TERMINATION_ID);
        // });
        // this.draftedTerminationCount=response.length;
      },

      back() {
        this.$router.push('/fimm/consultant-termination-statusList-CEO')
      }, // back button

      handleClick(newTab) {
        this.currentTab = newTab;
      },

      async getConsultantRecord(distId, submissionId) {
        //if(this.APPROVAL_STATUS==1 || this.APPROVAL_STATUS==15){
        if(this.APPROVAL_STATUS==15){
          const response = await services02module2.getAllConsultantListFIMMStatus(distId, JSON.stringify([15]), submissionId);
          this.consultantsAPI = response;
          this.isReady = true;
        }
        else{
          const response = await services02module2.getAllConsultantListFIMMStatus(distId, JSON.stringify([this.APPROVAL_STATUS]), submissionId);
          this.consultantsAPI = response;
          this.isReady = true;
        }

      },

      async viewCurrentConsultant(props) {
        try {
          localStorage.setItem('isEditable',true);
          localStorage.setItem('currentConsultant',JSON.stringify(props.rowData));
          this.$router.push('/fimm/consultant-termination-details-CEO');
        } catch (error) {
          console.log(error);
        }
      },
      async setCurrentDistributor(props) {
        console.log(props);
        await this.getConsultantRecord(props.rowData.DISTRIBUTOR_ID);
        this.currentDistributor = props.rowData.DIST_NAME;
      },

      setCurrentConsultant(props) {
        if(this.draftedTerminationCount !=0){
          alert('You have already drafted termination!')
          this.$router.go();
        }
        else{
          const index = this.model.TERMINATION_ID.findIndex(
            el => el === props.rowData.TERMINATION_ID,
          );

          if (index >= 0) {
            this.model.TERMINATION_ID.splice(index, 1);
          } else {
            this.model.TERMINATION_ID.push(props.rowData.TERMINATION_ID);
          }
          console.log(this.model.TERMINATION_ID);
        }
      },

      toggleCheckboxAll(isChecked){
          const termination_id =  this.consultantsAPI.reduce((acc,element) => {
              return acc.concat(element.TERMINATION_ID)
          },[])
          
          this.model.TERMINATION_ID = isChecked ? termination_id : []
          //console.log(this.model.TERMINATION_ID)
      },

      toggleCheckbox(payload){
          const {fieldName,isChecked} = payload
          const consultId = fieldName.TERMINATION_ID

          if(!isChecked){
              const elIndex = this.model.TERMINATION_ID.findIndex(x => {
                return x === fieldName.TERMINATION_ID
              })
              if(elIndex > -1){
                this.model.TERMINATION_ID.splice(elIndex,1)
              }
          }else{
            this.model.TERMINATION_ID.push(fieldName.TERMINATION_ID)
          }
          //console.log(this.model.TERMINATION_ID)
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

      saveAsDraft: async function() {
        if(this.model.TERMINATION_ID.length>0){
          if (confirm("Are you sure you want to save as draft?")) {
            this.show_overlay = true;
            const data = new FormData();
            data.append("FIMM_STATUS", 1);
            data.append("TERMINATION_ID",JSON.stringify(this.model.TERMINATION_ID));
            data.append("FIMM_REMARK",this.model.FIMM_REMARK)
            data.append("CREATE_BY",this.model.CREATE_BY);

            const user = localStorage.getItem("user");
            data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
            data.append("APPR_PUBLISH_STATUS",0);
            for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
              data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
            }

            const response = await Termination.GMApprovalTermination(data);
            this.show_overlay = false;
            this.$router.push('/fimm/consultant-termination-statusList-CEO')
          }
        }else{
          alert('Please select consultants for action');
        }
      },

      rejectTermination: async function() {
        if(this.model.TERMINATION_ID.length>0){
          if (confirm("Are you sure to reject?")) {
            this.show_overlay = true;
            const data = new FormData();
            data.append("FIMM_STATUS", 5);
            data.append("LATEST_UPDATE_BY",this.model.CREATE_BY);
            data.append("TERMINATION_ID",JSON.stringify(this.model.TERMINATION_ID));
            data.append("FIMM_REMARK", this.model.FIMM_REMARK);
            data.append("CREATE_BY",this.model.CREATE_BY);

            const user = localStorage.getItem("user");
            data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
            var noted = "REJECTED BY " + JSON.parse(user).USER_GROUP_NAME;
            data.append("NOTE", noted);
            data.append("APPR_PUBLISH_STATUS",1);
            for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
              data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
            }

            const approvalLevel = await services06Module0.getApprovalLevel(9, 2); //Notify General Manager(GM) when reject
            data.append("APPR_LIST", JSON.stringify(approvalLevel));

            //dashboard notification
            data.append("NOTI_LOCATION", "consultant-termination-GM");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT-TERMINATION) Rejected By CEO"
            );

            const response = await services02module2.updateTerminateApprovalConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
            this.show_overlay = false;
            this.$router.push('/fimm/consultant-termination-statusList-CEO')
          }
        }else{
          alert('Please select consultants for action');
        }
      },

      returnTermination: async function() {
        if(this.model.TERMINATION_ID.length>0){
          if (confirm("Are you sure to return?")) {
            this.show_overlay = true;
            const data = new FormData();
            data.append("FIMM_STATUS", 7);
            data.append("LATEST_UPDATE_BY",this.model.CREATE_BY);
            data.append("TERMINATION_ID",this.model.TERMINATION_ID);
            data.append("FIMM_REMARK", this.model.FIMM_REMARK);
            data.append("CREATE_BY",this.model.CREATE_BY);


            const user = localStorage.getItem("user");
            data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
            var noted = "RETURNED BY " + JSON.parse(user).USER_GROUP_NAME;
            data.append("NOTE", noted);
            data.append("APPR_PUBLISH_STATUS",1);
            for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
              data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
            }

            const approvalLevel = await services06Module0.getApprovalLevel(9, 2); //Notify General Manager(GM) when return
            data.append("APPR_LIST", JSON.stringify(approvalLevel));

            //dashboard notification
            data.append("NOTI_LOCATION", "consultant-termination-GM");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT-TERMINATION) Returned By CEO"
            );

            const response = await services02module2.updateTerminateApprovalConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
            this.show_overlay = false;
            this.$router.push('/fimm/consultant-termination-statusList-CEO')
          }
        }else{
          alert('Please select consultants for action');
        }
      },

      submitTerminationForm: async function() {
        if(this.model.TERMINATION_ID.length>0){
          if (confirm("Are you sure to approve?")) {
            this.show_overlay = true;
            const data = new FormData();
            data.append("FIMM_STATUS", 3);
            data.append("LATEST_UPDATE_BY", this.model.CREATE_BY);
            data.append("TERMINATION_ID",this.model.TERMINATION_ID);
            data.append("FIMM_REMARK", this.model.FIMM_REMARK);
            data.append("CREATE_BY",this.model.CREATE_BY);

            const user = localStorage.getItem("user");
            data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
            var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
            data.append("NOTE", noted);

            data.append("APPR_PUBLISH_STATUS",1);
            for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
              data.append("TERMINATION_DOCUMENT[]", this.model.TERMINATION_DOCUMENT[i]);
            }

            const approvalLevel = await services06Module0.getApprovalLevel(9, 4);
            data.append("APPR_LIST", JSON.stringify(approvalLevel));

            //dashboard notification
            data.append("NOTI_LOCATION", "consultant-termination-RD");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT-TERMINATION) Approved By CEO"
            );

            const response = await services02module2.updateTerminateApprovalConsultant(data,JSON.stringify(this.model.TERMINATION_ID));
            this.show_overlay = false;
            this.$router.push('/fimm/consultant-termination-statusList-CEO')

          }
        }else{
          alert('Please select consultants for action');
        }
      },


    },
  };
</script>
<style scoped></style>
