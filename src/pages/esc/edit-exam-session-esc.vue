<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Edit Exam Session</h4>
      <br />
      <br />
    </div>
    <va-card>
      <div class="ml-3 col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">Exam No</td>
              <td>:&nbsp;&nbsp;&nbsp; {{sessionDetails.EXAM_NO}}</td>
            </tr>
            <tr>
              <td>Centre Name</td>
              <td>:&nbsp;&nbsp;&nbsp;{{sessionDetails.CENTRE_NAME}}</td>
            </tr>
            <tr>
              <td>Centre Mode</td>
              <td>:&nbsp;&nbsp;&nbsp;{{sessionDetails.CENTRE_MODE === 2 ? 'Physical' : 'Virtual'}}</td>
            </tr>
            <tr>
              <td>Operational Capacity</td>
              <td>:&nbsp;&nbsp;&nbsp;{{sessionDetails.OPERATIONAL_CAPACITY}}</td>
            </tr>
            <tr>
              <td>Maximum Capacity</td>
              <td>:&nbsp;&nbsp;&nbsp;{{ sessionDetails.MAXIMUM_CAPACITY }}</td>
            </tr>
            <tr>
              <td>Total Booked</td>
              <td>:&nbsp;&nbsp;&nbsp;{{sessionDetails.TOTAL_BOOKED}}</td>
            </tr>
            <tr>
              <td>CSL Date</td>
              <td>:&nbsp;&nbsp;&nbsp;{{editDetails.CSL_DATE}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-3 mt-4">
        <vue-form-generator
          :model="model"
          :schema="editSessionSchema"
          :options="formOptions"
          ref="editSessionForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="ml-1 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-paper-plane"/> &nbsp; Save Link
      </button>
    </div>
  </va-card>
</template>

<script>
import * as examSessionManagementServices from '@/app/module0/exam-booking/examSessionManagementServices'
import * as servicesModule0 from '@/app/module0/services'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'

export default {
  mounted () {
    this.editDetails = JSON.parse(localStorage.getItem('EDIT_EXAM_SESSION_ESC'))
    this.getSessionDetailsForEdit(this.editDetails.SESSION_DETAILS_ID)
    this.getActiveInactiveTaskStatus()
  },

  methods: {
    async getActiveInactiveTaskStatus () {
      this.sessionStatus = await servicesModule0.getActiveInactiveTaskStatus()
      this.model.sessionStatus = this.sessionStatus.find(x => x.TS_ID === this.sessionDetails.SESSION_STATUS)
    },
    async getSessionDetailsForEdit (sessionDetailId) {
      this.sessionDetails = await examSessionManagementServices.getExamSessionDetailsForEdit(
        { ID: sessionDetailId })
      this.loadData()
    },
    loadData () {
      this.model.LINK = this.sessionDetails.LINK
      // this.model.examWaiverStatus = this.sessionDetails.EXAM_WAIVER_STATUS
      // this.model.lockStatus = this.lockStatus.find(x => x.value === this.sessionDetails.LOCK_STATUS)
    },
    back () {
      this.$router.go(-1)
    }, // back button
    validateForm () {
      return this.$refs.editSessionForm.validate()
    },
    validateLink (value) {
      if (value) {
        const Reg = /^(https?):\/\/[^\s$.?#].[^\s]*$/
        if (!value.match(Reg)) {
          return 'Link format invalid.'
        }
      }
    },
    saveAsDraft: async function () {
      if (confirm('Are you sure you want to draft this session?')) {
        const data = new FormData()
        data.append('SESSION_STATUS', this.model.sessionStatus.TS_ID)
        data.append('EXAM_WAIVER_STATUS', this.model.examWaiverStatus)
        data.append('LOCK_STATUS', this.model.lockStatus.value)
        data.append('LINK', this.model.LINK ?? '')
        data.append('ID', this.editDetails.SESSION_DETAILS_ID)
        data.append('PUBLISH_STATUS', String(TaskStatusConstants.PUBLISH_STATUS_DRAFT))
        data.append('TS_ID', String(TaskStatusConstants.DRAFT_GENERAL))

        const user = localStorage.getItem('user')
        data.append('LATEST_UPDATE_BY', JSON.parse(user).user_id)

        try {
          await examSessionManagementServices.saveAsDraftExamSessionDetail(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    submit: async function () {
      const response = await this.validateForm()
      if (response) {
        if (confirm('Are you sure you want to edit this session?')) {
          const data = new FormData()
          data.append('LINK', this.model.LINK ?? '')
          data.append('ID', this.editDetails.SESSION_DETAILS_ID)
          data.append('PUBLISH_STATUS', String(TaskStatusConstants.PUBLISH_STATUS_SUBMITTED))
          const user = localStorage.getItem('user')
          data.append('LATEST_UPDATE_BY', JSON.parse(user).user_id)

          try {
            await examSessionManagementServices.saveSingleLink(data)
            this.back()
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    onModelUpdated (newVal, schema) {
    },
    // Validation
  },

  computed: {},

  data () {
    return {
      editDetails: '',
      sessionDetails: '',
      sessionStatus: [],
      model: {
        sessionStatus: '',
        LINK: '',
      },

      editSessionSchema: {
        fields: [
          {
            type: 'vueMultiSelect',
            model: 'sessionStatus',
            label: 'SESSION STATUS',
            placeholder: 'SELECT SESSION STATUS',
            selectOptions: {
              multiple: false,
              key: 'TS_ID',
              label: 'TS_PARAM',
              searchable: true,
            },
            values: (model, schema) => {
              return this.sessionStatus
            },
            styleClasses: 'col-md-12',
            disabled: true,
          },

          {
            type: 'input',
            inputType: 'text',
            label: 'INVILIGATION LINK (URL)',
            model: 'LINK',
            required: false,
            validator: ['string', this.validateLink],
            styleClasses: 'col-md-12',
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

#ms-teams-link-url{
  text-transform: none;
}
#ms-teams-link-url::placeholder{
  text-transform: uppercase;
}
</style>
