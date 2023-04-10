<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Session Setting</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <button
              type="button"
              class="mr-2 btn btn-sm btn-primary"
              v-on:click="listExamTime()">
              EXAM TIME
            </button>
            <h5 style = "float:right;">
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
              <span
                class="badge badge-primary"
                title="Add New Exam Session Setting"
                v-b-tooltip.hover
                v-on:click="create"
              >
                <i class="fa fa-plus"></i></span>
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
      <!-- list table-->
      <va-card class="mt-5 col-12">
        <div class="row">
          <div class="flex md2 offset--md10">
            <va-input
              :placeholder="$t('Search')"
              :value="term"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
        </div>
        <va-data-table
          :data="RecordFilteredData"
          :datacount="RecordCount"
          :dataperpage="parseInt(perPage)"
          :fields="RecordFields"
          :per-page="parseInt(perPage)"
          clickable
          no-data-label="No data found"
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>

          <br />
          <br />
          <br />
          <button
            @click="back"
            class="btn btn-primary btn-fill btn-md"
            type="button"
          >
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
        </va-data-table>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examSessionManagementServices from '../../../app/module0/exam-booking/examSessionManagementServices'
import { debounce } from 'lodash'
import * as services02module0 from '../../../app/module0/services02'
import * as servicesModule0 from '../../../app/module0/services'
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'

export default {
  mounted () {
    this.getAllRecord()
    this.getAllStates()
    this.getActiveInactiveTaskStatus()
  },

  methods: {
    // create
    create () {
      this.$router.push({ name: 'create-exam-session-setting' })
    },
    // list exam time
    listExamTime () {
      this.$router.push({ name: 'list-exam-time' })
    },
    // search
    search: debounce(function (term) {
      this.term = term
    }, 400),
    back () {
      this.$router.go(-1)
    }, // back button
    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examSessionManagementServices.listAllExamSessionSetting()
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async reset () {
      // this.model.EFFECTIVE_DATE = null
      this.model.SESSION_IN_ADVANCE = ''
      this.model.STATES = ''
      this.model.STATUS = ''
      this.getAllRecord()
    },
    async filterRecord () {
      this.statusLoad = true
      try {
        const response = await examSessionManagementServices.listAllExamSessionSetting(
          { FILTERS: this.model })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
    },
    async getAllStates () {
      try {
        this.states = await services02module0.getAllStateList()
      } catch (error) {
        console.log(error)
      }
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
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
          name: 'SUBMISSION_DATE',
          title: 'SUBMISSION DATE',
        },
        {
          name: 'STATES',
          title: 'STATES',
        },
        {
          name: 'SESSION_IN_ADVANCE',
          title: 'SESSION IN ADVANCE',
        },
        {
          name: 'START_DATE',
          title: 'START DATE',
        },
        {
          name: 'FREQUENCY',
          title: 'FREQUENCY',
        },
        {
          name: 'END_DATE',
          title: 'END DATE',
        },
        {
          name: 'EFFECTIVE_DATE',
          title: 'EFFECTIVE DATE',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
        },
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }
      return this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) =>
              item.SESSION_IN_ADVANCE.toLowerCase().includes(v) || item.SESSION_IN_ADVANCE.toUpperCase().includes(v) ||
              item.STATES.toLowerCase().includes(v) || item.STATES.toUpperCase().includes(v) ||
                                (item.STATUS.toLowerCase() === v) || (item.STATUS.toUpperCase() === v),
          )
      })
    },
  },
  data () {
    return {
      statusLoad: true,
      header: '',
      field: [],
      perPage: '10',
      currentPage: 1,
      term: null,
      count: 1,
      RecordCount: null,
      RecordList: [],
      status: [],
      states: [],
      sessionInAdvance: [
        { value: 1, name: 'On' },
        { value: 0, name: 'Off' },
      ],
      model: {
        // EFFECTIVE_DATE: null,
        SESSION_IN_ADVANCE: '',
        STATES: '',
        STATUS: '',
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'STATES',
                label: 'STATE',
                required: false,
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'SET_GENERAL_ID',
                  label: 'SET_STATE',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'STATUS',
                label: 'STATUS',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'TS_ID',
                  label: 'TS_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.status
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Session In Advance',
                model: 'SESSION_IN_ADVANCE',
                label: 'SESSION IN ADVANCE',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'value',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.sessionInAdvance
                },
              },
              // {
              //   label: 'EFFECTIVE DATE',
              //   type: 'vfg-functional-date2',
              //   placeholder: 'Effective Date',
              //   model: 'EFFECTIVE_DATE',
              //   format: 'dd-MMM-yyyy',
              //   styleClasses: 'col-md-12',
              //   required: false,
              // },
            ],
          },
        ],
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
