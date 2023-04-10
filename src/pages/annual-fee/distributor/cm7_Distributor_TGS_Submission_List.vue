<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">TOTAL GROSS SALES ENTRY YEAR 2020</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>
<!-- 
            <downloadExcel
        :json_data="RecordList"
        :excelname="excelname"
        :sheetname="sheetname"
        :column="column"
      ></downloadExcel> -->
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
        <!-- <template slot="foreign" slot-scope="row">
                    <div >
                      <b-form-input type="text" value="1.0000"></b-form-input>
                    </div>
            </template>
            <template slot="aum" slot-scope="row">
                    <div >
                      <b-form-input type="text" value="0.00"></b-form-input>
                    </div>
            </template> -->
      </va-data-table>

      <br />

      <!-- <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">PDF File :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :linkable="true"
          :accept="'.pdf,.xls,.xlsx'"
          :maxSize="'10MB'"
          :helpText="'Choose document'"
          :errorText="{
            type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
            size: 'Files should not exceed 10MB in size'
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </div>
    </div> -->
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
          <button  
          type="button" class="ml-1 btn btn-success btn-fill btn-md">
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
      this.$router.push('/distributor/distributor-TGS-Submission')
    },

    deleteUploadedFile: function(fileRecord) {
      this.uploadFileOject = [];
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);
    },
    filesSelected: function(fileRecordsNewlySelected) {
      this.uploadFileOject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      //this.uploadFileName = this.fileRecordsForUpload[0].file.name;
      //  this.uploadFileOject = this.fileRecordsForUpload[0].file;
      // this.uploadFileOject.push(this.fileRecordsForUpload[0].file);
      // var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);
    },

    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        console.log("before delete");
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
        }
        console.log(this.uploadFileOject);
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    fileDeleted: function(fileRecord) {
      console.log("file delete");
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
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
          name: 'FUND_CATEGORY',
          title: 'FUND CATEGORY',
          sortField: 'FUND_CATEGORY',
        },
        {
          name: "__slot:foreign",
          title: "FOREIGN EXCHANGE RATE"
          // dataClass: "float-right"
        },
        {
          name: "__slot:aum",
          title: "Total Gross Sales (RM)"
          // dataClass: "float-right"
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
                label: 'Fund Category',
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
