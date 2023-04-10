<template>
  <va-card>
  <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>
      <h4 slot="header" class="card-title">
        Update Announce Management
      </h4>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Title <span class="text-danger"> * </span>:</h5></b>
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
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Set Distributor Audience Category :</h5></b>
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

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Set Consultant Audience Category :</h5></b>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-4"
              v-for="(item, index) in consultantType"
              :key="index"
            >
              <div class="row mb-2">
                <va-checkbox class="col-2" v-model="item.selected" />
                <span class="col mt-2 description">
                  {{ item.TYPE_NAME }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Set Other Audience Category :</h5></b>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-4" v-for="(item, index) in otherType" :key="index">
              <div class="row mb-2">
                <va-checkbox class="col-2" v-model="item.selected" />
                <span class="col mt-2 description">
                  {{ item.SET_PARAM }}
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
      <button
        @click="back"
        type="button"
        class="float-left btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <div class="ml-2 float-right">
        <button
          @click="updateData('draft')"
          type="button"
          class="mr-2 btn btn-info btn-fill btn-md"
        >

          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <b-button
          @click="updateData('publish')"
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
import * as servicesModule0 from "../../../app/module0/services";
import * as services06Module0 from "../../../app/module0/services06";
import loder from "../../request_loader";

export default {
  components: {
    loder
  },
  mounted() {
    //this.getAllEvent();
    //this.getDistributorType();
    //this.getConsultantType();
    //this.getOthersAudience();
    this.getAnnouncementById();
    //console.log('Param Value',this.$route.params.MANAGE_EVENT_ID);
  },

  created() {
    //this.getDistributorType();
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

    async getOthersAudience(arrDataAll) {
      const response = await servicesModule0.getOtherType();
      arrDataAll = JSON.parse(arrDataAll);
      var arrData = arrDataAll ? arrDataAll : [];
      response.forEach(item => {
        if(arrData.includes(item.SETTING_GENERAL_ID)){
          item.selected = true;
        }
      });
      this.otherType = response;
    },
    async getDistributorType(arrDataAll) {
      arrDataAll = JSON.parse(arrDataAll);
      var arrData = arrDataAll ? arrDataAll : [];
      const response = await servicesModule0.getDistributorType();
      response.forEach(item => {
        if(arrData.includes(item.DISTRIBUTOR_TYPE_ID)){
          item.selected = true;
        }
      });
      this.compType = response;
      //console.log('comp======',this.compType)
    },
    async getConsultantType(arrDataAll) {
      const response = await servicesModule0.getConsultantType();
      arrDataAll = JSON.parse(arrDataAll);
      var arrData = arrDataAll ? arrDataAll : [];
      response.forEach(item => {
        if(arrData.includes(item.CONSULTANT_TYPE_ID)){
          item.selected = true;
        }
      });
      this.consultantType = response;
    },

    // Feaching circular data by id for edit
    async getAnnouncementById() {
      const response = await servicesModule0.getannouncementById(this.$route.params.MANAGE_EVENT_ID);
      if(response.data.length > 0){
        this.model.EVENT_TITLE = response.data[0].EVENT_TITLE;
        this.model.EVENT_CONTENT = response.data[0].EVENT_CONTENT;
        this.model.EVENT_DATE_START = response.data[0].EVENT_DATE_START;
        this.model.EVENT_DATE_END = response.data[0].EVENT_DATE_END;
        this.model.MANAGE_EVENT_ID = response.data[0].MANAGE_EVENT_ID;
        this.audience = response.data[0].EVENT_DISTRIBUTOR_AUDIENCE;
        this.model.DEPARTMENT = response.data[0].DEPARTMENT;
        //call destributor data with existing selected
        this.getOthersAudience(response.data[0].EVENT_OTHER_AUDIENCE);
        this.getDistributorType(response.data[0].EVENT_DISTRIBUTOR_AUDIENCE);
        this.getConsultantType(response.data[0].EVENT_CONSULTANT_AUDIENCE);

        //console.log("File Neww ====" , response.files);

          response.files.forEach((element) => {
          //console.log(element.DOC_BLOB);
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            element.DOCUMENT_MIMETYPE
          );
          console.log("mula");
          console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCUMENT_BLOB = new File(
            [element.DOCUMENT_BLOB],
            element.DOCUMENT_FILENAME + "." + element.DOCUMENT_FILETYPE,
            { type: element.DOCUMENT_BLOB.type }
          );
          console.log(element.DOCUMENT_BLOB);
          const data = {
            docID: element.MANAGE_EVENT_DOCUMENT_ID,
          name:
              element.DOCUMENT_FILENAME +
              " - By " +
              element.CREATE_BY +
              "." +
              element.DOCUMENT_FILETYPE,
            size: element.DOCUMENT_FILESIZE,
            type: element.DOCUMENT_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB),
          };

          this.file = element.DOCUMENT_BLOB;
          this.model.file.push(data);
          //alert(JSON.stringify(data));
        });

          // End Loader After Data Loading
          this.isDataReady = true; // Kill component Loader
      }else{
        //this.$router.push("/fimm/event-list");
      } 
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

    selectAudience() {
      console.log("asdasd");
    },

    // Update the circular management data
    async updateData(type) {
      this.isLoader = true // Loder
      const data = new FormData();
      var dept = this.model.DEPARTMENT;
      if(type == 'publish'){
        // Publish Circular will mark as Pending (15) tsk_status
        data.append("ANNOUNCE_STATUS", 2);
        data.append('TS_ID', 15);
        data.append('PUBLISH_STATUS', 1);
        //for notification to HOD
        data.append("NOTI_LOCATION", "event-review-list/" + dept);
      	data.append("NOTI_REMARK","(ANNOUNCEMENT) New Entry for HOD approval");
        //const approvalLevel = await services06Module0.getApprovalLevel(29, 1);
        //data.append("APPR_LIST", JSON.stringify(approvalLevel));
        const approvalLevel = await this.getApprovalLevel(dept);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
      }else{
        // Draft Circular will mark as Draft (1) tsk_status
        data.append("ANNOUNCE_STATUS", 1);
        data.append('TS_ID', 1);
        data.append('PUBLISH_STATUS', 0);
      }

      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      data.append('DEPARTMENT', 1);

      this.model.EVENT_DISTRIBUTOR_AUDIENCE = [];
      this.compType.forEach(item => {
        if (item.selected == true) {
          this.model.EVENT_DISTRIBUTOR_AUDIENCE.push(item.DISTRIBUTOR_TYPE_ID);
        }
      });
      this.model.EVENT_CONSULTANT_AUDIENCE = [];
      this.consultantType.forEach(item => {
        if (item.selected == true) {
          this.model.EVENT_CONSULTANT_AUDIENCE.push(item.CONSULTANT_TYPE_ID);
        }
      });
      this.model.EVENT_OTHER_AUDIENCE = [];
      this.otherType.forEach(item => {
        if (item.selected == true) {
          this.model.EVENT_OTHER_AUDIENCE.push(item.SETTING_GENERAL_ID);
        }
      });
     
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
      //data.append("CIRCULAR_STATUS", 1);
      data.append("MANAGE_EVENT_ID", this.model.MANAGE_EVENT_ID);
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
      if (this.model.EVENT_CONSULTANT_AUDIENCE.length != 0) {
        data.append(
          "EVENT_CONSULTANT_AUDIENCE",
          JSON.stringify(this.model.EVENT_CONSULTANT_AUDIENCE)
        );
      }
      if (this.model.EVENT_OTHER_AUDIENCE.length != 0) {
        data.append(
          "EVENT_OTHER_AUDIENCE",
          JSON.stringify(this.model.EVENT_OTHER_AUDIENCE)
        );
      }

      try {
        this.subButton = 'Loading....';
        const response = await servicesModule0.updateEvent(data);
        if(response != 'error'){
          this.back();
        }
        this.subButton = 'Update';
        //this.back();
        this.isLoader = false // Kill Loder
        
      } catch (error) {
        console.log(error);
      }
    },

    getApprovalLevel(dept){
        if(dept == 1){
          return services06Module0.getApprovalLevel(75,1);
        }else if(dept == 2){
          return services06Module0.getApprovalLevel(77,1);
        }else if(dept == 3){
          return services06Module0.getApprovalLevel(76,1);
        }else if(dept == 4){
          return services06Module0.getApprovalLevel(78,1);
        }else if(dept == 5){
          return services06Module0.getApprovalLevel(79,1);
        }else if(dept == 6){
          return services06Module0.getApprovalLevel(80,1);
        }else if(dept == 7){
          return services06Module0.getApprovalLevel(81,1);
        }else if(dept == 8){
          return services06Module0.getApprovalLevel(82,1);
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

      subButton : 'Update',
      audience:[],
      selected: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "<h5></h5>",
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
        MANAGE_EVENT_ID:"",
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],

        CREATE_BY: '',
        file: [],
        DEPARTMENT:'',
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