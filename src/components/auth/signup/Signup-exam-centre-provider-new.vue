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

        <div class="d-flex justify--center mt-3">
          <va-button type="submit" class="my-0">Submit</va-button>
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
import * as services06Module0 from '../../../app/module0/services06'
import moment from 'moment'
import * as examCentreProviderManagementServices
from '../../../app/exam-centre-provider/services/examCentreProviderManagementServices'
Vue.use(VueFormGenerator)
export default {
  name: 'signup',
  mounted () {
    this.getUseridSetting()
    this.showStaticModal = false
  },
  data () {
    return {
      useridSetting: '',
      showStaticModal: true,
      timestamp: '',
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      citizenship: [
        {
          name: 'Malaysian',
          value: 286,
          selected: true,
        },
        { name: 'Non Malaysian', value: 287 },
      ],
      model: {
        USER_USER_ID: '',
        USER_CITIZEN: 286,
        USER_NRIC: '',
        USER_PASS_NUM: '',
        USER_PASS_EXP: null,
        USER_EMAIL: '',
        confirmEmail: '',
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
        // validateAfterLoad: true,
      },

      email: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],

      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'User ID',
                model: 'USER_USER_ID',
                placeholder: 'Please enter user ID',
                required: true,
                validator: ['string', this.validateUserID],
                styleClasses: 'col-md-12',
                color: 'white',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Full Name (as per NRIC)',
                model: 'USER_NAME',
                placeholder: 'Please enter full name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'radios',
                label: 'Citizenship',
                model: 'USER_CITIZEN',
                required: true,
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-6 display-inline white',
              },
              {
                labels: 'NRIC Number',
                model: 'USER_NRIC',
                type: 'vfg-the-mask',
                placeholder: 'Enter NRIC Number',
                mask: '######-##-####',
                styleClasses: 'col-md-6 white',
                visible: (model, field, form) => {
                  return this.visibleIc
                },
                required: true,
                validator: ['string', this.validateIC],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Passport Number',
                model: 'USER_PASS_NUM',
                placeholder: 'Enter Passport Number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 white',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
              },
              {
                labels: 'Passport Expiry Date',
                type: 'vfg-functional-date',
                placeholder: 'Passport expiry date',
                model: 'USER_PASS_EXP',
                noLabel: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-12 white',
                visible: (model, field, form) => {
                  return this.visiblePassport
                },
                required: true,
                validator: ['required', this.validateExpiryDate],
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                model: 'USER_EMAIL',
                placeholder: 'Enter email address',
                required: true,
                validator: ['string', this.validateEmail],
                styleClasses: 'col-md-12 white',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Confirm Email',
                model: 'confirmEmail',
                placeholder: 'Confirm email address',
                required: true,
                validator: ['string', this.isEqualTo],
                styleClasses: 'col-md-12 white',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    proceedToLogin () {
     // this.$router.go(-1)
      this.$router.push('/auth-others/login-others');
    },
    showOverlay (show) {
      Event.$emit('signup-esc:overlay', show)
    },
    async getUseridSetting () {
      const response = await services06Module0.getUserIdSetting(0)
      console.log('USERIDSEtting=', response)
      this.useridSetting = response
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
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      if (schema == 'USER_CITIZEN') {
        if (newVal == 286) {
          this.visiblePassport = false
          this.visibleIc = true
        } else {
          this.visiblePassport = true
          this.visibleIc = false
        }
      } else if (schema == 'USER_NAME') {
        this.model.USER_NAME = String(newVal).toUpperCase()
      }
    },
    async validateIC (value) {
      if (value.length != 12) {
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
      const response = await examCentreProviderManagementServices.checkDuplicateEmail({
        USER_EMAIL: value,
      })
      return response.message
    },
    async validateUserID (value) {
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

        const response = await examCentreProviderManagementServices.checkDuplicateUserID({
          USER_USER_ID: value,
        })
        if (response) {
          return response.message
        }
      }
    },
    isEqualTo (value, field, model) {
      console.log(value)
      if (value != this.model.USER_EMAIL) {
        return ['Email do not match']
      }
    },
    onSubmit: async function () {
      if (document.querySelectorAll('.errors').length) {
        alert('Please fill the form properly')
        return
      }
      const vm = this
      if (this.$refs.regForm.validate()) {
        const data = new FormData()
        data.append('USER_NAME', this.model.USER_NAME)
        data.append('USER_USER_ID', this.model.USER_USER_ID)
        data.append('USER_CITIZEN', this.model.USER_CITIZEN)
        data.append('USER_NRIC', this.model.USER_NRIC)
        data.append('USER_PASS_NUM', this.model.USER_PASS_NUM)
        data.append('USER_ISLOGIN', 0)
        data.append('USER_ISADMIN', 1)
        if (this.model.USER_PASS_EXP != null) {
          data.append(
            'USER_PASS_EXP',
            moment(this.model.USER_PASS_EXP).format('YYYY-MM-DD'),
          )
        }
        data.append('USER_EMAIL', this.model.USER_EMAIL)

        try {
          vm.showOverlay(true)
          await examCentreProviderManagementServices
            .createEscUser(data)
            .then(function (response) {
              console.log(response)
              vm.showOverlay(false)
              vm.showStaticModal = true
            }).catch((error) => {
              this.$toasts.failed('Registration Failed.' + error, {
                width: '400px',
                position: 'bottom-right',
                padding: '1rem',
              })
            })
        } catch (error) {
          return
        }
        this.model = {
          USER_USER_ID: '',
          USER_CITIZEN: '1',
          USER_NRIC: '',
          USER_PASS_NUM: '',
          USER_PASS_EXP: null,
          USER_EMAIL: '',
          confirmEmail: '',
        }
        // this.$router.go(-1);
        this.$router.push('/auth-others-new/login-others');
      } else {
        this.$toasts.failed('Registration Failed.', {
          width: '400px',
          position: 'bottom-right',
          padding: '1rem',
        })
      }
    },
  },
  computed: {
    formReady () {
      return !(
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.agreedToTermsErrors.length
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>
<style scoped>
.widthModal {
  width: 50%;
}
</style>
