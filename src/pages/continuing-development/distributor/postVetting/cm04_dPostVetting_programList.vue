<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Post-Vetting : List of Programs</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="Submit New Program"
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
              title="View list of programs"
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
import * as servicesModule4 from "../../../../app/module4/services01";

export default {
  mounted() {
    this.getAllRecord();
  },
  components: {},

  methods: {
    // create
    create() {
      this.$router.push("/distributor/d-postVettingNewSubmission");
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
      const user = localStorage.getItem("user");
      //JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule4.getProgramById(
        JSON.parse(user).USER_DIST_ID,
        2,
        1
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "d-postVettingViewProgramList",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "d-postVettingViewProgramList",
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
          name: "PROG_CODE",
          title: "PROGRAM CODE",
          sortField: "PROG_CODE",
        },
        {
          name: "PROG_TITLE",
          title: "PROGRAM TITLE",
          sortField: "PROG_TITLE",
        },
        {
          name: "TOTAL_COUNT",
          title: "TOTAL PROGRAM",
          sortField: "TOTAL_COUNT",
        },
         {
          name: "TOTAL_DRAFT",
          title: "IN DRAFT",
          sortField: "TOTAL_DRAFT",
        },
        {
          name: "TOTAL_RETURN",
          title: "RETURNED",
          sortField: "TOTAL_RETURN",
        },
         {
          name: "TOTAL_REJECT",
          title: "REJECTED",
          sortField: "TOTAL_REJECT",
        },
         {
          name: "TOTAL_REVOKE",
          title: "REVOKED",
          sortField: "TOTAL_REVOKE",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "5%",
        },
      ];
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              (item.PROG_TITLE ? item.PROG_TITLE.toLowerCase().includes(v) : false) ||
              (item.PROG_CODE ? item.PROG_CODE.toLowerCase().includes(v) : false) ,
          )
      })
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
