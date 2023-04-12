<template>
  <va-dropdown class="profile-dropdown" v-model="isShown" boundary-body offset="-10, 16px">
    <span class="profile-dropdown__anchor" slot="anchor" :style="{ color: this.colorText }">
      <slot />
      <va-icon class="pa-1" :name="`fa ${isShown ? 'fa-angle-up' : 'fa-angle-down'}`" />
    </span>
    <b-list-group v-if="show">
      <b-list-group-item>
        <span v-on:click="profile">
          {{ $t(`user.${"profile"}`) }}
        </span>
      </b-list-group-item>
      <b-list-group-item>
        <span v-on:click="logout">
          {{ $t(`user.${"logout"}`) }}
        </span>
      </b-list-group-item>

      <b-list-group-item>
        <span v-on:click="api_playground">
          API Playground
        </span>
      </b-list-group-item>

    </b-list-group>
  </va-dropdown>
</template>

<script>
import Vue from 'vue';
import * as servicesModule0 from '../../../../../app/module0/services'
import * as ConsultantAPI from '../../../../../modules/consultant-management/services/auth'
import * as servicesModule2 from '../../../../../app/module2/services'

export default {
  name: 'profile-section',
  data() {
    return {
      isShown: false,
      show: true,
      userdata: JSON.parse(localStorage.getItem("user")),
      colorText: this.$store.getters.paletteText
    }
  },
  mounted() {
    //  Vue.config.refreshIntervalId = setInterval(() => {
    //   this.getUserLoginStatus();
    // }, 30000);
    // console.log('Vue.config.refreshIntervalId =', Vue.config.refreshIntervalId);
  },
  watch: {
    isShown: function (e) {
      if (e) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    '$store.getters.paletteText': function () {
      this.colorText = this.$store.getters.paletteText;
    },
    userdata: function (e) {
      this.userdata = JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    profile() {

      this.show = false;

      this.isShown = false;

      this.$router.push({ name: 'profile' })
      // alert('profile page not found :/');
    },
    getUserLoginStatus: async function () {
      let userid = this.userdata.user.USER_ID;
      let usertype = "CONSULTANT";
      console.log("Login CONSULTANT=", this.userdata);
      if (usertype == 'CONSULTANT') {
        const response = await servicesModule2.getUserLoginStatus(userid, usertype);
        console.log("Login Status=", response);
        if (response.ISLOGIN == 0) {
          clearInterval(Vue.config.refreshIntervalId);
          localStorage.clear();
          this.$router.push({ name: 'default' });
          // location.reload();
          //location.href = 'http://localhost:8080/';
        }
      }
    },
    async logout() {
      let userid = this.userdata.user.USER_ID;
      //ConsultantAPI.logout();
      const response = await servicesModule2.consultlogout(userid); // logout first to clear cache
      console.log("Login LOGOUT=", response);
      // if(response){
      clearInterval(Vue.config.refreshIntervalId);
      localStorage.clear();
      this.$router.push({ name: 'default' });
      // location.reload();
      //}
    },
    api_playground() {
      this.$router.push({ name: 'consultant-api-playground' })
    }
  },
}
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__anchor {
    color: $vue-green;
  }

  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;
    width: 8rem;
  }

  &__item {
    display: block;
    color: $vue-darkest-blue;

    &:hover,
    &:active {
      color: $vue-green;
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
