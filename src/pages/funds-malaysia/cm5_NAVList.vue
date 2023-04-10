<template>
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
              <!-- reference for excel download -->
              <!-- <vue-json-to-csv :json-data="[
                                 { name: 'Joe', surname: 'Roe' },
                                 { name: 'John', surname: 'Doe' }
                               ]"
                :labels="{ name: { title: 'First name' } }"
                :csv-title="My_CSV"
              >
                <button>
                  <b>My custom Example</b>
                </button>
              </vue-json-to-csv> -->
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
                  FUND_NOTES_DENOTATION: { title: 'Fund Notes Denotation' },
                  CURRENCY: { title: 'Specific Fund Notes Value' },
                  FUNDNOTES_DESC: { title: 'Global/Specific Fund Notes' },
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
        id="results"
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="FUND_PRICE_PERUNIT" slot-scope="price">
          <p
            v-if="
              price.rowData.Matching_Date == todaydate &&
              price.rowData.TS_ID == 31
            "
          >
            {{ price.rowData.FUND_PRICE_PERUNIT }}
          </p>
          <p
            v-if="
              price.rowData.Matching_Date != todaydate ||
              price.rowData.TS_ID != 31
            "
          >
            NA
          </p>
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

    <div
      class="table hide"
      id="myid"
      ref="myid"
      style="width: 80pox; margin: auto"
    >
      <table style="backgrond-color: #fff !important; width: 80%; margin: auto">
        <tbody>
          <tr>
            <th colspan="2">{{ date }}</th>
          </tr>
        </tbody>
      </table>
      <table style="backgrond-color: #fff !important; width: 80%; margin: auto">
        <thead>
          <tr>
            <th style="min-width: 200px"></th>
            <th style="text-align: right;">NAV (RM)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in list" :key="index">
            <td colspan="2">
             <table style="width:100%">
               <thead>
                 <tr>
                   <td  colspan="2" style="padding: 0.75rem 0;border: 0;"> {{ app.dist_name }}</td>
                 </tr>
               </thead>
               <tbody>
              <tr v-for="(sub, i) in app.data" :key="i">
                <td style="padding:3px; border:0px;">
                  
                    {{ sub.FUND_NAME }} {{ sub.FUND_NOTES_DENOTATION }}
                  
                </td>
                <td style="border: 0px; text-align: right;">
                  {{ sub.FUND_PRICE_PERUNIT }}
                </td>
              </tr>
              </tbody>
             </table>
            </td>
            <!-- <td>
              <tr v-for="(sub, i) in app.data" :key="i">
                <td style="padding:3px; border:0px;"></td>
              </tr>
            </td> -->
          </tr>
        </tbody>
        <p>Global Fund Notes:</p>
        <p>(a) Nav of preceding business days</p>
        <p>(b) xd - Ex distribution</p>
        <p>(e) Prices updated twice a week/weekly/fortnightly/monthly</p>
        <p>(i) cd - Cum distribution</p>
        <p>(j) Price in USD</p>
        <p>(l) Price in AUD</p>
        <p>(m) Price (s) for current business day</p>
        <p>(p) Price in EUR</p>
        <p>(r) Price in RMB</p>
        <p>(s) Price in SGD</p>

        <p>FIMM shall not be held responsible as to</p>
        <p>the accuracy of the published price. In the</p>
        <p>event of inconsistencies of the puublished</p>
        <p>price and the price offered by the unit</p>
        <p>trust management companies, the latter shall prevail.</p>
      </table>
    </div>
  </va-card>
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
  mounted() {
    this.date = moment(new Date()).format("dddd, D MMMM YYYY");
    this.todaydate = moment(new Date()).format("DD-MM-yyyy");
    console.log("this.todaydate", this.todaydate);
    this.getAllFundApplicationJoin();
    console.log(JSON.stringify(this));

    var request = new XMLHttpRequest();
    request.open("GET", "../../assets/icons/MyFont.ttf", true);
    request.responseType = "blob";

    request.onload = function () {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);

      reader.onload = function (e) {
        console.log("DataURL:", JSON.stringify(e.target.result));
      };
    };

    // fetch("../../assets/icons/MyFont.ttf")
    // .then(response => JSON.stringify(response))
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
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
      //this.$refs["myid"].classList.add("hide");
      this.$refs["myid"].classList.remove("hide");
      // this.$refs["myid"].classList.remove("hide");
      // var element = document.getElementById("myid");
      //   element.classList.remove("hide");
      const doc = new JsPDF("l", "mm", [1200, 1210]);
      const reader = new FileReader();
      //  var docss = new JsPDF("l", "mm", [1200, 1210]);

      // Convert HTML to PDF in JavaScript
      doc.html(
        this.$refs["myid"],
        {
          callback: function (doc) {
            doc.addFileToVFS("../../assets/icons/MyFont.ttf");
            doc.addFont("../../assets/icons/MyFont.ttf", "MyFont", "normal");
            doc.setFont("MyFont");
            doc.save("NAV_daily_publish.pdf");
          },
        },
        10,
        10
      );
      setTimeout(() => {
        this.$refs.myid.classList.add("hide");
      }, 100);
    },

    async filterFundProfile() {
      console.log("data", this.model.modelFilter);
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

    // getAllRecord/// getNAVListForPdf
    getAllFundApplicationJoin: async function () {
      const response = await servicesModule5.getNAVList();
      const response2 = await servicesModule5.getNAVListForPdf();
      console.log("pdf data", response2);
      this.fundprofileRecordList = response;
      this.list = response2;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    //  getAllgetNAVListForPdf: async function () {
    //   const response = await servicesModule5.getNAVListForPdf();
    //   this.fundprofileRecordList1 = response;
    //   this.fundprofileRecordCount1 = this.fundprofileRecordList1.length;
    //    console.log("pdf data", response);
    // },
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
          name: "__slot:FUND_PRICE_PERUNIT",
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
          title: "Global/SPECIFIC FUND NOTES",
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
      date: "",
      tablediv: false,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
      autotablelist: [],
      list: [],
      fundprofileRecordCount: null,
      count: 1,
      todaydate: "",
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
.hide {
  display: none;
}
</style>
