<template>
  <div>
    <va-modal
      v-model="showStaticModal"
      title="Submission Has Been Sent!"
      message="You will receive Email Verification Upon Approval By FIMM."
      no-dismiss
      cancel-text=""
      ok-text="Close"
      @ok="proceedToLogin"
    />
    <va-card>
      <form @submit.prevent="onSubmit">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="regForm"
          @model-updated="onModelUpdated"

        >
        </vue-form-generator>
        <br />
        <div class="d-flex justify--center mt-3">
          <va-button type="submit" class="my-0 btncolor">Submit</va-button>
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
import * as services03Module5 from "../../../app/module5/services03";
import * as services06Module0 from "../../../app/module0/services06";
import * as services01Module5 from "../../../app/module5/services01";
import * as services06Module1 from "../../../app/module1/services06";
Vue.use(VueFormGenerator);

export default {
  name: "signup-media",
  mounted() {

    this.getAllCompany();
    this.getUserIdSetting();
    this.showStaticModal = false;
  },
  data() {
    return {
      showStaticModal: true,
      companyList: [],

      model: {

        userId: "",
        fullName: "",
        company:"",
        contactNumber:"",
        applicantEmail:"",
        designation:"",

      },
      formOptions: {
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Preferred User ID",
                model: "userId",
                placeholder: "Please enter preferred User ID",
                required: true,
                validator: ["string", this.validateUserID],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Full Name (as per NRIC)",
                model: "fullName",
                placeholder: "Please enter full name",
                required: true,
                styleClasses: "col-md-12",

              },
              {
                type: "input",
                inputType: "text",
                label: "Designation",
                model: "designation",
                placeholder: "Please enter designation",
                required: true,
                styleClasses: "col-md-12",
              },

              {
                type: "vueMultiSelect",
                model: "company",
                label: "Company Name",
                placeholder: "Select the company",
                required: true,
                // validator: 'required',
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "COMPANY_ID",
                  label: "COMPANY_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.companyList;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Contact Number",
                model: "contactNumber",
                placeholder: "Please enter contact number",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },

              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "applicantEmail",
                placeholder: "Enter email address",
                required: true,
                validator: ["string", this.validateEmail],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "email",
                label: "Confirm Email Address",
                model: "applicantConfirmEmail",
                placeholder: "Enter email address",
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

    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.applicantEmail) {
        return ["Email do not match"];
      }
    },
    proceedToLogin() {
      this.$router.push("/auth-media/login-media");
    },
    showOverlay(show) {
      Event.$emit("signup-media:overlay", show);
    },
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
    },
    validateRegisterForm() {
      return this.$refs.regForm.validate();
    },
    async getUserIdSetting() {
      const response = await services06Module0.getUserIdSetting(0);
      this.useridSetting = response;
    },

    async validateEmail(value) {
      const response = await services01Module5.checkDuplicateEmail(value);
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

        const response = await services01Module5.checkDuplicateMediaUserID(value);
        if (response) {
          return response.message;
        }
      }
    },

    onModelUpdated(newVal, schema) {
      if (schema == "fullName") {
        this.model.fullName = String(newVal).toUpperCase();
      }
      if (schema == "designation") {
        this.model.designation = String(newVal).toUpperCase();
      }
    },

    getAllCompany: async function () {
      const response = await services01Module5.getAllCompany();
      this.companyList = response;

    },

    onSubmit: async function () {
      const vm = this;
      const response = await this.validateRegisterForm();
      if (response) {
        const data = new FormData();
        data.append("USER_ID", this.model.userId);
        data.append("USER_NAME", this.model.fullName);
        data.append("DESIGNATION", this.model.designation);
        data.append("COMPANY_ID", this.model.company.COMPANY_ID);
        data.append("COMPANY_NAME", this.model.company.COMPANY_NAME);
        data.append("CONTACT_NUMBER", this.model.contactNumber);
        data.append("EMAIL", this.model.applicantEmail);
        data.append("APPR_PROCESSFLOW_ID", 145);
        data.append("APPR_INDEX", 1);
        data.append("NOTI_LOCATION", "media-user-list");
        data.append("NOTI_REMARK", "(MEDIA USER) New application pending for approval");
        data.append("NOTI_TITLE","Kindly assist to create new User ID as per details below :");

          try {
            vm.showOverlay(true);
            const response = await services01Module5.newUserRegistration(data);

            vm.showOverlay(false);
            vm.showStaticModal = true;

            this.model.userId="";
            this.model.applicantEmail="";
          } catch (error) {
            console.log(error);
          }
        } else {
        }
    },
  },
  computed: {},
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
