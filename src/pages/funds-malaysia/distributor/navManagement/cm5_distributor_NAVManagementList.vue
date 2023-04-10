<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Management : List of NAV Submission Record</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="create new submission"
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
    <va-card class="mt-5 col-12">
      <div class="row">
        <div class="flex md6">
          <div class="row">
            <div class="flex xs12 md5">
              <datepicker
                :value="term"
                @input="searchDate"
                placeholder="dd-MM-yyyy"
                format="dd-MMM-yyyy"
                input-class="form-control bgcolor col-md-12"
                v-model="dateFormat"
                :typeable="false"
                name="uniquename"
              ></datepicker>
            </div>
            <div class="flex xs12 md7">
              <button
                @click.prevent="clear"
                type="button"
                class="btn btn-md btn-primary"
              >
                <va-icon name="fa fa-refresh" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex md3 offset--md3">
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
        <template slot="actions" slot-scope="props">
          <!-- <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Record"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
          </h5> -->
          <h5 class="mt-1">
            <span
              v-if="props.rowData.DIST_TS_ID == 7 || props.rowData.FIMM_TS_ID == 7"
              v-b-tooltip.hover
              title="Edit Submission Form"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

            <span
              v-if="props.rowData.DIST_TS_ID != 7 || props.rowData.FIMM_TS_ID != 7"
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
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
import moment from "moment";
import * as services01Module5 from "../../../../app/module5/services01";

export default {
  mounted() {
    this.getAllRecordById();
  },
  components: {},

  methods: {
    create() {
      this.$router.push('/distributor/newNavSubmission')
    },

    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    //searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    searchDate(date) {
      this.term = moment(date).format("DD-MMM-y");
    },

    getAllRecordById: async function () {
      const user = localStorage.getItem("user");
      const response = await services01Module5.getAllRecordById(JSON.parse(user).USER_DIST_ID);

      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "viewNavManagementSubmission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "viewNavManagementSubmission",
      });
    },
    async editRecord(data) {
      localStorage.setItem(
        "navManagementReturn",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "navManagementReturn",
      });
    },

    back() {
      this.$router.go(-1);
    }, // back button
  },

  computed: {
    caRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "CREATION DATE",
          sortField: "CREATE_TIMESTAMP",
        },

        {
          name: "DIST_TS_PARAM",
          title: "ACTION BY DISTRIBUTOR",
          sortField: "DIST_TS_PARAM",
        },

        {
          name: "DIST_LATEST_UPDATE",
          title: "LATEST UPDATE",
          sortField: "DIST_LATEST_UPDATE",
        },
        {
          name: "USER_NAME",
          title: "UPDATE BY",
          sortField: "USER_NAME",
        },
        {
          name: "SUBMISSION_DATE",
          title: "SUBMISSION DATE",
          sortField: "SUBMISSION_DATE",
        },
        {
          name: "FIMM_TS_PARAM",
          title: "ACTION BY FIMM",
          sortField: "FIMM_TS_PARAM",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "10%",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    caRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.CREATE_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase())||
              item.FIMM_TS_PARAM.toLowerCase().includes(v) ||
              item.DIST_TS_PARAM.toLowerCase().includes(v) ||
              item.USER_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      dateFormat: "",
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      caRecordList: [],
      count: 1,
      caRecordCount: null,

      model: {},

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

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>
