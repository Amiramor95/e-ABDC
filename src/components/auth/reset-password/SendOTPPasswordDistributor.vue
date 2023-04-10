<template>
  <!-- <form @submit.prevent="onsubmit" class="login"> -->
  <div>
    <va-card>
      <div class="row mb-2">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="recoverPasswordForm"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br/>
    <div class="row justify--center">
      <va-button v-on:click="submit" class="my-0"
        >SUBMIT</va-button
      >
    </div>
  </div>
  <!-- </form> -->
</template>

<script>
import * as services06Module1 from "../../../app/module1/services06";
import * as services06Module0 from "../../../app/module0/services06";
export default {
  // name: "recover-password",
  // props: {
  //   USER_ID: String
  // },
  mounted() {
  //  this.USER_ID = localStorage.getItem("recover-password");
    this.securityQuestionList();
    this.getPasswordSetting();
  },
  data() {
    return {
      USER_ID: "",
      maxLength: 5,
      email: "",
      securityQuestion: [],
      passwordSetting: "",
    otpTypelist: [
        {
          name: 'SENT OTP VIA REGISTERED PHONE NUMBER',
          value: 1,
        },
        { name: 'SENT OTP VIA REGISTERED EMAIL', value: 2 },
      ],
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
            {
                type: "input",
                inputType: "text",
                label: "USER ID",
                model: "USER_ID",
                placeholder: "Please enter User Id",
                required: true,
                validator: "required",
                readonly:true,
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "EMAIL",
                model: "USER_EMAIL",
                placeholder: "Please enter email",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
           
          
              {
                labels: "MOBILE NUMBER",
                model: "PHONE_NO",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-12",
                required: true,
                validator: "string",
              },
              {
                labels: "Request OTP VIA REGISTERED PHONE NUMBER",
                model: "SMS_TAC_NUMBER",
                type: "vfg-custom-Tacinput-forgotpassword",
                placeholder: "Enter OTP",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
              },
               {
                labels: "Request OTP VIA REGISTERED EMAIL",
               // model: "SMS_TAC_NUMBER",
                type: "vfg-custom-Tacinput-email",
               // placeholder: "Enter TAC number",
                styleClasses: "col-md-6",
               // required: true,
               // validator: "string",
                // hint:'<span id="countdownclass">Please wait for 1 Minutes to request new TAC</span>',
              },
            //   {
            //     type: "vueMultiSelect",
            //     model: "USER_SECURITY_QUESTION",
            //     label: "Choose Security Question",
            //     placeholder: "Select security question ",
            //     required: true,
            //     validator: "required",
            //     styleClasses: "col-md-12",
            //     selectOptions: {
            //       multiple: false,
            //       key: "SECURITY_QUESTION",
            //       label: "SECURITY_QUESTION",
            //       searchable: true,
            //     },
            //     values: (model, schema) => {
            //       return this.securityQuestion;
            //     },
            //   },
            //   {
            //     label: "Security Answer",
            //     type: "input",
            //     inputType: "text",
            //     model: "USER_SECURITY_ANSWER",
            //     placeholder: "Answer",
            //     required: true,
            //     validator: "string",
            //     styleClasses: "col-md-12",
            //   },
            ],
          },
        ],
      },
      model: {
        USER_PASSWORD: "",
        CONFIRM_PASSWORD: "",
        PHONE_NO: localStorage.getItem("forgot-password-mobile"),
        SMS_TAC_NUMBER: "",
        USER_SECURITY_QUESTION: "",
        USER_SECURITY_ANSWER: "",
        otptype: 1,
        USER_EMAIL:localStorage.getItem("forgot-password-email"),
         USER_ID: localStorage.getItem("forgot-password-userid"),
          UID:localStorage.getItem("forgot-password-id"),
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
      console.log("get pass sett=", response);
      this.passwordSetting = response;
    },
    async securityQuestionList() {
      console.log("sec quest");
      const response = await services06Module0.getSecurityQuestionAll();
      this.securityQuestion = response;
      //alert(JSON.stringify(response));
      console.log("sec quest last" + JSON.stringify(this.securityQuestionList));
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
      if (value != this.model.USER_PASSWORD) {
        return ["Password do not match"];
      }
    },
    async submit() {
      if (this.$refs.recoverPasswordForm.validate()) {
        const data = new FormData();
         let tac = localStorage.getItem("TAC_NUMBER");
        // console.log("tac=",tac)
         data.append("USER_ID", this.model.USER_ID);
         data.append("UID", this.model.UID);
         data.append("USER_EMAIL", this.model.USER_EMAIL);
         data.append("USER_MOBILE_NUM", 60 + JSON.parse(this.model.PHONE_NO));
         data.append("SMS_TAC_NUMBER", this.model.SMS_TAC_NUMBER);
         if(this.model.SMS_TAC_NUMBER != tac){
                alert(
                "OTP NOT MATCHED. PLEASE ENTER VALID OTP"
                );
                return
         }else{
            localStorage.setItem("forgot-password-id", this.model.UID);
                localStorage.setItem("forgot-password-userid", this.model.USER_ID);
               // localStorage.setItem("forgot-password-mobile", this.model.USER_MOBILE);
               // localStorage.setItem("forgot-password-email", this.model.USER_EMAIL);
            this.$router.push({ name: "change-distributor-password" });
         }
        // data.append(
        //   "USER_SECURITY_QUESTION_ID",
        //   JSON.parse(this.model.USER_SECURITY_QUESTION.SECURITY_ID)
        // );
        // data.append("USER_SECURITY_ANSWER", this.model.USER_SECURITY_ANSWER);
        // data.append("USER_ROLES", "distributor_admin");
        // data.append("_method", "PUT");
        // const response = await services06Module1.updateSelfReg(data);

        // alert(
        //   "Password reset is success, Please log in using the new password"
        // );
        //this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss">
.text-color .form-group label {
  color: white;
}
#countdownclass{
color:red;
font-size: 12px;
font-weight: 600;
}
.tac_row1 input{
width: 80% !important;
}
</style>
