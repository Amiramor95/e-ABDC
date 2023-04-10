<template>
  <va-card>
    <va-card>
      <div class="row">
        <div class="card-title" slot="header">
          <h4>Time Extension Request</h4>
        </div>
      </div>
      <div class="my-3">
        <div class="row">
          <div class="col-md-6">
            <vue-form-generator
              :model="model"
              :schema="schema"
              :option="formOptions"
            ></vue-form-generator>
          </div>
          <div class="col-md-6" v-if="model.submissionDate != null">
            Submission Date <br>
            {{moment(model.submissionDate).format('DD MMM YYYY')}}
          </div>
          <div class="col-md-12">
            <vue-form-generator
              :model="model"
              :schema="justificationSchema"
              :option="formOptions"
            ></vue-form-generator>
          </div>
          Supporting Documents
          <div class="col-md-12 mt-3">
            <VueFileAgent
                theme="list"
                :readonly="true"
                :multiple="true"
                :linkable="true"
                :maxFiles="14"
                v-model="model.file"
              ></VueFileAgent>
          </div>
          <div class="col-md-12 mt-4" v-if="model.type.toUpperCase() == 'COMMENCEMENT OF OPERATION'">
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
        </div>
      </div>
    </va-card>
    <va-card class="mt-3">
      <div class="row mb-3">
        Approver Remark
      </div>
      <div class="row">
        <div class="col-md-12">
          <vue-form-generator
            :model="approverModel"
            :schema="approverJustificationSchema"
            :option="formOptions"
          ></vue-form-generator>
        </div>
        <div class="col-md-12">
          <VueFileAgent
              theme="list"
              :readonly="true"
              :multiple="true"
              :linkable="true"
              :maxFiles="14"
              v-model="approverModel.file"
            ></VueFileAgent>
        </div>
      </div>
    </va-card>
    <div class="mt-5">
      <button @click="$router.back()" type="button" class="btn btn-primary btn-fill btn-md">
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Vue from "vue";
import moment from "moment";
import * as servicesModule1 from "../../../../app/module1/services07";
Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      isManager: JSON.parse(localStorage.getItem('user')).hasOwnProperty('user_type'),
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
          {
            type: "input",
            inputType: "text",
            disabled: function() {
              return this.$route.params.action == 'update' ? true : false;
            },
            required: false,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-3",
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
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase();
            },
          },
        ],
      },
      approverJustificationSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Remark / Comments",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Justification",
            disabled: true,
            required: false,
            validator: "string",
            styleClasses: "col-md-12",
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
        submissionDate: null
      },
      approverModel: {
        justification: null,
        file: []
      },
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
  methods: {
    moment,
    getById: async function() {
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
      this.model.justification = response.JUSTIFICATION;
      this.model.extensionDate = response.EXTENSION_END_DATE;
      this.model.dateCreated = response.DATE_CREATED;
      this.model.submissionDate = response.SUBMISSION_DATE;

      let approval = 'manager';

      if(!this.isManager) {
        switch(this.user.USER_GROUP_ID) {
          case 4:
            approval = 'rd'
          break;
          case 2:
            approval = 'rd-hod'
          break;
          case 3:
            approval = 'gm'
          break;
          case 1:
            approval = 'ceo'
          break;
        }
      }

      let relation = `${approval}_approval`;


      let item = response[relation.toUpperCase().replaceAll('-', '_')];
      this.approverModel.justification = item.APPROVAL_REMARK;
      this.fileParser2(item.DOCUMENTS, this.approverModel.file);

      this.fileParser(response.DOCUMENTS);
    },

    fileParser(items) {
      items.forEach((element) => {
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

    fileParser2(items, variable) {
      items.forEach((element) => {
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
          variable = [...variable, data];
        } else {
          variable = [...variable, data];
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
  created() {
    this.getById();
  }
}
</script>
