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
        <b-navbar-nav>
          <br />
          <span
            size="sm"
            class="my-2 my-sm-0"
            v-on:click="navDefault"
            style="color: white"
            >Home</span
          >
          <br/>
          <span
            size="sm"
            class="my-2 my-sm-0"
            v-on:click="mediaMgmntCmpny"
            style="color: white"
            >Management Company Directory</span
          >
          <br />
          <span
            size="sm"
            class="my-2 my-sm-0"
            v-on:click="navlistpage"
            style="color: white"
            >Download NAV Report</span
          >
          <br />
          <span
            size="sm"
            class="my-2 my-sm-0"
            v-on:click="userProfile"
            style="color: white"
            >My Profile</span
          >
          <br />
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-button size="sm" class="my-2 my-sm-0" @click.once="logout"
              >logout</b-button
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
import * as servicesModule0 from "../../../app/module0/services";

export default {
  name: "navbar",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
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
    navDefault() {
      this.$router.push({name: "fms-websites"})
    },
    navlistpage() {
      this.$router.push({name: "media-nav-list"});
    },
    mediaMgmntCmpny() {
      this.$router.push({ name: "media-mgmnt-dir" });
    },
    userProfile() {
      this.$router.push({ name: "media-user-profile" });
    },
    async logout() {
      let userid = this.userdata.user_id;
      let usertype = this.userdata.user_type;
      // const response = await servicesModule0.logout(userid, usertype); // logout first to clear cache
      // //console.log("Return response=",response);
      // //if(response){
      // clearInterval(Vue.config.refreshIntervalId);
      localStorage.clear();
      this.$router.push({ name: "fms-website" });
      //location.reload();
      // }
    },
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
};
</script>
