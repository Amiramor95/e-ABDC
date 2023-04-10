<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">{{title}}</h4>
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
              <td style="width: 25%">Remark</td>
              <td>: {{ PROGDATA.REVOKE_REMARK }}</td>
            </tr>
            <tr>
              <td >Supporting Document</td>
              <td>:</td>
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
        <table class="table table-striped">
          <tbody>
          <tr>
            <td style="width: 15%">MODULE CODE</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.MODULE_CODE }}</td>
          </tr>
          <tr>
            <td style="width: 15%">MODULE TITLE</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.MODULE_TITLE }}</td>
          </tr>
          <tr>
            <td style="width: 15%">LATEST UPDATE BY</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.LATEST_UPDATE_NAME }}</td>
          </tr>
          <tr>
            <td style="width: 15%">STATUS</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.TS_ID_DESCRIPTION }}</td>
          </tr>
          <tr>
            <td style="width: 15%">LATEST UPDATE</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.LATEST_UPDATE_BY }}</td>
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
import * as servicesModule4 from "../../../../../app/module4/services01";
import * as services06Module0 from "../../../../../app/module0/services06";
import moment from "moment";
import Vudal from "vudal";


export default {
  mounted() {
    var data = localStorage.getItem("d-fpAppealProgram");
    this.PROGDATA = JSON.parse(data);


    this.getDocumentById();

    // if (this.PROGDATA.APPR_REMARK != null) {
    //   this.model.comment = this.PROGDATA.APPR_REMARK;
    // } else if (this.PROGDATA.APPR_REMARK == null) {
    //   this.model.comment = "";
    // }
    let fpCategory = this.$route.query.fpCategory
    if(fpCategory == 1) {
      this.title = "Certified Financial Planner"
    } else if(fpCategory == 2) {
      this.title = "Islamic Financial Planner"
    } else if(fpCategory == 3) {
      this.title = "Registered Financial Planner"
    } else if(fpCategory == 4) {
      this.title = "Shariah Registered Financial Planner"
    }
    this.title += " : Appeal Program"
  },

  components: {
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


    getDocumentById: async function () {
      const response = await servicesModule4.getFPRevokeDocumentById(
        this.PROGDATA.MODULE_ID
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

        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);
        data.append("APPEAL_STATUS", 1);

        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);


        try {
          const response = await servicesModule4.appealFPProgram(data);
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
        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);
        data.append("TS_ID", 15);
        data.append("APPEAL_STATUS", 2);
        data.append("APPEAL_REMARK", this.model.comment);

        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        data.append("APPR_GROUP_ID", JSON.parse(user).USER_DIST_ID);
        const res = await servicesModule4.getCompanyId(JSON.parse(user).user_id);

        //notification
        data.append("NOTI_LOCATION", "d-appealFinancialList");
        var remarkEntry ="(CPD-FP-APPEAL)New submission pending approval for " + res.DIST_NAME;
        data.append("NOTI_REMARK", remarkEntry);

        const approvalLevel = await services06Module0.getApprovalLevel(11, 1);
        // const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(11, 3);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        try {
          const response = await servicesModule4.appealFPProgram(data);

          this.$router.go(-1);

          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    viewParticipant: async function () {
      const data = new FormData();
      localStorage.setItem(
        "title_FP_viewParticipant",
        this.PROGDATA.MODULE_ID
      );
      this.$router.push({
        name: "d-fP_viewParticipant",
      });
    },
  },
  computed: {

  },
  data() {
    return {
      title: "",
      dataActionReady: false,
      visibleLog: true,
      visibleProfile: false,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
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
