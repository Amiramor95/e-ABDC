<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Suspension/Revocation Notification
      </h4>
     
    </div>
    <!-- list table-->
    <va-card class="mt-5 col-12">
       <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Reason/Remark<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="readMoreSchema"
            :options="formOptions"
          />
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
         <template slot="reason" slot-scope="props">
              {{ props.rowData.REASON }}
              <span
                v-if="props.rowData.REASON != '-'"
                v-b-tooltip.hover
                v-on:click="readMore2(props.rowData)"
                title="Read more"
                class="badge mr-2"
              >
                <i class="fa fa-window-restore"></i
              ></span>
            </template>
         <template slot="remarks" slot-scope="props">
              {{ props.rowData.FIMM_REMARK }}
              <span
                v-if="props.rowData.FIMM_REMARK != '-'"
                v-b-tooltip.hover
                v-on:click="readMore(props.rowData)"
                title="Read more"
                class="badge mr-2"
              >
                <i class="fa fa-window-restore"></i
              ></span>
            </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              v-if="props.rowData.DIST_ACTION == '-' || props.rowData.TS_ID=='7' || props.rowData.TS_ID=='1' "
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

            <span
              v-b-tooltip.hover
              title="View Form"
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
import * as servicesModule1 from "../../../../app/module1/services01";
import Vudal from "vudal";

export default {
  mounted() {
    this.getAllList();
  },

  components: {
     Vudal,
  },

  methods: {
    // create
    create() {
      this.$router.push("/fimm/distributor-records");
    },
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    back() {
      this.$router.go(-1);
    }, // back button

    async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.FIMM_REMARK_FULL;
    },
    async readMore2(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.REASON_FULL;
    },

    // getAllRecord
    getAllList: async function () {
      const user = localStorage.getItem("user");
     // alert(JSON.parse(user).USER_DIST_ID);
      const response = await servicesModule1.getListForAppeal(JSON.parse(user).USER_DIST_ID);
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },


    async viewRecord(data) {
      localStorage.setItem("view-suspension-revocation-form", JSON.stringify(data));
      this.$router.push({
        name: "view-suspension-revocation-form",
      });
    },

     async editRecord(data) {
      localStorage.setItem("update-suspension-revocation-form", JSON.stringify(data));
      this.$router.push({
        name: "update-suspension-revocation-form",
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
          name: "CREATE_TIMESTAMP",
          title: "DATE",
          sortField: "CREATE_TIMESTAMP",
        },
         {
          name: "SUBMISSION_TYPE",
          title: "NOTIFICATION",
          sortField: "SUBMISSION_TYPE",
        },
        {
          name: "EFFECTIVE_DATE",
          title: "EFFECTIVE DATE",
          sortField: "EFFECTIVE__DATE",
        },
        {
          name: "DATE_START",
          title: "DATE START",
          sortField: "DATE_START",
        },
        {
          name: "DATE_END",
          title: "DATE END",
          sortField: "DATE_END",
        },
        
        {
          name: "__slot:reason",
          title: "REASON",
        },
        {
          name: "DIST_ACTION",
          title: "ACTION BY DISTRIBUTOR",
          sortField: "DIST_ACTION",
        },
        {
          name: "USER_NAME",
          title: "ACTION BY",
          sortField: "USER_NAME",
        },
         {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:remarks",
          title: "Remarks",
          sortField: "FIMM_REMARK",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .toString()
          .split(" ")
          .every(
            (v) =>
              item.DATE.toLowerCase().includes(v) ||
              item.DATE_START.toLowerCase().includes(v) ||
              item.DATE_END.toLowerCase().includes(v) ||
              item.STATUS.toLowerCase().includes(v) ||
              item.EFFECTIVE_DATE.toLowerCase().includes(v)
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
      RecordList: [],
      count: 1,
      RecordCount: null,

      model: {
        showRemark: "",
      
      },

        readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
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
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
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
