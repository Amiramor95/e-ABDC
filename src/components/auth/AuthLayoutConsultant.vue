<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout bg-consultant row align-content--center">
      <div class="container-fluid">
        <div class="row">
          <div
            class="
              col-sm-12 col-md-12 col-lg-6
              offset-lg-6
              col-xl-4
              offset-xl-8
            "
          >
            <div class="text-center">
              <router-link class="" to="/">
                <img src="./assets/logo01.png" width="304" height="130" />
              </router-link>
              <p class="texttitle">CONSULTANT</p>
            </div>

            <va-card class="transparent">
              <va-tabs v-model="tabIndex" center>
                <va-tab>{{ $t("auth.login") }}</va-tab>
                <va-tab>Register New Consultant</va-tab>
              </va-tabs>

              <va-separator />

              <div class="pa-3">
                <router-view />
              </div>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>
const tabs = ["login-consultant", "signup-consultant"];

export default {
  name: "AuthLayout",
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
    Event.$on("signup-consultant:overlay", function (show) {
      console.log("parent::showOverlay");
      vm.overlay_show = show;
    });
  },
};
</script>

<style lang="scss">
.va-tabs .va-tabs__slider-wrapper {
  background-color: #007bff !important;
}
.va-tabs {
  color: white !important;
}
.bg-consultant {
  background-image: url("./assets/Background-01.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
}
.auth-layout {
  min-height: 100vh;

  &__card {
    width: 100%;
    max-width: 800px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
.transparent {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px) !important;
}
</style>
