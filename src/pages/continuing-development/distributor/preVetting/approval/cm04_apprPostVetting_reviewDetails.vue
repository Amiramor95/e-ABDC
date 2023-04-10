<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">View Details Program</h4>
    </div>
    <br />
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
                <td style="width: 15%">Name</td>
                <td>{{ PROGDATA.USERNAME }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ PROGDATA.USER_EMAIL }}</td>
              </tr>
              <tr>
                <td>Mobile Phone Number</td>
                <td>{{ PROGDATA.USER_MOBILE_NUM }}</td>
              </tr>
              <tr>
                <td>Office Phone Number</td>
                <td>{{ PROGDATA.USER_OFFICE_NUM }}</td>
              </tr>
              <tr>
                <td>Office Extension Number</td>
                <td>{{ PROGDATA.USER_EXTENSION_NUM }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div>
        <tabs
          :tabs="tabs"
          :currentTab="currentTab"
          :wrapper-class="'default-tabs'"
          :tab-class="'default-tabs__item'"
          :tab-active-class="'default-tabs__item_active'"
          :line-class="'default-tabs__active-line'"
          @onClick="handleClick"
        />
        <div>
          <div v-if="currentTab === 'tab1'">
            <div>
              <br />
              <table class="table table-striped"></table>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 15%">SUBMISSION TYPE</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_DETAILS_REPEAT }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">CPD CODE</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_CODE }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">PROGRAM TITLE</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_TITLE }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">PROPOSED/DATE START</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_DATE_START }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">PROPOSED/DATE END</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_DATE_END }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">VENUE</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_VENUE }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">MODE OF DELIVERY</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.TR_MODE_NAME }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">PROGRAM TYPE</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.TR_PROGRAM_TYPE_NAME }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">TARGET PARTICIPANT</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_TARGET }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">LEARNING OUTCOME</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_OUTCOME }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">TOTAL HOURS</td>
                    <td style="width: 1%">:</td>
                    <td>{{ PDATA.PROG_HOURS }}</td>
                  </tr>
                  <tr>
                    <td style="width: 15%">
                      TOTAL PARTICIPANT
                      <span
                        v-b-tooltip.hover
                        title="View Participant"
                        @click="viewParticipant"
                        class="badge badge-primary mr-2"
                      >
                        <i class="fa fa-external-link"></i
                      ></span>
                    </td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.PROGDATA.TOTAL_PARTICIPANT }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="currentTab === 'tab2'">
            <div>
              <br />
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
                :fields="SloFields"
                :data="SloFilteredData"
                no-data-label="No data found"
                :per-page="parseInt(perPage)"
                :datacount="SloRecordCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
              </va-data-table>
              <br />
            </div>
          </div>
          <div v-if="currentTab === 'tab3'">
            <br />
            <va-data-table
              id="tblFB"
              :fields="FeedbackFields"
              :data="FeedbackFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPageFb)"
              :datacount="FeedbackRecordCount"
              :dataperpage="parseInt(perPageFb)"
              clickable
            >
            </va-data-table>
            <br />
          </div>
          <div v-if="currentTab === 'tab4'">
            <br />
            <div class="ml-1 col-md-11">
              <vue-form-generator
                :model="model"
                :schema="fileUploadSchema"
                :options="formOptions"
                ref="fileUploadForm"
              >
              </vue-form-generator>
            </div>
          </div>
        </div>
      </div>
    </va-card>
    <br />
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
          @model-updated="onModelUpdated"
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
              @click="returnCpd"
              type="button"
              style="background: #dc3546; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="rejectCpd"
              type="button"
              style="background: #ff4a55; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Reject
            </button>
            <button
              v-if="this.PROGDATA.TS_ID != 19"
              @click="approveCpd"
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
  </va-card>
</template>


<script>
import { debounce } from "lodash";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule4 from "../../../../../app/module4/services01";
import moment from "moment";
import Vudal from "vudal";

const TABS = [
  {
    title: "Program Details",
    value: "tab1",
  },
  {
    title: "Sub Learning Objective",
    value: "tab2",
  },
  {
    title: "Feedback",
    value: "tab3",
  },
  {
    title: "Speaker Profile & Brochures",
    value: "tab4",
  },
];
export default {
  mounted() {
    var data = localStorage.getItem("approval-postVetting-reviewDetails");
    this.PROGDATA = JSON.parse(data);

    //alert(JSON.stringify(this.PROGDATA));
    this.getAllRecord();
    this.getSlo();
    this.getFeedback();
    this.getDocumentById();
    this.getAuditLog();

    if (this.PROGDATA.APPR_REMARK != null) {
      this.model.comment = this.PROGDATA.APPR_REMARK;
    } else if (this.PROGDATA.APPR_REMARK == null) {
      this.model.comment = "";
    }
  },

  components: {
    Tabs,
    Vudal,
  },
  methods: {
    async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },
    getAuditLog: async function () {
      const response = await servicesModule4.getAuditLogByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    search1: debounce(function (term1) {
      this.term1 = term1;
      console.log(this.term1);
    }, 400),

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab

    onModelUpdated(newVal, schema) {
      if (schema == "comment") {
        this.model.comment = String(newVal).toUpperCase();
      }
    },

    getSlo: async function () {
      const response = await servicesModule4.getSloByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.sloList = response;
      this.sloRecordCount = this.sloList.length;
    },

    getFeedback: async function () {
      const responseFB = await servicesModule4.getFeedbackByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.feedbackList = responseFB;
      this.feedbackRecordCount = this.feedbackList.length;
    },

    getAllRecord: async function () {
      const response = await servicesModule4.getDetailsByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.PDATA = response;

      this.PDATA.PROG_DATE_START = moment(this.PDATA.PROG_DATE_START).format(
        "DD-MMM-YYYY"
      );
      this.PDATA.PROG_DATE_END = moment(this.PDATA.PROG_DATE_END).format(
        "DD-MMM-YYYY"
      );

      if (this.PDATA.PROG_DETAILS_REPEAT == "0") {
        this.PDATA.PROG_DETAILS_REPEAT = "NEW";
      }
      if (this.PDATA.PROG_DETAILS_REPEAT == "1") {
        this.PDATA.PROG_DETAILS_REPEAT = "REPEATED";
      }
    },
    getDocumentById: async function () {
      const response = await servicesModule4.getDocumentById(
        this.PROGDATA.PROG_DETAILS_ID
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
          docID: element.PROG_DOCUMENT_ID,
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

    async back() {
      this.$router.go(-1);
    },
    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save as draft?")) {
         this.dataActionReady = true;
        const data = new FormData();
        data.append("PROG_APPROVAL_ID", this.PROGDATA.PROG_APPROVAL_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        var noted = JSON.parse(user).USER_GROUP_NAME + " ON REVIEW";
        data.append("NOTE", noted);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        try {
          const response = await servicesModule4.updateApproval(data);
          console.log(response);

          this.$router.go(-1);
           this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    approveCpd: async function () {
      if (confirm("Are you sure you want to approve this program?")) {
         this.dataActionReady = true;
        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("PROG_APPROVAL_ID", this.PROGDATA.PROG_APPROVAL_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "3");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        var num = this.PROGDATA.PROG_HOURS.toString();
        num = num.slice(0, num.indexOf(".") + 1);

        data.append("POINT", Number(num));

        const responsePart = await servicesModule4.getProgramParticipantByID(
          this.PROGDATA.PROG_DETAILS_ID
        );
        data.append("PARTLIST", JSON.stringify(responsePart));


        //notification
        data.append("NOTI_LOCATION", "d-postVettingProgramList");
        var remarkEntry = "(CPD-POST)Entry for " + this.PDATA.PROG_CODE + " has been approved by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("DIST_CREATE_BY", this.PROGDATA.DIST_CREATE_BY);
        data.append("DISTRIBUTOR_ID", this.PROGDATA.COMPANY_ID);

        try {
          const response = await servicesModule4.updateApproval(data);
          console.log(response);

          this.$router.push({
            name: "approval-postVetting-distributorList",
          });
           this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    returnCpd: async function () {
      if (
        confirm("Are you sure to return this submission to the distributor?")
      ) {
         this.dataActionReady = true;
        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("PROG_APPROVAL_ID", this.PROGDATA.PROG_APPROVAL_ID);
        data.append("STATUS", 7);
        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        const user = localStorage.getItem("user");
        var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;

        data.append("NOTE", noted);
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        //notification
        data.append("NOTI_LOCATION", "d-postVettingProgramList");
        var remarkEntry = "(CPD-POST)Entry for " + this.PDATA.PROG_CODE + " has been returned by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("DIST_CREATE_BY", this.PROGDATA.DIST_CREATE_BY);
        data.append("DISTRIBUTOR_ID", this.PROGDATA.COMPANY_ID);

        try {
          const response = await servicesModule4.returnSubmission(data);
          this.$router.push({
            name: "approval-postVetting-distributorList",
          });
           this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    rejectCpd: async function () {
      if (confirm("Are you sure to reject this submission?")) {
         this.dataActionReady = true;
        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("STATUS", 5);
        data.append("PROG_APPROVAL_ID", this.PROGDATA.PROG_APPROVAL_ID);
        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        const user = localStorage.getItem("user");
        var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //notification
        data.append("NOTI_LOCATION", "d-postVettingProgramList");
         var remarkEntry = "(CPD-POST)Entry for " + this.PDATA.PROG_CODE + " has been rejected by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("DIST_CREATE_BY", this.PROGDATA.DIST_CREATE_BY);
        data.append("DISTRIBUTOR_ID", this.PROGDATA.COMPANY_ID);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        const responsePart = await servicesModule4.getProgramParticipantByID(
          this.PROGDATA.PROG_DETAILS_ID
        );
        data.append("PARTLIST", JSON.stringify(responsePart));

        data.append("POINTS", this.PDATA.PROG_HOURS);

        try {
          const response = await servicesModule4.returnSubmission(data);
          this.$router.push({
            name: "approval-postVetting-distributorList",
          });
           this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    viewParticipant: async function () {
      const data = new FormData();
      data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);

      localStorage.setItem(
        "approval-view-participant",
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.$router.push({
        name: "approval-view-participant",
      });
    },
  },
  computed: {
    SloFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "SUB_LEARNING_OBJECTIVE",
          title: "SUB LEARNING OBJECTIVE",
          sortField: "SUB_LEARNING_OBJECTIVE",
        },
        {
          name: "TOPIC",
          title: "TOPIC",
          sortField: "TOPIC",
        },
        {
          name: "LS_METHOD_NAME",
          title: "METHOD",
          sortField: "LS_METHOD_NAME",
        },
        {
          name: "LS_MEDIA_NAME",
          title: "MEDIA",
          sortField: "LS_MEDIA_NAME",
        },
        {
          name: "LS_ASSESSMENT_NAME",
          title: "ASSESSMENT",
          sortField: "LS_ASSESSMENT_NAME",
        },
        {
          name: "SPEAKER",
          title: "SPEAKER",
          sortField: "SPEAKER",
        },
        {
          name: "HOURS",
          title: "HOURS",
          sortField: "HOURS",
        },
      ];
    },
    SloFilteredData() {
      if (!this.term1 || this.term1.length < 1) {
        return this.sloList;
      }
      return this.sloList.filter((item) => {
        return this.term1
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SUB_LEARNING_OBJECTIVE.toLowerCase().includes(v) ||
              item.TOPIC.toLowerCase().includes(v) ||
              item.LS_MEDIA_NAME.toLowerCase().includes(v) ||
              item.LS_METHOD_NAME.toLowerCase().includes(v) ||
              item.LS_ASSESSMENT_NAME.toLowerCase().includes(v) ||
              item.SPEAKER.toLowerCase().includes(v)
          );
      });
    },

    FeedbackFields() {
      return [
        {
          name: "ITEM",
          title: "ITEM",
        },
        {
          name: "RATING",
          title: "RATING",
        },
      ];
    },
    FeedbackFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.feedbackList;
      }
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
      dataActionReady : false,
      visibleLog: false,
      visibleProfile: false,
      header: "",
      field: [],
      term: null,
      term1: null,
      sloList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
      tabs: TABS,
      currentTab: "tab1",
      PDATA: "",
      PROGDATA: "",
      RecordCount: null,

      feedbackList: [],
      FeedbackRecordCount: null,
      perPageFb: "10",
      RecordList: [],

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

        fileUpload: "",
        file: [],
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
            required: true,
          },
        ],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
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
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>


<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>
