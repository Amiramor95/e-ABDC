<template>
  <va-card>
    <vudal name="simpleModal" class="widthModal">
        <div class="content">
          <h5>
            Your Registration Application is still pending for Approval !
          </h5>
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>
    <div class="row">
      <h4 slot="header" class="card-title">
        Candidate Acceptance : List of Bulk Upload
      </h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              v-on:click="searchCandidate"
              title="Search Candidate Record"
              class="mr-1 badge badge-secondary"
            >
              <i class="fa fa-search"></i
            ></span>

            <span
              v-b-tooltip.hover
              v-if="this.ValidStatus == 1"
              v-on:click="create"
              title="New Upload Registration"
              class="badge badge-success"
            >
              <i class="fa fa-plus"></i
            ></span>
          </h5>
        </div>
      </div>
    </div>
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
            <template slot="candidate" slot-scope="props">
              {{ props.rowData.TOTAL_CANDIDATE }}
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                 <span
              v-if="props.rowData.TOTAL_CANDIDATE == 0"
              v-b-tooltip.hover
              title="Delete Program"
              v-on:click="deleteRecord(props.rowData)"
              class="badge badge-danger mr-2"
            >
              <i class="fa fa-trash"></i
            ></span>
                <span
                  v-b-tooltip.hover
                  title="View Record"
                  v-if="props.rowData.TS_ID == 17"
                  v-on:click="viewRecord(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-eye"></i
                ></span>
                <span
                  v-if="props.rowData.TS_ID == 1 && props.rowData.TOTAL_CANDIDATE != 0"
                  v-b-tooltip.hover
                  title="Edit Program"
                  v-on:click="editRecord(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-edit"></i
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
import Vudal from "vudal";


export default {
  mounted() {
    this.getDistStatus();
    this.getAcceptanceList();
  },
 components: { Vudal },

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    create() {
      this.$router.push("/distributor/new-candidateAcceptance");
    },
    searchCandidate(){
      this.$router.push("/distributor/search-candidateRecord");
    },

    async back() {
      this.$router.go(-1);
    },

    getDistStatus: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getCompanyStatusID(
        JSON.parse(user).USER_DIST_ID
      );

      this.ValidStatus = response.DIST_VALID_STATUS;

      if (response.DIST_VALID_STATUS == 0){
        this.$modals.simpleModal.$show();

      }

      },

    getAcceptanceList: async function () {
      const user = localStorage.getItem("user");

      const response = await servicesModule1.getAcceptanceListByDistID(
        JSON.parse(user).USER_DIST_ID
      );
      this.AcceptanceList = response;
      //alert(JSON.stringify(this.AcceptanceList));
      this.RecordCount = this.AcceptanceList.length;
    },

    async viewRecord(data) {
      localStorage.setItem(
        "view-candidateAcceptanceList",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "view-candidateAcceptanceList",
      });
      this.$router.push("/distributor/view-candidateAcceptanceList");
    },

    async editRecord(data) {
      localStorage.setItem(
        "edit-candidateAcceptanceUpload",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "edit-candidateAcceptanceUpload",
      });
      this.$router.push("/distributor/edit-candidateAcceptanceUpload");
    },
    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule1.deleteRecord(
          data.CANDIDATE_ACCEPTANCE_ID
        );
        this.getAcceptanceList();
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
          name: "__slot:candidate",
          title: "TOTAL CANDIDATE",
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
          width: "8%",
        },
      ];
    },
    FilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.AcceptanceList;
      }
      return this.AcceptanceList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.REFERENCE_NO.toLowerCase().includes(v) ||
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
      ValidStatus:1,
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






