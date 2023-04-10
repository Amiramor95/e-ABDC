/* eslint-disable no-debugger, no-console */
<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Edit Company Profile
    </h4>
    <br/>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="firstTabSchema1"
      @model-updated="onModelUpdated"
      ref="companyForm"
    >
    </vue-form-generator>
    <b style="padding-left: 14px;margin-bottom: 10px;display: block;">Company Representative</b>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="firstTabSchema2"
      @model-updated="onModelUpdated"
      ref="companyOwnerForm"
    >
    </vue-form-generator>
    <b style="padding-left: 14px;margin-bottom: 20px;display: block;">Company Admin</b>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="companyAdminSchema"
      @model-updated="onModelUpdated"
      ref="companyAdminForm"
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
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'
import * as services06Module0 from '../../../app/module0/services06'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import moment from 'moment'
import * as servicesModule0 from '../../../app/module0/services'

Vue.use(VueFormGenerator)
// register globally
Vue.component('multiselect', Multiselect)
export default {
  mounted () {
    // vfg mask unncesseary label while reloading
    document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
      element.style.display = 'none'
    })
    document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
      element.style.display = 'none'
    })

    this.getEditData()

    this.capitalize()
    // this.getDefaultCountry()
  },
  created () {
    this.capitalize()
  },
  data () {
    return {
      term: null,
      perPage: '10',
      companyProfile: '',
      companyProfileId: '',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      showStaticModalOK: true,
      showStaticModalSaveAsDraft: true,
      isLoad: false,
      visibleIc: true,
      visiblePassport: false,
      state: [],
      country: [],
      postcode: [],
      city: [],
      status: [],
      citizenship: [],
      model: {
        COMPANY_NAME: '',
        COMPANY_REGISTRATION_NO: '',
        NEW_COMPANY_REGISTRATION_NO: '',
        COMPANY_ADDR_1: '',
        COMPANY_ADDR_2: '',
        COMPANY_ADDR_3: '',
        COMPANY_COUNTRY: '',
        COMPANY_STATE: '',
        COMPANY_CITY: '',
        COMPANY_POSTAL: '',
        COMPANY_OFFICE_PHONE_NUMBER: '',
        COMPANY_FAX_NUMBER: '',
        COMPANY_EMAIL: '',

        // company owner model
        COMPANY_OWNER_NAME: '',
        COMPANY_OWNER_PHONE_NO: '',
        COMPANY_OWNER_POSITION: '',
        COMPANY_OWNER_EMAIL: '',

        // company admin name
        COMPANY_ADMIN_NAME: '',
        COMPANY_ADMIN_CITIZENSHIP: 286,
        COMPANY_ADMIN_NRIC: '',
        COMPANY_ADMIN_PASSPORT_NO: '',
        COMPANY_ADMIN_PASSPORT_EXPIRY_NO: '',
        COMPANY_ADMIN_PHONENO: '',
        COMPANY_ADMIN_EMAIL: '',

        // company status
        COMPANY_STATUS: 'NO',
      },
      formOptions: {
        validateAfterChanged: true,
      },
      firstTabSchema1: {
        styleClasses: 'row',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Company Name',
            model: 'COMPANY_NAME',
            placeholder: 'ENTER COMPANY NAME',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-12',
            max: 100,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Company Registration No',
            model: 'COMPANY_REGISTRATION_NO',
            placeholder: 'ENTER COMPANY REGISTRATION NO',
            required: true,
            styleClasses: 'col-md-6',
            validator: [this.validateCompanyRegistration],
          },
          {
            type: 'input',
            inputType: 'NUMBER',
            label: 'NEW COMPANY REGISTRATION NO',
            model: 'NEW_COMPANY_REGISTRATION_NO',
            placeholder: 'ENTER NEW COMPANY REGISTRATION NO',
            required: true,
            validator: [this.validateNewCompanyRegistration],
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'COMPANY_ADDR_1',
            placeholder: 'Enter street address',
            hint: 'Street Address',
            required: true,
            validator: ['required', 'string'],
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'COMPANY_ADDR_2',
            placeholder: 'ENTER STREET ADDRESS',
            hint: 'Street Address line 2',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'COMPANY_ADDR_3',
            placeholder: 'Enter street address',
            hint: 'Street Address line 3',
            styleClasses: 'col-md-12',
          },
          {
            type: 'vueMultiSelect',
            model: 'COMPANY_COUNTRY',
            label: 'COUNTRY',
            placeholder: 'ENTER YOUR COUNTRY',
            required: true,
            validator: 'required',
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
            type: 'vueMultiSelect',
            model: 'COMPANY_STATE',
            label: 'State',
            placeholder: 'SELECT YOUR STATE',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'SET_PARAM',
              label: 'SET_PARAM',
              searchable: true,
            },
            values: (model, schema) => {
              return this.state
            },
          },
          {
            type: 'vueMultiSelect',
            model: 'COMPANY_CITY',
            label: 'City',
            placeholder: 'ENTER YOUR CITY',
            required: true,
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
          },
          {
            type: 'vueMultiSelect',
            model: 'COMPANY_POSTAL',
            label: 'Postcode',
            placeholder: 'ENTER YOUR POSTCODE',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'POSTCODE_ID',
              label: 'POSTCODE',
              searchable: true,
            },
            values: (model, schema) => {
              return this.postcode
            },
          },
          {
            label: 'TELEPHONE NUMBER',
            model: 'COMPANY_OFFICE_PHONE_NUMBER',
            type: 'vfg-the-mask',
            placeholder: 'ENTER PHONE NUMBER',
            mask: '0#-########',
            styleClasses: 'col-md-6',
            required: true,
            validator: 'string',
          },
          {
            label: 'FAX NUMBER',
            model: 'COMPANY_FAX_NUMBER',
            type: 'vfg-the-mask2',
            placeholder: 'ENTER FAX NUMBER',
            mask: '0#-########',
            styleClasses: 'col-md-6',
            required: true,
            validator: 'string',
          },
          {
            label: 'EMAIL ADDRESS',
            type: 'input',
            inputType: 'email',
            model: 'COMPANY_EMAIL',
            placeholder: 'ENTER EMAIL',
            styleClasses: 'col-md-6',
            required: true,
            validator: ['required'],
          },
        ],
      },
      firstTabSchema2: {
        styleClasses: 'row',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'COMPANY_OWNER_NAME',
            placeholder: 'ENTER COMPANY OWNER NAME',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-12',
            max: 100,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'PHONE NUMBER',
            model: 'COMPANY_OWNER_PHONE_NO',
            placeholder: 'ENTER PHONE NUMBER',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'POSITION',
            model: 'COMPANY_OWNER_POSITION',
            placeholder: 'ENTER POSITION',
            required: true,
            validator: ['required', 'string'],
            styleClasses: 'col-md-6',
            max: 100,
          },
          {
            label: 'EMAIL ADDRESS',
            type: 'input',
            inputType: 'email',
            model: 'COMPANY_OWNER_EMAIL',
            placeholder: 'ENTER EMAIL',
            styleClasses: 'col-md-12',
            required: true,
            validator: ['email'],
          },
        ],
      },
      companyAdminSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'NAME',
                model: 'COMPANY_ADMIN_NAME',
                placeholder: 'ENTER COMPANY ADMIN NAME',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12 text-uppercase',
                max: 100,
              },
              {
                type: 'radios',
                label: 'CITIZENSHIP',
                model: 'COMPANY_ADMIN_CITIZENSHIP',
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
                model: 'COMPANY_ADMIN_NRIC',
                required: true,
                validator: 'required',
                placeholder: 'ENTER NRIC NUMBER',
                mask: '######-##-####',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'PASSPORT NUMBER',
                model: 'COMPANY_ADMIN_PASSPORT_NO',
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
                validator: 'required',
                model: 'COMPANY_ADMIN_PASSPORT_EXPIRY_NO',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-4 text-uppercase',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                label: 'PHONE NUMBER',
                model: 'COMPANY_ADMIN_PHONENO',
                type: 'vfg-the-mask',
                placeholder: 'ENTER PHONE NUMBER',
                mask: '01#-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'required',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'EMAIL ADDRESS',
                model: 'COMPANY_ADMIN_EMAIL',
                placeholder: 'ENTER EMAIL ADDRESS',
                required: true,
                validator: ['email'],
                styleClasses: 'col-md-12 text-uppercase',
              },
              {
                type: 'vueMultiSelect',
                model: 'COMPANY_STATUS',
                label: 'COMPANY STATUS',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                disabled: true,
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
      this.$router.go(-1)
    },
    navigateToList () {
      this.$router.push({ name: 'list-company-management' })
    },
    validateCompanyRegistration (value) {
      if (value) {
        const Reg = /^[0-9]{6}-[A-Za-z]{1}$/
        if (!Reg.test(value)) {
          return ['Enter format in (6 digits number, dash (-), 1 alphabet).']
        }
      }
    },
    validateNewCompanyRegistration (value) {
      if (value) {
        const Reg = /^[0-9]{12}$/
        if (!Reg.test(value)) {
          return ['Enter integers only with 12 digits.']
        }
      }
    },
    validateCompanyForm () {
      return (this.$refs.companyForm.validate() &&
        this.$refs.companyOwnerForm.validate() &&
        this.$refs.companyAdminForm.validate())
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
      this.model.COMPANY_STATUS = this.status.find(x => x.TS_ID === this.companyProfile.COMPANY_STATUS)
    },
    async submit () {
      const response = await this.validateCompanyForm()
      if (response && confirm('Are you sure you want to proceed this submission ?')) {
        const user = localStorage.getItem('user')
        const data1 = new FormData()
        data1.append('USER_ID', JSON.parse(user).user_id)
        data1.append('COMPANY_PROFILE_ID', this.companyProfileId)

        // COMPANY profile
        data1.append('COMPANY_NAME', this.model.COMPANY_NAME)
        data1.append('COMPANY_REGISTRATION_NO', this.model.COMPANY_REGISTRATION_NO)
        data1.append('NEW_COMPANY_REGISTRATION_NO', this.model.NEW_COMPANY_REGISTRATION_NO)

        // COMPANY address
        data1.append('CENT_ADDR_1', this.model.COMPANY_ADDR_1 ?? '')
        data1.append('CENT_ADDR_2', this.model.COMPANY_ADDR_2 ?? '')
        data1.append('CENT_ADDR_3', this.model.COMPANY_ADDR_3 ?? '')

        data1.append('COMPANY_COUNTRY', this.model.COMPANY_COUNTRY.SETTING_GENERAL_ID)
        data1.append('COUNTRY_CODE', this.model.COMPANY_COUNTRY.SET_CODE)

        data1.append('COMPANY_OFFICE_PHONE_NUMBER', this.model.COMPANY_OFFICE_PHONE_NUMBER)
        data1.append('COMPANY_FAX_NUMBER', this.model.COMPANY_FAX_NUMBER)
        data1.append('COMPANY_EMAIL', this.model.COMPANY_EMAIL)

        this.model.COMPANY_COUNTRY.SET_CODE === 'MY'
          ? this.model.COMPANY_STATE.SET_PARAM !== undefined
            ? data1.append('COMPANY_STATE', this.model.COMPANY_STATE.SETTING_GENERAL_ID)
            : null
          : data1.append('COMPANY_STATE', this.model.COMPANY_STATE ?? '')

        this.model.COMPANY_COUNTRY.SET_CODE === 'MY'
          ? this.model.COMPANY_CITY.SET_CITY_NAME !== undefined
            ? data1.append('COMPANY_CITY', this.model.COMPANY_CITY.SETTING_CITY_ID)
            : null
          : data1.append('COMPANY_CITY', this.model.COMPANY_CITY ?? '')

        this.model.COMPANY_COUNTRY.SET_CODE === 'MY'
          ? this.model.COMPANY_POSTAL.POSTCODE !== undefined
            ? data1.append('COMPANY_POSTAL', this.model.COMPANY_POSTAL.POSTCODE_ID)
            : null
          : data1.append('COMPANY_POSTAL', this.model.COMPANY_POSTAL ?? '')

        // COMPANY owner

        data1.append('COMPANY_OWNER_NAME', this.model.COMPANY_OWNER_NAME)
        data1.append('COMPANY_OWNER_PHONE_NO', this.model.COMPANY_OWNER_PHONE_NO)
        data1.append('COMPANY_OWNER_POSITION', this.model.COMPANY_OWNER_POSITION)
        data1.append('COMPANY_OWNER_EMAIL', this.model.COMPANY_OWNER_EMAIL)

        // company admin name
        data1.append('COMPANY_ADMIN_NAME', this.model.COMPANY_ADMIN_NAME)
        data1.append('COMPANY_ADMIN_CITIZENSHIP', this.model.COMPANY_ADMIN_CITIZENSHIP)
        data1.append('COMPANY_ADMIN_NRIC', this.model.COMPANY_ADMIN_NRIC)
        data1.append('COMPANY_ADMIN_PASSPORT_NO', this.model.COMPANY_ADMIN_PASSPORT_NO)
        if (this.model.COMPANY_ADMIN_PASSPORT_EXPIRY_NO !== null) {
          data1.append('COMPANY_ADMIN_PASSPORT_EXPIRY_NO', moment(this.model.COMPANY_ADMIN_PASSPORT_EXPIRY_NO).format('YYYY-MM-DD'))
        }
        data1.append('COMPANY_ADMIN_PHONENO', this.model.COMPANY_ADMIN_PHONENO)
        data1.append('COMPANY_ADMIN_EMAIL', this.model.COMPANY_ADMIN_EMAIL)
        data1.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS_SUBMITTED)

        try {
          await companyManagementServices.updateCompanyProfile(data1)
          this.$router.push({ name: 'list-company' })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getCountry () {
      this.country = await services06Module0.getSettingGeneral('COUNTRY')
      this.model.COMPANY_COUNTRY = this.country.find(x => x.SETTING_GENERAL_ID === this.companyProfile.COMPANY_COUNTRY)
      this.getState(this.country.SETTING_GENERAL_ID)
    },
    async getCity (data, update = false) {
      this.city = await services06Module0.getCity(data)
      if (!update) {
        this.model.COMPANY_CITY = this.city.find(x => x.SETTING_CITY_ID === this.companyProfile.COMPANY_CITY)
        this.getPostcode(this.model.COMPANY_CITY.SETTING_CITY_ID)
      }
    },
    async getPostcode (data) {
      this.postcode = await services06Module0.getPostcodeByID(data)
      this.model.COMPANY_POSTAL = this.postcode.find(x => x.POSTCODE_ID === this.companyProfile.COMPANY_POSTAL)
    },
    async getCitizenship (data) {
      this.citizenship = await services06Module0.getAllCitizenship(data)
      this.onModelUpdated(this.model.COMPANY_ADMIN_CITIZENSHIP, 'COMPANY_ADMIN_CITIZENSHIP')
    },
    async getState (id) {
      const data = {
        SETTING_GENERAL_ID: id,
        SET_TYPE: 'STATE',
      }
      this.state = await services06Module0.getStateById(data)
      this.model.COMPANY_STATE = this.state.find(x => x.SETTING_GENERAL_ID === this.companyProfile.COMPANY_STATE)
      if (this.model.COMPANY_STATE) {
        this.getCity(this.model.COMPANY_STATE.SETTING_GENERAL_ID)
      }
    },
    validateGoogleMapLink (value) {
      if (value) {
        const Reg = /^http\:\/\/|https\:\/\/|www\.google$/
        if (!value.match(Reg)) {
          return 'Google map link format invalid.'
        }
      }
    },
    async getEditData () {
      this.companyProfileId = localStorage.getItem('edit-company-profile-id')
      try {
        this.companyProfile = await companyManagementServices.getCompanyById({
          COMPANY_PROFILE_ID: this.companyProfileId,
        })
        this.loadDataInModel(this.companyProfile)
        await this.getCountry()
        await this.getCitizenship()
        await this.getActiveInactiveTaskStatus()
      } catch (e) {
        this.$router.push({ name: 'list-company-management' }).catch(() => {})
      }
    },
    loadDataInModel (companyProfile) {
      console.log('loadData', companyProfile)
      for (const key in this.model) {
        this.model[key] = companyProfile[key] ? companyProfile[key] : ''
      }
    },
    onModelUpdated (newVal, schema) {
      console.log(`schema: ${schema}`, 'value:', newVal)
      if (schema === 'COMPANY_ADMIN_CITIZENSHIP') {
        if (newVal === 286) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema === 'COMPANY_COUNTRY') {
        this.model.COMPANY_POSTAL = null
        this.city = []
        this.model.COMPANY_CITY = null
        this.model.COMPANY_STATE = null
      } else if (schema === 'COMPANY_POSTAL') {
        if (this.model.COMPANY_COUNTRY.SET_CODE === 'MY') {
          this.getCity(this.model.COMPANY_POSTAL.SETTING_CITY_ID, true)
        }
      } else if (schema === 'COMPANY_CITY') {
        if (this.model.COMPANY_COUNTRY.SET_CODE === 'MY') {
          this.getPostcode(this.model.COMPANY_CITY.SETTING_CITY_ID)
        }
      } else if (schema === 'COMPANY_STATE') {
        if (this.model.COMPANY_COUNTRY.SET_CODE === 'MY') {
          this.getCity(this.model.COMPANY_STATE.SETTING_GENERAL_ID)
        }
      }
      document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
        element.style.display = 'none'
      })
      document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
        element.style.display = 'none'
      })
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
