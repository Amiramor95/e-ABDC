<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Type Details</h4>
      <br/>
      <br/>
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">
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
          </tbody>
        </table>
      </div>
      <br/>
    </va-card>
    <br/>
    <br/>
    <div>
      <h6 class="col-md-12 mb-4">Approval</h6>
      <vue-form-generator
        :model="model"
        :schema="remarkSchema"
        :options="formOptions"
        ref="verificationForm"
      >
      </vue-form-generator>
    </div>
    <br/>
    <br/>
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward"/> &nbsp; Previous
    </button>
    <div class="float-right">

      <button
        @click="returned"
        type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
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
        @click.prevent="review"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Review
      </button>
    </div>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services06Module0 from '../../../app/module0/services06'
import { ApprovalLevelConstants } from '../../../app/constants/ApprovalLevelConstants'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as examBookingServices from '../../../app/module0/examBookingServices'

export default {

  mounted () {
    const data = localStorage.getItem('edit-exam-type-details-reviewer')
    this.EXAM_TYPE_DETAILS = JSON.parse(data)
  },
  components: {},

  methods: {
    back () {
      this.$router.push({
        name: 'list-exam-type-details-reviewer',
      })
    }, // back button
    review: async function () {
      if (confirm('Are you sure you want to proceed this submission?')) {
        const data = new FormData()

        data.append('EXAM_TYPE_DETAILS_APPROVAL_ID', this.EXAM_TYPE_DETAILS.EXAM_TYPE_DETAILS_APPROVAL_ID)
        data.append('ID', this.EXAM_TYPE_DETAILS.ID)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)
        data.append('APPR_PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)
        data.append('TS_ID', TaskStatusConstants.REVIEWED)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        // Send to approver
        const approverLevel = await services06Module0.getApprovalLevel(
          ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_APPROVER_PROCESS_ID,
          ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
        )
        data.append('APPR_LIST', JSON.stringify(approverLevel))
        data.append('NOTI_LOCATION', 'list-exam-type-details-approver')
        data.append('NOTI_REMARK', '(EB) New Exam type detail pending for approval.')

        try {
          await examBookingServices.reviewExamTypeDetails(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    reject: async function () {
      if (confirm('Are you sure you want to reject this submission?')) {
        const data = new FormData()
        data.append('EXAM_TYPE_DETAILS_APPROVAL_ID', this.EXAM_TYPE_DETAILS.EXAM_TYPE_DETAILS_APPROVAL_ID)
        data.append('ID', this.EXAM_TYPE_DETAILS.ID)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)
        data.append('APPR_PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)
        data.append('TS_ID', TaskStatusConstants.REJECTED)
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        // dashboard notification to submitter/PDS user
        const approvalLevel = await services06Module0.getApprovalLevel(
          ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_USER_PROCESS_ID,
          ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
        )
        data.append('APPR_LIST', JSON.stringify(approvalLevel))
        data.append('NOTI_LOCATION', 'list-exam-type-details')
        data.append('NOTI_REMARK', '(EB) This Entry has been rejected by Reviewer')

        try {
          await examBookingServices.rejectExamTypeDetails(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },

    returned: async function () {
      if (confirm('Are you sure you want to return this submission?')) {
        const data = new FormData()
        data.append('EXAM_TYPE_DETAILS_APPROVAL_ID', this.EXAM_TYPE_DETAILS.EXAM_TYPE_DETAILS_APPROVAL_ID)
        data.append('ID', this.EXAM_TYPE_DETAILS.ID)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)
        data.append('APPR_PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)
        data.append('TS_ID', TaskStatusConstants.RETURNED)
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        // dashboard notification to submitter/PDS user
        const approvalLevel = await services06Module0.getApprovalLevel(
          ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_USER_PROCESS_ID,
          ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
        )
        data.append('APPR_LIST', JSON.stringify(approvalLevel))
        data.append('NOTI_LOCATION', 'list-exam-type-details')
        data.append('NOTI_REMARK', '(EB) This Entry has been returned by Reviewer')
        try {
          await examBookingServices.returnExamTypeDetails(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },

  data () {
    return {
      EXAM_TYPE_DETAILS: [],
      header: '',
      model: {
        REMARKS_COMMENTS: '',
      },
      remarkSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 8,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'REMARKS / COMMENTS',
                model: 'REMARKS_COMMENTS',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
                validator: ['required'],
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
