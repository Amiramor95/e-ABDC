<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Session Generated</h4>
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
      <div class="row">
        <h6 class="col-12">Centre Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{{centreName}}</h6><br/>
        <h6 class="col-12">Date Generated :&nbsp;&nbsp;{{dateGenerated}}</h6>
      </div>
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
          :data="filteredData"
          :datacount="RecordCount"
          :dataperpage="parseInt(perPage)"
          :fields="fields"
          :per-page="parseInt(perPage)"
          clickable
          no-data-label="No data found"
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="csl" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="View Candidate Session List"
                v-on:click="viewCSL(props.rowData.SESSION_DETAILS_ID,props.rowData.CSL_DATE)"
                class="badge badge-primary mr-2">
                <i class="fa fa-eye"></i>
              </span>
            </h5>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Session"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2">
                <i class="fa fa-edit"></i>
              </span>
              <span
                v-b-tooltip.hover
                title="Cancel Session"
                v-on:click="cancelSession(props.rowData.SESSION_DETAILS_ID)"
                class="badge badge-danger mr-2"
              >
                <i class="fa fa-minus-circle"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="View Exam Session Details"
                v-on:click="viewExamSessionDetails(props.rowData.SESSION_DETAILS_ID)"
                class="badge badge-primary mr-2">
                <i class="fa fa-eye"></i>
              </span>
            </h5>
          </template>
        </va-data-table>
        <br />
        <div class="reviewer-section" v-if="isReviewedStatus">
          <div>
            <h6 class="col-md-12 mb-4">Approval</h6>
            <vue-form-generator
              :model="model"
              :schema="remarkSchema"
              :options="formOptions"
              ref="statusForm"
            >
            </vue-form-generator>
          </div>
          <br/>
          <br/>

          <div class="float-right">

            <button
              type="return"
              class="mr-2 btn btn-warning btn-fill btn-md"
              @click.prevent="returnSession"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="reject"
              type="button"
              class="mr-2 btn btn-danger btn-fill btn-md"
            >
              <i class="fa fa-ban" /> &nbsp; Reject
            </button>
            <button
              type="submit"
              class="btn btn-success btn-fill float-right btn-md"
              @click.prevent="submit"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Review
            </button>
          </div>
        </div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward"/> &nbsp; Previous
        </button>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import * as examSessionManagementServices from '../../../app/module0/exam-booking/examSessionManagementServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import * as services06Module0 from '@/app/module0/services06'
import { ApprovalLevelConstants } from '@/app/constants/ApprovalLevelConstants'
import { debounce } from 'lodash'
import * as servicesModule0 from '../../../app/module0/services'
import moment from 'moment'

export default {
  mounted () {
    this.centreName = localStorage.getItem('CENTRE_NAME')
    this.dateGenerated = localStorage.getItem('DATE_GENERATED')
    this.getAllRecord()
    this.getActiveInactiveTaskStatus()
  },

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term
    }, 400),
    async cancelSession (id) {
      if (confirm('Are you sure you want to cancel the exam session?')) {
        const data = new FormData()
        data.append('ID', id)
        try {
          await examSessionManagementServices.cancelExamSession(data)
          await this.getAllRecord()
        } catch (e) {
          console.log(e)
        }
      }
    },
    isCSLExpired (CSL_DATE) {
      return moment(CSL_DATE).isBefore(moment())
    },
    async viewCSL (id, CSL_DATE) {
      if (this.isCSLExpired(CSL_DATE)) {
        localStorage.setItem('EXAM_SESSION_DETAILS_ID', id)
        this.$router.push({ name: 'candidate-session-list' })
      }
    },
    async viewExamSessionDetails (id) {
      localStorage.setItem('EXAM_SESSION_DETAILS_ID', id)
      this.$router.push({ name: 'view-exam-session-details' })
    },
    async editRecord (data) {
      localStorage.setItem('EDIT_EXAM_SESSION', JSON.stringify(data))
      this.$router.push({ name: 'edit-exam-session' })
    },
    returnSession: async function () {
      if (this.RecordCount === 0) {
        alert('Please add at least one exam session details.')
      } else {
        if (confirm('Are you sure you want to return the submission?')) {
          const data = new FormData()
          data.append('EXAM_SESSION_APPROVAL_ID', localStorage.getItem('EXAM_SESSION_APPROVAL_ID'))
          data.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)

          const user = localStorage.getItem('user')
          data.append('TS_ID', String(TaskStatusConstants.RETURNED))
          data.append('CREATE_BY', JSON.parse(user).user_id)
          data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

          // Send to approver
          const approverLevel = await services06Module0.getApprovalLevel(
            ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_USER_EXAM_SESSION_PROCESS_ID,
            ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
          )
          data.append('APPR_LIST', JSON.stringify(approverLevel))
          data.append('NOTI_LOCATION', 'exam-session-generation')
          data.append('NOTI_REMARK', '(EB) Exam Session Returned by PDS Reviewer.')

          try {
            await examSessionManagementServices.returnExamSession(data)
            this.$router.go(-1)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    reject: async function () {
      if (this.RecordCount === 0) {
        alert('Please add at least one exam session details.')
      } else {
        if (confirm('Are you sure you want to reject the submission?')) {
          const data = new FormData()
          data.append('EXAM_SESSION_APPROVAL_ID', localStorage.getItem('EXAM_SESSION_APPROVAL_ID'))
          data.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)

          const user = localStorage.getItem('user')
          data.append('TS_ID', String(TaskStatusConstants.REJECTED))
          data.append('CREATE_BY', JSON.parse(user).user_id)
          data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

          // Send to approver
          const approverLevel = await services06Module0.getApprovalLevel(
            ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_USER_EXAM_SESSION_PROCESS_ID,
            ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
          )
          data.append('APPR_LIST', JSON.stringify(approverLevel))
          data.append('NOTI_LOCATION', 'exam-session-generation')
          data.append('NOTI_REMARK', '(EB) Exam Session Rejected by PDS Reviewer.')

          try {
            await examSessionManagementServices.rejectExamSession(data)
            this.$router.go(-1)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    submit: async function () {
      if (this.RecordCount === 0) {
        alert('Please add at least one exam session details.')
      } else {
        if (confirm('Are you sure you want to review the submission?')) {
          const data = new FormData()
          data.append('EXAM_SESSION_APPROVAL_ID', localStorage.getItem('EXAM_SESSION_APPROVAL_ID'))
          data.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)

          const user = localStorage.getItem('user')
          data.append('TS_ID', String(TaskStatusConstants.REVIEWED))
          data.append('CREATE_BY', JSON.parse(user).user_id)
          data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

          // Send to approver
          const approverLevel = await services06Module0.getApprovalLevel(
            ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_APPROVER_EXAM_SESSION_PROCESS_ID,
            ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
          )
          data.append('APPR_LIST', JSON.stringify(approverLevel))
          data.append('NOTI_LOCATION', 'exam-session-generation-approver')
          data.append('NOTI_REMARK', '(EB) Exam Session Reviewed.')

          try {
            await examSessionManagementServices.reviewExamSession(data)
            this.$router.go(-1)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    create () {
      this.$router.push({ name: 'create-exam-session' })
    },
    back () {
      this.$router.go(-1)
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examSessionManagementServices.listExamSessionDetailsGenerated(
        {
          ID: localStorage.getItem('SESSION_ID'),
        })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async reset () {
      this.model.DAY = ''
      this.model.START_TIME = ''
      this.model.END_TIME = ''
      this.model.STATUS = ''
      this.model.APPROVAL_STATUS = ''
      this.getAllRecord()
    },
    async filterRecord () {
      this.statusLoad = true
      try {
        const response = await examSessionManagementServices.listExamSessionDetailsGenerated(
          {
            ID: localStorage.getItem('SESSION_ID'),
            FILTERS: this.model,
          })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
    },
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
          width: '30px',
        },
        {
          name: 'EXAM_NO',
          title: 'EXAM NO',
          sortField: 'EXAM_NO',
        },
        {
          name: 'CENTRE_MODE',
          title: 'CENTRE MODE',
          sortField: 'CENTRE_MODE',
        },
        {
          name: 'DATE_GENERATED',
          title: 'DATE',
          sortField: 'DATE_GENERATED',
        },
        {
          name: 'DAY',
          title: 'DAY',
          sortField: 'DAY',

        },
        {
          name: 'START_TIME',
          title: 'START TIME',
        },
        {
          name: 'END_TIME',
          title: 'END TIME',
        },
        {
          name: 'ECL_DATE',
          title: 'EXAM CLOSING',
          sortField: 'ECL_DATE',
        },
        {
          name: 'CSL_DATE',
          title: 'CSL DATE',
          sortField: 'CSL_DATE',
        },
        {
          name: '__slot:csl',
          title: 'CSL',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
          sortField: 'STATUS',
        },
        {
          name: 'APPROVAL_STATUS',
          title: 'APPROVAL STATUS',
          sortField: 'APPROVAL_STATUS',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
        },
      ]
    },
    filteredData () {
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
                  (item.CENTRE_MODE.toLowerCase().includes(v)) ||
                  (item.CENTRE_MODE.toUpperCase().includes(v)) ||
                  (item.DAY.toLowerCase() === v) || (item.DAY.toUpperCase() === v) ||
                  item.APPROVAL_STATUS.toLowerCase().includes(v) || item.APPROVAL_STATUS.toUpperCase().includes(v) ||
                  (item.STATUS.toLowerCase() === v) || (item.STATUS.toUpperCase() === v)
                )
              }
            },
          )
      })
    },
  },

  data () {
    return {
      isReviewedStatus: (localStorage.getItem('APPROVAL_STATUS') === TaskStatusConstants.PENDING_DISPLAY),
      statusLoad: true,
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      status: [],
      centreName: '',
      dateGenerated: '',
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      RecordList: [],

      model: {
        REMARKS_COMMENTS: '',
        STATUS: '',
        APPROVAL_STATUS: '',
        DAY: '',
        START_TIME: '',
        END_TIME: '',
      },
      remarkSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: false,
                rows: 8,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'REMARKS / COMMENTS',
                model: 'REMARKS_COMMENTS',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
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
                model: 'DAY',
                label: 'DAY',
                placeholder: 'Select Day',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.day
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'START_TIME',
                label: 'START TIME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'END_TIME',
                label: 'END TIME',
                styleClasses: 'col-md-6',
                required: false,
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

textarea {
  text-transform: uppercase;
}

</style>
