import AppLayoutConsultant from "../components/consultant/AppLayout";
import AuthLayoutConsultant from "@/components/auth/AuthLayoutConsultant";
import AuthLayoutConsultantRecoverPass from "../components/auth/AuthLayoutRecoverPassword";
import AuthLayoutConsultantFirstTimeUser from "../components/auth/AuthLayoutConsultantFirstTimeUser";


const ifLogin = (to, from, next) => {
    const appUser = localStorage.getItem("user");
    if (appUser === null || appUser === "undefined") {
        next();
    } else if (JSON.parse(appUser).roles.includes("fimm")) {
        next("fimm/dashboard");
    } else if (JSON.parse(appUser).roles.includes("distributor")) {
        next("distributor/dashboard");
    } else if (JSON.parse(appUser).roles.includes("consultant")) {
        next("consultant/dashboard");
    }
};

const ifAuthenticatedConsultant = (to, from, next) => {
    const appUser = localStorage.getItem("user");
    if (appUser === null || appUser === "undefined") {
        next("login-consultant");
    } else {
        next();
    }
};

export default [{
        path: "/auth-consultant",
        component: AuthLayoutConsultant,
        beforeEnter: ifLogin,
        children: [{
                name: "login-consultant",
                path: "login-consultant",
                component: () =>
                    import ("../components/auth/login/Login-consultant.vue")
            },
            {
                name: "signup-consultant",
                path: "signup-consultant",
                component: () =>
                    import ("../components/auth/signup/Signup-consultant.vue")
            }
        ]
    },
    {
        path: "/auth-consultant-recover",
        component: AuthLayoutConsultantRecoverPass,
        children: [{
            name: "consultant-recover-password",
            path: "recover-password",
            component: () =>
                import ("../components/auth/recover-password/RecoverPassword.vue"),
            props: true
        }]
    },
    {
        path: "/auth",
        component: AuthLayoutConsultantFirstTimeUser,
        children: [{
            name: "consultant-first-time-user",
            path: "first-time-user",
            component: () =>
                import (
                    "../components/auth/first-time-user/ConsultantFirstTimeUserResetPassword.vue"
                ),
            props: true
        }]
    },
    /* ---------------CONSULTANT PAGES--------------------- */
    {
        name: "Consultant",
        path: "/consultant",
        component: AppLayoutConsultant,
        // meta: {
        //     progress: {
        //         func: [
        //             { call: 'color', modifier: 'temp', argument: '#ffb000' },
        //             { call: 'fail', modifier: 'temp', argument: '#6e0000' },
        //             { call: 'location', modifier: 'temp', argument: 'top' },
        //             {
        //                 call: 'transition',
        //                 modifier: 'temp',
        //                 argument: { speed: '1.5s', opacity: '0.6s', termination: 400 },
        //             },
        //         ],
        //     },
        // },
        children: [{
            name: "dashboard",
            path: '/consultant/dashboard',
            component: () =>
              import("../components/dashboard_consultant/dashboard.vue"),
            default: true
          },
            {
                name: "css",
                path: "css",
                component: () =>
                    import ("../pages/demo/Icons_n_colors/icons_n_colors.vue")
            },
            //details registration
            {
                name: "consultant-registration-update",
                path: "consultant-update-registration",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/cm_registration_application.vue"
                        // "../pages/consultant-management/applicant/cm_registration_application_v1.vue"
                    )
            },
            {
                name: "consultant-registration-update-v2",
                path: "consultant-update-registration-v2",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/cm_registration_application.vue"
                    )
            },
            {
                name: "c-consultantReviewProfile",
                path: "c-consultantReviewProfile",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile.vue"
                    )
            },
            {
                name: "c-consultantReviewProfilenotavailable",
                path: "c-consultantReviewProfilenotavailable",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile_not_available.vue"
                    )
            },
            {
                name: "c-consultantReviewProfileappealpending",
                path: "c-consultantReviewProfileappealpending",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile_appeal_pending.vue"
                    )
            },
            {
                name: "consultant-resignation-Consultant",
                path: "resignation",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/consultant_resignation.vue"
                    )
            },
            {
                name: "consultant-appeal-Consultant",
                path: "appeal",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/consultant_appeal.vue"
                    )
            },
            {
                name: "c-consultantReviewProfileappealaccepted",
                path: "c-consultantReviewProfileappealaccepted",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile_appeal_accepted.vue"
                    )
            },
            {
                name: "c-consultantReviewProfileappealrejected",
                path: "c-consultantReviewProfileappealrejected",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile_appeal_rejected.vue"
                    )
            },
            {
                name: "c-consultantReviewProfileFail",
                path: "c-consultantReviewProfileFail",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profilefail.vue"
                    )
            },
            {
                name: "c-consultantAppeal",
                path: "c-consultantAppeal",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm2_consultant_profile_fail.vue"
                    )
            },
            {
                name: "consultant-details-registration",
                path: "consultant-details-registration",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_detailsRegistration.vue"
                    )
            },

            {
                name: "consultant-termination",
                path: "consultant-termination",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_termination.vue"
                    )
            },
            {
                name: "consultant-termination-review",
                path: "consultant-termination-review",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_termination_review.vue"
                    )
            },
            {
                name: "consultant-resignation-review",
                path: "consultant-resignation-review",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_resignation_review.vue"
                    )
            },
            {
                name: "consultant-resignation",
                path: "consultant-resignation",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_resignation.vue"
                    )
            },
            {
                name: "consultant-details-registration-one-date",
                path: "consultant-details-registration-one-date",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_detailsRegistration_direct.vue"
                    )
            },
            {
                name: "api-test",
                path: "api-test",
                component: () =>
                    import ("../pages/consultant-management/applicant/api_test.vue"),
                props: true
            },
            {
                name: "appeal-api-test",
                path: "appeal-api-test",
                component: () =>
                    import ("../pages/consultant-management/applicant/appeal_apitest.vue")
            },
            {
                name: "announcement",
                path: "announcement",
                component: () =>
                    import ("../pages/admin-configuration/announcement/index.vue"),
                props: { role: "consultant" }
            },
            {
                name: "pending-task",
                path: "pending-task",
                component: () =>
                    import ("../pages/admin-configuration/pending-task/index.vue"),
                props: { role: "consultant" }
            },
            {
                name: "notification",
                path: "notification",
                component: () =>
                    import ("../pages/admin-configuration/notification/index.vue"),
                props: { role: "consultant" }
            },
            {
                name: "profile",
                path: "profile",
                component: () =>
                    import ("../pages/admin-configuration/profile/index.vue"),
                props: { role: "consultant" }
            },
            {
                name: "consultant-resit-exam",
                path: "consultant-resit-exam",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/consultant_resit.vue"
                    )
                    // import (
                    //     "../pages/consultant-management/applicant/cm02_consultant_resit_Consultant.vue"
                    // )
            },
            {
                name: "consultant-reschedule-exam",
                path: "consultant-reschedule-exam",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/consultant_reschedule.vue"
                    )
            },
            {
                name: "consultant-profile-Consultant",
                path: "applicant-profile",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/consultant_profile.vue"
                    )
            },

            {
                name: "consultant-profile-update-Consultant",
                path: "consultant-profile-update-Consultant",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_profile_update_Consultant.vue"
                    )
            },
            {
                name: "consultant-reset-password-New-Candidate",
                path: "consultant-reset-password-New-Candidate",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_reset_password_New_Candidate.vue"
                    )
            },
            {
                name: "consultant-self-registration-New-Candidate",
                path: "consultant-self-registration-New-Candidate",
                component: () =>
                    import (
                        "../pages/consultant-management/applicant/cm02_consultant_self_registration_New_Candidate.vue"
                    )
            },
            //test API
            {
                name: "consultant-api-playground",
                path: "api-playground",
                component: () =>
                    import (
                        "../modules/consultant-management/pages/api-playground.vue"
                        // "../pages/consultant-management/applicant/cm_registration_application_v1.vue"
                    )
            },

          //Consultant points
          {
            name: "consultant-cpd-points",
            path: "consultant-cpd-points",
            component: () =>
              import (
                "../modules/consultant-management/pages/consultant-points/consultantModuleSelectionList"
                )
          },
        ],
        beforeEnter: ifAuthenticatedConsultant
    }
];
