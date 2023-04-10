<template>
  <div>
    <va-modal
      v-model="showStaticModal"
      title="A verification link has been sent to your email accaount"
      message="Please check on the link has just been sent to your email account to verify your email and continue the registration process"
      no-dismiss
      cancel-text=""
      ok-text="Close"
      @ok="proceedToLogin"
    />
    <va-card>
      <form @submit.prevent="onSubmit">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="regForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        <br />
        <div class="d-flex justify--center mt-3">
          <va-button type="submit" class="my-0 btncolor">Submit</va-button>
        </div>
      </form>
    </va-card>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { getAllPostal } from '../../../app/module0/services'
import * as services03Module5 from '../../../app/module5/services03'
import * as services06Module1 from "../../../app/module1/services06"
import * as services06Module0 from '../../../app/module0/services06'
import * as servicesModule5 from '../../../app/module5/services'
import moment from "moment";
Vue.use(VueFormGenerator)
export default {
  name: 'signup-others1',
  mounted () {
    this.getUseridSetting()
    this.getAllPostal()
    this.getCountry()
    this.getAllState()
    this.getCityByPostal()
    this.showStaticModal = false
  },
  data () {
    return {
      registrationType: [
        {
          name: '3rd Party / UTMC',
          value: '1',
        },
        { name: 'Training Provider', value: '2' },
      ],
      timestamp: '',
      country: [],
      postcode: [],
      city: [],
      state: [],
      showStaticModal: true,
      citizenship: [
        {
          name: 'Malaysian',
          value: 1,
          selected: true,
        },
        { name: 'Non Malaysian', value: 2 },
      ],
      visible: false,
      visibleIc: true,
      visiblePassport: false,

      model: {
        registrationType: 1,
        applicationType: '',

        userId: '',
        fullName: '',
        icNo: '',
        passport: '',
        passportExpiryDate: null,
        USER_CITIZEN: 1,
        applicantAddress: '',
        applicantAddress2: '',
        applicantAddress3: '',
        applicantPostcode: '',
        applicantCity: '',
        applicantState: '',
        applicantEmail: '',
        country: '',
      },
      formOptions: {
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              // {
              //   type: 'radios',
              //   label: 'Registration Type',
              //   model: 'registrationType',
              //   values: () => {
              //     return this.registrationType
              //   },
              //   styleClasses: 'col-md-12 display-inline',
              //   required: true,
              // },
               {
                type: 'input',
                inputType: 'hidden',
                model: 'registrationType',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'User ID',
                model: 'userId',
                placeholder: 'Please enter user ID',
                required: true,
                validator: ['string', this.validateUserID],
                styleClasses: 'col-md-12',
                // Confused(Tahmina): Need to consult with asyraf!!
                // validator: ["required", this.getUseridSetting],
                // styleClasses: "col-md-12",
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
                model: 'USER_CITIZEN',
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-4 display-inline',
              },
              {
                labels: 'NRIC No',
                model: 'icNo',
                type: 'vfg-the-mask',
                placeholder: 'Enter NRIC No',
                mask: '######-##-####',
                styleClasses: 'col-md-8',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                required: true,
                validator: ["string", this.validateIC],
              },
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
                model: 'country',
                label: 'Country',
                placeholder: 'Select Your Country',
                required: true,
                // validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.country
                },
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "State",
              //   model: "applicantState",
              //   placeholder: "Enter state",
              //   // required: true,
              //   styleClasses: "col-md-6",
              //   disabled: false,
              // },
              {
                type: 'vueMultiSelect',
                model: 'applicantState',
                label: 'State',
                placeholder: 'Select Your state',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'SETTING_GENERAL_ID',
                  label: 'SET_PARAM',
                  searchable: true,
                },
                // visible: (model, field, form) => {
                //   return model.DIST_BIZ_COUNTRY.SET_CODE == "MY";
                // },
                values: (model, schema) => {
                  return this.state
                },
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
                  key: 'SETTING_CITY_ID',
                  label: 'SET_CITY_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.city
                },
                // disabled: (model, schema) => {
                //   if (this.model.applicantPostcode) {
                //     return false
                //   } else {
                //     return true
                //   }
                // },
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
                  key: 'SETTING_POSTCODE_ID',
                  label: 'POSTCODE_NO',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode
                },
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Company Email',
                model: 'applicantEmail',
                placeholder: 'Enter email address',
                required: true,
                validator: ["string", this.validateEmail],
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    proceedToLogin () {
      this.$router.push('/auth-others/login-others')
    },
    showOverlay (show) {
      Event.$emit('signup-others:overlay', show)
    },
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },
    async getUseridSetting () {
      const response = await services06Module0.getUserIdSetting(0)
      this.useridSetting = response
    },
    validateExpiryDate (value) {
      if (value != null) {
        const today = moment().unix();
        // date expiry
        const expiryDate = moment(this.model.passportExpiryDate).unix();
        // compare
        if (expiryDate < today) {
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

    async validateIC(value) {
      if (value.length != 12) {
        return ["NRIC number must contain 12 digit"];
      } else {
        const response = await servicesModule5.checkDuplicateIC(value);
        return response.message;
      }
    },
    async validateEmail(value) {
     //  console.log("Email");
      const response = await servicesModule5.checkDuplicateEmail(value);
      return response.message;
    },
    async validateUserID(value) {
      if (value === '') {
        return
      }
      const idlength = value.length
      if (idlength >= 1) {
        if (
          idlength < this.useridSetting.MIN_LENGTH ||
          idlength > this.useridSetting.MAX_LENGTH
        ) {
          if (idlength < this.useridSetting.MIN_LENGTH) {
            return `USER ID MIN LENGTH MUST BE ${this.useridSetting.MIN_LENGTH}`
          }
          if (idlength > this.useridSetting.MAX_LENGTH) {
            return `USER ID MAX LENGTH MUST BE ${this.useridSetting.MAX_LENGTH}`
          }
          return
        }
        if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          return
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return "User ID must contain at least one uppercase letter, one lower case letter, one number and underscore/'_'"
          }
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return "User ID must contain at least one uppercase letter, one lower case letter, and underscore/'_'."
          }
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return 'User ID must contain at least one uppercase letter and one lower case letter'
          }
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return 'User ID must contain at least one number, one uppercase letter and one lower case letter'
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return 'User ID must contain at least one number and one letter'
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return "User ID must contain at least one number, one letter and one and underscore/'_'."
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*?[_])([a-zA-Z0-9_]+)$/
          if (!expression.test(value)) {
            return 'User ID must contain at least one special character'
          }
        }

        const response = await servicesModule5.checkDuplicateUserID(value)
        if (response) {
          return response.message
        }
      }
    },
    async getAllPostal () {
      const response = await servicesModule5.getAllPostcodeList()
      this.postcode = response
    },
    async getCityByPostal () {
      const response = await servicesModule5.getAllCityList()
      this.city = response
    },
    // async getStateByPostal () {
    //   const response = await services00Module5.getAllStateList()
    //   this.model.applicantState = response.SET_PARAM
    //   // this.city = response;
    // },

    async getAllState () {
      const response = await servicesModule5.getAllStateList()
      this.state = response
    },
    async getCountry () {
      const response = await servicesModule5.getAllCountryList()
      //console.log("Country=",response);
      this.country = response
       this.model.country = {
          SETTING_GENERAL_ID: 33,
            SET_PARAM: 'MALAYSIA',
      };
    },
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      if (schema == 'USER_CITIZEN') {
        if (newVal == 1) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema == 'fullName') {
        this.model.fullName = String(newVal).toUpperCase()
      }
    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.USER_EMAIL) {
        return ["Email do not match"];
      }
    },
    onSubmit: async function () {
      const vm = this
      const response = await this.validateRegisterForm()
      if (response) {
      //  if (this.model.citizenship == '1') {
         
            const data = new FormData()
            data.append('TP_USER_TYPE', this.model.registrationType)
            data.append('TP_USER_ID', this.model.userId)
            data.append('TP_USER_FNAME', this.model.fullName)
            data.append('TP_NRIC_NUMBER', this.model.icNo)
            data.append('TP_USER_PASSPORT', this.model.passport)
              if (this.model.passportExpiryDate != null) {
          data.append(
            'TP_USER_PASSPORT_EXPIRY',
            moment(this.model.passportExpiryDate).format('YYYY-MM-DD'),
          )
        }
           // data.append('TP_USER_PASSPORT_EXPIRY', this.model.passportExpiryDate)
            data.append('TP_USER_CITIZEN', this.model.USER_CITIZEN)
            data.append('TP_USER_NRIC', this.model.icNo)
            data.append('TP_USER_ADDR1', this.model.applicantAddress)
            data.append('TP_USER_ADDR2', this.model.applicantAddress2)
            data.append('TP_USER_ADDR3', this.model.applicantAddress3)
            data.append('TP_USER_POSTAL', this.model.applicantPostcode.SETTING_POSTCODE_ID)
            data.append('TP_USER_CITY', this.model.applicantCity.SETTING_CITY_ID)
            data.append('TP_USER_STATE', this.model.applicantState.SETTING_GENERAL_ID)
            data.append('TP_USER_COUNTRY', this.model.country.SETTING_GENERAL_ID)
            data.append('TP_USER_EMAIL', this.model.applicantEmail)
            data.append('TP_USER_STATUS', '0')
            console.log(data)
            console.log(response)
            try {
              vm.showOverlay(true)
              const response = await services03Module5
                .createOtherUser(data)
                .then(function (response) {
                 // console.log(response)
                  vm.showOverlay(false)
                  vm.showStaticModal = true
                   this.$router.push('/auth-others/login-others');
                })
            } catch (error) {
              console.log(error)
            }
        
        // } else {
        // }
      }
    },
  },
  computed: {
    // formReady() {
    //   return !(
    //     this.emailErrors.length ||
    //     this.passwordErrors.length ||
    //     this.agreedToTermsErrors.length
    //   );
    // }
  },
}
</script>

<style lang="scss" >
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.vdp-datepicker__calendar{
  margin-left:-105px !important;
}
</style>
<style scoped>
.widthModal {
  width: 50%;
}

</style>
