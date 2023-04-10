<template>
  <div>
    <form @submit.prevent="onsubmit">
      <va-input
        class="box-size"
        v-model="email"
        type="text"
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
      />

      <div class="__options d-flex align--center justify--space-between">
        <va-checkbox
          v-model="keepLoggedIn"
          class="mb-0 text-color"
          :label="$t('auth.keep_logged_in')"
        />
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
import * as servicesModule0 from "../../../app/module0/services";

export default {
  name: "login",
  data() {
    return {
      email: "", // amirul@fimm.com.my temporary for testing
      password: "", //@Bcd1234
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      remember: false,
      errorMessage: "",
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
      Event.$emit("signup:overlay", show);
    },
    onsubmit: async function () {
      this.errors = [];
      const vm = this;
      console.log(this);

      this.showOverlay(true);
      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }
      const data = {
        username: this.email,
        password: this.password,
        client_id: "fimm-app",
      };
      try {
        const response = await servicesModule0.login(data);
        console.log("Login Response :", response.user_id);

        if (response.user_id) {
          this.errors = [""];
          this.showOverlay(false);
        } else {
          this.errors = [response];
          this.showOverlay(false);
        }
        servicesModule0.setUser(JSON.stringify(response));
        this.$store.commit("change", JSON.stringify(response));
        console.log("user store :" + localStorage.getItem("user"));

        if (JSON.parse(this.$store.getters.userDetail).name) {
          this.$router.push({ name: "dashboard" });
          this.showOverlay(false);
        }
      } catch (error) {
        console.log(error);
        this.showOverlay(false);
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
          position: "top",
        });
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
