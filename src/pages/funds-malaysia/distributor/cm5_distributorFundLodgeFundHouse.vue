<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Distributors</h4>
      <br />
    </div>
    <br />
    <div class="float-left">
      <div class="container">
        <div class="row">
          <div class="">
            <vue-form-generator
              :model="model"
              :schema="DistTypeFilterSchema"
              :options="formOptions"
              ref="distTypeForm"
              @model-updated="onModelUpdatedDistType"
            >
            </vue-form-generator>
          </div>
          <div class="">
            <button class="primary" @click="resetSearch">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row"></div>
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
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </va-card>
  </va-card>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getAllFundProfile();
    console.log(JSON.stringify(this));
  },
  components: {
    Multiselect,
  },

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    filterType(distType) {
      // this.term = this.distType;
      this.search(this.distType);
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

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.push({
        name: "fundLodgementList",
      });
    }, // back button

    // getAllRecord
    getAllFundProfile: async function () {
      const response = await servicesModule5.getDistributorBasedOnFundHouse(
        this.selectDistType
      );
      // getFundHouseList();
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    getDistListt: async function () {
      const response = await servicesModule5.getDistributorBasedOnFundHouse(
        this.selectDistType
      );
      // getFundHouseList();
      this.DistributorList = response;
      this.DistributorCount = this.DistributorList.length;
    },
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getDistributorBasedOnFundHouse();
    //   // getFundHouseList();
    //   this.fundprofileRecordList = response;
    //   this.fundprofileRecordCount = this.fundprofileRecordList.length;
    // },

    async viewRecord(data) {
      this.$router.push({
        name: "fundLodgementNew",
        params: { FUNDHOUSE: data },
      });
    },

    async resetSearch() {
      this.model.SET_DISTYPE = "";
      this.selectDistType = null;
      this.getAllFundProfile();
    },

    onModelUpdatedDistType(newVal, schema) {
      if (schema == "SET_DISTYPE") {
        const newValcon = newVal.name;
        console.log("Dist Type filter ", newValcon);
        if (newValcon == "null") {
          console.log("Dist Type filter1 ", newValcon);
          this.getAllFundProfile();
        } else {
          console.log("Dist Type filter2 ", newValcon);
          this.selectDistType = newValcon;
          this.getAllFundProfile();
        }
      }
    },
  },

  computed: {
    fundProfile() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        // {
        //   name: "UMBRELLA_FUND_NAME",
        //   title: "FUND HOUSE",
        //   sortField: "UMBRELLA_FUND_NAME",
        // },
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
          name: "FUND_DATE_LAUNCH",
          title: "LAUNCH DATE",
          sortField: "FUND_DATE_LAUNCH",
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
              item.UMBRELLA_FUND_NAME.includes(v) ||
              item.DIST_NAME.includes(v) ||
              item.DIST_TYPE_NAME.includes(v)
          );
      });
    },
  },

  data() {
    return {
      header: "",
      distType: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,

      selectDistType: null,

      distType: [
        {
          id: 1,
          name: "UTMC",
        },
        {
          id: 2,
          name: "PRP",
        },
        {
          id: 3,
          name: "IUTA",
        },
        {
          id: 4,
          name: "IPRA",
        },
      ],
      options: ["UTMC", "PRP", "IUTA", "IPRA"],
      model: {
        SET_DIST_NAME: "",
        SET_DIST_NAME: "",
        SET_DIST_TYPE: "",
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: "",
          SET_DIST_TYPE: "",
          SET_DIST_NAME: "",
        },
      },

      DistTypeFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "SET_DISTYPE",
                placeholder: "Select Distributor Type",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.distType;
                },
                styleClasses: "col-md-14",
              },
            ],
          },
        ],
      },
      filterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelFilter.SET_DIST_TYPE",
                label: "Distributor Type",
                placeholder: "Select Distributor Type",
                selectOptions: {
                  multiple: false,
                  key: "DIST",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distTypList;
                },
                styleClasses: "col-md-4",
              },
              {
                type: "vueMultiSelect",
                model: "modelFilter.SET_DIST_NAME",
                label: "Distributor Name",
                placeholder: "Select Distributor",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_ID",
                  label: "DIST_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DistributorList;
                },
                styleClasses: "col-md-4",
              },
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
