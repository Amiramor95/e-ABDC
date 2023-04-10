<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div>
              <h4 slot="header" class="card-title">Fund Details</h4>
              <br/>
                <b-row>
                  <b-col><b>Management Company</b></b-col>
                  <b-col>{{ FUNDPROFILE.DIST_NAME }}</b-col>
                  <b-col></b-col>
                </b-row>
                <b-row>
                  <b-col><b>Company Type</b></b-col>
                  <b-col>{{ FUNDPROFILE.DIST_TYPE_NAME }}</b-col>
                  <b-col></b-col>
                </b-row>
                <b-row>
                  <b-col><b>Umbrella Fund</b></b-col>
                  <b-col>{{ FUNDPROFILE.UMBRELLA_FUND_NAME }}</b-col>
                  <b-col></b-col>
                </b-row>  
                <br/>              
                <b-row>
                  <b-col></b-col>
                </b-row>
                <b-row>
                  <b-col><b>Member Fund Code</b></b-col>
                  <b-col>{{ FUNDPROFILE.FUND_CODE_MEMBER }}</b-col>
                  <b-col><b>Fund Status</b></b-col>
                  <b-col>{{ FUNDPROFILE.TS_PARAM }}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Fund Chinese Name (Traditional)</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_NAME_CHINESE}}</b-col>
                  <b-col><b>Fund Name</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_NAME}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Fund Short Name</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SHORT_NAME}}</b-col>
                  <b-col><b>Annual Management Fee</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_FEE_ANNUAL}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>FiMM Fund Type</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_TYPE}}</b-col>
                  <b-col><b>Performance Fee</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_FEE_PERFORMACE}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>FiMM Fund Category</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_CATEGORY}}</b-col>
                  <b-col><b>Ratio</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_RATIO}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>FiMM Domicite</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_DOMICILE}}</b-col>
                  <b-col><b>Hurdle Rate</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_HURDLE}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>FiMM Currency Denomination</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_CURR_DENOMINATION}}</b-col>
                  <b-col><b>Launch Price per unit</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_PRICE_PERUNIT}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Sub Manager Name</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SUB_MANAGER}}</b-col>
                  <b-col><b>Launch Date</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_DATE_LAUNCH}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Syariah Compliant</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SYARIAH_COMP}}</b-col>
                  <b-col><b>Financial Year End</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_YEAR_END}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Annual Management Status</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_ANNUAL_MGMT}}</b-col>
                  <b-col><b>Minimum Sales Charge</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SALES_CHARGE}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Declaration of Fund Performance</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_FUND_PERFORMANCE}}</b-col>
                  <b-col><b>Maximum Sales Charge</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SALES_CHARGE}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>EPF Status</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_STATUS_EPF}}</b-col>
                  <b-col><b>Scheme Structure</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_SCHEME}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Disclosure of Daily NAV in the Newspaper</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_DAILY_NAV}}</b-col>
                  <b-col><b>Foreign / Local Focused</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_FOCUS}}</b-col>
                </b-row>
                <b-row>
                  <b-col><b>Wholesale Fund</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_WHOLESALE}}</b-col>
                  <b-col><b>Feeder Fund</b></b-col>
                  <b-col>{{FUNDPROFILE.FUND_FEEDER}}</b-col>
                </b-row>
            </div>
            <br />
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
            <!-- </form> -->
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'vue-form-generator/dist/vfg.css'
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule5 from '../../../app/module5/services03'
export default {
  props: {
    FUNDPROFILE: {},
  },

  mounted () {
    this.getFundProfile();
  },

  components: {},

  methods: {
    getFundProfile: async function () {
      const data = this.$route.params.FUNDPROFILE.FUND_PROFILE_ID;
      console.log(data);
      const response = await servicesModule5.getFundProfileReviewDetails(data);
      this.getAllFundProfile = JSON.stringify(response);
    },
    back () {
      this.$router.push('fundCreationSecondLevelReviewlist')
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
          this.$router.push('fundCreationSecondLevelReviewlist');
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
          const response = await servicesModule5.updateApprovalFundCreation(data);
          // alert(JSON.stringify(response));
          this.$router.push('fundCreationSecondLevelReviewlist');
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
          alert(JSON.stringify(response));
          this.$router.push('fundCreationSecondLevelReviewlist');

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
      
      getAllFundProfile: null,
      selected: true,
      unselected: false,
      fileRecords: [],
      model: {
        data: '',
        file: [],
      },
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
      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                id: '1',
                labels: 'New Fund Notification Letter to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '2',
                labels: 'New Fund Application Form to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '3',
                labels: 'Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '4',
                labels: 'Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '5',
                labels: 'For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
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

</style>
