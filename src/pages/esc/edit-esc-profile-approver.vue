<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Company User Profile</h4>
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
              <td>: {{ESC_PROFILE.FULL_NAME}}</td>
            </tr>
            <tr>
              <td>CITIZENSHIP</td>
              <td> : {{ESC_PROFILE.CITIZENSHIP}} </td>
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
              <td> : {{ESC_PROFILE.PHONENO}} </td>
            </tr>
            <tr>
              <td>COMPANY NAME</td>
              <td> : {{ESC_PROFILE.COMPANY_NAME}} </td>
            </tr>
            <tr>
              <td colspan="12" style="padding-top: 26px;padding-bottom: 26px;">
                <vue-form-generator
                  :model="model"
                  :schema="roleAssignSchema"
                  :options="formOptions"
                  ref="roleAssignForm">
                </vue-form-generator>
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
        @click="reject"
        type="button"
        class="mr-2 btn btn-danger btn-fill btn-md"
      >
        <i class="fa fa-ban" /> &nbsp; Reject
      </button>
      <button
        type="submit"
        class="btn btn-success btn-fill float-right btn-md"
        @click.prevent="approve"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
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

  'mounted' () {
    this.ESC_PROFILE = JSON.parse(localStorage.getItem('edit-esc-profile-approver'))
    this.listCentreByCompanyId()
  },
  methods: {
    'back' () {
      this.$router.push({
        name: 'list-esc-profile-approver',
      })
    }, // back button
    'validateCompanyForm' () {
      return (this.$refs.verificationForm.validate() && this.$refs.roleAssignForm.validate())
    },
    'onModelUpdated' (newVal, schema) {
      console.log(`schema: ${schema}`, 'value:', newVal)
    },
    async 'listCentreByCompanyId' () {
      this.centres = await centreManagementServices.listAll({
        COMPANY_PROFILE_ID: this.ESC_PROFILE.COMPANY_ID,
      })
    },
    approve: async function () {
      if (this.model.centres === '') {
        alert('Please fill centre name')
        return
      }

      if (!this.model.roles.length) {
        alert('Please select atleast one role')
        return
      }
      const response = this.validateCompanyForm()
      if (response && confirm('Are you sure you want to approve this submission?')) {
        const data = new FormData()

        data.append('ESC_PROFILE_APPROVAL_ID', this.ESC_PROFILE.ESC_PROFILE_APPROVAL_ID)
        data.append('ESC_PROFILE_ID', this.ESC_PROFILE.ESC_PROFILE_ID)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        data.append('CENTRE_ID', this.model.centres.ID)
        data.append('ROLES', this.getRoles())

        console.log(this.getRoles())
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        try {
          await examCentreProviderManagementServices.approveEscProfile(data)
          // this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    reject: async function () {
      const response = this.$refs.verificationForm.validate()
      if (response && confirm('Are you sure you want to reject this submission?')) {
        const data = new FormData()

        data.append('ESC_PROFILE_APPROVAL_ID', this.ESC_PROFILE.ESC_PROFILE_APPROVAL_ID)
        data.append('ESC_PROFILE_ID', this.ESC_PROFILE.ESC_PROFILE_ID)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        try {
          await examCentreProviderManagementServices.rejectEscProfile(data)
          // this.back()
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
        REMARKS_COMMENTS: '',
        centres: '',
        roles: [],
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
                placeholder: 'ENTER REMARKS OR COMMENTS',
                styleClasses: 'col-md-12',
                validator: ['required'],
              },
            ],
          },
        ],
      },
      roleAssignSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'centres',
                label: 'CENTRE NAME',
                required: true,
                styleClasses: 'col-md-12 ',
                selectOptions: {
                  multiple: false,
                  key: 'ID',
                  label: 'CENTRE_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.centres
                },
              },

              // {
              //   type: 'vueMultiSelect',
              //   placeholder: 'Select Role',
              //   model: 'roles',
              //   label: 'Role',
              //   required: true,
              //   validator: 'required',
              //   styleClasses: 'col-md-12',
              //   selectOptions: {
              //     multiple: true,
              //     key: 'name',
              //     label: 'name',
              //     searchable: true,
              //     clearOnSelect: false,
              //     closeOnSelect: false,
              //     limit: 2, // limits the visible results to 2
              //   },
              //   values: (model, schema) => {
              //     return this.roles
              //   },
              // },
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
<style>
textarea {
  text-transform: uppercase;
}
</style>
