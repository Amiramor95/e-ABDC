<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Type Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">EXAM NAME</td>
              <td>: {{EXAM_TYPE_DETAILS.EXAM_NAME}}</td>
            </tr>
            <tr>
              <td>SHORT NAME</td>
              <td>: {{EXAM_TYPE_DETAILS.SHORT_NAME}}</td>
            </tr>
            <tr>
              <td >LICENSE TYPE</td>
              <td>: {{EXAM_TYPE_DETAILS.LICENSE_TYPE}}</td>
            </tr>
            <tr>
              <td>DESCRIPTION</td>
              <td>: {{EXAM_TYPE_DETAILS.DESCRIPTION.toUpperCase()}}</td>
            </tr>
            <tr>
              <td>START DATE </td>
              <td>: {{EXAM_TYPE_DETAILS.START_DATE}}</td>
            </tr>
            <tr>
              <td>END DATE </td>
              <td>: {{EXAM_TYPE_DETAILS.END_DATE}}</td>
            </tr>
            <tr>
              <td>DURATION (MINUTES)</td>
              <td>: {{EXAM_TYPE_DETAILS.DURATION}}</td>
            </tr>
            <tr>
              <td>EXAM CLOSING DAYS</td>
              <td> : {{EXAM_TYPE_DETAILS.EXAM_CLOSING_DAYS}}</td>
            </tr>
            <tr>
              <td>CANDIDATE SESSION LIST (CSL) DAYS</td>
              <td> : {{EXAM_TYPE_DETAILS.CSL_DAYS}}  </td>
            </tr>
            <tr>
              <td> GAP BETWEEN 3 PREFERRED DATES </td>
              <td> : {{EXAM_TYPE_DETAILS.GAP_BETWEEN_3_PREFERRED_DATES}} </td>
            </tr>
            <tr>
              <td>POST EXAM CHECKING(HOURS)</td>
              <td> : {{EXAM_TYPE_DETAILS.POST_EXAM_CHECKING_HOURS}} </td>
            </tr>
            <tr>
              <td>PASSING MARK (%)</td>
              <td> : {{EXAM_TYPE_DETAILS.PASSING_MARK}} </td>
            </tr>
            <tr>
              <td>STATUS</td>
              <td> : {{EXAM_TYPE_DETAILS.STATUS}} </td>
            </tr>
            <tr>
              <td>APPROVAL  STATUS</td>
              <td> : {{EXAM_TYPE_DETAILS.APPROVAL_STATUS}} </td>
            </tr>
            <tr>
              <td colspan="4">
                <vue-form-generator
                  :model="model"
                  :schema="reasonSchema"
                  :options="formOptions"
                  ref="reasonForm">
                </vue-form-generator>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Audit Log
        <button
          v-if="visibleLog == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleLog == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <b-collapse id="collapse-3" class="mt-2" v-model="visibleLog">
          <hr />
          <va-data-table
            :fields="caRecordFields"
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
            <template slot="remarks" slot-scope="props">
              {{ props.rowData.APPR_REMARK }}
            </template>
            <template slot="updates" slot-scope="props">
              {{ props.rowData.LATEST_UPDATE }}
            </template>
          </va-data-table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as examBookingServices from '../../../app/module0/examBookingServices'

export default {

  mounted () {
    const data = localStorage.getItem('view-exam-type-details')
    this.EXAM_TYPE_DETAILS = JSON.parse(data)
    console.log(this.EXAM_TYPE_DETAILS)
    this.model.reason = (this.EXAM_TYPE_DETAILS.APPROVAL_STATUS !== this.taskStatusConstants.PENDING_DISPLAY)
      ? this.EXAM_TYPE_DETAILS.REASON.toUpperCase() : ''
    this.getExamTypeHistoryLog()
  },
  components: {},
  methods: {
    back () {
      this.$router.go(-1)
    }, // back button
    getExamTypeHistoryLog: async function () {
      this.caRecordList = await examBookingServices.getAuditLogById({
        ID: this.EXAM_TYPE_DETAILS.ID,
      })
      this.caRecordCount = this.caRecordList.length
    },
  },
  computed: {
    caRecordFields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'CREATE_TIMESTAMP',
          title: 'Date',
          sortField: 'CREATE_TIMESTAMP',
        },
        {
          name: 'GROUP_NAME',
          title: 'Group',
          sortField: 'GROUP_NAME',
        },
        {
          name: 'USER_NAME',
          title: 'Creation By',
          sortField: 'USER_NAME',
        },
        {
          name: 'TS_PARAM',
          title: 'Activity',
          sortField: 'TS_PARAM',
        },

        {
          name: '__slot:remarks',
          title: 'Remarks/Comments',
          sortField: 'APPR_REMARK',
        },
        {
          name: '__slot:updates',
          title: 'Latest Update',
          sortField: 'LATEST_UPDATE',
        },
      ]
    },
    caRecordFilteredData () {
      return this.caRecordList
    },
  },
  data () {
    return {
      visibleLog: true,
      taskStatusConstants: TaskStatusConstants,
      header: '',
      reason: '',
      EXAM_TYPE_DETAILS: [],
      model: {
        reason: '',
      },
      caRecordList: [],
      count: 1,
      caRecordCount: null,
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      reasonSchema: {
        fields: [

          {
            type: 'textArea',
            model: 'reason',
            label: 'REMARKS/COMMENTS',
            rows: 5,
            validator: 'string',
            styleClasses: 'col-md-12',
            disabled: true,
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
