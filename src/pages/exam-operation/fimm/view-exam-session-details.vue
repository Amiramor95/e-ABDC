<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Session Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <!--            <tr>-->
            <!--              <td style="width: 15%">EXAM NAME</td>-->
            <!--              <td>: &nbsp;&nbsp;{{details.EXAM_NAME}}</td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--              <td>SHORT NAME</td>-->
            <!--              <td>: &nbsp;&nbsp;{{details.SHORT_NAME}}</td>-->
            <!--            </tr>-->
            <tr>
              <td style="width: 15%">SESSION DATE</td>
              <td>: &nbsp;&nbsp;{{details.DATE}}</td>
            </tr>
            <tr>
              <td>TIME</td>
              <td>: &nbsp;&nbsp;{{details.TIME}}</td>
            </tr>
            <tr>
              <td>SESSION STATUS</td>
              <td> : &nbsp;&nbsp;{{details.SESSION_STATUS == 22 ? 'ACTIVE' : 'INACTIVE'}} </td>
            </tr>
            <tr>
              <td>EXAM WAIVER STATUS</td>
              <td> : &nbsp;&nbsp;{{details.EXAM_WAIVER_STATUS == 1 ? 'YES' : 'NO'}} </td>
            </tr>
            <tr>
              <td>LOCK STATUS</td>
              <td> : &nbsp;&nbsp;{{details.LOCK_STATUS == 0 ? 'LOCK':'UNLOCK'}} </td>
            </tr>
            <tr>
              <td>EXAM NO</td>
              <td> : &nbsp;&nbsp;{{details.EXAM_NO}} </td>
            </tr>
            <tr>
              <td>CSL DATE</td>
              <td> : &nbsp;&nbsp;{{details.CSL_DATE}} </td>
            </tr>
            <tr>
              <td>ECL DATE</td>
              <td> : &nbsp;&nbsp;{{details.ECL_DATE}} </td>
            </tr>
            <tr>
              <td>MS TEAMS LINK</td>
              <td> : &nbsp;&nbsp;{{details.MS_TEAMS_LINK}} </td>
            </tr>
            <tr>
              <td>APPROVAL  STATUS</td>
              <td> : &nbsp;&nbsp;{{details.APPROVAL_STATUS}} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
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
import * as examSessionManagementServices from '@/app/module0/exam-booking/examSessionManagementServices'

export default {

  mounted () {
    const id = localStorage.getItem('EXAM_SESSION_DETAILS_ID')
    this.getExamSessionDetails(id)
  },
  components: {},
  methods: {
    back () {
      this.$router.go(-1)
    }, // back button
    getExamSessionDetails: async function (id) {
      this.details = await examSessionManagementServices.getExamSessionDetailsForView(
        {
          SESSION_DETAILS_ID: id,
        },
      )
    },
  },
  data () {
    return {
      taskStatusConstants: TaskStatusConstants,
      header: '',
      details: '',
    }
  },
}
</script>
