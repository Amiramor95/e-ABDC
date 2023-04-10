import AppLayout from "../components/admin/AppLayout";
import AuthLayout from "../components/auth/AuthLayout";

import * as FimmUserAuthentication from "./fimm";


const EmptyParentComponent = {
    template: "<router-view></router-view>",
};

// const ifLogin = (to, from, next) => {
//     if (
//         localStorage.getItem("user") === null ||
//         localStorage.getItem("user") === "undefined"
//     ) {
//         next()
//     } else if (JSON.parse(localStorage.getItem('user')).user_type === 'fimm') {
//         next('fimm/dashboard')
//     } else if (
//         JSON.parse(localStorage.getItem('user')).user_type === 'distributor'
//     ) {
//         next('distributor/dashboard')
//     } else if (
//         JSON.parse(localStorage.getItem('user')).user_type === 'consultant'
//     ) {
//         next('consultant/dashboard')
//     } else if (
//         JSON.parse(localStorage.getItem('user')).user_type === 'third-party'
//     ) {
//         next('third-party/dashboard')
//     } else if (
//         JSON.parse(localStorage.getItem('user')).user_type === 'training-provider'
//     ) {
//         next('training-provider/dashboard')
//     } else if (JSON.parse(localStorage.getItem('user')).user_type === 'media') {
//         next('fms-websites')
//     } else if (JSON.parse(localStorage.getItem('user')).user_type === 'esc') {
//         next('esc/dashboard')
//     }
// }


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
export default [

    /* ---------------ADMIN PAGES--------------------- */
    {
        name: 'Admin',
        path: '/fimm',
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
                name: 'dashboard',
                path: 'dashboard',
                component: () =>
                    import ('../components/dashboard/Dashboard.vue'),
                default: true,
            },
            {
                name: 'bankruptcy-check',
                path: 'bankruptcy-check',
                component: () =>
                    import ('../pages/demo/bankruptcy-check/bankruptcy_demo.vue'),
            },
            {
                name: 'css',
                path: 'css',
                component: () =>
                    import ('../pages/demo/Icons_n_colors/icons_n_colors.vue'),
            },
            {
                name: 'calendar-api',
                path: 'calendar-api',
                component: () =>
                    import ('../pages/dummy.vue'),
            },
            {
                name: 'announcement',
                path: 'announcement',
                component: () =>
                    import ('../pages/admin-configuration/announcement/index.vue'),
                props: { role: 'fimm' },
            },
            {
                name: 'pending-task',
                path: 'pending-task',
                component: () =>
                    import ('../pages/admin-configuration/pending-task/index.vue'),
                props: { role: 'fimm' },
            },
            {
                name: 'notification',
                path: 'notification',
                component: () =>
                    import ('../pages/admin-configuration/notification/index.vue'),
                props: { role: 'fimm' },
            },
            {
                name: 'profile',
                path: 'profile',
                component: () =>
                    import ('../pages/admin-configuration/profile/index.vue'),
                props: { role: 'fimm' },
            },
            {
                name: 'change-password',
                path: 'change-password',
                component: () =>
                    import (
                        '../pages/admin-configuration/change-password/cm0_change_password.vue'
                    ),
            },
            //USER MANAGEMENT - START
            {
                name: 'user-management-application',
                path: 'user-management-application',
                component: () =>
                    import (
                        '../pages/admin-configuration/user-management/cm0_fimm_user_role.vue'
                    ),
            },
            {
                name: 'user-management-list',
                path: 'user-management-list/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/user-management/cm0_fimm_user_manage_list.vue'
                    ),
            },
            {
                name: 'user-management-review',
                path: 'user-management-review/:USER_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/user-management/cm0_fimm_user_role_review.vue'
                    ),
            },
            {
                name: 'user-management-details',
                path: 'user-management-details/:USER_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/user-management/cm0_fimm_user_role_details.vue'
                    ),
            },
            //USER MANAGEMENT - END

            {

                name: 'f-moduleRevocationList',
                path: 'f-moduleRevocationList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationList.vue'
                    ),
            },
            {
                name: 'f-moduleRevocationListProgram',
                path: 'f-moduleRevocationListProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationListProgram.vue'
                    ),
            },
            {
                name: 'f-moduleRevocationListProgramDetails',
                path: 'f-moduleRevocationListProgramDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationDetails.vue'
                    ),
            },
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'f-appealReadingList',
                path: 'f-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_fimmList.vue'
                    ),
            },
            {
                name: 'f-appealReadingViewDetails',
                path: 'f-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_f_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingListProgramList',
                path: 'd-appealTeachingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingViewDetails',
                path: 'd-appealTeachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealAcademicList',
                path: 'd-appealAcademicList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicListProgramList',
                path: 'd-appealAcademicListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicViewDetails',
                path: 'd-appealAcademicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealFinancialList',
                path: 'd-appealFinancialList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/cm04_appealFinancial_distributorList.vue'
                    ),
            },

            {
                name: 'd-appealFpam_list',
                path: 'd-appealFpam_list',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/cm04_fAppealFpam_list.vue'
                    ),
            },
            {
                name: 'f-fpAppealCertifiedModuleList',
                path: 'f-fpAppealCertifiedModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_program_submissionList.vue'
                    ),
            },
            {
                name: 'f-fpmAppealIslamicModuleList',
                path: 'f-fpmAppealIslamicModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_program_submissionList.vue'
                    ),
            },
            {
                name: 'f-fpmAppealRegisteredModuleList',
                path: 'f-fpmAppealRegisteredModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_program_submissionList.vue'
                    ),
            },
            {
                name: 'f-fpmAppealShariahModuleList',
                path: 'f-fpmAppealShariahModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_program_submissionList.vue'
                    ),
            },
            {
                name: 'd-appealFinancialListProgramList',
                path: 'd-appealFinancialListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealFinancialViewDetails',
                path: 'd-appealFinancialViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_viewDetails.vue'
                    ),
            },
            // APEAL

            {
                name: 'appeal-selectionList',
                path: 'appeal-selectionList',
                component: () =>
                    import (
                        '../pages/continuing-development/cm04_appeal_selectionList.vue'
                    ),
            },

            {
                name: 'd-appealWritingList',
                path: 'd-appealWritingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealWritingListProgramList',
                path: 'd-appealWritingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealWritingViewDetails',
                path: 'd-appealWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealReadingListProgramList',
                path: 'd-appealReadingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealReadingViewDetails',
                path: 'd-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_d_viewDetails.vue'
                    ),
            },
            {
                name: 'finance-account-setting',
                path: 'finance-account-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-finance/cm0_finance_account_setting.vue'
                    ),
            },
            {
                name: 'd-appealReadingList',
                path: 'd-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_distributorList.vue'),
            },

            {
                name: 'admin-dashboard',
                path: 'admin-dashboard',
                component: () =>
                    import ('../components/dashboard_admin/Dashboard.vue'),
            },


            {
                name: 'admin-dashboard-main-setting',
                path: 'admin-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_main_setting.vue'
                    ),
            },
            {
                name: 'admin-dashboard-list',
                path: 'admin-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_dashboard_list.vue'
                    ),
            },
            {
                name: 'admin-dashboard-setting',
                path: 'admin-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin-dashboard-setting.vue'
                    ),
            },
            {
                name: 'system-information',
                path: 'system-information',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_system_information.vue'
                    ),
            },
            // Consultant Dashboard Setting
            {
                name: 'consultant-dashboard-main-setting',
                path: 'consultant-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_main_setting.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-list',
                path: 'consultant-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_dashboard_list.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-setting',
                path: 'consultant-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant-dashboard-setting.vue'
                    ),
            },
            // Finance Dashboard Setting
            {
                name: 'finance-dashboard-main-setting',
                path: 'finance-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_main_setting.vue'
                    ),
            },
            {
                name: 'finance-dashboard-list',
                path: 'finance-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_dashboard_list.vue'
                    ),
            },
            {
                name: 'finance-dashboard-setting',
                path: 'finance-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance-dashboard-setting.vue'
                    ),
            },
            // Annual Fee Dashboard Setting
            {
                name: 'afms-dashboard-main-setting',
                path: 'afms-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_main_setting.vue'
                    ),
            },
            {
                name: 'afms-dashboard-list',
                path: 'afms-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_dashboard_list.vue'
                    ),
            },
            {
                name: 'afms-dashboard-setting',
                path: 'afms-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms-dashboard-setting.vue'
                    ),
            },
            // Report main Setting
            {
                name: 'report-main-setting',
                path: 'report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/report-main-setting.vue'
                    ),
            },
            // Consultant Alert Report
            {
                name: 'cas-report-main-setting',
                path: 'cas-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-report-main-setting.vue'
                    ),
            },
            {
                name: 'cas-utc-tagging-list-report',
                path: 'cas-utc-tagging-list-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-utc-tagging-list-report.vue'
                    ),
            },
            {
                name: 'cas-enquiry-report',
                path: 'cas-enquiry-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-enquiry-report.vue'
                    ),
            },
            {
                name: 'total-complain-fimm',
                path: 'total-complain-fimm',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-total-complain-fimm.vue'
                    ),
            },
            {
                name: 'sanctioned-fimm-distributor',
                path: 'sanctioned-fimm-distributor',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-sanctioned-fimm-distributor.vue'
                    ),
            },
            // CPD Report
            {
                name: 'cpd-report-main-setting',
                path: 'cpd-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-report-main-setting.vue'
                    ),
            },
            {
                name: 'cpd-program-secretariat-report',
                path: 'cpd-program-secretariat-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-secretariat.vue'
                    ),
            },
            {
                name: 'cpd-program-repeated-report',
                path: 'cpd-program-repeated-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-repeated.vue'
                    ),
            },
            {
                name: 'cpd-evaluation-report',
                path: 'cpd-evaluation-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-evaluation-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report',
                path: 'cpd-fpam-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report-detail',
                path: 'cpd-fpam-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-academic-report',
                path: 'cpd-academic-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report.vue'
                    ),
            },
            {
                name: 'cpd-academic-report-detail',
                path: 'cpd-academic-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-reading-report',
                path: 'cpd-reading-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report.vue'
                    ),
            },
            {
                name: 'cpd-reading-report-detail',
                path: 'cpd-reading-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report',
                path: 'cpd-teaching-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report-detail',
                path: 'cpd-teaching-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report',
                path: 'cpd-waiver-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report-detail',
                path: 'cpd-waiver-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-writing-report',
                path: 'cpd-writing-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report.vue'
                    ),
            },
            {
                name: 'cpd-writing-report-detail',
                path: 'cpd-writing-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report',
                path: 'cpd-record-consultant-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report-detail',
                path: 'cpd-record-consultant-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-report',
                path: 'cpd-record-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report.vue'
                    ),
            },
            {
                name: 'cpd-record-report-detail',
                path: 'cpd-record-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report-detail.vue'
                    ),
            },
            // FINANCE Report
            {
                name: 'finance-report-main-setting',
                path: 'finance-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-report-main-setting.vue'
                    ),
            },
            {
                name: 'finance-utc-report',
                path: 'finance-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-report.vue'
                    ),
            },
            {
                name: 'finance-prc-report',
                path: 'finance-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-summary-report',
                path: 'finance-utc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-summary-report',
                path: 'finance-prc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-ut-report',
                path: 'finance-exam-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-prs-report',
                path: 'finance-exam-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-ut-report',
                path: 'finance-exemption-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-prs-report',
                path: 'finance-exemption-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-approved-utc-report',
                path: 'finance-approved-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-utc-report.vue'
                    ),
            },
            {
                name: 'finance-approved-prc-report',
                path: 'finance-approved-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-exemption-summary-report',
                path: 'finance-utc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-exemption-summary-report',
                path: 'finance-prc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-ut-report',
                path: 'finance-candidate-exam-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-ut-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-prs-report',
                path: 'finance-candidate-exam-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-ut-report',
                path: 'finance-prepayment-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-ut-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-prs-report',
                path: 'finance-prepayment-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-refund-report',
                path: 'finance-prepayment-refund-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-refund-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-ut-report',
                path: 'finance-cute-result-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-ut-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-prs-report',
                path: 'finance-cute-result-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-prs-report.vue'
                    ),
            },
            {
                name: 'finance-amsf-collection-report',
                path: 'finance-amsf-collection-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-amsf-collection-report.vue'
                    ),
            },

            // Admin Report
            {
                name: 'admin-report-main-setting',
                path: 'admin-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-report-main-setting.vue'
                    ),
            },
            {
                name: 'admin-user-report',
                path: 'admin-user-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-user-report.vue'
                    ),
            },
            {
                name: 'admin-user-list-detail',
                path: 'admin-user-list-detail/:userid/:companyid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-user-detail-report.vue'
                    ),
            },
            {
                name: 'admin-sms-log-report',
                path: 'admin-sms-log-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-sms-log-report.vue'
                    ),
            },
            {
                name: 'admin-summary-sms-log-report',
                path: 'admin-summary-sms-log-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-summary-sms-log-report.vue'
                    ),
            },
            {
                name: 'admin-screen-management-report',
                path: 'admin-screen-management-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-screen-management-report.vue'
                    ),
            },
            {
                name: 'admin-address-report',
                path: 'admin-address-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-address-management-report.vue'
                    ),
            },
            {
                name: 'admin-calendar-management-report',
                path: 'admin-calendar-management-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-calendar-management-report.vue'
                    ),
            },
            {
                name: 'admin-salutation-report',
                path: 'admin-salutation-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-salutation-report.vue'
                    ),
            },
            {
                name: 'admin-declaration-report',
                path: 'admin-declaration-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-declaration-report.vue'
                    ),
            },
            {
                name: 'admin-fee-management-report',
                path: 'admin-fee-management-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-fee-management-report.vue'
                    ),
            },
            {
                name: 'admin-circular-management-report',
                path: 'admin-circular-management-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-circular-management-report.vue'
                    ),
            },
            {
                name: 'admin-announcement-management-report',
                path: 'admin-announcement-management-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-announcement-management-report.vue'
                    ),
            },
            {
                name: 'admin-user-matrix-report',
                path: 'admin-user-matrix-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-user-matrix-report.vue'
                    ),
            },
            {
                name: 'admin-distributor-matrix-report',
                path: 'admin-distributor-matrix-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-distributor-matrix-report.vue'
                    ),
            },
            {
                name: 'admin-fimm-matrix-report',
                path: 'admin-fimm-matrix-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-fimm-matrix-report.vue'
                    ),
            },
            {
                name: 'admin-distributor-report-matrix',
                path: 'admin-distributor-report-matrix',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-distributor-report-matrix.vue'
                    ),
            },
            {
                name: 'admin-fimm-report-matrix',
                path: 'admin-fimm-report-matrix',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-fimm-report-matrix.vue'
                    ),
            },
            {
                name: 'admin-user-summary-report',
                path: 'admin-user-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-user-summary-report.vue'
                    ),
            },
            {
                name: 'admin-event-log-report',
                path: 'admin-event-log-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-event-log-report.vue'
                    ),
            },
            {
                name: 'admin-templatelist-report',
                path: 'admin-templatelist-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-templatelist-report.vue'
                    ),
            },
            {
                name: 'admin-id-masking-report',
                path: 'admin-id-masking-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-id-masking-report.vue'
                    ),
            },
            {
                name: 'admin-approval-report',
                path: 'admin-approval-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-approval-report.vue'
                    ),
            },
            {
                name: 'admin-financecode-report',
                path: 'admin-financecode-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/ADMIN/admin-financecode-report.vue'
                    ),
            },
            // Consultant Management Report
            {
                name: 'consultant-report-main-setting',
                path: 'consultant-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CONSULTANT/consultant-report-main-setting.vue'
                    ),
            },
            {
                name: 'consultant-details-report',
                path: 'consultant-details-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CONSULTANT/consultant-details-report.vue'
                    ),
            },
            {
                name: 'consultant-registration-report',
                path: 'consultant-registration-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CONSULTANT/consultant-registration-report.vue'
                    ),
            },
            {
                name: 'consultant-registration-summary-report',
                path: 'consultant-registration-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CONSULTANT/consultant-registration-summary-report.vue'
                    ),
            },



            {

                name: 'consultant-points',
                path: 'consultant-points',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/consultant-points/consultant_point_list'),
            },
            {

                name: 'consultant-cpd-points-details',
                path: 'consultant-cpd-points-details',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/consultant-points/consultant_point_details.vue'
                    ),
            },

            // Consultant points end
            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'),
            },

            {
                name: 'f-writingViewDetails',
                path: 'f-writingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_dWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'approvalWritingDistributorList',
                path: 'approvalWritingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_distributorList.vue'
                    ),
            },
            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'approvalWritingViewDetails',
                path: 'approvalWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'f-approvalViewDetailParticipant',
                path: 'f-approvalViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetailsParticipant.vue'
                    ),
            },
            {
                name: 'approvalWritingModuleList',
                path: 'approvalWritingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_moduleList.vue'),
            },



            {
                name: 'f-approvalWritingViewDetailParticipant',
                path: 'f-approvalWritingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'f-appealReadingList',
                path: 'f-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_fimmList.vue'
                    ),
            },
            {
                name: 'f-appealReadingViewDetails',
                path: 'f-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_f_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingListProgramList',
                path: 'd-appealTeachingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingViewDetails',
                path: 'd-appealTeachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealAcademicList',
                path: 'd-appealAcademicList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicListProgramList',
                path: 'd-appealAcademicListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicViewDetails',
                path: 'd-appealAcademicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealFinancialList',
                path: 'd-appealFinancialList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_distributorList.vue'),
            },



            {
                name: 'd-appealFinancialListProgramList',
                path: 'd-appealFinancialListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealFinancialViewDetails',
                path: 'd-appealFinancialViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_d_viewDetails.vue'
                    ),
            },

            // MODULE 04
            // FIMM CPD
            {
                name: 'f-postVettingProgramList',
                path: 'f-postVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/postVetting/cm04_fPostVetting_programList.vue'
                    ),
            },
            {
                name: 'f-preVettingProgramList',
                path: 'f-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_programList.vue'
                    ),
            },
            {
                name: 'approval-FpreVetting-view-participant',
                path: 'approval-FpreVetting-view-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewParticipant.vue'
                    ),
            },
            {
                name: 'apprFPreVettingViewDetails',
                path: 'apprFPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewDetails.vue'),
            },

            {
                name: 'f-preVettingEditProgram',
                path: 'f-preVettingEditProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_editProgram.vue'
                    ),
            },
            {
                name: 'f-preVettingViewParticipant',
                path: 'f-preVettingViewParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_viewParticipant.vue'
                    ),
            },
            {
                name: 'f-preVettingUploadParticipant',
                path: 'f-preVettingUploadParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPrevetting_uploadParticipant.vue'),
            },

            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'f-writingViewDetails',
                path: 'f-writingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_dWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'approvalWritingDistributorList',
                path: 'approvalWritingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_distributorList.vue'),
            },
            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'),
            },
            {
                name: 'approvalWritingViewDetails',
                path: 'approvalWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'f-approvalViewDetailParticipant',
                path: 'f-approvalViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetailsParticipant.vue'
                    ),
            },
            {
                name: 'approvalWritingModuleList',
                path: 'approvalWritingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_moduleList.vue'
                    ),
            },
            {
                name: 'f-approvalWritingViewDetailParticipant',
                path: 'f-approvalWritingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },

            {
                name: 'approval-writing-allProgram',
                path: 'approval-writing-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-writing-viewSubmission',
                path: 'approval-writing-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewSubmission.vue'),
            },


            {
                name: 'approval-writing-revokeProgram',
                path: 'approval-writing-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_revokeProgram.vue'
                    ),
            },
            {
                name: 'approval-writingView-participant',
                path: 'approval-writingView-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewParticipant.vue'),
            },


            // APPROVAL PROGRAM LIST - START
            {
                name: 'approval-selectionList',
                path: 'approval-selectionList',
                component: () =>
                    import (
                        '../pages/continuing-development/cm04_approval_selectionList.vue'),
            },
            {
                name: 'f-postVettingProgramList',
                path: 'f-postVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/postVetting/cm04_fPostVetting_programList.vue'
                    ),
            },
            {
                name: 'f-preVettingProgramList',
                path: 'f-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_programList.vue'),
            },
            // APPROVAL PROGRAM LIST - END

            // PREVETTING APPROVAL - START
            {
                name: 'approvalPreVettingDistributorList',
                path: 'approvalPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_distributorList.vue'
                    ),
            },
            {
                name: 'apprFPreVettingDistributorList',
                path: 'apprFPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_distributorList'),
            },

            // Fimm - Post Vetting Approval
            {
                name: 'approval-postVetting-distributorList',
                path: 'approval-postVetting-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_distributorList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-programList',
                path: 'approval-postVetting-programList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_programList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-allProgram',
                path: 'approval-postVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-reviewDetails',
                path: 'approval-postVetting-reviewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_reviewDetails.vue'
                    ),
            },
            {
                name: 'approval-view-participant',
                path: 'approval-view-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_viewParticipant.vue'),
            },
            {
                name: 'consultant-configuration',
                path: 'consultant-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-consultant/cm0_consultant_mainSetting.vue'
                    ),
            },
            {
                name: 'cpd-configuration',
                path: 'cpd-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-CPD/cpd-main-setting.vue'
                    ),
            },

            {
                name: 'approval-postVetting-viewSubmission',
                path: 'approval-postVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-postVetting-revokeProgram',
                path: 'approval-postVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_revokeProgram.vue'),
            },
            {
                name: 'annualFee-configuration',
                path: 'annualFee-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-annualFee/cm0_annualFee_mainSetting.vue'
                    ),
            },
            {
                name: 'annualFee-invoice-configuration',
                path: 'annualFee-invoice-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-annualFee/annualFee-invoice-configuration.vue'
                    ),
            },

            // end postvetting approval*

            // Fimm - Pre Vetting Approval
            // {
            //   name: "isdPreVettingDistributorList",
            //   path: "isdPreVettingDistributorList",
            //   component: () =>
            //     import(
            //       "../pages/continuing-development/distributor/preVetting/cm04_isdPreVetting_distributorList.vue"
            //     ),
            // },
            // {
            //   name: "isdPreVettingProgramList",
            //   path: "isdPreVettingProgramList",
            //   component: () =>
            //     import(
            //       "../pages/continuing-development/distributor/preVetting/cm04_isdPreVetting_programList.vue"
            //     ),
            // },
            // {
            //   name: "isdPreVettingViewDetails",
            //   path: "isdPreVettingViewDetails",
            //   component: () =>
            //     import(
            //       "../pages/continuing-development/distributor/preVetting/cm04_isdPreVetting_viewDetails.vue"
            //     ),
            // },
            // ids
            {
                name: 'approvalPreVettingDistributorList',
                path: 'approvalPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_distributorList.vue'),
            },
            {
                name: 'fundMalaysia-configuration',
                path: 'fundMalaysia-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fundMalaysia_mainSetting.vue'
                    ),
            },

            {
                name: 'apprFPreVettingDistributorList',
                path: 'apprFPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_distributorList'),
            },
            {
                name: 'distributor-fee',
                path: 'distributor-fee',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/distributor-fee.vue'
                    ),
            },

            {
                name: 'approvalFPreVettingProgramList',
                path: 'approvalFPreVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approvalFPreVettingViewDetails',
                path: 'approvalFPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprPreVetting_viewDetails.vue'),
            },
            {
                name: 'waiver-fee',
                path: 'waiver-fee',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/waiver-fee.vue'
                    ),
            },
            {
                name: 'consultant-fee',
                path: 'consultant-fee',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/consultant-fee.vue'
                    ),
            },

            {
                name: 'approval-FpreVetting-allProgram',
                path: 'approval-FpreVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-FpreVetting-viewSubmission',
                path: 'approval-FpreVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-FpreVetting-revokeProgram',
                path: 'approval-FpreVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_revokeProgram.vue'
                    ),
            },

            // RD circular - NISA
            {
                name: 'maintenance-list',
                path: 'maintenance-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/page-maintenance-management/cm0_maintenanceList.vue'
                    ),
            },
            {
                name: 'maintenance-newPage',
                path: 'maintenance-newPage',
                component: () =>
                    import (
                        '../pages/admin-configuration/page-maintenance-management/cm0_newPage.vue'
                    ),
            },
            {
                name: 'maintenance-edit',
                path: 'maintenance-edit',
                component: () =>
                    import (
                        '../pages/admin-configuration/page-maintenance-management/cm0_editPage.vue'
                    ),
            },
            {
                name: 'screen-access',
                path: 'screen-access',
                component: () =>
                    import (
                        '../pages/admin-configuration/screen-management/cm0_screenAccess.vue'
                    ),
            },
            {
                name: 'screen-module',
                path: 'screen-module',
                component: () =>
                    import (
                        '../pages/admin-configuration/screen-management/cm0_screenModule.vue'
                    ),
                props: true,
            },
            {
                name: 'd-mainlist',
                path: 'd-mainlist',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/distributor/mainlist.vue'
                    ),
                props: true,
            },
            {
                name: 'd-screen-module',
                path: 'd-screen-module',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/distributor/cm0_distributor_screenManagement.vue'
                    ),
                props: true,
            },
            {
                name: 'd-screen-access',
                path: 'd-screen-access',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/distributor/cm0_screenAccess.vue'
                    ),
                props: true,
            },
            {
                name: 'c-mainlist',
                path: 'c-mainlist',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/consultant/mainlist.vue'
                    ),
                props: true,
            },
            {
                name: 'c-screen-module',
                path: 'c-screen-module',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/consultant/cm0_consultant_screenManagement.vue'
                    ),
                props: true,
            },
            {
                name: 'c-screen-access',
                path: 'c-screen-access',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/consultant/screenAccess.vue'
                    ),
                props: true,
            },
            {
                name: 'third-mainlist',
                path: 'third-mainlist',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/third-party/mainlist.vue'
                    ),
                props: true,
            },
            {
                name: 'third-screen-module',
                path: 'third-screen-module',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/third-party/cm0_3rdParty_screenManagement.vue'
                    ),
                props: true,
            },
            {
                name: 'third-screen-access',
                path: 'third-screen-access',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/third-party/screenAccess.vue'
                    ),
                props: true,
            },
            {
                name: 'tp-mainlist',
                path: 'tp-mainlist',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/training-provider/mainlist.vue'
                    ),
                props: true,
            },
            {
                name: 'tp-screen-module',
                path: 'tp-screen-module',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/training-provider/cm0_trainingProvider_screenManagement.vue'
                    ),
                props: true,
            },
            {
                name: 'tp-screen-access',
                path: 'tp-screen-access',
                component: () =>
                    import (
                        '../pages/admin-configuration/other-access/training-provider/screenAccess.vue'
                    ),
                props: true,
            },
            {
                name: 'demo-pdfviewer',
                path: 'demo-pdfviewer',
                component: () =>
                    import ('../pages/demo/pdf-viewer'),
            },
            {
                name: 'demo-upload',
                path: 'demo-upload',
                component: () =>
                    import ('../pages/demo/upload-file'),
            },
            {
                name: 'demo-excelexport',
                path: 'demo-excelexport',
                component: () =>
                    import ('../pages/demo/export-excel/index'),
            },
            {
                name: 'demo-excel',
                path: 'demo-excel',
                component: () =>
                    import ('../components/excel-upload/index'),
            },
            {
                name: 'demo-excelviewer',
                path: 'demo-excelviewer',
                component: () =>
                    import ('../pages/demo/excel-viewer'),
            },
            {
                name: 'demo-koolreport',
                path: 'demo-koolreport',
                component: () =>
                    import ('../pages/demo/koolreport'),
            },
            {
                name: 'consultant-profile',
                path: 'consultant-profile',
                component: () =>
                    import ('../pages/consultant_profile.vue'),
            },
            {
                name: 'registered-case',
                path: 'registered-case',
                component: () =>
                    import ('../pages/registered_case.vue'),
            },
            // ---------------------START BY SANTOSH --------------
            // -------------------- EXAM OPERATION -----------------
            // start of company management
            {
                name: 'list-company',
                path: 'list-company',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-company.vue'
                    ),
            },
            {
                name: 'create-company',
                path: 'create-company',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/create-company.vue'
                    ),
            },
            {
                name: 'list-esc-company-user',
                path: 'list-esc-company-user',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/esc/list-esc-company-user'
                    ),
            },
            {
                name: 'view-company-profile',
                path: 'view-company-profile',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/view-company-profile.vue'
                    ),
            },
            {
                name: 'edit-company-profile',
                path: 'edit-company-profile',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-company-profile.vue'
                    ),
            },
            {
                name: 'list-company-reviewer',
                path: 'list-company-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-company-reviewer.vue'
                    ),
            },
            {
                name: 'edit-company-profile-reviewer',
                path: 'edit-company-profile-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-company-profile-reviewer.vue'
                    ),
            },
            {
                name: 'edit-company-profile-approver',
                path: 'edit-company-profile-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-company-profile-approver.vue'
                    ),
            },
            {
                name: 'list-company-approver',
                path: 'list-company-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-company-approver.vue'
                    ),
            },
            // end of company management
            // exam-operation
            {
                name: 'list-exam-type-details',
                path: 'list-exam-type-details',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/list-exam-type-details.vue'),
            },
            {
                name: 'exam-type-creation',
                path: 'examTypeCreation',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/exam-type-details-creation.vue'
                    ),
                props: true,
            },
            {
                name: 'view-exam-type-details',
                path: 'view-exam-type-details',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/view-exam-type-details.vue'),
                props: true,
            },
            {
                name: 'edit-exam-type-details',
                path: 'edit-exam-type-details',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-exam-type-details.vue'),
                props: true,
            },
            {
                name: 'list-exam-type-details-approver',
                path: 'list-exam-type-details-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-type-details-approver.vue'
                    ),
            },
            {
                name: 'edit-exam-type-details-approver',
                path: 'edit-exam-type-details-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-exam-type-details-approver.vue'
                    ),
            },
            {
                name: 'list-exam-type-details-reviewer',
                path: 'list-exam-type-details-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-type-details-reviewer.vue'
                    ),
            },
            {
                name: 'edit-exam-type-details-reviewer',
                path: 'edit-exam-type-details-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-exam-type-details-reviewer.vue'
                    ),
            },
            // exam operation centre management
            {
                name: 'list-centre-management',
                path: 'list-centre-management',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/list-centre-management.vue'),
            },
            {
                name: 'create-exam-centre',
                path: 'create-exam-centre',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                beforeRouteLeave(to, from) {
                    this.vm.model.isFirstTabSaved = false
                },
                component: () =>
                    import ('../pages/exam-operation/fimm/create-exam-centre.vue'),
            },
            {
                name: 'edit-exam-centre',
                path: 'edit-exam-centre',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSOrCompanyAdmin,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-exam-centre.vue'),
            },
            {
                name: 'view-exam-centre',
                path: 'view-exam-centre',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSOrCompanyAdmin,
                component: () =>
                    import ('../pages/exam-operation/fimm/view-exam-centre.vue'),
            },
            {
                name: 'create-exam-id',
                path: 'create-exam-id',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/create-exam-id.vue'),
            },
            {
                name: 'create-exam-id-edit',
                path: 'create-exam-id-edit',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/create-exam-id-edit.vue'),
            },
            {
                name: 'edit-exam-id',
                path: 'edit-exam-id',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-exam-id.vue'),
            },
            {
                name: 'edit-exam-id-edit',
                path: 'edit-exam-id-edit',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-exam-id-edit.vue'),
            },
            // ---------------exam session--------------
            {
                name: 'list-exam-session-setting',
                path: 'list-exam-session-setting',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-session-setting.vue'
                    ),
            },
            {
                name: 'create-exam-session-setting',
                path: 'create-exam-session-setting',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/create-exam-session-setting.vue'
                    ),
            },
            {
                name: 'create-exam-time',
                path: 'create-exam-time',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/create-exam-time.vue'
                    ),
            },
            {
                name: 'list-exam-time',
                path: 'list-exam-time',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-time.vue'
                    ),
            },
            {
                name: 'edit-exam-time',
                path: 'edit-exam-time',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-exam-time.vue'
                    ),
            },
            {
                name: 'exam-session-generation',
                path: 'exam-session-generation',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/exam-session-generation.vue'),
            },
            {
                name: 'list-centre-based-exam-session-generation',
                path: 'list-centre-based-exam-session-generation',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/centre-based-exam-session-generation.vue'
                    ),
            },
            {
                name: 'list-centre-based-exam-session-generation-reviewer',
                path: 'list-centre-based-exam-session-generation-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/centre-based-exam-session-generation-reviewer.vue'
                    ),
            },
            {
                name: 'list-centre-based-exam-session-generation-approver',
                path: 'list-centre-based-exam-session-generation-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/centre-based-exam-session-generation-approver.vue'
                    ),
            },
            {
                name: 'list-exam-session-generation',
                path: 'list-exam-session-generation',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-session-generation.vue'
                    ),
            },
            {
                name: 'list-exam-session-generation-approved',
                path: 'list-exam-session-generation-approved',
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-session-generation-approved.vue'
                    ),
            },
            {
                name: 'view-exam-session-details',
                path: 'view-exam-session-details',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/view-exam-session-details.vue'
                    ),
                props: true,
            },
            {
                name: 'edit-exam-session',
                path: 'edit-exam-session',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-exam-session.vue'),
            },
            {
                name: 'create-exam-session',
                path: 'create-exam-session',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import ('../pages/exam-operation/fimm/create-exam-session.vue'),
            },
            {
                name: 'candidate-session-list',
                path: 'candidate-session-list',
                component: () =>
                    import ('../pages/exam-operation/fimm/candidate-session-list.vue'),
            },
            {
                name: 'candidate-session-list-esc',
                path: 'candidate-session-list-esc',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedEscProvider,
                component: () =>
                    import ('../pages/exam-operation/fimm/candidate-session-list-esc.vue'),
            },
            {
                name: 'exam-session-generation-reviewer',
                path: 'exam-session-generation-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/exam-session-generation-reviewer.vue'
                    ),
            },
            {
                name: 'list-exam-session-generation-reviewer',
                path: 'list-exam-session-generation-reviewer',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSReviewer,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-session-generation-reviewer.vue'
                    ),
            },
            {
                name: 'exam-session-generation-approver',
                path: 'exam-session-generation-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/exam-session-generation-approver.vue'
                    ),
            },
            {
                name: 'list-exam-session-generation-approver',
                path: 'list-exam-session-generation-approver',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-session-generation-approver.vue'
                    ),
            },
            // ---------------end of exam session--------------
            // ----------------exam result management------------
            {
                name: 'list-exam-result',
                path: 'list-exam-result',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import ('../pages/exam-operation/fimm/list-exam-result.vue'),
            },
            {
                name: 'view-exam-result',
                path: 'view-exam-result',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import ('../pages/exam-operation/fimm/view-exam-result.vue'),
            },
            {
                name: 'list-exam-result-for-approval',
                path: 'list-exam-result-for-approval',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-exam-result-for-approval.vue'
                    ),
            },
            {
                name: 'edit-exam-result-for-approval',
                path: 'edit-exam-result-for-approval',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-exam-result-approval.vue'
                    ),
            },
            {
                name: 'view-exam-result-for-approval',
                path: 'view-exam-result-for-approval',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/view-exam-result-approval.vue'
                    ),
            },
            {
                name: 'list-consultant-appeal-review',
                path: 'list-consultant-appeal-review',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-consultant-appeal-review.vue'
                    ),
            },
            {
                name: 'edit-consultant-appeal-review',
                path: 'edit-consultant-appeal-review',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/edit-consultant-appeal-review.vue'
                    ),
            },
            {
                name: 'create-company',
                path: 'create-company',
                // beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import ('../pages/exam-operation/fimm/create-company.vue'),
            },
            {
                name: 'edit-esc-profile',
                path: 'edit-esc-profile',
                // beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSApprover,
                component: () =>
                    import ('../pages/exam-operation/fimm/edit-esc-profile.vue'),
            },
            // ----------------end of exam result management------------
            // ------------------- END BY SANTOSH -------------------------
            // ----------------start of api maintenance screen -----------
            {
                name: 'list-api-maintenance-screen',
                path: 'list-api-maintenance-screen',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/list-api-maintenance-screen.vue'
                    ),
            },
            {
                name: 'add-api-maintenance-screen',
                path: 'add-api-maintenance-screen',
                beforeEnter: FimmUserAuthentication.ifAuthenticatedPDSUser,
                component: () =>
                    import (
                        '../pages/exam-operation/fimm/add-api-maintenance-screen.vue'
                    ),
            },
            // -----------------end of api maintenance screen -----------
            // end of exam-operation

            {
                name: 'f-moduleSelectionList',
                path: 'f-moduleSelectionList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/cm04_f_moduleSelectionList.vue'
                    ),
            },

            {
                name: 'f-moduleRevocationList',
                path: 'f-moduleRevocationList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationList.vue'
                    ),
            },
            {
                name: 'f-moduleRevocationListProgram',
                path: 'f-moduleRevocationListProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationListProgram.vue'
                    ),
            },
            {
                name: 'f-moduleRevocationListProgramDetails',
                path: 'f-moduleRevocationListProgramDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/revocation/cm04_f_moduleRevocationDetails.vue'
                    ),
            },



            // Fimm - Module

            {
                name: 'ui',
                path: 'ui',
                component: EmptyParentComponent,
                children: [{
                    name: 'colors',
                    path: 'colors',
                    component: () =>
                        import ('../components/ui/colors/Colors'),
                }, ],
            },
            {
                name: 'system-setting',
                path: 'system-setting',
                component: () =>
                    import ('../pages/admin-configuration/cm0_systemSetting.vue'),
            },
            {
                name: 'group-management',
                path: 'group-management',
                component: () =>
                    import (
                        '../pages/admin-configuration/group-management/cm0_groupManagement.vue'
                    ),
            },
            {
                name: 'distributor-mainList',
                path: 'distributor-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/distributorApproval_mainList.vue'
                    ),
            },


            // SETTING APPROVAL LEVEL (UPDATE DISTRIBUTOR) - START
            {
                name: 'updateDistributor-approval-level',
                path: 'updateDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/updateDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'updateDistributor-rdReview',
                path: 'updateDistributor-rdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/updateDistributor/rdReview.vue'
                    ),
            },
            //SETTING APPROVAL LEVEL (UPDATE DISTRIBUTOR) - END
            // APPROVAL LEVEL (DISTRIBUTOR) - START
            {
                name: 'approval-mainList',
                path: 'approval-mainList',
                component: () =>
                    import ('../pages/admin-configuration/cm0_approval_mainList.vue'),
            },
            {
                name: 'newDistributor-approval-level',
                path: 'newDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor_approvalLevel.vue'
                    ),
                props: true,
            },
            {
                name: 'newDistributor-first-rdReview',
                path: 'newDistributor-first-rdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/firstRdReview.vue'
                    ),
            },
            {
                name: 'newDistributor-first-HODrdReview',
                path: 'newDistributor-first-HODrdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/firstHodRdReview.vue'
                    ),
            },
            {
                name: 'newDistributor-LRAReview',
                path: 'newDistributor-LRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/LRAreview.vue'
                    ),
            },
            {
                name: 'newDistributor-secondLevel-RdReview',
                path: 'newDistributor-secondLevel-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/secondLevel-rdReview.vue'
                    ),
            },
            {
                name: 'newDistributor-secondLevel-Hod-RdReview',
                path: 'newDistributor-secondLevel-Hod-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/secondLevel-Hod-rdReview.vue'
                    ),
            },
            {
                name: 'newDistributor-SupervisionReview',
                path: 'newDistributor-SupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/supervision-review.vue'
                    ),
            },
            {
                name: 'newDistributor-GMReview',
                path: 'newDistributor-GMReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/Gm-review.vue'
                    ),
            },
            {
                name: 'newDistributor-CeoReview',
                path: 'newDistributor-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/Ceo-review.vue'
                    ),
            },
            {
                name: 'newDistributor-BodReview',
                path: 'newDistributor-BodReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/newDistributor-approval-level/BOD-review.vue'
                    ),
            },
            // SETTING APPROVAL LEVEL (DISTRIBUTOR) - END
            //SETTING APPROVAL LEVEL (SUSPENSION) - START
            {
                name: 'suspensionRevocationDistributor-approval-level',
                path: 'suspensionRevocationDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocationDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-HodRdReview',
                path: 'suspensionRevocationDistributor-first-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-HodRdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-GMReview',
                path: 'suspensionRevocationDistributor-first-GMReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-GmReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-CeoReview',
                path: 'suspensionRevocationDistributor-first-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-CeoReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-RdReview',
                path: 'suspensionRevocationDistributor-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/rdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-CeoReview',
                path: 'suspensionRevocationDistributor-second-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-CeoReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-HodRdReview',
                path: 'suspensionRevocationDistributor-second-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-HodRdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-GMReview',
                path: 'suspensionRevocationDistributor-second-GMReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-GmReview.vue'
                    ),
            },
            //SETTING APPROVAL LEVEL (SUSPENSION) - END
            //SETTING APPROVAL LEVEL (CESSATION) - START
            {
                name: 'cessationDistributor-approval-level',
                path: 'cessationDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/cessationDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'cessationDistributor-RdReview',
                path: 'cessationDistributor-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/cessationDistributor/RdReview.vue'
                    ),
            },
            {
                name: 'cessationDistributor-HodRdReview',
                path: 'cessationDistributor-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/cessationDistributor/HodRdReview.vue'
                    ),
            },
            //SETTING APPROVAL LEVEL (CESSATION) - END







            // SETTING APPROVAL LEVEL (EXTENSION TIME) - START
            {
                name: 'ExtensionDistributor-RdReview',
                path: 'ExtensionDistributor-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/rdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-HodRdReview',
                path: 'ExtensionDistributor-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/HodRdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-GmReview',
                path: 'ExtensionDistributor-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/GmReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-CeoReview',
                path: 'ExtensionDistributor-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/ceoReview.vue'
                    ),
            },
            // fimm Approval Level Distributor

            // Distributor Extension Time Approval Level
            {
                name: 'ExtensionDistributor-ManagerReview',
                path: 'ExtensionDistributor-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/managerDistributorReview.vue'
                    ),
            },
            {
                name: 'extensionManager-mainList',
                path: 'extensionManager-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/manager-mainList.vue'
                    ),
            },

            // fimm approval level suspension
            {
                name: 'suspensionRevocationDistributor-approval-level',
                path: 'suspensionRevocationDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocationDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-HodRdReview',
                path: 'suspensionRevocationDistributor-first-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-HodRdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-GMReview',
                path: 'suspensionRevocationDistributor-first-GMReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-GmReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-first-CeoReview',
                path: 'suspensionRevocationDistributor-first-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/first-CeoReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-RdReview',
                path: 'suspensionRevocationDistributor-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/rdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-CeoReview',
                path: 'suspensionRevocationDistributor-second-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-CeoReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-HodRdReview',
                path: 'suspensionRevocationDistributor-second-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-HodRdReview.vue'
                    ),
            },
            {
                name: 'suspensionRevocationDistributor-second-GMReview',
                path: 'suspensionRevocationDistributor-second-GMReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/suspensionRevocation/second-GmReview.vue'
                    ),
            },
            // FIMM Extension Time Approval Level
            {
                name: 'ExtensionDistributor-RdReview',
                path: 'ExtensionDistributor-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/rdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-HodRdReview',
                path: 'ExtensionDistributor-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/HodRdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-GmReview',
                path: 'ExtensionDistributor-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/GmReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-CeoReview',
                path: 'ExtensionDistributor-CeoReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/ceoReview.vue'
                    ),
            },
            // fimm Approval Level Distributor

            // Distributor Extension Time Approval Level
            {
                name: 'ExtensionDistributor-ManagerReview',
                path: 'ExtensionDistributor-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/managerDistributorReview.vue'
                    ),
            },
            {
                name: 'extensionManager-mainList',
                path: 'extensionManager-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/manager-mainList.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-secondReview',
                path: 'ExtensionDistributor-secondReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/rdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-thirdReview',
                path: 'ExtensionDistributor-thirdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/HodRdReview.vue'
                    ),
            },
            {
                name: 'ExtensionDistributor-fourthReview',
                path: 'ExtensionDistributor-fourthReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/extension-time/ceoReview.vue'
                    ),
            },
            // FImm approval Level Divestment

            {
                name: 'divestmentDistributor-approval-level',
                path: 'divestmentDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestmentDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-approval-level',
                path: 'divestmentDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestmentDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-rdReview',
                path: 'divestmentDistributor-rdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestment/rdReview.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-HodrdReview',
                path: 'divestmentDistributor-HodrdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestment/HodRdReview.vue'
                    ),
            },
            // fimm Approval Level New Consultant
            {
                name: 'newConsultant-approval-level',
                path: 'newConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/newConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'newConsultant-new-Candidate',
                path: 'newConsultant-new-Candidate',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/new_consultant/rdReview.vue'
                    ),
            },
            {
                name: 're-register-approval-level',
                path: 're-register-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/reRegisterConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'reRegisterConsultant-RdReview',
                path: 'reRegisterConsultant-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/reregister/ReRegisterRdReview.vue'
                    ),
            },
            {
                name: 'exemption-approval-level',
                path: 'exemption-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/exemptionConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'NewConsultant-exemption',
                path: 'NewConsultant-exemption',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/exemption/exemptionReview.vue'
                    ),
            },
            // Fimm Consultant Termination
            {
                name: 'terminationConsultant-approval-level',
                path: 'terminationConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/terminationConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'terminationConsultant-HodRdReview',
                path: 'terminationConsultant-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/termination/HodRdReview.vue'
                    ),
            },
            // Fimm Re‐Sit/Re‐Schedule
            {
                name: 'reschedule-approval-level',
                path: 'reschedule-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/reScheduleConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'NewConsultant-reSchedule',
                path: 'NewConsultant-reSchedule',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/reschedule/rescheduleRdReview.vue'
                    ),
            },
            // fimm Appproval Level Bankruptcy check
            {
                name: 'banckruptcyCheckConsultant-approval-level',
                path: 'banckruptcyCheckConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/bankruptcyCheck_approvalLevel.vue'
                    ),
            },
            {
                name: 'banckruptcyCheckConsultant-RdReview',
                path: 'banckruptcyCheckConsultant-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/bankruptcyCheck/RdReview.vue'
                    ),
            },

            {
                name: 'divestmentDistributor-approval-level',
                path: 'divestmentDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestmentDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-approval-level',
                path: 'divestmentDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestmentDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-rdReview',
                path: 'divestmentDistributor-rdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestment/rdReview.vue'
                    ),
            },
            {
                name: 'divestmentDistributor-HodrdReview',
                path: 'divestmentDistributor-HodrdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestment/HodRdReview.vue'
                    ),
            },
            // fimm Approval Level New Consultant
            {
                name: 'newConsultant-approval-level',
                path: 'newConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/newConsultant_approvalLevel.vue'
                    ),
            },
            // Fimm Consultant Termination
            {
                name: 'terminationConsultant-approval-level',
                path: 'terminationConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/terminationConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'terminationConsultant-HodRdReview',
                path: 'terminationConsultant-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/termination/HodRdReview.vue'
                    ),
            },
            // fimm Appproval Level Bankruptcy check
            {
                name: 'banckruptcyCheckConsultant-approval-level',
                path: 'banckruptcyCheckConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/bankruptcyCheck_approvalLevel.vue'
                    ),
            },
            {
                name: 'banckruptcyCheckConsultant-RdReview',
                path: 'banckruptcyCheckConsultant-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/bankruptcyCheck/RdReview.vue'
                    ),
            },

            // Fimm Approval level Appeal COnsultant
            {
                name: 'appealConsultant-approval-level',
                path: 'appealConsultant-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/appealConsultant_approvalLevel.vue'
                    ),
            },
            {
                name: 'appealConsultant-RdReview',
                path: 'appealConsultant-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/appeal/RdReview.vue'
                    ),
            },

            // Distributor Approval Level
            {
                name: 'NewConsultant-mainList',
                path: 'NewConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/newConsultant/mainList.vue'
                    ),
            },
            {
                name: 'NewConsultant-managerReview',
                path: 'NewConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/newConsultant/managerReview.vue'
                    ),
            },
            {
                name: 'terminationConsultant-mainList',
                path: 'terminationConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/termination/mainList.vue'
                    ),
            },
            {
                name: 'terminationConsultant-managerReview',
                path: 'terminationConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/termination/managerReview.vue'
                    ),
            },
            {
                name: 'appealConsultant-mainList',
                path: 'appealConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/appeal/mainList.vue'
                    ),
            },
            {
                name: 'appealConsultant-managerReview',
                path: 'appealConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/appeal/managerReview.vue'
                    ),
            },
            {
                name: 'bankruptcyConsultant-mainList',
                path: 'bankruptcyConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/bankruptcyCheck/mainList.vue'
                    ),
            },
            {
                name: 'bankruptcyConsultant-managerReview',
                path: 'bankruptcyConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/bankruptcyCheck/managerReview.vue'
                    ),
            },

            // SETTING APPROVAL LEVEL CAS - START
            {
                name: 'newCase-approval-level',
                path: 'newCase-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase-approval-level.vue'
                    ),
            },
            {
                name: 'newCase-Gm-mainList',
                path: 'newCase-Gm-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/approval-mainList.vue'
                    ),
            },
            {
                name: 'newCase-GmReview',
                path: 'newCase-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/GmReview.vue'
                    ),
            },
            {
                name: 'newCase-legalHod-mainList',
                path: 'newCase-legalHod-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/verification-mainList.vue'
                    ),
            },
            {
                name: 'newCase-legalHodReview',
                path: 'newCase-legalHodReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/legalHodreview.vue'
                    ),
            },
            {
                name: 'newCase-legalClerk-mainList',
                path: 'newCase-legalCler-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/entry-mainList.vue'
                    ),
            },
            {
                name: 'newCase-legalClerkReview',
                path: 'newCase-legalClerkReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/legalClerk.vue'
                    ),
            },
            //SETTING APPROVAL LEVEL CAS - END
            //SETTING APPROVAL LEVEL DISTRIBUTOR - START
            {
                name: 'NewConsultant-mainList',
                path: 'NewConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/newConsultant/mainList.vue'
                    ),
            },
            {
                name: 'NewConsultant-managerReview',
                path: 'NewConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/newConsultant/managerReview.vue'
                    ),
            },
            {
                name: 'NewConsultant-adminReview',
                path: 'NewConsultant-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/newConsultant/administratorReview.vue'
                    ),
            },
            // Distributor Approval Level :: Nishi
            // Reregister
            {
                name: 'reRegisterConsultant-mainList',
                path: 'reRegisterConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reRegister/mainList.vue'
                    ),
            },
            {
                name: 'reRegisterConsultant-adminReview',
                path: 'reRegisterConsultant-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reRegister/administratorReview.vue'
                    ),
            },
            {
                name: 'reRegisterConsultant-managerReview',
                path: 'reRegisterConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reRegister/managerReview.vue'
                    ),
            },
            // Exemption
            {
                name: 'exemptionConsultant-mainList',
                path: 'exemptionConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/exemption/mainList.vue'
                    ),
            },
            {
                name: 'exemption-adminReview',
                path: 'exemption-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/exemption/administratorReview.vue'
                    ),
            },
            {
                name: 'exemption-managerReview',
                path: 'exemption-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/exemption/managerReview.vue'
                    ),
            },
            // Termination
            {
                name: 'terminationConsultant-mainList',
                path: 'terminationConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/termination/mainList.vue'
                    ),
            },
            {
                name: 'terminationConsultant-managerReview',
                path: 'terminationConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/termination/managerReview.vue'
                    ),
            },
            // Resignation
            {
                name: 'resignationConsultant-mainList',
                path: 'resignationConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/resignation/mainList.vue'
                    ),
            },
            {
                name: 'resignationConsultant-adminReview',
                path: 'resignationConsultant-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/resignation/administratorReview.vue'
                    ),
            },
            {
                name: 'resignationConsultant-managerReview',
                path: 'resignationConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/resignation/managerReview.vue'
                    ),
            },
            // Profile Update
            {
                name: 'profileConsultant-mainList',
                path: 'profileConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/profile/mainList.vue'
                    ),
            },
            {
                name: 'updateProfileConsultant-adminReview',
                path: 'updateProfileConsultant-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/profile/administratorReview.vue'
                    ),
            },
            // Renewal
            {
                name: 'renewalConsultant-mainList',
                path: 'renewalConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/renewal/mainList.vue'
                    ),
            },
            {
                name: 'renewalConsultant-reviewerReview',
                path: 'renewalConsultant-reviewerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/renewal/administratorReview.vue'
                    ),
            },
            {
                name: 'renewalConsultant-managerReview',
                path: 'renewalConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/renewal/managerReview.vue'
                    ),
            },
            // Re-shedule
            {
                name: 'reSheduleConsultant-mainList',
                path: 'reSheduleConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reschedule/mainList.vue'
                    ),
            },
            {
                name: 'rescheduleConsultant-adminReview',
                path: 'rescheduleConsultant-adminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reschedule/administratorReview.vue'
                    ),
            },
            {
                name: 'rescheduleConsultant-managerReview',
                path: 'rescheduleConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/reschedule/managerReview.vue'
                    ),
            },
            // Appeal
            {
                name: 'appealConsultant-mainList',
                path: 'appealConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/appeal/mainList.vue'
                    ),
            },
            {
                name: 'appealConsultant-managerReview',
                path: 'appealConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/appeal/managerReview.vue'
                    ),
            },
            {
                name: 'bankruptcyConsultant-mainList',
                path: 'bankruptcyConsultant-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/bankruptcyCheck/mainList.vue'
                    ),
            },
            {
                name: 'bankruptcyConsultant-managerReview',
                path: 'bankruptcyConsultant-managerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Consultant/distributor/bankruptcyCheck/managerReview.vue'
                    ),
            },
            // -----
            // Fimm Approval Level CAS
            {
                name: 'newCase-approval-level',
                path: 'newCase-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase-approval-level.vue'
                    ),
            },
            {
                name: 'newCase-Gm-mainList',
                path: 'newCase-Gm-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/approval-mainList.vue'
                    ),
            },
            {
                name: 'newCase-GmReview',
                path: 'newCase-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/GmReview.vue'
                    ),
            },
            {
                name: 'newCase-legalHod-mainList',
                path: 'newCase-legalHod-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/verification-mainList.vue'
                    ),
            },
            {
                name: 'newCase-legalHodReview',
                path: 'newCase-legalHodReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/legalHodreview.vue'
                    ),
            },
            {
                name: 'newCase-legalClerk-mainList',
                path: 'newCase-legalClerk-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/entry-mainList.vue'
                    ),
            },
            {
                name: 'newCase-legalClerkReview',
                path: 'newCase-legalClerkReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CAS/newCase/legalClerk.vue'
                    ),
            },

            // Fimm Approval Level Fund Creation FMS
            {
                name: 'fundCreation-approval-level',
                path: 'fundCreation-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundCreation-approval-level.vue'
                    ),
            },
            {
                name: 'fundCreation-IdReview',
                path: 'fundCreation-IdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundCreation/IDreview.vue'
                    ),
            },
            // Fimm Approval Level Company Creation FMS
            {
                name: 'companyCreation-approval-level',
                path: 'companyCreation-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/companycreation-approval-level.vue'
                    ),
            },
            {
                name: 'companyCreation-IdReview',
                path: 'companyCreation-IdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/companyCreation/rdReview.vue'
                    ),
            },

            // Fimm Approval Level Fund Creation FMS
            {
                name: 'fundCreation-approval-level',
                path: 'fundCreation-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundCreation-approval-level.vue'
                    ),
            },
            {
                name: 'fundCreation-IdReview',
                path: 'fundCreation-IdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundCreation/IDreview.vue'
                    ),
            },

            // FImm Approval Level FUnd Lodgement FMS

            {
                name: 'fundLodgement-approval-level',
                path: 'fundLodgement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundLodgement-approval-level.vue'
                    ),
            },
            {
                name: 'fundLodgement-RdReview',
                path: 'fundLodgement-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundLodgement/rdReview.vue'
                    ),
            },
            // FIMM Approval Level Fund Manangement FMS
            {
                name: 'fundManagement-approval-level',
                path: 'fundManagement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundManagement-approval-level.vue'
                    ),
            },
            {
                name: 'fundManagement-IDreview',
                path: 'fundManagement-IDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundManagement/IDreview.vue'
                    ),
            },
            // Fimm Approval Level Fund Termination FMS
            {
                name: 'fundTermination-approval-level',
                path: 'fundTermination-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundTermination-approval-level.vue'
                    ),
            },
            {
                name: 'fundTermination-IDreview',
                path: 'fundTermination-IDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundTermination/IDreview.vue'
                    ),
            },
            // FIMM Approval Level Nav Management
            {
                name: 'navManagement-approval-level',
                path: 'navManagement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/navManagement-approval-level.vue'
                    ),
            },
            {
                name: 'navManagement-HodIDreview',
                path: 'navManagement-HodIDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/navManagement/HodIDreview.vue'
                    ),
            },
            {
                name: 'navManagement-IDreview',
                path: 'navManagement-IDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/navManagement/IDreview.vue'
                    ),
            },
            {
                name: 'navManagement-GMreview',
                path: 'navManagement-GMreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/navManagement/GmReview.vue'
                    ),
            },
            // Distributor Approval for FMS
            {
                name: 'fundCreation-mainList',
                path: 'fundCreation-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundCreation/mainList.vue'
                    ),
            },
            {
                name: 'fundCreation-FundManagerreview',
                path: 'fundCreation-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundCreation/fundManagerReview.vue'
                    ),
            },
            {
                name: 'fundTermination-mainList',
                path: 'fundTermination-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundTermination/mainList.vue'
                    ),
            },
            {
                name: 'fundTermination-FundManagerreview',
                path: 'fundTermination-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundTermination/fundManager.vue'
                    ),
            },
            {
                name: 'fundLodgement-mainList',
                path: 'fundLodgement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundLodgement/mainList.vue'
                    ),
            },
            {
                name: 'fundLodgement-FundManagerreview',
                path: 'fundLodgement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundLodgement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'fundManagement-mainList',
                path: 'fundManagement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundManagement/mainList.vue'
                    ),
            },
            {
                name: 'fundManagement-FundManagerreview',
                path: 'fundManagement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundManagement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'NavManagement-mainList',
                path: 'NavManagement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/navManagement/mainList.vue'
                    ),
            },
            {
                name: 'NavManagement-FundManagerreview',
                path: 'NavManagement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/navManagement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'funddislodgement-mainList',
                path: 'funddislodgement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundDislodgment/mainList.vue'
                    ),
            },
            {
                name: 'fundDislodgement-ReviewerReview',
                path: 'fundDislodgement-ReviewerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundDislodgment/reviewer.vue'
                    ),
            },
            // USER MANAGEMENT Approval for -- NISHI
            {
                name: 'newfimm-mainList',
                path: 'newfimm-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimmuser-mainlist.vue'
                    ),
            },
            {
                name: 'fimmuser-rd',
                path: 'fimmuser-rd',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/RDApproval.vue'
                    ),
            },
            {
                name: 'user-legal-regulatory',
                path: 'user-legal-regulatory',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/legalRegulatoryApproval.vue'
                    ),
            },
            {
                name: 'user-supervision-approval',
                path: 'user-supervision-approval',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/supervisionApproval.vue'
                    ),
            },
            {
                name: 'user-industry-development',
                path: 'user-industry-development',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/industrydevelopmentApproval.vue'
                    ),
            },
            {
                name: 'user-professional-development',
                path: 'user-professional-development',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/professionaldevelopmentApproval.vue'
                    ),
            },
            {
                name: 'user-research-approval',
                path: 'user-research-approval',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/researchApproval.vue'
                    ),
            },
            {
                name: 'user-it-project',
                path: 'user-it-project',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/fimm/itprojectApproval.vue'
                    ),
            },
            //  Distributor Approval Level
            // Distributor Management
            {
                name: 'extensiondistributor-mainList',
                path: 'extensiondistributor-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/distributor-mainList.vue'
                    ),
            },
            {
                name: 'ExtensionDistributorApproval-ManagerReview',
                path: 'ExtensionDistributorApproval-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/byDistributor/ManagerReview.vue'
                    ),
            },
            {
                name: 'updatedistributor-mainList',
                path: 'updatedistributor-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/updatedistributor-mainList.vue'
                    ),
            },
            {
                name: 'UpdateDistributorApproval-ManagerReview',
                path: 'UpdateDistributorApproval-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/byDistributor/UpdateManagerReview.vue'
                    ),
            },
            {
                name: 'cessationofoperationdistributor-mainList',
                path: 'cessationofoperationdistributor-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/cessationofoperationdistributor-mainList.vue'
                    ),
            },
            {
                name: 'cessationDistributorApproval-ManagerReview',
                path: 'cessationDistributorApproval-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/byDistributor/CessationManagerReview.vue'
                    ),
            },
            {
                name: 'divestmentdistributor-mainList',
                path: 'divestmentdistributor-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/divestmentdistributor-mainList.vue'
                    ),
            },
            {
                name: 'divestmentDistributorApproval-ManagerReview',
                path: 'divestmentDistributorApproval-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-distributor/byDistributor/divestmentManagerReview.vue'
                    ),
            },


            // FIMM Approval Level Fund Manangement FMS
            {
                name: 'fundManagement-approval-level',
                path: 'fundManagement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundManagement-approval-level.vue'
                    ),
            },
            {
                name: 'fundManagement-IDreview',
                path: 'fundManagement-IDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundManagement/IDreview.vue'
                    ),
            },
            // Fimm Approval Level Fund Termination FMS
            {
                name: 'fundTermination-approval-level',
                path: 'fundTermination-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fundTermination-approval-level.vue'
                    ),
            },
            {
                name: 'fundTermination-IDreview',
                path: 'fundTermination-IDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/fundTermination/IDreview.vue'
                    ),
            },
            // FIMM Approval Level Nav Management
            {
                name: 'navManagement-approval-level',
                path: 'navManagement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/navManagement-approval-level.vue'
                    ),
            },
            {
                name: 'navManagement-HodIDreview',
                path: 'navManagement-HodIDreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/navManagement/HodIDreview.vue'
                    ),
            },
            {
                name: 'navManagement-GMreview',
                path: 'navManagement-GMreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/fimm/navManagement/GmReview.vue'
                    ),
            },
            // Distributor Approval for FMS
            {
                name: 'fundCreation-mainList',
                path: 'fundCreation-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundCreation/mainList.vue'
                    ),
            },
            {
                name: 'fundCreation-FundManagerreview',
                path: 'fundCreation-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundCreation/fundManagerReview.vue'
                    ),
            },
            {
                name: 'fundTermination-mainList',
                path: 'fundTermination-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundTermination/mainList.vue'
                    ),
            },
            {
                name: 'fundTermination-FundManagerreview',
                path: 'fundTermination-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundTermination/fundManager.vue'
                    ),
            },
            {
                name: 'fundLodgement-mainList',
                path: 'fundLodgement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundLodgement/mainList.vue'
                    ),
            },
            {
                name: 'fundLodgement-FundManagerreview',
                path: 'fundLodgement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundLodgement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'fundManagement-mainList',
                path: 'fundManagement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundManagement/mainList.vue'
                    ),
            },
            {
                name: 'fundManagement-FundManagerreview',
                path: 'fundManagement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundManagement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'NavManagement-mainList',
                path: 'NavManagement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/navManagement/mainList.vue'
                    ),
            },
            {
                name: 'NavManagement-FundManagerreview',
                path: 'NavManagement-FundManagerreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/navManagement/fundManagerReview.vue'
                    ),
            },
            {
                name: 'fundDislodgement-ReviewerReview',
                path: 'fundDislodgement-ReviewerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-FMS/distributor/fundDislodgment/reviewer.vue'
                    ),
            },
            // --------


            // DIVESTMENT - START
            {
                name: 'distributor-DivestmentList-rdApproval',
                path: 'distributor-DivestmentList-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/divestment/cm1_Divestment_RDReview_List.vue'
                    ),
            },
            {
                name: 'distributor-DivestmentDetails-rdApproval',
                path: 'distributor-DivestmentDetails-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/divestment/cm1_Divestment_RDReview_Details.vue'
                    ),
            },
            {
                name: 'distributor-DivestmentList-Hod-rdApproval',
                path: 'distributor-DivestmentList-Hod-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/divestment/cm1_Divestment_HOD_RDReview_List.vue'
                    ),
            },
            {
                name: 'distributor-DivestmentDetails-Hod-rdApproval',
                path: 'distributor-DivestmentDetails-Hod-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/divestment/cm1_Divestment_HOD_RDReview_Details.vue'
                    ),
            },
            {
                name: 'newConsultantPayment-approval-level',
                path: 'newConsultantPayment-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/newConsultantPayment-approval-level.vue'
                    ),
            },
            {
                name: 'newConsultantPayment-FinanceReview',
                path: 'newConsultantPayment-FinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/NewConsultant/financeReview.vue'
                    ),
            },
            {
                name: 'newDistributorPayment-approval-level',
                path: 'newDistributorPayment-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/newDistributorPayment-approval-level.vue'
                    ),
            },
            {
                name: 'newDistributorPayment-FinanceReview',
                path: 'newDistributorPayment-FinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/NewDistributor/financeReview.vue'
                    ),
            },
            {
                name: 'prepaymentRefundDistributor-approval-level',
                path: 'prepaymentRefundDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/prepaymentRefundDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'prepaymentRefundDistributor-financeReview',
                path: 'prepaymentRefundDistributor-financeReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/PrepaymentRefund/financeReview.vue'
                    ),
            },
            {
                name: 'prepaymentTopupDistributor-approval-level',
                path: 'prepaymentTopupDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/prepaymentTopupDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'prepaymentTopupDistributor-financeReview',
                path: 'prepaymentTopupDistributor-financeReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/PrepaymentTopup/financeReview.vue'
                    ),
            },
            // FIMM Apporval LEvel Annual Fee
            {
                name: 'anualFee-approval-level',
                path: 'anualFee-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/anualFee-approval-level.vue'
                    ),
            },
            {
                name: 'anualFee-RdReview',
                path: 'anualFee-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/RdReview.vue'
                    ),
            },
            {
                name: 'anualFee-HodRdReview',
                path: 'anualFee-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/HodRdReview.vue'
                    ),
            },
            {
                name: 'anualFee-FinanceReview',
                path: 'anualFee-FinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/financeReview.vue'
                    ),
            },
            {
                name: 'anualFee-HodFinanceReview',
                path: 'anualFee-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/HodFinanceReview.vue'
                    ),
            },
            // Distributor Approval for Annual Fee
            {
                name: 'DistAnualFee-mainList',
                path: 'DistAnualFee-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/mainList.vue'
                    ),
            },
            {
                name: 'DistAnualFee-AdminReview',
                path: 'DistAnualFee-AdminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/adminReview.vue'
                    ),
            },
            {
                name: 'DistAnualFee-ManagerReview',
                path: 'DistAnualFee-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/managerReview.vue'
                    ),
            },
            {
                name: 'DistAnualFee-ComplianceReview',
                path: 'DistAnualFee-ComplianceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/complianceOfficerReview.vue'
                    ),
            },
            {
                name: 'DistNewUser-mainList',
                path: 'DistNewUser-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/distributor/mainList.vue'
                    ),
            },
            {
                name: 'distNewuser-adminreview',
                path: 'distNewuser-adminreview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-USER/distributor/managerReview.vue'
                    ),
            },

            // ------------
            // FImm approval Level CPD 5 module
            {
                name: '5ModulesSubmission-approval-level',
                path: '5ModulesSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/mainlist.vue'
                    ),
            },
            {
                name: '5ModulesSubmission-PdsReview',
                path: '5ModulesSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/PDSreview.vue'
                    ),
            },
            {
                name: '5ModulesSubmission-GmReview',
                path: '5ModulesSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD new Training provider
            {
                name: 'newTrainingProvider-approval-level',
                path: 'newTrainingProvider-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/mainlist.vue'
                    ),
            },
            {
                name: 'newTrainingProvider-PdsReview',
                path: 'newTrainingProvider-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/PdsReview.vue'
                    ),
            },
            {
                name: 'newTrainingProvider-GmReview',
                path: 'newTrainingProvider-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD post vetting
            {
                name: 'postVettingSubmission-approval-level',
                path: 'postVettingSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/mainlist.vue'
                    ),
            },
            {
                name: 'postVettingSubmission-PdsReview',
                path: 'postVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/PdsReview.vue'
                    ),
            },
            {
                name: 'postVettingSubmission-GmReview',
                path: 'postVettingSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD Repeated post vetting
            {
                name: 'repeated-post‐petting-submission',
                path: 'repeated-post‐petting-submission',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedPostVetting/mainlist.vue'
                    ),
            },
            {
                name: 'repeatedpostVettingSubmission-PdsReview',
                path: 'repeatedpostVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedPostVetting/PdsReview.vue'
                    ),
            },
            {
                name: 'repeatedpostVettingSubmission-GmReview',
                path: 'repeatedpostVettingSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedPostVetting/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD pre vetting
            {
                name: 'preVettingSubmission-approval-level',
                path: 'preVettingSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/preVetting/mainlist.vue'
                    ),
            },
            {
                name: 'preVettingSubmission-PdsReview',
                path: 'preVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/preVetting/PdsReview.vue'
                    ),
            },
            {
                name: 'preVettingSubmission-GmReview',
                path: 'preVettingSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/preVetting/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD repeated pre vetting
            {
                name: 'repeated-pre‐vetting submission',
                path: 'repeated-pre‐vetting submission',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedpreVetting/mainlist.vue'
                    ),
            },
            {
                name: 'repeatedpreVettingSubmission-PdsReview',
                path: 'repeatedpreVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedpreVetting/PdsReview.vue'
                    ),
            },
            {
                name: 'repeatedpreVettingSubmission-GmReview',
                path: 'repeatedpreVettingSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/repeatedpreVetting/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD revocation
            {
                name: 'revocationCPD-approval-level',
                path: 'revocationCPD-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/mainlist.vue'
                    ),
            },
            {
                name: 'revocationCPD-PdsReview',
                path: 'revocationCPD-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/PdsReview.vue'
                    ),
            },
            {
                name: 'revocationCPD-GmReview',
                path: 'revocationCPD-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD waiver Submission
            {
                name: 'waiverSubmission-approval-level',
                path: 'waiverSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/mainlist.vue'
                    ),
            },
            {
                name: 'waiverSubmission-PdsReview',
                path: 'waiverSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/PdsReview.vue'
                    ),
            },
            {
                name: 'waiverSubmission-GmReview',
                path: 'waiverSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/GmReview.vue'
                    ),
            },
            // FImm approval Level annoucemnet
            {
                name: 'annoucement-approval-level',
                path: 'annoucement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucementManagement-approval-level.vue'
                    ),
            },
            {
                name: 'annoucement-HodFimmReview',
                path: 'annoucement-HodFimmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodFIMMreview.vue'
                    ),
            },
            {
                name: 'annoucement-mainList',
                path: 'annoucement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/announcement-mainList.vue'
                    ),
            },
            {
                name: 'annoucement-HodRDReview',
                path: 'annoucement-HodRDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodRdReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodSupervisionReview',
                path: 'annoucement-HodSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodSupervisionReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodLRAReview',
                path: 'annoucement-HodLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodLRAReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodIDReview',
                path: 'annoucement-HodIDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodIdReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodPDReview',
                path: 'annoucement-HodPDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodProfessionalReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodRNAReview',
                path: 'annoucement-HodRNAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodRnaReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodItReview',
                path: 'annoucement-HodItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodItReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodFinanceReview',
                path: 'annoucement-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodFinanceReview.vue'
                    ),
            },
            // FImm approval Level CIrcular
            {
                name: 'circular-approval-level',
                path: 'circular-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circularManagement-approval-level.vue'
                    ),
            },
            {
                name: 'circular-mainList',
                path: 'circular-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular-mainlist.vue'
                    ),
            },
            {
                name: 'circular-HodFimmReview',
                path: 'circular-HodFimmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodFIMMreview.vue'
                    ),
            },
            {
                name: 'circular-HodRdReview',
                path: 'circular-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodRdReview.vue'
                    ),
            },
            {
                name: 'circular-GmRdReview',
                path: 'circular-GmRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmRdReview.vue'
                    ),
            },
            {
                name: 'circular-HodLRAReview',
                path: 'circular-HodLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodLRAReview.vue'
                    ),
            },
            {
                name: 'circular-GmLRAReview',
                path: 'circular-GmLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmLRAReview.vue'
                    ),
            },
            {
                name: 'circular-HodSupervisionReview',
                path: 'circular-HodSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodSupervisionReview.vue'
                    ),
            },
            {
                name: 'circular-GmSupervisionReview',
                path: 'circular-GmSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmSupervisionReview.vue'
                    ),
            },
            {
                name: 'circular-HodIdReview',
                path: 'circular-HodIdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodIdReview.vue'
                    ),
            },
            {
                name: 'circular-GmIdReview',
                path: 'circular-GmIdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmIdReview.vue'
                    ),
            },
            {
                name: 'circular-HodPdReview',
                path: 'circular-HodPdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodPdReview.vue'
                    ),
            },
            {
                name: 'circular-GmPdReview',
                path: 'circular-GmPdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmPdReview.vue'
                    ),
            },
            {
                name: 'circular-HodRnaReview',
                path: 'circular-HodRnaReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodRnaReview.vue'
                    ),
            },
            {
                name: 'circular-GmRnaReview',
                path: 'circular-GmRnaReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmRnaReview.vue'
                    ),
            },
            {
                name: 'circular-HodItReview',
                path: 'circular-HodItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodItReview.vue'
                    ),
            },
            {
                name: 'circular-GmItReview',
                path: 'circular-GmItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmItReview.vue'
                    ),
            },
            {
                name: 'circular-HodFinanceReview',
                path: 'circular-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodFinanceReview.vue'
                    ),
            },
            {
                name: 'circular-GmFinanceReview',
                path: 'circular-GmFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmFinanceReview.vue'
                    ),
            },

            {
                name: 'newConsultantPayment-approval-level',
                path: 'newConsultantPayment-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/newConsultantPayment-approval-level.vue'
                    ),
            },
            {
                name: 'newDistributorPayment-approval-level',
                path: 'newDistributorPayment-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/newDistributorPayment-approval-level.vue'
                    ),
            },
            {
                name: 'prepaymentRefundDistributor-approval-level',
                path: 'prepaymentRefundDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/prepaymentRefundDistributor-approval-level.vue'
                    ),
            },
            {
                name: 'prepaymentTopupDistributor-approval-level',
                path: 'prepaymentTopupDistributor-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Finance/prepaymentTopupDistributor-approval-level.vue'
                    ),
            },
            // FIMM Apporval LEvel Annual Fee
            {
                name: 'anualFee-approval-level',
                path: 'anualFee-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/anualFee-approval-level.vue'
                    ),
            },
            {
                name: 'anualFee-RdReview',
                path: 'anualFee-RdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/RdReview.vue'
                    ),
            },
            {
                name: 'anualFee-HodRdReview',
                path: 'anualFee-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/HodRdReview.vue'
                    ),
            },
            {
                name: 'anualFee-FinanceReview',
                path: 'anualFee-FinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/financeReview.vue'
                    ),
            },
            {
                name: 'anualFee-HodFinanceReview',
                path: 'anualFee-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/fimm/HodFinanceReview.vue'
                    ),
            },
            // Distributor Approval for Annual Fee
            {
                name: 'DistAnualFee-mainList',
                path: 'DistAnualFee-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/mainList.vue'
                    ),
            },
            {
                name: 'DistAnualFee-AdminReview',
                path: 'DistAnualFee-AdminReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/adminReview.vue'
                    ),
            },
            {
                name: 'DistAnualFee-ManagerReview',
                path: 'DistAnualFee-ManagerReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/managerReview.vue'
                    ),
            },
            {
                name: 'DistAnualFee-ComplianceReview',
                path: 'DistAnualFee-ComplianceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-AnnualFee/distributor/complianceOfficerReview.vue'
                    ),
            },
            // ------------
            // FImm approval Level CPD 5 module
            {
                name: '5ModulesSubmission-approval-level',
                path: '5ModulesSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/mainlist.vue'
                    ),
            },
            {
                name: '5ModulesSubmission-PdsReview',
                path: '5ModulesSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/PDSreview.vue'
                    ),
            },
            {
                name: '5ModulesSubmission-GmReview',
                path: '5ModulesSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/5module/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD new Training provider
            {
                name: 'newTrainingProvider-approval-level',
                path: 'newTrainingProvider-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/mainlist.vue'
                    ),
            },
            {
                name: 'newTrainingProvider-PdsReview',
                path: 'newTrainingProvider-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/PdsReview.vue'
                    ),
            },
            {
                name: 'newTrainingProvider-GmReview',
                path: 'newTrainingProvider-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/newTrainingProvider/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD post vetting
            {
                name: 'postVettingSubmission-approval-level',
                path: 'postVettingSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/mainlist.vue'
                    ),
            },
            {
                name: 'postVettingSubmission-PdsReview',
                path: 'postVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/PdsReview.vue'
                    ),
            },
            {
                name: 'postVettingSubmission-GmReview',
                path: 'postVettingSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/postVetting/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD pre vetting
            {
                name: 'preVettingSubmission-approval-level',
                path: 'preVettingSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/preVetting/mainlist.vue'
                    ),
            },
            {
                name: 'preVettingSubmission-PdsReview',
                path: 'preVettingSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/preVetting/PdsReview.vue'
                    ),
            },
            // FImm approval Level CPD revocation
            {
                name: 'revocationCPD-approval-level',
                path: 'revocationCPD-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/mainlist.vue'
                    ),
            },
            {
                name: 'revocationCPD-PdsReview',
                path: 'revocationCPD-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/PdsReview.vue'
                    ),
            },
            {
                name: 'revocationCPD-GmReview',
                path: 'revocationCPD-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/revocationCpd/GmReview.vue'
                    ),
            },
            // FImm approval Level CPD waiver Submission
            {
                name: 'waiverSubmission-approval-level',
                path: 'waiverSubmission-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/mainlist.vue'
                    ),
            },
            {
                name: 'waiverSubmission-PdsReview',
                path: 'waiverSubmission-PdsReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/PdsReview.vue'
                    ),
            },
            {
                name: 'waiverSubmission-GmReview',
                path: 'waiverSubmission-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-CPD/waiver/GmReview.vue'
                    ),
            },
            // FImm approval Level annoucemnet
            {
                name: 'annoucement-approval-level',
                path: 'annoucement-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucementManagement-approval-level.vue'
                    ),
            },
            {
                name: 'annoucement-HodFimmReview',
                path: 'annoucement-HodFimmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodFIMMreview.vue'
                    ),
            },
            {
                name: 'annoucement-mainList',
                path: 'annoucement-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/announcement-mainList.vue'
                    ),
            },
            {
                name: 'annoucement-HodRDReview',
                path: 'annoucement-HodRDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodRdReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodSupervisionReview',
                path: 'annoucement-HodSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodSupervisionReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodLRAReview',
                path: 'annoucement-HodLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodLRAReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodIDReview',
                path: 'annoucement-HodIDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodIdReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodPDReview',
                path: 'annoucement-HodPDReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodProfessionalReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodRNAReview',
                path: 'annoucement-HodRNAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodRnaReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodItReview',
                path: 'annoucement-HodItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodItReview.vue'
                    ),
            },
            {
                name: 'annoucement-HodFinanceReview',
                path: 'annoucement-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/annoucement/HodFinanceReview.vue'
                    ),
            },
            {
                name: 'circular-approval-level',
                path: 'circular-approval-level',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circularManagement-approval-level.vue'
                    ),
            },
            {
                name: 'circular-mainList',
                path: 'circular-mainList',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular-mainlist.vue'
                    ),
            },
            {
                name: 'circular-HodFimmReview',
                path: 'circular-HodFimmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodFIMMreview.vue'
                    ),
            },
            {
                name: 'circular-HodRdReview',
                path: 'circular-HodRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodRdReview.vue'
                    ),
            },
            {
                name: 'circular-GmRdReview',
                path: 'circular-GmRdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmRdReview.vue'
                    ),
            },
            {
                name: 'circular-HodLRAReview',
                path: 'circular-HodLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodLRAReview.vue'
                    ),
            },
            {
                name: 'circular-GmLRAReview',
                path: 'circular-GmLRAReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmLRAReview.vue'
                    ),
            },
            {
                name: 'circular-HodSupervisionReview',
                path: 'circular-HodSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodSupervisionReview.vue'
                    ),
            },
            {
                name: 'circular-GmSupervisionReview',
                path: 'circular-GmSupervisionReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmSupervisionReview.vue'
                    ),
            },
            {
                name: 'circular-HodIdReview',
                path: 'circular-HodIdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodIdReview.vue'
                    ),
            },
            {
                name: 'circular-GmIdReview',
                path: 'circular-GmIdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmIdReview.vue'
                    ),
            },
            {
                name: 'circular-HodPdReview',
                path: 'circular-HodPdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodPdReview.vue'
                    ),
            },
            {
                name: 'circular-GmPdReview',
                path: 'circular-GmPdReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmPdReview.vue'
                    ),
            },
            {
                name: 'circular-HodRnaReview',
                path: 'circular-HodRnaReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodRnaReview.vue'
                    ),
            },
            {
                name: 'circular-GmRnaReview',
                path: 'circular-GmRnaReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmRnaReview.vue'
                    ),
            },
            {
                name: 'circular-HodItReview',
                path: 'circular-HodItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodItReview.vue'
                    ),
            },
            {
                name: 'circular-GmItReview',
                path: 'circular-GmItReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmItReview.vue'
                    ),
            },
            {
                name: 'circular-HodFinanceReview',
                path: 'circular-HodFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/HodFinanceReview.vue'
                    ),
            },
            {
                name: 'circular-GmFinanceReview',
                path: 'circular-GmFinanceReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmFinanceReview.vue'
                    ),
            },

            {
                name: 'circular-GmReview',
                path: 'circular-GmReview',
                component: () =>
                    import (
                        '../pages/admin-configuration/byApproval-Admin/circular/GmReview.vue'
                    ),
            },
            // ----------------
            {
                name: 'distributor-SubmissionList-rdApproval',
                path: 'distributor-SubmissionList-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_rdApproval.vue'
                    ),
            },
            {
                name: 'distributor-SubmissionDetails-rdApproval',
                path: 'distributor-SubmissionDetails-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_rdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-HODrdApproval',
                path: 'distributor-SubmissionList-HODrdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_HODrdApproval.vue'
                    ),
            },
            {
                name: 'distributor-SubmissionDetails-HODrdApproval',
                path: 'distributor-SubmissionDetails-HODrdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_HODrdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-lraApproval',
                path: 'distributor-SubmissionList-lraApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_lraApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionDetails-lraApproval',
                path: 'distributor-SubmissionDetails-lraApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_lraApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-supervisionApproval',
                path: 'distributor-SubmissionList-supervisionApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_supervisionApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionDetails-supervisionApproval',
                path: 'distributor-SubmissionDetails-supervisionApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_supervisionApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-gmApproval',
                path: 'distributor-SubmissionList-gmApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_gmApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionDetails-gmApproval',
                path: 'distributor-SubmissionDetails-gmApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_gmApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-ceoApproval',
                path: 'distributor-SubmissionList-ceoApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_ceoApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionDetails-ceoApproval',
                path: 'distributor-SubmissionDetails-ceoApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_ceoApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionList-boardApproval',
                path: 'distributor-SubmissionList-boardApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionList_boardApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-SubmissionDetails-boardApproval',
                path: 'distributor-SubmissionDetails-boardApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorSubmissionDetails_boardApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-rdApproval',
                path: 'distributor-RegisterType-SubmissionList-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_rdApproval.vue'
                    ),
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-rdApproval',
                path: 'distributor-RegisterType-SubmissionDetails-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_rdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-HODrdApproval',
                path: 'distributor-RegisterType-SubmissionList-HODrdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_HODrdApproval.vue'
                    ),
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-HODrdApproval',
                path: 'distributor-RegisterType-SubmissionDetails-HODrdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_HODrdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-lraApproval',
                path: 'distributor-RegisterType-SubmissionList-lraApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_lraApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-lraApproval',
                path: 'distributor-RegisterType-SubmissionDetails-lraApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_lraApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-supervisionApproval',
                path: 'distributor-RegisterType-SubmissionList-supervisionApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_supervisionApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-supervisionApproval',
                path: 'distributor-RegisterType-SubmissionDetails-supervisionApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_supervisionApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-gmApproval',
                path: 'distributor-RegisterType-SubmissionList-gmApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_gmApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-gmApproval',
                path: 'distributor-RegisterType-SubmissionDetails-gmApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_gmApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-ceoApproval',
                path: 'distributor-RegisterType-SubmissionList-ceoApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_ceoApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-ceoApproval',
                path: 'distributor-RegisterType-SubmissionDetails-ceoApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_ceoApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionList-boardApproval',
                path: 'distributor-RegisterType-SubmissionList-boardApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionList_boardApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-RegisterType-SubmissionDetails-boardApproval',
                path: 'distributor-RegisterType-SubmissionDetails-boardApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/type-register/cm1_distributorRegisterTypeSubmissionDetails_boardApproval.vue'
                    ),
                props: true,
            },

            // Update Distributor
            {
                name: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionList_rdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionDetails_rdApproval.vue'
                    ),
                props: true,
            },
            // end

            // annual fee
            {
                name: 'AnnualFee-FundSubmission-Approval',
                path: 'AnnualFee-FundSubmission-Approval',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_AMSFFundSubmission_Approval.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-FundSubmission-list',
                path: 'AnnualFee-FundSubmission-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_AMSFFundSubmission_list.vue'),
                props: true,
            },
            // RD
            {
                name: 'AnnualFee-RD-Verification-list',
                path: 'AnnualFee-RD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-list',
                path: 'AnnualFee-RD-AUMVerification-list/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_AUMVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-Details',
                path: 'AnnualFee-RD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-list',
                path: 'AnnualFee-RD-TGSVerification-list/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_TGSVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-Details',
                path: 'AnnualFee-RD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-RD-ConsultantVerification-list',
                path: 'AnnualFee-RD-ConsultantVerification-list/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_ConsultantVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-Verification-list',
                path: 'AnnualFee-HODRD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODRD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-list',
                path: 'AnnualFee-HODRD-AUMVerification-list/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-Details',
                path: 'AnnualFee-HODRD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-list',
                path: 'AnnualFee-HODRD-TGSVerification-list/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-Details',
                path: 'AnnualFee-HODRD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-ConsultantVerification-list',
                path: 'AnnualFee-HODRD-ConsultantVerification-list/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_ConsultantVerification_list.vue'
                    ),
                props: true,
            },
            // FIN
            {
                name: 'AnnualFee-FIN-Verification-list',
                path: 'AnnualFee-FIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-FIN-Verification-Details',
                path: 'AnnualFee-FIN-Verification-Details/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_Details.vue'),
                props: true,
            },
            // HOD FIN
            {
                name: 'AnnualFee-HODFIN-Verification-list',
                path: 'AnnualFee-HODFIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODFIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODFIN-Verification-Details',
                path: 'AnnualFee-HODFIN-Verification-Details/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODFIN_Verification_Details.vue'
                    ),
                props: true,
            },
            // finance-ROS
            {
                name: 'finance-dashboard',
                path: '/finance/dashboard',
                component: () =>
                    import ('../components/dashboard_finance/dashboard.vue'),
            },
            {
                name: 'Registration-Payment',
                path: 'Registration-Payment',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_RegistrationPayment.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-list',
                path: 'DistributorRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-Details',
                path: 'DistributorRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-list',
                path: 'ConsultantRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-Details',
                path: 'ConsultantRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'Transaction-Ledger',
                path: 'Transaction-Ledger',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_TransactionLedger.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorAndAMSFTransaction-list',
                path: 'DistributorAndAMSFTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorAndAMSFTransaction-list.vue'
                    ),
                // props: true, cm6_PrePaymentTransaction-list
            },
            {
                name: 'PrePaymentTransaction-list',
                path: 'PrePaymentTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrePaymentTransaction-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentTopup-list',
                path: 'PrepaymentTopup-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-list.vue'
                    ),
            },
            {
                name: 'PrepaymentTopup-Details',
                path: 'PrepaymentTopup-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrePayment-Refund',
                path: 'PrePayment-Refund',
                component: () =>
                    import ('../pages/finance-management/fimm/cm6_PrePaymentRefund.vue'),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-list',
                path: 'PrepaymentRefund-DistributorTermination-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-Details',
                path: 'PrepaymentRefund-DistributorTermination-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-Details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-list',
                path: 'PrepaymentRefund-ExamWaiver-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-Details',
                path: 'PrepaymentRefund-ExamWaiver-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-Details.vue'
                    ),
            },
            {
                name: 'AMSFCollection-list',
                path: 'AMSFCollection-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-list.vue'
                    ),
            },
            {
                name: 'AMSFCollection-details',
                path: 'AMSFCollection-details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-details.vue'
                    ),
                // props: true,
            },

            {
                name: 'consultant-dashboard',
                path: '/consultant/dashboard',
                component: () =>
                    import ('../components/dashboard_consultant/dashboard.vue'),
            },
            {
                name: 'distributor-list',
                path: 'distributor-list',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_distributor_list.vue'
                    ),
            },
            {
                name: 'consultant-appeal-fimm',
                path: 'consultant-appeal-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_appeal_fimm.vue'
                    ),
            },
            // {
            //     name: 'consultant-appeal-Consultant',
            //     path: 'consultant-appeal-Consultant',
            //     component: () =>
            //         import (
            //             '../pages/consultant-management/applicant/cm02_consultant_appeal_Consultant.vue'
            //         ),
            // },
            {
                name: 'consultant-details',
                path: 'consultant-details/:id',
                props: true,
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_details.vue'
                    ),
            },
            {
                name: 'consultant-profile-update-Distributor',
                path: 'consultant-profile-update-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_profile_update_Distributor.vue'
                    ),
            },
            {
                name: 'consultant-registration-fimm',
                path: 'consultant-registration-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_registration_fimm.vue'
                    ),
            },
            {
                name: 'consultant-resignation-fimm',
                path: 'consultant-resignation-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_resignation_fimm.vue'
                    ),
            },
            {
                name: 'consultant-reschedule-fimm',
                path: 'consultant-reschedule-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_reschedule_fimm.vue'
                    ),
            },
            // {
            //   name: 'consultant-re-register',
            //   path: 'consultant-re-register',
            //   component: () =>
            //     import(
            //       '../pages/consultant-management/applicant/cm02_consultant_detailsRegistration.vue'
            //     ),
            // },
            {
                name: 'fimm-extension-request',
                path: 'extension-request',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/cm1_distributorExtensionRequestList.vue'
                    ),
            },
            {
                name: 'extension-request-approval-list',
                path: 'extension-request-approval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_distributorExtensionRequestApprovalList.vue'
                    ),
            },
            {
                name: 'extension-request-details',
                path: 'extension-request-details',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_distributorExtensionRequestListDetails.vue'
                    ),
            },
            {
                name: 'fimm-view-extension-request',
                path: 'view-extension-request',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_view_extension_request.vue'
                    ),
            },
            {
                name: 'extension-request-rd-correction',
                path: 'extension-request-rd-correction',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_correction.vue'
                    ),
            },
            {
                path: 'extension-request-rd-hod-correction',
                name: 'extension-request-rd-hod-correction',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_hod_correction.vue'
                    ),
            },
            {
                name: 'extension-request-rd-approval',
                path: 'extension-request-rd-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_approval.vue'
                    ),
            },
            {
                name: 'extension-request-rd-view',
                path: 'extension-request-rd-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_view.vue'
                    ),
            },
            {
                name: 'extension-request-rd-hod-approval',
                path: 'extension-request-rd-hod-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_hod_approval.vue'
                    ),
            },
            {
                name: 'extension-request-rd-hod-view',
                path: 'extension-request-rd-hod-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_hod_view.vue'
                    ),
            },
            {
                name: 'extension-request-rd-gm-approval',
                path: 'extension-request-rd-gm-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_gm_approval.vue'
                    ),
            },
            {
                name: 'extension-request-rd-gm-view',
                path: 'extension-request-rd-gm-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_rd_gm_view.vue'
                    ),
            },
            {
                name: 'extension-request-ceo-approval',
                path: 'extension-request-ceo-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_ceo_approval.vue'
                    ),
            },
            {
                name: 'extension-request-ceo-view',
                path: 'extension-request-ceo-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/cm1_fimm_ceo_view.vue'
                    ),
            },
            {
                name: 'fimm-subsequent-extension-request',
                path: 'subsequent-extension-request',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/cm1_distributorSubsequentExtensionRequestList.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-details',
                path: 'subsequent-extension-request-details',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributorSubsequentExtensionRequestListDetails.vue'
                    ),
            },
            {
                name: 'fimm-subsequent-extension-request-approval-list',
                path: 'subsequent-extension-request-approval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributorSubsequentExtensionRequestApprovalList.vue'
                    ),
            },
            {
                name: 'fimm-view-subsequent-extension-request',
                path: 'subsequent-view-extension-request',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_view_subsequent_extension_request.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-view',
                path: 'subsequent-extension-request-rd-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_view.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-approval',
                path: 'subsequent-extension-request-rd-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_approval.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-correction',
                path: 'subsequent-extension-request-rd-correction',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_correction.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-hod-view',
                path: 'subsequent-extension-request-rd-hod-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_hod_view.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-hod-approval',
                path: 'subsequent-extension-request-rd-hod-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_hod_approval.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-hod-correction',
                path: 'subsequent-extension-request-rd-hod-correction',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_rd_hod_correction.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-gm-view',
                path: 'subsequent-extension-request-rd-gm-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_gm_view.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-rd-gm-approval',
                path: 'subsequent-extension-request-rd-gm-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_gm_approval.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-ceo-view',
                path: 'subsequent-extension-request-ceo-view',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_ceo_view.vue'
                    ),
            },
            {
                name: 'subsequent-extension-request-ceo-approval',
                path: 'subsequent-extension-request-ceo-approval',
                component: () =>
                    import (
                        '../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_ceo_approval.vue'
                    ),
            },

            // Update Distributor
            {
                name: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionList_rdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionDetails_rdApproval.vue'
                    ),
                props: true,
            },
            // end
            // annual fee
            {
                name: 'AnnualFee-FundSubmission-Approval',
                path: 'AnnualFee-FundSubmission-Approval',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_AMSFFundSubmission_Approval.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-FundSubmission-list',
                path: 'AnnualFee-FundSubmission-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_AMSFFundSubmission_list.vue'),
                props: true,
            },
            // RD
            {
                name: 'AnnualFee-RD-Verification-list',
                path: 'AnnualFee-RD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-list',
                path: 'AnnualFee-RD-AUMVerification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_AUMVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-Details',
                path: 'AnnualFee-RD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-list',
                path: 'AnnualFee-RD-TGSVerification-list/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_TGSVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-Details',
                path: 'AnnualFee-RD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            // HOD RD
            {
                name: 'AnnualFee-HODRD-Verification-list',
                path: 'AnnualFee-HODRD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODRD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-list',
                path: 'AnnualFee-HODRD-AUMVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-Details',
                path: 'AnnualFee-HODRD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-list',
                path: 'AnnualFee-HODRD-TGSVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-Details',
                path: 'AnnualFee-HODRD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-ConsultantVerification-list',
                path: 'AnnualFee-HODRD-ConsultantVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_ConsultantVerification_list.vue'
                    ),
                props: true,
            },
            // FIN
            {
                name: 'AnnualFee-FIN-Verification-list',
                path: 'AnnualFee-FIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-FIN-Verification-Details',
                path: 'AnnualFee-FIN-Verification-Details/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_Details.vue'),
                props: true,
            },
            // HOD FIN
            {
                name: 'AnnualFee-HODFIN-Verification-list',
                path: 'AnnualFee-HODFIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODFIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODFIN-Verification-Details',
                path: 'AnnualFee-HODFIN-Verification-Details/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODFIN_Verification_Details.vue'
                    ),
                props: true,
            },
            // finance-ROS
            {
                name: 'Registration-Payment',
                path: 'Registration-Payment',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_RegistrationPayment.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-list',
                path: 'DistributorRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-Details',
                path: 'DistributorRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-list',
                path: 'ConsultantRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-Details',
                path: 'ConsultantRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'Transaction-Ledger',
                path: 'Transaction-Ledger',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_TransactionLedger.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorAndAMSFTransaction-list',
                path: 'DistributorAndAMSFTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorAndAMSFTransaction-list.vue'
                    ),
                // props: true, cm6_PrePaymentTransaction-list
            },
            {
                name: 'PrePaymentTransaction-list',
                path: 'PrePaymentTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrePaymentTransaction-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentTopup-list',
                path: 'PrepaymentTopup-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-list.vue'
                    ),
            },
            {
                name: 'PrepaymentRefundSubmissionForExamWaiver',
                path: 'PrepaymentRefundForExamWaiver',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiver.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefundSubmissionForExamWaiverEdit',
                path: 'PrepaymentRefundSubmissionForExamWaiverEdit/:timestamp',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiverEdit.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentTopup-Details',
                path: 'PrepaymentTopup-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrePayment-Refund',
                path: 'PrePayment-Refund',
                component: () =>
                    import ('../pages/finance-management/fimm/cm6_PrePaymentRefund.vue'),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-list',
                path: 'PrepaymentRefund-DistributorTermination-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-Details',
                path: 'PrepaymentRefund-DistributorTermination-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-Details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-list',
                path: 'PrepaymentRefund-ExamWaiver-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-Details',
                path: 'PrepaymentRefund-ExamWaiver-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-Details.vue'
                    ),
                // props: true,
            },
            {
                name: 'AMSFCollection-list',
                path: 'AMSFCollection-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'AMSFCollection-details',
                path: 'AMSFCollection-details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-details.vue'
                    ),
                // props: true,
            },

            {
                name: 'distributor-list',
                path: 'distributor-list',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_distributor_list.vue'
                    ),
            },
            {
                name: 'consultant-appeal-fimm',
                path: 'consultant-appeal-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_appeal_fimm.vue'
                    ),
            },

            {
                name: 'consultant-bankruptcy-check-RD',
                path: 'consultant-bankruptcy-check-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_bankruptcy_check_RD.vue'
                    ),
            },
            {
                name: 'consultant-details',
                path: 'consultant-details/:id',
                props: true,
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_details.vue'
                    ),
            },
            {
                name: 'consultant-profile-update-Distributor',
                path: 'consultant-profile-update-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_profile_update_Distributor.vue'
                    ),
            },
            {
                name: 'consultant-registration-fimm',
                path: 'consultant-registration-fimm/:id',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_registration_fimm.vue'
                    ),
            },
            {
                name: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionList-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionList_rdApproval.vue'
                    ),
                props: true,
            },
            {
                name: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                path: 'distributor-UpdateDetails-SubmissionDetails-RDApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cm1_distributorUpdateDetailsSubmissionDetails_rdApproval.vue'
                    ),
                props: true,
            },
            // end
            // annual fee
            {
                name: 'AnnualFee-FundSubmission-Approval',
                path: 'AnnualFee-FundSubmission-Approval',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_AMSFFundSubmission_Approval.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-FundSubmission-list',
                path: 'AnnualFee-FundSubmission-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_AMSFFundSubmission_list.vue'),
                props: true,
            },
            // RD
            {
                name: 'AnnualFee-RD-Verification-list',
                path: 'AnnualFee-RD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-list',
                path: 'AnnualFee-RD-AUMVerification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_AUMVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-AUMVerification-Details',
                path: 'AnnualFee-RD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-list',
                path: 'AnnualFee-RD-TGSVerification-list/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_RD_TGSVerification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-RD-TGSVerification-Details',
                path: 'AnnualFee-RD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_RD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            // HOD RD
            {
                name: 'AnnualFee-HODRD-Verification-list',
                path: 'AnnualFee-HODRD-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODRD_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-list',
                path: 'AnnualFee-HODRD-AUMVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-AUMVerification-Details',
                path: 'AnnualFee-HODRD-AUMVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_AUMVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-list',
                path: 'AnnualFee-HODRD-TGSVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_list.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-TGSVerification-Details',
                path: 'AnnualFee-HODRD-TGSVerification-Details',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_TGSVerification_Details.vue'
                    ),
                props: true,
            },
            {
                name: 'AnnualFee-HODRD-ConsultantVerification-list',
                path: 'AnnualFee-HODRD-ConsultantVerification-list',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODRD_ConsultantVerification_list.vue'
                    ),
                props: true,
            },
            // FIN
            {
                name: 'AnnualFee-FIN-Verification-list',
                path: 'AnnualFee-FIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-FIN-Verification-Details',
                path: 'AnnualFee-FIN-Verification-Details/:DIST_ID',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_FIN_Verification_Details.vue'),
                props: true,
            },
            // HOD FIN
            {
                name: 'AnnualFee-HODFIN-Verification-list',
                path: 'AnnualFee-HODFIN-Verification-list',
                component: () =>
                    import ('../pages/annual-fee/fimm/cm7_HODFIN_Verification_list.vue'),
                props: true,
            },
            {
                name: 'AnnualFee-HODFIN-Verification-Details',
                path: 'AnnualFee-HODFIN-Verification-Details/:DIST_ID',
                component: () =>
                    import (
                        '../pages/annual-fee/fimm/cm7_HODFIN_Verification_Details.vue'
                    ),
                props: true,
            },
            // finance-ROS
            {
                name: 'Registration-Payment',
                path: 'Registration-Payment',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_RegistrationPayment.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-list',
                path: 'DistributorRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorRegistration-Payment-Details',
                path: 'DistributorRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorRegistration-payment-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-list',
                path: 'ConsultantRegistration-Payment-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'ConsultantRegistration-Payment-Details',
                path: 'ConsultantRegistration-Payment-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_ConsultantRegistration-payment-details.vue'
                    ),
                // props: true,
            },

            {
                name: 'Transaction-Ledger',
                path: 'Transaction-Ledger',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_TransactionLedger.vue'
                    ),
                // props: true,
            },
            {
                name: 'DistributorAndAMSFTransaction-list',
                path: 'DistributorAndAMSFTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_DistributorAndAMSFTransaction-list.vue'
                    ),
                // props: true, cm6_PrePaymentTransaction-list
            },
            {
                name: 'PrePaymentTransaction-list',
                path: 'PrePaymentTransaction-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrePaymentTransaction-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentTopup-list',
                path: 'PrepaymentTopup-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-list.vue'
                    ),
            },
            {
                name: 'PrepaymentRefundSubmissionForExamWaiver',
                path: 'PrepaymentRefundForExamWaiver',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiver.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefundSubmissionForExamWaiverEdit',
                path: 'PrepaymentRefundSubmissionForExamWaiverEdit/:timestamp',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiverEdit.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentTopup-Details',
                path: 'PrepaymentTopup-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentTopup-details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrePayment-Refund',
                path: 'PrePayment-Refund',
                component: () =>
                    import ('../pages/finance-management/fimm/cm6_PrePaymentRefund.vue'),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-list',
                path: 'PrepaymentRefund-DistributorTermination-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-DistributorTermination-Details',
                path: 'PrepaymentRefund-DistributorTermination-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-DistributorTermination-Details.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-list',
                path: 'PrepaymentRefund-ExamWaiver-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'PrepaymentRefund-ExamWaiver-Details',
                path: 'PrepaymentRefund-ExamWaiver-Details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_PrepaymentRefund-ExamWaiver-Details.vue'
                    ),
                // props: true,
            },
            {
                name: 'AMSFCollection-list',
                path: 'AMSFCollection-list',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-list.vue'
                    ),
                // props: true,
            },
            {
                name: 'AMSFCollection-details',
                path: 'AMSFCollection-details',
                component: () =>
                    import (
                        '../pages/finance-management/fimm/cm6_AMSFCollection-details.vue'
                    ),
                // props: true,
            },

            // Fund Declaration
            {
                name: 'fund_declaration',
                path: 'fund_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fund_declaration.vue'
                    ),
            },
            {
                name: 'fund_creation_declaration',
                path: 'fund_creation_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fund_creation_declaration.vue'
                    ),
            },
            {
                name: 'fund_lodgement_declaration',
                path: 'fund_lodgement_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fund_lodgement_declaration.vue'
                    ),
            },
            {
                name: 'fund_dislodgement_declaration',
                path: 'fund_dislodgement_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fund_dislodgement_declaration.vue'
                    ),
            },
            {
                name: 'fund_application_declaration',
                path: 'fund_application_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-fundMalaysia/cm0_fund_application_declaration.vue'
                    ),
            },


            // *******************************NURUL - START**************************************
            //1. SUSPENSION-REVOCATION - START
            {
                name: 'distributor-records',
                path: 'distributor-records',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_distributorList.vue'
                    ),
            },
            {
                name: 'new-submission',
                path: 'new-submission',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_newSubmission.vue'
                    ),
            },
            {
                name: 'suspension-revocation-list',
                path: 'suspension-revocation-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_distributor_suspensionRevokeList.vue'
                    ),
            },
            {
                name: 'view-suspension-revocation-list',
                path: 'view-suspension-revocation-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_distributor_viewSuspensionRevokeList.vue'
                    ),
            },
            {
                name: 'view-submission-form',
                path: 'view-submission-form',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_viewSubmissionForm.vue'
                    ),
            },
            {
                name: 'edit-submission-form',
                path: 'edit-submission-form',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/cm1_editSubmissionForm.vue'
                    ),
            },
            {
                name: 'suspension-hodApproval-list',
                path: 'suspension-hodApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_distributorSuspension_hodList.vue'
                    ),
            },
            {
                name: 'view-suspensionSubmission-hod',
                path: 'view-suspensionSubmission-hod',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_viewSuspensionSubmission_hod.vue'
                    ),
            },
            {
                name: 'suspension-gmApproval-list',
                path: 'suspension-gmApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_distributorSuspension_gmList.vue'
                    ),
            },
            {
                name: 'view-suspensionSubmission-gm',
                path: 'view-suspensionSubmission-gm',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_viewSuspensionSubmission_gm.vue'
                    ),
            },
            {
                name: 'suspension-ceoApproval-list',
                path: 'suspension-ceoApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_distributorSuspension_ceoList.vue'
                    ),
            },
            {
                name: 'view-suspensionSubmission-ceo',
                path: 'view-suspensionSubmission-ceo',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/suspend/cm1_viewSuspensionSubmission_ceo.vue'
                    ),
            },
            {
                name: 'revocation-hodApproval-list',
                path: 'revocation-hodApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_distributorRevocation_hodList.vue'
                    ),
            },
            {
                name: 'view-revocationSubmission-hod',
                path: 'view-revocationSubmission-hod',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_viewRevocationSubmission_hod.vue'
                    ),
            },
            {
                name: 'revocation-gmApproval-list',
                path: 'revocation-gmApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_distributorRevocation_gmList.vue'
                    ),
            },
            {
                name: 'view-revocationSubmission-gm',
                path: 'view-revocationSubmission-gm',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_viewRevocationSubmission_gm.vue'
                    ),
            },
            {
                name: 'revocation-ceoApproval-list',
                path: 'revocation-ceoApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_distributorRevocation_ceoList.vue'
                    ),
            },
            {
                name: 'view-revocationSubmission-ceo',
                path: 'view-revocationSubmission-ceo',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/suspend-revoke/revoke/cm1_viewRevocationSubmission_ceo.vue'
                    ),
            },
            // SUSPENSION-REVOCATION - END

            //2. APPEAL SUSPENSION-REVOCATION - START
            {
                name: 'overview-appeal-suspension-revocation-list',
                path: 'overview-appeal-suspension-revocation-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/cm1_overviewList.vue'
                    ),
            },
            {
                name: 'appeal-suspension-revocation-list',
                path: 'appeal-suspension-revocation-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/cm1_newAppeal_distributorSubmission.vue'
                    ),
            },
            {
                name: 'view-appeal-submission',
                path: 'view-appeal-submission',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/cm1_viewAppealSubmissionForm.vue'
                    ),
            },
            {
                name: 'review-appeal-submission',
                path: 'review-appeal-submission',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/cm1_reviewAppealForm.vue'
                    ),
            },
            {
                name: 'appealSuspension-hodApproval-list',
                path: 'appealSuspension-hodApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_appealSuspend_submission_hodList.vue'
                    ),
            },
            {
                name: 'view-appealSuspension-hod',
                path: 'view-appealSuspension-hod',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_reviewAppealSuspension_hod.vue'
                    ),
            },
            {
                name: 'appealSuspension-gmApproval-list',
                path: 'appealSuspension-gmApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_appealSuspend_submission_gmList.vue'
                    ),
            },
            {
                name: 'view-appealSuspension-gm',
                path: 'view-appealSuspension-gm',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_reviewAppealSuspension_gm.vue'
                    ),
            },
            {
                name: 'appealSuspension-ceoApproval-list',
                path: 'appealSuspension-ceoApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_appealSuspend_submission_ceoList.vue'
                    ),
            },
            {
                name: 'view-appealSuspension-ceo',
                path: 'view-appealSuspension-ceo',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-suspend/cm1_reviewAppealSuspension_ceo.vue'
                    ),
            },
            {
                name: 'appealRevocation-hodApproval-list',
                path: 'appealRevocation-hodApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_appealRevoke_submission_hodList.vue'
                    ),
            },
            {
                name: 'view-appealRevocation-hod',
                path: 'view-appealRevocation-hod',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_reviewAppealRevocation_hod.vue'
                    ),
            },
            {
                name: 'appealRevocation-gmApproval-list',
                path: 'appealRevocation-gmApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_appealRevoke_submission_gmList.vue'
                    ),
            },
            {
                name: 'view-appealRevocation-gm',
                path: 'view-appealRevocation-gm',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_reviewAppealRevocation_gm.vue'
                    ),
            },
            {
                name: 'appealRevocation-ceoApproval-list',
                path: 'appealRevocation-ceoApproval-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_appealRevoke_submission_ceoList.vue'
                    ),
            },
            {
                name: 'view-appealRevocation-ceo',
                path: 'view-appealRevocation-ceo',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/appeal-suspend-revoke/appeal-revoke/cm1_reviewAppealRevocation_ceo.vue'
                    ),
            },
            // APPEAL SUSPENSION-REVOCATION - END
            //3. CESSATION APPROVAL - START
            {
                name: 'cessation-submission-overview-list',
                path: 'cessation-submission-overview-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_cessationOverviewList.vue'
                    ),
            },
            {
                name: 'cessation-submission-list',
                path: 'cessation-submission-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_cessationSubmission_rdList.vue'
                    ),
            },
            {
                name: 'view-cessation-submission-form',
                path: 'view-cessation-submission-form',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_viewCessation_submissionForm.vue'
                    ),
            },
            {
                name: 'cessation-submission-rdApproval',
                path: 'cessation-submission-rdApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_reviewCessationSubmission_rdApproval.vue'
                    ),
            },
            {
                name: 'cessation-submission-hod-list',
                path: 'cessation-submission-hod-list',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_cessationSubmission_hodList.vue'
                    ),
            },
            {
                name: 'cessation-submission-hodApproval',
                path: 'cessation-submission-hodApproval',
                component: () =>
                    import (
                        '../pages/distributor-management/fimm/cessation/cm1_reviewCessationSubmission_hodApproval.vue'
                    ),
            },
            // CESSATION APPROVAL - END
            //4. CONSULTANT ALERT - START
            {
                name: 'cas-dashboard',
                path: '/cas/dashboard',
                component: () =>
                    import ('../components/dashboard_cas/dashboard.vue'),
            },
            {
                name: 'consultantAlert-overviewList',
                path: 'consultantAlert-overviewList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_overviewList.vue'
                    ),
            },
            {
                name: 'consultantAlert-viewList',
                path: 'consultantAlert-viewList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_overviewListApproval.vue'
                    ),
            },
            {
                name: 'consultantAlert-recordList',
                path: 'consultantAlert-recordList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_recordList.vue'
                    ),
            },
            {
                name: 'consultantAlert-viewRecordList',
                path: 'consultantAlert-viewRecordList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_viewRecordList.vue'
                    ),
            },
            {
                name: 'consultantAlert-consultantCaRecord',
                path: 'consultantAlert-consultantCaRecord',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_consultantCaRecord.vue'
                    ),
            },
            {
                name: 'consultantAlert-viewConsultantCaRecord',
                path: 'consultantAlert-viewConsultantCaRecord',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consltantAlert_viewConsultantCaRecord.vue'
                    ),
            },
            {
                name: 'consultantAlert-searchConsultant',
                path: 'consultantAlert-searchConsultant',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_searchConsultant.vue'
                    ),
            },
            {
                name: 'consultantAlert-registerNewCase',
                path: 'consultantAlert-registerNewCase',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_registerNewCase.vue'
                    ),
            },
            {
                name: 'consultantAlert-registerExistingRecord',
                path: 'consultantAlert-registerExistingRecord',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_registerExistingRecord.vue'
                    ),
            },
            {
                name: 'consultantAlert-viewCaRecord',
                path: 'consultantAlert-viewCaRecord',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_viewCaRecord.vue'
                    ),
            },
            {
                name: 'consultantAlert-editCaRecord',
                path: 'consultantAlert-editCaRecord',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_editCaRecord.vue'
                    ),
            },
            {
                name: 'consultantAlert-hodLraRecordList',
                path: 'consultantAlert-hodLraRecordList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_hodLraRecordList.vue'
                    ),
            },
            {
                name: 'consultantAlert-hodLraCaseVerification',
                path: 'consultantAlert-hodLraCaseVerification',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_hodLraCaseVerification.vue'
                    ),
            },
            {
                name: 'consultantAlert-gmLraRecordList',
                path: 'consultantAlert-gmLraRecordList',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_gmLraRecordList.vue'
                    ),
            },
            {
                name: 'consultantAlert-gmLraCaseApproval',
                path: 'consultantAlert-gmLraCaseApproval',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_gmLraCaseApproval.vue'
                    ),
            },
            {
                name: 'consultantAlert-generateLetter',
                path: 'consultantAlert-generateLetter',
                component: () =>
                    import (
                        '../pages/consultant-alert/fimm/cm03_consultantAlert_generateLetter.vue'
                    ),
            },
            //CONSULTANT ALERT - END
            //5. NEW MEDIA USER APPROVAL - START
            {
                name: 'media-user-list',
                path: 'media-user-list',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/media_registration/cm5_media_user_list.vue'
                    ),
            },
            //NEW MEDIA USER APPROVAL - END
            //6. MEDIA COMPANY - START
            {
                name: 'company-media-record',
                path: 'company-media-record',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/media_registration/cm5_mediaCompany_record.vue'
                    ),
            },
            //MEDIA COMPANY - END
            //NAV MANAGEMENT - START

            {
                name: "navManagementSubmissionList",
                path: "navManagementSubmissionList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_navSubmissionList.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementOverviewList",
                path: "navManagementOverviewList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_navManagementOverviewList.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementVerification",
                path: "navManagementVerification",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_navManagementVerification.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementApprovalList",
                path: "navManagementApprovalList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_navSubmissionApprovalList.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementApproval",
                path: "navManagementApproval",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_navManagementApproval.vue"
                    ),
                props: true,
            },
            {
                name: "viewNavManagementRecord",
                path: "viewNavManagementRecord",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/navManagement/cm5_fimm_viewNavSubmission.vue"
                    ),
                props: true,
            },

            //NAV MANAGEMENT - END



            // *******************************NURUL - END***************************************



            // *******************************ACAP - START**************************************

            {
                name: 'fundManagement-default',
                path: 'fundManagement-default',
                component: () =>
                    import ('../pages/funds-malaysia/default.vue'),
                props: true,
            },

            // Fund Creation Start
            {
                name: 'fundCreation-Company',
                path: 'fundCreation-Company',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm-fund-creationCompany.vue'
                    ),
                props: true,
            },
            {
                name: 'fundCreation-list',
                path: 'fundCreation-list',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm-fund-creationlist.vue'
                    ),
            },
            {
                name: 'fundCreation-review',
                path: 'fundCreation-review',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm-fund-creation-review.vue'
                    ),
                props: true,
            },
            // Fund Creation End

            // Fund Lodge Start
            {
                name: 'fundLodge-CompanyList',
                path: 'fundLodge-CompanyList',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundLodge_CompanyList.vue'
                    ),
                props: true,
            },
            {
                name: "fundLodge-submitList",
                path: "fundLodge-submitList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/cm5_fimm_fundLodge_submitList.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodge-submitReview",
                path: "fundLodge-submitReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/cm5_fimm_FundLodgeDetailsReview.vue"
                    ),
                props: true,
            },
            {
                name: 'fundLodge-idReview',
                path: 'fundLodge-idReview',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundLodge_idReview.vue'
                    ),
                props: true,
            },
            // Fund Lodge End
            // Fund DisLodge Start
            {
                name: 'fundDisLodge-submitList',
                path: 'fundDisLodge-submitList',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundDisLodge_submitList.vue'
                    ),
                props: true,
            },
            {
                name: 'fundDisLodge-idReview',
                path: 'fundDisLodge-idReview',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundDisLodge_idReview.vue'
                    ),
                props: true,
            },
            // Fund DisLodge End
            // Fund Termination/Suspension/Closure Start
            {
                name: 'fundApplication-SubmitList',
                path: 'fundApplication-SubmitList',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundApplicationList.vue'
                    ),
                props: true,
            },
            {
                name: 'distributedList',
                path: 'distributedList',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_list_of_distributor.vue'
                    ),
                props: true,
            },
            {
                name: 'fundApplication-Approval',
                path: 'fundApplication-Approval',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_fundApplicationApproval.vue'
                    ),
                props: true,
            },
            // Fund Termination/Suspension/Closure END



            // NAV DAILY PUBLISH START

            {
                name: 'nav-list',
                path: 'nav-list',
                component: () =>
                    import ('../pages/funds-malaysia/cm5_NAVList.vue'),
                props: true,
            },

            // NAV DAILY PUBLISH END

            // Fund Management START
            {
                name: 'fund-changes-company-list',
                path: 'fund-changes-company-list',
                component: () =>
                    import ('../pages/funds-malaysia/fimm/cm5_fimm_FundChangeCompanyList.vue'),
                props: true,
            },
            {
                name: 'fund-changes-list',
                path: 'fund-changes-list',
                component: () =>
                    import ('../pages/funds-malaysia/fimm/cm5_fimm_fundChangesList.vue'),
                props: true,
            },
            {
                name: 'fund-changes-approval',
                path: 'fund-changes-approval',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_fimm_FundChangesApproval.vue'
                    ),
                props: true,
            },
            {
                name: "fundManagementFimmReviewFundDetails",
                path: "fundManagementFimmReviewFundDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/cm5_fimm_FundChangeDetailsFIMMReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementFimmReviewFundNotes",
                path: "fundManagementFimmReviewFundNotes",
                component: () =>
                    import (
                        "../pages/funds-malaysia/fimm/cm5_fimm_FundChangeDetailsFIMMFundNotes.vue"
                    ),
                props: true,
            },
            // Fund Management END
            // 3rd Party Company Registration START
            {
                name: 'thirdparty-submission-list',
                path: 'thirdparty-submission-list',
                component: () =>
                    import (
                        '../pages/funds-malaysia/fimm/cm5_thirdparty_ListSubmission.vue'
                    ),
                props: true,
            },
            {
                name: 'thirdparty-idreview',
                path: 'thirdparty-idreview',
                component: () =>
                    import ('../pages/funds-malaysia/fimm/cm5_thirdparty_IDReview.vue'),
                props: true,
            },
            {
                name: 'trp-submission-list',
                path: 'trp-submission-list',
                component: () =>
                    import ('../pages/funds-malaysia/fimm/cm5_TRP_ListSubmission.vue'),
                props: true,
            },
            {
                name: 'trp-idreview',
                path: 'trp-idreview',
                component: () =>
                    import ('../pages/funds-malaysia/fimm/cm5_TRP_IDReview.vue'),
                props: true,
            },
            // 3rd Party Company Registration END

            // *******************************ACAP - END****************************************




            // *******************************SYAHRIN - START************************************
            // *******************************SYAHRIN - END**************************************





            // *******************************SABIR - START***************************************

            //1. ANNOUNCEMENT MANAGEMENT (RD) - START
            {
                name: 'event-list',
                path: 'event-list/:MANAGE_DEPARTMENT_ID/:DPMT_NAME',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventList.vue'
                    ),
            },
            {
                name: 'event-review-list',
                path: 'event-review-list/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_review_eventList.vue'
                    ),
            },
            {
                name: 'new-event',
                path: 'new-event/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'update-event',
                path: 'update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventUpdate.vue'
                    ),
            },
            {
                name: 'eventList-approval',
                path: 'eventList-approval',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventApprovalList.vue'
                    ),
            },
            {
                name: 'event-hod-approval',
                path: 'event-hod-approval/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventHodApproval.vue'
                    ),
            },
            {
                name: 'event-approval-details',
                path: 'event-approval-details/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventApprovalDetails.vue'
                    ),
            },
            {
                name: 'review-event-update',
                path: 'review-event-update/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_review_event_update.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (RD) - END
            //2. ANNOUNCEMENT MANAGEMENT (LRA) - START
            {
                name: 'lra-event-list',
                path: 'lra-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/LRA/cm0_eventList.vue'
                    ),
            },
            {
                name: 'lra-new-event',
                path: 'lra-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/LRA/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'lra-update-event',
                path: 'lra-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/LRA/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (LRA) - END
            //3. ANNOUNCEMENT MANAGEMENT (ID) - START
            {
                name: 'id-event-list',
                path: 'id-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/industry-department/cm0_eventList.vue'
                    ),
            },
            {
                name: 'id-new-event',
                path: 'id-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/industry-department/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'id-update-event',
                path: 'id-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/industry-department/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (ID) - END
            //4. ANNOUNCEMENT MANAGEMENT (FIN) - START
            {
                name: 'fin-event-list',
                path: 'fin-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/finance/cm0_eventList.vue'
                    ),
            },
            {
                name: 'fin-new-event',
                path: 'fin-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/finance/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'fin-update-event',
                path: 'fin-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/finance/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (FIN) - END
            //5. ANNOUNCEMENT MANAGEMENT (IT) - START
            {
                name: 'it-event-list',
                path: 'it-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/it-management/cm0_eventList.vue'
                    ),
            },
            {
                name: 'it-new-event',
                path: 'it-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/it-management/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'it-update-event',
                path: 'it-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/it-management/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (IT) - END
            //6. ANNOUNCEMENT MANAGEMENT (PDS) - START
            {
                name: 'pd-event-list',
                path: 'pd-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/professional-dev/cm0_eventList.vue'
                    ),
            },
            {
                name: 'pd-new-event',
                path: 'pd-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/professional-dev/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'pd-update-event',
                path: 'pd-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/professional-dev/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (PDS) - END
            //7. ANNOUNCEMENT MANAGEMENT (R&A) - START
            {
                name: 'rna-event-list',
                path: 'rna-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/research-and-analystic/cm0_eventList.vue'
                    ),
            },
            {
                name: 'rna-new-event',
                path: 'rna-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/research-and-analystic/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'rna-update-event',
                path: 'rna-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/research-and-analystic/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (R&A) - END
            //8. ANNOUNCEMENT MANAGEMENT (SUPERVISION) - START
            {
                name: 'supervision-event-list',
                path: 'supervision-event-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/supervision/cm0_eventList.vue'
                    ),
            },
            {
                name: 'supervision-new-event',
                path: 'supervision-new-event',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/supervision/cm0_newEvent.vue'
                    ),
            },
            {
                name: 'supervision-update-event',
                path: 'supervision-update-event/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/supervision/cm0_eventUpdate.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT (SUPERVISION) - END

            //9. CIRCULAR MANAGEMENT (RD) - START
            {
                name: 'rd-circular-details',
                path: 'rd-circular-details/:CIRCULAR_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularDetails.vue'
                    ),
            },
            {
                name: 'rd-circular-List',
                path: 'rd-circular-List/:MANAGE_DEPARTMENT_ID/:DPMT_NAME',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularList.vue'
                    ),
            },
            {
                name: 'rd-review-circular-List',
                path: 'rd-review-circular-List/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_submissionCircularList.vue'
                    ),
            },
            {
                name: 'rd-gm-review-circular-List',
                path: 'rd-gm-review-circular-List/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularGMApprovalList.vue'
                    ),
            },
            {
                name: 'rd-gm-review-circular-update',
                path: 'rd-gm-review-circular-update/:CIRCULAR_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularGMApprovalUpdate.vue'
                    ),
            },
            {
                name: 'rd-new-circular',
                path: 'rd-new-circular/:MANAGE_DEPARTMENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_newCircular.vue'
                    ),
            },
            {
                name: 'rd-update-circular',
                path: 'rd-update-circular/:CIRCULAR_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_updateCircular.vue'
                    ),
            },
            {
                name: 'rd-review-update-circular',
                path: 'rd-review-update-circular/:CIRCULAR_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_reviewCircularUpdate.vue'
                    ),
            },
            {
                name: 'rd-new-circular',
                path: 'rd-new-circular',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_newCircular.vue'
                    ),
            },
            {
                name: 'rd-circular-update',
                path: 'rd-circular-update/:id',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularUpdate.vue'
                    ),
            },
            {
                name: 'Hodrd-circular-List',
                path: 'Hodrd-circular-List',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/registrationDepartment/cm0_circularHodApprovalList.vue'
                    ),
            },
            //CIRCULAR MANAGEMENT (RD) - END
            //10.CIRCULAR MANAGEMENT (LRA) - START
            {
                name: 'lra-circular-List',
                path: 'lra-circular-List',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/LegalDepartment/cm0_lra_CircularList.vue'
                    ),
            },
            //CIRCULAR MANAGEMENT (LRA) - END
            //11. ANNOUNCEMENT MANAGEMENT - START
            {
                name: "announcement-setting",
                path: "announcement-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/announcement-setting.vue'
                    ),
            },
            {
                name: "announcement-hod-review-setting",
                path: "announcement-hod-review-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/announcement-hod-review-setting.vue'
                    ),
            },
            //ANNOUNCEMENT MANAGEMENT - END
            //12. CIRCULAR MANAGEMENT - START
            {
                name: "circular-setting",
                path: "circular-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/circular-setting.vue'
                    ),
            },
            {
                name: "circular-hod-review-setting",
                path: "circular-hod-review-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/circular-hod-review-setting.vue'
                    ),
            },
            {
                name: "circular-gm-review-setting",
                path: "circular-gm-review-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/circular-gm-review-setting.vue'
                    ),
            },
            //CIRCULAR MANAGEMENT - END
            //13. GENERAL SETTING - START
            {
                name: 'bymodule-list',
                path: 'bymodule-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/bymodule-list.vue'
                    ),
            },
            {
                name: 'document-form-setting',
                path: 'document-form-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/document-form-setting.vue'
                    ),
            },
            {
                name: 'page-maintanance-setting',
                path: 'page-maintanance-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/page-maintanance-setting.vue'
                    ),
            },
            {
                name: 'fee-management-setting',
                path: 'fee-management-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/fee-management-setting.vue'
                    ),
            },
            {
                name: 'email-notification',
                path: 'email-notification',
                component: () =>
                    import (
                        '../pages/admin-configuration/Email-Management/email-notification.vue'
                    ),
            },
            {
                name: 'ldap-configuration',
                path: 'ldap-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/LDAP-Management/cm0_ldapConfiguration.vue'
                    ),
            },
            {
                name: "excel-template",
                path: "excel-template",
                component: () =>
                    import (
                        '../pages/admin-configuration/document-management/cm0_excelTemplate.vue'
                    ),
            },
            {
                name: "document-checkList",
                path: "document-checkList",
                component: () =>
                    import (
                        '../pages/admin-configuration/document-management/cm0_documentChecklist.vue'
                    ),
            },
            {
                name: "file-size-setting",
                path: "file-size-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/filesizesetting/cm0_fileSizeSetting.vue"
                    ),
            },
            {
                name: "calendar-management",
                path: "calendar-management",
                component: () =>
                    import (
                        '../pages/admin-configuration/calendar-management/cm0_calendarManagement.vue'
                    ),
            },
            {
                name: "address-management",
                path: "address-management",
                component: () =>
                    import (
                        '../pages/admin-configuration/address-management/cm0_addressManagement.vue'
                    ),
                meta: {
                    progress: {
                        func: [
                            { call: "color", modifier: "temp", argument: "#ffb000" },
                            { call: "fail", modifier: "temp", argument: "#6e0000" },
                            { call: "location", modifier: "temp", argument: "top" },
                            {
                                call: "transition",
                                modifier: "temp",
                                argument: {
                                    speed: "1.5s",
                                    opacity: "0.6s",
                                    termination: 400,
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: "sms-notification",
                path: "sms-notification",
                component: () =>
                    import (
                        "../pages/admin-configuration/sms-notification/cm0_smsNotifcation.vue"
                    ),
            },
            {
                name: "salutation-setting",
                path: "salutation-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/general-setting/salutation-setting.vue"
                    ),
            },
            {
                name: 'login-setting',
                path: 'login-setting',
                component: () =>
                    import (
                        "../pages/admin-configuration/system-setting/login-setting.vue"
                    ),
            },
            {
                name: "colour-setting",
                path: "colour-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/colour-setting.vue'
                    ),
            },
            {
                name: "dummy-distributor",
                path: "dummy-distributor",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/dummy-distributor.vue'
                    ),
            },
            {
                name: 'file-size-setting',
                path: 'file-size-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/filesizesetting/cm0_fileSizeSetting.vue'
                    ),
            },
            {
                name: 'purge-data-setting',
                path: 'purge-data-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/purge-data-setting/cm0_purge_data_setting.vue'
                    ),
            },
            {
                name: 'data-retention-setting',
                path: 'data-retention-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/data-retention-setting/cm0_data_retention_setting.vue'
                    ),
            },
            {
                name: 'gender-setting',
                path: 'gender-setting',
                component: () =>
                    import ('../pages/admin-configuration/general-setting/gender.vue'),
            },
            {
                name: 'currency-setting',
                path: 'currency-setting',
                component: () =>
                    import ('../pages/admin-configuration/general-setting/currency.vue'),
            },
            {
                name: 'password-setting',
                path: 'password-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/password-setting.vue'
                    ),
            },
            {
                name: 'user-id-setting',
                path: 'user-id-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/user-id-setting.vue'
                    ),
            },
            {
                name: 'screen-management-setting',
                path: 'screen-management-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/screen-management-setting.vue'
                    ),
            },
            {
                name: 'role-matrix-setting',
                path: 'role-matrix-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/screen-management/role-matrix-setting.vue'
                    ),
            },
            {
                name: 'role-matrix-list',
                path: 'role-matrix-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/screen-management/role-matrix-list.vue'
                    ),
            },
            {
                name: 'other-access-setting',
                path: 'other-access-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/other-access-setting.vue'
                    ),
            },
            {
                name: 'integration-setting',
                path: 'integration-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/integration-setting.vue'
                    ),
            },
            {
                name: 'address-setting',
                path: 'address-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/address-setting.vue'
                    ),
            },
            {
                name: 'general-setting',
                path: 'general-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/general-setting.vue'
                    ),
            },
            {
                name: "calendar-setting",
                path: "calendar-setting",
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/calendar-setting.vue'
                    ),
            },
            {
                name: "inactive-user-setting",
                path: "inactive-user-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/other-access/inactive-user/inactive-user-setting.vue"
                    ),
                props: true,
            },
            {
                name: "inactive-user",
                path: "inactive-user/:type_id",
                component: () =>
                    import (
                        "../pages/admin-configuration/other-access/inactive-user/userInactive.vue"
                    ),
                props: true,
            },
            //GENERAL SETTING - END
            //14. SETTING BY MODULE (CONSULTANT) - START
            {
                name: 'prs_familirisation_program',
                path: 'prs_familirisation_program',
                component: () =>
                    import ('../pages/admin-configuration/byModule-consultant/cm0_prs_familirisation.vue'),
            },
            {
                name: 'consultant_declaration',
                path: 'consultant_declaration',
                component: () =>
                    import ('../pages/admin-configuration/byModule-consultant/cm0_consultant_declaration.vue'),
            },
            {
                name: 'registration_declaration_consultant',
                path: 'registration_declaration_consultant',
                component: () =>
                    import ('../pages/admin-configuration/byModule-consultant/cm0_consultant_registration_declaration.vue'),
            },
            {
                name: 'exam_declaration_consultant',
                path: 'exam_declaration_consultant',
                component: () =>
                    import ('../pages/admin-configuration/byModule-consultant/cm0_consultant_exam_declaration.vue'),
            },
            //SETTING BY MODULE CONSULTANT - END
            //15. SETTING BY MODULE (AMSF) - START
            {
                name: "annual-fee-management",
                path: "annual-fee-management",
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-annualFee/cm0_annual_fee_management.vue'
                    ),
            },
            {
                name: "amsf_declaration",
                path: "amsf_declaration",
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-annualFee/cm0_amsf_declaration.vue'
                    ),
            },
            //SETTING BY MODULE (AMSF) - END
            // SETTING ID MASKING - START
            {
                name: "masking",
                path: "idmasking-mainlist",
                component: () =>
                    import (
                        "../pages/admin-configuration/idmasking/idmasking-mainlist.vue"
                    ),
            },
            {
                name: "distributor-idmasking",
                path: "distributor-idmasking",
                component: () =>
                    import (
                        "../pages/admin-configuration/idmasking/distributor-idmasking.vue"
                    ),
            },
            {
                name: "consultant-idmasking",
                path: "consultant-idmasking",
                component: () =>
                    import (
                        "../pages/admin-configuration/idmasking/consultant-idmasking.vue"
                    ),
            },
            {
                name: "trainingprovider-idmasking",
                path: "trainingprovider-idmasking",
                component: () =>
                    import (
                        "../pages/admin-configuration/idmasking/trainingprovider-idmasking.vue"
                    ),
            },
            //SETTING ID MASKING - END
            //SETTING BY MODULE FINANCE- START
            {
                name: 'finance-configuration',
                path: 'finance-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-finance/cm0_finance_mainSetting.vue'
                    ),
            },
            //SETTING BY MODULE FINANCE- END
            //SETTING BY MODULE DISTRIBUTOR - START
            {
                name: 'distributor-configuration',
                path: 'distributor-configuration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-distributor/cm0_distributor_mainSetting.vue'
                    ),
            },

            {
                name: 'distributor_declaration',
                path: 'distributor_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-distributor/cm0_distributor_declaration.vue'
                    ),
            },
            {
                name: 'distributor_registration_declaration',
                path: 'distributor_registration_declaration',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-distributor/cm0_distributor_registration_declaration.vue'
                    ),
            },
            {
                name: 'distributor-type',
                path: 'distributor-type',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-distributor/distributor-type.vue'
                    ),
            },
            //SETTING BY MODULE DISTRIBUTOR - END
            // SETTING BY MODULE CAS - START
            {
                name: 'letter-list',
                path: 'letter-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-CAS/letter/cm0_letterList.vue'
                    ),
            },
            {
                name: 'new-letter',
                path: 'new-letter',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-CAS/letter/cm0_newLetter.vue'
                    ),
            },
            {
                name: 'edit-letter',
                path: 'edit-letter',
                component: () =>
                    import (
                        '../pages/admin-configuration/byModule-CAS/letter/cm0_editLetter.vue'
                    ),
            },
            // SETTING BY MODULE CAS -END



            // *******************************SABIR - END*****************************************





            // *******************************SANTOSH - START**************************************
            // *******************************SANTOSH - END****************************************





            // *******************************BINAY - START***************************************
            // CONSULTANT REGISTRATION APPROVAL
            {
                name: 'consultant-registration-approval-RD',
                path: 'consultant-registration-approval-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_registration_approval_RD.vue'
                    ),
            },
            // TERMINATION BY RD
            {
                name: 'consultant-termination-RD',
                path: 'consultant-termination-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/RD/cm02_consultant_termination_RD.vue'
                    ),
            },

            {
                name: 'consultant-bulk-termination-RD',
                path: 'consultant-bulk-termination-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/RD/cm02_consultant_bulk_termination_RD'
                    ),
            },
            {
                name: 'consultant-termination-details-RD',
                path: 'consultant-termination-details-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/RD/cm02_consultant_termination_details_RD'
                    ),
            },

            {
                name: 'consultant-termination-statusList-RD',
                path: 'consultant-termination-statusList-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/RD/cm02_consultant_termination_statusList_RD'
                    ),
            },
            {
                name: 'consultant-termination-viewList-RD',
                path: 'consultant-termination-viewList-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/RD/cm02_consultant_termination_viewList_RD'
                    ),
            },

            // TERMINATION BY RD-HOD
            {
                name: 'consultant-termination-RD_HOD',
                path: 'consultant-termination-RD_HOD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/HOD_RD/cm02_consultant_termination_RD_HOD.vue'
                    ),
            },
            {
                name: 'consultant-termination-statusList-RD-HOD',
                path: 'consultant-termination-statusList-RD-HOD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/HOD_RD/cm02_consultant_termination_statusList_RD_HOD.vue'
                    ),
            },
            {
                name: 'consultant-termination-bulk-RD-HOD',
                path: 'consultant-termination-bulk-RD-HOD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/HOD_RD/cm02_consultant_bulk_termination_RD_HOD'
                    ),
            },
            {
                name: 'consultant-termination-details-RD-HOD',
                path: 'consultant-termination-details-RD-HOD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/HOD_RD/cm02_consultant_termination_details_RD_HOD'
                    ),
            },

            // TERMIANTION BY GM
            {
                name: 'consultant-termination-GM',
                path: 'consultant-termination-GM',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/GM/cm02_consultant_termination_GM.vue'
                    ),
            },
            {
                name: 'consultant-termination-statusList-GM',
                path: 'consultant-termination-statusList-GM',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/GM/cm02_consultant_termination_statusList_GM'
                    ),
            },
            {
                name: 'consultant-termination-bulk-GM',
                path: 'consultant-termination-bulk-GM',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/GM/cm02_consultant_bulk_termination_GM.vue'
                    ),
            },

            {
                name: 'consultant-termination-details-GM',
                path: 'consultant-termination-details-GM',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/GM/cm02_consultant_termination_details_GM'
                    ),
            },

            // TERMINATION BY CEO
            {
                name: 'consultant-termination-CEO',
                path: 'consultant-termination-CEO',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/CEO/cm02_consultant_termination_CEO.vue'
                    ),
            },
            {
                name: 'consultant-termination-statusList-CEO',
                path: 'consultant-termination-statusList-CEO',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/CEO/cm02_consultant_termination_statusList_CEO'
                    ),
            },
            {
                name: 'consultant-termination-bulk-CEO',
                path: 'consultant-termination-bulk-CEO',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/CEO/cm02_consultant_bulk_termination_CEO.vue'
                    ),
            },

            {
                name: 'consultant-termination-details-CEO',
                path: 'consultant-termination-details-CEO',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/termination/CEO/cm02_consultant_termination_details_CEO'
                    ),
            },

            //BANKRUPTCY
            {
                name: 'consultant-bankruptcy-check-RD',
                path: 'consultant-bankruptcy-check-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_bankruptcy_check_RD.vue'
                    ),
            },

            //APPEAL
            {
                name: 'consultantappealRD',
                path: 'consultant-appeal-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_appeal_RD.vue'
                    ),
            },
            // *******************************BINAY - END*****************************************




            // *******************************KUMAR - START***************************************
            // *******************************KUMAR - END*****************************************




            // *******************************PRAJWAL - START****************************************
            //1. WAIVER APPROVAL - START
            {
                name: 'waiver-submission-list',
                path: 'waiver-submission-list',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_apprWaiver_submissionList.vue'
                    ),
            },
            {
                name: 'review-waiver-submission',
                path: 'review-waiver-submission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_review_waiverSubmissionForm.vue'
                    ),
            },
            {
                name: 'viewDetails-waiver-submission',
                path: 'viewDetails-waiver-submission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_apprWaiver_viewDetails.vue'),
            },

            //WAIVER APPROVAL - END

            // MODULE 04
            // CPD Dashboard Setting
            {
                name: 'cpd-dashboard-main-setting',
                path: 'cpd-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_main_setting.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-list',
                path: 'cpd-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_dashboard_list.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-setting',
                path: 'cpd-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd-dashboard-setting.vue'
                    ),
            },
            {
                name: 'f-modulesRecordList',
                path: 'f-modulesRecordList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/cm04_fModules_recordList.vue'
                    ),
            },

            {
                name: 'appeal-selectionList',
                path: 'appeal-selectionList',
                component: () =>
                    import (
                        '../pages/continuing-development/cm04_appeal_selectionList.vue'
                    ),
            },

            {
                name: 'approval-selectionList',
                path: 'approval-selectionList',
                component: () =>
                    import (
                        '../pages/continuing-development/cm04_approval_selectionList.vue'
                    ),
            },

            //PRE-VETTING
            {
                name: 'approvalAppeal-preVetting-distributorList',
                path: 'approvalAppeal-preVetting-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/appealApproval/cm04_apprAppealPreVetting_distributorList.vue'
                    ),
            },

            {
                name: 'approvalAppeal-FpreVetting-distributorList',
                path: 'approvalAppeal-FpreVetting-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/appealApproval/cm04_apprAppealFPreVetting_distributorList.vue'
                    ),
            },

            {
                name: 'approvalAppeal-preVetting-programList',
                path: 'approvalAppeal-preVetting-programList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/appealApproval/cm04_apprAppealFPreVetting_programList.vue'
                    ),
            },
            {
              name: 'f-approvalAppeal-preVetting-programList',
              path: 'f-approvalAppeal-preVetting-programList',
              component: () =>
                import (
                  '../pages/continuing-development/distributor/preVetting/appealApproval/cm04_apprAppealPreVetting_programList'
                  ),
            },
            {
                name: 'exam-certificate',
                path: 'exam-certificate',
                component: () =>
                  import (
                    '../modules/consultant-management/pages/exam_certificate.vue'
                    ),
            },

            // Consultant points end


            // *******************************PRAJWAL - START****************************************
            // *******************************PRAJWAL - END****************************************


            // *******************************TAHMINA - START****************************************
            // Dashboard Main Setting
            {
                name: 'dashboard-main-setting',
                path: 'dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/dashboard-main-setting.vue'
                    ),
            },
            {
                name: 'distributor_main_setting',
                path: 'distributor_main_setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor_main_setting.vue'
                    ),
            },
            {
                name: 'distributor-dashboard-setting',
                path: 'distributor-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor-dashboard-setting.vue'
                    ),
            },
            {
                name: 'distributor-dashboard-list',
                path: 'distributor-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor_dashboard_list.vue'
                    ),
            },
            {
                name: 'distributor-external-dashboard-setting',
                path: 'distributor-external-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor-external-dashboard-setting.vue'
                    ),
            },
            // CPD Dashboard Setting
            {
                name: 'cpd-dashboard-main-setting',
                path: 'cpd-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_main_setting.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-list',
                path: 'cpd-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_dashboard_list.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-setting',
                path: 'cpd-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd-dashboard-setting.vue'
                    ),
            },
            // Consultant Alert Dashboard Setting
            {
                name: 'consultant-alert-main-setting',
                path: 'consultant-alert-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas_main_setting.vue'
                    ),
            },
            {
                name: 'cas-dashboard-list',
                path: 'cas-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas_dashboard_list.vue'
                    ),
            },
            {
                name: 'cas-dashboard-setting',
                path: 'cas-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas-dashboard-setting.vue'
                    ),
            },
            // FUND Management Dashboard Setting
            {
                name: 'fund-dashboard-main-setting',
                path: 'fund-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms_main_setting.vue'
                    ),
            },
            {
                name: 'fms-dashboard-list',
                path: 'fms-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms_dashboard_list.vue'
                    ),
            },
            {
                name: 'fms-dashboard-setting',
                path: 'fms-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms-dashboard-setting.vue'
                    ),
            },
            {
                name: 'fms-dashboard-id-setting',
                path: 'fms-dashboard-id-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms-dashboard-id-setting.vue'
                    ),
            },
            // Main Dashboard Setting
            {
                name: 'main-dashboard-main-setting',
                path: 'main-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/main/main-dashboard-setting.vue'
                    ),
            },
            {
                name: 'main-dashboard-setting-list',
                path: 'main-dashboard-setting-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/main/main-dashboard-setting-list.vue'
                    ),
            },
            // Admin Dashboard Setting

            {
                name: 'admin-dashboard-main-setting',
                path: 'admin-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_main_setting.vue'
                    ),
            },
            {
                name: 'admin-dashboard-list',
                path: 'admin-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_dashboard_list.vue'
                    ),
            },
            {
                name: 'admin-dashboard-setting',
                path: 'admin-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin-dashboard-setting.vue'
                    ),
            },
            {
                name: 'system-information',
                path: 'system-information',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_system_information.vue'
                    ),
            },
            // Consultant Dashboard Setting
            {
                name: 'consultant-dashboard-main-setting',
                path: 'consultant-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_main_setting.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-list',
                path: 'consultant-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_dashboard_list.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-setting',
                path: 'consultant-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant-dashboard-setting.vue'
                    ),
            },
            // Finance Dashboard Setting
            {
                name: 'finance-dashboard-main-setting',
                path: 'finance-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_main_setting.vue'
                    ),
            },
            {
                name: 'finance-dashboard-list',
                path: 'finance-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_dashboard_list.vue'
                    ),
            },
            {
                name: 'finance-dashboard-setting',
                path: 'finance-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance-dashboard-setting.vue'
                    ),
            },
            // Annual Fee Dashboard Setting
            {
                name: 'afms-dashboard-main-setting',
                path: 'afms-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_main_setting.vue'
                    ),
            },
            {
                name: 'afms-dashboard-list',
                path: 'afms-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_dashboard_list.vue'
                    ),
            },
            {
                name: 'afms-dashboard-setting',
                path: 'afms-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms-dashboard-setting.vue'
                    ),
            },
            // Report main Setting
            {
                name: 'report-main-setting',
                path: 'report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/report-main-setting.vue'
                    ),
            },
            // Admin Report
            {
                name: "admin-report-main-setting",
                path: "admin-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-report-main-setting.vue"
                    ),
            },
            {
                name: "admin-user-report",
                path: "admin-user-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-report.vue"
                    ),
            },
            {
                name: "admin-user-list-detail",
                path: "admin-user-list-detail/:userid/:companyid",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-detail-report.vue"
                    ),
            },
            {
                name: "admin-sms-log-report",
                path: "admin-sms-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-sms-log-report.vue"
                    ),
            },
            {
                name: "admin-summary-sms-log-report",
                path: "admin-summary-sms-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-summary-sms-log-report.vue"
                    ),
            },
            {
                name: "admin-screen-management-report",
                path: "admin-screen-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-screen-management-report.vue"
                    ),
            },
            {
                name: "admin-address-report",
                path: "admin-address-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-address-management-report.vue"
                    ),
            },
            {
                name: "admin-calendar-management-report",
                path: "admin-calendar-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-calendar-management-report.vue"
                    ),
            },
            {
                name: "admin-salutation-report",
                path: "admin-salutation-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-salutation-report.vue"
                    ),
            },
            {
                name: "admin-declaration-report",
                path: "admin-declaration-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-declaration-report.vue"
                    ),
            },
            {
                name: "admin-fee-management-report",
                path: "admin-fee-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fee-management-report.vue"
                    ),
            },
            {
                name: "admin-circular-management-report",
                path: "admin-circular-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-circular-management-report.vue"
                    ),
            },
            {
                name: "admin-announcement-management-report",
                path: "admin-announcement-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-announcement-management-report.vue"
                    ),
            },
            {
                name: "admin-user-matrix-report",
                path: "admin-user-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-matrix-report.vue"
                    ),
            },
            {
                name: "admin-distributor-matrix-report",
                path: "admin-distributor-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-distributor-matrix-report.vue"
                    ),
            },
            {
                name: "admin-fimm-matrix-report",
                path: "admin-fimm-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fimm-matrix-report.vue"
                    ),
            },
            {
                name: "admin-distributor-report-matrix",
                path: "admin-distributor-report-matrix",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-distributor-report-matrix.vue"
                    ),
            },
            {
                name: "admin-fimm-report-matrix",
                path: "admin-fimm-report-matrix",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fimm-report-matrix.vue"
                    ),
            },
            {
                name: "admin-user-summary-report",
                path: "admin-user-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-summary-report.vue"
                    ),
            },
            {
                name: "admin-event-log-report",
                path: "admin-event-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-event-log-report.vue"
                    ),
            },
            {
                name: "admin-templatelist-report",
                path: "admin-templatelist-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-templatelist-report.vue"
                    ),
            },
            {
                name: "admin-id-masking-report",
                path: "admin-id-masking-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-id-masking-report.vue"
                    ),
            },
            {
                name: "admin-approval-report",
                path: "admin-approval-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-approval-report.vue"
                    ),
            },
            {
                name: "admin-financecode-report",
                path: "admin-financecode-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-financecode-report.vue"
                    ),
            },
            // Distributor Management Report
            {
                name: "distributor-report-main-setting",
                path: "distributor-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-report-main-setting.vue"
                    ),
            },
            {
                name: "distributor-information-report",
                path: "distributor-information-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-information-report.vue"
                    ),
            },
            {
                name: "distributor-type-summary-report",
                path: "distributor-type-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-type-summary-report.vue"
                    ),
            },
            {
                name: "distributor-point-report",
                path: "distributor-point-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-point-report.vue"
                    ),
            },
            {
                name: "distributor-point-consultant-report",
                path: "distributor-point-consultant-report/:pointid",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-point-consultant-report.vue"
                    ),
            },
            {
                name: "distributor-consultant-report",
                path: "distributor-consultant-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-consultant-report.vue"
                    ),
            },
            {
                name: "distributor-prebankruptcy-report",
                path: "distributor-prebankruptcy-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-prebankruptcy-report.vue"
                    ),
            },
            {
                name: "distributor-sms-report",
                path: "distributor-sms-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-sms-report.vue"
                    ),
            },
            {
                name: "distributor-fund-lodgement-report",
                path: "distributor-fund-lodgement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-fund-lodgement-report.vue"
                    ),
            },
            // Fund Management Report
            {
                name: "fund-report-main-setting",
                path: "fund-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-report-main-setting.vue"
                    ),
            },
            {
                name: "fund-daily-nav-report",
                path: "fund-daily-nav-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-daily-nav-report.vue"
                    ),
            },
            {
                name: "fund-daily-nav-admin-report",
                path: "fund-daily-nav-admin-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-daily-nav-admin-report.vue"
                    ),
            },
            {
                name: "fund-audit-trail-report",
                path: "fund-audit-trail-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-audit-trail-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-report",
                path: "fund-historical-nav-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-detail-report",
                path: "fund-historical-nav-detail-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-detail-report.vue"
                    ),
            },
            {
                name: "fund-nav-movement-report",
                path: "fund-nav-movement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-nav-movement-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-user-report",
                path: "fund-historical-nav-user-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-user-report.vue"
                    ),
            },
            {
                name: "fund-data-new-report",
                path: "fund-data-new-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-new-report.vue"
                    ),
            },
            {
                name: "fund-data-closed-report",
                path: "fund-data-closed-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-closed-report.vue"
                    ),
            },
            {
                name: "fund-data-epf-report",
                path: "fund-data-epf-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-epf-report.vue"
                    ),
            },
            {
                name: "fund-data-sri-report",
                path: "fund-data-sri-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-sri-report.vue"
                    ),
            },
            {
                name: "fund-data-status-report",
                path: "fund-data-status-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-status-report.vue"
                    ),
            },
            {
                name: "fund-data-all-report",
                path: "fund-data-all-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-all-report.vue"
                    ),
            },
            {
                name: "fund-user-summary-report",
                path: "fund-user-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-user-summary-report.vue"
                    ),
            },
            {
                name: "fund-user-summary-fimm-report",
                path: "fund-user-summary-fimm-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-user-summary-fimm-report.vue"
                    ),
            },
            {
                name: "fund-event-log-report",
                path: "fund-event-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-event-log-report.vue"
                    ),
            },
            {
                name: "fund-utmc-contact-person-report",
                path: "fund-utmc-contact-person-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-utmc-contact-person-report.vue"
                    ),
            },
            {
                name: "fund-newspaper-contact-person-report",
                path: "fund-newspaper-contact-person-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-newspaper-contact-person-report.vue"
                    ),
            },
            //ANNUAL FEES REPORT
            {
                name: "annual-report-main-setting",
                path: "annual-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/annual-report-main-setting.vue"
                    ),
            },
            {
                name: "amsf-aum-report",
                path: "amsf-aum-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-report.vue"
                    ),
            },
            {
                name: "amsf-gross-sale-report",
                path: "amsf-gross-sale-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-gross-sale-report.vue"
                    ),
            },
            {
                name: "amsf-total-submission-report",
                path: "amsf-total-submission-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-submission-report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-report",
                path: "amsf-summary-utmc-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-report.vue"
                    ),
            },
            {
                name: "amsf-summary-iuta-report",
                path: "amsf-summary-iuta-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf_summary_iuta_report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-prp-report",
                path: "amsf-summary-utmc-prp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-prp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-prp-report",
                path: "amsf-summary-prp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-prp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-iuta-iprp-report",
                path: "amsf-summary-iuta-iprp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-iuta-iprp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-iprp-report",
                path: "amsf-summary-utmc-iprp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-iprp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-cuta-cpra-report",
                path: "amsf-summary-cuta-cpra-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-cuta-cpra-report.vue"
                    ),
            },
            {
                name: "amsf-aum-tgs-report",
                path: "amsf-aum-tgs-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-tgs-report.vue"
                    ),
            },
            {
                name: "amsf-membership-fees-report",
                path: "amsf-membership-fees-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-membership-fees-report.vue"
                    ),
            },
            {
                name: "amsf-fee-waiver-report",
                path: "amsf-fee-waiver-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-fee-waiver-report.vue"
                    ),
            },
            {
                name: "amsf-collection-summary-report",
                path: "amsf-collection-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-collection-summary-report.vue"
                    ),
            },
            {
                name: "amsf-debtors-outstanding-summary-report",
                path: "amsf-debtors-outstanding-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-debtors-outstanding-summary-report.vue"
                    ),
            },
            {
                name: "amsf-debtors-statement-report",
                path: "amsf-debtors-statement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-debtors-statement-report.vue"
                    ),
            },
            {
                name: "amsf-a1form-distributor-report",
                path: "amsf-a1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-a1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-a2form-distributor-report",
                path: "amsf-a2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-a2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-b1form-distributor-report",
                path: "amsf-b1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-b1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-b2form-distributor-report",
                path: "amsf-b2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-b2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-c1form-distributor-report",
                path: "amsf-c1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-c1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-c2form-distributor-report",
                path: "amsf-c2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-c2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-d1form-distributor-report",
                path: "amsf-d1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-d1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-d2form-distributor-report",
                path: "amsf-d2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-d2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-aum-tgs-distributor-report",
                path: "amsf-aum-tgs-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-tgs-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-total-aum-report",
                path: "amsf-total-aum-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-aum-report.vue"
                    ),
            },
            {
                name: "amsf-total-sales-report",
                path: "amsf-total-sales-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-sales-report.vue"
                    ),
            },
            // Consultant Management Report
            {
                name: "consultant-report-main-setting",
                path: "consultant-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-report-main-setting.vue"
                    ),
            },
            {
                name: "consultant-details-report",
                path: "consultant-details-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-details-report.vue"
                    ),
            },
            {
                name: "consultant-registration-report",
                path: "consultant-registration-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-registration-report.vue"
                    ),
            },
            {
                name: "consultant-registration-summary-report",
                path: "consultant-registration-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-registration-summary-report.vue"
                    ),
            },
            {
                name: "consultant-termination-report",
                path: "consultant-termination-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-termination-report.vue"
                    ),
            },
            {
                name: "consultant-termination-summary-report",
                path: "consultant-termination-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-termination-summary-report.vue"
                    ),
            },
            {
                name: "consultant-active-report",
                path: "consultant-active-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-active-report.vue"
                    ),
            },
            {
                name: "consultant-active-summary-report",
                path: "consultant-active-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-active-summary-report.vue"
                    ),
            },
            {
                name: "consultant-bankruptcy-report",
                path: "consultant-bankruptcy-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-bankruptcy-report.vue"
                    ),
            },
            // Consultant Alert Report -- Tahmina
            {
                name: 'cas-report-main-setting',
                path: 'cas-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-report-main-setting.vue'
                    ),
            },
            {
                name: 'cas-utc-tagging-list-report',
                path: 'cas-utc-tagging-list-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-utc-tagging-list-report.vue'
                    ),
            },
            {
                name: 'cas-enquiry-report',
                path: 'cas-enquiry-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-enquiry-report.vue'
                    ),
            },
            {
                name: 'total-complain-fimm',
                path: 'total-complain-fimm',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-total-complain-fimm.vue'
                    ),
            },
            {
                name: 'sanctioned-fimm-distributor',
                path: 'sanctioned-fimm-distributor',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-sanctioned-fimm-distributor.vue'
                    ),
            },
            // CPD Report
            {
                name: 'cpd-report-main-setting',
                path: 'cpd-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-report-main-setting.vue'
                    ),
            },
            {
                name: 'cpd-program-secretariat-report',
                path: 'cpd-program-secretariat-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-secretariat.vue'
                    ),
            },
            {
                name: 'cpd-program-repeated-report',
                path: 'cpd-program-repeated-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-repeated.vue'
                    ),
            },
            {
                name: 'cpd-evaluation-report',
                path: 'cpd-evaluation-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-evaluation-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report',
                path: 'cpd-fpam-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report-detail',
                path: 'cpd-fpam-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-academic-report',
                path: 'cpd-academic-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report.vue'
                    ),
            },
            {
                name: 'cpd-academic-report-detail',
                path: 'cpd-academic-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-reading-report',
                path: 'cpd-reading-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report.vue'
                    ),
            },
            {
                name: 'cpd-reading-report-detail',
                path: 'cpd-reading-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report',
                path: 'cpd-teaching-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report-detail',
                path: 'cpd-teaching-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report',
                path: 'cpd-waiver-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report-detail',
                path: 'cpd-waiver-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-writing-report',
                path: 'cpd-writing-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report.vue'
                    ),
            },
            {
                name: 'cpd-writing-report-detail',
                path: 'cpd-writing-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report',
                path: 'cpd-record-consultant-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report-detail',
                path: 'cpd-record-consultant-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-report',
                path: 'cpd-record-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report.vue'
                    ),
            },
            {
                name: 'cpd-record-report-detail',
                path: 'cpd-record-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report-detail.vue'
                    ),
            },
            // FINANCE Report
            {
                name: 'finance-report-main-setting',
                path: 'finance-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-report-main-setting.vue'
                    ),
            },
            {
                name: 'finance-utc-report',
                path: 'finance-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-report.vue'
                    ),
            },
            {
                name: 'finance-prc-report',
                path: 'finance-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-summary-report',
                path: 'finance-utc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-summary-report',
                path: 'finance-prc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-ut-report',
                path: 'finance-exam-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-prs-report',
                path: 'finance-exam-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-ut-report',
                path: 'finance-exemption-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-prs-report',
                path: 'finance-exemption-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-approved-utc-report',
                path: 'finance-approved-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-utc-report.vue'
                    ),
            },
            {
                name: 'finance-approved-prc-report',
                path: 'finance-approved-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-exemption-summary-report',
                path: 'finance-utc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-exemption-summary-report',
                path: 'finance-prc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-ut-report',
                path: 'finance-candidate-exam-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-ut-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-prs-report',
                path: 'finance-candidate-exam-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-ut-report',
                path: 'finance-prepayment-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-ut-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-prs-report',
                path: 'finance-prepayment-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-refund-report',
                path: 'finance-prepayment-refund-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-refund-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-ut-report',
                path: 'finance-cute-result-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-ut-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-prs-report',
                path: 'finance-cute-result-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-prs-report.vue'
                    ),
            },
            {
                name: 'finance-amsf-collection-report',
                path: 'finance-amsf-collection-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-amsf-collection-report.vue'
                    ),
            },
            // Admin Dashboard Link
            {
                name: 'admin-dashboard',
                path: 'admin-dashboard',
                component: () =>
                    import ('../components/dashboard_admin/Dashboard.vue'),
            },
            // Consultant Dashboard Link
            {
                name: 'consultant-dashboard',
                path: '/consultant/dashboard',
                component: () =>
                    import ('../components/dashboard_consultant/dashboard.vue'),
            },
            // consultant alert Dashboard Link
            {
                name: 'cas-dashboard',
                path: '/cas/dashboard',
                component: () =>
                    import ('../components/dashboard_cas/dashboard.vue'),
            },
            // Finance Dashboard Link
            {
                name: 'finance-dashboard',
                path: '/finance/dashboard',
                component: () =>
                    import ('../components/dashboard_finance/dashboard.vue'),
            },
            // Annual fee Dashboard Link
            {
                name: 'annualfee-dashboard',
                path: '/annualfee/dashboard',
                component: () =>
                    import ('../components/dashboard_annualfee/dashboard.vue'),
            },
            {
                name: 'audit-trail',
                path: 'audit-trail',
                component: () =>
                    import (
                        '../pages/admin-configuration/system-setting/audit_trail.vue'
                    ),
            },


            // *******************************TAHMINA - END****************************************
            {
                name: 'approvalAppeal-preVetting-reviewDetails',
                path: 'approvalAppeal-preVetting-reviewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/appealApproval/cm04_apprAppealPreVetting_reviewDetails.vue'
                    ),
            },

            {
                name: 'approvalPreVettingProgramList',
                path: 'approvalPreVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_programList.vue'
                    ),
            },
            {
                name: 'approvalPreVettingViewDetails',
                path: 'approvalPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_viewDetails.vue'
                    ),
            },


            {
                name: 'approval-preVetting-allProgram',
                path: 'approval-preVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/approval/cm04_apprPreVetting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-preVetting-viewSubmission',
                path: 'approval-preVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/approval/cm04_apprPreVetting_viewSubmission.vue'
                    ),
            },

            {
                name: 'approval-preVetting-revokeProgram',
                path: 'approval-preVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/approval/cm04_apprPreVetting_revokeProgram.vue'
                    ),
            },

            // Fimm Training - PreVetting
            {
                name: 'f-preVettingProgramList',
                path: 'f-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_programList.vue'
                    ),
            },
            {
                name: 'f-preVettingNewSubmission',
                path: 'f-preVettingNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_newSubmission.vue'
                    ),
            },
            {
                name: 'f-preVettingRepeatSubmission',
                path: 'f-preVettingRepeatSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_repeatSubmission.vue'
                    ),
            },
            {
                name: 'f-preVettingViewProgramList',
                path: 'f-preVettingViewProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_viewProgramList.vue'
                    ),
            },
            {
                name: 'FpreVettingAppealProgram',
                path: 'f-preVettingAppealProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_appealProgram.vue'
                    ),
            },

            {
                name: 'f-preVettingViewProgramDetails',
                path: 'f-preVettingViewProgramDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_viewProgramDetails.vue'
                    ),
            },

            {
                name: 'f-preVettingAmendProgram',
                path: 'f-preVettingAmendProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPrevetting_amendProgram.vue'
                    ),
            },


            {
                name: 'f-preVettingProgramList',
                path: 'f-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approval-FpreVetting-view-participant',
                path: 'approval-FpreVetting-view-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewParticipant.vue'
                    ),
            },
            {
                name: 'apprFPreVettingViewDetails',
                path: 'apprFPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewDetails.vue'
                    ),
            },
            {
                name: 'f-preVettingEditProgram',
                path: 'f-preVettingEditProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_editProgram.vue'
                    ),
            },
            {
                name: 'f-preVettingViewParticipant',
                path: 'f-preVettingViewParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_viewParticipant.vue'
                    ),
            },
            {
                name: 'f-preVettingUploadParticipant',
                path: 'f-preVettingUploadParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPrevetting_uploadParticipant.vue'
                    ),
            },

            {
                name: 'approvalPreVettingDistributorList',
                path: 'approvalPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_distributorList.vue'
                    ),
            },
            {
                name: 'apprFPreVettingDistributorList',
                path: 'apprFPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_distributorList'
                    ),
            },

            {
                name: 'approvalFPreVettingProgramList',
                path: 'approvalFPreVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approvalFPreVettingViewDetails',
                path: 'approvalFPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprPreVetting_viewDetails.vue'
                    ),
            },

            {
                name: 'approval-FpreVetting-allProgram',
                path: 'approval-FpreVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-FpreVetting-viewSubmission',
                path: 'approval-FpreVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-FpreVetting-revokeProgram',
                path: 'approval-FpreVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_revokeProgram.vue'
                    ),
            },
            {
                name: 'f-preVettingProgramList',
                path: 'f-preVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/cm04_fPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approvalPreVettingDistributorList',
                path: 'approvalPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_distributorList.vue'
                    ),
            },
            {
                name: 'apprFPreVettingDistributorList',
                path: 'apprFPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_distributorList'
                    ),
            },

            {
                name: 'd-appealFinancialList',
                path: 'd-appealFinancialList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_distributorList.vue'
                    ),
            },

            {
                name: 'approvalAppeal-TpreVetting-programList',
                path: 'approvalAppeal-TpreVetting-programList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/appealApproval/cm04_apprAppealPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approvalAppeal-TpreVetting-distributorList',
                path: 'approvalAppeal-TpreVetting-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/appealApproval/cm04_apprAppealTPreVetting_distributorList.vue'
                    ),
            },
            // FPrevetting appeal Review
            {
                name: 'approvalAppeal-FpreVetting-submissionList',
                path: 'approvalAppeal-FpreVetting-submissionList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/appealApproval/cm04_apprAppealPreVetting_submissionList.vue'
                    ),
            },
            {
                name: 'approvalAppeal-FpreVetting-reviewDetails',
                path: 'approvalAppeal-FpreVetting-reviewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/appealApproval/cm04_apprAppealPreVetting_reviewDetails.vue'
                    ),
            },

            {
                name: 'approvalAppeal-TpreVetting-reviewDetails',
                path: 'approvalAppeal-TpreVetting-reviewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/appealApproval/cm04_apprAppealPreVetting_reviewDetails.vue'
                    ),
            },

            //Prevetting- TRP
            {
                name: 'apprTPreVettingDistributorList',
                path: 'apprTPreVettingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_distributorList.vue'
                    ),
            },

            {
                name: 'approvalTPreVettingProgramList',
                path: 'approvalTPreVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_programList.vue'
                    ),
            },

            {
                name: 'approval-TpreVetting-allProgram',
                path: 'approval-TpreVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_allProgramList.vue'
                    ),
            },

            {
                name: 'apprTPreVettingViewProgramList',
                path: 'apprTPreVettingViewProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_viewProgramList.vue'
                    ),
            },
            {
                name: 'apprTPreVettingViewDetails',
                path: 'apprTPreVettingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_viewDetails.vue'
                    ),
            },

            {
                name: 'approval-TpreVetting-viewSubmission',
                path: 'approval-TpreVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-TpreVetting-view-participant',
                path: 'approval-TpreVetting-view-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_viewParticipant.vue'
                    ),
            },

            {
                name: 'approval-TpreVetting-revokeProgram',
                path: 'approval-TpreVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/trp/preVetting/approval/cm04_apprTPreVetting_revokeProgram.vue'
                    ),
            },

            {
                name: 'apprFPreVettingViewProgramList',
                path: 'apprFPreVettingViewProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/preVetting/approval/cm04_apprFPreVetting_viewProgramList.vue'
                    ),

            },



            // POST-VETTING
            {
                name: 'f-postVettingProgramList',
                path: 'f-postVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/postVetting/cm04_fPostVetting_programList.vue'
                    ),
            },
            {
                name: 'f-postVettingNewSubmission',
                path: 'f-postVettingNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/postVetting/cm04_fPostVetting_newSubmission.vue'
                    ),
            },


            {
                name: 'approval-postVetting-distributorList',
                path: 'approval-postVetting-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_distributorList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-programList',
                path: 'approval-postVetting-programList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_programList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-allProgram',
                path: 'approval-postVetting-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-postVetting-reviewDetails',
                path: 'approval-postVetting-reviewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_reviewDetails.vue'
                    ),
            },
            {
                name: 'approval-view-participant',
                path: 'approval-view-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_viewParticipant.vue'
                    ),
            },

            {
                name: 'approval-postVetting-viewSubmission',
                path: 'approval-postVetting-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-postVetting-revokeProgram',
                path: 'approval-postVetting-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/postVetting/approval/cm04_apprPostVetting_revokeProgram.vue'
                    ),
            },

            {
                name: 'f-postVettingProgramList',
                path: 'f-postVettingProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/postVetting/cm04_fPostVetting_programList.vue'
                    ),
            },

            // WRITING

            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'f-writingViewDetails',
                path: 'f-writingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_dWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'approvalWritingDistributorList',
                path: 'approvalWritingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_distributorList.vue'
                    ),
            },
            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'approvalWritingViewDetails',
                path: 'approvalWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'f-approvalViewDetailParticipant',
                path: 'f-approvalViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetailsParticipant.vue'
                    ),
            },
            {
                name: 'approvalWritingModuleList',
                path: 'approvalWritingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_moduleList.vue'
                    ),
            },
            {
                name: 'f-approvalWritingViewDetailParticipant',
                path: 'f-approvalWritingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },

            {
                name: 'd-appealWritingList',
                path: 'd-appealWritingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealWritingListProgramList',
                path: 'd-appealWritingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealWritingViewDetails',
                path: 'd-appealWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/writing/cm04_appealWriting_d_viewDetails.vue'
                    ),
            },

            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'f-writingViewDetails',
                path: 'f-writingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_dWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'approvalWritingDistributorList',
                path: 'approvalWritingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_distributorList.vue'
                    ),
            },
            {
                name: 'f-writingModuleList',
                path: 'f-writingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_fWriting_list.vue'
                    ),
            },
            {
                name: 'approvalWritingViewDetails',
                path: 'approvalWritingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetails.vue'
                    ),
            },
            {
                name: 'f-approvalViewDetailParticipant',
                path: 'f-approvalViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewDetailsParticipant.vue'
                    ),
            },
            {
                name: 'approvalWritingModuleList',
                path: 'approvalWritingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_moduleList.vue'
                    ),
            },
            {
                name: 'f-approvalWritingViewDetailParticipant',
                path: 'f-approvalWritingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },

            {
                name: 'approval-writing-allProgram',
                path: 'approval-writing-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-writing-viewSubmission',
                path: 'approval-writing-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-writing-revokeProgram',
                path: 'approval-writing-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_revokeProgram.vue'
                    ),
            },
            {
                name: 'approval-writingView-participant',
                path: 'approval-writingView-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/writing/cm04_apprWriting_viewParticipant.vue'
                    ),
            },

            // READING
            {
                name: 'd-appealReadingListProgramList',
                path: 'd-appealReadingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealReadingViewDetails',
                path: 'd-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealReadingList',
                path: 'd-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_distributorList.vue'
                    ),
            },

            {
                name: 'f-appealReadingList',
                path: 'f-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_fimmList.vue'
                    ),
            },
            {
                name: 'f-appealReadingViewDetails',
                path: 'f-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_f_viewDetails.vue'
                    ),
            },


            {
                name: 'approval-reading-allProgram',
                path: 'approval-reading-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-reading-viewSubmission',
                path: 'approval-reading-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_viewSubmission.vue'
                    ),
            },
            {
                name: 'approvalReadingDistributorList',
                path: 'approvalReadingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_distributorList.vue'
                    ),
            },


            // FTRP-reading appeal
            {
                name: 'f-appealReading-distributorList',
                path: 'f-appealReading-distributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/appeal/cm04_appealFReading_distributorList.vue'
                    ),
            },

            {
                name: 'f-appealReadingListProgramList',
                path: 'f-appealReadingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/appeal/cm04_appealfReadingProgramList.vue'
                    ),
            },

            {
                name: 'appealFReadingViewDetails',
                path: 'appealFReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/appeal/cm04_appealFReading_viewDetails.vue'
                    ),
            },


            {
                name: 'd-appealReadingList',
                path: 'd-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealReadingListProgramList',
                path: 'd-appealReadingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealReadingViewDetails',
                path: 'd-appealReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_d_viewDetails.vue'
                    ),
            },

            {
                name: 'f-appealReadingList',
                path: 'f-appealReadingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/reading/cm04_appealReading_fimmList.vue'
                    ),
            },
            // FTRP -reading
            {
                name: 'approvalFReadingDistributorList',
                path: 'approvalFReadingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_distributorList.vue'
                    ),
            },
            {
                name: 'approvalFReadingModuleList',
                path: 'approvalFReadingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_moduleList.vue'
                    ),
            },

            {
                name: 'approval-f-reading-allProgram',
                path: 'approval-f-reading-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-f-reading-revokeProgram',
                path: 'approval-f-reading-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_revokeProgram.vue'
                    ),
            },
            {
                name: 'f-approvalReadingViewDetails',
                path: 'f-approvalReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_viewDetails.vue'
                    ),
            },
            {
                name: 'approval-reading-viewSubmission',
                path: 'approval-reading-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_viewSubmission.vue'
                    ),
            },
            {
                name: 'approval-reading-revokeProgram',
                path: 'approval-reading-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_revokeProgram.vue'
                    ),
            },
            {
                name: 'approvalReadingModuleList',
                path: 'approvalReadingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_moduleList.vue'
                    ),
            },
            {
                name: 'approval-readingView-participant',
                path: 'approval-readingView-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/ftrp-approval/cm04_apprFReading_viewParticipant.vue'
                    ),
            },
            {
                name: 'f-readingAppealProgram',
                path: 'f-readingAppealProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_fReading_appealProgram.vue'
                    ),
            },
            {
                name: 'f-readingModuleList',
                path: 'f-readingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_fReading_list.vue'
                    ),
            },

            {
                name: 'f-readingNewSubmission',
                path: 'f-readingNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_fReading_newSubmission.vue'
                    ),
            },

            {
                name: 'f-readingEditSubmission',
                path: 'f-readingEditSubmission/:id',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_fReading_editSubmission.vue'
                    ),
            },
            {
                name: 'f-apprReadingViewDetailParticipant',
                path: 'f-apprReadingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/components/viewParticipant.vue'
                    ),
            },

            {
                name: 'approvalReadingViewDetails',
                path: 'approvalReadingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_apprReading_viewDetails.vue'
                    ),
            },
            {
                name: 'd-readingViewDetails',
                path: 'd-readingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/reading/cm04_dReading_viewDetails.vue'
                    ),
            },
            {
                name: 'd-apprReadingViewDetailParticipant',
                path: 'd-apprReadingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },


            // TEACHING
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingListProgramList',
                path: 'd-appealTeachingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingViewDetails',
                path: 'd-appealTeachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_d_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },

            {
                name: 'd-appealTeachingList',
                path: 'd-appealTeachingList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingListProgramList',
                path: 'd-appealTeachingListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealTeachingViewDetails',
                path: 'd-appealTeachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/teaching/cm04_appealTeaching_d_viewDetails.vue'
                    ),
            },


            {
                name: 'approval-teaching-allProgram',
                path: 'approval-teaching-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_allProgramList.vue'
                    ),
            },
            {
                name: 'approval-teaching-revokeProgram',
                path: 'approval-teaching-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_revokeProgram.vue'
                    ),
            },
            {
                name: 'approval-teachingView-participant',
                path: 'approval-teachingView-participant',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_viewParticipant.vue'
                    ),
            },
            {
                name: 'approval-teaching-viewSubmission',
                path: 'approval-teaching-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_viewSubmission.vue'
                    ),
            },

            {
                name: 'approvalTeachingDistributorList',
                path: 'approvalTeachingDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_distributorList.vue'
                    ),
            },
            {
                name: 'approvalTeachingModuleList',
                path: 'approvalTeachingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_moduleList.vue'
                    ),
            },
            {
                name: 'f-teachingModuleList',
                path: 'f-teachingModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_fTeaching_list.vue'
                    ),
            },
            {
                name: 'approvalTeachingViewDetails',
                path: 'approvalTeachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_apprTeaching_viewDetails.vue'
                    ),
            },
            {
                name: 'f-teachingViewDetails',
                path: 'f-teachingViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/teaching/cm04_fTeaching_viewDetails.vue'
                    ),
            },
            {
                name: 'f-apprTeachingViewDetailParticipant',
                path: 'f-apprTeachingViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },




            // ACADEMIC
            {
                name: 'approval-academic-viewSubmission',
                path: 'approval-academic-viewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_viewSubmission.vue'
                    ),
            },
            {
              name: 'approval-academicView-participant',
              path: 'approval-academicView-participant',
              component: () =>
                import (
                  '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_viewParticipant.vue'
                  ),
            },
            {
                name: 'approval-academic-allProgram',
                path: 'approval-academic-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_allProgramList.vue'
                    ),
            },

            {
                name: 'approval-academic-revokeProgram',
                path: 'approval-academic-revokeProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_revokeProgram.vue'
                    ),
            },
            {
                name: 'approvalAcademicDistributorList',
                path: 'approvalAcademicDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_distributorList.vue'
                    ),
            },
            {
                name: 'approvalAcademicModuleList',
                path: 'approvalAcademicModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_moduleList.vue'
                    ),
            },
            {
                name: 'f-academicModuleList',
                path: 'f-academicModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_fAcademic_list.vue'
                    ),
            },
            {
                name: 'approvalAcademicViewDetails',
                path: 'approvalAcademicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_apprAcademic_viewDetails.vue'
                    ),
            },
            {
                name: 'f-academicViewDetails',
                path: 'f-academicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/academic/cm04_fAcademic_viewDetails.vue'
                    ),
            },
            {
                name: 'f-apprAcademicViewDetailParticipant',
                path: 'f-apprAcademicViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },

            {
                name: 'd-appealAcademicList',
                path: 'd-appealAcademicList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicListProgramList',
                path: 'd-appealAcademicListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicViewDetails',
                path: 'd-appealAcademicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_d_viewDetails.vue'
                    ),
            },

            {
                name: 'd-appealAcademicList',
                path: 'd-appealAcademicList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicListProgramList',
                path: 'd-appealAcademicListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealAcademicViewDetails',
                path: 'd-appealAcademicViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/academic/cm04_appealAcademic_d_viewDetails.vue'
                    ),
            },

            // FPAM

            {
                name: 'd-appealFinancialListProgramList',
                path: 'd-appealFinancialListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealFinancialViewDetails',
                path: 'd-appealFinancialViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/appeal/certified-financial/cm04_appealCertified_viewDetails.vue'
                    ),
            },
            {
                name: 'd-appealFinancialList',
                path: 'd-appealFinancialList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_distributorList.vue'
                    ),
            },

            {
                name: 'd-appealFinancialListProgramList',
                path: 'd-appealFinancialListProgramList',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_program_distributorList.vue'
                    ),
            },
            {
                name: 'd-appealFinancialViewDetails',
                path: 'd-appealFinancialViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/fpam/cm04_appealFinancial_d_viewDetails.vue'
                    ),
            },

            {
                name: 'approvalFPDistributorList',
                path: 'approvalFPDistributorList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/cm04_apprFP_distributorList.vue'
                    ),
            },
            {
                name: 'f-fpamModuleList',
                path: 'f-fpamModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/cm04_fFpam_list.vue'
                    ),
            },

            {
                name: 'approval-FP-allProgram',
                path: 'approval-FP-allProgram',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/cm04_apprFP_allProgramList.vue'
                    ),
            },

            {
                name: 'f-fpamCertifiedModuleList',
                path: 'f-fpamCertifiedModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/certified-financial/cm04_fCertified_module_list.vue'
                    ),
            },
            {
                name: 'f-fpamCertifiedModuleNewSubmission',
                path: 'f-fpamCertifiedModuleNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/certified-financial/cm04_fCertified_module_newSubmission.vue'
                    ),
            },
            {
                name: 'f-fpamIslamicModuleList',
                path: 'f-fpamIslamicModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/islamic-financial/cm04_fIslamic_module_list.vue'
                    ),
            },
            {
                name: 'f-fpamIslamicModuleNewSubmission',
                path: 'f-fpamIslamicModuleNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/islamic-financial/cm04_fIslamic_module_newSubmission.vue'
                    ),
            },
            {
                name: 'f-fpamRegisteredModuleList',
                path: 'f-fpamRegisteredModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/registered-financial/cm04_fRegistered_module_list.vue'
                    ),
            },
            {
                name: 'f-fpamRegisteredModuleNewSubmission',
                path: 'f-fpamRegisteredModuleNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/registered-financial/cm04_fRegistered_module_newSubmission.vue'
                    ),
            },
            {
                name: 'f-fpamShariahModuleList',
                path: 'f-fpamShariahModuleList',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/shariah-registered/cm04_fShariah_module_list.vue'
                    ),
            },
            {
                name: 'f-fpamShariahModuleNewSubmission',
                path: 'f-fpamShariahModuleNewSubmission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/shariah-registered/cm04_fShariah_module_newSubmission.vue'
                    ),
            },
            {
                name: 'approvalFPViewDetails',
                path: 'approvalFPViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/cm04_apprFpViewDetails.vue'
                    ),
            },
            {
                name: 'f-FPViewDetails',
                path: 'f-FPViewDetails',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/modules/fpam/cm04_fpViewDetails.vue'
                    ),
            },
            {
                name: 'f-apprFpViewDetailParticipant',
                path: 'f-apprFpViewDetailParticipant',
                component: () =>
                    import (
                        '../pages/continuing-development/distributor/modules/components/viewParticipant.vue'
                    ),
            },
          {
            name: 'f-viewParticipant',
            path: 'f-viewParticipant',
            component: () =>
              import (
                '../pages/continuing-development/fimm/modules/fpam/cm04_fPviewParticipant'
                ),
          },
            // FIMM - waiver approval
            {
                name: 'waiver-submission-list',
                path: 'waiver-submission-list',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_apprWaiver_submissionList.vue'
                    ),
            },
            {
                name: 'review-waiver-submission',
                path: 'review-waiver-submission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_review_waiverSubmissionForm.vue'
                    ),
            },
            {
                name: 'viewDetails-waiver-submission',
                path: 'viewDetails-waiver-submission',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/waiver/cm04_apprWaiver_viewDetails.vue'
                    ),
            },
            //Consultant point for FIMM starts
            {
                name: "f-moduleSelectionList-consultant-point",
                path: "f-moduleSelectionList-consultant-point",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/consultant-points/f_moduleSelectionList"
                    ),
            },

            {
                name: "f-consultant-points",
                path: "f-consultant-points",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/consultant-points/consultant_point_list"
                    ),
            },

            {
                name: "distributor-lists",
                path: "distributor-lists",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/consultant-points/c_distributor_list.vue"
                    ),
            },

            //Consultant points end

            // Consultant point starts

            {
                name: 'consultant-points',
                path: 'consultant-points',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/consultant-points/consultant_point_list'
                    ),
            },

            {
                name: 'consultant-cpd-points-details',
                path: 'consultant-cpd-points-details',
                component: () =>
                    import (
                        '../pages/continuing-development/fimm/consultant-points/consultant_point_details.vue'
                    ),
            },

            // Consultant points end


            // *******************************PRAJWAL - START****************************************
            // *******************************PRAJWAL - END****************************************


            // *******************************TAHMINA - START****************************************
            // Dashboard Main Setting
            {
                name: 'dashboard-main-setting',
                path: 'dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/dashboard-main-setting.vue'
                    ),
            },
            {
                name: 'distributor_main_setting',
                path: 'distributor_main_setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor_main_setting.vue'
                    ),
            },
            {
                name: 'distributor-dashboard-setting',
                path: 'distributor-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor-dashboard-setting.vue'
                    ),
            },
            {
                name: 'distributor-dashboard-list',
                path: 'distributor-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor_dashboard_list.vue'
                    ),
            },
            {
                name: 'distributor-external-dashboard-setting',
                path: 'distributor-external-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/distributor/distributor-external-dashboard-setting.vue'
                    ),
            },
            // CPD Dashboard Setting
            {
                name: 'cpd-dashboard-main-setting',
                path: 'cpd-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_main_setting.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-list',
                path: 'cpd-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd_dashboard_list.vue'
                    ),
            },
            {
                name: 'cpd-dashboard-setting',
                path: 'cpd-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cpd/cpd-dashboard-setting.vue'
                    ),
            },
            // Consultant Alert Dashboard Setting
            {
                name: 'consultant-alert-main-setting',
                path: 'consultant-alert-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas_main_setting.vue'
                    ),
            },
            {
                name: 'cas-dashboard-list',
                path: 'cas-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas_dashboard_list.vue'
                    ),
            },
            {
                name: 'cas-dashboard-setting',
                path: 'cas-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/cas/cas-dashboard-setting.vue'
                    ),
            },
            // FUND Management Dashboard Setting
            {
                name: 'fund-dashboard-main-setting',
                path: 'fund-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms_main_setting.vue'
                    ),
            },
            {
                name: 'fms-dashboard-list',
                path: 'fms-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms_dashboard_list.vue'
                    ),
            },
            {
                name: 'fms-dashboard-setting',
                path: 'fms-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms-dashboard-setting.vue'
                    ),
            },
            {
                name: 'fms-dashboard-id-setting',
                path: 'fms-dashboard-id-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/fms/fms-dashboard-id-setting.vue'
                    ),
            },
            // Main Dashboard Setting
            {
                name: 'main-dashboard-main-setting',
                path: 'main-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/main/main-dashboard-setting.vue'
                    ),
            },
            {
                name: 'main-dashboard-setting-list',
                path: 'main-dashboard-setting-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/main/main-dashboard-setting-list.vue'
                    ),
            },
            // Admin Dashboard Setting

            {
                name: 'admin-dashboard-main-setting',
                path: 'admin-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_main_setting.vue'
                    ),
            },
            {
                name: 'admin-dashboard-list',
                path: 'admin-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_dashboard_list.vue'
                    ),
            },
            {
                name: 'admin-dashboard-setting',
                path: 'admin-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin-dashboard-setting.vue'
                    ),
            },
            {
                name: 'system-information',
                path: 'system-information',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/admin/admin_system_information.vue'
                    ),
            },
            // Consultant Dashboard Setting
            {
                name: 'consultant-dashboard-main-setting',
                path: 'consultant-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_main_setting.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-list',
                path: 'consultant-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant_dashboard_list.vue'
                    ),
            },
            {
                name: 'consultant-dashboard-setting',
                path: 'consultant-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/consultant/consultant-dashboard-setting.vue'
                    ),
            },
            // Finance Dashboard Setting
            {
                name: 'finance-dashboard-main-setting',
                path: 'finance-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_main_setting.vue'
                    ),
            },
            {
                name: 'finance-dashboard-list',
                path: 'finance-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance_dashboard_list.vue'
                    ),
            },
            {
                name: 'finance-dashboard-setting',
                path: 'finance-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/finance/finance-dashboard-setting.vue'
                    ),
            },
            // Annual Fee Dashboard Setting
            {
                name: 'afms-dashboard-main-setting',
                path: 'afms-dashboard-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_main_setting.vue'
                    ),
            },
            {
                name: 'afms-dashboard-list',
                path: 'afms-dashboard-list',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms_dashboard_list.vue'
                    ),
            },
            {
                name: 'afms-dashboard-setting',
                path: 'afms-dashboard-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/dashboard-setting/afms/afms-dashboard-setting.vue'
                    ),
            },
            // Report main Setting
            {
                name: 'report-main-setting',
                path: 'report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/report-main-setting.vue'
                    ),
            },
            // Admin Report
            {
                name: "admin-report-main-setting",
                path: "admin-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-report-main-setting.vue"
                    ),
            },
            {
                name: "admin-user-report",
                path: "admin-user-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-report.vue"
                    ),
            },
            {
                name: "admin-user-list-detail",
                path: "admin-user-list-detail/:userid/:companyid",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-detail-report.vue"
                    ),
            },
            {
                name: "admin-sms-log-report",
                path: "admin-sms-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-sms-log-report.vue"
                    ),
            },
            {
                name: "admin-summary-sms-log-report",
                path: "admin-summary-sms-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-summary-sms-log-report.vue"
                    ),
            },
            {
                name: "admin-screen-management-report",
                path: "admin-screen-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-screen-management-report.vue"
                    ),
            },
            {
                name: "admin-address-report",
                path: "admin-address-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-address-management-report.vue"
                    ),
            },
            {
                name: "admin-calendar-management-report",
                path: "admin-calendar-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-calendar-management-report.vue"
                    ),
            },
            {
                name: "admin-salutation-report",
                path: "admin-salutation-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-salutation-report.vue"
                    ),
            },
            {
                name: "admin-declaration-report",
                path: "admin-declaration-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-declaration-report.vue"
                    ),
            },
            {
                name: "admin-fee-management-report",
                path: "admin-fee-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fee-management-report.vue"
                    ),
            },
            {
                name: "admin-circular-management-report",
                path: "admin-circular-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-circular-management-report.vue"
                    ),
            },
            {
                name: "admin-announcement-management-report",
                path: "admin-announcement-management-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-announcement-management-report.vue"
                    ),
            },
            {
                name: "admin-user-matrix-report",
                path: "admin-user-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-matrix-report.vue"
                    ),
            },
            {
                name: "admin-distributor-matrix-report",
                path: "admin-distributor-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-distributor-matrix-report.vue"
                    ),
            },
            {
                name: "admin-fimm-matrix-report",
                path: "admin-fimm-matrix-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fimm-matrix-report.vue"
                    ),
            },
            {
                name: "admin-distributor-report-matrix",
                path: "admin-distributor-report-matrix",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-distributor-report-matrix.vue"
                    ),
            },
            {
                name: "admin-fimm-report-matrix",
                path: "admin-fimm-report-matrix",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-fimm-report-matrix.vue"
                    ),
            },
            {
                name: "admin-user-summary-report",
                path: "admin-user-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-user-summary-report.vue"
                    ),
            },
            {
                name: "admin-event-log-report",
                path: "admin-event-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-event-log-report.vue"
                    ),
            },
            {
                name: "admin-templatelist-report",
                path: "admin-templatelist-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-templatelist-report.vue"
                    ),
            },
            {
                name: "admin-id-masking-report",
                path: "admin-id-masking-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-id-masking-report.vue"
                    ),
            },
            {
                name: "admin-approval-report",
                path: "admin-approval-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-approval-report.vue"
                    ),
            },
            {
                name: "admin-financecode-report",
                path: "admin-financecode-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ADMIN/admin-financecode-report.vue"
                    ),
            },
            // Distributor Management Report
            {
                name: "distributor-report-main-setting",
                path: "distributor-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-report-main-setting.vue"
                    ),
            },
            {
                name: "distributor-information-report",
                path: "distributor-information-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-information-report.vue"
                    ),
            },
            {
                name: "distributor-type-summary-report",
                path: "distributor-type-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-type-summary-report.vue"
                    ),
            },
            {
                name: "distributor-point-report",
                path: "distributor-point-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-point-report.vue"
                    ),
            },
            {
                name: "distributor-point-consultant-report",
                path: "distributor-point-consultant-report/:pointid",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-point-consultant-report.vue"
                    ),
            },
            {
                name: "distributor-consultant-report",
                path: "distributor-consultant-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-consultant-report.vue"
                    ),
            },
            {
                name: "distributor-prebankruptcy-report",
                path: "distributor-prebankruptcy-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-prebankruptcy-report.vue"
                    ),
            },
            {
                name: "distributor-sms-report",
                path: "distributor-sms-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-sms-report.vue"
                    ),
            },
            {
                name: "distributor-fund-lodgement-report",
                path: "distributor-fund-lodgement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/DISTRIBUTOR/distributor-fund-lodgement-report.vue"
                    ),
            },
            // Fund Management Report
            {
                name: "fund-report-main-setting",
                path: "fund-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-report-main-setting.vue"
                    ),
            },
            {
                name: "fund-daily-nav-report",
                path: "fund-daily-nav-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-daily-nav-report.vue"
                    ),
            },
            {
                name: "fund-daily-nav-admin-report",
                path: "fund-daily-nav-admin-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-daily-nav-admin-report.vue"
                    ),
            },
            {
                name: "fund-audit-trail-report",
                path: "fund-audit-trail-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-audit-trail-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-report",
                path: "fund-historical-nav-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-detail-report",
                path: "fund-historical-nav-detail-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-detail-report.vue"
                    ),
            },
            {
                name: "fund-nav-movement-report",
                path: "fund-nav-movement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-nav-movement-report.vue"
                    ),
            },
            {
                name: "fund-historical-nav-user-report",
                path: "fund-historical-nav-user-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-historical-nav-user-report.vue"
                    ),
            },
            {
                name: "fund-data-new-report",
                path: "fund-data-new-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-new-report.vue"
                    ),
            },
            {
                name: "fund-data-closed-report",
                path: "fund-data-closed-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-closed-report.vue"
                    ),
            },
            {
                name: "fund-data-epf-report",
                path: "fund-data-epf-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-epf-report.vue"
                    ),
            },
            {
                name: "fund-data-sri-report",
                path: "fund-data-sri-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-sri-report.vue"
                    ),
            },
            {
                name: "fund-data-status-report",
                path: "fund-data-status-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-status-report.vue"
                    ),
            },
            {
                name: "fund-data-all-report",
                path: "fund-data-all-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-data-all-report.vue"
                    ),
            },
            {
                name: "fund-user-summary-report",
                path: "fund-user-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-user-summary-report.vue"
                    ),
            },
            {
                name: "fund-user-summary-fimm-report",
                path: "fund-user-summary-fimm-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-user-summary-fimm-report.vue"
                    ),
            },
            {
                name: "fund-event-log-report",
                path: "fund-event-log-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-event-log-report.vue"
                    ),
            },
            {
                name: "fund-utmc-contact-person-report",
                path: "fund-utmc-contact-person-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-utmc-contact-person-report.vue"
                    ),
            },
            {
                name: "fund-newspaper-contact-person-report",
                path: "fund-newspaper-contact-person-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/FUND/fund-newspaper-contact-person-report.vue"
                    ),
            },
            //ANNUAL FEES REPORT
            {
                name: "annual-report-main-setting",
                path: "annual-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/annual-report-main-setting.vue"
                    ),
            },
            {
                name: "amsf-aum-report",
                path: "amsf-aum-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-report.vue"
                    ),
            },
            {
                name: "amsf-gross-sale-report",
                path: "amsf-gross-sale-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-gross-sale-report.vue"
                    ),
            },
            {
                name: "amsf-total-submission-report",
                path: "amsf-total-submission-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-submission-report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-report",
                path: "amsf-summary-utmc-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-report.vue"
                    ),
            },
            {
                name: "amsf-summary-iuta-report",
                path: "amsf-summary-iuta-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf_summary_iuta_report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-prp-report",
                path: "amsf-summary-utmc-prp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-prp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-prp-report",
                path: "amsf-summary-prp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-prp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-iuta-iprp-report",
                path: "amsf-summary-iuta-iprp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-iuta-iprp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-utmc-iprp-report",
                path: "amsf-summary-utmc-iprp-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-utmc-iprp-report.vue"
                    ),
            },
            {
                name: "amsf-summary-cuta-cpra-report",
                path: "amsf-summary-cuta-cpra-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-summary-cuta-cpra-report.vue"
                    ),
            },
            {
                name: "amsf-aum-tgs-report",
                path: "amsf-aum-tgs-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-tgs-report.vue"
                    ),
            },
            {
                name: "amsf-membership-fees-report",
                path: "amsf-membership-fees-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-membership-fees-report.vue"
                    ),
            },
            {
                name: "amsf-fee-waiver-report",
                path: "amsf-fee-waiver-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-fee-waiver-report.vue"
                    ),
            },
            {
                name: "amsf-collection-summary-report",
                path: "amsf-collection-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-collection-summary-report.vue"
                    ),
            },
            {
                name: "amsf-debtors-outstanding-summary-report",
                path: "amsf-debtors-outstanding-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-debtors-outstanding-summary-report.vue"
                    ),
            },
            {
                name: "amsf-debtors-statement-report",
                path: "amsf-debtors-statement-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-debtors-statement-report.vue"
                    ),
            },
            {
                name: "amsf-a1form-distributor-report",
                path: "amsf-a1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-a1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-a2form-distributor-report",
                path: "amsf-a2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-a2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-b1form-distributor-report",
                path: "amsf-b1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-b1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-b2form-distributor-report",
                path: "amsf-b2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-b2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-c1form-distributor-report",
                path: "amsf-c1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-c1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-c2form-distributor-report",
                path: "amsf-c2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-c2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-d1form-distributor-report",
                path: "amsf-d1form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-d1form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-d2form-distributor-report",
                path: "amsf-d2form-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-d2form-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-aum-tgs-distributor-report",
                path: "amsf-aum-tgs-distributor-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-aum-tgs-distributor-report.vue"
                    ),
            },
            {
                name: "amsf-total-aum-report",
                path: "amsf-total-aum-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-aum-report.vue"
                    ),
            },
            {
                name: "amsf-total-sales-report",
                path: "amsf-total-sales-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/ANNUAL/amsf-total-sales-report.vue"
                    ),
            },
            // Consultant Management Report
            {
                name: "consultant-report-main-setting",
                path: "consultant-report-main-setting",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-report-main-setting.vue"
                    ),
            },
            {
                name: "consultant-details-report",
                path: "consultant-details-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-details-report.vue"
                    ),
            },
            {
                name: "consultant-registration-report",
                path: "consultant-registration-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-registration-report.vue"
                    ),
            },
            {
                name: "consultant-registration-summary-report",
                path: "consultant-registration-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-registration-summary-report.vue"
                    ),
            },
            {
                name: "consultant-termination-report",
                path: "consultant-termination-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-termination-report.vue"
                    ),
            },
            {
                name: "consultant-termination-summary-report",
                path: "consultant-termination-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-termination-summary-report.vue"
                    ),
            },
            {
                name: "consultant-active-report",
                path: "consultant-active-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-active-report.vue"
                    ),
            },
            {
                name: "consultant-active-summary-report",
                path: "consultant-active-summary-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-active-summary-report.vue"
                    ),
            },
            {
                name: "consultant-bankruptcy-report",
                path: "consultant-bankruptcy-report",
                component: () =>
                    import (
                        "../pages/admin-configuration/reports/CONSULTANT/consultant-bankruptcy-report.vue"
                    ),
            },
            // Consultant Alert Report -- Tahmina
            {
                name: 'cas-report-main-setting',
                path: 'cas-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-report-main-setting.vue'
                    ),
            },
            {
                name: 'cas-utc-tagging-list-report',
                path: 'cas-utc-tagging-list-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-utc-tagging-list-report.vue'
                    ),
            },
            {
                name: 'cas-enquiry-report',
                path: 'cas-enquiry-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-enquiry-report.vue'
                    ),
            },
            {
                name: 'total-complain-fimm',
                path: 'total-complain-fimm',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-total-complain-fimm.vue'
                    ),
            },
            {
                name: 'sanctioned-fimm-distributor',
                path: 'sanctioned-fimm-distributor',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CAS/cas-sanctioned-fimm-distributor.vue'
                    ),
            },
            // CPD Report
            {
                name: 'cpd-report-main-setting',
                path: 'cpd-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-report-main-setting.vue'
                    ),
            },
            {
                name: 'cpd-program-secretariat-report',
                path: 'cpd-program-secretariat-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-secretariat.vue'
                    ),
            },
            {
                name: 'cpd-program-repeated-report',
                path: 'cpd-program-repeated-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-program-repeated.vue'
                    ),
            },
            {
                name: 'cpd-evaluation-report',
                path: 'cpd-evaluation-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-evaluation-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report',
                path: 'cpd-fpam-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report.vue'
                    ),
            },
            {
                name: 'cpd-fpam-report-detail',
                path: 'cpd-fpam-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-fpam-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-academic-report',
                path: 'cpd-academic-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report.vue'
                    ),
            },
            {
                name: 'cpd-academic-report-detail',
                path: 'cpd-academic-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-academic-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-reading-report',
                path: 'cpd-reading-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report.vue'
                    ),
            },
            {
                name: 'cpd-reading-report-detail',
                path: 'cpd-reading-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-reading-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report',
                path: 'cpd-teaching-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report.vue'
                    ),
            },
            {
                name: 'cpd-teaching-report-detail',
                path: 'cpd-teaching-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-teaching-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report',
                path: 'cpd-waiver-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report.vue'
                    ),
            },
            {
                name: 'cpd-waiver-report-detail',
                path: 'cpd-waiver-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-waiver-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-writing-report',
                path: 'cpd-writing-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report.vue'
                    ),
            },
            {
                name: 'cpd-writing-report-detail',
                path: 'cpd-writing-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-writing-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report',
                path: 'cpd-record-consultant-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report.vue'
                    ),
            },
            {
                name: 'cpd-record-consultant-report-detail',
                path: 'cpd-record-consultant-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-consultant-report-detail.vue'
                    ),
            },
            {
                name: 'cpd-record-report',
                path: 'cpd-record-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report.vue'
                    ),
            },
            {
                name: 'cpd-record-report-detail',
                path: 'cpd-record-report-detail/:consultantid',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/CPD/cpd-record-report-detail.vue'
                    ),
            },
            // FINANCE Report
            {
                name: 'finance-report-main-setting',
                path: 'finance-report-main-setting',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-report-main-setting.vue'
                    ),
            },
            {
                name: 'finance-utc-report',
                path: 'finance-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-report.vue'
                    ),
            },
            {
                name: 'finance-prc-report',
                path: 'finance-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-summary-report',
                path: 'finance-utc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-summary-report',
                path: 'finance-prc-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-summary-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-ut-report',
                path: 'finance-exam-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exam-reject-prs-report',
                path: 'finance-exam-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exam-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-ut-report',
                path: 'finance-exemption-reject-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-ut-report.vue'
                    ),
            },
            {
                name: 'finance-exemption-reject-prs-report',
                path: 'finance-exemption-reject-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-exemption-reject-prs-report.vue'
                    ),
            },
            {
                name: 'finance-approved-utc-report',
                path: 'finance-approved-utc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-utc-report.vue'
                    ),
            },
            {
                name: 'finance-approved-prc-report',
                path: 'finance-approved-prc-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-approved-prc-report.vue'
                    ),
            },
            {
                name: 'finance-utc-exemption-summary-report',
                path: 'finance-utc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-utc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-prc-exemption-summary-report',
                path: 'finance-prc-exemption-summary-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prc-exemption-summary-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-ut-report',
                path: 'finance-candidate-exam-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-ut-report.vue'
                    ),
            },
            {
                name: 'finance-candidate-exam-prs-report',
                path: 'finance-candidate-exam-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-candidate-exam-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-ut-report',
                path: 'finance-prepayment-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-ut-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-prs-report',
                path: 'finance-prepayment-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-prs-report.vue'
                    ),
            },
            {
                name: 'finance-prepayment-refund-report',
                path: 'finance-prepayment-refund-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-prepayment-refund-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-ut-report',
                path: 'finance-cute-result-ut-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-ut-report.vue'
                    ),
            },
            {
                name: 'finance-cute-result-prs-report',
                path: 'finance-cute-result-prs-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-cute-result-prs-report.vue'
                    ),
            },
            {
                name: 'finance-amsf-collection-report',
                path: 'finance-amsf-collection-report',
                component: () =>
                    import (
                        '../pages/admin-configuration/reports/FINANCE/finance-amsf-collection-report.vue'
                    ),
            },
            // Admin Dashboard Link
            {
                name: 'admin-dashboard',
                path: 'admin-dashboard',
                component: () =>
                    import ('../components/dashboard_admin/Dashboard.vue'),
            },
            // Consultant Dashboard Link
            {
                name: 'consultant-dashboard',
                path: '/consultant/dashboard',
                component: () =>
                    import ('../components/dashboard_consultant/dashboard.vue'),
            },
            // consultant alert Dashboard Link
            {
                name: 'cas-dashboard',
                path: '/cas/dashboard',
                component: () =>
                    import ('../components/dashboard_cas/dashboard.vue'),
            },
            // Finance alert Dashboard Link
            {
                name: 'finance-dashboard',
                path: '/finance/dashboard',
                component: () =>
                    import ('../components/dashboard_finance/dashboard.vue'),
            },
            // Training Provider Dashboard
            {
                name: 'trp-dashboard',
                path: '/trp/dashboard',
                // beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
                component: () =>
                    import ('../components/dashboard-trp/dashboard.vue'),
                // default: true,
            },
            // Third  Party Dashboard
            {
                name: 'others-dashboard',
                path: '/third-party/dashboard',
                // beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
                component: () =>
                    import ('../components/dashboard-other/dashboard.vue'),
                // default: true,
            },
            // Media Dashboard
            {
                name: 'media-dashboard',
                path: '/media/dashboard',
                // beforeEnter: FimmUserAuthentication.ifAuthenticatedAnyEscUser,
                component: () =>
                    import ('../components/dashboard-media/dashboard.vue'),
                // default: true,
            },

            {
                name: 'fimm-circular-details',
                path: 'fimm-circular-details/:CIRCULAR_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/fimm_circularDetails.vue'
                    ),
            },
            {
                name: 'fimm-circular-List',
                path: 'fimm-circular-List/:MANAGE_DEPARTMENT_ID/:DPMT_NAME',
                component: () =>
                    import (
                        '../pages/admin-configuration/circular-management/fimm_circularList.vue'
                    ),
            },
            {
                name: 'announcement-details',
                path: 'announcement-details/:MANAGE_EVENT_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventApprovalDetailsMain.vue'
                    ),
            },
            {
                name: 'event-list-approved',
                path: 'event-list-approved/:MANAGE_DEPARTMENT_ID/:DPMT_NAME',
                component: () =>
                    import (
                        '../pages/admin-configuration/announcement-management/cm0_eventListApproved.vue'
                    ),
            },
            // Page Under Maintainance
            {
                name: 'page-under-maintenance',
                path: 'page-under-maintenance',
                component: () =>
                    import (
                        '../pages/admin-configuration/page-maintenance-management/cm0_pageundermaintenance.vue'
                    ),
            },
            {
                name: 'pmnotification-detail',
                path: 'pmnotification-detail/:PAGE_MAINTENANCE_ID',
                component: () =>
                    import (
                        '../pages/admin-configuration/page-maintenance-management/cm0_pagemaintenancedetails.vue'
                    ),
            },
            {
                name: 'consultant-fee-edit',
                path: 'consultant-fee-edit',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/consultant-fee-edit.vue'
                    ),
            },
             //post-vet appeal approval
             {
                name: 'approvalAppeal-postVetting-distributorList',
                path: 'approvalAppeal-postVetting-distributorList',
                component: () =>
                  import (
                    '../pages/continuing-development/distributor/postVetting/appealApproval/cm04_apprAppealPostVetting_distributorList.vue'
                    ),
              },
              {
                name: 'approvalAppeal-postVetting-programList',
                path: 'approvalAppeal-postVetting-programList',
                component: () =>
                  import (
                    '../pages/continuing-development/distributor/postVetting/appealApproval/cm04_apprAppealPostVetting_programList.vue'
                    ),
              },
              {
                name: 'approvalAppeal-postVetting-reviewDetails',
                path: 'approvalAppeal-postVetting-reviewDetails',
                component: () =>
                  import (
                    '../pages/continuing-development/distributor/postVetting/appealApproval/cm04_apprAppealPostVetting_reviewDetails.vue'
                    ),
              },
              {
                name: 'approvalAppeal-postVetting-viewSubmission',
                path: 'approvalAppeal-postVetting-viewSubmission',
                component: () =>
                  import (
                    '../pages/continuing-development/distributor/postVetting/appealApproval/cm04_apprAppealPostVetting_viewSubmission.vue'
                    ),
              },
              {
                name: 'consultant-fee-add',
                path: 'consultant-fee-add',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/consultant-fee-add.vue'
                    ),
            },
            {
                name: 'distributor-fee-add',
                path: 'distributor-fee-add',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/distributor-fee-add.vue'
                    ),
            },
            {
                name: 'distributor-fee-edit',
                path: 'distributor-fee-edit',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/distributor-fee-edit.vue'
                    ),
            },
            {
                name: 'waiver-fee-add',
                path: 'waiver-fee-add',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/waiver-fee-add.vue'
                    ),
            },
            {
                name: 'waiver-fee-edit',
                path: 'waiver-fee-edit',
                component: () =>
                    import (
                        '../pages/admin-configuration/fee-management/waiver-fee-edit.vue'
                    ),
            },

            // *******************************TAHMINA - END****************************************



        ],
        beforeEnter: ifAuthenticatedFiMM,
    },
]
