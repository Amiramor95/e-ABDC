<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!currentConsultant">
              <va-card>
                <h4 style="margin-top:0px; margin-bottom:20px">
                  Consultant Non-Renewal List
                </h4>
                <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input v-model="search" type="text" class="form-control" placeholder="Search" />
                  </div>
                </div>

                <!-- CONSULTANT TABLE -->
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
                    <b-form-checkbox v-if="props.rowData.FIMM_APPROVAL_STATUS==1"
                      v-model="props.rowData.STATUS"
                      @change="setCurrentConsultant(props)"
                      :checked="true"
                      :disabled="true"
                    >
                    </b-form-checkbox>

                    <b-form-checkbox v-else
                      v-model="props.rowData.STATUS"
                      @change="setCurrentConsultant(props)"
                    />
                  </template>

                  <template slot="index" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="ACTION" slot-scope="props">
                    <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                      <span class="badge badge-primary mr-1">
                        <i class="fa fa-eye"></i>
                      </span>
                    </h4>
                  </template>
                </va-data-table>
                <br />
                <br />

                <vue-form-generator
                  v-if="this.MANAGER_STATUS==1 || this.MANAGER_STATUS==15"
                  :model="model"
                  :schema="tabSchema2"
                  :options="formOptions"
                  ref="tabForm2"
                  @model-updated="onModelUpdated"
                  @validated="onValidated"
                >
                </vue-form-generator>

                <br />
                <div class="float-left">
                  <button
                    @click="previous"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right" v-if="this.MANAGER_STATUS==1 || this.MANAGER_STATUS==15" >
                  <button @click="submitConsultantRenewal(1, 'Are you sure to save as Draft?')"
                    type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>
                  <button @click="submitConsultantRenewal(8, 'Are you sure to return?')"
                    type="button" class="ml-1 btn btn-warning btn-fill btn-md">
                    <i class="fa fa-undo" /> &nbsp;Return
                  </button>
                  <button
                    @click="submitConsultantRenewal(5, 'Are you sure to reject?')"
                    type="button"
                    class="ml-2 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-ban" /> &nbsp; Reject
                  </button>
                  <button
                    @click="submitConsultantRenewal(3, 'Are you sure to submit?')"
                    type="button"
                    class="ml-2 btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
                  <!-- <button
                    @click="saveConsultantRenewal"
                    type="button"
                    class="btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>
                  <button
                    @click="submitConsultantRenewal"
                    type="button"
                    class="ml-1 btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Submit
                  </button> -->
                </div>
              </va-card>
            </template>

            <template v-else>
              <va-card>
                <h4 style="margin-top:0">Consultant Details</h4>
                <br />
                <div>
                  <tabs
                    :tabs="tabs"
                    :currentTab="currentTab"
                    :wrapper-class="'default-tabs'"
                    :tab-class="'default-tabs__item'"
                    :tab-active-class="'default-tabs__item_active'"
                    :line-class="'default-tabs__active-line'"
                    @onClick="handleClick"
                  />
                  <div class="content">
                    <div v-if="currentTab === 'tab1'">
                      <div class="ml-4">
                        <br />
                        <profile-view :consultantData="currentConsultant"></profile-view>
                      </div>
                    </div>

                    <div v-if="currentTab === 'tab2'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                            <tbody>
                              <tr>
                                <td style="width: 15%">Agent Type</td>
                                <td>{{ currentConsultant.CANDIDATE_CATEGORY }}</td>
                              </tr>
                              <tr v-if="currentConsultant.CANDIDATE_CATEGORY == 'STAFF'">
                                <td style="width: 15%">Position</td>
                                <td>
                                  {{ currentConsultant.CANDIDATE_POSITION_CATEGORY }}
                                  <span v-if="currentConsultant.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ currentConsultant.CANDIDATE_POSITION}}</span>
                                </td>
                              </tr>
                              <tr>
                                <td>License Type</td>
                                <td>{{ currentConsultant.TYPE_NAME }} ({{ currentConsultant.TYPE_FULL_NAME }})</td>
                              </tr>
                              <tr>
                                <td>Distributor</td>
                                <td>{{ currentConsultant.DIST_NAME }}</td>
                              </tr>
                            </tbody>
                        </table>
                      </div>
                    </div>

                    <div v-if="currentTab === 'tab3'">
                      <div class="ml-4">
                        <br />
                        <div v-if="currentConsultant.license_exemption">
                            <exemption-data :consultantData="currentConsultant"></exemption-data>
                        </div>

                        <div v-else>
                          <table class="table table-striped">
                            <tbody>
                              <tr>
                                <td style="width: 15%">Examination Type</td>
                                <td>{{ currentConsultant.EXAMINATION_TYPE }}</td>
                              </tr>

                              <tr>
                                <td>Result</td>
                                <td>
                                  <!-- FAIL -->
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Certificate
                                </td>
                                <td>
                                  Not Available
                                  <!-- <a
                                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                    target="_blank"
                                  >
                                    View</a
                                  > -->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div v-if="currentTab === 'tab4'">
                      <div class="ml-3">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr style="width: 100%">
                              <vue-form-generator
                                :model="model"
                                :schema="fileUploadSchema"
                                :options="formOptions"
                                ref="fileUploadForm"
                              >
                              </vue-form-generator>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </va-card>
              <br />

              <va-card>
                <h4 style="margin-top:0">Consultant Non-Renewal Review Form</h4>
                <br />
                <div v-if="this.MANAGER_STATUS==1 || this.MANAGER_STATUS==15">
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="tabForm2"
                    @model-updated="onModelUpdated"
                    @validated="onValidated"
                  >
                  </vue-form-generator>
                </div>
                <div v-else>
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema3"
                    :options="formOptions"
                    ref="tabForm2"
                    @model-updated="onModelUpdated"
                    @validated="onValidated"
                  >
                  </vue-form-generator>
                </div>
                <br />
              </va-card>

              <va-card>
                <div class="float-left">
                  <button
                    @click="back"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>

                <div class="float-right" v-if="this.MANAGER_STATUS==1 || this.MANAGER_STATUS==15">
                  <button @click="submitConsultantRenewal(1, 'Are you sure to save as Draft?')"
                    type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>
                  <button @click="submitConsultantRenewal(8, 'Are you sure to return?')"
                    type="button" class="ml-1 btn btn-warning btn-fill btn-md">
                    <i class="fa fa-undo" /> &nbsp;Return
                  </button>
                  <button
                    @click="submitConsultantRenewal(5, 'Are you sure to reject?')"
                    type="button"
                    class="ml-2 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-ban" /> &nbsp; Reject
                  </button>
                  <button
                    @click="submitConsultantRenewal(3, 'Are you sure to submit?')"
                    type="button"
                    class="ml-2 btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
                </div>
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
import Tabs from 'vue-tabs-with-active-line';

// Consultant Profile Data display
import ProfileView from "@/modules/consultant-management/components/applicant_profile/profile";
import ExemptionData from "@/modules/consultant-management/components/applicant_profile/exemption_data";

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
  components: { Tabs, ProfileView, ExemptionData },

  data() {
    return {
      MANAGER_STATUS:'',
      SUBMISSION_DATE: '',
      draftedTerminationCount:0,
      tabs: [
        {
          title: 'Applicant Profile',
          value: 'tab1',
        },
        {
          title: 'Type of Consultant',
          value: 'tab2',
        },
        {
          title: 'Examination',
          value: 'tab3',
        },
        {
          title: 'Uploaded Document',
          value: 'tab4',
        },
      ],

      currentTab: 'tab1',
      show_overlay: false,
      selected: [],
      currentConsultant: null,
      currentDistributor: null,

      isBusy: true,

      formOptions: {
        validateAfterChanged: true,
      },

      fields: {
        consultant: [
          { name: '__slot:checkbox', title: 'checkbox' },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
      },
      // filter: {
      //   distributor: null,
      //   consultant: null,
      // },
      search: '',

      consultantsAPI: [],

      currentPage: 1,
      perPage: '10',

      model: {
        CONSULTANT_RENEWAL_ID:[],
        RENEWAL_REMARK: '',
        SUPPORTED_DOCUMENT: [],
        PROFILE_UPLOADED_DOCUMENTS: [],
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'RENEWAL_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
              {
                labels: 'SUPPORTED DOCUMENT',
                text: 'Choose a File',
                model: 'SUPPORTED_DOCUMENT',
                type: "vfg-custom-multiple-file",
                styleClasses: 'col-md-12',
                accept: ".PDF",
                multiple: true,
                required: false,
                hint: "Accepted format : (.pdf)"
              },
            ],
          },
        ],
      },

      tabSchema3: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'RENEWAL_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
                disabled: true,
              },
              {
                labels: 'SUPPORTED DOCUMENT',
                text: 'Choose a File',
                model: 'SUPPORTED_DOCUMENT',
                type: "vfg-custom-file-view",
                styleClasses: 'col-md-12',
                accept: ".PDF",
                multiple: true,
                required: false,
                hint: "Accepted format : (.pdf)",
                disabled: true,
              },
            ],
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "PROFILE_UPLOADED_DOCUMENTS",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
    };
  },
  async mounted() {
    const DIST_INFO = JSON.parse(localStorage.getItem('user'));
    this.currentDistributor = DIST_INFO;

    this.MANAGER_STATUS = JSON.parse(localStorage.getItem('MANAGER_TS_ID'));
    this.SUBMISSION_DATE = localStorage.getItem('SUBMISSION_DATE');
    var draftRenewalReviewer=JSON.parse(localStorage.getItem('draftRenewalReviewer'));
    this.isDraft=JSON.parse(localStorage.getItem('isDraft'));
    // if(this.isDraft){
    //   await this.getDraftRenewalReviewer(draftRenewalReviewer.SUBMISSION_DATE,draftRenewalReviewer.TS_ID);
    //
    //   await this.getDraftedRenewalConsultant(draftRenewalReviewer.SUBMISSION_DATE,draftRenewalReviewer.TS_ID);
    //   await this.getDraftinsufficientList(draftRenewalReviewer.SUBMISSION_DATE,draftRenewalReviewer.TS_ID);
    // }
    // else{
    //   await this.getConsultantRecord();
    // }

    await this.getConsultantRecord(DIST_INFO.USER_DIST_ID, this.MANAGER_STATUS, this.SUBMISSION_DATE);

  },
  computed: {
    // consultants() {
    //   if (this.consultantsAPI) return this.consultantsAPI;
    //   return [];
    // },

    consultantFields() {
      if (this.MANAGER_STATUS==1 || this.MANAGER_STATUS==15) {
        return [
          {
            name: '__slot:checkbox',
            title: 'SELECTED',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
          { name: 'TYPE_NAME', title: 'CONSULTANT TYPE' },
          { name: 'CPD_POINT', title: 'CPD POINT' },
          { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }
      return [
        { name: '__slot:index', title: 'NO' },
        { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
        { name: 'CONSULTANT_NRIC', title: 'NRIC' },
        { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
        { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
        { name: 'TYPE_NAME', title: 'CONSULTANT TYPE' },
        { name: 'APPLICATION_TYPE', title: 'APPLICATION TYPE' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ]
    },


    filteredConsultant() {
      const search = this.search.toLowerCase();
      if (this.search) {
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
    previous(){
      this.$router.push('/distributor/consultant-renewal-Manager');
    },

    back(){
      this.currentConsultant = null;
      //this.model.CONSULTANT_RENEWAL_ID=[];
      this.model.RENEWAL_REMARK= '';
      this.model.SUPPORTED_DOCUMENT=[];
      this.model.PROFILE_UPLOADED_DOCUMENTS = [];
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    async getDraftRenewalReviewer(SUBMISSION_DATE,TS_ID) {
      console.log('inside get consultant record',SUBMISSION_DATE,TS_ID);
      const response = await services02module2.getDraftedRenewalReviewerConsultant(SUBMISSION_DATE,TS_ID);
      this.consultantsAPI = response;
      this.isBusy = false;
      console.log(this.consultantsAPI);
    },

    async getConsultantRecord(distId, status, submissionDate) {
        this.show_overlay = true;
        const response = await services02module2.getRenewalConsultantManager(distId, JSON.stringify([status]), submissionDate);
        this.consultantsAPI = response;
        response.forEach(element => {
          if(status!=15){
            this.model.CONSULTANT_RENEWAL_ID.push(element.CONSULTANT_RENEWAL_ID);
            if(element.FIMM_REMARK !=null || element.FIMM_REMARK != ''){
              this.model.RENEWAL_REMARK = element.FIMM_REMARK;
            }
          }
        });
        this.show_overlay = false;
    },

    // async getAllTermination() {
    //   const termination = await Termination.getAllTermination();
    //   console.log('this is termination', termination.data.data);
    // },

    async viewCurrentConsultant(props) {
      this.model.CONSULTANT_RENEWAL_ID = [];
      this.currentConsultant = props.rowData;
      this.model.CONSULTANT_RENEWAL_ID.push(props.rowData.CONSULTANT_RENEWAL_ID);
      if(props.rowData.APPROVAL_DOCS){
        props.rowData.APPROVAL_DOCS.forEach(el => {
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, el.DOC_MIMETYPE);

          el.DOC_BLOB = new File(
            [el.DOC_BLOB],
            //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
            el.DOC_ORIGINAL_NAME,
            {
              type: el.DOC_BLOB.type
            }
          );

          const data = {
            docID: el.CA_DOCUMENT_ID,
            name: el.DOC_ORIGINAL_NAME + ' - By ' + el.CREATE_BY + '.' + el.DOC_FILETYPE,
            size: el.DOC_FILESIZE,
            type: el.DOC_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(el.DOC_BLOB)
          };

          this.model.SUPPORTED_DOCUMENT.push(data);
        });
      }
      if(props.rowData.CONSULT_ID){
        await this.getDocumentByID(props.rowData.CONSULT_ID, 'CONSULTANT_OTHER_DOCUMENTS');
      }
    },

    setCurrentConsultant(props) {
        const index = this.model.CONSULTANT_RENEWAL_ID.findIndex(
          el => el === props.rowData.CONSULTANT_RENEWAL_ID,
        );

        if (index >= 0) {
          this.model.CONSULTANT_RENEWAL_ID.splice(index, 1);
        } else {
          this.model.CONSULTANT_RENEWAL_ID.push(props.rowData.CONSULTANT_RENEWAL_ID);
        }

    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema === 'TERMINATION_TYPE') {
        // this.visible.TERMINATION_TYPE = newVal.value;
      }
    },

    onValidated(isValid, errors) {
      console.log('Validation result: ', isValid, ', Errors:', errors[0].error);
    },

    getDocumentByID: async function(consultId, other_documents) {
      const response = await services02module2.getConsultantDocuments(consultId, other_documents);
      if(response){
        response.forEach(el => {
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

          el.DOC_BLOB = new File(
            [el.DOC_BLOB],
            //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
            el.DOC_ORIGINAL_NAME,
            {
              type: el.DOC_BLOB.type
            }
          );

          const data = {
            docID: el.CA_DOCUMENT_ID,
            name: el.DOC_ORIGINAL_NAME,
            size: el.DOC_FILESIZE,
            type: el.DOC_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(el.DOC_BLOB)
          };

          this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
        });
      }
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      //console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },

    submitConsultantRenewal: async function(status, confirm_text) {
      if(this.model.CONSULTANT_RENEWAL_ID.length>0){
        if (confirm(confirm_text)) {
          this.show_overlay = true;
          let data = new FormData();
          data.append("TS_ID", status);
          data.append('REMARK', this.model.RENEWAL_REMARK);
          const user = JSON.parse(localStorage.getItem('user'));
          data.append('CREATE_BY', user.user_id);
          data.append('DIST_ID',user.USER_DIST_ID);
          data.append("CONSULTANT_RENEWAL_ID", JSON.stringify(this.model.CONSULTANT_RENEWAL_ID));

          //Supported documents
          if (this.model.SUPPORTED_DOCUMENT.length != 0) {
            for (let i = 0; i < this.model.SUPPORTED_DOCUMENT.length; i++) {
              data.append("SUPPORTED_DOCUMENT[]", this.model.SUPPORTED_DOCUMENT[i]);
            }
          }

          //Adding Publish Status
          if(status==1){ // Draft
            data.append('PUBLISH_STATUS', 0);
          }else{
            data.append('PUBLISH_STATUS', 1);
          }

          //Getting Notification Group ID
          if(status==3){ //Approved
            const approvalLevel = await services06Module0.getApprovalLevelDistributor(39, 3); // (processflowID, approval_level_index)
            data.append("APPR_LIST", JSON.stringify(approvalLevel));
          }else if(status==5 || status==8){
            const approvalLevel = await services06Module0.getApprovalLevelDistributor(39, 2);
            data.append("APPR_LIST", JSON.stringify(approvalLevel));
          }

          //Adding FIMM Status and Notification
          if(status==3){ //Approved
            data.append("NOTI_LOCATION", "consultant-renewal-Admin");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT NON-RENEWAL) has been approved by Manager"
            );
          }else if(status==5){ //Reject
            data.append("NOTI_LOCATION", "consultant-renewal-Reviewer");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT NON-RENEWAL) has been rejected by Manager "
            );
          }else if(status==8){ //Return
            data.append("NOTI_LOCATION", "consultant-renewal-Reviewer");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT NON-RENEWAL) Renewal has been returned by Manager"
            );
          }

          const response = await services02module2.postConsultantRenewalManager(data);
          this.show_overlay = false;
          this.$router.push('/distributor/consultant-renewal-Manager');
        }
      }else{
        alert('Please select consultants for action');
      }
    },
  },
};
</script>
<style scoped></style>
