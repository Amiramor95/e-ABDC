<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Post-Vetting : List of Participants
      </h4>
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
        <div class="ml-2 col-md-12">
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
            :fields="PartFields"
            :data="PartFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="partRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="delete record"
                  v-on:click="removePart(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
          <br />
          <br />
          <div>
            <table class="table table-striped"></table>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">
                    <b
                      >Total Rejected List
                      <downloadExcel
                        :json_data="RejectedList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="column"
                      ></downloadExcel>
                    </b>
                  </td>
                  <td>:</td>
                  <td>{{ this.rejectedCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <br />
          <span class="ml-2 col-md-12" style="text-align: center"
            ><b>Option 1 : Upload Participant By Excel</b></span
          >
          <br />
          <div class="ml-1 col-md-12">
            <vue-form-generator
              :model="model"
              :schema="participantUploadSchema"
              :options="formOptions"
              ref="participantUploadForm"
            >
            </vue-form-generator>
            <br />
            <div class="float-right">
              <button
                @click="uploadReplace"
                type="button"
                style="background: #dc3546; color: #ffffff"
                class="ml-1 btn btn-fill btn-md"
              >
                <i class="fa fa-refresh" /> &nbsp; Replace All
              </button>
              <button
                @click="uploadAmend"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Amend Participant
              </button>
            </div>
            <br />
            <br />
            <span style="text-align: center"
              ><b>Option 2 : By Individual</b></span
            >
            <br />
            <br />
            <vue-form-generator
              :model="model"
              :schema="participantSchema"
              :options="formOptions"
              ref="participantForm"
            >
            </vue-form-generator>
            <br />
            <table class="ml-3 table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">NAME</td>
                  <td style="width: 1%">:</td>
                  <td>{{ name }}</td>
                </tr>
                <tr>
                  <td>NRIC NUMBER</td>
                  <td>:</td>
                  <td>{{ nric }}</td>
                </tr>
                <tr>
                  <td>PASSPORT NUMBER</td>
                  <td>:</td>
                  <td>{{ passport }}</td>
                </tr>
                <tr>
                  <td>REMARK</td>
                  <td>:</td>
                  <td>{{ existed }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div class="float-right">
              <button
                @click="searchParticipant"
                type="button"
                class="ml-1 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-search" /> &nbsp; Search Record
              </button>
              <button
                v-if="
                  this.existed != 'RECORD EXISTED' &&
                  this.existed != 'RECORD NOT FOUND'
                "
                @click="addParticipant"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Add Participant
              </button>
            </div>
          </div>
        </div>
      </va-card>
    </div>
    <br />
    <div v-if="dataActionReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <div class="float-right">
        <button
          @click="saveAsDraft"
          type="button"
          class="m1-1 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <button
          @click="submit"
          type="button"
          class="ml-1 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Submit
        </button>
      </div>
    </div>
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";

export default {
  props: {},
  mounted() {
    this.getAllParticipant();
    this.getRejectedList();
    this.checkRunNo();
  },
  components: {},
  methods: {
      checkRunNo: async function () {
      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);
      const response = await servicesModule4.checkRunNo(res.USER_DIST_ID);
    },

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //get participant
    getAllParticipant: async function () {
      this.dataUploadReady = true;
      const response = await servicesModule4.getProgramParticipantByID(
        localStorage.getItem("d-postVettingRepeatedViewParticipant")
      );
      this.partList = response;
      this.partRecordCount = this.partList.length;
      this.dataUploadReady = false;
    },

    //participant
    async removePart(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteParticipant(
          data.PROG_PARTICIPANT_ID
        );
        this.getAllParticipant();
      }
    },

    getRejectedList: async function () {
      const response = await servicesModule4.getRejectedListByID(
        localStorage.getItem("d-postVettingRepeatedViewParticipant")
      );
      this.RejectedList = response;
      this.rejectedCount = this.RejectedList.length;
    },

    //upload participant
    async uploadAmend() {
      if (confirm("Are you sure to amend the participant list?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append(
          "PROG_DETAILS_ID",
          localStorage.getItem("d-postVettingRepeatedViewParticipant")
        );
        data.append("UPLOAD_TYPE", "1");

        try {
          const response = await servicesModule4.importExcelPostVetUpdate(data);
          //this.$router.go(-1);
          this.getAllParticipant();
          this.getRejectedList();

          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async uploadReplace() {
      if (confirm("Are you sure to replace all the participant list?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append(
          "PROG_DETAILS_ID",
          localStorage.getItem("d-postVettingRepeatedViewParticipant")
        );
        data.append("UPLOAD_TYPE", "2");

        try {
          const response = await servicesModule4.importExcelPostVetUpdate(data);
          //this.$router.go(-1);
          this.getAllParticipant();
          this.getRejectedList();

          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async addParticipant() {
      if (confirm("Are you sure to add this participant?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append(
          "PROG_DETAILS_ID",
          localStorage.getItem("d-postVettingRepeatedViewParticipant")
        );
        data.append("CONSULTANT_NAME", this.model.participantName);
        data.append("CONSULTANT_NRIC", this.model.participantNric);
        data.append("CONSULTANT_PASSPORT_NO", this.model.participantPassport);

        try {
          const response = await servicesModule4.addParticipant(data);
          this.getAllParticipant();

          this.dataUploadReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async searchParticipant() {
      this.dataUploadReady = true;
      const data = new FormData();
      data.append(
        "PROG_DETAILS_ID",
        localStorage.getItem("d-postVettingRepeatedViewParticipant")
      );
      data.append("SEARCH_DATA", this.model.searchData);

      try {
        const response = await servicesModule4.searchParticipant(data);

        this.model.participantName = response.data.CONSULTANT_NAME;
        this.model.participantNric = response.data.CONSULTANT_NRIC;
        this.model.participantPassport = response.data.CONSULTANT_PASSPORT_NO;

        this.name = response.data.CONSULTANT_NAME;

        this.nric = response.data.CONSULTANT_NRIC;
        this.passport = response.data.CONSULTANT_PASSPORT_NO;

        if (response.data.PROG_PARTICIPANT_ID != "") {
          this.existed = "RECORD EXISTED";
        } else {
          this.existed = "";
        }

        if (response.data.PROG_PARTICIPANT_ID == "-") {
          this.existed = "-";
        }
        if (response.data.CONSULTANT_NAME == "RECORD NOT FOUND") {
          this.existed = "RECORD NOT FOUND";
        }

        this.dataUploadReady = false;
      } catch (error) {
        console.log(error);
      }
    },

    //general
    back() {
      this.$router.go(-1);
    },

    submit: async function () {

      if (confirm("Are you sure you want to submit this entry?")) {
      this.dataActionReady = true;

      //upload
      const data = new FormData();

      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", res.USER_DIST_ID);
      data.append("PUBLISH_STATUS", 1);
      data.append("TS_ID", "15");
      data.append("AMEND", 0);

      data.append("PROG_DETAILS_ID",localStorage.getItem("d-postVettingRepeatedViewParticipant"));

      var yr = new Date().getFullYear().toString().substr(2, 2);
      data.append("YEAR", yr);
      data.append("FULLYEAR", new Date().getFullYear().toString());

        const responsePart = await servicesModule4.getProgramParticipantByID(
        localStorage.getItem("d-postVettingRepeatedViewParticipant")
      );

      data.append("PARTLIST", JSON.stringify(responsePart));


      const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
      data.append("APPR_LIST1", JSON.stringify(approvalLevel));

      const approvalLevel2 = await services06Module0.getApprovalLevel(12, 2);
      data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        //notification
      var remarkEntry ="(CPD-POST)New entry pending approval for " + res.DIST_NAME;
      data.append("NOTI_LOCATION", "approval-postVetting-distributorList");

      data.append("NOTI_REMARK", remarkEntry);

       try {
          const response = await servicesModule4.submitRepeatedPostVetting(data);
          // this.$router.go(-1);
         this.$router.push('/distributor/d-postVettingViewProgramList')
          this.dataActionReady = false;
          this.getAllParticipant();

        } catch (error) {
          console.log(error);
        }
      }
    },

    saveAsDraft: async function () {

      if (confirm("Are you sure you want to save as draft?")) {
        this.dataActionReady = true;

        //upload
        const data = new FormData();

        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("PUBLISH_STATUS", 0);
        data.append("TS_ID", "1");
        data.append("AMEND", 0);

        data.append("PROG_DETAILS_ID",localStorage.getItem("d-postVettingRepeatedViewParticipant"));

        var yr = new Date().getFullYear().toString().substr(2, 2);
        data.append("YEAR", yr);
        data.append("FULLYEAR", new Date().getFullYear().toString());

        const responsePart = await servicesModule4.getProgramParticipantByID(
          localStorage.getItem("d-postVettingRepeatedViewParticipant")
        );

        data.append("PARTLIST", JSON.stringify(responsePart));


        const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(12, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        //notification
        var remarkEntry ="(CPD-POST)New entry pending approval for " + res.DIST_NAME;
        data.append("NOTI_LOCATION", "approval-postVetting-distributorList");

        data.append("NOTI_REMARK", remarkEntry);

        try {
          const response = await servicesModule4.submitRepeatedPostVetting(data);
          // this.$router.go(-1);
          this.$router.push('/distributor/d-postVettingViewProgramList')
          this.dataActionReady = false;
          this.getAllParticipant();

        } catch (error) {
          console.log(error);
        }
      }
    },

  },
  computed: {
    //PARTICIPANT
    PartFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAME",
          title: "CONSULTANT NAME",
          sortField: "NAME",
        },
        {
          name: "NRIC_NUMBER",
          title: "NRIC NUMBER",
          sortField: "NRIC_NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
          sortField: "PASSPORT_NUMBER",
        },
        {
          name: "PENDING_POINT",
          title: "PENDING_POINT",
          sortField: "PENDING_POINT",
        },
        {
          name: "APPROVE_POINT",
          title: "APPROVE_POINT",
          sortField: "APPROVE_POINT",
        },
        {
          name: "REVOKE_POINT",
          title: "REVOKE_POINT",
          sortField: "REVOKE_POINT",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    PartFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.partList;
      }
      return this.partList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.NAME.toLowerCase().includes(v) ||
              item.NRIC_NUMBER.toLowerCase().includes(v) ||
              item.PASSPORT_NUMBER.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      dataActionReady : false,
      dataUploadReady: false,
      term: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      partRecordCount: null,
      partList: [],

      RejectedList: [],
      rejectedCount: null,
      column: ["NAME", "NRIC_NUMBER", "PASSPORT_NUMBER", "REASON"],
      excelname: "download-RejectedList",
      sheetname: "RejectedList",

      name: "",
      passport: "",
      nric: "",
      existed: "",

      model: {
        searchData: "",
        participantName: "",
        participantNric: "",
        participantPassport: "",
      },

      participantUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".xlxs",
                multiple: true,
                text: "Choose a File",
                model: "fileParticipant",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      participantSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "searchData",
            label: "Search Participant",
            placeholder: "Enter Nric Number / Passport Number",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantNric",
            styleClasses: "col-md-2",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantPassport",
            styleClasses: "col-md-2",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "participantName",
            styleClasses: "col-md-2",
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
.color {
  color: red;
}
</style>
