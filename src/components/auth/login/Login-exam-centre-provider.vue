<template>
  <div>
    <form @submit.prevent="onsubmit">
      <va-input
        class="box-size"
        v-model="email"
        type="text"
        :label="$t('User ID')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />

      <va-input
        v-model="password"
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
            :to="{ name: 'reset-password-esc' }"
          >{{ $t("Forgot Password") }}</router-link
          >
          <br />
        </div>
      </div>

      <div class="d-flex justify--center mt-3">
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
      Event.$emit('signup-esc:overlay', show)
    },
    onsubmit: async function () {
      this.errors = []
      const vm = this
      console.log(this)

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
        const response = await examCentreProviderManagementServices.verifyUser(data)
        console.log('You Pass this - 1')
       // console.log('Login Response=', response)
        // console.log("Login Response=",response.data.errorCode);
        // console.log(response.data.USER_ISLOGIN);
         if(response.data.errorCode == 4012)
         { 
           this.$router.push({ name: "page_under_maintenance_esc" });
           return;
         }

        if (response.data.errorCode === 4103 || response.data.errorCode === 4003 || response.data.message === 'Password do not match.') {
          this.showOverlay(false)
          this.errors = [response.data.message]
        } else if (
          response.data.USER_ISLOGIN == 0 ||
          response.data.USER_ISLOGIN == null ||
          response.data.USER_ISLOGIN == undefined
        ) {
          localStorage.setItem('esc-recover-password', response.data.ESC_USER_ID)
          localStorage.setItem('esc-role', (response.data.USER_ISADMIN === 1 ? 'esc_admin' : 'esc_provider'))
          this.$router.push({
            name: 'esc-recover-password',
            params: { USER_ID: response.data.ESC_USER_ID },
          })
          this.showOverlay(false)
        } else {
          if (
            (response.data.USER_DIST_ID == null ||
              response.data.USER_DIST_ID == 0)) {
            // alert(JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(response.data))
            this.$store.commit('change', JSON.stringify(response.data))
            console.log('user store :' + localStorage.getItem('user'))
            this.$router.push({ name: 'esc-user-profile-set-up' })
            this.showOverlay(false)
          } else {
            // alert(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data))
            localStorage.setItem('user', JSON.stringify(response.data))
            this.$store.commit('change', JSON.stringify(response.data))
            console.log('user store :' + localStorage.getItem('user'))
            this.$router.push({ name: 'esc-dashboard' })
            console.log('first')
            this.showOverlay(false)
          }
        }
      } catch (error) {
        console.log(error)
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
<style lang="scss">
.box-size {
  height: 40pt !important;
  font-size: 12pt !important;
  color: #83b3e6 !important;
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
.va-input__container__label {
  color: #83b3e6 !important;
  font-size: 0.825rem !important;
  margin-bottom: 1.5rem !important;
}
.va-input_container_input {
  height: 2.5rem !important;
  font-size: 1.3rem !important;
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
</style>
