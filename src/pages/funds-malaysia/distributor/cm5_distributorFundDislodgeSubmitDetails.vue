<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Funds</h4>
      <br />
    </div>
    <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="search"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>
    <br />
    <br />
    <vudal name="remarkModal" class="widthModal">
      <div class="header">
        Fund Profile Detail
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <div>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%"><b>Umbrella Fund</b></td>
                <td style="width: 1%">:</td>
                <td>
                  <div
                    v-if="
                      getDataFundProfile.UMBRELLA_FUND_NAME != null &&
                      getDataFundProfile.UMBRELLA_FUND_NAME != '' &&
                      getDataFundProfile.UMBRELLA_FUND_NAME != 'null'
                    "
                  >
                    {{ getDataFundProfile.UMBRELLA_FUND_NAME }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>Fund Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_NAME != null &&
                    getDataFundProfile.FUND_ANME != '' &&
                    getDataFundProfile.FUND_NAME != 'null'
                  "
                >
                  {{ getDataFundProfile.FUND_NAME }}
                </div>
              </td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Scheme Structure</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_SCHEME != null &&
                    getDataFundProfile.FUND_SCHEME != ''
                  "
                >
                  {{ getDataFundProfile.FMS_SCHEME_NAME }}
                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_SCHEME == null ||
                    getDataFundProfile.FUND_SCHEME == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Launch Date</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_DATE_LAUNCH != null &&
                    getDataFundProfile.FUND_DATE_LAUNCH != ''
                  "
                >
                  {{ getDataFundProfile.FUND_DATE_LAUNCH }}
                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_DATE_LAUNCH == null ||
                    getDataFundProfile.FUND_DATE_LAUNCH == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Expiry Date</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_DATE_EXPIRY != null &&
                    getDataFundProfile.FUND_DATE_EXPIRY != ''
                  "
                >
                  {{ getDataFundProfile.FUND_DATE_EXPIRY }}
                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_DATE_EXPIRY == null ||
                    getDataFundProfile.FUND_DATE_EXPIRY == '0000-00-00'
                  "
                >
                  -
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
    <div class="mt-5 col-12">
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
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
          </h5>
        </template>
      </va-data-table>
    </div>
    <div>
      <button
        size="sm"
        class="btn btn-primary ml-2"
        type="button"
        @click="selectAll"
      >
        <i class="mr-2"></i>Select All
      </button>
    </div>
    <br />
    <div>
      <h4 slot="header" class="card-title">Fund Dislodgement Entry</h4>
      <br />
      <va-data-table
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
        <template slot="TERMINATION_DATE" slot-scope="row">
          <va-date-picker
            :config="{ dateFormat: 'Y-m-d' }"
            v-model="row.rowData.TERMINATION_DATE"
          />
        </template>
        <template slot="DISLODGE_DATE" slot-scope="row">
          <va-date-picker
            :config="{ dateFormat: 'Y-m-d' }"
            :allowedDays="(date) => date.getDay() <= !date.getDay()"
            v-model="row.rowData.DISLODGE_DATE"
            stateful
          />
        </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
            <!-- <span
              v-b-tooltip.hover
              title="Remove"
              @click="removeParticipant(props.rowData)"
              class="badge badge-danger mr-1"
            >
              <i class="fa fa-ban"></i>
            </span> -->
          </h5>
        </template>
      </va-data-table>
    </div>
    <div>
      <button
        size="sm"
        class="btn btn-danger ml-2"
        type="button"
        @click="unselectAll"
      >
        <i class="mr-2"></i>Unselect All
      </button>
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
    </div>
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill float-left btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <button
      @click.once="submitLodge"
      type="button"
      class="btn btn-primary btn-fill float-right btn-md"
    >
      Submit
    </button>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import Vue from "vue";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getFPLodge();
    console.log(JSON.stringify(this));
  },
  components: {
    Vudal,
  },

  methods: {
    // searh
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
      this.$router.push({
        name: "fundDisLodgementCompany",
      });
    }, // back button

    getFPLodge: async function () {
      const user = localStorage.getItem("user");
      const data = JSON.parse(user).USER_DIST_ID;
      const data2 = this.$route.params.DISTRIBUTOR.DIST_ID;
      // console.log(data2);
      const response = await servicesModule5.getLodgedFund(data, data2);
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async viewRecord(data) {
      const response = await servicesModule5
        .getFundProfileReviewDetails(JSON.stringify(data.FUND_PROFILE_ID))
        .then((res) => {
          this.getDataFundProfile = res;

          console.log(this.getDataFundProfile);
        });

      this.$modals.remarkModal.$show();
    },
    async removeParticipant(data) {
      this.selected.splice(data);
      console.log(this.selected);
    },
    async selectAll() {
      const user = localStorage.getItem("user");
      const data2 = this.$route.params.DISTRIBUTOR.DIST_ID;
      const data = JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule5.getLodgedFund(data, data2);
      this.selected = response;
      console.log(this.selected);
    },
    async unselectAll() {
      this.selected = [];
    },
    async submitLodge() {
      if (confirm("Are you sure to request dislodge on the selected fund?")) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        if (this.model.FUND_DISLODGE_DOC.length != 0) {
          for (let i = 0; i < this.model.FUND_DISLODGE_DOC.length; i++) {
            data.append("FUND_DISLODGE_DOC[]", this.model.FUND_DISLODGE_DOC[i]);
          }
        }
        data.append("FUND_DISLODGE_LIST", JSON.stringify(this.selected));
        try {
          const response = await servicesModule5.createFundDislodgement(data);
          alert("Fund selected has been requested to be dislodge");
          this.$router.push({ name: "fundDisLodgementMainList" });
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
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "FUND_DATE_LAUNCH",
          title: "LAUNCH DATE",
          sortField: "FUND_DATE_LAUNCH",
          width: "8%",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
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
          title: "FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "FUND_DATE_LAUNCH",
          title: "LAUNCH DATE",
          sortField: "FUND_DATE_LAUNCH",
          width: "8%",
        },
        {
          name: "__slot:TERMINATION_DATE",
          title: "TERMINATION AGREEMENT DATE",
          dataClass: "justify-content-center",
          width: "15%",
        },
        {
          name: "__slot:DISLODGE_DATE",
          title: "EXPECTED DISLODGEMENT DATE",
          dataClass: "justify-content-center",
          width: "15%",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    fundProfileFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter((item) => {
        // return item.title.toLowerCase().startsWith(this.term.toLowerCase()) ,
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every(
            (v) =>
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_CODE_MEMBER.includes(v) ||
              item.FUND_NAME.includes(v) ||
              item.DIST_NAME.includes(v)
          );
      });
    },
  },

  data() {
    return {
      header: "",
      getDataFundProfile: "",
      field: [],
      selected: [],
      TERMINATION_DATE: [],
      DISLODGE_DATE: [],
      FUND_DISLODGE_DOC: "",
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
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
        TERMINATION_DATE: "",
        DISLODGE_DATE: "",
        FUND_DISLODGE_DOC: [],
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
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "FUND_DISLODGE_DOC",
                type: "vfg-custom-multiple-file-edit",
                styleClasses: "col-md-12",
                hint: "Maximum uploaded file size is 5MB. Accepted format : (.PDF)",
              },
            ],
          },
        ],
      },
      TERMINATION_DATE: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "TERMINATION_DATE",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                required: true,
              },
            ],
          },
        ],
      },
      DISLODGE_DATE: {
        groups: [
          {
            fields: [
              {
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DISLODGE_DATE",
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

<style scoped>
.widthModal {
  width: 80%;
}
</style>
