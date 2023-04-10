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
        >NEXT</va-button
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
export default {
  // name: "recover-password",
  // props: {
  //   USER_ID: String
  // },
  mounted() {
    this.USER_ID = localStorage.getItem("recover-password");
    this.securityQuestionList();
    this.getPasswordSetting();
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
                label: "Registered User ID/Email/Mobile No",
                model: "FORM_VALUE",
                placeholder: "Please enter user id/email/mobile no",
                required: true,
                validator: "string",
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
        USER_ID: "",
        USER_EMAIL:"",
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
    async submit() {
      if (this.$refs.recoverPasswordForm.validate()) {
          try{
        const data = new FormData();
        // alert("this is id : " + this.USER_ID);
        data.append("FORM_VALUE", this.model.FORM_VALUE);
       // data.append("USER_PASSWORD", this.model.USER_EMAIL);
       // data.append("USER_MOBILE_NUM", 60 + JSON.parse(this.model.PHONE_NO));
        const response = await services06Module1.get_distributor_user_info(data);
        console.log("feedback=",response[0].USER_EMAIL);
         if(response == 'NOTFOUND')
         {
                alert(
                "User Record Not Exist!!"
                );
                 this.$router.push({ name: "signup-distributor" });
         }else{

         localStorage.setItem("forgot-password-email", response[0].USER_EMAIL);
        localStorage.setItem("forgot-password-id", response[0].USER_ID);
        localStorage.setItem("forgot-password-userid", response[0].USER_USER_ID);
        localStorage.setItem("forgot-password-mobile", response[0].USER_MOBILE_NUM);

        // alert(
        //   "User Record Exist!!"
        // );
         this.$router.push({ name: "last-password-distributor" });
         }
       // this.$router.go(-1);
          }
          catch (error) {
                alert(
          "Record Not Found"
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
