<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Candidate Acceptance : Update Registration Upload
      </h4>
    </div>
    <br />
    <br />
    <br />
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
            <template slot="type" slot-scope="props">
              <span
                v-b-tooltip.hover
                v-if="props.rowData.STAFF_OR_AGENT == '1'"
              >
                STAFF
              </span>
              <span
                v-b-tooltip.hover
                v-if="props.rowData.STAFF_OR_AGENT == '2'"
              >
                AGENT
              </span>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="View Record"
                  v-on:click="deleteRecord(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h5>
            </template>
          </va-data-table>
          <br />
          <br />
          <br />
          <br />
          <div>
            <table class="table table-striped"></table>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">
                    <b
                      >Total Accepted List
                      <downloadExcel
                        :json_data="candidateAcceptedList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="columnAccept"
                      ></downloadExcel>
                    </b>
                  </td>
                  <td style="width: 1%">:</td>
                  <td>{{ this.acceptedCount }}</td>
                </tr>
                <tr>
                  <td style="width: 20%">
                    <b
                      >Total Rejected List
                      <downloadExcel
                        :json_data="candidateRejectedList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="column"
                      ></downloadExcel>
                    </b>
                  </td>
                  <td style="width: 1%">:</td>
                  <td>{{ this.rejectedCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="reject"
        type="button"
        style="background: #ff4a55; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-ban" /> &nbsp; Discard
      </button>
      <button
        @click="accept"
        type="button"
        style="background: #87cb16; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Accept
      </button>
    </div>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted() {
    var data = localStorage.getItem("edit-candidateAcceptanceUpload");
    this.DPDATA = JSON.parse(data);

    this.getAcceptanceList();
  },
  components: {},

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    getAcceptanceList: async function () {
      const response = await servicesModule1.getCandidateListByDistID(
        this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.CandidateList = response;
      this.RecordCount = this.CandidateList.length;

      const responseReject = await servicesModule1.getRejectedListByID(
        this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.candidateRejectedList = responseReject;
      this.rejectedCount = this.candidateRejectedList.length;

      const responseAccept = await servicesModule1.getAcceptedListByID(
        this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.candidateAcceptedList = responseAccept;
      this.acceptedCount = this.candidateAcceptedList.length;
    },

    async back() {
      this.$router.go(-1);
    },

    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule1.deleteCandidate(
          data.ACCEPTANCE_DETAILS_ID
        );
        this.getAcceptanceList();
      }
    },

    reject: async function () {
      if (confirm("Are you sure you want to discard this list?")) {
        try {
          const response = await servicesModule1.discardRecord(
            this.DPDATA.CANDIDATE_ACCEPTANCE_ID
          );

          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
    },
    accept: async function () {
      if (confirm("Are you sure you want to accept this list?")) {
        const data = new FormData();
        data.append(
          "CANDIDATE_ACCEPTANCE_ID",
          this.DPDATA.CANDIDATE_ACCEPTANCE_ID
        );
        try {
          const response = await servicesModule1.acceptRecord(data);
          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
    },

       getAcceptanceList: async function () {
      const response = await servicesModule1.getCandidateListByDistID(
        this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.CandidateList = response;
      this.RecordCount = this.CandidateList.length;

      const responseReject = await servicesModule1.getRejectedListByID(
       this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.candidateRejectedList = responseReject;
      this.rejectedCount = this.candidateRejectedList.length;

      const responseAccept = await servicesModule1.getAcceptedListByID(
        this.DPDATA.CANDIDATE_ACCEPTANCE_ID
      );
      this.candidateAcceptedList = responseAccept;
      this.acceptedCount = this.candidateAcceptedList.length;
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
          name: "CANDIDATE_NAME",
          title: "CANDIDATE NAME",
          sortField: "CANDIDATE_NAME",
        },
        {
          name: "CANDIDATE_NRIC",
          title: "NRIC NUMBER",
          sortField: "CANDIDATE_NRIC",
        },
        {
          name: "CANDIDATE_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CANDIDATE_PASSPORT_NO",
        },
        {
          name: "CANDIDATE_PHONENO",
          title: "PHONE NUMBER",
          sortField: "CANDIDATE_PHONENO",
        },
        {
          name: "TYPE_SCHEME",
          title: "LICENSE TYPE",
          sortField: "TYPE_SCHEME",
        },
        {
          name: "__slot:type",
          title: "STAFF OR AGENT",
          sortField: "STAFF_OR_AGENT",
        },
        {
          name: "SET_PARAM",
          title: "CONSULTANT ALERT STATUS",
          sortField: "SET_PARAM",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "5%",
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
              item.CANDIDATE_NAME.toLowerCase().includes(v) ||
              item.CANDIDATE_NRIC.toLowerCase().includes(v) ||
              item.CANDIDATE_PASSPORT_NO.toLowerCase().includes(v) ||
              item.CANDIDATE_EMAIL.toLowerCase().includes(v) ||
              item.CANDIDATE_PHONENO.toLowerCase().includes(v) ||
              item.TYPE_SCHEME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      term: null,
      CandidateList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      rejectedCount: null,
      acceptedCount: null,
      DPDATA: "",

      candidateRejectedList: [],
      column: [
        "NAME",
        "NRIC_NUMBER",
        "PASSPORT_NUMBER",
        "EMAIL",
        "PHONE_NUMBER",
        "LICENSE_TYPE",
        "STAFF_OR_AGENT",
        "REASON",
      ],
      excelname: "download-RejectedList",
      sheetname: "RejectedList",

      candidateAcceptedList: [],
      columnAccept: [
        "NAME",
        "NRIC_NUMBER",
        "PASSPORT_NUMBER",
        "EMAIL",
        "PHONE_NUMBER",
        "LICENSE_TYPE",
        "STAFF_OR_AGENT",
        "CONSULTANT_ALERT_STATUS",
      ],
      excelname: "download-AcceptedList",
      sheetname: "AcceptedList",

      model: {},
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>





 