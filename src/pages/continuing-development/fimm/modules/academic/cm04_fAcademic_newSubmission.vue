<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Academic/Professional Qualification : New Submission
      </h4>
    </div>
    <br />
    <!-- 1. upload excel -->
    <va-card>
      <form id="uploadParticipantForm">
      <div class="ml-2 col-md-12">
        Upload by Excel
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
      </form>
    </va-card>
    <!-- 2. list participant -->
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        List Of Participants
      
        <hr />

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
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="PUBLISH_DATE" slot-scope="props">
            {{ formatDate( new Date(props.rowData.PUBLISH_DATE))}}
          </template>

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
import * as servicesModule4 from "../../../../../app/module4/services02";
import * as services06Module0 from "../../../../../app/module0/services06";
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
  mounted() {},
  components: {},
  methods: {
    saveAsDraft: async function () {},
    submit: async function () {

    },

    //**upload function*/
    // async upload() {
    //   var content = [];
    //   const files = this.uploadFileObject;
    //   const fileReader = new FileReader(); // construction function that can read the file content
    //   var vm = this;
    //   fileReader.onload = async function (e) {
    //     const data = e.target.result;
    //     const workbook = XLSX.read(data, {
    //       type: "binary", // binary
    //       cellDates: true,
    //     });
    //     console.log(workbook.SheetNames.length);
    //     var i;
    //     for (i = 0; i < workbook.SheetNames.length; i++) {
    //       const wsname = workbook.SheetNames[i]; //take the first sheet
    //       console.log("wsname");
    //       const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
    //       content.push(ws);
    //     }
    //     console.log(JSON.stringify(content[1]));
    //     alert(JSON.stringify(content[1]));

    //     const response = await servicesModule4.getParticipant(
    //       JSON.stringify(content[1])
    //     );
    //     this.participantList = response.participantData;
    //     this.participantRecordCount = this.participantList.length;
    //   }.bind(this);
    //   fileReader.readAsBinaryString(files);
    // },

    //**file upload excel*/
   
   async upload() {
     //alert("here");
     //var $uploadParticipantForms = $('#uploadParticipantForm');
     var data = new FormData($('#uploadParticipantForm'));
     alert(new FormData($('#uploadParticipantForm')));

     const response = await servicesModule4.uploadWriting(data);

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
    //**back button*/
    back() {
      this.$router.go(-1);
    },

    //FUNCTION DATE
    formatDate: function (date) {
      var ms = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      return (
        date.getDate() + " " + ms[date.getMonth()] + " " + date.getFullYear()
      );
    },
  },
  computed: {
    ParticipantFields() {
        return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "",
          title: "DATE",
          sortField: "",
        },
        {
          name: "",
          title: "NAME",
          sortField: "",
        },
        {
          name: "",
          title: "NRIC NUMBER",
          sortField: "",
        },
        {
          name: "",
          title: "PASSPORT NUMBER",
          sortField: "",
        },
         {
          name: "",
          title: "QUALIFICATION TITLE",
          sortField: "",
        },
         {
          name: "",
          title: "QUALIFICATION MODE",
          sortField: "",
        },
         {
          name: "",
          title: "ORGANIZATION",
          sortField: "",
        },
       

        {
          name: "__slot:actions",
          title: "ACTIONS",
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
  },
  data() {
    return {
      fileRecordsForUpload: [],
      uploadFileObject: [],
      fileRecords: [],
      participantList: [],
      ParticipantRecordCount: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      term: null,

      model: {
        fileUpload: "",
        file: [],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Supported Document",
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

   