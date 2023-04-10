<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Suspension : Review Submission Form
      </h4>
    </div>
    <br />
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
              <br />
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">Submission Type</td>
                    <td>{{ DISTDATA.SUBMISSION_TYPE }}</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td>Date Start</td>
                    <td style="width: 20%">
                      {{ DISTDATA.DATE_START }}{{ DISTDATA.EFFECTIVE_DATE }}
                    </td>
                    <td style="width: 20%">Date End</td>
                    <td>{{ DISTDATA.DATE_END }}</td>
                  </tr>

                  <tr>
                    <td>Reason</td>
                    <td colspan="4">{{ DISTDATA.REASON }}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <vue-form-generator
                :model="model"
                :schema="fileViewSchema"
                :options="formOptions"
                ref="fileUploadForm"
              >
              </vue-form-generator>
            </div>
          </div>
          <div v-if="currentTab === 'tab2'">
            <div>
              <br />
              <br />
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">Distributor Name</td>
                    <td>{{ DISTDATA.DIST_NAME }}</td>
                  </tr>
                  <tr>
                    <td>Registration Number</td>
                    <td>{{ DISTDATA.DIST_REGI_NUM1 }}</td>
                  </tr>
                  <tr>
                    <td>New Registration Number</td>
                    <td>{{ DISTDATA.DIST_REGI_NUM2 }}</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>{{ DISTDATA.DIST_PHONE_NUMBER }}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      {{ DISTDATA.DIST_ADDR_1 }}
                      {{ DISTDATA.DIST_ADDR_2 }}
                      {{ DISTDATA.DIST_ADDR_3 }} {{ DISTDATA.POSTCODE_NO
                      }}{{ DISTDATA.DIST_POSTAL2 }}<br />
                      {{ DISTDATA.SET_CITY_NAME }}{{ DISTDATA.DIST_CITY2
                      }}<br />
                      {{ DISTDATA.STATE_NAME }}{{ DISTDATA.DIST_STATE2 }}<br />
                      {{ DISTDATA.COUNTRY_NAME }}{{ DISTDATA.DIST_COUNTRY2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{{ DISTDATA.TS_PARAM }}</td>
                  </tr>
                </tbody>
              </table>
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
        @click="reject"
        type="button"
        style="background: #ff4a55; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-ban" /> &nbsp; Reject
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
import Tabs from "vue-tabs-with-active-line";
import { debounce } from "lodash";
import * as servicesModule1 from "../../../../../app/module1/services01";
import * as services06Module0 from "../../../../../app/module0/services06";
import Vudal from "vudal";
import moment from "moment";

const TABS = [
  {
    title: "Submission Form",
    value: "tab1",
  },
  {
    title: "Distributor Profile",
    value: "tab2",
  },
];

export default {
  mounted() {
    var data = localStorage.getItem("view-suspensionSubmission-ceo");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA));
    this.model.comment = this.DISTDATA.APPR_REMARK;

    this.getAuditLog();
    this.getDocumentById();
    this.getDocumentByApprover();
  },

  components: { Vudal,Tabs },

  methods: {
    async readMore(data) {
      //alert(data.APPR_FULL);
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },
    back() {
      this.$router.go(-1);
    }, // back button

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab

    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    getDocumentById: async function () {
      const response = await servicesModule1.getDocumentById(
        this.DISTDATA.SUSPEND_REVOKE_ID
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

        this.file = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.file.push(data);
        //alert(JSON.stringify(data));
      });
    },
    getDocumentByApprover: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDocumentByApprover(
        this.DISTDATA.SUSPEND_REVOKE_ID,
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
          docID: element.SR_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileNew = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileNew.push(data);
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
      const response = await servicesModule1.getAuditApprovalByID(
        this.DISTDATA.SUSPEND_REVOKE_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save this as draft?")) {
        const data = new FormData();

        data.append(
          "SUSPEND_REVOKE_APPROVAL_ID",
          this.DISTDATA.SUSPEND_REVOKE_APPROVAL_ID
        );
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //File upload
        if (this.model.fileNew.length != 0) {
          for (let i = 0; i < this.model.fileNew.length; i++) {
            data.append("fileNew[]", this.model.fileNew[i]);
          }
        }

        try {
          const response = await servicesModule1.updateApproval(data);
          const response1 = await servicesModule1.createDocument(data);
          this.$router.push("/fimm/suspension-ceoApproval-list");
        } catch (error) {
          console.log(error);
        }
      }
    },

    returnSubmission: async function () {
      if (confirm("Are you sure you want to return this submission?")) {
        const data = new FormData();

        data.append(
          "SUSPEND_REVOKE_APPROVAL_ID",
          this.DISTDATA.SUSPEND_REVOKE_APPROVAL_ID
        );
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "9");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //dashboard notification to submitter
        const approvalLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "suspension-revocation-list");
       var NotificationNote ="(SUSPENSION) " +this.DISTDATA.DIST_NAME +".This Entry has been returned by CEO";
        data.append("NOTI_REMARK", NotificationNote);

        data.append("NOTIDASH2", 1);
        //dashboard notification to hod
        const approvalLevel2 = await services06Module0.getApprovalLevel(4, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        data.append("NOTI_LOCATION2", "view-suspension-revocation-list");
        var NotificationNote2 ="(SUSPENSION) " +this.DISTDATA.DIST_NAME +".This Entry has been returned to submitter by CEO";
        data.append("NOTI_REMARK2", NotificationNote2);

        //File upload
        if (this.model.fileNew.length != 0) {
          for (let i = 0; i < this.model.fileNew.length; i++) {
            data.append("fileNew[]", this.model.fileNew[i]);
          }
        }

        try {
          const response = await servicesModule1.updateApproval(data);
          const response1 = await servicesModule1.createDocument(data);
          this.$router.push("/fimm/suspension-ceoApproval-list");
        } catch (error) {
          console.log(error);
        }
      }
    },

    reject: async function () {
      if (confirm("Are you sure you want to reject this submission?")) {
        const data = new FormData();

        data.append(
          "SUSPEND_REVOKE_APPROVAL_ID",
          this.DISTDATA.SUSPEND_REVOKE_APPROVAL_ID
        );
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "5");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //dashboard notification to submitter
        const approvalLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "suspension-revocation-list");
        var NotificationNote ="(SUSPENSION) " +this.DISTDATA.DIST_NAME +".This Entry has been rejected by CEO";
        data.append("NOTI_REMARK", NotificationNote);

        data.append("NOTIDASH2", 1);
        //dashboard notification to hod
        const approvalLevel2 = await services06Module0.getApprovalLevel(4, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        data.append("NOTI_LOCATION2", "view-suspension-revocation-list");
        var NotificationNote2 ="(SUSPENSION) " +this.DISTDATA.DIST_NAME +".This Entry has been rejected by CEO";
        data.append("NOTI_REMARK2", NotificationNote2);

        //File upload
        if (this.model.fileNew.length != 0) {
          for (let i = 0; i < this.model.fileNew.length; i++) {
            data.append("fileNew[]", this.model.fileNew[i]);
          }
        }

        try {
          const response = await servicesModule1.updateApproval(data);
          const response1 = await servicesModule1.createDocument(data);
          this.$router.push("/fimm/suspension-ceoApproval-list");
        } catch (error) {
          console.log(error);
        }
      }
    },
    reviewSubmission: async function () {
      if (confirm("Are you sure you want to approve this submission?")) {
        const data = new FormData();

        data.append(
          "SUSPEND_REVOKE_APPROVAL_ID",
          this.DISTDATA.SUSPEND_REVOKE_APPROVAL_ID
        );
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "3");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //Send to ceo for approval
        const approvalLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "suspension-revocation-list");
        var NotificationNote ="(SUSPENSION) " +this.DISTDATA.DIST_NAME +".This Entry has been approved by CEO";
        data.append("NOTI_REMARK", NotificationNote);

        //distributor dashboard notification
        data.append(
          "DIST_NOTI_LOCATION",
          "suspension-revocation-notification-list"
        );
        data.append(
          "DIST_NOTI_REMARK",
          "Your Company has been suspended by FIMM"
        );

        // nedd for email
        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);
        //email notification
        data.append("DISTRIBUTOR_NAME", this.DISTDATA.DIST_NAME);
        data.append("REGISTRATION_NUMBER", this.DISTDATA.DIST_REGI_NUM1);
        data.append("NEW_REGISTRATION_NUMBER", this.DISTDATA.DIST_REGI_NUM2);
        data.append("SUBMISSION_TYPE", this.DISTDATA.SUBMISSION_TYPE);
        data.append("DATE_START", this.DISTDATA.DATE_START);
        data.append("DATE_END", this.DISTDATA.DATE_END);
        data.append("EFFECTIVE_DATE", this.DISTDATA.EFFECTIVE_DATE);
        data.append("REASON", this.DISTDATA.REASON);

        if (moment(this.DISTDATA.DATE_START).isSameOrBefore(moment())){
          data.append("NOTI_EMAIL", "Your Company Has been Suspended by FIMM :");
        }else{
          data.append("NOTI_EMAIL", "Your Company Will be Suspended by FIMM :");
        }

        //get x days for appeal
        const getAppealDays = await servicesModule1.getAppealDays("APPEAL_DURATION_SUSPENSION");
        var appealDays = getAppealDays.DIST_SET_VALUE;
        data.append("APPEAL_END", moment(this.DISTDATA.DATE_START).add(appealDays, "days").format("YYYY-MM-DD"));


        //File upload
        if (this.model.fileNew.length != 0) {
          for (let i = 0; i < this.model.fileNew.length; i++) {
            data.append("fileNew[]", this.model.fileNew[i]);
          }
        }

        try {
        const response = await servicesModule1.updateApprovalCeo(data);
          if (moment(this.DISTDATA.DATE_START).isSameOrBefore(moment())){
          const response1 = await servicesModule1.suspendDistributorConsultant(data);
          }
        const response2 = await servicesModule1.createDocument(data);
        this.$router.push("/fimm/suspension-ceoApproval-list");
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
      tabs: TABS,
      currentTab: "tab1",
      visibleProfile: false,
      DISTDATA: "",
      uploadFileOject: [],
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
        fileNew: [],
        comment: "",
        showRemark: "",
      },

      fileViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Document",
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
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
                model: "fileNew",
                type: "vfg-custom-multiple-file-edit-suspend",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.PDF)",
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
