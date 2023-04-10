<template>
  <va-card>
    <h4 slot="header" class="card-title">
      New Session Registration
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
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        style="background-color:#1dc3f5"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="submit"
        type="button"
        class="ml-1 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-paper-plane"/> &nbsp; Save
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import * as centreManagementServices from '@/app/module0/exam-booking/centreManagementServices'
import * as examSessionManagementServices from '@/app/module0/exam-booking/examSessionManagementServices'
import moment from 'moment'
import * as examBookingServices from '@/app/module0/examBookingServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import * as servicesModule0 from '@/app/module0/services'

Vue.use(VueFormGenerator)
export default {
  mounted () {
    // vfg mask unncesseary label while reloading
    document.querySelectorAll('.field-vfg-functional-date2 .width label').forEach((element) => {
      element.style.display = 'none'
    })
    this.getAllExamType()
    this.model.manualStartEndTime = 0
    this.getActiveInactiveTaskStatus()
  },
  data () {
    return {
      taskStatusConstants: TaskStatusConstants,
      centreName: [],
      centreMode: [
        { name: 'Physical', value: 2 },
        { name: 'Virtual', value: 1 },
      ],
      examType: [],
      day: [],
      sessionStatus: [],
      examWaiverStatus: [
        { value: 1, name: 'Yes' },
        { value: 0, name: 'No' },
      ],
      lockStatus: [
        { name: 'Lock', value: '1' },
        { name: 'Unlock', value: '2' },
      ],
      startEndTime: [],
      model: {
        CENTRE_NAME: '',
        CENTRE_MODE: '',
        date: null,
        examType: '',
        day: '',
        startEndTime: '',
        cslDate: '',
        english: '',
        malay: '',
        chinese: '',
        COORDINATOR_OPERATIONAL_CAPACITY: '',
        COORDINATOR_MAXIMUM_CAPACITY: '',
        sessionStatus: '',
        examWaiverStatus: '',
        lockStatus: '',
        MS_TEAMS_LINK: '',
        startTime: '',
        endTime: '',
        manualStartEndTime: '',
        createBy: '',
        sessionId: '',
        eclDate: '',
        publishStatus: '',
      },
      formOptions: {
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'CENTRE_MODE',
                label: 'CENTRE MODE',
                placeholder: 'Select Centre Mode',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.centreMode
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'CENTRE_NAME',
                label: 'CENTRE NAME',
                placeholder: 'Select Centre Name',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'ID',
                  label: 'CENTRE_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.centreName
                },
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'OPERATIONAL CAPACITY',
                model: 'COORDINATOR_OPERATIONAL_CAPACITY',
                placeholder: 'Enter operational capacity',
                required: true,
                validator: 'number',
                styleClasses: 'col-md-6',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'MAXIMUM CAPACITY',
                model: 'COORDINATOR_MAXIMUM_CAPACITY',
                placeholder: 'Enter maximum capacity',
                required: true,
                validator: 'number',
                styleClasses: 'col-md-6',
                disabled: true,
              },
              {
                type: 'vueMultiSelect',
                model: 'examType',
                label: 'EXAM TYPE',
                placeholder: 'Select Exam Type',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'ID',
                  label: 'SHORT_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.examType
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'day',
                label: 'DAY',
                placeholder: 'Select Day',
                required: true,
                validator: ['required'],
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.day
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'startEndTime',
                label: 'START TIME/END TIME',
                required: true,
                validator: ['required', this.validateStartEndTime],
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'TIME',
                  label: 'TIME',
                },
                values: (model, schema) => {
                  return this.startEndTime
                },
                // visible: (model, field, form) => {
                //   return this.model.manualStartEndTime === 0
                // },
              },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'EXAM ID',
              //   model: 'english',
              //   placeholder: 'Enter exam ID in english',
              //   hint: 'English',
              //   disabled: true,
              //   validator: ['string'],
              //   styleClasses: 'col-md-12',
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.OFF
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   label: 'EXAM ID',
              //   model: 'english',
              //   placeholder: 'Enter exam ID in english',
              //   hint: 'English',
              //   required: false,
              //   validator: ['string', this.validateExamId],
              //   styleClasses: 'col-md-12',
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.ON
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'malay',
              //   placeholder: 'Enter exam ID in malay',
              //   hint: 'MALAY',
              //   disabled: false,
              //   styleClasses: 'col-md-12',
              //   validator: ['string', this.validateExamId],
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.ON
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'malay',
              //   placeholder: 'Enter exam ID in malay',
              //   hint: 'MALAY',
              //   disabled: true,
              //   styleClasses: 'col-md-12',
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.OFF
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'chinese',
              //   placeholder: 'Enter exam ID in chinese',
              //   hint: 'CHINESE',
              //   disabled: true,
              //   styleClasses: 'col-md-12',
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.OFF
              //   },
              // },
              // {
              //   type: 'input',
              //   inputType: 'text',
              //   model: 'chinese',
              //   placeholder: 'Enter exam ID in chinese',
              //   hint: 'CHINESE',
              //   styleClasses: 'col-md-12',
              //   validator: ['string', this.validateExamId],
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === TaskStatusConstants.ON
              //   },
              // },
              // {
              //   type: 'radios',
              //   label: 'MANUAL START TIME / END TIME INSERTION',
              //   model: 'manualStartEndTime',
              //   styleClasses: 'col-md-12 display-inline',
              //   values: () => {
              //     return this.examWaiverStatus
              //   },
              // },
              {
                label: 'DATE',
                type: 'vfg-functional-date2',
                placeholder: 'Date',
                model: 'date',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                required: true,
                validator: ['required', this.validateDate],
              },
              // {
              //   labels: 'START TIME',
              //   type: 'vfg-time-picker',
              //   model: 'startTime',
              //   styleClasses: 'col-md-6',
              //   required: true,
              //   validator: ['required', this.validateStartTime, this.validateGapDuration],
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === 1
              //   },
              // },
              // {
              //   labels: 'END TIME',
              //   type: 'vfg-time-picker',
              //   model: 'endTime',
              //   styleClasses: 'col-md-6',
              //   disabled: true,
              //   visible: (model, field, form) => {
              //     return this.model.manualStartEndTime === 1
              //   },
              // },
              {
                label: 'CSL DATE',
                type: 'vfg-functional-date2',
                placeholder: 'CSL Date',
                model: 'cslDate',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                disabled: true,
              },
              {
                type: 'vueMultiSelect',
                model: 'sessionStatus',
                label: 'SESSION STATUS',
                placeholder: 'Select Session Status',
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
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    async getAllExamType () {
      this.examType = await examBookingServices.getActiveExamTypesDetails()
    },
    back () {
      this.$router.go(-1)
    }, // back button
    onModelUpdated (newVal, schema) {
      switch (schema) {
        case 'CENTRE_MODE':
          if (newVal) {
            centreManagementServices.getAllCentresByCentreMode(
              { CENTRE_MODE: newVal.value },
            ).then((data) => {
              this.centreName = data
              this.model.CENTRE_NAME = ''
            })
          }
          break
        case 'CENTRE_NAME':
          this.model.COORDINATOR_MAXIMUM_CAPACITY = this.model.CENTRE_NAME.MAXIMUM_CAPACITY
          this.model.COORDINATOR_OPERATIONAL_CAPACITY = this.model.CENTRE_NAME.OPERATIONAL_CAPACITY
          this.day = this.model.CENTRE_NAME.DAYS_OPERATING.toString().replace(/["]+/g, '').split(',')
          break

        case 'examType':
        case 'day':
          if (newVal) {
            if (this.model.examType && this.model.CENTRE_NAME && this.model.day) {
              centreManagementServices.getTimeByDay(
                {
                  DAY: this.model.day,
                },
              ).then((data) => {
                this.model.startEndTime = ''
                this.startEndTime = data
              })
            }
          }
          if (this.schema === 'examType') {

          }
          break
        case 'startEndTime':
          if (newVal) {
            // this.model.english = this.model.startEndTime.EXAM_ID_ENGLISH
            // this.model.malay = this.model.startEndTime.EXAM_ID_MALAY
            // this.model.chinese = this.model.startEndTime.EXAM_ID_CHINESE
          }
      }
      if (this.model.examType && this.model.date) {
        this.model.cslDate = moment(this.model.date).subtract(this.model.examType.CSL_DAYS, 'days').format('YYYY-MM-DD')
      }
    },
    async getActiveInactiveTaskStatus () {
      this.sessionStatus = await servicesModule0.getActiveInactiveTaskStatus()
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },
    validateStartTime (value) {
      if (this.model.endTime != null) {
        const startTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.startTime, 'MM/DD/YYYY HH:mm:ss')
        const endTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.endTime, 'MM/DD/YYYY HH:mm:ss')
        if (startTime.isSameOrBefore(endTime)) {
        } else {
          return ['Time is Not Valid']
        } // true
      }
    },
    validateGapDuration () {
      if (this.model.examType.DURATION === undefined) {
        return ['Please select exam type for specific time gap.']
      }
    },
    validateExamId (value) {
      if (value) {
        const Reg = /^(\w{16})$/
        if (!Reg.test(value)) {
          return ['Enter alphanumeric only with 16 length.']
        }
      }
    },
    async validateStartEndTime (startEndTime) {
      if (startEndTime) {
        console.log(startEndTime)
        console.log(startEndTime)
        if (this.model.examType.DURATION !== startEndTime.DURATION) {
          return ['Exam Duration must be ' + this.model.examType.DURATION + ' minutes.']
        }
      }
    },
    async validateDate (day) {
      if (day) {
        console.log(day)
        if (!moment(day).isSameOrAfter(moment(localStorage.getItem('DATE_GENERATED')))) {
          return ['Date should be same or after session effective date (' + localStorage.getItem('DATE_GENERATED') + ')']
        }
        let endDate = moment(localStorage.getItem('DATE_GENERATED')).add(localStorage.getItem('FREQUENCY'), 'M').subtract(1, 'days')
        if (endDate.isAfter(moment(localStorage.getItem('SESSION_END_DATE')))) {
          endDate = moment(localStorage.getItem('SESSION_END_DATE'))
        }
        if (endDate.isBefore(moment(day.toISOString().slice(0, 10)))) {
          return ['Date should be same or below session end date (' + endDate.format('YYYY-MMM-DD') + ')']
        }
        const dayString = day.toLocaleString('en-us', { weekday: 'long' })
        if (dayString !== this.model.day) {
          return ['Date does not match with day.']
        }
        if (this.model.startEndTime) {
          const dateValid = await examSessionManagementServices.isGeneratedDateValid(
            {
              START_TIME: this.model.startEndTime.START_TIME,
              END_TIME: this.model.startEndTime.END_TIME,
              DATE_GENERATED: this.model.date.toISOString().slice(0, 10),
              EXAM_SESSION_ID: localStorage.getItem('SESSION_ID'),
            },
          )
          if (!dateValid) {
            return ['Date is conflicted with other scheduled sessions.']
          }
        }
      }
    },
    submit: async function () {
      const response = await this.validateRegisterForm()
      const validate = await this.validateDate(this.model.date)
      if (response && (typeof validate === 'undefined')) {
        if (confirm('Are you sure you want to proceed this submission ?')) {
          try {
            const user = localStorage.getItem('user')
            this.model.createBy = JSON.parse(user).user_id
            this.model.sessionId = localStorage.getItem('SESSION_ID')
            this.model.publishStatus = TaskStatusConstants.PUBLISH_STATUS_SUBMITTED
            this.model.eclDate = moment(this.model.date).subtract(this.model.examType.ECD, 'days').format('YYYY-MM-DD')
            this.model.date = moment(this.model.date).format('YYYY-MM-DD')
            await examSessionManagementServices.createNewExamSession(
              { DATA: JSON.stringify(this.model) })
            this.model.date = moment(this.model.date, 'YYYY-MM-DD').toDate()
            // this.$router.go(-1)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    saveAsDraft: async function () {
      const response = await this.validateRegisterForm()
      const validate = await this.validateDate(this.model.date)
      if (response && (typeof validate === 'undefined')) {
        if (confirm('Are you sure you want to draft this submission ?')) {
          try {
            const user = localStorage.getItem('user')
            this.model.createBy = JSON.parse(user).user_id
            this.model.sessionId = localStorage.getItem('SESSION_ID')
            this.model.publishStatus = TaskStatusConstants.PUBLISH_STATUS_DRAFT
            this.model.eclDate = moment(this.model.date).subtract(this.model.examType.ECD, 'days').format('YYYY-MM-DD')
            this.model.date = moment(this.model.date).format('YYYY-MM-DD')
            await examSessionManagementServices.createNewExamSession(
              { DATA: JSON.stringify(this.model) })
            this.$router.go(-1)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
  },
}
</script>
<style>
  span.input-group-addon {
    display: none;
  }
</style>
