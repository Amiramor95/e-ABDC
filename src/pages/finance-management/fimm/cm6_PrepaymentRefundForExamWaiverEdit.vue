<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title"> Pre-Payment Refund Submission For Exam Waiver </h4>
      <br/>
    </div>
    <br/>
    <clip-loader :loading="loading"></clip-loader>
    <div class="wrapper" v-if="!loading">
      <va-card>
        <div class="ml-3 col-md-12">
          <button
            v-if="visibleProfile"
            v-b-toggle.collapse-3
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
          <button
            v-if="!visibleProfile"
            v-b-toggle.collapse-3
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye"></i>
          </button>

          <hr/>
          <b-collapse id="collapse-3" class="mt-2" v-model="visibleProfile">
            <table class="table table-striped">
              <tbody>
              <tr>
                <td style="width: 15%"> Distributor Name</td>
                <td>: {{ model.details.DIST_NAME }}</td>
              </tr>
              <tr>
                <td style="width: 15%"> Years</td>
                <td>: 2020</td>
              </tr>
              <tr>
                <td> Current Balance</td>
                <td>: RM {{ model.details.AVAILABLE_BALANCE}}</td>
              </tr>
              </tbody>
            </table>
          </b-collapse>
        </div>
      </va-card>
      <va-card class="mt-5 col-12">
        <va-data-table
          :fields="RecordFields"
          :data="RecordFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :datacount="RecordCount"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
        </va-data-table>

        <br/>

        <div class="row-tm">
          <div class="amount-section">
            <label> PRE PAYMENT REFUND FOR EXAM WAIVER: </label>
            <input v-if="isSubmitBtnShow" type="number" class="form-control" v-model="totalRefundAmount" disabled/>
            <span v-else> &nbsp; RM {{ parseFloat(totalRefundAmount) }}  </span>
          </div>
        </div>
        <br>
        <br>
        <div class="row-tm">
          <button
            @click="back"
            type="button"
            class="btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-step-backward"/> &nbsp; Previous
          </button>
          <div class="submit-btn" v-if="isSubmitBtnShow">
            <button
              @click="submitPrepaymentRefundSubmission"
              type="button"
              class="btn btn-primary btn-fill btn-md"
              :disabled="submitDisabled || !totalRefundAmount"
            >
              <i class="fa fa-paper-plane"/> &nbsp; Submit
            </button>
          </div>
        </div>

        <br/>
      </va-card>
    </div>
  </va-card>
</template>

<script>
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import * as servicesModule6 from '../../../app/module6/services05'

  export default {
    created () {
      this.getdistributordetails()
    },
    components: {},

    methods: {
      search: debounce(function (term) {
        this.term = term
      }, 400),

      back () {
        this.$router.go(-1)
      },

      async getdistributordetails () {
        const user = localStorage.getItem('user')
        try {
          const timestamp = this.$route.params.timestamp
          const response = await servicesModule6.getdistributordetails(JSON.parse(user).user_id)
          const submissionDetail = await servicesModule6.getPrepaymentRefundSubmissionDetails(response.DISTRIBUTOR_ID, timestamp)
          if (response) {
            this.RecordList = submissionDetail.data.data
            this.RecordCount = submissionDetail.data.data.length
            this.loading = false

            this.model.details.CODE = response.CODE
            this.model.details.DIST_ID = response.DISTRIBUTOR_ID
            this.model.details.CURRENT_BALANCE = response.CURRENT_BALANCE
            this.model.details.AVAILABLE_BALANCE = response.AVAILABLE_BALANCE
            this.model.details.PENDING = response.PENDING
            this.model.details.DIST_NAME = response.DIST_NAME
          }
        } catch (e) {
          this.loading = false
        }
      },

      submitPrepaymentRefundSubmission () {
        this.submitDisabled = true
        const user = localStorage.getItem('user')
        const payload = {
          TOTAL_AMOUNT: parseFloat(this.totalRefundAmount),
          CONSULTANTS: this.RecordList,
          DISTRIBUTOR_DETAIL: this.model.details,
          TOTAL_CONSULTANTS: this.RecordList.length,
          USER_ID: JSON.parse(user).user_id,
        }
        servicesModule6.saveRefundSubmissionExamWaiver(payload).then(res => {
          console.log(res)
          this.submitDisabled = false
        })
        this.$router.push({
          'name': 'PrepaymentRefund-ExamWaiver-list',
        })
        this.$toast.success('Prepayment refund submission for exam waiver submitted')
      },

      async reset () {
        this.model.modelFilter = ''
        this.getAllRecord()
      },

    },

    computed: {
      RecordFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'NAME',
            title: 'NAME',
          },
          {
            name: 'NRICNO',
            title: 'NRIC No',
            sortField: 'NRICNO',
          },
          {
            name: 'PASSPORT_NO',
            title: 'PASSPORT NO',
            sortField: 'PASSPORT_NO',
          },
          {
            name: 'LICENSE_TYPE',
            title: 'LICENSE TYPE',
            sortField: 'LICENSE_TYPE',
          },
          {
            name: 'EXAM_TYPE',
            title: 'EXAM TYPE',
            sortField: 'EXAM_TYPE',
          },
          {
            name: 'AMOUNT',
            title: 'AMOUNT (RM)',
            sortField: 'AMOUNT',
          },
        ]
      },

      // eslint-disable-next-line vue/return-in-computed-property
      RecordFilteredData () {
        if (!this.term || this.term.length < 1) {
          return this.RecordList
        }
        return this.RecordList
      },
      totalRefundAmount () {
        return this.RecordList.map(x => x.AMOUNT).reduce((pre, nex) => pre + nex, 0)
      },
      isSubmitBtnShow() {
        return this.RecordList.every(x => x.IS_SUBMITTED_BY_DIST === 'NO');
      }
    },

    data () {
      return {
        submitDisabled: false,
        loading: true,
        header: '',
        field: [],
        term: null,
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        RecordList: [],
        count: 1,
        RecordCount: null,
        visibleProfile: true,

        model: {
          totalAmount: 123,
          details: {
            CODE: '',
            CURRENT_BALANCE: '',
            AVAILABLE_BALANCE: '',
            PENDING: '',
            DIST_NAME: '',
            DIST_ID: '',
          },
        },

        advancedSearchSchema: {
          groups: [
            {
              styleClasses: 'row',
              fields: [
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.DIST_NAME',
                  label: 'Distributor Name',
                  styleClasses: 'col-md-6',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.CONSULTANT_NAME',
                  label: 'Reference Number',
                  styleClasses: 'col-md-6',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.CONSULTANT_NAME',
                  label: 'Date',
                  styleClasses: 'col-md-6',
                },
              ],
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
<style lang="css">
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

  .row-tm {
    display: flex;
    justify-content: space-between;
  }

  .amount-section {
    display: flex;
  }
</style>
