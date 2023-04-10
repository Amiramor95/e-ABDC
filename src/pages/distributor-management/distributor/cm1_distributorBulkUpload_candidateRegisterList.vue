<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Candidate Bulk Upload By Batch</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge
                @click="create"
                v-b-tooltip.hover
                title="Upload New Batch"
                class="mr-1"
                variant="primary"
              >
                <i class="fa fa-plus"></i>
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
    this.getAcceptanceList();
  },
  methods: {
    search: debounce(function (term) {
      this.term = term;
    }, 400),

    async details(data) {
      localStorage.setItem(
        "distributor-candidate-registrationList",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "distributor-candidate-acceptanceList_detail",
        // params: { dist_id: data.DISTRIBUTOR_ID }
      });
    },

    create() {
      this.$router.push({
        name: "distributor-candidate-generateAcceptanceList",
      });
    },

    async getAcceptanceList() {
      const response = await services06Module1.getAcceptanceList(
        JSON.parse(this.user).USER_DIST_ID
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
          name: "CREATED_DATE",
          title: "Creation Date",
          width: "30%",
        },
        {
          name: "BATCH_NO",
          title: "Batch Number",
          sortField: "BATCH_NO",
        },
        {
          name: "total",
          title: "Total Candidate",
          sortField: "total",
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
            (v) => item.BATCH_NO.toLowerCase().includes(v)
            //   item.DIST_REGI_NUM1.toLowerCase().includes(v) ||
            //   item.DIST_REGI_NUM2.toLowerCase().includes(v) ||
            //   item.DIST_PHONE_NUMBER.toLowerCase().includes(v) ||
            //   item.DIST_EMAIL.toLowerCase().includes(v) ||
            //   item.TS_PARAM.toLowerCase().includes(v)
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
</style>
