<template>
  <va-card>
    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>

        <h4 slot="header" class="card-title">Circular Detail</h4>
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
          </br>
        </div>
        
        <div class="row" v-if="model.PUBLISH_STATUS > 3">
          <div class="col-md-3">
            <b><h5 class="card-title">GM Remark :</h5></b>
          </div>
          <div class="col-md-9">
            <!-- <div class="form-group"> -->
            <p class="text-left" v-html="model.GM_REMARK"></p>
            <!-- </div> -->
          </div>
          </br>
        </div>
        
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

        <br />
        <br />
        <button
          @click="back"
          type="button"
          class="float-left btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
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
    this.getCircularById();
  },

  methods: {
    // Feaching circular data by id for edit
    async getCircularById() { 
      const response = await servicesModule0.getCircularById(this.$route.params.CIRCULAR_EVENT_ID);
      if(response.data.length > 0){
        this.model.EVENT_TITLE = response.data[0].EVENT_TITLE;
        this.model.EVENT_CONTENT = response.data[0].EVENT_CONTENT;
        this.model.EVENT_DATE_START = response.data[0].EVENT_DATE_START;
        this.model.EVENT_DATE_END = response.data[0].EVENT_DATE_END;
        this.model.CIRCULAR_EVENT_ID = response.data[0].CIRCULAR_EVENT_ID;
        this.model.DPMT_NAME = response.data[0].DPMT_NAME;
        this.model.PUBLISH_STATUS = response.data[0].PUBLISH_STATUS;
        this.audience = response.data[0].EVENT_DISTRIBUTOR_AUDIENCE;

        //call destributor data with existing selected
        this.getDistributorType(response.data[0].EVENT_DISTRIBUTOR_AUDIENCE);

          response.files.forEach((element) => {
            //console.log(element.DOC_BLOB);
            element.DOC_BLOB = this.b64toBlobPDF(
              element.DOC_BLOB,
              element.DOC_MIMETYPE
            );
            //console.log("mula");
            //console.log(element.DOC_BLOB); // <----- cuba tgk ini
            //console.log("habis");
            element.DOC_BLOB = new File(
              [element.DOC_BLOB],
              element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
              { type: element.DOC_BLOB.type }
            );
            //console.log(element.DOC_BLOB);
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
            this.fileRecords.push(data);

            //this.file = element.DOC_BLOB;
            //alert(JSON.stringify(element.DOC_BLOB));
            //this.model.file.push(data);
            //alert(JSON.stringify(data));
          });

          if(response.remark.length > 0){
            response.remark.forEach((item) => {
              if(item.APPR_PUBLISH_STATUS == 1){
                this.model.HOD_REMARK = item.APPR_REMARK;
              }
              if(item.APPR_PUBLISH_STATUS == 2){
                this.model.GM_REMARK = item.APPR_REMARK;
              }
            });
          }

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
      subButton : 'Update',
      audience:[],
      selected: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      selectedAudience: [],
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
        HOD_REMARK:'',
        GM_REMARK:'',
        file: [],
      },

      compType: [
        {
          id: '1',
          name: 'UTMC',
          selected: false,
        },
        {
          id: '2',
          name: 'IUTA',
          selected: false,
        },
        {
          id: '3',
          name: 'CUTA',
          selected: false,
        },
        // {
        //     id: "4",
        //     name: "IUTA",
        //     selected: true
        // },
        {
          id: '5',
          name: 'CPRA',
          selected: true,
        },
        {
          id: '6',
          name: 'PRP',
          selected: false,
        },
        {
          id: '7',
          name: 'UTC',
          selected: true,
        },
        {
          id: '8',
          name: 'PRC',
          selected: true,
        },
        {
          id: '9',
          name: '3rd Party',
          selected: true,
        },
        {
          id: '10',
          name: 'Training Provider',
          selected: true,
        },
      ],
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
