<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Daily Fund Price Verification</h4>
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
        <template slot="chkApprove" slot-scope="row">
          <label class="form-checkbox" v-if="!Isshow">
            <input type="checkbox" v-model="selected" :value="row.rowData" />
            <i class="form-icon"></i>
          </label>
        </template>
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
      </va-data-table>

      <br />
      <br />
      <br />

      <vue-form-generator v-if="!Isshow"
        :model="model"
        :schema="remarkSchema"
        :options="formOptions"
        ref="reviewForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
      <br />

      <br />

      <br />

      <div class="float-right" v-if="!Isshow">
        <button
          type="submit"
          class="btn btn-primary btn-fill float-right btn-md"
          @click.prevent="onSubmit"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Verify
        </button>
        <button
          type="submit"
          class="mr-2 btn btn-warning btn-fill btn-md"
          @click.prevent="returnCase"
        >
          <i class="fa fa-reply" /> &nbsp; Return
        </button>
      
      </div>
      <div class="float-left">
           <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      </div>
    </va-card>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";
import moment from "moment";

export default {
  mounted() {
    // Window.alert("manish");
    this.getAllFundProfile1();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    // search
    search: debounce(function(term) {
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
        const response = await servicesModule5.getNAVdata(
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
    getAllFundProfile: async function() {
      const user = localStorage.getItem("user");
      var USER_DIST_ID = JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule5.getNAVApprovalList(USER_DIST_ID);
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
     getAllFundProfile1: async function () {
       const totalfund = localStorage.getItem("navupdatelist");
      const user = localStorage.getItem("user");
      console.log("my details",JSON.parse(totalfund));
      if(JSON.parse(totalfund).Status=="APPROVED" ||JSON.parse(totalfund).Status=="RETURNED"){
        this.Isshow=true;
      }
      var DIST_ID = JSON.parse(totalfund).DIST_ID;
      var NAV_SUBMIT_TIMESTAMP =moment( JSON.parse(totalfund).submission_date).format("YYYY-MM-DD");
      var TS_PARAM = JSON.parse(totalfund).Status;
      console.log('my dist',DIST_ID);
          // console.log('my TIME STAMP',NAV_SUBMIT_TIMESTAMP);
          //  console.log('my TIME STAMP',NAV_SUBMIT_TIMESTAMP);
            // console.log('my TS_PARAM',TS_PARAM);
      const response = await servicesModule5.getNAVApprovalListByFundItem(
        {DIST_ID,NAV_SUBMIT_TIMESTAMP,TS_PARAM}
      );
      console.log('response manish',response);
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async onSubmit() {
      if (confirm("Are Sure to verify this?")) {
        const user = localStorage.getItem("user");
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("USER_ID", JSON.parse(user).user_id);
        data.append("APPR_STATUS", 14);
        data.append("REMARK", this.model.remark);
        data.append("SELECTED", JSON.stringify(this.selected));
        try {
          const response = await servicesModule5.updateNAVApproval(data);
          alert("NAV Daily Price Has Been verified");
          this.back();
          // this.getAllFundProfile();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },
    async returnCase() {
      if (confirm("Are Sure to return?")) {
        const user = localStorage.getItem("user");
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("USER_ID", JSON.parse(user).user_id);
        data.append("APPR_STATUS", 8);
        data.append("REMARK", this.model.remark);
        data.append("SELECTED", JSON.stringify(this.selected));
        try {
          if (confirm("Are sure to return this NAV daily update ?")) {
            const response = await servicesModule5.updateNAVApproval(data);
            alert("Submitted NAV Daily Price Has Been returned");
            this.back();
            // this.getAllFundProfile();
          }
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    }
  },

  computed: {
    fundProfile() {
      return [
        {
          name: "__slot:chkApprove",
          width: "10px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "NO"
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
          width: "8%"
        },
        {
          name: "FUND_CODE_MEMBER",
          title: "MEMBER FUND CODE",
          sortField: "FUND_CODE_MEMBER"
        },
        {
          name: "FUND_NAME_SHORT",
          title: "FUND SHORT NAME",
          sortField: "FUND_NAME_SHORT"
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME"
        },
        {
          name: "PREV_NAV_VAL",
          title: "PREVIOUS PRICE",
          sortField: "PREV_NAV_VAL"
        },
        {
          name: "NAV_VAL",
          title: "TODAY'S VERIFIED PRICE",
          dataClass: "justify-content-center",
          width: "15%"
        },
        {
          name: "VARIANCE",
          title: "VARIANCE",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    fundProfileFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter(item => {
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every(v => item.FUND_NAME.includes(v));
      });
    }
  },

  data() {
    return {
      Isshow:false,
      selected: [],
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
       edit: false,
      status: "APPROVED",
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,

      model: {
        remark: "",
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: ""
        }
      },
      remarkSchema: {
        fields: [
          {
            type: "textArea",
            model: "remark",
            label: "Remark/Comment",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
          }
        ]
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
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_MEMBER",
                label: "Member Fund Code",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_NAME",
                label: "Fund Name",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.UMBRELLA_FUND_NAME",
                label: "Umbrella Fund Name",
                styleClasses: "col-md-6"
              }

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
