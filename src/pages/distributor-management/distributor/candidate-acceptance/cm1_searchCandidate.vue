<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Candidate Acceptance : Search Candidate Acceptance Record
      </h4>
    </div>
    <br />
    <va-card>
      <vue-form-generator
        :model="model"
        :schema="advancedSearchSchema"
        ref="advancedSearchForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
      <br />
      <button
        @click="filterRecord"
        type="button"
        class="ml-2 btn btn-sm btn-primary"
      >
        Search
      </button>
      <button
        @click.prevent="reset"
        type="button"
        class="ml-2 btn btn-sm btn-danger"
      >
        Reset
      </button>
    </va-card>
    <br />
    <va-card>
      <div>
        <div>
          <div class="row">
            <div class="flex md2 offset--md10">
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
            :fields="Fields"
            :data="FilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
             <template slot="type" slot-scope="props">
              <span
                v-b-tooltip.hover
                v-if="props.rowData.STAFF_OR_AGENT == '1'"
              >
                STAFF
              </span>
              <span
                v-b-tooltip.hover
                v-if="props.rowData.STAFF_OR_AGENT == '2'"
              >
                AGENT
              </span>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="Delete Program"
                  v-on:click="deleteRecord(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h5>
            </template>
          </va-data-table>
          <br />
        </div>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted() {},
  components: {},

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async back() {
      this.$router.go(-1);
    },

      onModelUpdated(newVal, schema) {
      if (schema == "CANDIDATE_NAME") {
        this.model.CANDIDATE_NAME = String(newVal).toUpperCase();
      }
    },

    async filterRecord() {
      try {
        const response = await servicesModule1.filterRecordList(this.model);
        if (response != "error") {
          this.candidateRecordList = response;
        }
      } catch (error) {}
    },

    async reset() {
      this.model.CANDIDATE_NRIC = "";
      this.model.CANDIDATE_NAME = "";
      this.model.CANDIDATE_PASSPORT_NO = "";

    },

    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
         try {
            const response1 = await servicesModule1.deleteCandidate(
          data.ACCEPTANCE_DETAILS_ID
        );

        const response = await servicesModule1.filterRecordList(this.model);
        if (response != "error") {
          this.candidateRecordList = response;
        }
      } catch (error) {}

      }
    },
  },

  computed: {
    Fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "CREATION DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "REFERENCE_NO",
          title: "REFERENCE NUMBER",
          sortField: "REFERENCE_NO",
        },
        {
          name: "CANDIDATE_NAME",
          title: "CANDIDATE NAME",
          sortField: "CANDIDATE_NAME",
        },
        {
          name: "CANDIDATE_NRIC",
          title: "NRIC NUMBER",
          sortField: "CANDIDATE_NRIC",
        },
        {
          name: "CANDIDATE_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CANDIDATE_PASSPORT_NO",
        },
        {
          name: "CANDIDATE_PHONENO",
          title: "PHONE NUMBER",
          sortField: "CANDIDATE_PHONENO",
        },
        {
          name: "TYPE_SCHEME",
          title: "LICENSE TYPE",
          sortField: "TYPE_SCHEME",
        },
        {
          name: "__slot:type",
          title: "STAFF OR AGENT",
          sortField: "STAFF_OR_AGENT",
        },
        {
          name: "SET_PARAM",
          title: "CONSULTANT ALERT STATUS",
          sortField: "SET_PARAM",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "USERNAME",
          title: "CREATION BY",
          sortField: "USERNAME",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "5%",
        },
      ];
    },
    FilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.candidateRecordList;
      }
      return this.candidateRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.CANDIDATE_NAME.toLowerCase().includes(v) ||
              item.CANDIDATE_NRIC.toLowerCase().includes(v) ||
              item.CANDIDATE_PASSPORT_NO.toLowerCase().includes(v) ||
              item.CANDIDATE_EMAIL.toLowerCase().includes(v) ||
              item.CANDIDATE_PHONENO.toLowerCase().includes(v) ||
              item.TYPE_SCHEME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      term: null,
      AcceptanceList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      RecordList: [],
      candidateRecordList:[],

      model: {
        CONSULTANT_NAME: "",
        CONSULTANT_NRIC: "",
        CONSULTANT_PASSPORT_NO: "",
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "CANDIDATE_NAME",
                label: "Candidate Name",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "CANDIDATE_NRIC",
                label: "NRIC Number",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "CANDIDATE_PASSPORT_NO",
                label: "Passport Number",
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
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>






 