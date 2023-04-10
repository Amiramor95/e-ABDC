<template>

  <div>
    <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Reset Password<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="forgotSchema"
            :options="formOptions"
          />
        </div>
        <div class="actions">
          <button type="button" class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md">
            <i class="fa fa-times" /> &nbsp; Close
          </button>
          <button type="button" class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
          @click="resetPassword">
            <i class="fa fa-paper-plane" /> &nbsp;  Reset Password
          </button>
        </div>
      </vudal>
    <form @submit.prevent="onsubmit">
      <va-input
        class="box-size"
        v-model="email"
        type="text"
        :label="$t('User ID')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />

      <va-input
        v-model="password"
        type="password"
        :label="$t('auth.password')"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />

      <div class="__options d-flex align--center justify--space-between">
        <va-checkbox
          v-model="keepLoggedIn"
          class="mb-0 text-color"
          :label="$t('auth.keep_logged_in')"
        />
        <div class="ml-1 link text-color">
          <span
          v-on:click="forgotPwd"
          class="text-color">
          Forgot Password
          </span>
        </div>
      </div>

      <div class="d-flex justify--center mt-3">
        <va-button type="submit" class="my-0 btncolor">{{
          $t("auth.login")
        }}</va-button>
      </div>
      <div class="col-md-12 text-center">
        <p v-if="errors.length">
          <span
            v-for="error in errors"
            class="va-message-list__message error_message"
            :key="error"
            >{{ error }}</span
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import * as servicesModule5 from "../../../app/module5/services";
import * as services01Module5 from "../../../app/module5/services01";
import Vudal from "vudal";
Vue.use(VueFormGenerator);

export default {
  name: "login",
  data() {
    return {
      showPass: false,
      email: "", // hidayatul@vn.my temporary for testing
      password: "", //@Bcd1234
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      remember: false,
      errors: [],


      model: {
        emailVerify: "",
      },

      formOptions: {
        validateAfterChanged: true,
      },

      forgotSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                placeholder: "Please enter registered email address",
                model: "emailVerify",
                validator: "string",
                styleClasses: "col-md-12",
                hint:" * You will get the email verification upon FIMM Approval",
              },
            ],
          },
        ],
      },

    };
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
  components: { Vudal },
  methods: {
    async forgotPwd(data) {
      this.$modals.simpleModal.$show();
    },

    showOverlay: function (show) {
      Event.$emit("signup-media:overlay", show);
    },
    onsubmit: async function () {
      this.errors = [];
      const vm = this;
      console.log(this);
      //servicesModule0.logout(); // logout first to clear cache
      // console.log(this.email);
      // console.log(this.password);

      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }

      try {
        const data = {
          username: this.email,
          password: this.password,
        };
        this.showOverlay(true);
        console.log("start verify");
        const response = await services01Module5.verifyMediaUser(data);
        // console.log(response.data.TP_USER_TYPE);
         if (response.data.errorCode == 4010) {
          this.$router.push({ name: "page_under_maintenance_media" });
          return;
        }
        if (response.data.errorCode == 4003) {
          this.errors = [response.data.message];
        } else if (typeof response.data.ISLOGIN != "undefined") {
          if (response.data.ISLOGIN == 0 || response.data.ISLOGIN == null || response.data.ISLOGIN == undefined) {

            console.log("New User");
            localStorage.setItem("recover-password", response.data.USER_ID);
            this.$router.push({
              name: "media-recover-password",
              params: { USER_ID: response.data.USER_ID },
            });
            this.showOverlay(false);
          }else if (response.data.ISLOGIN == 1) {
            console.log("other else here 1");
              console.log("User Media");
              console.log(JSON.stringify(response.data));
              servicesModule5.setUser(JSON.stringify(response.data));
              this.$store.commit("change", JSON.stringify(response.data));
              console.log("user store :" + localStorage.getItem("user"));
              Vue.$toast.open({
                message: "You have successfully logged in.",
                type: "success",
                position: "top",
              });
              this.$router.push({ name: "fms-website" });
              console.log("first");
              this.showOverlay(false);
          }
        } else {
          console.log("Wrong User");
          this.showOverlay(false);

          Vue.$toast.open({
            message: "Unknown user",
            type: "error",
            position: "top",
          });
        }
      } catch (error) {
        console.log("Error log : ", error);
        this.showOverlay(false);

        Vue.$toast.open({
          message: "Wrong email or password",
          type: "error",
          position: "top",
        });
      }
    },

    resetPassword: async function () {
      if (confirm("Are you sure you want to reset your password?")) {
        const data = new FormData();
        data.append("ISRESET",1);
        data.append("USER_EMAIL",this.model.emailVerify);
        data.append("APPR_PROCESSFLOW_ID", 145);
        data.append("APPR_INDEX", 1);
        data.append("NOTI_LOCATION", "media-user-list");
        data.append("NOTI_REMARK", "(MEDIA USER) Request reset password pending for approval");
        data.append("NOTI_TITLE","Kindly assist to reset this account as per details below :");


        try {
        const response = await services01Module5.resetPassword(data);
        this.model.emailVerify="";
        } catch (error) {
          console.log(error);
        }
      }
    },

  },
};
</script>
<style lang="scss" scoped>
.btncolor {
  background-image: linear-gradient(
    to right,
    rgb(255, 0, 0),
    rgb(255, 0, 0)
  ) !important;
  font-size: 16pt !important;
  // box-shadow: rgb(0 0 0 / 60%) 0px 0.125rem 0.19rem 0px !important;
}
</style>
<style lang="scss" scoped>
.box-size {
  height: 40pt !important;
  font-size: 12pt !important;
  color: #83b3e6 !important;
}
.text-color {
  color: #83b3e6 !important;
}
.chk-bg {
  background: #83b3e6 !important;
}
.va-input__container {
  min-height: 3.85rem !important;
}
.va-input__container__label {
  color: #83b3e6 !important;
  font-size: 0.825rem !important;
  margin-bottom: 1.5rem !important;
}
.va-input__container__input {
  height: 2.5rem;
  font-size: 1.3rem;
}
.pa-3,
.py-3,
.pb-3 {
  padding-bottom: 4rem !important;
}

.__card {
  max-width: 650px !important;
}
.va-message-list__message {
  color: red;
}
.error_message {
  font-weight: bold;
  margin-top: 20px;
  float: left;
  font-size: 16px;
}
</style>
