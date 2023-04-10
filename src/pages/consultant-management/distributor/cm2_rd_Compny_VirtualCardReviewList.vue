<template>
  <va-card>
    <div class="row">
      <br />
    </div>
    <div class="row">
      <h4 slot="header" class="card-title">List Of New Consultant Application (RD)</h4>
      <br />
    </div>

    <br />
    <div class="float-left">
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
        :fields="fundProfile"
        :data="fundProfileFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="fundprofileRecordCount"
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
              title="edit"
              v-on:click="viewRecord(props.rowData)"
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
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill float-left btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
// import * as servicesModule2 from '../../../app/module2/services03'

export default {
  mounted () {
    this.getAllFundLodgement()
    console.log(JSON.stringify(this))
  },
  components: {},

  methods: {
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
    // create
    create () {
      this.$router.push({ name: '/fundLodgementDetails' })
    },
    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    back () {
      this.$router.go(-1)
    }, // back button

    // getAllRecord
    getAllFundLodgement: async function () {
      const response = await servicesModule2.getAllConsultantRegistration()
      this.fundprofileRecordList = response
      this.fundprofileRecordCount = this.fundprofileRecordList.length
    },
    async viewRecord (data) {
      this.$router.push({
        name: 'd-consultant-virtualCardlist',
        params: { VCARD: data },
      })
    },
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
          name: 'CREATE_TIMESTAMP',
          title: 'SUBMISSION DATE',
          sortField: 'CREATE_TIMESTAMP',
          width: '8%',
        },
        {
          name: 'FUND_CODE_MEMBER',
          title: 'DISTRIBUTOR NAME',
          sortField: 'FUND_CODE_MEMBER',
        },
        {
          name: 'FUND_NAME',
          title: 'DISTRIBUTOR TYPE',
          sortField: 'FUND_NAME',
        },
        {
          name: 'FUND_FORMER_NAME',
          title: 'TOTAL APPLICATION',
          sortField: 'FUND_FORMER_NAME',
        },
        {
          name: 'FUND_EXPECTED_DISTRIBUTION_DATE',
          title: 'APPLICATION TYPE',
          sortField: 'FUND_EXPECTED_DISTRIBUTION_DATE',
          width: '8%',
        },
        {
          name: 'FUND_CONTRACT_EFFECTIVE_DATE',
          title: 'STATUS',
          sortField: 'FUND_CONTRACT_EFFECTIVE_DATE',
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
              item.FIMM_FUND_CODE.includes(v) ||
              item.FUND_CODE_MEMBER.includes(v) ||
              item.FUND_NAME.includes(v) ||
              item.UMBRELLA_FUND_NAME.includes(v) ||
              item.CREATE_TIMESTAMP.includes(v),
          )
      })
    },

    // // eslint-disable-next-line vue/return-in-computed-property
    // caRecordFilteredData () {
    //   if (!this.term || this.term.length < 1) {
    //     return this.caRecordList
    //   }

    //   return this.caRecordList.filter((item) => {
    //     return this.term

    //       .split(' ')
    //       .every(
    //         (v) =>
    //           item.CONSULTANT_NAME.includes(v) ||
    //           item.CONSULTANT_NRIC.includes(v) ||
    //           item.CONSULTANT_FIMM_NO.includes(v) ||
    //           item.CONSULTANT_PASSPORT_NO.includes(v),
    //       )
    //   })
    // },
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

      model: {
        search: '',
      },

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.FIMM_FUND_CODE',
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
