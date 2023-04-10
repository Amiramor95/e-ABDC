<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Fund and Consultant Divestment</h4>
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
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <br />
    <br />
    <!-- {{RecordFilteredData}} -->

    <!-- list table-->
    <va-card class="col-12">
      <!-- list fund list-->
      <va-card class="col-12">
        <div class="row">
          <h6>Select Fund</h6>
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
              <button @click="selectAll" type="button">Select All Fund</button>
            </div>
          </div>
        </div>
        <br/>
        <va-data-table
          :fields="RecordFields"
          :data="RecordFilteredData"
          no-data-label="No data found"
          :datacount="RecordCount"
          v-model="selected"
          item-key="FUND_CODE_FIMM"
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
          <h6>Selected Fund to Divest</h6>
        </div>
        <br/>
        <div class="row">
          <div class="float-left">
            <va-input
              :value="term1"
              :placeholder="$t('Search')"
              @input="search1"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <button @click="UnselectAll" type="button">
                Unselect All Fund
              </button>
            </div>
          </div>
        </div>
        <br/>
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
            <h5 class="mt-1" >
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
        <br />
        <br />

        <br />
      </va-card>
      <br />
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
      <br />
    </va-card>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule1 from "../../../../app/module1/services05";

export default {
  mounted() {

    this.getAllRecord();
    // this.getAllRecordConsultant();
    // this.getDistributorList();
    this.getDistributorMergeDetails();

    var data = localStorage.getItem("DIVE_ID");
    this.DIVE_ID = JSON.parse(data);

  },

  created () {
    this.getDistributorMergeDetails();
  },

  components: {},

  methods: {

    // search

    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    search1: debounce(function (term1) {
      this.term1 = term1;
      console.log(this.term1);
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
      this.$router.push("/distributor/DistributorDivestment-Submission");
    },

    // next button
    Verify: async function () {
      // this.$router.push("/distributor/DistributorDivestment-FundSubmission");
      const data = new FormData();
      if (this.model.Distributor.DISTRIBUTOR_ID == null) {
        alert("Please Select Distributor");
      } else {
        //fund & consultant
        const dive_id = this.DIVE_ID;
        data.append("DIVE_ID", JSON.parse(dive_id));

        data.append("DISTRIBUTOR_ID_TO", this.model.Distributor.DISTRIBUTOR_ID);
        data.append("TS_ID", "1"); // draft
        // data.append("DIVE_TYPE", "37");

        // const dive_id = this.DIVE_ID;
        // data.append("DIVE_ID", JSON.parse(dive_id));
        try {
          const response = await servicesModule1.fund_submission(data);
          let DIVE_ID = localStorage.getItem("DIVE_ID");
          localStorage.setItem("DIVE_ID", DIVE_ID);
          this.$router.push({
            name: "DIVE_ID",
            params: { USER_ID: this.model.Distributor.DISTRIBUTOR_ID },
          });
          this.$router.push(
            "/distributor/DistributorDivestment-EditFundConsultant-consultant"
          );

        } catch (error) {
          console.log(error);
        }
      }
    },

    // getDivesrmenttatus (fund)
    getStatusFund: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDivestmentFundStatus(JSON.parse(user).user_id);
      this.divestmentStatus = response;
      this.divestmentStatusCount = this.divestmentStatus.length;

      // alert(this.divestmentStatusCount);

      if (this.divestmentStatusCount != 0 ){
        alert(" You have draft application for fund ");
        this.$router.push("/distributor/DistributorDivestment-List");
      }else{
        this.ClearFundSelection();
        this.ClearConsSelection();
      }

      this.getAllRecord();
      this.getDistributorMergeDetails();

      // this.getStatusCons();

    },

    //Clear_Fund_Selection
    ClearFundSelection: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.ClearFundSelection(JSON.parse(user).user_id);
      this.clearFundSelection = response;
      this.clearFundSelectionCount = this.clearFundSelection.length;

    },

    //Clear_Fund_Selection
    ClearConsSelection: async function () {
      const user = localStorage.getItem("user");
      // alert(localStorage.getItem("user"));
      const response = await servicesModule1.ClearConsSelection(JSON.parse(user).user_id);
      this.clearConsSelection = response;
      this.clearConsSelectionCount = this.clearConsSelection.length;

    },

    // getDivesrmenttatus (consultant)
    getStatusCons: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDivestmentConsStatus(JSON.parse(user).user_id);
      this.divestmentStatus = response;
      this.divestmentStatusCount = this.divestmentStatus.length;

      // alert(this.divestmentStatusCount);

      if (this.divestmentStatusCount != 0 ){
        alert(" You have draft application for Consultant ");
        this.$router.push("/distributor/DistributorDivestment-List");
      }

      this.getAllRecord();

    },

    // getAllRecord (fund)
    getAllRecord: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_fund_list(
        JSON.parse(user).user_id
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;

      this.getDistributorList();
      this.getSelectedRecord();
      this.getDistributorMergeDetails();

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
    // get distributor list
    getDistributorList: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_fundDivestment(
        JSON.parse(user).user_id
      );
      this.DistributorRecords = response;
      this.DistributorCount = this.DistributorRecords.length;

      if ((this.RecordCount == 0 || this.RecordCount == null) && (this.RecordConsultantCount == 0 || this.RecordConsultantCount == null))
      {
        if (this.DistributorCount == 0 || this.DistributorCount == null) {
          alert("You are not eligible to do fund divestment");
          this.$router.push("/distributor/DistributorDivestment-Submission");
        } else {
          alert("There is no fund and consultant record to divest");
          this.$router.push("/distributor/DistributorDivestment-Submission");
        }
      } else if ((this.RecordCount == 0 || this.RecordCount == null) && (this.RecordConsultantCount != 0 || this.RecordConsultantCount != null))
      {
        if (this.DistributorCount == 0 || this.DistributorCount == null) {
          alert("You are not eligible to do fund divestment");
          // push to consultant
          this.$router.push("/distributor/DistributorDivestment-Consultant");
        } else {
          alert("There is no fund record to divest");
          // push to consultant
          this.$router.push("/distributor/DistributorDivestment-Consultant");
        }
      }
      // else if ((this.RecordCount != 0 || this.RecordCount != null) && (this.RecordConsultantCount == 0 || this.RecordConsultantCount == null))
      // {
      //   alert("There is no consultant record to divest");
      //   // push to fund
      //   this.$router.push("/distributor/DistributorDivestment-Fund");
      // }
    },

    // getAllRecord (fund)
    getSelectedRecord: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_selected_fund_list(
        JSON.parse(user).user_id
      );
      this.SelectionRecordList = response;
      this.SelectedRecordCount = this.SelectionRecordList.length;


    },
    test() {
      // console.log(document.getElementById("checkboxId_" + id).checked)
    },

    //add selection
    async addselection(data) {
      // alert(JSON.stringify((data).FUND_PROFILE_ID))
      const response = await servicesModule1.fund_add(data);
      this.getAllRecord();
      this.getSelectedRecord();
    },

    //remove selection
    async removeselected(data) {
      // alert(JSON.stringify((data).FUND_PROFILE_ID))
      const response = await servicesModule1.fund_remove(data);
      this.getAllRecord();
      this.getSelectedRecord();
    },


    //selectAll
    selectAll: async function() {

      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        const response = await servicesModule1.SelectAllFund(data);
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
        const response = await servicesModule1.UnselectAllFund(data);
        this.getAllRecord();
        this.getSelectedRecord();
      } catch (error) {
        console.log(error);
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
          name: "FUND_ASEAN_CIS",
          title: "CIS STRUCTURE",
          sortField: "FUND_ASEAN_CIS",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    RecordFields2() {
      return [
        {
          name: "__slot:no",
          title: "NO",
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
          name: "FUND_ASEAN_CIS",
          title: "CIS STRUCTURE",
          sortField: "FUND_ASEAN_CIS",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }
      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_FIMM.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_ASEAN_CIS.includes(v)
          );
      });
    },

    RecordFilteredData2() {
      if (!this.term1 || this.term1.length < 1) {
        return this.SelectionRecordList;
      }
      return this.SelectionRecordList.filter((item) => {
        return this.term1
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_FIMM.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_ASEAN_CIS.toLowerCase().includes(v)
          );
      });
    },

  },

  data() {
    return {
      field: [],
      term: null,
      term1: null,
      currentPage: 1,
      RecordList: [],
      SelectionRecordList:[],
      RecordConsultantList: [],
      count: 1,
      RecordCount: null,
      RecordConsultantCount: null,
      Distributor: "",
      DistributorRecords: [],
      selected: [],
      DIV_ID: [],
      perPage: "10",

      model: {
        Distributor: "",
        modelFilter: {
          DIST_NAME: "",
          FUND_CODE_FIMM: "",
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
                model: "modelFilter.FUND_CODE_FIMM",
                label: "Fund Name",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM1",
                label: "FIMM Fund Code",
                styleClasses: "col-md-3",
              },

              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM2",
                label: "CIS Structure",
                styleClasses: "col-md-3",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM3",
                label: "Asset Class",
                styleClasses: "col-md-3",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM4",
                label: "Fund Group",
                styleClasses: "col-md-3",
              },
            ],
          },
        ],
      },

      //distributor selection
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
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DistributorRecords; // get value
                },
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
