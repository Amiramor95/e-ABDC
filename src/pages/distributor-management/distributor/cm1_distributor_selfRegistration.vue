<template>
  <va-card>
    <h4 slot="header" class="card-title">
      New Distributor Registration Form
    </h4>
    <br />
    <vue-form-generator
      :model="model"
      :schema="schema"
      :options="formOptions"
      ref="regForm"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <br />
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>
<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import { getAllPostal } from "../../../app/module0/services";
import * as servicesModule0 from "../../../app/module0/services";
Vue.use(VueFormGenerator);
export default {
  props: {
    value: File
  },
  mounted() {
    this.getAllPostal();
    this.getCountry();
  },
  data() {
    return {
      timestamp: "",
      country: [],
      postcode: [],
      city: [],
      states: [],
      applicationType: [
        {
          name: "Computerized Private Retirement Scheme Examination (CPRE)",
          value: "1"
        },
        { name: "Exemption for CPRE", value: "2" }
        // { name: "CUTA", value: "3" }
      ],
      catExemption: [
        { name: "CEO", id: "1" },
        { name: "Director", id: "2" },
        { name: "Fund Manager", id: "3" },
        { name: "Financial Planner", id: "4" },
        { name: "Former PRS Consultant / Vary Registration", id: "5" }
      ],

      qualification: [
        {
          name: "SPM",
          id: "1",
          selected: true
        },
        { name: "STPM", id: "2" },
        { name: "Diploma", id: "3" },
        { name: "Degree", id: "4" },
        { name: "Post-graduate", id: "5" },
        { name: "Others", id: "6" }
      ],

      catConsultant: [
        {
          name: "Agent",
          value: "1",
          selected: true
        },
        { name: "Employee", value: "2" }
      ],

      apprenticeshipProg: [
        {
          name: "Yes",
          value: "1",
          selected: true
        },
        { name: "No", value: "2" }
      ],
      citizenship: [
        {
          name: "Malaysian",
          value: "1",
          selected: true
        },
        { name: "Non Malaysian", value: "2" }
      ],
      nameOptions: [
        { name: "Name of CEO", value: "1" },
        { name: "Director", value: "2" }
      ],
      visible: false,
      visibleDepartment: false,
      visibleCatExemption: false,
      visibleIc: true,
      visiblePassport: false,
      department: [
        { name: "Sales and Marketing", id: "1" },
        { name: "Training", id: "2" },
        { name: "Customer Service", id: "3" },
        { name: "Compliance", id: "4" },
        { name: "Others", id: "5" }
      ],
      applicantPhoto: "",
      model: {
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
      schema: {
        groups: [
          {
            styleClasses: "row",
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "First Name (as per NRIC)",
                model: "firstName",
                placeholder: "Please enter first name",
                required: true,
                validator: "string",
                styleClasses: "col-md-4"
              },
              {
                type: "input",
                inputType: "text",
                label: "Middle Name",
                model: "middleName",
                placeholder: "Please enter middle name",
                required: true,
                validator: "string",
                styleClasses: "col-md-4"
              },
              {
                type: "input",
                inputType: "text",
                label: "Last Name",
                model: "LastName",
                placeholder: "Please enter last name",
                required: true,
                validator: "string",
                styleClasses: "col-md-4"
              },
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
              // {
              //   type: "input",
              //   inputType: "date",
              //   label: "Passport Expiry Date",
              //   model: "passportExpiryDate",
              //   format: "YYYY-MM-DD HH:mm:ss",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4",
              //   visible: (model, field, form) => {
              //     return this.visiblePassport;
              //   }
              // },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "applicantAddress",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "applicantAddress2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "applicantAddress3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12"
              },

              {
                type: "vueMultiSelect",
                model: "applicantPostcode",
                label: "Postcode",
                placeholder: "Enter Your Postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "POSTCODE_NO",
                  label: "POSTCODE_NO",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.postcode;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "applicantCity",
                label: "City",
                placeholder: "Enter Your City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_CITY_NAME",
                  label: "SET_CITY_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.city;
                },
                disabled: (model, schema) => {
                  if (this.model.applicantPostcode) {
                    return false;
                  } else {
                    return true;
                  }
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "State",
                model: "applicantState",
                placeholder: "Enter state",
                required: true,
                styleClasses: "col-md-6",
                disabled: true
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "applicantState",
              //   label: "State",
              //   placeholder: "Enter Your State",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "name",
              //     label: "name",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.states;
              //   },
              //   disabled: (model, schema) => {
              //     if (this.model.applicantPostcode) {
              //       return false;
              //     } else {
              //       return true;
              //     }
              //   }
              // },
              {
                type: "vueMultiSelect",
                model: "country",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.country;
                }
              },
              // {
              //   type: "input",
              //   inputType: "number",
              //   label: "Telephone Number",
              //   model: "applicantPhoneno",
              //   placeholder: "Enter telephone number",
              //   required: true,
              //   validator: "number",
              //   styleClasses: "col-md-6"
              // },
              {
                labels: "Telephone Number",
                model: "applicantPhoneno",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.model.applicantPhoneno.length == 10;
                },
                required: true,
                validator: "string"
              },
              {
                labels: "Telephone Number",
                model: "applicantPhoneno",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  console.log(
                    "substring : " +
                      this.model.applicantPhoneno.substring(-6, 1)
                  );
                  return (
                    this.model.applicantPhoneno.length <= 9 &&
                    this.model.applicantPhoneno.substring(-6, 1) == "1"
                  );
                },
                required: true,
                validator: "string"
              },
              {
                labels: "Telephone Number",
                model: "applicantPhoneno",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0#-#########",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  console.log(
                    "substring : " +
                      this.model.applicantPhoneno.substring(-6, 1)
                  );
                  return (
                    this.model.applicantPhoneno.length <= 9 &&
                    this.model.applicantPhoneno.substring(-6, 1) != "1"
                  );
                },
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "email",
                label: "Company Email",
                model: "applicantEmail",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              }
              //   {
              //     type: "select",
              //     label: "Highest Educational Qualification",
              //     model: "qualification",

              //     values: () => {
              //       return this.qualification;
              //     },
              //     required: true,
              //     validator: "string",
              //     styleClasses: "col-md-6"
              //   },
              //   {
              //     type: "input",
              //     inputType: "text",
              //     model: "otherQua",
              //     placeholder: "Others (please specify)",
              //     required: true,
              //     validator: "string",
              //     visible: (model, field, form) => {
              //       return this.visible;
              //     },
              //   },
            ]
          }
        ]
      }
    };
  },
  methods: {
    async getAllPostal() {
      const response = await servicesModule0.getAllPostal();
      this.postcode = response;
    },
    async getCityByPostal(data) {
      const response = await servicesModule0.getCityByPostal(data);
      this.city = response;
    },
    async getStateByPostal(data) {
      const response = await servicesModule0.getStateByCity(data);
      this.model.applicantState = response.SET_PARAM;
      // this.city = response;
    },
    async getCountry() {
      const response = await servicesModule0.getAllSettingGeneralList(
        "COUNTRY"
      );
      this.country = response;
      this.model.country = { SETTING_GENERAL_ID: 18, SET_PARAM: "Malaysia" };
    },
    validateExpiryDate(value) {
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
      // if (this.$refs.fileName1.files[0]) {
      //   console.log(this.$refs.fileName1.files[0].name);
      //   this.model.fileName1 = this.$refs.fileName1.files[0].name;
      // }
      // if (this.$refs.fileName2.files[0]) {
      //   console.log(this.$refs.fileName2.files[0].name);
      //   this.model.fileName2 = this.$refs.fileName2.files[0].name;
      // }
      // if (this.$refs.fileName3.files[0]) {
      //   console.log(this.$refs.fileName3.files[0].name);
      //   this.model.fileName3 = this.$refs.fileName3.files[0].name;
      // }
      // if (this.$refs.fileName4.files[0]) {
      //   console.log(this.$refs.fileName4.files[0].name);
      //   this.model.fileName4 = this.$refs.fileName4.files[0].name;
      // }
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
    }
  }
};
</script>
<style>
/* .display-inline label {
  display: inline !important;
  padding: 5px;
} */

.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}
</style>
