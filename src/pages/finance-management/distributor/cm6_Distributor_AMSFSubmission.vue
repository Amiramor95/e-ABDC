<template>
          <va-card>
            <br>
            <h4 slot="header" class="card-title">
              Distributor AMSF Collection Submission
            </h4>
            <va-card>
              <div class="ml-3 col-md-12">Distributor Details
                <hr />
                <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{details.DIST_NAME}}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>: 2020</td>
              </tr>
              <tr>
                <td>AMSF Amount </td>
                <td>: RM {{details.AVAILABLE_BALANCE}}</td>
              </tr>
              <tr>
                <td>Pending Amount </td>
                <td>: RM {{details.PENDING_BALANCE}}</td>
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
import { setTimeout } from 'timers'
Vue.use(VueFormGenerator)

export default {
  created () {
    this.getAMSFDetails()
    setTimeout(() => {
      this.getLedgerDetail()
    },1000)
    this.getIssueingBank()
  },

  components: {},

  data () {
    return {
      details:[],
      RecordBank: [],
      ledgerDetail:'',
      currentBF: [],
      paymentmethod: [
        { name: 'Online Transaction',id: '1',},
        { name: 'Cash Deposit', id: '2' },
        { name: 'Cheque', id: '3' },
      ],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      model: {
        details:'',
        IssueBank: '',
        amsfPayment: '',
        ReffNumber: '',
        remarks: '',
        paymentmethod: '',
       'filepaymentadvice':[],
       'othersfile':[]
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
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.RecordBank
                },
              },
              {
                type: 'vfg-custom-currencyInput',
                inputType: 'number',
                label: 'Payment Amount (RM)',
                model: 'amsfPayment',
                placeholder: '',
                required: true,
                validator: ['required', this.validateAmsfAmount],
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
                required: false,
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
              },
              {
                labels: "Other",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "othersfile",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-5",
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
    async getLedgerDetail(){
      const response = await servicesModule6.getAMSFLedgerAndDocumentDetail(this.$route.params.LEDGER_ID)
      const ledgerDetail = response.data.ledger_detail
      this.ledgerDetail = ledgerDetail 
      const advice_document = response.data.amsf_advice_document
      const other_document = response.data.amsf_document_other

      this.model.paymentmethod = ledgerDetail.DIST_TRANS_TYPE
      this.model.remarks = ledgerDetail.TRANS_REMARK
      this.model.amsfPayment = ledgerDetail.DEBIT_AMOUNT
      this.model.ReffNumber = ledgerDetail.PAYMENT_REFERENCE
      this.model.IssueBank = ledgerDetail.TRANS_BANK

           if(advice_document){
              this.model.filepaymentadvice.push({
                  name:advice_document.DOC_ORIGINAL_NAME,
                  size:advice_document.DOC_FILESIZE,
                  type:advice_document.DOC_MIMETYPE,
                  ext:'pdf'
              })
           }
           
           if(other_document){
            this.model.othersfile.push({
               name:other_document.DOC_ORIGINAL_NAME,
               size:other_document.DOC_FILESIZE,
               type:other_document.DOC_MIMETYPE,
               ext:'pdf'
            });
           }
    },
    // get issueing bank
    getIssueingBank: async function () {
      const response = await servicesModule6.getIssueingBank()
      this.RecordBank = response
    },

    // Get ballance
    getAMSFDetails: async function () {
      const user = localStorage.getItem('user')
      const response = await servicesModule6.getAMSFDetails(JSON.parse(user).user_id)
      this.details = response
    },

    validateAmsfAmount (value) {
       const submitamount = this.model.amsfPayment.replace(/\s/gi,"")
       const pendingamount = this.details.TEST
      if (parseFloat(submitamount) > pendingamount) {
        return ['More Then Pending Amount']
      }
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    back () {
      this.$router.go(-1)
    },

    async submit () {
      if (confirm("Are you sure to submit this Payment ?"))
      {
      if (this.$refs.regForm.validate()) {
        const asc = this.model.amsfPayment.replace(/[^\d.-]/g, '');
        
        if(asc < 0){
          alert("AMSF payment amount should be positive number")
          return;
        }
        const data = new FormData()
        const user = localStorage.getItem('user')
        data.append('LEDGER_ID',this.ledgerDetail.LEDGER_ID)
        data.append('DIST_USER_ID', JSON.parse(user).user_id)
        data.append('DEBIT_AMOUNT', this.model.amsfPayment.replace(/\s/gi,""))
        data.append('PREPAYMENT_PAYMENT_REFERENCE', this.model.ReffNumber)
        data.append('DIST_TRANS_TYPE', '1')
        data.append('CREDIT_AMOUNT', '0')
        data.append('FIN_TRANS_TYPE', '5')
        data.append('CURRENCY', '1')
        data.append('TRANS_STATUS', '15')
        data.append('YEAR', '2020')
        data.append('TRANS_BANK', this.model.IssueBank.SETTING_GENERAL_ID)

        const approvalLevel = await services06Module0.getApprovalLevel(57, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
          //notification
        data.append("NOTI_LOCATION", "AMSFCollection-list");
        var code = "";
        code = this.details.DIST_NAME;
        var remarkEntry = "(FN) AMSF Collection Submission for " + code;

        data.append("NOTI_REMARK", remarkEntry);
        data.append('TRANS_REMARK',this.model.remarks)

        if (this.model.filepaymentadvice.length !== 0) {
        for (let i = 0; i < this.model.filepaymentadvice.length; i++) {
          data.append("filepaymentadvice[]", this.model.filepaymentadvice[i]);
          data.append("FILE_PAYMENT_ADVICE_NO", "1");
        }
      }

      if (this.model.othersfile.length !== 0) {
        for (let i = 0; i < this.model.othersfile.length; i++) {
          data.append("othersfile[]", this.model.othersfile[i]);
          data.append("FILE_OTHERS_NO", "2");
        }
      }

        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule6.updateAMSF(data)
          this.$router.push("/distributor/distributor-AMSF-Collection-List");
        } catch (error) {
          console.log(error)
        }
      }
      }
    },
  },
}
</script>
