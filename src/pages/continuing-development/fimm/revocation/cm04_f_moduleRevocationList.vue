<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Training Provider/Distributor</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <span v-b-tooltip.hover
            title="Advanced Search">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
              ><i class="fa fa-search"></i
              ></b-badge>
            </h5>
          </span>
        </div>
      </div>
    </div>
    <!-- advanced search form -->
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator
          :model="model"
          :schema="advancedSearchSchema"
          ref="advancedSearchForm"
        >
        </vue-form-generator>
        <br />
        <button
          @click="filterFundProfile"
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
      </b-card>
    </b-collapse>

    <br />
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
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="RecordCount"
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
              title="edit"
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
</template>


<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";


export default {
  mounted() {
    this.getAllRecord();
  },
  components: {},

  methods: {
    // create
    create() {
      this.$router.push("/distributor/d-postVettingNewSubmission");
    },
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      const user = JSON.parse(localStorage.getItem('user')).user_id;
      const res = await servicesModule4.getCompanyId(user);
      
      // (COMPANY_ID,CATEGORY,PROG_TYPE)
      const response = await servicesModule4.getProgramById(
        res.USER_DIST_ID,
        2,
        1
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "d-postVettingViewProgramList",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "d-postVettingViewProgramList",
      });
    },

    async addProgram(data) {
      localStorage.setItem(
        "d-postVettingRepeatSubmission",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "d-postVettingRepeatSubmission",
      });
    },
  },

  computed: {
    RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "TRAIN_NAME",
          title: "TRAINING PROVIDER NAME",
          sortField: "TRAIN_NAME",
        },
        {
          name: "REG_NO",
          title: "REG. NO",
          sortField: "REG_NO",
        },
        {
          name: "PHONE_NO",
          title: "PHONE NO",
          sortField: "PHONE_NO",
        },
        {
          name: "EMAIL",
          title: "EMAIL",
          sortField: "EMAIL",
        },
        {
          name: "NEW_SUBMISSION",
          title: "NEW SUBMISSION",
          sortField: "NEW_SUBMISSION",
        },
        {
          name: "RETURN_REQUEST",
          title: "RETURN REQUEST",
          sortField: "RETURN_REQUEST",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },

    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.PROG_TITLE.toLowerCase().includes(v) ||
              item.PROG_CODE.toLowerCase().includes(v)
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
      classificationList: [],
      RecordList: [],
      count: 1,
      RecordCount: null,

      model: {
        modelFilter: {},
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
