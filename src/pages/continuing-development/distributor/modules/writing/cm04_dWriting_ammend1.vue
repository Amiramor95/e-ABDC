<template>
  <va-card>
    <div v-if="!dataReady">
      <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
        </div>
    </div>
    <div v-else>
    <div class="row">
      <h4 slot="header" class="card-title">
        Writing: View Program Detail (Amendment)
      </h4>
    </div>
    <br />
    <DetailSubmittedProgram :module="module" :participantLists="participantList" :route="'d-writingViewDetailParticipant'"/>
    <br />
    <!-- 1. upload excel -->
    <va-card>
      <div class="ml-2 col-md-12">
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
              <span class="color"
                >Note : Please confirm your uploaded data by clicking submit button
                below.</span
              >
            </div>
            <div class="float-right">
              <button
                :disabled="!fileRecordsForUpload.length && !this.USER_ID"
                @click="amendParticipant"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Amendment Participants
              </button>
            </div>
            <div class="float-right">
              <button
                :disabled="!fileRecordsForUpload.length && !this.USER_ID"
                @click="upload"
                type="button"
                class="ml-1 btn btn-danger btn-fill btn-md"
              >
                <i class="fa fa-refresh"></i> &nbsp; Replace All
              </button>
            </div>
          </form>
        </b-collapse>
      </div>
    </va-card>
    <br/>
    <va-card>
      <div class="ml-2 col-md-12">
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
          <UploadByIndividual @upload-by-individual="uploadByIndividual" :fileRecordsForUpload="fileRecordsForUpload" :userId="USER_ID"/>
        </b-collapse>
      </div>
    </va-card>
    <br/>
    <!-- 2. list participant -->
    <br />
    <va-card>
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

        <div v-if="dataUploadReady">
          <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </div>
        <div v-else>
          <b-collapse id="collapse-3" class="mt-2" v-model="visibleOptionThree">
            <div class="row">
              <div class="flex md2 offset--md10">
                <va-input
                  :value="term"
                  :placeholder="$t('Search')"
                  @input="search"
                  removable
                >
                  <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
              </div>
            </div>
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
              <template slot="WRITING_MODE" slot-scope="props">
                {{ formatMode( props.rowData.WRITING_MODE)}}
              </template>
              <template slot="PUBLISH_DATE" slot-scope="props">
                {{ formatDate( new Date(props.rowData.PUBLISH_DATE))}}
              </template>
              <template slot="NRIC_NUMBER" slot-scope="props">
                {{ formatNRIC( props.rowData.NRIC_NUMBER ) }}
              </template>

              <template slot="actions_support_docs" slot-scope="props">
                  <!-- view support document -->
                <!-- <div v-if="props.rowData.WRITING_DOCUMENT">
                  <span>
                    <h4 class="mt-2">
                      <span
                        v-b-tooltip.hover
                        title="View Document"
                        v-on:click="viewPdf(props.rowData.WRITING_DOCUMENT)"
                        class="badge badge-success mr-2"
                      >
                        <i class="fa fa-file-pdf-o"></i
                      ></span>
                    </h4>
                  </span>
                </div> -->
                <!-- edit support document-->
                <form id="uploadSupportDocForm">
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
                  {{ getDocumentById(props) }}
                  </VueFileAgent>
                </form>
              </template>

              <template slot="actions" slot-scope="props">
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
          </b-collapse>
        </div>
        <br />
          <div v-show="total_rejected">
            Total Rejected : {{total_rejected}}
            <button type="button" class="btn btn-primary btn-fill btn-md" @click="downloadRejectedList()">Download </button>
          </div>
        <br />
        <!-- <div class="ml-1 col-md-11">
          <vue-form-generator
            :model="model"
            :schema="fileUploadSchema"
            :options="formOptions"
            ref="fileUploadForm"
          >
          </vue-form-generator>
        </div> -->
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
    </div>
  </va-card>
</template>

<script>
  import { debounce } from "lodash";
  import moment from "moment";
  import Multiselect from "vue-multiselect";
  import Vudal from "vudal";
  import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg-core.css";
  import VueFormWizard from "vue-form-wizard";
  import "vue-form-wizard/dist/vue-form-wizard.min.css";
  import Vue from "vue";
  import {
    BootstrapVue,
    IconsPlugin
  } from "bootstrap-vue";
  //import "vue-form-generator/dist/vfg.css";
  // Import Bootstrap an BootstrapVue CSS files (order is important)
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";
  import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
  import * as servicesModule4 from "../../../../../app/module4/services02";
  import * as services01Module4 from "../../../../../app/module4/services01";
  import * as services06Module0 from "../../../../../app/module0/services06";
  import DetailSubmittedProgram from "../components/detailSubmittedProgram";
  import UploadByIndividual from './component/uploadByIndividual.vue';
  import * as service07Module4 from '../../../../../app/module4/services07'
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
    mounted() {
      var data = localStorage.getItem("d-writingAmendProgram");
      this.module = JSON.parse(data);
      this.getAllProgramType();
      this.checkRunNo();
      this.getModuleByID(this.module.MODULE_ID)
    },
    components: {
      DetailSubmittedProgram,
      UploadByIndividual
    },
    methods:
    {
      saveAsDraft: async function() {
        var r = confirm("Are you sure to save as draft?");
        if(r == true) {
          const data = new FormData();
          data.append("TS_ID", 1); // save as draft
          data.append("USER", this.USER_ID);
          data.append("COMPANY_ID", this.USER_DIST_ID);
          await servicesModule4.submitWriting(this.module.MODULE_ID, data).then(res => {
            if(this.fileRecordsForUploadSupportDoc.length > 0) {
              this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc)
            } else {
              this.$router.push("/distributor/d-writingModuleList");
            }
          });
        }
      },

      uploadSupportDocument: function(fileRecords) {
        fileRecords.forEach((element, index) => {
          let files = []
          element.forEach((item, index) => {
            files[index] = item.file
          });
          const data = new FormData();
          //File upload
          if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
              data.append("DOC_BLOB[]", files[i]);
            }
          }
          data.append("MODULE_WRITING_ID", index);
          data.append("CREATE_BY", this.USER_ID);
          servicesModule4.uploadWritingDocument(data).then(res => {
            this.$router.push("/distributor/d-writingModuleList");
          });
        });
      },

      getModuleByID: async function(id) {
        const res = await service07Module4.getWritingParticipantList(id);
        this.participantList = res.data
        this.dataReady = true
      },

      submit: async function() {
        var r = confirm("Are you sure to submit?”");
        if (r == true) {
          const data = new FormData();
          data.append("TS_ID", 15); // pending
          data.append("PARTICIPANTS", this.participantList);
          data.append("DOCUMENTS", this.model.fileUpload);
          data.append("USER", this.USER_ID);
          data.append("COMPANY_ID", this.USER_DIST_ID);

          data.append("NOTI_LOCATION", "approvalWritingDistributorList");
          var remarkEntry = "(CPD-Writing)New entry pending approval";
          data.append("NOTI_REMARK", remarkEntry);

          const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
          data.append("APPR_LIST1", JSON.stringify(approvalLevel));

          const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
          data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

          await servicesModule4.submitWriting(this.module.MODULE_ID, data).then(res => {
            if(this.fileRecordsForUploadSupportDoc.length > 0) {
              this.uploadSupportDocument(this.fileRecordsForUploadSupportDoc)
            } else {
              this.$router.push("/distributor/d-writingModuleList");
            }
          });
        }
      },

      checkRunNo: async function() {
        this.USER_ID = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await services01Module4.getCompanyId(this.USER_ID);
        const response = await services01Module4.checkRunNo(res.USER_DIST_ID);
        this.USER_DIST_ID = res.USER_DIST_ID
      },

      getAllProgramType: async function() {
        const response = await services01Module4.getAllProgramType();
        this.programTypeList = response;
      },

      async removeParticipant(prop) {
        var r = confirm("Are you sure to remove?");
        if (r == true) {
          // MODULE_WRITING_ID
          await servicesModule4.removeParticipant(prop.rowData.MODULE_WRITING_ID);
          var index = this.participantList.indexOf(prop.rowData);
          if (index !== -1) {
            this.participantList.splice(index, 1);
          }
        }
      },

      async upload() {
        this.dataUploadReady = true
        this.participantList = [];

        const user = localStorage.getItem('user');
        const token = JSON.parse(user).access_token;
        this.uploadHeaders = { 'Authorization': 'Bearer ' + token }
        var response = await this.$refs.vueFileAgent.upload('/api/module4/uploadWriting?CREATE_BY=' + this.USER_ID + '&MODULE_ID=' + this.module.MODULE_ID, this.uploadHeaders, this.fileRecordsForUpload);
        if(response[0].data.data) {
          this.dataUploadReady = false

          this.participantList = response[0].data.data;
          this.total_rejected = response[0].data.total_rejected
          this.MODULE_ID = response[0].data.MODULE_ID
          this.fileRecordsForUpload = [];
        }
      },

      async amendParticipant() {
        this.dataUploadReady = true
        this.participantList = [];

        const user = localStorage.getItem('user');
        const token = JSON.parse(user).access_token;
        this.uploadHeaders = { 'Authorization': 'Bearer ' + token }
        var response = await this.$refs.vueFileAgent.upload('/api/module4/amendmentWriting?CREATE_BY=' + this.USER_ID + '&MODULE_ID=' + this.module.MODULE_ID, this.uploadHeaders, this.fileRecordsForUpload);
        if(response[0].data.data) {
          this.dataUploadReady = false

          this.participantList = response[0].data.data;
          this.total_rejected = response[0].data.total_rejected
          this.MODULE_ID = response[0].data.MODULE_ID
          this.fileRecordsForUpload = [];
        }
      },

      filesSelected: function(fileRecordsNewlySelected) {
        //  this.uploadFileObject = [];
        var validFileRecords = fileRecordsNewlySelected.filter(
          (fileRecord) => !fileRecord.error
        );
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
        this.uploadFileObject = this.fileRecordsForUpload[0].file;
      },

      onBeforeDelete: function(fileRecord) {
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

      fileDeleted: function(fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },

      search: debounce(function (term) {
        this.term = term;
        console.log(this.term);
      }, 400),

      //**back button*/
      back() {
        this.$router.go(-1);
      },

      formatMode: function(mode) {
        var m = [
          "Article",
          "Book"
        ]
        return m[mode - 1];
      },

      //FUNCTION DATE
      formatDate: function(date) {
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

      formatNRIC: function(nric) {
        let newNric = ''
        if (nric) {
          let date = nric.substr(0, 6);
          let state = nric.substr(6, 2);
          let identity = nric.substr(8, 4);
          newNric = date + '-' + state + '-' + identity;
        }
        return newNric
      },

      async downloadRejectedList() {
        await servicesModule4.downloadRejectedList(this.MODULE_ID);
      },

      filesSelectedSupportDoc: async function (fileRecordsNewlySelected, participant) {
        //  this.uploadFileObject = [];
        var validFileRecords = fileRecordsNewlySelected.filter(
          (fileRecord) => !fileRecord.error,
          (fileRecord) => !fileRecord.test,
        );
        // validFileRecords.forEach((element, index) => {
        //   element['MODULE_WRITING_ID'] = participant.MODULE_WRITING_ID
        //   validFileRecords = element
        // });
        this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID] = validFileRecords;
        // this.fileRecordsForUploadSupportDoc = this.fileRecordsForUploadSupportDoc.concat(validFileRecords);
        // this.uploadFileObject = this.fileRecordsForUpload[0].file;
      },

      onBeforeDeleteSupportDoc: function (fileRecord, participant) {
        if(participant.WRITING_DOCUMENT){
          this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID] = [fileRecord]
        }

        var i = this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID].indexOf(fileRecord);
        if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID].splice(i, 1);
          var k = participant.DOCS.indexOf(fileRecord);
          if (k !== -1) participant.DOCS.splice(k, 1);
          this.uploadFileOject = [];
          for (i = 0; i < this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID].length; i++) {
            this.uploadFileOject.push(this.fileRecordsForUploadSupportDoc[participant.MODULE_WRITING_ID][i].file);
          }
          this.value = this.uploadFileOject;

          if(fileRecord.docID) {
            if (confirm('Are you sure you want to delete?')) {
              this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
            //   this.deleteSuppDocument(fileRecord.docID);
            }
          }
        } else {
          if (confirm('Are you sure you want to delete?')) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
            // this.deleteSuppDocument(fileRecord.docID);
          }
        }
      },

      deleteSuppDocument: async function (val) {
        // alert(val);
        await servicesModule4.deleteWritingDocument(val);
      },

      getDocumentById: async function(props) {
        let WD = props.rowData.WRITING_DOCUMENT
        if (WD) {
          WD.DOC_BLOB = this.b64toBlobPDF(
            WD.DOC_BLOB,
            "application/pdf"
          );
          const data = {
            docID: WD.MOD_DOCUMENT_ID,
            name: WD.DOC_ORIGINAL_NAME + "." + WD.DOC_FILETYPE,
            size: WD.DOC_FILESIZE,
            type: WD.DOC_FILETYPE,
            ext: "pdf",
            url: window.URL.createObjectURL(WD.DOC_BLOB),
            urlResized: null,
            dimensions: {
              height: 0,
              width: 0
            }
          };
          WD.DOC_BLOB = new File(
            [WD.DOC_BLOB],
            WD.DOC_ORIGINAL_NAME + "." + WD.DOC_FILETYPE, {
              type: WD.DOC_BLOB.DOC_FILETYPE
            }
          );
          this.file = WD.DOC_BLOB;
          props.rowData.DOCS.push(data);
          this.model.file.push(data);
        }
      },


      b64toBlobPDF(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (
          var offset = 0; offset < byteCharacters.length; offset += sliceSize
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
          type: contentType
        });
      },

      downloadPdf(wd) {
        let fileName = (Math.random() + 1).toString(36).substring(7) + '.pdf';
        var fileLink = document.createElement('a');
        var fileURL = 'data:' + wd['DOC_MIMETYPE'] + ';base64,' + wd['DOC_BLOB'];
        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
      },
      uploadByIndividual: async function(formData) {
        const moduleId = this.module.MODULE_ID
        const data = new FormData();
        //File upload
        if (formData.file.length != 0) {
          for (let i = 0; i < formData.file.length; i++) {
            data.append("DOC_BLOB", formData.file[i]);
          }
        }
        let writingMode = '';
        if(formData.writingMode) {
          writingMode = formData.writingMode.WRITING_MODE_ID
        }

        // data.append("CONSULTANT_ID", formData.consultant.CONSULTANT_ID);
        data.append("name", formData.consultantName);
        data.append("nric_number", formData.nricNumber);
        data.append("passport_number", formData.passportNumber);
        data.append("writing_title", formData.writingTitle);
        data.append("writing_mode", writingMode);
        data.append("publisher", formData.publisher);
        data.append("publish_date", moment(formData.publishDate).format("YYYY-MM-DD"));
        data.append("create_by", this.USER_ID);
        let res = await servicesModule4.addWritingParticipant(moduleId, data)
        this.dataUploadReady = true
        if(res.status) {
          this.resetFormIndividual(formData)
          this.dataUploadReady = false
          const resParticipant = await servicesModule4.getParticipantByModuleID(moduleId)
          this.participantList = resParticipant.data
        }else {
          this.dataUploadReady = false
        }
      },
      async resetFormIndividual(model) {
        model.consultant = "";
        model.file = [];
        model.consultantName = "";
        model.nricNumber = "";
        model.passportNumber = "";
        model.publishDate = null;
        model.publisher = "";
        model.writingMode = "";
        model.writingTitle = "";
      },
    },

    computed: {
      ParticipantFields() {
        return [
          // {
          //   name: "PUBLISH_DATE",
          //   title: "PUBLISH_DATE",
          // },
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "__slot:PUBLISH_DATE",
            title: "PUBLISH DATE",
            dataClass: "justify-content-center",
            width: "8%",
          },
          {
            name: "NAME",
            title: "NAME",
          },
          {
            name: "__slot:NRIC_NUMBER",
            title: "NRIC NUMBER"
          },
          {
            name: "PASSPORT_NUMBER",
            title: "PASSPORT NUMBER",
          },
          {
            name: "WRITING_TITLE",
            title: "TITLE",
          },
          {
            name: "__slot:WRITING_MODE",
            title: "WRITING MODE",
          },
          // {
          //   name: "WRITING_MODE",
          //   title: "WRITING MODE",
          // },
          {
            name: "PUBLISHER",
            title: "PUBLISHER",
          },
          {
            name: "APPROVE_POINT",
            title: "CPD POINT",
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

      ParticipantFilteredData() {
        this.ParticipantRecordCount = this.participantList.length
        if (!this.term || this.term.length < 1) {
          return this.participantList;
        }
        return this.participantList.filter((item) => {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.CREATE_TIMESTAMP.toLowerCase().includes(v) ||
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v) ||
                item.PASSPORT_NUMBER.toLowerCase().includes(v)
            );
        });
      },

    }, // end of method
    data() {
      return {
        fileRecordsForUpload: [],
        fileRecordsForUploadSupportDoc: [],
        total_rejected: null,
        dataReady: false,
        dataUploadReady: false,
        uploadFileObject: [],
        fileRecords: [],
        fileSupportRecords: [],
        uploadHeaders: [],
        participantList: [],
        module: null,
        MODULE_ID: null,
        ParticipantRecordCount: null,
        perPage: "10",
        currentPage: 1,
        count: 1,
        USER_DIST_ID: null,
        USER_ID: null,
        term: null,
        model: {
          fileUpload: "",
          file: [],
        },
        file: [],
        fileUploadSchema: {
          groups: [{
            styleClasses: "row",
            fields: [{
              // labels: "Upload Document",
              accept: ".pdf",
              multiple: false,
              text: "Choose a File",
              model: "file",
              type: "vfg-custom-multiple-file-edit-writing",
              styleClasses: "col-md-12",
            }, ],
          }, ],
        },
        formOptions: {
          validateAfterChanged: true,
        },
        visibleOptionOne: false,
        visibleOptionTwo: false,
        visibleOptionThree: true,
      };
    }, // end of data()
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

