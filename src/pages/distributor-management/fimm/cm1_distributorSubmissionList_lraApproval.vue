<template>
  <va-inner-loading :loading="isDataReady">
    <va-card>
      <template slot="header">
        <br />
        <div class="row">
          <div class="col">
            <h4 class="card-title">List of New Distributor Application</h4>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <h5>
                <b-badge
                  v-b-tooltip.hover
                  title="search"
                  v-b-toggle.collapse-1
                  class="mr-1"
                  variant="secondary"
                >
                  <i class="fa fa-search"></i>
                </b-badge>
              </h5>
            </div>
          </div>
        </div>
      </template>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <vue-form-generator :model="model" :schema="schema" ref="firstTabForm">
          </vue-form-generator>
          <button @click="filteredRecord" type="button" class="ml-2 btn btn-sm btn-primary">
            Search
          </button>
          <button
            @click.prevent="reset"
            type="button"
            class="ml-2 btn btn-sm btn-danger"
          >
            Reset
          </button>
        </b-card>
      </b-collapse>
      <br />
      <div class="alignleft">
        <div class="flex xs12 md3 left">
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
      <!-- Main table element -->
      <!-- <div class="col-ml-2"> -->
      <va-data-table
        :fields="fields"
        :data="filteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="filteredData.length"
        clickable
      >
        <!-- A virtual column -->
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <!-- <template slot="ANNOUNCEMENT_STATUS" slot-scope="props">
          <div v-if="props.rowData.ANNOUNCEMENT_STATUS == 1">
            Draft
          </div>
          <div v-if="props.rowData.ANNOUNCEMENT_STATUS == 2">
            Publish
          </div>
        </template> -->
        <template slot="actions" slot-scope="props">
          <h4 class="mt-2">
          <span
            v-if="
              props.rowData.TS_PARAM === 'DRAFT' ||
              props.rowData.TS_PARAM === 'REVIEWED' ||
              props.rowData.TS_PARAM === 'PENDING'
            "
            v-b-tooltip.hover
            title="detail"
            v-on:click="details(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-edit"></i
            ></span>
            <span
              v-else
              v-b-tooltip.hover
              title="detail"
              v-on:click="details(props.rowData)"
              class="badge badge-success mr-2"
            >
            <i class="fa fa-eye"></i
            ></span>
          </h4>
        </template>
      </va-data-table>
    </va-card>
  </va-inner-loading>
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule0 from "../../../app/module0/services";
import * as services06Module1 from "../../../app/module1/services06";

Vue.use(VueFormGenerator);

export default {
  props: {},
  mounted() {
    this.getDistributorApplicationList();
  },
  methods: {
    search: debounce(function(term) {
      this.term = term;
    }, 400),
    // async getDistributorApplicationList() {
    //   const user = localStorage.getItem("user");
    //   const data = {
    //     USER_GROUP_ID : JSON.parse(user).USER_GROUP_ID,
    //     DIST_NAME : this.model.DIST_NAME,
    //     DIST_REGI_NUM1 : this.model.DIST_REGI_NUM1,
    //     DIST_REGI_NUM2 : this.model.DIST_REGI_NUM2
    //   }
    //   const response = await services06Module1.getDistributorApplicationList(data);
    //   this.distributorList = response;
    //   this.isDataReady=false;
    // },

    async getDistributorApplicationList() {
      const user = localStorage.getItem("user");
      const response = await services06Module1.getDistributorApplicationList(
        JSON.parse(user).USER_GROUP_ID
      );
      this.distributorList = response;
      this.isDataReady=false;
    },

    search: debounce(function(term) {
      this.term = term;
    }, 400),

    details(data) {
      // alert(data.DISTRIBUTOR_ID);
      localStorage.setItem(
        "distributor-SubmissionList-lraApproval",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "distributor-SubmissionDetails-lraApproval"
        // params: { dist_id: data.DISTRIBUTOR_ID }
      });
    },

    async filteredRecord(){
      try{
        this.isDataReady=true;
        const user = localStorage.getItem("user");

        const response = await services06Module1.getDistributorApplicationList(
          JSON.parse(user).USER_GROUP_ID,
          this.model
        );
        this.distributorList = response;


        this.isDataReady=false;
      }
      catch(e){
        alert(e);
      }
    },

    async reset() {
      this.model.DIST_NAME="";
      this.model.REG_NUM="";
      this.model.NEW_REG_NUM="";
      this.model.STATUS="";

      this.isDataReady=true;

      const user = localStorage.getItem("user");
      const response = await services06Module1.getDistributorApplicationList(
        JSON.parse(user).USER_GROUP_ID
      );
      this.distributorList = response;
      this.isDataReady=false;

    },
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "DIST_NAME",
          title: "Distributor Name",
          width: "30%",
          sortField: "DIST_NAME",
        },
        {
          name: "DIST_REGI_NUM1",
          title: "Reg. Number",
          sortField: "DIST_REGI_NUM1",
          // width: "40%"
        },
        {
          name: "DIST_REGI_NUM2",
          title: "New Reg. Number",
          sortField: "DIST_REGI_NUM2",
          // width: "40%"
        },
        {
          name: "DIST_PHONE_NUMBER",
          title: "Phone Number",
          sortField: "DIST_PHONE_NUMBER",
          // width: "40%"
        },
        {
          name: "DIST_EMAIL",
          title: "Email",
          sortField: "DIST_EMAIL",
          // width: "40%"
        },
        {
          name: "TS_PARAM",
          title: "Status",
          sortField: "TS_PARAM"
          // width: "40%"
        },
        {
          name: "USER_NAME",
          title: "Updated By",
          sortField: "USER_NAME",
          // width: "40%"
        },
        {
          name: "LATEST_DATE",
          title: "Latest Update",
          sortField: "LATEST_DATE",
          // width: "40%"
        },
        {
          name: "TS_PARAM",
          title: "Status",
          sortField: "TS_PARAM",
          sortField: "TS_PARAM",
          // width: "40%"
        },
        {
          name: "__slot:actions",
          title: "Action"
          //   dataClass: "justify-content-center",
          //   width: "15%"
        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.distributorList;
      }

      return this.distributorList.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false) ||
              (item.DIST_REGI_NUM1 ? item.DIST_REGI_NUM1.toLowerCase().includes(v) : false) ||
              (item.DIST_REGI_NUM2 ? item.DIST_REGI_NUM2.toLowerCase().includes(v) : false) ||
              (item.DIST_PHONE_NUMBER ? item.DIST_PHONE_NUMBER.toLowerCase().includes(v) : false) ||
              (item.DIST_EMAIL ? item.DIST_EMAIL.toLowerCase().includes(v) : false) ||
              (item.TS_PARAM ? item.TS_PARAM.toLowerCase().includes(v) : false)
          );
      });
    }
  },
  data() {
    return {
      isDataReady:true,
      term: null,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      distributorList: [],
      model: {
        DIST_NAME: "",
        REG_NUM: "",
        NEW_REG_NUM: "",
        STATUS: "",
        DIST_REGI_NUM1: "",
        DIST_REGI_NUM2: ""
      },

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "DIST_NAME",
                label: "DISTRIBUTOR NAME",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                label: "REG. NUMBER",
                model: "REG_NUM",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "NEW_REG_NUM",
                label: "NEW REG. NUMBER",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                label: "STATUS",
                model: "STATUS",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },

      type: [
        {
          id: "UTMC",
          name: "UTMC"
        },
        {
          id: "IUTA",
          name: "IUTA"
        },
        {
          id: "CUTA",
          name: "CUTA"
        }
      ],
      status: [
        {
          id: "Publish",
          name: "Publish"
        },
        {
          id: "Draft",
          name: "Draft"
        }
      ],
      category: [
        {
          id: "Agent",
          name: "Agent"
        },
        {
          id: "Employee",
          name: "Employee"
        }
      ]
    };
  }
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
</style>
