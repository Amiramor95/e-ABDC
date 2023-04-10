<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Revocation : List of Submissions for Recommendation </h4>
       <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              v-b-tooltip.hover
              title="List of Distributor Suspension/Revocation Records"
              v-on:click="viewList"
              class="badge badge-primary"
            >
              <i class="fa fa-bars"></i
            ></span>
          </h5>
        </div>
      </div>
     </div>
     
    <!-- list table-->
    <va-card class="mt-5 col-12">
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
         <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
             <span
              v-b-tooltip.hover
              title="Review Submission"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
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
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule1 from "../../../../../app/module1/services01";

export default {
  mounted () {
    this.getAllList();
  },

  components: {},

  methods: {
    viewList() {
      this.$router.push("/fimm/view-suspension-revocation-list");
    },

    // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    back () {
      this.$router.go(-1)
    }, // back button

     // getAllRecord
    getAllList: async function () {
      const user = localStorage.getItem("user");
      var APPR_GROUP_ID = JSON.parse(user).USER_GROUP_ID;
      //group, submission type
      const response = await servicesModule1.getApprRecordById(APPR_GROUP_ID,2);
      //console.log(response);
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },

    async editRecord(data) {
      localStorage.setItem(
        "view-revocationSubmission-gm",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "view-revocationSubmission-gm",
      });
    },

  },

  computed: {
    RecordFields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'CREATE_TIMESTAMP',
          title: 'SUBMISSION DATE',
          sortField: 'CREATE_TIMESTAMP',
        },
        {
          name: 'SUBMISSION_TYPE',
          title: 'SUBMISSION TYPE',
          sortField: 'SUBMISSION_TYPE',
        },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'DIST_REGI_NUM1',
          title: 'REGISTRATION NUMBER',
          sortField: 'DIST_REGI_NUM1',
        },
        {
          name: 'DIST_REGI_NUM2',
          title: 'NEW REGISTRATION NUMBER',
          sortField: 'DIST_REGI_NUM2',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
          sortField: 'STATUS',
        },
        {
          name: 'USER_NAME',
          title: 'UPDATE BY',
          sortField: 'USER_NAME',
        },
        {
          name: 'LATEST_UPDATE',
          title: 'LATEST UPDATE',
          sortField: 'LATEST_UPDATE',
        },

        {
          name: '__slot:actions',
          title: 'ACTIONS',
          
        },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .toString()
          .split(' ')
          .every(
            (v) =>
              //item.SUBMISSION_DATE.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v)||
              item.DIST_REGI_NUM1.toLowerCase().includes(v) ||
              item.DIST_REGI_NUM2.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.SUBMISSION_TYPE.toLowerCase().includes(v) ||
              item.USER_NAME.toLowerCase().includes(v)
          )
      })
    },
  },

  data () {
    return {
        header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,

      model: { },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
<style lang="scss">
.va-data-table__vuetable th.sortable {
    color: #34495e !important;
}

.va-table th, .content table th {
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
