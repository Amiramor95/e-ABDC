/* eslint-disable no-unused-expressions */
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h4 slot="header" class="card-title">Fund Creation</h4>
            <br>
            <vue-form-generator
              v-if="newFund == false"
              :model="model"
              :schema="schemaFundList"
              :options="formOptions"
              @model-updated="onModelUpdated"
              ref="dropdownformFundList"
            >
            </vue-form-generator>
            <vue-form-generator
              v-if="newFund == true"
              :model="model"
              :schema="schemaUmbrellaFund"
              :options="formOptions"
              @model-updated="onModelUpdated"
              ref="dropdownformUmbrellaFund"
            >
            </vue-form-generator>
            <div>

              <br />
              <b-tabs v-if="(newFund == true && model.selectedUmbrellaFund != null && model.selectedFund != null)||(newFund == false && model.mgmtCompany != null && model.selectedUmbrellaFund != null && model.selectedFund != null)" content-class="mt-3" v-on:activate-tab="tabActivated" ref="tabs" v-model="tabModal">
                <b-tab title="Fund Profile" active>
                  <vue-form-generator
                    :model="model"
                    :schema="schemaNewFund"
                    :options="formOptions"
                    @model-updated="onModelUpdated"
                    ref="profileFundForm"
                  >
                  </vue-form-generator>
                  <button
                    v-if="((newFund == true && model.selectedUmbrellaFund != null && model.selectedFund != null)||(newFund == false && model.mgmtCompany != null && model.selectedUmbrellaFund != null && model.selectedFund != null)) && tabIndex == 0"
                    type="submit"
                    class="ml-2 btn btn-primary btn-fill float-right btn-md"
                    @click="$refs.tabs.nextTab()"
                  >
                    Next &nbsp;<i class="fa fa-step-forward" />
                  </button>
                </b-tab>
                <b-tab title="Document">
                  <div style="overflow-x:auto;">
                    <table class="table">
                      <thead>
                        <slot name="columns">
                          <tr>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                        <br/>
                        <vue-form-generator
                          :model="model"
                          :schema="fileUploadSchema"
                          :options="formOptions"
                          ref="fileUploadForm"
                        >
                        </vue-form-generator>
                      </tbody>
                    </table>
                  </div>
                  <br/>
                  <div class="float-right">
                    <button
                    @click="saveAsDraft"
                    type="button"
                    class="mr-2 btn btn-info btn-fill btn-md">
                    <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary btn-fill float-right btn-md"
                      @click.prevent="submit"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Submit
                    </button>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.icon-flex,
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-wrapper {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid blue;
  font-size: 2rem;
  width: 80px;
  height: 80px;
}
.icon-wrapper i {
  color: blue;
}

.icon-wrapperConsultant {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-wrapperConsultant {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid green;
  font-size: 2rem;
  width: 80px;
  height: 80px;
}
.icon-wrapperConsultant i {
  color: green;
}

.icon-wrapperBoth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-wrapperBoth {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #6600ff;
  font-size: 2rem;
  width: 80px;
  height: 80px;
}
.icon-wrapperBoth i {
  color: #6600ff;
}
</style>

<script>
// import Vue from "vue";
import moment from 'moment'
import { debounce } from 'lodash'
import * as servicesModule0main from '../../../app/module0/services'
// import * as servicesModule0_second from '../../../app/module0/acap'
import * as servicesModule0second from '../../../app/module0/services02'
import * as servicesModule0sixth from '../../../app/module0/services06'
import * as servicesModule5 from '../../../app/module5/services03'

export default {
  props: {

  },
  components () {
    Vudal,
    HorizontalScroll
  },
  mounted () {
    this.getAllUmbrellafundLists()
    this.getAllFundCategoryList()
    this.getAllSchemeList()
    this.getAllFundNotesList()
    this.getAllFundDomicileList()

    this.getAllFundTypeList()
    this.getDistributorType()

    this.getAllCountryList()
    this.getAllCurrencyFormat()
  },
  methods: {
    getAllUmbrellafundLists: async function () {
      const response = await servicesModule0second.getAllUmbrellafundLists();
      this.umbrellaList = response
      console.log(this.umbrellaList)
    },
    getAllFundCategoryList: async function () {
      const response = await servicesModule0second.getAllFundGroupList()
      this.FundCategoryList = response
      console.log(this.FundCategoryList)
    },
    // getAllCountryList: async function () {
    //   const response = await servicesModule0second.getAllCountryList()
    //   this.FundCountryList = response
    //   console.log(this.FundCountryList)
    // },
    getAllSchemeList: async function () {
      const response = await servicesModule0second.getAllSchemeList()
      this.FundSchemeList = response
      console.log(this.FundSchemeList)
    },
    getAllCurrencyFormat: async function () {
      const response = await servicesModule0sixth.getAllCurrencyFormat();
      this.getAllCurrencyFormat = response;
      console.log(this.getAllCurrencyFormat);
    },
    getAllFundTypeList: async function () {
      const response = await servicesModule0second.getAllFundTypeList()
      this.FundTypeList = response
      console.log(this.FundTypeList)
    },
    getAllFundDomicileList: async function () {
      const response = await servicesModule0second.getAllFundDomicileList()
      this.FundDomicileList = response
      console.log(this.FundDomicileList)
    },
    getAllFundNotesList: async function () {
      const response = await servicesModule0second.getAllFundNotesList()
      this.FundNoteList = response
      console.log(this.FundNoteList)
    },
    getDistributorType: async function () {
      const response = await servicesModule0main.getDistributorType()
      this.DistributorType = response
      console.log(this.DistributorType)
    },
    // tabActivated (newTabIndex, oldTabIndex, event) {
    //   console.log(newTabIndex)
    //   if (this.$refs.profileFundForm.validate()) {
    //     this.tabIndex = newTabIndex
    //     console.log('validate')
    //   } else {
    //     event.preventDefault()
    //     console.log('non validate')
    //   }
    // },
    async enforceAPI () {
      data.append(
        'FUND_DATE_EXPIRY',
        moment(this.model.FUND_DATE_EXPIRY).format('YYYY-MM-DD'),
      )
    },

    nextTab () {
      this.tabModal = this.tabs.findIndex(tab => tab === this.$route.hash)
    },
    previous () {
      this.disabledNext = false
      this.filterConsultant = null
      this.filter = null
      if (this.nextValue > 1) {
        this.nextValue--
      }
      if (this.nextValue == 1) {
        this.disabledPrev = true
      }
    },
    next (value) {
      if (value != undefined) {
        this.tabIndex = 0
        this.selectedFund = value
      }

      this.disabledPrev = false
      this.filterConsultant = null
      this.filter = null
      if (this.nextValue < 3) {
        this.nextValue++
      }
      if (this.nextValue == 3) {
        this.disabledNext = true
      }
    },
    validateDivestmentForm () {
      // return this.$refs.schemaDivestmentForm.validate()
    },
    saveAsDraft: async function () {
      console.log('Start Save As Draft');
      const data = new FormData();
      const user = localstorage.getItem("user");
      console.log(JSON.stringify(this.user))
        data.append('DIST_ID', JSON.parse(user).user_id)
        data.append('DIST_USER_ID', JSON.parse(user).USER_DIST_ID)
        data.append('DIST_USER_GROUP', JSON.parse(user).USER_GROUP_ID)
        data.append('FUND_CODE_FIMM', this.model.FUND_CODE_FIMM)
        data.append('FUND_CODE_MEMBER', this.model.FUND_CODE_MEMBER)
        // data.append('FUND_DATE_EXPIRY', this.model.FUND_DATE_EXPIRY.formattedValue)
        data.append('FUND_NAME_CHINESE', this.model.FUND_NAME_CHINESE)
        data.append('FUND_NAME_SHORT', this.model.FUND_NAME_SHORT)
        // data.append('FUND_TYPE', this.model.FUND_TYPE)
        // data.append('FUND_CATEGORY', this.model.FUND_CATEGORY)
        // data.append('FUND_DOMICILE', this.model.FUND_DOMICILE)
        // data.append('FUND_CURR_DENOMINATION', this.model.FUND_CURR_DENOMINATION)
        data.append('FUND_SUB_MANAGER', this.model.FUND_SUB_MANAGER)
        data.append('FUND_SYARIAH_COMP', this.model.FUND_SYARIAH_COMP)
        // data.append('FUND_ANNUAL_MGMT', this.model.FUND_ANNUAL_MGMT)
        // data.append('FUND_FUND_PERFORMANCE', this.model.FUND_FUND_PERFORMANCE)
        data.append('FUND_STATUS_EPF', this.model.FUND_STATUS_EPF)
        data.append('FUND_DAILY_NAV', this.model.FUND_DAILY_NAV)
        data.append('FUND_STATUS_FUND', this.model.FUND_STATUS_FUND)
        data.append('FUND_NAME', this.model.FUND_NAME)
        // data.append('FUND_FEE_ANNUAL', this.model.FUND_FEE_ANNUAL)
        data.append('FUND_FEE_PERFORMANCE', this.model.FUND_FEE_PERFORMANCE)
        data.append('FUND_RATIO', this.model.FUND_RATIO)
        // data.append('FUND_DATE_LAUNCH', this.model.FUND_DATE_LAUNCH)
        // data.append('FUND_YEAR_END', this.model.FUND_YEAR_END)
        // data.append('FUND_SCHEME', this.model.FUND_SCHEME)
        //  data.append('FUND_FOCUS', this.model.FUND_FOCUS)
        data.append('FUND_WHOLESALE', this.model.FUND_WHOLESALE)
        data.append('FUND_FEEDER', this.model.FUND_FEEDER)
        data.append('FUND_HURDLE', this.model.FUND_HURDLE)
        data.append('FUND_PRICE_PERUNIT', this.model.FUND_PRICE_PERUNIT)
        data.append('FUND_SALES_CHARGE', this.model.FUND_SALES_CHARGE)
        try{
          // const response = await servicesModule5.FundProfileDraft(data);
          console.log(response)
          this.$router.push('/distributor/fundCreationlist')
        } catch (error) {
          console.log(error);
        }
    },
    submit: async function () {
      console.log('Start function submit')
      console.log(JSON.stringify(this.profileFundForm))
      if (this.$refs.profileFundForm.validate()) {
        const data = new FormData()
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        data.append('DIST_ID', JSON.parse(user).user_id);
        data.append('DIST_USER_ID', JSON.parse(user).USER_DIST_ID);
        data.append('DIST_USER_GROUP', JSON.parse(user).USER_GROUP_ID);
        data.append('FUND_CODE_FIMM', this.model.FUND_CODE_FIMM);
        data.append('FUND_CODE_MEMBER', this.model.FUND_CODE_MEMBER);
        data.append('FUND_DATE_EXPIRY', this.model.FUND_DATE_EXPIRY.formattedValue)
        data.append('FUND_NAME_CHINESE', this.model.FUND_NAME_CHINESE);
        data.append('FUND_NAME_SHORT', this.model.FUND_NAME_SHORT);
        data.append('FUND_TYPE', this.model.FUND_TYPE)
        data.append('FUND_CATEGORY', this.model.FUND_CATEGORY)
        data.append('FUND_DOMICILE', this.model.FUND_DOMICILE)
        data.append('FUND_CURR_DENOMINATION', this.model.FUND_CURR_DENOMINATION)
        data.append('FUND_SUB_MANAGER', this.model.FUND_SUB_MANAGER);
        data.append('FUND_SYARIAH_COMP', this.model.FUND_SYARIAH_COMP);
        data.append('FUND_ANNUAL_MGMT', this.model.FUND_ANNUAL_MGMT);
        data.append('FUND_FUND_PERFORMANCE', this.model.FUND_FUND_PERFORMANCE);
        data.append('FUND_STATUS_EPF', this.model.FUND_STATUS_EPF);
        data.append('FUND_DAILY_NAV', this.model.FUND_DAILY_NAV);
        data.append('FUND_STATUS_FUND', this.model.FUND_STATUS_FUND);
        data.append('FUND_NAME', this.model.FUND_NAME);
        data.append('FUND_FEE_ANNUAL', this.model.FUND_FEE_ANNUAL);
        data.append('FUND_FEE_PERFORMANCE', this.model.FUND_FEE_PERFORMANCE);
        data.append('FUND_RATIO', this.model.FUND_RATIO);
        data.append('FUND_DATE_LAUNCH', this.model.FUND_DATE_LAUNCH);
        data.append('FUND_YEAR_END', this.model.FUND_YEAR_END);
        data.append('FUND_SCHEME', this.model.FUND_SCHEME);
        data.append('FUND_FOCUS', this.model.FUND_FOCUS);
        data.append('FUND_WHOLESALE', this.model.FUND_WHOLESALE);
        data.append('FUND_FEEDER', this.model.FUND_FEEDER);
        data.append('FUND_HURDLE', this.model.FUND_HURDLE);
        data.append('FUND_PRICE_PERUNIT', this.model.FUND_PRICE_PERUNIT);
        data.append('FUND_SALES_CHARGE', this.model.FUND_SALES_CHARGE);
        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
          //notification
        data.append("NOTI_LOCATION", "consultantAlert-hodLraRecordList");
        var code = "";
        if (this.CONSULTANT.CONSULTANT_NRIC != null) {
          code = this.CONSULTANT.CONSULTANT_NRIC;
        }else if (this.CONSULTANT.CONSULTANT_PASSPORT_NO != null) {
          code = this.CONSULTANT.CONSULTANT_PASSPORT_NO;
        }
        var remarkEntry = "New entry pending Approval";

        data.append("NOTI_REMARK", remarkEntry);

        var notiTitle ="New entry pending Approval";
        data.append("NOTI_TITLE", notiTitle);

        try {
          const response = await servicesModule5.createFundProfile(data)
          console.log(response)
          this.$router.push('/distributor/fundCreationlist')
        } catch (error) {
          console.log(error)
        }
      }
    },
    onModelUpdated (newVal, schema) {
      console.log(schema)
      if (schema == 'mgmtCompany') {
        console.log(newVal)
        this.model.selectedUmbrellaFund = null
        this.model.selectedFund = true
        if (newVal != null) {
          this.showumbrellaFund = true
          this.showFundList = false
        } else {
          this.showumbrellaFund = false
          this.showFundList = false
        }
      } else if (schema == 'selectedUmbrellaFund') {
        this.model.selectedFund = true
        if (newVal != 0) {
          this.showFundList = true
        } else {
          this.showFundList = false
        }
      } else if (schema == 'FUND_STATUS_MER') {
        if (newVal == 1)
        {
          this.visibleMer = true
        }else{
          this.visibleMer = false
        }
      }else if (schema == 'FUND_STATUS_EPF') {
        if (newVal == 1)
        {
          this.showEPF = true
        }else{
          this.showEPF = false
        }
      }else if (schema == 'FUND_STATUS_HURDLE_RATE') {
        if (newVal == 1)
        {
          this.showHurdleRate = true
        }else{
          this.showHurdleRate = false
        }
      }else if (schema == 'FUND_STATUS_SALE_CHARGE'){
        if (newVal == 1)
        {
          this.showSalesCharge = true
        }else{
          this.showSalesCharge = false
        }
      }else if (schema == 'FUND_STATUS_FEE_PERFORMANCE'){
        if (newVal == 1)
        {
          this.showPerformanceFee = true
        }else{
          this.showPerformanceFee = false
        }
      }else if (schema == 'FUND_STATUS_RATIO'){
        if (newVal == 1)
        {
          this.showRatio = true
        }else{
          this.showRatio = false
        }
      }else if (schema == 'FUND_STATUS_SRI_ESG'){
        if (newVal == 1)
        {
          this.showSRIESG = true
        }else{
          this.showSRIESG = false
        }
      }else if (schema == 'FUND_ASEAN_CIS_STATUS'){
        if (newVal == 1)
        {
          this.showAseanCIS = true
        }else{
          this.showAseanCIS = false
        }
      }

    },
  },
  onModelUpdated (newVal, schema){
    console.log(newVal)
      if (schema == 'registrationType') {
        if (newVal == '1') {
          this.visibleIc = false
        } else {
          this.visibleIc = true
        }
      } else if (schema == 'applicationType') {
        this.model.applicationType = newVal
        if (newVal == '2') {
          this.visibleCatExemption = true
        } else {
          this.visibleCatExemption = false
        }
      }

  },
  data () {
    return {
      newFund: true,
      // existingFund:false,

      showumbrellaFund: false,
      showFundList: false,
      showFundMER: false,
      showEPF: false,
      showSRIESG:false,
      showPerformanceFee: false,
      showRatio: false,
      showHurdleRate: false,
      showSalesCharge: false,
      tabIndex: 0,
      tabModal: 0,
      FUND_DATE_EXPIRY: null,
      FUND_DATE_LAUNCH: null,
      FUND_YEAR_END: null,
      FundTypeList: [],
      FundCategoryList: [],
      FundDomicileList: [],
      getAllCurrencyFormat: [],
      FundSchemeList: [],
      FundNoteList: [],

      documentIdArray: [],
      uploadFileOject: [],
      companyLogo: '',
      model: {
        data: '',
        file: [],
      },
      PerformanceFee: [{
        name: '1%',
      },
      {
        name: '2%',
      },
      {
        name: '3%',
      },
      {
        name: '4%',
      },
      {
        name: '5%',
      },
      {
        name: '6%',
      },
      {
        name: '7%',
      },
      {
        name: '8%',
      },
      {
        name: '9%',
      },
      {
        name: '10%',
      }],
      fee: [{
        name: '1%',
      },
      {
        name: '2%',
      },
      {
        name: '3%',
      },
      {
        name: '4%',
      },
      {
        name: '5%',
      },
      {
        name: '6%',
      },
      {
        name: '7%',
      },
      {
        name: '8%',
      },
      {
        name: '9%',
      },
      {
        name: '10%',
      }],

      photoUploadList: [
        {
          id: '1',
          fileName: "Copy of approval letter from the SC/Fund Lodgement Summary from the SC's LOLA Online Submission System for new fund",
          type: 'file',
          filePath: '',
          selected: false,
        },
        {
          id: '2',
          fileName: 'Two sets pf Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document',
          type: 'file',
          filePath: '',
          selected: false,
        },
        {
          id: '3',
          fileName: 'Key Data section of the Prospectus/Information Memorendum/Product Highlight Sheet/Disclosure Document duly registered with the SC',
          type: 'file',
          filePath: '',
          selected: false,
        },
        {
          id: '4',
          fileName: 'For funds approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representive',
          type: 'file',
          filePath: '',
          selected: false,
        },
      ],
      FUND_SYARIAH_COMP: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      anualMgmtStatus: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_FUND_PERFORMANCE: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_STATUS_EPF: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_STATUS_MER:[
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '0',
          name: 'No'
        }
      ],
      FUND_STATUS_SALE_CHARGE:[
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '0',
          name: 'No'
        }
      ],
      FUND_STATUS_HURDLE_RATE:[
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '0',
          name: 'No'
        }
      ],
      FUND_STATUS_RATIO:[
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '0',
          name: 'No'
        }
      ],
      FUND_STATUS_SRI_ESG:[
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '0',
          name: 'No'
        }
      ],
      FUND_STATUS_PERFORMANCE_FEE: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_DAILY_NAV: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_FEEDER: [
        {
          value: '1',
          name: 'Yes',
        },
        {
          value: '2',
          name: 'No',
        },
      ],
      FUND_ASEAN_CIS_STATUS: [
        {
          value: '1', name: 'Yes'
        },
        {
          value: '2', name: 'No'
        }
      ],
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'FUND_NAME', label: 'Fund Name' },
        { key: 'actions', label: '' },
      ],
      umbrellaList: [],
      fundList: [],
      fundDomicite: [],
      fundCategory: [
        {
          name: 'Alternatives',
          id: '1',
        },
      ],
      schemaStructure: [ ],
      unitStructure: [
        {
          name:'CLOSE-END',
          id:'0',
        },
        {
          name:'OPEN-END',
          id:'1',
        },
        {
          name:'ETF',
          id:'2',
        },
      ],
      investmentFocus: [
        {
          name:'Local Focused',
          id:'0',
        },
        {
          name:'Foreign Focused',
          id:'1',
        },

      ],
      model: {
        mgmtCompany: null,
        selectedFund: null,
        selectedUmbrellaFund: null,
        FUND_CODE_FIMM: 1001,
        FUND_CODE_MEMBER: '',
        FUND_DATE_EXPIRY: null,
        FUND_NAME_CHINESE: '',
        FUND_NAME_SHORT: '',
        FUND_TYPE: '',
        FUND_CATEGORY: '',
        FUND_DOMICILE: '',
        FUND_CURR_DENOMINATION: '',
        FUND_SUB_MANAGER: '',
        FUND_SYARIAH_COMP: '',
        FUND_ANNUAL_MGMT: '',
        FUND_FUND_PERFORMANCE: '',
        FUND_STATUS_EPF: '',
        FUND_STATUS_MER: '',
        FUND_DAILY_NAV: '',
        FUND_STATUS_FUND: 'New',
        FUND_NAME: '',
        FUND_FEE_ANNUAL: '',
        FUND_FEE_PERFORMANCE: '',
        FUND_RATIO: '',
        FUND_DATE_LAUNCH: null,
        FUND_YEAR_END: null,
        FUND_SCHEME: '',
        FUND_FOCUS: '',
        FUND_WHOLESALE: '',
        FUND_FEEDER: '',
        FUND_HURDLE: '',
        FUND_PRICE_PERUNIT: '',
        FUND_SALES_CHARGE: '',
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                id: '1',
                labels: 'New Fund Notification Letter to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '2',
                labels: 'New Fund Application Form to FIMM',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '3',
                labels: 'Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '4',
                labels: 'Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
              {
                id: '5',
                labels: 'For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative',
                accept: '.pdf,.xlsx,.xls',
                multiple: false,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file-edit',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      schemaUmbrellaFund: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'selectedUmbrellaFund',
                label: 'Umbrella Fund',
                placeholder: 'Select Umbrella Fund',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'FMS_UMBRELLA_FUND_ID',
                  label: 'UMBRELLA_FUND_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.umbrellaList
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Fund Name',
                model: 'FUND_NAME',
                placeholder: 'Enter fund name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      schemaFundList: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'mgmtCompany',
                label: 'Management Company',
                placeholder: 'Select Management Company',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.mgmtComp
                },
                //     visible: (model, field, form) => {
                //       return this.newFund
                // }
              },
              {
                type: 'vueMultiSelect',
                model: 'selectedUmbrellaFund',
                label: 'Umbrella Fund',
                placeholder: 'Select Umbrella Fund',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.umbrellaList
                },
                visible: (model, field, form) => {
                  return this.showumbrellaFund
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'selectedFund',
                label: 'Select Fund',
                placeholder: 'Select Fund',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.fundList
                },
                visible: (model, field, form) => {
                  return this.showFundList
                },
              },
            ],
          },
        ],
      },

      schemaNewFund: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'FiMM Fund Code',
                model: 'FUND_CODE_FIMM',
                disabled: true,
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Member Fund Code',
                model: 'FUND_CODE_MEMBER',
                placeholder: 'Enter member fund code',
                disabled: false,
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'SC Fund Code',
                model: 'SC_CODE_MEMBER',
                placeholder: 'Enter SC fund code',
                disabled: false,
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Lipper Fund Code',
                model: 'LIPPER_CODE_MEMBER',
                placeholder: 'Enter lipper fund code',
                disabled: false,
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'ISIN',
                model: 'ISIN',
                placeholder: 'Enter ISIN',
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Fund Short Name',
                model: 'FUND_NAME_SHORT',
                placeholder: 'Enter fund short name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Fund Chinese Name (Traditional)',
                model: 'FUND_NAME_CHINESE',
                placeholder: 'Enter fund chinese name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_TYPE',
                label: 'FiMM Fund Type',
                placeholder: 'Select FiMM fund type',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'FMS_FUNDTYPE_ID',
                  label: 'FUND_NAME',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundTypeList
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_CATEGORY',
                label: 'FiMM Fund Category',
                placeholder: 'Select FiMM fund type',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'FMS_FUNDCATEGORY_ID',
                  label: 'GROUP_ASSET',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundCategoryList
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_DOMICILE',
                label: 'Fund Domicile',
                placeholder: 'Select domicile',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-3',
                selectOptions: {
                  multiple: false,
                  key: 'FUND_DOMICILE_ID',
                  label: 'FUND_DOMICILE_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.FundDomicileList
                },
              },
              {
                labels: 'Fund Expiry Date',
                type: 'vfg-functional-date',
                placeholder: 'Expiry Date',
                model: 'FUND_DATE_EXPIRY',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-3',
                required: true,
              },
              // {
              //   labels: 'Name Change Effective Date',
              //   type: 'vfg-functional-date',
              //   placeholder: 'Date',
              //   model: 'FUND_DATE_NAME_CHANGE_EFFECTIVE',
              //   noLabel: true,
              //   noClearButton: true,
              //   format: 'dd-MM-yyyy',
              //   styleClasses: 'col-md-4',
              //   required: true,
              // },
              {
                type: 'radios',
                label: 'SRI/ESG Status',
                model: 'FUND_STATUS_SRI_ESG',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-2 display-inline',
                values: () => {
                  return this.FUND_STATUS_SRI_ESG
                },
              },
              {
                labels: 'SRI/ESG Effective Date',
                type: 'vfg-functional-date',
                placeholder: 'Date',
                model: 'FUND_DATE_SRI_ESG_EFFECTIVE_DATE',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-4',
                required: true,
                visible: (model, field, form) => {
                  return this.showSRIESG
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_CURR_DENOMINATION',
                label: 'FiMM Currency Denomination',
                placeholder: 'Select FiMM currency denomination',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_PARAM',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.getAllCurrencyFormat
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Sub Manager Name',
                model: 'FUND_SUB_MANAGER',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'radios',
                label: 'Syariah Compliant',
                model: 'FUND_SYARIAH_COMP',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-2 display-inline',
                values: () => {
                  return this.FUND_SYARIAH_COMP
                },
              },
              {
                type: 'radios',
                label: 'Annual Management Status',
                model: 'FUND_ANNUAL_MGMT',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-3 display-inline',
                values: () => {
                  return this.anualMgmtStatus
                },
              },
              {
                type: 'radios',
                label: 'Declaration of Fund Performance',
                model: 'FUND_FUND_PERFORMANCE',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-3 display-inline',
                values: () => {
                  return this.FUND_FUND_PERFORMANCE
                },
              },
              {
                type: 'radios',
                label: 'EPF Status',
                model: 'FUND_STATUS_EPF',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_EPF
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Fund EPF Code',
                model: 'FUND_EPF_CODE',
                placeholder: 'Enter EPF code',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                visible: (model, field, form) => {
                  return this.showEPF
                },
              },
              {
                type: 'radios',
                label: 'Disclosure of Daily NAV in the newspaper',
                model: 'FUND_DAILY_NAV',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
                values: () => {
                  return this.FUND_DAILY_NAV
                },
              },
              {
                type: 'radios',
                label: 'MER Status',
                model: 'FUND_STATUS_MER',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_MER
                },

              },
              {
                type: 'input',
                inputType: 'text',
                label: 'MER',
                model: 'FUND_MER',
                placeholder: 'Enter MER',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                visible: (model, field, form) => {
                  return this.visibleMer
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Fund Status',
                model: 'FUND_STATUS_FUND',
                disabled: true,
                styleClasses: 'col',
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_FEE_ANNUAL',
                label: 'Annual Management Fee',
                placeholder: 'Select annual management fee',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.fee
                },
              },
              {
                type: 'radios',
                label: 'Performance Fee Status',
                model: 'FUND_STATUS_FEE_PERFORMANCE',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_PERFORMANCE_FEE
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_FEE_PERFORMANCE',
                label: 'Performance Fee',
                placeholder: 'Select performance fee',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.PerformanceFee
                },
                visible: (model, field, form) => {
                  return this.showPerformanceFee
                },
              },
              {
                type: 'radios',
                label: 'Ratio Status',
                model: 'FUND_STATUS_RATIO',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_RATIO
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Ratio',
                model: 'FUND_RATIO',
                placeholder: 'e.g 20:80 with UTMC portion comes first',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.showRatio
                },
              },
              {
                type: 'radios',
                label: 'Hurdle Rate Status',
                model: 'FUND_STATUS_HURDLE_RATE',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_EPF
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Hurdle Rate',
                model: 'FUND_HURDLE',
                placeholder: 'e.g x.xx%',
                required: true,
                validator: 'string',
                styleClasses: 'col',
                visible: (model, field, form) => {
                  return this.showHurdleRate
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Launch Price per unit',
                model: 'FUND_PRICE_PERUNIT',
                placeholder: 'e.g x.xxxx',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                labels: 'Launch Date',
                type: 'vfg-functional-date',
                placeholder: 'Launch Date',
                model: 'FUND_DATE_LAUNCH',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col',
                required: true,
              },
              // {
              //   labels: 'Maturity/Fund Closure Date',
              //   type: 'vfg-functional-date',
              //   placeholder: 'Maturity/Fund Closure Date',
              //   model: 'FUND_DATE_MATURITY_FUND_CLOSURE',
              //   noLabel: true,
              //   noClearButton: true,
              //   format: 'dd-MM-yyyy',
              //   styleClasses: 'col',
              //   required: true,
              // },
              // {
              //   labels: 'Suspension Date',
              //   type: 'vfg-functional-date',
              //   placeholder: 'Suspension Date',
              //   model: 'FUND_DATE_SUSPENSION',
              //   noLabel: true,
              //   noClearButton: true,
              //   format: 'dd-MM-yyyy',
              //   styleClasses: 'col',
              //   required: true,
              // },
              // {
              //   labels: 'Reactivation Date',
              //   type: 'vfg-functional-date',
              //   placeholder: 'Reactivation Date',
              //   model: 'FUND_DATE_REACTIVATION',
              //   noLabel: true,
              //   noClearButton: true,
              //   format: 'dd-MM-yyyy',
              //   styleClasses: 'col',
              //   required: true,
              // },
              {
                labels: 'Financial Year End',
                type: 'vfg-functional-date',
                placeholder: 'Financial Year End',
                model: 'FUND_YEAR_END',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
              },
              {
                type: 'radios',
                label: 'Sale Charge Status',
                model: 'FUND_STATUS_SALE_CHARGE',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_STATUS_SALE_CHARGE
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Minimum Sales Charge',
                model: 'FUND_SALES_CHARGE_MINIMUM',
                placeholder: 'e.g x.xx%',
                required: true,
                validator: 'string',
                styleClasses: 'col',
                visible: (model, field, form) => {
                  return this.showSalesCharge
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Maximum Sales Charge',
                model: 'FUND_SALES_CHARGE_MAXIMUM',
                placeholder: 'e.g x.xx%',
                required: true,
                validator: 'string',
                styleClasses: 'col',
                visible: (model, field, form) => {
                  return this.showSalesCharge
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Effective Sales Charge',
                model: 'FUND_SALES_CHARGE_EFFECTIVE',
                placeholder: 'e.g x.xx%',
                required: true,
                validator: 'string',
                styleClasses: 'col',
                visible: (model, field, form) => {
                  return this.showSalesCharge
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_SCHEME',
                label: 'Scheme Structure',
                placeholder: 'Select scheme structure',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'FMS_SCHEME_ID',
                  label: 'FMS_SCHEME_NAME',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundSchemeList
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_UNITS',
                label: 'Units Structure',
                placeholder: 'Select units structure',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.unitStructure
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_FOCUS_INVESTMENT',
                label: 'Investment Focus',
                placeholder: 'Select investment focus',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.investmentFocus
                },
              },
              {
                type: 'radios',
                label: 'Wholesale Fund',
                model: 'FUND_WHOLESALE',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
                values: () => {
                  return this.FUND_SYARIAH_COMP
                },
              },
              {
                type: 'radios',
                label: 'Feeder Fund',
                model: 'FUND_FEEDER',
                required: true,
                validator: 'string',
                styleClasses: 'col display-inline',
                values: () => {
                  return this.FUND_FEEDER
                },
              },
              {
                type: 'radios',
                label: 'FOF',
                model: 'FUND_FOF',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
                values: () => {
                  return this.FUND_SYARIAH_COMP
                },
              },
              {
                type: 'radios',
                label: 'UCITS',
                model: 'FUND_UCITS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
                values: () => {
                  return this.FUND_SYARIAH_COMP
                },
              },
              {
                type: 'radios',
                label: 'ASEAN CIS',
                model: 'FUND_ASEAN_CIS_STATUS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
                values: () => {
                  return this.FUND_ASEAN_CIS_STATUS
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'FUND ASEAN CIS',
                model: 'FUND_ASEAN_CIS',
                placeholder: 'Enter Fund ASEAN CIS',
                required: true,
                validator: 'string',
                styleClasses: 'col',
                visible: (model, field, form) => {
                  return this.showAseanCIS
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'FUND_NOTES',
                label: 'Fund Notes',
                placeholder: 'Select fund notes',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'FUNDNOTES_ID',
                  label: 'FUNDNOTES_DESC',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundNoteList
                },
              },
            ],
          },
        ],
      },

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    }
  },
}
</script>
