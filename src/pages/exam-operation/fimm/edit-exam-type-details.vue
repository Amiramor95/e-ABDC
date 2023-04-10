<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Edit Exam Type Details
    </h4>
    <br/>
    <vue-form-generator
      :model="model"
      :schema="schema"
      :options="formOptions"
      ref="regForm"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <br/>
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane"/> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import * as servicesModule0 from '../../../app/module0/services'
import * as services02Module0 from '../../../app/module0/services02'
import * as examBookingServices from '../../../app/module0/examBookingServices'
import moment from 'moment'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as services06Module0 from '../../../app/module0/services06'
import { ApprovalLevelConstants } from '../../../app/constants/ApprovalLevelConstants'

Vue.use(VueFormGenerator)
export default {
  mounted () {
    var data = localStorage.getItem('edit-exam-type-details')
    this.editData = JSON.parse(data)
    this.loadData(this.editData)

    this.getAllExamType()
    this.getActiveInactiveTaskStatus()

    // hiding unnecessary space
    const widths = document.querySelectorAll('div.width label')
    widths.forEach((width) => width.style.display = 'none')
  },
  data () {
    return {
      editData: [],
      timestamp: '',
      licenseType: [],
      examName: [],
      shortName: [],
      status: [],
      model: {
        licenseType: '',
        status: '',
        examName: '',
        shortName: '',
        description: '',
        startDate: null,
        endDate: null,
        duration: '',
        examClosingDays: '',
        candidateSelectionListDays: '',
        gapBetween3preferredDates: '',
        postExamCheckingHours: '',
        passingMarks: '',
      },
      formOptions: {
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'examName',
                label: 'EXAM NAME',
                placeholder: 'Select Exam Name',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'CONSULTANT_EXAM_TYPE_ID',
                  label: 'EXAM_TYPE_DESC',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.examName
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'SHORT NAME',
                model: 'shortName',
                required: false,
                validator: 'string',
                disabled: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                model: 'licenseType',
                label: 'LICENSE TYPE',
                placeholder: 'Select License Type',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'TYPE_NAME',
                  label: 'TYPE_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.licenseType
                },
              },
              {
                type: 'textArea',
                label: 'DESCRIPTION',
                model: 'description',
                rows: 5,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                label: 'START DATE',
                type: 'vfg-functional-date2',
                placeholder: 'Start Date',
                model: 'startDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                validator: ['required', this.validateStartDate],
              },
              {
                label: 'END DATE',
                type: 'vfg-functional-date2',
                placeholder: 'End Date',
                model: 'endDate',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                validator: ['required', this.validateEndDate],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'DURATION',
                model: 'duration',
                required: true,
                min: 1,
                validator: 'number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'status',
                label: 'STATUS',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                disabled: true,
                hint: 'Minutes',
                selectOptions: {
                  multiple: false,
                  key: 'TS_ID',
                  label: 'TS_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.status
                },
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'EXAM CLOSING DAYS',
                model: 'examClosingDays',
                required: true,
                validator: 'number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'CANDIDATE SESSION LISTING(CSL) DAYS',
                model: 'candidateSelectionListDays',
                required: true,
                validator: 'number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'GAP BETWEEN 3 PREFERRED DATES',
                model: 'gapBetween3preferredDates',
                required: true,
                validator: 'number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'POST EXAM CHECKING(HOURS)',
                model: 'postExamCheckingHours',
                required: true,
                validator: ['required', 'number'],
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'PASSING MARK(%)',
                model: 'passingMarks',
                max: 100,
                required: true,
                validator: ['required', 'number'],
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    async loadData (editData) {
      this.model.examName = editData.EXAM_NAME
      this.model.shortName = editData.SHORT_NAME
      this.model.description = editData.DESCRIPTION
      this.model.startDate = editData.START_DATE
      this.model.endDate = editData.END_DATE
      this.model.duration = editData.DURATION
      this.model.examClosingDays = editData.EXAM_CLOSING_DAYS
      this.model.candidateSelectionListDays = editData.CSL_DAYS
      this.model.gapBetween3preferredDates = editData.GAP_BETWEEN_3_PREFERRED_DATES
      this.model.postExamCheckingHours = editData.POST_EXAM_CHECKING_HOURS
      this.model.passingMarks = editData.PASSING_MARK
    },
    getAllExamType: async function () {
      this.examName = await services02Module0.getAllExamTypeList()
      this.model.examName = this.examName.find(x => x.EXAM_TYPE_DESC === this.editData.EXAM_NAME)
      await this.getConsultantTypeById(this.model.examName.CONSULTANT_TYPE_ID)
    },
    async getConsultantTypeById (id) {
      this.licenseType = await examBookingServices.getConsultantTypeById({
        CONSULTANT_TYPE_ID: id,
      })
      this.model.licenseType = this.licenseType.find(x => x.TYPE_NAME === this.editData.LICENSE_TYPE)
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
      this.model.status = this.status.find(x => x.TS_PARAM === this.editData.STATUS)
    },
    validateEndDate (value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log('Valid')
      } else {
        console.log('not Valid')
        return ['Date is Not Valid']
      } // true
    },
    validateStartDate (value) {
      if (this.model.startDate != null) {
        if (moment(this.model.startDate).isSameOrAfter(moment(), 'day')) {
        } else {
          return ['Date is Not Valid']
        }
      }
      if (this.model.endDate != null) {
        if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        } else {
          return ['Date is Not Valid']
        } // true
      }
    },
    onModelUpdated (newVal, schema) {
      if (schema === 'examName') {
        this.model.shortName = this.model.examName.EXAM_TYPE_NAME
        this.model.licenseType = []
        this.getConsultantTypeById(this.model.examName.CONSULTANT_TYPE_ID)
      }
    },
    back () {
      this.$router.push({
        name: 'list-exam-type-details',
      })
    }, // back button
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    submit: async function () {
      const response = await this.validateRegisterForm()
      if (response) {
        const data = new FormData()
        data.append('ID', this.editData.ID)
        data.append('LICENSE_TYPE_ID', this.model.licenseType.CONSULTANT_TYPE_ID)
        data.append('EXAM_TYPE_ID', this.model.examName.CONSULTANT_EXAM_TYPE_ID)
        data.append('SHORT_NAME', this.model.shortName)
        data.append('DESCRIPTION', this.model.description)
        this.model.startDate != null ? data.append(
          'START_DATE', moment(this.model.startDate).format('YYYY-MM-DD')) : null
        this.model.endDate != null ? data.append(
          'END_DATE', moment(this.model.endDate).format('YYYY-MM-DD')) : null
        data.append('DURATION', this.model.duration)
        data.append('STATUS', TaskStatusConstants.INACTIVE_STATUS_TS_ID)
        data.append('EXAM_CLOSING_DAYS', this.model.examClosingDays)
        data.append('CSL_DAYS', this.model.candidateSelectionListDays)
        data.append('GAP_BETWEEN_3_PREFERRED_DATE', this.model.gapBetween3preferredDates)
        data.append('POST_EXAM_CHECKING_HOURS', this.model.postExamCheckingHours)
        data.append('PASSING_MARK', this.model.passingMarks)
        data.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS)

        // submit new entry if approved
        if (this.editData.APPROVAL_STATUS === TaskStatusConstants.APPROVED_DISPLAY ||
                    this.editData.APPROVAL_STATUS === TaskStatusConstants.RETURNED_DISPLAY) {
          data.append('NOTI_LOCATION', 'exam-type-creation')
          data.append('NOTI_REMARK', '(EB) New entry for Exam Type Details Submitted.')

          const user = localStorage.getItem('user')

          data.append('TS_ID', String(TaskStatusConstants.PENDING))
          data.append('CREATE_BY', JSON.parse(user).user_id)

          const entryLevel = await services06Module0.getApprovalLevel(
            ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_USER_PROCESS_ID,
            ApprovalLevelConstants.EXAM_TYPE_ENTRY_APPR_INDEX,
          )
          data.append('ENTRY_LIST', JSON.stringify(entryLevel))

          const reviewerLevel = await services06Module0.getApprovalLevel(
            ApprovalLevelConstants.PROFESSIONAL_DEVELOPMENT_REVIEWER_PROCESS_ID,
            ApprovalLevelConstants.EXAM_TYPE_REVIEW_APPR_INDEX,
          )
          data.append('REVIEWER_LIST', JSON.stringify(reviewerLevel))

          try {
            await examBookingServices.updateExamTypeDetails(data)
            this.$router.go(-1)
          } catch (error) {
            // console.log(error);
          }
        }
      }
    },
  },
}
</script>
<style lang="scss">
textarea {
  text-transform: uppercase;
}
</style>
