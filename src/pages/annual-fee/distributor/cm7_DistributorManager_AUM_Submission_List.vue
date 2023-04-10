<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">AUM AS AT 31 DECEMBER {{new Date().getFullYear()-1}}</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>

            <downloadExcel
        :json_data="RecordList"
        :excelname="excelname"
        :sheetname="sheetname"
        :column="column"
      ></downloadExcel>
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
        :datacount="RecordCount"
        no-data-label="No data found"
        
        clickable
      >
        
        <template slot="actions" slot-scope="props">
              <va-checkbox
                @change="checkBox"
                class="col-2"
                v-model="props.rowData.selected"
              />
        </template>
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="flag" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              v-if="props.rowData.STATUS_DISPLAY != '' "
              title="Status"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-flag"></i
            ></span>
          </h5>
        </template>
            <template slot="action" slot-scope="row">
              <button type="button" class="btn-fill btn-md">
                  <i class="fa fa-edit"></i>
                </button>
            </template>
            <template slot="checkbox" slot-scope="props">
              <va-checkbox
                @change="checkBox"
                class="col-2"
                v-model="props.rowData.selected"
              />
        </template>

      </va-data-table>

      <br />
      <br />
      <br />
      <div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        <div class="float-right">
          <!-- <button type="button" class="mr-2 btn btn-info btn-fill btn-md">
                  <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
          </button>
          <button type="button" class="mr-2 btn btn-warning btn-fill btn-md">
                  <i class="fa fa-reply" /> &nbsp; Return
                </button>
          <button  type="button" class="ml-1 btn btn-success btn-fill btn-md">
                  <i class="fa fa-paper-plane" /> &nbsp; Complete
                </button> -->
        </div>
      </div>
      <br/>
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule7 from '../../../app/module7/services05'
import * as services06Module0 from "../../../app/module0/services06";

export default {
  mounted () {
    // this.getAllClassification()
    this.getAllRecord()
  },
  components: {},

  methods: {

    //checkbox
    checkBox() {
      // alert("here");
      console.log(this.selected);
      if (document.getElementById("checkboxId_" + id).checked) {
        this.checkboxArray.push(screenId);
      } else {
        const indexToRemove = this.checkboxArray.indexOf(screenId);
        if (indexToRemove > -1) {
          this.checkboxArray.splice(indexToRemove, 1);
        }
      }
    },

    // create
    create () {
      this.$router.push('/fimm/distributor-Cancellation-Submission')
    },
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    // advanceSearch
    async filterRecord () {
      try {
        const response = await servicesModule7.filter_submission_record(
          this.model.modelFilter,
        )
        if (response != 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
    },

    async reset () {
      this.model.modelFilter = ''
      this.getAllRecord()
    },

    // back button
    back () {
      this.$router.push('/distributor/DistributorManager-AUM-Submission')
    },

    // retun button
    returnFund: async function () {
      const data = new FormData();
      // data.append("LEDGER_ID", this.TOPUPDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "4");

      // const approvalLevel = await services06Module0.getApprovalLevelDistributor(57, 1);
      //   data.append("APPR_LIST", JSON.stringify(approvalLevel));
      //     //notification
      //   data.append("NOTI_LOCATION", "distributor-Transaction-List");
      //   var remarkEntry = "(AMSF) FUND SUBMISSION  " ;
       
      //   data.append("NOTI_REMARK", remarkEntry);
      //   data.append("DISTRIBUTOR_ID", "1");
      try {
        const response = await servicesModule7.returnFund(data);
        // alert(JSON.stringify(response));
        this.$router.go();
        // this.$router.push("/fimm/AnnualFee-FundSubmission-list");
      } catch (error) {
        console.log(error);
      }
    },

    // verify button
  
    VerifyFund: async function () {
      const data = new FormData();
      // data.append("LEDGER_ID", this.TOPUPDETAILS.LEDGER_ID);
      data.append("TRANS_STATUS", "4");

      // const approvalLevel = await services06Module0.getApprovalLevelDistributor(57, 1);
      //   data.append("APPR_LIST", JSON.stringify(approvalLevel));
      //     //notification
      //   data.append("NOTI_LOCATION", "distributor-Transaction-List");
      //   var remarkEntry = "(AMSF) FUND SUBMISSION  " ;
       
      //   data.append("NOTI_REMARK", remarkEntry);
      //   data.append("DISTRIBUTOR_ID", "1");
      try {
        const response = await servicesModule7.update_submission(data);
        // alert(JSON.stringify(response));
        this.$router.go();
        // this.$router.push("/fimm/AnnualFee-FundSubmission-list");
      } catch (error) {
        console.log(error);
      }
    },

    // getAllRecord
    getAllRecord: async function () {
      const response = await servicesModule7.getFundList()
      this.RecordList = response
      this.RecordCount = this.RecordList.length
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
          name: 'FUND_CODE_FIMM',
          title: 'FIMM FUND CODE',
          sortField: 'FUND_CODE_FIMM',
        },
        {
          name: 'FUND_NAME',
          title: 'FUND NAME',
          sortField: 'FUND_NAME',
        },
        {
          name: 'FUND_ASEAN_CIS',
          title: 'CIS STRUCTURE',
          sortField: 'FUND_ASEAN_CIS',
        },
        {
          name: 'GROUP_ASSET',
          title: 'ASSET CLASS',
          sortField: 'GROUP_ASSET',
        },
        {
          name: 'GROUP_FUND',
          title: 'FUND GROUP',
          sortField: 'GROUP_FUND',
        },
        {
          name: 'GROUP_ASSE',
          title: 'FOREIGN EXCHANGE RATE',
          sortField: 'GROUP_ASSE',
        },
        {
          name: 'GROUP_FUN',
          title: 'AUM (RM)',
          sortField: 'GROUP_FUN',
        },
        {
          name: 'GROUP_FUN',
          title: 'DOCUMENT',
          sortField: 'GROUP_FUN',
        },
        {
          name: "__slot:action",
          title: "REMARKS"
          // dataClass: "float-right"
        },
        // {
        //   name: "__checkbox",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        // },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }
      return this.RecordList.filter(item => {
        return this.term
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              item.STATUS_DISPLAY.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_ASEAN_CIS.toLowerCase().includes(v) ||
              item.FUND_CATEGORY.toLowerCase().includes(v) ||
              item.GROUP_ASSET.toLowerCase().includes(v) ||
              item.GROUP_FUND.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_MAXIMUM_SALE_CHARGE.includes(v) 
          )
      })
    },
  },

  data () {
    return {
      column: [
        "STATUS",
        "DISTRIBUTOR NAME",
        "FIMM FUND CODE",
        "FUND NAME",
        "CIS STRUCTURE",
        "MAXIMUM SALES CHARGES",
        "FUND CATEGORY",
        "ASSET CLASS",
        "FUND GROUP",
        "FUND STATUS",
        "FUND DATE",
        "SUBMISSION DATE",
      ],
      excelname: "Annual Fee Fund Submission",
      sheetname: "Fund Submission",
      header: '',
      field: [],
      term: null,
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,

      model: {
        modelFilter: {
          DIST_NAME: '',
          FUND_CODE_FIMM: '',
        },
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.DIST_NAME',
                label: 'Fund Name',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM',
                label: 'FIMM Fund Code',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM',
                label: 'CIS Structure',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM',
                label: 'Asset Class',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM',
                label: 'Fund Group',
                styleClasses: 'col-md-4',
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
