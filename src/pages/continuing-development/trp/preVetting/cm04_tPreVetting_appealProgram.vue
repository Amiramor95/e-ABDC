<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">FPre-Vetting : Appeal Program</h4>
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
        Revocation Remark by FIMM
        <hr />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">Remark</td>
              <td>{{ PROGDATA.PROG_REMARK_FULL }}</td>
            </tr>
            <tr>
              <td colspan="2">Supporting Document</td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="ml-1 col-md-12">
                  <vue-form-generator
                    :model="model"
                    :schema="fileRevokeViewSchema"
                    :options="formOptions"
                    ref="fileRevokeViewForm"
                  >
                  </vue-form-generator>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
            <div class="ml-1 col-md-11">
              <vue-form-generator
                :model="model"
                :schema="fileViewSchema"
                :options="formOptions"
                ref="fileViewForm"
              >
              </vue-form-generator>
            </div>

            <br />
          </div>
        </div>
      </div>
    </va-card>
    <br />
    <br />
    <!-- Review Section -->
    <va-card>
      <div class="ml-2 col-md-12">
        Appeal Justification
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
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
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
              @click="accept"
              type="button"
              style="background: #87cb16; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-save" /> &nbsp; Accept
            </button>
            <button
              @click="appeal"
              type="button"
              style="background: #3472f7; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Appeal
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
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
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
    title: "Speaker Profile & Brochures",
    value: "tab3",
  },
];
export default {
  mounted() {
    var data = localStorage.getItem("t-preVettingAppealProgram");
    this.PROGDATA = JSON.parse(data);

    //alert(JSON.stringify(this.PROGDATA));
    this.getAllRecord();
    this.getSlo();
    this.getFeedback();
    this.getDocumentById();

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

        this.fileView = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileView.push(data);
        //alert(JSON.stringify(data));
      });
    },

    getDocumentById: async function () {
      const response = await servicesModule4.getRevokeDocumentById(
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
          docID: element.PROG_REVOKE_DOC_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileRevokeView = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileRevokeView.push(data);
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

    accept: async function () {
      if (
        confirm(
          "Are you sure you want to accept this? This action cannot be reversed."
        )
      ) {
        this.dataActionReady = true;
        const data = new FormData();

        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("APPEAL_STATUS", 1);

        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        data.append("POINTS", this.PROGDATA.PROG_HOURS);

        try {
          const response = await servicesModule4.appealProgram(data);
          this.$router.go(-1);

          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    appeal: async function () {
      if (confirm("Are you sure you want to submit appeal?")) {
        this.dataActionReady = true;
        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("TS_ID", 15);
        data.append("APPEAL_STATUS", 2);
        data.append("APPEAL_REMARK", this.model.comment);

        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        // const res = await servicesModule4.getCompanyId(JSON.parse(user).user_id);

        //notification
        data.append("NOTI_LOCATION", "appeal-selectionList");
        var remarkEntry ="(CPD-APPEAL)New submission pending approval " ;
        data.append("NOTI_REMARK", remarkEntry);

        const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(12, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        try {
          const response = await servicesModule4.appealProgram(data);
          const response1 = await servicesModule4.uploadAppealDocument(data);

          this.$router.push({
            name: "t-preVettingViewProgramList",
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
        "t-preVettingViewParticipant",
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.$router.push({
        name: "t-preVettingViewParticipant",
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
      if (!this.term || this.term.length < 1) {
        return this.sloList;
      }
      return this.sloList.filter((item) => {
        return this.term
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
  },
  data() {
    return {
      dataActionReady: false,
      visibleLog: true,
      visibleProfile: false,
      header: "",
      field: [],
      term: null,
      sloList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
      tabs: TABS,
      currentTab: "tab1",
      PDATA: "",
      PROGDATA: "",

      feedbackList: [],
      FeedbackRecordCount: null,

      model: {
        comment: "",

        fileUpload: "",
        fileView: [],
        file: [],
        fileRevokeView: [],
        showRemark: "",
      },

      reviewSchema: {
        fields: [
          {
            type: "textArea",
            model: "comment",
            label: "Justification",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Justification",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
            required: true,
          },
        ],
      },
      fileViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "fileView",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      fileRevokeViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "fileRevokeView",
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

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit-cease",
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
