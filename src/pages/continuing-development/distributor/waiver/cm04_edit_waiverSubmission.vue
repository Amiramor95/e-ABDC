<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Waiver : Edit list of submission</h4>
    </div>
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card>
        <vudal name="simpleModal">
          <div class="header">
            {{ this.model.consultantName }} <i class="close icon">&times;</i>
          </div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="readMoreSchema"
              :options="formOptions"
            />
          </div>
          <div class="actions">
            <button
              type="button"
              class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
            >
              <i class="fa fa-times" /> &nbsp; Close
            </button>
            <button
              @click="editRecord"
              type="button"
              class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-save" /> &nbsp; Save
            </button>
          </div>
        </vudal>
        <div class="ml-2 col-md-12">
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
            :fields="Fields"
            :data="FilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="document" slot-scope="row">
              <span>
                <h4 class="mt-2">
                  <span
                    v-if="row.rowData.DOC_BLOB != '-'"
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(row.rowData)"
                    class="badge badge-danger mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                  ></span>
                </h4>
              </span>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span
                  v-if="props.rowData.WAIVER_REASON_ID == null"
                  v-b-tooltip.hover
                  title="Upload Supporting Document"
                  v-on:click="uploadDocument(props.rowData)"
                  class="badge badge-success mr-2"
                >
                  <i class="fa fa-upload"></i
                ></span>
                <span
                  v-if="props.rowData.WAIVER_REASON_ID != null"
                  v-b-tooltip.hover
                  title="Edit Supporting Document"
                  v-on:click="editDocument(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-edit"></i
                ></span>
                <span
                  v-b-tooltip.hover
                  title="Delete Record"
                  v-on:click="deleteRecord(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h5>
            </template>
          </va-data-table>
          <br />
          <br />
          <div>
            <table class="table table-striped"></table>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">
                    <b
                      >Total Rejected List
                      <downloadExcel
                        :json_data="candidateRejectedList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="column"
                      ></downloadExcel>
                    </b>
                  </td>
                  <td>:</td>
                  <td>{{ this.rejectedCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <br />
          <span class="ml-2 col-md-12" style="text-align: center"
            ><b>Option 1 : Upload Participant By Excel</b></span
          >
          <br />
          <div class="ml-1 col-md-12">
            <vue-form-generator
              :model="model"
              :schema="participantUploadSchema"
              :options="formOptions"
              ref="participantUploadForm"
            >
            </vue-form-generator>
            <br />
            <div class="float-right">
              <button
                @click="uploadReplace"
                type="button"
                style="background: #dc3546; color: #ffffff"
                class="ml-1 btn btn-fill btn-md"
              >
                <i class="fa fa-refresh" /> &nbsp; Replace All
              </button>
              <button
                @click="uploadAmend"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Amend Participant
              </button>
            </div>
            <br />
            <br />
            <span style="text-align: center"
              ><b>Option 2 : By Individual</b></span
            >
            <br />
            <br />
            <vue-form-generator
              :model="model"
              :schema="participantSchema"
              :options="formOptions"
              ref="participantForm"
            >
            </vue-form-generator>
            <br />
            <table class="ml-3 table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">NAME</td>
                  <td style="width: 1%">:</td>
                  <td>{{ name }}</td>
                </tr>
                <tr>
                  <td>NRIC NUMBER</td>
                  <td>:</td>
                  <td>{{ nric }}</td>
                </tr>
                <tr>
                  <td>PASSPORT NUMBER</td>
                  <td>:</td>
                  <td>{{ passport }}</td>
                </tr>
                <tr>
                  <td>REMARK</td>
                  <td>:</td>
                  <td>{{ existed }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div class="float-right">
              <button
                @click="searchParticipant"
                type="button"
                class="ml-1 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-search" /> &nbsp; Search Record
              </button>
              <button
                v-if="
                  this.existed != 'RECORD EXISTED' &&
                  this.existed != 'RECORD NOT FOUND'
                "
                @click="addParticipant"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Add Participant
              </button>
            </div>
          </div>
        </div>
      </va-card>
    </div>
    <br />
    <div v-if="dataActionReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <div class="float-right">
        <button
            @click="reject"
            type="button"
            style="background: #ff4a55; color: #ffffff"
            class="ml-1 btn btn-fill btn-md"
          >
            <i class="fa fa-ban" /> &nbsp; Discard
          </button>
        <button
          @click="accept"
          type="button"
          style="background: #87cb16; color: #ffffff"
          class="ml-1 btn btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Submit
        </button>
      </div>
    </div>
      <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import Vudal from "vudal";

export default {
  props: {},
  mounted() {
    this.checkRunNo();
    var data = localStorage.getItem("edit-waiver-submission");
    this.WDATA = JSON.parse(data);

    //alert(JSON.stringify( this.WDATA));

    this.getAcceptanceList();
    this.getWaiverReason();
  },
  components: { Vudal },
  methods: {
    getWaiverReason: async function () {
      const response = await servicesModule4.getWaiverReason();
      this.reasonList = response;
    },
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    checkRunNo: async function () {
      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);
      const response = await servicesModule4.checkRunNo(res.USER_DIST_ID);
    },

     getAcceptanceList: async function () {
      const response = await servicesModule4.getWaiverListByWaiverID(
        this.WDATA.WAIVER_ID
      );
      this.CandidateList = response;
      this.RecordCount = this.CandidateList.length;

      const responseReject = await servicesModule4.getWaiverRejectedListByID(
        this.WDATA.WAIVER_ID
      );
      this.candidateRejectedList = responseReject;
      this.rejectedCount = this.candidateRejectedList.length;
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

    async uploadDocument(data) {
      this.$modals.simpleModal.$show();
      this.model.consultantName = data.NAME;
      this.model.nricNumber = data.NRIC_NUMBER;
      this.model.waiverParticipantId = data.WAIVER_PARTICIPANT_ID;
      this.model.reason="";
      this.model.fileSupporting="";
    },

    async editDocument(data) {
      this.$modals.simpleModal.$show();

      this.model.consultantName = data.NAME;
      this.model.nricNumber = data.NRIC_NUMBER;
      this.model.waiverParticipantId = data.WAIVER_PARTICIPANT_ID;

      this.model.reason = {
        WAIVER_REASON_ID: data.WAIVER_REASON_ID,
        WAIVER_REASON: data.WAIVER_REASON,
      };

      const response = await servicesModule4.getWaiverDocumentById(
        data.WAIVER_PARTICIPANT_ID
      );
      //alert(JSON.stringify(response));
      response.forEach((element) => {
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
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.SR_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileSupporting = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileSupporting.push(data);
        //alert(JSON.stringify(data));
      });
    },

    async editRecord() {
      if (confirm("Are you sure to save this record?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("WAIVER_PARTICIPANT_ID", this.model.waiverParticipantId);
        data.append("WAIVER_REASON_ID", this.model.reason.WAIVER_REASON_ID);
        data.append("FILE_SUPPORTING", this.model.fileSupporting);

        try {
          const response = await servicesModule4.editWaiverRecord(data);

          this.getAcceptanceList();
          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    //*********************************************** */

    //participant
    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteConsultantWaiver(
          data.WAIVER_PARTICIPANT_ID
        );
        this.getAcceptanceList();
      }
    },

    //upload participant
    async uploadAmend() {
      if (confirm("Are you sure to amend the list?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("UPLOAD_TYPE", "1");

        try {
          const response = await servicesModule4.importExcelWaiverUpdate(data);
          this.getAcceptanceList();

          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async uploadReplace() {
      if (confirm("Are you sure to replace all the data list?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("UPLOAD_TYPE", "2");

        try {
          const response = await servicesModule4.importExcelWaiverUpdate(data);
          this.getAcceptanceList();
          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async addParticipant() {
      if (confirm("Are you sure to add this participant?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("CONSULTANT_NAME", this.model.participantName);
        data.append("CONSULTANT_NRIC", this.model.participantNric);
        data.append("CONSULTANT_PASSPORT_NO", this.model.participantPassport);

        try {
          const response = await servicesModule4.addWaiverParticipant(data);
          this.getAcceptanceList();

          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async searchParticipant() {
      this.dataUploadReady = true;
      const data = new FormData();
      data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
      data.append("SEARCH_DATA", this.model.searchData);

      try {
        const response = await servicesModule4.searchWaiverParticipant(data);
        //alert(JSON.stringify(response));

        this.model.participantName = response.data.CONSULTANT_NAME;
        this.model.participantNric = response.data.CONSULTANT_NRIC;
        this.model.participantPassport = response.data.CONSULTANT_PASSPORT_NO;

        this.name = response.data.CONSULTANT_NAME;

        this.nric = response.data.CONSULTANT_NRIC;
        this.passport = response.data.CONSULTANT_PASSPORT_NO;

        if (response.data.WAIVER_PARTICIPANT_ID != "") {
          this.existed = "RECORD EXISTED";
        } else {
          this.existed = "";
        }

        if (response.data.WAIVER_PARTICIPANT_ID == "-") {
          this.existed = "-";
        }
        if (response.data.CONSULTANT_NAME == "RECORD NOT FOUND") {
          this.existed = "RECORD NOT FOUND";
        }

        this.dataUploadReady = false;
      } catch (error) {
        console.log(error);
      }
    },

      reject: async function () {
      if (confirm("Are you sure you want to discard this list?")) {
        this.dataActionReady = true;
        try {
          const response = await servicesModule4.discardWaiverRecord(
            this.WDATA.WAIVER_ID
          );

          this.$router.go(-1);
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    accept: async function () {
      this.dataActionReady = true;
      const response = await servicesModule4.getCountWaiverRecord(
        this.WDATA.WAIVER_ID
      );
      // alert(JSON.stringify(response.length));
      if (response.length > 0) {
        alert(
          "Failed to submit the application.Waiver Reason and Supporting Document are required for each entry!"
        );

        this.dataActionReady = false;
      } else {
        if (confirm("Are you sure you want to submit this list?")) {
          this.dataActionReady = true;
          const data = new FormData();
          data.append("WAIVER_ID",  this.WDATA.WAIVER_ID);

          const user = JSON.parse(localStorage.getItem("user")).user_id;
          const res = await servicesModule4.getCompanyId(user);

          data.append("CREATE_BY", user);
          data.append("COMPANY_ID", res.USER_DIST_ID);
          data.append("PUBLISH_STATUS", 1);
          data.append("TS_ID", 15);
          data.append("ISSUBMIT", 1);
          data.append("RESUBMIT_ACTION", 0);

          var yr = new Date().getFullYear().toString().substr(2, 2);
          data.append("YEAR", yr);
          data.append("FULLYEAR", new Date().getFullYear().toString());
          data.append("PARTLIST", JSON.stringify(this.CandidateList));
          //alert(JSON.stringify(this.CandidateList));

          const approvalLevel = await services06Module0.getApprovalLevel(15, 1);
          data.append("APPR_LIST1", JSON.stringify(approvalLevel));

          const approvalLevel2 = await services06Module0.getApprovalLevel(
            15,
            2
          );

          data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

          //notification
          data.append("NOTI_LOCATION", "waiver-submission-list");

          data.append("NOTI_REMARK", "(WAIVER)New entry pending approval");

          try {
            const response = await servicesModule4.submitWaiverRecord(data);
            this.$router.go(-1);
            this.dataActionReady = false;
          } catch (error) {
            console.log(error);
          }
        }
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

    //general
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    Fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAME",
          title: "CONSULTANT NAME",
          sortField: "NAME",
        },
        {
          name: "NRIC_NUMBER",
          title: "NRIC NUMBER",
          sortField: "NRIC_NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
          sortField: "PASSPORT_NUMBER",
        },
        {
          name: "WAIVER_REASON",
          title: "REASON",
          sortField: "WAIVER_REASON",
        },
        {
          name: "__slot:document",
          title: "SUPPORTING DOCUMENT",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
        },
      ];
    },
    FilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.CandidateList;
      }
      return this.CandidateList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.NAME.toLowerCase().includes(v) ||
              item.NRIC_NUMBER.toLowerCase().includes(v) ||
              item.PASSPORT_NUMBER.toLowerCase().includes(v) ||
              item.WAIVER_REASON.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      dataActionReady: false,
      dataUploadReady: false,
      term: null,
      CandidateList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      partList: [],
      WDATA: "",
      rejectedCount: null,
      CandidateList: [],
      fileRecords: [],

      candidateRejectedList: [],
      column: ["NAME", "NRIC_NUMBER", "PASSPORT_NUMBER", "REASON"],
      excelname: "download-RejectedList",
      sheetname: "candidateRejectedList",

      name: "",
      passport: "",
      nric: "",
      existed: "",

      reasonList: [],

      model: {
        searchData: "",
        participantName: "",
        participantNric: "",
        participantPassport: "",

        reason: "",

        consultantName: "",
        waiverParticipantId: "",
        file: "",
        fileSupporting: [],
      },

      participantUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".xlxs",
                multiple: true,
                text: "Choose a File",
                model: "fileParticipant",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      participantSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "searchData",
            label: "Search Participant",
            placeholder: "Enter Nric Number / Passport Number",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantNric",
            styleClasses: "col-md-2",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantPassport",
            styleClasses: "col-md-2",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantName",
            styleClasses: "col-md-2",
          },
        ],
      },
      readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "reason",
                label: "Reason",
                placeholder: "Select Reason",
                selectOptions: {
                  multiple: false,
                  key: "WAIVER_REASON_ID",
                  label: "WAIVER_REASON",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.reasonList;
                },
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },

              {
                labels: "Upload Supporting Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a file",
                model: "fileSupporting",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                hint: "Accepted format : .pdf",
              },

              {
                type: "input",
                inputType: "hidden",
                model: "waiverParticipantId",
                styleClasses: "col-md-2",
              },
            ],
          },
        ],
      },

      fileViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
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
