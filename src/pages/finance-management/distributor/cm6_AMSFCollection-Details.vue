<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">AMSF Collection Payment Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">Payment Details
        <span v-if="!visibleDetails">: <b>{{ AMSFDETAILS.DIST_NAME }}</b></span>
        <button
          v-if="visibleDetails"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="!visibleDetails"
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
                <td> Submission Date </td>
                <td>: {{ AMSFDETAILS.DATE_DISPLAY }}</td>
              </tr>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>: {{ AMSFDETAILS.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Distributor Type</td>
                <td>: {{ AMSFDETAILS.DIST_TYPE_NAME }}</td>
              </tr>
              <tr>
                <td>Reference Number</td>
                <td>: {{ AMSFDETAILS.PAYMENT_REFERENCE }}</td>
              </tr>
              <tr>
                <td>Amount </td>
                <td>: RM {{ AMSFDETAILS.CREDIT_AMOUNT != "0.00" ? AMSFDETAILS.CREDIT_AMOUNT : AMSFDETAILS.DEBIT_AMOUNT  }}</td>
              </tr>
              <tr>
                <td>Payment Type</td>
                <td>: {{ AMSFDETAILS.TYPE }}</td>
              </tr>
              <tr>
                <td> Payment Advice </td>
                <td> : <a href="#" @click="previewAmsfAdvice" v-if="amsfDocument.amsf_advice"> {{ amsfDocument.amsf_advice.DOC_ORIGINAL_NAME }} </a></td>
              </tr>
              <tr>
                <td> Other </td>
                <td> : <a href="#" @click="previewAmsfOtherDocs" v-if="amsfDocument.other_document"> {{ amsfDocument.other_document.DOC_ORIGINAL_NAME }} </a></td>
              </tr>
              <tr>
                <td> Remarks </td>
                <td> : {{ AMSFDETAILS.TRANS_REMARK }}  </td>
              </tr>
              <tr>
                <td> Return/Acknowledge Remarks </td>
                <td> : {{ AMSFDETAILS.RETURN_ACKNOWLEDGED_REMARKS }}  </td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <va-card v-if="AMSFDETAILS.STATUS == 'PENDING' ">
        <div class="ml-3 col-md-12">Details
        <hr />
        <vue-form-generator
              :model="model"
              :schema="submissionSchema"
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
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services05Module6 from '../../../app/module6/services05'

export default {
  created(){
    const  data = localStorage.getItem('AMSFCollection-details')
    this.AMSFDETAILS = JSON.parse(data)
    setTimeout(() => {
      this.getAMSFDocument(this.AMSFDETAILS.LEDGER_ID || this.AMSFDETAILS.TRANSACTION_LEDGER_ID)
    })
  },

  components: {},

  methods: {
    getAMSFDocument(ledgerId){
      services05Module6.getAsmfDocument(ledgerId).then(res=>{
        this.amsfDocument = res.data
      })
    },

    previewAmsfAdvice(){
      const win = window.open()
      win.document.write('<iframe src="' + this.amsfDocument.amsf_advice.DOC_BLOB  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')  
    },

    previewAmsfOtherDocs(){
      const win = window.open()
      win.document.write('<iframe src="' + this.amsfDocument.other_document.DOC_BLOB  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')  
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, 

    back () {
      this.$router.go(-1)
    }, 

    returned: async function () {
      if (confirm("Are you sure to Return this Submission ?"))
      {
          const data = new FormData();
          data.append("LEDGER_ID", this.AMSFDETAILS.LEDGER_ID);
          data.append("TRANS_STATUS", "7");
          data.append('REMARKS',this.model.remark)
          try {
            const response = await services05Module6.return_amsf(data);
            this.$router.push("/fimm/AMSFCollection-list");
          } catch (error) {
            console.log(error);
        }
      }
    },

    validateEntryForm () {
      return this.$refs.submissionForm.validate()
    },

    acknowledge: async function () {
      if (confirm("Are you sure to Acknowledge this Payment ?"))
      {
        const data = new FormData();
        data.append("LEDGER_ID", this.AMSFDETAILS.LEDGER_ID);
        data.append("DEBIT_AMOUNT", this.AMSFDETAILS.DEBIT_AMOUNT);
        data.append("TRANS_STATUS", "6");
        data.append("REMARKS",this.model.remark)
      try {
        const response = await services05Module6.update_amsf(data);
        this.$router.push("/fimm/AMSFCollection-list");
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
        this.fileRecordsForUpload.splice(i, 1)
        var k = this.fileRecords.indexOf(fileRecord)
        if (k !== -1) this.fileRecords.splice(k, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord) 
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
          )
      })
    },
  },

  data () {
    return {
      amsfDocument:{},
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      AMSFDETAILS: [],
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
