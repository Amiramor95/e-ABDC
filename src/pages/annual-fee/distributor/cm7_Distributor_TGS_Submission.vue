<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">TOTAL GROSS SALES ENTRY YEAR {{ this.$store.state.amsfYear }} </h4>
      <br/>
    </div>
    <!-- advanced search form -->
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
        <template slot="flag" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              v-if="props.rowData.STATUS_DISPLAY != '' "
              title="Status"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-flag"></i
              ></span>
          </h5>
        </template>
        <template slot="foreign" slot-scope="props">
          <div>
            <b-form-input v-model="props.rowData.FOREIGN_EXCHANGE_RATE" type="text"></b-form-input>
          </div>
        </template>
        <template slot="aum" slot-scope="row">
          <div>
            <b-form-input type="text" v-model="row.rowData.TGS_AMOUNT"></b-form-input>
          </div>
        </template>
      </va-data-table-extended>

      <br/>

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">PDF File :</h5></b>
        </div>
        <div id="app" class="col-md-9">
          <VueFileAgent
            ref="vueFileAgent"
            :theme="'list'"
            :multiple="false"
            :deletable="true"
            :meta="true"
            :linkable="true"
            :accept="'.pdf,.xls,.xlsx'"
            :maxSize="'10MB'"
            :helpText="'Choose document'"
            :errorText="{
            type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
            size: 'Files should not exceed 10MB in size',
          }"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>
        </div>
      </div>
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
          <button type="button" :disabled="BTN_DISABLE_MODE && RecordCount" @click="submitData('draft')" class="mr-2 btn btn-info btn-fill btn-md">
            <i class="fa fa-pencil-square-o"/> &nbsp; Save as draft
          </button>
          <button
            type="button" :disabled="BTN_DISABLE_MODE && RecordCount" @click="submitData('complete')" class="ml-1 btn btn-success btn-fill btn-md">
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
  import * as services06Module0 from '../../../app/module0/services06'

  export default {
    created () {
      this.getAllRecord()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },
    components: {},

    methods: {
      viewList () {
        this.$router.push('/distributor/distributor-TGS-Submission-List')
      },

      async filesSelected (fileRecordsNewlySelected) {
        this.base64File = await this.getBase64(fileRecordsNewlySelected[0].file)
      },

      getBase64 (file) {
        var reader = new FileReader()
        return new Promise((res, rej) => {
          reader.addEventListener('load', function () {
            res(reader.result)
          }, false)
          if (file) {
            reader.readAsDataURL(file)
          }
        })

      },

      async submitData (mode) {
        if (confirm('Are you sure to complete this Aum Entry?')) {
          const data = {
            data: JSON.stringify(this.RecordList),
            btnMode: mode,
            file:this.base64File
          }
          const res = await servicesModule7.saveAndDraftTotalGrossSales(data)
          const rsString = mode === 'draft' ? 'save in draft' : 'Completed'
          if (res.status === 200) {
            this.$toast.success('TGS entry has been successfully ' + rsString)
          } else {
            this.$toast.error('Internal server error')
          }
        }
      },

      checkBox () {
        if (document.getElementById('checkboxId_' + id).checked) {
          this.checkboxArray.push(screenId)
        } else {
          const indexToRemove = this.checkboxArray.indexOf(screenId)
          if (indexToRemove > -1) {
            this.checkboxArray.splice(indexToRemove, 1)
          }
        }
      },

      // create
      create () {
        this.$router.push('/fimm/distributor-Cancellation-Submission')
      },
      // search
      search: debounce(function (term) {
        this.term = term
      }, 400),

      
      async filterRecord () {
        try {
          const response = await servicesModule7.getTGSFundList(
            this.model.modelFilter,
          )
          if (response != 'error') {
            this.RecordList = response
            this.RecordCount = this.RecordList.length
          }
        } catch (error) {
        }
      },

      async reset () {
        this.model.modelFilter = ''
        this.getAllRecord()
      },

     
      back () {
        this.$router.push('/distributor/distributor-Submission')
      },

      onBeforeDelete(){
        this.fileRecords = '';
      },

      // retun button
      returnFund: async function () {
        const data = new FormData()
        data.append('TRANS_STATUS', '4')
        try {
          const response = await servicesModule7.returnFund(data)
          this.$router.go()
        } catch (error) {
          console.log(error)
        }
      },

      // verify button

      VerifyFund: async function () {
        const data = new FormData()
        data.append('TRANS_STATUS', '4')
        try {
          const response = await servicesModule7.update_submission(data)
          this.$router.go()
        } catch (error) {
          console.log(error)
        }
      },

      getAllRecord: async function () {
        this.loading = true
        const response = await servicesModule7.getTGSFundList()
        this.RecordList = response.data.data
        this.RecordCount = this.RecordList.length
        const btnStatusResponse = await servicesModule7.getDistributorDetails()
        this.BTN_DISABLE_MODE = btnStatusResponse.data.innderPageBtnDisableMode
        this.loading = false
        if(response.data.tgs_document){
          this.fileRecords = {
            'name' : response.data.tgs_document.DOC_ORIGINAL_NAME,
            'type' : "application/pdf",
            'ext' : '.pdf',
            'size': Math.random() * 10394 
          }
        }
        
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
            name: '__slot:foreign',
            title: 'FOREIGN EXCHANGE RATE',
          },
          {
            name: '__slot:aum',
            title: 'Total Gross Sales (RM)',
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
                (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v):false) ||
                (item.FUND_NAME ? item.FUND_NAME.toLowerCase().includes(v):false) ||
                (item.FUND_ASEAN_CIS ? item.FUND_ASEAN_CIS.toLowerCase().includes(v):false) ||
                (item.FUND_CATEGORY ? item.FUND_CATEGORY.toLowerCase().includes(v):false) ||
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
        fileRecords:'',
        base64File:'',
        BTN_DISABLE_MODE:false,
        loading:false,
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
          modelFilter: {
            FUND_NAME: '',
            FUND_CODE_FIMM: '',
            CIS_STRUCTURE: '',
            ASSET_CLASS: '',
            FUND_CATEGORY: '',
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
