<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Pre Payment Transactions</h4>
      <br />
    </div>

    <va-card>
      <div class="ml-3 col-md-12">
          Code : {{ model.details.CODE }}
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>

        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-3" class="mt-2" v-model="visibleProfile">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%">Available Balance</td>
                <td>RM {{model.details.AVAILABLE_BALANCE}}</td>
              </tr>
              <tr>
                <td>Pending Amount </td>
                <td>RM {{model.details.PENDING }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>

    <!-- list table-->
  
    <va-card class="mt-5 col-12">
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
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="RecordCount"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Transaction Details"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
              ></span>
          </h5>
        </template>
      </va-data-table>

      <br />
      <br />
      <br />

      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <br/>
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule6 from '../../../app/module6/services05'

export default {
  mounted () {
    this.getdistributordetails()
    this.getAllRecord()
  },
  components: {

  },

  methods: {

    setting () {
      this.$router.push('/fimm/finance-account-setting')
    },
    
    search: debounce(function (term) {
      this.term = term
    }, 400),


    back () {
      this.$router.go(-1)
    },

    
    async getdistributordetails () {
      const user = localStorage.getItem('user')
      const response = await servicesModule6.getdistributordetails(
        JSON.parse(user).user_id)
      if (response == null) {
        this.updateDistributor = false
      } else {
        this.model.details.CODE = response.CODE
        this.model.details.AVAILABLE_BALANCE = response.AVAILABLE_BALANCE
        this.model.details.PENDING = response.PENDING_BALANCE
      }
    },

   
    getAllRecord: async function () {
      const user = localStorage.getItem('user')
      const response = await servicesModule6.getAllDistributorledgerList(
        JSON.parse(user).user_id)
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },

    async viewRecord (data) {
      /* localStorage.setItem('Registration-Payment-Details', JSON.stringify(data))
      this.$router.push({
        name: 'Registration-Payment-Details',
      }) */
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
        { // DIST_TRANS_DATE
          name: 'DATE_DISPLAY',
          title: 'TRANSACTION DATE',
          sortField: 'DATE_DISPLAY',
        },
        // {
        //   name: 'DIST_TYPE_NAME',
        //   title: 'GROUP TRANSACTION NUMBER',
        //   sortField: 'DIST_TYPE_NAME',
        // },
        {
          name: 'CODE',
          title: 'CODE',
          sortField: 'CODE',
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
          title: 'BALANCE (RM)',
          sortField: 'BALANCE',
        },
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      const items =  this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) =>
                (item.PAYMENT_REFERENCE ? item.PAYMENT_REFERENCE.includes(v):false) ||
                (item.CODE ? item.CODE.toLowerCase().includes(v):false) ||
                (item.STATUS ? item.STATUS.toLowerCase().includes(v):false) || 
                (item.FINTYPE ? item.FINTYPE.toLowerCase().includes(v):false) || 
                (item.CODE ? item.CODE.toLowerCase().includes(v):false) 
            )
      })
      this.RecordCount = items.length;
      return items.length
    },
  },

  data () {
    return {
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

        details: {
          CODE: '',
          CURRENT_BALANCE: '',
          AVAILABLE_BALANCE: '',
          PENDING: '',
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
</style>
