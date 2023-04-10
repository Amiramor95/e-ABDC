<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">List of Fund Dislodgement</h4>
        <br />
      </div>
      <div>
        <div class="flex md9 float-left">
          <div class="input-group">
            <div class="flex md9">
              <div class="row">
                <div class="flex xs4 md9">
                  <datepicker
                    :value="term"
                    @input="searchDate"
                    placeholder="dd-MM-yyyy"
                    format="dd-MMM-yyyy"
                    input-class="form-control bgcolor col-md-12"
                    v-model="dateFormat"
                    :typeable="false"
                    name="uniquename"
                  ></datepicker>
                </div>
                <div class="flex xs4 md2">
                  <button
                    @click.prevent="clear"
                    type="button"
                    class="btn btn-md btn-primary"
                  >
                    <va-icon name="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex md3 float-right">
          <div class="ml-2 float-right">
            <span v-b-tooltip.hover>
              <span
                v-b-tooltip.hover
                title="New Submission of Fund Dislodgement"
                v-on:click="viewFundDislodge"
                class="badge badge-success"
              >
                <i class="fa fa-eye"></i
              ></span>
            </span>
            <span v-b-tooltip.hover>
              <span
                v-b-tooltip.hover
                title="Create Fund Dislodgement"
                v-on:click="create"
                class="badge badge-success"
              >
                <i class="fa fa-plus"></i
              ></span>
            </span>
            <span v-b-tooltip.hover>
              <span
                v-b-tooltip.hover
                v-b-toggle.collapse-1
                title="Advanced Search"
                class="badge badge-secondary"
              >
                <i class="fa fa-search"></i
              ></span>
            </span>
          </div>
        </div>
      </div>

      <br />
      <!-- <div class="float-left">
      <div>
        <vue-form-generator
          :model="model"
          :schema="schemaFilterList"
          :options="formOptions"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
    </div> -->
    <div class="flex md9 float-left">
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
    </div>
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
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="document" slot-scope="row">
            <span>
              <h4 class="mt-2">
                <span
                  v-if="row.rowData.DOCU_BLOB != '-'"
                  v-b-tooltip.hover
                  title="View Document"
                  v-on:click="viewPdf(row.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-file-pdf-o"></i
                ></span>
              </h4>
            </span>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="view"
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
        <!-- <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill float-left btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button> -->
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getAllFundLodgement();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    searchDate(date) {
      this.term = moment(date).format("DD-MMM-y");
    },
    // // advanceSearch
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getAllClassification()
    //   this.classificationList = response
    // },
    async filterFundProfile() {
      try {
        const response = await servicesModule5.fundprofileRecordList(
          this.model.modelFilter
        );
        if (response !== "error") {
          this.fundprofileRecordList = response;
        }
      } catch (error) {}
    },
    // create
    create() {
      this.$router.push({ name: "fundDisLodgementCompany" });
    },
    viewFundDislodge() {
      this.$router.push({ name: "fundDisLodgementConfirmList" });
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button
    viewPdf(document) {
      var byteCharacters = window.atob(document["DOCU_BLOB"]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], {
        type: "application/pdf;base64",
      });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },
    // getAllRecord
    getAllFundLodgement: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule5.getActiveLodge(
        JSON.parse(user).USER_DIST_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      this.$router.push({
        // name: 'fundprofile-view',
        name: "fundDisLodgementReview",
        params: { FUNDPROFILE: data },
      });
    },
  },

  computed: {
    fundProfile() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION DATE",
          sortField: "CREATE_TIMESTAMP",
          width: "8%",
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
          name: "DIST_TYPE_NAME",
          title: "COMPANY TYPE",
          sortField: "DIST_TYPE_NAME",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "TERMINATION_AGREEMENT_DATE",
          title: "TERMINATION AGREEMENT DATE",
          sortField: "TERMINATION_AGREEMENT_DATE",
          width: "8%",
        },
        {
          name: "DISLODGE_DATE",
          title: "EXPECTED DISLODGEMENT DATE",
          sortField: "DISLODGE_DATE",
          width: "8%",
        },
        {
          name: "FUND_DATE_LAUNCH",
          title: "LAUNCH DATE",
          sortField: "FUND_DATE_LAUNCH",
          width: "8%",
        },
        {
          name: "__slot:document",
          title: "TERMINATION AGREEMENT",
        },
        {
          name: "TS_PARAM_FIRST",
          title: "STATUS",
          sortField: "TS_PARAM_FIRST",
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
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter((item) => {
        // return item.title.toLowerCase().startsWith(this.term.toLowerCase()) ,
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every(
            (v) =>
              item.CREATE_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase()
              ) ||
              item.FUND_CODE_FIMM.includes(v) ||
              item.DIST_TYPE_NAME.includes(v) ||
              item.FUND_CODE_MEMBER.includes(v) ||
              item.FUND_NAME.includes(v) ||
              item.DIST_NAME.includes(v)
          );
      });
    },
  },

  data() {
    return {
      dateFormat: "",
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
      statusLoad: true,

      schemaFilterList: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "Search Date",
                model: "search_Date",
                noLabel: false,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "",
              },
              {
                type: "vueMultiSelect",
                model: "lodge_Status",
                placeholder: "Status",
                styleClasses: "",
                selectOptions: {
                  multiple: true,
                  key: "",
                  label: "",
                  searchable: true,
                },
              },
            ],
          },
        ],
      },

      model: {
        search_Date: null,
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
                label: "Fund Code",
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
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: false,
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

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
</style>
