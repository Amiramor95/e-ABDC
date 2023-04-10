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
      <br/>
    <div class="row text-left">
       <button
          @click="back"
          type="button"
          class="btn btn-primary1 btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
    </div>
  </div>
  <!-- </form> -->
</template>

<script>
import * as services06Module1 from "../../../app/module1/services06";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule1 from "../../../app/module1/services";
export default {
  // name: "recover-password",
  // props: {
  //   USER_ID: String
  // },
  mounted() {
    this.USER_ID = localStorage.getItem("forgot-password-userid");
    this.securityQuestionList();
    this.getPasswordSetting();
    //console.log("USER_ID=",this.USER_ID);
    this.UID = localStorage.getItem("forgot-password-id");
  },
  data() {
    return {
    
      maxLength: 5,
      email: "",
      securityQuestion: [],
      passwordSetting: "",
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
            //   {
            //     type: "input",
            //     inputType: "text",
            //     label: "Email",
            //     model: "USER_EMAIL",
            //     placeholder: "Please enter email",
            //     required: true,
            //     validator: ["string", this.validateEmail],
            //     styleClasses: "col-md-12",
            //   },
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
                inputType: "password",
                label: "LAST REMEMBERED PASSWORD",
                model: "USER_PASSWORD",
                placeholder: "Please enter password",
                required: true,
                validator: ["string", this.validatePassword],
                styleClasses: "col-md-12",
              },
            //   {
            //     type: "input",
            //     inputType: "text",
            //     label: "USER ID",
            //     model: "USER_ID",
            //     placeholder: "Please enter User Id",
            //     required: true,
            //     validator: "required",
            //     styleClasses: "col-md-12",
            //   },
            //   {
            //     type: "input",
            //     inputType: "password",
            //     label: "New Password",
            //     model: "USER_PASSWORD",
            //     placeholder: "Please enter password",
            //     required: true,
            //     validator: ["string", this.validatePassword],
            //     styleClasses: "col-md-12",
            //   },
            //   {
            //     type: "input",
            //     inputType: "password",
            //     label: "Confirm Password",
            //     model: "CONFIRM_PASSWORD",
            //     placeholder: "Confirm password",
            //     required: true,
            //     styleClasses: "col-md-12",
            //     validator: ["string", this.isEqualTo],
            //   },
            //   {
            //     labels: "Mobile Phone Number",
            //     model: "PHONE_NO",
            //     type: "vfg-the-mask",
            //     placeholder: "Enter telephone number",
            //     // mask: "######-##-####",
            //     mask: "0##-########",
            //     styleClasses: "col-md-12",
            //     required: true,
            //     validator: "string",
            //   },
            //   {
            //     labels: "Request TAC",
            //     model: "SMS_TAC_NUMBER",
            //     type: "vfg-custom-Tacinput",
            //     placeholder: "Enter TAC number",
            //     styleClasses: "col-md-6",
            //     required: true,
            //     validator: "string",
            //   },
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
        PHONE_NO: "",
        SMS_TAC_NUMBER: "",
        USER_SECURITY_QUESTION: "",
        USER_SECURITY_ANSWER: "",
        USER_ID: localStorage.getItem("forgot-password-userid"),
        USER_EMAIL:localStorage.getItem("forgot-password-email"),
        UID:localStorage.getItem("forgot-password-id"),
        USER_MOBILE:localStorage.getItem("forgot-password-mobile"),
        FORM_VALUE: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    };
  },
  methods: {
        async back() {
        this.$router.go(-1);
      },
        showOverlay: function (show) {
      Event.$emit("signup-distributor:overlay", show);
    },
        async validateEmail(value) {
             const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRe.test(value)) {
      // console.log("Email=",value);
        return ['Please Enter a Valid Email Address'];
    }
    //   const response = await services06Module1.checkDuplicateEmail(value);
    //   return response.message;
    },
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
   
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.USER_PASSWORD) {
        return ["Password do not match"];
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
          console.log("Test1");
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
    async submit() {
      if (this.$refs.recoverPasswordForm.validate()) {
          try{
        const data = new FormData();
        data.append("USER_PASS_NUM", this.model.USER_PASSWORD);
        data.append("username", this.model.USER_ID);
        data.append("UID", this.model.UID);
          data.append("USER_ROLES", "distributor_admin");
        const response = await services06Module1.get_distributor_last_pass(data);
        console.log("feedback=",response);
         if(response == 'NOTFOUND')
         {
                alert(
                "NO MATCHING PASSWORD FOUND, PLEASE REQUEST FOR OTP"
                );
                localStorage.setItem("forgot-password-id", this.model.UID);
                localStorage.setItem("forgot-password-userid", this.model.USER_ID);
                localStorage.setItem("forgot-password-mobile", this.model.USER_MOBILE);
                localStorage.setItem("forgot-password-email", this.model.USER_EMAIL);
                this.$router.push({ name: "forgot-password-otp" });
         }
          if(response == 4707){
             alert(
                "This Password is Exist in your History. Please Reset Your Password Again."
                );
                localStorage.setItem("forgot-password-id", this.model.UID);
                localStorage.setItem("forgot-password-userid", this.model.USER_ID);
                localStorage.setItem("forgot-password-mobile", this.model.USER_MOBILE);
                localStorage.setItem("forgot-password-email", this.model.USER_EMAIL);
                this.$router.push({ name: "change-distributor-password" });
              
          }
         else{

        // alert(
        //   "User Record Exist!!"
        // );
         // this.$router.go(-1);
       //  this.$router.push({ name: "last-password-distributor" });
         }
      
          }
          catch (error) {
                alert(
          "Error"
        );
        console.log(error);
      }
      }
    },
  },
};
</script>

<style lang="scss">
.text-color .form-group label {
  color: white;
}
.vue-form-generator{
    width: 100%;
}
.btn-primary1 {
    color: #fff;
   // background-color: #0069d9;
  //  border-color: #0062cc;
}
.btn-primary1:hover {
    color: #fff;
   // background-color: #0069d9;
    border-color: #0062cc;
}
</style>
