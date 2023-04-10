<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Waiver : New Upload Submission</h4>
    </div>
    <br />
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
      <div class="ml-1 col-md-12">
        <vue-form-generator
          :model="model"
          :schema="uploadExcelSchema"
          :options="formOptions"
          ref="uploadExcelForm"
        >
        </vue-form-generator>
        <br />
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

    </va-card>
    <br />
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card>
        <div>
          <div>
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
                      v-if="row.rowData.DOC_BLOB == '-'"
                      >
                      {{ row.rowData.DOC_BLOB }}
                  </span>
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
                    <td style="width: 1%">:</td>
                    <td>{{ this.rejectedCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </va-card>
      <br />
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
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import Vudal from "vudal";

export default {
  mounted() {
    this.checkRunNo();
    this.getWaiverReason();
  },
  components: { Vudal },

  methods: {
    getWaiverReason: async function () {
      const response = await servicesModule4.getWaiverReason();
      this.reasonList = response;
    },
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    async upload() {
      this.dataUploadReady = true;
      const data = new FormData();
      data.append("file", this.model.fileExcel);
      const user = JSON.parse(localStorage.getItem("user")).user_id;
      data.append("CREATE_BY", user);
      data.append(
        "COMPANY_ID",
        JSON.parse(localStorage.getItem("user")).USER_DIST_ID
      );

      try {
        const response1 = await servicesModule4.uploadNewWaiver(data);
        const response = await servicesModule4.getWaiverListByWaiverID(
          response1.WAIVER_ID
        );
        this.CandidateList = response;
        this.RecordCount = this.CandidateList.length;

        this.model.waiverID = response1.WAIVER_ID;

        const responseReject = await servicesModule4.getWaiverRejectedListByID(
          response1.WAIVER_ID
        );
        this.candidateRejectedList = responseReject;
        this.rejectedCount = this.candidateRejectedList.length;

        this.dataUploadReady = false;
      } catch (error) {
        console.log(error);
      }
    },

    async back() {
      this.$router.go(-1);
    },
    checkRunNo: async function () {
      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);
      const response = await servicesModule4.checkRunNo(res.USER_DIST_ID);
    },

    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteConsultantWaiver(
          data.WAIVER_PARTICIPANT_ID
        );
        this.getAcceptanceList();
      }
    },

    reject: async function () {
      if (confirm("Are you sure you want to discard this list?")) {
        try {
          const response = await servicesModule4.discardWaiverRecord(
            this.model.waiverID
          );

          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
    },
    accept: async function () {
      this.dataActionReady = true;
      const response = await servicesModule4.getCountWaiverRecord(
        this.model.waiverID
      );
      // alert(JSON.stringify(response.length));
      if (response.length > 0) {
        alert(
          "Failed to submit the application.Waiver Reason and Supporting Document are required for each entry!"
        );

        this.dataActionReady = false;
      } else {
        if (confirm("Are you sure you want to submit this list?")) {
          const data = new FormData();
          data.append("WAIVER_ID", this.model.waiverID);

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

          data.append("NOTI_REMARK", "(WAIVER) New entry pending approval");

          try {
            const response = await servicesModule4.submitWaiverRecord(data);
            this.$router.go(-1);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },

    getAcceptanceList: async function () {
      const response = await servicesModule4.getWaiverListByWaiverID(
        this.model.waiverID
      );
      this.CandidateList = response;
      this.RecordCount = this.CandidateList.length;

      const responseReject = await servicesModule4.getWaiverRejectedListByID(
        this.model.waiverID
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

    //participant
    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteConsultantWaiver(
          data.WAIVER_PARTICIPANT_ID
        );
        this.getAcceptanceList();
      }
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

      dataUploadReady: false,
      dataActionReady: false,
      term: null,
      CandidateList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      rejectedCount: null,

      candidateRejectedList: [],
      column: ["NAME", "NRIC_NUMBER", "PASSPORT_NUMBER", "REASON"],
      excelname: "download-RejectedList",
      sheetname: "RejectedList",

      reasonList: [],

      model: {
        fileExcel: "",
        waiverID: "",
        reason: "",

        consultantName: "",
        waiverParticipantId: "",
        fileSupporting: [],
      },

      uploadExcelSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Excel",
                accept: ".xlxs",
                multiple: true,
                text: "Choose a File",
                model: "fileExcel",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
                hint: "*Please use excel template provided by FIMM",
              },
              {
                type: "input",
                inputType: "hidden",
                model: "waiverID",
                styleClasses: "col-md-3",
              },
            ],
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
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>





