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
                <td style="width: 15%"><b>Management Company</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">{{ getDataFundProfile.DIST_NAME }}</td>
                <td style="width: 34%"></td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Company Type</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  {{ getDataFundProfile.DIST_TYPE_NAME }}
                </td>
                <td style="width: 34%"></td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Umbrella Fund</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  {{ getDataFundProfile.UMBRELLA_FUND_NAME }}
                </td>
                <td style="width: 34%"></td>
              </tr>
              <tr>
                <td style="width: 15%"><b>FIMM Fund Code</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  {{ getDataFundProfile.FUND_CODE_FIMM }}
                </td>
                <td style="width: 34%"></td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Fund Status</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">{{ getDataFundProfile.TS_PARAM }}</td>
                <td style="width: 34%"></td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Member Fund Code</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  {{ getDataFundProfile.FUND_CODE_MEMBER }}
                </td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Lipper Fund Code</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  LP{{ getDataFundProfile.FUND_LIPPER_CODE }}
                </td>
              </tr>
              <tr>
                <td style="width: 15%"><b>Fund Name</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">{{ getDataFundProfile.FUND_NAME }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%"><b></b></td>
                <td style="width: 1%"></td>
                <td style="width: 34%">OLD DATA</td>
                <td style="width: 34%">NEW DATA</td>
              </tr>
              <tr></tr>
              <tr>
                <td style="width: 15%"><b>Fund Notes</b></td>
                <td style="width: 1%">:</td>
                <td style="width: 34%">
                  <div v-if="getDataFundProfile.FUNDNOTES != null">
                    <div
                      v-for="(fundnote, index) in getDataFundProfile.FUNDNOTES"
                      :key="index"
                    >
                      <a
                        v-if="
                          fundnote.FUNDNOTES_ID != 6 &&
                          fundnote.FUNDNOTES_ID != 7 &&
                          fundnote.FUNDNOTES_ID != 8 &&
                          fundnote.FUNDNOTES_ID != 9 &&
                          fundnote.FUNDNOTES_ID != 21 &&
                          fundnote.FUNDNOTES_ID != 23 &&
                          fundnote.FUNDNOTES_ID != 24
                        "
                      >
                        {{ fundnote.FUNDNOTES_DESC }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 6">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},{{
                          fundnote.DATE2
                        }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 7">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},{{
                          fundnote.DATE2
                        }},{{ fundnote.DATE3 }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 8">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},{{
                          fundnote.DATE2
                        }},{{ fundnote.DATE3 }},{{ fundnote.DATE4 }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 9">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},{{
                          fundnote.DATE2
                        }},{{ fundnote.DATE3 }},{{ fundnote.DATE4 }},{{
                          fundnote.DATE5
                        }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 21">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},,{{
                          fundnote.N
                        }}
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 23">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.T_1 }},
                      </a>
                      <a v-if="fundnote.FUNDNOTES_ID == 24">
                        {{ fundnote.FUNDNOTES_DESC }},{{ fundnote.DATE1 }},
                      </a>
                    </div>
                  </div>
                  <div
                    v-if="
                      getDataFundProfile.FUNDNOTES == null ||
                      getDataFundProfile.FUNDNOTES == ''
                    "
                  >
                    -
                  </div>
                </td>
                <td style="width: 34%; color: red">
                  <div v-if="getDataFundProfile2.FUNDNOTES != null">
                    <div
                      v-for="(fundnote2, index) in getDataFundProfile2.FUNDNOTES"
                      :key="index"
                    >
                      <a
                        v-if="
                          fundnote2.FUNDNOTES_ID != 6 &&
                          fundnote2.FUNDNOTES_ID != 7 &&
                          fundnote2.FUNDNOTES_ID != 8 &&
                          fundnote2.FUNDNOTES_ID != 9 &&
                          fundnote2.FUNDNOTES_ID != 21 &&
                          fundnote2.FUNDNOTES_ID != 23 &&
                          fundnote2.FUNDNOTES_ID != 24
                        "
                      >
                        {{ fundnote2.FUNDNOTES_DESC }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 6">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},{{
                          fundnote2.DATE2
                        }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 7">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},{{
                          fundnote2.DATE2
                        }},{{ fundnote2.DATE3 }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 8">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},{{
                          fundnote2.DATE2
                        }},{{ fundnote2.DATE3 }},{{ fundnote2.DATE4 }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 9">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},{{
                          fundnote2.DATE2
                        }},{{ fundnote2.DATE3 }},{{ fundnote2.DATE4 }},{{
                          fundnote2.DATE5
                        }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 21">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},,{{
                          fundnote2.N
                        }}
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 23">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.T_1 }},
                      </a>
                      <a v-if="fundnote2.FUNDNOTES_ID == 24">
                        {{ fundnote2.FUNDNOTES_DESC }},{{ fundnote2.DATE1 }},
                      </a>
                    </div>
                  </div>
                  <div
                    v-if="
                      getDataFundProfile2.FUNDNOTES == null ||
                      getDataFundProfile2.FUNDNOTES == ''
                    "
                  >
                    -
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div>
          <br />
          <h4 slot="header" class="card-title">Supporting Document</h4>
          <div style="overflow-x: auto">
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr></tr>
                </slot>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <vue-form-generator
                      :model="model"
                      :schema="fileUploadSchemaSupportDoc"
                      :options="formOptions"
                      ref="fileUploadFormSupportDoc"
                    ></vue-form-generator>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
      </va-card>
      <br />
      <va-card>
        <table class="table table-responsive table-borderless">
          <tbody>
            <tr
              v-if="
                FUNDPROFILE.TS_PARAM == 'PENDING' ||
                FUNDPROFILE.TS_PARAM == 'ACTIVE' ||
                FUNDPROFILE.TS_PARAM == 'RETURNED' ||
                FUNDPROFILE.TS_PARAM == 'REJECTED'
              "
            >
              <td style="width: 15%">
                <b>Fund Manager Remark</b>
              </td>
              <td style="width: 1%">:</td>
              <td>{{ FUNDPROFILE.APPR_REMARK_FM }}</td>
            </tr>
            <tr
              v-if="
                FUNDPROFILE.TS_PARAM == 'ACTIVE' ||
                FUNDPROFILE.TS_PARAM == 'RETURNED' ||
                FUNDPROFILE.TS_PARAM == 'REJECTED'
              "
            >
              <td style="width: 15%">
                <b>FIMM Remark</b>
              </td>
              <td style="width: 1%">:</td>
              <td>{{ FUNDPROFILE.APPR_REMARK_FIMM }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill float-left btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
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
    // getAllFundProfile: {},
  },

  mounted() {
    this.getDocumentById();
    this.getTempDocumentById();
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getFundProfile();
      this.getFundTempData();
    });
  },

  components: {},

  methods: {
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
    async getFundProfile() {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      console.log(data);
      const response = await servicesModule5
        .getFundProfileReviewDetails(data)
        .then((res) => {
          this.getDataFundProfile = res;
        });
      console.log("data from original:", this.getDataFundProfile);
      this.statusLoad = false;
    },
    async getFundTempData() {
      const data = this.FUNDPROFILE.FUND_TEMP_ID;
      console.log(data);
      const response = await servicesModule5
        .fund_tempDataDetail(data)
        .then((res) => {
          this.getDataFundProfile2 = res;
        });
      console.log("data from temp:", this.getDataFundProfile2);
      this.statusLoad = false;
    },
    getDocumentById: async function () {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      const response = await servicesModule5.getDocumentById(data);
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
        if (element.DOCU_GROUP == 1) {
          console.log("data blob : " + data);
          this.file0 = element.DOCU_BLOB;
          this.model.file0.push(data);
        } else if (element.DOCU_GROUP == 2) {
          this.file1 = element.DOCU_BLOB;
          this.model.file1.push(data);
        } else if (element.DOCU_GROUP == 3) {
          this.file2 = element.DOCU_BLOB;
          this.model.file2.push(data);
        } else if (element.DOCU_GROUP == 4) {
          this.file3 = element.DOCU_BLOB;
          this.model.file3.push(data);
        } else if (element.DOCU_GROUP == 5) {
          this.file4 = element.DOCU_BLOB;
          this.model.file4.push(data);
        }
        //alert(JSON.stringify(data));
      });
    },
    getTempDocumentById: async function () {
      const data = this.$route.params.FUNDPROFILE.FUND_TEMP_ID;
      const response = await servicesModule5.getTempDocumentById(data);
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
        if (element.DOCU_GROUP == 1) {
          console.log("data blob : " + data);
          this.filetemp0 = element.DOCU_BLOB;
          this.model.filetemp0.push(data);
        } else if (element.DOCU_GROUP == 2) {
          this.filetemp1 = element.DOCU_BLOB;
          this.model.filetemp1.push(data);
        } else if (element.DOCU_GROUP == 3) {
          this.filetemp2 = element.DOCU_BLOB;
          this.model.filetemp2.push(data);
        } else if (element.DOCU_GROUP == 4) {
          this.filetemp3 = element.DOCU_BLOB;
          this.model.filetemp3.push(data);
        } else if (element.DOCU_GROUP == 5) {
          this.filetemp4 = element.DOCU_BLOB;
          this.model.filetemp4.push(data);
        } else if (element.DOCU_GROUP == 6) {
          this.filetemp5 = element.DOCU_BLOB;
          this.model.filetemp5.push(data);
        } else if (element.DOCU_GROUP == 7) {
          this.filetemp6 = element.DOCU_BLOB;
          this.model.filetemp6.push(data);
        } else if (element.DOCU_GROUP == 8) {
          this.filetemp7 = element.DOCU_BLOB;
          this.model.filetemp7.push(data);
        }
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
      this.$router.push("fundManagementList");
    }, // back button

    saveAsDraft() {},
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },
  },

  computed: {},

  data() {
    return {
      statusLoad: true,
      getDataFundProfile: "",
      getAllFundProfile1: "",
      getDataFundProfile2: "",
      getDataFundProfile3: "",
      selected: true,
      unselected: false,
      fileRecords: [],
      uploadFileOject: [],
      file0: "",
      file1: "",
      file2: "",
      file3: "",
      file4: "",

      filetemp0: "",
      filetemp1: "",
      filetemp2: "",
      filetemp3: "",
      filetemp4: "",
      filetemp5: "",
      filetemp6: "",
      filetemp7: "",
      filetamp8: "",
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
          name: "Submit for FiMM Review",
        },
      ],
      model: {
        fileUpload: "",
        file: [],
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: [],

        filetemp0: [],
        filetemp1: [],
        filetemp2: [],
        filetemp3: [],
        filetemp4: [],
        filetemp5: [],
        filetemp6: [],
        filetemp7: [],
        filetemp8: [],

        Remark: "",
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "1",
                labels: "New Fund Notification Letter to FIMM",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file0",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "2",
                labels: "New Fund Application Form to FIMM",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file1",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "3",
                labels:
                  "Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file2",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "4",
                labels:
                  "Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "file3",
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
                labels:
                  "For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative",
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
      fileUploadTempSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "1",
                labels: "New Fund Notification Letter to FIMM",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "filetemp0",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "2",
                labels: "New Fund Application Form to FIMM",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "filetemp1",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "3",
                labels:
                  "Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "filetemp2",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
              {
                id: "4",
                labels:
                  "Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "filetemp3",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      fileUploadTempSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "5",
                labels:
                  "For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                deletable: false,
                downloadable: false,
                text: "Choose a File",
                model: "filetemp4",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      fileUploadSchemaSupportDoc: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "1",
                labels: "Supplementary Prospectus",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "filetemp5",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
              },
              {
                id: "2",
                labels: "Revised Product Highlight Sheet",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "filetemp6",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
              },
              {
                id: "3",
                labels: "Annual Report",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "filetemp7",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
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
