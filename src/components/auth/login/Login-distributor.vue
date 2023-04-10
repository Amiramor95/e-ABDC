<template>
  <div>
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
           <router-link
            class="text-color"
            :to="{ name: 'recover-password-distributor' }"
            >{{ $t("Recover Password") }}</router-link
          >
          <!-- <router-link
            class="text-color"
            :to="{ name: 'reset-password-distributor' }"
            >{{ $t("Forgot Password") }}</router-link
          > -->
          <br />
          <router-link
            class="text-color"
            :to="{ name: 'distributor-member-detailsRegistration' }"
            >{{ $t("First time user") }}</router-link
          >
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
import axios from "axios";
import * as services06Module1 from "../../../app/module1/services06";
import * as servicesModule1 from "../../../app/module1/services";
import * as servicesModule0 from "../../../app/module0/services";

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
    };
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
  methods: {
    showOverlay: function (show) {
      Event.$emit("signup-distributor:overlay", show);
    },
    onsubmit: async function () {
      this.errors = [];
      const vm = this;
      console.log(this);

      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }

      try {
        const data = {
          username: this.email,
          USER_PASS_NUM: this.password,
        };

        this.showOverlay(true);
        const response = await services06Module1.verifyUser(data);
        console.log("You Pass this - 1");
        console.log("Login Response=", response);
        console.log("Login Response=",response.data.errorCode);
        //console.log(response.data.USER_ISLOGIN);
        // alert('here',JSON.stringify(response.data));

        if (response.data.errorCode == 4003) {
          this.showOverlay(false);
          this.errors = [response.data.message];
          console.log("Login Response=",response.data.errorCode);

        } else if (
          response.data.USER_ISLOGIN == 0 ||
          response.data.USER_ISLOGIN == null ||
          response.data.USER_ISLOGIN == undefined
        ) {
          localStorage.setItem("recover-password", response.data.USER_ID);
          this.$router.push({
            name: "recover-password",
            params: { USER_ID: response.data.USER_ID },
          });
          this.showOverlay(false);

           //clear  localStorage value
        localStorage.removeItem('TAC_NUMBER');
        localStorage.removeItem('forgot-password-id');
        localStorage.removeItem('forgot-password-userid');
        localStorage.removeItem('forgot-password-mobile');
        localStorage.removeItem('forgot-password-email');

        } else {
          if (
            (response.data.USER_DIST_ID == null ||
              response.data.USER_DIST_ID == 0) &&
            response.data.USER_ISADMIN == 1
          ) {
            // alert(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data));
            servicesModule1.setUser(JSON.stringify(response.data));
            this.$store.commit("change", JSON.stringify(response.data));
            console.log("user store :" + localStorage.getItem("user"));
            this.$router.push({ name: "distributor-details-registration" });
            console.log("first");
            this.showOverlay(false);

             //clear  localStorage value
        localStorage.removeItem('TAC_NUMBER');
        localStorage.removeItem('forgot-password-id');
        localStorage.removeItem('forgot-password-userid');
        localStorage.removeItem('forgot-password-mobile');
        localStorage.removeItem('forgot-password-email');

          } else if (
            (response.data.USER_DIST_ID == null ||
              response.data.USER_DIST_ID == 0) &&
            (response.data.USER_ISADMIN == 0 ||
              response.data.USER_ISADMIN == null)
          ) {
            // alert(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data));
            servicesModule1.setUser(JSON.stringify(response.data));
            this.$store.commit("change", JSON.stringify(response.data));
            console.log("user store :" + localStorage.getItem("user"));
            this.$router.push({ name: "distributor-user-profile-set-up" });
            console.log("first");
            this.showOverlay(false);
              //clear  localStorage value
              localStorage.removeItem('TAC_NUMBER');
              localStorage.removeItem('forgot-password-id');
              localStorage.removeItem('forgot-password-userid');
              localStorage.removeItem('forgot-password-mobile');
              localStorage.removeItem('forgot-password-email');

          } else {
            // alert(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data));
            servicesModule1.setUser(JSON.stringify(response.data));
            this.$store.commit("change", JSON.stringify(response.data));
            console.log("user store :" + localStorage.getItem("user"));
            this.$router.push({ name: "distributor-dashboard" });
            console.log("first");
            this.showOverlay(false);
            //clear  localStorage value
            localStorage.removeItem('TAC_NUMBER');
            localStorage.removeItem('forgot-password-id');
            localStorage.removeItem('forgot-password-userid');
            localStorage.removeItem('forgot-password-mobile');
            localStorage.removeItem('forgot-password-email');
          }
        }
      } catch (error) {
        console.log(error);
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
<style lang="scss">
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
.va-input_container_input {
  height: 2.5rem !important;
  font-size: 1.3rem !important;
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
