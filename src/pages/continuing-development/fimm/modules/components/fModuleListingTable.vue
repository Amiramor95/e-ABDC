<template>
  <va-card class="mt-5 col-12">
    <RemarkPopup :model="model" />
    <b-row class="justify-content-end">
      <b-col cols="3">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </b-col>
      <b-col cols="3">
        <div class="input-group">
          <va-date-picker
            :value="termDate"
            @input="searchDate"
            :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
            v-model="dateFormat"
            placeholder="Search date"
          />
          <div class="input-group-append">
            <button
              @click="clear"
              type="button"
              class="btn btn-md btn-primary"
            >
              <va-icon name="fa fa-refresh" />
            </button>
          </div>
        </div>
      </b-col>
    </b-row>

    <vudal name="simpleModal" class="widthModal">
      <div class="header">
        Remark/Comments<i class="close icon">&times;</i>
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
      :fields="fields"
      :data="filterData"
      no-data-label="No data found"
      :per-page="perPage"
      :datacount="count"
      :dataperpage="perPage"
      clickable
    >
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
      <template slot="cpd_id" slot-scope="props">
        <span v-if="props.rowData.MODULE_CODE">{{
          props.rowData.MODULE_CODE
        }}</span>
      </template>
      <template slot="remarks" slot-scope="props"
       >
        <span
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
            title="View Details Program"
            v-if="props.rowData.PUBLISH_STATUS"
            v-on:click="viewRecord(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-eye" ></i
            >
          </span>
          <span
            v-b-tooltip.hover
            title="Edit Program"
            v-on:click="viewRecord(props.rowData)"
            v-if="!props.rowData.PUBLISH_STATUS"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-pencil" ></i>
          </span>


          <span
            v-b-tooltip.hover
            v-if="props.rowData.TS_ID == 15"
            title="Request for return"
            v-on:click="returnRecord(props.rowData)"
            class="badge badge-warning mr-2"
          >
            <i class="fa fa-reply"></i
          ></span>
          <span
            v-b-tooltip.hover
            v-if="props.rowData.TS_ID == 30 && (props.rowData.REVOKE_ACTION == '0')"
            title="Submit Appeal Application"
            v-on:click="appealProgram(props.rowData)"
            class="badge badge-success mr-2"
          >
              <i class="fa fa-paper-plane"></i
              ></span>

          <span
            v-if="props.rowData.TS_ID == 3"
            v-b-tooltip.hover
            title="Amend Program"
            v-on:click="amendRecord(props.rowData)"
            class="badge badge-primary mr-2"
          >
              <i class="fa fa-bars"></i
              ></span>
        </h5>
      </template>
    </va-data-table>
  </va-card>
</template>
<script>
import * as services06Module0 from "../../../../../app/module0/services06";
import { debounce } from "lodash";
import RemarkPopup from "./remarkPopup";

import Vudal from 'vudal'
export default {
  components: {
    RemarkPopup,
    Vudal,

  },
  methods: {
    clear() {
      this.term = null;
      this.termDate = null;
      this.dateFormat = null;

      this.clearFilter()
    },
    clearFilter(){
      this.$emit("clear");
    },
    search: debounce(function (value) {
      console.log('search' +value);
      this.term = value;
      this.$emit("filter", value);
    }, 400),
    searchDate: debounce(function (value) {
      console.log('search date' +value);

      this.termDate = value;
      this.$emit("filter-date", value);
    }, 400),
    async viewRecord(data) {
      this.$router.push({
        name: this.viewPage,
        params: { id: data.MODULE_ID },
        query: this.viewPageQuery
      });
    },
    async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_REMARK;
    },
    async appealProgram(data) {
      localStorage.setItem(
        "f-readingAppealProgram",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "f-readingAppealProgram",
      });
    },
    async amendRecord(data) {
      localStorage.setItem(
        "f-readingAmendProgram",
        JSON.stringify(data)
      );
      this.$router.push({
        name:"f-readingAmendProgram",
      });
    },

    returnRecord: async function (rowData) {
      if (confirm("Are you sure to return of this submission?")) {
        const data = new FormData();
        data.append("MODULE_ID", rowData.MODULE_ID);
        data.append("TS_ID", 19);
        data.append("NOTI_LOCATION", this.notiLocation(rowData.MODULE_TYPE));
        var remarkEntry =
          "(" + this.remarkTitle(rowData.MODULE_TYPE) + ")This Entry has been request for return";
        data.append("NOTI_REMARK", remarkEntry);

        const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        this.$emit("return-form", data);
      }
    },
    notiLocation(type) {
      let loc = "";
      if (type == 1) {
        loc = "approvalWritingDistributorList";
      } else if (type == 2) {
        loc = "approvalReadingDistributorList";
      } else if (type == 3) {
        loc = "approvalTeachingDistributorList";
      } else if (type == 4) {
        loc = "approvalAcademicDistributorList";
      } else if (type == 5) {
        loc = "approvalFPDistributorList";
      }

      return loc;
    },
    remarkTitle(type) {
      let title = "";
      if (type == 1) {
        title = "CPD-Writing";
      } else if (type == 2) {
        title = "CPD-Reading";
      } else if (type == 3) {
        title = "CPD-Teaching";
      } else if (type == 4) {
        title = "CPD-Academic";
      } else if (type == 5) {
        title = "CPD-FP";
      }

      return title;
    },
  },
  data() {
    return {
      term: null,
      termDate: null,
      dateFormat: null,
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
  props: {
    filterData: {
      required: true,
      type: Array,
    },
    perPage: {
      required: true,
      type: Number,
    },
    count: {
      required: true,
      type: Number,
    },
    viewPage: {
      required: true,
      type: String,
    },
    viewPageQuery: {
      required: false,
      type: Object
    },
    // getAllRecord:{
    //   required:false,
    //   type: Function,
    // }
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "__slot:cpd_id",
          title: "CPD ID",
          sortField: "",
        },
        {
          name: "TOTAL_PARTICIPANT",
          title: "TOTAL PARTICIPANT",
          sortField: "",
        },
        {
          name: "F_CREATE_BY",
          title: "SUBMISSION BY",
          sortField: "",
        },
        {
          name: "TS_ID_DESCRIPTION",
          title: "STATUS",
          sortField: "",
        },
        {
          name: "__slot:remarks",
          title: "Remark by FIMM",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION DATE",
          sortField: "",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
  },
};
</script>

<style>
  .input-group-prepend .btn, .input-group-append .btn{
    z-index: 0 !important;
  }
</style>
