<template>
          <va-card>
            <br/>
            <h4 slot="header" class="card-title">
             Edit Pre-Payment Topup Submission
            </h4>
            <va-card>
              <div class="ml-3 col-md-12">Distributor Details
                <hr />
                <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ details ?  details.DIST_NAME : '' }}</td>
              </tr>
              <tr>
                <td>Available Balance </td>
                <td>: RM {{ details ?  details.AVAILABLE_BALANCE : ''}}</td>
              </tr>
              <tr>
                <td>Pending Amount for Approval </td>
                <td>: RM {{ details ?  details.PENDING_BALANCE : '' }}</td>
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
import * as services05Module6 from '../../../app/module6/services05'
Vue.use(VueFormGenerator)

export default {
  created () {
    this.getBallance()
    const data = localStorage.getItem('PrepaymentTopup-Details')
    this.TOPUPDETAILS = JSON.parse(data)
    setTimeout(()=>{
      this.getPrepaymentDocument(this.TOPUPDETAILS.LEDGER_ID)
    })
    this.getIssueingBank()
    const PAYMENTTYPE = this.TOPUPDETAILS.TYPE
    if(PAYMENTTYPE === 'CASH DEPOSIT'){
         this.model.paymentmethod = 2
    }else if(PAYMENTTYPE === 'ONLINE TRANSACTION'){
         this.model.paymentmethod = 1
    }else if(PAYMENTTYPE === 'CHEQUE'){
         this.model.paymentmethod = 3
    }
    
    this.model.remarks = this.TOPUPDETAILS.TRANS_REMARK
    this.model.prepaymentAmount = this.TOPUPDETAILS.CREDIT_AMOUNT
    this.model.ReffNumber = this.TOPUPDETAILS.PAYMENT_REFERENCE
   

  },
  components: {},

  data () {
    return {
      TOPUPDETAILS:'',
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
        fileOne:'',
      },

      fourthTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'select',
                model: 'IssueBank',
                label: 'Issuing Bank',
                placeholder: 'Select Issuing Bank',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-5',
                selectOptions: {
                  searchable: true,
                  noneSelectedText : 'Select Issuing Bank',
                  value:'SETTING_GENERAL_ID',
                  name:'SET_PARAM'
                },
                values: (model, schema) => {
                  return this.RecordBank 
                },
              },
              {
                type: 'vfg-custom-currencyInput',
                // inputType: 'number',
                label: 'Prepayment Amount (RM)',
                model: 'prepaymentAmount',
                placeholder: '',
                required: true,
                // validator: 'number',
                styleClasses: 'col-md-5',
              },
              {
                type: 'select',
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
                  noneSelectedText:'Select Payment Method'
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
                required: true,
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
    getPrepaymentDocument(ledgerId){
      services05Module6.getPrepaymentTopDocument(ledgerId).then(response => {
        this.prePaymentDocument = response.data
        if(response.data){
            this.model.filepaymentadvice.push({
                name:this.prePaymentDocument.payment_advice_document.DOC_ORIGINAL_NAME,
                size:this.prePaymentDocument.payment_advice_document.DOC_FILESIZE,
                type:this.prePaymentDocument.payment_advice_document.DOC_MIMETYPE,
                ext:'pdf'
            })
            
            this.model.othersfile.push({
               name:this.prePaymentDocument.payment_document_other.DOC_ORIGINAL_NAME,
               size:this.prePaymentDocument.payment_document_other.DOC_FILESIZE,
               type:this.prePaymentDocument.payment_document_other.DOC_MIMETYPE,
               ext:'pdf'
            });
        }
        
      }).catch(error=>{})
    },

    getIssueingBank: async function () {
      const response = await servicesModule6.getIssueingBank()
      this.RecordBank = response
      this.model.IssueBank = this.TOPUPDETAILS.TRANS_BANK
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
      if (confirm("Are you sure to submit this Pre-Payment ?"))
      {
      if (this.$refs.regForm.validate()) {
        const amount = this.model.prepaymentAmount.replace(/[^\d.-]/g, '') 
        if(amount < 0){
           alert("The prepayment amount should be positive number")
           return;
        }
        const data = new FormData()
        const user = localStorage.getItem('user');

        data.append('LEDGER_ID',this.TOPUPDETAILS.LEDGER_ID)
        data.append('DIST_USER_ID', JSON.parse(user).user_id);
        data.append('DEBIT_AMOUNT', this.model.prepaymentAmount.replace(/\s/gi,""));
        data.append('PREPAYMENT_PAYMENT_REFERENCE', this.model.ReffNumber);
        data.append('TRANS_REMARK', this.model.remarks);
        data.append('DIST_TRANS_TYPE', this.model.paymentmethod);
        data.append('CREDIT_AMOUNT', '0');
        data.append('FIN_TRANS_TYPE', '3');
        data.append('ACC_CODE_TYPE', '3');
        data.append('CURRENCY', '1');
        data.append('TRANS_STATUS', '15');
        data.append('TRANS_BANK', this.model.IssueBank);


        //Payment Advice
      if (this.model.filepaymentadvice.length != 0) {
        for (let i = 0; i < this.model.filepaymentadvice.length; i++) {
          data.append("filepaymentadvice[]", this.model.filepaymentadvice[i]);
          data.append("FILE_PAYMENT_ADVICE_NO", "1");
        }
      }

       //other files
      if (this.model.othersfile.length != 0) {
        for (let i = 0; i < this.model.othersfile.length; i++) {
          data.append("othersfile[]", this.model.othersfile[i]);
          data.append("FILE_OTHERS_NO", "2");
        }
      }
        try {
          const response = await servicesModule6.updatetopup(data)
          if(response.status === 200){
              this.$toast.success('Pre payment topup successfully updated.')
              this.$router.push({
                name:'distributor-prepayment-topup-list'
              })
          }
        } catch (error) {
          console.log(error)
        }
      }
      }
    },
  },
}
</script>
