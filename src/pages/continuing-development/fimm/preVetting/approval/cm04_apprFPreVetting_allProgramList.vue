<template>
  <div class="row">
    <div class="col-12">
      <template>
        <div v-if="!isReady" style="margin-top: 25%">
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </div>
        <va-card v-else>
          <div class="row">
            <h4 slot="header" class="card-title">
              FPre-Vetting : List of Programs
            </h4>
          </div>
          <!--    <va-card class="mt-5 col-12">-->
          <!--      <table class="table table-striped">-->
          <!--        <tbody>-->
          <!--          <tr>-->
          <!--            <td style="width: 15%">DISTRIBUTOR CODE</td>-->
          <!--            <td>{{ PROGDATA.DIST_CODE }}</td>-->
          <!--          </tr>-->
          <!--          <tr>-->
          <!--            <td>DISTRIBUTOR NAME</td>-->
          <!--            <td>{{ PROGDATA.DIST_NAME }}</td>-->
          <!--          </tr>-->
          <!--        </tbody>-->
          <!--      </table>-->
          <!--    </va-card>-->

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
                title="View Program"
                v-on:click="viewRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
              <i class="fa fa-eye"></i
              ></span>
                  <span
                    v-if="props.rowData.TS_ID == 3"
                    v-b-tooltip.hover
                    title="Revoke Program"
                    v-on:click="revokeRecord(props.rowData)"
                    style="background: #ff4a55; color: #ffffff"
                    class="badge mr-2"
                  >
              <i class="fa fa-ban"></i
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
    </div>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../../app/module4/services01";

export default {
  mounted() {
    var data = localStorage.getItem("approval-FpreVetting-allProgram");
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
      this.$router.push('/fimm/apprFPreVettingDistributorList');
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      //catgeory: 2(dist), prog_type:1(post)
      const response = await servicesModule4.getAllProgramByDistId(
        this.PROGDATA.COMPANY_ID,
        1,
        2
      );
      this.RecordList = response;
     //alert(JSON.stringify(this.RecordList));
      this.RecordCount = this.RecordList.length;
      this.isReady=true;
    },
    async editRecord(data) {
     //alert(JSON.stringify(data))
      localStorage.setItem("approval-postVetting-reviewDetails", JSON.stringify(data));
      this.$router.push({
        name: "approval-postVetting-reviewDetails",
      });
    },
      async viewRecord(data) {
      localStorage.setItem(
        "approval-FpreVetting-viewSubmission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "approval-FpreVetting-viewSubmission",
      });
    },

      async revokeRecord(data) {
      localStorage.setItem(
        "approval-FpreVetting-revokeProgram",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "approval-FpreVetting-revokeProgram",
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
          name: "PROG_DETAILS_REPEAT",
          title: "SUBMISSION TYPE",
          sortField: "PROG_DETAILS_REPEAT",
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
          name: "PROG_TITLE",
          title: "PROGRAM TITLE",
          sortField: "PROG_TITLE",
        },

        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_PARTICIPANT",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
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
              item.PROG_DETAILS_REPEAT.toLowerCase().includes(v) ||
              item.PROG_CODE.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      isReady: false,


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
