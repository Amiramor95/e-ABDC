<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Suspension/Revocation : Review Form
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Details Form
        <hr />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 20%">Effective Date</td>
              <td>{{ DISTDATA.EFFECTIVE_DATE }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Date Start</td>
              <td style="width: 20%">{{ DISTDATA.DATE_START }}</td>
              <td style="width: 20%">Date End</td>
              <td>{{ DISTDATA.DATE_END }}</td>
            </tr>
            <tr>
              <td>Reason</td>
              <td colspan="3">{{ DISTDATA.REASON_FULL }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td colspan="3">{{ DISTDATA.SUBMISSION_TYPE }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Respond and Justification Section
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
  </va-card>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";
import * as services06Module0 from "../../../../app/module0/services06";

export default {
  mounted() {
    var data = localStorage.getItem("update-suspension-revocation-form");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA));
    this.model.comment = this.DISTDATA.JUSTIFICATION;

    this.model.appealID = this.DISTDATA.SUSPEND_REVOKE_APPEAL_ID;

    if (this.model.appealID != "") {
      this.getAppealDocById();
    }
  },

  components: {},

  methods: {
    back() {
      this.$router.go(-1);
    }, // back button

    getAppealDocById: async function () {
      const response = await servicesModule1.getAppealDocById(
        this.model.appealID
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
          docID: element.SR_APPEAL_DOC_ID,
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

    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save this as draft?")) {
        const data = new FormData();
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);
        data.append("JUSTIFICATION", this.model.comment);
        data.append("PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule1.updateAppeal(data);
          const response1 = await servicesModule1.createDocumentAppeal(data);
          this.$router.push(
            "/distributor/suspension-revocation-notification-list"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    accept: async function () {
      if (
        confirm(
          "Are you sure you want to accept this? This action cannot be reversed."
        )
      ) {
        const data = new FormData();

        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);
        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);
        data.append("SUBMISSION_TYPE", this.DISTDATA.SUBMISSION_TYPE);

        const approvalLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        data.append("NOTI_LOCATION", "suspension-revocation-list");
        var NotificationNote ="(SUS/REV) " +this.DISTDATA.DIST_NAME +".This distributor has accepted the action";
        data.append("NOTI_REMARK", NotificationNote);

        const approvalLevel2 = await services06Module0.getApprovalLevel(21, 1);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));
        data.append(
          "NOTI_LOCATION2",
          "PrepaymentRefund-DistributorTermination-list"
        );
        var NotificationNote2 ="(REFUND) " +this.DISTDATA.DIST_NAME +".This distributor has been terminated ";
        data.append("NOTI_REMARK2", NotificationNote2);

        const approvalLevel3 = await services06Module0.getApprovalLevel(24, 1);
        data.append("APPR_LIST3", JSON.stringify(approvalLevel3));
        data.append("NOTI_LOCATION3", "fundDisLodgementSubmissionList");
        var NotificationNote3 ="(FUND) " +this.DISTDATA.DIST_NAME +".This distributor has been terminated ";
        data.append("NOTI_REMARK3", NotificationNote3);

        try {
          const response = await servicesModule1.acceptSuspendRevoke(data);
          this.$router.push(
            "/distributor/suspension-revocation-notification-list"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    appeal: async function () {
      if (confirm("Are you sure you want to submit appeal?")) {
        const data = new FormData();

        data.append("SUSPEND_REVOKE_ID", this.DISTDATA.SUSPEND_REVOKE_ID);
        data.append("JUSTIFICATION", this.model.comment);
        data.append("PUBLISH_STATUS", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        data.append("TS_ID", "15");
        data.append("ISSUBMIT", 1);

        //Send to RD
        const approvalLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "appeal-suspension-revocation-list");
         var NotificationNote ="(APPEAL) " +this.DISTDATA.DIST_NAME +".New appeal submission pending review";
        data.append("NOTI_REMARK", NotificationNote);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule1.updateAppeal(data);
          const response1 = await servicesModule1.createDocumentAppeal(data);
          this.$router.push(
            "/distributor/suspension-revocation-notification-list"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {},

  data() {
    return {
      DISTDATA: "",
      uploadFileOject: [],

      model: {
        fileUpload: "",
        file: [],
        comment: "",
        appealID: "",
      },

      reviewSchema: {
        fields: [
          {
            type: "input",
            inputType: "hidden",
            model: "appealID",
            styleClasses: "col-md-6",
          },
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
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Supported Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit-appeal",
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