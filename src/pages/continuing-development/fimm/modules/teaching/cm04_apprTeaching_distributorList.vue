<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Teaching : List of Distributors
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

            <span
              v-b-tooltip.hover
              title="View All List of Program"
              v-on:click="viewProgram(props.rowData)"
              class="badge badge-success mr-2"
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
import * as services07Module4 from "../../../../../app/module4/services07";

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
      this.$router.push('/fimm/approval-selectionList');
    }, // back button

    // getAllRecord
    getRecordByDist: async function () {
      const response = await services07Module4.getModuleByDistributor(3);
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem("approvalTeachingModuleList", JSON.stringify(data));
      this.$router.push({
        name: "approvalTeachingModuleList",
      });
    },


    async viewProgram(data) {
      localStorage.setItem("approval-teaching-allProgram", JSON.stringify(data));
      this.$router.push({
        name: "approval-teaching-allProgram",
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
          name: "TOTAL_REQUESTRETURN",
          title: "RETURN REQUEST",
          sortField: "TOTAL_REQUESTRETURN",
        },
         {
          name: "TOTAL_DRAFT",
          title: "IN DRAFT",
          sortField: "TOTAL_RETURN",
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
              item.DIST_NAME.toLowerCase().includes(v) ||
              item.DIST_CODE.toLowerCase().includes(v)
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
