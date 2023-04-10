<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col cols="100%" align-v="baseline">
        <va-card>
          <div class="row">
            <h4 slot="header" class="card-title">Daily NAV List</h4>
            <br />
            <div class="col float-right">
              <div class="float-right">
                <h5></h5>
                <span>
                  <h5>
                    <b-badge
                      v-b-tooltip.hover
                      title="Export as PDF"
                      class="mr-1"
                      variant="danger"
                      @click="generatePDF"
                    >
                      <i class="fa fa-file-pdf-o"></i>
                    </b-badge>

                    <vue-json-to-csv
                      :json-data="fundProfileFilteredData"
                      :csv-title="'NAV_daily_publish'"
                      @success="(val) => handleSuccess(val)"
                      @error="(val) => handleError(val)"
                      :labels="{
                        DIST_NAME: { title: 'Management Company' },
                        FUND_CODE_FIMM: { title: 'FIMM Fund Code' },
                        FUND_NAME: { title: 'Fund Name' },
                        FUND_PRICE_PERUNIT: { title: 'Unit NAV' },
                        FUND_NOTES_DENOTATION: {
                          title: 'Fund Notes Denotation',
                        },
                        CURRENCY: { title: 'Global/Specific Fund Notes' },
                        FUNDNOTES_DESC: {
                          title: 'Specific Fund Notes Value',
                        },
                        FUND_NAME_CHINESE: { title: 'Fund Chinese Name' },
                      }"
                    >
                      <b-badge
                        v-b-tooltip.hover
                        title="Export as Excel"
                        class="mr-1"
                        variant="success"
                      >
                        <i class="fa fa-file-excel-o"></i>
                      </b-badge>
                    </vue-json-to-csv>
                    <b-badge
                      v-b-tooltip.hover
                      title="Advanced Search"
                      v-b-toggle.collapse-1
                      class="mr-1"
                      variant="secondary"
                      ><i class="fa fa-search"></i
                    ></b-badge>
                  </h5>
                </span>
              </div>
            </div>
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
              <br />
              <button
                @click="filterFundProfile"
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
            <va-data-table
              :fields="fundProfile"
              :data="fundProfileFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              :datacount="fundprofileRecordCount"
              :dataperpage="parseInt(perPage)"
              clickable
              name="dataTable"
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="props">
                <h5 class="mt-1">
                  <span
                    v-b-tooltip.hover
                    title="View"
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
          </va-card>
        </va-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
// import VueFormGenerator from 'vue-form-generator'
import "vue-form-generator/dist/vfg.css";
import VueJsonToCsv from "vue-json-to-csv";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { debounce } from "lodash";
import * as servicesModule5 from "../../app/module5/services03";
import moment from "moment";
Vue.use(VueJsonToCsv);

export default {
  name: "navlist",
  mounted() {
    this.getAllFundApplicationJoin();
    console.log(JSON.stringify(this));
  },
  components: {
    VueJsonToCsv,
  },

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    // // advanceSearch
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getAllClassification()
    //   this.classificationList = response
    // },
    generatePDF() {
      const doc = new JsPDF();

      // It can parse html:
      // <table id="my-table"><!-- ... --></table>
      // doc.autoTable({ html: '#my-table' })

      // Or use javascript directly:
      var columns = [
        { title: "Company Name", key: "DIST_NAME" },

        { title: "FiMM Fund Code", key: "FUND_CODE_FIMM" },

        { title: "Fund Name", key: "FUND_NAME" },

        { title: "Unit NAV", key: "FUND_PRICE_PERUNIT" },

        { title: "Fund Note Denotation", key: "FUND_NOTES_DENOTATION" },

        { title: "Specific Fund Note", key: "FUNDNOTES_DESC" },

        { title: "Specific Fund Note Value", key: "CURRENCY" },

        { title: "Fund Chinese Name", key: "FUND_NAME_CHINESE" },

        // { title: "Currency", key: "CURRENCY" }
      ];
      var date = new Date();

      doc.autoTable(columns, this.fundprofileRecordList, {
        font: "calibri", // <-- place name of your font here
        fontStyle: "normal",
        addPageContent: function (data) {
          doc.text(moment(date).format("dddd, D MMMM YYYY"), 17, 7);
        },
      });
      doc.save("NAV_daily_publish.pdf");
    },
    async filterFundProfile() {
      console.log("manish", this.model.modelFilter);
      try {
        const response = await servicesModule5.getfilterNAVLIST(
          this.model.modelFilter
        );
        console.log("my response", response);
        if (response !== "error") {
          this.fundprofileRecordList = response;
        }
      } catch (error) {}
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllFundApplicationJoin: async function () {
      const response = await servicesModule5.getNAVList();
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async viewRecord(data) {
      console.log("my id", data);
      localStorage.setItem("FundDetails", JSON.stringify(data));
      //  this.$router.push('/fimm/cm5_fimm_navdetails');
      this.$router.push({
        name: "nav-details",
        params: { FUNDPROFILE: data },
      });
    },
    // async viewRecord (data) {
    //   this.$router.push({
    //     name: 'fundcreation-review',
    //     // params: { FUNDPROFILE: data },
    //   })
    // },
    // async addRecord () {},
  },

  computed: {
    fundProfile() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "DIST_NAME",
          title: "COMPANY NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "FUND_PRICE_PERUNIT",
          title: "UNIT NAV",
          sortField: "FUND_PRICE_PERUNIT",
        },
        {
          name: "FUND_NOTES_DENOTATION",
          title: "FUND NOTES DENOTATIONS",
          sortField: "FUND_NOTES_DENOTATION",
        },

        {
          name: "FUNDNOTES_DESC",
          title: "SPECIFIC FUND NOTES VALUE",
          sortField: "FUNDNOTES_DESC",
        },
        {
          name: "FUND_NAME_CHINESE",
          title: "FUND CHINESE NAME",
          sortField: "FUND_NAME_CHINESE",
        },
        {
          name: "fund",
          title: "FUND FORMER NAME",
          sortField: "fund",
        },
        {
          name: "CURRENCY",
          title: "CURRENCY",
          sortField: "CURRENCY",
        },
        {
          name: "TS_PARAM",
          title: "NAV / Fund Status",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    fundProfileFilteredData() {
      if (!this.term || this.term.length < 1) {
        console.log("my res manish", this.fundprofileRecordList);
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter((item) => {
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_MEMBER.includes(v) || item.FUND_NAME.includes(v)
          );
      });
    },
  },

  data() {
    return {
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,

      model: {
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: "",
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
                model: "modelFilter.FUND_CODE_FIMM",
                label: "FIMM Fund Code",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_MEMBER",
                label: "Member Fund Code",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_NAME",
                label: "Fund Name",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.UMBRELLA_FUND_NAME",
                label: "Umbrella Fund Name",
                styleClasses: "col-md-6",
              },

              // {
              //   type: "select",
              //   model: "classification",
              //   label: "Classification",
              //   placeholder: "Select Classification",
              //   selectOptions: {
              //     multiple: false,
              //     value: "SETTING_GENERAL_ID",
              //     name: "SET_PARAM",
              //     searchable: true,
              //   },
              //   values: (model, schema) => {
              //     return this.classificationList;
              //   },
              //   styleClasses: "col-md-6",
              // },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.content i {
  font-style: normal;
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
