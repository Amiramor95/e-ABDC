<template>
  <va-card>
    <loder v-show="isLoader" />
    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>

        <h4 slot="header" class="card-title">Event Review</h4>
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
              v-model="fileRecords"
            ></VueFileAgent>
            <!-- <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
                        Upload {{ fileRecordsForUpload.length }} files
                    </button> -->
          </div>
        </div>
        <br />

        <div class="row avoid-clicks">
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
        <div class="row avoid-clicks">
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

        <div class="row avoid-clicks">
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

      <div class="row avoid-clicks">
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

      <div class="row avoid-clicks" >
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

          <i class="fa fa-pencil-square-o" /> &nbsp; Return
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
import * as servicesModule0 from "../../../app/module0/services";
import * as services06Module0 from "../../../app/module0/services06";
import loder from "../../request_loader";

export default {

  components: {
    loder
  },
  mounted() {
    this.getCircularById();
  },

  methods: {

    // Update the circular management data
    async updateData(type) {
      if(this.$refs.remarkFrom.validate()){
        this.isLoader = true // Loder
        const data = new FormData();
        // 1: SUBMIT 0:SAVE AS DRAFT 2:HOD APPROVED 3:HOD RETURN
        if(type == 'approve'){
          data.append('TS_ID', 3);
          data.append('PUBLISH_STATUS', 2);
        }else if(type == 'draft'){
          data.append('PUBLISH_STATUS', 4);
          data.append('TS_ID', 15);
        }else{
          // Draft Circular will mark as Return (1) tsk_status
          data.append('TS_ID', 9);
          data.append('PUBLISH_STATUS', 3);
        }
        data.append("MANAGE_EVENT_ID", this.model.MANAGE_EVENT_ID);
        data.append("REMARK_CONTENT", this.model.REMARK_CONTENT);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY",JSON.parse(user).user_id);

        try {
          const response = await servicesModule0.reviewEventUpdate(data);
    
          this.isLoader = false // Kill Loder
          if(response != 'error'){
            this.back();
          }
          
        } catch (error) {
          console.log(error);
        }
      }  
    },

    // Feaching circular data by id for edit
    async getCircularById() { 
      const response = await servicesModule0.getannouncementById(this.$route.params.MANAGE_EVENT_ID);
      if(response.data.length > 0){
        this.model.EVENT_TITLE = response.data[0].EVENT_TITLE;
        this.model.EVENT_CONTENT = response.data[0].EVENT_CONTENT;
        this.model.EVENT_DATE_START = response.data[0].EVENT_DATE_START;
        this.model.EVENT_DATE_END = response.data[0].EVENT_DATE_END;
        this.model.MANAGE_EVENT_ID = response.data[0].MANAGE_EVENT_ID;
        this.model.DPMT_NAME = response.data[0].DPMT_NAME;
        this.model.PUBLISH_STATUS = response.data[0].PUBLISH_STATUS;
        this.audience = response.data[0].EVENT_DISTRIBUTOR_AUDIENCE;
        this.model.REMARK_CONTENT = response.data[0].APPR_REMARK;

        //call destributor data with existing selected
        //call destributor data with existing selected
        this.getOthersAudience(response.data[0].EVENT_OTHER_AUDIENCE);
        this.getDistributorType(response.data[0].EVENT_DISTRIBUTOR_AUDIENCE);
        this.getConsultantType(response.data[0].EVENT_CONSULTANT_AUDIENCE);

          response.files.forEach((element) => {
            //console.log(element.DOCUMENT_BLOB);
            element.DOCUMENT_BLOB = this.b64toBlobPDF(
              element.DOCUMENT_BLOB,
              element.DOCUMENT_MIMETYPE
            );
            //console.log("mula");
            //console.log(element.DOCUMENT_BLOB); // <----- cuba tgk ini
            //console.log("habis");
            element.DOCUMENT_BLOB = new File(
              [element.DOCUMENT_BLOB],
              element.DOCUMENT_ORIGINAL_NAME + "." + element.DOCUMENT_FILETYPE,
              { type: element.DOCUMENT_BLOB.type }
            );
            //console.log(element.DOCUMENT_BLOB);
            const data = {
              docID: element.CIRCULAR_EVENT_DOCUMENT_ID,
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
            this.fileRecords.push(data);

            //this.file = element.DOCUMENT_BLOB;
            //alert(JSON.stringify(element.DOCUMENT_BLOB));
            //this.model.file.push(data);
            //alert(JSON.stringify(data));
          });

          // End Loader After Data Loading
          this.isDataReady = true; // Kill component Loader
      }else{
        this.back;
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

    getCirculatStatus(status){
      //1: SUBMIT 0:SAVE AS DRAFT 2:HOD APPROVED 3:HOD RETURN 6:REJECTED
      if(status == 1){
        return "PENDING FOR HOD APPROVAL";
      }else if(status == 2){
          return "HOD APPROVED";
      }else if(status == 3){
          return "RETURN BY HOD";
      }else if(status == 4){
          return "SAVE AS DRAFT BY HOD";
      }else if(status == 6){
          return "REJECTED";              
      }else{
        return "DRAFT";  
      }
    },

    back () {
      this.$router.go(-1)
    },

  },
  data () {
    return {
      isDataReady:false,
      isLoader:false,

      audience:[],
      selected: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      selectedAudience: [],
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
      model: {
        CIRCULAR_EVENT_ID:"",
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],
        CREATE_BY: '',
        DPMT_NAME:'',
        PUBLISH_STATUS:'',
        REMARK_CONTENT:'',

        file: [],
      },
      compType: [],
      consultantType: [],
      otherType: [],

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
      
    }
  },
}
</script>
<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}

.bgcolor {
  background-color: white !important;
}
.avoid-clicks {
  pointer-events: none;
}
</style>
