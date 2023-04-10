<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">
          List of Fund Submission (UTMC/PRP)
        </h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <span v-b-tooltip.hover title="Advanced Search">
              <h5>
                <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
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
            @click="filterSpecificFundProfile"
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
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="status" slot-scope="props">
            <a v-if="props.rowData.TS_PARAM == 'PENDING'">
              APPROVED
            </a>
            <a v-if="props.rowData.TS_PARAM == 'NEW ENTRY'">
              NEW ENTRY
            </a>
            <a v-if="props.rowData.TS_PARAM == 'ACTIVE'">
              ACTIVE
            </a>
            <a v-if="props.rowData.TS_PARAM == 'REJECTED'">
              REJECTED
            </a>
            <a v-if="props.rowData.TS_PARAM == 'RETURNED'">
              RETURNED
            </a>
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
    localStorage.removeItem("FUNDPROFILE");

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
    async filterSpecificFundProfile() {
      this.statusLoad = true;
      console.log('begin filter');
      const user = localStorage.getItem("user");
      var data = JSON.parse(user).USER_DIST_ID;
      try {
        const response = await servicesModule5.fund_profile_review_FIMM_filter(
          data,1,this.model.modelFilter.FUND_CODE_FIMM,this.model.modelFilter.FUND_CODE_MEMBER,this.model.modelFilter.FUND_NAME,this.model.modelFilter.UMBRELLA_FUND_NAME
        );
        if (response !== "error") {
          this.fundprofileRecordList = response;
          this.fundprofileRecordCount = this.fundprofileRecordList.length;
        }
      } catch (error) {}
      this.statusLoad = false;
    },

    async reset () {
      this.statusLoad = true;
      const user = localStorage.getItem("user");
      var data = JSON.parse(user).USER_DIST_ID;
      this.getAllFundProfile(data,1);
      this.model.modelFilter.FUND_CODE_FIMM = '';
      this.model.modelFilter.FUND_CODE_MEMBER = '';
      this.model.modelFilter.FUND_NAME = '';
      this.model.modelFilter.UMBRELLA_FUND_NAME = '';
    },
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
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllFundProfile: async function () {
      const user = localStorage.getItem("user");
      var USER_DIST_ID = JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule5.getFundProfileReview(USER_DIST_ID);
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      this.$router.push({
        name: "fundCreationSecondLevelReview",
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
          name: "CREATION_DATE",
          title: "SUBMISSION DATE",
          sortField: "CREATION_DATE",
          width: "8%",
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_CODE_MEMBER",
          title: "MEMBER FUND CODE",
          sortField: "FUND_CODE_MEMBER",
        },
        {
          name: "FUND_PROFILE_NAME",
          title: "FUND NAME",
          sortField: "FUND_PROFILE_NAME",
        },
        {
          name: "UMBRELLA_FUND_NAME",
          title: "UMBRELLA FUND NAME",
          sortField: "UMBRELLA_FUND_NAME",
        },
        // {
        //   name: "TS_PARAM",
        //   title: "STATUS",
        //   sortField: "TS_PARAM",
        // },
        {
          name: "__slot:status",
          title: "STATUS",
          dataClass: "justify-content-center",
          width: "8%",
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
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_CODE_MEMBER.includes(v) ||
              item.FUND_PROFILE_NAME.includes(v) ||
              item.UMBRELLA_FUND_NAME.includes(v)
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
      statusLoad: true,

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
