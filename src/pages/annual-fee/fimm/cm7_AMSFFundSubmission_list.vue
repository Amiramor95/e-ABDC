<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">LIST OF FUNDS</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge
              v-b-tooltip.hover
              title="Advance Search"
              v-b-toggle.collapse-1
              class="mr-1"
              variant="secondary"
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
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="RecordCount"
        clickable
      >
        <template slot="actions" slot-scope="props">
          <va-checkbox
            @change="checkBox"
            class="col-2"
            v-model="props.rowData.selected"
            v-b-tooltip.hover
            title="Advance Search"
          />
        </template>
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="flag" slot-scope="props">
          <h1 class="mt-1">
            <span
              v-if="props.rowData.STATUS == null "
              title="Pending"
              class="badge  mr-2"
            >
              <i class="fa fa-flag red-color "></i
            ></span>
            <span
              v-if="props.rowData.STATUS == 28 "
              title="Returned by RD"
              class="badge  mr-2"
            >
              <i class="fa fa-flag purple-color"></i
            ></span>
            <span
              v-if="props.rowData.STATUS == 4 "
              title="Verified"
              class="badge  mr-2"
            >
              <i class="fa fa-flag blue-color"></i
            ></span>
            <span
              v-if="props.rowData.STATUS == 27 "
              title="Returned to ID"
              class="badge  mr-2"
            >
              <i class="fa fa-flag orange-color "></i
            ></span>
          </h1>
        </template>
      </va-data-table>

      <br />
      <div>
        <table>
          <tr>
            <th>Legend</th>
          </tr>
          <tr>
            <td><i class="fa fa-flag red-color "></i></td>
            <td>PENDING</td>
          </tr>
          <tr>
            <td><i class="fa fa-flag orange-color "></i></td>
            <td>RETURNED TO ID</td>
          </tr>
          <tr>
            <td><i class="fa fa-flag purple-color "></i></td>
            <td>RETURNED BY RD</td>
          </tr>
          <tr>
            <td><i class="fa fa-flag blue-color "></i></td>
            <td>VERIFIED</td>
          </tr>
        </table>
      </div>
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
        <!-- <div class="float-right">
          <button
            @click="returnFund"
            type="button"
            class="ml-1 btn btn-warning btn-fill btn-md"
          >
            <i class="fa fa-reply" /> &nbsp; Return
          </button>
          <button
            @click="VerifyFund"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Verify
          </button>
        </div> -->
      </div>
      <br />
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule7 from '../../../app/module7/services05'

export default {
  mounted () {
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


    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    // advanceSearch
    async filterRecord () {
      try {
        const response = await servicesModule7.filter_submission_record(this.model.modelFilter,)
        if (response != 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
    },

    async reset () {
      this.model.modelFilter.DIST_NAME = '';
      this.model.modelFilter.FUND_CODE_FIMM= '';
      // this.RecordList = null;
      this.getAllRecord();
    },

    // back button
    back () {
      this.$router.go(-1)
    },

    // retun button
    returnFund: async function () {
      if (confirm("Are you sure to return of this fund?"))
      {
        const data = new FormData();
      data.append("TRANS_STATUS", "4");

      try {
        const response = await servicesModule7.returnFund(data);
        // alert(JSON.stringify(response));
        this.$router.go();
        // this.$router.push("/fimm/AnnualFee-FundSubmission-list");
      } catch (error) {
        console.log(error);
      }
      }
    },

    // verify button

    VerifyFund: async function () {
      if (confirm("Are you sure to verify of this fund?"))
      {
      const data = new FormData();
      data.append("TRANS_STATUS", "4");
      try {
        const response = await servicesModule7.update_submission(data);
        // alert(JSON.stringify(response));
        // this.$router.go();
        // this.$router.push("/fimm/AnnualFee-FundSubmission-list");
      } catch (error) {
        console.log(error);
      }
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

        // {
        //   name: "__checkbox",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        // },
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: "__slot:flag",
          title: "STATUS",
          dataClass: "justify-content-center",
          width: "2%",
        },
        // {
        //   name: 'STATUS_DISPLAY',
        //   title: 'STATUS',
        //   sortField: 'STATUS_DISPLAY',
        // },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'DIST_TYPE_NAME',
          title: 'DISTRIBUTOR TYPE',
          sortField: 'DIST_TYPE_NAME',
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
          name: 'FUND_MAXIMUM_SALE_CHARGE',
          title: 'MAXIMUM SALES CHARGE(%)',
          sortField: 'FUND_MAXIMUM_SALE_CHARGE',
        },
        {
          name: 'FUND_CATEGORY',
          title: 'FUND CATEGORY',
          sortField: 'FUND_CATEGORY',
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
          name: 'TS_PARAM',
          title: 'FUND STATUS',
          sortField: 'TS_PARAM',
        },
        {
          name: 'SUBMISSION_DISPLAY',
          title: 'DATE',
          sortField: 'SUBMISSION_DISPLAY',
        },
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
                label: 'Distributor Name',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM',
                label: 'Fund Name',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM1',
                label: 'FIMM Fund Code',
                styleClasses: 'col-md-3',
              },

              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM2',
                label: 'CIS Structure',
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM3',
                label: 'Asset Class',
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_CODE_FIMM4',
                label: 'Fund Group',
                styleClasses: 'col-md-3',
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

.red-color {
  color: #c00000;
}
.blue-color {
  color: #4472c4;
}
.purple-color {
  color: #cc00cc;
}
.orange-color {
  color: #ed7d31;
}
</style>
