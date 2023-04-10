<template>
  <va-card>
    <b-row>
      <h4 slot="header" class="card-title">
        {{ title }}
      </h4>
    </b-row>
    <br />
    <!-- 1. upload excel -->
    <va-card>
      <form id="uploadParticipantForm">
        <div class="ml-2 col-md-12">
          Upload by Excel
          <hr />
          <!-- start upload excel -->
          <form id="uploadParticipantForm">
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
              <span class="text-danger"
                >Note : Please confirm your uploaded data by clicking submit
                button below.</span
              >
            </div>
            <br />
            <div class="float-right">
              <button
                @click="uploadExcel"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Upload
              </button>
            </div>
          </form>
          <!-- end upload excel -->
        </div>
      </form>
    </va-card>
    <va-card>
      <form id="uploadParticipantForm">
        <div class="ml-2 col-md-12">
          List Of Participants
          <hr />
          <div class="my-5 ml-2 col-md-12">
            <vue-form-generator
              :model="model"
              :schema="fileUploadSchema"
              :options="formOptions"
              ref="fileUploadForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
          </div>
          <ModuleListingParticipantTable
            :module="module"
            :fields="fields"
            :count="recordCount"
            :filter-data="filterData"
            :per-page="perPage"
            :visible-option-three="visibleOptionThree"
            :data-upload-ready="dataUploadReady"
            :total-rejected="totalRejected"
            :user-id="USERID"
            :company-id="COMPANYID"
            @download-rejected="downloadRejectedList"
            @filter="filter"
            @filter-date="filterDate"
            @remove-participant="removeParticipant"
            @save-draft="saveAsDraft"
            @submit-form="submit"
          />
        </div>
      <div v-show="submitLoading">
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Submission...</strong>
        </div>
      </div>
      </form>
    </va-card>
  </va-card>
</template>
<script>
import * as service01Module4 from "../../../../../app/module4/services01";
import * as service07Module4 from "../../../../../app/module4/services07";
import ModuleListingParticipantTable from "../components/moduleListingParticipantTable";
export default {
  components: {
    ModuleListingParticipantTable,
  },
  mounted() {
    this.USER = JSON.parse(localStorage.getItem("user"));
    this.USERID = this.USER.user_id;
    this.checkRunNo();
  },
  methods: {
    onModelUpdated(newVal, schema) {
      if (schema == "title") {
        this.model.title = String(newVal).toUpperCase();
      }
      if (schema == "publisher") {
        this.model.publisher = String(newVal).toUpperCase();
      }
      if (schema == "consultantName") {
        this.model.consultantName = String(newVal).toUpperCase();
      }
    },

    async checkRunNo() {
      const res = await service01Module4.getCompanyId(this.USERID);
      this.COMPANYID = res.USER_DIST_ID;
    },
    async uploadExcel() {
      const token = this.USER.access_token;
      const PANELTRACK = this.USER.user_type;
      const realmName = "realm0";
      const GID = this.USER.USER_GROUP_ID;
      const UID = this.USER.user_id;
      this.uploadHeaders = {
        Authorization: "Bearer " + token,
        PANELTRACK: PANELTRACK,
        realmName: realmName,
        GID: GID,
        UID: UID,
      };

      var response = await this.$refs.vueFileAgent.upload(
        "/api/module4/reading_module/upload?CREATE_BY=" +
        this.USER.user_id +
        "&COMPANY_ID=" +
        this.USER.USER_DIST_ID,
        this.uploadHeaders,
        this.fileRecordsForUpload
      );

      if (response[0].data.data) {
        this.dataUploadReady = false;

        this.recordList = response[0].data.data;
        this.totalRejected = response[0].data.total_rejected;
        this.MODULE_ID = response[0].data.MODULE_ID;
        this.module = await service07Module4.getModule(this.MODULE_ID);
        this.fileRecordsForUpload = [];
      }
    },

    filesSelected: function (fileRecordsNewlySelected) {
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },

    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
        }
        this.value = this.uploadFileOject;
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
      }
    },

    filter(value) {
      if(value.includes('-')){
        this.term =  value.substr(0,6)+value.substr(7,2)+value.substr(10,4);
      }
      else{
        this.term = value;
      }
    },

    filterDate(value) {
      this.termDate = value;
    },

    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },

    async removeParticipant(prop) {
      var r = confirm("Are you sure to remove?");
      if (r == true) {
        const res = await service07Module4.removeReadingParticipant(
          prop.rowData.MODULE_READING_ID
        );
        var index = this.recordList.indexOf(prop.rowData);
        if (index !== -1) {
          this.recordList.splice(index, 1);
        }
      }
    },

    async downloadRejectedList(moduleId) {
      await service07Module4.readingDownloadRejectedList(moduleId);
    },

    async saveAsDraft(data) {
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append("file", this.model.file[i]);
        }
      }
      this.submitLoading = true;

      await service07Module4.readingSubmit(data).then((res) => {
        if(res.status !== 422){
          this.$router.push("/distributor/d-readingModuleList");
        }
        this.submitLoading = false;

      });

    },

    async submit(data) {
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append("file", this.model.file[i]);
        }
      }
      this.submitLoading = true
      await service07Module4.readingSubmit(data).then((res) => {
        if(res.status !== 422) this.$router.push("/distributor/d-readingModuleList")
        this.submitLoading = false
      });
    },
  },
  data() {
    return {
      submitLoading: false,
      title: "Reading Approved Financial Literature : New Submission",
      USER: null,
      USERID: null,
      COMPANYID: null,
      recordCount: 0,
      recordList: [],
      term: null,
      termDate: null,
      perPage: 10,
      visibleOptionThree: true,
      dataUploadReady: false,
      module: null,
      totalRejected: 0,
      fileRecords: [],
      fileRecordsForUpload: [],
      model: {
        file: []
      },
      formOptions: {
        validateAfterChanged: true,
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Supporting Document",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12 pl-0",
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    filterData() {
      this.recordCount = this.recordList.length;
      if (!(this.term || this.termDate)) {
        return this.recordList;
      }

      return this.recordList.filter((item) => {
        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(
            item.DATE
          );
          return convertDate == this.termDate;
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v) ||
                (item.PASSPORT_NUMBER ? item.PASSPORT_NUMBER.toLowerCase().includes(v) : false) ||
                item.PUBLISHER.toLowerCase().includes(v) ||
                item.ZINE_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                item.TITLE.toLowerCase().includes(v)
            );
        }
      });
    },
    fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "__slot:DATE",
          title: "DATE",
          dataClass: "justify-content-center",
          width: "8%",
        },

        {
          name: "NAME",
          title: "NAME",
        },
        {
          name: "__slot:NRIC_NUMBER",
          title: "NRIC NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
        },
        {
          name: "TITLE",
          title: "TITLE",
        },
        {
          name: "ZINE_MODE_DESCRIPTION",
          title: "READING MODE",
        },
        {
          name: "PUBLISHER",
          title: "PUBLISHER",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "4%",
        },
      ];
    },
  },
};
</script>
<style>
  .theme-list .grid-block-wrapper .grid-block{
    z-index: 0;
  }
</style>
