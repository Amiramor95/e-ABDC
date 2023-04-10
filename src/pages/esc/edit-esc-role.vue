<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Edit Company Role</h4>
      <br/>
      <br/>
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
              <td>COMPANY NAME</td>
              <td> : {{ESC_PROFILE.COMPANY_NAME}} </td>
            </tr>
            <tr>
              <td colspan="12" style="padding-top: 26px;padding-bottom: 26px;">
                <div class="form-group valid required col-md-12 mt-3">
                  <label for="roles"><span>ROLES</span></label>
                  <multiselect
                    v-model="model.roles"
                    :options="roles"
                    track-by="value"
                    label="name"
                    placeholder="Select Role"
                    :multiple="true"
                    :taggable="true"
                  >
                  </multiselect>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br/>
    </va-card>
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
        type="submit"
        class="btn btn-success btn-fill float-right btn-md"
        @click.prevent="approve"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Save
      </button>
    </div>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examCentreProviderManagementServices
from '../../app/exam-centre-provider/services/examCentreProviderManagementServices'
import * as centreManagementServices from '../../app/module0/exam-booking/centreManagementServices'

export default {

  mounted () {
    this.ESC_PROFILE = JSON.parse(localStorage.getItem('edit-esc-role'))
    this.loadRoles(this.ESC_PROFILE.ROLE)
  },
  methods: {
    loadRoles (role) {
      role.split(',').forEach((el) => {
        console.log(el)
        if (el.trim() === 'EXAM CENTRE ADMIN') {
          this.model.roles.push(this.roles[0])
        } else if (el.trim() === 'ESC') {
          console.log('push', el)
          this.model.roles.push(this.roles[1])
        }
      })
    },
    back () {
      this.$router.push({
        name: 'list-esc-company-user-view-company-admin',
      })
    }, // back button
    validateCompanyForm () {
      return (this.$refs.verificationForm.validate() && this.$refs.roleAssignForm.validate())
    },
    onModelUpdated (newVal, schema) {
      console.log(`schema: ${schema}`, 'value:', newVal)
    },
    approve: async function () {
      if (!this.model.roles.length) {
        alert('Please select atleast one role')
        return
      }
      if (confirm('Are you sure you want to save this submission?')) {
        const data = new FormData()
        data.append('ESC_USER_ID', this.ESC_PROFILE.ESC_USER_ID)
        data.append('ROLES', this.getRoles())
        try {
          await examCentreProviderManagementServices.saveEscRoles(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    'getRoles' () {
      return this.model.roles.map((obj) => {
        return obj.value
      })
    },
  },

  'data' () {
    return {
      ESC_PROFILE: '',
      centres: [],
      roles: [
        {
          name: 'Exam Centre Admin',
          value: 'exam_centre_admin',
        },
        {
          name: 'ESC',
          value: 'esc',
        },
      ],
      header: '',
      model: {
        roles: [],
      },
      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
