<template>
  <div>
    <form @submit.prevent="onsubmit">
      <va-input
        class="box-size"
        v-model="username"
        type="text"
        :label="$t('User ID')"
        :error="!!usernameErrors.length"
        :error-messages="usernameErrors"
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
            :to="{ name: 'consultant-recover-password' }"
            >{{ $t("auth.recover_password") }}</router-link
          >
          <br />
          <router-link
            class="text-color"
            :to="{ name: 'consultant-first-time-user' }"
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
                      <span v-for="error in errors" class="va-message-list__message error_message" :key="error">{{ error }}</span>
                </p>
            </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import * as AuthServices from "../../../modules/consultant-management/services/auth";
import * as servicesModule2 from "../../../app/module2/services";

export default {
  name: "login",
  data() {
    return {
      username: "", // dummy temporary for testing
      password: "", // @Bcd1234
      keepLoggedIn: false,
      usernameErrors: [],
      passwordErrors: [],
      remember: false,
        errors: [],
    };
  },
  computed: {
    formReady() {
      return !this.usernameErrors.length && !this.passwordErrors.length;
    },
  },
  mounted: function () {
    window.app = this;
    AuthServices.logout()
  },
  methods: {
    showOverlay: function (show) {
      Event.$emit("signup-consultant:overlay", show);
    },
    onsubmit: async function () {
       this.errors = [];
      const vm = this;
      console.log(this);
      this.usernameErrors = this.username ? [] : ["Username is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }

      // const data = {
      //   login_id: this.username,
      //   password: this.password,
      //   client_id: 'eplatform-client',
      // }

      // console.log('dsss')
      const payload = {
        username: this.username,
        PASSWORD: this.password,
      };

      this.showOverlay(true);
      try {
        const login_response = await AuthServices.login(payload);

        // console.log("consultant=", error.response.data.errorCode);
        // if(login_response.data.errorCode == 4011)
        //  {
        //    this.$router.push({ name: "page_under_maintenance_consultant" });
        //  }

        Vue.$toast.open({
          message: login_response.message,
          type: "success",
          position: "top-right",
        });

        if (login_response.data.first_login_value == "NO") {
          // load initial data
          const me = await AuthServices.me();
          const consultant = me.data;
          var consultant_string = JSON.stringify(consultant);
          console.log(consultant_string);
          servicesModule2.setUser(consultant_string);

          this.showOverlay(false);

          this.$store.commit("setUser", consultant);
          this.$router.push({ name: "consultant-registration-update" });
        } else {
          this.showOverlay(false);

          localStorage.setItem("first-time-login", true);
          this.$router.push({
            name: "consultant-first-time-user",
          });
        }
      } catch (error) {
        console.log("error=",error.response.data);
          if(error.response.data.errorCode == 4011)
         {
           this.$router.push({ name: "page_under_maintenance_consultant" });
            return;
         }
         else{
            this.errors=[error.response.data.message];
            this.showOverlay(false);
              Vue.$toast.open({
              message: error.response.data.message,
              type: "error",
              position: "top",
              });
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
.va-message-list__message{
color: red;
}
.error_message{
font-weight: bold;
margin-top: 20px;
float: left;
font-size: 16px;
}
</style>
