<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Approval Review</h4>
      <br />
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
            <input type="checkbox" v-model="selected" :value="row.rowData" />
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
                class="badge badge-info mr-2"
              >
                <i class="fa fa-file-pdf-o"></i
              ></span>
            </h4>
          </span>
        </template>
      </va-data-table>

      <br />
      <br />
      <div v-if="NAVDATA.FIMM_TS_ID == 15">
        <vue-form-generator
          :model="model"
          :schema="remarkSchema"
          :options="formOptions"
          @model-updated="onModelUpdated"
          ref="statusForm"
        >
        </vue-form-generator>
      </div>
      <div v-if="NAVDATA.DIST_TS_ID != 15">
        <table>
          <tr>
            <td style="width: 10%">
              <b>Remarks By Fund Manager</b>
            </td>
            <td style="width: 1%">:</td>
            <td>
              {{ NAVDATA.FM_REMARK1 }}
            </td>
          </tr>
          <tr v-if="NAVDATA.FIMM_TS_ID != 15 && NAVDATA.FIMM_TS_ID != null">
            <td style="width: 10%">
              <b>Remarks By FiMM ID</b>
            </td>
            <td style="width: 1%">:</td>
            <td>
              {{ NAVDATA.ID_REMARK1 }}
            </td>
          </tr>

          <tr v-if="NAVDATA.FIMM_TS_ID != 15 && NAVDATA.FIMM_TS_ID != null">
            <td style="width: 10%">
              <b>Remarks By FiMM HOD ID</b>
            </td>
            <td style="width: 1%">:</td>

            <td>
              {{ NAVDATA.HOD_ID_REMARK1 }}

              {{ NAVDATA.HOD_ID_REMARK2 }}
            </td>
          </tr>
          <tr v-if="NAVDATA.TS_PARAM == 'SUSPENSION'">
            <td style="width: 10%">
              <b>Remarks By FiMM IDS</b>
            </td>
            <td style="width: 1%">:</td>
          </tr>
        </table>
      </div>
      <br />
      <br />
      <div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill float-left btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </div>
      <div class="float-right" v-if="NAVDATA.FIMM_TS_ID == 15">
        <button
          type="submit"
          class="btn btn-primary btn-fill float-right btn-md"
          @click.prevent="onSubmit"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Approve
        </button>
        <button
          @click="reject"
          type="button"
          class="mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-ban" /> &nbsp; Reject
        </button>
        <button
          type="submit"
          class="mr-2 btn btn-warning btn-fill btn-md"
          @click.prevent="returnCase"
        >
          <i class="fa fa-reply" /> &nbsp; Return
        </button>
      </div>
    </va-card>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";
import * as services06Module0 from "../../../app/module0/services06";

export default {
  props: {
    NAVDATA: {},
  },
  mounted() {
    var data = localStorage.getItem("NAVDATA");
    this.NAVDATA = JSON.parse(data);
    console.log("my data", this.NAVDATA);
    this.getAllFundProfile();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    // // advanceSearch
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getAllClassification()
    //   this.classificationList = response
    // },

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
    getAllFundProfile: async function () {
      const NAVDATA = localStorage.getItem("NAVDATA");
      const response = await servicesModule5.getForNAVManageSubmitData(
        JSON.parse(NAVDATA).NAV_TEMP_BULK_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async onSubmit() {
      try {
        if (confirm("Are Sure to approve this?")) {
          const data = new FormData();
          const user = localStorage.getItem("user");
          const NAVDATA = localStorage.getItem("NAVDATA");
          data.append("NAV_TEMP_BULK_ID", JSON.parse(NAVDATA).NAV_TEMP_BULK_ID);

          data.append("USER_ID", JSON.parse(user).user_id);

          data.append("APPR_REMARK_HOD_ID", this.model.REMARKS_COMMENTS);
          data.append(
            "APPR_ADD_REMARK_HOD_ID",
            this.model.ADD_REMARKS_COMMENTS
          );
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("HOD_ID_TS_ID", "3");
          data.append("TS_ID", "3");
          //notification
          data.append("NOTI_LOCATION", "navManagementList");

          data.append("NOTI_REMARK", "(DIST) NAV Management Submission Approved");
          const approvalLevel = await services06Module0.getApprovalLevelDistributor(26, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));
          const response = await servicesModule5.submitTempNavApprovalHODID(
            data
          );
          alert(
            "NAV Daily update has been approved and dashboard notification has been sent."
          );
          this.$router.push("navManagementHodIdCompanyList");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async returnCase() {
      try {
        if (confirm("Are Sure to return?")) {
          const data = new FormData();
          const user = localStorage.getItem("user");
          const NAVDATA = localStorage.getItem("NAVDATA");
          data.append("NAV_TEMP_BULK_ID", JSON.parse(NAVDATA).NAV_TEMP_BULK_ID);

          data.append("USER_ID", JSON.parse(user).user_id);

          data.append("APPR_REMARK_HOD_ID", this.model.REMARKS_COMMENTS);
          data.append(
            "APPR_ADD_REMARK_HOD_ID",
            this.model.ADD_REMARKS_COMMENTS
          );
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("HOD_ID_TS_ID", "8");
          data.append("TS_ID", "8");
          const response = await servicesModule5.submitTempNavApprovalHODID(
            data
          );
          alert("Submitted NAV update has been returned.");
          this.$router.push("navManagementHodIdCompanyList");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async reject() {
      try {
        if (confirm("Are Sure to reject?")) {
          const data = new FormData();
          const user = localStorage.getItem("user");
          const NAVDATA = localStorage.getItem("NAVDATA");
          data.append("NAV_TEMP_BULK_ID", JSON.parse(NAVDATA).NAV_TEMP_BULK_ID);

          data.append("USER_ID", JSON.parse(user).user_id);

          data.append("APPR_REMARK_HOD_ID", this.model.REMARKS_COMMENTS);
          data.append(
            "APPR_ADD_REMARK_HOD_ID",
            this.model.ADD_REMARKS_COMMENTS
          );
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("HOD_ID_TS_ID", "5");
          data.append("TS_ID", "5");
          const response = await servicesModule5.submitTempNavApprovalHODID(
            data
          );
          alert("Submitted NAV update has been rejected.");
          this.$router.push("navManagementHodIdCompanyList");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: {
    fundProfile() {
      return [
        // {
        //   name: "__slot:chkApprove",
        //   width: "10px",
        //   dataClass: "text-center"
        // },
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAV_SUBMIT_TIMESTAMP",
          title: "DATE",
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
          name: "FUND_NAME_SHORT",
          title: "FUND SHORT NAME",
          sortField: "FUND_NAME_SHORT",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "NAV_VAL",
          title: "TODAY'S VERIFIED PRICE",
          dataClass: "justify-content-center",
          width: "15%",
        },
        {
          name: "AMMEND_PRICE",
          title: "AMMEND PRICE",
          dataClass: "justify-content-center",
          width: "4%",
        },
        {
          name: "VALUATION_DATE",
          title: "VALUATION DATE",
          dataClass: "justify-content-center",
          width: "15%",
        },
        {
          name: "REASON_REMARK",
          title: "REMARK",
          dataClass: "justify-content-center",
          width: "15%",
        },
        {
          name: "__slot:document",
          title: "SUPPORTING DOCUMENT",
          width: "5%",
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

  data() {
    return {
      NAVDATA: "",
      selected: [],
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

      model: {
        REMARKS_COMMENTS: "",
        ADD_REMARKS_COMMENTS: "",
      },
      remarkSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                required: true,
                rows: 8,
                max: 1000,
                hint: "Maximum characters of 1000",
                label: "Remarks / Comments",
                model: "REMARKS_COMMENTS",
                placeholder: "Enter Remarks or Comments",
                styleClasses: "col-md-12",
              },
              {
                type: "textArea",
                required: true,
                rows: 8,
                max: 1000,
                hint: "Maximum characters of 1000",
                label: "Additional Remarks / Comments",
                model: "ADD_REMARKS_COMMENTS",
                placeholder: "Enter Remarks or Comments",
                styleClasses: "col-md-12",
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
