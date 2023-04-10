<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Alert : Search Consultant Profile</h4>
      <br />
    </div>
    <br>
    <va-card>
      <vue-form-generator
        :model="model"
        :schema="advancedSearchSchema"
        ref="advancedSearchForm"
      >
      </vue-form-generator>
      <br />
      <button
        @click="filterConsultantRecord"
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

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table
        :fields="consultantRecordFields"
        :data="consultantRecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="consultantRecordCount"
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
              title="Add New Case"
              v-on:click="addRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-plus"></i
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
import * as servicesModule3 from "../../../app/module3/services01";

export default {
  mounted() {
    //this.getAllConsultantRecord();
  },
  components: {},

  methods: {
    //create
    create() {
      this.$router.push("/fimm/consultantAlert-registerNewCase");
    },
    //searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async filterConsultantRecord() {
      try {
        const response = await servicesModule3.filterConsultantRecordList(
          this.model
        );
        if (response != "error") {
          this.consultantRecordList = response;
          this.consultantRecordCount = this.consultantRecordList.length;

        }
      } catch (error) {}
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    //getAllRecord
    getAllConsultantRecord: async function () {
      const response = await servicesModule3.getAllConsultant();
      this.consultantRecordList = response;
      this.consultantRecordCount = this.consultantRecordList.length;
    },

    async addRecord(data) {
      localStorage.setItem(
        "consultantAlert-registerNewCase",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "consultantAlert-registerNewCase",
      });
    },
    async reset() {
      this.model.CONSULTANT_NRIC = "";
      this.model.CONSULTANT_NAME = "";
      this.model.CONSULTANT_PASSPORT_NO = "";
      this.model.CONSULTANT_FIMM_NO = "";
      this.model.DIST_NAME = "";
      // this.getAllConsultantRecord();
    },
  },

  computed: {
    consultantRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CONSULTANT_NAME",
          title: "CONSULTANT NAME",
          sortField: "CONSULTANT_NAME",
        },
        {
          name: "CONSULTANT_NRIC",
          title: "NRIC NUMBER",
          sortField: "CONSULTANT_NRIC",
        },
        {
          name: "CONSULTANT_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CONSULTANT_PASSPORT_NO",
        },
        {
          name: "CONSULTANT_FIMM_NO",
          title: "FIMM NUMBER",
          sortField: "CONSULTANT_FIMM_NO",
        },
        {
          name: "DIST_NAME",
          title: "COMPANY DISTRIBUTOR",
          sortField: "DIST_NAME",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "5%",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    consultantRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.consultantRecordList;
      }

      return this.consultantRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.CONSULTANT_NAME.toLowerCase().includes(v) ||
              item.CONSULTANT_NRIC.toLowerCase().includes(v) ||
              item.CONSULTANT_FIMM_NO.toLowerCase().includes(v) ||
              item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      consultantRecordList: [],
      count: 1,
      consultantRecordCount: null,

      model: {
        CONSULTANT_FIMM_NO: "",
        CONSULTANT_NAME: "",
        CONSULTANT_NRIC: "",
        CONSULTANT_PASSPORT_NO: "",
        DIST_NAME: "",
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_FIMM_NO",
                label: "FIMM Number",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_NAME",
                label: "Consultant Name",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_NRIC",
                label: "NRIC Number",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "CONSULTANT_PASSPORT_NO",
                label: "Passport Number",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_NAME",
                label: "Distributor Name",
                styleClasses: "col-md-12",
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
