<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Cessation : Submission for Approval
      </h4>

    </div>
    <br />
      <vue-html2pdf
      :show-layout="false"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      :filename="Date.now().toString()"
      :pdf-quality="2"
      :manual-pagination="false"
      :html-to-pdf-options="{ margin: 2 }"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="100%"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
    <va-card>
      <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Remark/Comments<i class="close icon">&times;</i>
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
        </div>
      </vudal>
      <div class="ml-2 col-md-12">
        Details Form
        <hr />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 35%">Cessation Type</td>
              <td>{{ DISTDATA.CESSATION_NAME }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Cessation Date</td>
              <td style="width: 20%">{{ DISTDATA.CESSATION_DATE }}</td>
              <td style="width: 20%">Legal Days(1)</td>
              <td>{{ DISTDATA.LEGAL_DATE }}</td>
            </tr>
            <tr>
              <td>
                Name of the distributor involved in the merger and acquisition
              </td>
              <td colspan="3">{{ DISTDATA.DISTRIBUTOR_MERGER_NAME }}</td>
            </tr>
            <tr>
              <td>Other(Please Specify)</td>
              <td colspan="3">{{ DISTDATA.OTHER_REMARK }}</td>
            </tr>
            <tr>
              <td colspan="4">
                Documents Uploaded <br />
                <vue-form-generator
                  :model="model"
                  :schema="fileViewSchema"
                  :options="formOptions"
                  ref="fileViewForm"
                >
                </vue-form-generator>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Pre-Payment Refund Details
        <hr />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 35%">Distributor Name</td>
              <td>{{ DISTDATA.DISTRIBUTOR_NAME }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Recipient Name</td>
              <td>{{ DISTDATA.RECIPIENT_NAME }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Beneficiary Bank</td>
              <td colspan="3">{{ DISTDATA.BANK_NAME }}</td>
            </tr>
            <tr>
              <td>Account Number</td>
              <td>{{ DISTDATA.ACCOUNT_NO }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="4">
                Authorization Letter <br />
                <vue-form-generator
                  :model="model"
                  :schema="fileViewLetterSchema"
                  :options="formOptions"
                  ref="fileViewLetterForm"
                >
                </vue-form-generator>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <br />
      </section>
    </vue-html2pdf>

    <va-card>
      <div class="ml-2 col-md-12">
        Transaction/Audit Log
        <downloadExcel
          :json_data="RecordList"
          :excelname="excelname"
          :sheetname="sheetname"
          :column="column"
        ></downloadExcel>
        <button
          v-if="visibleLog == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleLog == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-3" class="mt-2" v-model="visibleLog">
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
            :fields="RecordFields"
            :data="RecordFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="remark" slot-scope="props">
              {{ props.rowData.APPR_REMARK }}
              <span
                v-if="props.rowData.APPR_REMARK != '-'"
                v-b-tooltip.hover
                v-on:click="readMore(props.rowData)"
                title="Read more"
                class="badge mr-2"
              >
                <i class="fa fa-window-restore"></i
              ></span>
            </template>
          </va-data-table>
        </b-collapse>
      </div>
    </va-card>
    <br />

    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Approval Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchema"
          :options="formOptions"
          ref="verificationForm"
        >
        </vue-form-generator>
        <br />
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
        <br />
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
       <button
        @click="download"
        type="button"
        style="background: #888888; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-download" /> &nbsp; Download
      </button>
      <button
        @click="saveAsDraft"
        type="button"
        class="ml-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="returnSubmission"
        type="button"
        style="background: #dc3546; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Return
      </button>

      <button
        @click="reviewSubmission"
        type="button"
        style="background: #87cb16; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
      </button>
    </div>
  </va-card>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";
import Vudal from "vudal";
import { debounce } from "lodash";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
import VueHtml2pdf from "vue-html2pdf";

export default {
  mounted() {
    var data = localStorage.getItem("review-cessation-manager-approval");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA));

    this.model.comment = this.DISTDATA.APPR_REMARK;
    this.getCessationDocById();
    this.getLetterDocById();
    this.getAuditLog();
    this.getDocumentByApprover();
  },

  components: { Vudal,VueHtml2pdf },

  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async readMore(data) {
      //alert(data.APPR_FULL);
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },
     download() {
      this.$refs.html2Pdf.generatePdf();
    },
    back() {
      this.$router.go(-1);
    }, // back button

    getCessationDocById: async function () {
      const response = await servicesModule1.getCessationDocById(
        this.DISTDATA.CESSATION_ID
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
          docID: element.CD_DOCUMENT_ID,
          name:
            element.DOC_ORIGINAL_NAME +
            " - By " +
            element.CREATE_BY +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileView = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileView.push(data);
        //alert(JSON.stringify(data));
      });
    },



    getLetterDocById: async function () {
      const response = await servicesModule1.getLetterDocById(
        this.DISTDATA.CESSATION_ID
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
          docID: element.CAL_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileLetter = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileLetter.push(data);
        //alert(JSON.stringify(data));
      });
    },

    getDocumentByApprover: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDocumentByManagerApprover(
        this.DISTDATA.CESSATION_ID,
        JSON.parse(user).user_id
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
          docID: element.CD_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.file = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.file.push(data);
        //alert(JSON.stringify(data));
      });
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

    getAuditLog: async function () {
      const response = await servicesModule1.getDistributorAuditLogByID(
        this.DISTDATA.CESSATION_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save this as draft?")) {
        const data = new FormData();

        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);
        data.append("CESSATION_ID", this.DISTDATA.CESSATION_ID);
        data.append(
          "CESSATION_DISTRIBUTOR_APPROVAL_ID",
          this.DISTDATA.CESSATION_DISTRIBUTOR_APPROVAL_ID
        );

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        data.append("ISSUBMIT", "0");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule1.updateManagerApproval(data);
          const response1 = await servicesModule1.uploadCessationDocument(data);
          this.$router.push(
            "/distributor/cessation-submission-manager-approval"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    returnSubmission: async function () {
      if (confirm("Are you sure you want to return this submission?")) {
        const data = new FormData();

        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);
        data.append("CESSATION_ID", this.DISTDATA.CESSATION_ID);
        data.append(
          "CESSATION_DISTRIBUTOR_APPROVAL_ID",
          this.DISTDATA.CESSATION_DISTRIBUTOR_APPROVAL_ID
        );

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "7");
        data.append("ISSUBMIT", "0");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        //admindashboard notification

        const approvalLevel = await services06Module0.getApprovalLevelDistributor(3, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("DIST_NOTI_LOCATION", "cessation-submission");
        data.append(
          "DIST_NOTI_REMARK",
          "(CESSATION) This entry has been returned by Distributor Manager"
        );

        data.append("NOTIDASH2", 0);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule1.updateManagerApproval(data);
          const response1 = await servicesModule1.uploadCessationDocument(data);
          this.$router.push(
            "/distributor/cessation-submission-manager-approval"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    reviewSubmission: async function () {
      //ts_id = 3 (approved)
      if (confirm("Are you sure you want to approve this submission?")) {

        const data = new FormData();

        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);
        data.append("CESSATION_ID", this.DISTDATA.CESSATION_ID);
        data.append(
          "CESSATION_DISTRIBUTOR_APPROVAL_ID",
          this.DISTDATA.CESSATION_DISTRIBUTOR_APPROVAL_ID
        );

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "3");
        data.append("ISSUBMIT", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        data.append("SUBMISSION_DATE", moment().format("YYYY-MM-DD"));

        //admindashboard notification

        const approvalLevel = await services06Module0.getApprovalLevel(3, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));


          const response = await servicesModule1.getDistributorInfo(
            JSON.parse(user).USER_DIST_ID
          );

        var NotificationNote =
          "(CESSATION) New Entry pending approval for " +
          response.DIST_NAME ;
        data.append("NOTI_REMARK", NotificationNote);
        data.append("NOTI_LOCATION", "cessation-submission-list");


        data.append("NOTIDASH2", 0);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule1.updateManagerApproval(data);
          const response1 = await servicesModule1.uploadCessationDocument(data);
          this.$router.push(
            "/distributor/cessation-submission-manager-approval"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {
    RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Date",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "GROUP_NAME",
          title: "Group",
          sortField: "GROUP_NAME",
        },
        {
          name: "USER_NAME",
          title: "Creation By",
          sortField: "USER_NAME",
        },
        {
          name: "TS_PARAM",
          title: "Activity",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:remark",
          title: "Remarks/Comments",
        },
        {
          name: "LATEST_UPDATE",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
        },
      ];
    },
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.USER_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.APPR_REMARK.toLowerCase().includes(v) ||
              item.GROUP_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      DISTDATA: "",
      visibleLog: true,

      column: [
        "APPROVAL ID",
        "DATE",
        "GROUP",
        "CREATION BY",
        "ACTIVITY",
        "LATEST UPDATE",
        "REMARK/COMMENTS",
      ],
      excelname: "download-TransactionList",
      sheetname: "TransactionList",

      RecordList: [],
      count: 1,
      RecordCount: null,
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      header: "",

      model: {
        fileUpload: "",
        file: [],
        fileLetter: [],
        fileView: [],
        comment: "",
        showRemark: "",

      },

      fileViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileView",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      fileViewLetterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileLetter",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
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
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      reviewSchema: {
        fields: [
          {
            type: "textArea",
            model: "comment",
            label: "Remark/Comments",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark/Comments",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit-cease",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.PDF)",
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
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
}
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
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>
