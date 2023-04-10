<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Exam ID
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
      type="button"
      @click="back"
      class="ml-2 btn btn-primary btn-fill float-left btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-edit"/> &nbsp; Save
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import moment from 'moment'
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'
import * as examBookingServices from '../../../app/module0/examBookingServices'

Vue.use(VueFormGenerator)
export default {

  mounted () {
    this.capitalize()
    this.day = localStorage.getItem('COORDINATOR_DAY_OPERATING').split(',')
    this.getAllExamType()
  },
  data () {
    return {
      examType: [],
      day: [],
      duration: '',
      model: {
        examType: '',
        day: '',
        startTime: null,
        endTime: null,
        english: '',
        malay: '',
        chinese: '',
        redirectFromExamId: true,
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
                model: 'examType',
                label: 'Exam Type',
                mask: '00:00:00',
                placeholder: 'Select Exam Type',
                required: true,
                validator: ['required'],
                styleClasses: 'col-md-12',
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
                label: 'Day',
                placeholder: 'Select Day',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.day
                },
              },
              {
                labels: 'START TIME',
                type: 'vfg-time-picker',
                model: 'startTime',
                styleClasses: 'col-md-6',
                required: true,
                validator: ['required', this.validateStartTime, this.validateGapDuration],
              },
              {
                labels: 'END TIME',
                type: 'vfg-time-picker',
                model: 'endTime',
                styleClasses: 'col-md-6',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Exam ID',
                model: 'english',
                placeholder: 'Enter exam ID in english',
                hint: 'English',
                validator: [this.validateExamId],
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'malay',
                placeholder: 'Enter exam ID in malay',
                hint: 'Malay',
                styleClasses: 'col-md-12',
                validator: [this.validateExamId],
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'chinese',
                placeholder: 'Enter exam ID in chinese',
                hint: 'Chinese',
                validator: [this.validateExamId],
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    capitalize () {
      const elems = document.querySelectorAll('.form-group label span')
      let index = 0; const length = elems.length
      for (; index < length; index++) {
        elems[index].style.textTransform = 'uppercase'
      }
    },
    back () {
      localStorage.setItem('new-exam-id', JSON.stringify(this.model))
      this.$router.push({ name: 'create-exam-centre' })
    },
    async getAllExamType () {
      this.examType = await examBookingServices.getActiveExamTypesDetails()
      if (!this.examType) {
        alert('Active Exam Type Details not found. Please add Active Exam Types.')
        this.back()
      }
    },
    hasZeroTime (m) {
      return m.hours() === 0 && m.minutes() === 0 && m.seconds() === 0
    },
    valid (startTime, endTime) {
      if (this.hasZeroTime(startTime) && this.hasZeroTime(endTime)) return true
      return startTime.isBefore(endTime)
    },
    validateExamId (value) {
      if (value) {
        const Reg = /^(\w{16})$/
        if (!Reg.test(value)) {
          return ['Enter alphanumeric only with 16 length.']
        }
      }
    },
    validateGapDuration () {
      this.duration = this.model.examType.DURATION
      if (this.duration !== undefined) {
        // const startTime = moment(this.model.startTime, 'HH:mm:ss')
        // const endTime = moment(this.model.endTime, 'HH:mm:ss')
        // const duration = moment.duration(endTime.diff(startTime))
        // const minutes = parseInt(duration.asMinutes())
        // console.log(this.duration)
        // if (minutes < this.duration) {
        //   return ['Duration between these two time should be greater than ' + this.duration + ' minutes']
        // }
      } else {
        return ['Please select exam type for specific time gap.']
      }
    },
    validateStartTime (value) {
      if (this.model.endTime != null) {
        const startTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.startTime, 'MM/DD/YYYY HH:mm:ss')
        const endTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.endTime, 'MM/DD/YYYY HH:mm:ss')
        if (startTime.isSameOrBefore(endTime)) {
          console.log('Valid')
        } else {
          console.log('not Valid')
          return ['Time is Not Valid']
        } // true
      }
    },
    onModelUpdated (newVal, schema) {
      if (schema === 'startTime') {
        const startTime = moment(this.model.startTime, 'HH:mm:ss')
        const duration = moment.duration({ minutes: this.duration })
        this.model.endTime = moment(startTime).add(duration).format('HH:mm:ss')
      }
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },
    submit: async function () {
      if (this.model.english === '' && this.model.malay === '' && this.model.chinese === '') {
        alert('Please add atleast one exam ID.')
        return false
      }
      const response = await this.validateRegisterForm()
      if (response) {
        const data1 = new FormData()
        const CENTRE_ID = localStorage.getItem('CENTRE_ID')
        data1.append('CENTRE_ID', CENTRE_ID)
        data1.append('EXAM_TYPE_DETAILS_ID', this.model.examType.ID)
        data1.append('EXAM_ID_DAY', this.model.day)
        data1.append('EXAM_ID_START_TIME', this.model.startTime)
        data1.append('EXAM_ID_END_TIME', this.model.endTime)
        data1.append('EXAM_ID_ENGLISH', this.model.english)
        data1.append('EXAM_ID_MALAY', this.model.malay)
        data1.append('EXAM_ID_CHINESE', this.model.chinese)
        try {
          const response = await centreManagementServices.createNewExamId(data1)
          localStorage.setItem('new-exam-id', JSON.stringify(this.model))
          this.$router.push({ name: 'create-exam-centre' })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
