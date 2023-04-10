<template>
  <va-card>
    <template slot="header">
      <br/>
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Pre-Payment Top Up For Distributor</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge
                v-b-toggle.collapse-1
                v-b-tooltip.hover
                title="Distributor prepayment topup"
                class="mr-1"
                variant="primary"
                @click="goToPrepaymentTopupSubmission"
              ><i class="fa fa-plus"></i
              ></b-badge>
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
        <button
          @click="filterRecord"
          type="button"
          class="ml-2 btn btn-sm btn-primary"
        >
          Search
        </button>
        <button
          @click.prevent="reset"
          type="button"
          class="ml-2 btn btn-sm btn-danger"
        >
          Reset
        </button>
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
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
      <template slot="actions" slot-scope="props">
        
        
        <h4 class="mt-2" v-if="props.rowData.TRANS_STATUS != 7">
          <span
            v-b-tooltip.hover
            title="View Payment Details"
            v-on:click="viewRecord(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-eye"></i
            ></span>
        </h4>

        <h4 class="mt-2" v-else>
          <span
            v-b-tooltip.hover
            title="Edit pre payment topup"
            v-on:click="editPrepaymentTopup(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-pencil"></i
            ></span>
        </h4>
        
      </template>
    </va-data-table>
    <br/>
    <br/>
    <br/>
    <br/>
  </va-card>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import moment from 'moment'
  import * as servicesModule6 from '../../../app/module6/services05'
  import VueJsonToCsv from 'vue-json-to-csv'

  Vue.use(VueFormGenerator)
  Vue.use(VueJsonToCsv)

  export default {
    mounted () {
      setTimeout(() => {
        const el = document.getElementById('_DATE_DISPLAY')
        el.style.cursor = 'pointer'
        el.addEventListener('click', this.sortBySubmissionDate)
      }, 10)
    },

    created () {
      this.getAllList()
    },

    components: {
      VueJsonToCsv,
    },

    methods: {
      sortBySubmissionDate (event) {
        const this_ = this
        this.perPage = 10
        if (this_.dateSortParam === 'asc') {
          this_.items.sort((oldObj, newObj) => {
            return new Date(newObj.DATE_DISPLAY) - new Date(oldObj.DATE_DISPLAY)
          })
          this_.dateSortParam = 'desc'
        } else {
          this_.items.sort((oldObj, newObj) => {
            return new Date(oldObj.DATE_DISPLAY) - new Date(newObj.DATE_DISPLAY)
          })
          this_.dateSortParam = 'asc'
        }
      },
      clear () {
        this.dateFormat = null
        this.term = null
      },

      goToPrepaymentTopupSubmission () {
        this.$router.push({
          name: 'distributor-prepayment-topup',
        })
      },

      editPrepaymentTopup(data){
        localStorage.setItem('PrepaymentTopup-Details', JSON.stringify(data))
        this.$router.push({
          name: 'distributor-prepayment-topup-edit',
        })
      },

      async getAllList () {
        const user = localStorage.getItem('user')
        console.log(user)
        const response = await servicesModule6.prepayment_topup_distributor(
          JSON.parse(user).USER_DIST_ID
        )
        this.items = response.data.data
        this.ListCount = this.items.length
      },
      search: debounce(function (term) {
        this.term = term
      }, 400),

      async viewRecord (data) {
        localStorage.setItem('PrepaymentTopup-Details', JSON.stringify(data))
        this.$router.push({
          name: 'distributor-prepayment-topup-detail',
        })
      },

      async filterRecord () {
        try {
          const response = await servicesModule6.filter_topup_record(
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
          this.model.modelFilter.REF_NUMBER = ''
          this.model.modelFilter.DATE_FROM = ''
          this.model.modelFilter.DATE_TO = ''
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
          {
            name: 'DATE_DISPLAY',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TRANSACTION_NUMBER',
            title: 'TRANSACTION_NUMBER',
          },
          {
            name: 'TYPE',
            title: 'PAYMENT METHOD',
            sortField: 'TYPE',
          },
          {
            name: 'PAYMENT_REFERENCE',
            title: 'REFERENCE NUMBER',
            sortField: 'PAYMENT_REFERENCE',
          },
          {
            name: 'CODE',
            title: 'CODE',
            sortField: 'CODE',
          },
          {
            name: 'CREDIT_AMOUNT',
            title: 'AMOUNT (RM)',
            sortField: 'CREDIT_AMOUNT',
          },
          {
            name: 'BALANCE',
            title: 'BALANCE (RM)',
            sortField: 'BALANCE',
          },
          {
            name: 'STATUS',
            title: 'STATUS',
            sortField: 'STATUS',
          },
          {
            name: '__slot:actions',
            title: 'ACTION',
            dataClass: 'justify-content-center',
            width: '15%',
          },
        ]
      },

      filteredData () {
        if (!this.term || this.term.length < 1) {
          return this.items
        }
        const v = this.term.trim().toLowerCase()
        const items =  this.items.filter(item => {
          return (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false) ||
            (item.PAYMENT_REFERENCE ? item.PAYMENT_REFERENCE.includes(v) : false) ||
            (item.DIST_TYPE_NAME ? item.DIST_TYPE_NAME.toLowerCase().includes(v) : false) ||
            (item.CODE ? item.CODE.toLowerCase().includes(v) : false) ||
            (item.STATUS ? item.STATUS.toLowerCase().includes(v) : false)
        })
        this.ListCount = items.length
        return items;
      },
    },
    data () {
      return {
        dateSortParam: 'asc',
        column: [
          'SUBMISSION DATE',
          'DISTRIBUTOR NAME',
          'DISTRIBUTOR TYPE',
          'PAYMENT METHOD',
          'REFERENCE NUMBER',
          'CODE',
          'AMOUNT (RM)',
          'STATUS',
        ],
        excelname: 'download-PrePaymentTopupList',
        sheetname: 'PrepaymentTopup',
        dateFormat: '',
        term: null,
        perPage: 10,
        perPageOptions: [4, 6, 10, 20],
        ListCount: null,
        items: [],
        Excell: [],
        csv: [],

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
