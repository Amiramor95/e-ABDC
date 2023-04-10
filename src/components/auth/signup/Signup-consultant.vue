<template>
  <div>
    <va-modal
      v-model="showStaticModal"
      title="Email Verification"
      message="Verification link has been sent to your registered email. Please verify before proceeding."
      no-dismiss
      cancel-text=""
      ok-text="Close"
      @ok="proceedToLogin"
    />

    <va-modal
      v-model="showIcCheckModal3"
      title="Duplicate NRIC"
      message="Already registered with this NRIC"
      no-dismiss
      cancel-text=""
      ok-text="Ok"
      @ok="proceedToLogin"
    />

    <va-modal
      v-model="showIcCheckModal1"
      title="Duplicate NRIC"
      message="Already registered with this NRIC. You can proceed to login."
      no-dismiss
      cancel-text=""
      ok-text="Ok"
      @ok="proceedToLogin"
    />

    <va-modal
      v-model="showIcCheckModal2"
      title="Duplicate NRIC"
      message="Already registered with this NRIC. Please proceed to Register as New Consultant."
      no-dismiss
      cancel-text=""
      ok-text="Ok"
    />

    <form @submit.prevent="onsubmit">
      <vue-form-generator
        :model="model"
        :schema="schema"
        :options="formOptions"
        ref="regForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>

      <div class="d-flex justify--center mt-3">
        <va-button type="submit" class="my-0 btncolor">Submit</va-button>
      </div>
    </form>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import { getAllPostal } from "../../../app/module0/services";
import * as services06Module2 from "../../../app/module2/services06";
import * as services04Module2 from "../../../app/module2/services04";
import * as services06Module0 from "../../../app/module0/services06";
import * as AuthServices from "../../../modules/consultant-management/services/auth";

Vue.use(VueFormGenerator);
import moment from "moment";
export default {
  name: "signup",
  mounted() {
    this.getUseridSetting();
    this.showStaticModal = false;
  },
  data() {
    return {
      useridSetting: "",
      showStaticModal: true,
      showIcCheckModal1: false,
      showIcCheckModal2: false,
      showIcCheckModal3: false,
      timestamp: "",
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      citizenship: [
        {
          name: "Malaysian",
          value: "286",
          selected: true,
        },
        { name: "Non Malaysian", value: "287" },
      ],
      model: {
        USER_ID: "",
        CONSULTANT_CITIZEN: "286",
        CONSULTANT_NRIC: "",
        CONSULTANT_NRIC_OLD: "",
        CONSULTANT_PASSPORT_NO: "",
        CONSULTANT_PASSPORT_EXPIRY_NO: null,
        CONSULTANT_EMAIL: "",
        CONSULTANT_EMAIL_CONFIRMATION: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      email: "",
      password: "",
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      terminationCheckData: '',

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "User ID",
                model: "USER_ID",
                placeholder: "Please enter User ID",
                required: true,
                validator: ["string", this.validateUserID],
                styleClasses: "col-md-12",
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "CONSULTANT_CITIZEN",
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-12 display-inline",
              },
              {
                labels: "NRIC Number",
                model: "CONSULTANT_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC Number",
                mask: "######-##-####",
                masked: false,
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
                validator: ["string", this.validateIC],
              },
              {
                type: "input",
                inputType: "text",
                label: "Old NRIC Number",
                model: "CONSULTANT_NRIC_OLD",
                placeholder: "Enter old NRIC Number",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: false,
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport Number.",
                model: "CONSULTANT_PASSPORT_NO",
                placeholder: "Enter Passport Number.",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport expiry date",
                model: "CONSULTANT_PASSPORT_EXPIRY_NO",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
                required: true,
                validator: ["required", this.validateExpiryDate],
              },
              {
                type: "input",
                inputType: "email",
                label: "Email",
                model: "CONSULTANT_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: ["string", this.validateEmail],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "email",
                label: "Confirm Email",
                model: "CONSULTANT_EMAIL_CONFIRMATION",
                placeholder: "Confirm email address",
                required: true,
                validator: ["string", this.isEqualTo],
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async getUseridSetting() {
      const response = await services06Module0.getUserIdSetting(0);
      this.useridSetting = response;
    },
    proceedToLogin() {
      this.$router.push("/auth-consultant/login-consultant");
    },
    showOverlay(show) {
      Event.$emit("signup-consultant:overlay", show);
    },
    validateExpiryDate(value) {
      if (value != null) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " GMT";
        const dateTime = date + " " + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        //date expiry
        const expiryDate = this.model.CONSULTANT_PASSPORT_EXPIRY_NO;
        const dateExpiry =
          expiryDate.getFullYear() +
          "-" +
          (expiryDate.getMonth() + 1) +
          "-" +
          expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ":" +
          expiryDate.getMinutes() +
          ":" +
          expiryDate.getSeconds() +
          " GMT";
        const dateTimeExpiry = dateExpiry + " " + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        //compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log("expired");
          return ["Expired"];
        } else {
          console.log("not expired");
          // return ["Expired"];
        }
      } else {
        console.log("ssdfdsf");
      }
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "CONSULTANT_CITIZEN") {
        if (newVal == 286) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      }
    },
    async validateIC(value) {
      if (value.length != 12) {
        return ["Ic must contain 12 digit"];
      } else {
        const response = await services06Module2.checkDuplicateIC(value);
        if (response.errorCode) {
          this.checkConsultantTermination();
          return response.message;
        }
      }
    },
    async validateEmail(value) {
      const response = await services06Module2.checkDuplicateEmail(value);
      if (response.errorCode) {
        return response.message;
      }
    },
    async validateUserID(value) {
        //console.log("Consultant=",value);
       if (value === ""){
          return;
        }
       let idlength=value.length;
       if(idlength >=1)
       {

        if(idlength < this.useridSetting.MIN_LENGTH || idlength > this.useridSetting.MAX_LENGTH){
              if(idlength < this.useridSetting.MIN_LENGTH)
              {
                return `USER ID MIN LENGTH MUST BE ${this.useridSetting.MIN_LENGTH}`;
              }
              if(idlength > this.useridSetting.MAX_LENGTH)
              {
                return `USER ID MAX LENGTH MUST BE ${this.useridSetting.MAX_LENGTH}`;
              }
              return;
        }
        if(
            !this.useridSetting.UPPERCASE_LOWERCASE &&
            !this.useridSetting.SPECIAL_CHARACTERS &&
            !this.useridSetting.ALPHANUMERIC
          ){
            return ;
          } else if(
            this.useridSetting.UPPERCASE_LOWERCASE &&
            this.useridSetting.SPECIAL_CHARACTERS &&
            this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one uppercase letter, one lower case letter, one number and underscore/'_'";
            }
          } else if(
            this.useridSetting.UPPERCASE_LOWERCASE &&
            this.useridSetting.SPECIAL_CHARACTERS &&
            !this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
              if(!expression.test(value)) {
                return "User ID must contain at least one uppercase letter, one lower case letter, and underscore/'_'.";
              }
          } else if (
            this.useridSetting.UPPERCASE_LOWERCASE &&
            !this.useridSetting.SPECIAL_CHARACTERS &&
            !this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one uppercase letter and one lower case letter";
              }
          } else if(
            this.useridSetting.UPPERCASE_LOWERCASE &&
            !this.useridSetting.SPECIAL_CHARACTERS &&
            this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one number, one uppercase letter and one lower case letter";
              }
          } else if(
            !this.useridSetting.UPPERCASE_LOWERCASE &&
            !this.useridSetting.SPECIAL_CHARACTERS &&
            this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one number and one letter";
              }
          } else if(
            !this.useridSetting.UPPERCASE_LOWERCASE &&
            this.useridSetting.SPECIAL_CHARACTERS &&
            this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one number, one letter and one and underscore/'_'.";
              }
          } else if(
            !this.useridSetting.UPPERCASE_LOWERCASE &&
            this.useridSetting.SPECIAL_CHARACTERS &&
            !this.useridSetting.ALPHANUMERIC
          ) {
              let expression = /^(?=.*?[_])([a-zA-Z0-9_]+)$/;
              if (!expression.test(value)) {
                return "User ID must contain at least one special character";
              }
          }

            const response = await services06Module2.checkDuplicateUserID(value);
            if (response) {
            return response.message;
            }
     }

    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.CONSULTANT_EMAIL) {
        return ["Email do not match"];
      }
    },
    onsubmit: async function () {
      const vm = this;
      if (this.$refs.regForm.validate()) {
        const data = new FormData();
        data.append("USER_ID", this.model.USER_ID);
        data.append("CONSULTANT_CITIZEN", this.model.CONSULTANT_CITIZEN);
        data.append("CONSULTANT_NRIC", this.model.CONSULTANT_NRIC);
        data.append("CONSULTANT_NRIC_OLD", this.model.CONSULTANT_NRIC_OLD);
        data.append(
          "CONSULTANT_PASSPORT_NO",
          this.model.CONSULTANT_PASSPORT_NO
        );
        data.append("CONSULTANT_ISLOGIN", 0);
        if (this.model.CONSULTANT_PASSPORT_EXPIRY_NO != null) {
          data.append(
            "CONSULTANT_PASSPORT_EXPIRY_NO",
            moment(this.model.CONSULTANT_PASSPORT_EXPIRY_NO).format(
              "YYYY-MM-DD"
            )
          );
        }
        data.append("CONSULTANT_EMAIL", this.model.CONSULTANT_EMAIL);
        data.append("CONSULTANT_EMAIL_CONFIRMATION", this.model.CONSULTANT_EMAIL_CONFIRMATION);
        vm.showOverlay(true);

        try {
          console.log("Data=",data);
          const response = await AuthServices.signup(data);
            if(response){
              //console.log(response);
              this.showOverlay(false);

              if(!response.casCheck){
                  this.showStaticModal = true;
                  Vue.$toast.open({
                  message: response.message,
                  type: "success",
                  position: "top-right",
                });
              }else if(response.casCheck == 4103){
                Vue.$toast.open({
                  message: response.message,
                  type: "error",
                  position: "top-right",
                });
              }else{
                Vue.$toast.open({
                  message: response.message,
                  type: "success",
                  position: "top-right",
                });
              }

              this.model.USER_ID = "",
              this.model.CONSULTANT_CITIZEN = "",
              this.model.CONSULTANT_NRIC = "",
              this.model.CONSULTANT_NRIC_OLD = "",
              this.model.CONSULTANT_PASSPORT_NO = "",
              this.model.CONSULTANT_PASSPORT_EXPIRY_NO = "",
              this.model.CONSULTANT_EMAIL = "",
              this.model.CONSULTANT_EMAIL_CONFIRMATION = ""
            }
        } catch (error) {
          console.log(error.response);
          this.showOverlay(false);
          Vue.$toast.open({
            message: error.response.data.message,
            type: "error",
            position: "top",
          });
        }
      }
    },

    async checkConsultantTermination() {
      const response = await services04Module2.consultantTerminationCheck(this.model.CONSULTANT_NRIC);
      if (response) {
        //console.log('Termination Check' ,response)
        this.terminationCheckData = response.data;
        if(this.terminationCheckData && this.terminationCheckData.year >= 7){ // Consultant Returned after 7 years
            this.showIcCheckModal2 = true;
        }else if(this.terminationCheckData && this.terminationCheckData.year >= 3){ // Consultant Returned after 3 years
          this.showIcCheckModal1 = true;
        }else if(this.terminationCheckData && this.terminationCheckData.year <3){
          this.showIcCheckModal1 = true;
        }else if(this.terminationCheckData){
          this.showIcCheckModal1 = true;
        }else{
          this.showIcCheckModal3 = true;
        }
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
};
</script>

<style lang="scss">
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>
<style scoped>
.widthModal {
  width: 50%;
}
.form-group label{
  color: white;
  font-weight: 600;
  /* font-weight: 600 !important; */
}
</style>
