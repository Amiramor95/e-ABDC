<template>
  <va-card>

    <b-row>
      <h4 slot="header" class="card-title">
        {{ title }}
      </h4>
    </b-row>
    <DetailSubmittedProgram
      :module="module"
      :participantLists="recordList"
      :route="'d-readingViewDetailParticipant'"
    />


    <div v-if="!dataReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>

      <div class="my-3 ml-2 col-md-12">
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
      <br/>
      <div class="my-5 ml-2 col-md-12" >
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
          <vue-form-generator
            :model="model"
            :schema="formParticipantSchema"
            :options="formOptions"
            ref="registerNewForm"
            @model-updated="onModelUpdated"
          >
          </vue-form-generator>
          <div class="mb-3 mr-3 float-right">
            <button
              @click="uploadByIndividual"
              type="button"
              class="ml-1 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Participant
            </button>
          </div>
        </b-collapse>
      </div>

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
      <br/>
      <div>
        <div v-if="submitLoading">
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Submission...</strong>
          </div>
        </div>
        <div v-else>
          <va-data-table
            :fields="fields"
            :data="filterData"
            no-data-label="No data found"
            :per-page="perPage"
            :datacount="recordCount"
            :dataperpage="perPage"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="DATE" slot-scope="props">
              {{ formatDate(new Date(props.rowData.DATE)) }}
            </template>
            <template slot="NRIC_NUMBER" slot-scope="props">
              {{ formatNRIC(props.rowData.NRIC_NUMBER) }}
            </template>

            <template slot="actions_support_docs" slot-scope="props">
              <!-- edit support document-->
              <form
                id="uploadSupportDocForm"
              >
                <VueFileAgent
                  ref="vueFileAgent"
                  :theme="'list'"
                  :multiple="false"
                  :deletable="true"
                  :meta="true"
                  :linkable="true"
                  :accept="'.pdf'"
                  :maxSize="'2MB'"
                  :helpText="'Choose document'"
                  :errorText="{
                  type: 'Invalid file type. Only .pdf is Allowed',
                  size: 'Files should not exceed 2MB in size',
                }"
                  @select="filesSelectedSupportDoc($event, props.rowData)"
                  @beforedelete="onBeforeDeleteSupportDoc($event, props.rowData)"
                  v-model="props.rowData.DOCS"
                >
                  {{ getDocumentById(props.rowData) }}
                </VueFileAgent>
              </form>
            </template>

            <template
              slot="actions"
              slot-scope="props"
            >
              <h4 class="mt-2">
              <span
                v-b-tooltip.hover
                title="Remove"
                v-on:click="removeParticipant(props)"
                class="badge badge-danger mr-2"
              >
                <i class="fa fa-minus"></i
                ></span>
              </h4>
            </template>

          </va-data-table>
        </div>
      </div>


      <br />
      <div v-if="totalRejected > 0">
        Total Rejected : {{ totalRejected }}
        <button
          type="button"
          class="btn btn-primary btn-fill btn-md"
          @click="downloadRejectedList()"
        >
          Download
        </button>
      </div>
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
  import * as services06Module0 from '../../../../../app/module0/services06'
  export default {
    components: {
      ModuleListingParticipantTable,
      AddSingleParticipant,
      DetailSubmittedProgram,
    },
    mounted() {
      var data = localStorage.getItem("f-readingAmendProgram");
      this.module = JSON.parse(data);
      this.getModuleByID(this.module.MODULE_ID)

      this.USER = JSON.parse(localStorage.getItem("user"));
      this.USERID = this.USER.user_id;
      this.COMPANYID=this.USER.TP_COMP_ID;
      // this.checkRunNo();

    },
    methods: {
      clearFilter(){
        this.term=''
      },

      async back() {
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

      formatNRIC: function (nric) {
        let newNric = "";
        if (nric) {
          let date = nric.substr(0, 6);
          let state = nric.substr(6, 2);
          let identity = nric.substr(8, 4);
          newNric = date + "-" + state + "-" + identity;
        }
        return newNric;
      },


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
      async getModuleByID(moduleId) {
        this.module = await service07Module4.getModule(moduleId);
        this.getParticipantList(moduleId);
        this.dataReady = true;

        this.model.status = this.module.TS_ID;

      },

      async getParticipantList(moduleId) {
        const res = await service07Module4.getReadingParticipantList(moduleId);
        this.recordList = res.data;
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

      uploadByIndividual: async function () {
        this.dataUploadReady = true;
        const data = new FormData();
        const moduleId = this.module.MODULE_ID;

        // let mode = "";
        // if (formData.zineMode) {
        //   mode = formData.zineMode.MODE_ID;
        // }

        data.append("module_id", moduleId);
        data.append("name", this.model.consultantName);
        data.append("nric_number", this.model.nricNumber);
        data.append("passport_number", this.model.passportNumber);
        data.append("title", this.model.title);
        // data.append("zine_mode", mode);
        // data.append("publisher", formData.publisher);
        // data.append("date", moment(formData.date).format("YYYY-MM-DD"));
        //File upload
        // if (formData.file.length != 0) {
        //   for (let i = 0; i < formData.file.length; i++) {
        //     data.append("file", formData.file[i]);
        //   }
        // }
        data.append("create_by", this.USERID);
        let res = await service07Module4.addReadingParticipant(data);
        this.resetFormIndividual(this.model);
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
        model.publisher = "";
        model.zineMode = "";
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

        const moduleId = this.module.MODULE_ID;
        var response = await this.$refs.vueFileAgent.upload(
          "/api/module4/reading_module/upload?CREATE_BY=" + this.USER.user_id + "&COMPANY_ID=" +  this.USER.USER_DIST_ID + "&MODULE_ID=" + moduleId,
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

        const moduleId = this.module.MODULE_ID;
        var response = await this.$refs.vueFileAgent.upload(
          "/api/module4/reading_module/amendment?MODULE_ID=" + moduleId,
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

      async downloadRejectedList() {
        await service07Module4.readingDownloadRejectedList(this.module.MODULE_ID);
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
        //   element['MODULE_WRITING_ID'] = participant.MODULE_WRITING_ID
        //   validFileRecords = element
        // });
        this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID] =
          validFileRecords;
        // this.fileRecordsForUploadSupportDoc = this.fileRecordsForUploadSupportDoc.concat(validFileRecords);
        // this.uploadFileObject = this.fileRecordsForUpload[0].file;
      },


      getDocumentById: async function () {
        const moduleId = this.module.MODULE_ID;
        const response = await service07Module4.getOneReadingDocument(moduleId);
        let document = response.data;
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
          this.model.file.push(data);
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
      async saveAsDraft() {
        var r = confirm("Are you sure to save as draft?");
        if (r == true) {
          // Vue.$toast.open({
          //     message: 'Saved As Draft',
          //     type: 'success',
          //   });
          const data = new FormData();
          data.append("TS_ID", 1); // save as draft
          data.append("USER", this.USERID);
          data.append("COMPANY_ID", this.COMPANYID);
          data.append("MODULE_ID", this.module.MODULE_ID);

          if (this.model.file.length != 0) {
            for (let i = 0; i < this.model.file.length; i++) {
              data.append("file", this.model.file[i]);
            }
          }
          this.submitLoading = true
          await service07Module4.readingSubmit(data).then((res) => {
            if(res.status !== 422) this.$router.push("/fimm/f-readingModuleList")
            this.submitLoading = false
          });
        }
      },

      async submit() {
        var r = confirm("Are you sure to submit?");
        if (r == true) {
          const data = new FormData();
          data.append("TS_ID", 15); // pending
          data.append("CATEGORY", 1);
          data.append("USER", this.USERID);
          data.append("COMPANY_ID", this.COMPANYID);
          data.append("MODULE_ID", this.module.MODULE_ID);

          data.append("NOTI_LOCATION", this.notiLocation);
          var remarkEntry =
            "(" + this.remarkTitle + ")New entry pending approval";
          data.append("NOTI_REMARK", remarkEntry);

          const approvalLevel = await services06Module0.getApprovalLevel(14, 3);
          data.append("APPR_LIST1", JSON.stringify(approvalLevel));

          const approvalLevel2 = await services06Module0.getApprovalLevel(14, 2);
          data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

          if (this.model.file.length != 0) {
            for (let i = 0; i < this.model.file.length; i++) {
              data.append("file", this.model.file[i]);
            }
          }
          this.submitLoading = true
          await service07Module4.readingSubmit(data).then((res) => {
            if(res.status !== 422) this.$router.push("/fimm/f-readingModuleList")
            this.submitLoading = false
          });
        }
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
          data.append("MODULE_WRITING_ID", index);
          data.append("CREATE_BY", this.USERID);
          service07Module4.uploadWritingDocument(data)
        });
      },

    },
    data() {
      return {
        submitLoading: false,
        dataReady: false,
        title: "F-Reading: View Program Detail (Amendment)",
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
          publisher: "",
          zineMode: "",
          file: [],
          status: 1
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
            // {
            //   type: "input",
            //   inputType: "text",
            //   model: "title",
            //   label: "Title",
            //   placeholder: "Enter Title",
            //   styleClasses: "col-md-6",
            //   required: true,
            // },
            // {
            //   type: "input",
            //   inputType: "date",
            //   model: "date",
            //   label: "Date",
            //   styleClasses: "col-md-6",
            //   required: true,
            //   validator: ["required"],
            // },
            // {
            //   type: "input",
            //   inputType: "text",
            //   model: "publisher",
            //   label: "Publisher",
            //   placeholder: "Enter Publisher",
            //   styleClasses: "col-md-6",
            //   required: true,
            //   validator: ["required"],
            // },
            // {
            //   type: "vueMultiSelect",
            //   model: "zineMode",
            //   label: "Zine Mode",
            //   placeholder: "Select Zine Mode",
            //   selectOptions: {
            //     multiple: false,
            //     key: "MODE_ID",
            //     label: "MODE_NAME",
            //     searchable: true,
            //   },
            //   values: (model, schema) => {
            //     return this.modeList;
            //   },
            //   styleClasses: "col-md-6",
            //   required: true,
            // },
          ],
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
            title: "QUALIFICATION TITLE",
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

      modeList() {
        return [
          {
            MODE_ID: "1",
            MODE_NAME: "E-ZINE",
          },
          {
            MODE_ID: "2",
            MODE_NAME: "MAGAZINE",
          },
          {
            MODE_ID: "3",
            MODE_NAME: "BOOK",
          },
          {
            MODE_ID: "4",
            MODE_NAME: "E-BOOK",
          },
        ];
      },

      filterData() {
        this.recordCount = this.recordList.length;
        if (!(this.term || this.termDate)) {
          return this.recordList;
        }

        return this.recordList.filter((item) => {
          if (this.termDate) {
            let convertDate = this.formatDateTimestampToDate(item.DATE);
            return convertDate == this.termDate;
          } else if (
            item.PASSPORT_NUMBER &&
            this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
          ) {
            return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase();
          } else {
            return this.term
              .toLowerCase()
              .split(" ")
              .every(
                (v) =>
                  item.NAME.toLowerCase().includes(v) ||
                  item.NRIC_NUMBER.toLowerCase().includes(v) ||
                  (item.PASSPORT_NUMBER ? item.PASSPORT_NUMBER.toLowerCase().includes(v) : false) ||
                  item.TITLE.toLowerCase().includes(v) ||
                  item.ZINE_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                  item.PUBLISHER.toLowerCase().includes(v)
              );
          }
        });
      },

      notiLocation() {
        let loc = "";
        if (this.module.MODULE_TYPE == 1) {
          loc = "approvalWritingDistributorList";
        } else if (this.module.MODULE_TYPE == 2) {
          loc = "approvalReadingDistributorList";
        } else if (this.module.MODULE_TYPE == 3) {
          loc = "approvalTeachingDistributorList";
        } else if (this.module.MODULE_TYPE == 4) {
          loc = "approvalAcademicDistributorList";
        } else if (this.module.MODULE_TYPE == 5) {
          loc = "approvalFPDistributorList";
        }

        return loc;
      },
      remarkTitle() {
        let title = "";
        if (this.module.MODULE_TYPE == 1) {
          title = "CPD-Writing";
        } else if (this.module.MODULE_TYPE == 2) {
          title = "CPD-Reading";
        } else if (this.module.MODULE_TYPE == 3) {
          title = "CPD-Teaching";
        } else if (this.module.MODULE_TYPE == 4) {
          title = "CPD-Academic";
        } else if (this.module.MODULE_TYPE == 5) {
          title = "CPD-FP";
        }

        return title;
      },
    },
  };
</script>
