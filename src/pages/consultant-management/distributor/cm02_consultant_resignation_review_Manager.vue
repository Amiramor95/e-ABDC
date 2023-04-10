<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!currentConsultant">
              <va-card>

                <div class="row">
                  <div class="col-8">
                    <h4 style="margin-top:0">List of Consultant Resignation Request</h4>
                  </div>
                  <div class="col-4 float-right">
                    <div class="float-right">
                      <h5>
                      <span
                        v-b-tooltip.hover
                        title="Change View List"
                        v-on:click="exchange"
                        class="badge badge-primary"
                      >
                        <i class="fa fa-exchange"></i
                        ></span>
                      </h5>
                    </div>
                  </div>

                </div>

                <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input v-model="search" type="text" class="form-control" placeholder="Search" />
                  </div>
                </div>
                <div class="  col-ml-2">
                  <va-data-table
                    :fields="fields.consultant"
                    :data="filteredConsultant"
                    no-data-label="No data found"
                    :per-page="parseInt(perPage)"
                    :datacount="filteredConsultant.length"
                    :dataperpage="parseInt(perPage)"
                    clickable
                  >
                    <template slot="checkbox" slot-scope="props">
                      <b-form-checkbox v-if="props.rowData.APPR_STATUS==14"
                        v-model="props.rowData.selected"
                        @change="setCurrentConsultant(props)"
                      >
                      </b-form-checkbox>

                      <b-form-checkbox v-else
                        :checked="true"
                        :disabled="true"
                      >
                      </b-form-checkbox>
                    </template>
                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                        <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2">
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                  </va-data-table>
                  <!-- <b-table
                    hover
                    selectable
                    no-select-on-click
                    ref="consultantTable"
                    :items="RESIGN_REQUEST"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    responsive="md"
                    @row-selected="onRowSelected"
                  >
                    <template #table-busy>
                      <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                      </div>
                    </template>
                    <template #head(checkbox)="scope">
                      <b-form-checkbox @change="setCurrentConsultantAll(scope)"> </b-form-checkbox>
                    </template>
                    <template #cell(checkbox)="data">
                      <b-form-checkbox
                        v-model="data.item.selected"
                        @change="setCurrentConsultant(data)"
                      >
                      </b-form-checkbox>
                    </template>
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell()="data">
                      <span class="description">{{ data.value }}</span>
                    </template>
                    <template #cell(ACTION)="data">
                      <h4 @click="setSingleConsultant(data)" style="margin:0; font-size:20px">
                        <span class="badge badge-primary mr-1">
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                  </b-table> -->
                </div>
                <br />

                <vue-form-generator
                  :model="model"
                  :schema="tabSchema2"
                  :options="formOptions"
                  ref="resignationForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>

                <br />

                <div class="float-right">
                  <!-- <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button> -->
                  <button
                    @click="submitResignationApproval(7, 'Are you sure to return?')"
                    type="button"
                    class="ml-2 btn btn-warning btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Return
                  </button>
                  <button
                    @click="submitResignationApproval(42, 'Are you sure to reject?')"
                    type="button"
                    class="ml-2 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-ban" /> &nbsp; Reject
                  </button>
                  <button
                    @click="submitResignationApproval(3, 'Are you sure to approve?')"
                    type="button"
                    class="ml-2 btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> Approve
                  </button>
                </div>
              </va-card>
            </template>

            <template v-else>
              <va-card>
                <h4 style="margin-top:0">Consultant Resignation Form</h4>
                <br />
                <div>
                  <div class="content">
                    <div class="ml-4">
                      <br />
                      <table id="consultant-profile" class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 25%">FIMM No</td>
                            <td>{{ currentConsultant.CONSULTANT_FIMM_NO }}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                          </tr>
                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC">
                            <td>New NRIC</td>
                            <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                          </tr>
                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC_OLD">
                            <td>Old NRIC Number</td>
                            <td>{{ currentConsultant.CONSULTANT_NRIC_OLD }}</td>
                          </tr>

                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_NO">
                            <td>Passport no</td>
                            <td>{{ currentConsultant.CONSULTANT_PASSPORT_NO }}</td>
                          </tr>

                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO">
                            <td>Passport Expiry Date</td>
                            <td>{{ date(currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
                          </tr>
                          <tr>
                            <td>Reason</td>
                            <td>{{ currentConsultant.RESIGNATION_REMARK }}</td>
                          </tr>

                          <tr>
                            <td>Effective Date</td>
                            <td>{{ date(currentConsultant.RESIGNATION_DATE) }}</td>
                          </tr>
                          <tr>
                            <td>Supported Document</td>
                            <td>
                              <vue-form-generator
                                :model="model"
                                :schema="resignationDocumentViewSchema"
                                :options="formOptions"
                                ref="regForm"
                              >
                              </vue-form-generator>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </va-card>
              <br />

              <va-card>
                <h4 style="margin-top:0">Consultant Resignation Approval</h4>
                <br />
                <div v-if="currentConsultant.APPR_STATUS==14">
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
                    :model="model2"
                    :schema="tabSchema3"
                    :options="formOptions"
                    ref="resignationFormData"
                  >
                  </vue-form-generator>
                </div>

                <br />

                <div class="float-left">
                  <button
                    @click="resetConsultantData"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>

                <div class="float-right" v-if="currentConsultant.APPR_STATUS==14">
                  <!-- <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button> -->
                  <button
                    @click="submitResignationApproval(7, 'Are you sure to return?')"
                    type="button"
                    class="ml-2 btn btn-warning btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Return
                  </button>
                  <button
                    @click="submitResignationApproval(42, 'Are you sure to reject?')"
                    type="button"
                    class="ml-2 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-ban" /> &nbsp; Reject
                  </button>
                  <button
                    @click="submitResignationApproval(3, 'Are you sure to approve?')"
                    type="button"
                    class="ml-2 btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> Approve
                  </button>
                </div>
              </va-card>


              <va-card class="mt-4">
                <div class="ml-2">
                  Approval Log

                  <button
                    v-if="visibleLog"
                    v-b-toggle.resignation-approval-log-manager
                    type="button"
                    class="float-right btn-fill btn-md"
                  >
                    <i class="fa fa-eye-slash"></i>
                  </button>

                  <button
                    v-else
                    v-b-toggle.resignation-approval-log-manager
                    type="button"
                    class="float-right btn-fill btn-md"
                  >
                    <i class="fa fa-eye"></i>
                  </button>

                  <hr />

                  <b-collapse id="resignation-approval-log-manager" class="mt-2" v-model="visibleLog">
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
            </template>
          </b-overlay>

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
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Vudal from "vudal";
import pdf from 'vue-pdf';
import 'vue-form-generator/dist/vfg.css';
import VueFormGenerator from 'vue-form-generator';
import * as services05module1 from "@/app/module1/services05";
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import moment from 'moment'
const Resignation = RepositoryFactory.get('resignation');

Vue.use(VueFormGenerator);

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');

export default {
  components: {
    pdf,
    Vudal
  },

  data() {
    return {
      show_overlay: false,
      currentTab: 'tab1',
      distributorData: "",
      consultantsAPI: [],
      currentConsultant: null,
      pdfsrc: null,
      resignationlogAPI: [],
      resignationApprovalData: '',
      visibleLog: false,
      read_remark: '',

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

      fields: {
        consultant: [
          { name: '__slot:checkbox', title: 'SELECTED' },
          { name: '__slot:index', title: 'NO' },
          { name: 'APPLIED_DATE', title: 'SUBMISSION DATE' },
          { name: 'CONSULTANT_NAME', title: 'NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_MOBILE_NO', title: 'PHONE NO' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: 'TS_PARAM', title: 'STATUS' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],

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

      search: '',
      currentPage: 1,
      perPage: '10',

      model: {
        CONSULTANT_ID: [],
        REMARKS_COMMENTS: '',
        RESIGNATION_DOCUMENT: [],
        CREATE_BY: JSON.parse(localStorage.getItem("user")).user_id,
      },

      model2: {},

      resignationDocumentViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                theme: 'list',
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "RESIGNATION_DOCUMENT",
                type: "vfg-custom-file-view2",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
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
                required: true,
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'REMARKS_COMMENTS',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
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
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'APPR_REMARK',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    // const response = servicesmodule2.getCertificate(data);
    // console.log('Success', response);
    // const blob = new Blob([response.data]);
    // const objectUrl = URL.createObjectURL(blob);
    // this.pdfsrc = objectUrl;
    // return pdfsrc;

    this.getDistributorDetails();
  },

  async mounted() {
    // await this.getConsultantRecord();
    // const user=JSON.parse(localStorage.getItem("user"));
    // this.user_id=user.user_id;
  },

  computed: {
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
    //   if (this.model.SELECTED_CONSULTANTS.length)
    //     return this.model.SELECTED_CONSULTANTS.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },

  methods: {
    exchange () {
      this.$router.push('/fimm/consultant-resignation-review-Manager-overviewList')
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

    resetConsultantData(){
      this.currentConsultant = null;
      this.model.CONSULTANT_ID=[];
      this.model.REMARKS_COMMENTS = '';
      this.model.RESIGNATION_DOCUMENT = []; 
      this.resignationApprovalData = '';
      this.resignationlogAPI = [];
      this.model2 = {}
    },

    // get distributor details
    getDistributorDetails: async function() {
      this.show_overlay = true;
      const user = localStorage.getItem("user");
      const response = await services05module1.getdistributordetails(JSON.parse(user).user_id);
      this.distributorData = response;
      await this.getConsultantRecord();
    },

    async getConsultantRecord() {
      const response = await services02module2.getConsultantsResignationForManagerApproval(this.distributorData.DISTRIBUTOR_ID);
      this.consultantsAPI = response;
      this.show_overlay = false;
    },

    viewCurrentConsultant(props) {
      this.model.CONSULTANT_ID=[];
      this.model.REMARKS_COMMENTS = '';
      this.consultantsAPI.forEach(el => {
        if(el.selected){
          el.selected = false;
        }
      });
      this.currentConsultant = props.rowData;
      this.model.CONSULTANT_ID.push(this.currentConsultant.CONSULTANT_ID);
      this.getConsultantResignationApprovalData();
      this.getResignationApprovalLog();
      this.getResignationDocument(props.rowData.RESIGNATION_ID);
    },

    async getConsultantResignationApprovalData() {
      try {
        await services02module2.consultantResignationApprovalData(this.currentConsultant.CONSULTANT_ID, this.currentConsultant.RESIGNATION_ID, 1) // 1 = APPR_GROUP_ID_MANAGER
        .then((response)=>{
          this.resignationApprovalData = response;
          this.model2 = _.cloneDeep(this.resignationApprovalData);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getResignationApprovalLog() {
      const response = await services02module2.getResignationApprovalLog(this.currentConsultant.CONSULTANT_ID, this.currentConsultant.RESIGNATION_ID);
      this.resignationlogAPI = response;
    },

    getResignationDocument: async function(resignation_id) {
      const response = await Resignation.getResignationDocumentByID(
        resignation_id
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

      return new File(byteArrays, "pot", { type: contentType });
    },

    setCurrentConsultant(props) {
      const index = this.model.CONSULTANT_ID.findIndex(
        el => el === props.rowData.CONSULTANT_ID,
      );

      if (index >= 0) {
        this.model.CONSULTANT_ID.splice(index, 1);
      } else {
        this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
      }
      //console.log('resignation_ids',this.model.CONSULTANT_ID);
    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''));
        this.model.document = newVal.replace('C:\\fakepath\\', '');
      }
    },

    validateResignationForm() {
      return this.$refs['resignationForm'].validate();
    },

    submitResignationApproval: async function(status, confirm_text) {
      if(this.model.CONSULTANT_ID.length>0){
        if(confirm(confirm_text)){
          this.show_overlay = true;
          const data = new FormData();
          if(status == 3){ //APPROVED  //Prefer admin_management DB -> TASK_STATUS for TS_ID
            data.append("TS_ID", "3");
          }else if(status ==7){ //RETURNED to Distributor Admin 
              data.append("TS_ID", "7");
          }else if(status == 42){ //REJECTED
            data.append("TS_ID", "42");
          }
          data.append("CREATE_BY", this.model.CREATE_BY);
          data.append("DISTRIBUTOR_ID", this.distributorData.DISTRIBUTOR_ID);
          data.append("CONSULTANT_ID", JSON.stringify(this.model.CONSULTANT_ID));
          data.append("APPR_REMARK", this.model.REMARKS_COMMENTS);
          data.append("NOTI_APPROVE_REMARK", '(CONSULTANT-RESIGNATION) Approved by Manager');
          data.append("NOTI_RETURN_REMARK", '(CONSULTANT REGISTRATION) Returned by Manager');
          data.append("NOTI_REJECT_REMARK", '(CONSULTANT-RESIGNATION) Rejected by manager');
          data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
          data.append("APPR_GROUP_ID_ADMIN", "3");  //Approval Group ID for ADMIN OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
          data.append("APPR_GROUP_ID_CONST", "1");  //Group ID for for Notification to Consultant in am/CONSULTANT_MANAGE_GROUP

          if (status!=3 && this.model.REMARKS_COMMENTS == "") {
            Vue.$toast.open({
              message: "Please write some remarks / comments",
              type: 'error',
            });
            this.show_overlay = false;
          }else{        
            const response = await Resignation.postResignationManagerApproval(data);

            if(response){
                this.show_overlay = false;
                this.resetConsultantData();
                this.getConsultantRecord();
            }
          }
        }
       }else{
        alert('Please select consultants for action');
      }
    },

    prevTab() {
      this.$router.go(-1);
    },

    saveAsDraft() {},
    // fix this
    // setCurrentConsultantAll(scope) {
    //   this.CONSULTANT_PROFILE = null;
    //   if (this.mappedSelectedConsultantArray.length) {
    //     this.$refs['consultantTable'].clearSelected();
    //   } else {
    //     this.$refs['consultantTable'].selectAllRows();
    //   }
    //   // this.mappedSelectedConsultantArray.length
    //   // ? this.$refs['consultantTable'].clearSelected()
    //   // : this.$refs['consultantTable'].selectAllRows();
    // },
    // setCurrentConsultant(data) {
    //   this.CONSULTANT_PROFILE = null;

    //   console.log(data);
    //   const existed = this.mappedSelectedConsultantArray.some(el => el === data.item.CONSULTANT_ID);

    //   existed
    //     ? this.$refs['consultantTable'].unselectRow(data.index)
    //     : this.$refs['consultantTable'].selectRow(data.index);

    //   // if (existed) {
    //   //   this.$refs['consultantTable'].unselectRow(data.index);
    //   // } else {
    //   //   // console.log('currentData', data.index, data.item.SELECTED_CONSULTANTS);
    //   //   this.$refs['consultantTable'].selectRow(data.index);
    //   // }
    // },
    // setSingleConsultant(data) {
    //   this.CONSULTANT_PROFILE = data.item;
    //   console.log('inside single consultant', this.CONSULTANT_PROFILE);
    // },
    // onRowSelected(items) {
    //   this.model.SELECTED_CONSULTANTS = items;
    //   console.log(this.model.SELECTED_CONSULTANTS);
    // },
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
