<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Pre-Payment Refund Submission for Exam Waiver</h4>
      <br />
    </div> 
    
    <br/>
    <va-card>
              <div class="ml-3 col-md-12">Distributor Details
                <hr />
                <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td></td>
              </tr>
              <tr>
                <td>Year </td>
                <td></td>
              </tr>
              <tr>
                <td>Current Balance </td>
                <td>RM </td>
              </tr>
            </tbody>
                </table>
              </div>
            </va-card>
    <!-- advanced search form -->
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator
          :model="model"
          :schema="advancedSearchSchema"
          ref="advancedSearchForm"
        >
        </vue-form-generator>
        <br />
        <button
          @click="filterCaRecord"
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

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <div>
        <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="Search Consultant Profile"
              v-on:click="create"
              class="badge badge-success"
            >
              <i class="fa fa-plus"></i
              ></span>
          </h5>
        </div>
      </div>
      </div>
       <div class="row">
        
        <div class="flex md2 offset--md10">
          <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="search"
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </div>
      </div>
      <va-data-table
        :fields="caRecordFields"
        :data="caRecordFilteredData"
        no-data-label="No data found"
        :showPagination="false"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
       
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="Add New Case"
              v-on:click="addRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-plus"></i
              ></span>
            <span
              v-b-tooltip.hover
              title="View Consultant Records"
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
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule1 from '../../../app/module3/services01'

export default {
  mounted () {
    this.getDetails()
  },
  components: {},

  methods: {
    exchange () {
      this.$router.push('/fimm/consultantAlert-overviewList')
    },
    // create
    create () {
      this.$router.push('/fimm/consultantAlert-searchConsultant')
    },
    // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    async filterCaRecord () {
      try {
        const response = await servicesModule3.filterCaRecordList(
          this.model.modelFilter,
        )
        if (response != 'error') {
          this.caRecordList = response
        }
      } catch (error) {}
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    back () {
      this.$router.go(-1)
    }, // back button


    // getAllRecord
    getDetails: async function () {
      const user = localStorage.getItem('user')
      const response = await servicesModule1.getdistributordetails(JSON.parse(user).USER_DIST_ID)
      this.details = response
    },


    async viewRecord(data) {
       localStorage.setItem("consultantAlert-consultantCaRecord",JSON.stringify(data));
       this.$router.push({
        name: "consultantAlert-consultantCaRecord",
      
      });
    },
    async addRecord (data) {
      localStorage.setItem("consultantAlert-registerExistingRecord",JSON.stringify(data));
      this.$router.push({
        name: 'consultantAlert-registerExistingRecord',
        
      })
    },

    async reset () {
      this.model.modelFilter = ''
      this.getAllCaRecord()
    },
  },

  computed: {
    caRecordFields () {
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
          name: 'CONSULTANT_FIMM_NO1',
          title: 'LICENCE TYPE',
          sortField: 'CONSULTANT_FIMM_NO1',
        },
        {
          name: 'CONSULTANT_FIMM_NO1',
          title: 'EXAM TYPE',
          sortField: 'CONSULTANT_FIMM_NO1',
        },
        {
          name: 'TOTAL_COUNT1',
          title: 'AMOUNT (RM)',
          sortField: 'TOTAL_COUNT1',
        },

        // {
        //   name: '__slot:actions',
        //   title: 'ACTIONS',
        //   dataClass: 'justify-content-center',
        //   width: '8%',
        // },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    caRecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NRIC.includes(v) ||
              item.CONSULTANT_FIMM_NO.toLowerCase().includes(v) ||
              item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v),
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
      classificationList: [],
      caRecordList: [],
      count: 1,
      caRecordCount: null,

      model: {
        modelFilter: {
          CONSULTANT_FIMM_NO: '',
          CONSULTANT_NAME: '',
          CONSULTANT_NRIC: '',
          CONSULTANT_PASSPORT_NO: '',
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
                model: 'modelFilter.CONSULTANT_FIMM_NO',
                label: 'FIMM Number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.CONSULTANT_NAME',
                label: 'Consultant Name',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.CONSULTANT_NRIC',
                label: 'NRIC Number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.CONSULTANT_PASSPORT_NO',
                label: 'Passport Number',
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
<style lang="scss">
.va-data-table__vuetable th.sortable {
    color: #34495e !important;
}

.va-table th, .content table th {
    text-transform: uppercase;
    color: #34495e !important;
    border-bottom: 2px solid #34495e;
}
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
