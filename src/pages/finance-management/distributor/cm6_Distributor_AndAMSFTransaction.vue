<template>
  <va-card>
    <template slot="header">
      <br/>
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Distributor Registration and AMSF Collection Transaction</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 v-b-tooltip.hover
                       title="Advance Search" class="mr-1" variant="secondary"
              ><i class="fa fa-search"></i
              ></b-badge>
              
              <downloadExcel
                :json_data="EXCEL_DATA_EXPORT"
                :excelname="excelname"
                :sheetname="sheetname"
                :column="column"
              ></downloadExcel>

            </h5>
          </div>
        </div>
      </div>
    </template>
    <!-- advanced search form -->
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator
          :model="model"
          :schema="advancedSearchSchema"
          ref="advancedSearchForm"
        >
        </vue-form-generator>
        <br/>
        <p class="text-danger"> {{ searchError }} </p>
        <button
          @click="filterRecord"
          type="button"
          class="ml-2 btn btn-sm btn-primary"
        >
          Search
        </button>
        <!-- <button
          @click.prevent="reset"
          type="button"
          class="ml-2 btn btn-sm btn-danger"
        >
          Reset
        </button> -->
      </b-card>
    </b-collapse>
    
    <br/>
    <div class="row">
      <div class="flex md3 offset--md9">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend"/>
        </va-input>
      </div>
    </div>
    <va-data-table
      :datacount="ListCount"
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
    </va-data-table>
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
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import VueJsonToCsv from 'vue-json-to-csv'
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import moment from 'moment'
  import * as servicesModule6 from '../../../app/module6/services05'

  Vue.use(VueFormGenerator)
  Vue.use(VueJsonToCsv)

  export default {
    created () {
      this.getAllList()
    },
    components: {
      VueJsonToCsv,
    },

    methods: {
      back () {
        this.$router.push({
          name: 'Transaction-Ledger',
        })
      },

      async getAllList () {
        const user = localStorage.getItem('user')
        this.items = await servicesModule6.distributor_reg_amfs_trans(
          JSON.parse(user).user_id,
        )
        this.ListCount = this.items.length
      },

      search: debounce(function (term) {
        this.term = term
        console.log(this.term)
      }, 400),

      async filterRecord () {
        let dateFrom = this.model.modelFilter.DATE_FROM
        let dateTo = this.model.modelFilter.DATE_TO
        if(dateFrom && dateTo){
          dateFrom = Date.parse(dateFrom)
          dateTo = Date.parse(dateTo)
          if(dateFrom > dateTo){
            this.searchError = 'Date To is greater than date from.' 
            return
          }
        }

        try {
          const response = await servicesModule6.filter_DistRegandAMSFLedger(
            this.model.modelFilter,
          )
          if (response !== 'error') {
            this.items = response
          }
        } catch (error) {
        }
      },

      async reset () {
        try {
          this.model.modelFilter.DIST_NAME = ''
          this.model.modelFilter.REF_NUMBE = ''
          this.model.modelFilter.DATE_FROM =  ''
          this.model.modelFilter.DATE_TO=  ''

          this.getAllList()
          if (response !== 'error') {
            this.items = response
          }
        } catch (error) {
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
          { // DIST_TRANS_DATE
            name: 'DATE_DISPLAY',
            title: 'TRANSACTION DATE',
            sortField: 'DATE_DISPLAY',
          },
          {
            name: 'PAYMENT_REFERENCE',
            title: 'REFERENCE NUMBER',
            sortField: 'PAYMENT_REFERENCE',
          },
          {
            name: 'FINTYPE',
            title: 'TRANSACTION TYPE',
            sortField: 'FINTYPE',
          },
          {
            name: 'STATUS',
            title: 'STATUS',
            sortField: 'STATUS',
          },
          {
            name: 'DEBIT_AMOUNT',
            title: 'DEBIT (RM)',
            sortField: 'DEBIT_AMOUNT',
          },
          {
            name: 'CREDIT_AMOUNT',
            title: 'CREDIT (RM)',
            sortField: 'CREDIT_AMOUNT',
          },
          {
            name: 'BALANCE',
            title: 'PAYMENT BALANCE (RM)',
            sortField: 'BALANCE',
          },
        ]
      },

      filteredData () {
        if (!this.term || this.term.length < 1) {
          return this.items
        }

        const items =  this.items.filter(item => {
          return this.term
            .toLowerCase()
            .split(' ')
            .every(
              (v) =>
                (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v):false) ||
                (item.PAYMENT_REFERENCE ? item.PAYMENT_REFERENCE.includes(v):false) ||
                (item.DIST_TYPE_NAME ? item.DIST_TYPE_NAME.toLowerCase().includes(v):false) ||
                (item.CODE  ? item.CODE.toLowerCase().includes(v):false) ||
                (item.STATUS  ? item.STATUS.toLowerCase().includes(v):false),
            )
        })
        this.ListCount = items.length
        return items;
      },

      EXCEL_DATA_EXPORT(){
         return this.filteredData.map(x => {
            return {
               SUBMISSION_DATE:x.DATE_DISPLAY,
               REFERENCE_NUMBER:x.PAYMENT_REFERENCE,
               TRANSACTION_TYPE:x.FINTYPE,
               STATUS:x.STATUS,
               DEBIT_AMOUNT:x.DEBIT_AMOUNT,
               CREDIT_AMOUNT:x.CREDIT_AMOUNT,
               BALANCE:x.BALANCE
            }
         })
      }
    },
    data () {
      return {
        searchError:'',
        column: [
           'SUBMISSION DATE',
           'REFERENCE NUMBER',
           'TRANSACTION_TYPE',
           'STATUS',
           'DEBIT_AMOUNT',
           'CREDIT_AMOUNT',
           'BALANCE'
        ],
        
        csvdata:[],
        excelname: 'download-DistributorReg&AMSFCollectionList',
        sheetname: 'DistributorReg&AMSFCollection',
        dateFormat: '',
        term: null,
        perPage: '10',
        perPageOptions: ['4', '6', '10', '20'],
        ListCount: null,
        items: [],

        model: {
          modelFilter: {
            DIST_NAME: '',
            REF_NUMBER: '',
            DATE_FROM: '',
            DATE_TO: '',

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
                  model: 'modelFilter.REF_NUMBER',
                  label: 'Reference Number',
                  styleClasses: 'col-md-6',
                },
                {
                  type: 'input',
                  inputType: 'date',
                  model: 'modelFilter.DATE_FROM',
                  label: 'Date From',
                  styleClasses: 'col-md-3',
                  format: 'YYYY-MM-DD',
                },

                {
                  type: 'input',
                  inputType: 'date',
                  model: 'modelFilter.DATE_TO',
                  label: 'Date To',
                  styleClasses: 'col-md-3',
                  format: 'YYYY-MM-DD',
                },
              ],
            },
          ],
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

  .bgcolor {
    background-color: white !important;
  }

  .alignleft {
    display: flex;
    justify-content: flex-end;
  }

  .alignright {
    display: flex;
    justify-content: flex-start;
  }
</style>
