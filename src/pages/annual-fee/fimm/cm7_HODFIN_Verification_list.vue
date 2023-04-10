<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">LIST OF DISTRIBUTOR</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
                  <!-- <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
                  ><i class="fa fa-search"></i
                  ></b-badge> -->

                  <!-- <downloadExcel
              :json_data="RecordList"
              :excelname="excelname"
              :sheetname="sheetname"
              :column="column"
            ></downloadExcel> -->

          </h5>
        </div>
      </div>
    </div>

    <!-- advanced search form -->
    <!-- <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator
          :model="model"
          :schema="advancedSearchSchema"
          ref="advancedSearchForm"
        >
        </vue-form-generator>
        <br />
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
    </b-collapse> -->

    <br />
    <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="search"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table-extended
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="RecordCount"
        clickable
        @checkboxToggledAllExtended="toggleCheckboxAll"
        @checkboxToggledExtended="toggleCheckbox"
        :track-by="'FUND_SUMMARY_ID'"
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="flag1" slot-scope="props">
          <h1 class="mt-1">
            <span
              v-if="props.rowData.FIN_STATUS == 15 "
              title="Pending"
              class="badge  mr-2"
            >
              <i class="fa fa-flag red-color "></i
            ></span>
            <span
              v-if="props.rowData.FIN_STATUS == 1 "
              title="Draft"
              class="badge  mr-2"
            >
              <i class="fa fa-flag green-color"></i
            ></span>
            <span
              v-if="props.rowData.FIN_STATUS == 38 "
              title="Verified"
              class="badge  mr-2"
            >
              <i class="fa fa-flag blue-color"></i
            ></span>
            <span
              v-if="props.rowData.FIN_STATUS == 8 "
              title="Returned"
              class="badge  mr-2"
            >
              <i class="fa fa-flag orange-color "></i
            ></span>
          </h1>
        </template>
        <template slot="flag2" slot-scope="props">
          <h1 class="mt-1">
            <span
              v-if="props.rowData.HODFIN_STATUS == 15 "
              title="Pending"
              class="badge  mr-2"
            >
              <i class="fa fa-flag red-color "></i
            ></span>

             <span
              v-if="props.rowData.HODFIN_STATUS == 1 "
              title="Draft"
              class="badge  mr-2"
            >
              <i class="fa fa-flag red-color "></i
            ></span>

            <span
              v-if="props.rowData.HODFIN_STATUS == 8 "
              title="Return"
              class="badge  mr-2"
            >
              <i class="fa fa-flag green-color"></i
            ></span>
            <span
              v-if="props.rowData.HODFIN_STATUS == 38"
              title="Verified"
              class="badge  mr-2"
            >
              <i class="fa fa-flag blue-color"></i
            ></span>
            <span
              v-if="props.rowData.HODFIN_STATUS == 9 "
              title="Returned"
              class="badge  mr-2"
            >
              <i class="fa fa-flag orange-color "></i
            ></span>
          </h1>
        </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Details"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
              ></span>
          </h5>
        </template>
      </va-data-table-extended>

      <br />
      <div>
        <table>
          <tr>
    <th>Legend</th>
  </tr>
  <tr>
    <td><i class="fa fa-flag red-color "></i >
    </td>
    <td>PENDING</td>
  </tr>
  <tr>
    <td><i class="fa fa-flag orange-color "></i >
    </td>
    <td>RETURNED</td>
  </tr>
  <tr>
    <td><i class="fa fa-flag green-color "></i >
    </td>
    <td>REVIEWED</td>
  </tr>
  <tr>
    <td><i class="fa fa-flag blue-color "></i >
    </td>
    <td>VERIFIED</td>
  </tr>
        </table>
      </div>
      <br />
      <br />
      <div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
          <div class="float-right">
            <button
              @click="btnAction('save_as_draft')"
              type="button"
              :disabled="!this.FUND_SUMMARY_IDS.length"
              class="ml-2 btn btn-info btn-fill btn-md"
            >
              <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
            </button>

            <button
              @click="btnAction('return')"
              type="button"
              class="ml-2 btn btn-warning btn-fill btn-md"
              :disabled="!this.FUND_SUMMARY_IDS.length"
            >
              <i class="fa fa-reply" /> &nbsp; Return 
            </button>

            <button
              @click="btnAction('complete')"
              type="button"
              class="ml-1 btn btn-success btn-fill btn-md"
              :disabled="!this.FUND_SUMMARY_IDS.length"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Verify
            </button>
          </div>
      </div>
      <br/>
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule7 from '../../../app/module7/services05'

export default {
  created () {
    this.getAllRecord()
  },
  components: {},

  methods: {

    viewRecord(props){
       this.$router.push({
         name:'AnnualFee-HODFIN-Verification-Details',
         params:{
           DIST_ID:props.DISTRIBUTOR_ID
         }
       })
    },

    toggleCheckboxAll(isChecked){
        const fundSummaryIds =  this.RecordList.reduce((acc,element) => {
            return acc.concat(element.FUND_SUMMARY_ID)
        },[])
        
        this.FUND_SUMMARY_IDS = isChecked ? fundSummaryIds : [] 
      },

      toggleCheckbox(payload){
        const {fieldName,isChecked} = payload
      
        if(!isChecked){
           const elIndex = this.FUND_SUMMARY_IDS.findIndex(x => {
             return x === fieldName.FUND_SUMMARY_ID
           })
           if(elIndex > -1){
              this.FUND_SUMMARY_IDS.splice(elIndex,1)
           }
        }else{
          this.FUND_SUMMARY_IDS.push(fieldName.FUND_SUMMARY_ID)
        }
      },

    search: debounce(function (term) {
      this.term = term
    }, 400),

    async filterRecord () {
      try {
        const response = await servicesModule7.filterCancellationRecordList(
          this.model.modelFilter,
        )
        if (response != 'error') {
          this.RecordList = response
        }
      } catch (error) {}
    },

    back () {
      this.$router.go(-1)
    },

    async btnAction(param) {
      let prepareTxt = '';
      if(param === 'save_as_draft'){
        prepareTxt = 'Save as draft'
      }

      if(param === 'return'){
        prepareTxt = 'Return'
      }

      if(param === 'complete'){
        prepareTxt = 'Complete'
      }
      
      if(confirm('Do you want to perform ' + prepareTxt)){
        const data = {
          BTN_MODE : param,
          MODULE_NAME: 'ANNUAL_FEE_VERIFICATION_HOD_FIN',
          FUND_SUMMARY_IDS:this.FUND_SUMMARY_IDS
        }
        const res =  await servicesModule7.postfinVerification(data)
        
        if(res.status === 200){
          this.$toast.success('Annual Fee Verification HOD/FIN successfully updated.')
          this.getAllRecord()
        }
      }
    },
    

    getAllRecord: async function () {
      const response = await servicesModule7.getAnnualFeeHodFinance()
      this.RecordList = response.data.data
      this.RecordCount = this.RecordList.length
      const res2 = await servicesModule7.getAmsfCalculation()
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
          name: "__slot:flag1",
          title: "FINANCE STATUS"
         
        },
        {
          name: "__slot:flag2",
          title: "HOD FINANCE STATUS",
         
        },
        {
          name: 'INVOICE_NUMBER',
          title: 'INVOICE NUMBER',
          sortField: 'INVOICE_NUMBER',
        },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'TOTAL_LEVY_PAYABLE',
          title: 'TOTAL LEVY PAYABLE (RM)',
          sortField: 'TOTAL_LEVY_PAYABLE',
        },
        {
          name: 'TOTAL_LEVY_PAYABLE_UTC',
          title: 'TOTAL UTC LEVY PAYABLE (RM)',
          sortField: 'TOTAL_LEVY_PAYABLE_UTC',
        },
        {
          name: 'TOTAL_PRC_LEVY',
          title: 'TOTAL PRC LEVY PAYABLE (RM)',
          sortField: 'TOTAL_PRC_LEVY',
        },
        {
          name: 'TOTAL_UTC_PRC_LEVY',
          title: 'TOTAL UTC & PRC LEVY PAYABLE (RM)',
          sortField: 'TOTAL_UTC_PRC_LEVY',
        },
        {
          name: 'SPLIT_UTC_LEVY',
          title: 'SPLIT-UTC LEVY (RM)',
          sortField: 'SPLIT_UTC_LEVY',
        },
        {
          name: 'SPLIT_PRC_LEVY',
          title: 'SPLIT-PRC LEVY (RM)',
          sortField: 'SPLIT_PRC_LEVY',
        },
        {
          name: 'UTC_CARD_FEES',
          title: 'UTC CARD FEES (RM)',
          sortField: 'UTC_CARD_FEES',
        },
        {
          name: 'PRC_CARD_FEES',
          title: 'PRC CARD FEES (RM)',
          sortField: 'PRC_CARD_FEES',
        },
        {
          name: 'UTC_PRC_CARD_FEES',
          title: 'UTC & PRC CARD FEES (RM)',
          sortField: 'UTC_PRC_CARD_FEES',
        },
        {
          name: 'PRC_WAIVER',
          title: 'PRC WAIVER (RM)',
          sortField: 'PRC_WAIVER',
        },
        {
          name: 'TOTALAMSF',
          title: 'TOTAL AMSF (RM)',
          sortField: 'TOTALAMSF',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
          dataClass: 'justify-content-center',
          width: '15%',
        },
        {
          name: '__checkbox',
          title: ''
        },
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) => (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false) ||
                   (item.INVOICE_NUMBER ? item.INVOICE_NUMBER.includes(v) : false)
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
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      FUND_SUMMARY_IDS:[],
      model: {
        modelFilter: {
          DIST_NAME: '',
          SUSP_STATUS: '',
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
                label: 'Status',
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


.red-color {
color:#C00000;
}
.blue-color {
color:#4472C4;
}
.green-color {
color:#92D050;
}
.orange-color {
color:#ED7D31;
}
</style>
