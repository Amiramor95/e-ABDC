<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Appeal List of Reading Submission Programs
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

    <div>
      <div v-if="!isReady" style="margin-top: 5%">
        <div class="text-center text-success my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </div>

      <!-- list table-->
      <va-card v-else class="mt-5 col-12">
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

      </va-card>
    </div>

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
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../../app/module4/services01";

export default {
  mounted() {
    var data = localStorage.getItem("d-appealReadingListProgramList");
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
      //alert(this.PROGDATA.COMPANY_ID);
      const response = await servicesModule4.getReadingModuleByDistId(
        this.PROGDATA.COMPANY_ID,
        2,
        2
      );
      this.RecordList = response;
     // alert(JSON.stringify(this.RecordList));
      this.RecordCount = this.RecordList.length;

      this.isReady=true;
    },
    async editRecord(data) {
     //alert(JSON.stringify(data))
      localStorage.setItem("d-appealReadingViewDetails", JSON.stringify(data));
      this.$router.push({
        name: "d-appealReadingViewDetails",
      });
    },
      async viewRecord(data) {
      localStorage.setItem(
        "d-appealReadingViewDetails",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "d-appealReadingViewDetails",
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
          name: "MODULE_CODE",
          title: "CPD NUMBER",
          sortField: "MODULE_CODE",
        },
        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_PARTICIPANT",
        },
        {
          name: "DUSERNAME",
          title: "SUBMISSION BY",
          sortField: "DUSERNAME",
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
              item.MODULE_CODE.toLowerCase().includes(v) ||
              item.DUSERNAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      isReady:false,
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
