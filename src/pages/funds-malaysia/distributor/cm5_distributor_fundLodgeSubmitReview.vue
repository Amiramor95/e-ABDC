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
                    FUNDPROFILE.FUND_FOCUS != null ||
                      FUNDPROFILE.FUND_FOCUS != ''
                  "
                >
                  {{ FUNDPROFILE.FUND_FOCUS }}
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
                      </tbody>
                    </table>
                  </div>
      </div>
    </va-card>
    <br/>
    <va-card>
      <div>
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
    </va-card>
  </div>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as servicesModule5 from '../../../app/module5/services03'
export default {

  mounted () {
    var data = localStorage.getItem('fundLodgementView');
    this.FUNDPROFILE = JSON.parse(data)
    this.getAllFundProfile()
  },

  components: {},

  methods: {
    gethAllFundProfile: async function () {
      const response = await servicesModule5.getAllFundProfile()
      this.getAllFundProfile = response
    },
    back () {
      this.$router.go(-1)
    }, // back button
    handleClick (newTab) {
      this.currentTab = newTab;
    }, // end tab
    saveAsDraft () {},
    validatestatusForm () {
      return this.$refs.ReviewRemark.validate()
    },

    validateEntryForm () {
      return this.$refs.ReviewRemark.validate()
    },

    reject: async function () {
      const response = await this.validateEntryForm()
      if (response) {

      } else {

      }
    },
    rtrn: async function () {
      const response = await this.validateEntryForm()
      if (response) {

      } else {

      }
    },
    submit: async function () {
      const response = await this.validateEntryForm()
      if (response) {

      } else {

      }
    },
  },

  computed: {},

  data () {
    return {
      FUNDPROFILE: '',
      selected: true,
      unselected: false,
      fileRecords: [],
      docUploadList: [
        {
          id: '1',
          fileName: "Copy of approval letter from the SC/Fund Lodgement Summary from the SC's LOLA Online Submission System for new fund",
          type: 'file',
          filePath: '',
          selected: true,
        },
        {
          id: '2',
          fileName: 'Two sets pf Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document',
          type: 'file',
          filePath: '',
          selected: true,
        },
        {
          id: '3',
          fileName: 'Key Data section of the Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document duly registered with the SC',
          type: 'file',
          filePath: '',
          selected: false,
        },
        {
          id: '4',
          fileName: 'For funds approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representive',
          type: 'file',
          filePath: '',
          selected: false,
        },
      ],
      status: [
        {
          id: 'Reviewed',
          name: 'Reviewed',
        },
        {
          id: 'Returned',
          name: 'Returned',
        },
        {
          id: 'Rejected',
          name: 'Rejected',
        },
        {
          id: 'Submit',
          name: 'Submit for 2nd Review',
        },
      ],
      model: {
        //* * company detail */
        companyName: 'A.D.Fincancial Sdn. Bhd.',
        coRegNo: '871180-W',
        address: '3, Jalan Dato Abdul Aziz, Seksyen 14',
        address2: '',
        postcode: '46100',
        city: 'Petaling Jaya',
        state: 'Selangor',
        telNo: '0379568833',
        faxNo: '-',
        applicationType: 'member',
        email: 'ADFinancia@gmail.com',

        terminateDate: '22/10/2020',
        terminateRemark: 'Remark 1',
        document: 'document1.pdf',
        secondLevelRemark: 'Approve',
      },
      schema: {
        fields: [

          {
            type: 'textArea',
            label: 'Remark',
            model: 'Remark',
            hint: 'Max 1000 characters',
            max: 1000,
            rows: 5,
            placeholder: 'Enter Remark',
            styleClasses: 'col-md-12',
            required: true,
            validator: 'string',
          },
        ],
      },
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
<style>
.i{
  font-style: normal;
}
</style>
