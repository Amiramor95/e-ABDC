<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Edit Exam Time
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
import * as examTimeManagementServices from '../../../app/module0/exam-booking/examTimeManagementServices'

Vue.use(VueFormGenerator)
export default {

  mounted () {
    this.examTimeData = JSON.parse(localStorage.getItem('edit-exam-time'))
    this.loadData()
    this.capitalize()
  },
  data () {
    return {
      examTimeData: '',
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      model: {
        day: '',
        startTime: null,
        endTime: null,
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
                validator: ['required', this.validateStartTime],
              },
              {
                labels: 'END TIME',
                type: 'vfg-time-picker',
                model: 'endTime',
                styleClasses: 'col-md-6',
                required: true,
                validator: ['required', this.validateEndTime],
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
    convertTime12to24 (time12h) {
      const [time, modifier] = time12h.split(' ')

      let [hours, minutes, seconds] = time.split(':')

      if (hours === '12') {
        hours = '00'
      }

      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12
      }

      return `${hours}:${minutes}:${seconds}`
    },
    loadData () {
      this.model.startTime = this.convertTime12to24(this.examTimeData.START_TIME)
      this.model.endTime = this.convertTime12to24(this.examTimeData.END_TIME)
      this.model.day = this.examTimeData.DAY
    },
    back () {
      this.$router.push({ name: 'list-exam-time' })
    },
    hasZeroTime (m) {
      return m.hours() === 0 && m.minutes() === 0 && m.seconds() === 0
    },
    valid (startTime, endTime) {
      if (this.hasZeroTime(startTime) && this.hasZeroTime(endTime)) return true
      return startTime.isBefore(endTime)
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
    validateEndTime (value) {
      const startTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.startTime, 'MM/DD/YYYY HH:mm:ss')
      const endTime = moment(moment().format('MM/DD/YYYY') + '' + this.model.endTime, 'MM/DD/YYYY HH:mm:ss')
      if (this.valid(startTime, endTime)) {
        console.log('Valid')
      } else {
        return ['Time is Not Valid']
      } // true
    },
    onModelUpdated (newVal, schema) {
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },
    submit: async function () {
      const response = await this.validateRegisterForm()
      if (response) {
        const data1 = new FormData()
        data1.append('DAY', this.model.day)
        data1.append('STARTTIME', this.model.startTime)
        data1.append('ENDTIME', this.model.endTime)
        const user = localStorage.getItem('user')
        data1.append('UPDATE_BY', JSON.parse(user).user_id)
        data1.append('EXAM_TIME_ID', this.examTimeData.EXAM_TIME_ID)
        try {
          await examTimeManagementServices.updateExamTime(data1)
          this.back();
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
