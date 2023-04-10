<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title"> Pre-Payment Exam Waiver Refund Details </h4>
      <br/>
      <br/>
    </div>
    <br/>
    <va-card>
      <!-- details -->
      <div class="ml-3 col-md-12">Payment Details
        <span v-if="!visibleDetails">: <b>{{ PAYMENTDETAILS.DIST_NAME }}</b></span>
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

        <hr/>
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleDetails">
          <table class="table table-striped">
            <tbody>
              <tr>
              <td style="width: 15%"> Submission Date </td>
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
              <td> Total Consultant </td>
              <td>: {{ PAYMENTDETAILS.TOTAL_CONS }}</td>
            </tr>

             <tr>
              <td> Total Amount </td>
              <td>: RM {{ PAYMENTDETAILS.DEBIT_AMOUNT ? PAYMENTDETAILS.DEBIT_AMOUNT : PAYMENTDETAILS.CREDIT_AMOUNT  }}</td>
            </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
      <br/>
    </va-card>

    <br/>
    <va-card>
      <div class="ml-3 col-md-12">
         Consultant Details
        <hr/>
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
    <br>
    <va-card>
      <div v-if="PAYMENTDETAILS.STATUS === 'PENDING'">
        <div class="ml-3 col-md-12">Details
          <hr/>
          <vue-form-generator
            :model="model"
            :schema="submissionSchema"
            :options="formOptions"
            ref="regForm"
          >
          </vue-form-generator>
          <div v-if="PAYMENTDETAILS.STATUS === 'PENDING' "
               class="float-right">
            <button
              @click="rejected"
              type="button"
              class="mr-2 btn btn-danger btn-fill btn-md"
            >
              <i class="fa fa-reply"/> &nbsp; Return
            </button>
            <button
              @click="acknowledge"
              type="button"
              class="ml-2 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-paper-plane"/> &nbsp; Acknowledge
            </button>
          </div>
        </div>
      </div>
    </va-card>
    <br/>
    <br/>
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward"/> &nbsp; Previous
    </button>
    <br/>
  </va-card>
</template>

<script>
  import 'vue-form-generator/dist/vfg.css'
  import * as services05Module6 from '../../../app/module6/services05'
  import * as services06Module0 from '../../../app/module0/services06'
  import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'

  export default {
    created () {
      var data = localStorage.getItem('PrepaymentRefund-ExamWaiver-Details')
      this.PAYMENTDETAILS = JSON.parse(data)
      this.getAllRecord()
    },

    components: { VaCard },

    methods: {
      handleClick (newTab) {
        this.currentTab = newTab
      },

      back () {
        this.$router.push({
          name: 'PrepaymentRefund-ExamWaiver-list',
        })
      },

      rejected: function () {
        const payload = {
          LEDGER_ID: this.PAYMENTDETAILS.LEDGER_ID,
          ACTION: 'REJECTED',
          REMARKS:this.model.remark
        }
        services05Module6.acknowledgeRejectPrepaymentRefundSubmissionForExamWaiver(payload).then(res => {
          this.$router.push({
            name: 'PrepaymentRefund-ExamWaiver-list',
          })
          this.$toast.success('Pre-Payment Exam Waiver Refund Rejected Successfully !!')
        })
      },

      getAllRecord: async function () {
        this.RecordList = await services05Module6.getAllExamWaiverList(this.PAYMENTDETAILS.LEDGER_ID)
        this.RecordCount = this.RecordList.length
      },

      validateEntryForm () {
        return this.$refs.submissionForm.validate()
      },

      acknowledge: function () {
        const payload = {
          LEDGER_ID: this.PAYMENTDETAILS.LEDGER_ID,
          ACTION: 'ACK',
          REMARKS: this.model.remark
        }
        services05Module6.acknowledgeRejectPrepaymentRefundSubmissionForExamWaiver(payload).then(res => {
          this.$router.push({
            name: 'PrepaymentRefund-ExamWaiver-list',
          })
          this.$toast.success('Pre-Payment Exam Waiver Refund Acknowledged Successfully !!')
        })
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
      fields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
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
        return this.RecordList
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
