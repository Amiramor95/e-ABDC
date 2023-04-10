<template>
<va-inner-loading :loading="statusLoad">
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of 3rd Party Submission
      </h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <span v-b-tooltip.hover title="Advanced Search">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
                ><i class="fa fa-search"></i
              ></b-badge>
            </h5>
          </span>
        </div>
      </div>
    </div>

    <br />
    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table
        :fields="fundProfile"
        :data="fundProfileFilteredData"
        no-data-label="No data found"
        :datacount="fundprofileRecordCount"
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
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services03";

export default {
  mounted() {
    this.getAllTpList();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    // search
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
        const response = await servicesModule5.getAllTPRegData(
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
    getAllTpList: async function () {
      const user = localStorage.getItem("user");
      const companyid = JSON.parse(user).TP_COMP_ID;
      const userid = JSON.parse(user).user_id;
      const response = await servicesModule5.getTPRegDataUser(companyid,userid);
      this.fundprofileRecordList = response;
      this.fundprofileRecordCount = this.fundprofileRecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      localStorage.setItem("TRP", JSON.stringify(data));
      console.log(data);
      if (data.TS_PARAM == "RETURNED"){
      this.$router.push({
        name: "company-registration",
        params: { thirdparty: data },
      });
      } else {
        this.$router.push({
        name: "company-registration-details",
        params: { thirdparty: data },
      });
      }
    },
    // async viewRecord (data) {
    //   this.$router.push({
    //     name: 'fundcreation-review',
    //     // params: { FUNDPROFILE: data },
    //   })
    // },
    // async addRecord () {},
  },

  computed: {
    fundProfile() {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name:'CREATE_TIMESTAMP',
          title:'SUBMISSION DATE',
          sortField: 'CREATE_TIMESTAMP'
        },
        {
          name: 'COMP_NAME',
          title: 'COMPANY NAME',
          sortField: 'COMP_NAME',
        },
        {
          name: 'COMP_REGI_NUM1',
          title: 'REGISTRATION NO',
          sortField: '',
        },
        {
          name: 'COMP_CONT_TELEPHONE',
          title: 'PHONE NO',
          sortField: 'COMP_CONT_TELEPHONE',
        },
        {
          name: 'TS_PARAM',
          title: 'STATUS',
          sortField: 'TS_PARAM',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '8%',
        },
      ];
    },
    fundProfileFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.fundprofileRecordList;
      }
      return this.fundprofileRecordList.filter((item) => {
        return this.term
          .toString()
          .toUpperCase()
          .split(" ")
          .every((v) => item.TP_REG_NO.includes(v) || item.TP_NAME.includes(v));
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
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,

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
                model: "modelFilter.REGISTRATION_NO",
                label: "Registration No",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.COMPANY_NAME",
                label: "Company Name",
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
