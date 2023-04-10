<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div>
              <h4 slot="header" class="card-title">Fund Details</h4><br />

              <div class="container">
                <div class="row no-gutters ml-4">
                  <div class="col">
                    <div class="row mb-3">
                      <span class="description row col-4"> <b>Management Company</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{FUNDPROFILE.DIST_NAME}}</span>
                      <!-- <span class="description row col">BIMB INVESTMENT MANAGEMENT BERHAD</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-4"> <b>Company Type</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{FUNDPROFILE.DIST_TYPE_NAME}}</span>
                      <!-- <span class="description row col">3rd Party Company</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-4"> <b>Umbrella Fund</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">{{FUNDPROFILE.FUND_UMBRELLA}}</span>
                      <!-- <span class="description row col">Advantage Global Equity Volatility Focused</span> -->
                    </div>
                  </div>
                </div>
              </div> <br /><br />

              <div class="container">
                <div class="row no-gutters ml-4">
                  <div class="col">
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Member Fund Code</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_CODE_MEMBER}}
                      </span>
                      <!-- <span class="description row col">1001</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Fund Chinese Name (Traditional)</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_NAME_CHINESE}}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Fund Short Name</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_SHORT_NAME}}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>FiMM Fund Type</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_TYPE}}
                      </span>
                      <!-- <span class="description row col">Absolute Return</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>FiMM Fund Category</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_CATEGORY}}
                      </span>
                      <!-- <span class="description row col">Alternatives</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>FiMM Domicite</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_DOMICILE}}
                      </span>
                      <!-- <span class="description row col">Malaysia</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>FiMM Currency Denomination</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_CURR_DENOMINATION}}
                      </span>
                      <!-- <span class="description row col">MYR</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Sub Manager Name</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_SUB_MANAGER}}
                      </span>
                      <!-- <span class="description row col">Mohd Khairul</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Syariah Compliant</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_SYARIAH_COMP}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Annual Management Status</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_ANNUAL_MGMT}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Declaration of Fund Performance</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_FUND_PERFORMANCE}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>EPF Status</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_STATUS_EPF}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Disclosure of Daily NAV in the Newspaper</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_DAILY_NAV}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                  </div>

                  <div class="col-6 ml-5">
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Fund Status</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_STATUS_FUND}}
                      </span>
                      <!-- <span class="description row col">New</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Fund Name</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_NAME}}
                      </span>
                      <!-- <span class="description row col">RHB GLOBAL SHARIAH EQUITY INDEX - RM - HEDGED</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Annual Management Fee</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_FEE_ANNUAL}}
                      </span>
                      <!-- <span class="description row col">5.50%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Performance Fee</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_FEE_PERFORMACE}}
                      </span>
                      <!-- <span class="description row col">5.50%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Ratio</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_RATIO}}
                      </span>
                      <!-- <span class="description row col">20:80</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Hurdle Rate</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_HURDLE}}
                      </span>
                      <!-- <span class="description row col">2.333%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Launch Price per unit</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_PRICE_PERUNIT}}
                      </span>
                      <!-- <span class="description row col">RM1 000</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Launch Date</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_DATE_LAUNCH}}
                      </span>
                      <!-- <span class="description row col">20-12-2020</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Financial Year End</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_YEAR_END}}
                      </span>
                      <!-- <span class="description row col">12-2020</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Minimum Sales Charge</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_SALES_CHARGE}}
                      </span>
                      <!-- <span class="description row col">2.22%</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Scheme Structure</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_SCHEME}}
                      </span>
                      <!-- <span class="description row col">UTF</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Foreign / Local Focused</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_FOCUS}}
                      </span>
                      <!-- <span class="description row col">Local-Focused</span> -->
                    </div>
                    <div class="row mb-3">
                      <span class="description row col-6"> <b>Wholesale Fund</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_WHOLESALE}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                    <div class="row mb-2">
                      <span class="description row col-6"> <b>Feeder Fund</b> </span>
                      <span class="description row col-1">:</span>
                      <span class="description row col">
                        {{FUNDPROFILE.FUND_FEEDER}}
                      </span>
                      <!-- <span class="description row col">Yes</span> -->
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <br />
            <div>

              <br />
              <va-card>
                <h4 slot="header" class="card-title">
                  Uploaded Document
                </h4>
                <br/>
                <div class="row m-2" v-for="(item, index) in docUploadList" :key="index">
                  <va-checkbox
                    class="col-1"
                    v-model="item.selected"
                    disabled="true"
                  ></va-checkbox>
                  <span class="col mt-2 description"
                  >{{item.fileName}} &nbsp;
                    <a
                      v-if="item.selected == true"
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    >View</a
                    >
                  </span>
                </div>
              </va-card>
            </div>
            <br />
            <div>
              <!-- <h4 slot="header" class="card-title">
                  Status And Justification
                </h4>
                <br /> -->
              <!-- <card
                  class="strpied-tabled-with-hover"
                  body-classes="table-full-width table-responsive"
                > -->
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
              <i class="fa fa-paper-plane" /> &nbsp; Submit
            </button>
            <button
              @click="rtrn"
              type="button"
              class="ml-2 btn btn-warning btn-fill float-right btn-md"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="reject"
              type="button"
              class="ml-2 btn btn-danger btn-fill float-right btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Reject
            </button>
            <!-- </form> -->
          </va-card>
        </div>
      </div>
    </div>
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

    saveAsDraft () {},
    validatestatusForm () {
      return this.$refs.ReviewRemark.validate()
    },

    validateEntryForm () {
      return this.$refs.ReviewRemark.validate()
    },

    returnCase: async function () {
      const response = await this.validateEntryForm()
      if (response) {
        const data = new FormData()
        const user = localStorage.getItem('user')
        data.append('FUND_PROFILE_ID', this.FUNDPROFILE.FUND_PROFILE_ID)

        data.append('USER_ID', JSON.parse(user).user_id)
        data.append('APPR_REMARK', this.model.comment)
        data.append('APPR_PUBLISH_STATUS', '1')
        data.append('TS_ID', '9')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        const approvalLevel = await services06Module0.getApprovalLevel(6, 2)
        data.append('APPR_LIST', JSON.stringify(approvalLevel))
        try {
          const response = await servicesModule5.updateApprovalFundCreation(data)
          // alert(JSON.stringify(response));

          this.$router.push('/distributor/fundCreationSecondLevelReviewlist')
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(response)
      }
    },
    rejectCase: async function () {
      const response = await this.validateEntryForm()
      if (response) {
        const data = new FormData()
        const user = localStorage.getItem('user')
        data.append('FUND_PROFILE_ID', this.FUNDPROFILE.FUND_PROFILE_ID)

        data.append('USER_ID', JSON.parse(user).user_id)
        data.append('APPR_REMARK', this.model.comment)
        data.append('APPR_PUBLISH_STATUS', '1')
        data.append('TS_ID', '5')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        const approvalLevel = await services06Module0.getApprovalLevel(6, 1)
        data.append('APPR_LIST', JSON.stringify(approvalLevel))
        try {
          const response = await servicesModule5.updateApprovalFundCreation(data)
          // alert(JSON.stringify(response));

          this.$router.push('/distributor/fundCreationSecondLevelReviewlist')
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(response)
      }
    },
    submit: async function () {
      const response = await this.validateEntryForm()
      if (response) {
        const data = new FormData()
        const user = localStorage.getItem('user')
        data.append('FUND_PROFILE_ID', this.FUNDPROFILE.FUND_PROFILE_ID)

        data.append('USER_ID', JSON.parse(user).user_id)

        data.append('APPR_REMARK', this.model.comment)
        data.append('APPR_PUBLISH_STATUS', '1')
        data.append('TS_ID', '3')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        const approvalLevel = await services06Module0.getApprovalLevel(6, 1)
        data.append('APPR_LIST', JSON.stringify(approvalLevel))
        try {
          const response = await servicesModule5.updateApprovalFundCreation(data)
          // alert(JSON.stringify(response));

          this.$router.push('/distributor/fundCreationSecondLevelReviewlist')
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(response)
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
