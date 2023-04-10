<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Alert : List of Cases Pending for Approval</h4>
       <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span

              v-b-tooltip.hover
              title="List of Consultant Alert Records by Cases"
              v-on:click="viewList"
              class="badge badge-primary"
            >
              <i class="fa fa-bars"></i
              ></span>
          </h5>
        </div>
      </div>
    </div>
    <!-- list table-->
    <va-card class="mt-5 col-12">
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
        :fields="caRecordFields"
        :data="caRecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="caRecordCount"
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
              title="Approve Case"
              v-on:click="verifyCase(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
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
import moment from "moment";
import * as servicesModule3 from "../../../app/module3/services01";

export default {
  mounted() {
    this.getApprRecordById();
  },
  components: {},

  methods: {
      viewList () {
      this.$router.push('/fimm/consultantAlert-viewList')
    },

    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    //searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    searchDate(date) {
      this.term = moment(date).format("DD-MMM-y");
    },

    getApprRecordById: async function () {
      const user = localStorage.getItem("user");
      var APPR_GROUP_ID = JSON.parse(user).USER_GROUP_ID;
      const response = await servicesModule3.getApprRecordById(APPR_GROUP_ID);

      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;
    },
    async verifyCase(data) {
      localStorage.setItem(
        "consultantAlert-gmLraCaseApproval",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "consultantAlert-gmLraCaseApproval",
      });
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button
  },

  computed: {
    caRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Creation Date",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "CONSULTANT_NAME",
          title: "Consultant Name",
          sortField: "CONSULTANT_NAME",
        },
        {
          name: "CONSULTANT_NRIC",
          title: "NRIC Number",
          sortField: "",
        },
        {
          name: "CONSULTANT_PASSPORT_NO",
          title: "Passport Number",
          sortField: "CONSULTANT_PASSPORT_NO",
        },
        {
          name: "SET_PARAM",
          title: "Classification",
          sortField: "SET_PARAM",
        },
        {
          name: "TS_PARAM",
          title: "Verification Status",
          sortField: "TS_PARAM",
        },

        {
          name: "LATEST_UPDATE",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
        },
        {
          name: "USER_NAME",
          title: "Update By",
          sortField: "USER_NAME",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    caRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
                item.SET_PARAM.toLowerCase().includes(v) ||
              item.CREATE_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase()
              ) ||
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NRIC.includes(v) ||
              item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v) ||
              item.SET_PARAM.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.USER_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      dateFormat: "",
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      caRecordList: [],
      count: 1,
      caRecordCount: null,
      consDetail: "",
      CONSULTANT: "",

      model: {},

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

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>
