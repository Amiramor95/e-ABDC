<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout bg-fimmstaff row align-content--center">
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-sm-12 col-md-12 col-lg-6 offset-lg-6 col-xl-4 offset-xl-8"
          >
            <div class="text-center">
              <router-link class="" to="/">
                <img src="./assets/logo01.png" width="304" height="130" />
              </router-link>
              <p class="texttitle">FIMM STAFF</p>
            </div>

            <va-card class="transparent">
              <div class="pa-3">
                <router-view />
              </div>
            </va-card>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>
        <span>&#169;</span>Federation Of Investment Managers Malaysia
        [199301017839 (2725777-P)]
      </p>
    </div>
  </b-overlay>
</template>

<script>
const tabs = ["login", "signup"];

export default {
  name: "AuthLayout",
  data() {
    return {
      overlay_show: false,
      selectedTabIndex: 0,
      tabTitles: ["login", "createNewAccount"],
    };
  },
  methods: {
    showOverlay(show) {
      this.overlay_show = show;
    },
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
  created: function () {
    // manage scoping here
    const vm = this;
    Event.$on("signup:overlay", function (show) {
      console.log("parent::showOverlay");
      vm.overlay_show = show;
    });
  },
};
</script>

<style lang="scss">
// .va-tabs{
//   color: #007bff;
// }
// .link, .content a {
//     color: #007bff;
// }
.va-button {
  background-image: linear-gradient(
    to right,
    rgb(65, 86, 118),
    rgb(0, 123, 255)
  );
}
.item-position {
  position: absolute !important;
  margin-left: 49.9% !important;
  margin-top: 8% !important;
}
.row {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.auth-layout {
  min-height: 100vh;
  background-color: black;
  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
.bg-fimmstaff {
  background-image: url("./assets/Background-03.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
}
.__card {
  width: 100%;
  max-width: 800px;
}

.transparent {
  background-color: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(5px) !important;
}

.texttitle {
  font-size: 62px !important;
  color: white;
  font-weight: bold;
  white-space: nowrap;
}
.marginedit {
  margin-right: 6% !important;
  height: 370px;
}
.footer {
  color: white;
  position: center;
  padding: 20px;
  right: 0;
  left: 0;
  bottom: 0;
  justify-items: center;
  display: inline-block;
  align-self: flex-end;
  margin-left: 35%;
  font-weight: 800;
}
</style>
