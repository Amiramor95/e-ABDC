<template>
  <div v-if="!savedConsultantDataLoaded">
    <b-card>
      <div class="text-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
        <p>Loading Data</p>
      </div>
    </b-card>
  </div>

  <div class="" v-else>
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h4 style="margin-top:0">Consultant: Resignation</h4>
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

                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 25%">Name</td>
                          <td>{{ consultantData.CONSULTANT_NAME }}</td>
                        </tr>

                        <tr>
                          <td>Citizenship</td>
                          <td>{{ consultantData.CONSULTANT_CITIZEN_VALUE }}</td>
                        </tr>

                        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN' && consultantData.CONSULTANT_NRIC">
                          <td>New NRIC Number</td>
                          <td>{{ consultantData.CONSULTANT_NRIC }}</td>
                        </tr>

                        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN' && consultantData.CONSULTANT_NRIC_OLD">
                          <td>Old NRIC Number</td>
                          <td>{{ consultantData.CONSULTANT_NRIC_OLD }}</td>
                        </tr>

                        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN' && consultantData.CONSULTANT_PASSPORT_NO">
                          <td>Passport no</td>
                          <td>{{ consultantData.CONSULTANT_PASSPORT_NO }}</td>
                        </tr>

                        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN' && consultantData.CONSULTANT_PASSPORT_EXPIRY_NO">
                          <td>Passport Expiry Date</td>
                          <td>{{ date(consultantData.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
                        </tr>

                        <tr>
                          <td>Gender</td>
                          <td>{{ consultantData.CONSULTANT_GENDER_VALUE }}</td>
                        </tr>

                        <tr>
                          <td>Date of Birth</td>
                          <td>{{ date(consultantData.CONSULTANT_DOB) }}</td>
                        </tr>

                        <tr>
                          <td>Race</td>
                          <td>{{ consultantData.CONSULTANT_RACE_VALUE }}
                            <span v-if="consultantData.CONSULTANT_RACE_VALUE=='OTHERS'"> - {{consultantData.CONSULTANT_OTHER_RACE}}</span>
                          </td>
                        </tr>

                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>{{ consultantData.CONSULTANT_MOBILE_NO }}</td>
                        </tr>

                        <tr>
                          <td>House Number</td>
                          <td>{{ consultantData.CONSULTANT_HOUSE_NO }}</td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>{{ consultantData.CONSULTANT_EMAIL }}</td>
                        </tr>

                        <tr>
                          <td>Consultant Status</td>
                          <td>{{ consultantData.CONSULTANT_STATUS }}</td>
                        </tr>

                        <!-- Correspondent Address -->
                        <tr>
                          <td colspan="4" style="font-weight:bold;">
                            Correspondent Address
                          </td>
                        </tr>

                        <tr>
                          <td>Country</td>
                          <td>
                            {{consultantData.CORRESPONDENT_COUNTRY}}
                          </td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>
                            {{consultantData.CORRESPONDENT_STATE}}
                          </td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>
                            {{consultantData.CORRESPONDENT_CITY}}
                          </td>
                        </tr>
                        <tr>
                          <td>Postcode</td>
                          <td>
                            {{ consultantData.CORRESPONDENT_POSTAL }}
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>
                            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR1 }}
                          </td>
                        </tr>
                        <tr v-if="consultantData.CONSULTANT_CORRESPONDENT_ADDR2">
                          <td>Address 2</td>
                          <td>
                            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR2 }}
                          </td>
                        </tr>
                        <tr v-if="consultantData.CONSULTANT_CORRESPONDENT_ADDR3">
                          <td>Address 3</td>
                          <td>
                            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR3 }}
                          </td>
                        </tr>

                        <!-- Permanent Address -->
                        <tr>
                          <td colspan="4" style="font-weight:bold;">
                            Permanent Address
                          </td>
                        </tr>

                        <tr>
                          <td>Country</td>
                          <td>
                            {{consultantData.PERMANENT_COUNTRY}}
                          </td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>
                            {{consultantData.PERMANENT_STATE}}
                          </td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>
                            {{consultantData.PERMANENT_CITY}}
                          </td>
                        </tr>
                        <tr>
                          <td>Postcode</td>
                          <td>
                            {{ consultantData.PERMANENT_POSTAL }}
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>
                            {{ consultantData.CONSULTANT_PERMANENT_ADDR1 }}
                          </td>
                        </tr>
                        <tr v-if="consultantData.CONSULTANT_PERMANENT_ADDR2 ">
                          <td>Address 2</td>
                          <td>
                            {{ consultantData.CONSULTANT_PERMANENT_ADDR2 }}
                          </td>
                        </tr>
                        <tr v-if="consultantData.CONSULTANT_PERMANENT_ADDR3">
                          <td>Address 3</td>
                          <td>
                            {{ consultantData.CONSULTANT_PERMANENT_ADDR3 }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-if="currentTab === 'tab2'">
                  <div class="ml-4">
                    <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 15%">Agent Type</td>
                            <td>{{ consultantData.CANDIDATE_CATEGORY }}</td>
                          </tr>
                          <tr v-if="consultantData.CANDIDATE_CATEGORY == 'STAFF'">
                            <td style="width: 15%">Position</td>
                            <td>
                              {{ consultantData.CANDIDATE_POSITION_CATEGORY }}
                              <span v-if="consultantData.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ consultantData.CANDIDATE_POSITION}}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!-- Selected License -->
                      <div class="selected-license-types">
                        <h5 class="">Applied Licenses:</h5>

                        <table class="table">
                          <thead>
                            <tr>
                              <!-- <th scope="col">#</th> -->
                              <th scope="col">License Type</th>
                              <th scope="col">Distributor</th>
                              <th scope="col">Distribution Point</th>
                              <th scope="col">Application Type</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr v-for="consultant_license in consultantLicenses" :key="consultant_license.CONSULTANT_TYPE_ID">
                              <!-- <th scope="row">1</th> -->
                              <td>{{consultant_license.TYPE_FULL_NAME}} ({{consultant_license.TYPE_NAME}})</td>
                              <td>{{consultant_license.DIST_NAME}}</td>
                              <td>
                                <span v-if="consultant_license.DIST_POINT_NAME">{{consultant_license.DIST_POINT_NAME}}</span>
                                <span v-else class="text-center">-</span>
                              </td>
                              <td>{{consultant_license.APPLICATION_TYPE_NAME}}</td>
                              <td>{{consultant_license.LICENSE_STATUS}}</td>
                              <!-- CONSULTANT_STATUS==295 (Active Licenses) -->
                              <td v-if="consultant_license.CONSULTANT_STATUS==295"> 
                                <b-button variant="primary" @click="resignFromLicense(consultant_license)">Resign</b-button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </va-card>

          <br />

          <va-card v-if="showResignForm">
            <h4 style="margin-top:0">Resignation Request And Justification</h4>
            <br />

            <!-- Draft(1) / Rejected by Admin(5) -->
            <div v-if="model.TS_ID==1 || model.TS_ID=='' || model.TS_ID==null || model.TS_ID==5 || model.TS_ID==8">
              <vue-form-generator
                :model="model"
                :schema="tabSchema2"
                :options="formOptions"
                ref="resignationForm"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>
            </div>

            <div v-else>
              <vue-form-generator
                :model="model"
                :schema="tabSchema3"
                :options="formOptions"
                ref="resignationForm2"
              >
              </vue-form-generator>
            </div>
            <br />
            <br />

            <!-- Draft(1) / Rejected by Admin(5) -->
            <div class="float-right" v-if="model.TS_ID==1 || model.TS_ID=='' || model.TS_ID==null || model.TS_ID==5 || model.TS_ID==8">
              <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                <i class="fa fa-edit" /> &nbsp;Save as Draft
              </button>
              <button
                @click="submitResignationRequest"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> Submit
              </button>
            </div>
          </va-card>

          <va-card class="mt-4" v-if="showResignForm">
            <div class="ml-2">
              Approval Log

              <button
                v-if="visibleLog"
                v-b-toggle.resignation-approval-log-consultant
                type="button"
                class="float-right btn-fill btn-md"
              >
                <i class="fa fa-eye-slash"></i>
              </button>

              <button
                v-else
                v-b-toggle.resignation-approval-log-consultant
                type="button"
                class="float-right btn-fill btn-md"
              >
                <i class="fa fa-eye"></i>
              </button>

              <hr />

              <b-collapse id="resignation-approval-log-consultant" class="mt-2" v-model="visibleLog">
                <div class="row">
                  <div class="flex md2 offset--md10">
                    <va-input
                      :placeholder="$t('Search')"
                      v-model="search.log"
                      removable
                    >
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>
                <va-data-table
                  :fields="fields.log"
                  :data="resignationlogAPI"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="resignationlogAPI.length"
                  :dataperpage="parseInt(perPage)"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="APPR_REMARK" slot-scope="props">
                    <span
                      v-b-tooltip.hover
                      v-on:click="readMore(props.rowData)"
                      title="Read more"
                      class="mr-2"
                    >
                      <i class="fa fa-window-restore"></i>
                    </span>
                  </template>

                </va-data-table>
              </b-collapse>
            </div>
          </va-card>
        </div>
      </div>
    </b-overlay>

    <b-modal v-model="showApprovalStatusModal" centered title="">
      <div class="d-block text-center">
          <h5>Sorry, You cannot resign from License until your registration is approved!</h5>
      </div>

      <template #modal-footer>
        <b-button variant="primary" @click="showApprovalStatusModal = false">OK</b-button>
      </template>
    </b-modal>

    <vudal name="readMoreModal" class="widthModal">
      <div class="header">
        Remark<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <b-textarea rows="5" v-model="read_remark" disabled></b-textarea>
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
  </div>
</template>
<script>
import Vue from 'vue';
import Vudal from "vudal";
import pdf from 'vue-pdf';
import 'vue-form-generator/dist/vfg.css';
import Tabs from 'vue-tabs-with-active-line';
import VueFormGenerator from 'vue-form-generator';
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import moment from 'moment';
// Data display
import ProfileView from "../components/applicant_profile/profile";
import * as servicesModule1 from '../../../app/module1/services05'
import * as services06Module0 from '../../../app/module0/services06'
import * as services02module2 from '../../../app/module2/services02'
import * as services04module2 from '../../../app/module2/services04'

const Resignation = RepositoryFactory.get('resignation');

Vue.use(VueFormGenerator);

export default {
  created() {
    const data = JSON.parse(localStorage.getItem('user'))
    this.currentConsultant = data.consultant

    this.findConsultantByUserId(this.currentConsultant.USER_ID)
  },

  mounted() {
    this.getFPModules();

    // const data = JSON.parse(localStorage.getItem("user"));
    // const user_id=JSON.parse(localStorage.getItem("user_id"));
    // this.user_id=user_id;
    // this.currentConsultant = data.consultant;
    // this.getResignationData(data.consultant.CONSULTANT_ID);
  },

  components: {
    pdf,
    Tabs,
    ProfileView,
    Vudal
  },

  data() {
    return {
      tabs: [
        {
          title: "Applicant Profile",
          value: "tab1"
        },
        {
          title: "Resign License",
          value: "tab2"
        },
        // {
        //   title: "Examination",
        //   value: "tab3"
        // },
        // {
        //   title: "Uploaded Document",
        //   value: "tab4"
        // }
      ],

      currentTab: 'tab1',
      currentConsultant:null,
      user_id:null,
      savedConsultantDataLoaded: false,
      consultantData: '',
      consultantLicenses: [],
      resignedLicenseData: '',
      consultantApprovalData: '',
      showApprovalStatusModal: false,
      showResignForm: false,
      show_overlay: false,
      resignationlogAPI: [],
      visibleLog: false,
      read_remark: '',

      pdfsrc: null,

      search: '',
      currentPage: 1,
      perPage: '10',

      model: {
        RESIGNATION_ID: '',
        USER_ID: '',
        CONSULTANT_ID: '',
        RESIGNATION_DATE: '',
        RESIGNATION_REMARK: '',
        TS_ID: '',
        RESIGNATION_DOCUMENT: [],
      },

      fields: {
        log: [
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "DATE",
            title: "Date",
            sortField: "CREATE_TIMESTAMP",
          },
          {
            name: "GROUP_NAME",
            title: "Group",
            sortField: "GROUP_NAME",
          },
          {
            name: "DIST_NAME",
            title: "Creation By",
            sortField: "USER_NAME",
          },
          {
            name: "TS_PARAM",
            title: "Activity",
            sortField: "TS_PARAM",
          },
          {
            name: "__slot:APPR_REMARK",
            title: "Remarks/Comments",
            sortField: "APPR_REMARK",
          },
          {
            name: "CREATE_TIMESTAMP",
            title: "Latest Update",
            sortField: "LATEST_UPDATE",
          },
        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: "vfg-functional-date2",
                inputType: 'date',
                labels: "Effective Date",
                noLabel: true,
                placeholder: "Enter Effective Date",
                model: "RESIGNATION_DATE",
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: 'date',
                //validator: ["required", this.validateStartDate]
              },
              {
                type: 'textArea',
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'RESIGNATION_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                required: true,
                styleClasses: 'col-md-12',
              },
              {
                labels: 'Resignation Document',
                text: 'Choose file(s)',
                model: 'RESIGNATION_DOCUMENT',
                validator: 'required',
                type: 'vfg-resignation-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
                multiple: true,
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
                type: "vfg-functional-date2",
                inputType: 'date',
                labels: "Effective Date",
                noLabel: true,
                placeholder: "Enter Effective Date",
                model: "RESIGNATION_DATE",
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: 'date',
                 disabled: true,
                //validator: ["required", this.validateStartDate]
              },
              {
                type: 'textArea',
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'RESIGNATION_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                required: true,
                styleClasses: 'col-md-12',
                disabled: true,
              },
              {
                theme: 'list',
                labels: 'Resignation Document',
                text: 'Choose file(s)',
                model: 'RESIGNATION_DOCUMENT',
                validator: 'required',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: true,
                multiple: true,
                disabled: true,
              },
            ],
          },
        ],
      },


      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFILE_UPLOADED_DOCUMENTS',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },

  methods: {
    prevTab() {
      this.$router.go(-1);
    },
    async getFPModules(){
      try {
        const fpCategories = await services02module2.getFpCategory();
        const data={
          label: 'FPM MODULES',
          options:[
            ...fpCategories
          ]
        }
        this.options.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    findConsultantByUserId (userId) {
      services02module2.findConsultantByUserId(userId).then((response) => {
        this.consultantData = response;
        this.getConsultantLicenses(this.consultantData.USER_ID);
        this.getConsultantLatestApprovalData();
        this.savedConsultantDataLoaded = true;
      })
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    date: function (date) {
        return moment(date).format("DD-MMM-yyyy");
    },

    async readMore(data) {
      this.$modals.readMoreModal.$show();
      this.read_remark = data.APPR_REMARK;
    },

    async getConsultantLicenses(userId) {
      try {
        const res_distributor = await services02module2.getDistributorDetails(userId);
        this.consultantLicenses = res_distributor;
      } catch (error) {
        console.log(error);
      }
    },

    async getConsultantLatestApprovalData () {
      try {
        await services04module2.consultantLatestApprovalData(this.consultantData.CONSULTANT_ID)
          .then((response) => {
            this.consultantApprovalData = response
          })
      } catch (error) {
        console.log(error)
      }
    },

    resetResignLicenseData(){
        this.resignedLicenseData = '';
        this.model.RESIGNATION_ID = '';
        this.model.USER_ID = '';
        this.model.CONSULTANT_ID = '';
        this.model.RESIGNATION_DATE = '';
        this.model.RESIGNATION_REMARK = '';
        this.model.TS_ID = '';
        this.model.RESIGNATION_DOCUMENT = [];
        this.resignationlogAPI = [];
    },

    resignFromLicense(license){
      if (this.consultantApprovalData.TS_ID===3) {
        if (confirm("Are you sure to resign from this License?")) {
          this.resetResignLicenseData();
          this.resignedLicenseData = license;
          this.showResignForm = true;
          this.getResignationData(this.resignedLicenseData.CONSULTANT_LICENSE_ID);
        }
      } else {
        this.showApprovalStatusModal = true
      }
    },

    getResignationData: async function(license_id) {
      const response = await Resignation.getResignation(license_id);
      if(response){
        this.model.RESIGNATION_ID=response.RESIGNATION_ID;
        if(this.model.RESIGNATION_ID){
          this.getResignationDocument();
        }

        this.model.USER_ID=response.USER_ID;
        this.model.CONSULTANT_ID=response.CONSULTANT_ID;
        this.model.RESIGNATION_DATE=response.RESIGNATION_DATE;
        this.model.RESIGNATION_REMARK=response.RESIGNATION_REMARK;
        this.model.TS_ID = response.TS_ID;

        this.getResignationApprovalLog();
      }
    },

    async getResignationApprovalLog() {
      const response = await services02module2.getResignationApprovalLog(this.model.CONSULTANT_ID, this.model.RESIGNATION_ID);
      this.resignationlogAPI = response;
    },

    getResignationDocument: async function() {
      const response = await Resignation.getResignationDocumentByID(
        this.model.RESIGNATION_ID
      );
      response.forEach(element => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        const data = {
          docID: element.RESIGNATION_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };
        this.model.RESIGNATION_DOCUMENT = [];
        this.model.RESIGNATION_DOCUMENT.push(data);
      });
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

    validateResignationForm() {
      console.log('inside validateResignationForm');
      return this.$refs['resignationForm'].validate();
    },

    saveAsDraft: async function(){
      // const validate = await this.validateResignationForm();
      // console.log(JSON.stringify(validate));
      if (confirm("Are you sure to Save as Draft?")) {
        this.show_overlay = true;
        const data = new FormData();
        data.append("TS_ID", 1); //Prefer admin_management DB -> TASK_STATUS for TS_ID
        data.append("CONSULTANT_LICENSE_ID", this.resignedLicenseData.CONSULTANT_LICENSE_ID);
        data.append("USER_ID", this.consultantData.USER_ID); // change from draft to pending
        data.append("CONSULTANT_ID", this.consultantData.CONSULTANT_ID);
        data.append("RESIGNATION_DATE", moment(this.model.RESIGNATION_DATE).format('YYYY-MM-DD'));
        data.append("RESIGNATION_REMARK", this.model.RESIGNATION_REMARK);
        if (this.model.RESIGNATION_DOCUMENT.length != 0) {
          for (let i = 0; i < this.model.RESIGNATION_DOCUMENT.length; i++) {
            data.append("RESIGNATION_DOCUMENT[]", this.model.RESIGNATION_DOCUMENT[i]);
          }
        }
        const response = await Resignation.postResignation(data);
        if(response){
          this.getResignationData(this.resignedLicenseData.CONSULTANT_LICENSE_ID);
          this.show_overlay = false;
        }
      }
    },

    submitResignationRequest: async function() {
      // console.log('inside submitResignationRequest');
      // const validate = await this.validateResignationForm();

      if (confirm("Are you sure to Submit?")) {
        this.show_overlay = true;
        const data = new FormData();
        data.append("TS_ID", 15); //Prefer admin_management DB -> TASK_STATUS for TS_ID
        data.append("CONSULTANT_LICENSE_ID", this.resignedLicenseData.CONSULTANT_LICENSE_ID);
        data.append("USER_ID", this.consultantData.USER_ID); // change from draft to pending
        data.append("CONSULTANT_ID", this.consultantData.CONSULTANT_ID);
        data.append("RESIGNATION_DATE", moment(this.model.RESIGNATION_DATE).format('YYYY-MM-DD'));
        data.append("RESIGNATION_REMARK", this.model.RESIGNATION_REMARK);
        if (this.model.RESIGNATION_DOCUMENT.length != 0) {
          for (let i = 0; i < this.model.RESIGNATION_DOCUMENT.length; i++) {
            data.append("RESIGNATION_DOCUMENT[]", this.model.RESIGNATION_DOCUMENT[i]);
          }
        }

        // const approvalLevel = await Resignation.getApprovalLevelDistributor(6, 1);

        // data.append("APPR_LIST", JSON.stringify(approvalLevel));

        //dashboard notification
        data.append("APPR_GROUP_ID_ADMIN", "3");  //Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
        data.append("NOTI_LOCATION", "consultant-resignation-review-Reviewer");
        data.append(
          "NOTI_REMARK", "(CONSULTANT-RESIGNATION) New entry pending for Approval"
        );

        const response = await Resignation.postResignation(data);
        if(response){
          this.getResignationData(this.resignedLicenseData.CONSULTANT_LICENSE_ID);
          this.show_overlay = false;
        }
      }


      // if (validate) {
      //   let data = {
      //     RESIGNATION_ID: '',
      //     USER_ID: '',
      //     CONSULTANT_ID: '',
      //     RESIGNATION_DATE: this.model.RESIGNATION_DATE,
      //     RESIGNATION_REMARK: this.model.RESIGNATION_REMARK,
      //     RESIGNATION_DOCUMENT: this.model.RESIGNATION_DOCUMENT,
      //   };
      //
      //   // const response = await Resignation.postResignation(data);
      //
      //   console.log(response);
      // }
    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''));
        this.model.document = newVal.replace('C:\\fakepath\\', '');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label-td {
  width: 30%;
}
#consultant-profile input,
#type-of-applicant input {
  width: 70%;
  border: none;
  background: transparent;
}
.default-tabs {
  position: relative;
  margin: 0 auto;
  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: black;
    }
    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }
    &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>
