<template>
  <div id="layoutAuthentication_content">
    <main>
      <div class="container">
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <va-card>
                <h4 slot="header" class="card-title">User Self Registration ( Member Company)</h4>
                <form>
                  <vue-form-generator
                    tag="div"
                    :schema="schema"
                    :model="model"
                    :options="formOptions"
                    @model-updated="onModelUpdated"
                    ref="RegForm" >
                  </vue-form-generator>

                  <button type="submit" class="ml-2 btn btn-primary btn-fill float-right btn-md"
                    @click.prevent="submit">
                    <i class="fa fa-paper-plane" /> &nbsp; Submit
                  </button>

                </form>
              </va-card>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import 'vue-form-generator/dist/vfg.css'
import * as servicesModule1 from '../../../app/module1/services03.js'
import * as servicesModule0 from '../../../app/module0/services.js'

export default {

  // METHOD
  methods: {
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      // eslint-disable-next-line eqeqeq
      if (schema == 'citizenship' && newVal == 'Malaysian') {
        this.visibleNRICNo = true
        this.visiblePassportNo = false
      // eslint-disable-next-line eqeqeq
      } else if (schema == 'citizenship' && newVal == 'Non-Malaysian') {
        this.visibleNRICNo = false
        this.visiblePassportNo = true
      }
    },

    validateRegForm () {
      return this.$refs.RegForm.validate()
    },
    submit: async function () {
      const response = await this.validateRegForm()
      if (response) {
        //
      } else { }
    },
  },

  // DATA SCHEMA
  data () {
    return {

      // VISIBILITY
      visiblePassportNo: false,
      visibleNRICNo: true,

      // RADIO BUTTON
      citizenshipType: [
        { value: 'Malaysian', name: 'Malaysian' },
        { value: 'Non-Malaysian', name: 'Non-Malaysian' },
      ],
      companyType: [
        { id: '1', name: 'IUTA' },
        { id: '2', name: 'IPRA' },
        { id: '3', name: 'CPRA' },
        { id: '4', name: 'CUTA' },
        { id: '5', name: 'IUTMC' },
        { id: '6', name: 'PRP' },
      ],
      companyName: [
        { id: '1', name: 'A.D.Fincancia Sdn. Bhd.' },
        { id: '2', name: 'Affin Bank Berhad' },
        { id: '3', name: 'Affin Hwang Asset Management Berhad' },
        { id: '4', name: 'AIA Pension and Asset Management Sdn. Bhd.' },
      ],
      companyBranch: [
        { id: '1', name: 'HQ' },
        { id: '2', name: 'Selangor' },
        { id: '3', name: 'Perak' },
        { id: '4', name: 'Melaka' },
      ],

      // DATA MODEL
      model: {
        name: '',
        citizenship: 'Malaysian',
        nric: '',
        passportNo: '',
        email: '',
        phoneNo: '',

      },

      // FORM
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            placeholder: 'Enter Name',
            required: true,
            validator: 'string',
          },
          {
            type: 'radios',
            label: 'Citizenship',
            model: 'citizenship',
            values: () => { return this.citizenshipType },
            styleClasses: 'display-inline',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NRIC No',
            model: 'nric',
            placeholder: 'Enter NRIC No',
            required: true,
            validator: 'string',
            visible: (model, field, form) => { return this.visibleNRICNo },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Passport No',
            model: 'passportNo',
            placeholder: 'Enter Passport No',
            required: true,
            validator: 'string',
            visible: (model, field, form) => { return this.visiblePassportNo },
          },
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email',
            placeholder: 'Enter Email Address',
            required: true,
            validator: 'string',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Phone No',
            model: 'phoneNo',
            placeholder: 'Enter Phone No',
            required: true,
            validator: 'number',
          },
          {
            type: 'vueMultiSelect',
            model: 'companyType',
            label: 'Company Type',
            placeholder: 'Select Company Type',
            required: true,
            validator: 'required',
            selectOptions: { multiple: false, key: 'name', label: 'name', searchable: true },
            values: (model, schema) => { return this.companyType },
          },
          {
            type: 'vueMultiSelect',
            model: 'companyName',
            label: 'Company Name',
            placeholder: 'Select Company Name',
            required: true,
            validator: 'required',
            selectOptions: { multiple: false, key: 'name', label: 'name', searchable: true },
            values: (model, schema) => { return this.companyName },
          },
          {
            type: 'vueMultiSelect',
            model: 'companyBranch',
            label: 'Company Branch',
            placeholder: 'Select Company Branch',
            required: true,
            validator: 'required',
            selectOptions: { multiple: false, key: 'name', label: 'name', searchable: true },
            values: (model, schema) => { return this.companyBranch },
          },

        ],

      },

      // FORM OPTION
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

    }
  },
}
</script>
