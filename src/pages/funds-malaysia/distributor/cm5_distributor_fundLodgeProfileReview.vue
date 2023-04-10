<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div>
              <h4 slot="header" class="card-title">Fund Details</h4>
              <br />

              <div class="container">
                <div class="row no-gutters ml-4">
                  <div class="col">
                    <div class="row mb-3">
                      <span class="description row col-4">
                        <b>Management Company</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{
                        FUNDPROFILE.DIST_NAME
                      }}</span>
                      <!-- <span class="description row col">BIMB INVESTMENT MANAGEMENT BERHAD</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-4">
                        <b>Company Type</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{
                        FUNDPROFILE.DIST_TYPE_NAME
                      }}</span>
                      <!-- <span class="description row col">3rd Party Company</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-4">
                        <b>Umbrella Fund</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{
                        FUNDPROFILE.FUND_UMBRELLA
                      }}</span>
                      <!-- <span class="description row col">Advantage Global Equity Volatility Focused</span> -->
                    </div>
                  </div>
                </div>
              </div>
              <br /><br />

              <div class="container">
                <div class="row no-gutters ml-4">
                  <div class="col">
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Member Fund Code</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_CODE_MEMBER }}
                      </span>
                      <!-- <span class="description row col">1001</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Fund Chinese Name (Traditional)</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_NAME_CHINESE }}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Fund Short Name</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_SHORT_NAME }}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>FiMM Fund Type</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_TYPE }}
                      </span>
                      <!-- <span class="description row col">Absolute Return</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>FiMM Fund Category</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_CATEGORY }}
                      </span>
                      <!-- <span class="description row col">Alternatives</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>FiMM Domicite</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_DOMICILE }}
                      </span>
                      <!-- <span class="description row col">Malaysia</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>FiMM Currency Denomination</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_CURR_DENOMINATION }}
                      </span>
                      <!-- <span class="description row col">MYR</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Sub Manager Name</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_SUB_MANAGER }}
                      </span>
                      <!-- <span class="description row col">Mohd Khairul</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Syariah Compliant</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_SYARIAH_COMP }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Annual Management Status</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_ANNUAL_MGMT }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Declaration of Fund Performance</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_FUND_PERFORMANCE }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>EPF Status</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_STATUS_EPF }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Disclosure of Daily NAV in the Newspaper</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_DAILY_NAV }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                  </div>

                  <div class="col-6 ml-5">
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Fund Status</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_STATUS_FUND }}
                      </span>
                      <!-- <span class="description row col">New</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Fund Name</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_NAME }}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Annual Management Fee</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_FEE_ANNUAL }}
                      </span>
                      <!-- <span class="description row col">5.50%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Performance Fee</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_FEE_PERFORMACE }}
                      </span>
                      <!-- <span class="description row col">5.50%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Ratio</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_RATIO }}
                      </span>
                      <!-- <span class="description row col">20:80</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Hurdle Rate</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_HURDLE }}
                      </span>
                      <!-- <span class="description row col">2.333%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Launch Price per unit</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_PRICE_PERUNIT }}
                      </span>
                      <!-- <span class="description row col">RM1 000</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Launch Date</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_DATE_LAUNCH }}
                      </span>
                      <!-- <span class="description row col">20-12-2020</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Financial Year End</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_YEAR_END }}
                      </span>
                      <!-- <span class="description row col">12-2020</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Minimum Sales Charge</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_SALES_CHARGE }}
                      </span>
                      <!-- <span class="description row col">2.22%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Scheme Structure</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_SCHEME }}
                      </span>
                      <!-- <span class="description row col">UTF</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Foreign / Local Focused</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_FOCUS }}
                      </span>
                      <!-- <span class="description row col">Local-Focused</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6">
                        <b>Wholesale Fund</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_WHOLESALE }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-2">
                      <span class="description row col-6">
                        <b>Feeder Fund</b>
                      </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{ FUNDPROFILE.FUND_FEEDER }}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <!-- </form> -->
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule5 from "../../../app/module5/services03";
export default {
  props: {
    FUNDPROFILE: {}
  },

  mounted() {
    this.getAllFundProfile();
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
    gethAllFundProfile: async function() {
      const response = await servicesModule5.getAllFundProfile();
      this.getAllFundProfile = response;
    },
    back() {
      this.$router.go(-1);
    }, // back button

    saveAsDraft() {},
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },

    reject() {},
    rtrn() {},
    submit: async function() {
      const response = await this.validateEntryForm();
      if (response) {
      } else {
      }
    }
  },

  computed: {},

  data() {
    return {
      selected: true,
      unselected: false,
      fileRecords: [],
      docUploadList: [
        {
          id: "1",
          fileName:
            "Copy of approval letter from the SC/Fund Lodgement Summary from the SC's LOLA Online Submission System for new fund",
          type: "file",
          filePath: "",
          selected: true
        },
        {
          id: "2",
          fileName:
            "Two sets pf Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document",
          type: "file",
          filePath: "",
          selected: true
        },
        {
          id: "3",
          fileName:
            "Key Data section of the Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document duly registered with the SC",
          type: "file",
          filePath: "",
          selected: false
        },
        {
          id: "4",
          fileName:
            "For funds approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representive",
          type: "file",
          filePath: "",
          selected: false
        }
      ],
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
          name: "Submit for 2nd Review"
        }
      ],
      model: {
        //* * company detail */
        companyName: "A.D.Fincancial Sdn. Bhd.",
        coRegNo: "871180-W",
        address: "3, Jalan Dato Abdul Aziz, Seksyen 14",
        address2: "",
        postcode: "46100",
        city: "Petaling Jaya",
        state: "Selangor",
        telNo: "0379568833",
        faxNo: "-",
        applicationType: "member",
        email: "ADFinancia@gmail.com",

        terminateDate: "22/10/2020",
        terminateRemark: "Remark 1",
        document: "document1.pdf",
        secondLevelRemark: "Approve"
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
<style>
.i {
  font-style: normal;
}
</style>
