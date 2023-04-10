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
            @files-selected-support-doc="filesSelectedSupportDoc"
            @on-before-delete-support-doc="onBeforeDeleteSupportDoc"
            @get-document-by-id="getDocumentById"
            @save-draft="saveAsDraft"
            @submit-form="submit"
            @clear="clearFilter"
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
import * as service02Module4 from "../../../../../../app/module4/services02";
import * as service01Module4 from "../../../../../../app/module4/services01";
import * as service07Module4 from "../../../../../../app/module4/services07";
import ModuleListingParticipantTable from "../../components/moduleListingParticipantTable";
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
    clearFilter(){
      this.term=''
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
        "/api/module4/fp_module/upload?CREATE_BY=" +
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
        const res = await service07Module4.removeFPParticipant(
          prop.rowData.FP_ID
        );
        var index = this.recordList.indexOf(prop.rowData);
        if (index !== -1) {
          this.recordList.splice(index, 1);
        }
      }
    },

    filesSelectedSupportDoc: async function (
      fileRecordsNewlySelected,
      participant
    ) {
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error,
        (fileRecord) => !fileRecord.test
      );
      // validFileRecords.forEach((element, index) => {
      //   element['FP_ID'] = participant.FP_ID
      //   validFileRecords = element
      // });
      this.fileRecordsForUploadSupportDoc[participant.FP_ID] =
        validFileRecords;
      // this.fileRecordsForUploadSupportDoc = this.fileRecordsForUploadSupportDoc.concat(validFileRecords);
      // this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },

    onBeforeDeleteSupportDoc: function (fileRecord, participant) {
      var confim = confirm("Are you sure you want to delete?");
      if (confim == true) {
        if (participant.DOCUMENT) {
          this.fileRecordsForUploadSupportDoc[participant.FP_ID] = [
            fileRecord,
          ];
        }

        var i =
          this.fileRecordsForUploadSupportDoc[participant.FP_ID].indexOf(
            fileRecord
          );
        if (i !== -1) {
          // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUploadSupportDoc[participant.FP_ID].splice(i, 1);
          var k = participant.DOCS.indexOf(fileRecord);
          if (k !== -1) participant.DOCS.splice(k, 1);
          this.uploadFileOject = [];
          for (
            i = 0;
            i < this.fileRecordsForUploadSupportDoc[participant.FP_ID].length;
            i++
          ) {
            this.uploadFileOject.push(
              this.fileRecordsForUploadSupportDoc[participant.FP_ID][i].file
            );
          }
          this.value = this.uploadFileOject;

          if (fileRecord.docID) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
            this.deleteSuppDocument(fileRecord.docID);
          }
        } else {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          this.deleteSuppDocument(fileRecord.docID);
        }
      }
    },

    deleteSuppDocument: async function (val) {
      await service07Module4.deleteFpDocument(val);
    },

    getDocumentById: async function (row) {
      let document = row.DOCUMENT;
      if (document) {
        document.DOC_BLOB = this.b64toBlobPDF(
          document.DOC_BLOB,
          "application/pdf"
        );
        const data = {
          docID: document.MOD_DOCUMENT_ID,
          name: document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
          size: document.DOC_FILESIZE,
          type: document.DOC_FILETYPE,
          ext: "pdf",
          url: window.URL.createObjectURL(document.DOC_BLOB),
          urlResized: null,
          dimensions: {
            height: 0,
            width: 0,
          },
        };
        document.DOC_BLOB = new File(
          [document.DOC_BLOB],
          document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
          {
            type: document.DOC_BLOB.DOC_FILETYPE,
          }
        );
        this.file = document.DOC_BLOB;
        row.DOCS.push(data);
      }
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;
      var byteCharacters = window.atob(b64Data);
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
      return new File(byteArrays, "pot", {
        type: contentType,
      });
    },

    async downloadRejectedList(moduleId) {
      await service07Module4.fpDownloadRejectedList(moduleId);
    },

    async saveAsDraft(data) {
      let counter = 0;
      var fileRecords = this.fileRecordsForUploadSupportDoc;
      fileRecords.forEach((element, index) => {
        let files = [];
        element.forEach((item, index) => {
          files[index] = item.file;
        });

        //File upload
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            counter++;
          }
        }
      });
      data.append("supportDocCounter", counter);
      this.submitLoading = true;
      await service07Module4.fpSubmit(data).then((res) => {
        if (this.fileRecordsForUploadSupportDoc.length > 0) {
          this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc);
        }
        if(res.status !== 400) this.$router.go(-1);
        this.submitLoading = false;
      });
    },

    async submit(data) {
      let counter = 0;
      var fileRecords = this.fileRecordsForUploadSupportDoc;
      fileRecords.forEach((element, index) => {
        let files = [];
        element.forEach((item, index) => {
          files[index] = item.file;
        });

        //File upload
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            counter++;
          }
        }
      });
      data.append("supportDocCounter", counter);
      this.submitLoading = true;
      await service07Module4.fpSubmit(data).then((res) => {
        if (this.fileRecordsForUploadSupportDoc.length > 0) {
          this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc);
        }
        if(res.status !== 400) this.$router.go(-1);
        this.submitLoading = false;
      });
    },

    uploadSupportDocument: function (fileRecords) {
      fileRecords.forEach((element, index) => {
        let files = [];
        element.forEach((item, index) => {
          files[index] = item.file;
        });
        const data = new FormData();
        //File upload
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            data.append("DOC_BLOB[]", files[i]);
          }
        }
        data.append("FP_ID", index);
        data.append("CREATE_BY", this.USERID);
        service07Module4.uploadFpDocument(data)
      });
    },
  },
  data() {
    return {
      submitLoading: false,
      title: "Islamic Financial Planner Module : New Submission",
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
      fileRecordsForUploadSupportDoc: [],
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
        } else if (item.PASSPORT_NUMBER && this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase() ) {
          return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v) ||
                item.FP_CATEGORY_DESCRIPTION.toLowerCase().includes(v) ||
                item.FPMOD_CODE_DESCRIPTION.toLowerCase().includes(v)
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
          name: "FP_CATEGORY_DESCRIPTION",
          title: "FP CATEGORY",
        },
        {
          name: "FPMOD_CODE_DESCRIPTION",
          title: "FPMOD CODE DESCRIPTION",
        },
        {
          name: "__slot:actions_support_docs",
          title: "Support Document",
          dataClass: "justify-content-center",
          width: "4%",
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
