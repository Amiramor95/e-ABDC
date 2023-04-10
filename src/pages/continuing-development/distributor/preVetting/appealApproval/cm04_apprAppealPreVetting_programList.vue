<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
         Pre-Vetting : List of Program Appeal Submissions
      </h4>
    </div>
    <va-card class="mt-5 col-12">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td style="width: 15%">DISTRIBUTOR CODE</td>
            <td>{{ PROGDATA.DIST_CODE }}</td>
          </tr>
          <tr>
            <td>DISTRIBUTOR NAME</td>
            <td>{{ PROGDATA.DIST_NAME }}</td>
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
        <template slot="type" slot-scope="props">
          <span
            v-b-tooltip.hover
            v-if="props.rowData.PROG_DETAILS_REPEAT == '1'"
          >
            REPEATED
          </span>
          <span
            v-b-tooltip.hover
            v-if="props.rowData.PROG_DETAILS_REPEAT == '0'"
          >
            NEW
          </span>
        </template>

        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
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
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../../app/module4/services01";

export default {
  mounted() {
    var data = localStorage.getItem("f-approvalAppeal-preVetting-programList");
    this.PROGDATA = JSON.parse(data);
    this.getAllRecord();
  },
  components: {},

  methods: {
    // create

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      //catgeory: 2(dist), prog_type:1(post)
      const response = await servicesModule4.getAppealProgramByDistId(
        this.PROGDATA.COMPANY_ID,
        2,
        2
      );
      this.RecordList = response;
     //alert(JSON.stringify(this.RecordList));
      this.RecordCount = this.RecordList.length;
    },
    async editRecord(data) {
     //alert(JSON.stringify(data))
      localStorage.setItem("approvalAppeal-preVetting-reviewDetails", JSON.stringify(data));
      this.$router.push({
        name: "approvalAppeal-preVetting-reviewDetails",
      });
    },
      async viewRecord(data) {
      localStorage.setItem(
        "approvalAppeal-preVetting-viewSubmission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "approvalAppeal-preVetting-viewSubmission",
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
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION_DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "PROG_CODE",
          title: "CPD NUMBER",
          sortField: "PROG_CODE",
        },
        {
          name: "PROG_TITLE",
          title: "PROGRAM TITLE",
          sortField: "PROG_TITLE",
        },

        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_PARTICIPANT",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
         {
          name: "FIMMUSER",
          title: "UPDATE BY",
          sortField: "FIMMUSER",
        },
        {
          name: "LATEST_UPDATE",
          title: "LATEST UPDATE",
          sortField: "LATEST_UPDATE",
        },


        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
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
              item.PROG_DATE_END.toLowerCase().includes(v) ||
              item.PROG_TITLE.toLowerCase().includes(v) ||
              item.PROG_DATE_END.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.FIMMUSER.toLowerCase().includes(v) ||
              item.NOTE.toLowerCase().includes(v)
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
        modelFilter: {},
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
