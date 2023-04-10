import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AuthLayoutDistributor from '../components/auth/AuthLayoutDistributor'
import AuthLayoutDistributorRecoverPass from '../components/auth/AuthLayoutRecoverPassword'
import AuthLayoutOthers from '@/components/auth/AuthLayoutOthers'
import AuthLayoutOthersRecoverPass from '../components/auth/AuthLayoutRecoverPassword'
import AuthLayoutMedia from '@/components/auth/AuthLayoutMedia'
import AuthLayoutMediaRecoverPass from '../components/auth/AuthLayoutRecoverPassword'
import AppLayout from '../components/admin/AppLayout'
import AppEscLayout from '../components/esc/AppLayout'
import AppLayoutconsultant from '../components/consultant/AppLayout'
import defaultPage from '../components/auth/default.vue'
import fmspage from '../components/fms/landingpage.vue'
import fmspageloggedin from '../components/fms/landingpagesignin'
import * as services from '../app/module0/services'
import FimmRoutes from './fimmroute'
import DistributorRoutes from './distributorroute'
import ConsultantRoutes from './consultant'
import OtherRoutes from './otherroute'
import EscRoutes from './escroute.js'
import * as FimmUserAuthentication from './fimm'
import AuthLayoutEscRecoverPassword from '../components/auth/AuthLayoutEscRecoverPassword'
import AuthLayoutExamCentreProvider from '../components/auth/AuthLayoutExamCentreProvider'
import AuthLayoutOthersNew from '../components/auth/AuthLayoutOthersNew'
import PageMaintenanceLayout from '../components/auth/PageMaintenanceLayout'


Vue.use(Router)

// Global event object for cross components events emitter
window.Event = new Vue()

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const ifLogin = (to, from, next) => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === 'undefined'
  ) {
    next()
  } else if (JSON.parse(localStorage.getItem('user')).user_type === 'fimm') {
    next('fimm/dashboard')
  } else if (
    JSON.parse(localStorage.getItem('user')).user_type === 'distributor'
  ) {
    next('distributor/dashboard')
  } else if (
    JSON.parse(localStorage.getItem('user')).user_type === 'consultant'
  ) {
    next('consultant/dashboard')
  } else if (
    JSON.parse(localStorage.getItem('user')).user_type === 'OTHERS'
  ) {
    if (JSON.parse(localStorage.getItem('user')).TP_USER_TYPE === 1) {
      next('third-party/dashboard')
    } else if (JSON.parse(localStorage.getItem('user')).TP_USER_TYPE === 2) {
      next('trp/dashboard')
    } else
    if (JSON.parse(localStorage.getItem('user')).TP_USER_TYPE === 3) {
      next('media/dashboard')
    }
  } else if (JSON.parse(localStorage.getItem('user')).user_type === 'ESC') {
    next('esc/dashboard')
  }
}

const ifAuthenticatedFiMM = (to, from, next) => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === 'undefined'
  ) {
    next('login')
  } else {
    console.log(localStorage.getItem('user'))
    next()
  }
}

const ifAuthenticatedDistributor = (to, from, next) => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === 'undefined'
  ) {
    next('login-distributor')
  } else {
    next()
  }
}

const demoRoutes = []

export default new Router({
  // mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  mode: 'history',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'default' },
      meta: {
        progress: {
          func: [
            {
              call: 'color',
              modifier: 'temp',
              argument: '#ffb000',
            },
            {
              call: 'fail',
              modifier: 'temp',
              argument: '#6e0000',
            },
            {
              call: 'location',
              modifier: 'temp',
              argument: 'top',
            },
            {
              call: 'transition',
              modifier: 'temp',
              argument: {
                speed: '1.5s',
                opacity: '0.6s',
                termination: 400,
              },
            },
          ],
        },
      },
      beforeEnter: ifLogin,
    },
    {
      name: 'fms-website',
      path: '/fms-website',
      component: fmspage,
      props: true,
      beforeEnter: ifLogin,
    },
    {
      name: 'default',
      path: '/default',
      component: defaultPage,
      beforeEnter: ifLogin,
    },

    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
          default: true,
        },
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/Signup.vue'),
        },
      ],
    },
    {
      path: '/auth-others',
      component: AuthLayoutOthers,
      beforeEnter: ifLogin,
      children: [
        {
          name: 'login-others',
          path: 'login-others',
          component: () => import('../components/auth/login/Login-others.vue'),
        },
        {
          name: 'signup-others',
          path: 'signup-others',
          component: () =>
            import('../components/auth/signup/Signup-others.vue'),
        },
        {
          name: 'admin-registration',
          path: 'admin-registration',
          component: () =>
            import(
              '../pages/funds-malaysia/thirdparty/cm5_thirdparty_admin_registration.vue'
            ),
          props: true,
        },
        {
          name: 'auth-esc',
          path: '/auth-esc',
          component: AuthLayoutExamCentreProvider,
          children: [
            {
              name: 'login-exam-centre-provider',
              path: 'login-exam-centre-provider',
              component: () =>
                import('../components/auth/login/Login-exam-centre-provider'),
              props: true,
              default: true,
            },
            {
              name: 'signup-exam-centre-provider',
              path: 'signup-exam-centre-provider',
              component: () =>
                import(
                  '../components/auth/signup/Signup-exam-centre-provider.vue'
                ),
              props: true,
            },
            {
              name: 'reset-password-esc',
              path: 'reset-password-esc',
              beforeEnter: ifLogin,
              meta: { requiresGuest: true },
              component: () =>
                import(
                  '../components/auth/reset-password/RecoverPasswordEsc.vue'
                ),
            },
            {
              name: 'reset-password-esc',
              path: 'reset-password-esc',
              beforeEnter: ifLogin,
              meta: { requiresGuest: true },
              component: () =>
                import(
                  '../components/auth/reset-password/RecoverPasswordEsc.vue'
                ),
            },
          ],
        },
      ],
    },
    {
    // name: 'auth-others-new',
      path: '/auth-others-new',
      component: AuthLayoutOthersNew,
      beforeEnter: ifLogin,
      children: [
        {
          name: 'login-others-new',
          path: 'login-others-new',
          component: () => import('../components/auth/login/Login-others-new.vue'),
        },
        {
          name: 'signup-others-new',
          path: 'signup-others-new',
          component: () =>
            import('../components/auth/signup/Signup-others-new.vue'),
        },
        {
          name: 'signup-training-provider',
          path: 'signup-training-provider',
          component: () =>
            import('../components/auth/signup/signup-training-provider.vue'),
        },
        {
          name: 'signup-exam-centre-provider-new',
          path: 'signup-exam-centre-provider-new',
          component: () =>
            import(
              '../components/auth/signup/Signup-exam-centre-provider-new.vue'
            ),
          props: true,
        },
      ],
    },
    {
      path: '/auth-others-recover',
      component: AuthLayoutOthersRecoverPass,
      children: [
        {
          name: 'others-recover-password',
          path: 'others-recover-password',
          component: () =>
            import(
              '../components/auth/first-time-user/OthersFirstTimeUserResetPassword.vue'
            ),
          props: true,
        },
        {
          name: 'reset-password-other',
          path: 'reset-password-other',
          component: () =>
            import(
              '../components/auth/reset-password/RecoverPasswordOthers.vue'
            ),
          props: true,
        },
      ],
    },


    {
      path: '/auth-media',
      component: AuthLayoutMedia,
      beforeEnter: ifLogin,
      children: [
        {
          name: 'login-media',
          path: 'login-media',
          component: () => import('../components/auth/login/Login-media.vue'),
        },
        {
          name: 'signup-media',
          path: 'signup-media',
          component: () => import('../components/auth/signup/Signup-media.vue'),
        },
      ],
    },
    {
      path: '/auth-media-recover',
      component: AuthLayoutOthersRecoverPass,
      children: [
        {
          name: 'media-recover-password',
          path: 'media-recover-password',
          component: () =>
            import(
              '../components/auth/first-time-user/OthersFirstTimeUserResetPassword.vue'
            ),
          props: true,
        },
        {
          name: 'reset-password-media',
          path: 'reset-password-media',
          component: () =>
            import(
              '../components/auth/reset-password/RecoverPasswordOthers.vue'
            ),
          props: true,
        },
      ],
    },
    {
      path: '/auth-distributor',
      component: AuthLayoutDistributor,
      beforeEnter: ifLogin,
      meta: { requiresGuest: true },
      children: [
        {
          name: 'login-distributor',
          path: 'login-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import('../components/auth/login/Login-distributor.vue'),
          default: true,
        },
        {
          name: 'signup-distributor',
          path: 'signup-distributor',
          meta: { requiresGuest: true },
          beforeEnter: ifLogin,
          component: () =>
            import('../components/auth/signup/Signup-distributor.vue'),
        },
        {
          name: 'distributor-member-detailsRegistration',
          path: 'distributor-member-detailsRegistration',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import('../components/auth/signup/D-FirstTimeUserSignUp.vue'),
        },
        {
          name: 'reset-password-distributor',
          path: 'reset-password-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import(
              '../components/auth/reset-password/RecoverPasswordDistributor.vue'
            ),
        },
      
        // {
        //     path: "/auth-others-recover",
        //     component: AuthLayoutOthersRecoverPass,
        //     children: [{
        //         name: "others-recover-password",
        //         path: "others-recover-password",
        //         component: () =>
        //             import ('../components/auth/first-time-user/OthersFirstTimeUserResetPassword.vue'),
        //         props: true,
        //     }, {
        //         name: 'reset-password-other',
        //         path: 'reset-password-other',
        //         component: () =>
        //             import ('../components/auth/reset-password/RecoverPasswordOthers.vue'),
        //         props: true,
        //     }, ],
        // },
        {
          path: '/auth-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          children: [
            {
              name: 'login-distributor',
              path: 'login-distributor',
              beforeEnter: ifLogin,
              meta: { requiresGuest: true },
              component: () =>
                import('../components/auth/login/Login-distributor.vue'),
              default: true,
            },
            {
              name: 'signup-distributor',
              path: 'signup-distributor',
              meta: { requiresGuest: true },
              beforeEnter: ifLogin,
              component: () =>
                import('../components/auth/signup/Signup-distributor.vue'),
            },
            {
              name: 'distributor-member-detailsRegistration',
              path: 'distributor-member-detailsRegistration',
              beforeEnter: ifLogin,
              meta: { requiresGuest: true },
              component: () =>
                import('../components/auth/signup/D-FirstTimeUserSignUp.vue'),
            },
            {
              name: 'reset-password-distributor',
              path: 'reset-password-distributor',
              beforeEnter: ifLogin,
              meta: { requiresGuest: true },
              component: () =>
                import(
                  '../components/auth/reset-password/RecoverPasswordDistributor.vue'
                ),
            },
           
          ],
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () =>
            import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () =>
            import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () =>
            import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
        {
          name: 'recover-password-distributor',
          path: 'recover-password-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import(
              '../components/auth/reset-password/RecoverPasswordFormDistributor.vue'
            ),
        },
        {
          name: 'forgot-password-distributor',
          path: 'forgot-password-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import(
              '../components/auth/reset-password/ForgotPasswordDistributor.vue'
            ),
        },
        {
          name: 'last-password-distributor',
          path: 'last-password-distributor',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import(
              '../components/auth/reset-password/LastPasswordDistributor.vue'
            ),
        },
        {
          name: 'forgot-password-otp',
          path: 'forgot-password-otp',
          beforeEnter: ifLogin,
          meta: { requiresGuest: true },
          component: () =>
            import(
              '../components/auth/reset-password/SendOTPPasswordDistributor.vue'
            ),
        },
      
      ],
    },
    {
      path: '/auth-distributor-recover',
      beforeEnter: ifLogin,
      meta: { requiresGuest: true },
      component: AuthLayoutDistributorRecoverPass,
      children: [
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () =>
            import('../components/auth/recover-password/RecoverPassword.vue'),
          props: true,
        },
        {
          name: 'change-distributor-password',
          path: 'change-distributor-password',
          component: () =>
            import('../components/auth/recover-password/ChangePasswordDistributor.vue'),
          props: true,
        },
      ],
    },

    {
      path: '/auth-esc-recover',
      beforeEnter: ifLogin,
      meta: { requiresGuest: true },
      component: AuthLayoutEscRecoverPassword,
      children: [
        {
          name: 'esc-recover-password',
          path: 'esc-recover-password',
          component: () =>
            import(
              '../components/auth/recover-password/EscRecoverPassword.vue'
            ),
          props: true,
        },
      ],
    },

 // *******************************TAHMINA - Start****************************************
    {
      path: '/pageundermaintenance',
      component: PageMaintenanceLayout,
     // beforeEnter: ifLogin,
      children: [
        {
          name: 'page_under_maintenance',
          path: 'page_under_maintenance',
          component: () =>
            import(
              '../components/auth/pagemaintenance/pagemaintenance.vue'
            ),
          props: true,
        },
        {
          name: 'page_under_maintenance_provider',
          path: 'page_under_maintenance_provider',
          component: () =>
            import(
              '../components/auth/pagemaintenance/pagemaintenancetraining.vue'
            ),
          props: true,
        },
        {
          name: 'page_under_maintenance_consultant',
          path: 'page_under_maintenance_consultant',
          component: () =>
            import(
              '../components/auth/pagemaintenance/pagemaintenanceconsultant.vue'
            ),
          props: true,
        },
        {
          name: 'page_under_maintenance_esc',
          path: 'page_under_maintenance_esc',
          component: () =>
            import(
              '../components/auth/pagemaintenance/pagemaintenanceesc.vue'
            ),
          props: true,
        },
        {
          name: 'page_under_maintenance_media',
          path: 'page_under_maintenance_media',
          component: () =>
            import(
              '../components/auth/pagemaintenance/pagemaintenancemedia.vue'
            ),
          props: true,
        },
      ],
    },
  // *******************************TAHMINA - END****************************************
    ...FimmRoutes,
    ...DistributorRoutes,
    ...ConsultantRoutes,
    ...OtherRoutes,
    ...EscRoutes,
  ],
})
