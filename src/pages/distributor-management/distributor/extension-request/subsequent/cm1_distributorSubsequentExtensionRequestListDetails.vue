<template>
  <va-card>

    <vudal name="returnEndDate" style="max-width:500px !important">
      <div class="header">
        <i class="close icon"></i>
        Approval Remark
      </div>
      <div class="content">
        <p>
          {{model.returnRemark}}
        </p>
      </div>
      <div class="actions">
        <div class="ui cancel button">
          <button class="btn btn-danger mr-2">
            <i class="fa fa-close"></i>
            Close
          </button>
        </div>
      </div>
    </vudal>

    <div class="row">
      <h4 slot="header" class="card-title">
        Subsequent Time Extension Request {{model.onlyApprovedData ? "History" : "Approval" }} for: {{distName}}
      </h4>
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge
              v-b-toggle.collapse-1
              class="mr-1"
              variant="secondary"
              ><i class="fa fa-search"></i
            ></b-badge>
            <b-badge
              class="mr-1"
              variant="primary"
              @click="changeViewListing()"
              ><i class="fa fa-exchange"></i
            ></b-badge>
          </h5>
        </div>
      </div>
    </div>

    <b-collapse id="collapse-1" class="mt-4">
      <!-- <b-card> -->
        <vue-form-generator
          :model="model"
          :schema="advancedSearchSchema"
          ref="advancedSearchForm"
        >
        </vue-form-generator>
        <br />
        <button
          @click="filterRecord"
          type="button"
          class="ml-2 btn btn-sm btn-primary"
        >
          Search
        </button>
        <button
          @click.prevent="reset"
          type="button"
          class="ml-2 btn btn-sm btn-danger"
        >
          Reset
        </button>
      <!-- </b-card> -->
    </b-collapse>

    <va-data-table
      :fields="fimmTableHeader"
      :data="model.tableData"
      no-data-label="No data found"
      :per-page="parseInt(perPage)"
      :dataperpage="parseInt(perPage)"
      :datacount="dataCount"
      class="mt-3"
      clickable
    >
      <template slot="no" scope="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template slot="STATUS" scope="item">
        <!-- <span v-if="user.USER_GROUP_ID == 4">{{item.rowData.rd_approval.task_status.TS_PARAM}}</span> -->
        <span v-if="user.USER_GROUP_ID == 5">{{item.rowData.rd_approval.task_status.TS_PARAM}}</span>
        <span v-else-if="user.USER_GROUP_ID == 2">{{item.rowData.rd_hod_approval.task_status.TS_PARAM}}</span>
        <span v-else-if="user.USER_GROUP_ID == 3">{{item.rowData.gm_approval.task_status.TS_PARAM}}</span>
        <span v-else-if="user.USER_GROUP_ID == 1">{{item.rowData.ceo_approval.task_status.TS_PARAM}}</span>
      </template>
      <template slot="EXTENSION_TYPE" scope="item">
        {{
          item.rowData.EXTENSION_TYPE +
          (item.rowData.EXTENSION_TYPE == "OTHERS"
            ? ` (${item.rowData.OTHER_EXTENSION_TYPE})`
            : "")
        }}
      </template>
      <template slot="EXTENSION_APPROVAL_DATE" scope="item"> </template>
      <template slot="DATE_CREATED" scope="item">
        {{ item.rowData.SUBMISSION_DATE != null ? moment(item.rowData.SUBMISSION_DATE).format("DD MMM YYYY") : null}}
      </template>
      <template slot="REMARK" scope="item">
        {{item.rowData.JUSTIFICATION.split(' ')[0]}}
        <span
        v-if="item.rowData.JUSTIFICATION.split(' ').length > 1"
        v-b-tooltip.hover
        @click="showAmendment(item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID)"
        title="Read more"
        class="mr-2">
          <i class="fa fa-window-restore"></i>
        </span>
        <!-- <a @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)" v-if="user.USER_GROUP_ID == 4 && item.rowData.rd_approval.task_status.TS_PARAM == 'RETURNED'">
          <small>
            *Click here to display approval remark
          </small>
        </a>
        <a @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)" v-else-if="user.USER_GROUP_ID == 2 && item.rowData.rd_hod_approval.task_status.TS_PARAM == 'RETURNED'">
          <small>
            *Click here to display approval remark
          </small>
        </a> -->
      </template>
      <template slot="action" scope="item">
        <h5 class="mt-1">
          <!-- <span
            class="badge badge-primary mr-2"
            v-b-tooltip.hover
            @click="
              redirectPage(item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID, 'view')
            "
          >
            <i class="fa fa-eye"></i>
          </span> -->
          <template v-if="user.user_type !== 'DISTRIBUTOR'">
            <!-- <template v-if="user.USER_GROUP_ID == 4"> --> <!-- Staff RD Block -->
            <template v-if="user.USER_GROUP_ID == 5"> <!-- Staff RD Block -->
              <template v-if="item.rowData.rd_approval.task_status.TS_PARAM == 'DRAFT'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-approval'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
              <template v-if="item.rowData.rd_approval.task_status.TS_PARAM == 'APPROVED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-view'
                    )
                  "
                >
                  <i class="fa fa-eye"></i>
                </span>
              </template>
              <template v-if="item.rowData.rd_approval.task_status.TS_PARAM == 'RETURNED'">
                <template v-if="item.rowData.rd_approval.APPROVAL_PUBLISH_STATUS === 1">
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-view'
                      )
                    "
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-correction'
                      )
                    "
                  >
                    <i class="fa fa-edit"></i>
                  </span>
                </template>
              </template>
              <template v-if="item.rowData.rd_approval.task_status.TS_PARAM == 'PENDING'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-approval'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
            </template>
            <template v-else-if="user.USER_GROUP_ID == 2"> <!-- HOD RD Block -->
              <template v-if="item.rowData.rd_hod_approval.task_status.TS_PARAM == 'RETURNED'">
                <template v-if="item.rowData.rd_hod_approval.APPROVAL_PUBLISH_STATUS === 1">
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-hod-view'
                      )
                    "
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-hod-correction'
                      )
                    "
                  >
                    <i class="fa fa-edit"></i>
                  </span>
                </template>
              </template>
              <template v-else-if="item.rowData.rd_hod_approval.task_status.TS_PARAM == 'APPROVED'">
                <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-hod-view'
                      )
                    "
                  >
                    <i class="fa fa-eye"></i>
                  </span>
              </template>
              <template v-else>
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-hod-approval'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
            </template>
            <template v-else-if="user.USER_GROUP_ID == 3"> <!-- GM RD Block -->
              <template v-if="item.rowData.gm_approval.task_status.TS_PARAM == 'RETURNED'">
                <template v-if="item.rowData.gm_approval.APPROVAL_PUBLISH_STATUS == 1">
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'rd-gm-view'
                      )
                    "
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'correction'
                      )
                    "
                  >
                    <i class="fa fa-edit"></i>
                  </span>
                </template>
              </template>
              <template v-else-if="item.rowData.gm_approval.task_status.TS_PARAM == 'APPROVED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-gm-view'
                    )
                  "
                >
                  <i class="fa fa-eye"></i>
                </span>
              </template>
              <template v-else>
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'rd-gm-approval'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
            </template>
            <template v-else-if="user.USER_GROUP_ID == 1"> <!-- CEO Block -->
              <template v-if="item.rowData.ceo_approval.task_status.TS_PARAM == 'RETURNED'">
                <template v-if="item.rowData.ceo_approval.APPROVAL_PUBLISH_STATUS === 1">
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'ceo-view'
                      )
                    "
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectPage(
                        item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                        'correction'
                      )
                    "
                  >
                    <i class="fa fa-edit"></i>
                  </span>
                </template>
              </template>
              <template v-else-if="item.rowData.ceo_approval.task_status.TS_PARAM == 'APPROVED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'ceo-view'
                    )
                  "
                >
                  <i class="fa fa-eye"></i>
                </span>
              </template>
              <template v-else>
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.SUBSEQUENT_EXTENSION_REQUEST_ID,
                      'ceo-approval'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
            </template>
          </template>
        </h5>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Vue from "vue";
import Vudal from "vudal";
import moment from "moment";
import VfgDateForwardCalendar from "../../../../component/VfgDateForwardCalendar.vue";
import axios from "axios";
import * as servicesModule1 from "../../../../../app/module1/services07";
import * as servicesModule0 from "../../../../../app/module0/services02";

// Vue.use(VueFormGenerator);
// Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
// Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
  },
  computed: {},
  data() {
    return {
      loading: true,
      dataCount: null,
      perPage: "10",
      isManager: false,
      // Support Docs
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      user: JSON.parse(localStorage.getItem('user')),
      distName: localStorage.getItem('DIST_NAME'),

      // Action Docs
      fileActionPlanRecords: [],
      fileActionPlanRecordsForUpload: [],
      uploadActionPlanFileOject: [],

      // Table
      fimmTableHeader: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        {
          name: "__slot:DATE_CREATED",
          title: "Submission Date",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "author.USER_NAME",
          title: "Created By",
          width: "10%",
          // dataClass: "text-center"
        },
        // {
        //   name: "DIST_CODE",
        //   title: "DISTRIBUTOR CODE",
        //   width: "10%",
        //   // dataClass: "text-center"
        // },
        // {
        //   name: "DIST_NAME",
        //   title: "DISTRIBUTOR NAME",
        //   width: "20%",
        //   // dataClass: "text-center"
        // },
        {
          name: "__slot:EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "20%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:STATUS",
          title: "Status",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:REMARK",
          title: "Remarks",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "5%",
          dataClass: "justify-content-center",
        },
      ],
      tableData: [],
      perPage: "10",
      perPageOptions: ["10", "20", "50", "100"],

      term: null,
      dateFormat: "",

      schema: {
        fields: [
          {
            type: "radios",
            required: true,
            label: "Extension Type",
            model: "type",
            values: [
              "Commencement of Operation",
              "Document Submission",
              "AMSF and Annual Fee payment",
              "Others (Please Specify)",
              "Subsequent Request for Extension",
            ],
            styleClasses: "col-md-12",
            onChanged: function (model, newVal, oldVal, field) {
              if (
                newVal == "Commencement of Operation" ||
                newVal == "Subsequent Request for Extension"
              ) {
                this.model.actionPlanVisibility = true;
              } else {
                this.model.actionPlanVisibility = false;
                this.model.fileActionPlan = [];
              }

              if (newVal == "Others (Please Specify)") {
                this.model.otherExtensionFieldVisibility = true;
              } else {
                this.model.otherExtensionFieldVisibility = false;
                this.model.otherExtensionType = null;
              }
            },
          },
          {
            type: "input",
            inputType: "text",
            required: true,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-3",
            visible: () => {
              return this.model.otherExtensionFieldVisibility;
            },
            onChanged: (model, newVal, oldVal, field) => {
              model.otherExtensionType = newVal.toUpperCase();
            },
          },
        ],
      },

      justificationSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Justification / rationale for the request",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Justification",
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
              },
            ],
          },
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Action Plan",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "fileActionPlan",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: () => {
                  return this.model.actionPlanVisibility;
                },
              },
            ],
          },
          {
            styleClasses: "row",
            fields: [
              {
                type: "vfg-date-forward-calendar",
                model: "extensionDate",
                labels: "Extension End Date",
                required: true,
                styleClasses: "col-md-3",
                view: "date",
              },
            ],
          },
        ],
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.EXTENSION_TYPE',
                label: 'Extension Criteria',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.STATUS',
                label: 'Status',
                styleClasses: 'col-md-6',
              },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'modelFilter.DIST_NO',
              //   label: 'Distributor Code',
              //   visible: () => {
              //     let visibility = false;
              //     if(this.user.hasOwnProperty('user_type')){
              //       visibility = true;
              //     }

              //     return visibility;
              //   },
              //   styleClasses: 'col-md-6',
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'modelFilter.CONSULTANT_PASSPORT_NO',
              //   label: 'Passport Number',
              //   styleClasses: 'col-md-6',
              // },
            ],
          },
        ],
      },

      state: {
        disabledDates: {
          to: new Date(Date.now() - 8640000),
        },
      },
      model: {
        type: "Commencement of Operation",
        otherExtensionType: null,
        name: "",
        justification: null,
        fileUpload: "",
        file: [],
        fileActionPlanUpload: "",
        fileActionPlan: [],
        extensionDate: null,
        visibleStartDate: false,
        actionPlanVisibility: true,
        tableData: [],
        approvedData: [],
        notApprovedData: [],
        onlyApprovedData: false,
        returnRemark: null,
        otherExtensionFieldVisibility: false,
        modelFilter: {
          EXTENSION_TYPE: '',
          STATUS: '',
          DIST_NO: '',
          // CONSULTANT_PASSPORT_NO: '',
        },
      },
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  created() {
    this.fetchExtensionList()
  },
  methods: {
    moment,
    redirectPage(id, action) {
      localStorage.setItem("RE_ID", id);

      if(!this.user.hasOwnProperty('user_type')){
        action =
          action == "subsequent"
            ? this.isManager
              ? "manager-approval"
              : "subsequent"
            : action;
      }

      this.$router.push(`subsequent-extension-request-${action}`);
    },

    createSubsequent(id) {
      localStorage.setItem("RE_ID", id);
      this.$router.push('create-subsequent-extension-request');
    },

    redirectCorrection(id, action) {
      localStorage.setItem("RE_ID", id);

      this.$router.push(`subsequent-extension-request-${action}`);
    },

    viewExtensionRequest(id) {
      localStorage.setItem('RE_ID', id);
      this.$router.push(`extension-request/${id}`);
    },

    fetchExtensionList: async function () {
      let user = JSON.parse(localStorage.getItem("user"));

      let data = {
        USER_GROUP_NAME: user.USER_GROUP_NAME,
        IS_FIMM: false,
        USER_GROUP_ID: user.USER_GROUP_ID,
        STATUS: null,
        DIST_NO: localStorage.getItem("DIST_ID")
      };

      if(user.hasOwnProperty('user_type')){

        if(user.user_type == 'fimm') {
          data.IS_FIMM = true;
          data.MANAGE_DEPARTMENT_NAME = user.MANAGE_DEPARTMENT_NAME;
        }

      }else {
        data.DISTRIBUTOR_ID = user.USER_DIST_ID;

        if (data.USER_GROUP_ID == 1) {
          this.isManager = true;
        }

      }

      axios
        .get(`/api/module1/subsequent/distributor_extension_request`, {
          params: { params: btoa(JSON.stringify(data)) },
        })
        .then((response) => {

          let relation = null;

          switch(user.USER_GROUP_ID) {
            // case 4: // Staff RD
            case 5: // Staff RD
              relation = 'rd_approval';
            break;
            case 2: // HOD RD
              relation = 'rd_hod_approval';
            break;
            case 3: // GM
              relation = 'gm_approval';
            break;
            case 1: // CEO
              relation = 'ceo_approval';
            break;
          }

          let res = response.data.data.filter((item) => {
            let filterStatus = ['APPROVED', 'RETURNED']
            // if(item[relation].task_status.TS_PARAM === 'APPROVED') {
            if(filterStatus.includes(item[relation].task_status.TS_PARAM)) {
              this.model.approvedData = [...this.model.approvedData, item];
            }else{
              this.model.notApprovedData = [...this.model.notApprovedData, item];
            }
          });
          this.model.tableData = this.model.notApprovedData;
          this.dataCount = this.model.tableData.length;

          // this.model.tableData = response.data.data;
          // this.dataCount = this.model.tableData.length;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
              // console.log(JSON.stringify(error.response.data.message));
              if (error.response.data.message == "Token expired.") {
                console.log("logout");
                // servicesModule1.logout();
              } else {
                console.log(error.response.data.message);
              }
            } else if (error.response.status == 401) {
              // servicesModule1.logout();
            }
            return "error";
          }
        });

        this.loading = false;
    },

    filterRecord() {
      let user = JSON.parse(localStorage.getItem("user"));

      let data = {
        USER_GROUP_NAME: user.USER_GROUP_NAME,
        IS_FIMM: false,
        USER_GROUP_ID: user.USER_GROUP_ID,
        EXTENSION_TYPE: this.model.modelFilter.EXTENSION_TYPE,
        STATUS: this.model.modelFilter.STATUS
      };

      if(user.hasOwnProperty('user_type')){

        if(user.user_type == 'fimm') {
          data.IS_FIMM = true;
          data.MANAGE_DEPARTMENT_NAME = user.MANAGE_DEPARTMENT_NAME;
          data.DIST_NO = this.model.modelFilter.DIST_NO;
        }

      }else {
        data.DISTRIBUTOR_ID = user.USER_DIST_ID;

        if (data.USER_GROUP_ID == 1) {
          this.isManager = true;
        }

      }

      axios
        .get(`/api/module1/distributor_extension_request`, {
          params: { params: btoa(JSON.stringify(data)) },
        })
        .then((response) => {
          this.model.tableData = response.data.data;
          this.dataCount = this.model.tableData.length;

          Vue.$toast.open({
            message: 'Successfully filter data',
            type: 'success',
          })
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
              // console.log(JSON.stringify(error.response.data.message));
              if (error.response.data.message == "Token expired.") {
                console.log("logout");
                // servicesModule1.logout();
              } else {
                console.log(error.response.data.message);
              }
            } else if (error.response.status == 401) {
              // servicesModule1.logout();
            }
            return "error";
          }
        });

      this.loading = false;
    },

    reset() {
      this.model.modelFilter = {
        EXTENSION_TYPE: null,
        STATUS: null,
        DIST_NO: null
      };
      this.fetchExtensionList();
    },
    changeViewListing() {
      this.model.onlyApprovedData = !this.model.onlyApprovedData;

      this.model.tableData = this.model.onlyApprovedData ? this.model.approvedData : this.model.notApprovedData;
    },

    showAmendment(id) {

      let index = this.model.tableData.findIndex((e) => e.SUBSEQUENT_EXTENSION_REQUEST_ID === id);

      if(index !== -1) {
        let item = this.model.tableData[index];
        this.model.returnRemark = item.JUSTIFICATION;

      //   if(this.user.USER_GROUP_ID == 4) {
      //     this.model.returnRemark = item.rd_hod_approval.APPROVAL_REMARK;
      //   }else if(this.user.USER_GROUP_ID == 2){
      //     this.model.returnRemark = item.gm_approval.APPROVAL_REMARK;
      //   }
          this.$modals.returnEndDate.show();
      }

    },
  },
};
</script>

<style lang="scss">
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}

.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
</style>

