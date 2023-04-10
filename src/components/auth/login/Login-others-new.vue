<template>
  <div>
    <form @submit.prevent="onsubmit">
      <va-input
        class="box-size others-log"
        v-model="email"
        type="text"
        :label="$t('User ID')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />

      <va-input
        v-model="password"
        class="box-size others-log"
        type="password"
        :label="$t('auth.password')"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />

      <div class="__options d-flex align--center justify--space-between">
        <va-checkbox
          v-model="keepLoggedIn"
          class="mb-0 text-color"
          :label="$t('auth.keep_logged_in')"
        />

        <div class="ml-1 link text-color">
          <router-link
            class="text-color"
            :to="{ name: 'reset-password-other' }"
          >{{ $t("Forgot Password") }}</router-link
          >
          <br />
          <!-- <router-link class="text-color" :to="{ name: 'first-time-user' }">{{
            $t("First time user")
          }}</router-link> -->
        </div>
      </div>
      <div class="text-center">
        <va-button type="submit" class="my-0 btncolor">{{
          $t("auth.login")
        }}</va-button>
      </div>
      <div class="col-md-12 text-center">
        <p v-if="errors.length">
          <span
            v-for="error in errors"
            class="va-message-list__message error_message"
            :key="error"
          >{{ error }}</span
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import * as servicesModule5 from '../../../app/module5/services'
import * as services03Module5 from '../../../app/module5/services03'
import * as examCentreProviderManagementServices
from '../../../app/exam-centre-provider/services/examCentreProviderManagementServices'

export default {
  name: 'login',
  data () {
    return {
      showPass: false,
      email: '', // hidayatul@vn.my temporary for testing
      password: '', // @Bcd1234
      keepLoggedIn: false,
      loggedInAsExamCentreProvider: false,
      emailErrors: [],
      passwordErrors: [],
      remember: false,
      errors: [],
    }
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    showOverlay: function (show) {
      Event.$emit('signup-others:overlay', show)
    },
    onsubmit: async function () {
      this.errors = []
      const vm = this
      console.log(this)
      // servicesModule0.logout(); // logout first to clear cache
      // // console.log("test");
      // console.log(this.email);
      // console.log(this.password);

      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }

      try {
        const data = {
          username: this.email,
          USER_PASS_NUM: this.password,
        }
        this.showOverlay(true)
        console.log('start verify')
         const responseexam = await examCentreProviderManagementServices.verifyUser(data)
      console.log('Exam Response=',responseexam.data.message)
       if(responseexam.data.errorCode == 4012)
         { 
           this.$router.push({ name: "page_under_maintenance_esc" });
           return;
         }

         if(responseexam.data.message == "NOTFOUND")
         {
          // Others Login
         const response = await servicesModule5.verifyUser(data);
        if (response.data.errorCode == 4010) {
          this.$router.push({ name: "page_under_maintenance" });
          return;
        }
        if (response.data.errorCode == 4011) {
          this.$router.push({ name: "page_under_maintenance_provider" });
          return;
        }
        if (response.data.errorCode == 4003) {
          this.errors = [response.data.message];
        } else if (typeof response.data.TP_ISLOGIN !== "undefined") {
          if (
            response.data.TP_ISLOGIN == 0 ||
            response.data.TP_ISLOGIN == null ||
            response.data.TP_ISLOGIN == undefined
          ) {
            console.log("New User");
            localStorage.setItem("recover-password", response.data.TP_USER_ID);
            this.$router.push({
              name: "others-recover-password",
              params: { TP_USER_ID: response.data.TP_USER_ID },
            });
            this.showOverlay(false);
          } else if (
            response.data.TP_ISLOGIN == 1 &&
            response.data.TP_USER_TYPE == 1
          ) {
            console.log("other else here 1");
            if (
              response.data.TP_COMP_ID == 0 ||
              response.data.TP_COMP_ID == null ||
              response.data.TP_COMP_ID == undefined
            ) {
              console.log("User Third Party");
              console.log(JSON.stringify(response.data));
              servicesModule5.setUser(JSON.stringify(response.data));
              this.$store.commit("change", JSON.stringify(response.data));
              console.log("user store :" + localStorage.getItem("user"));
              Vue.$toast.open({
                message: "You have successfully logged in.",
                type: "success",
                position: "top",
              });

              this.$router.push({ name: "company-registration" });
              console.log("first");
              this.showOverlay(false);
            } else {
              console.log("User Third Party");
              console.log(JSON.stringify(response.data));
              servicesModule5.setUser(JSON.stringify(response.data));
              this.$store.commit("change", JSON.stringify(response.data));
              console.log("user store :" + localStorage.getItem("user"));
              Vue.$toast.open({
                message: "You have successfully logged in.",
                type: "success",
                position: "top",
              });
              this.$router.push({ name: "others-dashboard" });
              console.log("first");
              this.showOverlay(false);
            }
          } else if (
            response.data.TP_ISLOGIN == 1 &&
            response.data.TP_USER_TYPE == 2
          ) {
            console.log("other else here 2");
            if (
              response.data.TP_COMP_ID == 0 ||
              response.data.TP_COMP_ID == null ||
              response.data.TP_COMP_ID == undefined
            ) {
              console.log("User Training Provider");
              console.log(JSON.stringify(response.data));
              servicesModule5.setUser(JSON.stringify(response.data));
              this.$store.commit("change", JSON.stringify(response.data));
              console.log("user store :" + localStorage.getItem("user"));
              Vue.$toast.open({
                message: "You have successfully logged in.",
                type: "success",
                position: "top",
              });
              this.$router.push({ name: "trp-register" });
              // this.$router.push({ name: 'trp-register' })
              // console.log('first')
              this.showOverlay(false);
            } else {
              console.log("User Training Provider");
              console.log(JSON.stringify(response.data));
              servicesModule5.setUser(JSON.stringify(response.data));
              this.$store.commit("change", JSON.stringify(response.data));
              console.log("user store :" + localStorage.getItem("user"));
              Vue.$toast.open({
                message: "You have successfully logged in.",
                type: "success",
                position: "top",
              });

              const user = localStorage.getItem("user");
              var TP_COMP_ID = JSON.parse(user).TP_COMP_ID;
              const statusTrp = await services03Module5.getTRPRegStatus(
                TP_COMP_ID
              );
              if (statusTrp.TP_STATUS == 1 || statusTrp.TP_STATUS == 2 || statusTrp.TP_STATUS==8) {
                this.$router.push({ name: "trp-register" });
                this.showOverlay(false);
                // this.$router.push({ name: 'trp-register' })
                //console.log('first-register')
              } else {
                // Page Maintenance By Tahmina
                // var user_type = "TRAININGPROVIDER";
                // const responsepm =
                //   await servicesModule0.getPageNotificationListByType(
                //     user_type
                //   );
                // console.log("pm=", responsepm);
                // if(responsepm.length != 0)
                // {
                //  this.$router.push({ name: "page_under_maintenance" });
                // }
                // else{
                this.$router.push({ name: "trp-dashboard" });
                // }
                // this.$router.push({ name: 'trp-dashboard' })
                // console.log('first-dashboard')
              }
              this.showOverlay(false);
            }
          }
        } else {
          console.log("Wrong User");
          this.showOverlay(false);

          // Vue.$toast.open({
          //   message: 'Unknown user',
          //   type: 'error',
          //   position: 'top',
          // })
        }
      }
      else{
   // Exam Center
        if (responseexam.data.errorCode === 4103 || responseexam.data.errorCode === 4003 || responseexam.data.message === 'Password do not match.') {
          this.showOverlay(false)
          this.errors = [responseexam.data.message]
        } else if (
          responseexam.data.USER_ISLOGIN == 0 ||
          responseexam.data.USER_ISLOGIN == null ||
          responseexam.data.USER_ISLOGIN == undefined
        ) {
          localStorage.setItem('esc-recover-password', responseexam.data.ESC_USER_ID)
          localStorage.setItem('esc-role', (responseexam.data.USER_ISADMIN === 1 ? 'esc_admin' : 'esc_provider'))
          this.$router.push({
            name: 'esc-recover-password',
            params: { USER_ID: responseexam.data.ESC_USER_ID },
          })
          this.showOverlay(false)
        } else {
          if (
            (responseexam.data.USER_DIST_ID == null ||
              responseexam.data.USER_DIST_ID == 0)) {
            // alert(JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(responseexam.data))
            this.$store.commit('change', JSON.stringify(responseexam.data))
            console.log('user store :' + localStorage.getItem('user'))
            this.$router.push({ name: 'esc-user-profile-set-up' })
            this.showOverlay(false)
          } else {
            // alert(JSON.stringify(response.data));
            console.log(JSON.stringify(responseexam.data))
            localStorage.setItem('user', JSON.stringify(responseexam.data))
            this.$store.commit('change', JSON.stringify(responseexam.data))
            console.log('user store :' + localStorage.getItem('user'))
            this.$router.push({ name: 'esc-dashboard' })
            console.log('first')
            this.showOverlay(false)
          }
        }
      }

      } catch (error) {
        console.log('Error log : ', error)
        this.showOverlay(false)

        Vue.$toast.open({
          message: 'Wrong email or password',
          type: 'error',
          position: 'top',
        })
      }
      
    },
  },
}
</script>
<style lang="scss" scoped>
.btncolor {
  background-image: linear-gradient(
    to right,
    rgb(255, 0, 0),
    rgb(255, 0, 0)
  ) !important;
  font-size: 16pt !important;
  // box-shadow: rgb(0 0 0 / 60%) 0px 0.125rem 0.19rem 0px !important;
}
</style>
<style lang="scss" >
.box-size {
  height: 40pt !important;
  font-size: 12pt !important;
  color: #83b3e6 !important;
 // padding-left: 0px;
 // padding-right: 15px;
 // width: 100%;
  //display: block;
  margin-bottom: 1.6rem !important;
  margin-top: 1.0rem !important;
  // padding: 0px 9px;
}
.text-color {
  color: #83b3e6 !important;
}
.chk-bg {
  background: #83b3e6 !important;
}
.va-input__container {
  min-height: 3.85rem !important;
}
.others-log label{
   position: absolute;
  bottom: 1rem !important;
  left: 0.5rem;
  margin-bottom: 20px !important;
  max-width: calc(100% - 0.25rem);
  color: #83b3e6 !important;
  font-size: 0.825rem;
  letter-spacing: 0.0375rem;
  line-height: 1.2;
  font-weight: bold;
  text-transform: uppercase;
  overflow: hidden;
  //text-overflow: ellipsis;
 // white-space: nowrap;
 // -webkit-transform-origin: top left;
  transform-origin: top left;
}
.others-log input{
  text-transform: none;
}

.va-input__container__input {
  height: 2.5rem;
  font-size: 1.3rem;
}
.pa-3,
.py-3,
.pb-3 {
  padding-bottom: 4rem !important;
}

.__card {
  max-width: 650px !important;
}
.va-message-list__message {
  color: red;
}
.error_message {
  font-weight: bold;
  margin-top: 20px;
  float: left;
  font-size: 16px;
}
.btncolor{
 // background-color: #83b3e6 !important;
 // background-image: none !important;
}
</style>
