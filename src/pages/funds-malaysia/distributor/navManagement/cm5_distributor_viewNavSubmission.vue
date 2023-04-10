<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Management : View Record</h4>
    </div>
    <br />
    <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width:15%">Submission Date</td>
                <td style="width:1%">:</td>
                <td>{{this.WDATA.SUBMISSION_DATE}}</td>
              </tr>
              <tr>
                <td>FIMM Remark</td>
                <td>:</td>
                <td>{{this.WDATA.FIMM_REMARK}}</td>
              </tr>
              <tr>
                <td>Action by Fimm</td>
                <td>:</td>
                <td>{{this.WDATA.FIMM_TS_PARAM}}</td>
              </tr>
            </tbody>
    </table>
    <br>
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
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>

  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as services01Module5 from "../../../../app/module5/services01";


  export default {
    mounted() {
      var data = localStorage.getItem("viewNavManagementSubmission");
      this.WDATA = JSON.parse(data);

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
      search2: debounce(function (term2) {
        this.term2 = term2;
        console.log(this.term2);
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

      model: {


      },



        formOptions: {
          validateAfterChanged: true,
        },
      };
    },
  };
</script>





