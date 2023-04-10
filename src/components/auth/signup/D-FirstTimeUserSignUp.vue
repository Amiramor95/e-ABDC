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
      <h4 slot="header" class="card-title">User Registration</h4>

      <form @submit.prevent="onsubmit">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="regForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        <br /><br /><br />
        <div class="float-right">
          <va-button type="submit" class="my-0">Submit</va-button>
        </div>
      </form>
    </va-card>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import { getAllPostal } from "../../../app/module0/services";
import * as services06Module1 from "../../../app/module1/services06";
import * as services06Module0 from "../../../app/module0/services06";
Vue.use(VueFormGenerator);
import moment from "moment";
export default {
  name: "distributor-member-detailsRegistration",
  mounted() {
    this.getUseridSetting();
    this.showStaticModal = false;
  },
  data() {
    return {
      useridSetting: "",
      showStaticModal: true,
      timestamp: "",
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      citizenship: [
        {
          name: "Malaysian",
          value: "1",
          selected: true,
        },
        { name: "Non Malaysian", value: "2" },
      ],
      model: {
        USER_USER_ID: "",
        USER_CITIZEN: "1",
        USER_NRIC: "",
        USER_PASS_NUM: "",
        USER_PASS_EXP: null,
        USER_EMAIL: "",
        confirmEmail: "",
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

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "User ID",
                model: "USER_USER_ID",
                placeholder: "Please enter user ID",
                required: true,
                validator: ["string", this.validateUserID],
                styleClasses: "col-md-12",
                color: "white",
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "USER_CITIZEN",
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-6 display-inline white",
              },
              {
                labels: "NRIC Number",
                model: "USER_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC Number",
                mask: "######-##-####",
                styleClasses: "col-md-6 white",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
                validator: ["string", this.validateIC],
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport Number",
                model: "USER_PASS_NUM",
                placeholder: "Enter Passport Number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6 white",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport expiry date",
                model: "USER_PASS_EXP",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12 white",
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
                model: "USER_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: ["string", this.validateEmail],
                styleClasses: "col-md-12 white",
              },
              {
                type: "input",
                inputType: "email",
                label: "Confirm Email",
                model: "confirmEmail",
                placeholder: "Confirm email address",
                required: true,
                validator: ["string", this.isEqualTo],
                styleClasses: "col-md-12 white",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    proceedToLogin() {
      this.$router.push("/default");
    },
    showOverlay(show) {
      Event.$emit("signup-distributor:overlay", show);
    },
    async getUseridSetting() {
      const response = await services06Module0.getUserIdSetting(0);
      this.useridSetting = response;
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
        const expiryDate = this.model.USER_PASS_EXP;
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
      if (schema == "USER_CITIZEN") {
        if (newVal == 1) {
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
        return ["NRIC numver must contain 12 digit"];
      } else {
        const response = await services06Module1.checkDuplicateIC(value);
        return response.message;
      }
    },
    async validateEmail(value) {
      const response = await services06Module1.checkDuplicateEmail(value);
      return response.message;
    },
    async validateUserID(value) {
      if (value === "") {
        return;
      }
      let idlength = value.length;
      if (idlength >= 1) {
        if (
          idlength < this.useridSetting.MIN_LENGTH ||
          idlength > this.useridSetting.MAX_LENGTH
        ) {
          if (idlength < this.useridSetting.MIN_LENGTH) {
            return `USER ID MIN LENGTH MUST BE ${this.useridSetting.MIN_LENGTH}`;
          }
          if (idlength > this.useridSetting.MAX_LENGTH) {
            return `USER ID MAX LENGTH MUST BE ${this.useridSetting.MAX_LENGTH}`;
          }
          return;
        }
        if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          return;
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
            return "User ID must contain at least one uppercase letter, one lower case letter, one number and underscore/'_'";
          }
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
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
        } else if (
          this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
            return "User ID must contain at least one number, one uppercase letter and one lower case letter";
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          !this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
            return "User ID must contain at least one number and one letter";
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          this.useridSetting.ALPHANUMERIC
        ) {
          let expression =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[_])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
            return "User ID must contain at least one number, one letter and one and underscore/'_'.";
          }
        } else if (
          !this.useridSetting.UPPERCASE_LOWERCASE &&
          this.useridSetting.SPECIAL_CHARACTERS &&
          !this.useridSetting.ALPHANUMERIC
        ) {
          let expression = /^(?=.*?[_])([a-zA-Z0-9_]+)$/;
          if (!expression.test(value)) {
            return "User ID must contain at least one special character";
          }
        }

        const response = await services06Module1.checkDuplicateUserID(value);
        //services06Module1.checkDuplicateUserID(value)
        //.then(response =>{
        if (response) {
          return response.message;
        }
        //});
      }
    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.USER_EMAIL) {
        return ["Email do not match"];
      }
    },
    onsubmit: async function () {
      const vm = this;
      if (this.$refs.regForm.validate()) {
        const data = new FormData();
        data.append("USER_USER_ID", this.model.USER_USER_ID);
        data.append("USER_CITIZEN", this.model.USER_CITIZEN);
        data.append("USER_NRIC", this.model.USER_NRIC);
        data.append("USER_PASS_NUM", this.model.USER_PASS_NUM);
        data.append("USER_ISLOGIN", 0);
        data.append("USER_ISADMIN", 0);
        if (this.model.USER_PASS_EXP != null) {
          data.append(
            "USER_PASS_EXP",
            moment(this.model.USER_PASS_EXP).format("YYYY-MM-DD")
          );
        }
        data.append("USER_EMAIL", this.model.USER_EMAIL);
        vm.showOverlay(true);
        const response = await services06Module1
          .selfRegister(data)
          .then(function (response) {
            console.log(response);
            vm.showOverlay(false);
            vm.showStaticModal = true;
          });
        // this.$toasts.success("Registration Success.", {
        //   width: "400px",
        //   position: "bottom-right",
        //   padding: "1rem"
        // });
        this.model = {
          USER_USER_ID: "",
          USER_CITIZEN: "1",
          USER_NRIC: "",
          USER_PASS_NUM: "",
          USER_PASS_EXP: null,
          USER_EMAIL: "",
          confirmEmail: "",
        };
        this.$router.go(-1);
      } else {
        this.$toasts.failed("Registration Failed.", {
          width: "400px",
          position: "bottom-right",
          padding: "1rem",
        });
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
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}
</style>
