<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">TOTAL GROSS SALES AS AT 31 DECEMBER {{ this.$store.state.amsfYear -1 }} </h4>
      <br/>
    </div>
    

    <br/>
    <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="search"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend"/>
      </va-input>
    </div>

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table-extended
        :fields="RecordFields"
        :data="RecordFilteredData"
        :datacount="RecordCount"
        no-data-label="No data found"
        clickable
        @checkboxToggledAllExtended="toggleCheckboxAll"
        @checkboxToggledExtended="toggleCheckbox"
        :track-by="'TGS_ENTRY_ID'"
        :loading="loading"
      >

        <template slot="actions" slot-scope="props">
          <va-checkbox
            @change="checkBox"
            class="col-2"
            v-model="props.rowData.selected"
          />
        </template>


        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

      </va-data-table-extended>

      <br/>
      <vue-form-generator
        :model="model"
        :schema="returnSchema"
        :options="formOptions"
        ref="regForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
      <br/>
      <br/>
      <div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward"/> &nbsp; Previous
        </button>
        <div class="float-right">
          <button @click="submittgs('draft')"  :disabled="BTN_DISABLE_MODE" type="button" class="mr-2 btn btn-info btn-fill btn-md">
            <i class="fa fa-pencil-square-o"/> &nbsp; Save as draft
          </button>
          <button @click="submittgs('return')" :disabled="!tgsEntryIds.length || BTN_DISABLE_MODE" type="button" class="mr-2 btn btn-warning btn-fill btn-md">
            <i class="fa fa-reply"/> &nbsp; Return
          </button>
          <button
            @click="submittgs('complete')" :disabled="((tgsEntryIds.length !== RecordList.length) || BTN_DISABLE_MODE)"
            type="button" class="ml-1 btn btn-success btn-fill btn-md">
            <i class="fa fa-paper-plane"/> &nbsp; Complete
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
      this.getTgsComment()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },

    components: {},

    methods: {
      toggleCheckboxAll(isChecked){
        const tgsEntryId =  this.RecordList.reduce((acc,element) => {
            return acc.concat(element.TGS_ENTRY_ID)
        },[])
        
        this.tgsEntryIds = isChecked ? tgsEntryId : []
      },

      toggleCheckbox(payload){
        const {fieldName,isChecked} = payload
        const fmsId = fieldName.TGS_ENTRY_ID

        if(!isChecked){
           const elIndex = this.tgsEntryIds.findIndex(x => {
             return x === fieldName.TGS_ENTRY_ID
           })
           if(elIndex > -1){
              this.tgsEntryIds.splice(elIndex,1)
           }
        }else{
          this.tgsEntryIds.push(fieldName.TGS_ENTRY_ID)
        }
      },

      viewList () {
        this.$router.push('/fimm/AnnualFee-FundSubmission-list')
      },

      create () {
        this.$router.push('/fimm/distributor-Cancellation-Submission')
      },

      onModelUpdated(){

      },

      search: debounce(function (term) {
        this.term = term
        console.log(this.term)
      }, 400),

      

      async reset () {
        this.model.modelFilter = ''
        this.getAllRecord()
      },

      back () {
        this.$router.push('/distributor/DistributorCompliance-Submission')
      },

      submittgs: async function (mode) {
        if (confirm('Are you sure to complete this Total Gross Sales Submission?')) {
          const data = new FormData()
          data.append('btnMode', mode)
          data.append('TGS_SUB_TYPE', 'DIST_COMP')
          data.append('REMARK', this.model.remark)
          try {
            const response = await servicesModule7.submitSaveDraftForDistributorManagerTGSEntry(data)
            if (response.status === 200) {
              this.$toast.success('TGS submission successfully completed')
            }
          } catch (error) {
            console.log(error)
          }
        }
      },

      getAllRecord: async function () {
        this.loading = true;
        const response = await servicesModule7.getTGSEntryForDistributorManager()
        const response1 = await servicesModule7.getDistributorDetails('FUND_VALUE_APPROVAL_DIST_COMP_OFFICER')
        this.BTN_DISABLE_MODE = response1.data.innderPageBtnDisableMode
        this.RecordList = response.data.data
        this.RecordCount = this.RecordList.length
        this.loading = false;
      },

      async getTgsComment(){
        const res = await servicesModule7.getTgsComment();
        this.model.remark =  res.data.comment ?  res.data.comment.TGS_REMARKS_COMPLIANCE  : ''
      }

    },

    computed: {
      RecordFields () {
        return [

          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'FUND_CODE_FIMM',
            title: 'FIMM FUND CODE',
            sortField: 'FUND_CODE_FIMM',
          },
          {
            name: 'FUND_NAME',
            title: 'FUND NAME',
            sortField: 'FUND_NAME',
          },
          {
            name: 'FUND_ASEAN_CIS',
            title: 'CIS STRUCTURE',
            sortField: 'FUND_ASEAN_CIS',
          },
          {
            name: 'GROUP_ASSET',
            title: 'ASSET CLASS',
            sortField: 'GROUP_ASSET',
          },
          {
            name: 'FUND_CATEGORY',
            title: 'FUND CATEGORY',
            sortField: 'FUND_CATEGORY',
          },
          {
            name: 'FOREIGN_EXCHANGE_RATE',
            title: 'FOREIGN EXCHANGE RATE',
            sortField: 'FOREIGN_EXCHANGE_RATE',
          },
          {
            name: 'TGS_AMOUNT',
            title: 'TOTAL GROSS SALES (RM)',
            sortField: 'TGS_AMOUNT',
          },
          {
            name: '__checkbox',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
          },
        ]
      },

      RecordFilteredData () {
        if (!this.term || this.term.length < 1) {
          return this.RecordList
        }
        return this.RecordList.filter(item => {
          return this.term
            .toLowerCase()
            .split(' ')
            .every(
              (v) =>
                (item.STATUS_DISPLAY ? item.STATUS_DISPLAY.toLowerCase().includes(v) : false) ||
                (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false) ||
                (item.FUND_NAME ? item.FUND_NAME.toLowerCase().includes(v) : false) ||
                (item.FUND_ASEAN_CIS ? item.FUND_ASEAN_CIS.toLowerCase().includes(v) : false) ||
                (item.FUND_CATEGORY ? item.FUND_CATEGORY.toLowerCase().includes(v) : false) ||
                (item.GROUP_ASSET ? item.GROUP_ASSET.toLowerCase().includes(v):false) ||
                (item.GROUP_FUND ? item.GROUP_FUND.toLowerCase().includes(v):false) ||
                (item.TS_PARAM ? item.TS_PARAM.toLowerCase().includes(v):false) ||
                (item.FUND_CODE_FIMM ? item.FUND_CODE_FIMM.includes(v):false) ||
                (item.FUND_MAXIMUM_SALE_CHARGE ? item.FUND_MAXIMUM_SALE_CHARGE.includes(v):false),
            )
        })
      },
    },

    data () {
      return {
        tgsEntryIds:[],
        BTN_DISABLE_MODE:true,
        column: [
          'STATUS',
          'DISTRIBUTOR NAME',
          'FIMM FUND CODE',
          'FUND NAME',
          'CIS STRUCTURE',
          'MAXIMUM SALES CHARGES',
          'FUND CATEGORY',
          'ASSET CLASS',
          'FUND GROUP',
          'FUND STATUS',
          'FUND DATE',
          'SUBMISSION DATE',
        ],
        excelname: 'Annual Fee Fund Submission',
        sheetname: 'Fund Submission',
        header: '',
        field: [],
        term: null,
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        RecordList: [],
        count: 1,
        RecordCount: null,

        model: {
          remark:'',
          modelFilter: {
            DIST_NAME: '',
            FUND_CODE_FIMM: '',
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
                  label: 'Fund Name',
                  styleClasses: 'col-md-6',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.FUND_CODE_FIMM',
                  label: 'FIMM Fund Code',
                  styleClasses: 'col-md-6',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.FUND_CODE_FIMM',
                  label: 'CIS Structure',
                  styleClasses: 'col-md-4',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.FUND_CODE_FIMM',
                  label: 'Asset Class',
                  styleClasses: 'col-md-4',
                },
                {
                  type: 'input',
                  inputType: 'text',
                  model: 'modelFilter.FUND_CODE_FIMM',
                  label: 'Fund Category',
                  styleClasses: 'col-md-4',
                },
              ],
            },
          ],
        },

        returnSchema: {
          fields: [
            {
              type: 'textArea',
              model: 'remark',
              label: 'Remark/Comment',
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
