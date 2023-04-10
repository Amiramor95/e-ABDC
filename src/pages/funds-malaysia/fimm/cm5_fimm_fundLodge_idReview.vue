<template>
  <va-card>
    <br />
    <br />
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">Fund Dislodgement Entry</h4>
        <br />
        <va-card class="mt-5 col-12">
          <va-data-table
            :fields="fundLodge"
            :data="selectedList"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="fundlodgeRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="EXPECTED_DATE" slot-scope="props">
              <vue-form-generator
              :model="model"
              :schema="EXPECTED_DATE"
              :options="formOptions"
              ref="fileUploadForm"
            >
            </vue-form-generator>

            </template>
            <template slot="DASDALETTER_Date" slot-scope="props">
              <vue-form-generator
              :model="model"
              :schema="DASDALETTER_Date"
              :options="formOptions"
              ref="fileUploadForm"
            >
            </vue-form-generator>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="edit"
                  v-on:click="viewRecord(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-eye"></i
                  ></span>
                  <span
                    @click="removeParticipant(props.rowData)"
                    class="badge badge-danger mr-1"
                  >
                    <i class="fa fa-ban"></i>
                  </span>
              </h5>
            </template>
          </va-data-table>
        </va-card>
      </div>
    </va-card>
    <br />
    <br />
    <div id="app" class="ml-1 col-md-11">
            <vue-form-generator
              :model="model"
              :schema="fileUploadSchema"
              :options="formOptions"
              ref="fileUploadForm"
            >
            </vue-form-generator>
    </div>
    <div>

    </div>
    <br />
    <div>
      <div>
        <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <button
              @click="submit"
              type="button"
              class="ml-2 btn btn-primary btn-fill float-right btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Approve
            </button>
            <button
              @click="returnCase"
              type="button"
              class="ml-2 btn btn-warning btn-fill float-right btn-md"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="rejectCase"
              type="button"
              class="ml-2 btn btn-danger btn-fill float-right btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Reject
            </button>
      </div>
    </div>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule5 from '../../../app/module5/services03'
import * as services3Module1 from '../../../app/module1/services03'
import * as servicesModule0main from '../../../app/module0/services'

export default {
  mounted () {
    this.getDistributorType();
    this.getDistributorList();
    this.getFPLodge();
    console.log(JSON.stringify(this));
  },
  components: {},

  methods: {
    addParticipant (data) {
      var fundprofileRecordListIndex = this.fundprofileRecordList.indexOf(data);
      this.selectedList.push(data);
      this.fundprofileRecordList.splice(fundprofileRecordListIndex, 1);
      console.log(JSON.stringify(fundprofileRecordList));
      console.log(JSON.stringify(selectedList));
    },
    removeParticipant (data) {

      var selectedListIndex = this.selectedList.indexOf(data);
      this.selectedList.splice(selectedListIndex, 1);
      this.fundprofileRecordList.push(data);
      console.log(fundprofileRecordList);
      console.log(selectedList);
    },
    // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    // // advanceSearch
    // getAllFundProfile: async function () {
    //   const response = await servicesModule5.getAllClassification()
    //   this.classificationList = response
    // },
    async filterFundProfile () {
      try {
        const response = await servicesModule5.fundprofileRecordList(
          this.model.modelFilter,
        )
        if (response !== 'error') {
          this.fundprofileRecordList = response
        }
      } catch (error) {}
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    back () {
      this.$router.go(-1)
    }, // back button

    // getAllRecord
    getFPLodge: async function () {

      const response = await servicesModule5.getFPLodge()
      this.fundprofileRecordList = response
      this.fundprofileRecordCount = this.fundprofileRecordList.length
    },
    getDistributorType: async function () {
      const response = await servicesModule0main.getDistributorType()
      this.DistributorType = response
      console.log(this.DistributorType)
    },
    getDistributorList: async function () {
      const response = await services3Module1.getDistributorList ()
      this.DistributorList = response
      console.log(this.DistributorList)
    },
    async viewRecord (data) {
      this.$router.push({
        name: 'fundLodgeProfile-review',
        params: { FUNDPROFILE: data },
      })
    },
    onLodge: async function () {
      console.log('Start function Lodge Fund')
      const data = new FormData()
      const user = localStorage.getItem("user");
      data.append('DIST_ID', JSON.parse(localStorage.getItem('user')).user_dist_id);
      data.append('DIST_USER_ID', JSON.parse(user).user_id);
      data.append('DIST_USER_GROUP', JSON.parse(localStorage.getItem('user')).user_group_id);
      // data.append('FUND_PROFILE_ID', selectedList.FUND_PROFILE_ID);
      data.append("CREATE_BY", JSON.parse(user).user_id);

      // File upload
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append("file[]", this.model.file[i]);
        }
        data.append("isFile", "1");
      } else {
        data.append("isFile", "0");
      }

      try {
        console.log('Begin Fund Lodgement');
        const response = await servicesModule5.createFundLodgement(data);
        //alert(JSON.stringify(response));
        alert('Fund Lodged');
        this.$router.push("/distributor/fundLodgementCompany");
      } catch (error) {
        console.log(error);
      }


    }
    // async viewRecord (data) {
    //   this.$router.push({
    //     name: 'fundcreation-review',
    //     // params: { FUNDPROFILE: data },
    //   })
    // },
    // async addRecord () {},
  },

  computed: {
    fundProfile () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'FUND_CODE_MEMBER',
          title: 'FUND CODE',
          sortField: 'FUND_CODE_MEMBER',
        },
        {
          name: 'FUND_NAME',
          title: 'FUND NAME',
          sortField: 'FUND_NAME',
        },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'FUND_DATE_LAUNCH',
          title: 'LAUNCH DATE',
          sortField: 'FUND_DATE_LAUNCH',
          width: '8%',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '8%',
        },
      ]
    },
    fundLodge () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'FUND_CODE_MEMBER',
          title: 'FUND CODE',
          sortField: 'FUND_CODE_MEMBER',
        },
        {
          name: 'FUND_NAME',
          title: 'FUND NAME',
          sortField: 'FUND_NAME',
        },
        {
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'FUND_DATE_LAUNCH',
          title: 'LAUNCH DATE',
          sortField: 'FUND_DATE_LAUNCH',
          width: '8%',
        },
        {
          name: '__slot:EXPECTED_DATE',
          title: 'EXPECTED DISTRIBUTION DATE',
          dataClass: 'justify-content-center',
          width: '10%',
        },
        {
          name: '__slot:DASDALETTER_Date',
          title: 'DATE OF DA/SDA/NOTIFICATION LETTER',
          dataClass: 'justify-content-center',
          width: '10%',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '8%',
        },
      ]
    },
    fundProfileFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.fundprofileRecordList
      }
      return this.fundprofileRecordList.filter(item => {
        // return item.title.toLowerCase().startsWith(this.term.toLowerCase()) ,
        return this.term

          .split(' ')
          .every(
            (v) =>
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_CODE_MEMBER.includes(v) ||
              item.FUND_NAME.includes(v) ||
              item.UMBRELLA_FUND_NAME.includes(v),
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
      // classificationList: [],
      fundprofileRecordList: [],
      fundprofileRecordCount: null,
      count: 1,

      DistributorType: [],
      DistributorList: [],

      model: {
        DIST_TYPE:[],
        DISTRIBUTOR_NAME: [],
        fileUpload: "",
        file: [],
        EXPECTED_DATE:"",
        DASDALETTER:"",

      },

      selectedList: [],
      EXPECTED_DATE: {
        groups: [
          {
            fields: [
              {
                type: 'vfg-functional-date',
                placeholder: 'Expected Date',
                model: 'EXPECTED_DATE',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                required: true,
              },
            ],
          },
        ],
        },
      DASDALETTER_Date: {
        groups: [
          {
            fields: [
              {
                type: 'vfg-functional-date',
                placeholder: 'DA/SDA/NOTIFICATION Letter Date',
                model: 'DASDALETTER',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                required: true,
              },
            ],
          },
        ],
        },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      distributorFilterSchema: {
        groups: [
          {
            styleClasses: "col",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "text",
                label: "Distributor Type",
                model: "DIST_TYPE",
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "COMBINE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DistributorType;
                },
              },
              {
                type: "vueMultiSelect",
                inputType: "text",
                label: "Distributor",
                model: "DISTRIBUTOR_NAME",
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "COMBINE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DistributorList;
                },
              },
            ],
          },
        ],
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
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
                model: 'modelFilter.FUND_CODE_MEMBER',
                label: 'Member Fund Code',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FUND_NAME',
                label: 'Fund Name',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.UMBRELLA_FUND_NAME',
                label: 'Umbrella Fund Name',
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
<style lang="scss">
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
