<template>
  <va-card>
    <div v-if="!dataReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <b-row>
        <h4 slot="header" class="card-title">
          {{ title }}
        </h4>
      </b-row>

      <DetailSubmittedProgram
        :module="module"
        :participantLists="recordList"
        :route="'d-teachingViewDetailParticipant'"
      />

      <div class="my-3 ml-2 col-md-12" v-if="!module.PUBLISH_STATUS">
        Option 1: Upload Participant by Excel
        <button
          v-if="visibleOptionOne == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleOptionOne == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>
        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleOptionOne">
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
                :disabled="!fileRecordsForUpload.length"
                @click="ammendExcel"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Amendment Participants
              </button>
            </div>
            <div class="float-right">
              <button
                :disabled="!fileRecordsForUpload.length"
                @click="uploadExcel"
                type="button"
                class="ml-1 btn btn-danger btn-fill btn-md"
              >
                <i class="fa fa-refresh"></i> &nbsp; Replace All
              </button>
            </div>
          </form>
          <!-- end upload excel -->
        </b-collapse>
      </div>

      <div class="my-5 ml-2 col-md-12" v-if="!module.PUBLISH_STATUS">
        Option 2: By Individual
        <button
          v-if="visibleOptionTwo == true"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleOptionTwo == false"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>
        <hr />
        <b-collapse id="collapse-2" class="mt-2" v-model="visibleOptionTwo">
          <AddSingleParticipant
            :schema="formParticipantSchema"
            :model="model"
            :file-records-for-upload="fileRecordsForUploadSupportDoc"
            :user-id="USERID"
            @upload-by-individual="uploadByIndividual"
          />
          <br />
          <br />
          <hr />
        </b-collapse>
      </div>

      <div class="ml-2 col-md-12">
        List Of Participants
        <button
          v-if="visibleOptionThree == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleOptionThree == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>
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
          @view-document="viewPdf"
          @files-selected-support-doc="filesSelectedSupportDoc"
          @on-before-delete-support-doc="onBeforeDeleteSupportDoc"
          @get-document-by-id="getDocumentById"
          @save-draft="saveAsDraft"
          @submit-form="submit"
          @return-form="returnRecord"
        />
      </div>
      <div v-show="submitLoading">
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Submission...</strong>
        </div>
      </div>
    </div>
  </va-card>
</template>
<script>
import moment from "moment";
import * as service01Module4 from "../../../../../app/module4/services01";
import * as service07Module4 from "../../../../../app/module4/services07";
import ModuleListingParticipantTable from "../components/moduleListingParticipantTable";
import AddSingleParticipant from "../components/addSingleParticipant";
import DetailSubmittedProgram from "../components/detailSubmittedProgram";
export default {
  components: {
    ModuleListingParticipantTable,
    AddSingleParticipant,
    DetailSubmittedProgram,
  },
  mounted() {
    this.USER = JSON.parse(localStorage.getItem("user"));
    this.USERID = this.USER.user_id;
    this.checkRunNo();
    this.getModuleByID(this.$route.params.id);
  },
  methods: {
    async checkRunNo() {
      const res = await service01Module4.getCompanyId(this.USERID);
      this.COMPANYID = res.USER_DIST_ID;
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

    async getModuleByID(moduleId) {
      this.module = await service07Module4.getModule(moduleId);
      this.getParticipantList(moduleId);
      this.dataReady = true;
    },

    async getParticipantList(moduleId) {
      const res = await service07Module4.getTeachingParticipantList(moduleId);
      this.recordList = res.data;
    },

    async removeParticipant(prop) {
      var r = confirm("Are you sure to remove?");
      if (r == true) {
        const res = await service07Module4.removeTeachingParticipant(
          prop.rowData.TEACHING_ID
        );
        var index = this.recordList.indexOf(prop.rowData);
        if (index !== -1) {
          this.recordList.splice(index, 1);
        }
      }
    },

    uploadByIndividual: async function (formData) {
      this.dataUploadReady = true;
      const data = new FormData();
      const moduleId = this.$route.params.id;

      let mode = "";
      if (formData.teachingMode) {
        mode = formData.teachingMode.MODE_ID;
      }
      let type = "";
      if (formData.teachingType) {
        type = formData.teachingType.TYPE_ID;
      }

      data.append("module_id", moduleId);
      data.append("name", formData.consultantName);
      data.append("nric_number", formData.nricNumber);
      data.append("passport_number", formData.passportNumber);
      data.append("teaching_title", formData.title);
      data.append("teaching_mode", mode);
      data.append("teaching_type", type);
      data.append("teaching_hours", formData.teachingHours);
      data.append("teaching_date", moment(formData.date).format("YYYY-MM-DD"));
      //File upload
      if (formData.file.length != 0) {
        for (let i = 0; i < formData.file.length; i++) {
          data.append("file", formData.file[i]);
        }
      }
      data.append("create_by", this.USERID);
      let res = await service07Module4.addTeachingParticipant(data);
      // this.resetFormIndividual(formData);
      this.getParticipantList(moduleId);
      this.dataUploadReady = false;
    },

    async resetFormIndividual(model) {
      model.file = [];
      model.consultantName = "";
      model.nricNumber = "";
      model.passportNumber = "";
      model.title = "";
      model.date = "";
      model.teachingMode = "";
      model.teachingHours = "";
      model.teachingType = "";
    },

    async uploadExcel() {
      this.recordList = [];
      this.dataUploadReady = true;

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

      const moduleId = this.$route.params.id;
      var response = await this.$refs.vueFileAgent.upload(
        "/api/module4/teaching_module/upload?CREATE_BY=" + this.USER.user_id + "&COMPANY_ID=" +  this.USER.USER_DIST_ID + "&MODULE_ID=" + moduleId,
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

    async ammendExcel() {
      this.recordList = [];
      this.dataUploadReady = true;

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

      const moduleId = this.$route.params.id;
      var response = await this.$refs.vueFileAgent.upload(
        "/api/module4/teaching_module/amendment?MODULE_ID=" + moduleId,
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

    async downloadRejectedList(moduleId) {
      await service07Module4.teachingDownloadRejectedList(moduleId);
    },

    viewPdf(document) {
      var byteCharacters = window.atob(document["DOC_BLOB"]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], {
        type: "application/pdf;base64",
      });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
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
      //   element['TEACHING_ID'] = participant.TEACHING_ID
      //   validFileRecords = element
      // });
      this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID] =
        validFileRecords;
      // this.fileRecordsForUploadSupportDoc = this.fileRecordsForUploadSupportDoc.concat(validFileRecords);
      // this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },

    onBeforeDeleteSupportDoc: function (fileRecord, participant) {
      var confim = confirm("Are you sure you want to delete?");
      if (confim == true) {
        if (participant.DOCUMENT) {
          this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID] = [
            fileRecord,
          ];
        }

        var i =
          this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID].indexOf(
            fileRecord
          );
        if (i !== -1) {
          // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID].splice(i, 1);
          var k = participant.DOCS.indexOf(fileRecord);
          if (k !== -1) participant.DOCS.splice(k, 1);
          this.uploadFileOject = [];
          for (
            i = 0;
            i < this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID].length;
            i++
          ) {
            this.uploadFileOject.push(
              this.fileRecordsForUploadSupportDoc[participant.TEACHING_ID][i].file
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
      await service07Module4.deleteTeachingDocument(val);
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
      await service07Module4.teachingSubmit(data).then((res) => {

        if(res.status !== 400){
          if (this.fileRecordsForUploadSupportDoc.length > 0) {
            this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc);
          }
          this.$router.push("/distributor/d-teachingModuleList")
        }
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
      await service07Module4.teachingSubmit(data).then((res) => {

        if(res.status !== 400){
          if (this.fileRecordsForUploadSupportDoc.length > 0) {
            this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc);
          }
          this.$router.push("/distributor/d-teachingModuleList")
        }



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
        data.append("TEACHING_ID", index);
        data.append("CREATE_BY", this.USERID);
        service07Module4.uploadTeachingDocument(data)
      });
    },

    async returnRecord(data) {
      // console.error("returnRecord");
      // for (var pair of data.entries()) {
      //   console.error("formData", pair[0] + ", " + pair[1]);
      // }
      try {
        await service07Module4.moduleApprovalReturn(data);
        this.getModuleByID(this.$route.params.id);
      } catch (error) {
        // console.log(error);
      }
    },
  },
  data() {
    return {
      submitLoading: false,
      dataReady: false,
      title: "Teaching/Speaking: View Program Detail",
      totalRejected: 0,
      recordList: [],
      recordCount: 0,
      module: null,
      term: null,
      termDate: null,
      perPage: 10,
      visibleOptionOne: true,
      visibleOptionTwo: false,
      visibleOptionThree: true,
      dataUploadReady: false,
      fileRecords: [],
      fileRecordsForUpload: [],
      fileSupportRecords: [],
      fileRecordsForUploadSupportDoc: [],
      USER: null,
      USERID: null,
      COMPANYID: null,
      model: {
        consultantName: "",
        nricNumber: "",
        passportNumber: "",
        fileUpload: "",
        title: "",
        date: "",
        teachingMode: "",
        teachingType: "",
        teachingHours: "",
        file: [],
      },
      formParticipantSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "consultantName",
            label: "Consultant Name",
            placeholder: "Enter Consultant Name",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "input",
            inputType: "text",
            model: "nricNumber",
            label: "NRIC Number",
            placeholder: "Enter NRIC Number",
            styleClasses: "col-md-6",
            required: false,
            hint:
              "Note : Key-in NRIC number without " - ". Example: 800102034100",
          },
          {
            type: "input",
            inputType: "text",
            model: "passportNumber",
            label: "Passport Number",
            placeholder: "Enter Passport Number",
            styleClasses: "col-md-6",
            required: false,
          },
          {
            type: "input",
            inputType: "date",
            model: "date",
            label: "Teaching Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },
          {
            type: "input",
            inputType: "text",
            model: "title",
            label: "Title",
            placeholder: "Enter Title",
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "vueMultiSelect",
            model: "teachingMode",
            label: "Teaching Mode",
            placeholder: "Select Teaching Mode",
            selectOptions: {
              multiple: false,
              key: "MODE_ID",
              label: "MODE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.modeList;
            },
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "vueMultiSelect",
            model: "teachingType",
            label: "Teaching Type",
            placeholder: "Select Teaching Type",
            selectOptions: {
              multiple: false,
              key: "TYPE_ID",
              label: "TYPE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.typeList;
            },
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "input",
            inputType: "number",
            model: "teachingHours",
            label: "Teaching Hours",
            placeholder: "Enter Teaching Hours",
            styleClasses: "col-md-6",
            required: true,
          },
        ],
      },
    };
  },
  computed: {
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
          name: "TEACHING_MODE_DESCRIPTION",
          title: "TEACHING MODE",
        },
        {
          name: "TEACHING_TYPE_DESCRIPTION",
          title: "TEACHING TYPE",
        },
        {
          name: "TEACHING_HOURS",
          title: "TEACHING HOURS",
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

    modeList() {
      return [
        {
          MODE_ID: "1",
          MODE_NAME: "CLASSROOM",
        },
        {
          MODE_ID: "2",
          MODE_NAME: "ONLINE",
        }
      ];
    },

    typeList() {
      return [
        {
          TYPE_ID: "1",
          TYPE_NAME: "TRAINING MATERIALS",
        },
        {
          TYPE_ID: "2",
          TYPE_NAME: "ONLINE DOCUMENTS",
        },
        {
          TYPE_ID: "3",
          TYPE_NAME: "POWERPOINT",
        }
      ];
    },

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
                item.TITLE.toLowerCase().includes(v) ||
                item.TEACHING_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                item.TEACHING_TYPE_DESCRIPTION.toLowerCase().includes(v) ||
                item.NAME.toLowerCase().includes(v) ||
                (item.PASSPORT_NUMBER ? item.PASSPORT_NUMBER.toLowerCase().includes(v) : false) ||
                (item.NRIC_NUMBER ? item.NRIC_NUMBER.toLowerCase().includes(v) : false)
            );
        }
      });
    },
  },
};
</script>
