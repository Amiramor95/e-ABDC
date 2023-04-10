<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Management : Submission for verify</h4>
    </div>
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card>
        <div>
          <div>
            <div class="row">
              <div class="flex md2 offset--md10">
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
            <va-data-table
              :fields="Fields"
              :data="FilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              :datacount="RecordCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="document" slot-scope="row">
                <span>
                  <h4 class="mt-2">
                    <span
                      v-if="row.rowData.DOC_BLOB != '-'"
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
            </va-data-table>
          </div>
        </div>
      </va-card>
      <br />
    </div>
    <br />
     <va-card>
      <div class="ml-2 col-md-12">
        Transaction/Audit Log
        <button
          v-if="visibleLog == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleLog == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-3" class="mt-2" v-model="visibleLog">
          <div class="row">
            <div class="flex md2 offset--md10">
              <va-input
                :value="term2"
                :placeholder="$t('Search')"
                @input="search2"
                removable
              >
                <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
            </div>
          </div>
          <va-data-table
            :fields="caRecordFields"
            :data="caRecordFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="caRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="remarks" slot-scope="props">
              {{ props.rowData.APPR_REMARK }}
            </template>
            <template slot="updates" slot-scope="props">
              {{ props.rowData.LATEST_UPDATE }}
            </template>
          </va-data-table>
        </b-collapse>
      </div>
    </va-card>

    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Verification Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchema"
          :options="formOptions"
          ref="verificationForm"
        >
        </vue-form-generator>

        <br />
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="returnSubmission"
        type="button"
        style="background: #dc3546; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Return
      </button>

      <button
        @click="verifySubmission"
        type="button"
        style="background: #87cb16; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Verify
      </button>
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as services01Module5 from "../../../../app/module5/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import * as servicesModule4 from "../../../../app/module4/services01";


  export default {
    mounted() {
      var data = localStorage.getItem("navManagementManagerApproval");
      this.WDATA = JSON.parse(data);
      //alert(JSON.stringify(this.WDATA));

      this.getRecordList();
      this.getAuditLog();
    },
    components: {},

    methods: {
      // searh
      search: debounce(function (term) {
        this.term = term;
        console.log(this.term);
      }, 400),

      async back() {
        this.$router.go(-1);
      },

      getRecordList: async function () {
        const response = await services01Module5.getSubmissionRecordByID(
          this.WDATA.NAV_TEMP_MASTER_ID
        );
        this.CandidateList = response;
        this.RecordCount = this.CandidateList.length;
      },
      viewPdf(document) {
        var byteCharacters = window.atob(document["DOC_BLOB"]);
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

      getAuditLog: async function () {
      const response = await services01Module5.getDistAuditLog(
        this.WDATA.NAV_TEMP_MASTER_ID
      );
      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;

      },

    verifySubmission: async function () {
    if (confirm("Are you sure you want to verify and submit this submission?")) {
      const data = new FormData();

      data.append("APPR_REMARK", this.model.comment);
      data.append("APPR_PUBLISH_STATUS", 1);
      data.append("DIST_TS_ID", 4); //verified
      data.append("FIMM_TS_ID", 15);
      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(26, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));

      const user1 = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user1);

      data.append("NAV_TEMP_DIST_APPROVAL_ID", this.WDATA.NAV_TEMP_DIST_APPROVAL_ID);
      data.append("NAV_TEMP_MASTER_ID", this.WDATA.NAV_TEMP_MASTER_ID);



      //notification
      data.append("NOTI_LOCATION", "navManagementSubmissionList");
      var remarkEntry = "(NAV MANAGEMENT)New entry pending verification for " + res.DIST_NAME;
      data.append("NOTI_REMARK", remarkEntry);



      try {
        const response = await services01Module5.updateVerify(data);
        this.$router.push("/distributor/navManagementPendingVerificationList");
      } catch (error) {
        console.log(error);
      }
    }
    },
    returnSubmission: async function () {
      if (confirm("Are you sure you want to return this submission?")) {
        const data = new FormData();

        data.append("CA_APPROVAL_ID", this.EDITCONS.CA_APPROVAL_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "7");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //notification
        data.append("NOTI_LOCATION", "consultantAlert-overviewList");

        data.append("NOTI_REMARK", "(CA)This entry has been returned by HOD for ");

        try {
        //const response = await servicesModule3.updateApproval(data);

        //this.$router.push("/fimm/consultantAlert-hodLraRecordList");
        } catch (error) {
          console.log(error);
        }
      }
    },
    },

    computed: {
      Fields() {
        return [
          {
            name: "__slot:no",
            title: "NO",
          },

        {
          name: "NAV_SUBMIT_TIMESTAMP",
          title: "PUBLISH DATE",
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
          name: "TODAY_PRICE",
          title: "TODAY'S VERIFIED PRICE",
          dataClass: "justify-content-center",
        },
        {
          name: "NAV_VAL",
          title: "AMMEND PRICE",
          dataClass: "justify-content-center",
          width: "4%"
        },
        {
          name: "VALUATION_DATE",
          title: "VALUATION DATE",
          dataClass: "justify-content-center",
        },
        {
          name: "REMARK",
          title: "REMARK",
          dataClass: "justify-content-center",

        },
        {
          name: "__slot:document",
          title: "SUPPORTING DOCUMENT",
        },
        ];
      },
      FilteredData() {
        if (!this.term || this.term.length < 1) {
          return this.CandidateList;
        }
        return this.CandidateList.filter((item) => {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.FUND_CODE_FIMM.toLowerCase().includes(v)||
                item.FUND_CODE_MEMBER.toLowerCase().includes(v)||
                item.FUND_NAME.toLowerCase().includes(v)
            );
        });
      },

       RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Date",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "GROUP_NAME",
          title: "Group",
          sortField: "GROUP_NAME",
        },
        {
          name: "USER_NAME",
          title: "Creation By",
          sortField: "USER_NAME",
        },
        {
          name: "TS_PARAM",
          title: "Activity",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:remark",
          title: "Remarks/Comments",
        },
        {
          name: "LATEST_UPDATE",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
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
              item.USER_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.APPR_REMARK.toLowerCase().includes(v) ||
              item.GROUP_NAME.toLowerCase().includes(v)
          );
      });
    },

          //Audit og
       caRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Date",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "GROUP_NAME",
          title: "Group",
          sortField: "GROUP_NAME",
        },
        {
          name: "USER_NAME",
          title: "Creation By",
          sortField: "USER_NAME",
        },
        {
          name: "TS_PARAM",
          title: "Activity",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:remarks",
          title: "Remarks/Comments",
          sortField: "APPR_REMARK",
        },
        {
          name: "__slot:updates",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
        },
      ];
    },
    caRecordFilteredData() {
      if (!this.term2 || this.term2.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term2
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
            item.TS_PARAM.toLowerCase().includes(v)||
            item.USER_NAME.toLowerCase().includes(v)||
            item.GROUP_NAME.toLowerCase().includes(v)
          );
      });
    },
    },

    data() {
      return {
        visibleLog: true,

        dataUploadReady: false,
        term: null,
        CandidateList: [],
        perPage: "10",
        currentPage: 1,
        count: 1,
        RecordCount: null,
        WDATA: "",

        caRecordList: [],
        caRecordCount: null,
        term2: null,
        search2:"",


      RecordList: [],
      RecordCount: null,

      model: {
        comment: "",

      },

      reviewSchema: {
        fields: [
          {
            type: "textArea",
            model: "comment",
            label: "Remark/Comments",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark/Comments",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
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





