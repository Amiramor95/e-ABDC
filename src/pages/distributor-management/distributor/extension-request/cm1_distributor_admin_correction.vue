<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Time Extension Request</h4>
    </div>
    <form @submit.prevent="onsubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6">
          <vue-form-generator
            :model="model"
            :schema="schema"
            :option="formOptions"
          ></vue-form-generator>
        </div>
        <div class="col-md-6">
          <template v-if="model.submissionDate !== null">
            Submission Date <br />
            {{ moment(model.submissionDate).format("DD MMM YYYY") }}
          </template>
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
        Supporting Documents<small style="color: red">*</small>
        <div class="m-1">
          <vue-form-generator
            :model="model"
            :schema="justificationSchema"
            :options="formOptions"
          ></vue-form-generator>
          <div class="col-md-12 mb-3">
            <label for="">Upload Document</label>
            <VueFileAgent
              theme="list"
              ref="vueFileAgent"
              :readonly="false"
              :deletable="true"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              v-model="model.file"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              @delete="fileDeleted($event)"
            ></VueFileAgent>
          </div>
          <div
            class="col-md-12 mb-4"
            v-if="model.type.toUpperCase() == 'COMMENCEMENT OF OPERATION'"
          >
            <label>Action Plan</label>
            <VueFileAgent
              theme="list"
              ref="vueFileAgentActionPlan"
              :readonly="false"
              :deletable="true"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              @select="filesSelectedActionPlan($event)"
              @beforedelete="onBeforeDeleteActionPlan($event)"
              @delete="fileDeletedActionPlan($event)"
              v-model="model.fileActionPlan"
            ></VueFileAgent>
          </div>

          <vue-form-generator
            :model="model"
            :schema="dateSchema"
            :options="formOptions"
            ref="fileUploadForm"
          >
          </vue-form-generator>
        </div>
        <div class="mt-5">

          <button
            @click="$router.push('extension-request')"
            type="button"
            class="btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
          <div class="float-right">
            <b-button
              type="submit"
              class="btn btn-info btn-fill btn-md mr-2"
              @click="model.submissionStatus = 'Draft'"
            >
              <i class="fa fa-edit" /> &nbsp; Save as Draft
            </b-button>

            <b-button
              type="submit"
              class="btn btn-success btn-fill btn-md"
              @click="model.submissionStatus = 'Pending'"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Submit
            </b-button>
          </div>
        </div>
        <hr />
        Manager for Distributor Approval
        <vue-form-generator
          :model="managerApprovalModel"
          :schema="managerApprovalSchema"
          :options="formOptions"
        ></vue-form-generator>
        <div class="col-md-12 mb-3" v-if="managerApprovalModel.file.length > 0">
          <label for="">Upload Document</label>
          <VueFileAgent
            theme="list"
            ref="vueFileAgent"
            :readonly="true"
            :deletable="false"
            :multiple="true"
            :linkable="true"
            :maxFiles="14"
            v-model="managerApprovalModel.file"
          ></VueFileAgent>
        </div>
      </div>
    </form>
  </va-card>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Vue from "vue";
import Vudal from "vudal";
import moment from "moment";
import VfgDateForwardCalendar from "../../../component/VfgDateForwardCalendar.vue";
import axios from "axios";
import * as servicesModule1 from "../../../../app/module1/services07";
import * as servicesModule0 from "../../../../app/module0/services02";

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
      user: JSON.parse(localStorage.getItem("user")),

      // Action Docs
      fileActionPlanRecords: [],
      fileActionPlanRecordsForUpload: [],
      uploadFileOjectActionPlan: [],
      uploadActionPlanFileOject: [],

      term: null,
      dateFormat: "",

      schema: {
        fields: [
          {
            type: "radios",
            required: true,
            label: "Extension Type",
            disabled: false,
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
              if (newVal == "COMMENCEMENT OF OPERATION") {
                this.model.actionPlanVisibility = true;
              } else {
                this.model.actionPlanVisibility = false;
                this.model.fileActionPlan = [];
              }

              if (newVal == "OTHERS") {
                this.model.otherExtensionFieldVisibility = true;
              } else {
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
            disabled: true,
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
              // model.otherExtensionType = newVal.toUpperCase();
            }
          }
        ]
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
            disabled: false,
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              // model.justification = newVal.toUpperCase();
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
            required: true,
            disabled: false,
            styleClasses: "col-md-3",
            view: "date",
          },
        ],
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
            disabled: true,
            required: false,
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
        submissionStatus: null,
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
    };
  },
  created() {
    this.getById();
  },
  methods: {
    moment,
    onsubmit: async function () {

      let model = this.model;
      let pass = true;

      let data = {
        // _method: 'PATCH',
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        EXTENSION_TYPE: model.type.toUpperCase(),
        OTHER_EXTENSION_TYPE: model.otherExtensionType.toUpperCase(),
        JUSTIFICATION: model.justification.toUpperCase(),
        FILE: model.file,
        ACTION_FILE: model.fileActionPlan,
        DISTRIBUTOR_ID: JSON.parse(localStorage.getItem("user")).USER_DIST_ID,
      };

      let toastMessage = "Successfully";

      if(model.extensionDate !== "0000-00-00") {
        data.EXTENSION_END_DATE = new Date(model.extensionDate).toISOString();
      }else {
        data.EXTENSION_END_DATE = null;
      }

      if(data.STATUS === "Pending") {
        if(!confirm('Are you sure you want to submit this form?')) {
          pass = false;
        }
        toastMessage = `${toastMessage} resubmit Extension Request.`
      }else if(data.STATUS === "Draft") {
        if(!confirm('Are you sure you want to save this form as draft?')) {
          pass = false;
        }
          toastMessage = `${toastMessage} save Extension Request as draft.`
      }

      if(pass === true) {

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

        this.$toast.success(toastMessage);

        this.$router.back();

      }

    },
    getById: async function () {
      let response = await servicesModule1.getById(
        localStorage.getItem("RE_ID"),
        this.$route.params.action
      );

      this.model.type = response.EXTENSION_TYPE;
      if (this.model.type == "COMMENCEMENT OF OPERATION") {
        this.model.actionPlanVisibility = true;
      } else {
        this.model.actionPlanVisibility = false;
      }
      this.model.otherExtensionType = response.OTHER_EXTENSION_TYPE;
      this.subsequentModel.extensionType = response.EXTENSION_TYPE;
      this.model.justification = response.JUSTIFICATION;
      this.model.extensionDate = response.EXTENSION_END_DATE;
      this.model.dateCreated = response.DATE_CREATED;
      this.model.submissionDate = response.SUBMISSION_DATE;

      // if (this.$route.params.action == "correction") {
        this.managerApprovalModel.justification =
          response.MANAGER_APPROVAL.APPROVAL_REMARK;
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
            docID: element.EXTENSION_REQUEST_DOCUMENT_ID,
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.managerApprovalModel.file = [
            ...this.managerApprovalModel.file,
            data,
          ];
        });
      // }

      if (
        this.$route.params.action == "update" &&
        this.user.hasOwnProperty("user_type")
      ) {
        let approvalDocuments;

        switch (this.user.USER_GROUP_ID) {
          case 4:
            this.approvalModel.recommendation =
              response.RD_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.RD_APPROVAL.DOCUMENTS;
            break;
          case 2:
            this.approvalModel.recommendation =
              response.RD_HOD_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.RD_HOD_APPROVAL.DOCUMENTS;
            break;
          case 3:
            this.approvalModel.recommendation =
              response.GM_APPROVAL.APPROVAL_REMARK;
            approvalDocuments = response.GM_APPROVAL.DOCUMENTS;
            break;
          case 1:
            this.approvalModel.recommendation =
              response.CEO_APPROVAL.APPROVAL_REMARK;
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
            docID: element.EXTENSION_REQUEST_DOCUMENT_ID,
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

      if (
        this.user.USER_GROUP_ID == 1 &&
        !this.user.hasOwnProperty("user_type")
      ) {
        this.managerApprovalModel.justification =
          response.MANAGER_APPROVAL.APPROVAL_REMARK;

        response.MANAGER_APPROVAL.DOCUMENTS.forEach((element) => {
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
          );
          console.log("mula");
          // console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            docID: element.EXTENSION_REQUEST_APPROVAL_DOCUMENT_ID,
            name: element.DOCUMENT_NAME + "." + element.DOCUMENT_TYPE,
            size: element.DOCUMENT_SIZE,
            type: element.DOCUMENT_TYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.managerApprovalModel.file = [
            ...this.managerApprovalModel.file,
            data,
          ];
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
          docID: element.EXTENSION_REQUEST_DOCUMENT_ID,
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
    onBeforeDelete(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);

      if (i !== -1) {
        console.log("before delete");
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
        }
        console.log(this.uploadFileOject);

        this.managerApprovalModel.file = this.uploadFileOject;
      } else {
        //this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        if (confirm("Are you sure you want to delete this document?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          this.deleteDocument(false, fileRecord.docID);
        }
      }
    },

    deleteDocument: async function (isActionPlan, val) {
      const response = await servicesModule1.deleteUploadedDocument(
        isActionPlan,
        val
      );
    },

    fileDeleted: function (fileRecord) {
      console.log("file delete");
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i == -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

    deleteUploadedFile: function (fileRecord) {
      this.uploadFileOject = [];
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);

      this.managerApprovalModel.file = this.uploadFileOject;
    },

    filesSelected: function (fileRecordsNewlySelected) {
      this.uploadFileOject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);

      var i;

      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);

      this.managerApprovalModel.file = this.uploadFileOject;
    },
    onBeforeDeleteActionPlan(fileRecord) {
      var i = this.fileActionPlanRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        console.log("before delete");
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileActionPlanRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileActionPlanRecordsForUpload.length; i++) {
          this.uploadFileOject.push(
            this.fileActionPlanRecordsForUpload[i].file
          );
        }
        console.log(this.uploadFileOject);

        this.model.fileActionPlan = this.uploadFileOject;
      } else {
        //this.$refs.vueFileAgentActionPlan.deleteFileRecord(fileRecord);
        if (confirm("Are you sure you want to delete this document?")) {
          this.$refs.vueFileAgentActionPlan.deleteFileRecord(fileRecord); // will trigger 'delete' event
          this.deleteDocument(true, fileRecord.docID);
        }
      }
    },

    fileDeletedActionPlan: function (fileRecord) {
      console.log("file delete");
      var i = this.fileActionPlanRecordsForUpload.indexOf(fileRecord);
      if (i == -1) {
        this.fileActionPlanRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFileActionPlan(fileRecord);
      }
    },

    deleteUploadedFileActionPlan: function (fileRecord) {
      this.uploadFileOjectActionPlanActionPlan = [];
      this.$refs.vueFileAgentActionPlan.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileActionPlanRecordsForUpload.length; i++) {
        this.uploadFileOjectActionPlan.push(
          this.fileActionPlanRecordsForUpload[i].file
        );
      }
      console.log(this.uploadFileOjectActionPlan);

      this.model.fileActionPlan = this.uploadFileOjectActionPlan;
    },

    filesSelectedActionPlan: function (fileRecordsNewlySelected) {
      this.uploadFileOjectActionPlan = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileActionPlanRecordsForUpload =
        this.fileActionPlanRecordsForUpload.concat(validFileRecords);

      var i;

      for (i = 0; i < this.fileActionPlanRecordsForUpload.length; i++) {
        this.uploadFileOjectActionPlan.push(
          this.fileActionPlanRecordsForUpload[i].file
        );
      }
      console.log(this.uploadFileOjectActionPlan);

      this.model.fileActionPlan = this.uploadFileOjectActionPlan;
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
