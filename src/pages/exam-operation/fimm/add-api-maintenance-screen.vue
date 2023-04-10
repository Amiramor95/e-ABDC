<template>
  <va-inner-loading :loading="statusLoad">
  <va-card>
    <h4 slot="header" class="card-title">
      Add ClassMarker Test Information
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
  </va-inner-loading>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'
import * as examBookingServices from '../../../app/module0/examBookingServices'
import moment from 'moment';
Vue.use(VueFormGenerator)
export default {

  mounted () {
    this.capitalize()
    this.getAllLanguages()

    // this.LANGUAGE = localStorage.getItem('COORDINATOR_LANGUAGE_OPERATING').split(',')
    this.getAllExamType()
  },
  data () {
    return {
      statusLoad: false,

      examType: [],
      LANGUAGE: [

      ],
      duration: '',
      model: {
        examType: '',
        LANGUAGE: '',
        startTime: null,
        endTime: null,
        CLASSMARKER_TEST_LINK:"",
        EXAM_TIME:"",
        effectiveDate:"",
        ACCESS_LIST_ID: '',
        // chinese: '',
        // english: '',

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
                label: 'EXAM TYPE',
                placeholder: 'SELECT EXAM TYPE',
                required: true,
                validator: ["required"],
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
                model: 'LANGUAGE',
                label: 'LANGUAGE',
                placeholder: 'SELECT LANGUAGE',
                required: true,
                validator: ["required"],
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.LANGUAGE
                },
              },
              {
                type: 'input',
                inputType: 'TEXT',
                label: 'CLASSMARKER TEST LINK',
                model: 'CLASSMARKER_TEST_LINK',
                placeholder: 'ENTER CLASSMARKER TEST LINK',
                // validator: [this.validateExamId],
                styleClasses: 'col-md-12',
                required: true,
                validator: [this.validateURL,"required"],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'ACCESS LIST ID',
                model: 'ACCESS_LIST_ID',
                placeholder: 'ENTER ACCESS LIST ID',
                styleClasses: 'col-md-12',
                required: true,
                validator: "integer",
                // validator: [this.validateExamId],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'SUBMIT EXAM NO MINUTES BEFORE',
                model: 'EXAM_TIME',
                placeholder: 'ENTER MINUTES',
                hint: 'Min 15 minutes',
                required: true,
                styleClasses: 'col-md-6 add-api-maintenance-exam-no',
                validator: [this.validSubmitExam,"integer"],
              },
              {
                styleClasses: 'col-md-3 mt-5 px-0',
                hint: 'MINUTES BEFORE EXAM START',
                // validator: [this.validateExamId],
              },
              {
                label: 'EFFECTIVE DATE',
                type: 'vfg-functional-date2',
                placeholder: 'EFFECTIVE DATE',
                model: 'effectiveDate',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-12',
                required: true,
                // validator: ['required', this.validateEffectiveDate],
                validator: ['required'],
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
    async getAllLanguages () {
      this.LANGUAGE = await centreManagementServices.getAllLanguages()
    },
    back () {
      this.$router.push({ name: 'list-api-maintenance-screen' })
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
    validateURL (value) {
      if (value) {
        const Reg =/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        if (!Reg.test(value)) {
          return ['Enter valid URL.']
        }
      }
    },

    validSubmitExam (value) {
      if (value<15) {
        return ['Enter minimum value 15.']
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
      return this.$refs['regForm'].validate();

    },
    submit: async function () {
      // if (this.model.english === '' && this.model.ACCESS_LIST_ID === '' && this.model.chinese === '') {
      //   alert('Please add atleast one exam ID.')
      //   return false
      // }
      // const response = await this.validateRegisterForm()
      if (confirm("Are you sure you want to submit?")) {


        const data1 = new FormData()
        this.statusLoad= true,

          // const CENTRE_ID = localStorage.getItem('CENTRE_ID')
        // data1.append('CENTRE_ID', CENTRE_ID)
        data1.append('EXAM_TYPE_ID', this.model.examType.ID)
        data1.append('EXAM_LANGUAGE', this.model.LANGUAGE.value)
        data1.append('EXAM_CLASSMARKER_TEST_LINK', this.model.CLASSMARKER_TEST_LINK)
        data1.append('EXAM_ACCESS_LIST_ID', this.model.ACCESS_LIST_ID)
        data1.append('SUBMIT_BEFORE_MINUTES', this.model.EXAM_TIME)
        data1.append('EXAM_EFFECTIVE_DATE', moment(this.model.effectiveDate).format('YYYY-MM-DD'))
        const user=JSON.parse(localStorage.getItem('user')).user_id
        data1.append('CREATE_BY', user)

        // console.log(data1);
        try {
          const response = await centreManagementServices.createClassMarkerAPI(data1)
          this.statusLoad= false
          if(response.status){
            this.$router.push({ name: 'list-api-maintenance-screen' })
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
