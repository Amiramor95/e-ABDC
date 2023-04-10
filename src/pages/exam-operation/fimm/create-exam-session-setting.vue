<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Create Exam Session Setting
    </h4>
    <br/>
    <div class="form-group valid required col-md-12 mt-3">
      <label for="exam-type"><span>EXAM TYPE</span></label>
      <multiselect
        v-model="model.examType"
        :options="examType"
        track-by="ID"
        label="SHORT_NAME"
        placeholder="Select Exam Type"
        :taggable="true"
      >
      </multiselect>
    </div>
    <div class="form-group valid required col-md-12 mb-4">
      <label for="state"><span>STATE</br>(MULTIPLE SELECTION)</span></label>
      <multiselect
        v-model="model.states"
        :options="states"
        track-by="SET_STATE"
        label="SET_STATE"
        placeholder="Select State"
        :multiple="true"
        :taggable="true"
      >
      </multiselect>
    </div>
    <vue-form-generator
      :model="model"
      :schema="schema"
      :options="formOptions"
      ref="regForm"
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
import * as examSessionManagementServices from '@/app/module0/exam-booking/examSessionManagementServices'
import * as services02module0 from '../../../app/module0/services02'
import * as examBookingServices from '../../../app/module0/examBookingServices'

Vue.use(VueFormGenerator)
export default {
  mounted () {
    // hiding unnecessary space
    const widths = document.querySelectorAll('div.width label')
    widths.forEach((width) => width.style.display = 'none')
    this.getAllStates()
    this.getAllExamType()
  },
  data () {
    return {
      states: [],
      examType: [],
      sessionInAdvance: [
        { value: 1, name: 'On' },
        { value: 0, name: 'Off' },
      ],
      status: [],
      model: {
        SESSION_IN_ADVANCE: '',
        startDate: null,
        endDate: null,
        effectiveDate: null,
        frequency: '',
        states: [],
        examType: '',
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
                type: 'radios',
                label: 'SESSION IN ADVANCE',
                model: 'SESSION_IN_ADVANCE',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12 display-inline',
                values: (model, schema) => {
                  return this.sessionInAdvance
                },
              },
              {
                label: 'START DATE',
                type: 'vfg-functional-date2',
                placeholder: 'Start Date',
                model: 'startDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                required: true,
                validator: ['required', this.validateStartDate],
              },
              {
                label: 'END DATE',
                type: 'vfg-functional-date2',
                placeholder: 'End Date',
                model: 'endDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                required: true,
                validator: ['required', this.validateEndDate],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'FREQUENCY',
                model: 'frequency',
                required: true,
                hint: 'Month',
                validator: 'number',
                styleClasses: 'col-md-12',
              },
              {
                label: 'EFFECTIVE DATE',
                type: 'vfg-functional-date2',
                placeholder: 'Effective Date',
                model: 'effectiveDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                required: true,
                validator: ['required', this.validateEffectiveDate],
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'list-exam-session-setting' })
    },
    async getAllStates () {
      try {
        this.states = await services02module0.getAllStateList()
      } catch (error) {
        console.log(error)
      }
    },
    async getAllExamType () {
      this.examType = await examBookingServices.getActiveExamTypesDetails()
      if (!this.examType) {
        alert('Active Exam Type Details not found. Please add Active Exam Types.')
        this.back()
      }
    },
    validateEndDate (value) {
      if (!moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        return ['End date should be more than start date.']
      }
      if (this.model.frequency != null && this.model.startDate != null && this.model.effectiveDate != null) {
        const validDate = moment(this.model.effectiveDate).add(this.model.frequency, 'M')
        if (!moment(this.model.endDate).isSameOrAfter(validDate)) {
          return ['Gap between effective date and end date should be at least ' + this.model.frequency + ' months.']
        }
      }
    },
    validateStartDate (value) {
      if (this.model.endTime != null) {
        if (!moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
          return ['Start date should be less than end date.']
        }
      }
    },
    validateEffectiveDate (value) {
      if (this.model.effectiveDate != null) {
        if (!moment(this.model.effectiveDate).isSameOrAfter(moment(), 'day')) {
          return ['Effective date should be same or after current date.']
        }
      }
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    submit: async function () {
      const response = await this.validateRegisterForm()
      if (response) {
        const data = new FormData()
        data.append('SESSION_IN_ADVANCE', this.model.SESSION_IN_ADVANCE)
        data.append('START_DATE', this.model.startDate != null ? moment(this.model.startDate).format('YYYY-MM-DD') : null)
        data.append('END_DATE', this.model.endDate != null ? moment(this.model.endDate).format('YYYY-MM-DD') : null)
        data.append('EFFECTIVE_DATE', this.model.effectiveDate != null ? moment(this.model.effectiveDate).format('YYYY-MM-DD') : null)
        data.append('FREQUENCY', this.model.frequency)
        data.append('EXAM_TYPE', this.model.examType.ID)
        this.model.states.forEach((state, index) => {
          data.append('STATES[' + index + ']', state.SETTING_GENERAL_ID)
        })
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        try {
          await examSessionManagementServices.createExamSessionSetting(data)
          this.$router.go(-1)
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
<style lang="css" scoped>
  .display-inline label {
    display: inline !important;
  }
</style>
