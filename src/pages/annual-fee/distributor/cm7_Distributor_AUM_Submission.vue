<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">AUM ENTRY YEAR {{ this.$store.state.amsfYear }}</h4>
      <br/>
    </div>
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


        <template slot="foreign" slot-scope="row">
          <div>
            <b-form-input type="text" v-model="row.rowData.FOREIGN_EXCHANGE_RATE"></b-form-input>
          </div>
        </template>


        <template slot="aum" slot-scope="row">
          <div>
            <b-form-input type="text" v-model="row.rowData.AUM_AMOUNT"></b-form-input>
          </div>
        </template>


        <template slot="actions" slot-scope="row">
          <div id="app">
            <VueFileAgent
              ref="vueFileAgent"
              :uploadHeaders="{}"
              :multiple="false"
              :deletable="true"
              :linkable="true"
              :editable="false"
              :accept="'.pdf'"
              :maxSize="'2MB'"
              :maxFiles="8"
              :helpText="'Select files'"
              :errorText="{type:'Please select images, videos, pdf or zip files',size: 'You selected a larger file!'}"
              :thumbnailSize="120"
              :theme="'list'"
              @beforedelete="onBeforeDelete($event,row.rowData.FUND_PROFILE_ID)"
              @select="filesSelected($event,row.rowData.FUND_PROFILE_ID)"
              @delete="fileDeleted($event)"
              v-model="row.rowData.FILE_RECORD"
            ></VueFileAgent>
          </div>
        </template>

      </va-data-table-extended>
      <br/>
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
          <button type="button" :disabled="BTN_DISABLE_MODE"  @click="saveData('draft')" class="mr-2 btn btn-info btn-fill btn-md">
            <i class="fa fa-pencil-square-o"/> &nbsp; Save as draft
          </button>
          <button
            @click="saveData('complete')"
            type="button"
            :disabled="BTN_DISABLE_MODE"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
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
    data () {
      return {
        fileRecords: [],
        fileRecordsForUpload: [],
        BTN_DISABLE_MODE:true,
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
                  label: 'Fund Group',
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

    created () {
      this.getAllRecord()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },
    components: {},

    methods: {

      viewList () {
        this.$router.push('/distributor/distributor-AUM-Submission-List')
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

      create () {
        this.$router.push('/fimm/distributor-Cancellation-Submission')
      },

      search: debounce(function (term) {
        this.term = term
        console.log(this.term)
      }, 400),

      async filterRecord () {
        try {
          const response = await servicesModule7.filter_submission_record(
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

      async saveData (mode) {
        if (confirm('Are you sure to complete this Aum Entry?')) {
          const payload = {
            btnMode: mode,
            data: JSON.stringify(this.RecordList),
          }
          const res = await servicesModule7.saveAUMDEntryInSaveDraft(payload)
          const rsString = mode === 'draft' ? 'save in draft' : 'Completed'
          if (res.status === 200) {
            this.$toast.success('Aum entry has been successfully ' + rsString)
          } else {
            this.$toast.error('Internal server error')
          }

        }
      },

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
        const response = await servicesModule7.getAumFundEntry()
        const btnStatusResponse = await servicesModule7.getDistributorDetails()
        this.BTN_DISABLE_MODE = btnStatusResponse.data.innderPageBtnDisableMode
        this.RecordList = response.data.data
        this.RecordCount = this.RecordList.length
        this.loading = false;
      },

      async filesSelected (fileRecordsNewlySelected, fmsID) {
        console.log(fileRecordsNewlySelected)
        const index = this.RecordList.findIndex(x => x.FUND_PROFILE_ID === fmsID)
        this.RecordList[index].FILE_RECORD_STORE = await this.getBase64(fileRecordsNewlySelected[0].file)
        setTimeout(() => {
          console.log(this.RecordList)
        }, 1000)
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

      onBeforeDelete: function (fileRecord, fmsID) {
        console.log('file delete')
        const index = this.RecordList.findIndex(x => x.FUND_PROFILE_ID === fmsID)
        this.RecordList[index].FILE_RECORD = ''
        this.RecordList[index].FILE_RECORD_STORE = ''
      },

      fileDeleted: function (fileRecord) {

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
            name: 'GROUP_FUND',
            title: 'FUND GROUP',
            sortField: 'GROUP_FUND',
          },
          {
            name: '__slot:foreign',
            title: 'FOREIGN EXCHANGE RATE',
            // dataClass: "float-right"
          },
          {
            name: '__slot:aum',
            title: 'AUM (RM)',
            // dataClass: "float-right"
          },
          {
            name: '__slot:actions',
            title: 'Choose File',
            // dataClass: "float-right"
          },
        ]
      },

      // eslint-disable-next-line vue/return-in-computed-property
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
                (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v): false) ||
                (item.FUND_NAME ? item.FUND_NAME.toLowerCase().includes(v):false) ||
                (item.FUND_ASEAN_CIS ? item.FUND_ASEAN_CIS.toLowerCase().includes(v):false) ||
                (item.FUND_CATEGORY ? item.FUND_CATEGORY.toLowerCase().includes(v) : false) ||
                (item.GROUP_ASSET ? item.GROUP_ASSET.toLowerCase().includes(v):false) ||
                (item.GROUP_ASSET ? item.GROUP_FUND.toLowerCase().includes(v):false) ||
                (item.TS_PARAM ? item.TS_PARAM.toLowerCase().includes(v):false) ||
                (item.FUND_CODE_FIMM ? item.FUND_CODE_FIMM.includes(v):false) ||
                (item.FUND_MAXIMUM_SALE_CHARGE ? item.FUND_MAXIMUM_SALE_CHARGE.includes(v):false),
            )
        })
      },
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
