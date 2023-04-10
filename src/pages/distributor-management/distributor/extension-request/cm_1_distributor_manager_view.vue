<template>
  <va-card>
    <va-card>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        :filename="Date.now().toString()"
        :pdf-quality="2"
        :manual-pagination="false"
        :html-to-pdf-options="{margin:10}"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="700px"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
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
            :option="formOptions"
          >
          </vue-form-generator>
        </div>
        <div class="actions">
          <!-- <div class="ui cancel button">
            <button class="btn btn-danger">Cancel</button>
          </div> -->
          <div class="ui cancel button">
            <button class="btn btn-info" @click="onApprove()">
              Confirm
            </button>
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
        <div class="col-md-6">
          <template v-if="model.submissionDate !== null">
            Submission Date <br />
            {{ moment(model.submissionDate).format("DD MMM YYYY") }}
            <br><br>
            <template v-if="model.returnDateline !== null">
              Submit Before <br />
            {{ moment(model.returnDateline).format("DD MMM YYYY") }}
            </template>
          </template>
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
          <div class="col-md-12 mb-3">
            <label for="">Upload Document</label>
            <VueFileAgent
              theme="list"
              :readonly="true"
              :deletable="false"
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
              :deletable="false"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
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
        <!-- <hr /> -->

      </div>
        </section>
      </vue-html2pdf>
    </va-card>
    <va-card class="mt-3">
      Manager for Distributor Approval
        <!-- <form @submit.prevent="onApprove" enctype="multipart/form-data"> -->
          <vue-form-generator
            :model="managerApprovalModel"
            :schema="managerApprovalSchema"
            :options="formOptions"
          ></vue-form-generator>
          <div class="col-md-12 mb-3">
            <label for="">Upload Document</label>
            <VueFileAgent
              theme="list"
              ref="vueFileAgent"
              :readonly="true"
              :deletable="false"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              accept=".pdf"
              v-model="managerApprovalModel.file"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              @delete="fileDeleted($event)"
            ></VueFileAgent>
          </div>
          <div class="mt-5">
            <button
              @click="$router.push('extension-request')"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <!-- <div class="float-right">
              <div class="float-right">
                <template v-if="!user.hasOwnProperty('user_type')">
                  <button
                    type="button"
                    class="btn btn-info btn-fill btn-md mr-2"
                    @click="download"
                  >
                    <i class="fa fa-download" /> &nbsp; Download
                  </button>
                </template>
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
                  @click="managerApprovalModel.submissionStatus = 'Approved'"
                >
                  <i class="fa fa-paper-plane" /> &nbsp; Accept
                </button>
              </div>
            </div> -->
          </div>
        <!-- </form> -->
        <!-- <hr /> -->
        <!-- Comment from Registration Department
        <vue-form-generator
          :model="rdApprovalModel"
          :schema="rdApprovalSchema"
          :options="formOptions"
        ></vue-form-generator>
        <div class="col-md-12 mb-3" v-if="rdApprovalModel.file.length > 0">
          <label for="">Upload Document</label>
          <VueFileAgent
            theme="list"
            ref="vueFileAgent"
            :readonly="true"
            :deletable="false"
            :multiple="true"
            :linkable="true"
            :maxFiles="14"
            v-model="rdApprovalModel.file"
          ></VueFileAgent>
        </div> -->
    </va-card>
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
import VueHtml2pdf from 'vue-html2pdf'

Vue.use(VueFormGenerator);
Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
    VueHtml2pdf
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
            required: false,
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
          {
            type: "input",
            inputType: "text",
            disabled: true,
            required: false,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-8",
            visible: () => {
              if (this.model.type.toUpperCase() == "OTHERS") {
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
            required: false,
            validator: "st  ring",
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
            disabled: true,
            styleClasses: "col-md-3",
            view: "date",
          },
        ],
      },

      approverEndDateSchema: {
        fields: [
          {
            type: "vfg-date-forward-calendar",
            model: "dateline",
            labels: "",
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
        ],
      },
      rdApprovalSchema: {
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
        submissionStatus: null,
        returnDateline: null,
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
      rdApprovalModel: {
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
    download() {
      this.$refs.html2Pdf.generatePdf()
    },
    onApprove: async function () {
      let model = this.managerApprovalModel;
      let pass = true;

      if (
        this.user.hasOwnProperty("user_type") &&
        this.user.MANAGE_DEPARTMENT_NAME == "Registration" &&
        model.submissionStatus == "Returned to creator" &&
        this.approverEndDate.dateline == null
      ) {
        this.$modals.returnEndDate.show();
        return;
      }

      let data = {
        EXTENSION_REQUEST_ID: localStorage.getItem("RE_ID"),
        STATUS: model.submissionStatus,
        APPROVAL_REMARK: model.justification,
        FILE: model.file,
        CREATED_BY: this.user.user_id,
        IS_FIMM: this.user.hasOwnProperty("user_type") ? true : false,
        APPROVAL_LEVEL: this.user.USER_GROUP_NAME,
        APPROVAL_GROUP_ID: this.user.USER_GROUP_ID,
      };

      if(data.STATUS === "Returned to creator") {
        if(!confirm('Are you sure you want to return this entry?')) {
          pass = false;
        }
      }else if(data.STATUS === "Approved") {
        if(!confirm('Are you sure you want to approve this entry?')) {
          pass = false;
        }
      }else if(data.STATUS === 'Draft') {
        if(!confirm('Are you sure you want to save this form as draft?')) {
          pass = false;
        }
      }

      if(pass === true) {

        if (this.approverEndDate.dateline != null) {
          data.RETURN_DATELINE = this.approverEndDate.dateline.toISOString();
        }

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
        Vue.$toast.open({
          message: 'Success',
          type: 'success',
        });
        // console.log(res);
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
      this.model.returnDateline = response.RETURN_DATELINE;

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

      this.rdApprovalModel.justification = response.RD_APPROVAL.APPROVAL_REMARK;

      response.RD_APPROVAL.DOCUMENTS.forEach((element) => {
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
        this.rdApprovalModel.file = [...this.rdApprovalModel.file, data];
      });

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
      const response = await servicesModule1.deleteApprovalUploadedDocument(
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
