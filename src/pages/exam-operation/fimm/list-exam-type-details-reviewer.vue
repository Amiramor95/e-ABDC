<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Type Details</h4>
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
            @click="filterExamRecord"
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

      <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Description<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <h5>
            <vue-form-generator
              :model="model"
              :schema="descriptionSchema"
              :options="formOptions"
            />
          </h5>
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>

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
          <template slot="DESCRIPTION" slot-scope="props">
            <span v-b-tooltip.hover
              title="View Description"
              v-on:click="viewDescription(props.rowData.DESCRIPTION)">
              <i class="fa fa-window-restore"></i>
            </span>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="View Exam Type Details"
                v-on:click="viewRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-eye"></i
                ></span>
              <span
                v-if="props.rowData.APPROVAL_STATUS == taskStatusConstants.PENDING_DISPLAY"
                v-b-tooltip.hover
                title="Review Exam Type Details"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
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
import * as examBookingServices from '../../../app/module0/examBookingServices'
import Vudal from 'vudal'
import { debounce } from 'lodash'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import * as servicesModule0 from '../../../app/module0/services'

export default {
  mounted () {
    this.getAllRecord()
    this.getConsultantLicenseType()
    this.getActiveInactiveTaskStatus()
  },
  components: { Vudal },

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),
    back () {
      this.$router.go(-1)
    }, // back button
    async getActiveInactiveTaskStatus () {
      const response = await servicesModule0.getActiveInactiveTaskStatus()
      this.status = response
    },
    async reset () {
      this.model.startDate = ''
      this.model.endDate = ''
      this.model.licenseType = ''
      this.model.shortName = ''
      this.model.status = ''
      this.model.approvalStatus = ''
      this.getAllRecord()
    },
    async getConsultantLicenseType () {
      const response = await servicesModule0.getConsultantType()
      this.licenseType = response
    },
    async filterExamRecord () {
      const user = localStorage.getItem('user')
      try {
        // alert(JSON.stringify(this.model));
        const response = await examBookingServices.filterExamTypeDetailListByGroupId(
          JSON.parse(user).USER_GROUP_ID, this.model)
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
    },
    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem('user')
      const response = await examBookingServices.getExamTypeDetailListByGroupId(JSON.parse(user).USER_GROUP_ID)
      this.RecordList = response
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewDescription (description) {
      this.model.description = description
      this.$modals.simpleModal.$show()
    },
    async viewRecord (data) {
      localStorage.setItem('view-exam-type-details', JSON.stringify(data))
      this.$router.push({
        name: 'view-exam-type-details',
      })
    },
    editRecord (data) {
      if (localStorage.getItem('edit-exam-type-details-reviewer') !== null) {
        localStorage.removeItem('edit-exam-type-details-reviewer')
      }
      localStorage.setItem('edit-exam-type-details-reviewer', JSON.stringify(data))
      this.$router.push({
        name: 'edit-exam-type-details-reviewer',
      })
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
          name: 'EXAM_NAME',
          title: 'EXAM NAME',
          sortField: 'EXAM_NAME',
        },
        {
          name: 'SHORT_NAME',
          title: 'SHORT NAME',
        },
        {
          name: 'LICENSE_TYPE',
          title: 'LICENSE TYPE',
          sortField: 'LICENSE_TYPE',
        },
        {
          name: '__slot:DESCRIPTION',
          title: 'DESCRIPTION',
        },
        {
          name: 'START_DATE',
          title: 'START DATE',
        },
        {
          name: 'END_DATE',
          title: 'END DATE',
        },
        {
          name: 'DURATION',
          title: 'DURATION(MINUTES)',
        },
        {
          name: 'EXAM_CLOSING_DAYS',
          title: 'EXAM CLOSING DAYS',
        },
        {
          name: 'CSL_DAYS',
          title: 'CSL DAYS',
        },
        {
          name: 'GAP_BETWEEN_3_PREFERRED_DATES',
          title: 'GAP BETWEEN 3 PREFERRED DATES',
        },
        {
          name: 'POST_EXAM_CHECKING_HOURS',
          title: 'POST EXAM CHECKING(HOURS)',
        },
        {
          name: 'PASSING_MARK',
          title: 'PASSING MARK(%)',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
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
                return (item.LICENSE_TYPE.toLowerCase().includes(v) || item.LICENSE_TYPE.toUpperCase().includes(v) ||
                  (item.EXAM_NAME ? item.EXAM_NAME.toLowerCase().includes(v) : false) ||
                  (item.EXAM_NAME ? item.EXAM_NAME.toUpperCase().includes(v) : false) ||
                  (item.SHORT_NAME ? item.SHORT_NAME.toLowerCase().includes(v) : false) ||
                  (item.SHORT_NAME ? item.SHORT_NAME.toUpperCase().includes(v) : false) ||
                  item.APPROVAL_STATUS.toLowerCase().includes(v) || item.APPROVAL_STATUS.toUpperCase().includes(v) ||
                  (item.STATUS.toLowerCase() == v) || (item.STATUS.toUpperCase() == v)
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
      licenseType: [],
      status: [],
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      model: {
        description: '',
        startDate: null,
        endDate: null,
        licenseType: '',
        shortName: '',
        status: '',
        approvalStatus: '',
      },

      descriptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                model: 'description',
                rows: 5,
                validator: 'string',
                styleClasses: 'col-md-12',
                readonly: true,
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
                type: 'vueMultiSelect',
                model: 'licenseType',
                label: 'LICENSE TYPE',
                placeholder: 'Select License Type',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'TYPE_NAME',
                  label: 'TYPE_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.licenseType
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'shortName',
                label: 'SHORT NAME',
                styleClasses: 'col-md-6',
              },
              {
                label: 'START DATE',
                type: 'vfg-functional-date2',
                placeholder: 'Start Date',
                model: 'startDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                label: 'END DATE',
                type: 'vfg-functional-date2',
                placeholder: 'End Date',
                model: 'endDate',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'status',
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
                model: 'approvalStatus',
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
  .exam-type-list-search {
    display: inline-flex;
    align-items: self-start;
  }

  .exam-type-input {
    margin-right: 8px;
  }
  .width label {
    display: none;
  }
  input {
    text-transform: uppercase;
  }
</style>
