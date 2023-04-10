<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Distributor Cessation Submission</h4>
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
        :data="caRecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="caRecordCount"
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
import * as servicesModule1 from '../../../app/module1/services05'

export default {
  mounted () {
    this.getAllRecord()
  },
  components: {},

  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    async filterRecord () {
      try {
        const response = await servicesModule1.filterRecordList(
          this.model.modelFilter,
        )
        if (response != 'error') {
          this.caRecordList = response
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
    getAllRecord: async function () {
      const user = localStorage.getItem("user");
      var APPR_GROUP_ID = JSON.parse(user).USER_GROUP_ID;
      const response = await servicesModule1.getAllCessList(APPR_GROUP_ID)
      this.caRecordList = response
      this.caRecordCount = this.caRecordList.length
    },
    async viewRecord () {
      // localStorage.setItem(
      //   "distributor-CessationDetails-rdApproval",
      //   JSON.stringify(data)
      // );
      this.$router.push({
        name: "distributor-CessationDetails-rdApproval",
      });
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
          name: 'DIST_NAME',
          title: 'DISTRIBUTOR NAME',
          sortField: 'DIST_NAME',
        },
        {
          name: 'DIST_REGI_NUM1',
          title: 'REG NUMBER',
          sortField: 'DIST_REGI_NUM1',
        },
        {
          name: 'DIST_REGI_NUM2',
          title: 'NEW REG NUMBER',
          sortField: 'DIST_REGI_NUM2',
        },
        {
          name: 'DIST_PHONE_NUMBER',
          title: 'PHONE NUMBER',
          sortField: 'DIST_PHONE_NUMBER',
        },
        {
          name: 'DIST_EMAIL',
          title: 'EMAIL',
          sortField: 'DIST_EMAIL',
        },
        {
          name: 'USER_PASSPORT_NO',
          title: 'STATUS',
          sortField: 'USER_PASSPORT_NO',
        },
        {
          name: 'TOTAL_COUNT',
          title: 'UPDATE BY',
          sortField: 'TOTAL_COUNT',
        },
        {
          name: 'TOTAL_COUNT',
          title: 'LATEST UPDATE',
          sortField: 'TOTAL_COUNT',
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
    caRecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList
      }

      return this.caRecordList.filter((item) => {
        return this.term

          .split(' ')
          .every(
            (v) =>
              item.USER_NAME.includes(v) ||
              item.USER_NRIC.includes(v) ||
              item.USER_FIMM_NO.includes(v) ||
              item.USER_PASSPORT_NO.includes(v),
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
      caRecordList: [],
      count: 1,

      model: {
        modelFilter: {
          DIST_NAME: '',
          USER_NAME: '',
          USER_NRIC: '',
          USER_PASSPORT_NO: '',
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
                model: 'modelFilter.USER_FIMM_NO',
                label: 'DISTRIBUTOR NAME',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.USER_NAME',
                label: 'REG NUMBER',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.USER_NRIC',
                label: 'NEW REG NUMBER',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'modelFilter.USER_PASPORT_NO',
                label: 'Passport Number',
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
