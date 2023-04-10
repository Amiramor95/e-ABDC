<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Appeal List of Financial Submission Programs : Review Appeal Program
      </h4>
    </div>
    <br />
    <br />
    <va-card>
      <div>

        <table class="table table-striped">
          <tbody>
          <tr>
            <td style="width: 30%">Total Participant </td>
            <td style="width: 1%">:</td>
            <td><span
              role="button"
              v-b-tooltip.hover
              title="View Participant"
              @click="viewParticipant"
              class="badge badge-primary mr-2"
            >
                <i class="fa fa-external-link"></i
                ></span> {{PROGDATA.TOTAL_PARTICIPANT}}</td>
          </tr>
          <tr>
            <td style="width: 30%">Remark by FIMM</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.APPR_REMARK }}</td>
          </tr>
          <tr>
            <td style="width: 30%">REVOKE REMARK</td>
            <td style="width: 1%">:</td>
            <td>{{ PROGDATA.REVOKE_REMARK }}</td>
          </tr>
          <tr>
            <td>Revoke Supporting Document</td>
            <td>:</td>
            <td>
              <vue-form-generator
                :model="model"
                :schema="fileRevokeViewSchema"
                :options="formOptions"
                ref="fileRevokeViewForm"
              >
              </vue-form-generator>
            </td>
          </tr>
          <tr>
            <td>Appeal Justification</td>
            <td>:</td>
            <td>{{ PROGDATA.APPEAL_REMARK }}</td>
          </tr>
          <tr>
            <td>Appeal Supporting Document</td>
            <td>:</td>
            <td>
              <vue-form-generator
                :model="model"
                :schema="fileAppealViewSchema"
                :options="formOptions"
                ref="fileRevokeViewForm"
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
        <vue-form-generator
          :model="model"
          :schema="fileUploadNewSchema"
          :options="formOptions"
          ref="fileUploadNewForm"
        >
        </vue-form-generator>
        <br />
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
              @click="revokeCpd"
              type="button"
              style="background: #dc3546; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Revoke
            </button>
            <button
              @click="approve"
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
  import * as servicesModule4 from "../../../../../../../app/module4/services01";
  import moment from "moment";
  import Vudal from "vudal";
  import DetailSubmittedProgram from "../../../../../distributor/modules/components/detailSubmittedProgram.vue";

  export default {
    mounted() {
      var data = localStorage.getItem("d-appealFinancialViewDetails");
      this.PROGDATA = JSON.parse(data);

      //alert(JSON.stringify(this.PROGDATA));

      // this.getAllRecord();
      // this.getDocumentById();
      this.getRevokeDocumentById();
      this.getAppealDocumentById();
      this.getApprovalDocumentById();

      if(this.model.comment != null || this.model.comment != ""){
        this.model.comment = this.PROGDATA.APPR_REMARK.toUpperCase();
      }
    },

    components: {
      Vudal,
    },
    methods: {
      async readMore(data) {
        this.$modals.simpleModal.$show();
        this.model.showRemark = data.APPR_FULL;
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
            docID: element.WRITING_APPEAL_DOC_ID,
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

      getRevokeDocumentById: async function () {
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
            docID: element.WRITING_APPEAL_DOC_ID,
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



      getAppealDocumentById: async function () {
        const response = await servicesModule4.getFPAppealDocumentById(
          this.PROGDATA.MODULE_ID,1
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
            docID: element.WRITING_APPEAL_DOC_ID,
            name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
            size: element.DOC_FILESIZE,
            type: element.DOC_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOC_BLOB),
          };

          this.fileAppealView = element.DOC_BLOB;
          // this.fileNew = element.DOC_BLOB;
          //alert(JSON.stringify(element.DOC_BLOB));
          this.model.fileAppealView.push(data);
          // this.model.fileNew.push(data);
          //alert(JSON.stringify(data));
        });
      },
      //
      // getApprovalDocumentById: async function () {
      //   const response = await servicesModule4.getApprovalAppealDocumentById(
      //     this.PROGDATA.PROG_DETAILS_ID
      //   );
      //   //alert(JSON.stringify(response));
      //   response.forEach((element) => {
      //     console.log(element.DOC_BLOB);
      //     element.DOC_BLOB = this.b64toBlobPDF(
      //       element.DOC_BLOB,
      //       "application/pdf"
      //     );
      //     console.log("mula");
      //     console.log(element.DOC_BLOB); // <----- cuba tgk ini
      //     console.log("habis");
      //     element.DOC_BLOB = new File(
      //       [element.DOC_BLOB],
      //       element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
      //       { type: element.DOC_BLOB.type }
      //     );
      //     console.log(element.DOC_BLOB);
      //     const data = {
      //       docID: element.PROG_REVOKE_DOC_ID,
      //       name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
      //       size: element.DOC_FILESIZE,
      //       type: element.DOC_FILETYPE,
      //       ext: "exe",
      //       url: window.URL.createObjectURL(element.DOC_BLOB),
      //     };
      //
      //     this.fileNew = element.DOC_BLOB;
      //     //alert(JSON.stringify(element.DOC_BLOB));
      //     this.model.fileNew.push(data);
      //
      //     //alert(JSON.stringify(data));
      //   });
      // },

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
          data.append("FP_APPEAL_APPR_ID", this.PROGDATA.FP_APPEAL_APPR_ID);

          data.append("APPR_REMARK", this.model.comment);
          data.append("APPR_PUBLISH_STATUS", "0");
          data.append("TS_ID", "1");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

          data.append("TYPE", 1);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          //File upload
          if (this.model.fileNew.length != 0) {
            for (let i = 0; i < this.model.fileNew.length; i++) {
              data.append("fileNew[]", this.model.fileNew[i]);
            }
          }

          try {
            const response = await servicesModule4.updateFPModuleAppealApproval(data);
            this.$router.push({
              name: "f-fpamApprCertifiedModuleList",
              query: {
                fpCategory: 1
              }
            });
            this.dataActionReady = false;
          } catch (error) {
            console.log(error);
          }
        }
      },

      revokeCpd: async function () {
        if (confirm("Are you sure to revoke this program?")) {
          this.dataActionReady = true;
          const data = new FormData();
          data.append("FP_APPEAL_APPR_ID", this.PROGDATA.FP_APPEAL_APPR_ID);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);
          data.append("TS_ID", 30);
          // data.append("PROG_APPROVAL_ID", this.PROGDATA.PROG_APPROVAL_ID);
          data.append("APPR_REMARK", this.model.comment);
          data.append("APPR_PUBLISH_STATUS", "1");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);

          //notification
          data.append("NOTI_LOCATION", "d-fpamModuleList");
          var remarkEntry = "(CPD-FP-APPEAL)This program has been revoked from Appeal approval by FIMM";
          data.append("NOTI_REMARK", remarkEntry);
          data.append("DIST_CREATE_BY", this.PROGDATA.DIST_CREATE_BY);
          data.append("DISTRIBUTOR_ID", this.PROGDATA.COMPANY_ID);
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

          data.append("TYPE", 1);

          //File upload
          if (this.model.fileNew.length != 0) {
            for (let i = 0; i < this.model.fileNew.length; i++) {
              data.append("fileNew[]", this.model.fileNew[i]);
            }
          }
          try {
            const response = await servicesModule4.updateFPModuleAppealApproval(data);
            this.$router.go(-1);

            this.dataActionReady = false;
          } catch (error) {
            console.log(error);
          }
        }
      },

      approve: async function () {
        if (confirm("Are you sure you want to approve this program?")) {
          this.dataActionReady = true;
          const data = new FormData();
          data.append("FP_APPEAL_APPR_ID", this.PROGDATA.FP_APPEAL_APPR_ID);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          data.append("APPR_REMARK", this.model.comment);
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("TS_ID", "3");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);
          data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

          //notification
          data.append("NOTI_LOCATION", "d-fpamModuleList");
          var remarkEntry = "(CPD-FP-APPEAL)This program has been approved from Appeal approval by FIMM";
          data.append("NOTI_REMARK", remarkEntry);
          data.append("DIST_CREATE_BY", this.PROGDATA.DIST_CREATE_BY);
          data.append("DISTRIBUTOR_ID", this.PROGDATA.COMPANY_ID);

          //File upload
          if (this.model.fileNew.length != 0) {
            for (let i = 0; i < this.model.fileNew.length; i++) {
              data.append("fileNew[]", this.model.fileNew[i]);
            }
          }

          try {
            const response = await servicesModule4.updateFPModuleAppealApproval(data);
            console.log(response);

            this.$router.go(-1);
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
          "title_FP_viewParticipant",
          JSON.stringify(this.PROGDATA)
        );
        this.$router.push({
          name: "f-viewParticipant",
        });
      },
    },
    computed: {

    },
    data() {
      return {
        module: null,
        participantList: [],

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
        PDATA: "",
        PROGDATA: "",

        feedbackList: [],
        FeedbackRecordCount: null,

        model: {
          comment: "",

          fileUpload: "",
          fileRecord: [],
          file: [],
          fileNew: [],
          showRemark: "",
          fileRevokeView: [],
          fileAppealView: [],
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

        fileUploadNewSchema: {
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
                  type: "vfg-custom-multiple-file-edit-appeal-approvalWriting",
                  styleClasses: "col-md-12",
                  hint: "Accepted format : (.PDF)",
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

        fileAppealViewSchema: {
          groups: [
            {
              styleClasses: "row",
              fields: [
                {
                  accept: ".pdf",
                  multiple: true,
                  text: "Choose a File",
                  model: "fileAppealView",
                  type: "vfg-custom-file-view",
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
