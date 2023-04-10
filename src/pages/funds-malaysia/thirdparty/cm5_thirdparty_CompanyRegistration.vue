<template>
  <va-card>
    <h4 slot="header" class="card-title">Company Profile</h4>
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
import moment from "moment";
import { getAllPostcodeList } from "../../../app/module0/services02";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule0 from "../../../app/module0/services";
import * as servicesModule5 from "../../../app/module5/services03.js";
import * as services0Module5 from "../../../app/module5/services.js";
Vue.use(VueFormGenerator);
export default {
  props: {
    value: File,
  },
  mounted() {
    const trp = localStorage.getItem("TRP");
    this.getCountry();
    if (JSON.parse(trp).TS_PARAM == "RETURNED") {
      // alert("this is returned.");
      this.STATUS = JSON.parse(trp).TS_PARAM;
      this.GetTRPData();
    }
    // this.getDefaultCountry();
  },
  data() {
    return {
      registrationType: [
        {
          name: "3rd Party",
          value: "1",
        },
        { name: "Training Provider", value: "2" },
        {
          name: "Media",
          value: "3",
        },
      ],
      timestamp: "",
      STATUS: null,
      country: [],
      postcode: [],
      city: [],
      states: [],
      DATE_INCORP: null,
      citizenship: [
        {
          name: "Local",
          value: "1",
          selected: true,
        },
        { name: "Non Local", value: "2" },
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
        { name: "Others", id: "5" },
      ],
      applicantPhoto: "",
      model: {
        applicationType: "",
        catExemption: "",
        qualification: "",

        companyName: "",
        comRegNo: "",
        DATE_INCORP: "",
        fullName: "",
        icNo: "",
        passport: "",
        passportExpiryDate: null,
        comRegType: "1",
        dateOfBirth: "",
        applicantAddress: "",
        applicantAddress2: "",
        applicantAddress3: "",
        COUNTRY: "",
        POSTAL: "",
        CITY:"",
        STATE:"",
        thirdPhoneNo: "",
        thirdOfficeNo: "",
        thirdFaxNo: "",
        thirdEmail: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
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
                label: "Company Name",
                model: "companyName",
                placeholder: "Enter company name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Co. Reg. No.",
                model: "comRegNo",
                placeholder: "Enter co. reg. no.",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                labels: "Date of Incorporation",
                type: "vfg-functional-date",
                placeholder: "Enter date",
                model: "DATE_INCORP",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-3",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "applicantAddress",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "applicantAddress2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "applicantAddress3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12",
              },
              {
                type: "radios",
                label: "Company Registration Type",
                model: "comRegType",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-4 display-inline",
              },
              {
                type: "vueMultiSelect",
                model: "COUNTRY",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.country;
                },
              },
              {
                label: "State",
                type: "input",
                inputType: "text",
                model: "STATE",
                placeholder: "Enter Your State",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE != "MY";
                },
              },
              {
                type: "vueMultiSelect",
                model: "STATE",
                label: "State",
                placeholder: "Select Your state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.state;
                },
              },
              {
                type: "vueMultiSelect",
                model: "CITY",
                label: "City",
                placeholder: "Enter Your City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_CITY_NAME",
                  label: "SET_CITY_NAME",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.city;
                },
              },
              {
                label: "City",
                type: "input",
                inputType: "text",
                model: "CITY",
                placeholder: "Enter Your City",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE != "MY";
                },
              },
              {
                label: "Postcode",
                type: "input",
                inputType: "text",
                model: "POSTAL",
                placeholder: "Enter Your Postcode",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE != "MY";
                },
              },
              {
                type: "vueMultiSelect",
                model: "POSTAL",
                label: "Postcode",
                placeholder: "Enter Your Postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "POSTCODE_ID",
                  label: "POSTCODE",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.postcode;
                },
              },
              {
                type: "vfg-the-mask",
                inputType: "number",
                labels: "Telephone Number",
                model: "thirdPhoneNo",
                placeholder: "Enter telephone number",
                required: true,
                mask: "01#-########",
                styleClasses: "col-md-6",
              },
              {
                type: "vfg-the-mask",
                inputType: "number",
                labels: "Office Number",
                model: "thirdOfficeNo",
                placeholder: "Enter office number",
                required: true,
                mask: "0#-########",
                styleClasses: "col-md-6",
              },
              {
                labels: "Fax Number",
                model: "thirdFaxNo",
                type: "vfg-the-mask2",
                placeholder: "Enter Fax number",
                mask: "0#-########",
                styleClasses: "col-md-6",
                validator: "string",
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "thirdEmail",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async GetTRPData() {
      const tp = localStorage.getItem("TRP");
      const response = await services0Module5.getThirdPartyDetail(JSON.parse(tp).TP_COMP_ID);

      if (response.COMP_NAME != null){
        this.model.companyName = response.COMP_NAME;
      }else {

      }
      if (response.comRegNo != null){
        this.model.comRegNo = response.COMP_REGI_NUM1;
      }else {

      }
      if (response.COMP_DATE_INCORP != null) {
        this.model.DATE_INCORP = response.COMP_DATE_INCORP;
      } else {

      }
      if (response.COMP_TYPE != null){
      this.model.comRegType = response.COMP_TYPE;
      }else {

      }
      if (response.COMP_ADDR_LINE1 != null){
      this.model.applicantAddress = response.COMP_ADDR_LINE1;

      }else {

      }
      if (response.COMP_ADDR_LINE2 != null){
      this.model.applicantAddress2 = response.COMP_ADDR_LINE2;

      }else {

      }
      if (response.COMP_ADDR_LINE3 != null){
      this.model.applicantAddress3 = response.COMP_ADDR_LINE3;
      }else {

      }
      if (response.COMP_CONT_TELEPHONE != null){
      this.model.thirdPhoneNo = response.COMP_CONT_TELEPHONE;

      }else {

      }
      if (response.COMP_OFFICE_TELEPHONE !=  null){
      this.model.thirdOfficeNo = response.COMP_OFFICE_TELEPHONE;

      }else {

      }
      if (response.COMP_CONT_EMAIL != null){

      this.model.thirdEmail = response.COMP_CONT_EMAIL;
      }else {

      }
      if (response.COMP_CONT_FAX != null){
      this.model.thirdFaxNo = response.COMP_CONT_FAX;
      } else {

      }
    },
    async getCountry() {
      const response = await services06Module0.getSettingGeneral("COUNTRY");
      this.country = response;
      this.getState(this.country.SETTING_GENERAL_ID);
    },
    async getCity(data) {
      const response = await services06Module0.getCity(data);
      this.city = response;
    },
    async getPostcode(data) {
      const response = await services06Module0.getPostcode(data);
      this.postcode = response;
    },
    async getState(id) {
      const data = {
        SETTING_GENERAL_ID: id,
        SET_TYPE: "STATE"
      };
      const response = await services06Module0.getStateById(data);
      this.state = response;
    },
    async getDefaultCountry() {
      try {
        const response = await services06Module0.getDefaultCountry();
        this.model.COUNTRY = response;
      } catch (error) {
        console.log(error);
      }
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

      // date expiry
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

      // compare
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
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.$refs.applicantPhotoDisplay.src = reader.result;
        }.bind(this),
        false
      );

      reader.readAsDataURL(this.applicantPhoto);
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "registrationType") {
        if (newVal == "1") {
          this.visibleIc = false;
        } else {
          this.visibleIc = true;
        }
      } else if (schema == "applicationType") {
        this.model.applicationType = newVal;
        if (newVal == "2") {
          this.visibleCatExemption = true;
        } else {
          this.visibleCatExemption = false;
        }
      } else if (schema === "COUNTRY") {
        this.model.POSTAL = null;
        this.city = [];
        this.model.CITY = null;
        this.model.STATE = null;
        if (newVal.SET_CODE === "MY") {
          // this.getPostcode();
          this.getState(newVal.SETTING_GENERAL_ID);
        }
      } else if (schema === "POSTAL") {
        // this.model.city = null;
        //  this.model.state = null;
        // if (this.model.SET_CODE === "MY") {
        //   this.getCity(this.model.POSTAL.SETTING_CITY_ID);
        // }
      } else if (schema === "CITY") {
        if (this.model.COUNTRY.SET_CODE === "MY") {
          this.getPostcode(this.model.CITY.SETTING_CITY_ID);
        }
      } else if (schema === "STATE") {
        // this.model.city = null;
        if (this.model.COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.STATE.SETTING_GENERAL_ID);
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

    async submit() {
      const response = await this.validateRegisterForm();
      const user = localStorage.getItem("user");
      const data = new FormData();

      if (this.STATUS != null){
      const tp = localStorage.getItem("TRP");
            data.append("TS_PARAM", 8);
            data.append("COMP_ID", JSON.parse(tp).TP_COMP_ID);
      }else {

      }
            data.append("USER_ID", JSON.parse(user).user_id);
            data.append("COMP_NAME", this.model.companyName);
            data.append("COMP_REGI_NUM1", this.model.comRegNo);
            data.append(
            "COMP_DATE_INCORP",
            moment(this.model.DATE_INCORP).format("YYYY-MM-DD") ?? "");
            data.append("COMP_TYPE", this.model.comRegType);
            data.append("COMP_ADDR_LINE1", this.model.applicantAddress);
            data.append("COMP_ADDR_LINE2", this.model.applicantAddress2);
            data.append("COMP_ADDR_LINE3", this.model.applicantAddress3);
            data.append("COUNTRY", this.model.COUNTRY.SETTING_GENERAL_ID);
            data.append("COUNTRY_CODE", this.model.COUNTRY.SET_CODE);
            this.model.COUNTRY.SET_CODE == "MY"
              ? this.model.STATE.SET_PARAM != undefined
                ? data.append("STATE", this.model.STATE.SETTING_GENERAL_ID)
                : null
              : data.append("STATE", this.model.STATE ?? "");
            this.model.COUNTRY.SET_CODE == "MY"
              ? this.model.CITY.SET_CITY_NAME != undefined
                ? data.append("CITY", this.model.CITY.SETTING_CITY_ID)
                : null
              : data.append("CITY", this.model.CITY ?? "");
            this.model.COUNTRY.SET_CODE == "MY"
              ? this.model.POSTAL.POSTCODE != undefined
                ? data.append("POSTAL", this.model.POSTAL.SETTING_POSTCODE_ID)
                : null
              : data.append("POSTAL", this.model.POSTAL ?? "");
            data.append("thirdPhoneNo", this.model.thirdPhoneNo);
            data.append("thirdOfficeNo",this.model.thirdOfficeNo);
            data.append("COMP_CONT_EMAIL", this.model.thirdEmail);
            data.append("COMP_CONT_FAX", this.model.thirdFaxNo);
            data.append("COMPANY_STATUS", 1);
            console.log(data);
            console.log(response);
            try {
              if (confirm("Confirm To submit this company registration ?")) {
                // eslint-disable-next-line no-unused-vars
                const response = await servicesModule5.createTPCompany(data);
                alert("Registration is submitted.")
                this.$router.push('company-registration-submission-list');
              } else {
                console.log();
              }
            } catch (error) {
              console.log(error);
            }
    },
    validateIC(value) {
      const expression1 = /^[0-9]+$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        // this.passwordStrength = "";
        return ["Ic must contain number only"];
      }
    },
    isEqualTo(value, field, model) {
      if (!_.has(field, "equals")) return ["Confirm password is required"];
      const a = _.get(model, _.get(field, "equals"));
      const b = value;
      if (_.isEqual(a, b)) return [];
      return ["Password do not match"];
    },
    validateFirstTab() {
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function () {
      return this.$refs.secondTabForm.validate();
    },
    validateThirdTab: function () {
      return this.$refs.thirdTabForm.validate();
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },
  },
};
</script>
<style></style>
