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
                  Distribution Agreement
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

              <!-- </card> -->
            </div>
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
      this.$router.go(-1);
    }, // back button

    saveAsDraft () {},
    validatestatusForm () {
      return this.$refs.ReviewRemark.validate()
    },

    validateEntryForm () {
      return this.$refs.ReviewRemark.validate()
    },
  },

  computed: {},

// data () {
//     return {

//       getAllFundProfile: null,
//       selected: true,
//       unselected: false,
//       fileRecords: [],
//       model: {
//         data: '',
//         file: [],
//       },
//       status: [
//         {
//           id: 'Reviewed',
//           name: 'Reviewed',
//         },
//         {
//           id: 'Returned',
//           name: 'Returned',
//         },
//         {
//           id: 'Rejected',
//           name: 'Rejected',
//         },
//         {
//           id: 'Submit',
//           name: 'Submit for 2nd Review',
//         },
//       ],
//       model: {

//       fileUploadSchema: {
//         groups: [
//           {
//             styleClasses: 'row',
//             fields: [
//               {
//                 id: '1',
//                 labels: '',
//                 accept: '.pdf,.xlsx,.xls',
//                 multiple: false,
//                 text: 'Choose a File',
//                 model: 'file',
//                 type: 'vfg-custom-multiple-file-edit',
//                 styleClasses: 'col-md-12',
//               },
//             ],
//           },
//         ],
//       },

//       formOptions: {
//         validateAfterChanged: true,
//       },
//     },
//   },
// },
}

</script>
<style>

</style>
