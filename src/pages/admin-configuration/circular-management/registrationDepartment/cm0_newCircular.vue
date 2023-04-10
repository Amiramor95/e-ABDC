<template>
  <va-card>
    <loder v-show="isLoader" />
    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else >
  
      <h4 slot="header" class="card-title">
        Create New Circular
      </h4>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Title <span class="text-danger"> * </span> :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <input
            type="text"
            v-model="model.EVENT_TITLE"
            class="form-control form-control-md"
          />
          <!-- </div> -->
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Content <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div id="app" class="col-md-9">
          <vue-editor v-model="model.EVENT_CONTENT" :editorToolbar="customToolbar"></vue-editor>
        </div>
      </div> 
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Document :</h5></b>
        </div>
        <div class="col-md-9">
          <vue-form-generator
            :model="model"
            :schema="fileUploadSchema"
            :options="formOptions"
            ref="fileUploadForm"
          >
          </vue-form-generator>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Start Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <!-- <p v-if="id != undefined" class="text-left">{{title}}</p> -->
          <datepicker
            placeholder="dd-MM-yyyy"
            format="dd-MM-yyyy"
            input-class="form-control form-control-md bgcolor"
            v-model="model.EVENT_DATE_START"
            :typeable="false"
            name="uniquename"
            @input="dateValidation('start')"
          ></datepicker>
          <!-- </div> -->
        </div>

      </div>
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">End Date <span class="text-danger"> * </span>:</h5></b>
        </div>

        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <!-- <p v-if="id != undefined" class="text-left">{{title}}</p> -->
          <datepicker
            placeholder="dd-MM-yyyy"
            format="dd-MM-yyyy"
            input-class="form-control form-control-md bgcolor"
            v-model="model.EVENT_DATE_END"
            :typeable="false"
            name="uniquename"
            @input="dateValidation('end')"
          ></datepicker>
          <!-- </div> -->
        </div>

      </div>
    
      <br />
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Set Audience Category :</h5></b>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-4" v-for="(item, index) in compType" :key="index">
              <div class="row mb-2">
                <va-checkbox class="col-2" v-model="item.selected" />
                <span class="col mt-2 description">
                  {{ item.DIST_TYPE_NAME }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    
      <br />
      <br />
      <br />
      <br />
      <button
        @click="back"
        type="button"
        class="float-left btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <div class="ml-2 float-right">
        <button
          @click="submit('draft')"
          type="button"
          class="mr-2 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; {{subButton}}
        </button>
        <b-button
          @click="submit('publish')"
          type="button"
          class="btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Submit
        </b-button>
      </div>
    </div>
  </va-card>
</template>
<script>
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../../app/module0/services";
import * as services06Module0 from "../../../../app/module0/services06";
import loder from "../../../request_loader";

export default {
  components: {
    loder
  },
  mounted() {
    //this.getAllEvent();
    this.getDistributorType();
    this.getConsultantType();
    this.getOthersAudience();
  },
  methods: {
    // Date Validation ===
    dateValidation(type){
      var sDate = this.model.EVENT_DATE_START;
      var eDate = this.model.EVENT_DATE_END;
      if(eDate && (sDate > eDate)){
        if(type == 'start'){
          this.model.EVENT_DATE_END = '';
        }else{
          this.model.EVENT_DATE_START =  "";
        }
        Vue.$toast.open({
            message: 'Valid date range required !!',
            type: 'error',
        });
      }
    },

    async getOthersAudience() {
      const response = await servicesModule0.getOtherType();
      this.otherType = response;
      this.isDataReady = true; // Kill Component ready loader
    },
    async getDistributorType() {
      const response = await servicesModule0.getDistributorType();
      this.compType = response;
    },
    async getConsultantType() {
      const response = await servicesModule0.getConsultantType();
      this.consultantType = response;
    },
    async getAllEvent() {
      const response = await servicesModule0.getAllCircular('REGISTRATION DEPARTMENT');
      console.log("get all event : " + JSON.stringify(response));
    },
    selectAudience() {
      console.log("asdasd");
    },
    //1: SUBMIT 0:SAVE AS DRAFT 2:HOD APPROVED 3:HOD RETURN 4:GM APPROVED 
    //5:GM RETURN 6:REJECTED 7: HOD SAVE AS DRAFT 8: GM SAVE AS DRAFT
     async submit(type) {
       this.isLoader = true; // Loder
      const data = new FormData();
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 
      if(type == 'publish'){
        // Publish Circular will mark as Pending (15) tsk_status
        data.append("CIRCULAR_STATUS", 2);
        data.append('TS_ID', 15);
        data.append('PUBLISH_STATUS', 1);
        //for notification to HOD
        data.append("NOTI_LOCATION", "rd-review-circular-List/"+ dept);
      	data.append("NOTI_REMARK","(CIRCULAR) New Entry for HOD approval");
        const approvalLevel = await this.getApprovalLevel(dept);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
      }else{
        // Draft Circular will mark as Draft (1) tsk_status
        data.append("CIRCULAR_STATUS", 1);
        data.append('TS_ID', 1);
        data.append('PUBLISH_STATUS', 0);
      }

      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      data.append('DEPARTMENT', dept);
      //data.append('EVENT_TYPE', 'REGISTRATION DEPARTMENT');

      
      this.model.EVENT_DISTRIBUTOR_AUDIENCE = [];
      this.compType.forEach(item => {
        if (item.selected == true) {
          this.model.EVENT_DISTRIBUTOR_AUDIENCE.push(item.DISTRIBUTOR_TYPE_ID);
        }
      });

       
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

      data.append("EVENT_TITLE", this.model.EVENT_TITLE);
      data.append("EVENT_CONTENT", this.model.EVENT_CONTENT);
      data.append(
        "EVENT_DATE_START",
        moment(this.model.EVENT_DATE_START).format("YYYY-MM-DD")
      );
      data.append(
          "EVENT_DATE_END",
          moment(this.model.EVENT_DATE_END).format("YYYY-MM-DD")
        );
      if (this.model.EVENT_DISTRIBUTOR_AUDIENCE.length != 0) {
        data.append(
          "EVENT_DISTRIBUTOR_AUDIENCE",
          JSON.stringify(this.model.EVENT_DISTRIBUTOR_AUDIENCE)
        );
      }

      try {
        const response = await servicesModule0.createCircular(data);
        if(response != 'error'){
            this.back();
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoader = false; // Kill Loder
    },

    getApprovalLevel(dept){
        if(dept == 1){
          return services06Module0.getApprovalLevel(59,1);
        }else if(dept == 2){
          return services06Module0.getApprovalLevel(61,1);
        }else if(dept == 3){
          return services06Module0.getApprovalLevel(60,1);
        }else if(dept == 4){
          return services06Module0.getApprovalLevel(62,1);
        }else if(dept == 5){
          return services06Module0.getApprovalLevel(63,1);
        }else if(dept == 6){
          return services06Module0.getApprovalLevel(64,1);
        }else if(dept == 7){
          return services06Module0.getApprovalLevel(65,1);
        }else if(dept == 8){
          return services06Module0.getApprovalLevel(66,1);
        }else{
          return [];
        }
    },

    back() {
      this.$router.go(-1);
    },
  
    
  },
  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      subButton:'Save as draft',
      error:{},
      selected: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "",
      customToolbar: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ["italic","underline","bold"], // toggled buttons "strike"
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" }
          ],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image", "video"],
          ["clean"] // remove formatting button
      ],
      selectedAudience: [],
      model: {
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],
        CREATE_BY: '',
        file: [],
      },
      compType: [],
      consultantType: [],
      otherType: [],
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-circular",
                styleClasses: "float-right col-md-12",
                required: false,
                hint:"Maximum uploaded file size is 10MB. Accepted format : (.PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX)",
             
              },
            ],
          },
        ],
      },
       formOptions: {
        validateAfterChanged: true,
      },
    };
  }
};
</script>
<style lang="scss">
.bgcolor {
  background-color: white !important;
}
</style>