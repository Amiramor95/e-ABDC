<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Company User Profile</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">FULL NAME</td>
              <td>: {{ESC_PROFILE.EXAM_SITE_COORDINATOR_NAME}}</td>
            </tr>
            <tr>
              <td>CITIZENSHIP</td>
              <td> : {{ESC_PROFILE.CITIZENSHIP === 286 ?'MALAYSIAN':'NON-MALAYSIAN'}} </td>
            </tr>
            <tr v-if="ESC_PROFILE.CITIZENSHIP === 286">
              <td>NRIC NO</td>
              <td> : {{ESC_PROFILE.NRIC}} </td>
            </tr>
            <tr v-if="ESC_PROFILE.CITIZENSHIP === 287">
              <td>PASSPORT NO</td>
              <td> : {{ESC_PROFILE.PASSPORT_NO}} </td>
            </tr>
            <tr v-if="ESC_PROFILE.CITIZENSHIP === 287">
              <td>PASSPORT EXPIRY DATE</td>
              <td> : {{ESC_PROFILE.PASSPORT_EXPIRY_NO}} </td>
            </tr>
            <tr>
              <td>EMAIL</td>
              <td> : {{ESC_PROFILE.EMAIL}} </td>
            </tr>
            <tr>
              <td>PHONE NO</td>
              <td> : {{ESC_PROFILE.PHONE_NUMBER}} </td>
            </tr>
            <tr>
              <td>ROLES</td>
              <td> : {{ESC_PROFILE.ROLE}} </td>
            </tr>
            <tr>
              <td>COMPANY NAME</td>
              <td> : {{ESC_PROFILE.COMPANY_NAME}} </td>
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
import { TaskStatusConstants } from '../../app/constants/TaskStatusConstants'
import * as centreManagementServices from '../../app/module0/exam-booking/centreManagementServices'

export default {

  mounted () {
    this.ESC_PROFILE = JSON.parse(localStorage.getItem('view-esc-user-details'))
  },
  methods: {
    back () {
      this.$router.go(-1)
    }, // back button
  },
  data () {
    return {
      visibleLog: false,
      taskStatusConstants: TaskStatusConstants,
      header: '',
      reason: '',
      ESC_PROFILE: [],
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
