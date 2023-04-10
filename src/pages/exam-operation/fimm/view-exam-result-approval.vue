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
              <td>: {{RESULT_DETAILS.FINAL_RESULT}}</td>
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
    <br />
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'

export default {

  mounted () {
    const data = localStorage.getItem('edit-exam-result-approval')
    this.RESULT_DETAILS = JSON.parse(data)
    this.examResult = JSON.parse(localStorage.getItem('edit-exam-result'))
    this.model.REMARKS_COMMENTS = this.RESULT_DETAILS.REMARKS
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
  },
  computed: {
  },

  data () {
    return {
      examResult: '',
      RESULT_DETAILS: [],
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
                readonly: true,
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
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
