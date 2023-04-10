<template>
  <va-dropdown
    v-model="isCloseableNotificationVisible"
    class="notification-dropdown"
    offset="-70, 16px"
    boundary-body
  >
    <va-icon-notification
      :totalNotification="totalNotificationList"
      slot="anchor"
      @click-icon="ifClick"
      class="notification-dropdown__icon"
      :color="contextConfig.invertedColor ? $themes.gray : 'black'"
    />

    <va-list v-if="show" fit>
      <va-list-label> Notification </va-list-label>
      <hr />
      <div style="max-height: 400px; overflow-y: scroll">
        <div v-for="(option, index) in notificationList" :key="index">
          <span
            @click="goNotify(option.route, option.notiID)"
            style="margin: 10px"
            >{{ option.message }}</span
          >
          <hr />
        </div>
      </div>
    </va-list>
  </va-dropdown>
</template>

<script>
import Vue from "vue";
import VaIconNotification from "./ValconNotification";
import { ColorThemeMixin } from "./vuestic-ui";
import * as servicesModule04 from "../../app/module0/services04";

export default {
  name: "notification-dropdown",
  inject: ["contextConfig"],
  components: {
    VaIconNotification,
  },
  mixins: [ColorThemeMixin],
  data() {
    return {
      notificationList: [],
      show: false,
      isCloseableNotificationVisible: true,
      totalNotificationList: 0,
    };
  },
  mounted() {
    // do not comment this the line below
    // Vue.config.refreshIntervalId = setInterval(() => {
    //  this.getNotification();
    // }, 3000);
    // Vue.config.refreshIntervalId = this.getNotification();
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
      this.show = true;
    },
    computedNotification: function (newVal, oldVal) {
      this.totalNotificationList = newVal;
      this.$store.commit("setTotalNotification", this.totalNotificationList);
    },
  },
  computed: {
    // a computed getter
    computedNotification: function () {
      return this.totalNotificationList;
    },
  },
  methods: {
    ifClick(e) {
      if (this.show === true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    // goNotify: async function (e,f){
    //   // Get route for notification List
    //   const ROUTE = this.getRoute(e);
    //   //this.$router.push({ name: strArray[0] })
    //   ROUTE.catch(error => {
    //     if (error.name == "NavigationDuplicated") {
    //       window.location.reload();
    //     }
    //   });
    //    this.show = false;
    //     //alert(f);
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

    // getRoute(e){
    //   var strArray = e.split("/");
    //   if(strArray[1]){
    //     const ROUTE = this.$router.push({
    //       name: strArray[0],
    //       params: { MANAGE_DEPARTMENT_ID: strArray[1] }
    //     });
    //   }else{
    //     const ROUTE = this.$router.push({ name: e });
    //   }
    //   return ROUTE;
    // },

    goNotify: async function (e, f) {
      this.$router.push({ name: e }).catch((error) => {
        if (error.name == "NavigationDuplicated") {
          window.location.reload();
        }
      });
      this.show = false;
      // alert(f);
      const data = new FormData();
      data.append("NOTIFICATION_ID", f);
      try {
        const user = localStorage.getItem("user");
        if (JSON.parse(user).USER_DIST_ID != null) {
          const response = await servicesModule04.updateDistNotification(data);
          // this.$router.go();
          this.getNotification();
        } else {
          if (JSON.parse(user).user_type == "OTHERS") {
            const response = await servicesModule04.updateOtherNotification(
              data
            );
            this.getNotification();
          } else {
            const response = await servicesModule04.updateNotification(data);
            // this.$router.go();
            this.getNotification();
          }
        }

        const response = await servicesModule04.updateNotification(data);
        // this.$router.go();
        this.getNotification();
      } catch (error) {
        console.log(error);
      }
    },
    getNotification: async function () {
      //alert('ss')
      const user = localStorage.getItem("user");
      // alert(JSON.parse(user).USER_DIST_ID);
      // go to notification (FIMM)

      if (JSON.parse(user).USER_DIST_ID == null) {
        const response = await servicesModule04.getNotification(
          JSON.parse(user).USER_GROUP_ID
        );
        this.notificationList = response;
        this.totalNotificationList = response.length;
        console.log("this.totalNotificationList=", this.totalNotificationList);
        // alert(this.notificationList.notiID);
      } else {
        if (JSON.parse(user).user_type == "OTHERS") {
          const response = await servicesModule04.getOthersNotification(
            JSON.parse(user).user_id
          );
          this.notificationList = response;
          this.totalNotificationList = response.length;
          console.log(
            "this.totalNotificationList=",
            this.totalNotificationList
          );
        } else {
          //  alert(JSON.parse(user).USER_DIST_ID);
          // go to notification (Distributor)
          const response = await servicesModule04.getDistNotification(
            JSON.parse(user).user_id
          );
          this.notificationList = response;
          this.totalNotificationList = response.length;
          console.log(this.notificationList);
        }
        //  alert(JSON.parse(user).USER_DIST_ID);
        // go to notification (Distributor)
        const response = await servicesModule04.getDistNotification(
          JSON.parse(user).user_id
        );
        this.notificationList = response;
        this.totalNotificationList = response.length;
        console.log(this.notificationList);
      }
    },
  },
};
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
