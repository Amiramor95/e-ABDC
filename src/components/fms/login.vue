<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout bg-others row align-content--center">
      <div class="flex xs1 offset--md1">
        <router-link class="flex xs1 offset--md1" style="" to="/">
          <img src="./assets/logo01.png" width="304" height="130" />
        </router-link>
      </div>
      <div class="flex xs12 flex-center" style="padding-left: 10rem">
        <p class="texttitle">3rd PARTY UTMC/TRP</p>
      </div>
      <div class="flex xs12 pa-3">
        <div class="d-flex justify--start">
          <va-card class="auth-layout__card transparent">
            <va-tabs v-model="tabIndex" center>
              <va-tab>{{ $t("auth.login") }}</va-tab>
              <va-tab>Register New 3rd Party UTMC/TRP</va-tab>
            </va-tabs>

            <va-separator />

            <div class="pa-3">
              <router-view />
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>
// import VaIconVuestic from '../../iconset/VaIconVuestic'

const tabs = ["login-media", "signup-media"];

export default {
  name: "AuthLayout",
  // components: { VaIconVuestic },
  data() {
    return {
      overlay_show: false,
      selectedTabIndex: 0,
      tabTitles: ["login", "createNewAccount"],
    };
  },
  computed: {
    tabIndex: {
      set(tabIndex) {
        this.$router.push({ name: tabs[tabIndex] });
      },
      get() {
        return tabs.indexOf(this.$route.name);
      },
    },
  },

  methods: {
    showOverlay(show) {
      this.overlay_show = show;
    },
  },
  created: function () {
    // manage scoping here
    const vm = this;
    Event.$on("signup-others:overlay", function (show) {
      console.log("parent::showOverlay");
      vm.overlay_show = show;
    });
  },
};
</script>

<style lang="scss">
.bg-others {
  background-image: url("./assets/background-04.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
}
.va-tabs .va-tabs__slider-wrapper {
  background-color: #007bff !important;
}
</style>
