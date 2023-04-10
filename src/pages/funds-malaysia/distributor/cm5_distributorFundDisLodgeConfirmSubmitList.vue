<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">FUND DISLODGEMENT ENTRY</h4>
        <br />
      </div>

      <br />
      <!-- <div class="float-left">
      <div>
        <vue-form-generator
          :model="model"
          :schema="schemaFilterList"
          :options="formOptions"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
    </div> -->
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

      <!-- list table-->
      <va-card class="mt-5 col-12">
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
          <template slot="document" slot-scope="row">
            <span>
              <h4 class="mt-2">
                <span
                  v-if="row.rowData.DOCU_BLOB != '-'"
                  v-b-tooltip.hover
                  title="View Document"
                  v-on:click="viewPdf(row.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-file-pdf-o"></i
                ></span>
              </h4>
            </span>
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
        <div class="btn-fill float-right btn-md">
          <!-- <div class="">
            <div class="">
              <button @click="UnselectAll" type="button">
                Unselect All
              </button>
            </div>
          </div>

          <div class="">
            <div class="">
              <button @click="selectAll" type="button">Select All</button>
            </div>
          </div> -->
        </div>
        <br />
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
          @click="submitDisLodge"
          type="button"
          class="btn btn-primary btn-fill float-right btn-md"
        >
          Dislodge Fund
        </button>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";
import TreeViewIconsPreviewVue from "../../../components/ui/tree-view/TreeViewIconsPreview.vue";

export default {
  mounted() {
    this.getAllFundLodgement();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    // // advanceSearch
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getAllClassification()
    //   this.classificationList = response
    // },
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
    viewFundLodge() {
      this.$router.push({ name: "fundDisLodgementMainList" });
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    async submitDisLodge() {
      if (confirm("Are you sure to request dislodge on the selected fund?")) {
        this.statusLoad = true;
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("FUND_DISLODGE_LIST", JSON.stringify(this.selected));
        data.append("BULK_APPROVAL", 1);
        try {
          const response = await servicesModule5.submitHoldDisLodge(data);
          this.statusLoad = false;
          alert("Fund selected has been requested to be dislodge");
          this.$router.push({ name: "fundDisLodgementMainList" });
        } catch (e) {
          console.log(e);
          this.statusLoad = false;
        }
      } else {
      }
    },
    back() {
      this.$router.push({
        name: "fundDisLodgementMainList",
      });
    }, // back button
    viewPdf(document) {
      var byteCharacters = window.atob(document["DOCU_BLOB"]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], {
        type: "application/pdf;base64",
      });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },
    async removeParticipant(data) {
      if (
        confirm(
          "Are you sure to remove the request dislodge on the selected fund?"
        )
      ) {
        const user = localStorage.getItem("user");
        console.log(JSON.stringify(this.user));
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("FUND_DISLODGE_LIST", JSON.stringify(this.selected));
        data.append("BULK_APPROVAL", 1);
        try {
          const response = await servicesModule5.submitRemoveHoldDisLodge(data);
          alert("Fund selected has been removed to be dislodge");
          this.getAllFundLodgement();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    },
    // getAllRecord
    getAllFundLodgement: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule5.fund_DislodgeHold(
        JSON.parse(user).USER_DIST_ID
      );
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;

      this.statusLoad = false;
    },
    async viewRecord(data) {
      this.$router.push({
        // name: 'fundprofile-view',
        name: "fundDisLodgementConfirmView",
        params: { FUNDPROFILE: data },
      });
    },
    //selectAll
    selectAll: async function () {
      // const data = new FormData();
      // const user = localStorage.getItem("user");
      // data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        // const response = await servicesModule1.SelectAllFund(data);
        // this.getAllRecord();
        // this.getSelectedRecord();
      } catch (error) {
        console.log(error);
      }
    },

    //unselectAll
    UnselectAll: async function () {
      // const data = new FormData();
      // const user = localStorage.getItem("user");
      // data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        // const response = await servicesModule1.UnselectAllFund(data);
        // this.getAllRecord();
        // this.getSelectedRecord();
      } catch (error) {
        console.log(error);
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
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION DATE",
          sortField: "CREATE_TIMESTAMP",
          width: "8%",
        },
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        // {
        //   name: "UMBRELLA_FUND_NAME",
        //   title: "FUND HOUSE",
        //   sortField: "UMBRELLA_FUND_NAME",
        // },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "DIST_TYPE_NAME",
          title: "COMPANY TYPE",
          sortfield: "DIST_TYPE_NAME",
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR_NAME",
          sortField: "DIST_NAME",
        },
        {
          name: "TERMINATION_AGREEMENT_DATE",
          title: "TERMINATION AGREEMENT DATE",
          sortField: "TERMINATION_AGREEMENT_DATE",
          width: "8%",
        },
        {
          name: "DISLODGE_DATE",
          title: "EXPECTED DISLODGEMENT DATE",
          sortField: "DISLODGE_DATE",
          width: "8%",
        },
        {
          name: "FUND_DATE_LAUNCH",
          title: "LAUNCH DATE",
          sortField: "FUND_DATE_LAUNCH",
          width: "8%",
        },
        {
          name: "__slot:document",
          title: "TERMINATION AGREEMENT",
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
      statusLoad: true,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      selected: [],
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
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
        modelFilter: {
          FUND_CODE_FIMM: "",
          FUND_CODE_MEMBER: "",
          FUND_NAME: "",
          UMBRELLA_FUND_NAME: "",
        },
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
