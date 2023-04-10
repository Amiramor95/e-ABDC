<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    offset="-10, 16px"
  >
    <span
      class="profile-dropdown__anchor"
      slot="anchor"
      :style="{ color: this.colorText }"
    >
      <slot />
      <va-icon
        class="pa-1"
        :name="`fa ${isShown ? 'fa-angle-up' : 'fa-angle-down'}`"
      />
    </span>
    <b-list-group v-if="show">
      <b-list-group-item>
        <span v-on:click="profile">
          {{ $t(`user.${"profile"}`) }}
        </span>
      </b-list-group-item>
      <b-list-group-item>
        <span v-on:click.once="logout">
          {{ $t(`user.${"logout"}`) }}
        </span>
      </b-list-group-item>
    </b-list-group>
    <b-list-group-item>
      <span v-on:click="changePassword">
        {{ 'Change Password' }}
      </span>
    </b-list-group-item>
    </b-list-group>
  </va-dropdown>
</template>

<script>
import Vue from 'vue'
import * as servicesModule0 from '../../../../../app/module0/services'
export default {
  name: 'profile-section',
  data () {
    return {
      isShown: false,
      userdata: JSON.parse(localStorage.getItem('user')),
      show: true,
      colorText: this.$store.getters.paletteText,
    }
  },
  mounted () {
    Vue.config.refreshIntervalId = setInterval(() => {
      this.getUserLoginStatus()
    }, 30000)
    console.log('Vue.config.refreshIntervalId =', Vue.config.refreshIntervalId)
  },

  watch: {
    isShown: function (e) {
      if (e) {
        this.show = true
      } else {
        this.show = false
      }
    },
    '$store.getters.paletteText': function () {
      this.colorText = this.$store.getters.paletteText
    },
    userdata: function (e) {
      this.userdata = JSON.parse(localStorage.getItem('user'))
    },
  },

  methods: {
    profile () {
      this.show = false

      this.isShown = false

      this.$router.push({ name: 'esc-profile' })
      // alert('profile page not found :/');
    },
    getUserLoginStatus: async function () {
      const userid = this.userdata.user_id
      const usertype = this.userdata.user_type
      console.log('Login Data FIMM=', this.userdata.user_type)
      if (usertype != 'CONSULTANT') {
        const response = await servicesModule0.getUserLoginStatus(userid, usertype)
        console.log('Login Status=', response)
        if (response.ISLOGIN == 0) {
          clearInterval(Vue.config.refreshIntervalId)
          localStorage.clear()
          this.$router.push({ name: 'default' })
          // location.reload();
        // location.href = 'http://localhost:8080/';
        }
      }
    },
    changePassword () {
      this.$router.push({ name: 'esc-change-password' })
    },
    async logout () {
      const userid = this.userdata.user_id
      const usertype = this.userdata.user_type
      const response = await servicesModule0.logout(userid, usertype) // logout first to clear cache
      // console.log("Return response=",response);
      // if(response){
      clearInterval(Vue.config.refreshIntervalId)
      localStorage.clear()
      this.$router.push({ name: 'default' })
      // location.reload();
    // }
    },
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
