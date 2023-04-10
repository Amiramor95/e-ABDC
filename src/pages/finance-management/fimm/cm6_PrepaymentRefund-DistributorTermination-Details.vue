<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Distributor Pre-Payment Refund (Distributor Termination)</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">Distributor Details
        <span v-if="visibleDetails == false">: <b>{{ TOPUPDETAILS.DIST_NAME }}</b></span>
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
                <td>Submission Date</td>
                <td>: {{ TOPUPDETAILS.DATE_DISPLAY }}</td>
              </tr>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ TOPUPDETAILS.DIST_NAME }}</td>
              </tr>
               <tr>
                <td style="width: 15%">Distributor Type </td>
                <td>: {{ TOPUPDETAILS.DIST_TYPE_NAME }}</td>
              </tr>
               <tr>
                <td style="width: 15%">Total Consultant </td>
                <td>: {{ TOPUPDETAILS.TOTAL_CONS }}</td>
              </tr>
              <tr>
                <td> Total Amount </td>
                <td>: RM {{ TOPUPDETAILS.CREDIT_AMOUNT }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <va-card v-if="TOPUPDETAILS.STATUS == 'PENDING' ">
        <div class="ml-3 col-md-12">Refund Details
        <hr />
        <vue-form-generator
              :model="model"
              :schema="returnSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
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
    <div v-if="TOPUPDETAILS.STATUS == 'PENDING' "
    class="float-right">
      <button
        @click="returned"
        type="button"
        class="ml-2 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Refund
      </button>
    </div>
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services05Module6 from '../../../app/module6/services05'

export default {

  mounted () {
    var data = localStorage.getItem('PrepaymentRefund-DistributorTermination-Details')
    this.TOPUPDETAILS = JSON.parse(data)
  },
  components: {},

  methods: {

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    back () {
      this.$router.push({
        name: 'PrepaymentRefund-DistributorTermination-list',
      })
    }, // back button

 
    returned: async function () {
      const data = new FormData();
      data.append("LEDGER_ID", this.TOPUPDETAILS.LEDGER_ID);
      data.append('REFUND_AMOUNT', this.model.refundAmount)
      data.append('TRANS_REMARK', this.model.remark)
      data.append("TRANS_STATUS", "6");
      try {
        const response = await services05Module6.refundDist(data);
        this.$router.push("/fimm/PrepaymentRefund-DistributorTermination-list");
      } catch (error) {
        console.log(error);
      }
    },

    validateAmount (value) {
       const submitamount = this.model.refundAmount
      //  console.log(submitamount)
       const pendingamount = this.TOPUPDETAILS.AVAILABLE_BALANCE
      //  console.log(pendingamount)

       // compare
      if (submitamount > pendingamount) {
        console.log('More Then Available Amount')
        return ['Value More Then Available Amount']
      } else {
        console.log('less')
      }
    },


  },

  computed: {

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData () {
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
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      TOPUPDETAILS: [],
      currentTab: 'tab1',
      classificationList: [],
      fileRecords: [],
      visibleDetails: true,

      model: {
        refundAmount: '',
        remark: '',
      },

      returnSchema: {
        fields: [
            {
                type: 'input',
                inputType: 'number',
                label: 'Refund Amount (RM)',
                model: 'refundAmount',
                placeholder: '',
                required: false,
                validator: ['required', this.validateAmount],
                styleClasses: 'col-md-5',
              },
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
