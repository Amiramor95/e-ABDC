<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="bg-exam-centre-provider-others">
      <!--      <div class="flex xs12 pa-3">-->
      <!--        <div class="d-flex justify&#45;&#45;start">-->
      <va-card class="transparent">
        <va-tabs v-model="tabIndex" center>
          <va-tab>Login</va-tab>
          <va-tab>Signup</va-tab>
        </va-tabs>

        <va-separator />

        <div class="pa-3">
          <router-view />
        </div>
      </va-card>
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </b-overlay>
</template>

<script>
// import VaIconVuestic from '../../iconset/VaIconVuestic'

const tabs = ['login-exam-centre-provider', 'signup-exam-centre-provider']

export default {
  name: 'AuthLayoutExamCentreProvider',
  // components: { VaIconVuestic },
  data () {
    return {
      overlay_show: false,
      selectedTabIndex: 0,
      tabTitles: ['login-exam-centre-provider', 'createNewAccountForExamCentreProvider'],
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
</style>
