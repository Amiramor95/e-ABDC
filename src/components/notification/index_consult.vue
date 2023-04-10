<template>
  <va-dropdown v-model="isCloseableNotificationVisible" class="notification-dropdown" offset="-70, 16px" boundary-body>
    <va-icon-notification
      :totalNotification="totalNotificationList"
      slot="anchor"
      @click-icon="ifClick"
      class="notification-dropdown__icon"
      :color="contextConfig.invertedColor ? $themes.gray : 'black'"
    />

    <va-list v-if="show" fit>
      <va-list-label>
        Notification
      </va-list-label>
      <hr />
      <div style="max-height: 400px; overflow-y: scroll;">
        <va-list-item v-for="(option, index) in notificationList" :key="index">
          <span @click="goNotify(option.route,option.notiID)" style="margin: 10px;">{{ option.message }}</span>
          <hr />
        </va-list-item>
      </div>
    </va-list>
  </va-dropdown>
</template>

<script>
import Vue from 'vue'
import VaIconNotification from './ValconNotification'
import { ColorThemeMixin } from './vuestic-ui'
import * as services04module2 from '../../app/module2/services04'

export default {
  name: 'notification-dropdown',
  inject: ['contextConfig'],
  components: {
    VaIconNotification,
  },
  mixins: [ColorThemeMixin],
  data () {
    return {
      notificationList: [],
      show: false,
      isCloseableNotificationVisible: true,
      totalNotificationList: 0,
    };
  },
  mounted () {
    // Vue.config.refreshIntervalId = setInterval(() => {
    //   this.getNotification();
    // }, 3000)
    this.getNotification();
  },
  props: {
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isCloseableNotificationVisible: function (newVal, oldVal) {
      this.show = true
    },
    computedNotification: function (newVal, oldVal) {
      this.totalNotificationList = newVal
      this.$store.commit('setTotalNotification', this.totalNotificationList)
    },
  },
  computed: {
    // a computed getter
    computedNotification: function () {
      return this.totalNotificationList
    },
  },
  methods: {
    ifClick (e) {
      if (this.show === true) {
        this.show = false
      } else {
        this.show = true
      }
    },
    // goNotify: async function (e,f){
    //    this.$router.push(e);
    //    this.show = false;
    //     // alert(f);
    //   const data = new FormData();
    //   data.append("NOTIFICATION_ID", f);
    //   try {
    //     const user = localStorage.getItem("user");
    //     if(JSON.parse(user).USER_DIST_ID != null) {
    //     const response = await servicesModule04.updateDistNotification(data);
    //     // this.$router.go();
    //     this.getNotification();
    //     }else{
    //       const response = await servicesModule04.updateNotification(data);
    //       // this.$router.go();
    //       this.getNotification();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    goNotify: async function (e, f) {
      // Get route for notification List
      const ROUTE = this.getRoute(e)
      // this.$router.push({ name: strArray[0] })
      ROUTE.catch(error => {
        if (error.name == 'NavigationDuplicated') {
          window.location.reload()
        }
      })
      this.show = false
      // alert(f);
      const data = new FormData()
      data.append('NOTIFICATION_ID', f)
      try {
        // const user = localStorage.getItem("user");
        const user = localStorage.getItem('user_id')
        const response = await services04module2.updateConstNotification(data)
        this.getNotification()
      } catch (error) {
        console.log(error)
      }
    },

    getRoute (e) {
      var strArray = e.split('/')
      if (strArray[1]) {
        const ROUTE = this.$router.push({
          name: strArray[0],
          params: { MANAGE_DEPARTMENT_ID: strArray[1] },
        })
      } else {
        const ROUTE = this.$router.push({ name: e })
      }
      return ROUTE
    },

    getNotification: async function () {
      const user = localStorage.getItem('user_id')
      const response = await services04module2.getConsultantNotification(user)
      this.notificationList = response
      this.totalNotificationList = response.length
    },
  },
}
</script>

<style lang="scss">
.notification-dropdown {
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
