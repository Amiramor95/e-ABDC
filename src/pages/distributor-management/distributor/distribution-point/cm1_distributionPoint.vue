<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Distribution Point</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="Register New Distribution Point"
              v-on:click="create"
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
            <template slot="address" slot-scope="props">
              {{ props.rowData.DIST_ADDR_1 }}<br />
              {{ props.rowData.DIST_ADDR_2 }}
              {{ props.rowData.DIST_ADDR_3 }}
              {{ props.rowData.POSTCODE_NO }},{{ props.rowData.SET_CITY_NAME }},<br />
              {{ props.rowData.STATE_NAME }},{{ props.rowData.COUNTRY_NAME }}
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="View Record"
                  v-on:click="viewRecord(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-eye"></i
                ></span>
                  <span
                  v-b-tooltip.hover
                  title="Edit Record"
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
import moment from "moment";

export default {
  mounted() {
    this.getDistPoint();
  },

  components: {},
  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    getDistPoint: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistPointByDistID(
        JSON.parse(user).USER_DIST_ID
      );
      this.DPList = response;
      this.RecordCount = this.DPList.length;
    },

    create() {
      this.$router.push("/distributor/register-distributionPoint");
    },

    async back() {
      this.$router.go(-1);
    },

    async viewRecord(data) {
      localStorage.setItem("view-distributionPoint", JSON.stringify(data));
      this.$router.push({
        name: "view-distributionPoint",
      });
    },
     async editRecord(data) {
      localStorage.setItem("edit-distributionPoint", JSON.stringify(data));
      this.$router.push({
        name: "edit-distributionPoint",
      });
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
        // {
        //   name: "DIST_POINT_CODE",
        //   title: "DISTRIBUTION POINT CODE",
        //   sortField: "DIST_POINT_CODE",
        // },
        {
          name: "DIST_POINT_NAME",
          title: "DISTRIBUTION POINT NAME",
          sortField: "DIST_POINT_NAME",
        },
        {
          name: "PHONE_NUMBER",
          title: "OFFICE PHONE NUMBER",
          sortField: "PHONE_NUMBER",
        },
        {
          name: "__slot:address",
          title: "ADDRESS",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "USER_NAME",
          title: "CREATION BY",
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
    FilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.DPList;
      }
      return this.DPList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DIST_POINT_CODE.toLowerCase().includes(v) ||
              item.DIST_POINT_NAME.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      term: null,
      DPList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
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
