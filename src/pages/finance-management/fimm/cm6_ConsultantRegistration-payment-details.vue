<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Registration Payment Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">Payment Details
        <span v-if="visibleDetails == false">: <b>{{ PAYMENTDETAILS.DIST_NAME }}</b></span>
        <button
          v-if="visibleDetails == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleDetails == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleDetails">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ PAYMENTDETAILS.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Distributor Type</td>
                <td>: {{ PAYMENTDETAILS.DIST_TYPE_NAME }}</td>
              </tr>
              <tr>
                <td>Invoice Number </td>
                <td>: {{ PAYMENTDETAILS.INVOICE_NUMBER }}</td>
              </tr>
              <tr>
                <td>Current B/F  </td>
                <td>: {{ DIST_PAYMENT_BALANCE ? 'RM ' +  DIST_PAYMENT_BALANCE.AVAILABLE_BALANCE : null }} </td>
              </tr>
              <tr>
                <td>Deduction Amount </td>
                <td>: RM {{ PAYMENTDETAILS.CREDIT_AMOUNT }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
      <br />
    </va-card>

<br/>
<va-card>
  <div class="ml-3 col-md-12">Consultant Details
    <hr />
    <br/>
  <va-data-table
      :datacount="RecordCount"
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
    </va-data-table>
    </div>
</va-card>
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services05Module6 from '../../../app/module6/services05'
import * as services06Module0 from "../../../app/module0/services06";

export default {
  created () {
    var data = localStorage.getItem('ConsultantRegistration-Payment-Details')
    this.PAYMENTDETAILS = JSON.parse(data)
    this.getAllRecord()
    this.getTopUpBalance()
    console.log(this.PAYMENTDETAILS)

  },

  components: {},

  methods: {

    handleClick (newTab) {
      this.currentTab = newTab
    }, 

    back () {
      this.$router.push({
        name: 'ConsultantRegistration-Payment-list',
      })
    }, 

    returned: async function () {
      const data = new FormData();
      data.append("LEDGER_ID", this.PAYMENTDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "7");
      try {
        const response = await services05Module6.updatedistReg(data);
        this.$router.push("/fimm/ConsultantRegistration-Payment-list");
      } catch (error) {
        console.log(error);
      }
    },

    getAllRecord: async function () {
      const response = await services05Module6.getAllConsultantRegList(this.PAYMENTDETAILS.LEDGER_ID)
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },

    async getTopUpBalance(){
       const res = await services05Module6.getBallance(this.PAYMENTDETAILS.DIST_ID)
       this.DIST_PAYMENT_BALANCE = res
    }, 

    validateEntryForm () {
      return this.$refs.submissionForm.validate()
    },

    acknowledge: async function () {
      const data = new FormData();
      data.append("LEDGER_ID", this.PAYMENTDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "6");
      try {
        const response = await services05Module6.updateConsultantReg(data);
        this.$router.push("/fimm/ConsultantRegistration-Payment-list");
      } catch (error) {
        console.log(error);
      }
    },


    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord,
      )
    },
    
  },

  computed: {

    fields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        { // DIST_TRANS_DATE
          name: 'CONSULTANT_NAME',
          title: 'NAME',
          sortField: 'CONSULTANT_NAME',
        },
        {
          name: 'CONSULTANT_NRIC',
          title: 'NRIC NUMBER',
          sortField: 'CONSULTANT_NRIC',
        },
        {
          name: 'CONSULTANT_PASSPORT_NO',
          title: 'PASSPORT NUMBER',
          sortField: 'CONSULTANT_PASSPORT_NO',
        },
        {
          name: 'TYPE_NAME',
          title: 'CONSULTANT TYPE',
          sortField: 'TYPE_NAME',
        },
        {
          name: 'FEE_AMOUNT',
          title: 'FEE AMOUNT (RM)',
          sortField: 'FEE_AMOUNT',
        },
        {
          name: 'PAYMENTTYPE2',
          title: 'PAYMENT TYPE',
          sortField: 'PAYMENTTYPE2',
        },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term

          .split(' ')
          .every(
            // (v) =>
          )
      })
    },
  },

  data () {
    return {
      DIST_PAYMENT_BALANCE:null,
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      PAYMENTDETAILS: [],
      currentTab: 'tab1',
      classificationList: [],
      fileRecords: [],
      visibleProfile: false,
      visibleDetails: true,
      visibleAppeal: true,
      visibleLog: false,

      model: {
        classification: '',
        startDate: null,
        endDate: null,
        reason: '',
        remark: '',
        fileUpload: '',
      },

      submissionSchema: {
        fields: [
          {
            type: 'textArea',
            model: 'remark',
            label: 'Remarks/Comments',
            hint: 'Max 1000 characters',
            max: 1000,
            placeholder: 'Enter Remark',
            rows: 5,
            validator: 'string',
            styleClasses: 'col-md-12',
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
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.default-tabs {
  position: relative;
  margin: 0 auto;
  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: black;
    }
    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }
    &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>
