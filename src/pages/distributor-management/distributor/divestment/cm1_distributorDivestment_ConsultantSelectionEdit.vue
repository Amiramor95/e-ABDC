<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Divestment</h4>
      <br />
      <div class="col float-right"></div>
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
    <br />
    <!-- <h5 >Select Distributor </h5> -->
    <vue-form-generator
      :model="model"
      :schema="Schema"
      :options="formOptions"
      ref="regForm"
    >
    </vue-form-generator>
    <br />
    <br />

    <va-card>
      <!-- list fund list-->
      <va-card class="mt-5 col-12">
        <div class="row">
          <h6>Select Consultant</h6>
        </div>
        <br />
        <div class="row">
          <div class="float-left">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <button @click="selectAll" type="button">
                Select All Consultant
              </button>
            </div>
          </div>
        </div>
        <br />
        <va-data-table
          :fields="RecordFields"
          :data="RecordFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :dataperpage="parseInt(perPage)"
          :datacount="RecordCount"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Details"
                v-on:click="addselection(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-plus"></i
              ></span>
            </h5>
          </template>
        </va-data-table>
        <br />
        <br />
        <br />
        <br />
      </va-card>
      <br />
      <!-- list selected table-->
      <va-card class="mt-5 col-12">
        <div class="row">
          <h6>Selected Consultant to Divest</h6>
        </div>
        <br />
        <div class="row">
          <div class="float-left">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <button @click="UnselectAll" type="button">
                Unselect All Consultant
              </button>
            </div>
          </div>
        </div>
        <br />
        <va-data-table
          :fields="RecordFields2"
          :data="RecordFilteredData2"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :dataperpage="parseInt(perPage)"
          :datacount="SelectedRecordCount"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Details"
                v-on:click="removeselected(props.rowData)"
                class="badge badge-danger mr-1"
              >
                <i class="fa fa-minus"></i
              ></span>
            </h5>
          </template>
        </va-data-table>

        <br />
      </va-card>
    </va-card>
    <br />
    <div>
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <div class="float-right">
        <button
          @click="Verify"
          type="button"
          class="ml-1 btn btn-primary btn-fill btn-md"
        >
          Next &nbsp; <i class="fa fa-step-forward" />
        </button>
      </div>
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule1 from "../../../../app/module1/services05";

export default {
  mounted() {
    this.getAllRecord();
    this.getDistributorMergeDetails();

    var data = localStorage.getItem("DIVE_ID");
    this.DIVE_ID = JSON.parse(data);
  },
  components: {},

  methods: {
    // search

    search: debounce(function(term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    // advanceSearch
    async filterRecord() {
      try {
        // const response = await servicesModule7.filter_submission_record(this.model.modelFilter,)
        if (response != "error") {
          this.RecordList = response;
          this.RecordCount = this.RecordList.length;
        }
      } catch (error) {}
    },

    async reset() {
      this.model.modelFilter.DIST_NAME = "";
      this.model.modelFilter.FUND_CODE_FIMM = "";
      // this.RecordList = null;
      this.getAllRecord();
    },

    // back button
    back() {
      this.$router.push("/distributor/DistributorDivestment-List");
    },

    // next button

    Verify: async function() {
      // this.$router.push("/distributor/DistributorDivestment-FundSubmission");
      const data = new FormData();

      if (this.model.Distributor.DISTRIBUTOR_ID == null) {
        alert("Please Select Distributor");
      } else {
        const dive_id = this.DIVE_ID;
        data.append("DIVE_ID", JSON.parse(dive_id));
        data.append("TS_ID", "1");
        data.append("DISTRIBUTOR_ID_TO", this.model.Distributor.DISTRIBUTOR_ID);
        try {
          const response = await servicesModule1.fund_submission(data);
          localStorage.setItem("DIVE_ID", this.DIVE_ID);
          this.$router.push(
            "/distributor/DistributorDivestment-ConsultantSubmission"
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    // getAllRecord (consultant)
    getAllRecord: async function() {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_consultant_list(
        JSON.parse(user).user_id
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;

      this.getDistributorList();
      this.getSelectedRecord();
    },

    //get edit details
    getDistributorMergeDetails: async function() {
      const distid = localStorage.getItem("DIVE_ID");
      // alert(distid);
      const response = await servicesModule1.distributorMergeDetails(
        JSON.parse(distid)
      );
      this.mergerdetails = response;

      this.model.Distributor = {
        DISTRIBUTOR_ID: this.mergerdetails.DISTRIBUTOR_ID,
        DIST_NAME: this.mergerdetails.DIST_NAME
      };
    },

    // getAllRecord (consultant)
    getSelectedRecord: async function() {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getselected_consultant_list(
        JSON.parse(user).user_id
      );
      this.SelectionRecordList = response;
      this.SelectedRecordCount = this.SelectionRecordList.length;
    },

    // get distributor list
    getDistributorList: async function() {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_consultantDivestment(
        JSON.parse(user).user_id
      );
      this.DistributorRecords = response;
      this.DistributorCount = this.DistributorRecords.length;

      if (this.RecordCount == 0 || this.RecordCount == null) {
        if (this.DistributorCount == 0 || this.DistributorCount == null) {
          //  alert("You are not eligible to do fund divestment");
        }
      }
    },

    //add selection
    async addselection(data) {
      // alert(JSON.stringify((data).FUND_PROFILE_ID))
      const response = await servicesModule1.Cons_add(data);
      this.getAllRecord();
      this.getSelectedRecord();
    },

    //remove selection
    async removeselected(data) {
      // alert(JSON.stringify((data).FUND_PROFILE_ID))
      const response = await servicesModule1.Cons_remove(data);
      this.getAllRecord();
      this.getSelectedRecord();
    },

    //selectAll
    selectAll: async function() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        const response = await servicesModule1.SelectAllCons(data);
        this.getAllRecord();
        this.getSelectedRecord();
      } catch (error) {
        console.log(error);
      }
    },

    //unselectAll
    UnselectAll: async function() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        const response = await servicesModule1.UnselectAllCons(data);
        this.getAllRecord();
        this.getSelectedRecord();
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO"
        },
        {
          name: "CONSULTANT_NAME",
          title: "CONSULTANT NAME",
          sortField: "CONSULTANT_NAME"
        },
        {
          name: "CONSULTANT_NRIC",
          title: "NIRC NUMBER",
          sortField: "CONSULTANT_NRIC"
        },
        {
          name: "CONSULTANT_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CONSULTANT_PASSPORT_NO"
        },
        {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE",
          sortField: "TYPE_NAME"
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },

    RecordFields2() {
      return [
        {
          name: "__slot:no",
          title: "NO"
        },
        {
          name: "CONSULTANT_NAME",
          title: "CONSULTANT NAME",
          sortField: "CONSULTANT_NAME"
        },
        {
          name: "CONSULTANT_NRIC",
          title: "NIRC NUMBER",
          sortField: "CONSULTANT_NRIC"
        },
        {
          name: "CONSULTANT_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CONSULTANT_PASSPORT_NO"
        },
        {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE",
          sortField: "TYPE_NAME"
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }
      return this.RecordList.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NRIC.toLowerCase().includes(v) ||
              item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v) ||
              item.TYPE_NAME.includes(v)
          );
      });
    },

    RecordFilteredData2() {
      if (!this.term || this.term.length < 1) {
        return this.SelectionRecordList;
      }
      return this.SelectionRecordList.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NRIC.toLowerCase().includes(v) ||
              item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v) ||
              item.TYPE_NAME.includes(v)
          );
      });
    }
  },

  data() {
    return {
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      Distributor: "",
      DistributorRecords: [],
      SelectionRecordList: [],
      selected: [],
      DIV_ID: [],

      model: {
        Distributor: "",
        modelFilter: {
          DIST_NAME: "",
          FUND_CODE_FIMM: ""
        }
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
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM",
                label: "Fund Name",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM1",
                label: "FIMM Fund Code",
                styleClasses: "col-md-3"
              },

              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM2",
                label: "CIS Structure",
                styleClasses: "col-md-3"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM3",
                label: "Asset Class",
                styleClasses: "col-md-3"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM4",
                label: "Fund Group",
                styleClasses: "col-md-3"
              }
            ]
          }
        ]
      },

      Schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "Distributor",
                label: "Select Distributor",
                placeholder: "Select Distributor",
                required: true,
                validator: "required",
                styleClasses: "col-md-5",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_ID", // id yg nak simpan
                  label: "DIST_NAME", // value nak display
                  searchable: true
                },
                values: (model, schema) => {
                  return this.DistributorRecords; // get value
                }
              }
            ]
          }
        ]
      },

      formOptions: {
        validateAfterChanged: true
      }
    };
  }
};
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

.red-color {
  color: #c00000;
}
.blue-color {
  color: #4472c4;
}
.purple-color {
  color: #cc00cc;
}
.orange-color {
  color: #ed7d31;
}
</style>
