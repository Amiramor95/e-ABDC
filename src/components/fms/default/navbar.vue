<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <img
          src="./../assets/fimm-blue-red.png"
          width="5%"
          height="5%"
          class="d-inline-block align-top"
          alt="FIMM"
        />
        &nbsp;
        <b>Funds Malaysia</b>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-button size="sm" class="my-2 my-sm-0" @click="media"
              >Sign In / Login</b-button
            >
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import * as servicesModule5 from "@/app/module5/services";

export default {
  name: "navbar",
  data() {
    return {
      showPass: false,
      email: "",
      password: "",
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      remember: false,
    };
  },
  methods: {
    media() {
      this.$router.push("/auth-media/login-media");
    },
    onsubmit: async function () {
      console.log(this.email);
      console.log(this.password);

      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }

      try {
        const data = {
          LOGIN_ID: this.email,
          USER_PASS_NUM: this.password,
        };
        console.log("start verify");
        const response = await servicesModule5.verifyUser(data);
        console.log(response.TP_USER_ISLOGIN);
        if (response.TP_USER_ISLOGIN == 0) {
          localStorage.setItem("recover-password", response.TP_USER_ID);
          this.$router.push({
            name: "recover-password",
            params: { TP_USER_ID: response.TP_USER_ID },
          });
        } else {
          // alert(JSON.stringify(response.data));
          if (response.TP_USESR_) console.log(JSON.stringify(response.data));
          servicesModule5.setUser(JSON.stringify(response.data));
          this.$store.commit("change", JSON.stringify(response.data));
          console.log("user store :" + localStorage.getItem("user"));
          this.$router.push({ name: "landingpagelogin" });
          console.log("first");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
};
</script>
