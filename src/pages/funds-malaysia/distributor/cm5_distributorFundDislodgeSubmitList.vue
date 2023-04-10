<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">List of Fund Dislodgement</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <span v-b-tooltip.hover>
              <!-- <span
              v-b-tooltip.hover
              title="Create Fund Lodgement"
              v-on:click="create"
              class="badge badge-primary"
            >
              <i class="fa fa-plus"></i
            ></span> -->
            </span>
          </div>
        </div>
      </div>

      <br />
      <div class="float-left">
        <div class="input-group">
          <div class="flex md6">
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
      <br />

      <div class="float-right">
        <div class="">
          <h5>
            <span
              v-b-tooltip.hover
              title="Approved"
              class="badge badge-success mr-2"
            >
              <i class="fa fa-check-circle"></i
            ></span>

            <span
              v-b-tooltip.hover
              title="Change View List"
              class="badge badge-primary"
            >
              <i class="fa fa-exchange"></i
            ></span>
          </h5>
        </div>
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
            <label class="form-checkbox">
              <input
                v-if="
                  row.rowData.TS_PARAM_SECOND != 'APPROVED' &&
                  row.rowData.TS_PARAM_SECOND != 'REJECTED'
                "
                type="checkbox"
                v-model="selected"
                :value="row.rowData"
              />
              <i class="form-icon"></i>
            </label>
          </template>
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
                title="edit"
                v-on:click="viewRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-eye"></i
              ></span>
            </h5>
          </template>
        </va-data-table>
        <br />
        <div>
          <vue-form-generator
            :model="model"
            :schema="schema"
            :options="formOptions"
            ref="ReviewRemark"
          >
          </vue-form-generator>
        </div>

        <br />
        <br />
        <br />
        <div class="float-left">
          <button
            @click="back"
            type="button"
            class="btn btn-primary btn-fill btn-md mr-2"
          >
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
        </div>
        <div class="float-right">
          <button
            type="submit"
            class="btn btn-danger btn-fill btn-md mr-2"
            @click="reject"
          >
            <i class="fa fa-reply" /> &nbsp; Reject
          </button>
          <button
            @click="submit"
            type="button"
            class="btn btn-primary btn-fill btn-md mr-2"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Approve
          </button>
        </div>
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
    // searh
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
    async reject() {
      if (confirm("Are you sure to Reject this fund dislodgement ?")) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_USER_ID", JSON.parse(user).user_id);
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("REMARK", this.model.Remark);
        data.append("APPROVAL_LODGE", JSON.stringify(this.selected));
        data.append("TS_STATUS", 5);
        data.append("BULK_APPROVAL", 1);
        try {
          const response = await servicesModule5.approveFundDisLodgeDist(data);
          alert("Fund Dislodgement request has been rejected");
          this.getAllFundLodgement();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },

    async submit() {
      console.log(this.selected);
      if (confirm("Are you sure to Approve this fund dislodgement ?")) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_USER_ID", JSON.parse(user).user_id);
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("REMARK", this.model.Remark);
        data.append("APPROVAL_LODGE", JSON.stringify(this.selected));
        data.append("TS_STATUS", 3);
        data.append("BULK_APPROVAL", 1);
        try {
          const response = await servicesModule5.approveFundDisLodgeDist(data);
          alert("Fund Dislodgement request has been approved ");
          this.getAllFundLodgement();
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    },
    // getAllRecord
    getAllFundLodgement: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule5.getAllFundDislodgement(
        JSON.parse(user).USER_DIST_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      this.$router.push({
        name: "fundDisLodgementFMReview",
        params: { FUNDPROFILE: data },
      });
    },
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },
  },

  computed: {
    fundProfile() {
      return [
        {
          name: "__slot:chkApprove",
          width: "10px",
          dataClass: "text-center",
        },
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
      selected: [],
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
        Remark: "",
      },
      schema: {
        fields: [
          {
            type: "textArea",
            label: "Remark",
            model: "Remark",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Enter Remark",
            styleClasses: "col-md-12",
            required: true,
            validator: "string",
          },
        ],
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
