<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Create New Circular
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
    <!-- <div class="row">
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
      </div>
    </div> -->
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
    <!-- <br />
                <br />
                <br />
                <br /> -->
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
  mounted() {
    //this.getAllEvent();
    this.getDistributorType();
    this.getConsultantType();
    this.getOthersAudience();
  },
  methods: {
    async getOthersAudience() {
      const response = await servicesModule0.getOtherType();
      this.otherType = response;
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
      const response = await servicesModule0.getAllCircular('SUPERVISION');
      console.log("get all event : " + JSON.stringify(response));
    },
    selectAudience() {
      console.log("asdasd");
    },

    async saveAsDraft() {
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
      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      data.append('EVENT_TYPE', 'SUPERVISION');

      try {
        const response = await servicesModule0.createCircular(data);
      } catch (error) {
        console.log(error);
      }
    },

     async submit() {
      // const containsKey = (obj, key) => Object.keys(obj).includes(key);
      // for (let i = 0; i < this.fileRecords.length; i++) {
      //   if (containsKey(this.fileRecords[i], "fileName")) {
      //     this.uploadFileOject.push(JSON.stringify(this.fileRecords[i]));
      //   } else {
      //     console.log("no filename");
      //   }
      // }
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
      data.append("MANAGE_CIRCULAR_ID", this.model.MANAGE_CIRCULAR_ID);
      data.append("CIRCULAR_EVENT_ID", this.model.CIRCULAR_EVENT_ID);
      data.append("ANNOUNCEMENT_STATUS", 2);
      data.append("EVENT_TITLE", this.model.EVENT_TITLE);
      data.append("EVENT_CONTENT", this.model.EVENT_CONTENT);
      data.append(
        "EVENT_DATE_START",
        moment(this.model.EVENT_DATE_START).format("YYYY-MM-DD")
      );
      // data.append(
      //   "EVENT_DATE_END",
      //   moment(this.model.EVENT_DATE_END).format("YYYY-MM-DD")
      // );
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
      data.append('EVENT_TYPE', 'SUPERVISION')
     const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);

      try {
        const response = await servicesModule0.createCircular(data);
      } catch (error) {
        console.log(error);
      }
    },

    back() {
      this.$router.go(-1);
    },

  
    
  },
  data() {
    return {
      selected: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],
      startDate: "",
      endDate: "",
      content: "",
      title: "",
      content: "<h5></h5>",
      selectedAudience: [],
      file: [],

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
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-circular",
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
