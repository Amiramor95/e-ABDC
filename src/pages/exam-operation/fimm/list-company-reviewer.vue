<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Company Profile Submission</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
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
            @click="filterCompanyRecord"
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
          <div class="flex md2 offset--md10 exam-type-list-search">
            <va-input
              :placeholder="$t('Search')"
              :value="term"
              @input="search"
              removable
              class="exam-type-input"
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
          <template slot="EXAM_CENTRE_LIST" slot-scope="props">
            <button
              type="button"
              class="ml-2 btn btn-sm btn-outline-primary"
            >
              EXAM CENTRE
            </button>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-if="props.rowData.APPROVAL_STATUS === taskStatusConstants.PENDING_DISPLAY"
                v-b-tooltip.hover
                title="Review Company Profile Submission"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="View Company"
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
          class="btn btn-primary btn-fill btn-md"
          type="button"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as services02module0 from '../../../app/module0/services02'
import * as servicesModule0 from '../../../app/module0/services'

export default {
  mounted () {
    this.getAllRecord()
    this.getActiveInactiveTaskStatus()
    this.getAllStates()
  },
  methods: {
    // search
    search: debounce(function (term) {
      this.term = term
    }, 400),
    back () {
      this.$router.go(-1)
    }, // back button
    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem('user')
      this.RecordList = await companyManagementServices.listCompanyProfileByGroupId({
        USER_GROUP_ID: JSON.parse(user).USER_GROUP_ID,
      })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem('view-company-profile-id', data.COMPANY_PROFILE_ID)
      this.$router.push({
        name: 'view-company-profile',
      })
    },
    async editRecord (data) {
      localStorage.setItem('review-company-profile', JSON.stringify({
        COMPANY_PROFILE_ID: data.COMPANY_PROFILE_ID,
        COMPANY_PROFILE_APPROVAL_ID: data.COMPANY_PROFILE_APPROVAL_ID,
      }))
      this.$router.push({
        name: 'edit-company-profile-reviewer',
      })
    },
    async reset () {
      this.model.COMPANY_STATE = ''
      this.model.COMPANY_NAME = ''
      this.model.COMPANY_STATUS = ''
      this.model.APPROVAL_STATUS = ''
      this.getAllRecord()
    },
    async filterCompanyRecord () {
      this.statusLoad = true
      try {
        const user = localStorage.getItem('user')
        const response = await companyManagementServices.listCompanyProfileByGroupId({
          USER_GROUP_ID: JSON.parse(user).USER_GROUP_ID,
          FILTERS: this.model,
        })
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
          name: 'COMPANY_NAME',
          title: 'COMPANY NAME',
          sortField: 'COMPANY_NAME',
        },
        {
          name: 'COMPANY_REGISTRATION_NO',
          title: 'COMPANY REGISTRATION NO.',
        },
        {
          name: 'NEW_COMPANY_REGISTRATION_NO',
          title: 'NEW COMPANY REGISTRATION NO.',
        },
        {
          name: 'COMPANY_STATE',
          title: 'STATE',
        },
        {
          name: 'COMPANY_STATUS',
          title: 'STATUS',
        },
        {
          name: '__slot:EXAM_CENTRE_LIST',
          title: 'EXAM CENTRE LIST',
        },
        {
          name: 'APPROVAL_STATUS',
          title: 'APPROVAL STATUS',
        },
        {
          name: 'UPDATE_BY',
          title: 'UPDATE BY',
        },
        {
          name: 'LATEST_UPDATE',
          title: 'LATEST UPDATE',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '8%',
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
            (v) => {
              if (item) {
                return (
                  (item.COMPANY_STATE ? item.COMPANY_STATE.toLowerCase().includes(v) : false) ||
                  (item.COMPANY_STATE ? item.COMPANY_STATE.toUpperCase().includes(v) : false) ||
                  (item.COMPANY_NAME ? item.COMPANY_NAME.toLowerCase().includes(v) : false) ||
                  (item.COMPANY_NAME ? item.COMPANY_NAME.toUpperCase().includes(v) : false) ||
                  (item.COMPANY_REGISTRATION_NO ? item.COMPANY_REGISTRATION_NO.includes(v) : false) ||
                  (item.NEW_COMPANY_REGISTRATION_NO ? item.NEW_COMPANY_REGISTRATION_NO.includes(v) : false) ||
                  item.APPROVAL_STATUS.toLowerCase().includes(v) || item.APPROVAL_STATUS.toUpperCase().includes(v) ||
                  (item.COMPANY_STATUS.toLowerCase() === v) || (item.COMPANY_STATUS.toUpperCase() === v)
                )
              }
            },
          )
      })
    },
  },
  data () {
    return {
      taskStatusConstants: TaskStatusConstants,
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
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      model: {
        COMPANY_NAME: '',
        COMPANY_STATE: '',
        COMPANY_STATUS: '',
        APPROVAL_STATUS: '',
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'COMPANY_NAME',
                label: 'COMPANY NAME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                model: 'COMPANY_STATE',
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
                model: 'COMPANY_STATUS',
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
                placeholder: 'Select Approval Status',
                model: 'APPROVAL_STATUS',
                label: 'APPROVAL STATUS',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'TS_ID',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.approvalStatus
                },
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
  .width label {
    display: none;
  }
  input {
    text-transform: uppercase;
  }
</style>
