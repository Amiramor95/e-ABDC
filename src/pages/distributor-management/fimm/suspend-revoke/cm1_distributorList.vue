<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">List of Active Distributors</h4>
      <br />
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
              title="Register new Application"
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
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted () {
      this.getAllDistributors();
  },

  components: {},

  methods: {
       // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    back () {
      this.$router.go(-1)
    }, // back button

     getAllDistributors: async function () {
      const response = await servicesModule1.getAllDistributor()
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },

      async addRecord (data) {
      localStorage.setItem("new-submission",JSON.stringify(data));
      this.$router.push({
        name: 'new-submission',

      })
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
          title: 'NEW REGISTRTAION NUMBER',
          sortField: 'DIST_REGI_NUM2',
        },
        {
          name: 'DIST_PHONE_NUMBER',
          title: 'PHONE NUMBER',
          sortField: 'DIST_PHONE_NUMBER',
        },
        {
          name: 'DIST_EMAIL',
          title: 'EMAIL',
          sortField: 'DIST_EMAIL',
        },
        {
          name: 'TS_PARAM',
          title: 'STATUS',
          sortField: 'TS_PARAM',
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
              item.DIST_NAME.toLowerCase().includes(v)||
            item.DIST_REGI_NUM1.toLowerCase().includes(v)||
            item.DIST_REGI_NUM2.toLowerCase().includes(v)||
            item.DIST_EMAIL.toLowerCase().includes(v)||
            item.DIST_PHONE_NUMBER.toLowerCase().includes(v)
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
