<template>
  <va-card>
    <vudal name="editProfileModal" class="widthModal">
      <div class="header">
        Edit Profile
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="changeDetailschema"
          :options="formOptions"
          ref="changeDetailForm"
        >
        </vue-form-generator>
      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          type="button"
          class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          @click.prevent="saveChangedDetails"
        >
          <i class="fa fa-save" /> &nbsp; Save
        </button>
      </div>
    </vudal>
    <vudal name="changePasswordModal" class="widthModal">
      <div class="header">
        Change Password
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="changePasswordschema"
          :options="formOptions"
          ref="changeDetailForm"
        >
        </vue-form-generator>
      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          type="button"
          class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          @click.prevent="saveChangedPassword"
        >
          <i class="fa fa-save" /> &nbsp; Save
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title">User Profile</h4>
    <div class="mb-2">
      <div class="row">
        <div class="flex md2">
          <va-button @click="editProfile">Edit Profile</va-button>
          <va-button @click="changePass">Change Password</va-button>
        </div>
        <div class="flex md10">
          <div>
            <span><b>User ID</b></span
            ><br />
            <span> {{ USERNAME }}</span
            ><br />
            <span><b>Name</b></span
            ><br />
            <span> {{ userName }}</span
            ><br />
            <div v-if="citizenship == 1">
            <span><b>NRIC</b></span
            ><br />
            <span> {{ nricNumber }}</span
            ><br />
            </div>
            <div v-if="citizenship == 2">
            <span><b>Passport No.</b></span
            ><br />
            <span> {{ passportNumber }}</span
            ><br />
            <span><b>Passport Expiry Date</b></span
            ><br />
            <span> {{ passportexpirydate }}</span
            ><br />
            </div>
            <span><b>Email</b></span
            ><br />
            <span> {{ userEmail }}</span
            ><br />
            <span><b>Phone Number</b></span
            ><br />
            <span> 0{{ phoneNumber }}</span
            ><br />
          </div>
        </div>
      </div>
      <br />
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import Vue from "vue";
import Tabs from "vue-tabs-with-active-line";
import axios from "axios";
import * as servicesModule0 from "@/app/module0/services";

import * as services06Module1 from "../../app/module1/services06";
import * as services06Module0 from "../../app/module0/services06";
import * as services03Module5 from "@/app/module5/services03";

export default {
  name: "userProfile",
  mounted() {
    this.getInfo();

    this.securityQuestionList();
  },
  watch: {},

  props: {
    role: {
      type: String,
      default: "",
    },
  },

  components: {
    Vudal,
  },

  methods: {
    async getInfo() {
      const user = localStorage.getItem("user");

      const response = await services03Module5.getMediaUserDetail(
        JSON.parse(user).user_id
      );
      console.log(response);
      this.userName = JSON.parse(user).name;
      this.userEmail = JSON.parse(user).email;
      this.USERNAME = JSON.parse(user).USERNAME;
      this.phoneNumber = response.TP_USER_TELEPHONE;
      this.citizenship = response.TP_USER_CITIZEN;
      this.nricNumber = response.TP_USER_NRIC;
      this.passportNumber = response.TP_USER_PASSPORT;
      this.passportexpirydate = response.TP_USER_PASSPORT_EXPIRY;
      this.model.USER_NAME = JSON.parse(user).name;
      this.model.USER_ID = JSON.parse(user).USERNAME;

      this.model.USER_NRIC = response.TP_USER_NRIC;
      this.model.USER_PHONENUM = response.TP_USER_TELEPHONE;
    },
    async editProfile() {
      console.log("edit");
      this.$modals.editProfileModal.$show();
    },
    async changePass() {
      console.log("change");
      this.$modals.changePasswordModal.$show();
    },

    async saveChangedDetails() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("TP_USER_FNAME", this.model.USER_NAME);
      data.append("TP_USER_TELEPHONE", this.model.USER_PHONENUM);
      try {
        console.log("current data" + JSON.stringify(data));
        if (confirm("Are you sure to submit?")) {
          data.append("isSubmit", 2);
          const response = await services03Module5.updateDetailuser(data);
          console.log(response);
          alert("User Details Has Been Updated.");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
      this.getInfo();
    },
    async saveChangedPassword() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("USER_CURRENT_PASSWORD",this.model.USER_CURRENT_PASSWORD);
      data.append("")
      // data.append("TP_USER_FNAME", this.model.USER_NAME);
      // data.append("TP_USER_TELEPHONE", this.model.USER_PHONENUM);
      try {
        console.log("current data" + JSON.stringify(data));
        if (confirm("Are you sure to submit?")) {
          data.append("isSubmit", 2);
          // const response = await services03Module5.updatePassworduser(data);
          // console.log(response);
          alert("Password Has Been Updated.");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
      this.getInfo();
    },

    async securityQuestionList() {
      console.log("sec quest");
      const response = await services06Module1.securityQuestion();
      this.securityQuestion = response;
      //alert(JSON.stringify(response));
      console.log("sec quest last" + JSON.stringify(this.securityQuestionList));
    },
  },

  data() {
    return {
      userName: null,
      userEmail: null,

      securityQuestion: [],
      changePasswordschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "password",
                label: "Current Password",
                model: "USER_CURRENT_PASSWORD",
                placeholder: "Please enter password",
                required: true,
                validator: ["string", this.validatePassword],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "password",
                label: "New Password",
                model: "USER_NEW_PASSWORD",
                placeholder: "Please enter password",
                required: true,
                validator: ["string", this.validatePassword],
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "password",
                label: "Confirm Password",
                model: "CONFIRM_NEW_PASSWORD",
                placeholder: "Confirm password",
                required: true,
                styleClasses: "col-md-12",
                validator: ["string", this.isEqualTo],
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
                model: "USER_SECURITY_ANSWER",
                placeholder: "Answer",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      changeDetailschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "USER_ID",
                label: "USER ID",
                placeholder: "USER ID",
                disabled: true,
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "USER_NAME",
                label: "NAME",
                placeholder: "NAME",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "USER_NRIC",
                label: "NRIC",
                disabled: true,
                placeholder: "NRIC",
                styleClasses: "col-md-12",
              },
              {
                labels: "PHONE NUMBER",
                model: "USER_PHONENUM",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
              },
            ],
          },
        ],
      },
      model: {
        USER_CURRENT_PASSWORD: "",
        USER_NEW_PASSWORD: "",
        CONFIRM_NEW_PASSWORD: "",
        PHONE_NO: "",
        USER_SECURITY_QUESTION: "",
        USER_SECURITY_ANSWER: "",
        USER_PHONENUM: "",
        USER_NRIC: "",
        USER_NAME: "",
        USER_ID: "",
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    };
  },
};
</script>
