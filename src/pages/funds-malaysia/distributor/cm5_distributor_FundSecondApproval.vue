<template>
  <div class="flex xs12 md12 xl12">
    <va-card
      class="striped-tabled-with-hover"
      body-classes="table-full-width table-responsive"
    >
      <br />
      <h4 slot="header" class="card-title">
        Fund Details
      </h4>

      <br />
      <div>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>Management Company</b></td>
              <td style="width: 1%">:</td>
              <td>{{ FUNDPROFILE.DIST_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Company Type</b></td>
              <td style="width: 1%">:</td>
              <td>{{ FUNDPROFILE.DIST_TYPE_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Umbrella Fund</b></td>
              <td style="width: 1%">:</td>
              <td>{{ FUNDPROFILE.UMBRELLA_FUND_NAME }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>Member Fund Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ FUNDPROFILE.FUND_CODE_MEMBER }}</td>

              <td style="width: 15%"><b>Fund Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ FUNDPROFILE.TS_PARAM }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Chinese Name (Traditional)</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ FUNDPROFILE.FUND_NAME_CHINESE }}</td>

              <td style="width: 15%"><b>Fund Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ FUNDPROFILE.FUND_PROFILE_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Short Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ FUNDPROFILE.FUND_NAME_SHORT }}</td>

              <td style="width: 15%"><b>Annual Management Fee</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_FEE_ANNUAL != null ||
                      FUNDPROFILE.FUND_FEE_ANNUAL != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_FEE_ANNUAL }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FEE_ANNUAL == null ||
                      FUNDPROFILE.FUND_FEE_ANNUAL == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Fund Type</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_TYPE != null || FUNDPROFILE.FUND_TYPE != ''
                  "
                >
                  {{ FUNDPROFILE.TYPENAME }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_TYPE == null || FUNDPROFILE.FUND_TYPE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Performance Fee</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_FEE_PERFORMANCE != null ||
                      FUNDPROFILE.FUND_FEE_PERFORMANCE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_FEE_PERFORMANCE }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FEE_PERFORMANCE == null ||
                      FUNDPROFILE.FUND_FEE_PERFORMANCE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Fund Category</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_CATEGORY != null ||
                      FUNDPROFILE.FUND_CATEGORY != ''
                  "
                >
                  {{ FUNDPROFILE.GROUP_ASSET }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_CATEGORY == null ||
                      FUNDPROFILE.FUND_CATEGORY == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Ratio</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_RATIO != null ||
                      FUNDPROFILE.FUND_RATIO != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_RATIO }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_RATIO == null ||
                      FUNDPROFILE.FUND_RATIO == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Domicile</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_DOMICILE != null ||
                      FUNDPROFILE.FUND_DOMICILE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_DOMICILE_NAME }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_DOMICILE == null ||
                      FUNDPROFILE.FUND_DOMICILE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Hurdle Rate</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_HURDLE != null ||
                      FUNDPROFILE.FUND_HURDLE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_HURDLE }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_HURDLE == null ||
                      FUNDPROFILE.FUND_HURDLE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Currency Denomination</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_CURR_DENOMINATION != null ||
                      FUNDPROFILE.FUND_CURR_DENOMINATION != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_CURR_DENOMINATION }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_CURR_DENOMINATION == null ||
                      FUNDPROFILE.FUND_CURR_DENOMINATION == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Launch Price per unit</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_PRICE_PERUNIT != null ||
                      FUNDPROFILE.FUND_PRICE_PERUNIT != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_PRICE_PERUNIT }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_PRICE_PERUNIT == null ||
                      FUNDPROFILE.FUND_PRICE_PERUNIT == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Sub Manager Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_SUB_MANAGER != null ||
                      FUNDPROFILE.FUND_SUB_MANAGER != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_SUB_MANAGER }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_SUB_MANAGER == null ||
                      FUNDPROFILE.FUND_SUB_MANAGER == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Launch Date</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_DATE_LAUNCH != null ||
                      FUNDPROFILE.FUND_DATE_LAUNCH != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_DATE_LAUNCH }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_DATE_LAUNCH == null ||
                      FUNDPROFILE.FUND_DATE_LAUNCH == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Syariah Compliant</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_SYARIAH_COMP == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_SYARIAH_COMP == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_SYARIAH_COMP == null ||
                      FUNDPROFILE.FUND_SYARIAH_COMP == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Financial Year End</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_YEAR_END != null ||
                      FUNDPROFILE.FUND_YEAR_END != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_YEAR_END }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_YEAR_END == null ||
                      FUNDPROFILE.FUND_YEAR_END == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Annual Management Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_ANNUAL_MGMT == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_ANNUAL_MGMT == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_ANNUAL_MGMT == null ||
                      FUNDPROFILE.FUND_ANNUAL_MGMT == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Minimum Sales Charge</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_MINIMUM_SALE_CHARGE != null ||
                      FUNDPROFILE.FUND_MINIMUM_SALE_CHARGE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_MINIMUM_SALE_CHARGE }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_MINIMUM_SALE_CHARGE == null ||
                      FUNDPROFILE.FUND_MINIMUM_SALE_CHARGE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Declaration of Fund Performance</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_FUND_PERFORMANCE == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_FUND_PERFORMANCE == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FUND_PERFORMANCE == null ||
                      FUNDPROFILE.FUND_FUND_PERFORMANCE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Maximum Sales Charge</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_MAXIMUM_SALE_CHARGE != null ||
                      FUNDPROFILE.FUND_MAXIMUM_SALE_CHARGE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_MAXIMUM_SALE_CHARGE }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_MAXIMUM_SALE_CHARGE == null ||
                      FUNDPROFILE.FUND_MAXIMUM_SALE_CHARGE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>EPF Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_STATUS_EPF == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_STATUS_EPF == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_STATUS_EPF == null ||
                      FUNDPROFILE.FUND_STATUS_EPF == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Scheme Structure</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_SCHEME != null ||
                      FUNDPROFILE.FUND_SCHEME != ''
                  "
                >
                  {{ FUNDPROFILE.FMS_SCHEME_NAME }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_SCHEME == null ||
                      FUNDPROFILE.FUND_SCHEME == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <b>Disclosure of Daily NAV in the Newspaper</b>
              </td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_DAILY_NAV == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_DAILY_NAV == 2">
                  No
                </div>
                <!-- <div v-if="FUNDPROFILE.FUND_DAILY_NAV == null || FUNDPROFILE.FUND_DAILY_NAV == ''">
                      -
                    </div> -->
              </td>

              <td style="width: 15%"><b>Foreign / Local Focused</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_FOCUS == 1
                  "
                >
                  Local Focused
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FOCUS == 2
                  "
                >
                  Foreign Focused
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FOCUS == null ||
                      FUNDPROFILE.FUND_FOCUS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Wholesale Fund</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    FUNDPROFILE.FUND_WHOLESALE != null ||
                      FUNDPROFILE.FUND_WHOLESALE != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_WHOLESALE }}
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_WHOLESALE == null ||
                      FUNDPROFILE.FUND_WHOLESALE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Feeder Fund</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_FEEDER == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_FEEDER == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FEEDER == null ||
                      FUNDPROFILE.FUND_FEEDER == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FOF</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_FOF_STATUS == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_FOF_STATUS == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_FOF_STATUS == null ||
                      FUNDPROFILE.FUND_FOF_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
              <td style="width: 15%"><b>UCITS</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_UCITS_STATUS == 1">
                  Yes
                </div>
                <div v-if="FUNDPROFILE.FUND_UCITS_STATUS == 2">
                  No
                </div>
                <div
                  v-if="
                    FUNDPROFILE.FUND_UCITS_STATUS == null ||
                      FUNDPROFILE.FUND_UCITS_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Notes</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="FUNDPROFILE.FUND_UCITS_STATUS == 1">
                  Yes
                </div>
                <div v-if="
                    FUNDPROFILE.FUND_UCITS_STATUS == null ||
                      FUNDPROFILE.FUND_UCITS_STATUS == ''
                  ">
                  -
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <br />
        <h4 slot="header" class="card-title">
          Uploaded Document
        </h4>
        <div style="overflow-x:auto;">
                    <table class="table">
                      <thead>
                        <slot name="columns">
                          <tr>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                        <br/>
                        <vue-form-generator
                          :model="model"
                          :schema="fileUploadSchema"
                          :options="formOptions"
                          ref="fileUploadForm"
                        >
                        </vue-form-generator>
                        <br/>
                        <div v-if="getDataFundProfile.FUND_ASEAN_CIS_STATUS == '1'">
                        <vue-form-generator
                          :model="model"
                          :schema="fileUploadSchema2"
                          :options="formOptions"
                          ref="fileUploadForm"
                        >
                        </vue-form-generator>
                        </div>
                      </tbody>
                    </table>
                  </div>
      </div>
    </va-card>
    <br/>
    <va-card>
      <table class="table table-responsive table-borderless">
                  <tbody>
                    <tr v-if="FUNDPROFILE.TS_PARAM == 'PENDING'">
                      <td style="width: 15%">
                        <b>Fund Manager Remark</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.APPR_REMARK_FM }}</td>
                    </tr>
                    <tr v-if="FUNDPROFILE.TS_PARAM == 'ACTIVE'">
                      <td style="width: 15%">
                        <b>FIMM Remark</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.APPR_REMARK_FIMM }}</td>
                    </tr>
                  </tbody>
                </table>
                <br/>
      <div v-if="FUNDPROFILE.TS_PARAM == 'NEW ENTRY'">
      <vue-form-generator
                :model="model"
                :schema="schema"
                :options="formOptions"
                ref="ReviewRemark"
              >
              </vue-form-generator>
              <!-- </card> -->
            </div>
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div v-if="FUNDPROFILE.TS_PARAM == 'NEW ENTRY'">
            <button
              @click="submit"
              type="button"
              class="ml-2 btn btn-primary btn-fill float-right btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Approve
            </button>
            <button
              @click="returnCase"
              type="button"
              class="ml-2 btn btn-warning btn-fill float-right btn-md"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="rejectCase"
              type="button"
              class="ml-2 btn btn-danger btn-fill float-right btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Reject
            </button>
            </div>
    </va-card>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule5 from "../../../app/module5/services03";
export default {
  props: {
    FUNDPROFILE: {}
    // getAllFundProfile: {},
  },

  mounted() {
    this.getFundProfile();
    this.getDocumentById();
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
    getFundProfile: async function() {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      console.log(data);
      const response = await servicesModule5.getFundProfileReviewDetails(data);
      this.getAllFundProfile1 = JSON.stringify(response);
      // alert(JSON.stringify(response));
      this.getDataFundProfile = response.data;
    },
    getDocumentById: async function () {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      const response = await servicesModule5.getDocumentById(
        data
      );
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
          url: window.URL.createObjectURL(element.DOCU_BLOB)
        };
        if (element.DOCU_GROUP == 1 ) {
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
      this.$router.push("fundCreationSecondLevelReviewlist");
    }, // back button

    saveAsDraft() {},
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },

    returnCase: async function() {
      const response = await this.validateEntryForm();
      if (response) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("FUND_PROFILE_ID", this.FUNDPROFILE.FUND_PROFILE_ID);
        data.append("FUND_STATUS_FUND", "9")

        data.append("USER_ID", JSON.parse(user).user_id);
        data.append("APPR_REMARK_FM", this.model.Remark);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID_FM", "9");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        const approvalLevel = await services06Module0.getApprovalLevel(6, 2);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        try {
          console.log("Are you sure to Return?");
          if (confirm("Are you sure you to return ?")){
          const response = await servicesModule5.updateApprovalFundCreation(
            data
          );
          console.log("Fund Creation Returned to Admin");
          this.$router.push("fundCreationSecondLevelReviewlist");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(response);
      }
    },
    rejectCase: async function() {
      const response = await this.validateEntryForm();
      if (response) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("FUND_PROFILE_ID", this.FUNDPROFILE.FUND_PROFILE_ID);

        data.append("FUND_STATUS_FUND", "5")
        data.append("USER_ID", JSON.parse(user).user_id);
        data.append("APPR_REMARK_FM", this.model.Remark);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID_FM", "5");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        try {
          console.log("Are you sure to Reject?");
          if (confirm("Are you sure to reject ?")){
          const response = await servicesModule5.updateApprovalFundCreation(
            data
          );
          console.log("Fund Creation Rejected");
          this.$router.push("fundCreationSecondLevelReviewlist");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(response);
      }
    },
    submit: async function() {
      const response = await this.validateEntryForm();
      if (response) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("FUND_PROFILE_ID", this.FUNDPROFILE.FUND_PROFILE_ID);

        data.append("FUND_STATUS_FUND", "15")

        data.append("USER_ID", JSON.parse(user).user_id);

        data.append("APPR_REMARK_FM", this.model.Remark);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID_FM", "3");
        data.append("TS_ID", "15");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        try {
          if (confirm("Are you sure to submit ?")){
          const response = await servicesModule5.updateApprovalFundCreation(
            data
          );
          alert("Fund Creation Approved And Submitted to FiMM ID");
          this.$router.push("fundCreationSecondLevelReviewlist");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(response);
      }
    }
  },

  computed: {},

  data() {
    return {
      getDataFundProfile: "",
      getAllFundProfile1: "",
      selected: true,
      unselected: false,
      fileRecords: [],
      uploadFileOject: [],
      file0:"",
      file1:"",
      file2:"",
      file3:"",
      file4:"",
      status: [
        {
          id: "Reviewed",
          name: "Reviewed"
        },
        {
          id: "Returned",
          name: "Returned"
        },
        {
          id: "Rejected",
          name: "Rejected"
        },
        {
          id: "Submit",
          name: "Submit for FiMM Review"
        }
      ],
      model: {
        fileUpload: "",
        file: [],
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: [],

        Remark: ""
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [

              {
                id: '1',
                labels: 'New Fund Notification Letter to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                deletable: false,
                downloadable: false,
                text: 'Choose a File',
                model: 'file0',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
              {
                id: '2',
                labels: 'New Fund Application Form to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                deletable: false,
                downloadable: false,
                text: 'Choose a File',
                model: 'file1',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
              {
                id: '3',
                labels: 'Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                deletable: false,
                downloadable: false,
                text: 'Choose a File',
                model: 'file2',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
              {
                id: '4',
                labels: 'Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                deletable: false,
                downloadable: false,
                text: 'Choose a File',
                model: 'file3',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
            ]
          }
        ]
      },
      fileUploadSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: '5',
                labels: 'For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                deletable: false,
                downloadable: false,
                text: 'Choose a File',
                model: 'file4',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
            ]
          }
        ]
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
            validator: "string"
          }
        ]
      },
      formOptions: {
        validateAfterChanged: true
      }
    };
  }
};
</script>
<style></style>
