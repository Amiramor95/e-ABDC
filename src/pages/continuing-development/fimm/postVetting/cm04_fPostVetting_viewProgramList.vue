<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of Post-Vetting Submission Programs
      </h4>
    </div>
    <va-card class="mt-5 col-12">
       <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%">PROGRAM CODE</td>
                <td>{{ PROGDATA.PROG_CODE }}</td>
              </tr>
              <tr>
                <td>PROGRAM TITLE</td>
                <td>{{ PROGDATA.PROG_TITLE }}</td>
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
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Details Program"
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
    var data = localStorage.getItem("f-postVettingViewProgramList");
    this.PROGDATA = JSON.parse(data);
    //alert(JSON.stringify(this.PROGDATA.PROGRAM_ID));
    this.getAllRecord();
  },
  components: {},

  methods: {
    // create
    create() {
      this.$router.push("/fimm/f-postVettingNewSubmission");
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
      const response = await servicesModule4.getEventByProgramId(
        this.PROGDATA.PROGRAM_ID
      );
      this.RecordList = response;
      //alert(JSON.stringify(this.RecordList));
      this.RecordCount = this.RecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "f-postVettingViewProgramDetails",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "f-postVettingViewProgramDetails",
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
          name: "PROG_DATE_START",
          title: "PROGRAM START DATE",
          sortField: "PROG_DATE_START",
        },
        {
          name: "PROG_DATE_END",
          title: "PROGRAM END  DATE",
          sortField: "PROG_DATE_END",
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
              item.PROG_DATE_END.toLowerCase().includes(v)
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
