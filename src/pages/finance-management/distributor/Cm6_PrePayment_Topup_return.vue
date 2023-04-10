<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <va-card>
            </br>
            <h4 slot="header" class="card-title">
              Pre-Payment Topup Submission
            </h4>
            <vue-form-generator
              :model="model"
              :schema="fourthTabSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
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
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import * as servicesModule6 from '../../../app/module6/services05'
Vue.use(VueFormGenerator)
export default {

  mounted () {
    this.getIssueingBank()
  },

  components: {},

  data () {
    return {
      RecordBank: [],

      paymentmethod: [
        {
          name: 'Online Transaction',
          id: '1',
        },
        { name: 'Cash Deposit', id: '2' },
      ],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      model: {
        currentBF: '',
        IssueBank: '',
        prepaymentAmount: '',
        ReffNumber: '',
        remarks: '',
        paymentmethod: '',
      },

      fourthTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Current B/F (RM)',
                model: 'currentBF',
                placeholder: '',
                required: false,
                validator: 'string',
                styleClasses: 'ml-1 col-md-11',
                disabled: 'true',
              },
              {
                type: 'vueMultiSelect',
                model: 'IssueBank',
                label: 'Issueing Bank',
                placeholder: 'Select Issueing Bank',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-5',
                selectOptions: {
                  multiple: false,
                  key: 'SET_CODE', // id yg nak simpan
                  label: 'SET_PARAM', // value nak display
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.RecordBank // get value
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Prepayment Amount (RM)',
                model: 'prepaymentAmount',
                placeholder: '',
                required: false,
                validator: 'string',
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
                label: 'Reference Number',
                model: 'ReffNumber',
                placeholder: '',
                required: false,
                validator: 'string',
                styleClasses: 'col-md-5',
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
                styleClasses: 'col-md-11',
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
      this.currentBF = response
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
      if (this.$refs.regForm.validate()) {
        const data = new FormData()
        const user = localStorage.getItem('user')
        data.append('DIST_USER_ID', JSON.parse(user).user_id)
        data.append('DEBIT_AMOUNT', this.model.prepaymentAmount)
        data.append('PREPAYMENT_PAYMENT_REFERENCE', this.model.ReffNumber)
        data.append('PREPAYMENT_REMARK', this.model.remarks)
        data.append('DIST_TRANS_TYPE', '1')
        data.append('CREDIT_AMOUNT', '0')
        data.append('FIN_TRANS_TYPE', '3')
        data.append('CURRENCY', '1')
        data.append('STATUS', '15')
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule6.createPrepayment(data)
          this.getAllState()
        //   this.model.SET_PARAM = '';
        //   this.model.STATE_NAME ='';
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
