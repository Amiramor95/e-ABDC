<template>
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
          <p class="display-6 text-center">SYSTEM UNDER MAINTENANCE</p>

          <va-separator />

          <!-- <vue-form-generator
            :model="model"
            :schema="schema"
            :options="formOptions"
            ref="optionForm"
          >
          </vue-form-generator> -->

          <div class="pa-3">
            <router-view />
          </div>
          <!-- <div class="d-flex justify--center mt-3">
            <va-button color="info" type="submit" class="my-0">Save</va-button>
          </div> -->
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as servicesModule0 from '../../app/module0/services'
export default {
  name: "PageMaintenanceLayout",
  data() {
    return {
    };
  },
 
  methods: {
    back() {
        this.$router.push({ name: 'default' });
    }
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
</style>
