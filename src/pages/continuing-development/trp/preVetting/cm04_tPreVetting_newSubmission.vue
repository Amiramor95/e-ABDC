<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Pre-Vetting : New Program Application
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
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
      <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card v-if="showDetailsForm">
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
    </div>
    <br />
    <va-card v-if="showDetailsForm">
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
          <va-card>
            <vue-form-generator
              :model="model"
              :schema="editSloSchema"
              :options="formOptions"
              @model-updated="onModelUpdated"
            />
            <br />

            <div class="float-right">
              <button
                @click="reset"
                type="button"
                class="mr-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-refresh" /> &nbsp; Reset
              </button>
              <button
                @click="saveSlo"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-save" /> &nbsp; Save
              </button>
            </div>
          </va-card>
          <br />
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
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                 <span
                   v-b-tooltip.hover
                   title="edit record"
                   v-on:click="editSlo(props.rowData,props.rowIndex)"
                   class="badge badge-primary mr-2"
                 >
                  <i class="fa fa-edit"></i
                  ></span>
                <span
                  v-b-tooltip.hover
                  title="detail"
                  v-on:click="removeSlo(props,props.rowIndex)"
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
  <div v-if="dataActionReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <div class="float-right">
        <button
          v-if="showDetailsForm"
          @click="saveAsDraft"
          type="button"
          class="mr-2 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <button
          v-if="showDetailsForm"
          @click="submit"
          type="button"
          class="ml-1 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Submit
        </button>
      </div>
    </div>
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
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

    this.getAllMethod();
    this.getAllMedia();
    this.getAllAssessment();


    this.getAllDeliveryMode();
    this.getAllProgramType();
    this.checkRunNo();
  },
  components: {},
  methods: {

    getTotalHours(){
      let total=0;
      this.sloList.map((i)=>{
        total+=parseInt(i.HOURS);
        this.model.hours=parseInt(total);
      })
    },


    getAllMethod: async function () {
      const response = await servicesModule4.getAllMethod();
      this.methodList = response;
    },
    getAllMedia: async function () {
      const response = await servicesModule4.getAllMedia();
      this.mediaList = response;
    },
    getAllAssessment: async function () {
      const response = await servicesModule4.getAllAssessment();
      this.assessmentList = response;
    },


    onModelUpdated(newVal, schema) {
      if (schema == "title") {
        this.model.title = String(newVal).toUpperCase();
      }
      if (schema == "target") {
        this.model.target = String(newVal).toUpperCase();
      }
      if (schema == "outcome") {
        this.model.outcome = String(newVal).toUpperCase();
      }
      if (schema == "venue") {
        this.model.venue = String(newVal).toUpperCase();
      }

    },
    checkRunNo: async function () {

      const response = await servicesModule4.checkTrpRunNo(JSON.parse(localStorage.getItem("user")).TP_COMP_ID);
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
    validateEndDate(value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
    },
    validateStartDate(value) {
      if (this.model.startDate != null) {
        if (moment(this.model.startDate).isSameOrAfter(moment(), "day")) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        }
      }
      if (this.model.endDate != null) {
        if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        } // true
      }
    },

    validateHours(value) {

      const expression1 = /^[-+]?[0-9]+\.[0-9]+$/;
      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        return ["Decimal only"];
      }
    },

    back() {
      this.$router.go(-1);
    }, // back button

    saveAsDraft: async function () {
        if (confirm("Are you sure you want to save this as draft?")) {
        this.dataActionReady = true;
      //upload
      const data = new FormData();
      data.append("VENUE", this.model.venue);
      data.append("PROGRAM_TITLE", this.model.title);
      data.append("DELIVERY_MODE", this.model.deliveryMode.TR_MODE_ID);
      data.append("PROGRAM_TYPE", this.model.programType.TR_PROGRAM_TYPE_ID);
          const resMaxPoint = await servicesModule4.getMaxPoint(
            this.model.deliveryMode.TR_MODE_ID
          );

          if (this.model.hours > resMaxPoint.MAX_POINT) {
            data.append("POINT", resMaxPoint.MAX_POINT);
          } else {
            data.append("POINT", this.model.hours);
          }

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

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", JSON.parse(localStorage.getItem("user")).TP_COMP_ID);
      data.append("PROG_TYPE", 2);
      data.append("CATEGORY", 3);
      data.append("SLOLIST", JSON.stringify(this.sloList));
      data.append("PUBLISH_STATUS", 0);
      data.append("TS_ID", "1");
      data.append("DRAFT_STATUS", 1);
      data.append("PROG_DETAILS_REPEAT", 0);
      data.append("TS_ID", "1");

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
         this.dataActionReady = false;
      } catch (error) {
        console.log(error);
      }
        }
    },
    //SUBMIT NEW CASE
    submit: async function () {
       if (confirm("Are you sure you want to submit this entry?")) {
        this.dataActionReady = true;
      //upload
      const data = new FormData();
      data.append("VENUE", this.model.venue);
      data.append("PROGRAM_TITLE", this.model.title);
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
         const resMaxPoint = await servicesModule4.getMaxPoint(
           this.model.deliveryMode.TR_MODE_ID
         );

         if (this.model.hours > resMaxPoint.MAX_POINT) {
           data.append("POINT", resMaxPoint.MAX_POINT);
         } else {
           data.append("POINT", this.model.hours);
         }


         data.append("TARGET_PARTICIPANT", this.model.target);
      data.append("LEARNING_OUTCOME", this.model.outcome);

      const user = JSON.parse(localStorage.getItem("user")).user_id;

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", JSON.parse(localStorage.getItem("user")).TP_COMP_ID);
      data.append("PROG_TYPE", 2);
      data.append("CATEGORY", 3);

      data.append("SLOLIST", JSON.stringify(this.sloList));
      data.append("PUBLISH_STATUS", 1);
      data.append("TS_ID", "15");
      data.append("PROG_DETAILS_REPEAT", 0);
      const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
      data.append("APPR_LIST1", JSON.stringify(approvalLevel));

      const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
      data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

      var yr = new Date().getFullYear().toString().substr(2, 2);
      data.append("YEAR", yr);

      //notification
      data.append("NOTI_LOCATION", "approvalPreVettingFrpList");
      var code = "";
      var remarkEntry = "(CPD-PRE)New entry pending approval";

      data.append("NOTI_REMARK", remarkEntry);

      //File upload
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append("file[]", this.model.file[i]);
        }
      }

      try {
        const response = await servicesModule4.createNewPostVet(data);
        this.$router.go(-1);
        this.dataActionReady = false;
      } catch (error) {
        console.log(error);
      }
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

    async editSlo(data,rowID) {
      console.log(JSON.stringify(data),rowID);

      var method_name=null;
      this.methodList.forEach((x)=>{
        if(x.METHOD==data.METHOD){
          method_name=x.LS_METHOD_NAME.toString();
        }

      }),
        this.model.sloMethod = {
          METHOD: data.METHOD,
          LS_METHOD_NAME:method_name
        };

      var media_name=null;
      this.mediaList.forEach((x)=>{
        if(x.MEDIA==data.MEDIA){
          media_name=x.LS_MEDIA_NAME.toString();
        }
      }),

        this.model.sloMedia = {
          MEDIA: data.MEDIA,
          LS_MEDIA_NAME: media_name,
        };

      var assessment_name=null;
      this.assessmentList.forEach((x)=>{
        if(x.ASSESSMENT==data.ASSESSMENT){
          assessment_name=x.LS_ASSESSMENT_NAME.toString();
        }

      }),
        this.model.sloAssessment = {
          ASSESSMENT: data.ASSESSMENT,
          LS_ASSESSMENT_NAME:assessment_name
        };


      this.model.sloSpeaker = data.SPEAKER;
      // this.model.sloID = data.PROG_SLO_ID;
      this.model.sloID = rowID;

      this.model.sloTitle = data.SUB_LEARNING_OBJECTIVE;
      this.model.sloTopic = data.TOPIC;
      this.model.sloHours = data.HOURS;

    },

    async reset() {
      this.model.sloSpeaker = "";
      this.model.sloID = "";

      this.model.sloTitle = "";
      this.model.sloTopic = "";
      this.model.sloHours = "";
      this.model.sloMethod = "";
      this.model.sloMedia = "";
      this.model.sloAssessment = "";
    },

    async saveSlo() {
      const sloID=this.model.sloID;

      const currentSlo=this.sloList[sloID];
      console.log(this.sloList);
      const updateSlo={
        LS_ASSESSMENT_NAME:this.model.sloAssessment.LS_ASSESSMENT_NAME,
        ASSESSMENT:this.model.sloAssessment.ASSESSMENT,
        HOURS: this.model.sloHours,
        LS_MEDIA_NAME: this.model.sloMedia.LS_MEDIA_NAME,
        MEDIA: this.model.sloMedia.MEDIA,
        LS_METHOD_NAME: this.model.sloMethod.LS_METHOD_NAME,
        METHOD: this.model.sloMethod.METHOD,
        SPEAKER: this.model.sloSpeaker,
        SUB_LEARNING_OBJECTIVE: this.model.sloTitle,
        TOPIC: this.model.sloTopic
      };


      if(this.model.sloAssessment.LS_ASSESSMENT_NAME =='' || this.model.sloAssessment.ASSESSMENT == '' || this.model.sloHours == '' ||  this.model.sloMedia.LS_MEDIA_NAME == '' || this.model.sloMedia.MEDIA == ''
        ||  this.model.sloMethod.LS_METHOD_NAME == '' || this.model.sloMethod.METHOD == '' || this.model.sloSpeaker == '' || this.model.sloTitle == '' || this.model.sloTopic == '')
      {
        alert('Fill up the required fields');

      }
      else{
        if (this.model.sloID === "") {
          this.sloList.push(updateSlo);
        } else {
          this.sloList.splice(sloID,1,updateSlo);
        }

        //total hours update here
        this.getTotalHours();
      }

    },


    removeSlo(data,rowId) {
      if (confirm("Are you sure you want to delete this entry?")) {
        this.sloList.splice(rowId, 1);
        this.getTotalHours();

        this.resetSloData();
      }
    },


    removeParticipant(data) {
      this.participantList.splice(data.rowIndex, 1);
    },

    async upload() {
       this.dataUploadReady = true;
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

        if (content[1][0] != "") {
          this.model.startDate = moment(content[1][0].START_DATE).format(
            "YYYY-MM-DD"
          );
          this.model.endDate = moment(content[1][0].END_DATE).format(
            "YYYY-MM-DD"
          );

          this.model.venue = content[1][0].VENUE;
          this.model.title = content[1][0].PROGRAM_TITLE;
          this.model.deliveryMode = {
            TR_MODE_ID: content[1][0].DELIVERY_MODE,
            TR_MODE_NAME: content[1][0].MODE_DESCRIPTION,
          };
          this.model.programType = {
            TR_PROGRAM_TYPE_ID: content[1][0].PROGRAM_TYPE,
            TR_PROGRAM_TYPE_NAME: content[1][0].TYPE_DESCRIPTION,
          };
          this.model.hours = content[1][0].TOTAL_HOURS;
          this.model.target = content[1][0].TARGET_PARTICIPANT;
          this.model.outcome = content[1][0].LEARNING_OUTCOME;
        }

        content[2].forEach((x)=>{

          console.log('test',x);

          if(x.METHOD !=null){
            var methodName=null;
            this.methodList.forEach((name)=>{
              if(name.METHOD===x.METHOD){
                methodName=name.LS_METHOD_NAME;
              }

            }),
              x['LS_METHOD_NAME']=methodName;
          }
          if(x.MEDIA !=null){
            var mediaName=null;
            this.mediaList.forEach((name1)=>{
              if(name1.MEDIA===x.MEDIA){
                mediaName=name1.LS_MEDIA_NAME;
              }

            }),
              x['LS_MEDIA_NAME']=mediaName;
          }

          if(x.ASSESSMENT !=null){
            var assessmentName=null;
            this.assessmentList.forEach((name2)=>{
              if(name2.ASSESSMENT===x.ASSESSMENT){
                assessmentName=name2.LS_ASSESSMENT_NAME;
              }

            }),
              x['LS_ASSESSMENT_NAME']=assessmentName;
          }
        });



        const response1 = await servicesModule4.getSlo(
          JSON.stringify(content[2])
        );
        this.sloList = response1.successData;


        this.SloRecordCount = this.sloList.length;

          if (this.model.hours != response1.totalHours) {
          if (confirm("Total Hours entered is not matched with total hours in SLO. System will auto update the field total hours.")) {
           this.model.hours = response1.totalHours.toFixed(1);
          }
        }

      }.bind(this);
      fileReader.readAsBinaryString(files);

       this.dataUploadReady = false;
      this.showDetailsForm = true;
    },


  },
  computed: {
    SloFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
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
          name: "LS_METHOD_NAME",
          title: "METHOD",
        },
        {
          name: "LS_MEDIA_NAME",
          title: "MEDIA",
        },
        {
          name: "LS_ASSESSMENT_NAME",
          title: "ASSESSMENT",
        },
        {
          name: "SPEAKER",
          title: "SPEAKER",
        },
        {
          name: "HOURS",
          title: "HOURS",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "5%",
        },
      ];
    },
    SloFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.sloList;
      }
    },
  },
  data() {
    return {
        dataActionReady: false,
      visibleProgram: true,
      visibleSlo: true,
      visibleExcel: true,
      showDetailsForm: false,
      dataUploadReady: false,

      methodList: [],
      mediaList: [],
      assessmentList: [],

      deliveryModeList: [],
      programTypeList: [],
      fileRecordsForUpload: [],
      uploadFileObject: [],
      fileRecords: [],
      sloList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,

      model: {
        deliveryMode: "",
        programType: "",
        title: "",
        startDate: null,
        endDate: null,
        target: "",
        outcome: "",
        venue: "",
        hours: "",
        fileUpload: "",
        file: [],

        sloTitle: "",
        sloTopic: "",
        sloHours: "0",
        sloMethod: "",
        sloMedia: "",
        sloAssessment: "",
        sloSpeaker: "",
        sloID: "",
        sloProgDetailsID: "",
      },

      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "title",
            label: "Program Title",
            placeholder: "Enter Program Title",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Proposed Start Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateStartDate],
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "Proposed End Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateEndDate],
          },

          {
            type: "input",
            inputType: "text",
            model: "hours",
            label: "Total Hours",
            placeholder: "1.0",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateHours],
          },
          {
            type: "input",
            inputType: "text",
            model: "venue",
            label: "Venue",
            placeholder: "Enter Venue",
            styleClasses: "col-md-6",
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
            required: true,
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
                labels: "Upload Speaker Profile and Program Brochure",
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
      editSloSchema: {
        fields: [
          {
            type: "textArea",
            inputType: "text",
            model: "sloTitle",
            label: "Sub Learning Objective",
            placeholder: "Enter Sub Learning Objective",
            styleClasses: "col-md-6",
            rows: 3,
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "textArea",
            inputType: "text",
            model: "sloTopic",
            label: "Topic",
            rows: 3,
            placeholder: "Enter Topic",
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "input",
            inputType: "text",
            model: "sloHours",
            label: "Total Hours",
            placeholder: "Enter Total Hours",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },

          {
            type: "vueMultiSelect",
            model: "sloMethod",
            label: "Method",
            placeholder: "Select Method",
            selectOptions: {
              multiple: false,
              key: "METHOD",
              label: "LS_METHOD_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.methodList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "vueMultiSelect",
            model: "sloMedia",
            label: "Media",
            placeholder: "Select Media",
            selectOptions: {
              multiple: false,
              key: "LS_MEDIA_ID",
              label: "LS_MEDIA_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.mediaList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "vueMultiSelect",
            model: "sloAssessment",
            label: "Assessment",
            placeholder: "Select Assessment",
            selectOptions: {
              multiple: false,
              key: "LS_ASSESSMENT_ID",
              label: "LS_ASSESSMENT_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.assessmentList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "input",
            inputType: "text",
            model: "sloSpeaker",
            label: "Speaker",
            placeholder: "Enter Speaker",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "input",
            inputType: "hidden",
            model: "sloID",
            placeholder: "EnterID",
            styleClasses: "col-md-6",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "sloProgDetailsID",
            placeholder: "EnterID",
            styleClasses: "col-md-6",
          },
        ],
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
