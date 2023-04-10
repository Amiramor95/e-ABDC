<template>
  <div v-if="!isReady" style="margin: 25% 0">
    <div class="text-center text-success my-2">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>
  <va-card v-else>
    <div class="row">
      <h4 slot="header" class="card-title">List of Consultant CPD Point</h4>
      <br />
    </div>

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
              title="View Details"
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
  import * as servicesModule4 from "../../../../app/module4/services01";

  export default {
    mounted () {
      const dist_id=this.$route.query.DIST_ID;
      this.getAllRecord(dist_id);
    },
    components: {},

    methods: {

      back(){
        this.$router.go(-1);
      },
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
      getAllRecord: async function (DIST_ID) {
        const response = await servicesModule4.getConsultantCPD(DIST_ID)
        this.RecordList = response
        this.RecordCount = this.RecordList.length
        this.isReady=true;
      },


      async viewRecord (data) {
        localStorage.setItem('cpd_details', JSON.stringify(data))
        this.$router.push({
          name: 'f-moduleSelectionList-consultant-point',
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
            name: 'CONSULTANT_NAME',
            title: 'Name',
            sortField: 'CONSULTANT_NAME',
          },
          {
            name: 'CONSULTANT_FIMM_NO',
            title: 'FIMM NO',
            sortField: 'CONSULTANT_FIMM_NO',
          },

          {
            name: 'CONSULTANT_NRIC',
            title: 'NRIC NO',
            sortField: 'CONSULTANT_NRIC',
          },
          {
            name: 'CONSULTANT_PASSPORT_NO',
            title: 'PASSPORT NO',
            sortField: 'CONSULTANT_PASSPORT_NO',
          },

          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVE POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKE POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'CUMULATIVE POINT',
            sortField: 'TOTAL_CPD_POINT',
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
                // item.DATE_DISPLAY.toLowerCase().includes(v) ||
                // item.DIST_SET_PARAM.toLowerCase().includes(v) ||
                // item.DIST_NAME.toLowerCase().includes(v) ||
                (item.CONSULTANT_FIMM_NO ? item.CONSULTANT_FIMM_NO.toLowerCase().includes(v) : false) ||
                (item.CONSULTANT_NRIC ? item.CONSULTANT_NRIC.toLowerCase().includes(v) : false) ||
                (item.CONSULTANT_PASSPORT_NO ? item.CONSULTANT_PASSPORT_NO.toLowerCase().includes(v) : false) ||
                (item.CONSULTANT_NAME ? item.CONSULTANT_NAME.toLowerCase().includes(v) : false)
            )
        })
      },
    },

    data () {
      return {
        isReady:false,

        header: '',
        field: [],
        term: null,
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        classificationList: [],
        RecordList: [],
        RecordCount:0,
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
                  model: 'modelFilter.DIST_NAME',
                  label: 'Distributor',
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
