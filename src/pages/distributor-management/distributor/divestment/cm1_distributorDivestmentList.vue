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
            <span
              v-b-tooltip.hover
              title="Submit Divestment Form"
              v-on:click="create"
              class="badge badge-success"
            >
              <i class="fa fa-plus"></i
              ></span>
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
              v-if="props.rowData.TS_ID == 28 || props.rowData.TS_ID == 1 || props.rowData.TS_ID == 7 || props.rowData.TS_ID == 9"
              v-b-tooltip.hover
              title="Edit Submission Form"
              v-on:click="viewRecord(props.rowData,isEdit=true)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i>
            </span>
            <span
              v-if="props.rowData.TS_ID != 28 &&  props.rowData.TS_ID != 7 &&  props.rowData.TS_ID != 1 && props.rowData.TS_ID != 9"
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData,isEdit=false)"
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
  created () {
    this.getAllRecord()
  },

  mounted () {
    setTimeout(() => {
      const el = document.getElementById('_DATE_DISPLAY')
      el.style.cursor = 'pointer'
      el.addEventListener('click',this.sortBySubmissionDate);
    },10)

    setTimeout(() => {
      const element = document.getElementById('_LATEST_UPDATE')
      element.style.cursor = 'pointer'
      element.addEventListener('click',this.sortBySubmissionDate);
    },10)
  },
  components: {},

  methods: {
    //Sort by submission date
    sortBySubmissionDate(event){
      const this_ = this;
      this.perPage = 10
      if(this_.dateSortParam === 'asc') {
        this_.RecordList.sort((oldObj,newObj) => {
          return new Date(newObj.DATE_DISPLAY) - new Date(oldObj.DATE_DISPLAY);
        })
        this_.dateSortParam = 'desc';
      }else {
        this_.RecordList.sort((oldObj,newObj) => {
          return new Date(oldObj.DATE_DISPLAY) - new Date(newObj.DATE_DISPLAY);
        })
        this_.dateSortParam = 'asc';
      }
    },

    // create
    create () {
      this.$router.push('/distributor/DistributorDivestment-Submission')
    },
    // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    async reset(){
      this.model.DATE_DISPLAY="";
      this.model.DIST_SET_PARAM="";
      this.model.DIST_NAME="";
      this.model.TS_PARAM="";
    },

    async filterRecord () {
      try {
        const response = await servicesModule1.filterRecordList(
          this.model,
        )
        if (response != 'error') {
          this.RecordList = response
        }
      } catch (error) {}
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab

    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem("user");
      var DIST_ID = JSON.parse(user).USER_DIST_ID;
      const response = await servicesModule1.getAllDivestmentList(DIST_ID)
      console.log('divestment',response,response.data.length);
      this.RecordList = response.data
      this.RecordCount = response.data.length
    },

    //method that convert divestment fund to divest. fund temp
    convertFundToFundTemp:async function(data){
      console.log('data:'+JSON.stringify(data));
      const response = await servicesModule1.convertFundToFundTemp(data);
    },

    //method that convert divestment fund to divest. fund temp
    convertConsultantToConsultantTemp:async function(data){
      console.log('data:'+JSON.stringify(data));
      const response = await servicesModule1.convertConsultantToConsultantTemp(data);
    },


    async viewRecord (data,isEdit=false) {
      localStorage.setItem('test', JSON.stringify(data))
      if(data.DIVE_TYPE == 35){
        // data.TS_ID==1 || data.TS_ID==28 || data.TS_ID==7 &&
        if (isEdit){
          localStorage.setItem('DIVE_ID', JSON.stringify(data.DIVE_ID))
          this.convertFundToFundTemp(data);
          this.$router.push({name: 'DistributorDivestment-EditFund',})
        }else{
          this.$router.push({name: 'DistributorDivestment-FundDetails',})
        }

      }
      if(data.DIVE_TYPE == 36){
        if (isEdit){
          localStorage.setItem('DIVE_ID', JSON.stringify(data.DIVE_ID))
          this.convertConsultantToConsultantTemp(data);
          this.$router.push({name: 'DistributorDivestment-EditConsultant',})
        }else{
          this.$router.push({name: 'DistributorDivestment-ConsultantDetails',})
        }
      }
      if(data.DIVE_TYPE == 37){
        if (isEdit){
          localStorage.setItem('DIVE_ID', JSON.stringify(data.DIVE_ID))
          this.convertFundToFundTemp(data);
          this.convertConsultantToConsultantTemp(data);
          this.$router.push({name: 'DistributorDivestment-EditFundConsultant',})
        }else {
          this.$router.push({ name: 'DistributorDivestment-FundConsultantDetails', })
        }
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
          // sortField: 'DATE_DISPLAY',
          width: '15%',
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
          name: 'TS_PARAM',
          title: 'DISTRIBUTOR STATUS',
          sortField: 'TS_PARAM',
        },

        {
          name: 'FIMM_TS_PARAM',
          title: 'FIMM STATUS',
          sortField: 'FIMM_TS_PARAM',
        },
        {
          name: "LATEST_UPDATE",
          title: "Latest Update",
          width: '15%',

        },
        {
          name: "USER_NAME",
          title: "Update By",
          sortField: "USER_NAME",
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
              (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false) ||
              item.TS_PARAM.toLowerCase().includes(v),
          )
      })
    },
  },

  data () {
    return {
      dateSortParam:'asc',
      header: '',
      field: [],
      term: null,
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      classificationList: [],
      count: 1,
      RecordCount:0,
      RecordList:[],
      model: {
        DATE_DISPLAY: '',
        DIST_SET_PARAM: '',
        DIST_NAME: '',
        TS_PARAM: '',
        LATEST_UPDATE: '',
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                model: 'DATE_DISPLAY',
                label: 'Submission Date',
                styleClasses: 'col-md-6',
                dateTimePickerOptions: {
                  format: "YYYY-MM-DD"
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'DIST_SET_PARAM',
                label: 'Divestment Type ',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'DIST_NAME',
                label: 'Distributor',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'TS_PARAM',
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
