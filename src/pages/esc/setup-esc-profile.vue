/* eslint-disable no-debugger, no-console */
<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Company User Profile
    </h4>
    <br/>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="isCompanyAdmin ? companyUserProfileDisabledSchema : companyUserProfileSchema"
      @model-updated="onModelUpdated"
      ref="companyUserProfile"
    >
    </vue-form-generator>
    </br>
    <button
      type="button"
      @click="back"
      class="ml-2 btn btn-primary btn-fill float-left btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        v-if="!isCompanyAdmin"
        @click="submit"
        type="button"
        class="btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-save"/> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>
<script>
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from 'vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { debounce } from 'lodash'
import moment from 'moment'
import * as services06Module0 from '../../app/module0/services06'
import * as examCentreProviderManagementServices
from '../../app/exam-centre-provider/services/examCentreProviderManagementServices'
import * as companyManagementServices from '../../app/module0/exam-booking/companyManagementServices'
import { TaskStatusConstants } from '../../app/constants/TaskStatusConstants'

Vue.use(VueFormGenerator)
// register globally
Vue.component('multiselect', Multiselect)
export default {
  components: {
  },
  mounted () {
    // vfg mask unncesseary label while reloading
    // document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
    //   element.style.display = 'none'
    // })
    // document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
    //   element.style.display = 'none'
    // })
    this.userId = JSON.parse(localStorage.getItem('user')).user_id
    this.capitalize()
    this.getCitizenship()

    this.getProfileDetailByEscUserId()
  },
  created () {
    this.capitalize()
  },
  updated () {
    // document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
    //   element.style.display = 'none'
    // })
    // document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
    //   element.style.display = 'none'
    // })
  },
  data () {
    return {
      isCompanyAdmin: false,
      userId: '',
      profileData: '',
      visibleMobileNumberTac: false,
      visibleEmailTac: false,
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      showStaticModalOK: true,
      showStaticModalSaveAsDraft: true,
      isLoad: false,
      visibleIc: true,
      visiblePassport: false,
      company: [],
      citizenship: [],
      filters: {
        COMPANY_STATUS: { TS_ID: 22, name: 'APPROVED' },
        APPROVAL_STATUS: { TS_ID: 3, name: 'ACTIVE' },
      },
      model: {
        // company admin name
        FULL_NAME: '',
        ESC_CTITIZENSHIP: 286,
        ESC_NRIC: '',
        ESC_PASSPORT_NO: '',
        ESC_PASSPORT_EXPIRY_NO: '',
        PHONE_NO: '',
        EMAIL: '',
        // company status
        COMPANY_NAME: '',
        PHONE_TAC: '',
        EMAIL_TAC: '',
      },
      formOptions: {
        validateAfterChanged: true,
      },
      companyUserProfileSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'FULL NAME (AS PER NRIC)',
                model: 'FULL_NAME',
                placeholder: 'ENTER FULL NAME',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12 text-uppercase',
                max: 100,
              },
              {
                type: 'radios',
                label: 'CITIZENSHIP',
                model: 'ESC_CTITIZENSHIP',
                required: true,
                validator: 'required',
                radiosOptions: {
                  value: 'SETTING_GENERAL_ID',
                  name: 'SET_PARAM',
                },
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-4 display-inline text-uppercase',
              },
              {
                type: 'vfg-the-mask',
                label: 'NRIC NUMBER',
                model: 'ESC_NRIC',
                validator: ['string'],
                placeholder: 'ENTER NRIC NUMBER',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'PASSPORT NUMBER',
                model: 'ESC_PASSPORT_NO',
                placeholder: 'ENTER PASSPORT NUMBER',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                label: 'PASSPORT EXPIRY DATE',
                type: 'vfg-functional-date2',
                placeholder: 'PASSPORT EXPIRY DATE',
                required: true,
                validator: ['required', this.validateExpiryDate],
                model: 'ESC_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'COMPANY_NAME',
                label: 'COMPANY NAME',
                placeholder: 'ENTER COMPANY',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'COMPANY_PROFILE_ID',
                  label: 'COMPANY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.company
                },
              },
              {
                label: 'PHONE NUMBER',
                model: 'PHONE_NO',
                type: 'vfg-the-mask',
                placeholder: 'ENTER PHONE NUMBER',
                mask: '01#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'required',
              },
              {
                labels: 'Request TAC',
                model: 'PHONE_TAC',
                type: 'vfg-custom-Tacinput',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleMobileNumberTac
                },
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'EMAIL ADDRESS',
                model: 'EMAIL',
                placeholder: 'ENTER EMAIL ADDRESS',
                required: true,
                validator: ['email', this.validateEmail],
                styleClasses: 'col-md-6 text-uppercase',
              },
              {
                labels: 'Request Email OTP',
                model: 'EMAIL_TAC',
                type: 'vfg-custom-emailotp',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleEmailTac
                },
              },
            ],
          },
        ],
      },
      companyUserProfileDisabledSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'FULL NAME (AS PER NRIC)',
                model: 'FULL_NAME',
                placeholder: 'ENTER FULL NAME',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12 text-uppercase',
                max: 100,
                readonly: true,

              },
              {
                type: 'radios',
                label: 'CITIZENSHIP',
                model: 'ESC_CTITIZENSHIP',
                required: true,
                validator: 'required',
                radiosOptions: {
                  value: 'SETTING_GENERAL_ID',
                  name: 'SET_PARAM',
                },
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-4 display-inline text-uppercase',
                readonly: true,
                disabled: true,
              },
              {
                type: 'vfg-the-mask',
                label: 'NRIC NUMBER',
                model: 'ESC_NRIC',
                required: true,
                validator: ['string', this.validateIC],
                placeholder: 'ENTER NRIC NUMBER',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'PASSPORT NUMBER',
                model: 'ESC_PASSPORT_NO',
                placeholder: 'ENTER PASSPORT NUMBER',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                disabled: true,
              },
              {
                label: 'PASSPORT EXPIRY DATE',
                type: 'vfg-functional-date2',
                placeholder: 'PASSPORT EXPIRY DATE',
                required: true,
                validator: ['required', this.validateExpiryDate],
                model: 'ESC_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                disabled: true,
              },
              {
                type: 'vueMultiSelect',
                model: 'COMPANY_NAME',
                label: 'COMPANY NAME',
                placeholder: 'ENTER COMPANY',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'COMPANY_PROFILE_ID',
                  label: 'COMPANY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.company
                },
                disabled: true,
              },
              {
                label: 'PHONE NUMBER',
                model: 'PHONE_NO',
                type: 'vfg-the-mask',
                placeholder: 'ENTER PHONE NUMBER',
                mask: '01#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'required',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'EMAIL ADDRESS',
                model: 'EMAIL',
                placeholder: 'ENTER EMAIL ADDRESS',
                required: true,
                validator: ['email', this.validateEmail],
                styleClasses: 'col-md-6 text-uppercase',
                readonly: true,
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
    async getCitizenship (data) {
      this.citizenship = await services06Module0.getAllCitizenship(data)
    },
    async getAllCompanies () {
      this.company = await companyManagementServices.listAllCompany(
        { FILTERS: this.isCompanyAdmin ? [] : this.filters },
      )
      // this.company = await companyManagementServices.listAllCompany()
    },
    async getProfileDetailByEscUserId () {
      this.profileData = await examCentreProviderManagementServices.getEscProfileById(
        {
          ESC_USER_ID: this.userId,
        },
      )
      this.model.FULL_NAME = this.profileData.USER_NAME
      this.model.USER_CITIZEN = this.profileData.USER_CITIZEN
      if (this.profileData.USER_CITIZEN === 286) {
        this.model.ESC_NRIC = this.profileData.USER_NRIC
      } else {
        this.model.ESC_PASSPORT_NO = this.profileData.USER_PASS_NUM
        this.model.ESC_PASSPORT_EXPIRY_NO = this.profileData.USER_PASS_EXP
      }
      this.model.EMAIL = this.profileData.USER_EMAIL
      this.model.PHONE_NO = this.profileData.USER_MOBILE_NUM
      this.isCompanyAdmin = this.profileData.USER_ISADMIN
      await this.getAllCompanies()
      this.model.COMPANY_NAME = this.company.find(x => x.COMPANY_PROFILE_ID === this.profileData.COMPANY_PROFILE_ID)
    },

    validateExpiryDate (value) {
      if (value != null) {
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
        const expiryDate = this.model.USER_PASS_EXP
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
      } else {
        console.log('ssdfdsf')
      }
    },
    back () {
      this.$router.go(-1)
    },
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),
    navigateToList () {
      this.$router.push({ name: 'list-company-management' })
    },
    async validateIC (value) {
      if (value.length !== 12) {
        return ['NRIC number must contain 12 digit']
      } else {
        const response = await examCentreProviderManagementServices.checkDuplicateIC(
          {
            USER_NRIC: value,
          },
        )
        return response.message
      }
    },
    async validateEmail (value) {
      if (value !== this.profileData.USER_EMAIL) {
        const response = await examCentreProviderManagementServices.checkDuplicateEmail({
          USER_EMAIL: value,
        })
        return response.message
      }
    },
    validateCompanyUserProfileForm () {
      return (this.$refs.companyUserProfile.validate())
    },
    async submit () {
      const emailResponse = await this.validateEmail(this.model.EMAIL)
      if (emailResponse !== undefined) {
        return
      }
      if (document.querySelectorAll('.errors').length) {
        alert('Please check the errors.')
        return
      }
      const response = await this.validateCompanyUserProfileForm()
      if (response && confirm('Are you sure you want to proceed this submission ?')) {
        const user = localStorage.getItem('user')
        const data1 = new FormData()
        data1.append('USER_ID', JSON.parse(user).user_id)

        // COMPANY profile
        data1.append('COMPANY_NAME', this.model.COMPANY_NAME.COMPANY_PROFILE_ID)
        if (this.profileData.USER_CITIZEN === 286) {
          data1.append('NRIC', this.profileData.USER_NRIC)
        }
        // company admin name
        data1.append('FULL_NAME', this.model.FULL_NAME)
        data1.append('CITIZENSHIP', this.model.ESC_CTITIZENSHIP)
        data1.append('PASSPORT_NO', this.model.ESC_PASSPORT_NO)
        if (this.model.ESC_PASSPORT_EXPIRY_NO !== null) {
          data1.append('PASSPORT_EXPIRY_NO', moment(this.model.ESC_PASSPORT_EXPIRY_NO).format('YYYY-MM-DD'))
        }
        data1.append('PHONENO', this.model.PHONE_NO)
        data1.append('EMAIL', this.model.EMAIL)
        data1.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS_SUBMITTED)

        if (this.visibleMobileNumberTac) {
          data1.append('PHONE_TAC', JSON.parse(this.model.PHONE_TAC))
        }
        if (this.visibleEmailTac) {
          data1.append('EMAIL_TAC', JSON.parse(this.model.EMAIL_TAC))
        }

        try {
          await examCentreProviderManagementServices.requestProfileUpdate(data1)
          // this.$router.push({ name: 'list-company' })
        } catch (error) {
          console.log(error)
        }
      }
    },
    showRequestTacNumberEmailIfChanged () {
      return (this.profileData.USER_EMAIL !== this.model.EMAIL)
    },
    showRequestTacNumberMobileIfChanged () {
      console.log(this.profileData.USER_MOBILE_NUM)
      console.log(this.model.PHONE_NO)
      return (this.profileData.USER_MOBILE_NUM !== this.model.PHONE_NO)
    },
    onModelUpdated (newVal, schema) {
      console.log(this.visibleMobileNumberTac)
      console.log(`schema: ${schema}`, 'value:', newVal)
      if (schema === 'ESC_CTITIZENSHIP') {
        if (newVal === 286) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema === 'PHONE_NO') {
        this.model.PHONE_NO = this.model.PHONE_NO ? this.model.PHONE_NO.toString() : ''
        this.visibleMobileNumberTac = this.showRequestTacNumberMobileIfChanged()
      } else if (schema === 'EMAIL') {
        this.visibleEmailTac = this.showRequestTacNumberEmailIfChanged()
      }
      // document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
      //   element.style.display = 'none'
      // })
      // document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
      //   element.style.display = 'none'
      // })
    },
  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .l2 {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    line-height: inherit;
    color: inherit;
    white-space: normal;
  }

  .display-inline label {
    display: inline !important;
    padding: 5px;
  }

  .app-layout__main {
    background: #e8e8e8;
  }

  .container {
    max-width: 620px;
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
  }

  /* Style the tabs */
  .tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px; // hide bottom border
  }

  .tabs ul {
    list-style-type: none;
    margin-left: 20px;
  }

  .tabs a {
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
  }

  .tabs a:last-child {
    border-right: 1px solid #ccc;
  }

  /* Change background color of tabs on hover */
  .tabs a:hover {
    background-color: #aaa;
    color: #fff;
  }

  /* Styling for active tab */
  .tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
  }

  /* Style the tab content */
  .tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
  }

  select, input {
    text-transform: uppercase;
  }
  #google-map-link-url {
    text-transform: none;
  }

  #google-map-link-url::placeholder {
    text-transform: uppercase;
  }

</style>
