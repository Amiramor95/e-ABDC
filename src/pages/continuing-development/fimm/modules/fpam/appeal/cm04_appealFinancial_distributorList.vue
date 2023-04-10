<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Appeal Passing Financial Planner Modules : List of Distributor
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
              title="View List of Submission "
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-bars"></i
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
import * as servicesModule4 from "../../../../../../app/module4/services01";

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
      const user = localStorage.getItem("user");
      var APPR_GROUP_ID = JSON.parse(user).USER_GROUP_ID;
      const response = await servicesModule4.getFPListByDist(
        2,
        5
      );

      this.RecordList = response;
      this.RecordCount = this.RecordList.length;

      this.isReady=true;
    },
    async viewRecord(data) {
      localStorage.setItem("d-appealFpam_list", JSON.stringify(data));
      this.$router.push({
        name: "d-appealFpam_list",
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
          name: "DIST_CODE",
          title: "DISTRIBUTOR CODE",
          sortField: "DIST_CODE",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "TOTAL_NEW",
          title: "NEW SUBMISSION",
          sortField: "TOTAL_NEW",
        },
        {
          name: "TOTAL_RETURN",
          title: "RETURN REQUEST",
          sortField: "TOTAL_RETURN",
        },
         {
          name: "TOTAL_DRAFT",
          title: "IN DRAFT",
          sortField: "TOTAL_DRAFT",
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
              item.DIST_NAME.toLowerCase().includes(v)
              // item.DIST_CODE.includes(v)||
              // item.TOTAL_NEW.includes(v) ||
              // item.TOTAL_REQUESTRETURN.includes(v)||
              // item.TOTAL_DRAFT.includes(v)
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
