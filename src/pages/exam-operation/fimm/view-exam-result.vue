<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Result Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">EXAM SESSION NO</td>
              <td>: {{RESULT_DETAILS.EXAM_NO}}</td>
            </tr>
            <tr>
              <td>CENTRE NAME</td>
              <td>: {{RESULT_DETAILS.EXAM_CENTRE_NAME}}</td>
            </tr>
            <!--            <tr>-->
            <!--              <td>EXAM TYPE</td>-->
            <!--              <td>: {{RESULT_DETAILS.EXAM_TYPE}}</td>-->
            <!--            </tr>-->
            <tr>
              <td>DATE</td>
              <td>: {{RESULT_DETAILS.DATE}}</td>
            </tr>
            <tr>
              <td>DAY</td>
              <td>: {{RESULT_DETAILS.DAY.toUpperCase()}}</td>
            </tr>
            <tr>
              <td>START TIME </td>
              <td>: {{RESULT_DETAILS.START_TIME}}</td>
            </tr>
            <tr>
              <td>END TIME </td>
              <td>: {{RESULT_DETAILS.END_TIME}}</td>
            </tr>
            <tr>
              <td>STATUS</td>
              <td>: {{RESULT_DETAILS.STATUS}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="RecordCount"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
      </va-data-table>
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
import * as resultManagementServices from '../../../app/module0/exam-booking/resultManagementServices'

export default {

  mounted () {
    const data = localStorage.getItem('view-exam-result')
    this.RESULT_DETAILS = JSON.parse(data)
    this.getAllRecord()
  },
  components: {},
  methods: {
    back () {
      this.$router.go(-1)
    },
    // getAllRecord
    getAllRecord: async function () {
      const response = await resultManagementServices.getExamResultForApproval({
        SESSION_DETAILS_ID: this.RESULT_DETAILS.EXAM_SESSION_DETAILS_ID,
      })
      this.RecordList = response
      this.RecordCount = this.RecordList.length
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
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      header: '',
      RESULT_DETAILS: [],
      model: {
      },
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
