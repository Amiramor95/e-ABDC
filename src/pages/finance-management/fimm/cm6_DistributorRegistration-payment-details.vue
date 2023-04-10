<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Distributor Registration Payment Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <!-- suspension details -->
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
                <td style="width: 15%">Submission Date</td>
                <td>: {{ PAYMENTDETAILS.DATE_DISPLAY }}</td>
              </tr>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ PAYMENTDETAILS.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Distributor Type</td>
                <td>: {{ PAYMENTDETAILS.DIST_TYPE_NAME }}</td>
              </tr>
              <tr>
                <td>Reference Number</td>
                <td>: {{ PAYMENTDETAILS.PAYMENT_REFERENCE }}</td>
              </tr>
              <tr>
                <td>Dist Account Amount </td>
                <td>: {{ DISTRIBUTOR_LEDGER_DETAIL.DIST_ACC_AMOUNT }}</td>
              </tr>

               <tr>
                <td> Issue Bank </td>
                <td>: {{ DISTRIBUTOR_LEDGER_DETAIL.SET_PARAM }}</td>
              </tr>

              <tr>
                <td> Dist Transaction Reference </td>
                <td>: {{ DISTRIBUTOR_LEDGER_DETAIL.DIST_TRANS_REF }}</td>
              </tr>

              <tr>
                <td>Amount </td>
                <td>: RM {{ PAYMENTDETAILS.CREDIT_AMOUNT }}</td>
              </tr>
              <tr>
                <td>Payment Method</td>
                <td>: {{ PAYMENTDETAILS.TYPE }}</td>
              </tr>
              <tr>
                <td> Payment Advice  </td>
                <td> :<a @click="viewDocument()" href="#"> {{ PAYMENT_ADVICE ? PAYMENT_ADVICE.DOCU_ORIGINAL_NAME : ''}} </a>  </td> 
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <va-card v-if="PAYMENTDETAILS.STATUS == 'PENDING' ">
        <div class="ml-3 col-md-12">Details
        <hr />
        <vue-form-generator
              :model="model"
              :schema="submissionSchema"
              :options="formOptions"
              ref="regForm"
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
    <div v-if="PAYMENTDETAILS.STATUS == 'PENDING' "
    class="float-right">
      <button
      @click="returned"
      type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Return
      </button>
      <button
        @click="acknowledge"
        type="button"
        class="ml-2 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Acknowledge
      </button>
    </div>
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services05Module6 from '../../../app/module6/services05'
import * as services06Module0 from "../../../app/module0/services06";

export default {

  created () {
    var data = localStorage.getItem('DistributorRegistration-Payment-Details')
    this.PAYMENTDETAILS = JSON.parse(data)
    this.getDistributorLedgerDetails()
  },
  components: {},

  methods: {
    handleClick (newTab) {
      this.currentTab = newTab
    },

    async  getDistributorLedgerDetails() {
        const { DIST_ID , DIST_TYPE_ID } = this.PAYMENTDETAILS
        const res = await services05Module6.getDistributorLedgerDetail(DIST_ID,DIST_TYPE_ID)
        this.DISTRIBUTOR_LEDGER_DETAIL = res.data.data && res.data.data.length ?  res.data.data[0] : {}
        this.PAYMENT_ADVICE = res.data.paymentAdvice
    },

    back () {
      this.$router.push({
        name: 'DistributorRegistration-Payment-list',
      })
    }, 

    viewDocument(){
      const win = window.open()
      win.document.write('<iframe src="' + this.PAYMENT_ADVICE.DOCU_BLOB  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')  
    },

    returned: async function () {
      if (confirm("Are you sure to Return this Distributor Registration ?"))
      {
      const data = new FormData();
      data.append("LEDGER_ID", this.PAYMENTDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "7");

       const approvalLevel = await services06Module0.getApprovalLevelDistributor(18, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        data.append("NOTI_LOCATION", "distributor-Transaction-List");
        var code = "";
        code = this.PAYMENTDETAILS.DIST_NAME;
        var remarkEntry = "(FN) Distributor Registration Return for " + code;

        data.append("NOTI_REMARK", remarkEntry);
        data.append('REMARK',this.model.remark)
        data.append("DISTRIBUTOR_ID",  this.PAYMENTDETAILS.DIST_ID);



      try {
        const response = await services05Module6.updatedistReg(data);
        this.$router.push("/fimm/DistributorRegistration-Payment-list");
      } catch (error) {
        console.log(error);
      }
      }
    },

    validateEntryForm () {
      return this.$refs.submissionForm.validate()
    },

    acknowledge: async function () {
      if (confirm("Are you sure to Acknowledge this Distributor Registration ?"))
      {
      const data = new FormData();
      data.append("LEDGER_ID", this.PAYMENTDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "6");

        const approvalLevel = await services06Module0.getApprovalLevelDistributor(18, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        data.append("NOTI_LOCATION", "distributor-Transaction-List");
        var code = "";
        code = this.PAYMENTDETAILS.DIST_NAME;
        var remarkEntry = "(FN) Distributor Registration Approval for " + code;

        data.append("NOTI_REMARK", remarkEntry);
        data.append('REMARK',this.model.remark)
        data.append("DISTRIBUTOR_ID",  this.PAYMENTDETAILS.DIST_ID);
      try {
        const response = await services05Module6.updatedistReg(data);
        this.$router.push("/fimm/DistributorRegistration-Payment-list");
      } catch (error) {
        console.log(error);
      }
      }
    },


    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord,
      )
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error,
      )
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords,
      )
      
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1)
        var k = this.fileRecords.indexOf(fileRecord)
        if (k !== -1) this.fileRecords.splice(k, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord) // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        this.deleteUploadedFile(fileRecord)
      }
    },
  },

  computed: {
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
      DISTRIBUTOR_LEDGER_DETAIL:{},
      PAYMENT_ADVICE:'',
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
