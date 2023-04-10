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
      <va-button v-on:click="recoverPass" class="my-0"
        >Recover Password</va-button
      >
    </div>
  </div>
  <!-- </form> -->
</template>

<script>
import Vue from "vue";
import * as servicesModule5 from "../../../app/module5/services";
import * as services06Module0 from "../../../app/module0/services06";
import * as services06Module1 from "../../../app/module1/services06";
import jQuery from "jquery";
export default {
  // name: "recover-password",
  // props: {
  //   USER_ID: String
  // },
  mounted() {
    this.USER_ID = localStorage.getItem("recover-password");
    this.securityQuestionList();
    this.getPasswordSetting();
     jQuery('#countdownclass').hide();
  },
  data() {
    return {
      USER_ID: "",
      maxLength: 5,
      email: "",
      securityQuestion: [],
      passwordSetting: "",
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "password",
                label: "New Password",
                model: "USER_PASSWORD",
                placeholder: "Please enter password",
                required: true,
                validator: ["string", this.validatePassword],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "password",
                label: "Confirm Password",
                model: "CONFIRM_PASSWORD",
                placeholder: "Confirm password",
                required: true,
                styleClasses: "col-md-12",
                validator: ["string", this.isEqualTo],
              },
              {
                labels: "Mobile Phone Number",
                model: "PHONE_NO",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
              },
              {
                labels: "Request TAC",
                model: "SMS_TAC_NUMBER",
                type: "vfg-custom-Tacinput",
                placeholder: "Enter TAC number",
                styleClasses: "col-md-6 tac_row1",
                required: true,
                validator: ["string", this.validateTAC],
                 hint:'<span id="countdownclass">Please wait for 1 Minutes to request new TAC</span>',
              },
              {
                type: "vueMultiSelect",
                model: "USER_SECURITY_QUESTION",
                label: "Choose Security Question",
                placeholder: "Select security question ",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "SECURITY_QUESTION",
                  label: "SECURITY_QUESTION",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.securityQuestion;
                },
              },
              {
                type: "input",
                inputType: "text",
                model: "USER_SECURITY_ANSWER",
                label: 'Security Answer',
                placeholder: "Answer",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      model: {
        USER_PASSWORD: "",
        CONFIRM_PASSWORD: "",
        PHONE_NO: "",
        SMS_TAC_NUMBER: "",
        USER_SECURITY_QUESTION: "",
        USER_SECURITY_ANSWER: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    async getPasswordSetting() {
      console.log("get pass sett");
      const response = await services06Module0.getPasswordSetting(0);
      this.passwordSetting = response;
    },
    async validateTAC(value) {
       var PHONENO = '60' + this.model.PHONE_NO;
        var isLogin = 0;
        if(value.length >=6)
        {
        const response = await services06Module0.verifyTACESC(value,PHONENO);
        console.log("response=",response);
        if(response != 'TAC code successfully verified.')
        {
        return response;
        }
        }
        else{
          return [
            "TAC must have at least 6 digits code.",
          ];
        }
     },
    validatePassword(value) {
      if (value === "") {
        return;
      }
      let idlength = value.length;
      if (idlength >= 1) {
        if (
          idlength < this.passwordSetting.MIN_LENGTH ||
          idlength > this.passwordSetting.MAX_LENGTH
        ) {
          if (idlength < this.passwordSetting.MIN_LENGTH) {
            return [
              `Your password must be at least ${this.passwordSetting.MIN_LENGTH} character `,
            ];
          }
          if (idlength > this.passwordSetting.MAX_LENGTH) {
            return [
              `Your password must be at maximum length of ${this.passwordSetting.MAX_LENGTH} character`,
            ];
          }
          return;
        }
        if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [
              "Password must contain at least one uppercase letter, one lower case letter, one number and one character",
            ];
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [
              "Password must contain at least one uppercase letter, one lower case letter, and one character",
            ];
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [
              "Your password must be in Uppercase and Lowercase Letters",
            ];
          }
        } else if (
          this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [
              "Your password must be at least one number, one uppercase letter and one lower case letter",
            ];
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return ["Your password must be in Alphanumeric"];
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          this.passwordSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [
              "Your password must be at least one number, one letter and one special character",
            ];
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          !this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          let expression = /^([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return [""];
          }
        } else if (
          !this.passwordSetting.UPPERCASE_LOWERCASE &&
          this.passwordSetting.SPECIAL_CHARACTERS &&
          !this.passwordSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
          if (!expression.test(value)) {
            return ["Your password must include special characters '_'"];
          }
        }
      }
    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.USER_PASSWORD) {
        return ["Password do not match"];
      }
    },
    async securityQuestionList() {
      console.log("sec quest");
      const response = await services06Module1.securityQuestion();
      this.securityQuestion = response;
      //alert(JSON.stringify(response));
      console.log("sec quest last" + JSON.stringify(this.securityQuestionList));
    },
    async recoverPass() {
      // const response = await services06Module1.getUserTypeReg();
      // if (this.$refs.recoverPasswordForm.validate()) {
      const data = new FormData();
      // alert("this is id : " + this.USER_ID);
      data.append("TP_USER_ID", JSON.parse(this.USER_ID));
      data.append("TP_USER_PASSWORD", this.model.USER_PASSWORD);
      data.append("TP_USER_TELEPHONE", 60 + JSON.parse(this.model.PHONE_NO));
      data.append("SMS_TAC_NUMBER", JSON.parse(this.model.SMS_TAC_NUMBER));
      data.append(
        "USER_SECURITY_QUESTION_ID",
        JSON.parse(this.model.USER_SECURITY_QUESTION.SECURITY_ID)
      );
      // if (response == 1)
      data.append("USER_ROLES",'training_provider_admin')
      data.append("USER_SECURITY_ANSWER", this.model.USER_SECURITY_ANSWER);
      // data.append("_method", "PUT");

      try {
        const response = await servicesModule5.updatePassword(data);

        alert(
          "Password reset is success, Please log in using the new password"
        );
        this.$router.go(-1);
      } catch (error) {
        Vue.$toast.open({
          message:
            "This email is already exist, please sign up using an unregistered email address.",
          type: "error",
          position: "top",
        });
      }
    },
  },
};
</script>

<style lang="scss">
#countdownclass{
color:red;
font-size: 12px;
font-weight: 600;
}
.tac_row1 input{
width: 80% !important;
}
</style>
