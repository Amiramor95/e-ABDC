<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Distributor</h4>
      <br />
    </div>
    <br />
    <div class="float-left">
      <div class="row flex">
        <vue-form-generator
          :model="model"
          :schema="DistTypeFilterSchema"
          :options="formOptions"
          ref="distTypeForm"
          @model-updated="onModelUpdatedDistType"
        >
        </vue-form-generator>
        <button class="primary" @click="resetSearch">
          <i class="fa fa-refresh"></i>
        </button>
      </div>
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
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getAllFundProfile();
    console.log(JSON.stringify(this));
  },
  components: {},

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
      this.$router.push("/distributor/fundLodgementFundHouse");
    }, // back button

    // getAllRecord
    getAllFundProfile: async function () {
      const data = this.$route.params.FUNDHOUSE.FMS_UMBRELLA_FUND_ID;
      const response = await servicesModule5.getDistributorBasedOnFundHouse(
        data,
        this.selectDistType
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async viewRecord(data) {
      const data2 = this.$route.params.FUNDHOUSE.FMS_UMBRELLA_FUND_ID;
      this.$router.push({
        name: "fundLodgementNew",
        params: { DISTRIBUTOR: data, FUNDHOUSE: data2 },
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
        {
          name: "DIST_CODE",
          title: "DISTRIBUTOR CODE",
          sortField: "DIST_CODE",
        },
        {
          name: "DIST_TYPE_NAME",
          title: "DISTRIBUTOR TYPE",
          sortField: "DIST_TYPE_NAME",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
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
          .every((v) => item.DIST_NAME.includes(v));
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

      model: {
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: "",
        },

        SET_DISTYPE: "",
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
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distType;
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
