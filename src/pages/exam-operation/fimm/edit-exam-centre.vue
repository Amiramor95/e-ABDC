/* eslint-disable no-debugger, no-console */
<template>
  <va-card>
    <h4 slot="header" class="card-title">
      Edit Centre Details
    </h4>
    <br/>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="firstTabSchema"
      @model-updated="onModelUpdated"
      ref="firstTabForm"
    >
    </vue-form-generator>
    </br>
    <div><h5>Centre Address</h5></div>
    <vue-form-generator
      :model="model"
      :options="formOptions"
      :schema="firstTabSchema1"
      @model-updated="onModelUpdated"
      ref="firstTabForm1"
    >
    </vue-form-generator>
    </br>
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
        class="btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
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
import * as services06Module0 from '../../../app/module0/services06'
import { debounce } from 'lodash'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as servicesModule0 from '../../../app/module0/services'
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'

Vue.use(VueFormGenerator)
// register globally
Vue.component('multiselect', Multiselect)
export default {
  components: {
  },
  mounted () {
    // vfg mask unncesseary label while reloading
    document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
      element.style.display = 'none'
    })
    document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
      element.style.display = 'none'
    })

    this.capitalize()
    this.getEditData()
    // this.getActiveInactiveTaskStatus()
    // this.getCountry()
    // this.getDefaultCountry()
  },
  created () {
    this.capitalize()
  },
  data () {
    return {
      centreId: '',
      centreDetails: '',
      centreMode: [
        { value: 1, name: 'Virtual' },
        { value: 2, name: 'Physical' },
      ],
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
      state: [],
      country: [],
      postcode: [],
      city: [],
      status: [],
      citizenship: [],
      model: {
        CENTRE_NAME: '',
        CENTRE_MODE: '',
        CENTRE_PHONE_EXTENSION: '',
        CENTRE_OFFICE_PHONE_NUMBER: '',
        OPERATIONAL_CAPACITY: '',
        MAXIMUM_CAPACITY: '',
        CENTRE_FAX_NUMBER: '',
        GOOGLE_MAP_LINK: '',
        CENT_ADDR_1: '',
        CENT_ADDR_2: '',
        CENT_ADDR_3: '',
        CENTRE_COUNTRY: '',
        CENTRE_POSTAL: '',
        CENTRE_CITY: '',
        CENTRE_STATE: '',
        STATUS: '',
        DAY_OPERATING: [],
      },
      formOptions: {
        validateAfterChanged: true,
      },
      firstTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Centre Name',
                model: 'CENTRE_NAME',
                placeholder: 'Enter centre name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'radios',
                label: 'Centre Mode',
                model: 'CENTRE_MODE',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                values: (model, schema) => {
                  return this.centreMode
                },
              },
            ],
          },
        ],
      },
      firstTabSchema1: {
        styleClasses: 'row',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'CENT_ADDR_1',
            placeholder: 'Enter street address',
            hint: 'Street Address',
            required: true,
            validator: ['required', 'string'],
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'CENT_ADDR_2',
            placeholder: 'ENTER STREET ADDRESS',
            hint: 'Street Address line 2',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'CENT_ADDR_3',
            placeholder: 'Enter street address',
            hint: 'Street Address line 3',
            styleClasses: 'col-md-12',
          },
          {
            type: 'vueMultiSelect',
            model: 'CENTRE_COUNTRY',
            label: 'Country',
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
            model: 'CENTRE_STATE',
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
            model: 'CENTRE_CITY',
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
            model: 'CENTRE_POSTAL',
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
            type: 'input',
            inputType: 'text',
            label: 'Google Map Link (URL)',
            model: 'GOOGLE_MAP_LINK',
            placeholder: 'ENTER GOOGLE MAP LINK',
            required: false,
            validator: ['string', this.validateGoogleMapLink],
            styleClasses: 'col-md-12',
          },
          {
            label: 'OFFICE PHONE NUMBER',
            model: 'CENTRE_OFFICE_PHONE_NUMBER',
            type: 'vfg-the-mask',
            placeholder: 'Enter phone number',
            mask: '0#-########',
            styleClasses: 'col-md-6',
            required: true,
            validator: 'string',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Extension Number',
            model: 'CENTRE_PHONE_EXTENSION',
            placeholder: 'Enter extension number',
            required: false,
            validator: ['number', this.validateExtensionNumber],
            styleClasses: 'col-md-6',
          },
          {
            label: 'FAX NUMBER',
            model: 'CENTRE_FAX_NUMBER',
            type: 'vfg-the-mask2',
            placeholder: 'Enter fax number',
            mask: '0#-########',
            styleClasses: 'col-md-6',
            required: false,
            validator: 'string',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Maximum Capacity',
            model: 'MAXIMUM_CAPACITY',
            placeholder: 'Enter maximum capacity',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Operational Capacity',
            model: 'OPERATIONAL_CAPACITY',
            placeholder: 'Enter operational capacity',
            required: true,
            validator: ['number', this.validateOperationalCapacity],
            styleClasses: 'col-md-6',
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Select Status',
            model: 'STATUS',
            label: 'Status',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-12',
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
            type: 'checklist',
            label: 'Day Operating',
            model: 'DAY_OPERATING',
            listBox: true,
            required: true,
            styleClasses: 'col-md-12',
            values: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
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
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),
    create () {
      this.$router.push({ name: 'create-exam-id' })
    },
    navigateToList () {
      this.$router.push({ name: 'list-centre-management' })
    },
    validateCentreForm () {
      return (this.$refs.firstTabForm.validate() &&
        this.$refs.firstTabForm1.validate())
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
      this.model.STATUS = this.status.find(x => x.TS_ID === this.centreDetails.STATUS)
    },
    async getCountry () {
      this.country = await services06Module0.getSettingGeneral('COUNTRY')
      this.model.CENTRE_COUNTRY = this.country.find(x => x.SETTING_GENERAL_ID === this.centreDetails.CENTRE_COUNTRY)
      this.getState(this.country.SETTING_GENERAL_ID)
    },
    async getCity (data, update = false) {
      this.city = await services06Module0.getCity(data)
      if (!update) {
        this.model.CENTRE_CITY = this.city.find(x => x.SETTING_CITY_ID === this.centreDetails.CENTRE_CITY)
        this.getPostcode(this.model.CENTRE_CITY.SETTING_CITY_ID)
      }
    },
    async getPostcode (data) {
      this.postcode = await services06Module0.getPostcodeByID(data)
      this.model.CENTRE_POSTAL = this.postcode.find(x => x.POSTCODE_ID === this.centreDetails.CENTRE_POSTAL)
    },
    async getState (id) {
      const data = {
        SETTING_GENERAL_ID: id,
        SET_TYPE: 'STATE',
      }
      this.state = await services06Module0.getStateById(data)
      this.model.CENTRE_STATE = this.state.find(x => x.SETTING_GENERAL_ID === this.centreDetails.CENTRE_STATE)
      if (this.model.CENTRE_STATE) {
        this.getCity(this.model.CENTRE_STATE.SETTING_GENERAL_ID)
      }
    },
    async getDefaultCountry () {
      try {
        this.model.CENTRE_COUNTRY = await services06Module0.getDefaultCountry()
      } catch (error) {
        // console.log(error);
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
    validateOperationalCapacity (value) {
      if (value && parseInt(value) > parseInt(this.model.MAXIMUM_CAPACITY)) {
        return ['Operational capacity cannot be more than maximum capacity.']
      }
    },
    validateExtensionNumber (value) {
      if (value && value.toString().length > 50) {
        return ['Maxmimum 50 digits allowed.']
      }
    },
    async getEditData () {
      this.centreId = localStorage.getItem('CENTRE_ID')
      try {
        this.centreDetails = await centreManagementServices.getCentreById({
          CENTRE_ID: this.centreId,
        })
        this.loadDataInModel(this.centreDetails)
        await this.getCountry()
        await this.getActiveInactiveTaskStatus()
        this.onModelUpdated(this.model.CENTRE_MODE, 'CENTRE_MODE')
      } catch (e) {
        this.$router.push({ name: 'list-company-management' }).catch(() => {})
      }
    },
    loadDataInModel (centre) {
      for (const key in this.model) {
        this.model[key] = centre[key] ? centre[key] : ''
      }
      this.model.OPERATIONAL_CAPACITY = parseInt(this.model.OPERATIONAL_CAPACITY)
      this.model.MAXIMUM_CAPACITY = parseInt(this.model.MAXIMUM_CAPACITY)
    },
    onModelUpdated (newVal, schema) {
      console.log(`schema: ${schema}`, 'value:', newVal)
      if (schema === 'CENTRE_MODE') {
        if (newVal === 1) {
          this.firstTabSchema1.fields[0].required = false
          for (let i = 3; i < 8; i++) {
            this.firstTabSchema1.fields[i].required = false
          }
        } else {
          this.firstTabSchema1.fields[0].required = true
          for (let i = 3; i < 8; i++) {
            this.firstTabSchema1.fields[i].required = true
          }
        }
      } else if (schema === 'CENTRE_COUNTRY') {
        this.model.CENTRE_POSTAL = null
        this.city = []
        this.model.CENTRE_CITY = null
        this.model.CENTRE_STATE = null
      } else if (schema === 'CENTRE_POSTAL') {
        if (this.model.CENTRE_COUNTRY.SET_CODE === 'MY') {
          this.getCity(this.model.CENTRE_POSTAL.SETTING_CITY_ID, true)
        }
      } else if (schema === 'CENTRE_CITY') {
        if (this.model.CENTRE_COUNTRY.SET_CODE === 'MY') {
          this.getPostcode(this.model.CENTRE_CITY.SETTING_CITY_ID)
        }
      } else if (schema === 'CENTRE_STATE') {
        if (this.model.CENTRE_COUNTRY.SET_CODE === 'MY') {
          this.getCity(this.model.CENTRE_STATE.SETTING_GENERAL_ID)
        }
      }
      // document.querySelectorAll('.field-vfg-the-mask .width label').forEach((element) => {
      //   element.style.display = 'none'
      // })
      // document.querySelectorAll('.field-vfg-the-mask2 .width label').forEach((element) => {
      //   element.style.display = 'none'
      // })
    },
    async submit () {
      const response = await this.validateCentreForm()
      if (parseInt(this.model.OPERATIONAL_CAPACITY) > parseInt(this.model.MAXIMUM_CAPACITY)) {
        alert('Operational capacity cannot be more than maximum capacity.')
        return
      }
      if (response && confirm('Are you sure you want to update this submission ?')) {
        const user = localStorage.getItem('user')
        const data1 = new FormData()
        data1.append('USER_ID', JSON.parse(user).user_id)

        // centre registration
        data1.append('CENTRE_NAME', this.model.CENTRE_NAME)
        data1.append('CENTRE_MODE', this.model.CENTRE_MODE)

        // centre address
        data1.append('CENT_ADDR_1', this.model.CENT_ADDR_1 ?? '')
        data1.append('CENT_ADDR_2', this.model.CENT_ADDR_2 ?? '')
        data1.append('CENT_ADDR_3', this.model.CENT_ADDR_3 ?? '')

        data1.append('CENTRE_COUNTRY', this.model.CENTRE_COUNTRY.SETTING_GENERAL_ID)
        data1.append('COUNTRY_CODE', this.model.CENTRE_COUNTRY.SET_CODE)

        data1.append('GOOGLE_MAP_LINK', this.model.GOOGLE_MAP_LINK ?? '')
        data1.append('OFFICE_PHONE_NUMBER', this.model.CENTRE_OFFICE_PHONE_NUMBER ?? '')
        data1.append('CENTRE_PHONE_EXTENSION', this.model.CENTRE_PHONE_EXTENSION ?? '')
        data1.append('CENTRE_FAX_NUMBER', this.model.CENTRE_FAX_NUMBER ?? '')

        // const data = JSON.parse(localStorage.getItem('view-exam-centre-list'))
        // data1.append('COMPANY_ID', data.COMPANY_PROFILE_ID)

        data1.append('PUBLISH_STATUS', TaskStatusConstants.PUBLISH_STATUS_SUBMITTED)
        data1.append('TS_ID', TaskStatusConstants.NEW_ENTRY)

        this.model.CENTRE_COUNTRY.SET_CODE === 'MY'
          ? (this.model.CENTRE_STATE && this.model.CENTRE_STATE.SET_PARAM !== undefined)
            ? data1.append('CENTRE_STATE', this.model.CENTRE_STATE.SETTING_GENERAL_ID)
            : null
          : data1.append('CENTRE_STATE', this.model.CENTRE_STATE ?? '')

        this.model.CENTRE_COUNTRY.SET_CODE === 'MY'
          ? (this.model.CENTRE_CITY && this.model.CENTRE_CITY.SET_CITY_NAME !== undefined)
            ? data1.append('CENTRE_CITY', this.model.CENTRE_CITY.SETTING_CITY_ID)
            : null
          : data1.append('CENTRE_CITY', this.model.CENTRE_CITY ?? '')

        this.model.CENTRE_COUNTRY.SET_CODE === 'MY'
          ? (this.model.CENTRE_POSTAL && this.model.CENTRE_POSTAL.POSTCODE !== undefined)
            ? data1.append('CENTRE_POSTAL', this.model.CENTRE_POSTAL.POSTCODE_ID)
            : null
          : data1.append('CENTRE_POSTAL', this.model.CENTRE_POSTAL ?? '')

        data1.append('OPERATIONAL_CAPACITY', this.model.OPERATIONAL_CAPACITY)
        data1.append('MAXIMUM_CAPACITY', this.model.MAXIMUM_CAPACITY)
        data1.append('STATUS', this.model.STATUS.TS_ID)
        data1.append('DAY_OPERATING', this.model.DAY_OPERATING)

        data1.append('UPDATE_CENTRE', this.centreId)

        try {
          await centreManagementServices.createNewCenter(data1)
          this.$router.go(-1)
        } catch (error) {
          console.log(error)
        }
      }
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
