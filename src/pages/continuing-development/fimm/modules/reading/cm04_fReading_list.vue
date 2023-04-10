<template>
  <div v-if="!isReady" style="margin-top: 25%">
    <div class="text-center text-success my-2">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>

  <div v-else>
    <div class="row">
      <h4 slot="header" class="card-title">List of Reading Approved Financial Literature </h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="New FReading Submission"
              v-on:click="create"
              class="badge badge-success"
            >
              <i class="fa fa-plus"></i
            ></span>
          </h5>
        </div>
      </div>
    </div>

    <!-- list table-->
    <va-card class="col-12">
      <ModuleListingTable
        :count="recordCount"
        :filter-data="filterData"
        :per-page="perPage"
        :view-page="viewPage"
        @filter="filter"
        @filter-date="filterDate"
        @return-form="returnRecord"
        @clear="clearFilter"
      />

      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </va-card>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import ModuleListingTable from "../components/fModuleListingTable";
import * as service07Module4 from '../../../../../app/module4/services07'
// import * as services1Module4 from "../../../../../app/module4/services01";
// import * as services2Module4 from "../../../../../app/module4/services02";

export default {
  mounted() {
    this.getAllRecord();
  },
  components: {
    ModuleListingTable,
  },
  methods: {
    clearFilter(){
      this.term=""
    },
    // create
    create() {
      this.$router.push("/fimm/f-readingNewSubmission");
    },
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
      let USER_ID = JSON.parse(localStorage.getItem("user")).user_id;
      this.recordList = await service07Module4.getModules(USER_ID, 2,1);
      this.dataReady = true;

      this.isReady=true;
    },
    async viewRecord(data) {

    },

    async addProgram(data) {

    },

    filter(value) {
      if(value){
        this.term = value;
      }
      else{
        this.term = null;

      }
    },
    filterDate(value) {
      this.termDate = value;
    },
    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },

    async returnRecord(data) {

      try {
        await service07Module4.moduleApprovalReturn(data);
        this.getAllRecord();
      } catch (error) {
        // console.log(error);
      }
    },
  },

  computed: {

    filterData() {
      this.recordCount = this.recordList.length;
      if (!(this.term || this.termDate)) {
        console.log(this.recordList);
        return this.recordList;
      }

      return this.recordList.filter((item) => {
        console.log('test');

        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(
            item.CREATE_TIMESTAMP
          );
          return convertDate == this.termDate;
        } else if (item.MODULE_CODE && this.term.toLowerCase() == item.MODULE_CODE.toLowerCase() ) {
          return this.term.toLowerCase() == item.MODULE_CODE.toLowerCase()
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.F_CREATE_BY.toLowerCase().includes(v) ||
                item.TS_ID_DESCRIPTION.toLowerCase().includes(v)
            );
        }
      });
    },

    RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "",
          title: "SUBMISSION DATE",
          sortField: "",
        },
        {
          name: "",
          title: "QUALIFICATION CODE",
          sortField: "",
        },
        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "",
        },
        {
          name: "",
          title: "CREATION BY",
          sortField: "",
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
              item.PROG_TITLE.toLowerCase().includes(v) ||
              item.PROG_CODE.toLowerCase().includes(v)
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

      term: null,
      termDate: null,
      perPage: 10,
      recordList: [],
      recordCount: 0,
      viewPage: "f-readingEditSubmission",

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
