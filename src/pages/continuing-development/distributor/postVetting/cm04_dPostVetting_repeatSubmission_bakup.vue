<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Post-Vetting : Repeat Program Application
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Upload by Excel
        <button type="button" class="btn-fill btn-md">
          <i class="fa fa-download"></i>
        </button>
        <hr />
        <div class="ml-1 col-md-11">
          <div id="app">
            <VueFileAgent
              ref="vueFileAgent"
              :theme="'list'"
              :multiple="false"
              :deletable="true"
              :meta="true"
              :linkable="true"
              :accept="'.xlsx'"
              :maxSize="'2MB'"
              :helpText="'Choose document'"
              :errorText="{
                type: 'Invalid file type. Only .xlsx is Allowed',
                size: 'Files should not exceed 2MB in size',
              }"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              v-model="fileRecords"
            ></VueFileAgent>
          </div>
        </div>
        <div class="ml-3 col-md-5">
          <span class="color"
            >Note : Please confirm your uploaded data by clicking submit button
            below.</span
          >
        </div>
        <div class="float-right">
          <button
            @click="upload"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Upload
          </button>
        </div>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Program Details
        <button
          v-if="visibleProgram == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProgram == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleProgram">
          <div class="ml-2">
            <vue-form-generator
              :model="model"
              :schema="registerNewSchema"
              :options="formOptions"
              ref="registerNewForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
          </div>
          <br />
          <div class="ml-1 col-md-11">
            <vue-form-generator
              :model="model"
              :schema="fileUploadSchema"
              :options="formOptions"
              ref="fileUploadForm"
            >
            </vue-form-generator>
          </div>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Sub-Learning Objectives
        <button
          v-if="visibleProgram == true"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProgram == false"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-2" class="mt-2" v-model="visibleSlo">
          <br />
          <va-data-table
            :fields="SloFields"
            :data="SloFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="SloRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="detail"
                  v-on:click="removeSlo(props)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-minus"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
          <br />
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        List Of Participants
        <button
          v-if="visibleParticipant == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleParticipant == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-3" class="mt-2" v-model="visibleParticipant">
          <br />
          <va-data-table
            :fields="ParticipantFields"
            :data="ParticipantFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="ParticipantRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="detail"
                  v-on:click="removeParticipant(props)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-minus"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
          <br />
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Feedback
        <button
          v-if="visibleFeedback == true"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleFeedback == false"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-4" class="mt-2" v-model="visibleFeedback">
          <br />
          <va-data-table
            :fields="FeedbackFields"
            :data="FeedbackFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="FeedbackRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
          </va-data-table>
          <br />
        </b-collapse>
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
        @click="submit"
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
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
import XLSX from "xlsx";

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
  props: {},
  mounted() {
    var data = localStorage.getItem("d-postVettingRepeatSubmission");
    this.PROGDATA = JSON.parse(data);
    //alert(JSON.stringify(this.PROGDATA));
    this.model.title=this.PROGDATA.PROG_TITLE;
    this.model.code=this.PROGDATA.PROG_CODE;
    this.model.target=this.PROGDATA.PROG_TARGET;
    this.getAllDeliveryMode();
    this.getAllProgramType();
    this.checkRunNo();
  },
  components: {},
  methods: {
    onModelUpdated(newVal, schema) {
      if (schema == "venue") {
        this.model.venue = String(newVal).toUpperCase();
      }
      if (schema == "target") {
        this.model.target = String(newVal).toUpperCase();
      }
      if (schema == "outcome") {
        this.model.outcome = String(newVal).toUpperCase();
      }
    },
    checkRunNo: async function () {
        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);
        const response = await servicesModule4.checkRunNo(res.USER_DIST_ID);
    },
    getAllDeliveryMode: async function () {
      const response = await servicesModule4.getAllDeliveryMode();
      this.deliveryModeList = response;
    },
    getAllProgramType: async function () {
      const response = await servicesModule4.getAllProgramType();
      this.programTypeList = response;
    },

    //Validation
    validateDate(value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
    },

    back() {
      this.$router.go(-1);
    }, // back button

    saveAsDraft: async function () {
      //upload
      const data = new FormData();
      data.append("VENUE", this.model.venue);
     // data.append("PROGRAM_TITLE", this.model.title);
      data.append("DELIVERY_MODE", this.model.deliveryMode.TR_MODE_ID);
      data.append("PROGRAM_TYPE", this.model.programType.TR_PROGRAM_TYPE_ID);
      this.model.startDate != null
        ? data.append(
            "START_DATE",
            moment(this.model.startDate).format("YYYY-MM-DD")
          )
        : null;
      this.model.endDate != null
        ? data.append(
            "END_DATE",
            moment(this.model.endDate).format("YYYY-MM-DD")
          )
        : null;
      data.append("TOTAL_HOURS", this.model.hours);
      //data.append("TARGET_PARTICIPANT", this.model.target);
      data.append("LEARNING_OUTCOME", this.model.outcome);

      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", res.USER_DIST_ID);
      data.append("PROG_TYPE", 1);
      data.append("CATEGORY", 2);

      data.append("SLOLIST", JSON.stringify(this.sloList));
      data.append("PARTLIST", JSON.stringify(this.participantList));
      data.append("FBLIST", JSON.stringify(this.feedbackList));
      data.append("PUBLISH_STATUS", 0);
      data.append("TS_ID", "1");
      data.append("PROG_DETAILS_REPEAT", 1);
      data.append("PROGRAM_ID",this.PROGDATA.PROGRAM_ID);

      var yr = new Date().getFullYear().toString().substr(2, 2);
      data.append("YEAR", yr);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

      try {

          const response = await servicesModule4.createNewPostVet(data);
          this.$router.go(-1);

        } catch (error) {
          console.log(error);
        }

    },
//SUBMIT NEW CASE
    submit: async function () {
      //upload
      const data = new FormData();
      data.append("VENUE", this.model.venue);
      //data.append("PROGRAM_TITLE", this.model.title);
      data.append("DELIVERY_MODE", this.model.deliveryMode.TR_MODE_ID);
      data.append("PROGRAM_TYPE", this.model.programType.TR_PROGRAM_TYPE_ID);
      this.model.startDate != null
        ? data.append(
            "START_DATE",
            moment(this.model.startDate).format("YYYY-MM-DD")
          )
        : null;
      this.model.endDate != null
        ? data.append(
            "END_DATE",
            moment(this.model.endDate).format("YYYY-MM-DD")
          )
        : null;
      data.append("TOTAL_HOURS", this.model.hours);
      data.append("TARGET_PARTICIPANT", this.model.target);
      data.append("LEARNING_OUTCOME", this.model.outcome);

      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", res.USER_DIST_ID);
      data.append("PROG_TYPE", 1);
      data.append("CATEGORY", 2);

      data.append("SLOLIST", JSON.stringify(this.sloList));
      data.append("PARTLIST", JSON.stringify(this.participantList));
      data.append("FBLIST", JSON.stringify(this.feedbackList));
      data.append("PUBLISH_STATUS", 1);
      data.append("TS_ID", "15");
      data.append("PROG_DETAILS_REPEAT", 1);
      data.append("PROGRAM_ID",this.PROGDATA.PROGRAM_ID );
      const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));

      var yr = new Date().getFullYear().toString().substr(2, 2);
      data.append("YEAR", yr);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        

       try {
          const response = await servicesModule4.createNewPostVet(data);
          this.$router.go(-1);
          
        } catch (error) {
          console.log(error);
        }
    },


    filesSelected: function (fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      console.log(fileRecordsNewlySelected);
      this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },
    onBeforeDelete: function (fileRecord) {
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

        this.value = this.uploadFileOject;
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
      }
    },

    fileDeleted: function (fileRecord) {
      console.log("file delete");
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

    removeSlo(data) {
      this.sloList.splice(data.rowIndex, 1);
    },
    removeParticipant(data) {
      this.participantList.splice(data.rowIndex, 1);
    },

    async upload() {
      var content = [];
      const files = this.uploadFileObject;
      const fileReader = new FileReader(); // construction function that can read the file content
      var vm = this;
      fileReader.onload = async function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary", // binary
          cellDates: true,
        });
        console.log(workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
          const wsname = workbook.SheetNames[i]; //take the first sheet
          console.log("wsname");
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
          content.push(ws);
        }
        console.log(JSON.stringify(content[1]));
        console.log(JSON.stringify(content[2]));
        console.log(JSON.stringify(content[3]));

        if (content[1][0] != "") {
          this.model.startDate = moment(content[1][0].START_DATE).format(
            "YYYY-MM-DD"
          );
          this.model.endDate = moment(content[1][0].END_DATE).format(
            "YYYY-MM-DD"
          );

          this.model.venue = content[1][0].VENUE;
         // this.model.title = content[1][0].PROGRAM_TITLE;
          this.model.deliveryMode = {
            TR_MODE_ID: content[1][0].DELIVERY_MODE,
            TR_MODE_NAME: content[1][0].MODE_DESCRIPTION,
          };
          this.model.programType = {
            TR_PROGRAM_TYPE_ID: content[1][0].PROGRAM_TYPE,
            TR_PROGRAM_TYPE_NAME: content[1][0].TYPE_DESCRIPTION,
          };
          this.model.hours = content[1][0].TOTAL_HOURS;
          //this.model.target = content[1][0].TARGET_PARTICIPANT;
          this.model.outcome = content[1][0].LEARNING_OUTCOME;
        }

        const response1 = await servicesModule4.getSlo(
          JSON.stringify(content[2])
        );
        this.sloList = response1.successData;
        this.SloRecordCount = this.sloList.length;

        const response2 = await servicesModule4.getParticipant(
          JSON.stringify(content[3])
        );
        this.participantList = response2.participantData;
        this.participantRecordCount = this.participantList.length;

        const response3 = await servicesModule4.getFeedback(
          JSON.stringify(content[4])
        );
        this.feedbackList = response3.feedbackData;
        this.feedbackRecordCount = this.feedbackList.length;
      }.bind(this);
      fileReader.readAsBinaryString(files);
    },
  },
  computed: {
    SloFields() {
      return [
        {
          name: "HOURS",
          title: "HOURS",
          width: "10%",
        },
        {
          name: "SUB_LEARNING_OBJECTIVE",
          title: "SUB_LEARNING_OBJECTIVE",
        },
        {
          name: "TOPIC",
          title: "TOPIC",
        },
        {
          name: "METHOD",
          title: "METHOD",
        },
        {
          name: "MEDIA",
          title: "MEDIA",
        },
        {
          name: "ASSESSMENT",
          title: "ASSESSMENT",
        },
        {
          name: "SPEAKER",
          title: "SPEAKER",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    SloFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.sloList;
      }
    },
    ParticipantFields() {
      return [
        {
          name: "NAME",
          title: "NAME",
        },
        {
          name: "NRIC_NUMBER",
          title: "NRIC_NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT_NUMBER",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    ParticipantFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.participantList;
      }
    },
    FeedbackFields() {
      return [
        {
          name: "ITEM",
          title: "ITEM",
        },
        {
          name: "RATING",
          title: "RATING",
        },
      ];
    },
    FeedbackFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.feedbackList;
      }
    },
  },
  data() {
    return {
      visibleProgram: true,
      visibleSlo: false,
      visibleParticipant: false,
      visibleFeedback: false,
      visibleExcel: true,

      deliveryModeList: [],
      programTypeList: [],
      fileRecordsForUpload: [],
      uploadFileObject: [],
      fileRecords: [],
      sloList: [],
      participantList: [],
      feedbackList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
      ParticipantRecordCount: null,
      FeedbackRecordCount: null,

      model: {
        deliveryMode: "",
        programType: "",
        title: "",
        startDate: null,
        endDate: null,
        target: "",
        outcome: "",
        venue: "",
        hours: "1",
        fileUpload: "",
        file: [],
        code:"",
      },

      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "code",
            label: "CPD Code",
            placeholder: "Enter Cpd Code",
            styleClasses: "col-md-3",
            disabled:true,
            
          },
          {
            type: "input",
            inputType: "text",
            model: "title",
            label: "Program Title",
            placeholder: "Enter Program Title",
            styleClasses: "col-md-9",
             disabled:true,
           
          },
          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Start Date",
            styleClasses: "col-md-3",
            required: true,
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "End Date",
            styleClasses: "col-md-3",
            required: true,
            validator: ["required", this.validateDate],
          },

          {
            type: "input",
            inputType: "text",
            model: "hours",
            label: "Total Hours",
            placeholder: "Enter Total Hours",
            styleClasses: "col-md-3",
            required: true,
          },
          {
            type: "input",
            inputType: "text",
            model: "venue",
            label: "Venue",
            placeholder: "Enter Venue",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "vueMultiSelect",
            model: "deliveryMode",
            label: "Mode of Delivery",
            placeholder: "Select Mode of Delivery",
            selectOptions: {
              multiple: false,
              key: "TR_MODE_ID",
              label: "TR_MODE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.deliveryModeList;
            },
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "vueMultiSelect",
            model: "programType",
            label: "Type of Program",
            placeholder: "Select Type of Program",
            selectOptions: {
              multiple: false,
              key: "TR_PROGRAM_TYPE_ID",
              label: "TR_PROGRAM_TYPE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.programTypeList;
            },
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "textArea",

            model: "target",
            label: "Target Participant",
            hint: "Max 250 characters",
            max: 250,
             placeholder: "Enter Target Participant ( E.g : Unit Trust Consultant,Private Retirement Scheme Consultant,Remisiers,CMSRL License Holders, Fund Manager, Bankers,Financial Planners, Investment Advisers, Other related target participants)",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-6",
            disabled:true,
          },

          {
            type: "textArea",
            model: "outcome",
            label: "Learning Outcome",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Learning Outcome",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-6",
            required: true,
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
.color {
  color: red;
}
</style>
