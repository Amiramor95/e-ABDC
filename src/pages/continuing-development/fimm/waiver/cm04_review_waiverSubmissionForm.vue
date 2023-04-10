<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Waiver : Review Submission</h4>
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
          Distributor's Person In Charge
          <button
            v-if="visibleProfile == true"
            v-b-toggle.collapse-1
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
          <button
            v-if="visibleProfile == false"
            v-b-toggle.collapse-1
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye"></i>
          </button>
          <hr />
          <b-collapse id="collapse-1" class="mt-2" v-model="visibleProfile">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">Submission Date</td>
                  <td>{{ WDATA.CREATE_TIMESTAMP }}</td>
                </tr>
                <tr>
                  <td style="width: 20%">Name</td>
                  <td>{{ PIC.USERNAME }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ PIC.USER_EMAIL }}</td>
                </tr>
                <tr>
                  <td>Mobile Phone Number</td>
                  <td>{{ PIC.USER_MOBILE_NUM }}</td>
                </tr>
                <tr>
                  <td>Office Phone Number</td>
                  <td>{{ PIC.USER_OFFICE_NUM }}</td>
                </tr>
                <tr>
                  <td>Office Extension Number</td>
                  <td>{{ PIC.USER_EXTENSION_NUM }}</td>
                </tr>
              </tbody>
            </table>
          </b-collapse>
        </div>
      </va-card>

      <br />
      <va-card>
        <div>
          <div>
            <div class="row">
              <div class="flex md2 offset--md10">
                <va-input
                  :value="term1"
                  :placeholder="$t('Search')"
                  @input="search1"
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

              <template slot="chkApprove" slot-scope="row">
                <span
                  v-if="row.rowData.ISAPPROVE == 3"
                  v-b-tooltip.hover
                  title="undo Approval"
                  v-on:click="uncheckSelection(row.rowData)"
                  style="background: #888888; color: #ffffff"
                  class="badge mr-2"
                >
                  <i class="fa fa-undo"></i>
                </span>
                <label class="form-checkbox">
                  <input
                    v-if="row.rowData.ISAPPROVE != 3"
                    type="checkbox"
                    v-model="selected"
                    :value="row.rowData.WAIVER_PARTICIPANT_ID"
                  />
                  <i class="form-icon"></i>
                </label>
              </template>
            </va-data-table>
          </div>
        </div>
      </va-card>
      <br />
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
                  @input="search1"
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
      <!-- Review Section -->
      <va-card>
        <div class="ml-2 col-md-12">
          Approval Section
          <hr />
          <vue-form-generator
            :model="model"
            :schema="reviewSchema"
            :options="formOptions"
            ref="reviewForm"
          >
          </vue-form-generator>
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
                @click="rejectSubmission"
                type="button"
                style="background: #ff4a55; color: #ffffff"
                class="ml-1 btn btn-fill btn-md"
              >
                <i class="fa fa-ban" /> &nbsp; Reject
              </button>
              <button
                @click="approveSubmission"
                type="button"
                style="background: #87cb16; color: #ffffff"
                class="ml-1 btn btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Approve
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
    </div>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule4 from "../../../../app/module4/services01";
import Vudal from "vudal";

export default {
  mounted() {
    var data = localStorage.getItem("review-waiver-submission");
    this.WDATA = JSON.parse(data);
    //alert(JSON.stringify(this.WDATA));

    this.getPic();
    this.getAcceptanceList();
    this.getAuditLog();

    if (this.model.comment != null || this.model.comment != "") {
      this.model.comment = this.WDATA.APPR_REMARK.toUpperCase();
    }
  },
  components: { Vudal },

  methods: {
    getAuditLog: async function () {
      const response = await servicesModule4.getWaiverAuditLogByID(
        this.WDATA.WAIVER_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    getPic: async function () {
        const response = await servicesModule4.getPIC(
        this.WDATA.DIST_CREATE_BY
      );
      this.PIC = response;
    },

    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    search1: debounce(function (term1) {
      this.term1 = term1;
      console.log(this.term1);
    }, 400),

    async back() {
      this.$router.go(-1);
    },

    async uncheckSelection(data) {
      if (confirm("Undo this approval?")) {
        //alert(data.WAIVER_PARTICIPANT_ID);
        try {
          const response = await servicesModule4.uncheckWaiverSelection(data);

          this.getAcceptanceList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async readMore(data) {
      //alert(data.APPR_FULL);
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },

    getAcceptanceList: async function () {
      const response = await servicesModule4.getWaiverListByWaiverID(
        this.WDATA.WAIVER_ID
      );
      this.CandidateList = response;
      this.RecordCount = this.CandidateList.length;
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

    saveAsDraft: async function () {
      if (confirm("Are you sure to save this as draft?")) {
        this.dataActionReady = true;
        const data = new FormData();

        data.append("WAIVER_APPROVAL_ID", this.WDATA.WAIVER_APPROVAL_ID);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("RETURNPART", JSON.stringify(this.selected));

        const user = localStorage.getItem("user");
        data.append("APPR_PUBLISH_STATUS", 0);
        data.append("TS_ID", "1");
        data.append("APPR_REMARK", this.model.comment.toUpperCase());
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        try {
          const response = await servicesModule4.updateWaiverSubmission(data);
          this.$router.push({
            name: "waiver-submission-list",
          });
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    returnSubmission: async function () {
      if (confirm("Are you sure to return of this submission?")) {
        this.dataActionReady = true;
        const data = new FormData();

        data.append("WAIVER_APPROVAL_ID", this.WDATA.WAIVER_APPROVAL_ID);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("DISTRIBUTOR_ID", this.WDATA.DISTRIBUTOR_ID);

        const user = localStorage.getItem("user");
        data.append("APPR_PUBLISH_STATUS", 1);
        data.append("TS_ID", "7");
        data.append("APPR_REMARK", this.model.comment.toUpperCase());
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("DIST_NOTI_LOCATION", "waiversubmissionlist");
        data.append(
          "DIST_NOTI_REMARK",
          "(WAIVER) This entry has been returned by FIMM"
        );

        try {
          const response = await servicesModule4.updateWaiverSubmission(data);
          this.$router.push({
            name: "waiver-submission-list",
          });
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    rejectSubmission: async function () {
      if (confirm("Are you sure to reject this submission?")) {
        this.dataActionReady = true;
        const data = new FormData();

        data.append("WAIVER_APPROVAL_ID", this.WDATA.WAIVER_APPROVAL_ID);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("DISTRIBUTOR_ID", this.WDATA.DISTRIBUTOR_ID);

        const user = localStorage.getItem("user");
        data.append("APPR_PUBLISH_STATUS", 1);
        data.append("TS_ID", "5");
        data.append("APPR_REMARK", this.model.comment.toUpperCase());
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("DIST_NOTI_LOCATION", "waiversubmissionlist");
        data.append(
          "DIST_NOTI_REMARK",
          "(WAIVER) This entry has been rejected by FIMM"
        );

        try {
          const response = await servicesModule4.updateWaiverSubmission(data);
          this.$router.push({
            name: "waiver-submission-list",
          });
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    approveSubmission: async function () {
      if (confirm("Are you sure to approve this submission?")) {
        this.dataActionReady = true;
        const data = new FormData();

        data.append("WAIVER_APPROVAL_ID", this.WDATA.WAIVER_APPROVAL_ID);
        data.append("WAIVER_ID", this.WDATA.WAIVER_ID);
        data.append("DISTRIBUTOR_ID", this.WDATA.DISTRIBUTOR_ID);

        const user = localStorage.getItem("user");
        data.append("APPR_PUBLISH_STATUS", 1);
        data.append("TS_ID", "3");
        data.append("APPR_REMARK", this.model.comment.toUpperCase());
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("RETURNPART", JSON.stringify(this.selected));
        data.append("TOTALRETURNPART", this.selected.length);

        data.append("DIST_NOTI_LOCATION", "waiversubmissionlist");
        data.append(
          "DIST_NOTI_REMARK",
          "(WAIVER) This entry has been approved by FIMM"
        );

        try {
          const response = await servicesModule4.updateWaiverSubmission(data);
          this.$router.push({
            name: "waiver-submission-list",
          });
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
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
          name: "__slot:chkApprove",
          title: "Approve",
        },
      ];
    },
    FilteredData() {
      if (!this.term1 || this.term1.length < 1) {
        return this.CandidateList;
      }
      return this.CandidateList.filter((item) => {
        return this.term1
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
      visibleProfile: false,
      dataActionReady: false,
      dataUploadReady: false,
      visibleLog: false,
      term: null,
      term1: null,
      CandidateList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      WDATA: "",
      selected: [],
      RecordList: [],
      count: 1,
      RecordCount: null,
      field: [],

      header: "",

      PIC:"",

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

      model: {
        comment: "",
        showRemark: "",
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

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
