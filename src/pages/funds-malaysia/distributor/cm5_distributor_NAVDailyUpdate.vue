<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Daily Update</h4>
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
        :data="fundprofileRecordList"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="fundprofileRecordCount"
        :dataperpage="parseInt(perPage)"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="TODAYS_PRICE" slot-scope="row">
          <!-- <the-mask
            v-if="row.rowData.FUND_PROFILE_ID != FundProfileId"
            mask="#.####"
            v-model="row.rowData.TODAYS_PRICE"
          />
          <the-mask
            v-if="row.rowData.FUND_PROFILE_ID == FundProfileId"
            mask="#.####"
            v-model="UnitPrice"
          /> -->

          <the-mask mask="#.####" v-model="row.rowData.TODAYS_PRICE" />
          <!-- <the-mask  v-if="FundProfileId!=row.FUND_PROFILE_ID"  mask="#.####" />
           <the-mask  v-if="FundProfileId==row.FUND_PROFILE_ID"  mask="#.####" v-model="UnitPrice"  /> -->
        </template>
      </va-data-table>
      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <br />
      <br />
      <br />
      <div class="float-right" v-if="edit">
        <button
          @click="saveAsDraft"
          type="button"
          class="mr-2 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <button
          type="publish"
          class="btn btn-success btn-fill float-right btn-md"
          @click="onPublish"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Submit
        </button>
      </div>
    </va-card>
    <va-card v-if="edit">
      <h4 slot="header" class="card-title">Bulk Upload</h4>
      <br />
      <!-- <VueFileAgent
        :uploadUrl="'https://example.com'"
        :uploadHeaders="{}"
        :multiple="true"
        :deletable="true"
        :editable="false"
        :accept="'.xlsx,.csv'"
        :maxSize="'2MB'"
        :maxFiles="8"
        :helpText="'Select files'"
        :errorText="{
          type: 'Please select images, videos, pdf or zip files',
          size: 'You selected a larger file!',
        }"
        :thumbnailSize="120"
        :theme="'list'"
        @select="filesSelected2($event)"
        @beforedelete="onBeforeDelete2($event, 8)"
        v-model="fileRecords"
      ></VueFileAgent> -->
      <div id="app">
        <input type="file" @change="onChange" />
      </div>
    </va-card>
    <va-card v-if="edit">
      <button
        type="submit"
        class="btn btn-primary btn-fill float-right btn-md"
        @click="onSubmit"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Upload
      </button>
    </va-card>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";
import XLSX from "xlsx";
import Vue from "vue";
import TreeViewVue from "../../../components/ui/tree-view/TreeView.vue";
import moment from "moment";
export default {
  mounted() {
    this.obj = JSON.parse(localStorage.getItem("navupdatelist"));
    if (
      this.obj.Status.toString() == this.status.toString() ||
      this.obj.Status.toString() == this.status_pending.toString()
    ) {
      this.edit = false;
      this.getAllFundProfile1();
    } else if (this.obj.Status == "CREATE") {
      this.edit = true;
      this.getAllFundApplicationJoin();
    } else {
      this.getAllFundApplicationJoin();
      this.edit = true;
    }
  },
  components: {},
  data() {
    return {
      obj: {},
      UnitPrice: "",
      FundProfileId: 0,
      header: "",
      todaysprice: "",
      field: [],
      todaydate: "",
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      navSubmit: [],
      // classificationList: [],
      fundprofileRecordList: [],
      // fundProfileFilteredData: [],
      fundprofileRecordCount: null,
      count: 1,
      edit: false,
      status: "APPROVED",
      status_pending: "PENDING",
      status_create: "CREATE",
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
  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
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
    getAllFundProfile: async function () {
      const user = localStorage.getItem("user");
      var USER_DIST_ID = JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule5.getFundProfileActiveLodge(
        USER_DIST_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    getFundNavValue: async function () {},
    getAllFundApplicationJoin: async function () {
      this.todaydate = moment(new Date()).format("yyyy-MM-DD");
      if (this.obj.Status == "CREATE") {
        const response1 = await servicesModule5.getNAVListData();
        // this.fundprofileRecordList = response1;
        var list = [];
        response1.forEach(function (value) {
          // if (value.NAV_SUBMIT_TIMESTAMPS) {
          if (
            value.NAV_SUBMIT_TIMESTAMPS !=
            moment(new Date()).format("yyyy-MM-DD")
          ) {
            list.push(value);
            console.log(
              "updated list",
              value.FUND_PROFILE_ID,
              value.NAV_STATUS,
              value.NAV_SUBMIT_TIMESTAMPS
            );
          }
          // }
        });
        this.fundprofileRecordList = list;
      } else {
        const user = localStorage.getItem("navupdatelist");
        var NAV_SUBMIT_TIMESTAMP = JSON.parse(user).submission_date;
        var NAV_SUBMIT_TIMESTAMP2 =
          moment(NAV_SUBMIT_TIMESTAMP).format("YYYY-MM-DD");
        const response = await servicesModule5.getFundNavValue(
          NAV_SUBMIT_TIMESTAMP2
        );
        console.log("my price", response);

        const todaysprice = response[0].NAV_VAL.replace(/\./g, "");

        const response1 = await servicesModule5.getNAVListData();
        this.fundprofileRecordList = response1;
        var list = [];
        response1.forEach(function (value) {
          // if (value.NAV_SUBMIT_TIMESTAMPS) {
          if (
            value.NAV_SUBMIT_TIMESTAMPS !=
            moment(new Date()).format("yyyy-MM-DD")
          ) {
            list.push(value);
            console.log(
              "updated list",
              value.PREV_NAV_VAL,
              value.FUND_PROFILE_ID,
              value.NAV_STATUS,
              value.NAV_SUBMIT_TIMESTAMPS,
              value.NAV_SUBMIT_TIMESTAMP,
              value.NAV_VAL,
              value.TODAYS_PRICE
            );
          }
          // }
        });
        this.fundprofileRecordList = list;
        this.fundprofileRecordCount = this.fundprofileRecordList.length;
        this.fundprofileRecordList.forEach(function (value) {
          if (response.FUND_PROFILE_ID == value["FUND_PROFILE_ID"]) {
            // value["TODAYS_PRICE"] = this.response.NAV_VAL;
          }
        });
      }
    },
    getAllFundProfile1: async function () {
      const user = localStorage.getItem("user");
      const totalfund = localStorage.getItem("navupdatelist");
      var DIST_ID = JSON.parse(totalfund).DIST_ID;
      var NAV_SUBMIT_TIMESTAMP = moment(
        JSON.parse(totalfund).submission_date
      ).format("YYYY-MM-DD");
      var TS_PARAM = JSON.parse(totalfund).Status;
      console.log("my dist", DIST_ID);
      console.log("my TIME STAMP", NAV_SUBMIT_TIMESTAMP);
      console.log("my TIME STAMP", NAV_SUBMIT_TIMESTAMP);
      console.log("my TS_PARAM", TS_PARAM);
      const response = await servicesModule5.getNAVDailyListByTotalFund({
        DIST_ID,
        NAV_SUBMIT_TIMESTAMP,
        TS_PARAM,
      });
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    async onSubmit() {
      if (confirm("Are you sure to upload this ?")) {
        const user = localStorage.getItem("user");
        // const data = new FormData();
        // data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        // data.append("NAV_DATA",this.$refs.file.$files);

        let body = new FormData();
        body.append("file0", this.file);
        try {
          const response = await servicesModule5.submitExcel(body);
          alert("Bulk Upload Price Has Been Submitted");
          this.getAllFundApplicationJoin();
          this.back();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },
    async onPublish() {
      if (confirm("Are you sure to submit this ?")) {
        this.fundprofileRecordList.forEach(function (value) {
          if (value["TODAYS_PRICE"]) {
              value["TODAYS_PRICE"].replace(/\./g, "");
            }
        });
        // console.log('')
        const user = localStorage.getItem("user");
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("NAV_DATA", JSON.stringify(this.fundprofileRecordList));
        data.append("IS_SUBMIT", 2);
        try {
          const response = await servicesModule5.submitNAV(data);
          alert("NAV Daily Price Has Been Submitted");
          // this.getAllFundProfile();
          this.getAllFundApplicationJoin();
          this.back();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },
    async saveAsDraft() {
      if (confirm("Are you sure to save as draft ?")) {
        // if (confirm("Are you sure to submit this ?")) {
          this.fundprofileRecordList.forEach(function (value) {
            if (value["TODAYS_PRICE"]) {
              value["TODAYS_PRICE"].replace(/\./g, "");
            }
          });
          console.log("list", this.fundprofileRecordList);
          const user = localStorage.getItem("user");
          const data = new FormData();
          data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
          data.append("NAV_DATA", JSON.stringify(this.fundprofileRecordList));
          console.log(
            "todaysprice",
            JSON.stringify(this.fundprofileRecordList)
          );
          data.append("IS_SUBMIT", 1);
          try {
            const response = await servicesModule5.submitNAV(data);
            alert("Current NAV Daily Price Has Been save as draft");
            //  this.getAllFundProfile();

            this.getAllFundApplicationJoin();
            this.back();
          } catch (e) {
            console.log(e);
          }
        // }
      } else {
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
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
          width: "8%",
        },
        {
          name: "FUND_CODE_MEMBER",
          title: "MEMBER FUND CODE",
          sortField: "FUND_CODE_MEMBER",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "FUND_NAME_SHORT",
          title: "FUND SHORT NAME",
          sortField: "FUND_NAME_SHORT",
        },

        {
          name: "PREV_NAV_VAL",
          title: "PREVIOUS PRICE",
          sortField: "PREV_NAV_VAL",
        },
        {
          name: "__slot:TODAYS_PRICE",
          title: "TODAY'S PRICE",
          dataClass: "justify-content-center",
          width: "15%",
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
          .every((v) => item.FUND_NAME.includes(v));
      });
    },
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
