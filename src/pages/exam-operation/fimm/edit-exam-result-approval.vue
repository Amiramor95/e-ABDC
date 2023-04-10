<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Result For Approval</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">EXAM SESSION NO</td>
              <td>: {{RESULT_DETAILS.EXAM_NO}}</td>
            </tr>
            <tr>
              <td>CENTRE NAME</td>
              <td>: {{examResult.EXAM_CENTRE_NAME}}</td>
            </tr>
            <tr>
              <td>SESSION DATE</td>
              <td>:{{examResult.DATE}}</td>
            </tr>
            <tr>
              <td>TIME</td>
              <td>:{{examResult.START_TIME}} - {{examResult.END_TIME}}</td>
            </tr>
            <br/>
            <br/>
            <tr>
              <td>CANDIDATE NAME</td>
              <td>: {{RESULT_DETAILS.CANDIDATE_NAME}}</td>
            </tr>
            <tr>
              <td>NRIC NO.</td>
              <td>: {{RESULT_DETAILS.NRIC_NO}}</td>
            </tr>
            <tr>
              <td>EXAM NO.</td>
              <td>: {{RESULT_DETAILS.CSL_EXAM_NO}}</td>
            </tr>
            <tr>
              <td>ATTENDANCE</td>
              <td>: {{RESULT_DETAILS.ATTENDANCE}}</td>
            </tr>
            <tr>
              <td>RESULT</td>
              <td>: {{RESULT_DETAILS.RESULT}}</td>
            </tr>
            <tr>
              <td>SCORE</td>
              <td>: {{RESULT_DETAILS.SCORE}}</td>
            </tr>
            <tr>
              <td>FINAL RESULT</td>
              <td>
                <select style="width:90px"
                  class="form-control"
                  v-model="finalResult"
                  required>
                  <option disabled selected value=""></option>
                  <option value="1">PASS</option>
                  <option value="0">FAIL</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <div>
      <vue-form-generator
        :model="model"
        :schema="remarkSchema"
        :options="formOptions"
        ref="verificationForm"
      >
      </vue-form-generator>
    </div>
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        style="background-color:#1dc3f5"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="submit"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane"/> &nbsp; Approve
      </button>
    </div>
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as resultManagementServices from '../../../app/module0/exam-booking/resultManagementServices'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'

export default {

  mounted () {
    const data = localStorage.getItem('edit-exam-result-approval')
    this.RESULT_DETAILS = JSON.parse(data)
    this.finalResult = this.RESULT_DETAILS.FINAL_RESULT === 'PASS' ? '1' : '0'
    this.examResult = JSON.parse(localStorage.getItem('edit-exam-result'))
    this.model.REMARKS_COMMENTS = this.RESULT_DETAILS.REMARKS
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    saveAsDraft: async function () {
      if (this.$refs.verificationForm.validate() && confirm('Are you sure you want to draft this submission?')) {
        const data = new FormData()
        data.append('NEW_DATA', JSON.stringify(
          [{ csl_id: this.RESULT_DETAILS.CSL_ID, remarks: this.model.REMARKS_COMMENTS, result: this.finalResult }],
        ))
        // data.append('ID', this.examResult.EXAM_RESULT_ID)
        // data.append('APPR_PUBLISH_STATUS', String(TaskStatusConstants.PUBLISH_STATUS_DRAFT))
        // data.append('TS_ID', String(TaskStatusConstants.DRAFT_GENERAL))
        //
        // const user = localStorage.getItem('user')
        // data.append('LATEST_UPDATE_BY', JSON.parse(user).user_id)

        try {
          await resultManagementServices.saveAsDraftExamResult(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    submit: async function () {
      if (this.$refs.verificationForm.validate() && confirm('Are you sure you want to proceed this submission?')) {
        const data = new FormData()
        data.append('NEW_DATA', JSON.stringify(
          [{ csl_id: this.RESULT_DETAILS.CSL_ID, remarks: this.model.REMARKS_COMMENTS, result: this.finalResult }],
        ))
        try {
          await resultManagementServices.approveExamResult(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
  computed: {
    RecordFields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        { // DIST_TRANS_DATE
          name: 'CANDIDATE_NAME',
          title: 'CANDIDATE NAME',
        },
        {
          name: 'NRIC_NO',
          title: 'NRIC NO.',
        },
        {
          name: 'PASSPORT_NO',
          title: 'PASSPORT NO.',
        },
        {
          name: 'EXAM_NO',
          title: 'EXAM NO',
        },
        {
          name: 'ATTENDANCE',
          title: 'ATTENDANCE',
        },
        {
          name: 'RESULT',
          title: 'RESULT',
        },
        {
          name: 'SCORE',
          title: 'SCORE',
        },
        {
          name: 'FINAL_RESULT',
          title: 'FINAL RESULT',
        },
        {
          name: 'REMARKS',
          title: 'REMARKS',
        },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData () {
      return this.RecordList
    },
  },

  data () {
    return {
      examResult: '',
      RESULT_DETAILS: [],
      finalResult: '0',
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
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
                visible: (model, field, form) => {
                  return (this.finalResult === '1' ? 'PASS' : 'FAIL') !== this.RESULT_DETAILS.FINAL_RESULT
                },
                validator: ['required'],
              },
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
                visible: (model, field, form) => {
                  return (this.finalResult === '1' ? 'PASS' : 'FAIL') === this.RESULT_DETAILS.FINAL_RESULT
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
