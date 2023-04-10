<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Waiver : List of Approval Programs
      </h4>
    </div>

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

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Details "
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
import * as servicesModule4 from "../../../../app/module4/services01";

export default {
  mounted() {
    this.getRecordByDist();
  },
  components: {},

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getRecordByDist: async function () {

      const response = await servicesModule4.getWaiverApprovalList();
      //alert(JSON.stringify(response));

      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem("view-waiver-approval", JSON.stringify(data));
      this.$router.push({
        name: "view-waiver-approval",
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
          title: "SUBMISSION DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "WAIVER_CODE",
          title: "WAIVER CODE",
          sortField: "WAIVER_CODE",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "TOTAL_COUNT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_COUNT",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "USERNAME",
          title: "LATEST UPDATE BY",
          sortField: "USERNAME",
        },

        {
          name: "LATEST_UPDATE",
          title: "LATEST UPDATE",
          sortField: "LATEST_UPDATE",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
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
              item.DIST_NAME.toLowerCase().includes(v) ||
              item.WAIVER_CODE.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.USERNAME.toLowerCase().includes(v)
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
      RecordList: [],
      count: 1,
      RecordCount: null,

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
