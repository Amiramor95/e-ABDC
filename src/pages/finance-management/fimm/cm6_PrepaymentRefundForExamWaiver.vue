<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title"> List of Pre-Payment Exam Waiver </h4>
      <br/>
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge
              v-b-toggle.collapse-1
              v-b-tooltip.hover
              title="Advance Search"
              class="mr-1"
              variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>

          </h5>
        </div>
      </div>
    </div>
    <br/>
    <clip-loader :loading="loading"></clip-loader>
    <!-- list table-->
    <va-card class="mt-5 col-12" v-if="!loading">
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

        <template slot="actions" slot-scope="props">
          <h4 class="mt-2">
            <span
                  v-b-tooltip.hover
                  title="View Payment Details"
                  class="badge badge-primary mr-2"
                  @click="editRecord(props.rowData)"
            >
              <i class="fa fa-eye" v-if="props.rowData.SUBMITTED_BY_DIST === 'YES'"></i>
              <i class="fa fa-pencil" v-else></i>
            </span>
          </h4>
        </template>
      </va-data-table>
      <br/>
      <br/>
    </va-card>
  </va-card>
</template>

<script>
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import * as servicesModule6 from '../../../app/module6/services05'
  import VueJsonToCsv from 'vue-json-to-csv'

  const moment = require('moment')

  export default {
    created () {
      this.getdistributordetails()
    },
    components: {
      VueJsonToCsv
    },

    methods: {
      search: debounce(function (term) {
        this.term = term
      }, 400),

      back () {
        this.$router.go(-1)
      },

      handleSuccess(){

      },
      handleError(){

      },

      async getdistributordetails () {
        const user = localStorage.getItem('user')
        this.loading = true
        try {
          const response = await servicesModule6.getdistributordetails(JSON.parse(user).user_id)
          if (response) {
            const submission = await servicesModule6.getPrepaymentRefundSubmission(response.DISTRIBUTOR_ID)
            this.RecordList = submission.data.data
            this.loading = false
            this.model.details.CODE = response.CODE
            this.model.details.CURRENT_BALANCE = response.CURRENT_BALANCE
            this.model.details.AVAILABLE_BALANCE = response.AVAILABLE_BALANCE
            this.model.details.PENDING = response.PENDING
            this.model.details.DIST_NAME = response.DIST_NAME
          }
        } catch (e) {
          this.loading = false
        }
      },

      editRecord (rowData) {
        let param = new Date(rowData.SUBMISSION_DATE).getTime()
        param = moment(param).unix()
        this.$router.push({
          name: 'PrepaymentRefundSubmissionForExamWaiverEdit',
          params: {
            timestamp: rowData.SUBMISSION_DATE,
          },
        })
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
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TOTAL_CONSULTANT',
            title: 'TOTAL CONSULTANT',
            sortField: 'TOTAL_CONSULTANT',
          },
          {
            name: 'TOTAL_AMOUNT',
            title: 'TOTAL AMOUNT (RM)',
            sortField: 'TOTAL_AMOUNT',
          },
          {
            name: 'TS_NAME',
            title: 'STATUS',
            sortField: 'TS_NAME',
          },
          {
            name: '__slot:actions',
            title: 'ACTION',
            dataClass: 'justify-content-center',
            width: '15%',
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
    },

    data () {
      return {
        loading: false,
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
