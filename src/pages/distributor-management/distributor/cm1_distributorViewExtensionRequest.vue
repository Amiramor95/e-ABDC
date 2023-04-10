<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Time Extension Request</h4>
    </div>
    <vudal name="returnEndDate">
      <div class="header">
        <i class="close icon"></i>
        Return Date Dateline
      </div>
      <div class="content">
        <vue-form-generator
          :model="approverEndDate"
          :schema="approverEndDateSchema"
          :option="formOptions">
        </vue-form-generator>
      </div>
      <div class="actions">
        <!-- <div class="ui cancel button">
          <button class="btn btn-danger">Cancel</button>
        </div> -->
        <div class="ui cancel button">
          <button class="btn btn-info" @click="rdApproval()">Confirm</button>
        </div>
      </div>

    </vudal>
    <div class="row">
      <div class="col-md-6">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :option="formOptions"
        ></vue-form-generator>
      </div>
      <div class="col-md-6" v-if="model.submissionDate != null">
        <div class="row">
          Submission Date <br>
          {{moment(model.submissionDate).format('DD MMM YYYY')}}
        </div>
        <div class="row mt-3" v-if="model.approvalDate != null">
          Approval Date <br>
          {{moment(model.approvalDate).format('DD MMM YYYY')}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <vue-form-generator
        :model="model"
        :schema="otherSchema"
        :option="formOptions"
        ></vue-form-generator>
      </div>
    </div>
    <div>
      Supporting Documents
      <div class="m-1">

        <vue-form-generator
          :model="model"
          :schema="justificationSchema"
          :options="formOptions"
        ></vue-form-generator>

        <template v-if="!['update', 'correction'].includes($route.params.action)">
          <div class="col-md-12 mb-3">
            <label for="">Upload Document</label>
            <VueFileAgent
              theme="list"
              :readonly="true"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              v-model="model.file"
            ></VueFileAgent>
          </div>
          <div
            class="col-md-12 mb-4"
            v-if="model.type.toUpperCase() == 'COMMENCEMENT OF OPERATION'"
          >
            <label>Action Plan</label>
            <VueFileAgent
              theme="list"
              :readonly="true"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              v-model="model.fileActionPlan"
            ></VueFileAgent>
          </div>
        </template>
        <template v-else>
          <vue-form-generator
            :model="model"
            :schema="fileUploadSchema"
            :options="formOptions"
            ref="fileUploadForm"
          >
          </vue-form-generator>
        </template>

        <vue-form-generator
          :model="model"
          :schema="dateSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
    </div>
    <template v-if="distManagerApprovalModel.approval !== null && distManagerApprovalModel.statusId == 3">
        <va-card class="mt-3">
          <div class="row">
            <h4 slot="header" class="card-title">
              Manager Approval Remark
            </h4>
            <div class="col float-right">
              <div class="float-right">
                <h5>
                  <b-badge v-b-toggle.collapse-0 class="mr-1" variant="secondary">
                    <i class="fa fa-eye"></i>
                  </b-badge>
                </h5>
              </div>
            </div>
          </div>
          <b-collapse id="collapse-0">
            <vue-form-generator
              :model="distManagerApprovalModel"
              :schema="distManagerApprovalSchema"
              :options="formOptions"
            ></vue-form-generator>
            <div class="col-md-12 mb-3" v-if="distManagerApprovalModel.file.length > 0">
              <label for="">Uploaded Document</label>
              <VueFileAgent
                theme="list"
                :readonly="true"
                :deletable="false"
                :multiple="true"
                :linkable="true"
                :maxFiles="14"
                v-model="distManagerApprovalModel.file"
              ></VueFileAgent>
            </div>
          </b-collapse>
        </va-card>
      </template>
    <template v-if="model.approvalDate !== null">
        <va-card class="mt-3">
          <div class="row">
            <h4 slot="header" class="card-title">
              Fimm Approval Remark
            </h4>
            <div class="col float-right">
              <div class="float-right">
                <h5>
                  <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary">
                    <i class="fa fa-eye"></i>
                  </b-badge>
                </h5>
              </div>
            </div>
          </div>
          <b-collapse id="collapse-1">
            <vue-form-generator
              :model="approvalModel"
              :schema="approvalSchema"
              :options="formOptions"
            ></vue-form-generator>
            <div class="col-md-12 mb-3" v-if="approvalModel.file.length > 0">
              <label for="">Uploaded Document</label>
              <VueFileAgent
                theme="list"
                :readonly="true"
                :deletable="false"
                :multiple="true"
                :linkable="true"
                :maxFiles="14"
                v-model="approvalModel.file"
              ></VueFileAgent>
            </div>
          </b-collapse>
        </va-card>
      </template>
    <div class="mt-3">
      <button class="btn btn-primary" @click="$router.back()">
        <i class="fa fa-step-backward"></i> &emsp; Previous
      </button>
    </div>
    <template v-if="$route.params.action == 'subsequent'">
      <hr />
      <form @submit.prevent="onsubmit" enctype="multipart/form-data">
        <h4>Subsequent Time Extension Request</h4>
        <vue-form-generator
          :model="subsequentModel"
          :schema="subsequentSchema"
          :option="formOptions"
        ></vue-form-generator>

        <div>
          Supporting Documents<small style="color: red">*</small>
          <div class="m-1">
            <vue-form-generator
              :model="subsequentModel"
              :schema="subsequentJustificationSchema"
              :options="formOptions"
            ></vue-form-generator>

            <vue-form-generator
              :model="subsequentModel"
              :schema="subsequentFileUploadSchema"
              :options="formOptions"
              ref="fileUploadForm"
            >
            </vue-form-generator>
          </div>
        </div>
        <div class="mt-5">
          <button @click="$router.back()" type="button" class="btn btn-primary btn-fill btn-md">
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
          <div class="float-right">
            <b-button
              type="submit"
              class="btn btn-info btn-fill btn-md mr-2"
              @click="subsequentModel.submissionStatus = 'Draft'"
            >
              <i class="fa fa-edit" /> &nbsp; Save as Draft
            </b-button>

            <b-button
              type="submit"
              class="btn btn-success btn-fill btn-md"
              @click="subsequentModel.submissionStatus = 'Pending'"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Submit
            </b-button>
          </div>
        </div>
      </form>
    </template>
    <template
      v-else-if="$route.params.action == 'approval'"
      class="mt-3"
    >
      <hr />
      <form @submit.prevent="onApprove" enctype="multipart/form-data">
        <template v-if="user.hasOwnProperty('user_type')">
          Recommendations
        </template>
        <template v-else>
          Manager for Distributor Approval
        </template>

        <vue-form-generator
          :model="managerApprovalModel"
          :schema="managerApprovalSchema"
          :options="formOptions"
        ></vue-form-generator>
        <div class="mt-5">
          <button @click="$router.back()" type="button" class="btn btn-primary btn-fill btn-md">
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
          <div class="float-right">
            <template v-if="!user.hasOwnProperty('user_type')">
              <button
                type="button"
                class="btn btn-info btn-fill btn-md mr-2"
              >
                <i class="fa fa-download" /> &nbsp; Download
              </button>
            </template>
            <button
              type="submit"
              class="btn btn-info btn-fill btn-md mr-2"
              @click="managerApprovalModel.submissionStatus = 'Draft'"
            >
              <i class="fa fa-pencil-square-o" /> &nbsp; Save as Draft
            </button>
            <button
              type="submit"
              class="btn btn-danger btn-fill btn-md mr-2"
              @click="managerApprovalModel.submissionStatus = 'Returned to creator'"
            >
              <i class="fa fa-step-backward" /> &nbsp; Return
            </button>
            <button
              type="submit"
              class="btn btn-success btn-fill btn-md mr-2"
              @click="managerApprovalModel.submissionStatus = 'Approved'"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Approve
            </button>
          </div>
        </div>
      </form>
    </template>
    <template v-else-if="$route.params.action == 'update' || $route.params.action == 'correction'">
      <template v-if="user.hasOwnProperty('user_type')">
        <vue-form-generator
          :model="approvalModel"
          :schema="approvalRecommendSchema"
          :options="formOptions"
        ></vue-form-generator>

        <VueFileAgent
          theme="list"
          :readonly="true"
          :multiple="true"
          :linkable="true"
          :maxFiles="14"
          v-model="approvalModel.file"
          class="col-md-12"
        ></VueFileAgent>
      </template>
      <template v-if="$route.params.action == 'correction'">
        Comment / Remark from Distributor Approval

        <vue-form-generator
          :model="managerApprovalModel"
          :schema="approvalCommentSchema"
          :options="formOptions"
        ></vue-form-generator>

        <VueFileAgent
          theme="list"
          :readonly="true"
          :multiple="true"
          :linkable="true"
          :maxFiles="14"
          v-model="managerApprovalModel.file"
          class="col-md-12"
        ></VueFileAgent>
      </template>
      <div class="mt-5">
        <button @click="$router.back()" type="button" class="btn btn-primary btn-fill btn-md">
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        <div class="float-right">
          <button @click="updateExtensionRequest('DRAFT')" type="button" class="btn btn-info btn-fill btn-md mr-2">
            <i class="fa fa-edit" /> &nbsp; Save As Draft
          </button>
          <button @click="updateExtensionRequest(user.hasOwnProperty('user_type') ? 'Approved' : 'PENDING')" type="button" class="btn btn-success btn-fill btn-md mr-2">
            <i class="fa fa-paper-plane" /> &nbsp; {{user.hasOwnProperty('user_type') ? 'Approve' : 'Submit'}}
          </button>
        </div>
      </div>
    </template>
    <template v-else-if="$route.params.action == 'view'">
      <div class="mt-5">
        <button @click="$router.back()" type="button" class="btn btn-primary btn-fill btn-md">
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </div>
    </template>
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

Vue.use(VueFormGenerator);
Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
  },
  computed: {},
  data() {
    return {
      // Support Docs
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      disabled: null,
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
          name: "EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "EXTENSION_APPROVAL_DATE",
          title: "Extension Approval Date",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "10%",
          dataClass: "justify-content-center",
        },
      ],
      // tableData: [],
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],

      term: null,
      dateFormat: "",

      schema: {
        fields: [
          {
            type: "radios",
            required: false,
            label: "Extension Type",
            disabled: function() {
              return this.$route.params.action == 'update' || this.$route.params.action == 'correction' ? false : true;
            },
            model: "type",
            values: [
              {
                name: "Commencement of Operation",
                value: "COMMENCEMENT OF OPERATION",
              },
              { name: "Document Submission", value: "DOCUMENT SUBMISSION" },
              {
                name: "AMSF and Annual Fee payment",
                value: "AMSF AND ANNUAL FEE PAYMENT",
              },
              { name: "Others (Please Specify)", value: "OTHERS" },
              // "Subsequent Request for Extension",
            ],
            styleClasses: "col-md-12",
            onChanged: function (model, newVal, oldVal, field) {
              if (
                newVal == "COMMENCEMENT OF OPERATION"
              ) {
                this.model.actionPlanVisibility = true;
              } else {
                this.model.actionPlanVisibility = false;
                this.model.fileActionPlan = [];
              }

              if (newVal == "OTHERS") {
                this.model.otherExtensionFieldVisibility = true;
              }else {
                this.model.otherExtensionFieldVisibility = false;
                this.model.otherExtensionType = null;
              }
            },
          },
        ],
      },
      otherSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            disabled: function() {
              return this.$route.params.action == 'update' ? true : false;
            },
            required: false,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-12",
            visible: () => {
              if (this.model.type.toUpperCase() == "OTHERS") {
                return true;
              } else {
                return false;
              }
            },
            onChanged: (model, newVal, oldVal, field) => {
              model.otherExtensionType = newVal.toUpperCase();
            }
          }
        ]
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
        ],
      },
      subsequentSchema: {
        fields: [
          {
            type: "radios",
            required: true,
            label: "Extension Type",
            disabled: function() {
              return this.$route.params.action == 'update' || this.$route.params.action == 'correction' ? false : true;
            },
            model: "extensionType",
            values: [
              {
                name: "Commencement of Operation",
                value: "COMMENCEMENT OF OPERATION",
              },
              {
                name: "Document Submission",
                value: "DOCUMENT SUBMISSION",
              },
              {
                name: "AMSF and Annual Fee payment",
                value: "AMSF AND ANNUAL FEE PAYMENT",
              },
              { name: "Others (Please Specify)", value: "OTHERS" },
            ],
            styleClasses: "col-md-12",
          },
          {
            type: "input",
            inputType: "text",
            disabled: function() {
              // console.log(`disabled => ${this.$route.params.action == 'update' ? false : true}`);
              return this.$route.params.action == 'update' ? false : true;
            },
            required: true,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-3",
            visible: () => {
              if (this.model.type.toUpperCase() == "OTHERS (PLEASE SPECIFY)") {
                return true;
              } else {
                return false;
              }
            },
            onChanged: (model, newVal, oldVal, field) => {
              model.otherExtensionType = newVal.toUpperCase();
              if (
                newVal == "COMMENCEMENT OF OPERATION"
              ) {
                this.model.actionPlanVisibility = true;
              } else {
                this.model.actionPlanVisibility = false;
                this.model.fileActionPlan = [];
              }

              if (newVal == "OTHERS") {
                this.model.otherExtensionFieldVisibility = true;
              }else {
                this.model.otherExtensionFieldVisibility = false;
                this.model.otherExtensionType = null;
              }
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
            disabled: () => {
              return this.$route.params.action == 'update' || this.$route.params.action == 'correction' ? false : true;
            },
            required: false,
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },

      dateSchema: {
        fields: [
          {
            type: "vfg-date-forward-calendar",
            model: "extensionDate",
            labels: "Extension End Date",
            required: false,
            disabled:  this.$route.params.action == 'update' || this.$route.params.action == 'correction' ? false : true,
            styleClasses: "col-md-3",
            view: "date",
          },
          // {
          //   type: "vfg-date-forward-calendar",
          //   model: "dateCreated",
          //   labels: 'Date Created',
          //   required: false,
          //   disabled: true,
          //   styleClasses: "col-md-3 float-right",
          //   view: "date",
          // },
        ],
      },

      approverEndDateSchema: {
        fields: [
          {
            type: "vfg-date-forward-calendar",
            model: "dateline",
            labels: "",
            required: false,
            disabled: false,
            styleClasses: "col-md-3",
            view: "date",
          },
        ],
      },

      subsequentJustificationSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Justification / rationale for the request",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Justification",
            disabled: () => {
              return this.$route.params.action == 'update' ? false : true;
            },
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },

      subsequentFileUploadSchema: {
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
                  if (
                    this.model.type.toUpperCase() == "COMMENCEMENT OF OPERATION"
                  ) {
                    return true;
                  } else {
                    return false;
                  }
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
                required: false,
                disabled: () => {
                  return this.$route.params.action == 'update' ? false : true;
                },
                styleClasses: "col-md-3",
                view: "date",
              },
            ],
          },
        ],
      },

      state: {
        disabledDates: {
          to: new Date(Date.now() - 8640000),
        },
      },

      managerApprovalSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Remark / Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: false,
            required: true,
            validator: "string",
            styleClasses: "col-md-12 mt-3",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
          {
            labels: "",
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

      approvalCommentSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Remark / Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: true,
            required: true,
            validator: "string",
            styleClasses: "col-md-12 mt-3",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
          // {
          //   labels: "",
          //   accept: ".pdf",
          //   multiple: true,
          //   text: "Choose a File",
          //   model: "file",
          //   type: "vfg-custom-multiple-file",
          //   styleClasses: "col-md-12",
          //   required: true,
          // },
        ],
      },

      approvalRecommendSchema: {
        fields: [
          {
            type: "textArea",
            model: "recommendation",
            label: "Recommendations",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: this.$route.params.action == 'update' ? false : true,
            required: true,
            validator: "string",
            styleClasses: "col-md-12 mt-3",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },

      approvalSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Remark / Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: true,
            required: false,
            validator: "string",
            styleClasses: "col-md-12 mt-3",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },
      distManagerApprovalSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Remark / Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: true,
            required: false,
            validator: "string",
            styleClasses: "col-md-12 mt-3",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },

      model: {
        type: "Commencement of Operation",
        otherExtensionType: null,
        name: "",
        justification: null,
        file: [],
        fileActionPlan: [],
        dateCreated: null,
        extensionDate: null,
        visibleStartDate: false,
        actionPlanVisibility: true,
        tableData: [],
        otherExtensionFieldVisibility: false,
        submissionDate: null,
        approvalDate: null
      },
      subsequentModel: {
        extensionType: "",
        file: [],
        fileActionPlan: [],
        justification: null,
        extensionDate: null,
        otherExtensionType: null,
        submissionStatus: null,
      },
      managerApprovalModel: {
        justification: null,
        submissionStatus: null,
        file: [],
      },

      distManagerApprovalModel: {
        justification: null,
        approval: null,
        statusId: null,
        file: [],
      },

      approvalModel: {
        recommendation: null,
        submissionStatus: null,
        file: [],
      },
      approverEndDate: {
        dateline: null,
      },
      formOptions: {
        validateAfterChanged: true,
      },
      approvalModel: {
        justification: null,
        submissionStatus: null,
        file: [],
      },
    };
  },
  created() {
    this.getById();
  },
  methods: {
    moment,
    onsubmit: async function () {
      let model = this.subsequentModel;

      let data = {
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        EXTENSION_TYPE: model.extensionType.toUpperCase(),
        OTHER_EXTENSION_TYPE: model.otherExtensionType,
        JUSTIFICATION: model.justification,
        EXTENSION_END_DATE: model.extensionDate.toISOString(),
        FILE: model.file,
        ACTION_FILE: model.fileActionPlan,
        DISTRIBUTOR_ID: JSON.parse(localStorage.getItem("user")).USER_DIST_ID,
      };

      let form = new FormData();
      let keys = ["FILE", "ACTION_FILE"];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (keys.includes(key)) {
            for (let i = 0; i < data[key].length; i++) {
              form.append(`${key}[]`, data[key][i]);
            }
          } else {
            form.append(key, data[key]);
          }
        }
      }

      for (var pair of form.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      let res = await servicesModule1.submitSubsequentForm(form);

      this.$router.back();
    },
    updateExtensionRequest: async function(action) {
      let model = this.model;

      if(this.user.hasOwnProperty('user_type') && this.user.MANAGE_DEPARTMENT_NAME == 'Registration'){
        this.managerApprovalModel.submissionStatus = action;
        this.managerApprovalModel.justification = this.approvalModel.recommendation;
        this.rdApproval();
        return;
      }

      let data = {
        _method: 'PATCH',
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: action,
        EXTENSION_TYPE: model.type.toUpperCase(),
        OTHER_EXTENSION_TYPE: model.otherExtensionType,
        JUSTIFICATION: model.justification,
        EXTENSION_END_DATE: moment(model.extensionDate).format("YYYY-MM-DD"),
        FILE: model.file,
        ACTION_FILE: model.fileActionPlan,
        DISTRIBUTOR_ID: JSON.parse(localStorage.getItem("user")).USER_DIST_ID,
      };

      console.log(data.FILE);
      // return;

      let form = new FormData();
      let keys = ["FILE", "ACTION_FILE"];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (keys.includes(key)) {
            for (let i = 0; i < data[key].length; i++) {
              form.append(`${key}[]`, data[key][i]);
            }
          } else {
            form.append(key, data[key]);
          }
        }
      }

      for (var pair of form.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      let res = await servicesModule1.updateExtensionRequest(form);

      this.$router.back();
    },
    onApprove: async function () {

      let model = this.managerApprovalModel;

      if(this.user.hasOwnProperty('user_type') && this.user.MANAGE_DEPARTMENT_NAME == 'Registration' && model.submissionStatus == 'Returned to creator'){
        this.$modals.returnEndDate.show();
        return;
      }

      let data = {
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        APPROVAL_REMARK: model.justification,
        FILE: model.file,
        CREATED_BY: this.user.user_id,
        IS_FIMM: this.user.hasOwnProperty('user_type') ? true : false,
        APPROVAL_LEVEL: this.user.USER_GROUP_NAME,
        APPROVAL_GROUP_ID: this.user.USER_GROUP_ID
      };

      let form = new FormData();
      let keys = ["FILE"];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (keys.includes(key)) {
            for (let i = 0; i < data[key].length; i++) {
              form.append(`${key}[]`, data[key][i]);
            }
          } else {
            form.append(key, data[key]);
          }
        }
      }

      let res = await servicesModule1.submitExtensionRequestApproval(form);

      this.$toasts.success("Success.");

      this.$router.back();

    },
    rdApproval: async function() {

      // this.$modals.returnEndDate.hide();

      let model = this.managerApprovalModel;

      let data = {
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        APPROVAL_REMARK: model.justification,
        FILE: model.file,
        CREATED_BY: this.user.user_id,
        IS_FIMM: this.user.hasOwnProperty('user_type') ? true : false,
        APPROVAL_LEVEL: this.user.USER_GROUP_NAME,
        DATELINE: this.approverEndDate.dateline == null ? null : this.approverEndDate.dateline.toISOString(),
        APPROVAL_GROUP_ID: this.user.USER_GROUP_ID
      };

      this.approverEndDate.dateline = null;

      let form = new FormData();
      let keys = ["FILE"];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (keys.includes(key)) {
            for (let i = 0; i < data[key].length; i++) {
              form.append(`${key}[]`, data[key][i]);
            }
          } else {
            form.append(key, data[key]);
          }
        }
      }

      let res = await servicesModule1.submitExtensionRequestApproval(form);
      this.$toasts.success("Success.", {
        // width: "400px",
        // position: "bottom-right",
        // padding: "1rem"
      });
      // console.log(res);
      this.$router.back();
    },
    getById: async function () {

      let response = await servicesModule1.getById(
        localStorage.getItem("RE_ID"),
        'view'
      );

      this.model.type = response.EXTENSION_TYPE;
      if(this.model.type == 'COMMENCEMENT OF OPERATION') {
        this.model.actionPlanVisibility = true;
      }else{
        this.model.actionPlanVisibility = false;
      }
      this.model.otherExtensionType = response.OTHER_EXTENSION_TYPE;
      this.subsequentModel.extensionType = response.EXTENSION_TYPE;
      this.model.justification = response.JUSTIFICATION;
      this.model.extensionDate = response.EXTENSION_END_DATE;
      this.model.dateCreated = response.DATE_CREATED;
      this.model.submissionDate = response.SUBMISSION_DATE;
      this.model.approvalDate = response.EXTENSION_APPROVAL_DATE ?? null;

      if(response.MANAGER_APPROVAL !== null && response.MANAGER_APPROVAL.TS_ID == 3) {
        this.distManagerApprovalModel.justification = response.MANAGER_APPROVAL.APPROVAL_REMARK;
        this.distManagerApprovalModel.approval = response.MANAGER_APPROVAL;
        this.distManagerApprovalModel.statusId = response.MANAGER_APPROVAL.TS_ID;

        response.MANAGER_APPROVAL.DOCUMENTS.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          if (element.IS_ACTION_PLAN) {
            this.model.fileActionPlan = [...this.model.fileActionPlan, data];
          } else {
            this.model.file = [...this.model.file, data];
          }
        });
      }

      if(this.model.approvalDate !== null) {
        this.approvalModel.justification = response.CEO_APPROVAL.APPROVAL_REMARK;

        response.CEO_APPROVAL.DOCUMENTS.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.approvalModel.file = [...this.approvalModel.file, data];
        });
      }

      if(this.$route.params.action == 'correction') {
        this.managerApprovalModel.justification = response.MANAGER_APPROVAL.APPROVAL_REMARK;
        console.log(`data => ${response.MANAGER_APPROVAL.APPROVAL_REMARK}`);

        response.MANAGER_APPROVAL.DOCUMENTS.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.managerApprovalModel.file = [...this.managerApprovalModel.file, data];
        });
      }

      if(this.$route.params.action == 'update' && this.user.hasOwnProperty('user_type')) {
        let approvalDocuments;

        switch(this.user.USER_GROUP_ID){
          case 4:
            this.approvalModel.recommendation = response.RD_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.RD_APPROVAL.DOCUMENTS;
          break;
          case 2:
            this.approvalModel.recommendation = response.RD_HOD_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.RD_HOD_APPROVAL.DOCUMENTS;
          break;
          case 3:
            this.approvalModel.recommendation = response.GM_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.GM_APPROVAL.DOCUMENTS;
          break;
          case 1:
            this.approvalModel.recommendation = response.CEO_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.CEO_APPROVAL.DOCUMENTS;
          break;
        }

        approvalDocuments.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.approvalModel.file = [...this.approvalModel.file, data];
        });
      }

      if(this.user.USER_GROUP_ID == 1 && !this.user.hasOwnProperty('user_type')) {
        this.managerApprovalModel.justification = response.MANAGER_APPROVAL.APPROVAL_REMARK;

        response.MANAGER_APPROVAL.DOCUMENTS.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.managerApprovalModel.file = [...this.managerApprovalModel.file, data];
        });
      }

      response.DOCUMENTS.forEach((element) => {
        element.DOCUMENT_BLOB = this.b64toBlobPDF(
          element.DOCUMENT_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOCUMENT_BLOB = new File(
          [element.DOCUMENT_BLOB],
          element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
          { type: element.DOCUMENT_BLOB.type }
        );
        console.log(element.DOCUMENT_BLOB);
        const data = {
          name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
          size: element.DOCUMENT_SIZE,
          type: element.DOCUMENT_TYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
        };

        this.file = element.DOCUMENT_BLOB;
        this.distManagerApprovalModel.file = [...this.distManagerApprovalModel.file, data];
        // if (element.IS_ACTION_PLAN) {
        //   this.model.fileActionPlan = [...this.model.fileActionPlan, data];
        // } else {
        //   this.model.file = [...this.model.file, data];
        // }
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
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
</style>
