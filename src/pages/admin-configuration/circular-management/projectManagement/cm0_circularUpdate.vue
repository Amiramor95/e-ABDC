<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Edit Circular
    </h4>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Title :</h5></b>
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
        <b><h5 class="card-title">Content :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <vue-editor v-model="model.EVENT_CONTENT"></vue-editor>
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
        <!-- <p v-if="id != undefined" class="text-left">{{title}}</p> -->
        <datepicker
          placeholder="dd-MM-yyyy"
          format="dd-MM-yyyy"
          input-class="form-control form-control-md bgcolor"
          v-model="model.EVENT_DATE_START"
          :typeable="false"
          name="uniquename"
        ></datepicker>
        <!-- </div> -->
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">End Date :</h5></b>
      </div>
      <div class="col-md-9">
        <datepicker
          placeholder="dd-MM-yyyy"
          format="dd-MM-yyyy"
          input-class="form-control form-control-md bgcolor"
          v-model="model.EVENT_DATE_END"
          :typeable="false"
          name="uniquename"
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
        @click="saveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <b-button
        @click="submit"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Publish
      </b-button>
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
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model.CIRCULAR_EVENT_ID = to.params.CIRCULAR_EVENT_ID;
      console.log("event id : " + JSON.stringify(vm.model.CIRCULAR_EVENT_ID));
      vm.getEventById();
      if (vm.id != undefined) {
        vm.cirTitle = '';
        vm.content = '';
        vm.startDate = "";
        vm.endDate = "";
       
      }
    });
  },

  mounted() {
    // for (let i = 0; i < this.fileRecords.length; i++) {
    //   this.uploadFileOject.push(JSON.stringify(this.fileRecords[i]));
    // }
  },
  methods: {
    getCircularDocumentById: async function () {
      const response = await servicesModule0.getCircularDocumentById(
        this.model.CIRCULAR_EVENT_ID
      );
      //alert(JSON.stringify(response));
       response.forEach(element => {
          console.log(element.DOC_BLOB);
          element.DOC_BLOB = this.b64toBlobPDF(
            element.DOC_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOC_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOC_BLOB = new File(
            [element.DOC_BLOB],
            element.DOC_FILENAME + "." + element.DOC_FILETYPE,
            { type: element.DOC_BLOB.type }
          );
          console.log(element.DOC_BLOB);
          const data = {
            docID: element.MANAGE_EVENT_DOC_ID,
            name: element.DOC_FILENAME + "." + element.DOC_FILETYPE,
            size: element.DOC_FILESIZE,
            type: element.DOC_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOC_BLOB)
           
          };
          
            this.file = element.DOC_BLOB;
            //alert(JSON.stringify(element.DOC_BLOB));
            this.model.file.push(data);
            //alert(JSON.stringify(data));
          
        });
      
     
    },
    async getEventById() {
      console.log("id event : " + this.model.CIRCULAR_EVENT_ID);
      const response = await servicesModule0.getEventById(
        this.model.CIRCULAR_EVENT_ID
      );
      this.model = response.event;
      this.compType = response.distributorAudience;
      this.otherType = response.otherAudience;
      this.consultantType = response.consultantAudience;
    },

    async saveAsDraft() {
      // console.log(this.uploadFileOject);
      const containsKey = (obj, key) => Object.keys(obj).includes(key);
      for (let i = 0; i < this.fileRecords.length; i++) {
        if (containsKey(this.fileRecords[i], "fileName")) {
          this.uploadFileOject.push(JSON.stringify(this.fileRecords[i]));
        } else {
          console.log("no filename");
        }
      }
      console.log(this.uploadFileOject);
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
      const data = new FormData();
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
      data.append("FILEOBJECT", JSON.stringify(this.document));
      data.append("MANAGE_CIRCULAR_ID", this.model.MANAGE_CIRCULAR_ID);
      data.append("CIRCULAR_EVENT_ID", this.model.CIRCULAR_EVENT_ID);
      data.append("CIRCULAR_STATUS", 1);
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
      data.append("CREATE_BY", 1);
      data.append("_method", "PUT");

      try {
        const response = await servicesModule0.updateCircular(data);
      } catch (error) {
        console.log(error);
      }
    },

   async submit() {
      const containsKey = (obj, key) => Object.keys(obj).includes(key);
      for (let i = 0; i < this.fileRecords.length; i++) {
        if (containsKey(this.fileRecords[i], "fileName")) {
          this.uploadFileOject.push(JSON.stringify(this.fileRecords[i]));
        } else {
          console.log("no filename");
        }
      }
      console.log(this.uploadFileOject);
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
      const data = new FormData();
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
      data.append('CIRCULAR_EVENT_ID', this.CIRCULAR_EVENT_ID);
    
      data.append("MANAGE_CIRCULAR_ID", this.model.MANAGE_CIRCULA_ID);
      data.append("CIRCULAR_EVENT_ID", this.model.CIRCULAR_EVENT_ID);
      data.append("CIRCULAR_STATUS", 1);
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
      data.append("CREATE_BY", 1);
      data.append("_method", "PUT");

      try {
        const response = await servicesModule0.updateCircular(data);
      } catch (error) {
        console.log(error);
      }
    },
    back() {
      this.$router.go(-1);
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
  data() {
    return {
      uploadHeaders: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXczNqLXJfMzFRcDlyTy1EZk1uR0JWSXFKR0JRNUxqMlZCZThQOVhHTXhZIn0.eyJleHAiOjE2MTQxNTM2MjQsImlhdCI6MTYxNDE1MTgyNCwianRpIjoiM2JmMGI5N2MtN2YyOS00NDczLTgwOTEtNjlhMmJjNDgzZWRmIiwiaXNzIjoiaHR0cDovL3YuaXJjLm15OjgwNTcvYXV0aC9yZWFsbXMvbGRhcC1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiMGRmZDY0Yy03NGVlLTQ4MzEtYjdlMy04ZmY2NmJhMTljYjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWctY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ2M2VhNTY1LThhMDMtNDU5Mi1hNTFjLTdlMjA2OGJmYjk5OCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFobWFkIEFsYmFiIiwiZ2l2ZW5fbmFtZSI6IkFobWFkIiwiZmFtaWx5X25hbWUiOiJBbGJhYiIsImVtYWlsIjoiZHVtbXkxMjJAdm4ubXkiLCJ1c2VybmFtZSI6ImR1bW15In0.D2rX5NQwIwg34EfmBRg9FxuYyWzyd1s5EFm4rUF8X63SLm7ypEYInYNx4C-h1FyAqUoVuPf4oVJ29ziKd1deTrEZoFzyajj1OkD5IS3zNTxQLy-kgVuSDkmicXJ6kMW-IVGRIBBBZLFu0E6aHn4-cyds5CAjDXj-7VbIDaMrtJTU4iu1RxaPaBZlsmkT7oHVRueUOymK-1786g8r93fb4TOwZLM38sz8fmwuia8G24dF_v4u4TJr3nfkmegJBNnGXiIvFpuEKlFDJMqDI8D5xN2xLta2myOZzecEAI8ctyv5Muu9M6y32guxVGBaMr3KQfzZwPlwUnMwEkYldR86YQ"
      },
      selected: false,
      document: null,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "<h5></h5>",
      selectedAudience: [],

      model: {
        CIRCULAR_ANNOUNCEMENT_ID: "",
        CIRCULAR_EVENT_ID: "",
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

      compType: [],
      consultantType: [],
      otherType: [],
       fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf, .xlsx",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-circular-edit",
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
    };
  }
};
</script>
<style lang="scss">
.bgcolor {
  background-color: white !important;
}
</style>
