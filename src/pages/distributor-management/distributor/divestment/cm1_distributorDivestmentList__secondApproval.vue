<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Divestment Submission List</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>
          </h5>
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
              v-if="props.rowData.TS_ID == 1 || props.rowData.TS_ID == 28 || props.rowData.TS_ID == 15"
              v-b-tooltip.hover
              title="Edit Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-edit"></i>
            </span>
            <span
              v-if="(props.rowData.TS_ID == 7 || props.rowData.TS_ID == 3) || props.rowData.TS_ID == 5  "
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
          </h5>
        </template>
      </va-data-table>

      <br />
      <br />
      <br />
      <!-- <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button> -->
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule1 from '../../../../app/module1/services05'

export default {
  mounted () {
    this.getAllRecord()
  },
  components: {},

  methods: {

    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    async filterRecord () {
      try {
        const response = await servicesModule1.DivestmentApprovalFilter(
          this.model.modelFilter,
        )
        if (response != 'error') {
          this.RecordList = response
        }
      } catch (error) {}
    },

    async reset(){
      this.model.modelFilter.DATE_DISPLAY="";
      this.model.modelFilter.DIST_SET_PARAM="";
      this.model.modelFilter.DIST_NAME="";
      this.model.modelFilter.TS_PARAM="";
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab

    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem("user");
      var user_id = JSON.parse(user).user_id;
      const response = await servicesModule1.getAllDivestmentApprList(user_id)
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },
    async viewRecord (data) {

      if(data.DIVE_TYPE == 35){
        localStorage.setItem('test', JSON.stringify(data))
      this.$router.push({
        name: 'DistributorDivestment-ApprovalFundDetails',
      })
      }
      if(data.DIVE_TYPE == 36){
        localStorage.setItem('test', JSON.stringify(data))
      this.$router.push({
        name: 'DistributorDivestment-ApprovalConsultantDetails',
      })
      }
      if(data.DIVE_TYPE == 37){
        localStorage.setItem('test', JSON.stringify(data))
      this.$router.push({
        name: 'DistributorDivestment-ApprovalFundConsultantDetails',
      })
      }

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
          name: 'DATE_DISPLAY',
          title: 'SUBMISSION DATE',
          sortField: 'DATE_DISPLAY',
        },
        {
          name: 'DIST_SET_PARAM',
          title: 'DIVESTMENT TYPE',
          sortField: 'DIST_SET_PARAM',
        },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR',
          sortField: 'DIST_NAME',
        },


        {
          name: 'USER_NAME',
          title: 'UPDATED BY',
          sortField: 'USER_NAME',
        },
        {
          name: 'TS_PARAM',
          title: 'STATUS',
          sortField: 'TS_PARAM',
        },

        {
          name: 'LATEST_UPDATE',
          title: 'LATEST UPDATE',
          sortField: 'LATEST_UPDATE',
          width: '15%',
        },
        {
          name: 'ACTION_BY_FIMM',
          title: 'ACTION BY FIMM',
          sortField: 'ACTION_BY_FIMM',
          width: '15%',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '15%',
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
          .split(' ')
          .every(
            (v) =>
              item.DATE_DISPLAY.toLowerCase().includes(v) ||
              item.DIST_SET_PARAM.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v) ||
              (item.USER_NAME ? item.USER_NAME.toLowerCase().includes(v) : false) ||
              item.TS_PARAM.toLowerCase().includes(v),
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
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      classificationList: [],
      RecordList: [],
      count: 1,

      model: {
        modelFilter: {
          DATE_DISPLAY: '',
          DIST_SET_PARAM: '',
          DIST_NAME: '',
          TS_PARAM: '',
        },
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                model: 'modelFilter.DATE_DISPLAY',
                label: 'Submission Date',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.DIST_SET_PARAM',
                label: 'Divestment Type ',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.DIST_NAME',
                label: 'Distributor',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.TS_PARAM',
                label: 'Status',
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
<style lang="css">
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
