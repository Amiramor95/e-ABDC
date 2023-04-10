<template>
          <va-card>
            <br/>
            <h4 slot="header" class="card-title">
              Program Detail
            </h4>
            <va-card>
              <div class="ml-3 col-md-12">
                <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 25%">CPD CODE/Reference Number</td>
                <td>{{details.DIST_NAME}}</td>
              </tr>
              <tr>
                <td>Program Title </td>
                <td>{{details.AVAILABLE_BALANCE}}</td>
              </tr>
              <tr>
                <td>Application Type </td>
                <td>{{details.PENDING}}</td>
              </tr>
              <tr>
                <td>Start Dates </td>
                <td>{{details.PENDING}}</td>
              </tr>
              <tr>
                <td>End Dates </td>
                <td>{{details.PENDING}}</td>
              </tr>
              <tr>
                <td>Hours </td>
                <td>{{details.PENDING}}</td>
              </tr>
              <tr>
                <td>Uploaded Document </td>
                <td>{{details.PENDING}}</td>
              </tr>
              <tr>
                <td>Participant List</td>
                <td>View</td>
              </tr>
              <tr>
                <td>Feedback </td>
                <td>View</td>
              </tr>
              <tr>
                <td>SLO</td>
                <td>View</td>
              </tr>
            </tbody>
                </table>
              </div>
            </va-card>
            <br /><br />
            <va-card>

             <h4 slot="header" class="card-title">
              Revocation Justification
            </h4>
            <br>

              <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>


              <br />
            <vue-form-generator
              :model="model"
              :schema="fourthTabSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
            <br />
          
        

            </va-card>
            <br/>
            <br/>
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div class="float-right">
              <button
                @click="submit"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Submit
              </button>
            </div>
            <br />
          </va-card>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
// import * as servicesModule6 from '../../../app/module6/services05'
// import * as services06Module0 from "../../../app/module0/services06";
Vue.use(VueFormGenerator)
export default {

  mounted () {
    this.getIssueingBank()
    this.getBallance()
  },

  components: {},

  data () {
    return {
      details:[],
      RecordBank: [],
      currentBF: [],
      uploadFileOject: [],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      model: {
        details:'',
        IssueBank: '',
        prepaymentAmount: '',
        ReffNumber: '',
        remarks: '',
        paymentmethod: '',
        fileUpload: '',
      },

      fourthTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
            
              {
                type: 'textArea',
                label: 'Remarks/Comments',
                model: 'remarks',
                hint: 'Max 500 characters',
                max: 500,
                rows: 4,
                required: false,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                labels: 'Upload Document',
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: false,
              },
            ],
          },
        ],
      },
    }
  },
  methods: {

    // get issueing bank
    getIssueingBank: async function () {
      const response = await servicesModule6.getIssueingBank()
      this.RecordBank = response
    },

    // Get ballance
    getBallance: async function () {
      const user = localStorage.getItem('user')
      const response = await servicesModule6.getBallance(JSON.parse(user).user_id)
      this.details = response
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    // back button
    back () {
      this.$router.go(-1)
    },

    async submit () {
      if (confirm("Are you sure to submit this Pre-Payment ?"))
      {
    //   if (this.$refs.regForm.validate()) {
    //     const data = new FormData()
    //     const user = localStorage.getItem('user')
    //     data.append('DIST_USER_ID', JSON.parse(user).user_id)
    //     data.append('DEBIT_AMOUNT', this.model.prepaymentAmount)
    //     data.append('PREPAYMENT_PAYMENT_REFERENCE', this.model.ReffNumber)
    //     data.append('TRANS_REMARK', this.model.remarks)
    //     data.append('DIST_TRANS_TYPE', '1')
    //     data.append('CREDIT_AMOUNT', '0')
    //     data.append('FIN_TRANS_TYPE', '3')
    //     data.append('CURRENCY', '1')
    //     data.append('TRANS_STATUS', '15')
    //     data.append('TRANS_BANK', this.model.IssueBank.SETTING_GENERAL_ID)

    //     const approvalLevel = await services06Module0.getApprovalLevel(19, 1);
    //     data.append("APPR_LIST", JSON.stringify(approvalLevel));
    //       //notification
    //     data.append("NOTI_LOCATION", "PrepaymentTopup-list");
    //     var code = "";
    //     code = this.details.DIST_NAME;
    //     var remarkEntry = "(FN) Prepayment Topup Submission for " + code;
       
    //     data.append("NOTI_REMARK", remarkEntry);
    //     try {
    //       // eslint-disable-next-line no-unused-vars
    //       const response = await servicesModule6.createPrepayment(data)
    //       this.$router.push("/distributor/distributor-Transaction-List");
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
      }
    },
  },
}
</script>
