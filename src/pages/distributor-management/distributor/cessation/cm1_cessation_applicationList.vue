<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Submission of Cessation</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-if="
                this.DISTDATA == 0 ||
                this.DISTDATA == null ||
                this.DISTDATA == ''
              "
              v-b-tooltip.hover
              title="Submit Cessation Form"
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
       <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Remark<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="readMoreSchema"
            :options="formOptions"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>
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
         <template slot="remarks" slot-scope="props">
              {{ props.rowData.FIMM_REMARK }}
              <span
                v-if="props.rowData.FIMM_REMARK != '-'"
                v-b-tooltip.hover
                v-on:click="readMore(props.rowData)"
                title="Read more"
                class="badge mr-2"
              >
                <i class="fa fa-window-restore"></i
              ></span>
            </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-if="props.rowData.TS_ID == 1 || props.rowData.TS_ID == 7 || props.rowData.FIMM_TS_ID == 7"
              v-b-tooltip.hover
              title="Edit Submission Form"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

            <span
              v-if="props.rowData.TS_ID != 7 && props.rowData.TS_ID != 1 || props.rowData.FIMM_TS_ID != 7"
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
import Vudal from "vudal";

export default {
  mounted() {
    this.getAllList();
  },

  components: {Vudal,},

  methods: {
    // create
    create() {
      this.$router.push("/distributor/new-cessation-submission");
    },

    back() {
      this.$router.go(-1);
    }, // back button

    async filterRecord() {
      try {
        //alert(JSON.stringify(this.model));
        const response = await servicesModule1.filterSuspendRevokeRecordList(
          this.model
        );
        if (response != "error") {
          this.RecordList = response;
        }
      } catch (error) {}
    },

    // getAllRecord
    getAllList: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getSubmissionList(
        JSON.parse(user).USER_DIST_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
      this.DISTDATA = this.RecordList.length;
    },

    async viewRecord(data) {
      localStorage.setItem("view-cessation-submission", JSON.stringify(data));
      this.$router.push({
        name: "view-cessation-submission",
      });
    },

    async editRecord(data) {
      localStorage.setItem("edit-cessation-submission", JSON.stringify(data));
      this.$router.push({
        name: "edit-cessation-submission",
      });
    },
     async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.FIMM_REMARK_FULL;
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
          title: "CREATION DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "CESSATION_NAME",
          title: "CESSATION TYPE",
          sortField: "CESSATION_NAME",
        },
        {
          name: "CESSATION_DATE",
          title: "CESSATION DATE",
          sortField: "CESSATION_DATE",
        },

        {
          name: "TS_PARAM",
          title: "ACTION BY DISTRIBUTOR",
          sortField: "TS_PARAM",
        },
        {
          name: "USER_NAME",
          title: "UPDATE BY",
          sortField: "USER_NAME",
        },
        {
          name: "LATEST_UPDATE",
          title: "LATEST UPDATE",
          sortField: "LATEST_UPDATE",
        },
         {
          name: "FIMM_STATUS",
          title: "ACTION BY FIMM",
          sortField: "FIMM_STATUS",
        },
         {
          name: "__slot:remarks",
          title: "Remarks",
          sortField: "FIMM_REMARK",
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
          .every((v) => item.SUBMISSION_DATE.toLowerCase().includes(v));
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
      DISTDATA: "",


      model: {
        showRemark: "",
      },


        readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
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
