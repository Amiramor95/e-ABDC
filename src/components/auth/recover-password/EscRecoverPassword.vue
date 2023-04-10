<template>
  <!-- <form @submit.prevent="onsubmit" class="login"> -->
  <div>
    <div class="row mb-2">
      <vue-form-generator
        :model="model"
        :schema="schema"
        :options="formOptions"
        ref="recoverPasswordForm"
      >
      </vue-form-generator>
    </div>
    <div class="row justify--center">
      <va-button v-on:click="recoverPass" class="my-0" :disabled='disabled'
      >Recover Password</va-button
      >
    </div>
  </div>
  <!-- </form> -->
</template>
<script>
import * as services06Module1 from '../../../app/module1/services06'
import * as services06Module0 from '../../../app/module0/services06'
import * as examCentreProviderManagementServices
from '../../../app/exam-centre-provider/services/examCentreProviderManagementServices'
import jQuery from 'jquery'
export default {
  // name: "recover-password",
  // props: {
  //   USER_ID: String
  // },
  mounted () {
    this.USER_ID = localStorage.getItem('esc-recover-password')
    this.securityQuestionList()
    this.getPasswordSetting()
    jQuery('#countdownclass').hide()
  },
  data () {
    return {
      USER_ID: '',
      maxLength: 5,
      disabled: false,
      email: '',
      securityQuestion: [],
      passwordSetting: '',
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'password',
                label: 'New Password',
                model: 'USER_PASSWORD',
                placeholder: 'Please enter password',
                required: true,
                validator: ['string', this.validatePassword],
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Confirm Password',
                model: 'CONFIRM_PASSWORD',
                placeholder: 'Confirm password',
                required: true,
                styleClasses: 'col-md-12',
                validator: ['string', this.isEqualTo],
              },
              {
                labels: 'Mobile Phone Number',
                model: 'PHONE_NO',
                type: 'vfg-the-mask',
                placeholder: 'Enter telephone number',
                // mask: "######-##-####",
                mask: '0##-########',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
              },
              {
                labels: 'Request TAC',
                model: 'SMS_TAC_NUMBER',
                type: 'vfg-custom-Tacinput',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-4 tac_row',
                required: true,
                validator: ['string', this.validateTAC],
                hint: '<span id="countdownclass">Please wait for 1 Minutes to request new TAC</span>',
              },
              {
                type: 'vueMultiSelect',
                model: 'USER_SECURITY_QUESTION',
                label: 'Choose Security Question',
                placeholder: 'Select security question ',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  key: 'SECURITY_QUESTION',
                  label: 'SECURITY_QUESTION',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.securityQuestion
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'USER_SECURITY_ANSWER',
                label: 'Security Answer',
                placeholder: 'Answer',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
      model: {
        USER_PASSWORD: '',
        CONFIRM_PASSWORD: '',
        PHONE_NO: '',
        SMS_TAC_NUMBER: '',
        USER_SECURITY_QUESTION: '',
        USER_SECURITY_ANSWER: '',
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    }
  },
  methods: {
    async getPasswordSetting () {
      console.log('get pass sett')
      const response = await services06Module0.getPasswordSetting(0)
      console.log('get pass sett2=', response)
      this.passwordSetting = response
    },
    async validateTAC (value) {
      var PHONENO = '60' + this.model.PHONE_NO
      var isLogin = 0
      if (value.length >= 6) {
        const response = await services06Module0.verifyTACESC(value, PHONENO)
        console.log('response=', response)
        if (response != 'TAC code successfully verified.') {
          return response
        }
      }
    },

    validatePassword (value) {
      if (value === '') {
        return
      }
      const idlength = value.length
      if (idlength >= 1) {
        if (
          idlength < this.passwordSetting.MIN_LENGTH ||
          idlength > this.passwordSetting.MAX_LENGTH
        ) {
          if (idlength < this.passwordSetting.MIN_LENGTH) {
            return [
              `PASSWORD MIN LENGTH MUST BE ${this.passwordSetting.MIN_LENGTH}`,
            ]
          }
          if (idlength > this.passwordSetting.MAX_LENGTH) {
            return [
              `PASSWORD MAX LENGTH MUST BE ${this.passwordSetting.MAX_LENGTH}`,
            ]
          }
          return
        }
        if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return [
              'Password must contain at least one uppercase letter, one lower case letter, one number and one character',
            ]
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return [
              'Password must contain at least one uppercase letter, one lower case letter, and one character',
            ]
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return [
              'Password must contain at least one uppercase letter and one lower case letter',
            ]
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          console.log('Test1')
          const expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return [
              'Password must contain at least one number, one uppercase letter and one lower case letter',
            ]
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return ['Password must contain at least one number and one letter']
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          const expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return [
              'Password must contain at least one number, one letter and one special character',
            ]
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          const expression = /^([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return ['']
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          const expression = /^(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
          if (!expression.test(value)) {
            return ['Password must contain at least one special character']
          }
        }
      }
    },
    isEqualTo (value, field, model) {
      console.log(value)
      if (value != this.model.USER_PASSWORD) {
        return ['Password do not match']
      }
    },
    async securityQuestionList () {
      console.log('sec quest')
      const response = await services06Module1.securityQuestion()
      this.securityQuestion = response
      // alert(JSON.stringify(response));
      console.log('sec quest last=', this.securityQuestion)
    },
    async recoverPass () {
      if (this.$refs.recoverPasswordForm.validate()) {
        const data = new FormData()
        // alert("this is id : " + this.USER_ID);
        data.append('USER_ID', JSON.parse(this.USER_ID))
        data.append('USER_PASSWORD', this.model.USER_PASSWORD)
        data.append('USER_MOBILE_NUM', 60 + JSON.parse(this.model.PHONE_NO))
        data.append('SMS_TAC_NUMBER', JSON.parse(this.model.SMS_TAC_NUMBER))
        data.append(
          'USER_SECURITY_QUESTION_ID',
          JSON.parse(this.model.USER_SECURITY_QUESTION.SECURITY_ID),
        )
        data.append('USER_SECURITY_ANSWER', this.model.USER_SECURITY_ANSWER)
        data.append('USER_ROLES', localStorage.getItem('esc-role'))
        data.append('_method', 'PUT')
        this.disabled = true
        const response = await examCentreProviderManagementServices.updateSelfReg(data)
        console.log(response.status)
        alert(
          'Password reset is success, Please log in using the new password',
        )
        this.disabled = false
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style lang="scss">
.text-color {
  color: white;
}
#countdownclass{
color:red;
font-size: 12px;
font-weight: 600;
}
.tac_row input{
width: 90% !important;
}
</style>
