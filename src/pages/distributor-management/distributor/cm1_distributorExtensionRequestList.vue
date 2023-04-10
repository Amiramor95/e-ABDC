<template>
  <va-card>

    <vudal name="returnEndDate" style="max-width:500px !important">
      <div class="header">
        <i class="close icon"></i>
        Approval Remark
      </div>
      <div class="content">
        <p v-if="model.returnDate !== null">
          {{`Please return before ${model.returnDate}.`}}
        </p>
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
        Time Extension Request
        <template v-if="user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR'">
          Record
          <!-- <template v-if="model.onlyApproved">
            Approval History
          </template>
          <template v-else>
            for Approval
          </template> -->
        </template>
        <template v-else>
          <template v-if="isManager">
            <template v-if="model.onlyApproved">
              Approval History
            </template>
            <template v-else>
              for Approval
            </template>
          </template>
          <template v-else>
            <template v-if="model.onlyApproved">
              History
            </template>
            <template v-else>
              Record
            </template>
          </template>
          <!-- {{ isManager ? "for Approval" : "Record" }} -->
        </template>
      </h4>
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge
              variant="primary"
              v-b-tooltip.hover
              title="Change View"
              @click="tableView = !tableView"
              v-if="user.user_type === 'DISTRIBUTOR'"
              ><i class="fa fa-exchange"></i
            ></b-badge>
            <!-- <template v-if="user.user_type === 'DISTRIBUTOR'"> -->
              <b-badge
                v-b-toggle.collapse-1
                class="mx-1"
                variant="secondary"
                v-b-tooltip.hover
                title="Filter"
                ><i class="fa fa-search"></i
              ></b-badge>
            <!-- </template> -->
            <template v-if="!isManager && user.user_type === 'DISTRIBUTOR'">
              <span
                v-b-tooltip.hover
                title="Add New"
                @click="$router.push({name: 'create-extension-request'})"
                class="badge badge-success mr-1"
              >
                <i class="fa fa-plus"></i
              ></span>
            </template>
            <!-- {{tableView}} -->
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
      :fields="
        isManager
          ? managerTableHeader
          : user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR'
          ? fimmTableHeader
          : tableHeader
      "
      :data="model.tableData"
      no-data-label="No data found"
      :per-page="parseInt(perPage)"
      :dataperpage="parseInt(perPage)"
      :datacount="dataCount"
      class="mt-3"
      clickable
    >
      <template slot="no" slot-scope="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template slot="REMARK" slot-scope="item">
        <template v-if="user.user_type === 'DISTRIBUTOR'">
          <template v-if="user.USER_GROUP_ID == 3"> <!-- DIST ADMIN BLOCK -->
            <template v-if="item.rowData.EXTENSION_STATUS_ID == 9">
              {{item.rowData.manager_approval.APPROVAL_REMARK.split(' ')[0]}}
              <template
              v-if="item.rowData.manager_approval.APPROVAL_REMARK.split(' ').length > 1"
              >
                <span class="mr-2"
                v-b-tooltip.hover
                @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)"
                title="Read more"
                >
                  <i class="fa fa-window-restore"></i>
                </span>
              </template>
            </template>
            <template v-else>
              {{item.rowData.JUSTIFICATION.split(' ')[0]}}
              <template
              v-if="item.rowData.JUSTIFICATION.split(' ').length > 1"
              >
                <span class="mr-2"
                v-b-tooltip.hover
                @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)"
                title="Read more"
                >
                  <i class="fa fa-window-restore"></i>
                </span>
              </template>
            </template>
          </template>
          <template v-else>
            <template
            v-if="item.rowData.manager_approval.APPROVAL_REMARK !== null">
              {{item.rowData.manager_approval.APPROVAL_REMARK.split(' ')[0]}}
              <template
              v-if="item.rowData.manager_approval.APPROVAL_REMARK.split(' ').length > 1"
              >
                <span class="mr-2"
                v-b-tooltip.hover
                @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)"
                title="Read more"
                >
                  <i class="fa fa-window-restore"></i>
                </span>
              </template>
            </template>
            <template v-else>
              {{item.rowData.JUSTIFICATION.split(' ')[0]}}
              <template
              v-if="item.rowData.JUSTIFICATION.split(' ').length > 1"
              >
                <span class="mr-2"
                v-b-tooltip.hover
                @click="showAmendment(item.rowData.EXTENSION_REQUEST_ID)"
                title="Read more"
                >
                  <i class="fa fa-window-restore"></i>
                </span>
              </template>
            </template>
          </template>
        </template>
      </template>
      <template slot="APPROVAL_DATE" slot-scope="item">
        {{item.rowData.EXTENSION_APPROVAL_DATE != null ? moment(item.rowData.EXTENSION_APPROVAL_DATE).format("DD MMM YYYY") : null}}
      </template>
      <template slot="STATUS" slot-scope="item">
        <template v-if="isManager">
          {{item.rowData.manager_approval.task_status.TS_PARAM}}
        </template>
        <template v-else>
          {{item.rowData.task_status.TS_PARAM}}
        </template>
      </template>
      <template slot="EXTENSION_TYPE" slot-scope="item">
        {{
          item.rowData.EXTENSION_TYPE +
          (item.rowData.EXTENSION_TYPE == "OTHERS"
            ? ` (${item.rowData.OTHER_EXTENSION_TYPE})`
            : "")
        }}
      </template>
      <template slot="EXTENSION_APPROVAL_DATE" slot-scope="item"> </template>
      <template slot="DATE_CREATED" slot-scope="item">
        {{ item.rowData.SUBMISSION_DATE != null ? moment(item.rowData.SUBMISSION_DATE).format("DD MMM YYYY") : null}}
      </template>
      <template slot="action" slot-scope="item">
        <h5 class="mt-1">
          <template v-if="user.user_type !== 'DISTRIBUTOR'"> <!-- FIMM BLOCK -->
            <span class="badge badge-primary mr-2"
              v-b-tooltip.hover
              @click="viewExtensionRequestDetails(item.rowIndex)">
              <i class="fa fa-eye"></i>
            </span>
          </template>
          <template v-else> <!-- DISTRIBUTOR BLOCK -->
            <template v-if="!isManager">
              <template v-if="item.rowData.task_status.TS_PARAM != 'DRAFT'">
                <span class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="viewExtensionRequest(item.rowData.EXTENSION_REQUEST_ID)">
                  <i class="fa fa-eye"></i>
                  </span>
              </template>
              <template v-if="item.rowData.task_status.TS_PARAM == 'DRAFT'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectPage(
                      item.rowData.EXTENSION_REQUEST_ID,
                      'update'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
              <template v-else-if="item.rowData.task_status.TS_PARAM == 'APPROVED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="$router.push({name: `extension-request-history`, params: {id: item.rowData.EXTENSION_REQUEST_ID}})">
                  <i :class="`fa fa-plus`"></i>
                </span>
                  <!-- @click="$router.push({path: `extension-request-history/${item.rowData.EXTENSION_REQUEST_ID}`})"> -->
              </template>
              <template v-if="item.rowData.task_status.TS_PARAM == 'RETURNED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="
                    redirectCorrection(
                      item.rowData.EXTENSION_REQUEST_ID,
                      'admin-correction'
                    )
                  "
                >
                  <i class="fa fa-edit"></i>
                </span>
              </template>
            </template>
            <template v-else>
              <!-- If Manager -->
              <template v-if="item.rowData.manager_approval.task_status.TS_PARAM == 'RETURNED'">
                <template v-if="item.rowData.manager_approval.APPROVAL_PUBLISH_STATUS === 1">
                  <!-- View only -->
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="redirectView(item.rowData.EXTENSION_REQUEST_ID)"
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="redirectView(item.rowData.EXTENSION_REQUEST_ID)"
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                  <!-- <span
                    class="badge badge-primary mr-2"
                    v-b-tooltip.hover
                    @click="
                      redirectCorrection(
                        item.rowData.EXTENSION_REQUEST_ID,
                        'manager-correction'
                      )
                    "
                  >
                    <i class="fa fa-edit"></i>
                  </span> -->
                </template>
              </template>
              <template v-else-if="item.rowData.manager_approval.task_status.TS_PARAM == 'APPROVED' || item.rowData.manager_approval.task_status.TS_PARAM == 'REJECTED'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="redirectView(item.rowData.EXTENSION_REQUEST_ID)"
                >
                  <i class="fa fa-eye"></i>
                </span>
              </template>
              <template v-else-if="item.rowData.manager_approval.task_status.TS_PARAM == 'PENDING'  || item.rowData.manager_approval.task_status.TS_PARAM == 'DRAFT'">
                <span
                  class="badge badge-primary mr-2"
                  v-b-tooltip.hover
                  @click="redirectPage(item.rowData.EXTENSION_REQUEST_ID, 'manager-approval')"
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
import VfgDateForwardCalendar from "../../component/VfgDateForwardCalendar.vue";
import axios from "axios";
import * as servicesModule1 from "../../../app/module1/services07";
import * as servicesModule0 from "../../../app/module0/services02";

// Vue.use(VueFormGenerator);
// Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
// Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
  },
  computed: {
    tableView: {
      set: function(val) {
      this.model.onlyApproved = !this.model.onlyApproved;
      this.model.tableData = this.model.onlyApproved === true ? this.model.approvedData : this.model.notApprovedData;
      this.dataCount = this.model.tableData.length;
      },
      get: function() {
        return this.model.onlyApproved;
      }
    }
  },
  data() {
    return {
      loading: true,
      dataCount: 0,
      perPage: "10",
      isManager: JSON.parse(localStorage.getItem("user")).hasOwnProperty("user_type") &&
        JSON.parse(localStorage.getItem("user")).USER_GROUP != 1
          ? false
          : true,
      // Support Docs
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      user: JSON.parse(localStorage.getItem('user')),

      // Action Docs
      fileActionPlanRecords: [],
      fileActionPlanRecordsForUpload: [],
      uploadActionPlanFileOject: [],

      // Table
      tableHeader: [
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
          name: "__slot:EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "20%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:APPROVAL_DATE",
          title: "Extension Approval Date",
          width: "10%",
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
          title: "Remark",
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
      managerTableHeader: [
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
          title: "SUBMISSION BY",
          width: "15%",
          // dataClass: "text-center"
        },
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
          title: "Remark",
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
      fimmTableHeader: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        // {
        //   name: "__slot:DATE_CREATED",
        //   title: "Submission Date",
        //   width: "10%",
        //   // dataClass: "text-center"
        // },
        {
          name: "DIST_CODE",
          title: "DISTRIBUTOR CODE",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          width: "20%",
          // dataClass: "text-center"
        },
        {
          name: "COUNT",
          title: "APPLICATION COUNT",
          width: "10%",
          // dataClass: "text-center"
        },
        // {
        //   name: "__slot:EXTENSION_TYPE",
        //   title: "Extension Criteria",
        //   width: "20%",
        //   // dataClass: "text-center"
        // },
        // {
        //   name: "__slot:STATUS",
        //   title: "Status",
        //   width: "10%",
        //   // dataClass: "text-center"
        // },
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
            styleClasses: "col-md-12",
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
                visible: () => {
                  let visibility = false;
                  if(this.user.hasOwnProperty('user_type') && this.user.user_type === 'DISTRIBUTOR'){
                    visibility = true;
                  }

                  return visibility;
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.STATUS',
                label: 'Status',
                visible: () => {
                  let visibility = false;
                  if(this.user.hasOwnProperty('user_type') && this.user.user_type === 'DISTRIBUTOR'){
                    visibility = true;
                  }

                  return visibility;
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.DIST_NAME',
                label: 'Distributor Name',
                visible: () => {
                  let visibility = false;
                  if(this.user.hasOwnProperty('user_type') && this.user.user_type !== 'DISTRIBUTOR'){
                    visibility = true;
                  }

                  return visibility;
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.DIST_NO',
                label: 'Distributor Code',
                visible: () => {
                  let visibility = false;
                  if(this.user.hasOwnProperty('user_type') && this.user.user_type !== 'DISTRIBUTOR'){
                    visibility = true;
                  }

                  return visibility;
                },
                styleClasses: 'col-md-6',
              },
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
        onlyApproved: false,
        otherExtensionFieldVisibility: false,
        returnRemark: null,
        returnDate: null,
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
    if(localStorage.getItem('DIST_ID') === null) {
      localStorage.removeItem('DIST_ID');
    }
    this.fetchExtensionList()
  },
  methods: {
    moment,
    redirectPage(id, action) {
      localStorage.setItem("RE_ID", id);

      action =
        action == "subsequent"
          ? this.isManager
            ? "manager-approval"
            : "subsequent"
          : action;

      this.$router.push({name: `extension-request-${action}`});
    },

    viewExtensionRequestDetails(index) {
      localStorage.setItem("DIST_ID", this.model.tableData[index].DIST_CODE);
      localStorage.setItem("DIST_NAME", this.model.tableData[index].DIST_NAME);
      this.$router.push({name: 'extension-request-details'});
    },

    createSubsequent(id) {
      localStorage.setItem("RE_ID", id);
      this.$router.push('create-subsequent-extension-request');
    },

    redirectCorrection(id, action) {
      localStorage.setItem("RE_ID", id);

      this.$router.push({name: `extension-request-${action}`});
    },

    viewExtensionRequest(id) {
      localStorage.setItem('RE_ID', id);

      this.$router.push({name: `extension-request-action`, params: {action: id}});
    },

    fetchExtensionList: async function () {
      let user = JSON.parse(localStorage.getItem("user"));

      let data = {
        USER_GROUP_NAME: user.USER_GROUP_NAME,
        IS_FIMM: false,
        USER_GROUP_ID: user.USER_GROUP_ID,
        STATUS: null
      };

      if(user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR'){

        if(user.user_type == 'fimm') {
          data.IS_FIMM = true;
          data.GROUP = true;
          data.MANAGE_DEPARTMENT_NAME = user.MANAGE_DEPARTMENT_NAME;
        }

      }else {
        data.DISTRIBUTOR_ID = user.USER_DIST_ID;

        if (data.USER_GROUP_ID == 1) {
          this.isManager = true;
        }

        data.GROUP = false;

      }

      axios
        .get(`/api/module1/distributor_extension_request`, {
          params: { params: btoa(JSON.stringify(data)) },
        })
        .then((response) => {

          if(user.user_type === 'DISTRIBUTOR') {

            let relation = null;

            if(this.isManager) {
              response.data.data.filter((item) => {
                console.log("item is here");
                console.log(item);
                let filterStatus = ['APPROVED', 'RETURNED']
                if(filterStatus.includes(item.manager_approval.task_status.TS_PARAM)) {
                // if(item[relation].task_status.TS_PARAM === 'APPROVED') {
                  this.model.approvedData = [...this.model.approvedData, item];
                }else{
                  this.model.notApprovedData = [...this.model.notApprovedData, item];
                }
              });
            }else {
              response.data.data.filter((item) => {
                let filterStatus = ['APPROVED', 'RETURNED']
                if(filterStatus.includes(item.task_status.TS_PARAM)) {
                  this.model.approvedData = [...this.model.approvedData, item];
                }else{
                  this.model.notApprovedData = [...this.model.notApprovedData, item];
                }
              });
            }

            let split = this.$route.fullPath.split('-');
            if(split[split.length - 1] === "exchange" || split[split.length - 1] === "exchange/") {
              this.tableView = true;
              this.model.tableData = this.model.approvedData;
            }else {
              this.model.tableData = this.model.notApprovedData;
            }

          }else {
            this.model.tableData = response.data.data;
          }

          // this.model.tableData = user.user_type === 'DISTRIBUTOR' ? this.model.notApprovedData : response.data.data;

          // alert('here');
          // console.log('this.model.tableData');
          // console.log(this.model.tableData);

          // if(user.user_type === 'DISTRIBUTOR'){

          // }

          this.dataCount = this.model.tableData.length;

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
        USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
        EXTENSION_TYPE: this.model.modelFilter.EXTENSION_TYPE,
        STATUS: this.model.modelFilter.STATUS
      };

      if(user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR'){

        if(user.user_type == 'fimm') {
          data.IS_FIMM = true;
          data.MANAGE_DEPARTMENT_NAME = user.MANAGE_DEPARTMENT_NAME;
          data.GROUP = true;
          data.DIST_NAME = this.model.modelFilter.DIST_NAME;
          data.DIST_NO = this.model.modelFilter.DIST_NO;
        }

      }else {
        data.DISTRIBUTOR_ID = user.USER_DIST_ID;

        if (data.USER_GROUP_ID == 1) {
          this.isManager = true;
        }

        data.GROUP = false;

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

    showAmendment(id) {

      let index = this.model.tableData.findIndex((e) => e.EXTENSION_REQUEST_ID === id);

      if(index !== -1) {
        let item = this.model.tableData[index];

        if(item.hasOwnProperty('rd_approval') && item.rd_approval !== null) {
          this.model.returnRemark = item.rd_approval.APPROVAL_REMARK;
          this.model.returnDate = moment(item.RETURN_DATELINE).format('DD MMM YYYY');
          // Please submit before ' + moment(item.rowData.RETURN_DATELINE).format("DD MMM YYYY")
        }else {
          if(this.user.USER_GROUP_ID == 3) { // Admin Block
            if(item.task_status.TS_PARAM.toUpperCase() != 'RETURNED') {
              this.model.returnRemark = item.JUSTIFICATION;
            }else{
              this.model.returnRemark = item.manager_approval.APPROVAL_REMARK;
            }
          }else {
            if(item.manager_approval.APPROVAL_REMARK !== null) {
              this.model.returnRemark = item.manager_approval.APPROVAL_REMARK;
            }else {
              this.model.returnRemark = item.JUSTIFICATION;
            }
          }
          // alert('not exists');
        }
          this.$modals.returnEndDate.show();
      }

    },

    reset() {
      // this.model.modelFilter = {
      //   EXTENSION_TYPE: null,
      //   STATUS: null,
      //   DIST_NO: null
      // };

      this.model = {
        approvedData: [],
        notApprovedData: [],
        modelFilter: {
          EXTENSION_TYPE: null,
          STATUS: null,
          DIST_NAME: null,
          DIST_NO: null
        }
      };

      this.fetchExtensionList();
    },
    changeViewListing() {
      this.model.onlyApproved = !this.model.onlyApproved;

      // this.model.tableData = this.model.onlyApproved === true ? this.model.approvedData : this.model.notApprovedData;
    },
    redirectView(id) {
      localStorage.setItem('RE_ID', id);
      this.$router.push(`extension-request-manager-view`);
    }
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

