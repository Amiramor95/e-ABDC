<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Alert : Register New Case</h4>
      <br />
      <br />
    </div>
    <va-card>
      <div class="ml-3 col-md-12">
        Consultant Profile
        <span v-if="visibleProfile == false"
          >:
          <b
            >{{ CONSULTANT.CONSULTANT_NAME }} (
            {{ CONSULTANT.CONSULTANT_FIMM_NO }} )</b
          ></span
        >
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleProfile">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%">Consultant Name</td>
                <td>{{ consDetail.CONSULTANT_NAME }}</td>
              </tr>
              <tr>
                <td>NRIC Number</td>
                <td>{{ consDetail.CONSULTANT_NRIC }}</td>
              </tr>
              <tr>
                <td>FIMM Number</td>
                <td>{{ consDetail.CONSULTANT_FIMM_NO }}</td>
              </tr>

              <tr>
                <td>Passport Number</td>
                <td>{{ consDetail.CONSULTANT_PASSPORT_NO }}</td>
              </tr>
              <tr>
                <td>Citizenship</td>
                <td>{{ consDetail.CITIZEN}}</td>
              </tr>
              <tr>
                <td>Company Distributor</td>
                <td>{{ consDetail.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Consultant Type</td>
                <td>{{ consDetail.TYPE_FULL_NAME }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ consDetail.CONSULTANT_EMAIL }}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{{ consDetail.CONSULTANT_PHONENO }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ consDetail.STATUS }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-3">
        <vue-form-generator
          :model="model"
          :schema="registerNewCaseSchema"
          :options="formOptions"
          ref="registerNewCaseForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
      <br />
      <!-- file upload -->
      <div class="ml-1 col-md-11">
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="registerCase"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

//import "vue-form-generator/dist/vfg.css";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as services01Module0 from "../../../app/module0/services01";
import * as servicesModule2 from "../../../app/module2/services01";
import * as servicesModule3 from "../../../app/module3/services01";
import * as services06Module0 from "../../../app/module0/services06";
import moment from "moment";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);

export default {
  mounted() {
    var data = localStorage.getItem("consultantAlert-registerExistingRecord");
    this.CONSULTANT = JSON.parse(data);
    this.getAllClassification();
    this.getConsultantById();
    //alert(JSON.stringify(this.CONSULTANT));
  },
  components: {
    Vudal,
    HorizontalScroll,
  },

  methods: {
    getAllClassification: async function () {
      const response = await servicesModule3.getAllClassification();
      this.classificationList = response;
    },
    getConsultantById: async function () {
      const response = await servicesModule2.getConsultantById(
        this.CONSULTANT.CONSULTANT_ID
      );
      this.consDetail = response;
    },
    back() {
      this.$router.go(-1);
    }, // back button
    validatestatusForm() {
      return this.$refs.registerNewCaseForm.validate();
    },
    validateEntryForm() {
      return this.$refs.registerNewCaseForm.validate();
    },
    saveAsDraft: async function () {
    if (confirm("Are you sure you want to save as draft?")) {
      if (this.$refs.registerNewCaseForm.validate()) {
        const data = new FormData();
        data.append("CA_RECORD_ID", this.CONSULTANT.CA_RECORD_ID);
        this.model.startDate != null
          ? data.append(
              "CA_DATE_START",
              moment(this.model.startDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.endDate != null
          ? data.append(
              "CA_DATE_END",
              moment(this.model.endDate).format("YYYY-MM-DD")
            )
          : null;
        data.append(
          "CA_CLASSIFICATION",
          this.model.classification.SETTING_GENERAL_ID
        );
        data.append("CA_REASON", this.model.reason);
        data.append("CA_REMARK", this.model.remark);
        data.append("CA_PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        // alert(this.CONSULTANT.CA_RECORD_ID);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        // alert(this.model.file);
        try {
          const response = await servicesModule3.createExistingCase(data);
          localStorage.setItem(
            "consultantAlert-registerExistingRecord",
            JSON.stringify(data)
          );
          this.$router.push("/fimm/consultantAlert-overviewList");
        } catch (error) {
          console.log(error);
        }
      }
    }
    },
    registerCase: async function () {
    if (confirm("Are you sure you want to save this record?")) {
      if (this.$refs.registerNewCaseForm.validate()) {
        const data = new FormData();
        data.append("CA_RECORD_ID", this.CONSULTANT.CA_RECORD_ID);

        data.append("CONSULTANT_ID", this.CONSULTANT.CONSULTANT_ID);
        data.append("CONSULTANT_NAME", this.CONSULTANT.CONSULTANT_NAME);
        data.append("CONSULTANT_NRIC",this.CONSULTANT.CONSULTANT_NRIC);
        data.append("CONSULTANT_PASSPORT",this.CONSULTANT.CONSULTANT_PASSPORT_NO);

        this.model.startDate != null
          ? data.append(
              "CA_DATE_START",
              moment(this.model.startDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.endDate != null
          ? data.append(
              "CA_DATE_END",
              moment(this.model.endDate).format("YYYY-MM-DD")
            )
          : null;
        data.append(
          "CA_CLASSIFICATION",
          this.model.classification.SETTING_GENERAL_ID
        );
        data.append("CA_REASON", this.model.reason);
        data.append("CA_REMARK", this.model.remark);
        data.append("CA_PUBLISH_STATUS", "1");
        data.append("TS_ID", "15");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

         const approvalEntryLevel = await services06Module0.getApprovalLevel(6, 1);
        data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

        const approvalLevel = await services06Module0.getApprovalLevel(6, 2);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

          //notification
        data.append("NOTI_LOCATION", "consultantAlert-hodLraRecordList");
        var code = "";
        // if (this.CONSULTANT.CONSULTANT_NRIC != null) {
        //   code = this.CONSULTANT.CONSULTANT_NRIC;
        // }else if (this.CONSULTANT.CONSULTANT_PASSPORT_NO != null) {
        //   code = this.CONSULTANT.CONSULTANT_PASSPORT_NO;
        // }

        code = this.CONSULTANT.CONSULTANT_NAME;
        var remarkEntry = "(CA)New entry pending verification for " + code;

        data.append("NOTI_REMARK", remarkEntry);

        var notiTitle ="New entry pending verification";
        data.append("NOTI_TITLE", notiTitle);
        data.append("CA_COMMENT", "-");

        try {
          //alert(JSON.parse(data));
         const response = await servicesModule3.createExistingCase(data);
          localStorage.setItem("consultantAlert-consultantCaRecord",JSON.stringify(data));
          //this.$router.push("/fimm/consultantAlert-consultantCaRecord");
          this.$router.push('/fimm/consultantAlert-overviewList')
        } catch (error) {
          console.log(error);
        }
      }
    }
    },
    onModelUpdated(newVal, schema) {

       if(schema == 'startDate'){
        if (newVal != null || newVal != "" ){

          if(this.model.classification.SETTING_GENERAL_ID == 263 || this.model.classification.SETTING_GENERAL_ID == 269 || this.model.classification.SETTING_GENERAL_ID == 268){

           this.model.endDate = moment('01/12/9999').format("YYYY-MM-DD");
          }else{
            this.model.endDate= null;
          }
        }
      }

       if(schema == 'classification'){
            this.model.startDate= null;
            this.model.endDate= null;

      }

    },
      //Validation
    validateEndDate(value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
    },
    validateStartDate(value) {


      if (this.model.endDate != null){

      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
      }
    },
  },

  computed: {},

  data() {
    return {
      classificationList: [],
      uploadFileOject: [],
      visibleProfile: false,
      startDate: null,
      endDate: null,
      CONSULTANT: "",
      consDetail: "",


      model: {
        classification: "",
        startDate: null,
        endDate: null,
        reason: "",
        remark: "",
        file: [],
      },

      registerNewCaseSchema: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "classification",
            label: "Classification",
            placeholder: "Select Classification",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.classificationList;
            },
            styleClasses: "col-md-6",
            required: true,
            validator: "required",
          },
          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Start Date",
            styleClasses: "col-md-3",
            validator: ["required", this.validateStartDate],
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "End Date",
            styleClasses: "col-md-3",

            validator: ["required", this.validateEndDate],
          },
          {
            type: "textArea",

            model: "reason",
            label: "Reason",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Reason",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
          },

          {
            type: "textArea",
            model: "remark",
            label: "Remark",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
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
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: false,
                hint:"Maximum uploaded file size is 5MB. Accepted format : (.PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX)",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
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
