<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="auth-layout bg-others row align-content--center">
      <div class="container-fluid"><div class="row">
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-4">
      <div class="box-header text-center">
        <div class="center">
        <router-link style="" to="/">
          <img src="./assets/logo01.png" width="304" height="130" />
        </router-link>
        </div>
         <p class="texttitle">Third Party Fund Provider</p>
        <p class="texttitle">Training Provider</p>
        <p class="texttitle">Exam Centre Provider</p>
      </div>
        <div class="box-header-from">
     
        
          <va-card class="auth-layout__card transparent">
            <!-- <div class="register_new">New Registration</div> -->
            <va-tabs v-model="tabIndex" center>
              <va-tab class="others_display">{{ $t("auth.login") }}</va-tab>
              <!-- <div class="register_tab"> -->
              <va-tab class="others_display">New Registration</va-tab>
              <!-- <va-tab>Training Provider</va-tab>
              <va-tab>Exam Centre Provider</va-tab> -->
              <!-- </div> -->
            </va-tabs>

            <va-separator />

            <div class="pa-3">
              <router-view />
            </div>
          </va-card>
       
      
        </div>
      </div>
      </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>

const tabs = ['login-others-new', 'signup-others-new']

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
.box-header .texttitle{
  //font-size: 46px !important;
  //font-size: 100% !important;
  margin-bottom: 0rem !important;
  text-transform: uppercase;
  color: white;
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
 // max-width:  !important;
}
.register_tab{
//border-bottom: 3px solid #db2323;  
border-radius: 30px;
border-top: 3px solid lightgoldenrodyellow; 
}
 .va-tabs__wrapper{
//display: block !important;
}
.box-header .center{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.box-header-from .va-tabs .va-tabs__wrapper {
 overflow-x: hidden !important; 
  overflow-y: hidden !important;
    contain: content;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.va-message-list__message{
color: red !important;
}
.others_display{
  padding: 0.438rem 4.75rem !important;
max-width: 300px !important;
}
.box-header-from{
  display: flex;
  justify-content: center;
  width: 100% !important;
}
.others-form_main{
  //width: 100% !important;
  padding: 0 !important;
  margin: 0 auto;
}
@media screen and (max-width: 600px) {
  .texttitle {
    font-size: 1.8rem !important;
  }
}
</style>
