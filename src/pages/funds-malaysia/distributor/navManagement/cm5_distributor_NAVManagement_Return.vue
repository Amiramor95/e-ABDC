<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">NAV Management</h4>
      <br />
      <br />
    </div>

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
    <div class="float-right btn-md">
      <vue-json-to-csv
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
          <i class="fa fa-file-excel-o"> Download Template</i>
        </b-button>
      </vue-json-to-csv>
    </div>

    <br />
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
          <va-date-picker
            :config="{ dateFormat: 'd-M-Y' }"
            v-model="row.rowData.EXPECTED_DATE"
          />
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
    <div class="ml-1 col-md-11">
      <vue-form-generator
        :model="model"
        :schema="fileUploadSchema"
        :options="formOptions"
        ref="fileUploadForm"
      >
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
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill float-left btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <button
      @click="submitNAVManage"
      type="button"
      class="btn btn-primary btn-fill float-right btn-md"
    >
      <i class="fa fa-paper-plane" /> &nbsp; Submit
    </button>
  </va-card>
</template>

<script>
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../../app/module5/services03";
import moment from "moment";
import VueJsonToCsv from "vue-json-to-csv";

Vue.use(VueJsonToCsv);

export default {
  mounted() {
    this.getFPLodge();

    this.getNAVManageSubmitData();
  },
  components: {
    VueJsonToCsv,
  },

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
      // const data = this.$route.params.FUNDHOUSE.FMS_UMBRELLA_FUND_ID;
      // this.$router.push({
      //   name: "fundLodgementCompany",
      //   params: { FUNDHOUSE: data }
      // });
    }, // back button
    clear() {
      //this.model.SELECT_DATE = null;
      this.term = "";
    },
    isDatePicked(date) {
      this.term = moment(date).format("DD-MMM-y");
    },
    getFPLodge: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule5.getForNAVManage(
        JSON.parse(user).USER_DIST_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    getNAVManageSubmitData: async function () {
      const NAVDATA = localStorage.getItem("NAVDATA");
      const response = await servicesModule5.getForNAVManageSubmitData(
        JSON.parse(NAVDATA).NAV_TEMP_BULK_ID
      );
      this.selected = response;
      this.fundlodgeRecordCountSelected = this.selected.length;
    },
    async viewRecord(data) {
      this.$router.push({
        name: "fundCreation-review",
        params: { FUNDPROFILE: data },
      });
    },
    //UPLOAD EXCEL
    async upload() {
      if (confirm("Are you sure you want to bulk upload this NAV data?")) {
        const data = new FormData();
        data.append("file", this.model.FUND_LODGE_DOC);
        const user = JSON.parse(localStorage.getItem("user")).user_id;

        data.append("CREATE_BY", user);

        try {
          console.log("begin import");
          console.log(data);
          const response1 = await servicesModule5.importExcelNavManage(data);
          console.log(response1);
          console.log("Import success");
          alert(response1);
          const response = await servicesModule5.getNAVManageBulkData(
            JSON.parse(localStorage.getItem("user")).user_id
          );
          this.selected = response;
        } catch (error) {
          console.log(error);
        }
      }
    },
    filesSelected: function (fileRecordsNewlySelected, suppDoc, docId) {
      this.uploadFileOject = [];
      this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        // var data = {

        // alert(this.docIdArray[i])
        //   docId: docId,
        //   file: this.fileRecordsForUpload[i].file
        // };

        // this.uploadFileOject[i]['docId'] = this.docIdArray[i];
        // this.uploadFileOject[i]['file'] = this.fileRecordsForUpload[i].file;

        //  this.uploadFileOject.push(data);
        // this.uploadFileOject.push({docId:this.fileRecordsForUpload[i].file})
        //  this.uploadFileOjectId.push(this.docIdArray[i]);
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },
    async submitNAVManage() {
      if (confirm("Are you sure to submit the selected NAV?")) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("USER_ID", JSON.parse(user).user_id);
        // if (this.model.FUND_LODGE_DOC.length != 0) {
        //   for (let i = 0; i < this.model.FUND_LODGE_DOC.length; i++) {
        //     data.append("FUND_LODGE_DOC[]", this.model.FUND_LODGE_DOC[i]);
        //   }
        // }
        console.log(this.selected);
        console.log(JSON.stringify(this.selected));
        data.append("NAV_TEMP_LIST", JSON.stringify(this.selected));
        data.append("SUPP_DOC", this.SUPP_DOC);

        //notification
        data.append("NOTI_LOCATION", "navManagementSecondLevelList");

        data.append("NOTI_REMARK", "(DISTRIBUTOR) NEW NAV Management Submission");
        const approvalLevel = await services06Module0.getApprovalLevelDistributor(26, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        try {
          // const response = await servicesModule5.createFundLodgement(data);
          const response = await servicesModule5.createNAVManageApplication(
            data
          );
          alert("NAV Selected has been submitted.");
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
    fundProfile() {
      return [
        // {
        //   name: "__checkbox",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        //   width: "5%"
        // },
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
        // {
        //   name: "PREV_NAV_VAL",
        //   title: "PREVIOUS PRICE",
        //   sortField: "PREV_NAV_VAL",
        //   width: "8%"
        // },
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
          title: "PRICE",
          dataClass: "justify-content-center",
          width: "4%",
        },
        {
          name: "__slot:EXPECTED_DATE",
          title: "VALUATION DATE",
          dataClass: "justify-content-center",
          width: "10%",
        },
        {
          name: "__slot:REMARK",
          title: "REMARK",
          dataClass: "justify-content-center",
          width: "10%",
        },
        {
          name: "__slot:SUPP_DOC",
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
      options: [
        { id: 849, name: "Delayed Asset Valuation" },
        { id: 850, name: "3rd Party Delays" },
        { id: 851, name: "NAV Error" },
      ],
      header: "",
      field: [],
      selected: [],
      DATE_EXPECTED: [],
      DATE_DASDALETTER: [],
      FUND_LODGE_DOC: "",
      suppDoc: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
      fileRecordsForUpload: [],
      fundprofileRecordCount: null,
      fundlodgeRecordCountSelected: null,
      count: 1,

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
                accept: ".xls,xlsx ",
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
