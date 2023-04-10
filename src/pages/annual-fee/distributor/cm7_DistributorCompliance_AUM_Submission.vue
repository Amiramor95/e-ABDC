<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">AUM AS AT 31 DECEMBER {{ this.$store.state.amsfYear -1 }}</h4>
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
        :track-by="'AUM_ENTRY_ID'"
        :loading="loading"
      >

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

        <template slot="action" slot-scope="row">
          <button type="button" @click="remarksModal(row.rowData)" :class="row.rowData.AUM_REMARKS_COMPLIANCE || FILL_IDS.includes(row.rowData.AUM_ENTRY_ID) ?
                   'btn-fill btn-md btn-success' : 'btn-fill btn-md btn-primary'">
            <i class="fa fa-edit"></i>
          </button>
        </template>

       
        <template slot="document" slot-scope="props">
          <router-link
            class="text-color"
            :to="'#'">
            <span v-if="props.rowData.DOCUMENT_NAME" @click="previewAumDocs(props.rowData)">
            {{ $t(props.rowData.DOCUMENT_NAME) }}.pdf </span>
          </router-link>
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
          <button @click="submitaum('draft')" :disabled="BTN_DISABLE_MODE" type="button" class="mr-2 btn btn-info btn-fill btn-md">
            <i class="fa fa-pencil-square-o"/> &nbsp; Save as draft
          </button>
          <button @click="submitaum('return')" :disabled="!aumEntryIds.length || BTN_DISABLE_MODE" type="button" class="mr-2 btn btn-warning btn-fill btn-md">
            <i class="fa fa-reply"/> &nbsp; Return
          </button>
          <button
            @click="submitaum('complete')" :disabled="((aumEntryIds.length !== RecordList.length) || BTN_DISABLE_MODE)"
            type="button" class="ml-1 btn btn-success btn-fill btn-md">
            <i class="fa fa-paper-plane"/> &nbsp; Complete
          </button>
        </div>
      </div>
      <br/>
    </va-card>

    <vudal name="remarkModal" :close-by-esc="false">
      <div class="header">
        <i class="close icon"></i>
        Remarks / Comments
      </div>
      <div class="content">
        <textarea v-model="remark" class="form-control" :style="{height:'180px'}"> </textarea>
        <span> 1000 Characters </span>
      </div>
      <div class="actions">
        <button class="btn btn-danger" :disabled="!remark" @click="cancelModal"> Cancel</button> &nbsp;
        <button class="btn btn-success" @click="saveRemarkModalComment">Submit</button>
      </div>
    </vudal>

  </va-card>
</template>

<script>
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import * as servicesModule7 from '../../../app/module7/services05'
  import Vudal from 'vudal'

  export default {
    data () {
      return {
        aumEntryIds:[],
        loading:false,
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
        FILL_IDS: [],
        REMARK_SELECTED_ROWID: '',
        remark: '',

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
    components: { Vudal },

    methods: {
      toggleCheckboxAll(isChecked){
        const aumEntryId =  this.RecordList.reduce((acc,element) => {
            return acc.concat(element.AUM_ENTRY_ID)
        },[])
        
        this.aumEntryIds = isChecked ? aumEntryId : []
      },

      toggleCheckbox(payload){
        const {fieldName,isChecked} = payload
        const fmsId = fieldName.AUM_ENTRY_ID

        if(!isChecked){
           const elIndex = this.aumEntryIds.findIndex(x => {
             return x === fieldName.AUM_ENTRY_ID
           })
           if(elIndex > -1){
              this.aumEntryIds.splice(elIndex,1)
           }
        }else{
          this.aumEntryIds.push(fieldName.AUM_ENTRY_ID)
        }
      },

      previewAumDocs(rowData){
        const base64Docs = rowData.DOC_BLOB;
        const win = window.open()
        win.document.write('<iframe src="' + base64Docs  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
      },

      viewList () {
        this.$router.push('/fimm/AnnualFee-FundSubmission-list')
      },

      remarksModal (row) {
        this.$modals.remarkModal.$show()
        this.REMARK_SELECTED_ROWID = row.AUM_ENTRY_ID
        this.remark = row.AUM_REMARKS_COMPLIANCE
      },

      saveRemarkModalComment () {
        const requestPayload = {
          AUM_ENTRY_ID: this.REMARK_SELECTED_ROWID,
          REMARK: this.remark,
          REMARK_TYPE: 'COMP_OFFICER',
        }
        servicesModule7.postRemarksForDistributorAumEntry(requestPayload).then(res => {
          if (res.status) {
            this.$toast.success('Remark successfully save.')
            this.$modals.remarkModal.$hide()
            this.remark = null
            this.FILL_IDS.push(this.REMARK_SELECTED_ROWID)
          }
        })
        const index = this.RecordList.findIndex(x => x.AUM_ENTRY_ID === this.REMARK_SELECTED_ROWID);
        this.RecordList[index].AUM_REMARKS_COMPLIANCE = this.remark
      },

      cancelModal () {
        this.$modals.remarkModal.$hide()
      },

      create () {
        this.$router.push('/fimm/distributor-Cancellation-Submission')
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

      submitaum: async function (mode) {
        if (confirm('Are you sure to ' + mode.toUpperCase() + ' this Aum Submission?')) {
          const formData = new FormData()
          formData.append('btnMode', mode)
          formData.append('AUM_SUB_TYPE', 'DIST_COMP')
          try {
            const response = await servicesModule7.manager_aum_update(formData)
            if (response.status === 200) {
              this.$toast.success('Aum entry successfully submitted')
            }
          } catch (error) {
            console.log(error)
          }
        }
      },

      getAllRecord: async function () {
        const response = await servicesModule7.getAumEntryForDistManager()
        const response1 = await servicesModule7.getDistributorDetails('FUND_VALUE_APPROVAL_DIST_COMP_OFFICER')
        this.BTN_DISABLE_MODE = response1.data.innderPageBtnDisableMode
        this.RecordList = response.data.data
        this.RecordCount = this.RecordList.length
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
            name: 'FOREIGN_EXCHANGE_RATE',
            title: 'FOREIGN EXCHANGE RATE',
            sortField: 'FOREIGN_EXCHANGE_RATE',
          },
          {
            name: 'AUM_AMOUNT',
            title: 'AUM (RM)',
            sortField: 'AUM_AMOUNT',
          },
          {
            name: '__slot:document',
            title: 'DOCUMENT',
            sortField: 'DOCUMENT_NAME',
          },
          {
            name: '__slot:action',
            title: 'REMARKS',
            // dataClass: "float-right"
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
                (item.GROUP_ASSET ? item.GROUP_ASSET.toLowerCase().includes(v) :false) ||
                (item.GROUP_FUND ? item.GROUP_FUND.toLowerCase().includes(v) : false) ||
                (item.TS_PARAM ? item.TS_PARAM.toLowerCase().includes(v) : false) ||
                (item.FUND_CODE_FIMM ? item.FUND_CODE_FIMM.includes(v) : false) ||
                (item.FUND_MAXIMUM_SALE_CHARGE ? item.FUND_MAXIMUM_SALE_CHARGE.includes(v) : false),
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
