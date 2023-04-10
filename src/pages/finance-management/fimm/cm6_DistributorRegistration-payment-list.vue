<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Distributor Registration Payment</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>

              <b-badge v-b-toggle.collapse-1 v-b-tooltip.hover
                title="Advance Search" class="mr-1" variant="secondary">
                <i class="fa fa-search"></i>
              </b-badge>

              <span v-b-tooltip.hover
                title="Finance Setting"
                v-on:click="setting"
                class="badge badge-primary mr-1">
                  <i class="fa fa-gear"></i>
               </span>

              <downloadExcel
                :json_data="EXCEL_DATA_EXPORT"
                :excelname="excelname"
                :sheetname="sheetname"
                :column="column"
              >
              </downloadExcel>

              <vue-json-to-csv
                :json-data="csv"
                :csv-title="'DistributorRegistrationList'"
                @success="(val) => handleSuccess(val)"
                @error="(val) => handleError(val)"
                :labels="{
                  REFNO3: { title: 'Reference Number 3' },
                  SN: { title: 'Serial Number' },
                  CODE: { title: 'Party Code' },
                  CHEQUE: { title: 'Cheque Number' },
                  REMARKS: { title: 'Remarks' },
                  REFNO1: { title: 'Reference Number 1' },
                  DATE_DISPLAY: { title: 'Transaction Date' },
                  BANKCODE: { title: 'Bank Code' },
                  ITEMNO: { title: 'Item Number' },
                  ACCCODE: { title: 'GL Account Code' },
                  CURRCODE: { title: 'Currency Code' },
                  CREDIT_AMOUNT: { title: 'Transaction Amount' },
                  BASE_AMOUNT: { title: 'Base Amount' },
                  DESCRIPTION: { title: 'Description' },
                  SALESMANCODE: { title: 'Salesman Code' },
                  FREIGHTAMOUNT: { title: 'Freight Amount' },
                  DUE_DATE: { title: 'Due Date' },
                  CREDITTERM: { title: 'Credit Term' },
                  REFNO2: { title: 'Reference Number 2' },
                  REFNO4: { title: 'Reference Number 4' },
                  NOTE: { title: 'Note' },
                  RECEIVEDATE: { title: 'Received Date' },
                  BANKCHARGE: { title: 'Bank Charges' },
                  CTL1: { title: 'Custom Text Level 1' },
                  CTL2: { title: 'Custom Text Level 2' },
                  CTL3: { title: 'Custom Text Level 3' },
                  CTL4: { title: 'Custom Text Level 4' },
                  CTL5: { title: 'Custom Text Level 5' },
                  CTL6: { title: 'Custom Text Level 6' },
                  CTL7: { title: 'Custom Text Level 7' },
                  CTL8: { title: 'Custom Text Level 8' },
                  CTL9: { title: 'Custom Text Level 9' },
                  CTL11: { title: 'Custom Text Level 1' },
                  CTL12: { title: 'Custom Text Level 2' },
                  CTL13: { title: 'Custom Text Level 3' },
                  CTL14: { title: 'Custom Text Level 4' },
                  CTL15: { title: 'Custom Text Level 5' },
                  CTL16: { title: 'Custom Text Level 6' },
                  CTL17: { title: 'Custom Text Level 7' },
                  CTL18: { title: 'Custom Text Level 8' },
                  CTL19: { title: 'Custom Text Level 9' },
                  ACL1: { title: 'Analysis Code Level 1' },
                  ACL2: { title: 'Analysis Code Level 2' },
                  ACL3: { title: 'Analysis Code Level 3' },
                  ACL4: { title: 'Analysis Code Level 4' },
                  ACL5: { title: 'Analysis Code Level 5' },
                  ACL6: { title: 'Analysis Code Level 6' },
                  ACL7: { title: 'Analysis Code Level 7' },
                  ACL8: { title: 'Analysis Code Level 8' },
                  ACL9: { title: 'Analysis Code Level 9' },
                  CHEQUESTATUS: { title: 'Cheque Status' },
                  PRESENTEDDATE: { title: 'Presented Date' },
                  PA1: { title: 'Party Address 1' },
                  PA2: { title: 'Party Address 2' },
                  PA3: { title: 'Party Address 3' },
                  PA4: { title: 'Party Address 4' },
                  PA5: { title: 'Party Address 5' },
                  PARTYPOSTCODE: { title: 'Party Postcode' },
                  PARTYADDRESS: { title: 'Default Party Address' },
                  CURRDATE: { title: 'Currency Rate' },
                  CALCMETHOD: { title: 'Tax Calculation Method' },
                  HEADERTAX: { title: 'Header Tax Schedule Code' },
                  DETAILTAX: { title: 'Detail Tax Schedule Code' },
                  TRANSAMOUNT_TAX: { title: 'Transaction Amount (Tax Incl)' },
                  AMOUNTINBASE: { title: 'Transaction Amount In Base Currency (Tax Incl)'},
                  BANKAMOUNT: { title: 'Bank Amount' },
                  INDUSTRYCODE: { title: 'Standard Industry Code' },
                }"
              >
                <b-badge
                  v-b-tooltip.hover
                  title="Export as CSV for Biztrak"
                  class="mr-1"
                  variant="success"
                >
                  <i class="fa fa-file"></i>
                </b-badge>
              </vue-json-to-csv>

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
        <br />
        <p class="text-danger">  {{ searchError }} </p>
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
    <br />
    <div class="row">
      <div class="flex md3 offset--md9">
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
      :datacount="ListCount"
      :fields="fields"
      :data="filteredData"
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
      <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
          <span
            v-b-tooltip.hover
            title="View Payment Details"
            v-on:click="viewRecord(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-eye"></i
          ></span>
        </h4>
      </template>
    </va-data-table>
    <br />
    <br />
    <br />

    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <br />
  </va-card>
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import VueJsonToCsv from "vue-json-to-csv";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule6 from "../../../app/module6/services05";

Vue.use(VueFormGenerator);
Vue.use(VueJsonToCsv);

export default {
  mounted() {
    setTimeout(() => {
      const el = document.getElementById('_DATE_DISPLAY')
      el.style.cursor = 'pointer'
      el.addEventListener('click',this.sortBySubmissionDate);
    },10)
  },

  created(){
    this.getAllList();
    this.getcsv();
  },

  components: {
    VueJsonToCsv,
  },

  methods: {
    sortBySubmissionDate(event){
      const this_ = this;
      if(this_.dateSortParam === 'asc') {
            this_.items.sort((oldObj,newObj) => {
             return new Date(newObj.DATE_DISPLAY) - new Date(oldObj.DATE_DISPLAY);
            })
          this_.dateSortParam = 'desc';
          }else {
            this_.items.sort((oldObj,newObj) => {
             return new Date(oldObj.DATE_DISPLAY) - new Date(newObj.DATE_DISPLAY);
            })
          this_.dateSortParam = 'asc';
      }
    },
    clear() {
      this.dateFormat = null;
      this.term = null;
    },

    handleSuccess(val){

    },

    getAllList: async function () {
      const response = await servicesModule6.getAllDistributorRegistration();
      this.items = response
      this.ListCount = this.items.length
    },


    async getcsv() {
      const response = await servicesModule6.getCSV1();
      this.csv = response;
    },

    search: debounce(function (term) {
      this.term = term;
    }, 400),

    async viewRecord(data) {
      localStorage.setItem(
        "DistributorRegistration-Payment-Details",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "DistributorRegistration-Payment-Details",
      });
    },

    setting() {
      this.$router.push("/fimm/finance-account-setting");
    },


    back() {
      this.$router.push({
        name: "Registration-Payment",
      });
    },

    async filterRecord() {
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
        const response = await servicesModule6.getAllDistributorRegistration(
          this.model.modelFilter
        );
        if (response != "error") {
          this.items = response;
        }
      } catch (error) {}
    },

    async reset() {
      try {
        this.model.modelFilter.DIST_NAME="";
        this.model.modelFilter.REF_NUMBER= "";
        this.model.modelFilter.DATE_FROM=  "";
        this.model.modelFilter.DATE_TO=  "";
        this.searchError = '';
        this.getAllList();

        if (response != "error") {
          this.items = response;
        }
      } catch (error) {}

    },

  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "DATE_DISPLAY",
          title: "SUBMISSION DATE",
        },
        {
          name: "TRANSACTION_NUMBER",
          title: "TRANSACTION NUMBER",
          sortField: "TRANSACTION_NUMBER",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "DIST_TYPE_NAME",
          title: "DISTRIBUTOR TYPE",
          sortField: "DIST_TYPE_NAME",
        },
        {
          name: "PAYMENT_REFERENCE",
          title: "REFERENCE NUMBER",
          sortField: "PAYMENT_REFERENCE",
        },
        {
          name: "CODE",
          title: "CODE",
          sortField: "CODE",
        },
        {
          name: "CREDIT_AMOUNT",
          title: "AMOUNT (RM)",
          sortField: "CREDIT_AMOUNT",
        },
        {
          name: "STATUS",
          title: "STATUS",
          sortField: "STATUS",
        },
        {
          name: "__slot:actions",
          title: "DETAILS",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
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
              (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v): false) ||
              (item.PAYMENT_REFERENCE ? item.PAYMENT_REFERENCE.toLowerCase().includes(v) : false) ||
              (item.DIST_TYPE_NAME ? item.DIST_TYPE_NAME.toLowerCase().includes(v) : false) ||
              (item.CODE ? item.CODE.toLowerCase().includes(v) : false) ||
              (item.STATUS ? item.STATUS.toLowerCase().includes(v) : false )
          )
      })
      this.ListCount = items.length
      return items
    },

    EXCEL_DATA_EXPORT(){
       return this.filteredData.map(x => {
          return {
           SUBMISSION_DATE:x.DATE_DISPLAY,
           TRANSACTION_NUMBER:x.TRANSACTION_NUMBER,
           DISTRIBUTOR_NAME:x.DIST_NAME,
           DISTRIBUTOR_TYPE:x.DIST_TYPE_NAME,
           REFERENCE_NUMBER:x.PAYMENT_REFERENCE,
           CODE:x.CODE,
           TYPE:x.FINTYPE, 
           FINTYPE:x.TYPE,
           AMOUNT:x.CREDIT_AMOUNT,
           STATUS:x.STATUS,
          }
       })
    }

  },
  data() {
    return {
      dateSortParam:'asc',
      searchError:'',
      column: [
        "SUBMISSION DATE",
        "TRANSACTION_NUMBER",
        "DISTRIBUTOR NAME",
        "DISTRIBUTOR TYPE",
        "REFERENCE NUMBER",
        "CODE",
        "TYPE",
        "TRANSACTION TYPE",
        "AMOUNT (RM)",
        "STATUS",
      ],
      excelname: "download-DistributorRegistrationList",
      sheetname: "DistributorRegistrationPayment",
      dateFormat: "",
      term: null,
      ListCount: null,
      items: [],
      Excell:[],
      csv: [],

      model: {
        modelFilter: {
          DIST_NAME: "",
          REF_NUMBER: "",
          DATE_FROM:  "",
          DATE_TO:  "",

        },
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.DIST_NAME",
                label: "Distributor Name",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.REF_NUMBER",
                label: "Reference Number",
                styleClasses: "col-md-6",
              },
              {
                type: 'input',
                inputType: 'date',
                model: 'modelFilter.DATE_FROM',
                label: 'Date From',
                styleClasses: 'col-md-3',
                format:"YYYY-MM-DD",
              },

              {
                type: 'input',
                inputType: 'date',
                model: 'modelFilter.DATE_TO',
                label: 'Date To',
                styleClasses: 'col-md-3',
                format:"YYYY-MM-DD",
              },
            ],
          },
        ],
      },

    };
  },
};
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
