<template>
  <va-card>
    <!-- Header -->
    <div class="row">
      <h4 slot="header" class="card-title">NAV Management : New Submission</h4>
      <br />
    </div>
  <!-- List start -->
  <va-card>
    <div class="row">
      <div class="flex md6">
        <div class="row">
          <div class="flex xs12 md5">
            <datepicker
              :value="term"
              @input="isDatePicked"
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
    <br />
    <va-data-table
      :fields="fundProfile"
      :data="fundProfileFilteredData"
      no-data-label="No data found"
      :per-page="parseInt(perPage)"
      :datacount="fundprofileRecordCount"
      :dataperpage="parseInt(perPage)"
      clickable
    >
      <template slot="chkApprove" slot-scope="row">
        <label class="form-checkbox">
          <input type="checkbox" v-model="selected" :value="row.rowData" />
          <i class="form-icon"></i>
        </label>
      </template>
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
    </va-data-table>
    <br>
      <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 10%">NAV Excel Template</td>
                <td>  <vue-json-to-csv
        :json-data="fundProfileFilteredData"
        :csv-title="'NAV_Management_Template'"
        @success="(val) => handleSuccess(val)"
        @error="(val) => handleError(val)"
        :labels="{
          NAV_SUBMIT_TIMESTAMP: { title: 'DATE' },
          NAV_ID: { title: 'ID' },
          FUND_CODE_FIMM: { title: 'FIMM Fund Code' },
          FUND_NAME: { title: 'Fund Name' },
          PREV_NAV_VAL: { title: 'Previous NAV Unit Value' },
          NAV_VAL: { title: 'NAV Unit Value' },
          AMMEND_NAV_VAL: { title: 'AMMEND NAV PRICE' },
          VALUATION_DATE: { title: 'VALUATION DATE' },
        }"
      >
        <b-button
          v-b-tooltip.hover
          title="Export NAV Template as Excel"
          class="mr-1"
          variant="success"
        >
          <i class="fa fa-download"> Download</i>
        </b-button>
      </vue-json-to-csv>
</td>
              </tr>
            </tbody>
      </table>
  </va-card>
    <!-- List end -->
    <br />
    <br>
    <br>
    <!-- Update NAV start -->
    <va-card>
    <div>
      <h4 slot="header" class="card-title">Update for NAV</h4>
      <br />
      <va-data-table
        :showPagination="false"
        :fields="fundLodge"
        :data="selected"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="fundlodgeRecordCountSelected"
        :dataperpage="parseInt(perPage)"
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="NAV_VAL" slot-scope="row">
          <the-mask mask="#.####" v-model="row.rowData.NAV_VAL" />
        </template>
        <template slot="EXPECTED_DATE" slot-scope="row">
          <va-date-picker :config="{ dateFormat: 'd-M-Y' }" v-model="row.rowData.EXPECTED_DATE"/>
        </template>
        <template slot="REMARK" slot-scope="row">
          <multiselect
            v-model="row.rowData.REMARK_DROPDOWN"
            :options="options"
            label="name"
            track-by="name"
          ></multiselect>
        </template>
        <template slot="SUPP_DOC" slot-scope="row">
          <div id="app">
            <VueFileAgent
              :uploadUrl="'https://example.com'"
              :uploadHeaders="{}"
              :multiple="false"
              :deletable="true"
              :linkable="true"
              :editable="false"
              :accept="'.pdf'"
              :maxSize="'2MB'"
              :maxFiles="8"
              :helpText="'Select files'"
              :errorText="{
                type: 'Please select images, videos, pdf or zip files',
                size: 'You selected a larger file!',
              }"
              :thumbnailSize="120"
              :theme="'list'"
              @select="
                filesSelected($event, row.rowData.suppDoc, row.rowData.NAV_ID)
              "
              v-model="SUPP_DOC"
            ></VueFileAgent>
            <!-- <va-file-upload v-model="row.rowData.SUPP_DOC" dropzone /> -->
          </div>
        </template>

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="Remove"
              @click="removeParticipant(props.rowData)"
              class="badge badge-danger mr-1"
            >
              <i class="fa fa-ban"></i>
            </span>
          </h5>
        </template>
      </va-data-table>
    </div>
    <br />
    <br />
    <div class="ml-1 col-md-12">
      <vue-form-generator
        :model="model"
        :schema="dataSchema"
        :options="formOptions"
        ref="dataSchemaForms">
      </vue-form-generator>
      <br />
      <br />
      <div class="float-right">
        <button
          v-if="this.model.FUND_LODGE_DOC != ''"
          @click="upload"
          type="button"
          class="btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Upload
        </button>
      </div>
    </div>
    <!-- Update NAV end-->
    </va-card>
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill float-left btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
    <button
        @click="submitNAVManage"
        type="button"
        style="background: #87cb16; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as services01Module5 from "../../../../app/module5/services01";
import * as servicesModule5 from "../../../../app/module5/services03";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
import VueJsonToCsv from "vue-json-to-csv";

Vue.use(VueJsonToCsv);

export default {
  mounted() {
    this.getAllFund();
  },
  components: {},

  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    async filterFundProfile() {
      try {
        const response = await servicesModule5.fundprofileRecordList(
          this.model.modelFilter
        );
        if (response !== "error") {
          this.fundprofileRecordList = response;
        }
      } catch (error) {}
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllFund: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule5.getForNAVManage(JSON.parse(user).USER_DIST_ID);
      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;
    },
    getSelectedFund: async function () {
      // const response = await servicesModule5.getForNAVManage(JSON.parse(user).USER_DIST_ID);
      // this.RecordList = response;
      // this.RecordCount = this.RecordList.length;
    },

    async submitSubmission() {
      if (confirm("Are you sure to submit the selected NAV?")) {

        //notification
        data.append("NOTI_LOCATION", "navManagementPendingVerificationList");
        data.append("NOTI_REMARK", "(NAV MANAGEMENT) New Submission pending for verification");
        const approvalLevel = await services06Module0.getApprovalLevelDistributor(26, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));


        try {
          const response = await servicesModule5.createNAVManageApplication(
            data
          );
          //alert("NAV Selected has been submitted.");
          this.getFPLodge();
          this.$router.push("navManagementList");
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },

  },

  computed: {
    caRecordFields() {
      return [
        {
          name: "__slot:chkApprove",
          width: "10px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAV_SUBMIT_TIMESTAMP",
          title: "DATE",
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_CODE_MEMBER",
          title: "MEMBER FUND CODE",
          sortField: "FUND_CODE_MEMBER",
        },
        {
          name: "FUND_NAME_SHORT",
          title: "FUND SHORT NAME",
          sortField: "FUND_NAME_SHORT",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "NAV_VAL",
          title: "TODAY'S PRICE",
          sortField: "NAV_VAL",
          width: "8%",
        },
      ];
    },
    fundLodge() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAV_SUBMIT_TIMESTAMP",
          title: "DATE",
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_CODE_MEMBER",
          title: "MEMBER FUND CODE",
          sortField: "FUND_CODE_MEMBER",
        },
        {
          name: "FUND_NAME_SHORT",
          title: "FUND SHORT NAME",
          sortField: "FUND_NAME_SHORT",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "PREV_NAV_VAL",
          title: "PREVIOUS PRICE",
          sortField: "PREV_NAV_VAL",
          width: "4%",
        },
        {
          name: "__slot:NAV_VAL",
          title: "AMMEND PRICE",
          width: "4%",
        },
        {
          name: "__slot:EXPECTED_DATE",
          title: "VALUATION DATE",

          dataClass: "justify-content-center",
          width: "10%",
        },
        {
          name: "__slot:REASON",
          title: "REMARK",
          dataClass: "justify-content-center",
          width: "10%",
        },
        {
          name: "__slot:DOC",
          title: "SUPPORTING DOCUMENT",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },

    fundProfileFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter((item) => {
        // alert(JSON.stringify(item.NAV_SUBMIT_TIMESTAMP));
        console.log(this.term);
        return this.term

          .toString()
          .toUpperCase()
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_FIMM.toLowerCase().includes(v) ||
              item.FUND_CODE_MEMBER.toLowerCase().includes(v) ||
              item.FUND_NAME_SHORT.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.NAV_SUBMIT_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase()
              )
          );
      });
    },
  },

  data() {
    return {
      props: ['modelValue'],

      options: [
        { id: 849, name: "Delayed Asset Valuation" },
        { id: 850, name: "3rd Party Delays" },
        { id: 851, name: "NAV Error" },
      ],
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      caRecordList: [],
      count: 1,


      dateFormat:"",

      schemaFilterList: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "Search Date",
                model: "search_Date",
                noLabel: false,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "",
              },
              {
                type: "vueMultiSelect",
                model: "lodge_Status",
                placeholder: "Status",
                styleClasses: "",
                selectOptions: {
                  multiple: true,
                  key: "",
                  label: "",
                  searchable: true,
                },
              },
            ],
          },
        ],
      },

      model: {
        search_Date: null,
        DATE_EXPECTED: "",
        DATE_DASDALETTER: "",
        FUND_LODGE_DOC: "",
        SELECT_DATE: "",
        CONVERT_SELECT_DATE: "",
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: "",
        },
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "BULK UPLOAD",
                accept: ".xls,xlsx,csv ",
                multiple: true,
                text: "Choose a File",
                model: "FUND_LODGE_DOC",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      REMARK_DROPDOWN: {
        groups: [
          {
            fields: [
              {
                type: "vfg-dropdown",
              },
            ],
          },
        ],
      },
      EXPECTED_DATE: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_EXPECTED",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                required: true,
              },
            ],
          },
        ],
      },
      DASDALETTER_Date: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_DASDALETTER",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                required: true,
              },
            ],
          },
        ],
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_FIMM",
                label: "Fund Code",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_CODE_MEMBER",
                label: "Member Fund Code",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.FUND_NAME",
                label: "Fund Name",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.UMBRELLA_FUND_NAME",
                label: "Umbrella Fund Name",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: false,
      },
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
