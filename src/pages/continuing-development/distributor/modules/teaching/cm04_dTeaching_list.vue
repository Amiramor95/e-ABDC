<template>
  <va-card>
    <div v-if="!dataReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <b-row>
        <h4 slot="header" class="card-title">{{ title }}</h4>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <span
                v-b-tooltip.hover
                :title="newSubmissionTitle"
                v-on:click="create"
                class="badge badge-success"
                ><i class="fa fa-plus"></i
              ></span>
            </h5>
          </div>
        </div>
      </b-row>
      <ModuleListingTable
        :count="recordCount"
        :filter-data="filterData"
        :per-page="perPage"
        :view-page="viewPage"
        :appeal-page="appealPage"
        :amend-page="amendPage"
        @filter="filter"
        @filter-date="filterDate"
        @return-form="returnRecord"
        @clear="clearFilter"
      />
    </div>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>
<script>
import ModuleListingTable from "../components/moduleListingTable";
import * as service07Module4 from "../../../../../app/module4/services07";
export default {
  components: {
    ModuleListingTable,
  },
  mounted() {
    this.getAllRecord();
  },
  methods: {
    clearFilter(){
      this.term=''
    },
    back() {
      // this.$router.go(-1);
      this.$router.push('/distributor/d-moduleSelectionList')
    }, // back button
    create() {
      this.$router.push("/distributor/d-teachingNewSubmission");
    },
    getAllRecord: async function () {
      let USER_ID = JSON.parse(localStorage.getItem("user")).user_id;
      this.recordList = await service07Module4.getModules(USER_ID, 3);
      this.dataReady = true;
    },
    filter(value) {
      this.term = value;
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
      // console.error("returnRecord");
      // for (var pair of data.entries()) {
      //   console.error("formData", pair[0] + ", " + pair[1]);
      // }
      try {
        await service07Module4.moduleApprovalReturn(data);
        this.getAllRecord();
      } catch (error) {
        // console.log(error);
      }
    },
  },
  data() {
    return {
      dataReady: false,
      title: "List of Teaching/Speaking",
      newSubmissionTitle: "New Teaching/Speaking Submission",
      recordList: [],
      recordCount: 0,
      term: null,
      termDate: null,
      perPage: 10,
      viewPage: "d-teachingEditSubmission",
      appealPage:"d-teachingAppealProgram",
      amendPage:"d-teachingAmendProgram",
    };
  },
  computed: {
    filterData() {
      this.recordCount = this.recordList.length;
      if (!(this.term || this.termDate)) {
        return this.recordList;
      }

      return this.recordList.filter((item) => {
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
                item.CREATE_BY_NAME.toLowerCase().includes(v) ||
                item.TS_ID_DESCRIPTION.toLowerCase().includes(v)
            );
        }
      });
    },
  },
};
</script>
