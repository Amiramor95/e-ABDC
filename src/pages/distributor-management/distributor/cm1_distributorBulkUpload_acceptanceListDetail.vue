<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Candidates (Batch No : {{ acceptanceDetail.BATCH_NO }})</h4>
        </div>
      </div>
    </template>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator :model="model" :schema="schema" ref="firstTabForm">
        </vue-form-generator>
        <button type="button" class="ml-2 btn btn-sm btn-primary">
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
    <!-- <div class="alignend">
      <div class="flex xs12 md3 right">
        <div>
          <h5>Batch No : {{ acceptanceDetail.BATCH_NO }}</h5>
        </div>
      </div>
    </div> -->
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
      :datacount="RecordCount"
      :dataperpage="parseInt(perPage)"
      clickable
    >
      <!-- A virtual column -->
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
      <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
          <span
            v-b-tooltip.hover
            title="remove"
            v-on:click="remove(props.rowData)"
            class="badge badge-danger mr-2"
          >
            <i class="fa fa-minus"></i
          ></span>
        </h4>
      </template>
    </va-data-table>
     <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
  
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
    this.user = localStorage.getItem("user");
    this.getAcceptanceListByBatch();
  },
  methods: {
    search: debounce(function (term) {
      this.term = term;
    }, 400),

    create() {
      // this.$router.push({
      //   name: "distributor-candidate-generateAcceptanceList"
      // });
    },

   async back() {
      this.$router.go(-1);
    },
     async remove(data) {

        if (confirm("Are you sure you want to delete this record?")) {
          const response = await services06Module1.deleteCandidateAcceptance(data.DISTRIBUTOR_CANDIDATE_ACCEPTANCE_ID);
           this.getAcceptanceListByBatch();
        }
  
    },

    async getAcceptanceListByBatch() {
      var data = localStorage.getItem("distributor-candidate-registrationList");
      this.acceptanceDetail = JSON.parse(data);
      const response = await services06Module1.getAcceptanceListByBatch(
        this.acceptanceDetail.DIST_ID,
        this.acceptanceDetail.BATCH_NO
      );
      this.acceptanceList = response;
       this.RecordCount = this.acceptanceList.length;
    },
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "CANDIDATE_NAME",
          title: "Name",
          width: "30%",
          sortField: "CANDIDATE_NAME",
        },
        {
          name: "CANDIDATE_NRIC",
          title: "NRIC NUMBER",
          sortField: "CANDIDATE_NRIC",
        },
        {
          name: "CANDIDATE_PASSPORTNO",
          title: "Passport Number",
          sortField: "CANDIDATE_PASSPORTNO",
        },
        {
          name: "CANDIDATE_EMAIL",
          title: "Email",
          sortField: "CANDIDATE_EMAIL",
        },
        {
          name: "CANDIDATE_PHONENO",
          title: "Handphone Number",
          sortField: "CANDIDATE_PHONENO",
        },
        {
          name: "CANDIDATE_LICENSE_TYPE",
          title: "License Type",
          sortField: "CANDIDATE_LICENSE_TYPE",
        },
        {
          name: "CANDIDATE_STAFF_AGENT",
          title: "Staff/Agent",
          sortField: "CANDIDATE_STAFF_AGENT",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
       
        {
          name: "__slot:actions",
          title: "Action",
        
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.acceptanceList;
      }

      return this.acceptanceList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) => item.CANDIDATE_NAME.toLowerCase().includes(v) || 
              item.CANDIDATE_NRIC.toLowerCase().includes(v) ||
              item.CANDIDATE_PASSPORTNO.toLowerCase().includes(v) ||
              item.CANDIDATE_EMAIL.toLowerCase().includes(v) ||
              item.CANDIDATE_PHONENO.toLowerCase().includes(v) ||
              item.CANDIDATE_LICENSE_TYPE.toLowerCase().includes(v)||
              item.CANDIDATE_STAFF_AGENT.toLowerCase().includes(v)||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      user: null,
      count: 1,
      RecordCount: null,
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      acceptanceList: [],
      acceptanceDetail: "",
      model: {
        title: "",
        dateCreated: "",
        createdBy: "",
        status: "",
      },

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "title",
                label: "Title",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "date",
                label: "Date Created",
                model: "dateCreated",
                format: "YYYY-MM-DD HH:mm:ss",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "createdBy",
                label: "Created By",
                styleClasses: "col-md-6",
              },
              {
                type: "select",
                label: "Status",
                model: "status",
                styleClasses: "col-md-6",

                values: (model, schema) => {
                  return this.status;
                },
              },
            ],
          },
        ],
      },
      status: [
        {
          id: "Publish",
          name: "Publish",
        },
        {
          id: "Draft",
          name: "Draft",
        },
      ],
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
.alignend {
  display: flex;
  justify-content: flex-start;
}
</style>
