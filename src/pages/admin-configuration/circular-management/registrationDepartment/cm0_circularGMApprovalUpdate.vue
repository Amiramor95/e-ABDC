<template>
  <va-card>
  <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>
      <h4 slot="header" class="card-title">
        Circular Details For GM Review
      </h4>
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Current Status :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <span class="text-left" style="background-color: yellow;">
            {{ getCirculatStatus(model.PUBLISH_STATUS)}}
          </span>
          <!-- </div> -->
        </div>
      </div>
      <br />
      <div class="row" v-if="model.PUBLISH_STATUS > 1">
        <div class="col-md-3">
          <b><h5 class="card-title">HOD Remark :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left" v-html="model.HOD_REMARK"> </p>
          <!-- </div> -->
        </div>
      </div>
      </br>
      <div class="row" v-if="model.PUBLISH_STATUS > 3">
        <div class="col-md-3">
          <b><h5 class="card-title">GM Remark :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left" v-html="model.GM_REMARK"></p>
          <!-- </div> -->
        </div>
      </div>
      </br>
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Department :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left">
            {{model.DPMT_NAME}}
          </p>
          <!-- </div> -->
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Circular Title :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left">
            {{model.EVENT_TITLE}}
          </p>
          <!-- </div> -->
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Content :</h5></b>
        </div>
        <div id="app" class="col-md-9">
          <p class="text-left" v-html="model.EVENT_CONTENT"></p>
          <!-- <vue-editor v-model="content"></vue-editor> -->
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Document :</h5></b>
        </div>
        <div id="app" class="col-md-9">
          <VueFileAgent
            ref="vueFileAgent"
            :theme="'list'"
            :multiple="true"
            :deletable="false"
            :meta="true"
            :readonly="true"
            :linkable="true"
            :accept="'.PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX'"
            :maxSize="'10MB'"
            :helpText="'Choose document'"
            :errorText="{
              type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
              size: 'Files should not exceed 10MB in size'
            }"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="model.file"
          ></VueFileAgent>
          <!-- <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
                      Upload {{ fileRecordsForUpload.length }} files
                  </button> -->
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Start Date :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left">{{model.EVENT_DATE_START}}</p>
          <!-- </div> -->
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">End Date :</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <p class="text-left">{{model.EVENT_DATE_END}}</p>
          <!-- </div> -->
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Audience Category :</h5></b>
        </div>
        <div class="col-md-9 avoid-clicks">
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

      <br/><br />
      <div class="content">
        <h4 slot="header" class="card-title">Approval Section</h4>
        <br />
        <vue-form-generator
          :model="model"
          :schema="remarkSchema"
          :options="formOptions"
          ref="remarkFrom"
        >
        </vue-form-generator>
        <br />
      </div>
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
        <button
          @click="updateData('return')"
          type="button"
          class="mr-2 btn btn-warning btn-fill btn-md"
        >

          <i class="fa fa-undo" /> &nbsp; Return
        </button>
        <b-button
          @click="updateData('approve')"
          type="button"
          class="btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Approve
        </b-button>
      </div>
    </div>
  </va-card>
</template>
<script>
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
    //this.getDistributorType();
    this.getConsultantType();
    this.getOthersAudience();
    this.getCircularById();
    console.log('Param Value',this.$route.params.CIRCULAR_EVENT_ID);
  },

  created() {
    //this.getDistributorType();
  },

  methods: {
    async getOthersAudience() {
      const response = await servicesModule0.getOtherType();
      this.otherType = response;
    },
    async getDistributorType(arrDataAll) {
      arrDataAll = JSON.parse(arrDataAll);
      var arrData = arrDataAll ? arrDataAll : [];
      console.log('Check Data',arrData);
      const response = await servicesModule0.getDistributorType();
      response.forEach(item => {
        if(arrData.includes(item.DISTRIBUTOR_TYPE_ID)){
          item.selected = true;
        }
      });

      this.compType = response;
      //console.log('comp======',this.compType)
    },
    async getConsultantType() {
      const response = await servicesModule0.getConsultantType();
      this.consultantType = response;
    },
    async getAllEvent() {
      const response = await servicesModule0.getAllCircular('REGISTRATION DEPARTMENT');
      //console.log("get all event : " + JSON.stringify(response));
      
    },

    // Feaching circular data by id for edit
    async getCircularById() { 
      const response = await servicesModule0.getCircularById(this.$route.params.CIRCULAR_EVENT_ID);
      if(response.data.length > 0){
        this.model.EVENT_TITLE = response.data[0].EVENT_TITLE;
        this.model.EVENT_CONTENT = response.data[0].EVENT_CONTENT;
        this.model.EVENT_DATE_START = response.data[0].EVENT_DATE_START;
        this.model.EVENT_DATE_END = response.data[0].EVENT_DATE_END;
        this.model.CIRCULAR_EVENT_ID = response.data[0].CIRCULAR_EVENT_ID;
        this.model.DEPARTMENT = response.data[0].DEPARTMENT;
        this.audience = response.data[0].EVENT_DISTRIBUTOR_AUDIENCE;
        this.model.DPMT_NAME = response.data[0].DPMT_NAME;
        this.model.PUBLISH_STATUS = response.data[0].PUBLISH_STATUS;

        //call destributor data with existing selected
        this.getDistributorType(response.data[0].EVENT_DISTRIBUTOR_AUDIENCE);

          response.files.forEach((element) => {
            //console.log(element.DOC_BLOB);
            element.DOC_BLOB = this.b64toBlobPDF(
              element.DOC_BLOB,
              element.DOC_MIMETYPE
            );

            element.DOC_BLOB = new File(
              [element.DOC_BLOB],
              element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
              { type: element.DOC_BLOB.type }
            );
            console.log(element.DOC_BLOB);
            const data = {
              docID: element.CIRCULAR_EVENT_DOCUMENT_ID,
            name:
                element.DOC_ORIGINAL_NAME +
                " - By " +
                element.CREATE_BY +
                "." +
                element.DOC_FILETYPE,
              size: element.DOC_FILESIZE,
              type: element.DOC_FILETYPE,
              ext: "exe",
              url: window.URL.createObjectURL(element.DOC_BLOB),
            };

            //this.file = element.DOC_BLOB;
            //alert(JSON.stringify(element.DOC_BLOB));
            this.model.file.push(data);
            //alert(JSON.stringify(data));
          });

          if(response.remark.length > 0){
            response.remark.forEach((item) => {
              if(item.APPR_PUBLISH_STATUS == 1){
                this.model.HOD_REMARK = item.APPR_REMARK;
              }
              if(item.APPR_PUBLISH_STATUS == 2){
                this.model.GM_REMARK = item.APPR_REMARK;
                this.model.REMARK_CONTENT = item.APPR_REMARK;
              }
            });
          }

          // End Loader After Data Loading
          this.isDataReady = true; // Kill component Loader
      }else{
        this.$router.push("/fimm/rd-review-circular-List");
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
       
      const data = new FormData();
      data.append("CIRCULAR_EVENT_ID", this.model.CIRCULAR_EVENT_ID);
      if(type == 'approve'){
        // Publish Circular will mark as Pending (15) tsk_status
        var $sms = "Are you sure !! you want to approve?";
        data.append('TS_ID', 3);
        data.append('PUBLISH_STATUS', 4);
        //for notification to HOD
      }else if(type == 'draft'){
          var $sms = "Are you sure !! you want to save as draft ?";
          data.append('PUBLISH_STATUS', 8);
          data.append('TS_ID', 15); 
      }else{
        // Draft Circular will mark as Draft (1) tsk_status
        var $sms = "Are you sure !! you want to return ?";
        data.append('TS_ID', 9);
        data.append('PUBLISH_STATUS', 5);
      }
      data.append("REMARK_CONTENT", this.model.REMARK_CONTENT);
      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      data.append("DEPARTMENT", this.model.DEPARTMENT);

      try {
        if (confirm($sms)){
          this.isLoader = true // Loder
          this.subButton = 'Loading....';
          const response = await servicesModule0.gmReviewCircularUpdate(data);

          this.subButton = 'Update';
          this.isLoader = false // Kill Loder
          if(response != 'error'){
            this.back();
          }
        }  

        //this.$router.push("/fimm/rd-circular-List");
      } catch (error) {
        console.log(error);
      }
    },

    getCirculatStatus(status){
      //1: SUBMIT 0:SAVE AS DRAFT 2:HOD APPROVED 3:HOD RETURN 4:GM APPROVED 5:GM RETURN 6:REJECTED
      if(status == 1){
        return "PENDING FOR HOD APPROVAL";
      }else if(status == 2){
          return "PENDING FOR GM APPROVAL";
      }else if(status == 3){
          return "RETURN BY HOD";
      }else if(status == 4){
          return "APPROVED BY GM";
      }else if(status == 5){
          return "RETURN BY GM";
      }else if(status == 6){
          return "REJECTED";              
      }else if(status == 7){
          return "HOD SAVE AS DRAFT";              
      }else if(status == 8){
          return "GM SAVE AS DRAFT";              
      }else{
        return "DRAFT";  
      }
    },


    back() {
      this.$router.go(-1);
    },
  
    
  },
  data() {
    return {
      isDataReady:false,
      isLoader : false,

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
        REMARK_CONTENT:"",
        CIRCULAR_EVENT_ID:"",
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],
        CREATE_BY: '',
        file: [],
        HOD_REMARK:'',
        GM_REMARK:'',
        DEPARTMENT:"",
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
                text: " ",
                model: "file",
                type: "vfg-custom-multiple-file-circular",
                styleClasses: "float-right col-md-12",
                required: false,
                readonly:true,
              },
            ],
          },
        ],
      },
      remarkSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                placeholder:"Enter Remarks/ Comments",
                model: "REMARK_CONTENT",
                hint: "Max 1000 characters",
                max: 1000,
                rows: 4,
                required: true,
                validator: "required",
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
.avoid-clicks {
  pointer-events: none;
}
</style>