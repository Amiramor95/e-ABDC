<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div class="row">
              <h4 slot="header" class="card-title">Time Extension Request</h4>
            </div>
            <vue-form-generator
              :model="model"
              :schema="schema"
              :option="formOptions"
            ></vue-form-generator>

            <div>
              Supporting Documents<small style="color: red">*</small>
              <div class="m-1">
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

                <vue-form-generator
                  :model="model"
                  :schema="justificationSchema"
                  :options="formOptions"
                ></vue-form-generator>

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

                <vue-form-generator
                  :model="model"
                  :schema="fileUploadSchema"
                  :options="formOptions"
                  ref="fileUploadForm"
                >
                </vue-form-generator>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <hr />
              <h4 slot="header">Subsequent Extension Request</h4>
              <label for="">Upload Document</label>
              <VueFileAgent
                theme="list"
                :readonly="true"
                :multiple="true"
                :linkable="true"
                :maxFiles="14"
                v-model="subsequentModel.file"
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
                v-model="subsequentModel.fileActionPlan"
              ></VueFileAgent>
            </div>

            <vue-form-generator
              :model="subsequentModel"
              :schema="fileUploadSchema"
              :options="formOptions"
              ref="fileUploadForm"
            ></vue-form-generator>
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
                  <button
                    @click="$router.back()"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
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
                Manager for Distributor Approval

                <vue-form-generator
                  :model="managerApprovalModel"
                  :schema="managerApprovalSchema"
                  :options="formOptions"
                ></vue-form-generator>
                <div class="mt-5">
                  <button
                    @click="$router.back()"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                  <div class="float-right">
                    <button
                      type="button"
                      class="btn btn-info btn-fill btn-md mr-2"
                    >
                      <i class="fa fa-download" /> &nbsp; Download
                    </button>
                    <button
                      type="submit"
                      class="btn btn-secondary btn-fill btn-md mr-2"
                      @click="managerApprovalModel.submissionStatus = 'Draft'"
                    >
                      <i class="fa fa-pencil-square-o" /> &nbsp; Save as Draft
                    </button>
                    <button
                      type="submit"
                      class="btn btn-danger btn-fill btn-md mr-2"
                      @click="
                        managerApprovalModel.submissionStatus =
                          'Returned to creator'
                      "
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Return
                    </button>
                    <button
                      type="submit"
                      class="btn btn-success btn-fill btn-md mr-2"
                      @click="
                        managerApprovalModel.submissionStatus = 'Approved'
                      "
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Approve
                    </button>
                  </div>
                </div>
              </form>
            </template>
            <template v-else-if="$route.params.action == 'correction'">
              <div class="mt-5">
                <button
                  @click="$router.back()"
                  type="button"
                  class="btn btn-primary btn-fill btn-md"
                >
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
            </template>
            <template v-else-if="$route.params.action == 'view'">
              <div class="mt-5">
                <button
                  @click="$router.back()"
                  type="button"
                  class="btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
            </template>
          </va-card>
        </div>
      </div>
    </div>
  </div>
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
            required: true,
            label: "Extension Type",
            disabled: true,
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
              if (newVal == "Commencement of Operation") {
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
            disabled: true,
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
            },
          },
        ],
      },
      subsequentSchema: {
        fields: [
          {
            type: "radios",
            required: true,
            label: "Extension Type",
            disabled: true,
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
            disabled: true,
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
            disabled: true,
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
                type: "vfg-date-forward-calendar",
                model: "extensionDate",
                labels: "Extension End Date",
                required: true,
                disabled: true,
                styleClasses: "col-md-3",
                view: "date",
              },
            ],
          },
        ],
      },

      subsequentEndDateSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vfg-date-forward-calendar",
                model: "extensionDate",
                labels: "Extension End Date",
                required: true,
                disabled: true,
                styleClasses: "col-md-3",
                view: "date",
              },
            ],
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
            disabled: false,
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
                disabled: false,
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
            label: "Remark Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Remarks",
            disabled: false,
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
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
        otherExtensionFieldVisibility: false,
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
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  created() {
    this.getById();

    if (JSON.parse(localStorage.getItem("user")).USER_GROUP_NAME == "Manager") {
      // get
    }
  },
  methods: {
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
    onApprove: async function () {
      let model = this.managerApprovalModel;

      let data = {
        SUBSEQUENT_EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        APPROVAL_REMARK: model.justification,
        FILE: model.file,
        CREATED_BY: JSON.parse(localStorage.getItem("user")).user_id,
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

      let res = await servicesModule1.submitSubsequentExtensionRequestApproval(form);

      this.$router.back();
    },
    getById: async function () {
      let response = await servicesModule1.getSubsequentById(
        localStorage.getItem("RE_ID")
      );
      this.model.type = response.EXTENSION_REQUEST.EXTENSION_TYPE;
      this.model.otherExtensionType =
        response.EXTENSION_REQUEST.OTHER_EXTENSION_TYPE;
      this.subsequentModel.extensionDate = response.EXTENSION_END_DATE;
      this.model.justification = response.EXTENSION_REQUEST.JUSTIFICATION;
      this.model.extensionDate = response.EXTENSION_REQUEST.EXTENSION_END_DATE;

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
        if (element.IS_ACTION_PLAN) {
          this.subsequentModel.fileActionPlan = [
            ...this.model.fileActionPlan,
            data,
          ];
        } else {
          this.subsequentModel.file = [...this.model.file, data];
        }
      });

      response.EXTENSION_REQUEST.DOCUMENTS.forEach((element) => {
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
