<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        {{title}}
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
      <b-row class="justify-content-end">
        <b-col cols="3">
          <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="search"
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </b-col>
        <b-col cols="3">
          <div class="input-group">
            <va-date-picker
              :value="termDate"
              @input="searchDate"
              :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
              v-model="dateFormat"
              placeholder="Search date"
            />
            <div class="input-group-append">
              <button
                @click.prevent="clear"
                type="button"
                class="btn btn-md btn-primary"
              >
                <va-icon name="fa fa-refresh" />
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
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

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-if="
                props.rowData.TS_ID != 1 &&
                props.rowData.TS_ID != 15 &&
                props.rowData.TS_ID != 19
              "
              v-b-tooltip.hover
              title="Review Program"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
            <span
              v-if="
                props.rowData.TS_ID == 1 ||
                props.rowData.TS_ID == 15 ||
                props.rowData.TS_ID == 19
              "
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
import * as services07Module4 from "../../../../../../app/module4/services07";

export default {
  mounted() {
    var data = localStorage.getItem("approvalFPModuleList");
    this.PROGDATA = JSON.parse(data);
    this.getAllRecord();

    let fpCategory = this.$route.query.fpCategory
    if(fpCategory == 1) {
      this.title = "Certified Financial Planner"
    } else if(fpCategory == 2) {
      this.title = "Islamic Financial Planner"
    } else if(fpCategory == 3) {
      this.title = "Registered Financial Planner"
    } else if(fpCategory == 4) {
      this.title = "Shariah Registered Financial Planner"
    }
    this.title += " Submission Programs"
  },
  components: {},
  methods: {
    clear() {
      this.dateFormat = null;
      this.termDate = null;
      this.term = null;
    },

    search: debounce(function (value) {
      this.term = value;
    }, 400),

    searchDate: debounce(function (value) {
      this.termDate = value;
    }, 400),

    back() {
      this.$router.push('/fimm/f-fpamModuleList');
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      const response =
        await services07Module4.getModuleApprovalByCompanyNModuleType(
          this.PROGDATA.COMPANY_ID,
          5,
          4 // FP_CATEGORY
        );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },
    async editRecord(data) {
      //alert(JSON.stringify(data))
      localStorage.setItem(
        "approvalFPViewDetails",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "approvalFPViewDetails",
        query: {
          fpCategory: this.$route.query.fpCategory
        }
      });
    },
    async viewRecord(data) {
      localStorage.setItem(
        "f-FPViewDetails",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "f-FPViewDetails",
        query: {
          fpCategory: this.$route.query.fpCategory
        }
      });
    },

    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
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
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_PARTICIPANT",
        },
        {
          name: "USERNAME",
          title: "SUBMISSION BY",
          sortField: "USERNAME",
        },
        {
          name: "TS_ID_DESCRIPTION",
          title: "STATUS",
          sortField: "TS_ID_DESCRIPTION",
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
      if (!(this.term || this.termDate)) {
        return this.RecordList;
      }

      return this.RecordList.filter((item) => {
        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(
            item.CREATE_TIMESTAMP
          );
          return convertDate == this.termDate;
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                (item.PROG_CODE ? item.PROG_CODE.toLowerCase().includes(v) : false) ||
                (item.USERNAME ? item.USERNAME.toLowerCase().includes(v) : false) ||
                (item.FIMMUSER ? item.FIMMUSER.toLowerCase().includes(v) : false) ||
                item.TS_ID_DESCRIPTION.toLowerCase().includes(v)
            );
        }
      });
    },
  },

  data() {
    return {
      title: "",
      PROGDATA: "",
      term: null,
      termDate: null,
      dateFormat: null,
      perPage: 10,
      RecordList: [],
      RecordCount: null,
      model: {},
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
