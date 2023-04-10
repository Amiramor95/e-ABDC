<template>
  <va-card>
    <template slot="header">
      <br />
      <h4>Bulk Upload Registration</h4>
    </template>
    <br />
     <!-- <div class="col-12">
        <vue-form-generator
          :model="model"
          :schema="licenseSchema"
          :options="formOptions"
          ref="licenseForm"
        >
        </vue-form-generator>
      </div> -->
      <div id="app" class="ml-1 col-11">
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
            type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
            size: 'Files should not exceed 2MB in size'
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </div>
      <br />
      <div class="float-right">
        <button
          @click="upload"
          type="button"
          class="mr-2 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-upload" /> &nbsp; Upload
        </button>
      </div>
    <br />
    <br>
     <va-card>
    <h5 class="">List of Candidate</h5>
    <br />
    <va-data-table
      :fields="fields"
      :data="filteredData"
      no-data-label="No data found"
      :per-page="parseInt(perPage)"
      :datacount="RecordCount"
      :dataperpage="parseInt(perPage)"
      clickable
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
     
      <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
          <span
            v-b-tooltip.hover
            title="detail"
            v-on:click="remove(props)"
            class="badge badge-danger mr-2"
          >
            <i class="fa fa-minus"></i
          ></span>
        </h4>
      </template>
    </va-data-table>
    <br />

    <h6>
      Total success data : {{ acceptanceList.length }}&nbsp;
      <downloadExcel
        :json_data="acceptanceList"
        :excelname="excelname"
        :sheetname="sheetname"
        :column="column"
      ></downloadExcel>
    </h6>
    <h6>
      Total failed data : {{ failedList.length }}&nbsp;
      <downloadExcel
        :json_data="failedList"
        :excelname="excelname"
        :sheetname="sheetname"
        :column="column"
      ></downloadExcel>
    </h6>
     </va-card>
     <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
     <div class="float-right">
      <button
        @click="discard"
        type="button"
        class="ml-2 btn btn-danger btn-fill btn-md"
      >
        <i class="fa fa-minus" /> &nbsp; Discard
      </button>
      <button
        @click="accept"
        type="button"
        class="ml-2 btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Accept
      </button>
    </div>
  </va-card>
  
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule0 from "../../../app/module0/services";
import * as services06Module1 from "../../../app/module1/services06";
import * as services06Module3 from "../../../app/module3/services06";
import * as fileServices from "../../../app/fileServices";
import XLSX from "xlsx";

Vue.use(VueFormGenerator);

export default {
  props: {},
  mounted() {
    this.user = localStorage.getItem("user");
  },
  methods: {
    search: debounce(function(term) {
      this.term = term;
    }, 400),

    discard() {
      this.acceptanceList = [];
      this.file ="";
    },
   

 async back() {
      this.$router.go(-1);
    },
    async accept() {
      const user = localStorage.getItem("user");
      const data = new FormData();
      data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
      data.append("acceptance_list", JSON.stringify(this.acceptanceList));
      //alert(JSON.stringify(this.acceptanceList))
      const response = await services06Module1.createAcceptanceList(data);
      this.$router.go(-1);
    },

    remove(data) {
      this.acceptanceList.splice(data.rowIndex, 1);
    },

    filesSelected: function(fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      console.log(fileRecordsNewlySelected);
      this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },
      onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

    async upload() {
      var content = [];
      const files = this.uploadFileObject;
      const fileReader = new FileReader(); // construction function that can read the file content
      var vm = this;
      fileReader.onload = async function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary" // binary
        });
        console.log(workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
          const wsname = workbook.SheetNames[i]; //take the first sheet
          console.log("wsname");
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
          content.push(ws);
        }
        console.log(JSON.stringify(content));

        const response = await services06Module3.getConsultantCaRecord(
          JSON.stringify(content[0])
        );
        //alert(JSON.stringify(response.successData));
        this.acceptanceList = response.successData;
        this.RecordCount = this.acceptanceList.length;
        this.failedList = response.failedData;
      }.bind(this);
      fileReader.readAsBinaryString(files);

      //alert(this.acceptanceList);
    }
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "name",
          title: "Name",
          width: "20%"
        },
        {
          name: "NRIC",
          title: "NRIC Number"
          // width: "40%"
        },
        {
          name: "passport_number",
          title: "PASSPORT NUMBER"
          // width: "40%"
        },
        {
          name: "email",
          title: "Email"
       
        },
        {
          name: "handphone_number",
          title: "Handphone Number"
        
        },
        {
          name: "license_type",
          title: "License Type"
      
        },
        {
          name: "stafforagent",
          title: "Staff/Agent"
        
        },
         {
          name: "statusCons",
          title: "Consultant Alert Status"
        
        },
        {
          name: "__slot:actions",
          title: "Action"
        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.acceptanceList;
      }
    }
  },
  data() {
    return {
    


      column: [
        "Name",
        "NRIC",
        "Passport Number",
        "Email",
        "Handphone Number",
        "License Type",
        "Staff/Agent",
        "Reason"
      ],
      excelname: "download-file",
      sheetname: "download-sheet",
      fileRecordsForUpload: [],
      uploadFileObject: [],
      fileRecords: [],
      radioSelectedOption: "option1",
     count: 1,
      RecordCount: null,
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      acceptanceList: [],
      failedList: [],
      model: {
        title: "",
        dateCreated: "",
        createdBy: "",
        status: "",

        license:"",
        
      },
    
      formOptions: {
        validateAfterChanged: true,
      },
    };
  }
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

.alignleft {
  display: flex;
  justify-content: flex-end;
}
</style>
