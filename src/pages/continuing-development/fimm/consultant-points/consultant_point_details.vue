<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">View Consultant CPD Point Details ({{title}})</h4>
    </div>

    <br />
    <table class="table table-striped">
      <tbody>
        <tr>
          <td style="width: 20%">CONSULTANT NAME</td>
          <td style="width: 1%">:</td>
          <td>{{ PROGDATA.CONSULTANT_NAME }}</td>
        </tr>
        <tr>
          <td style="width: 20%">FIMM NO</td>
          <td style="width: 1%">:</td>
          <td>{{ PROGDATA.CONSULTANT_FIMM_NO }}</td>
        </tr>
        <tr>
          <td style="width: 20%">TOTAL CPD POINT</td>
          <td style="width: 1%">:</td>
          <td>{{this.GRAND_TOTAL_CPD_POINT}}</td>
        </tr>
      </tbody>
    </table>

    <br>
    <br>

    <table class="table table-bordered">
      <tbody>
      <tr>
        <th>
          <strong>LICENSE TYPE</strong>
        </th>
        <th>
          <strong>DISTRIBUTOR NAME</strong>
        </th>
      </tr>
      <tr  v-for="item in consultantLicenses">
        <td style="width: 20%">{{item.TYPE_SCHEME}}</td>
        <td>{{ item.DIST_NAME }}</td>
      </tr>
      </tbody>
    </table>

    <!-- list table-->
    <b-row class="justify-content-end">
      <b-col cols="3">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </b-col>
      <b-col cols="3">
        <div class="input-group">
          <va-date-picker
            :value="termDate"
            @input="searchDate"
            :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
            v-model="dateFormat"
            placeholder="Search date"
          />
          <div class="input-group-append">
            <button
              @click="clear"
              type="button"
              class="btn btn-md btn-primary"
            >
              <va-icon name="fa fa-refresh" />
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
    <va-card v-if="this.MODULE_TYPE" class="mt-5 col-12">

      <va-data-table
        :fields="RecordModuleFields"
        :data="RecordModuleFilteredData"
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
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </va-card>
    <va-card v-if="this.PROG_TYPE" class="mt-5 col-12">
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
  import RemarkPopup from "../modules/components/remarkPopup";
  import { debounce } from 'lodash'
  import * as servicesModule4 from "../../../../app/module4/services01";
  export default {
    mounted () {
      var data=localStorage.getItem('cpd_details');
      this.PROGDATA=JSON.parse(data);
      this.PROG_TYPE=this.$route.query.prog_type,
      this.MODULE_TYPE=this.$route.query.module_type,
        this.getDistributorDetails();
      this.getAllRecord();


      let module_name = this.$route.query.module_type
      let prog_name = this.$route.query.prog_type
      if(module_name == 1) {
        this.title = "Writing Program"
      } else if(module_name == 2) {
        this.title = "Reading Program"
      } else if(module_name == 3) {
        this.title = "Teaching Program"
      } else if(module_name == 4) {
        this.title = "Academic Program"
      }
      else if(module_name == 5) {
        this.title = "FP Program"
      }
      else if(prog_name == 1) {
        this.title = "Post-vetting Program"
      }
      else if(prog_name == 2) {
        this.title = "Pre-vetting Program"
      }
    },
    components: {
      RemarkPopup,
    },

    methods: {
      async back(){
        this.$router.go(-1);
      },

      clear() {
        this.term = null;
        this.termDate = null;
        this.dateFormat = null;

      },
      searchDate: debounce(function (value) {
        console.log('search date' +value);

        this.termDate = value;
        this.$emit("filter-date", value);
      }, 400),
      // search
      search: debounce(function (term) {
        console.log('test',term);
        this.term = term
      }, 400),

      async getDistributorDetails() {
        try {
          const res_distributor = await servicesModule4.getConsultantLicenseWithDist(this.PROGDATA.CONSULTANT_ID);
          this.consultantLicenses = res_distributor;
        } catch (error) {
          console.log(error);
        }
      },
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
        const response = await servicesModule4.getConsultantCPDDetails(this.MODULE_TYPE,this.PROG_TYPE,this.PROGDATA.CONSULTANT_ID,)
        this.GRAND_TOTAL_CPD_POINT=response.grand_total_cpd_point;
        this.RecordList = response.program_lists;
        this.RecordCount = this.RecordList.length;
      },
      async viewRecord (data) {
        localStorage.setItem('test', JSON.stringify(data))
        this.$router.push({
          name: 'consultant-cpd-points-details',
        })
      },

    },

    computed: {
      RecordModuleFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'MODULE_NAME',
            title: 'MODULE',
            sortField: 'MODULE_NAME',
          },
          {
            name: 'MODE',
            title: 'MODE',
            sortField: 'MODE',
          },

          {
            name: 'TYPE',
            title: 'TYPE',
            sortField: 'TYPE',
          },
          {
            name: 'TOTAL_HOURS',
            title: 'TOTAL HOURS',
            sortField: 'TOTAL_HOURS',
          },

          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL CPD POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },
      RecordFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'MODULE_NAME',
            title: 'MODULE',
            sortField: 'MODULE_NAME',
          },
          {
            name: 'PROG_DATE_START',
            title: 'PROGRAM START DATE',
            sortField: 'PROG_DATE_START',
          },

          {
            name: 'PROG_DATE_END',
            title: 'PROGRAM END DATE',
            sortField: 'PROG_DATE_END',
          },

          {
            name: 'PROG_VENUE',
            title: 'VENUE',
            sortField: 'PROG_VENUE',
          },
          {
            name: 'MODE',
            title: 'MODE',
            sortField: 'MODE',
          },

          {
            name: 'TYPE',
            title: 'TYPE',
            sortField: 'TYPE',
          },

          {
            name: 'PROG_HOURS',
            title: 'TOTAL HOURS',
            sortField: 'PROG_HOURS',
          },

          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL CPD POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },

      // eslint-disable-next-line vue/return-in-computed-property
      RecordModuleFilteredData () {
        if (!this.term || this.term.length < 1) {
          return this.RecordList
        }

        return this.RecordList.filter((item) => {
          return this.term
            .toLowerCase()
            .split(' ')
            .every(
              (v) =>
                item.TITLE.toLowerCase().includes(v) ||
                // (item.CPD_CODE ? item.CPD_CODE.toLowerCase().includes(v) : false) ||
                (item.MODULE_NAME ? item.MODULE_NAME.toLowerCase().includes(v) : false)
            )
        })
      },
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
                item.TITLE.toLowerCase().includes(v) ||
                (item.CPD_CODE ? item.CPD_CODE.toLowerCase().includes(v) : false) ||
                (item.TYPE ? item.TYPE.toLowerCase().includes(v) : false) ||
                (item.MODE ? item.MODE.toLowerCase().includes(v) : false) ||
                (item.MODULE_NAME ? item.MODULE_NAME.toLowerCase().includes(v) : false)
            )
        })
      },
    },

    data () {
      return {
        GRAND_TOTAL_CPD_POINT:0,
        title:"",
        MODULE_TYPE:null,
        PROG_TYPE:null,
        PROGDATA: "",
        header: '',
        field: [],
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        classificationList: [],
        RecordList: [],
        consultantLicenses: [],
        RecordCount:0,
        count: 1,

        term: null,
        termDate: null,
        dateFormat: null,

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
