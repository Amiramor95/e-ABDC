<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Company Profile</h4>
      <br/>
      <br/>
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">COMPANY NAME</td>
              <td>: {{COMPANY_PROFILE.COMPANY_NAME}}</td>
            </tr>
            <tr>
              <td>COMPANY REGISTRATION NO</td>
              <td>: {{COMPANY_PROFILE.COMPANY_REGISTRATION_NO}}</td>
            </tr>
            <tr>
              <td>NEW COMPANY REGISTRATION NO</td>
              <td>: {{COMPANY_PROFILE.NEW_COMPANY_REGISTRATION_NO}}</td>
            </tr>
            <tr>
              <td>COMPANY ADDRESS</td>
              <td>:  {{COMPANY_PROFILE.COMPANY_ADDR_1}}<br>{{COMPANY_PROFILE.COMPANY_ADDR_2}}<br>{{COMPANY_PROFILE.COMPANY_ADDR_3}}</td>
            </tr>
            <tr>
              <td>COUNTRY</td>
              <td>: {{COMPANY_PROFILE.COUNTRY_NAME}}</td>
            </tr>
            <tr>
              <td>STATE</td>
              <td>: {{COMPANY_PROFILE.STATE_NAME}}</td>
            </tr>
            <tr>
              <td>CITY</td>
              <td>: {{COMPANY_PROFILE.CITY_NAME}}</td>
            </tr>
            <tr>
              <td>POSTCODE</td>
              <td> : {{COMPANY_PROFILE.POSTAL_NAME}}</td>
            </tr>
            <tr>
              <td><b>Company Representative</b></td>
              <td></td>
            </tr>
            <tr>
              <td>NAME</td>
              <td> : {{COMPANY_PROFILE.COMPANY_OWNER_NAME}} </td>
            </tr>
            <tr>
              <td>PHONE NUMBER</td>
              <td> : {{COMPANY_PROFILE.COMPANY_OWNER_PHONE_NO}}} </td>
            </tr>
            <tr>
              <td>POSITION</td>
              <td> : {{COMPANY_PROFILE.COMPANY_OWNER_POSITION}} </td>
            </tr>
            <tr>
              <td>EMAIL ADDRESS</td>
              <td> : {{COMPANY_PROFILE.COMPANY_OWNER_EMAIL}} </td>
            </tr>
            <tr>
              <td><b>Company Admin</b></td>
              <td></td>
            </tr>
            <tr>
              <td>NAME</b></td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_NAME}} </td>
            </tr>
            <tr>
              <td>CITIZENSHIP</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_CITIZENSHIP}} </td>
            </tr>
            <tr v-if="COMPANY_PROFILE.COMPANY_ADMIN_CITIZENSHIP === 'MALAYSIAN'">
              <td>NRIC NO</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_NRIC}} </td>
            </tr>
            <tr v-if="COMPANY_PROFILE.COMPANY_ADMIN_CITIZENSHIP === 'NON_MALAYSIAN'">
              <td>PASSPORT NO</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_PASSPORT_NO}} </td>
            </tr>
            <tr v-if="COMPANY_PROFILE.COMPANY_ADMIN_CITIZENSHIP === 'NON_MALAYSIAN'">
              <td>PASSPORT EXPIRY DATE</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_PASSPORT_EXPIRY_NO}} </td>
            </tr>
            <tr>
              <td>EMAIL</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_EMAIL}} </td>
            </tr>
            <tr>
              <td>PHONE NO</td>
              <td> : {{COMPANY_PROFILE.COMPANY_ADMIN_PHONENO}} </td>
            </tr>
            <tr>
              <td>COMPANY STATUS</td>
              <td> : {{COMPANY_PROFILE.COMPANY_STATUS}} </td>
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
        @click.prevent="approve"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
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
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'

export default {

  mounted () {
    const data = JSON.parse(localStorage.getItem('approve-company-profile'))
    this.companyProfileId = data.COMPANY_PROFILE_ID
    this.companyProfileApprovalId = data.COMPANY_PROFILE_APPROVAL_ID
    this.getCompanyProfileDetails()
  },
  components: {},

  methods: {
    back () {
      this.$router.push({
        name: 'list-company-approver',
      })
    }, // back button
    async getCompanyProfileDetails () {
      this.COMPANY_PROFILE = await companyManagementServices.viewCompanyProfile({
        COMPANY_PROFILE_ID: this.companyProfileId,
      })
    },
    validateCompanyForm () {
      return this.$refs.verificationForm.validate()
    },
    approve: async function () {
      const response = this.validateCompanyForm()
      if (response && confirm('Are you sure you want to approve this submission?')) {
        const data = new FormData()

        data.append('COMPANY_PROFILE_APPROVAL_ID', this.companyProfileApprovalId)
        data.append('COMPANY_PROFILE_ID', this.companyProfileId)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        try {
          await companyManagementServices.approveCompanyProfile(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    reject: async function () {
      const response = this.validateCompanyForm()
      if (response && confirm('Are you sure you want to reject this submission?')) {
        const data = new FormData()
        data.append('COMPANY_PROFILE_APPROVAL_ID', this.companyProfileApprovalId)
        data.append('COMPANY_PROFILE_ID', this.companyProfileId)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        data.append('REJECT_BY', 'PDS-APPROVER')

        try {
          await companyManagementServices.rejectCompanyProfile(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    returned: async function () {
      const response = this.validateCompanyForm()
      if (response && confirm('Are you sure you want to return this submission?')) {
        const data = new FormData()
        data.append('COMPANY_PROFILE_APPROVAL_ID', this.companyProfileApprovalId)
        data.append('COMPANY_PROFILE_ID', this.companyProfileId)
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        data.append('REJECT_BY', 'PDS-APPROVER')

        try {
          await companyManagementServices.returnCompanyProfile(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },

  data () {
    return {
      COMPANY_PROFILE: '',
      companyProfileId: '',
      companyProfileApprovalId: '',
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
                placeholder: 'ENTER REMARKS OR COMMENTS',
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
<style>
textarea {
  text-transform: uppercase;
}
</style>
