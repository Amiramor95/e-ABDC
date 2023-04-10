<template>
  <div v-if="!isReady" style="margin-top: 25%">
    <div class="text-center text-success my-2">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>
  <va-card v-else>
    <div class="row">
      <h4 slot="header" class="card-title">Waiver : List of Submissions</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="New Waiver Submission"
              v-on:click="create"
              class="badge badge-primary"
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
              v-b-tooltip.hover
              v-if="props.rowData.TS_ID == 1"
              title="Edit Waiver Submission "
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
             <span
              v-b-tooltip.hover
              v-if="props.rowData.TS_ID == 7"
              title="Resubmit Waiver Submission "
              v-on:click="resubmitRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
            <span
              v-b-tooltip.hover
              title="View Waiver Submission"
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
import Vudal from "vudal";
import moment from "moment";

export default {
  mounted() {
    this.getWaiverSubmissionList();
  },
  components: {Vudal},

  methods: {
     clear() {
      this.dateFormat = null;
      this.term = null;
    },
      searchDate(date) {
      this.term = moment(date).format("DD-MMM-y");
    },
     async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.FIMM_REMARK_FULL;
    },
    // create
    create() {
      this.$router.push("/distributor/new-waiver-submission");
    },
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() { this.$router.go(-1);},

    // getAllRecord
    getWaiverSubmissionList: async function () {
      const user = JSON.parse(localStorage.getItem('user')).user_id;
      const res = await servicesModule4.getCompanyId(user);

      // (DISTRIBUTOR_ID)
      const response = await servicesModule4.getWaiverByDistID(res.USER_DIST_ID );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;

      this.isReady=true;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "view-waiver-submission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "view-waiver-submission",
      });
    },
     async editRecord(data) {
      localStorage.setItem(
        "edit-waiver-submission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "edit-waiver-submission",
      });
    },

      async resubmitRecord(data) {
      localStorage.setItem(
        "resubmit-waiver-submission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "resubmit-waiver-submission",
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
          title: "REFERENCE NO",
          sortField: "WAIVER_CODE",
        },
        {
          name: "TOTAL_COUNT",
          title: "TOTAL PARTICIPANT",
          sortField: "TOTAL_COUNT",
        },
        {
           name: "USER_NAME",
          title: "SUBMISSION BY",
          sortField: "USER_NAME",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
          {
          name: "__slot:remarks",
          title: "REMARK BY FIMM",
          sortField: "FIMM_REMARK",
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
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.WAIVER_CODE.toLowerCase().includes(v) ||
              item.USER_NAME.toLowerCase().includes(v) ||
               item.CREATE_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase()
              )
          );
      });
    },
  },

  data() {
    return {
      isReady:false,
      dateFormat: "",
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,

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
