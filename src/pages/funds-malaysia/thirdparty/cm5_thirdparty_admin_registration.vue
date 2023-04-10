<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Admin Profile
    </h4>
    <br />
    <vue-form-generator
      :model="model"
      :schema="schema"
      :options="formOptions"
      ref="regForm"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <br />
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { getAllPostcodeList } from '../../../app/module0/services02'
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule0 from '../../../app/module0/services'
import * as servicesModule5 from '../../../app/module5/services03.js'
Vue.use(VueFormGenerator)
export default {
  props: {
    value: File,
  },
  mounted () {
    this.getAllPostcodeList()
    this.getCountry()
  },
  data () {
    return {
      registrationType: [
        {
          name: '3rd Party',
          value: '1',
        },
        { name: 'Training Provider', value: '2' },
        {
          name: 'Media', value: '3',
        },
      ],
      timestamp: '',
      country: [],
      postcode: [],
      city: [],
      states: [],
      applicationType: [
        {
          name: 'Computerized Private Retirement Scheme Examination (CPRE)',
          value: '1',
        },
        { name: 'Exemption for CPRE', value: '2' },
      ],
      catExemption: [
        { name: 'CEO', id: '1' },
        { name: 'Director', id: '2' },
        { name: 'Fund Manager', id: '3' },
        { name: 'Financial Planner', id: '4' },
        { name: 'Former PRS Consultant / Vary Registration', id: '5' },
      ],

      qualification: [
        {
          name: 'SPM',
          id: '1',
          selected: true,
        },
        { name: 'STPM', id: '2' },
        { name: 'Diploma', id: '3' },
        { name: 'Degree', id: '4' },
        { name: 'Post-graduate', id: '5' },
        { name: 'Others', id: '6' },
      ],

      catConsultant: [
        {
          name: 'Agent',
          value: '1',
          selected: true,
        },
        { name: 'Employee', value: '2' },
      ],

      apprenticeshipProg: [
        {
          name: 'Yes',
          value: '1',
          selected: true,
        },
        { name: 'No', value: '2' },
      ],
      citizenship: [
        {
          name: 'Malaysian',
          value: '1',
          selected: true,
        },
        { name: 'Non Malaysian', value: '2' },
      ],
      nameOptions: [
        { name: 'Name of CEO', value: '1' },
        { name: 'Director', value: '2' },
      ],
      visible: false,
      visibleDepartment: false,
      visibleCatExemption: false,
      visibleIc: true,
      visiblePassport: false,
      department: [
        { name: 'Sales and Marketing', id: '1' },
        { name: 'Training', id: '2' },
        { name: 'Customer Service', id: '3' },
        { name: 'Compliance', id: '4' },
        { name: 'Others', id: '5' },
      ],
      applicantPhoto: '',
      model: {
        registrationType: '',
        applicationType: '',
        catExemption: '',
        qualification: '',

        fullName: '',
        icNo: '',
        passport: '',
        passportExpiryDate: null,
        citizenship: '1',
        dateOfBirth: '',
        applicantAddress: '',
        applicantAddress2: '',
        applicantAddress3: '',
        applicantPostcode: '',
        applicantCity: '',
        applicantState: '',
        applicantPhoneno: '',
        applicantEmail: '',
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: 'radios',
                label: 'Registration Type',
                model: 'registrationType',
                values: () => {
                  return this.registrationType
                },
                styleClasses: 'col-md-12 display-inline',
                required: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Full Name (as per NRIC)',
                model: 'fullName',
                placeholder: 'Please enter full name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'radios',
                label: 'Citizenship',
                model: 'citizenship',
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-4 display-inline',
              },
              // {
              //   labels: 'NRIC No',
              //   model: 'icNo',
              //   type: 'vfg-the-mask',
              //   placeholder: 'Enter NRIC No',
              //   mask: '######-##-####',
              //   styleClasses: 'col-md-8',
              //   visible: (model, field, form) => {
              //     return this.visibleIc
              //   },
              //   required: true,
              //   validator: 'string',
              // },
              {
                type: 'input',
                inputType: 'text',
                label: 'Passport No.',
                model: 'passport',
                placeholder: 'Enter Passport No.',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                labels: 'Passport Expiry Date',
                type: 'vfg-functional-date',
                placeholder: 'Passport expiry date',
                model: 'passportExpiryDate',
                noLabel: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                required: true,
                validator: ['required', this.validateExpiryDate],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'applicantAddress',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress2',
                placeholder: 'Enter street address',
                hint: 'Street Address line 2',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress3',
                placeholder: 'Enter street address',
                hint: 'Street Address line 3',
                styleClasses: 'col-md-12',
              },

              {
                type: 'vueMultiSelect',
                model: 'applicantPostcode',
                label: 'Postcode',
                placeholder: 'Enter Your Postcode',
                // required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'POSTCODE_NO',
                  label: 'POSTCODE_NO',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantCity',
                label: 'City',
                placeholder: 'Enter Your City',
                // required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SET_CITY_NAME',
                  label: 'SET_CITY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.city
                },
                disabled: (model, schema) => {
                  if (this.model.applicantPostcode) {
                    return false
                  } else {
                    return true
                  }
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'State',
                model: 'applicantState',
                placeholder: 'Enter state',
                // required: true,
                styleClasses: 'col-md-6',
                disabled: true,
              },
              {
                type: 'vueMultiSelect',
                model: 'country',
                label: 'Country',
                placeholder: 'Enter Your Country',
                required: true,
                // validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SET_PARAM',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.country
                },
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Company Email',
                model: 'applicantEmail',
                placeholder: 'Enter email address',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    async getAllPostal () {
      const response = await servicesModule0.getAllPostcodeList()
      this.postcode = response
    },
    async getCityByPostal (data) {
      const response = await servicesModule0.getCityByPostal(data)
      this.city = response
    },
    async getStateByPostal (data) {
      const response = await servicesModule0.getStateByCity(data)
      this.model.applicantState = response.SET_PARAM
      // this.city = response;
    },
    async getCountry () {
      const response = await servicesModule0.getAllSettingGeneralList(
        'COUNTRY',
      )
      this.country = response
    },
    validateExpiryDate (value) {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds() +
        ' GMT'
      const dateTime = date + ' ' + time

      const unixTimeNow = Date.parse(dateTime)
      console.log(unixTimeNow)

      // date expiry
      const expiryDate = this.model.passportExpiryDate
      const dateExpiry =
        expiryDate.getFullYear() +
        '-' +
        (expiryDate.getMonth() + 1) +
        '-' +
        expiryDate.getDate()
      const timeExpiry =
        expiryDate.getHours() +
        ':' +
        expiryDate.getMinutes() +
        ':' +
        expiryDate.getSeconds() +
        ' GMT'
      const dateTimeExpiry = dateExpiry + ' ' + timeExpiry
      const unixTimeExpiryDate = Date.parse(dateTimeExpiry)
      console.log(unixTimeExpiryDate)

      // compare
      if (unixTimeExpiryDate < unixTimeNow) {
        console.log('expired')
        return ['Expired']
      } else {
        console.log('not expired')
        // return ["Expired"];
      }
    },
    uploadImage (e) {
      this.applicantPhoto = this.$refs.applicantPhoto.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          this.$refs.applicantPhotoDisplay.src = reader.result
        }.bind(this),
        false,
      )

      reader.readAsDataURL(this.applicantPhoto)
    },
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      if (schema == 'registrationType') {
        if (newVal == '1') {
          this.visibleIc = false
        } else {
          this.visibleIc = true
        }
      } else if (schema == 'applicationType') {
        this.model.applicationType = newVal
        if (newVal == '2') {
          this.visibleCatExemption = true
        } else {
          this.visibleCatExemption = false
        }
      } else if (schema == 'qualification') {
        if (newVal == '6') {
          this.visible = true
        } else {
          this.visible = false
        }
      } else if (schema == 'department') {
        if (newVal == '5') {
          this.visibleDepartment = true
        } else {
          this.visibleDepartment = false
        }
      } else if (schema == 'citizenship') {
        if (newVal == 1) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema == 'applicantPostcode') {
        this.model.applicantCity = ''
        this.getCityByPostal(this.model.applicantPostcode.SETTING_CITY_ID)
      } else if (schema == 'applicantCity') {
        this.model.applicantState = ''
        this.getStateByPostal(this.model.applicantCity.SETTING_GENERAL_ID)
      }
    },
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },

    async submit () {
      const response = await this.validateRegisterForm()
      if (response) {
        if (this.model.citizenship == '1') {
          if (this.model.registrationType == '1') {
            const data = new FormData()
          data.append('TP_USER_TYPE', this.model.registrationType)
            data.append('TP_USER_FNAME', this.model.fullName)
            // data.append('TP_USER_CITIZEN', this.model.citizenship)
            // data.append('TP_USER_ADDR1', this.model.applicantAddress)
            // data.append('TP_USER_ADDR2', this.model.applicantAddress2)
            // data.append('TP_USER_ADDR3', this.model.applicantAddress3)
            // data.append('TP_USER_POSTAL', this.model.postcode)
            // data.append('TP_USER_CITY', this.model.city)
            // data.append('TP_USER_STATE', this.model.states)
            // data.append('TP_USER_COUNTRY', this.model.country)
            // data.append('TP_USER_TELEPHONE', this.model.applicantPhoneno)
            data.append('TP_USER_EMAIL', this.model.applicantEmail)
            data.append('TP_USER_STATUS', 'New')
            console.log(data)
            console.log(response)
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule5.createTPUser(data)
              console.log(data)
              console.log(response)
              // this.getEmailSetting()
              // this.$modals.simpleModal.$hide()
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          const data = new FormData()
          data.append('TP_USER_TYPE', this.model.registrationType)
          data.append('TP_USER_FNAME', this.model.fullName)
          data.append('TP_USER_CITIZEN', this.model.citizenship)
          // data.append('TP_USER_NRIC', this.model.icNo)
          data.append('TP_USER_ADDR1', this.model.applicantAddress)
          data.append('TP_USER_ADDR2', this.model.applicantAddress2)
          data.append('TP_USER_ADDR3', this.model.applicantAddress3)
          data.append('TP_USER_POSTAL', this.model.postcode)
          data.append('TP_USER_CITY', this.model.city)
          data.append('TP_USER_STATE', this.model.states)
          data.append('TP_USER_COUNTRY', this.model.country)
          data.append('TP_USER_TELEPHONE', this.model.applicantPhoneno)
          // data.append('TP_USER_EMAIL', this.model.applicantEmail)
          data.append('TP_USER_STATUS', 'New')
          try {
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule5.createTPUser(data)
            console.log(response)
            // this.getEmailSetting()
            this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        if (this.model.registrationType == '2') {
          const data = new FormData()
          data.append('TP_USER_TYPE', this.model.registrationType)
          data.append('TP_USER_FNAME', this.model.fullName)
          data.append('TP_USER_CITIZEN', this.model.citizenship)
          data.append('TP_USER_PASSPORT', this.model.passport)
          data.append('TP_USER_PASSPORT_EXPIRY', this.model.passportExpiryDate)
          data.append('TP_USER_ADDR1', this.model.applicantAddress)
          data.append('TP_USER_ADDR2', this.model.applicantAddress2)
          data.append('TP_USER_ADDR3', this.model.applicantAddress3)
          data.append('TP_USER_POSTAL', this.model.postcode)
          data.append('TP_USER_CITY', this.model.city)
          data.append('TP_USER_STATE', this.model.states)
          data.append('TP_USER_COUNTRY', this.model.country)
          // data.append('TP_USER_TELEPHONE', this.model.applicantPhoneno)
          data.append('TP_USER_EMAIL', this.model.applicantEmail)
          data.append('TP_USER_STATUS', 'New')
          try {
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule5.createTPUser(data)
            console.log(response)
            // this.getEmailSetting()
            this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error)
          }
        } else {
          const data = new FormData()
          data.append('TP_USER_TYPE', this.model.registrationType)
          data.append('TP_USER_FNAME', this.model.fullName)
          data.append('TP_USER_CITIZEN', this.model.citizenship)
          // data.append('TP_USER_NRIC', this.model.icNo)
          data.append('TP_USER_ADDR1', this.model.applicantAddress)
          data.append('TP_USER_ADDR2', this.model.applicantAddress2)
          data.append('TP_USER_ADDR3', this.model.applicantAddress3)
          data.append('TP_USER_POSTAL', this.model.postcode)
          data.append('TP_USER_CITY', this.model.city)
          data.append('TP_USER_STATE', this.model.states)
          data.append('TP_USER_COUNTRY', this.model.country)
          // data.append('TP_USER_TELEPHONE', this.model.applicantPhoneno)
          data.append('TP_USER_EMAIL', this.model.applicantEmail)
          data.append('TP_USER_STATUS', 'New')
          try {
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule5.createTPUser(data)
            console.log(response)
            // this.getEmailSetting()
            this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    validateIC (value) {
      const expression1 = /^[0-9]+$/

      console.log(expression1.test(value))
      if (!expression1.test(value)) {
      // this.passwordStrength = "";
        return ['Ic must contain number only']
      }
    },
    isEqualTo (value, field, model) {
      if (!_.has(field, 'equals')) return ['Confirm password is required']
      const a = _.get(model, _.get(field, 'equals'))
      const b = value
      if (_.isEqual(a, b)) return []
      return ['Password do not match']
    },
  },
}
</script>
<style>
</style>
