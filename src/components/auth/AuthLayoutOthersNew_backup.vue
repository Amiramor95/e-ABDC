<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout bg-others row align-content--center">
      <div class="text-center">
        <router-link class="text-center" style="" to="/">
          <img src="./assets/logo01.png" width="304" height="130" />
        </router-link>
         <p class="texttitle">Third Party Fund Provider</p>
        <p class="texttitle">Training Provider</p>
        <p class="texttitle">Exam Centre Provider</p>
      </div>
       
      <div class="flex xs12 pa-3">
        <div class="d-flex justify--start">
          <va-card class="auth-layout__card transparent">
            <div class="register_new">New Registration</div>
            <va-tabs v-model="tabIndex" center>
              <va-tab>{{ $t("auth.login") }}</va-tab>
              <div class="register_tab">
              <va-tab>Third Party Fund Provider</va-tab>
              <va-tab>Training Provider</va-tab>
              <va-tab>Exam Centre Provider</va-tab>
              </div>
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

const tabs = ['login-others-new', 'signup-others-new','signup-training-provider', 'signup-exam-centre-provider-new']

export default {
  name: 'AuthLayoutOthersNew',
  // components: { VaIconVuestic },
  data () {
    return {
      overlay_show: false,
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount', 'createNewExamProvider'],
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },

  methods: {
    showOverlay (show) {
      this.overlay_show = show
    },
  },
  created: function () {
    // manage scoping here
    const vm = this
    Event.$on('signup-others:overlay', function (show) {
      console.log('parent::showOverlay')
      vm.overlay_show = show
    })
  },
}
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
.flex-center{
  align-items: flex-start !important;
}
.texttitle{
  font-size: 46px !important;
  margin-bottom: 0rem !important;
  text-transform: uppercase;
}
.register_new{
  color: lightgoldenrodyellow;//darkkhaki;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding-left: 136px;
  text-transform: uppercase;
}
.auth-layout__card{
  max-width: 700px !important;
}
.register_tab{
//border-bottom: 3px solid #db2323;  
border-radius: 30px;
border-top: 3px solid lightgoldenrodyellow; 
}
.va-message-list__message{
color: red !important;
}
</style>
