<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Cessation : List of Submissions for Approval
      </h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="List of Distributor Cessation Records"
              v-on:click="viewList"
              class="badge badge-primary"
            >
              <i class="fa fa-bars"></i
            ></span>
          </h5>
        </div>
      </div>
      <br />
    </div>

    <!-- list table-->
    <va-card class="mt-5 col-12">

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
              v-if="props.rowData.TS_ID == 1 || props.rowData.TS_ID == 15 || props.rowData.TS_ID == 9"
              v-b-tooltip.hover
              title="Review Submission Form"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

            <span
              v-if="props.rowData.TS_ID != 9 && props.rowData.TS_ID != 1"
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
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted() {
    this.getAllList();
  },

  components: {},

  methods: {

    back() {
      this.$router.go(-1);
    }, // back button

        viewList() {
      this.$router.push("/fimm/cessation-submission-overview-list");
    },

    // getAllRecord
    getAllList: async function () {
      const user = localStorage.getItem("user");
      //DistID,GroupID
      const response = await servicesModule1.getCessationSubmissionList(JSON.parse(user).USER_GROUP_ID);
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    async viewRecord(data) {
      localStorage.setItem("view-cessation-submission-form", JSON.stringify(data));
      this.$router.push({
        name: "view-cessation-submission-form",
      });
    },

    async editRecord(data) {
      localStorage.setItem("cessation-submission-rdApproval", JSON.stringify(data));
      this.$router.push({
        name: "cessation-submission-rdApproval",
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
          name: "SUBMISSION_DATE",
          title: "SUBMISSION DATE",
          sortField: "SUBMISSION_DATE",
        },
        {
          name: "CESSATION_NAME",
          title: "CESSATION TYPE",
          sortField: "CESSATION_NAME",
        },
        {
          name: "DISTRIBUTOR_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DISTRIBUTOR_NAME",
        },
         {
          name: 'DIST_REGI_NUM1',
          title: 'REGISTRATION NUMBER',
          sortField: 'DIST_REGI_NUM1',
        },
        {
          name: 'DIST_REGI_NUM2',
          title: 'NEW REGISTRATION NUMBER',
          sortField: 'DIST_REGI_NUM2',
        },
         {
          name: 'DIST_PHONE_NUMBER',
          title: 'PHONE NUMBER',
          sortField: 'DIST_PHONE_NUMBER',
        },
        {
          name: 'DIST_EMAIL',
          title: 'EMAIL',
          sortField: 'DIST_EMAIL',
        },

        {
          name: "APPR_STATUS",
          title: "STATUS",
          sortField: "APPR_STATUS",
        },
        {
          name: "USER_NAME",
          title: "LATEST UPDATE BY",
          sortField: "USER_NAME",
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

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .toString()
          .split(" ")
          .every(
            (v) =>
              item.SUBMISSION_DATE.toLowerCase().includes(v)
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

      },



      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
}
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
