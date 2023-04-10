export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    //  {
    //   name: '',
    //   displayName: 'Proceed to My Profile',
    //   meta: {
    //     iconClass: 'fa fa-user',
    //   },
    // },
    // {
    //   name: '',
    //   displayName: 'Re-register As a Consultant',
    //   meta: {
    //     iconClass: 'fa fa-id-card-o',
    //   },
    // },
    // {
    //   name: '',
    //   displayName: 'Expand My Registration',
    //   meta: {
    //     iconClass: 'fa fa-sitemap',
    //   },
    // },
    // {
    //   name: '',
    //   displayName: 'Re-schedule Examination',
    //   meta: {
    //     iconClass: 'fa fa-calendar',
    //   },
    // },
    //* ****************************************** */
    {
      name: 'esc-dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'distributor-management',
      displayName: 'Distributor Management',
      meta: {
        iconClass: 'fa fa-university',
      },
      disabled: true,
      children: [
        {
          name: 'distributor-dashboard',
          displayName: 'Dashboard',
        },
        {
          name: 'distributor-master-list',
          displayName: 'Distributor List',
        },
        // {
        //     name: 'distributor-self-registration',
        //     displayName: 'Self Registration',
        // },
        {
          name: 'distributor-details-registration',
          displayName: 'New Distributor Registration',
        },
        {
          name: 'distributor-SubmissionList-rdApproval',
          displayName: 'Submission List (RD)',
        },
        {
          name: 'distributor-SubmissionList-HODrdApproval',
          displayName: 'Submission List (HOD-RD)',
        },
        {
          name: 'distributor-SubmissionList-lraApproval',
          displayName: 'Submission List (LRA)',
        },
        {
          name: 'distributor-SubmissionList-supervisionApproval',
          displayName: 'Submission List (SUV)',
        },
        {
          name: 'distributor-SubmissionList-gmApproval',
          displayName: 'Submission List (GM)',
        },
        {
          name: 'distributor-SubmissionList-ceoApproval',
          displayName: 'Submission List (CEO)',
        },
        {
          name: 'distributor-SubmissionList-boardApproval',
          displayName: 'Submission List (BOD)',
        },
        {
          name: 'distributor-profile',
          displayName: 'Distributor Profile',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-rdApproval',
          displayName: 'New Type Registration Submission List (RD)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-HODrdApproval',
          displayName: 'New Type Registration Submission List (HOD-RD)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-lraApproval',
          displayName: 'New Type Registration Submission List (LRA)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-supervisionApproval',
          displayName: 'New Type Registration Submission List (SUV)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-gmApproval',
          displayName: 'New Type Registration Submission List (GM)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-ceoApproval',
          displayName: 'New Type Registration Submission List (CEO)',
        },
        {
          name: 'distributor-RegisterType-SubmissionList-boardApproval',
          displayName: 'New Type Registration Submission List (BOD)',
        },
        {
          name: 'distributor-UpdateDetails-SubmissionList-secondApproval',
          displayName: 'Distributor Update Submission List (2nd Level)',
        },
        {
          name: 'distributor-UpdateDetails-SubmissionList-RDApproval',
          displayName: 'Distributor Update Submission List (RD)',
        },
        {
          name: 'cessation-submission',
          displayName: 'Cessation Submission (DIST)',
        },
        {
          name: 'cessation-submission-manager-approval',
          displayName: 'Cessation Submission (DIST MANAGER)',
        },
        {
          name: 'cessation-submission-overview-list',
          displayName: 'Cessation Submission Record (FIMM)',
        },
        {
          name: 'cessation-submission-list',
          displayName: 'Cessation Submission List (RD)',
        },
        {
          name: 'cessation-submission-hod-list',
          displayName: 'Cessation Submission List (HOD)',
        },
        {
          name: 'DistributorDivestment-List',
          displayName: 'Divestment Application',
        },
        {
          name: 'DistributorDivestment-ApprovalList',
          displayName: 'Divestment Approval (DIST)',
        },
        {
          name: 'distributor-DivestmentList-rdApproval',
          displayName: 'Divestment Approval (RD)',
        },
        {
          name: 'distributor-DivestmentList-Hod-rdApproval',
          displayName: 'Divestment Approval (HOD RD)',
        },

        {
          name: 'extension-request',
          displayName: 'Extension Request (DIST)',
        },
        {
          name: 'fimm-extension-request',
          displayName: 'Extension Request (FIMM)',
        },
        {
          name: 'subsequent-extension-request',
          displayName: 'Subsequent Extension Request (DIST)',
        },
        {
          name: 'fimm-subsequent-extension-request',
          displayName: 'Subsequent Extension Request (FIMM)',
        },
        {
          name: 'extension-request',
          displayName: 'Extension Approval',
        },

        {
          name: 'candidateAcceptance-list',
          displayName: 'Acceptance List',
        },
        {
          name: 'distribution-point-list',
          displayName: 'Distribution Point',
        },
        {
          name: 'distributor-user-profile-set-up',
          displayName: 'New User Details and Role Selection',
        },
        {
          name: 'distributor-user-management-list-status',
          displayName: 'New User Application Status',
        },
        // {
        //     name: 'distributor-user-role-list',
        //     displayName: 'Role Selection Approval'
        // },
        {
          name: 'distributor-user-management-list',
          displayName: 'User Management',
        },
        // {
        //     name: 'distributor-user-role-list',
        //     displayName: 'User Role Application',
        // },
        {
          name: 'suspension-revocation-list',
          displayName: 'Suspension&Revocation (RD)',
        },
        {
          name: 'suspension-hodApproval-list',
          displayName: 'Suspension Submission List (HOD) ',
        },
        {
          name: 'suspension-gmApproval-list',
          displayName: 'Suspension Submission List (GM) ',
        },
        {
          name: 'suspension-ceoApproval-list',
          displayName: 'Suspension Submission List (CEO) ',
        },
        {
          name: 'revocation-hodApproval-list',
          displayName: 'Revocation Submission List (HOD) ',
        },
        {
          name: 'revocation-gmApproval-list',
          displayName: 'Revocation Submission List (GM) ',
        },
        {
          name: 'revocation-ceoApproval-list',
          displayName: 'Revocation Submission List (CEO) ',
        },
        {
          name: 'suspension-revocation-notification-list',
          displayName: 'Suspension&Revocation (DIST)',
        },
        {
          name: 'appeal-suspension-revocation-list',
          displayName: 'Appeal Submission List (RD)',
        },
        {
          name: 'appealSuspension-hodApproval-list',
          displayName: 'Suspension Appeal Submission List (HOD)',
        },
        {
          name: 'appealSuspension-gmApproval-list',
          displayName: 'Suspension Appeal Submission List (GM)',
        },
        {
          name: 'appealSuspension-ceoApproval-list',
          displayName: 'Suspension Appeal Submission List (CEO)',
        },
        {
          name: 'appealRevocation-hodApproval-list',
          displayName: 'Revocation Appeal Submission List (HOD)',
        },
        {
          name: 'appealRevocation-gmApproval-list',
          displayName: 'Revocation Appeal Submission List (GM)',
        },
        {
          name: 'appealRevocation-ceoApproval-list',
          displayName: 'Revocation Appeal Submission List (CEO)',
        },

      ],
    },

    {
      name: 'consultant-management',
      displayName: 'Consultant Management',
      meta: {
        iconClass: 'fa fa-id-card-o',
      },
      disabled: true,
      children: [
        {
          name: 'consultant-dashboard',
          displayName: 'Dashboard',
        },
        {
          name: 'distributor-list',
          displayName: 'Distributor List',
        },
        {
          name: 'consultant-list',
          displayName: 'Consultant List',
        },
        // {
        //   name: 'consultant-new-submission',
        //   displayName: 'New Registration',
        // },
        // {
        //   name: 'consultant-registration-New-Candidate',
        //   displayName: 'New Candidate Registration',
        // },
        // {
        //   name: 'consultant-registration-update',
        //   displayName: 'Re-Register - Consultant',
        // },
        {
          name: 'consultant-registration-approval-Admin',
          displayName: 'Registration Approval - Admin',
        },
        {
          name: 'consultant-registration-approval-Manager',
          displayName: 'Registration Approval - Manager',
        },
        {
          name: 'consultant-registration-approval-RD',
          displayName: 'Registration Approval - RD',
        },
        // {
        //   name: 'consultant-re-register',
        //   displayName: 'Re-Register',
        // },
        // {
        //   name: 'consultant-profile-Consultant',
        //   displayName: 'Profile',
        // },
        {
          name: 'consultant-profile-update-Distributor',
          displayName: ' Profile Update - Distributor',
        },
        // {
        //   name: 'consultant-termination-review',
        //   displayName: 'Consultant Termination Request',
        // },
        {
          name: 'consultant-termination-RD',
          displayName: 'Consultant Termination - RD',
        },
        {
          name: 'consultant-termination-RD_HOD',
          displayName: 'Consultant Termination - RD HOD',
        },
        {
          name: 'consultant-termination-GM',
          displayName: 'Consultant Termination - GM',
        },
        {
          name: 'consultant-termination-CEO',
          displayName: 'Consultant Termination - CEO',
        },
        {
          name: 'consultant-termination-Distributor',
          displayName: 'Consultant Termination - Admin',
        },
        {
          name: 'consultant-termination-Second_Level',
          displayName: 'Consultant Termination - Manager',
        },
        // {
        //   name: 'consultant-resignation-Consultant',
        //   displayName: 'Consultant Resignation - Consultant',
        // },
        {
          name: 'consultant-resignation-review-Reviewer',
          displayName: 'Consultant Resignation Review - Admin',
        },
        {
          name: 'consultant-resignation-review-Manager',
          displayName: 'Consultant Resignation Review - Manager',
        },
        // {
        //   name: 'consultant-reschedule-Consultant',
        //   displayName: 'Re-schedule',
        // },
        {
          name: 'consultant-bankruptcy-check-RD',
          displayName: 'Bankruptcy Check - RD',
        },
        {
          name: 'consultant-bankruptcy-check-Distributor',
          displayName: 'Bankruptcy Check - Distributor',
        },
        {
          name: 'consultant-renewal-Admin',
          displayName: 'Renewal - Admin',
        },
        {
          name: 'consultant-non-renewal-Reviewer',
          displayName: 'Renewal - Reviewer',
        },
        {
          name: 'consultant-renewal-Manager',
          displayName: 'Renewal - Manager',
        },
        // {
        //   name: 'consultant-appeal-Consultant',
        //   displayName: 'Appeal - Consultant',
        // },
        {
          name: 'consultant-appeal-Admin',
          displayName: 'Appeal - Admin',
        },
        {
          name: 'consultantappealManager',
          displayName: 'Appeal - Manager',
        },
        {
          name: 'consultantappealRD',
          displayName: 'Appeal - RD',
        },
        // {
        //   name: 'consultant-resit-Consultant',
        //   displayName: 'Re-sit',
        // },
        // {
        //   name: 'consultant-cancellation-submission',
        //   displayName: 'Cancellation Submission',
        // },
        // {
        //   name: 'd-distributor-consultantReviewProfile',
        //   displayName: 'Applicant Profile',
        // },
        // {
        //   name: 'd-distributor-consultantAppeal',
        //   displayName: 'Applicant Appeal',
        // },
        // {
        //   name: 'consultant-details-registration',
        //   displayName: 'Applicant Exam Registration',
        // },
        // {
        //   name: 'consultant-details-registration-1',
        //   displayName: 'Applicant Exam Registration 1 Preferred Date',
        // },
      ],
    },
    {
      name: 'consultant-alert',
      displayName: 'Consultant Alert',
      meta: {
        iconClass: 'fa fa-balance-scale',
      },
      disabled: true,
      children: [{
        name: 'cas-dashboard',
        displayName: 'Dashboard',
      },
      {
        name: 'consultantAlert-recordList',
        displayName: 'Consultant Alert Record',
      },
      {
        name: 'consultantAlert-hodLraRecordList',
        displayName: 'Verification Request List',
      },
      {
        name: 'consultantAlert-gmLraRecordList',
        displayName: 'Approval Request List',
      },
      ],
    },

    {
      name: 'cpd',
      displayName: 'CPD Management',
      meta: {
        iconClass: 'fa fa-list',
      },
      disabled: true,
      children: [{
        name: 'cpd-dashboard',
        displayName: 'Dashboard',
      },
      {
        name: 'd-moduleSelectionList',
        displayName: 'Modules Selection (DIST)',
      },
      {
        name: 'f-moduleSelectionList',
        displayName: 'Modules Selection (FTR)',
      },
      {
        name: 't-preVettingProgramList',
        displayName: 'Pre-Vetting (TRP)',
      },
      {
        name: 'approval-selectionList',
        displayName: 'Approval Module Selection',
      },
      {
        name: 'appeal-selectionList',
        displayName: 'Appeal Module Selection',
      },
      {
        name: 'f-approvalViewDetailParticipant',
        displayName: 'Consultant Points',
      },
      {
        name: 'trp-submission-list',
        displayName: 'Training Provider Registration (FIMM ID)',
      },

      ],
    },

    {
      name: 'annual-fee',
      displayName: 'Annual Fees',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-statistics',
      },
      disabled: true,
      children: [{
        name: 'AnnualFee-FundSubmission-Approval',
        displayName: 'Annual Fees Verification (R&A)',
      },
      {
        name: 'distributor-Submission',
        displayName: 'Fund Value Entry',
      },
      {
        name: 'DistributorManager-Submission',
        displayName: 'Fund Value Approval (DIST MANAGER)',
      },
      {
        name: 'DistributorCompliance-Submission',
        displayName: 'Fund Value Approval (COMP OFFICER)',
      },
      {
        name: 'AnnualFee-RD-Verification-list',
        displayName: 'Annual Fees Verification (RD)',
      },
      {
        name: 'AnnualFee-HODRD-Verification-list',
        displayName: 'Annual Fees Verification (HOD RD)',
      },
      {
        name: 'AnnualFee-FIN-Verification-list',
        displayName: 'Annual Fees Verification (FIN)',
      },
      {
        name: 'AnnualFee-HODFIN-Verification-list',
        displayName: 'Annual Fees Verification (HOD FIN)',
      },
      ],
    },
    {
      name: 'finance-management',
      displayName: 'Finance Management',
      meta: {
        iconClass: 'fa fa-money',
      },
      disabled: true,
      children: [
        {
          name: 'finance-dashboard',
          displayName: 'Dashboard',
        },
        {
          name: 'Registration-Payment',
          displayName: 'Registration Payment',
        },
        {
          name: 'distributor-prepayment-topup-list',
          displayName: 'Distributor Pre-Payment Topup',
        },

        {
          name: 'PrepaymentTopup-list',
          displayName: 'Pre-payment Top up',
        },
        {
          name: 'distributor-AMSF-Collection-List',
          displayName: 'Distributor AMSF Collections',
        },
        {
          name: 'AMSFCollection-list',
          displayName: 'AMSF Collection',
        },
        {
          name: 'PrepaymentRefundSubmissionForExamWaiver',
          displayName: 'Pre-payment Refund Submission',
        },
        {
          name: 'PrePayment-Refund',
          displayName: 'Pre-payment Refund',
        },
        {
          name: 'Transaction-Ledger',
          displayName: 'Transaction Ledger',
        },
        {
          name: 'distributor-Transaction-List',
          displayName: 'Distributor Transaction Ledger',
        },
      ],
    },
    {
      name: 'fundManagement-default',
      displayName: 'Fund Management',
      meta: {
        iconClass: 'fa fa-dollar',
      },
      disabled: true,
      children: [
        // Fund Profile Master List
        // SM601 Fund Creation
        {
          name: 'fms-dashboard',
          displayName: 'Dashboard',
        },
        {
          name: 'fundCreationlist',
          displayName: 'Fund Creation (Admin Distributor)',
        },
        {
          name: 'fundCreationSecondLevelReviewlist',
          displayName: 'Fund Creation (Fund Manager Distributor)',
        },
        {
          name: 'fundCreation-Company',
          displayName: 'Fund Creation  (FIMM)',
        },
        // SM602 fund lodgement
        {
          name: 'fundLodgementList',
          displayName: 'Fund Lodgement (Admin Distributor)',
        },
        {
          name: 'fundLodgementSubmissionList',
          displayName: 'Fund Lodgement (Reviewer Distributor)',
        },
        {
          name: 'fundLodge-submitList',
          displayName: 'Fund Lodgement (FIMM)',
        },
        // SM609 Fund Dislodgement
        {
          name: 'fundDisLodgementFundHouse',
          displayName: ' Fund Dislodgement (Admin Distributor)',
        },
        {
          name: 'fundDisLodgementSubmissionList',
          displayName: 'Fund Dislodgement (Reviewer Distributor)',
        },

        // SM603 fund deletion/suspension/closure
        {
          name: 'fund_ApplicationList',
          displayName: 'Fund Application (Admin Distributor)',
        },
        {
          name: 'fund_ApplicationFMList',
          displayName: 'Fund Application (Fund Manager Distributor)',
        },
        {
          name: 'fundApplication-SubmitList',
          displayName: 'Fund Application (FIMM)',
        },
        // SM604 NAV Daily Publish
        {
          name: 'nav-list',
          displayName: 'NAV Daily Publish',
        },
        // SM605 NAV Daily Update
        {
          name: 'navUpdateVerifyList',
          displayName: 'NAV Daily Update (Admin Distributor)',
        },
        {
          name: 'fundDetailUpdateVerify',
          displayName: 'NAV Daily Update (Fund Manager Distributor)',
        },
        // SM606 NAV Management
        {
          name: 'navManagement',
          displayName: 'NAV Management',
        },
        {
          name: 'navSecondLevelApproval',
          displayName: 'NAV Management (Fund Manager Distributor)',
        },
        {
          name: 'nav-id-approval',
          displayName: 'NAV Management (FIMM ID)',
        },

        {
          name: 'nav-hod-id-review',
          displayName: 'NAV Management (FIMM HOD ID)',
        },

        // SM607 Fund Management
        {
          name: 'fundManagementList',
          displayName: 'Fund Management List (Admin Distributor)',
        },
        // {
        //   name: 'fundManagementEdit',
        //   displayName: 'Fund Management Edit',
        // },
        {
          name: 'fundManagementSecondLevelApprovalList',
          displayName: 'Fund Management (Fund Manager Distributor)',
        },
        // {
        //   name: 'fundManagementSecondLevelApproval',
        //   displayName: 'Fund Management FM Approval',
        // },
        {
          name: 'fund-changes-list',
          displayName: 'Fund Management (FIMM ID)',
        },
        // SM608 3rd party company Registration
        {
          name: 'thirdparty-submission-list',
          displayName: '3RD Party Company Registration (FIMM ID)',
        },

      ],
    },
    {
      name: 'system-setting',
      displayName: 'System Settings',
      meta: {
        iconClass: 'fa fa-gear',
      },
      disabled: true,
      children: [{
        name: 'login-setting',
        displayName: 'Login Setting',
      },
      {
        name: 'password-setting',
        displayName: 'Password Setting',
      },
      {
        name: 'user-id-setting',
        displayName: 'User ID Setting',
      },
      {
        name: 'screen-management-setting',
        displayName: 'Screen Management Setting',
      },
      {
        name: 'other-access-setting',
        displayName: 'Other Setting',
      },
      {
        name: 'integration-setting',
        displayName: 'Integration Setting',
      },
      {
        name: 'inactive-user-setting',
        displayName: 'Inactive User',
      },
      {
        name: 'address-management',
        displayName: 'Address Setting',
      },
      {
        name: 'masking',
        displayName: 'ID Masking Setting',
      },
      {
        name: 'dummy-distributor',
        displayName: 'Dummy Distributor Management',
      },
      {
        name: 'colour-setting',
        displayName: 'Colour Template Setting',
      },
      {
        name: 'calendar-management',
        displayName: 'Calendar Setting',
      },
      {
        name: 'announcement-setting',
        displayName: 'Announcement Setting',
      },
      {
        name: 'announcement-hod-review-setting',
        displayName: 'Announcement HOD Approval',
      },
      {
        name: 'circular-setting',
        displayName: 'Circular Setting',
      },
      {
        name: 'circular-hod-review-setting',
        displayName: 'Circular HOD Approval',
      },
      {
        name: 'circular-gm-review-setting',
        displayName: 'Circular GM Approval',
      },
      {
        name: 'document-form-setting',
        displayName: 'Document and Form Template',
      },
      {
        name: 'page-maintanance-setting',
        displayName: 'Page Maintenance Management',
      },
      // {
      //   name: 'page-maintanance-setting',
      //   displayName: 'ID Masking',
      // },
      {
        name: 'fee-management-setting',
        displayName: 'Fee Management',
      },
      {
        name: 'bymodule-list',
        displayName: 'Setting By Module',
      },
      {
        name: 'general-setting',
        displayName: 'General Setting',
      },
      {
        name: 'dashboard-main-setting',
        displayName: 'Dashboard Setting',
      },
      {
        name: 'purge-data-setting',
        displayName: 'Purge Data Setting',
      },
      {
        name: 'user-management-application',
        displayName: 'User Management',
      },
      {
        name: 'data-retention-setting',
        displayName: 'Data Retention Settings',
      },

      ],
    },
    {
      name: 'exam-operation',
      displayName: 'Exam operation',
      meta: {
        iconClass: 'fa fa-book',
      },
      disabled: true,
      children: [
        {
          name: 'list-company',
          displayName: 'Company Management',
        },
        {
          name: 'list-company-reviewer',
          displayName: 'Company Management (Reviewer)',
        },
        {
          name: 'list-company-approver',
          displayName: 'Company Management (Approver)',
        },
        {
          name: 'list-esc-centre-management',
          displayName: 'Centre Management',
        },
        {
          name: 'list-api-maintenance-screen',
          displayName: 'Class Marker Configuration',
        },
        {
          name: 'list-exam-type-details',
          displayName: 'Exam Type Details',
        },
        {
          name: 'list-exam-type-details-reviewer',
          displayName: 'Exam Type Details (Reviewer)',
        },
        {
          name: 'list-exam-type-details-approver',
          displayName: 'Exam Type Details (Approver)',
        },
        {
          name: 'list-exam-session-setting',
          displayName: 'Exam Session Setting',
        },
        {
          name: 'list-centre-based-exam-session-generation',
          displayName: 'Exam Session',
        },
        {
          name: 'exam-session-generation-reviewer',
          displayName: 'Exam Session (Reviewer)',
        },
        {
          name: 'exam-session-generation-approver',
          displayName: 'Exam Session (Approver)',
        },
        {
          name: 'exam-session-generation-esc',
          displayName: 'ESC Update',
        },
        {
          name: 'list-exam-result',
          displayName: 'Exam Result',
        },
        {
          name: 'list-consultant-appeal-review',
          displayName: 'Appeal for Exam Result',
        },
      ],
    },
    {
      name: 'esc-management',
      displayName: 'ESC Management',
      meta: {
        iconClass: 'fa fa-address-book-o',
      },
      disabled: true,
      children: [
        {
          name: 'esc-user-profile-set-up',
          displayName: 'ESC Profile',
        },
        {
          name: 'list-esc-profile',
          displayName: 'ESC Profile Management',
        },
        {
          name: 'list-esc-profile-approver',
          displayName: 'ESC Profile Management (Approver)',
        },
      ],
    },
    {
      name: 'report-main-setting',
      displayName: 'Reports',
      meta: {
        iconClass: 'fa fa-eye',
      },
    },
  ],
}
