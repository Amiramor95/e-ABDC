<template>
          <va-card>
            <br/>
            <h4 slot="header" class="card-title">
              Pre-Payment Topup Submission
            </h4>
            <va-card>
              <div class="ml-3 col-md-12">Distributor Details
                <hr />
                <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ details ? details.DIST_NAME : ''  }}</td>
              </tr>
              <tr>
                <td>Available Balance </td>
                <td>: RM {{ details ? details.AVAILABLE_BALANCE : '' }}</td>
              </tr>
              <tr>
                <td>Pending Amount for Approval </td>
                <td>: RM {{ details ? details.PENDING_BALANCE : '' }}</td>
              </tr>
            </tbody>
                </table>
              </div>
            </va-card>
            <br /><br />
            <va-card>
              <br />
            <vue-form-generator
              :model="model"
              :schema="fourthTabSchema"
              :options="formOptions"
              ref="regForm"
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
import * as servicesModule6 from '../../../app/module6/services05'
import * as services06Module0 from "../../../app/module0/services06";
Vue.use(VueFormGenerator,{
  validators:{
     nonNegativeValidators:(value,field,model) => {
        if(value < 0){
          return ['Negative number not allowed']
        }
        return []
     }
  }
})

export default {
  created () {
    this.getIssueingBank()
    this.getBallance()
  },
  components: {},

  data () {
    return {
      details:null,
      RecordBank: [],
      currentBF: [],
      paymentmethod: [
        { name: 'Online Transaction',id: '1',},
        { name: 'Cash Deposit', id: '2' },
        { name: 'Cheque', id: '3' },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      model: {
        details:'',
        IssueBank: '',
        prepaymentAmount: '',
        ReffNumber: '',
        remarks: '',
        paymentmethod: '',
        filepaymentadvice: [],
        othersfile: [],
        fileOne:[],
      },

      fourthTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'IssueBank',
                label: 'Issuing Bank',
                placeholder: 'Select Issuing Bank',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-5',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID', // id yg nak simpan
                  label: 'SET_PARAM', // value nak display
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.RecordBank // get value
                },
              },
              {
                type: 'vfg-custom-currencyInput',
                // inputType: 'number',
                label: 'Prepayment Amount (RM)',
                model: 'prepaymentAmount',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-5',
              },
              {
                type: 'vueMultiSelect',
                model: 'paymentmethod',
                label: 'Payment Method',
                placeholder: 'Select Payment Method',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-5',
                selectOptions: {
                  multiple: false,
                  key: 'id', // id yg nak simpan
                  label: 'name', // value nak display
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.paymentmethod // get value
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Reference / Cheque Number',
                model: 'ReffNumber',
                placeholder: '',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-5',
              },
              {
                labels: "Payment Advice",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "filepaymentadvice",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-5",
                required: true,
                hint: "Accepted format : (.pdf)"
              },
              {
                labels: "Other",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "othersfile",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-5",
                hint: "Accepted format : (.pdf)"
              },
              {
                type: 'textArea',
                label: 'Remarks/Comments',
                model: 'remarks',
                hint: 'Max 1000 characters',
                max: 500,
                rows: 4,
                required: false,
                validator: 'string',
                styleClasses: 'col-md-10',
              },
            ],
          },
        ],
      },


    }
  },
  methods: {
    getIssueingBank: async function () {
      const response = await servicesModule6.getIssueingBank()
      this.RecordBank = response
    },

     getBallance: async function () {
      const user = localStorage.getItem('user')
      const response = await servicesModule6.getBallance(JSON.parse(user).USER_DIST_ID)
      this.details = response
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    back () {
      this.$router.go(-1)
    },

    async submit () {
      const user = localStorage.getItem('user');
      const financeCode = await servicesModule6.checkFinanceCode(JSON.parse(user).USER_DIST_ID);
      if(!financeCode.data.data){
        alert("Please add finance code for this distributor that you logged in.")
        return;
      }

      if (confirm("Are you sure to submit this Pre-Payment ?"))
      {
        if (this.$refs.regForm.validate()) {
          const data = new FormData()
          let amount = this.model.prepaymentAmount.replace(/[^\d.-]/g, '')
          if(amount < 0){
            alert("The input payment amount should be positive number.")
            return;
          }
          data.append('DIST_USER_ID', JSON.parse(user).user_id);
          data.append('DEBIT_AMOUNT', amount);
          data.append('PREPAYMENT_PAYMENT_REFERENCE', this.model.ReffNumber);
          data.append('TRANS_REMARK', this.model.remarks);
          data.append('DIST_TRANS_TYPE', this.model.paymentmethod.id);
          data.append('CREDIT_AMOUNT', '0');
          data.append('FIN_TRANS_TYPE', '3');
          data.append('ACC_CODE_TYPE', '3');
          data.append('CURRENCY', '1');
          data.append('TRANS_STATUS', '15');
          data.append('TRANS_BANK', this.model.IssueBank.SETTING_GENERAL_ID);


          //Payment Advice
        if (this.model.filepaymentadvice.length != 0) {
          for (let i = 0; i < this.model.filepaymentadvice.length; i++) {
            data.append("filepaymentadvice[]", this.model.filepaymentadvice[i]);
            data.append("FILE_PAYMENT_ADVICE_NO", "1");
          }
        }

        if (this.model.othersfile.length != 0) {
          for (let i = 0; i < this.model.othersfile.length; i++) {
            data.append("othersfile[]", this.model.othersfile[i]);
            data.append("FILE_OTHERS_NO", "2");
          }
        }

          const approvalLevel = await services06Module0.getApprovalLevel(19, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          data.append("NOTI_LOCATION", "PrepaymentTopup-list");
          var code = "";
          code = this.details.DIST_NAME;
          var remarkEntry = "(FN) Prepayment Topup Submission for " + code;

          data.append("NOTI_REMARK", remarkEntry);
          try {
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule6.createPrepayment(data)
            this.$toasts.success('Pre payment topup successfully added.',{
              position:'top-right'
            })

            this.$router.push("/distributor/distributor-prepayment-topup-list");
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
  },
}
</script>
