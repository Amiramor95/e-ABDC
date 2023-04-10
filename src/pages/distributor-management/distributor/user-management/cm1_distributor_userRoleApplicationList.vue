<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">User Role Application List</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">

        </div>
      </div>
    </div>

    <br />

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
      <!-- <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill float-left btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button> -->
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css';
import { debounce } from 'lodash';
import * as services6Module1 from '../../../../app/module1/services06';

export default {
  mounted () {
    this.getUserRegList()
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
    getUserRegList: async function () {

      const user = localStorage.getItem('user')
      const response = await services6Module1.getUserRegList(JSON.parse(user).USER_DIST_ID)
      this.fundprofileRecordList = response
      this.fundprofileRecordCount = this.fundprofileRecordList.length
    },
    async viewRecord (data) {
      this.$router.push({
        name: 'distributor-user-role-review',
        params: { USERDETAIL: data },
      })
    },
  },

  computed: {
    fundProfile () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'USER_NAME',
          title: 'FULL NAME',
          sortField: 'USER_NAME',
        },
        {
          name: 'USER_EMAIL',
          title: 'EMAIL',
          sortField: 'USER_EMAIL',
        },
        {
          name: 'DISTRIBUTOR_MANAGE_GROUP_NAME',
          title: 'DEPARTMENT',
          sortField: 'DISTRIBUTOR_MANAGE_GROUP_NAME',
        },
        {
          name: 'TS_PARAM',
          title: 'STATUS',
          sortField: 'TS_PARAM',
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
              item.FUND_CODE_FIMM.includes(v) ||
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
        modelFilter: {
          FUND_CODE_FIMM: '',
          FUND_CODE_MEMBER: '',
          FUND_NAME: '',
          UMBRELLA_FUND_NAME: '',
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
