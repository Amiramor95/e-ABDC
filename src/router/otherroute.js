import AppLayout from "../components/admin/AppLayout";
import AuthLayoutOthers from "@/components/auth/AuthLayoutOthers";
import AuthLayoutOthersRecoverPass from "../components/auth/AuthLayoutRecoverPassword";

import TRPLayoutOthersRecoverPass from '../components/dashboard-trp/TRP_Dashboard'

import AuthLayoutEscRecoverPassword from "../components/auth/AuthLayoutEscRecoverPassword";
import AuthLayoutExamCentreProvider from "../components/auth/AuthLayoutExamCentreProvider";


import fmspage from "../components/fms/landingpage.vue";
import fmspageloggedin from "../components/fms/landingpagesignin";

const ifLogin = (to, from, next) => {
    if (
        localStorage.getItem("user") === null ||
        localStorage.getItem("user") === "undefined"
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
const ifAuthenticatedThirdParty = (to, from, next) => {
    if (
        localStorage.getItem('user') === null ||
        localStorage.getItem('user') === 'undefined'
    ) {
        next('login-third-party')
    } else {
        next()
    }
}
const ifAuthenticatedTrainingProvider = (to, from, next) => {
    if (
        localStorage.getItem('user') === null ||
        localStorage.getItem('user') === 'undefined'
    ) {
        next('login-training-provider')
    } else {
        next()
    }
}
const ifAuthenticatedMedia = (to, from, next) => {
    if (
        localStorage.getItem('user') === null ||
        localStorage.getItem('user') === 'undefined'
    ) {
        next('fms-website')
    } else {
        next()
    }
}

export default [


    /* ---------------TRAINING PROVIDER PAGES--------------------- */

    //START Training Provider Pages - Acap
    {
        name: 'Training Provider',
        path: '/training-provider',
        component: AppLayout,
        children: [{
                name: 'trp-dashboard',
                path: 'dashboard',
                component: () =>
                    import ('../components/dashboard/Dashboard.vue'),
                // default: true,
            },

            // {
            //     name: 'trp-register',
            //     path: 'trp-register',
            //     component: () =>
            //         import (
            //             '../pages/funds-malaysia/training_provider/trp_register.vue'
            //         ),
            //     props: true,
            // },
            {
                name: 'announcement',
                path: 'announcement',
                component: () =>
                    import ('../pages/admin-configuration/announcement/index.vue'),
                props: { role: 'training-provider' },
            },
            {
                name: 'pending-task',
                path: 'pending-task',
                component: () =>
                    import ('../pages/admin-configuration/pending-task/index.vue'),
                props: { role: 'training-provider' },
            },
            {
                name: 'notification',
                path: 'notification',
                component: () =>
                    import ('../pages/admin-configuration/notification/index.vue'),
                props: { role: 'training-provider' },
            },
            {
                name: 'profile',
                path: 'profile',
                component: () =>
                    import ('../pages/admin-configuration/profile/index.vue'),
                props: { role: 'training-provider' },
            },

            //END Training Provider Pages - Acap
            // CPD
            // TRP - PostVetting
            {
                name: 't-preVettingProgramList',
                path: 't-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_programList.vue'
                    ),
            },
            {
                name: 't-preVettingNewSubmission',
                path: 't-preVettingNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_newSubmission.vue'
                    ),
            },
            {
                name: 't-preVettingRepeatSubmission',
                path: 't-preVettingRepeatSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_repeatSubmission.vue'
                    ),
            },
            {
                name: 't-preVettingViewProgramList',
                path: 't-preVettingViewProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_viewProgramList.vue'
                    ),
            },
            {
                name: 't-preVettingEditProgram',
                path: 't-preVettingEditProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_editProgram.vue'
                    ),
            },
            {
                name: 't-preVettingViewParticipant',
                path: 't-preVettingViewParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPrevetting_viewParticipant.vue'
                    ),
            },

            {
                name: 't-preVettingViewProgramDetails',
                path: 't-preVettingViewProgramDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_viewProgramDetails.vue'
                    ),
            },

            {
                name: 't-preVettingAppealProgram',
                path: 't-preVettingAppealProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPreVetting_appealProgram.vue'
                    ),
            },

            {
                name: 'approvalAppeal-TpreVetting-submissionList',
                path: 'approvalAppeal-TpreVetting-submissionList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/appealApproval/cm04_apprAppealPreVetting_submissionList.vue'
                    ),
            },

            {
                name: 't-preVettingAmendProgram',
                path: 't-preVettingAmendProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPrevettig_amendProgram'
                    ),
            },
            {
                name: 't-preVettingUploadParticipant',
                path: 't-preVettingUploadParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/cm04_tPrevetting_uploadParticipant'
                    ),
            },

            // end CPD
        ],
        beforeEnter: ifAuthenticatedTrainingProvider,
    },


    // *******************************NURUL - START****************************************
    // *******************************NURUL - END****************************************



    // *******************************ACAP - START****************************************

    // START Third Party Page - Acap
    {
        name: 'Third Party',
        path: '/third-party',
        component: AppLayout,
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
        children: [{
                name: 'others-dashboard',
                path: 'dashboard',
                component: () =>
                    import ('../components/dashboard/Dashboard.vue'),
                // default: true,
            },
            {
                name: 'announcement',
                path: 'announcement',
                component: () =>
                    import ('../pages/admin-configuration/announcement/index.vue'),
                props: { role: 'third-party' },
            },
            {
                name: 'pending-task',
                path: 'pending-task',
                component: () =>
                    import ('../pages/admin-configuration/pending-task/index.vue'),
                props: { role: 'third-party' },
            },
            {
                name: 'notification',
                path: 'notification',
                component: () =>
                    import ('../pages/admin-configuration/notification/index.vue'),
                props: { role: 'third-party' },
            },
            {
                name: 'profile',
                path: 'profile',
                component: () =>
                    import ('../pages/admin-configuration/profile/index.vue'),
                props: { role: 'third-party' },
            },
            // 3rd Party Company Registration Start
            {
                name: 'company-registration',
                path: 'company-registration',
                component: () =>
                    import (
                        '../pages/funds-malaysia/thirdparty/cm5_thirdparty_CompanyRegistration.vue'
                    ),
                props: { role: 'third-party' },
            },
            {
              name: 'company-registration-submission-list',
              path: 'company-registration-submission-list',
              component: () =>
                  import (
                      '../pages/funds-malaysia/thirdparty/cm5_thirdparty_application_list.vue'
                  ),
              props: { role: 'third-party' },
          },

          {
            name: 'company-registration-details',
            path: 'company-registration-details',
            component: () =>
                import (
                    '../pages/funds-malaysia/thirdparty/cm5_thirdparty_detail.vue'
                ),
            props: { role: 'third-party' },
        },

            // 3rd Party Company Registration End

            // 3rd Party Fund Creation Start
            {
                name: 'fund-list',
                path: 'fund-list',
                component: () =>
                    import (
                        '../pages/funds-malaysia/thirdparty/cm5_thirdparty_fundCreationList.vue'
                    ),
                // props: { role: 'third-party' },
            },
            {
                name: 'fund-creation',
                path: 'fund-creation',
                component: () =>
                    import (
                        '../pages/funds-malaysia/thirdparty/cm5_thirdparty_fundCreation.vue'
                    ),
                // props: { role: 'third-party' },
            },
        ],
        beforeEnter: ifAuthenticatedThirdParty,
    },
    // END Third Party Pages - Acap

    // START FMS Website - Acap
    {
        name: 'media',
        path: 'media',
        component: fmspageloggedin,
        children: [{
                name: 'fms-websites',
                path: 'fms-websites',
            },
            {
                name: 'media-user-profile',
                path: 'media-user-profile',
                component: () =>
                    import (
                        '../pages/fms_website/Media_User_Profile'
                    ),
            }, {
                name: 'media-mgmnt-dir',
                path: 'media-mgmnt-dir',
                component: () =>
                    import (
                        '../pages/fms_website/Media_Management_Company_Directory'
                    ),
            },
            {
                name: 'media-nav-list',
                path: 'media-nav-list',
                component: () =>
                    import (
                        '../pages/fms_website/Media_Nav_Page'
                    ),
            },
        ],
        beforeEnter: ifAuthenticatedMedia,
    },
    // END FMS Website - Acap

    // *******************************ACAP - END****************************************




    // *******************************SYAHRIN - START****************************************
    // *******************************SYAHRIN - END****************************************





    // *******************************SABIR - START****************************************
    // *******************************SABIR - END****************************************





    // *******************************SANTOSH - START****************************************
    // *******************************SANTOSH - END****************************************





    // *******************************BINAY - START****************************************
    // *******************************BINAY - END****************************************




    // *******************************KUMAR - START****************************************
    // *******************************KUMAR - END****************************************




    // *******************************PRAJWAL - START****************************************

    //Training Provider before approval page -- PRAJWAL
    {
      path: '/training-provider',
      component: TRPLayoutOthersRecoverPass,
      children: [
        //  trp-register dashboard here
        {
          name: 'trp-register',
          path: 'trp-register',
          component: () =>
            import (
              '../pages/funds-malaysia/training_provider/trp_register.vue'
              ),
          props: true,
        },
      ],
    },
    // *******************************PRAJWAL - END****************************************
]
