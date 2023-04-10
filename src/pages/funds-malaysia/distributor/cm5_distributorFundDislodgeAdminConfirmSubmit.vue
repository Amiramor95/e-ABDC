<template>
  <va-inner-loading :loading="statusLoad">
    <div class="flex xs12 md12 xl12">
      <va-card
        class="striped-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <br />
        <h4 slot="header" class="card-title">Fund Details</h4>

        <br />
        <div>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%"><b>Umbrella Fund</b></td>
                <td style="width: 1%">:</td>
                <td>
                  {{ getDataFundProfile.UMBRELLA_FUND_NAME }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%"><b>Fund Name</b></td>
                <td style="width: 1%">:</td>
                <td>
                  <div
                    v-if="
                      getDataFundProfile.FUND_NAME != null &&
                      getDataFundProfile.FUND_ANME != '' &&
                      getDataFundProfile.FUND_NAME != 'null'
                    "
                  >
                    {{ getDataFundProfile.FUND_NAME }}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="width: 15%"><b>Scheme Structure</b></td>
                <td style="width: 1%">:</td>
                <td>
                  <div
                    v-if="
                      getDataFundProfile.FUND_SCHEME != null &&
                      getDataFundProfile.FUND_SCHEME != ''
                    "
                  >
                    {{ getDataFundProfile.FMS_SCHEME_NAME }}
                  </div>
                  <div
                    v-if="
                      getDataFundProfile.FUND_SCHEME == null ||
                      getDataFundProfile.FUND_SCHEME == ''
                    "
                  >
                    -
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Launch Date</b></td>
                <td style="width: 1%">:</td>
                <td>
                  <div
                    v-if="
                      getDataFundProfile.FUND_DATE_LAUNCH != null &&
                      getDataFundProfile.FUND_DATE_LAUNCH != ''
                    "
                  >
                    {{ getDataFundProfile.FUND_DATE_LAUNCH }}
                  </div>
                  <div
                    v-if="
                      getDataFundProfile.FUND_DATE_LAUNCH == null ||
                      getDataFundProfile.FUND_DATE_LAUNCH == ''
                    "
                  >
                    -
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Expiry Date</b></td>
                <td style="width: 1%">:</td>
                <td>
                  <div
                    v-if="
                      getDataFundProfile.FUND_DATE_EXPIRY != null ||
                      getDataFundProfile.FUND_DATE_EXPIRY != '' || getDataFundProfile.FUND_DATE_EXPIRY != '0000-00-00'
                    "
                  >
                    {{ getDataFundProfile.FUND_DATE_EXPIRY }}
                  </div>
                  <div
                    v-else-if="
                      getDataFundProfile.FUND_DATE_EXPIRY == null ||
                      getDataFundProfile.FUND_DATE_EXPIRY == '0000-00-00'
                    "
                  >
                    -
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <br />
          <h4 slot="header" class="card-title">Fund Dislodgement Details</h4>
          <div style="overflow-x: auto">
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr></tr>
                </slot>
              </thead>
              <tbody>
                <tr>
                  <td width="12%">
                    <a>TERMINATION AGREEMENT DATE </a>
                  </td>
                  <td width="2%">:</td>
                  <td>{{ FUNDPROFILE.TERMINATION_AGREEMENT_DATE }}</td>
                </tr>
                <tr>
                  <td width="12%">
                    <a>EXPECTED DISLODGEMENT DATE</a>
                  </td>
                  <td width="2%">:</td>
                  <td>{{ FUNDPROFILE.DISLODGE_DATE }}</td>
                </tr>
                <tr>
                  <td width="12%">TERMINATION AGREEMENT</td>
                  <td width="2%">:</td>
                  <td>
                    <vue-form-generator
                      :model="model"
                      :schema="fileUploadSchema"
                      :options="formOptions"
                      ref="fileUploadForm"
                    >
                    </vue-form-generator>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </va-card>
      <br />
      <va-card>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill float-left btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        <div>
          <button
            @click="submit"
            type="button"
            class="ml-2 btn btn-primary btn-fill float-right btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Dislodge Fund
          </button>
          <button
            @click="cancelCase"
            type="button"
            class="ml-2 btn btn-danger btn-fill float-right btn-md"
          >
            <i class="fa fa-ban" /> &nbsp; Cancel
          </button>
        </div>
      </va-card>
    </div>
  </va-inner-loading>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule5 from "../../../app/module5/services03";
export default {
  props: {
    FUNDPROFILE: {},
  },

  mounted() {
    this.getDocumentById();
    this.getFundProfile();
  },

  components: {},

  methods: {
    getFundProfile: async function () {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      console.log(data);
      const response = await servicesModule5
        .getFundProfileReviewDetails(data)
        .then((res) => {
          this.getDataFundProfile = res;

          console.log(this.getDataFundProfile);
        });
      this.getAllFundProfile1 = JSON.stringify(response);
      this.statusLoad = false;
      // alert(JSON.stringify(response));
      // this.getDataFundProfile = response.data;

      // localStorage.setItem("FUNDPROFILE", JSON.stringify(response));
    },
    getDocumentById: async function () {
      const data = this.$route.params.FUNDPROFILE.LODGE_BULK_ID;
      const response = await servicesModule5.getLodgeDocumentById(data);
      //alert(JSON.stringify(response));
      response.forEach((element) => {
        // console.log(element.DOCU_BLOB);
        element.DOCU_BLOB = this.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOCU_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        console.log(element.DOCU_BLOB);
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        console.log("data blob : " + data);
        this.file = element.DOCU_BLOB;
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
    back() {
      this.$router.push({
        name: "fundDisLodgementConfirmList",
      });
    }, // back button

    saveAsDraft() {},
    validatestatusForm() {

      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },

    returnCase: async function () {
      const response = await this.validateEntryForm();
      if (response) {
        const data = new FormData();
        const user = localStorage.getItem("user");

        data.append("DIST_USER_ID", JSON.parse(user).user_id);
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append(
          "FUND_LODG_ID",
          this.$route.params.FUNDPROFILE.FUND_LODG_ID
        );
        data.append("REMARK", this.model.Remark);
        data.append("TS_STATUS", "9");
        data.append("BULK_APPROVAL", 2);
        data.append("CREATE_BY", JSON.parse(user).user_id);
        try {
          if (confirm("Are you sure to return?")) {
            const response = await servicesModule5.approveFundDisLodgeDist(
              data
            );
            alert("Fund dislodgement request has been returned");
            this.back();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(response);
      }
    },
    async cancelCase() {
      if (
        confirm(
          "Are you sure to remove the request dislodge on the selected fund?"
        )
      ) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append(
          "FUND_LODG_ID",
          this.$route.params.FUNDPROFILE.FUND_LODG_ID
        );
        data.append("BULK_APPROVAL", 2);
        try {
          const response = await servicesModule5.submitRemoveHoldDisLodge(data);
          alert("Fund selected has been removed to be dislodge");
          this.$router.push({ name: "fundDisLodgementConfirmList" });
        } catch (e) {
          console.log(e);

          this.statusLoad = false;
        }
      } else {
      }
    },

    async submit() {
      if (confirm("Are you sure to request dislodge on the selected fund?")) {
        this.statusLoad = true;
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append(
          "FUND_LODG_ID",
          this.$route.params.FUNDPROFILE.FUND_LODG_ID
        );
        data.append("BULK_APPROVAL", 2);
        try {
          const response = await servicesModule5.submitHoldDisLodge(data);
          this.statusLoad = false;
          alert("Fund selected has been requested to be dislodge");
          this.$router.push({ name: "fundDisLodgementConfirmList" });
        } catch (e) {
          console.log(e);
          this.statusLoad = false;
        }
      } else {
      }
    },
  },

  computed: {},

  data() {
    return {
      getDataFundProfile: "",
      lodgeID: this.$route.params.FUNDPROFILE.FUND_LODG_ID,
      selected: true,
      unselected: false,
      fileRecords: [],
      file0: "",
      file1: "",
      file2: "",
      file3: "",
      file4: "",
      statusLoad: true,
      model: {
        Remark: "",
        data: "",
        file: [],
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: [],
      },
      status: [
        {
          id: "Reviewed",
          name: "Reviewed",
        },
        {
          id: "Returned",
          name: "Returned",
        },
        {
          id: "Rejected",
          name: "Rejected",
        },
        {
          id: "Submit",
          name: "Submit for 2nd Review",
        },
      ],
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf,.xlsx,.xls",
                multiple: true,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      fileUploadSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "5",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file4",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      schema: {
        fields: [
          {
            type: "textArea",
            label: "Remark",
            model: "Remark",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Enter Remark",
            styleClasses: "col-md-12",
            required: true,
            validator: "string",
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
<style></style>
