<template>
  <div>
    <va-modal
      v-model="showStaticModal"
      title="Remark"
      :message="msg"
      no-dismiss
      cancel-text=""
      ok-text="Close"
      @ok="proceedToLogin"
    />
    <va-inner-loading :loading=false>
      <va-card>
        <div class="row">
          <h4 slot="header" class="card-title">List of NAV Management Application</h4>
          <br />

          <div class="col float-right">
            <div class="row float-right">

            </div>
          </div>
        </div>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <vue-form-generator
              :model="model"
              :schema="advancedSearchSchema"
              ref="advancedSearchForm"
            >
            </vue-form-generator>
            <br />
          </b-card>
        </b-collapse>
        <br />
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
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="remark" slot-scope="rem1">
              <span
                v-if="
                  rem1.rowData.Status == 'APPROVED' ||
                  rem1.rowData.Status == 'RETURNED'
                "
                v-b-tooltip.hover
                title="view"
                v-on:click="viewmodel(rem1.rowData)"
                class="mr-2"
              >
                <i class="fa fa-clone"></i
              ></span>
              <p
                v-if="
                  rem1.rowData.Status == 'DRAFT' ||
                  rem1.rowData.Status == 'ACTIVE'
                "
              >
                {{ rem1.rowData.SECOND_LEVEL_REMARK }}
              </p>
            </template>
            <template slot="status" slot-scope="row">
              <span
                v-if="
                  row.rowData.TS_ID == 15
                "
              >
                <p>PENDING</p>
              </span>
              <span
                v-if="
                  row.rowData.TS_ID == 3
                "
              >
                <p>APPROVED</p>
              </span>
              <span
                v-if="
                  row.rowData.TS_ID == 5
                "
              >
                <p>REJECTED</p>
              </span>
              <span
                v-if="
                  row.rowData.TS_ID == 8
                "
              >
                <p>RETURNED</p>
              </span>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span

                  v-b-tooltip.hover
                  title="view"
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
    </va-inner-loading>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getAllFundApplicationfimm();
    console.log(JSON.stringify(this));
  },
  components: {},

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
    viewmodel(data) {
      this.msg = data.SECOND_LEVEL_REMARK;
      this.showStaticModal = true;
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllFundApplicationfimm: async function () {
      const response = await servicesModule5.getNAVManageListID();
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      localStorage.setItem("NAVDATA", JSON.stringify(data));
      this.$router.push({
        name: "nav-id-approval",
        param: { NAVDATA : data },
      });
    },
  },

  computed: {
    fundProfile() {
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
          name: "Totalfund",
          title: "TOTAL FUND",
          sortField: "Totalfund",
        },
        {
          name: "__slot:status",
          title: "STATUS",
        },
        // {
        //   name: "__slot:remark",
        //   title: "REMARK",
        //   sortField: "SECOND_LEVEL_REMARK",
        // },
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
        return (
          this.term
            .toString()
            .toUpperCase()
            .split(" ")
            .every(
              (v) =>
                item.FUND_NAME.includes(v) ||
                item.DIST_NAME.includes(v) ||
                item.APPL_TYPE.includes(v)
            ) || item.TS_PARAM.includes(v)
        );
      });
    },
  },

  data() {
    return {
      showStaticModal: false,
      statusLoad: true,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,
      msg: "",
      model: {
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
                label: "FIMM Fund Code",
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
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.content i {
  font-style: normal;
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
