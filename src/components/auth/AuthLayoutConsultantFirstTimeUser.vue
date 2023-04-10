<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout row align-content--center">
      <div class="flex xs12 pa-3 flex-center">
        <router-link class="py-5 flex-center" to="/">
          <img src="./assets/logo01.png" width="304" height="130" />
        </router-link>
      </div>

      <div class="flex xs12 pa-3">
        <div class="d-flex justify--center">
          <va-card class="auth-layout__card">
            <va-button
              @click="back"
              flat
              small
              color="black"
              class="ma-0 float-left"
            >
              <va-icon name="fa fa-arrow-left" />
            </va-button>
            <p class="display-6 text-center">First Time User: Update Password</p>

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

export default {
  name: "AuthLayoutConsultantFirstTimeUser",
  // components: { VaIconVuestic },
  data() {
    return {
      overlay_show: false,
    };
  },
  computed: {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    showOverlay(show) {
      this.overlay_show = show;
    },
  }
};
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #24c6dc, #514a9d);

  &__card {
    width: 100%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
.form-group label{
  color: black;
}
</style>
