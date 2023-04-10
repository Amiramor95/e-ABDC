<template>
  <div v-if="!savedConsultantDataLoaded">
    <b-card>
      <div class="text-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
        <p>Loading Data</p>
      </div>
    </b-card>
  </div>

  <div class="content" v-else>
    <b-overlay :show="show_overlay" rounded="sm">
      <div class="container-fluid">
        <div class="row mb-5">
          <div class="col-12">
            <va-card>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <h4 style="margin-top:0">Consultant Details</h4>
                <button
                  @click="goToEditProfilePage"
                  type="button"
                  class="ml-2 btn btn-primary btn-fill btn-md">
                  <!-- v-if="pauseData" > -->
                  <i class="fa fa-edit" /> &nbsp;Update
                </button>
              </div>
              <br />
              <div>
                <tabs
                  :tabs="tabs"
                  :currentTab="currentTab"
                  :wrapper-class="'default-tabs'"
                  :tab-class="'default-tabs__item'"
                  :tab-active-class="'default-tabs__item_active'"
                  :line-class="'default-tabs__active-line'"
                  @onClick="handleClick"
                />
                <div class="content">
                  <div v-if="currentTab === 'tab1'">
                    <div class="ml-4" v-if="savedConsultantData">
                      <registration-approval-log :consultantData="savedConsultantData"></registration-approval-log>
                      <br />
                      <profile-view  :consultantData1="applicant_details"
                        :consultantData="savedConsultantData" :general_settings="general_settings"></profile-view>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab2'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 15%">Agent Type</td>
                            <td>{{ savedConsultantData.CANDIDATE_CATEGORY }}</td>
                          </tr>
                          <tr v-if="savedConsultantData.CANDIDATE_CATEGORY == 'STAFF'">
                            <td style="width: 15%">Position</td>
                            <td>
                              {{ savedConsultantData.CANDIDATE_POSITION_CATEGORY }}
                              <span v-if="savedConsultantData.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ savedConsultantData.CANDIDATE_POSITION}}</span>
                            </td>
                          </tr>
                          <template v-if="cmsrl_load">
                            <tr>
                              <td colspan="4" style="font-weight:bold;">
                                CMSRL
                              </td>
                            </tr>
                            <tr>
                              <td>CMSRL NO</td>
                              <td>{{savedConsultantData.license.CMSRL_NO}}</td>
                            </tr>
                            <tr>
                              <td>CMSRL Expiry Date</td>
                              <td>{{savedConsultantData.license.CMSRL_EXPIRE_DATE}}</td>
                            </tr>
                            <tr>
                              <td>
                                CMSRL Certificate
                              </td>
                              <td>
                                <vue-form-generator
                                  :model="model2"
                                  :schema="fileUploadCMSRL"
                                  :options="formOptions"
                                  ref="fileUploadCMSRL"
                                >
                                </vue-form-generator>
                              </td>
                            </tr>
                            <tr>
                              <td>Apprenticenship Program</td>
                              <td>
                                <vue-form-generator
                                  :model="model3"
                                  :schema="fileUploadApprenticenship"
                                  :options="formOptions"
                                  ref="fileUploadApprenticenship"
                                >
                                </vue-form-generator></td>
                            </tr>
                            <template v-if="distributorCmsrlData">
                              <tr>
                                <td>RECRUITER CMSRL NO</td>
                                <td>{{distributorCmsrlData.DIST_FP_CSMRL}}</td>
                              </tr>
                              <tr>
                                <td>RECRUITER NRIC NO</td>
                                <td>{{distributorCmsrlData.DIST_FP_NRIC}}</td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </table>

                      <selected-license-table
                        :consultantData="savedConsultantData"
                        :license="savedConsultantData.license"
                        :licenseExmeption="savedConsultantData.license_exemption"
                        ref="consultantLicesnesData"
                        @openLicenseAddFormModel="onClickOpenAddLicenseModal">
                      </selected-license-table>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab3'">
                    <div class="ml-3">
                      <br />
                      <div v-if="savedConsultantData.license_exemption">
                        <exemption-data :consultantData="savedConsultantData"></exemption-data>
                      </div>

                      <div v-else>
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">License Type</th>
                              <th scope="col">Application Type</th>
                              <th scope="col">Examination Type</th>
                              <th scope="col">Result</th>
                              <th scope="col">Certificate</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(exam, index) in examdetails" :key="index">
                              <td scope="row">{{++index}}</td>
                              <td>{{exam.TYPE_FULL_NAME}}</td>
                              <td>{{exam.APPLICATION_TYPE_NAME}}</td>
                              <td>{{exam.EXAM_TYPE_NAME}}</td>
                              <td>
                                <span v-if="exam.RESULT==0">Fail</span>
                                <span v-else-if="exam.RESULT==1">
                                  Pass
                                </span>
                                <span v-else>
                                  -
                                </span>
                              </td>
                              <td>
                                <span v-if="exam.RESULT==1">
                                  <a
                                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                    target="_blank"
                                  >
                                    View</a
                                  >
                                </span>
                                <span v-else>
                                  -
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table class="table table-striped my-5">
                          <tbody>
                            <!-- Exam Canceled -->
                            <tr v-if="candidate_session_details && candidate_session_details.EXAM_SESSION_STATUS==29">
                              <!-- <tr> -->
                              <td>Re-schedule Exam</td>
                              <td>
                                <button
                                  @click="goToRegisterResitExamPage('reschedule')"
                                  type="button"
                                  class="mr-2 btn btn-info btn-fill btn-md"
                                >
                                  Re-Schedule
                                </button>
                              </td>
                            </tr>

                            <!-- No Available Preferred Sessions -->
                            <tr v-if="consultantApprovalData.TS_ID===3 && !candidate_session_details">
                              <!-- <tr> -->
                              <td>Re-schedule Exam</td>
                              <td>
                                <button
                                  @click="goToRegisterResitExamPage('reschedule')"
                                  type="button"
                                  class="mr-2 btn btn-info btn-fill btn-md"
                                >
                                  Re-Schedule
                                </button>
                              </td>
                            </tr>

                            <!-- Exam Failed -->
                            <tr v-if="candidate_session_details && candidate_session_details.EXAM_SESSION_STATUS==3 && candidate_session_details.FINAL_RESULT==0">
                              <!-- <tr>  -->
                              <td>Re-sit Exam</td>
                              <td>
                                <button
                                  @click="goToRegisterResitExamPage('resit')"
                                  type="button"
                                  class="mr-2 btn btn-info btn-fill btn-md"
                                >
                                  Re-Sit
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr>

                        <!-- Get Exam session Details -->
                        <div v-if="savedConsultantData">
                          <examination-session-details :consultantData="savedConsultantData"></examination-session-details>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab4'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td>
                              <vue-form-generator
                                :model="model"
                                :schema="DocumentfileSchema"
                                :options="formOptions"
                                ref="fileUploadForm"
                              >
                              </vue-form-generator>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab5'">
                    <div class="ml-4 mb-5">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td>Appeal</td>
                            <td>
                              <!-- Not Available -->
                              <button
                                @click="goToAppealPage"
                                type="button"
                                class="mr-2 btn btn-info btn-fill btn-md"
                              >
                                Request Appeal
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Appeal Status</td>
                            <td v-if="appealData">{{appealData.APPEAL_STATUS}}</td>
                            <td v-else>Not Available</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab6'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 25%">CPD Point</td>
                            <td v-if="consultantCpdData && consultantCpdData.CPD_POINT">
                              {{consultantCpdData.CPD_POINT}}
                            </td>
                            <td v-else>-</td>
                          </tr>
                          <tr>
                            <td>Approved CPD Point</td>
                            <td v-if="consultantCpdData && consultantCpdData.APPROVED_CPD_POINT">
                              {{consultantCpdData.APPROVED_CPD_POINT}}
                            </td>
                            <td v-else>-</td>
                          </tr>
                          <tr>
                            <td>Revoked CPD Point</td>
                            <td>-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-if="currentTab === 'tab7'">
                    <div class="ml-4">
                      <div v-if="consultantFIMMApprovalData">
                        <virtual-card :consultantData="savedConsultantData"
                          :consultantApprovalData="consultantFIMMApprovalData"
                        ></virtual-card>
                      </div>
                      <div v-else class="text-center">
                        <h6>Virtual Card will be generated after Registration approval by RD.</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </va-card>
          </div>
        </div>

        <div v-if="currentTab === 'tab5'">
          <div v-if="showAppealForm">
            <ConsultantAppeal :consultantData="savedConsultantData"></ConsultantAppeal>
          </div>
        </div>
      </div>
    </b-overlay>

    <b-modal size="xl" v-model="addLicenseModal" title="Distributor & Exam Details">
      <div>
        <form-distributors
          ref="refAddConsultantLicenseType"
          :savedConsultantData="savedConsultantData"
          :savedConsultantLicenseData="savedConsultantData.license"
          :staffPositions="general_settings.STAFF_POSITIONS">
        </form-distributors>

        <!-- <form-examination
          ref="refExamination"
          :parentDataLoaded="applicationFormDataLoaded"
          :formDataModel="applicationFormData"
        ></form-examination> -->
      </div>

      <template #modal-footer="{ cancel }">
        <b-button variant="primary" @click="submitAddLicenseForm">Add</b-button>
        <b-button variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>

    <b-modal v-model="showApprovalStatusModal" centered title="">
      <div class="d-block text-center">
        <h5>Sorry, You cannot update your profile until your registration is approved!</h5>
      </div>

      <template #modal-footer>
        <b-button variant="primary" @click="showApprovalStatusModal = false">OK</b-button>
      </template>
    </b-modal>

    <b-modal v-model="showAppealModal" centered title="">
      <div class="d-block text-center">
        <h5>Sorry, You cannot request for Appeal until your registration is approved!</h5>
      </div>

      <template #modal-footer>
        <b-button variant="primary" @click="showAppealModal = false">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'
import pdf from 'vue-pdf'
import 'vue-form-generator/dist/vfg.css'
import Tabs from 'vue-tabs-with-active-line'
import VueFormGenerator from 'vue-form-generator'
import SelectedLicenseTable from '../components/applications/type-of-consultant/selected_licence_table'
import FormDistributors from '../components/applications/type-of-consultant/form-distributors.vue'
import FormExamination from '../components/applications/application_form_examination.vue'
import ConsultantAppeal from './consultant_appeal.vue'
import SectionCmsrlTrue from '../components/applications/type-of-consultant/cmsrl_true.vue'
import SectionCmsrlFalse from '../components/applications/type-of-consultant/cmsrl_false.vue'

// Consultant Profile Data display
import ProfileView from '../components/applicant_profile/profile'
import ExaminationSessionDetails from '../components/applicant_profile/examination_sessions_details'
import ExemptionData from '../components/applicant_profile/exemption_data'
import RegistrationApprovalLog from '../components/applicant_profile/registrationApprovalLog'
import VirtualCard from './virtual_card'

import * as servicesmodule0 from '../../../app/module0/services'
import * as servicesmodule2 from '../../../app/module2/services'
import * as services02module2 from '@/app/module2/services02'
import * as services04module2 from '@/app/module2/services04'
import * as ExamAPI from '../services/exam'
import * as services04Module2 from '../../../app/module2/services04'

Vue.use(VueFormGenerator)
const TABS = [
  {
    title: 'Applicant Profile',
    value: 'tab1',
  },
  {
    title: 'Applicant License',
    value: 'tab2',
  },
  {
    title: 'Examination',
    value: 'tab3',
  },
  {
    title: 'Uploaded Document',
    value: 'tab4',
  },
  {
    title: 'Appeal',
    value: 'tab5',
  },
  {
    title: 'CPD Point',
    value: 'tab6',
  },
  {
    title: 'Virtual Card',
    value: 'tab7',
  },
]
export default {
  created () {
    // const response = servicesmodule2.getCertificate(292);
    // console.log('Success', response);
    // const blob = new Blob([response.data]);
    // const objectUrl = URL.createObjectURL(blob);
    // this.pdfsrc = objectUrl;
    // return pdfsrc;

    const data = JSON.parse(localStorage.getItem('user'))
    this.currentConsultant = data.consultant

    this.findConsultantByUserId(this.currentConsultant.USER_ID)

    // Load general settings
    this.loadGeneralSettings()
    // Load Consultant Details
    this.setApplicantParticulars(this.currentConsultant)

    this.getExamType()
    this.getExamDetails()
  },

  computed: {
    ...mapGetters({
      general_settings: 'getGeneralSettings',
      applicant_details: 'getApplicantDetails',
    }),
  },

  mounted () {
    this.pauseDataForWhile()
    // console.log(JSON.stringify(this));
  },

  components: {
    Tabs,
    pdf,
    SelectedLicenseTable,
    FormDistributors,
    FormExamination,
    ProfileView,
    ExaminationSessionDetails,
    ExemptionData,
    ConsultantAppeal,
    RegistrationApprovalLog,
    VirtualCard,
    SectionCmsrlTrue,
    SectionCmsrlFalse,
  },

  data () {
    return {
      distributorTypeData: '',
      distributorCmsrlData: '',
      cmsrl_load: false,
      cmsrl: [
        {
          text: 'Yes',
          value: 1,
        },
        {
          text: 'No',
          value: 0,
        },
      ],
      show_overlay: false,
      pauseData: false,
      savedConsultantDataLoaded: false,
      tabs: TABS,
      currentTab: 'tab1',
      currentConsultant: '',
      savedConsultantData: '',
      pdfsrc: null,
      getResult: [],
      getResultPDF: [],
      wavier: false,
      examtype: '',
      examdetails: [],
      addLicenseModal: false,
      candidate_session_details: [],
      appealData: '',
      consultantCpdData: '',

      approval_status: 1,
      showApprovalStatusModal: false,
      showAppealForm: false,
      showAppealModal: false,

      consultantApprovalData: '',
      consultantFIMMApprovalData: '',

      TYPE_OF_APPLICANT: {
        CATEGORY: 'Agent',
        APPERENTICESHIP_PROGRAM: 'Yes',
        COMPANY_DISTRIBUTOR: 'A.D.Fincancial Sdn. Bhd.',
      },
      model2: {
        CMSRL_CERT_DOCS: [],
      },
      model3: {
        APPRENTICESHIP_DOCS: [],
      },
      fileUploadApprenticenship: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: false,
                text: 'Choose a File',
                model: 'APPRENTICESHIP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ],
          },
        ],
      },

      fields: {
        booked_exam_sessions: [
          { key: 'index', class: 'text-center' },
          { key: 'DATE', label: 'Exam Date', class: 'text-center' },
          { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
          { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
          { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
          { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
          { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
        ],

        aproved_exam_sessions: [
          { key: 'index', class: 'text-center' },
          { key: 'DATE', label: 'Exam Date', class: 'text-center' },
          { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
          { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
          { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
          { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
          { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
          // {
          //   key: "AVAILABLE_SEAT",
          //   label: "Available Seats",
          //   class: "text-center",
          // },
          { key: 'LOGIN_LINKS', label: 'Exam Link', class: 'text-center' },
        ],
      },

      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],
      },
      status: [
        {
          id: 'Exam',
          name: 'Exam Related',
        },
        {
          id: 'Termination',
          name: 'Termination',
        },
        {
          id: 'Bankruptcy',
          name: 'Bankruptcy',
        },
      ],
      examrelated: [
        {
          id: 'examResults',
          name: 'Exam Results',
        },
        {
          id: 'Others',
          name: 'Others (Waiver)',
        },
      ],
      DocumentfileSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFILE_UPLOADED_DOCUMENTS',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
      fileUploadCMSRL: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: false,
                text: 'Choose a File',
                model: 'CMSRL_CERT_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },

  methods: {
    ...mapActions({
      loadGeneralSettings: 'setGeneral',
    }),

    ...mapMutations({
      setApplicantParticulars: 'setApplicantParticulars',
    }),

    pauseDataForWhile () {
      setTimeout(() => {
        this.pauseData = this.consultantApprovalData.TS_ID === 3
      }, 6000)
    },

    findConsultantByUserId (userId) {
      services02module2.findConsultantByUserId(userId).then((response) => {
        this.savedConsultantData = response
        // this.getConsultantExamSessions();
        this.getDocumentByID()
        this.checkDistributorType(this.savedConsultantData.license.DISTRIBUTOR_ID)
        this.getConsultantLatestApprovalData()
        this.getConsultantFIMMApprovalData()
        this.getAppealData(this.savedConsultantData.CONSULTANT_ID)
        this.getCpdPointData(this.savedConsultantData.CONSULTANT_ID)
        this.getCandidateExamSessionDetail(this.savedConsultantData.CONSULTANT_ID)
        this.savedConsultantDataLoaded = true
      })
    },

    async getExamType () {
      try {
        const response = await ExamAPI.getConsultantExamType(this.currentConsultant.USER_ID)
        if (response) {
          this.examtype = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getExamDetails () {
      try {
        const response = await ExamAPI.getConsultantExamDetails(this.currentConsultant.USER_ID)
        if (response) {
          this.examdetails = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getCandidateExamSessionDetail (consultantId) {
      try {
        await services04module2.get_candidate_exams_sessionDetails(consultantId)
          .then((response) => {
            this.candidate_session_details = []
            this.candidate_session_details = response.data
          })
      } catch (error) {
        console.log(error)
      }
    },

    async getConsultantLatestApprovalData () {
      try {
        await services04module2.consultantLatestApprovalData(this.savedConsultantData.CONSULTANT_ID)
          .then((response) => {
            this.consultantApprovalData = response
          })
      } catch (error) {
        console.log(error)
      }
    },

    // Checking Distributor Type
    async checkDistributorType (distId) {
      if (distId) {
        try {
          const response = await services04Module2.getDistributorType(distId)
          this.distributorTypeData = response
          if (this.distributorTypeData.CMSRL === false) {
            this.cmsrl_load = false
          } else {
            this.cmsrl_load = true
            this.getDistributorCmsrlDetails(distId)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    async getDistributorCmsrlDetails (distId) {
      if (distId) {
        try {
          const response = await services04Module2.getDistributorCmsrlDatas(distId)
          this.distributorCmsrlData = response
        } catch (error) {
          console.log(error)
        }
      }
    },

    async getConsultantFIMMApprovalData () {
      try {
        await services04module2.consultantFIMMApprovalData(this.savedConsultantData.CONSULTANT_ID)
          .then((response) => {
            this.consultantFIMMApprovalData = response
          })
      } catch (error) {
        console.log(error)
      }
    },
    getCMSRLCertificate: async function () {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_CMSRL_CERTIFICATE')
      if (response && response.length >= 1) {
        response.forEach(el => {
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

          el.DOC_BLOB = new File(
            [el.DOC_BLOB],
            // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
            el.DOC_ORIGINAL_NAME,
            {
              type: el.DOC_BLOB.type,
            },
          )

          const data = {
            docID: el.CA_DOCUMENT_ID,
            name: el.DOC_ORIGINAL_NAME,
            size: el.DOC_FILESIZE,
            type: el.DOC_FILETYPE,
            ext: 'exe',
            url: window.URL.createObjectURL(el.DOC_BLOB),
          }

          this.model2.CMSRL_CERT_DOCS.push(data)
        })
      }
    },

    async getAppealData (data) {
      try {
        const response = await services02module2.getConsultantAppeal(data)
        if (response) {
          this.appealData = response
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getCpdPointData (data) {
      try {
        const response = await services04module2.getConsultantCpdPoint(data)
        if (response) {
          this.consultantCpdData = response
        } else {
          this.consultantCpdData = ''
        }
      } catch (error) {
        console.log(error)
      }
    },

    goToRegisterResitExamPage (exam_type) {
      if (exam_type == 'resit') {
        localStorage.setItem('savedConsultantData', JSON.stringify(this.savedConsultantData))
        this.$router.push({ path: 'consultant-resit-exam' })
      } else {
        localStorage.setItem('savedConsultantData', JSON.stringify(this.savedConsultantData))
        this.$router.push({ path: 'consultant-reschedule-exam' })
      }
    },
    goToEditProfilePage () {
      // if (this.consultantApprovalData.FIMM_TS_ID === 3) {
      this.$router.push({
        path: 'consultant-profile-update-Consultant',
      })
      // } else {
      //   this.showApprovalStatusModal = true
      // }
    },
    goToAppealPage () {
      // if (this.consultantApprovalData.TS_ID === 3) {
      this.showAppealForm = true
      // } else {
      //   this.showAppealModal = true
      // }
      // this.$router.push({ path: 'consultant-appeal-Consultant' })
    },
    prevTab () {
      this.$router.go(-1)
    },

    saveAsDraft () {},

    validatestatusForm () {
      return this.$refs.statusForm.validate()
    },

    onClickOpenAddLicenseModal () {
      this.addLicenseModal = true
    },

    submitAddLicenseForm: async function () {
      // const response = await this.validatestatusForm();

      var validateAddLicenseData = this.$refs.refAddConsultantLicenseType.validateAddLicenseForm()
      if (validateAddLicenseData) {
        const consultant_type_form_data = this.$refs.refAddConsultantLicenseType.getDataToSave()

        const dataToSave = {
          ...consultant_type_form_data,
        }

        if (confirm('Are you sure to add License')) {
          await services02module2.addConsultantLicense(dataToSave)
            .then(response => {
              Vue.$toast.open({
                message: response.message,
                type: 'success',
              })
              this.addLicenseModal = false
              this.$refs.consultantLicesnesData.getDistributorDetails()
            })
        }
      } else {
        Vue.$toast.open({
          message: 'Please fill all mandatory fields to save datas.',
          type: 'error',
          position: 'bottom-right',
        })
      }
    },

    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab

    onModelUpdated (newVal, schema) {
      console.log(schema)
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''))
        this.model.document = newVal.replace('C:\\fakepath\\', '')
      }
    },

    getDocumentByID: async function () {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS')
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data)
      })

      // console.log(
      //   "getConsultantDocuments: ",
      //   this.model.PROFILE_UPLOADED_DOCUMENTS
      // );
    },

    b64toBlobPDF (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      return new File(byteArrays, 'pot', { type: contentType })
    },
  },
}
</script>

<style lang="scss" scoped>
.input-label-td {
  width: 30%;
}
#consultant-profile input,
#type-of-applicant input {
  width: 70%;
  border: none;
  background: transparent;
}
.default-tabs {
  position: relative;
  margin: 0 auto;
  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: black;
    }
    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }
    &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>
