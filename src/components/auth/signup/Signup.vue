<template>
  <div>
    <vudal name="simpleModal" class="widthModal">
      <div class="header">
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="">
        <va-card>
          <h4 slot="header" class="card-title">
            New Distributor Registration Form
          </h4>
          <!-- <br /> -->
          <vue-form-generator
            :model="model"
            :schema="schemaDistributor"
            :options="formOptions"
            ref="distributorForm"
            @model-updated="onModelUpdated"
          >
          </vue-form-generator>
          <br />
          <div class="float-right">
            <button
              @click="submitForm"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Submit
            </button>
          </div>
        </va-card>
      </div>
    </vudal>
    <va-modal
      v-model="showStaticModal"
      title="A verification link has been sent to your email account"
      cancelClass="none"
      message="Please check on the link has just been sent to your email account to verify your email and continue the registration process"
      noOutsideDismiss
      noEscDismiss
    />
    <form @submit.prevent="onsubmit()">
      <!-- <va-select>
      <va-select-option Text="Training Provider" />
    </va-select> -->
      <!-- <div class="float-left row col-4"> -->
      <vue-form-generator
        :model="model"
        :schema="schema"
        :options="formOptions"
        ref="optionForm"
      >
      </vue-form-generator>
      <!-- </div> -->

      <!-- <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    /> -->

      <div class="d-flex justify--center mt-3">
        <va-button type="submit" class="my-0">{{
          $t("auth.sign_up")
        }}</va-button>
      </div>
    </form>
  </div>
</template>

<script>
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
Vue.use(VueFormGenerator);
export default {
  components: {
    Vudal
  },
  name: "signup",
  mounted() {},
  data() {
    return {
      showStaticModal: false,
      timestamp: "",
      country: [],
      postcode: [],
      city: [],
      states: [],
      visible: false,
      visibleDepartment: false,
      visibleCatExemption: false,
      visibleIc: true,
      visiblePassport: false,
      citizenship: [
        {
          name: "Malaysian",
          value: "1",
          selected: true
        },
        { name: "Non Malaysian", value: "2" }
      ],
      model: {
        signUp: "",
        applicationType: "",
        catExemption: "",
        qualification: "",

        firstName: "",
        middleName: "",
        LastName: "",
        icNo: "",
        passport: "",
        passportExpiryDate: null,
        citizenship: "1",
        dateOfBirth: "",
        applicantAddress: "",
        applicantAddress2: "",
        applicantAddress3: "",
        applicantPostcode: "",
        applicantCity: "",
        applicantState: "",
        applicantPhoneno: "",
        applicantTAC: "",
        applicantOfficeNo: "",
        applicantEmail: "",
        otherQua: "",

        catConsultant: "",
        ApprenticeProg: "",
        namePrpIpraCpra: "",
        distCode: "",

        department: "",
        othersDepartment: "",
        distApprenticeProg: "",
        distDistPointCode: "",
        distPointName: "",
        distaddress: "",
        distaddress2: "",
        distpostcode: "",
        distcity: "",
        distState: ""
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true
      },
      schemaDistributor: {
        groups: [
          {
            styleClasses: "row",
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Name (as per NRIC)",
                model: "firstName",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Middle Name",
              //   model: "middleName",
              //   placeholder: "Please enter middle name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Last Name",
              //   model: "LastName",
              //   placeholder: "Please enter last name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              {
                type: "radios",
                label: "Citizenship",
                model: "citizenship",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-4 display-inline"
              },
              {
                labels: "NRIC No",
                model: "icNo",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No",
                mask: "######-##-####",
                styleClasses: "col-md-8",
                visible: (model, field, form) => {
                  return this.visibleIc;
                },
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "passport",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport expiry date",
                model: "passportExpiryDate",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.visiblePassport;
                },
                required: true,
                validator: ["required", this.validateExpiryDate]
              },
              // // {
              // //   type: "input",
              // //   inputType: "date",
              // //   label: "Passport Expiry Date",
              // //   model: "passportExpiryDate",
              // //   format: "YYYY-MM-DD HH:mm:ss",
              // //   required: true,
              // //   validator: "string",
              // //   styleClasses: "col-md-4",
              // //   visible: (model, field, form) => {
              // //     return this.visiblePassport;
              // //   }
              // // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Address",
              //   model: "applicantAddress",
              //   placeholder: "Enter street address",
              //   hint: "Street Address",
              //   required: true,
              //   styleClasses: "col-md-12"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantAddress2",
              //   placeholder: "Enter street address",
              //   hint: "Street Address line 2",
              //   styleClasses: "col-md-6"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantAddress3",
              //   placeholder: "Enter street address",
              //   hint: "Street Address line 3",
              //   styleClasses: "col-md-6"
              // }

              // {
              //   type: "vueMultiSelect",
              //   model: "applicantPostcode",
              //   label: "Postcode",
              //   placeholder: "Enter Your Postcode",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "POSTCODE_NO",
              //     label: "POSTCODE_NO",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.postcode;
              //   },
              //   styleClasses: "col-md-6"
              // },
              // {
              //   type: "vueMultiSelect",
              //   model: "applicantCity",
              //   label: "City",
              //   placeholder: "Enter Your City",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "SET_CITY_NAME",
              //     label: "SET_CITY_NAME",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.city;
              //   },
              //   disabled: (model, schema) => {
              //     if (this.model.applicantPostcode) {
              //       return false;
              //     } else {
              //       return true;
              //     }
              //   }
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "State",
              //   model: "applicantState",
              //   placeholder: "Enter state",
              //   required: true,
              //   styleClasses: "col-md-6",
              //   disabled: true
              // },
              // // {
              // //   type: "vueMultiSelect",
              // //   model: "applicantState",
              // //   label: "State",
              // //   placeholder: "Enter Your State",
              // //   required: true,
              // //   validator: "required",
              // //   styleClasses: "col-md-6",
              // //   selectOptions: {
              // //     multiple: false,
              // //     key: "name",
              // //     label: "name",
              // //     searchable: true
              // //   },
              // //   values: (model, schema) => {
              // //     return this.states;
              // //   },
              // //   disabled: (model, schema) => {
              // //     if (this.model.applicantPostcode) {
              // //       return false;
              // //     } else {
              // //       return true;
              // //     }
              // //   }
              // // },
              // {
              //   type: "vueMultiSelect",
              //   model: "country",
              //   label: "Country",
              //   placeholder: "Enter Your Country",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "SET_PARAM",
              //     label: "SET_PARAM",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.country;
              //   }
              // },
              // // {
              // //   type: "input",
              // //   inputType: "number",
              // //   label: "Telephone Number",
              // //   model: "applicantPhoneno",
              // //   placeholder: "Enter telephone number",
              // //   required: true,
              // //   validator: "number",
              // //   styleClasses: "col-md-6"
              // // },
              {
                type: "input",
                inputType: "email",
                label: "Company Email",
                model: "applicantEmail",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                labels: "Telephone Number",
                model: "applicantPhoneno",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                // visible: (model, field, form) => {
                //   return this.model.applicantPhoneno.length == 10;
                // },
                required: true,
                validator: "string"
              },
              {
                labels: "Request TAC",
                model: "applicantTAC",
                type: "vfg-custom-Tacinput",
                placeholder: "Enter TAC number",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              }
              // {
              //   labels: "Office Number",
              //   model: "applicantOfficeNo",
              //   type: "vfg-the-mask",
              //   placeholder: "Enter office number",
              //   mask: "######-##-####",
              //   mask: "0#-########",
              //   styleClasses: "col-md-6",
              //   required: true,
              //   validator: "string"
              // },

              // //   {
              // //     type: "select",
              // //     label: "Highest Educational Qualification",
              // //     model: "qualification",

              // //     values: () => {
              // //       return this.qualification;
              // //     },
              // //     required: true,
              // //     validator: "string",
              // //     styleClasses: "col-md-6"
              // //   },
              // //   {
              // //     type: "input",
              // //     inputType: "text",
              // //     model: "otherQua",
              // //     placeholder: "Others (please specify)",
              // //     required: true,
              // //     validator: "string",
              // //     visible: (model, field, form) => {
              // //       return this.visible;
              // //     },
              // //   },
            ]
          }
        ]
      },

      email: "",
      password: "",
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      signUpOption: [
        {
          no: "1",
          name: "I want to be a member"
        },
        {
          no: "1",
          name: "I want to be a consultant"
        }
      ],

      schema: {
        groups: [
          {
            styleClasses: "row",
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: "vueMultiSelect",
                model: "signUp",
                // label: "City",
                placeholder: "Select sign up option",
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "name",
                  label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.signUpOption;
                }
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.distributorForm.validate()) {
        this.$modals.simpleModal.$hide();
        this.showStaticModal = true;
      }
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
        const expiryDate = this.model.passportExpiryDate;
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
    uploadImage(e) {
      this.applicantPhoto = this.$refs.applicantPhoto.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.$refs.applicantPhotoDisplay.src = reader.result;
        }.bind(this),
        false
      );

      reader.readAsDataURL(this.applicantPhoto);
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "applicationType") {
        this.model.applicationType = newVal;
        if (newVal == "2") {
          this.visibleCatExemption = true;
        } else {
          this.visibleCatExemption = false;
        }
      } else if (schema == "qualification") {
        if (newVal == "6") {
          this.visible = true;
        } else {
          this.visible = false;
        }
      } else if (schema == "department") {
        if (newVal == "5") {
          this.visibleDepartment = true;
        } else {
          this.visibleDepartment = false;
        }
      } else if (schema == "citizenship") {
        if (newVal == 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema == "applicantPostcode") {
        this.model.applicantCity = "";
        this.getCityByPostal(this.model.applicantPostcode.SETTING_CITY_ID);
      } else if (schema == "applicantCity") {
        this.model.applicantState = "";
        this.getStateByPostal(this.model.applicantCity.SETTING_GENERAL_ID);
      }
    },
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
    },
    validateRegisterForm() {
      return this.$refs.regForm.validate();
    },

    submit: async function() {
      const response = await this.validateRegisterForm();
      if (response) {
        // this.$router.push("company-detail");
      } else {
      }
    },
    validateIC(value) {
      //** must contain letter only (lowercase and uppercase) */
      let expression1 = /^[0-9]+$/;
      // let expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      // //** must contain at least one uppercase letter, one lower case letter and one number */
      // let expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character */
      // let expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // let expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        // this.passwordStrength = "";
        return ["Ic must contain number only"];
      }
    },
    isEqualTo(value, field, model) {
      if (!_.has(field, "equals")) return ["Confirm password is required"];
      let a = _.get(model, _.get(field, "equals"));
      let b = value;
      if (_.isEqual(a, b)) return [];
      return ["Password do not match"];
    },
    validateFirstTab() {
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function() {
      return this.$refs.secondTabForm.validate();
    },
    validateThirdTab: function() {
      return this.$refs.thirdTabForm.validate();
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },
    showmodal() {
      this.$modals.simpleModal.$show();
    },
    onsubmit() {
      // this.emailErrors = this.email ? [] : ["Email is required"];
      // this.passwordErrors = this.password ? [] : ["Password is required"];
      // this.agreedToTermsErrors = this.agreedToTerms
      //   ? []
      //   : ["You must agree to the terms of use to continue"];
      // if (!this.formReady) {
      //   return;
      // }
      //this.$router.push({ name: "distributor-self-registration" });
      this.showmodal();
    }
  },
  computed: {
    formReady() {
      return !(
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.agreedToTermsErrors.length
      );
    }
  }
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
</style>
