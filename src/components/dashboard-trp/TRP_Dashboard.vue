<template>
  <div class="auth-layout row align-content--center">

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center row">
        <va-card class="col-md-10">
          <va-button
            v-on:click.once="logout"
            flat
            small
            color="black"
            title="logout"
            class="ma-0 float-left"
          >
            <va-icon name="fa fa-power-off" />
          </va-button>
          <p class="display-6 text-center">TRP DASHBOARD</p>

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
// import VaIconVuestic from '../../iconset/VaIconVuestic'

import * as servicesModule0 from '../../app/module0/services'
import Vue from 'vue'

const tabs = ["login-distributor", "signup-distributor"];

export default {
  name: "AuthLayout",
  // components: { VaIconVuestic },
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),

      selectedTabIndex: 0,
      tabTitles: ["login", "createNewAccount"],
      securityQuestion: [
        {
          id: "1",
          name: "Example question",
          selected: true
        }
      ],
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "password",
                label: "New Password",
                model: "firstName",
                placeholder: "Please enter first name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "password",
                label: "Confirm Password",
                model: "firstName",
                placeholder: "Please enter first name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                labels: "Mobile Phone Number",
                model: "applicantPhoneno",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "0##-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              },
              {
                labels: "Request TAC",
                model: "applicantPhoneno",
                type: "vfg-custom-Tacinput",
                placeholder: "Enter TAC number",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              },
              {
                type: "vueMultiSelect",
                model: "country",
                label: "Choose Security Question",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "name",
                  label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.securityQuestion;
                }
              },
              {
                type: "input",
                inputType: "text",
                model: "firstName",
                placeholder: "Answer",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      model: {}
    };
  },
  computed: {
    tabIndex: {
      set(tabIndex) {
        this.$router.push({ name: tabs[tabIndex] });
      },
      get() {
        return tabs.indexOf(this.$route.name);
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async logout() {
      let userid=this.userdata.user_id;
      let usertype=this.userdata.user_type;
      const response = await servicesModule0.logout(userid,usertype); // logout first to clear cache
      localStorage.clear();
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
