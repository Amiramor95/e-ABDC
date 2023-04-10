<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Pre-Payment Top Up Payment Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">Payment Details
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
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ TOPUPDETAILS.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Distributor Type</td>
                <td>: {{ TOPUPDETAILS.DIST_TYPE_NAME }}</td>
              </tr>
              <tr>
                <td>Submission Date</td>
                <td>: {{ TOPUPDETAILS.DATE_DISPLAY }}</td>
              </tr>
              <tr>
                <td>Reference Number</td>
                <td>: {{ TOPUPDETAILS.PAYMENT_REFERENCE }}</td>
              </tr>
              <tr>
                <td>Amount </td>
                <td>: RM {{ TOPUPDETAILS.DEBIT_AMOUNT != "0.00" ? TOPUPDETAILS.DEBIT_AMOUNT : TOPUPDETAILS.CREDIT_AMOUNT  }}</td>
              </tr>
              <tr>
                <td>Payment Method</td>
                <td>: {{ TOPUPDETAILS.TYPE }}</td>
              </tr>
              <tr>
                <td>Payment Advice</td>
                <td> : <a href="#" @click="previewPaymentAdvice" v-if="prePaymentDocument.payment_advice_document">{{ prePaymentDocument.payment_advice_document.DOC_ORIGINAL_NAME }} </a>   </td>
              </tr>
              <tr>
                <td>Other</td>
                <td> : <a href="#" @click="previeweOtherPaymentDoc" v-if="prePaymentDocument.payment_document_other"> {{ prePaymentDocument.payment_document_other.DOC_ORIGINAL_NAME }} </a>  </td>
              </tr>
              <tr>
                <td> Remarks </td>
                <td> : {{ TOPUPDETAILS.TRANS_REMARK }} </td>
              </tr>
              <tr>
                <td>Return/Acknowledge Remarks</td>
                <td> : {{ TOPUPDETAILS.RETURN_ACKNOWLEDGED_REMARKS }} </td>
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
    <div v-if="TOPUPDETAILS.STATUS == 'PENDING' "
    class="float-right">
      <button
      @click="submit('return')"
      type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Return
      </button>
      <button
        @click="submit('ack')"
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
    var data = localStorage.getItem('PrepaymentTopup-Details')
    this.TOPUPDETAILS = JSON.parse(data)
    setTimeout(()=>{
      this.getPrepaymentDocument(this.TOPUPDETAILS.TRANSACTION_LEDGER_ID || this.TOPUPDETAILS.LEDGER_ID)
    })
    
  },

  components: {},

  methods: {
    getPrepaymentDocument(ledgerId){
      services05Module6.getPrepaymentTopDocument(ledgerId).then(response => {
        this.prePaymentDocument = response.data
        console.log(this.prePaymentDocument)
      }).catch(error=>{
        console.log(error)
      })
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, 

    previewPaymentAdvice(){
       const base64Docs = this.prePaymentDocument.payment_advice_document.DOC_BLOB;
       const win = window.open()
       win.document.write('<iframe src="' + base64Docs  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
    },

    previeweOtherPaymentDoc() {
       const base64Docs = this.prePaymentDocument.payment_document_other.DOC_BLOB;
       const win = window.open()
       win.document.write('<iframe src="' + base64Docs  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
    },

    back () {
      this.$router.push({
        name: 'PrepaymentTopup-list',
      })
    }, 

    submit: async function (btnType) {
      if (confirm("Are you sure to Acknowledge this Pre-payment Top up ?"))
      {
        const data = new FormData();
        data.append("LEDGER_ID", this.TOPUPDETAILS.TRANSACTION_LEDGER_ID);
        const status = btnType === 'return' ? 7 : 6;
        data.append("TRANS_STATUS",status);
        data.append("DISTRIBUTOR_ID",  this.TOPUPDETAILS.DISTRIBUTOR_ID);
        data.append('REMARK',this.model.remark)
        data.append('TYPE',btnType)

        try {
          const response = await services05Module6.returntopup(data);
    
          this.$router.push("/fimm/PrepaymentTopup-list");
        } catch (error) {
          console.log(error);
        }
      }
    },

    validateEntryForm () {
      return this.$refs.submissionForm.validate()
    },


    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord,
      )
    },
    filesSelected: function (fileRecordsNewlySelected) {
      console.log('selected')
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error,
      )
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords,
      )
      console.log(fileRecordsNewlySelected)
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
      prePaymentDocument:{},
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
