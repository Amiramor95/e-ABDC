<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        FPre-Vetting : List of Programs
      </h4>

    </div>
    <va-card class="mt-5 col-12">
      <vudal name="simpleModal" class="widthModal">
        <div class="header">Remark<i class="close icon">&times;</i></div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="readMoreSchema"
            :options="formOptions"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>

      <table class="table table-striped">
        <tbody>
          <tr>
            <td style="width: 15%">PROGRAM CODE</td>
            <td>{{ PROGDATA.PROG_CODE }}</td>
          </tr>
          <tr>
            <td>PROGRAM TITLE</td>
            <td>{{ PROGDATA.PROG_TITLE }}</td>
          </tr>
          <tr>
            <td>TARGET PARTICIPANT</td>
            <td>{{ PROGDATA.PROG_TARGET }}</td>
          </tr>
        </tbody>
      </table>
    </va-card>

    <!-- list table-->
    <va-card class="mt-5 col-12">
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
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="RecordCount"
        :dataperpage="parseInt(perPage)"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

        <template slot="remarks" slot-scope="props">
          {{ props.rowData.PROG_REMARK }}
          <span
            v-b-tooltip.hover
            v-on:click="readMore(props.rowData)"
            title="Read more"
            class="badge mr-2"
          >
            <i class="fa fa-window-restore"></i
          ></span>
        </template>

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
              <span
              v-if="props.rowData.TS_ID != 1 && props.rowData.TS_ID != 15 && props.rowData.TS_ID != 19"
              v-b-tooltip.hover
              title="Review Program"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
            <span
              v-if="props.rowData.TS_ID == 1 || props.rowData.TS_ID == 15 || props.rowData.TS_ID == 19"
              v-b-tooltip.hover
              title="Review Program"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
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
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import Vudal from "vudal";
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../../app/module4/services01";
import * as services06Module0 from "../../../../../app/module0/services06";

export default {
  mounted() {
    var data = localStorage.getItem("apprFPreVettingViewProgramList");
    this.PROGDATA = JSON.parse(data);
    //alert(JSON.stringify(this.PROGDATA));
    this.getAllRecord();
  },
  components: {
    Vudal,
  },

  methods: {

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.push('/fimm/apprFPreVettingsubmissionList');
    }, // back button

    async returnRecord(progData) {
      if (confirm("Are you sure to request return of this submission?")) {
        const data = new FormData();
        data.append("PROG_DETAILS_ID", progData.PROG_DETAILS_ID);
        data.append("STATUS", 19);

        const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

          //notification
      data.append("NOTI_LOCATION", "apprPreVettingFrpList");
      var remarkEntry = "(CPD-PRE)New entry request for return";

      data.append("NOTI_REMARK", remarkEntry);

        try {
          const response = await servicesModule4.returnSubmission(data);
          this.getAllRecord();
        } catch (error) {
          console.log(error);
        }
      }
    },


    // getAllRecord
    getAllRecord: async function () {

      const response = await servicesModule4.getSubmissionByFrpProgramId(
        this.PROGDATA.PROGRAM_ID
      );
      this.RecordList = response;
      //alert(JSON.stringify(this.RecordList));
      this.RecordCount = this.RecordList.length;
    },
    async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.PROG_REMARK_FULL;
    },

     async editRecord(data) {
     //alert(JSON.stringify(data))
      localStorage.setItem("apprFPreVettingViewDetails", JSON.stringify(data));
      this.$router.push({
        name: "apprFPreVettingViewDetails",
      });
    },
      async viewRecord(data) {
      localStorage.setItem(
        "d-preVettingViewProgramDetails",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "d-preVettingViewProgramDetails",
      });
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
          name: "PROG_DETAILS_REPEAT",
          title: "PROGRAM TYPE",
          sortField: "PROG_DETAILS_REPEAT",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION_DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "PROG_DATE_START",
          title: "START DATE",
          sortField: "PROG_DATE_START",
        },
        {
          name: "PROG_DATE_END",
          title: "END DATE",
          sortField: "PROG_DATE_END",
        },

        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_PARTICIPANT",
        },
        {
          name: "TUSERNAME",
          title: "SUBMISSION BY",
          sortField: "TUSERNAME",
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
          width: "10%",
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
              item.CREATE_TIMESTAMP.toLowerCase().includes(v) ||
              item.PROG_DATE_START.toLowerCase().includes(v) ||
              item.PROG_DATE_END.toLowerCase().includes(v)
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
      currentPage: 1,
      classificationList: [],
      RecordList: [],
      count: 1,
      RecordCount: null,
      PROGDATA: "",

      model: {
        showRemark: "",
      },

      readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
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
