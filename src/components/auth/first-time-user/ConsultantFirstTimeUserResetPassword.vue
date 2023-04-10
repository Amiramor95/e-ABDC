<template>
  <!-- <form @submit.prevent="onsubmit" class="login"> -->
  <div>
    <div class="row mb-2">
      <vue-form-generator
        :model="model"
        :schema="schema"
        :options="formOptions"
        ref="resetPasswordForm"
      >
      </vue-form-generator>
    </div>
    <div class="row justify--center">
      <va-button v-on:click="recoverPass" class="my-0"
        >Update Password</va-button
      >
    </div>
  </div>
  <!-- </form> -->
</template>

<script>
import Vue from 'vue'
import InputOTP from '../../../modules/consultant-management/components/inputs/input_otp.vue'
import * as services06Module0 from "../../../app/module0/services06";
import * as AuthServices from "../../../modules/consultant-management/services/auth";

Vue.component('field-cm-input-otp', InputOTP)
export default {
  beforeDestroy() {
    console.log("beforeDestroy");
    localStorage.removeItem("first-time-login");
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      consultant: null,
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
                model: "PASSWORD",
                placeholder: "Please enter password",
                required: true,
                validator: ["string", this.validatePassword],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "password",
                label: "Confirm Password",
                model: "PASSWORD_CONFIRMATION",
                placeholder: "Confirm password",
                required: true,
                styleClasses: "col-md-12",
                validator: ["string", this.isEqualTo],
              },
              {
                labels: "Mobile Phone Number",
                model: "PHONE",
                type: "vfg-the-mask",
                placeholder: "###-#######",
                mask: "###-########",
                styleClasses: "col-md-6",
                required: true,
                validator: ["string", this.validPhoneNumber],
              },
              {
                labels: "Request TAC",
                model: "PHONE_TAC",
                type: "cm-input-otp",
                placeholder: "Enter TAC number",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
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
                model: "SECURITY_ANSWER",
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
        PASSWORD: "",
        PASSWORD_CONFIRMATION: "",
        PHONE: "",
        GENERATED_TAC: "",
        PHONE_TAC: "",
        USER_SECURITY_QUESTION: "",
        SECURITY_ANSWER: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    init() {
      this.checkValidAccess();

      // If all good - continue
      this.securityQuestionList();
      this.getPasswordSetting();
    },
    showOverlay: function (show) {
      Event.$emit("consultant-first-time-user:overlay", show);
    },
    checkValidAccess() {
      // Retrieve the object from storage
      var first_time_user = localStorage.getItem("first-time-login");
      console.log("first_time_user: ", first_time_user);
      if (!first_time_user || AuthServices.get_token() == undefined) {
        this.$router.push({ name: "login-consultant" });
      }
    },
    extractErrors(errors){

      var str = "";
      var keys = Object.keys(errors);
      for (var i = 0; i < keys.length; i++) {
          var val = errors[keys[i]];
          str += keys[i] +": "+ val + "<br/>"
      }
      return str;
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
              `PASSWORD MIN LENGTH MUST BE ${this.passwordSetting.MIN_LENGTH}`,
            ];
          }
          if (idlength > this.passwordSetting.MAX_LENGTH) {
            return [
              `PASSWORD MAX LENGTH MUST BE ${this.passwordSetting.MAX_LENGTH}`,
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
              "Password must contain at least one uppercase letter and one lower case letter",
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
              "Password must contain at least one number, one uppercase letter and one lower case letter",
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
            return ["Password must contain at least one number and one letter"];
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
              "Password must contain at least one number, one letter and one special character",
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
            return ["Password must contain at least one special character"];
          }
        }
      }
    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.PASSWORD) {
        return ["Password do not match"];
      }
    },
    validPhoneNumber(value, field, model) {
      // https://stackoverflow.com/a/68219741
      value = "6" + value;
      const pattern = /^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/
      console.log(value);
      if (!pattern.test(value)) {
        return ["Invalid phone number"];
      }
    },
    async getPasswordSetting() {
      const response = await services06Module0.getPasswordSetting(0);
      this.passwordSetting = response;
    },
    async securityQuestionList() {
      const response = await AuthServices.security_questions();
      this.securityQuestion = response.data;
    },
    async recoverPass() {
      if (this.$refs.resetPasswordForm.validate()) {
        if (this.model.PHONE_TAC === null || this.model.PHONE_TAC === "" ) {
          alert('Please enter OTP to change password')
        }else if(this.model.GENERATED_TAC != this.model.PHONE_TAC){
          alert('You entered wrong OTP')
        }else{
          var data = new FormData();

          data.append("PASSWORD", this.model.PASSWORD);
          data.append("PASSWORD_CONFIRMATION", this.model.PASSWORD_CONFIRMATION);
          data.append("PHONE", 6 + this.model.PHONE);
          data.append("PHONE_TAC", JSON.parse(this.model.PHONE_TAC));
          data.append(
            "SECURITY_QUESTION_ID",
            JSON.parse(this.model.USER_SECURITY_QUESTION.SECURITY_ID)
          );
          data.append("SECURITY_ANSWER", this.model.SECURITY_ANSWER);

          console.log(data);
          this.showOverlay(true);
          try {
            const response = await AuthServices.setup_security(data);
            console.log(response);
            this.showOverlay(false);
            Vue.$toast.open({
              message: response.message,
              type: "success",
              position: "top-right",
            });
            this.$router.go(-1);
          } catch (error) {
            console.log(error.response);
            this.showOverlay(false);
            Vue.$toast.open({
              message: this.extractErrors(error.response.data.errors),
              type: "error",
              position: "top",
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
</style>
