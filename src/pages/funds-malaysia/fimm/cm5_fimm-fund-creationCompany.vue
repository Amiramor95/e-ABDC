<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">List of Distributor</h4>
        <br />
      </div>

      <div class="col float-right">
        <div class="float-right">
          <span v-b-tooltip.hover title="Change View List">
            <h5>
              <b-badge class="mr-1"
                @click="changeView" variant="primary"
                ><i class="fa fa-exchange"></i
              ></b-badge>
            </h5>
          </span>
        </div>
      </div>

      <!-- list table-->
      <va-card class="mt-5 col-12">
        <div class="row">
          <div class="flex md9">
            <div class="">
              <div class="inline-left">
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
            <div class="flex md3">
            <div class="">
              <div class="right">
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
          </div>
        </div>
        <va-data-table
          :fields="RecordFields"
          :data="RecordFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :datacount="RecordCount"
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
                title="View List Of Fund Profile"
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
  </va-inner-loading>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {

    this.getAllList(this.selectDistType,this.changeViewStatus);
  },

  components: {},

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.go(-1);
    }, // back button

    async filterRecord() {
      try {
        //alert(JSON.stringify(this.model));
        const response = await servicesModule5.filterFundDistributorList(
          this.model
        );
        if (response != "error") {
          this.RecordList = response;
        }
      } catch (error) {}
    },

    async reset() {
      this.model.DIST_NAME = "";
      this.model.DIST_CODE = "";

      this.getAllList();
    },

    // getAllRecord
    getAllList: async function (data,data2) {
      const response = await servicesModule5.getDistributorList(
        data,data2
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
      this.statusLoad = false;
    },

    async viewRecord(data) {
      this.$router.push({
        name: "fundCreation-list",
        params: { DISTRIBUTOR: data },
      });
    },

    async resetSearch() {
      this.model.SET_DISTYPE = "";
      this.selectDistType = null;
      this.getAllList();
    },

    async changeView() {
      // to all or pending only
      this.statusLoad = true;
      if (this.changeViewStatus == 1){
        this.changeViewStatus = 2;
      } else if (this.changeViewStatus == 2){
        this.changeViewStatus = 1;
      } else if (this.changeViewStatus == 3){
        this.changeViewStatus = 2;
      }
      const data2 = this.changeViewStatus;
        this.getAllList(this.selectDistType,data2);
    },

    onModelUpdatedDistType(newVal, schema) {
      if (schema == "SET_DISTYPE") {
        const newValcon = newVal.name;
        console.log("Dist Type filter ", newValcon);
        if (newValcon == "null") {
          console.log("Dist Type filter1 ", newValcon);
          this.getAllList();
        } else {
          console.log("Dist Type filter2 ", newValcon);
          this.selectDistType = newValcon;
          this.getAllList();
        }
      }
    },
  },

  computed: {
    RecordFields() {
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

    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }
      return this.RecordList.filter((item) => {
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
      changeViewStatus: 1,
      selectDistType: null,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      RecordList: [],
      statusLoad: true,
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
          name: "THIRD PARTY",
        },
      ],
      count: 1,
      RecordCount: null,

      model: {
        DIST_NAME: "",
        DIST_CODE: "",

        SET_DISTYPE: "",
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "DIST_NAME",
                label: "DISTRIBUTOR NAME",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_CODE",
                label: "DISTRIBUTOR CODE",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
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
                styleClasses: "col",
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
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
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
.inline-left {
  display: inline-flex;
  float:left;
}
</style>
