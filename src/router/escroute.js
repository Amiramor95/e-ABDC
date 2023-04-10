
import AppEscLayout from '../components/esc/AppLayout'
import * as FimmUserAuthentication from './fimm'

const ifAuthenticatedESC = (to, from, next) => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === 'undefined'
  ) {
    next('login-exam-centre-provider')
  } else {
    next()
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
    JSON.parse(localStorage.getItem('user')).user_type === 'third-party'
  ) {
    next('third-party/dashboard')
  } else if (
    JSON.parse(localStorage.getItem('user')).user_type === 'training-provider'
  ) {
    next('training-provider/dashboard')
  } else if (JSON.parse(localStorage.getItem('user')).user_type === 'media') {
    next('fms-websites')
  } else if (JSON.parse(localStorage.getItem('user')).user_type === 'esc') {
    next('esc/dashboard')
  }
}

export default [
  /* ------------------ESC PAGES -------------------------- */
  {
    name: 'ESC',
    path: '/esc',
    component: AppEscLayout,
    meta: {
      progress: {
        func: [{
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
    children: [
      // *******************************SANTOSH - START****************************************
      {
        name: 'esc-dashboard',
        path: 'esc-dashboard',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
        component: () =>
          import('../components/dashboard-esc/dashboard.vue'),
        // default: true,
      },
      {
        name: 'esc-user-profile-set-up',
        path: 'esc-user-profile-set-up',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
        component: () =>
          import(
            '../pages/esc/setup-esc-profile'
          ),
      },
      {
        name: 'esc-change-password',
        path: 'esc-change-password',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
        component: () =>
          import(
            '../pages/admin-configuration/change-password/cm0_change_password.vue'
          ),
      },
      {
        name: 'esc-profile',
        path: 'esc-profile',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
        component: () =>
          import('../pages/admin-configuration/profile/index.vue'),
      },
      {
        name: 'list-esc-profile',
        path: 'list-esc-profile',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedEscProvider,
        component: () =>
          import(
            '../pages/esc/list-esc-profile'
          ),
      },
      {
        name: 'list-esc-profile-approver',
        path: 'list-esc-profile-approver',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () =>
          import(
            '../pages/esc/list-esc-profile-approver'
          ),
      },
      {
        name: 'edit-esc-profile-approver',
        path: 'edit-esc-profile-approver',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () =>
          import(
            '../pages/esc/edit-esc-profile-approver'
          ),
      },
      {
        name: 'view-esc-profile',
        path: 'view-esc-profile',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
        component: () =>
          import(
            '../pages/esc/view-esc-profile'
          ),
      },
      {
        name: 'list-esc-centre-management',
        path: 'list-esc-centre-management',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () => import(
          '../pages/esc/list-esc-centre-management'
        ),
      },
      {
        name: 'list-esc-company-user-view-company-admin',
        path: 'list-esc-company-user-view-company-admin',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () => import(
          '../pages/esc/list-esc-company-user-view-company-admin'
        ),
      },
      {
        name: 'view-esc-user-details',
        path: 'view-esc-user-details',
        // beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () => import(
          '../pages/esc/view-esc-user-details'
        ),
      },
      {
        name: 'edit-esc-role',
        path: 'edit-esc-role',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () => import(
          '../pages/esc/edit-esc-role'
        ),
      },
      {
        name: 'create-esc-exam-centre',
        path: 'create-esc-exam-centre',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedCompanyAdmin,
        component: () => import(
          '../pages/esc/create-esc-exam-centre'
        ),
      },
      {
        name: 'exam-session-generation-esc',
        path: 'exam-session-generation-esc',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedRegisteredEscProvider,
        component: () =>
          import(
            '../pages/exam-operation/fimm/exam-session-generation-esc.vue'
          ),
      },
      {
        name: 'list-exam-session-generation-esc',
        path: 'list-exam-session-generation-esc',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedRegisteredEscProvider,
        component: () =>
          import(
            '../pages/exam-operation/fimm/list-exam-session-generation-esc.vue'
          ),
      },
      {
        name: 'edit-exam-session-esc',
        path: 'edit-exam-session-esc',
        beforeEnter: FimmUserAuthentication.ifAuthenticatedRegisteredEscProvider,
        component: () =>
          import('../pages/esc/edit-exam-session-esc'),
      },
      // *******************************SANTOSH - END****************************************
    ],
    beforeEnter: ifAuthenticatedESC,

    // *******************************NURUL - START****************************************
    // *******************************NURUL - END****************************************

    // *******************************ACAP - START****************************************
    // *******************************ACAP - END****************************************

    // *******************************SYAHRIN - START****************************************
    // *******************************SYAHRIN - END****************************************

    // *******************************SABIR - START****************************************
    // *******************************SABIR - END****************************************

    // *******************************BINAY - START****************************************
    // *******************************BINAY - END****************************************

    // *******************************KUMAR - START****************************************
    // *******************************KUMAR - END****************************************

    // *******************************PRAJWAL - START****************************************
    // *******************************PRAJWAL - END****************************************
  },
]
