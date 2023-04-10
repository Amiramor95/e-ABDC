import AppLayout from "../components/admin/AppLayout";
import AuthLayoutDistributor from "../components/auth/AuthLayoutDistributor";
import AuthLayoutDistributorRecoverPass from "../components/auth/AuthLayoutRecoverPassword";

const ifLogin = (to, from, next) => {
    if (
        localStorage.getItem("user") === null ||
        localStorage.getItem("user") === "undefined"
    ) {
        next();
    } else if (JSON.parse(localStorage.getItem("user")).user_type === "fimm") {
        next("fimm/dashboard");
    } else if (
        JSON.parse(localStorage.getItem("user")).user_type === "distributor"
    ) {
        next("distributor/dashboard");
    } else if (
        JSON.parse(localStorage.getItem("user")).user_type === "consultant"
    ) {
        next("consultant/dashboard");
    } else if (
        JSON.parse(localStorage.getItem("user")).user_type === "third-party"
    ) {
        next("third-party/dashboard");
    } else if (
        JSON.parse(localStorage.getItem("user")).user_type === "training-provider"
    ) {
        next("training-provider/dashboard");
    } else if (JSON.parse(localStorage.getItem("user")).user_type === "media") {
        next("fms-websites");
    } else if (JSON.parse(localStorage.getItem("user")).user_type === "esc") {
        next("esc/dashboard");
    }
};

const ifAuthenticatedDistributor = (to, from, next) => {
    if (
        localStorage.getItem("user") === null ||
        localStorage.getItem("user") === "undefined"
    ) {
        next("login-distributor");
    } else {
        next();
    }
};

export default [
    /* ---------------DISTRIBUTOR PAGES--------------------- */
    {
        name: "Distributor",
        path: "/distributor",
        component: AppLayout,
        meta: {
            progress: {
                func: [{
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000",
                    },
                    {
                        call: "fail",
                        modifier: "temp",
                        argument: "#6e0000",
                    },
                    {
                        call: "location",
                        modifier: "temp",
                        argument: "top",
                    },
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
        children: [{
                name: "distributor-dashboard",
                path: "dashboard",
                component: () =>
                    import ("../components/dashboard_distributor/dashboard.vue"),
                // default: true,
            },
            {
                name: "PrepaymentRefundSubmissionForExamWaiver",
                path: "PrepaymentRefundForExamWaiver",
                component: () =>
                    import (
                        "../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiver.vue"
                    ),
                // props: true,
            },
            {
                name: "PrepaymentRefundSubmissionForExamWaiverEdit",
                path: "PrepaymentRefundSubmissionForExamWaiverEdit/:timestamp",
                component: () =>
                    import (
                        "../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiverEdit.vue"
                    ),
                // props: true,
            },
            // Update Distributor
            {
                name: "distributor-UpdateDetails-SubmissionList-secondApproval",
                path: "distributor-UpdateDetails-SubmissionList-secondApproval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorUpdateDetailsSubmissionList_2ndApproval.vue"
                    ),
                props: true,
            },
            {
                name: "distributor-UpdateDetails-SubmissionDetails-secondApproval",
                path: "distributor-UpdateDetails-SubmissionDetails-secondApproval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorUpdateDetailsSubmissionDetails_2ndApproval.vue"
                    ),
                props: true,
            },
            {
                name: "distributor-self-registration",
                path: "distributor-self-registration",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_selfRegistration.vue"
                    ),
            },
            {
                name: "distributor-profile",
                path: "distributor-profile",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_viewProfile.vue"
                    ),
            },
            {
                name: "distributor-profile-update",
                path: "distributor-profile-update",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_updateProfile.vue"
                    ),
            },
            {
                name: "distributor-RegisterType-SubmissionList-2ndLevel",
                path: "distributor-RegisterType-SubmissionList-2ndLevel",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorNewLicenseSubmissionList_2ndLevel.vue"
                    ),
            },
            {
                name: "distributor-RegisterType-SubmissionDetails-2ndLevel",
                path: "distributor-RegisterType-SubmissionDetails-2ndLevel",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorNewLicenseSubmissionDetails_2ndLevel.vue"
                    ),
            },
            {
                name: "distributor-register-new-license",
                path: "distributor-register-new-license",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_registerNewLicense.vue"
                    ),
            },
            {
                name: "distributor-details-registration",
                path: "distributor-details-registration",
                props: true,
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_detailsRegistration.vue"
                    ),
            },



            // start--acap
            {
                name: "distributor-master-list",
                path: "distributor-master-list",
                component: () =>
                    import (
                        "../pages/distributor-management/fimm/cm1_distributor_list.vue"
                    ),
            },
            {
                name: "distributor-member-selfRegistration",
                path: "distributor-member-selfRegistration",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_selfRegistration.vue"
                    ),
            },
            //
            {
                name: "announcement",
                path: "announcement",
                component: () =>
                    import ("../pages/admin-configuration/announcement/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "pending-task",
                path: "pending-task",
                component: () =>
                    import ("../pages/admin-configuration/pending-task/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "notification",
                path: "notification",
                component: () =>
                    import ("../pages/admin-configuration/notification/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "profile",
                path: "profile",
                component: () =>
                    import ("../pages/admin-configuration/profile/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "distributor-member-verification",
                path: "distributor-member-verification",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_verification.vue"
                    ),
            },
            {
                name: "distributor-member-groupSelection",
                path: "distributor-member-groupSelection",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_groupSelection.vue"
                    ),
            },
            {
                name: "distributor-member-approval",
                path: "distributor-member-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_approval.vue"
                    ),
            },

            // CPD
            // DIstr - PostVetting
            {
                name: "d-moduleSelectionList",
                path: "d-moduleSelectionList",

                component: () =>
                    import (
                        "../pages/continuing-development/distributor/cm04_d_moduleSelectionList.vue"
                    ),
            },
            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },

            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingAppealProgram",
                path: "d-postVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewParticipant",
                path: "d-postVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatedViewParticipant",
                path: "d-postVettingRepeatedViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvettingRepeated_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },
            // dist-prevet
            {
                name: "d-preVettingAppealProgram",
                path: "d-preVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },

            {
                name: "d-preVettingViewProgramDetails",
                path: "d-preVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-preVettingViewDetailParticipant",
                path: "d-preVettingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_viewParticipant.vue"
                    ),
            },
            // cpd -dist 5 modules
            {
                name: "distributor-suspension-appeal",
                path: "distributor-suspension-appeal",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorSuspension_appeal.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup",
                path: "distributor-prepayment-topup",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_Topup.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-edit",
                path: "distributor-prepayment-topup-edit",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_TopupEdit.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-list",
                path: "distributor-prepayment-topup-list",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_DistributorPrepaymentTopup.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-detail",
                path: "distributor-prepayment-topup-detail",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_PrepaymentTopup-details.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-return",
                path: "distributor-prepayment-topup-return",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_Topup_return.vue"
                    ),
            },
            {
                name: "distributor-Transaction-List",
                path: "distributor-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor-Transaction-Ledger.vue"
                    ),
            },
            {
                name: "distributor-pre-payment-Transaction-List",
                path: "distributor-pre-payment-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor-Transaction-Ledger-list.vue"
                    ),
            },
            {
                name: "distributor-amfs-Transaction-List",
                path: "distributor-amfs-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor_AndAMSFTransaction.vue"
                    ),
            },
            {
                name: "distributor-AMSF-Collection-List",
                path: "distributor-AMSF-Collection-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_AMSFCollection-Distributor-list.vue"
                    ),
            },
            {
                name: "distributor-AMSF-Collection-Detail",
                path: "distributor-AMSF-Collection-Detail",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_AMSFCollection-Details.vue"
                    ),
            },
            {
                name: "distributor-AMSF-Collection",
                path: "distributor-AMSF-Collection/:LEDGER_ID",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor_AMSFSubmission.vue"
                    ),
            },
            {
                name: "distributor-candidate-generateAcceptanceList",
                path: "distributor-candidate-generateAcceptanceList",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorBulkUpload_generateAcceptanceList.vue"
                    ),
            },
            {
                name: "distributor-candidate-acceptanceList_detail",
                path: "distributor-candidate-acceptanceList_detail",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorBulkUpload_acceptanceListDetail.vue"
                    ),
            },



            // CPD
            // DIstr - PostVetting
            {
                name: "d-moduleSelectionList",
                path: "d-moduleSelectionList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/cm04_d_moduleSelectionList.vue"
                    ),
            },
            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },
            // dist-prevet
            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },
            {
                name: "d-preVettingEditProgram",
                path: "d-preVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-preVettingViewParticipant",
                path: "d-preVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-participants",
                path: "d-participants",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_Participants.vue"
                    ),
            },

            // cpd -dist 5 modules
            // writing

            {
                name: "d-writingNewSubmission",
                path: "d-writingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_newSubmission.vue"
                    ),
            },
            {
                name: "d-writingEditSubmission",
                path: "d-writingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_editSubmission.vue"
                    ),
            },
            {
                name: "d-writingViewDetailParticipant",
                path: "d-writingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-writingAmend",
                path: "d-writingAmend",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_ammend.vue"
                    ),
            },

            // teaching
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },
            {
                name: "d-teachingNewSubmission",
                path: "d-teachingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_newSubmission.vue"
                    ),
            },
            {
                name: "d-teachingAmendProgram",
                path: "d-teachingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_ammend.vue"
                    ),
            },
            {
                name: "d-teachingViewDetailParticipant",
                path: "d-teachingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-teachingAppealProgram",
                path: "d-teachingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_appealProgram.vue"
                    ),
            },
            {
                name: "d-teachingEditSubmission",
                path: "d-teachingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_editSubmission.vue"
                    ),
            },

            // academic
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },
            {
                name: "d-academicNewSubmission",
                path: "d-academicNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_newSubmission.vue"
                    ),
            },
            {
                name: "d-academicAmendProgram",
                path: "d-academicAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_ammend.vue"
                    ),
            },
            {
                name: "d-academicEditSubmission",
                path: "d-academicEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_editSubmission.vue"
                    ),
            },
            {
                name: "d-academicViewDetailParticipant",
                path: "d-academicViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-academicAppealProgram",
                path: "d-academicAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_appealProgram.vue"
                    ),
            },

            // fpam
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },

            {
                name: "d-fpCertifiedAmendProgram",
                path: "d-fpCertifiedAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/certified-financial/cm04_dCertified_ammend.vue"
                    ),
            },
            {
                name: "d-fpEditSubmission",
                path: "d-fpEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFP_editSubmission.vue"
                    ),
            },

            {
                name: "d-fpamCertifiedModuleNewSubmission",
                path: "d-fpamCertifiedModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/certified-financial/cm04_dCertified_module_newSubmission.vue"
                    ),
            },

            {
                name: "d-fpamIslamicModuleNewSubmission",
                path: "d-fpamIslamicModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/islamic-financial/cm04_dIslamic_module_newSubmission.vue"
                    ),
            },

            {
                name: "d-fpamRegisteredModuleNewSubmission",
                path: "d-fpamRegisteredModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/registered-financial/cm04_dRegistered_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamShariahModuleNewSubmission",
                path: "d-fpamShariahModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/shariah-registered/cm04_dShariah_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpViewDetailParticipant",
                path: "d-fpViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // teaching
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },
            // academic
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },
            // Reading
            {
                name: "d-readingModuleList",
                path: "d-readingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_list.vue"
                    ),
            },
            {
                name: "d-readingNewSubmission",
                path: "d-readingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_newSubmission.vue"
                    ),
            },
            {
                name: "d-readingAppealProgram",
                path: "d-readingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_Reading_appealProgram.vue"
                    ),
            },
            {
                name: "d-readingEditSubmission",
                path: "d-readingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_editSubmission.vue"
                    ),
            },
            {
                name: "d-readingViewDetailParticipant",
                path: "d-readingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // fpam
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },

            // end CPD
            // start Consultant Management
            {
                name: "d-consultantReviewList",
                path: "d-consultantReviewList",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_distributor_Reviewlist.vue"
                    ),
            },
            {
                name: "d-consultantReviewApproval",
                path: "d-consultantReviewApproval",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_distributor_Review.vue"
                    ),
            },
            {
                name: "d-secondlvl-consultantReviewList",
                path: "d-secondlvl-consultantReviewList",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_secondlvl_Reviewlist.vue"
                    ),
            },
            {
                name: "d-secondlvl-consultantReviewApproval",
                path: "d-secondlvl-consultantReviewApproval",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_secondlvl_Review.vue"
                    ),
            },
            // End Consultant Management
            // start annual fees -ros
            {
                name: "distributor-Submission",
                path: "distributor-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_Submission.vue"
                    ),
            },
            {
                name: "distributor-AUM-Submission",
                path: "distributor-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_AUM_Submission.vue"
                    ),
            },
            {
                name: "distributor-AUM-Submission-List",
                path: "distributor-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "distributor-TGS-Submission",
                path: "distributor-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_TGS_Submission.vue"
                    ),
            },
            {
                name: "distributor-TGS-Submission-List",
                path: "distributor-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_TGS_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorManager-Submission",
                path: "DistributorManager-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-AUM-Submission",
                path: "DistributorManager-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_AUM_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-AUM-Submission-List",
                path: "DistributorManager-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorManager-TGS-Submission",
                path: "DistributorManager-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_TGS_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-TGS-Submission-List",
                path: "DistributorManager-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_TGS_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorCompliance-Submission",
                path: "DistributorCompliance-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-AUM-Submission",
                path: "DistributorCompliance-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_AUM_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-AUM-Submission-List",
                path: "DistributorCompliance-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorCompliance-TGS-Submission",
                path: "DistributorCompliance-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_TGS_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-TGS-Submission-List",
                path: "DistributorCompliance-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_TGS_Submission_List.vue"
                    ),
            },
            // end annual fee
            // start divestment -Ros
            {
                name: "DistributorDivestment-List",
                path: "DistributorDivestment-List",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestmentList.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Submission",
                path: "DistributorDivestment-Submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_Submission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Fund",
                path: "DistributorDivestment-Fund",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultant-consultant",
                path: "DistributorDivestment-FundConsultant-consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultant2Selection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Consultant",
                path: "DistributorDivestment-Consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultant",
                path: "DistributorDivestment-FundConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditFund",
                path: "DistributorDivestment-EditFund",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditConsultant",
                path: "DistributorDivestment-EditConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditFundConsultant",
                path: "DistributorDivestment-EditFundConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSelectionEdit.vue"
                    ),
            },

            {
                name: "DistributorDivestment-EditFundConsultant-consultant",
                path: "DistributorDivestment-EditFundConsultant-consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultant2SelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundSubmission",
                path: "DistributorDivestment-FundSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSubmission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ConsultantSubmission",
                path: "DistributorDivestment-ConsultantSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSubmission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultantSubmission",
                path: "DistributorDivestment-FundConsultantSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSubmission.vue"
                    ),
            },
            // testcheckbox
            {
                name: "Test-Checkbox",
                path: "Test-Checkbox",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/testcheckbox.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundDetails",
                path: "DistributorDivestment-FundDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ConsultantDetails",
                path: "DistributorDivestment-ConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultantDetails",
                path: "DistributorDivestment-FundConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalList",
                path: "DistributorDivestment-ApprovalList",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestmentList__secondApproval.vue"
                    ),
            },

            {
                name: "DistributorDivestment-ApprovalFundDetails",
                path: "DistributorDivestment-ApprovalFundDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundDetails_secondApproval.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalConsultantDetails",
                path: "DistributorDivestment-ApprovalConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantDetails_secondApproval.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalFundConsultantDetails",
                path: "DistributorDivestment-ApprovalFundConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantDetails_secondApproval.vue"
                    ),
            },
            // end divestment

            // Extension Request
            {
                name: "extension-request",
                path: "extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorExtensionRequestList.vue"
                    ),
            },
            {
                name: "extension-request-exchange",
                path: "extension-request-exchange",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorExtensionRequestList.vue"
                    ),
            },
            {
                name: "extension-request-history",
                path: "extension-request-history/:id",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorExtensionRequestHistoryList.vue"
                    ),
            },
            {
                name: "create-extension-request",
                path: "create-extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorExtensionRequest.vue"
                    ),
            },
            {
                name: "view-extension-request",
                path: "view-extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm1_view_extension_request.vue"
                    ),
            },
            {
                name: "extension-request-update",
                path: "extension-request-update",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm1_distributor_admin_update_extension_request.vue"
                    ),
            },
            {
                name: "extension-request-admin-correction",
                path: "extension-request-admin-correction",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm1_distributor_admin_correction.vue"
                    ),
            },
            {
                name: "extension-request-manager-approval",
                path: "extension-request-manager-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm1_distributor_manager_approval.vue"
                    ),
            },
            {
                name: "extension-request-manager-view",
                path: "extension-request-manager-view",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm_1_distributor_manager_view.vue"
                    ),
            },
            {
                name: "extension-request-manager-correction",
                path: "extension-request-manager-correction",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/cm1_distributor_manager_correction.vue"
                    ),
            },
            {
                name: "extension-request-action",
                path: "extension-request/:action",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorViewExtensionRequest.vue"
                    ),
            },
            {
                name: "subsequent-extension-request",
                path: "subsequent-extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorSubsequentExtensionRequestList.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-approval-list",
                path: "subsequent-extension-request-approval-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributorSubsequentExtensionRequestApprovalList.vue"
                    ),
            },
            {
                name: "view-subsequent-extension-request",
                path: "view-subsequent-extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_view_subsequent_extension_request.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-manager-approval",
                path: "subsequent-extension-request-manager-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_manager_approval.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-manager-correction",
                path: "subsequent-extension-request-manager-correction",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_manager_correction.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-manager-update",
                path: "subsequent-extension-request-manager-update",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_manager_update.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-manager-view",
                path: "subsequent-extension-request-manager-view",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_manager_view.vue"
                    ),
            },
            {
                name: "create-subsequent-extension-request",
                path: "create-subsequent-extension-request",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_admin_create.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-admin-update",
                path: "subsequent-extension-request-admin-update",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_admin_update.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-admin-correction",
                path: "subsequent-extension-request-admin-correction",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/extension-request/subsequent/cm1_distributor_admin_correction.vue"
                    ),
            },
            {
                name: "subsequent-extension-request-action",
                path: "subsequent-extension-request/:action",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorViewSubsequentExtensionRequest.vue"
                    ),
            },
            // End Extension Request



            // DISTRIBUTOR USER -acap
            {
                name: "distributor-user-profile-set-up",
                path: "distributor-user-profile-set-up",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userProfile.vue"
                    ),
            },
            {
                name: "distributor-user-management-list",
                path: "distributor-user-management-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementList.vue"
                    ),
            },
            {
                name: "distributor-user-management-list-status",
                path: "distributor-user-management-list-status",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementListStatus.vue"
                    ),
            },
            {
                name: "distributor-user-management-review",
                path: "distributor-user-management-review",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementReview.vue"
                    ),
            },
            {
                name: "distributor-user-role-application",
                path: "distributor-user-role-application",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRole.vue"
                    ),
            },
            {
                name: "distributor-user-role-list",
                path: "distributor-user-role-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRoleApplicationList.vue"
                    ),
            },
            {
                name: "distributor-user-role-review",
                path: "distributor-user-role-review",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRoleApplicationReview.vue"
                    ),
            },


            {
                name: "PrepaymentRefundSubmissionForExamWaiver",
                path: "PrepaymentRefundForExamWaiver",
                component: () =>
                    import (
                        "../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiver.vue"
                    ),
                // props: true,
            },
            {
                name: "PrepaymentRefundSubmissionForExamWaiverEdit",
                path: "PrepaymentRefundSubmissionForExamWaiverEdit/:timestamp",
                component: () =>
                    import (
                        "../pages/finance-management/fimm/cm6_PrepaymentRefundForExamWaiverEdit.vue"
                    ),
                // props: true,
            },
            // Update Distributor
            {
                name: "distributor-UpdateDetails-SubmissionList-secondApproval",
                path: "distributor-UpdateDetails-SubmissionList-secondApproval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorUpdateDetailsSubmissionList_2ndApproval.vue"
                    ),
                props: true,
            },
            {
                name: "distributor-UpdateDetails-SubmissionDetails-secondApproval",
                path: "distributor-UpdateDetails-SubmissionDetails-secondApproval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorUpdateDetailsSubmissionDetails_2ndApproval.vue"
                    ),
                props: true,
            },
            {
                name: "distributor-self-registration",
                path: "distributor-self-registration",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_selfRegistration.vue"
                    ),
            },
            {
                name: "distributor-profile",
                path: "distributor-profile",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_viewProfile.vue"
                    ),
            },
            {
                name: "distributor-profile-update",
                path: "distributor-profile-update",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_updateProfile.vue"
                    ),
            },
            {
                name: "distributor-RegisterType-SubmissionList-2ndLevel",
                path: "distributor-RegisterType-SubmissionList-2ndLevel",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorNewLicenseSubmissionList_2ndLevel.vue"
                    ),
            },
            {
                name: "distributor-RegisterType-SubmissionDetails-2ndLevel",
                path: "distributor-RegisterType-SubmissionDetails-2ndLevel",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorNewLicenseSubmissionDetails_2ndLevel.vue"
                    ),
            },
            {
                name: "distributor-register-new-license",
                path: "distributor-register-new-license",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_registerNewLicense.vue"
                    ),
            },
            {
                name: "distributor-details-registration",
                path: "distributor-details-registration",
                props: true,
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributor_detailsRegistration.vue"
                    ),
            },

            // start--acap
            {
                name: "distributor-master-list",
                path: "distributor-master-list",
                component: () =>
                    import (
                        "../pages/distributor-management/fimm/cm1_distributor_list.vue"
                    ),
            },
            {
                name: "distributor-member-selfRegistration",
                path: "distributor-member-selfRegistration",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_selfRegistration.vue"
                    ),
            },
            //
            {
                name: "announcement",
                path: "announcement",
                component: () =>
                    import ("../pages/admin-configuration/announcement/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "pending-task",
                path: "pending-task",
                component: () =>
                    import ("../pages/admin-configuration/pending-task/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "notification",
                path: "notification",
                component: () =>
                    import ("../pages/admin-configuration/notification/index.vue"),
                props: { role: "distributor" },
            },
            {
                name: "profile",
                path: "profile",
                component: () =>
                    import ("../pages/admin-configuration/profile/index.vue"),
                props: { role: "distributor" },
            },

            {
                name: "distributor-member-verification",
                path: "distributor-member-verification",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_verification.vue"
                    ),
            },
            {
                name: "distributor-member-groupSelection",
                path: "distributor-member-groupSelection",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_groupSelection.vue"
                    ),
            },
            {
                name: "distributor-member-approval",
                path: "distributor-member-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorMember_approval.vue"
                    ),
            },

            {
                name: "f-fpamCertifiedModuleList",
                path: "f-fpamCertifiedModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/certified-financial/cm04_fCertified_module_list.vue"
                    ),
            },
            {
                name: "f-fpamApprCertifiedModuleList",
                path: "f-fpamApprCertifiedModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fAppr_module_list.vue"
                    ),
            },
            {
                name: "approval-fP-revokeProgram",
                path: "approval-fP-revokeProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fPappr_revokeProgram.vue"
                    ),
            },
            {
                name: "f-fpamCertifiedModuleNewSubmission",
                path: "f-fpamCertifiedModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/certified-financial/cm04_fCertified_module_newSubmission.vue"
                    ),
            },
            {
                name: "f-fpamIslamicModuleList",
                path: "f-fpamIslamicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/islamic-financial/cm04_fIslamic_module_list.vue"
                    ),
            },
            {
                name: "f-fpamApprIslamicModuleList",
                path: "f-fpamApprIslamicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fAppr_module_list.vue"
                    ),
            },
            {
                name: "f-fpamIslamicModuleNewSubmission",
                path: "f-fpamIslamicModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/islamic-financial/cm04_fIslamic_module_newSubmission.vue"
                    ),
            },
            {
                name: "f-fpamRegisteredModuleList",
                path: "f-fpamRegisteredModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/registered-financial/cm04_fRegistered_module_list.vue"
                    ),
            },
            {
                name: "f-fpamApprRegisteredModuleList",
                path: "f-fpamApprRegisteredModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fAppr_module_list.vue"
                    ),
            },
            {
                name: "f-fpamRegisteredModuleNewSubmission",
                path: "f-fpamRegisteredModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/registered-financial/cm04_fRegistered_module_newSubmission.vue"
                    ),
            },
            {
                name: "f-fpamShariahModuleList",
                path: "f-fpamShariahModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/shariah-registered/cm04_fShariah_module_list.vue"
                    ),
            },
            {
                name: "f-fpamApprShariahModuleList",
                path: "f-fpamApprShariahModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fAppr_module_list.vue"
                    ),
            },
            {
                name: "f-fpamShariahModuleNewSubmission",
                path: "f-fpamShariahModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/shariah-registered/cm04_fShariah_module_newSubmission.vue"
                    ),
            },
            {
                name: "approvalFPViewDetails",
                path: "approvalFPViewDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_apprFpViewDetails.vue"
                    ),
            },
            {
                name: "fP_viewParticipant",
                path: "fP_viewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fPviewParticipant"
                    ),
            },
            {
                name: "f-FPViewDetails",
                path: "f-FPViewDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/fimm/modules/fpam/cm04_fpViewDetails.vue"
                    ),
            },
            {
                name: "f-apprFpViewDetailParticipant",
                path: "f-apprFpViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            /**
             * 5 modules (fimm)
             * end
             */

            // CPD
            // DIstr - PostVetting
            {
                name: "d-writingAppealProgram",
                path: "d-writingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_appealProgram"
                    ),
            },

            {
                name: "d-writingAmendProgram",
                path: "d-writingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_ammend.vue"
                    ),
            },
            {
                name: "cpd-dashboard",
                path: "/cpd/dashboard",
                component: () =>
                    import ("../components/dashboard_cpd/dashboard.vue"),
            },
            {
                name: "d-moduleSelectionList",
                path: "d-moduleSelectionList",

                component: () =>
                    import (
                        "../pages/continuing-development/distributor/cm04_d_moduleSelectionList.vue"
                    ),
            },
            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },

            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingAppealProgram",
                path: "d-postVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewParticipant",
                path: "d-postVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatedViewParticipant",
                path: "d-postVettingRepeatedViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvettingRepeated_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },
            // dist-prevet
            {
                name: "d-preVettingAppealProgram",
                path: "d-preVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },
            {
                name: "d-preVettingEditProgram",
                path: "d-preVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramDetails",
                path: "d-preVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-preVettingViewDetailParticipant",
                path: "d-preVettingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_viewParticipant.vue"
                    ),
            },
            // cpd -dist 5 modules
            {
                name: "distributor-suspension-appeal",
                path: "distributor-suspension-appeal",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorSuspension_appeal.vue"
                    ),
            },
            {
                name: "distributor-candidate-registrationList",
                path: "distributor-candidate-registrationList",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cm1_distributorBulkUpload_candidateRegisterList.vue"
                    ),
            },

            {
                name: "distributor-prepayment-topup",
                path: "distributor-prepayment-topup",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_Topup.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-edit",
                path: "distributor-prepayment-topup-edit",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_TopupEdit.vue"
                    ),
            },
            {
                name: "distributor-prepayment-topup-list",
                path: "distributor-prepayment-topup-list",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_DistributorPrepaymentTopup.vue"
                    ),
            },

            {
                name: "distributor-prepayment-topup-return",
                path: "distributor-prepayment-topup-return",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/Cm6_PrePayment_Topup_return.vue"
                    ),
            },
            {
                name: "distributor-Transaction-List",
                path: "distributor-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor-Transaction-Ledger.vue"
                    ),
            },
            {
                name: "distributor-pre-payment-Transaction-List",
                path: "distributor-pre-payment-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor-Transaction-Ledger-list.vue"
                    ),
            },
            {
                name: "distributor-amfs-Transaction-List",
                path: "distributor-amfs-Transaction-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor_AndAMSFTransaction.vue"
                    ),
            },
            {
                name: "distributor-AMSF-Collection-List",
                path: "distributor-AMSF-Collection-List",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_AMSFCollection-Distributor-list.vue"
                    ),
            },
            {
                name: "distributor-AMSF-Collection",
                path: "distributor-AMSF-Collection/:LEDGER_ID",
                component: () =>
                    import (
                        "../pages/finance-management/distributor/cm6_Distributor_AMSFSubmission.vue"
                    ),
            },



            // CPD
            // DIstr - PostVetting
            {
                name: "d-moduleSelectionList",
                path: "d-moduleSelectionList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/cm04_d_moduleSelectionList.vue"
                    ),
            },
            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },
            // dist-prevet
            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },
            {
                name: "d-preVettingEditProgram",
                path: "d-preVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-preVettingViewParticipant",
                path: "d-preVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-participants",
                path: "d-participants",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_Participants.vue"
                    ),
            },

            // cpd -dist 5 modules
            // writing
            {
                name: "d-writingModuleList",
                path: "d-writingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_list.vue"
                    ),
            },
            {
                name: "d-writingNewSubmission",
                path: "d-writingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_newSubmission.vue"
                    ),
            },
            {
                name: "d-writingEditSubmission",
                path: "d-writingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_editSubmission.vue"
                    ),
            },
            {
                name: "d-writingViewDetailParticipant",
                path: "d-writingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-writingAmend",
                path: "d-writingAmend",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_ammend.vue"
                    ),
            },

            // teaching
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },
            {
                name: "d-teachingNewSubmission",
                path: "d-teachingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_newSubmission.vue"
                    ),
            },
            {
                name: "d-teachingViewDetailParticipant",
                path: "d-teachingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-teachingEditSubmission",
                path: "d-teachingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_editSubmission.vue"
                    ),
            },

            // academic
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },
            {
                name: "d-academicNewSubmission",
                path: "d-academicNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_newSubmission.vue"
                    ),
            },
            {
                name: "d-academicEditSubmission",
                path: "d-academicEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_editSubmission.vue"
                    ),
            },
            {
                name: "d-academicViewDetailParticipant",
                path: "d-academicViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // fpam
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },
            {
                name: "d-fpEditSubmission",
                path: "d-fpEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFP_editSubmission.vue"
                    ),
            },
            {
                name: "d-fpamCertifiedModuleList",
                path: "d-fpamCertifiedModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpAppealProgram",
                path: "d-fpAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_appealProgram"
                    ),
            },

            {
                name: "d-fpamCertifiedModuleNewSubmission",
                path: "d-fpamCertifiedModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/certified-financial/cm04_dCertified_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamIslamicModuleList",
                path: "d-fpamIslamicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamIslamicModuleNewSubmission",
                path: "d-fpamIslamicModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/islamic-financial/cm04_dIslamic_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamRegisteredModuleList",
                path: "d-fpamRegisteredModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamRegisteredModuleNewSubmission",
                path: "d-fpamRegisteredModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/registered-financial/cm04_dRegistered_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamShariahModuleList",
                path: "d-fpamShariahModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamShariahModuleNewSubmission",
                path: "d-fpamShariahModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/shariah-registered/cm04_dShariah_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpViewDetailParticipant",
                path: "d-fpViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // teaching
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },
            // academic
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },
            // Reading
            {
                name: "d-readingModuleList",
                path: "d-readingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_list.vue"
                    ),
            },
            {
                name: "d-readingNewSubmission",
                path: "d-readingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_newSubmission.vue"
                    ),
            },
            {
                name: "d-readingEditSubmission",
                path: "d-readingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_editSubmission.vue"
                    ),
            },
            {
                name: "d-readingAmendProgram",
                path: "d-readingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_ammend.vue"
                    ),
            },
            {
                name: "d-readingViewDetailParticipant",
                path: "d-readingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // fpam
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },

            //DIST CPD POINTS
            {
                name: "d-consultant-points",
                path: "d-consultant-points",

                component: () =>
                    import (
                        "../pages/continuing-development/distributor/consultant-points/consultant_point_list.vue"
                    ),
            },
            {
                name: "d-consultantModuleSelectionList",
                path: "d-consultantModuleSelectionList",

                component: () =>
                    import (
                        "../pages/continuing-development/distributor/consultant-points/d_consultantModuleSelectionList.vue"
                    ),
            },
            // end CPD

            // start Consultant Management
            {
                name: "d-consultantReviewList",
                path: "d-consultantReviewList",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_distributor_Reviewlist.vue"
                    ),
            },
            {
                name: "d-consultantReviewApproval",
                path: "d-consultantReviewApproval",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_distributor_Review.vue"
                    ),
            },
            {
                name: "d-secondlvl-consultantReviewList",
                path: "d-secondlvl-consultantReviewList",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_secondlvl_Reviewlist.vue"
                    ),
            },
            {
                name: "d-secondlvl-consultantReviewApproval",
                path: "d-secondlvl-consultantReviewApproval",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm2_secondlvl_Review.vue"
                    ),
            },
            // End Consultant Management
            // start annual fees -ros
            {
                name: "distributor-Submission",
                path: "distributor-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_Submission.vue"
                    ),
            },
            {
                name: "distributor-AUM-Submission",
                path: "distributor-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_AUM_Submission.vue"
                    ),
            },
            {
                name: "distributor-AUM-Submission-List",
                path: "distributor-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "distributor-TGS-Submission",
                path: "distributor-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_TGS_Submission.vue"
                    ),
            },
            {
                name: "distributor-TGS-Submission-List",
                path: "distributor-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_Distributor_TGS_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorManager-Submission",
                path: "DistributorManager-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-AUM-Submission",
                path: "DistributorManager-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_AUM_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-AUM-Submission-List",
                path: "DistributorManager-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorManager-TGS-Submission",
                path: "DistributorManager-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_TGS_Submission.vue"
                    ),
            },
            {
                name: "DistributorManager-TGS-Submission-List",
                path: "DistributorManager-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorManager_TGS_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorCompliance-Submission",
                path: "DistributorCompliance-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-AUM-Submission",
                path: "DistributorCompliance-AUM-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_AUM_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-AUM-Submission-List",
                path: "DistributorCompliance-AUM-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_AUM_Submission_List.vue"
                    ),
            },
            {
                name: "DistributorCompliance-TGS-Submission",
                path: "DistributorCompliance-TGS-Submission",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_TGS_Submission.vue"
                    ),
            },
            {
                name: "DistributorCompliance-TGS-Submission-List",
                path: "DistributorCompliance-TGS-Submission-List",
                component: () =>
                    import (
                        "../pages/annual-fee/distributor/cm7_DistributorCompliance_TGS_Submission_List.vue"
                    ),
            },
            // end annual fee
            // start divestment -Ros
            {
                name: "DistributorDivestment-List",
                path: "DistributorDivestment-List",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestmentList.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Submission",
                path: "DistributorDivestment-Submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_Submission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Fund",
                path: "DistributorDivestment-Fund",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultant-consultant",
                path: "DistributorDivestment-FundConsultant-consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultant2Selection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-Consultant",
                path: "DistributorDivestment-Consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultant",
                path: "DistributorDivestment-FundConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSelection.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditFund",
                path: "DistributorDivestment-EditFund",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditConsultant",
                path: "DistributorDivestment-EditConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-EditFundConsultant",
                path: "DistributorDivestment-EditFundConsultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSelectionEdit.vue"
                    ),
            },

            {
                name: "DistributorDivestment-EditFundConsultant-consultant",
                path: "DistributorDivestment-EditFundConsultant-consultant",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultant2SelectionEdit.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundSubmission",
                path: "DistributorDivestment-FundSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundSubmission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ConsultantSubmission",
                path: "DistributorDivestment-ConsultantSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantSubmission.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultantSubmission",
                path: "DistributorDivestment-FundConsultantSubmission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantSubmission.vue"
                    ),
            },
            // testcheckbox
            {
                name: "Test-Checkbox",
                path: "Test-Checkbox",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/testcheckbox.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundDetails",
                path: "DistributorDivestment-FundDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ConsultantDetails",
                path: "DistributorDivestment-ConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-FundConsultantDetails",
                path: "DistributorDivestment-FundConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantDetails.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalList",
                path: "DistributorDivestment-ApprovalList",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestmentList__secondApproval.vue"
                    ),
            },

            {
                name: "DistributorDivestment-ApprovalFundDetails",
                path: "DistributorDivestment-ApprovalFundDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundDetails_secondApproval.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalConsultantDetails",
                path: "DistributorDivestment-ApprovalConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_ConsultantDetails_secondApproval.vue"
                    ),
            },
            {
                name: "DistributorDivestment-ApprovalFundConsultantDetails",
                path: "DistributorDivestment-ApprovalFundConsultantDetails",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/divestment/cm1_distributorDivestment_FundConsultantDetails_secondApproval.vue"
                    ),
            },
            // end divestment

            // TERMINATION DISTRIBUTOR
            {
                name: "consultant-termination-Distributor",
                path: "consultant-termination-Distributor",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm02_consultant_termination_Distributor.vue"
                    ),
            },
            {
                name: 'consultant-termination-viewList-Distributor',
                path: 'consultant-termination-viewList-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_viewList_DistributorAdmin.vue'
                    ),
            },
            {
                name: 'consultant-termination-viewList-Distributor-Manager',
                path: 'consultant-termination-viewList-Distributor-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_viewList_DistributorManager.vue'
                    ),
            },
            {
                name: "consultant-termination-Second_Level",
                path: "consultant-termination-Second_Level",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm02_consultant_termination_Second_Level.vue"
                    ),
            },
            {
                name: "consultant-termination-detail-distirbutor",
                path: "consultant-termination-detail-distirbutor",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm02_consultant_termination_details_Distributor.vue"
                    ),
            },
            {
                name: "consultant-termination-Second_Level_status_list",
                path: "consultant-termination-Second_Level_status_list",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm02_consultant_termination_statusList_Distributor.vue"
                    ),
            },
            {
                name: "consultant-termination-approved-by-HOD-RD",
                path: "consultant-termination-approved-by-HOD-RD",
                component: () =>
                    import (
                        "../pages/consultant-management/distributor/cm02_consultant_termination_approved_by_HOD-RD.vue"
                    ),
            },

            // DISTRIBUTOR USER -acap
            {
                name: "distributor-user-profile-set-up",
                path: "distributor-user-profile-set-up",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userProfile.vue"
                    ),
            },
            {
                name: "distributor-user-management-list",
                path: "distributor-user-management-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementList.vue"
                    ),
            },
            {
                name: "distributor-user-management-list-status",
                path: "distributor-user-management-list-status",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementListStatus.vue"
                    ),
            },
            {
                name: "distributor-user-management-review",
                path: "distributor-user-management-review",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userManagementReview.vue"
                    ),
            },
            {
                name: "distributor-user-role-application",
                path: "distributor-user-role-application",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRole.vue"
                    ),
            },
            {
                name: "distributor-user-role-list",
                path: "distributor-user-role-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRoleApplicationList.vue"
                    ),
            },
            {
                name: "distributor-user-role-review",
                path: "distributor-user-role-review",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/user-management/cm1_distributor_userRoleApplicationReview.vue"
                    ),
            },



            // *******************************NURUL - START****************************************
            // CESSATION - START
            {
                name: "cessation-submission",
                path: "cessation-submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_cessation_applicationList.vue"
                    ),
            },
            {
                name: "new-cessation-submission",
                path: "new-cessation-submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_newCessation_submission.vue"
                    ),
            },
            {
                name: "view-cessation-submission",
                path: "view-cessation-submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_viewCessation_submission.vue"
                    ),
            },
            {
                name: "edit-cessation-submission",
                path: "edit-cessation-submission",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_editCessation_submission.vue"
                    ),
            },
            {
                name: "cessation-submission-manager-approval",
                path: "cessation-submission-manager-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_cessation_applicationList_managerApproval.vue"
                    ),
            },
            {
                name: "review-cessation-manager-approval",
                path: "review-cessation-manager-approval",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/cessation/cm1_reviewCessationSubmission_managerApproval.vue"
                    ),
            },

            // CESSATION - END

            // SUSPEND-REVOCATION APPEAL - START
            {
                name: "suspension-revocation-notification-list",
                path: "suspension-revocation-notification-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/suspension_revocation/cm1_suspension_revocation_notificationList.vue"
                    ),
            },
            {
                name: "view-suspension-revocation-form",
                path: "view-suspension-revocation-form",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/suspension_revocation/cm1_view_suspension_revocation_record.vue"
                    ),
            },
            {
                name: "update-suspension-revocation-form",
                path: "update-suspension-revocation-form",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/suspension_revocation/cm1_update_suspension_revocation_form.vue"
                    ),
            },
            // SUSPEND-REVOCATION APPEAL - END

            // WAIVER SUBMISSION - START
            {
                name: "waiversubmissionlist",
                path: "waiversubmissionlist",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/waiver/cm04_waiver_submissionList.vue"
                    ),
            },
            {
                name: "new-waiver-submission",
                path: "new-waiver-submission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/waiver/cm04_waiver_newSubmission.vue"
                    ),
            },
            {
                name: "view-waiver-submission",
                path: "view-waiver-submission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/waiver/cm04_view_waiverSubmission.vue"
                    ),
            },
            {
                name: "edit-waiver-submission",
                path: "edit-waiver-submission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/waiver/cm04_edit_waiverSubmission.vue"
                    ),
            },
            {
                name: "resubmit-waiver-submission",
                path: "resubmit-waiver-submission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/waiver/cm04_resubmit_waiverSubmission.vue"
                    ),
            },
            // WAIVER SUBMISSION - END
            // CANDIDATE ACCEPTANCE LIST - START
            {
                name: "candidateAcceptance-list",
                path: "candidateAcceptance-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/candidate-acceptance/cm1_candidateAcceptance_list.vue"
                    ),
            },
            {
                name: "new-candidateAcceptance",
                path: "new-candidateAcceptance",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/candidate-acceptance/cm1_newAcceptanceUpload.vue"
                    ),
            },
            {
                name: "view-candidateAcceptanceList",
                path: "view-candidateAcceptanceList",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/candidate-acceptance/cm1_viewAcceptanceList.vue"
                    ),
            },
            {
                name: "edit-candidateAcceptanceUpload",
                path: "edit-candidateAcceptanceUpload",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/candidate-acceptance/cm1_editAcceptanceUpload.vue"
                    ),
            },
            {
                name: "search-candidateRecord",
                path: "search-candidateRecord",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/candidate-acceptance/cm1_searchCandidate.vue"
                    ),
            },
            //CANDIDATE ACCEPTANCE LIST - END
            // DISTRIBUTION POINT
            {
                name: "distribution-point-list",
                path: "distribution-point-list",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/distribution-point/cm1_distributionPoint.vue"
                    ),
            },
            {
                name: "register-distributionPoint",
                path: "register-distributionPoint",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/distribution-point/cm1_new_distributionPoint.vue"
                    ),
            },
            {
                name: "edit-distributionPoint",
                path: "edit-distributionPoint",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/distribution-point/cm1_editDistributionPoint.vue"
                    ),
            },
            {
                name: "view-distributionPoint",
                path: "view-distributionPoint",
                component: () =>
                    import (
                        "../pages/distributor-management/distributor/distribution-point/cm1_viewDistributionPoint.vue"
                    ),
            },
            //Distributor Template
            {
                name: "distributor-template-list",
                path: "distributor-template-list",
                component: () =>
                    import (
                        '../pages/admin-configuration/document-management/distributor_template_list.vue'
                    ),
            },
            //DISTRIBUTION POINT - END

            //NAV MANAGEMENT - START
            {
                name: "navManagementList",
                path: "navManagementList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_NAVManagementList.vue"
                    ),
                props: true,
            },
            {
                name: "newNavSubmission",
                path: "newNavSubmission",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_NAVManagement.vue"
                    ),
                props: true,
            },

            {
                name: "navManagementReturn",
                path: "navManagementReturn",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_NAVManagement_Return.vue"
                    ),
                props: true,
            },
            {
                name: "viewNavManagementSubmission",
                path: "viewNavManagementSubmission",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_viewNavSubmission.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementPendingVerificationList",
                path: "navManagementPendingVerificationList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_navManagementPendingVerificationList.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementOverviewList",
                path: "navManagementOverviewList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_navManagementOverviewList.vue"
                    ),
                props: true,
            },
            {
                name: "navManagementManagerApproval",
                path: "navManagementManagerApproval",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/navManagement/cm5_distributor_navManagementManagerApproval.vue"
                    ),
                props: true,
            },
            // NAV MANAGEMENT- END


            // *******************************NURUL - END****************************************

            // *******************************ACAP - START****************************************

            // FUND CREATION - ACAP - START
            {
                name: "fundCreation",
                path: "fundCreation",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundCreation.vue"
                    ),
            },
            {
                name: "fundCreationReturned",
                path: "fundCreationReturned",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundCreation_return.vue"
                    ),
            },
            {
                name: "fundCreationlist",
                path: "fundCreationList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor-fundCreationList.vue"
                    ),
                props: true,
            },
            {
                name: "fundCreationView",
                path: "fundCreationView",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundCreationView.vue"
                    ),
                props: true,
            },
            {
                name: "fundCreationSecondLevelReviewlist",
                path: "fundCreationSecondLevelReviewList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor-fundCreationListReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundCreationSecondLevelReview",
                path: "fundCreationSecondLevelReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundCreationSecondReview.vue"
                    ),
                props: true,
            },
            {
                name: "funddemo",
                path: "funddemo",
                component: () =>
                    import ("../pages/funds-malaysia/demoupload.vue"),
                props: true,
            },
            // FUND CREATION - Acap - END
            // FUND LODGEMENT - Acap - START
            {
                name: "fundLodgementFundHouse",
                path: "fundLodgementFundHouse",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeFundHouse.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementCompany",
                path: "fundLodgementCompany",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeCompany.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementList",
                path: "fundLodgementList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeList.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgeDetails",
                path: "fundLodgeDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundLodgeDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementNew",
                path: "fundLodgementNew",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeSubmitDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementSubmit",
                path: "fundLodgementSubmit",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeConfirmSubmitDetails.vue"
                    ),
                props: true,
            },

            {
                name: "fundLodgementSubmissionDetails",
                path: "fundLodgementSubmissionDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeSubmitDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgeSecLvlCompanyList",
                path: "fundLodgeSecLvlCompanyList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeSecLvLCompanyList.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementSubmissionList",
                path: "fundLodgementSubmissionList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundLodgeSubmitList.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgementSubmissionReview",
                path: "fundLodgementSubmissionReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundLodgeDetailsReview.vue"
                    ),
                props: true,
            },

            {
                name: "fundlodgeSubmissionReview",
                path: "fundlodgeSubmissionReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundLodgeSubmitReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgeProfile-review",
                path: "fundLodgeProfile-review",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_fundLodgeProfileReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundLodgeDetailsReview",
                path: "fundLodgeDetailsReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundLodgeDetailsReview.vue"
                    ),
                props: true,
            },
            // FUND LODGEMENT - Acap - END
            // FUND DISLODGEMENT - Acap - START
            {
                name: "fundDisLodgementMainList",
                path: "fundDisLodgementMainList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeList.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementConfirmList",
                path: "fundDisLodgementConfirmList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDisLodgeConfirmSubmitList.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementConfirmView",
                path: "fundDisLodgementConfirmView",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeAdminConfirmSubmit.vue"
                    ),
                props: true,
            },

            {
                name: "fundDisLodgementReview",
                path: "fundDisLodgementReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeAdminReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementFundHouse",
                path: "fundDisLodgementFundHouse",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDisLodgeFundHouse.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementCompany",
                path: "fundDisLodgementCompany",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDisLodgeCompany.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementList",
                path: "fundDisLodgementList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeSubmitDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementSubmissionDetails",
                path: "fundDisLodgementSubmissionDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeSubmitDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementFMReview",
                path: "fundDisLodgementFMReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeFMReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundDisLodgementSubmissionList",
                path: "fundDisLodgementSubmissionList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorFundDislodgeSubmitList.vue"
                    ),
                props: true,
            },
            // FUND DISLODGEMENT - Acap - END
            // Fund Termination/Suspension/Closure - Manish - Start
            {
                name: "fund_ApplicationList",
                path: "fund_ApplicationList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundApplicationList.vue"
                    ),
                props: true,
            },

            {
                name: "fund_ApplicationDetails",
                path: "fund_ApplicationDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundApplicationDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fund_ApplicationFMList",
                path: "fund_ApplicationFMList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundManagerFundApplicationList.vue"
                    ),
                props: true,
            },
            {
                name: "fund_ApplicationFMReview",
                path: "fund_ApplicationFMReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributorfundApplicationReview.vue"
                    ),
                props: true,
            },
            // Fund Termination/Suspension/Closure - Manish - End
            // NAV Daily Update -  Manish - Start

            {
                name: 'navUpdateVerifyList',
                path: 'navUpdateVerifyList',
                component: () =>
                    import (
                        '../pages/funds-malaysia/distributor/cm5_distributor_NAVDailyUpdateList.vue'
                    ),
                props: true,
            },
            {
                name: 'navDailyUpdate',
                path: 'navDailyUpdate',
                component: () =>
                    import (
                        '../pages/funds-malaysia/distributor/cm5_distributor_NAVDailyUpdate.vue'
                    ),
                props: true,
            },
            {
                name: 'fundDetailUpdateVerify',
                path: 'fundDetailUpdateVerify',
                component: () =>
                    import (
                        '../pages/funds-malaysia/distributor/cm5_distributor_funddailyupdateverify.vue'
                    ),
                props: true,
            },
            {
                name: 'navUpdateVerify',
                path: 'navUpdateVerify',
                component: () =>
                    import (
                        '../pages/funds-malaysia/distributor/cm5_distributor_NAVUpdatetVerify.vue'
                    ),
                props: true,
            },
            // NAV Daily Update - Manish - End
            // NAV Management -  Acap - Start
            // NAV Management - Acap - End
            // Funds Management - Acap - START
            {
                name: "fundManagementList",
                path: "fundManagementList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_MemberFundList.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementFundList",
                path: "fundManagementFundList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeFundList.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementEdit",
                path: "fundManagementEdit",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeDetails.vue"
                    ),
                props: true,
            },

            {
                name: "fundManagementDetailReview",
                path: "fundManagementDetailReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeDetailsReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementFundNotesDetailReview",
                path: "fundManagementFundNotesDetailReview",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeFundNotesDetailsReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementSecondLevelApprovalList",
                path: "fundManagementSecondLevelApprovalList",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundSecondApprovalList.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementSecondLevelApproval",
                path: "fundManagementSecondLevelApproval",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundSecondApproval.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementSecondLevelApprovalFundNotes",
                path: "fundManagementSecondLevelApprovalFundNotes",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundSecondApprovalFundNotes.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementEditSelect",
                path: "fundManagementEditSelect",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeSelect.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementEditDetails",
                path: "fundManagementEditDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeDetails.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementReviewFundDetails",
                path: "fundManagementReviewFundDetails",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeDetailsFMReview.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementReviewFundNotes",
                path: "fundManagementReviewFundNotes",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeDetailsFMFundNotes.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementEditFundNotes",
                path: "fundManagementEditFundNotes",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeFundNotes.vue"
                    ),
                props: true,
            },
            {
                name: "fundManagementEditFundNotesReturn",
                path: "fundManagementEditFundNotesReturn",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_FundChangeFundNotesReturn.vue"
                    ),
                props: true,
            },
            // Funds Management - Acap - END
            // NAV Daily Update - manish - START
            {
                name: "navDailyUpdate",
                path: "navDailyUpdate",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_NAVDailyUpdate.vue"
                    ),
                props: true,
            },

            {
                name: "navUpdateVerify",
                path: "navUpdateVerify",
                component: () =>
                    import (
                        "../pages/funds-malaysia/distributor/cm5_distributor_NAVUpdatetVerify.vue"
                    ),
                props: true,
            },
            // NAV Daily Update - manish - START

            // *******************************ACAP - END****************************************

            // *******************************SYAHRIN - START****************************************
            // *******************************SYAHRIN - END****************************************

            // *******************************SABIR - START****************************************
            // *******************************SABIR - END****************************************

            // *******************************TAHMINA - START****************************************
            // FMS DASHBOARD Link
            {
                name: "fms-dashboard",
                path: "/fms/dashboard",
                component: () =>
                    import ("../components/dashboard_fms/dashboard.vue"),
            },
            // Distributor DASHBOARD Link
            {
                name: "distributor-dashboard",
                path: "dashboard",
                component: () =>
                    import ("../components/dashboard_distributor/dashboard.vue"),
                // default: true,
            },
            // CPD DASHBOARD Link
            {
                name: "cpd-dashboard",
                path: "/cpd/dashboard",
                component: () =>
                    import ("../components/dashboard_cpd/dashboard.vue"),
            },
            // FMS DASHBOARD - TAHMINA - END
            // *******************************TAHMINA - END****************************************

            // *******************************SANTOSH - START****************************************
            // *******************************SANTOSH - END****************************************

            // *******************************BINAY - START****************************************
            // CONSULTANT REGISTRATION APPROVAL
            {
                name: 'consultant-registration-approval-Admin',
                path: 'consultant-registration-approval-Admin',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_registration_approval_Admin.vue'
                    ),
            },
            {
                name: 'consultant-registration-approval-Manager',
                path: 'consultant-registration-approval-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_registration_approval_Manager.vue'
                    ),
            },

            // TERMINATION DISTRIBUTOR
            {
                name: 'consultant-termination-Distributor',
                path: 'consultant-termination-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_Distributor.vue'
                    ),
            },
            {
                name: 'consultant-termination-viewList-Distributor',
                path: 'consultant-termination-viewList-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_viewList_DistributorAdmin.vue'
                    ),
            },
            {
                name: 'consultant-termination-viewList-Distributor-Manager',
                path: 'consultant-termination-viewList-Distributor-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_viewList_DistributorManager.vue'
                    ),
            },
            {
                name: 'consultant-termination-Second_Level',
                path: 'consultant-termination-Second_Level',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_Second_Level.vue'
                    ),
            },
            {
                name: 'consultant-termination-detail-distirbutor',
                path: 'consultant-termination-detail-distirbutor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_details_Distributor.vue'
                    ),
            },
            {
                name: 'consultant-termination-Second_Level_status_list',
                path: 'consultant-termination-Second_Level_status_list',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_statusList_Distributor.vue'
                    ),
            },
            {
                name: 'consultant-termination-approved-by-HOD-RD',
                path: 'consultant-termination-approved-by-HOD-RD',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_termination_approved_by_HOD-RD.vue'
                    ),
            },

            //APPEAL
            {
                name: 'consultant-appeal-Admin',
                path: 'consultant-appeal-Admin',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_appeal_Admin.vue'
                    ),
            },
            {
                name: 'consultantappealManager',
                path: 'consultant-appeal-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_appeal_Manager.vue'
                    ),
            },

            // RESIGNATION
            {
                name: 'consultant-resignation-review-Manager',
                path: 'consultant-resignation-review-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_resignation_review_Manager.vue'
                    ),
            },
            {
                name: 'consultant-resignation-review-Reviewer',
                path: 'consultant-resignation-review-Reviewer',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_resignation_review_Reviewer.vue'
                    ),
            },
            {
                name: 'consultant-resignation-review-Reviewer-overviewList',
                path: 'consultant-resignation-review-Reviewer-overviewList',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_resignation_review_Reviewer_overviewList.vue'
                    ),
            },
            {
                name: 'consultant-resignation-review-Manager-overviewList',
                path: 'consultant-resignation-review-Manager-overviewList',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_resignation_review_Manager_overviewList.vue'
                    ),
            },

            //RENEWAL
            {
                name: 'consultant-renewal-Admin',
                path: 'consultant-renewal-Admin',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/cm02_consultant_renewal_Admin.vue'
                    ),
            },

            {
                name: 'consultant-renewal-Admin-list',
                path: 'consultant-renewal-Admin-list',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/cm02_consultant_renewal_Admin_list.vue'
                    ),
            },

            {
                name: 'consultant-renewal-Admin-list-status',
                path: 'consultant-renewal-Admin-list-status',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/cm02_consultant_renewal_Admin_list_status.vue'
                    ),
            },

            {
                name: 'consultant-non-renewal-Reviewer',
                path: 'consultant-non-renewal-Reviewer',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/reviewer/cm02_consultant_renewal_Reviewer.vue'
                    ),
            },

            {
                name: 'consultant-non-renewal-Reviewer-list',
                path: 'consultant-non-renewal-Reviewer-list',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/reviewer/cm02_consultant_renewal_Reviewer_list'
                    ),
            },

            {
                name: 'consultant-renewal-Manager',
                path: 'consultant-renewal-Manager',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/manager/cm02_consultant_renewal_Manager.vue'
                    ),
            },

            {
                name: 'consultant-non-renewal-Manager-list',
                path: 'consultant-non-renewal-Manager-list',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/renewal/manager/cm02_consultant_renewal_Manager_list'
                    ),
            },

            //BANKRUPTCY
            {
                name: 'consultant-bankruptcy-check-Distributor',
                path: 'consultant-bankruptcy-check-Distributor',
                component: () =>
                    import (
                        '../pages/consultant-management/distributor/cm02_consultant_bankruptcy_check_Distributor.vue'
                    ),
            },

            //CONSULTANT-LIST
            {
                name: 'consultant-list',
                path: 'consultant-list',
                component: () =>
                    import (
                        '../pages/consultant-management/fimm/cm02_consultant_list.vue'
                    ),
            },

            // *******************************BINAY - END****************************************

            // *******************************KUMAR - START****************************************
            // *******************************KUMAR - END****************************************

            // *******************************PRAJWAL - START****************************************

            //CPD == POST-VETTING
            {
                name: "cpd-dashboard",
                path: "/cpd/dashboard",
                component: () =>
                    import ("../components/dashboard_cpd/dashboard.vue"),
            },
            {
                name: "d-moduleSelectionList",
                path: "d-moduleSelectionList",

                component: () =>
                    import (
                        "../pages/continuing-development/distributor/cm04_d_moduleSelectionList.vue"
                    ),
            },

            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingAppealProgram",
                path: "d-postVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewParticipant",
                path: "d-postVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatedViewParticipant",
                path: "d-postVettingRepeatedViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvettingRepeated_viewParticipant.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },

            {
                name: "d-postVettingProgramList",
                path: "d-postVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_programList.vue"
                    ),
            },
            {
                name: "d-postVettingNewSubmission",
                path: "d-postVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingRepeatSubmission",
                path: "d-postVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramDetails",
                path: "d-postVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-postVettingAmendProgram",
                path: "d-postVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostvetting_amendProgram.vue"
                    ),
            },
            {
                name: "d-postVettingEditProgram",
                path: "d-postVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-postVettingViewProgramList",
                path: "d-postVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/postVetting/cm04_dPostVetting_viewProgramList.vue"
                    ),
            },

            // PRE-VETTING
            {
                name: "d-preVettingAppealProgram",
                path: "d-preVettingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_appealProgram.vue"
                    ),
            },
            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },
            {
                name: "d-preVettingEditProgram",
                path: "d-preVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramDetails",
                path: "d-preVettingViewProgramDetails",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramDetails.vue"
                    ),
            },
            {
                name: "d-preVettingViewDetailParticipant",
                path: "d-preVettingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_apprPreVetting_viewParticipant.vue"
                    ),
            },

            {
                name: "d-preVettingProgramList",
                path: "d-preVettingProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_programList.vue"
                    ),
            },
            {
                name: "d-preVettingNewSubmission",
                path: "d-preVettingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_newSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingRepeatSubmission",
                path: "d-preVettingRepeatSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_repeatSubmission.vue"
                    ),
            },
            {
                name: "d-preVettingViewProgramList",
                path: "d-preVettingViewProgramList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_viewProgramList.vue"
                    ),
            },
            {
                name: "d-preVettingAmendProgram",
                path: "d-preVettingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevettig_amendProgram.vue"
                    ),
            },
            {
                name: "d-preVettingEditProgram",
                path: "d-preVettingEditProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPreVetting_editProgram.vue"
                    ),
            },
            {
                name: "d-preVettingViewParticipant",
                path: "d-preVettingViewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_viewParticipant.vue"
                    ),
            },
            {
                name: "d-participants",
                path: "d-participants",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/preVetting/cm04_dPrevetting_Participants.vue"
                    ),
            },

            // cpd -dist 5 modules
            // writing
            {
                name: "d-writingModuleList",
                path: "d-writingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_list.vue"
                    ),
            },
            {
                name: "d-writingNewSubmission",
                path: "d-writingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_newSubmission.vue"
                    ),
            },
            {
                name: "d-writingEditSubmission",
                path: "d-writingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_editSubmission.vue"
                    ),
            },
            {
                name: "d-writingViewDetailParticipant",
                path: "d-writingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-writingAmend",
                path: "d-writingAmend",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_ammend.vue"
                    ),
            },
            {
                name: "d-writingAmendProgram",
                path: "d-writingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_ammend.vue"
                    ),
            },

            {
                name: "d-writingAppealProgram",
                path: "d-writingAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/writing/cm04_dWriting_appealProgram"
                    ),
            },

            // Reading
            {
                name: "d-readingModuleList",
                path: "d-readingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_list.vue"
                    ),
            },
            {
                name: "d-readingNewSubmission",
                path: "d-readingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_newSubmission.vue"
                    ),
            },
            {
                name: "d-readingEditSubmission",
                path: "d-readingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_editSubmission.vue"
                    ),
            },
            {
                name: "d-readingAmendProgram",
                path: "d-readingAmendProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/reading/cm04_dReading_ammend.vue"
                    ),
            },
            {
                name: "d-readingViewDetailParticipant",
                path: "d-readingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },

            // teaching
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },
            {
                name: "d-teachingNewSubmission",
                path: "d-teachingNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_newSubmission.vue"
                    ),
            },
            {
                name: "d-teachingViewDetailParticipant",
                path: "d-teachingViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-teachingEditSubmission",
                path: "d-teachingEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_editSubmission.vue"
                    ),
            },
            {
                name: "d-teachingModuleList",
                path: "d-teachingModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/teaching/cm04_dTeaching_list.vue"
                    ),
            },

            // academic
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },
            {
                name: "d-academicNewSubmission",
                path: "d-academicNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_newSubmission.vue"
                    ),
            },
            {
                name: "d-academicEditSubmission",
                path: "d-academicEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_editSubmission.vue"
                    ),
            },
            {
                name: "d-academicViewDetailParticipant",
                path: "d-academicViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-academicModuleList",
                path: "d-academicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/academic/cm04_dAcademic_list.vue"
                    ),
            },

            // fpam
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },
            {
                name: "d-fpEditSubmission",
                path: "d-fpEditSubmission/:id",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFP_editSubmission.vue"
                    ),
            },
            {
                name: "d-fpamCertifiedModuleList",
                path: "d-fpamCertifiedModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpAppealProgram",
                path: "d-fpAppealProgram",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_appealProgram"
                    ),
            },
          {
                name: "d-fP_viewParticipant",
                path: "d-fP_viewParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_fPviewParticipant"
                    ),
            },
            {
                name: "d-fpamCertifiedModuleNewSubmission",
                path: "d-fpamCertifiedModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/certified-financial/cm04_dCertified_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamIslamicModuleList",
                path: "d-fpamIslamicModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamIslamicModuleNewSubmission",
                path: "d-fpamIslamicModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/islamic-financial/cm04_dIslamic_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamRegisteredModuleList",
                path: "d-fpamRegisteredModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamRegisteredModuleNewSubmission",
                path: "d-fpamRegisteredModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/registered-financial/cm04_dRegistered_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpamShariahModuleList",
                path: "d-fpamShariahModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_d_module_list.vue"
                    ),
            },
            {
                name: "d-fpamShariahModuleNewSubmission",
                path: "d-fpamShariahModuleNewSubmission",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/shariah-registered/cm04_dShariah_module_newSubmission.vue"
                    ),
            },
            {
                name: "d-fpViewDetailParticipant",
                path: "d-fpViewDetailParticipant",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/components/viewParticipant.vue"
                    ),
            },
            {
                name: "d-fpamModuleList",
                path: "d-fpamModuleList",
                component: () =>
                    import (
                        "../pages/continuing-development/distributor/modules/fpam/cm04_dFpam_list.vue"
                    ),
            },

            // *******************************PRAJWAL - END****************************************
        ],
        beforeEnter: ifAuthenticatedDistributor,
    },
];