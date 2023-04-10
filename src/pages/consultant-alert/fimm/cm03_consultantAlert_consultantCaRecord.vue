<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Consultant Alert Records :
        <b>
          {{ this.CONSULTANT.CONSULTANT_NAME }} (
          {{ this.CONSULTANT.CONSULTANT_FIMM_NO }} )
        </b>
      </h4>
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
              v-if="props.rowData.TS_ID == 1 || props.rowData.TS_ID == 9 || props.rowData.TS_ID == 3 "
              v-b-tooltip.hover
              title="Edit Consultant Records"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

            <span
              v-if="props.rowData.TS_ID != 9 && props.rowData.TS_ID != 1 && props.rowData.TS_ID != 3"
              v-b-tooltip.hover
              title="View Consultant Records"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
            ></span>
             <span
              v-b-tooltip.hover
              title="Generate Letter"
              v-on:click="generateLetter(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-file-word-o"></i
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
import * as servicesModule2 from "../../../app/module2/services01";

export default {
  mounted() {
    var data = localStorage.getItem("consultantAlert-consultantCaRecord");
    this.CONSULTANT = JSON.parse(data);
   // alert(JSON.stringify(this.CONSULTANT));
    this.getRecordById();
    this.getConsultantById();

  },
  components: {},

  methods: {
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    getConsultantById: async function () {
      const response = await servicesModule3.getConsultantById(
        this.CONSULTANT.CONSULTANT_ID
      );
      this.consDetail = response;
    },
    //searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    searchDate(date) {
      this.term = moment(date).format("DD-MMM-y");
    },

    getRecordById: async function () {
      // const data = new FormData();

      const response = await servicesModule3.getCaRecordById(
        this.CONSULTANT.CONSULTANT_ID
      );

      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "consultantAlert-viewCaRecord",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "consultantAlert-viewCaRecord",
      });
    },
    async editRecord(data) {
     // alert(JSON.stringify(data));
      localStorage.setItem(
        "consultantAlert-editCaRecord",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "consultantAlert-editCaRecord",
      });
    },
    async generateLetter(data) {
      localStorage.setItem(
        "consultantAlert-generateLetter",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "consultantAlert-generateLetter",
      });
    },


    back() {
       this.$router.push({
        name: "consultantAlert-recordList",
      });
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
          name: "SET_PARAM",
          title: "Classification",
          sortField: "SET_PARAM",
        },
        {
          name: "TS_PARAM",
          title: "Status",
          sortField: "TS_PARAM",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Creation Date",
          sortField: "CREATE_TIMESTAMP",
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
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.CREATE_TIMESTAMP.toLowerCase().startsWith(
                this.term.toLowerCase()
              )
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
