<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Company Profile</h4>
      <br />
      <br />
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
              <td>:  {{COMPANY_PROFILE.COMPANY_ADDR_1}}<br>&nbsp;&nbsp;{{COMPANY_PROFILE.COMPANY_ADDR_2}}<br>&nbsp;&nbsp;{{COMPANY_PROFILE.COMPANY_ADDR_3}}</td>
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
              <td> : {{COMPANY_PROFILE.COMPANY_OWNER_PHONE_NO}} </td>
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
          v-if="visibleLog === true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleLog === false"
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
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'
import * as examBookingServices from '../../../app/module0/examBookingServices'

export default {

  mounted () {
    const id = localStorage.getItem('view-company-profile-id')
    this.getCompanyProfileDetails(id)
    this.getCompanyProfileLog(id)
  },
  components: {},
  methods: {
    back () {
      this.$router.go(-1)
    }, // back button
    async getCompanyProfileDetails (id) {
      this.COMPANY_PROFILE = await companyManagementServices.viewCompanyProfile({
        COMPANY_PROFILE_ID: id,
      })
      this.model.reason = (this.COMPANY_PROFILE.APPROVAL_STATUS !== this.taskStatusConstants.PENDING_DISPLAY)
        ? this.COMPANY_PROFILE.REASON.toUpperCase() : ''
    },
    getCompanyProfileLog: async function (id) {
      this.caRecordList = await companyManagementServices.getAuditLogByCompanyProfileId({
        COMPANY_PROFILE_ID: id,
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
      visibleLog: false,
      taskStatusConstants: TaskStatusConstants,
      header: '',
      reason: '',
      COMPANY_PROFILE: [],
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
