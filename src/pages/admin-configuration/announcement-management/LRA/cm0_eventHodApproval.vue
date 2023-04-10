<template>
  <va-card>
    <h4 slot="header" class="card-title">Event Detail</h4>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Title :</h5></b>
      </div>
      <div class="col-md-9">
        <p class="text-left">{{model.EVENT_TITLE}}</p>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Content :</h5></b>
      </div><template>
  <va-card>
    <h4 slot="header" class="card-title">Event Detail</h4>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Title :</h5></b>
      </div>
      <div class="col-md-9">
        <p class="text-left">{{APPROVAL.EVENT_TITLE}}</p>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Content :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <p class="text-left">
            {{APPROVAL.EVENT_CONTENT}}
        </p>
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
        <b><h5 class="card-title">Start Date :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <p class="text-left">{{APPROVAL.EVENT_DATE_START}}</p>
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
        <p class="text-left">{{APPROVAL.EVENT_DATE_END}}</p>
        <!-- </div> -->
      </div>
    </div>
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
    <br/>
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

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Remark :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
         <input
          type="text"
          v-model="model.APPR_REMARK"
          class="form-control form-control-md"
        />
        <!-- </div> -->
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
    <div class="ml-2 float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="returnn"
        type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Return
      </button>
      <b-button
        @click="submit"
        type="button"
        class="btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
      </b-button>
    </div>
    <!-- <br />
                <br />
                <br />
                <br /> -->
  </va-card>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../../app/module0/services";
import * as services06Module0 from "../../../../app/module0/services06";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model.MANAGE_EVENT_ID = to.params.MANAGE_EVENT_ID;
      console.log("event id : " + JSON.stringify(vm.model.MANAGE_EVENT_ID));
      vm.getEventById();
      if (vm.id != undefined) {
        vm.EVENT_TITLE ="";
        vm.EVENT_CONTENT ="";
        vm.EVENT_DATE_START = "";
        vm.EVENT_DATE_END = "";
        vm.approval= "";
      
      }
    });
  },
  mounted() {
    var data = localStorage.getItem("event-hod-approval");
    this.getEventById();
    this.APRROVAL = JSON.parse(data);
    this.getDocumentById();
  },

  methods: {
    getDocumentById: async function () {
      const response = await servicesModule0.getDocumentById(
        this.EDIT.MANAGE_EVENT_ID
      );
       response.forEach(element => {
          console.log(element.DOCUMENT_BLOB);
          element.DOCUMENT_BLOB = this.b64toBlobPDF(
            element.DOCUMENT_BLOB,
            "application/pdf"
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
            name: element.DOCUMENT_FILENAME + "." + element.DOCUMENT_FILETYPE,
            size: element.DOCUMENT_FILESIZE,
            type: element.DOCUMENT_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCUMENT_BLOB)
           
          };
          
            this.file = element.DOCUMENT_BLOB;
            //alert(JSON.stringify(element.DOC_BLOB));
            this.model.file.push(data);
            //alert(JSON.stringify(data));
          
        });
      
     
    },


    async getEventById() {
      console.log("id event : " + this.model.MANAGE_EVENT_ID);
      const response = await servicesModule0.getEventById(
        this.model.MANAGE_EVENT_ID
      );
      this.APPROVAL = response.event;
      //this.approval.EVENT_CONTENT = response.EVENT_CONTENT;
      this.compType = response.distributorAudience;
      this.otherType = response.otherAudience;
      this.consultantType = response.consultantAudience;
      
    },
    
    saveAsDraft: async function () {
      const data = new FormData();
      data.append('MANAGE_EVENT_APPROVAL_ID', this.MANAGE_EVENT_APPROVAL_ID);
      data.append('APPR_REMARK', this.model.APPR_REMARK);
      data.append('APPR_PUBLISH_STATUS', "0");
      data.append('TS_ID', "1");
      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(29, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));

    },



    async returnn() {
      if (confirm('"Are you sure you want to return this entry?'))
      {
      const data = new FormData()
      data.append('MANAGE_EVENT_APPROVAL_ID', this.MANAGE_EVENT_APPROVAL_ID);
      data.append('APPR_REMARK', this.model.APPR_REMARK);
      data.append('APPR_PUBLISH_STATUS', "1");
      data.append('TS_ID', "9");
      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(29, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));

     data.append("NOTI_LOCATION", "consultantAlert-hodLraRecordList");
        var code = "";
    var notiTitle = "This entry has been returned by HOD FIMM ";
        data.append("NOTI_TITLE", notiTitle);

      try {
        const response = await servicesModule0.updateEventApproval(data);
        this.$router.push("/fimm/eventList-approval");
      } catch (error) {
        console.log(error);
      }
      }
    },


async submit() {

      const data = new FormData()
      data.append('MANAGE_EVENT_APPROVAL_ID', this.MANAGE_EVENT_APPROVAL_ID);
      data.append('APPR_REMARK', this.model.APPR_REMARK);
      data.append('APPR_PUBLISH_STATUS', "1");
      data.append('TS_ID', "3");
      data.append('MANAGE_EVENT_ID', this.model.MANAGE_EVENT_ID);
      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(29, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));
  

      try {
        const response = await servicesModule0.updateEventApproval(data);
        this.$router.push("/fimm/eventList-approval");
      } catch (error) {
        console.log(error);
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
    back () {},




  },
  data () {
    return {
   

      selected: false,
      document: null,
      APPROVAL: "",
      compType: [],
      consultantType: [],
      otherType: [],
      fileRecords: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "<h5></h5>",
      MANAGE_EVENT_ID: '',
      EDIT: '',
      file: [],
      APRROVAL: '',

      model: {

        APPR_REMARK: '',
        MANAGE_EVENT_ID:'',
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],
        CREATE_BY: "",
        file: [],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "float-right col-md-12",
                required: false,
              },
            ],
          },
        ],
      },
       formOptions: {
        validateAfterChanged: true,
      },



    }
  },
}
</script>

      <div id="app" class="col-md-9">
        <p class="text-left">
            {{APPROVAL.EVENT_TITTLE}}
        </p>
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
          :accept="'.pdf,.doc,.docx,.ods'"
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
        <p class="text-left">{{APPROVAL.EVENT_DATE_START}}</p>
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
        <p class="text-left">{{APPROVAL.EVENT_DATE_END}}</p>
        <!-- </div> -->
      </div>
    </div>
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
    <br/>
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

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Remark :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
         <input
          type="text"
          v-model="model.APPR_REMARK"
          class="form-control form-control-md"
        />
        <!-- </div> -->
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
    <div class="ml-2 float-right">
      <button
        @click="returnn"
        type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Return
      </button>
      <b-button
        @click="submit"
        type="button"
        class="btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
      </b-button>
    </div>
    <!-- <br />
                <br />
                <br />
                <br /> -->
  </va-card>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../app/module0/services";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model.MANAGE_EVENT_ID = to.params.MANAGE_EVENT_ID;
      console.log("event id : " + JSON.stringify(vm.model.MANAGE_EVENT_ID));
      vm.getEventById();
      if (vm.id != undefined) {
        vm.cirTitle ="";
        vm.content ="";
        vm.startDate = "";
        vm.endDate = "";
        vm.approval= "";
      
      }
    });
  },
  mounted() {
    //var data = localStorage.getItem("consultantAlert-hodLraCaseVerification");
    this.getEventById();
    this.approval = JSON.parse(data);
  },

  methods: {
      async getEventById() {
      console.log("id event : " + this.model.MANAGE_EVENT_ID);
      const response = await servicesModule0.getEventById(
        this.model.MANAGE_EVENT_ID
      );
      this.APPROVAL = response.event;
      //this.approval.EVENT_CONTENT = response.EVENT_CONTENT;
      this.compType = response.distributorAudience;
      this.otherType = response.otherAudience;
      this.consultantType = response.consultantAudience;
      console.log(response.document);
      this.document = response.document;
      const fileArray = [];
      response.document.forEach(element => {
        fileArray.push({
          name:
            element.MANAGE_EVENT_DOCUMENT_ID +
            "_" +
            element.DOCUMENT_FILENAME +
            "." +
            element.DOCUMENT_FILEEXTENSION,
          fileId: element.MANAGE_EVENT_DOCUMENT_ID,
          fileName:
            element.MANAGE_EVENT_DOCUMENT_ID + "_" + element.DOCUMENT_FILENAME,
          size: element.DOCUMENT_FILESIZE,
          type: element.DOCUMENT_FILEEXTENSION,
          ext: "exe",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXczNqLXJfMzFRcDlyTy1EZk1uR0JWSXFKR0JRNUxqMlZCZThQOVhHTXhZIn0.eyJleHAiOjE2MTQyMzU3OTMsImlhdCI6MTYxNDIzMzk5MywianRpIjoiYmEyY2M3YWQtYzBjMy00MjkyLThjMjgtM2EzYmVjMzhkMWYwIiwiaXNzIjoiaHR0cDovL3YuaXJjLm15OjgwNTcvYXV0aC9yZWFsbXMvbGRhcC1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiMGRmZDY0Yy03NGVlLTQ4MzEtYjdlMy04ZmY2NmJhMTljYjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWctY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjdhNjJkNTg2LTM2YTEtNDk4Zi04OGYzLTQ2N2RkZTBlODJhZCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFobWFkIEFsYmFiIiwiZ2l2ZW5fbmFtZSI6IkFobWFkIiwiZmFtaWx5X25hbWUiOiJBbGJhYiIsImVtYWlsIjoiZHVtbXkxMjJAdm4ubXkiLCJ1c2VybmFtZSI6ImR1bW15In0.hTt3snxenDp3vRvWvDHkjePTmvD2qRPl--d6C_rL2wg1Gll5tP8YbfKQbBNvadwCVTXhj-r0FsghisHKqP_smwY1Ag_u11svMWFQfJI6cWJ-_8VkX9qUt3fI43m-4LyjxNz82dPxAGOoNTrG8sqeCx6SSwcMBU-U-_yjl1FtvL2VLlHZjy_CSV9_XLdKErnsPmJIsLqx8DZkFxjE_aRCjiLPJo_9UCs-56HPv9o3rDkys3p0vC3cUu9lMBOziXScejeNMZ8mR6aT8oSCeggS_QzHihClG42vMWFvuGMsYUoDnY5ImOUZFigBrDN_Z3AKcSV9JFgyNT1NDRqffp2n1g"
          },
          url:
            "/api/module0/document/" +
            element.MANAGE_EVENT_DOCUMENT_ID +
            "_" +
            element.DOCUMENT_FILENAME +
            "." +
            element.DOCUMENT_FILEEXTENSION
        });
      });
      this.fileRecords = fileArray;
      console.log("filee : ");
      console.log(this.fileRecords);
    },



    async returnn() {
      const data = new FormData()
      data.append("MANAGE_EVENT_ID", this.model.MANAGE_EVENT_ID.MANAGE_EVENT_ID);
      data.append("APPR_REMARK", this.model.APPR_REMARK);
      data.append("ANNOUNCEMENT_STATUS", 4);

      try {
        const response = await servicesModule0.updateEventApproval(data);
      } catch (error) {
        console.log(error);
      }
    },

 async submit() {
      
      const data = new FormData()
      data.append("MANAGE_EVENT_ID", this.model.MANAGE_EVENT_ID.MANAGE_EVENT_ID);
      data.append("APPR_REMARK", this.model.APPR_REMARK);
      data.append("ANNOUNCEMENT_STATUS", 4);
      try {
        const response = await servicesModule0.updateEventApproval(data);
      } catch (error) {
        console.log(error);
      }
    },
    back () {},
  },
  data () {
    return {
   

      selected: false,
      document: null,
      APPROVAL: "",
      compType: [],
      consultantType: [],
      otherType: [],
      fileRecords: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "<h5></h5>",

      model: {
        APPR_REMARK: '',
        MANAGE_EVENT_ID:'',
        EVENT_TITLE: "",
        EVENT_CONTENT: "",
        EVENT_DATE_START: "",
        EVENT_DATE_END: "",
        EVENT_DISTRIBUTOR_AUDIENCE: [],
        EVENT_CONSULTANT_AUDIENCE: [],
        EVENT_OTHER_AUDIENCE: [],
        CREATE_BY: ""
      },
      



    }
  },
}
</script>
