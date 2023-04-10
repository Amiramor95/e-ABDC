<template>
  <div v-if="!savedConsultantDataLoaded">
    <!-- <img src="../../../../public/img/spinner.gif" /> -->
    <b-card>
      <div class="text-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
        <p>Loading Data</p>
      </div>
    </b-card>
  </div>

  <div v-else>
    <b-overlay :show="overlay_show" rounded="sm">
      <div class="row">
        <div class="col-12">
          <va-card>
            <form-wizard
              @on-complete="onComplete"
              color="#FF5050"
              error-color="#a94442"
              finish-button-text="Submit"
              ref="wizardForm"
            >
              <h3 slot="title"></h3>
              <!-- section 1 -->
              <tab-content
                icon="fa fa-user"
                title="1. Personal Particulars of Applicant"
                :before-change="beforeTabSwitch_1"
              >
                <div v-if="savedConsultantDataLoaded">
                  <form-personal-particular
                    ref="refPersonalParticular"
                    v-bind:saved-consultant-data="savedConsultantData"
                  ></form-personal-particular>
                </div>
              </tab-content>

              <!-- section 2 -->
              <tab-content
                icon="fa fa-info"
                title="2. Type of Consultant"
                :before-change="beforeTabSwitch_2"
              >
                <div v-if="savedConsultantDataLoaded">
                  <form-consultant-type
                    ref="refConsultantType"
                    :parentDataLoaded="applicationFormDataLoaded"
                    :formDataModel="savedConsultantData"
                    :savedConsultantLicenseData="savedConsultantData.license"
                    :general_settings="general_settings"
                  ></form-consultant-type>
                </div>
              </tab-content>

              <!-- section 3 -->
              <tab-content
                icon="fa fa-info"
                title="3. Examination"
                :before-change="beforeTabSwitch_3"
              >
                <div v-if="savedConsultantDataLoaded">
                  <form-examination
                    ref="refExamination"
                    :savedConsultantExamData="savedConsultantData"
                    :parentDataLoaded="applicationFormDataLoaded"
                    :formDataModel="applicationFormData"
                    @exemptionClicked="onExemptionClicked"
                  ></form-examination>
                </div>
              </tab-content>

              <!-- section 4 -->
              <tab-content
                icon="fa fa-folder"
                title="4. Other Document"
                :before-change="beforeTabSwitch_4"
              >
                <div v-if="savedConsultantDataLoaded">
                  Other document
                  <form-other-document ref="refOtherDocument" :savedConsultantData="savedConsultantData"></form-other-document>
                </div>
              </tab-content>

              <b-modal
                ref="exam-information-declaration"
                centered
                :hide-header-close="true"
                data-keyboard="false"
                data-backdrop="static"
              >
                <div class="d-block text-left">
                  <h6>
                    <div :style="{ 'text-align': left }">
                      <label for="exam_declaration_status">
                        <input
                          id="checkbox"
                          type="checkbox"
                          :value="true"
                          :checked="exam_declaration_status"
                          @change="showExamDeclarationConfirmButton($event)"
                        />
                          &nbsp;
                        <!-- <ul>
                          <li  v-for="(examDec,index) in examDeclaration" :key='examDec.DECLARATION_SETTING_ID'>
                            <b>{{ index + 1}} &nbsp;
                            {{examDec.DECLARATION_DESCRIPTION}}
                            </b>
                          </li>
                        </ul> -->
                       <b v-for="examDec in examDeclaration" :key='examDec.DECLARATION_SETTING_ID'>
                            {{examDec.DECLARATION_DESCRIPTION}}
                        </b> 
                       <!-- <b>
                          I Agree "By submitting this application to FIMM, I hereby
                          confirm that the selected examination date and session and
                          will be fully responsible in completing the selected
                          examination. I am aware that the paid fee will not be
                          refunded if I am absent without a valid reason."
                        </b>  -->
                      </label>
                      <!--
                          <b-form-checkbox
                          :value="checkboxVal"
                            @change="showExamDeclarationConfirmButton($event)"
                            >"By submitting this application to FIMM, I hereby confirm
                            that</b-form-checkbox
                        >-->
                    </div>
                  </h6>
                </div>

                <template #modal-footer="{ cancel }">
                  <div>
                    <button
                      v-if="exam_declaration_confirmBtn == true"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                      @click="agreeExamDeclarationModal"
                    >
                      Agree
                    </button>
                    <button
                      v-if="exam_declaration_confirmBtn == true"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                      @click="cancel(); exam_declaration_confirmBtn=false"
                    >
                      Disagree
                    </button>
                  </div>
                </template>
              </b-modal>

              <b-modal
                centered
                size="lg"
                scrollable
                ref="personal-information-declaration"
                :hide-header-close="true"
                data-keyboard="false"
                data-backdrop="static"
              >
                <div class="d-block text-center">
                  <!-- {{okay_button_toggle}} {{exmamination_session_declaration}} -->

                  <div class="d-block text-left">
                    <ul>
                      <li v-for="regDec in regDeclaration" :key='regDec.DECLARATION_SETTING_ID'>
                       
                          {{ regDec.DECLARATION_DESCRIPTION }}
                      </li>
                      <!-- <li>
                        i. All declared information is true and up to date, and I
                        understand the principal and FIMM reserves the rights to
                        verify the information I have provided in this application;
                      </li>
                      <li>
                        ii. I fulfill the eligibility requirements prescribed under
                        the rules of FIMM;
                      </li>

                      <li>iii. I am not an undischarged bankrupt;</li>
                      <li>
                        iv. I agree, at all time, be bound by and comply with FIMM
                        Rules, securities laws and other applicable laws;
                      </li>
                      <li>
                        v. I have never been subject to disciplinary proceeding or
                        expelled by a regulatory body in respect of my professional
                        capacity;
                      </li>
                      <li>
                        vi. I have never been refused membership of a statutory
                        professional or other body in respect to my professional
                        capacity;
                      </li>
                      <li>
                        vii. I have never been dismissed or had a proper authority
                        withdrawn on ethical or legal grounds;
                      </li>
                      <li>
                        viii. I have never had a business-related license,
                        registration or membership revoked, denied or suspended;
                      </li>
                      <li>
                        ix. I have never been charged or convicted in a court of
                        law;
                      </li>
                      <li>
                        x. I will immediately notify the principal and/or FIMM in
                        the event that I fail to satisfy any of the fit and proper
                        criteria prescribed by FIMM.
                      </li>

                      <li>
                        xi. I understand and agree that FIMM may:
                        <dl>
                          a) require me to disclose and provide information and
                          documents relating to any matter under the rules of FIMM;
                        </dl>
                        <dl>
                          b) require my attendance at any meeting, proceeding or
                          hearing of FIMM;
                        </dl>
                        <dl>
                          c) disclose and provide information, documents and records
                          concerning me, including any action taken and sanction
                          imposed against me, to the Securities Commission Malaysia
                          (SC) and other authorities or bodies for regulatory
                          purposes;
                        </dl>
                        <dl>
                          d) disclose, in the manner FIMM considers appropriate, my
                          name and registration details to the public;
                        </dl>
                        <dl>
                          e) publish, in the manner FIMM considers appropriate, any
                          information regarding the suspension or revocation of my
                          registration, actions taken and sanctions imposed against
                          me, if any; and
                        </dl>
                        <dl>
                          f) revoke my registration if this declaration is found to
                          be, wholly or partly, false or misleading.
                        </dl>
                      </li>
                      <li>
                        xii. I have read and understood FIMM’s Privacy Notice
                        available on its website and I hereby consent for my
                        personal data provided herein to be processed by FIMM for
                        the purposes stated in the Privacy Notice; and
                      </li>
                      <li>
                        xiii. I hereby expressly consent and authorize FIMM to
                        obtain and/or disclose any Credit Information relating to me
                        from and/or to Credit Reporting Agency or any source deemed
                        appropriate and reasonable for the purposes of this
                        application for registration with FIMM. This consent shall
                        remain in effect during the period of any registration with
                        FIMM as a Consultant.
                        <b>"</b>
                      </li> -->
                    </ul>
                  </div>

                  <div>
                    <div>
                      <label for="personal_declaration_chk">
                        <input
                          id="personal_declaration_chk"
                          type="checkbox"
                          :value="true"
                          :checked="personal_declaration_status"
                          @change="showPersonalDeclarationOKButton($event)"
                          v-bind:style="{ 'text-align': left }"
                        />
                        <b v-bind:style="{ 'text-align': left }">
                          I hereby acknowledge that I have read, understand, and
                          agree to the terms of this application.
                        </b>
                      </label>
                    </div>
                  </div>
                </div>

                <template #modal-footer>
                  <div>
                    <button
                      v-if="personal_declaration_status == true"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                      @click="hidePersonalDeclarationModal"
                    >
                      Submit
                    </button>
                  </div>
                </template>
              </b-modal>

              <template
                slot="footer"
                slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }"
              >
                <div class="float-left">
                  <button
                    v-if="activeTabIndex > 0"
                    @click="prevTab"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right">
                  <button
                    @click="saveAsDraft"
                    type="button"
                    class="btn btn-info btn-fill btn-md"
                    v-if="disable_edit==false"
                  >
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button>

                  <!-- <button
                        v-if="activeTabIndex == 2 && exam_declaration_status == false"
                        @click="displayExamInformationDeclarationModal"
                        type="button"
                        class="ml-2 btn btn-primary btn-fill btn-md"
                      >
                        Next &nbsp;
                        <i class="fa fa-step-forward" />
                      </button> -->

                  <button
                    v-if="!isLastStep"
                    @click="nextTab"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Next &nbsp;
                    <i class="fa fa-step-forward" />
                  </button>

                  <!-- <button
                        v-else
                        @click="nextTab"
                        id="nextTab"
                        type="button"
                        disabled
                        class="ml-2 btn btn-primary btn-fill btn-md"
                      >
                        Next &nbsp;
                        <i class="fa fa-step-forward" />
                      </button> -->

                  <button
                    v-if="isLastStep && disable_edit==false"
                    @click="displayPersonalInfromationDeclarationModal"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> Proceed
                  </button>
                </div>
              </template>
            </form-wizard>
          </va-card>
        </div>
      </div>
    </b-overlay>

    <!-- <div id="components-demo">
      <button-CMSRLComponent @cmsrl_update="updateCMSRL"></button-counter>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import FormPersonalParticular from '../components/applications/form_personal_particulars'
import FormConsultantType from '../components/applications/form_type_of_consultant'
// import FormConsultantType from "../components/applications/application_form_type_of_consultant";
import FormExamination from '../components/applications/form_examination'
import FormOtherDocument from '../components/applications/application_form_other_documents'

import * as services02module2 from '../../../app/module2/services02'

// new codes
// import * as acceptanceListAPI from "../../../app/module1/services06";
import * as acceptanceListAPI from '../../../app/module2/services02'
import * as AuthenticatedUserAPI from '../../../modules/consultant-management/services/auth'

export default {
  components: {
    FormPersonalParticular,
    FormConsultantType,
    FormExamination,
    FormOtherDocument,
  },

  data () {
    return {
      savedConsultantDataLoaded: false,
      saveAsDraftStatus: false,
      personal_declaration_status: false,

      user: null,
      user_id: null,
      distributer_nric_no: '',
      savedConsultantData: {},
      applicationFormData: {},
      applicationFormDataLoaded: false,
      overlay_show: false,
      disable_edit: false,
      isFirstTabDataSaved: false,
      isSecondTabDataSaved: false,
      isThirdTabDataSaved: false,
      exam_declaration_confirmBtn: false,
      exam_declaration_status: false,
      acceptaceDetailsData: '',
      consultant_exemption_data: false,

      // get cmsrl data to pass child component when cmsrl choosen
      cmsrl_data: null,

      // whole form data
      all_forms_data: null,
      left: 'left',
      examDeclaration:[],
      regDeclaration:[],
    }
  },
  computed: {
    ...mapGetters({
      general_settings: 'getGeneralSettings',
      applicant_details: 'getApplicantDetails',
    }),
    // savedConsultantDataPass(){
    //   // alert("get saved consultant data");
    //   // this.findConsultantByUserId(this.user.USER_ID);
    //   return this.savedConsultantData;
    // }
  },
  methods: {
    ...mapActions({
      loadGeneralSettings: 'setGeneral',
    }),

    ...mapMutations({
      setApplicantParticulars: 'setApplicantParticulars',
    }),

    findConsultantByUserId (userId) {
      services02module2.findConsultantByUserId(userId).then((response) => {
        this.savedConsultantData = response
        if (this.savedConsultantData.license_exemption) {
          this.consultant_exemption_data = true
        } else {
          this.consultant_exemption_data = false
        }
        this.savedConsultantDataLoaded = true
        this.isformeditable()
      })
    },

    beforeTabSwitch_1: function () {
      var refToValidate = this.$refs.refPersonalParticular.validateFirstTab()
      // return refToValidate.validateFirstTab();
      if (refToValidate) {
        if (!this.isFirstTabDataSaved && this.disable_edit == false) {
          this.overlay_show = true
          this.$refs.refPersonalParticular.saveConsultantEducationDatas()
          this.$refs.refPersonalParticular.uploadProfileNric()
          const personal_particular_form_datas = this.$refs.refPersonalParticular.getDataToSave()
          personal_particular_form_datas.USER_ID = this.user.USER_ID
          return services02module2.createNewConsultant(personal_particular_form_datas)
            .then((response) => {
              Vue.$toast.open({
                message: response.message,
                type: 'success',
              })
              this.overlay_show = false
              this.isFirstTabDataSaved = true
              this.$refs.refConsultantType.checkAcceptanceList()
              return true
            })
        } else {
          this.$refs.refConsultantType.checkAcceptanceList()
          return true
        }
      } else {
        Vue.$toast.open({
          message: 'Please fill all required fields before proceeding Next.',
          type: 'error',
          position: 'bottom-right',
        })
      }
    },

    beforeTabSwitch_2: function () {
      var refToValidateTab2 = this.$refs.refConsultantType.validateSecondTab()
      if (refToValidateTab2) {
        if (!this.isSecondTabDataSaved && this.disable_edit == false) {
          this.overlay_show = true
          // Save form data on next as on tab
          const personal_particular_form_data = this.$refs.refPersonalParticular.getDataToSave()
          personal_particular_form_data.USER_ID = this.user.USER_ID
          const consultant_type_form_data = this.$refs.refConsultantType.getDataToSave()
          this.all_forms_data = {
            ...personal_particular_form_data,
            ...consultant_type_form_data,
          }
          return services02module2.createNewConsultant(this.all_forms_data)
            .then((response) => {
              Vue.$toast.open({
                message: response.message,
                type: 'success',
              })
              this.overlay_show = false
              this.isSecondTabDataSaved = true
              if (this.savedConsultantData.CONSULTANT_APPLICATION_TYPE == 2) { // Refer cm_CONSULTANT_APPLICATION_TYPES (2=Re-register)
                this.$refs.refExamination.checkConsultantReregister()
              } else {
                this.$refs.refExamination.checkExamCertificate()
              }
              return true
            })
        } else {
          if (this.savedConsultantData.CONSULTANT_APPLICATION_TYPE == 2) {
            this.$refs.refExamination.checkConsultantReregister()
          } else {
            this.$refs.refExamination.checkExamCertificate()
          }
          return true
        }
      } else {
        Vue.$toast.open({
          message: 'Please fill all required fields before proceeding Next.',
          type: 'error',
          position: 'bottom-right',
        })
      }
    },

    onExemptionClicked (value) { // Event Clicked Function from Child Component
      if (value == true) {
        this.consultant_exemption_data = true
      } else {
        this.consultant_exemption_data = false
      }
    },

    beforeTabSwitch_3: function () {
      // if (this.exam_declaration_status) {
      //   return true;
      // } else {
      //   this.displayExamInformationDeclarationModal();
      // }

      var refToValidateTab3 = this.$refs.refExamination.validateThirdTab()
      if (refToValidateTab3) {
        // const text = 'I Agree "By submitting this application to FIMM, I hereby confirm that the selected examination date and session and will be fully responsible in completing the selected examination. I am aware that the paid fee will not be refunded if I am absent without a valid reason."';
        if (!this.exam_declaration_status && this.disable_edit == false && this.consultant_exemption_data == false) {
          // if(confirm(text)){
          //   this.exam_declaration_status = true;
          //   // if(this.disable_edit == false){
          //     this.saveAsDraft();
          //   // }
          //   return true;
          // }else{
          //   return false;
          // }
          if (!localStorage.getItem('ReregisterAndCPDCheck')) {
            this.displayExamInformationDeclarationModal()
          }
        } else {
          if (!this.isThirdTabDataSaved && this.disable_edit == false) {
            this.isThirdTabDataSaved = true
            this.saveAsDraft()
            return true
          } else {
            return true
          }
        }
      } else {
        Vue.$toast.open({
          message: 'Please fullfill the requirement before proceding Next',
          type: 'error',
          position: 'bottom-right',
        })
      }
    },

    beforeTabSwitch_4: function () {
      // console.log("inside beforeTabSwitch4");
      this.displayPersonalInfromationDeclarationModal()
      return true
    },

    getAllFormsData () {
      if (this.$refs.wizardForm.activeTabIndex == 0) {
        const personal_particular_form_data = this.$refs.refPersonalParticular.getDataToSave()
        this.all_forms_data = {
          ...personal_particular_form_data,
        }
        this.$refs.refPersonalParticular.saveConsultantEducationDatas()
        this.$refs.refPersonalParticular.uploadProfileNric()
      } else if (this.$refs.wizardForm.activeTabIndex == 1) {
        const personal_particular_form_data = this.$refs.refPersonalParticular.getDataToSave()
        const consultant_type_form_data = this.$refs.refConsultantType.getDataToSave()
        this.all_forms_data = {
          ...personal_particular_form_data,
          ...consultant_type_form_data,
        }
      } else if (this.$refs.wizardForm.activeTabIndex == 2) {
        const personal_particular_form_data = this.$refs.refPersonalParticular.getDataToSave()
        const consultant_type_form_data = this.$refs.refConsultantType.getDataToSave()
        const examination_form_data = this.$refs.refExamination.getDataToSave()
        this.all_forms_data = {
          ...personal_particular_form_data,
          ...consultant_type_form_data,
          ...examination_form_data,
        }
      } else if (this.$refs.wizardForm.activeTabIndex == 3) {
        const personal_particular_form_data = this.$refs.refPersonalParticular.getDataToSave()
        const consultant_type_form_data = this.$refs.refConsultantType.getDataToSave()
        const examination_form_data = this.$refs.refExamination.getDataToSave()

        this.$refs.refPersonalParticular.saveConsultantEducationDatas()
        this.$refs.refPersonalParticular.uploadProfileNric()
        // const other_documents = this.$refs.refOtherDocument.getDataToSave();
        this.$refs.refOtherDocument.uploadOtherDocuments()

        this.all_forms_data = {
          ...personal_particular_form_data,
          ...consultant_type_form_data,
          ...examination_form_data,
          // ...other_documents,
        }
      }
    },

    saveAsDraft: async function () {
      this.saveAsDraftStatus = true // status toogle

      // get all form data
      this.getAllFormsData()
      const saveAsDraftData = this.all_forms_data
      saveAsDraftData.USER_ID = this.user.USER_ID
      this.createNewConsultantData(saveAsDraftData)
      // Event.$emit("CONSULTANT:SAVE_DATA");
    },

    createNewConsultantData: async function (data) {
      try {
        this.overlay_show = true
        const response = await services02module2.createNewConsultant(data)
        if (response) {
          Vue.$toast.open({
            message: response.message,
            type: 'success',
          })
          this.overlay_show = false
        }
      } catch (error) {
        console.log('creation status: ' + response.data.status)
      }
    },

    displayExamInformationDeclarationModal () {
      this.$refs['exam-information-declaration'].show()

      // const text =
      //   'I Agree "By submitting this application to FIMM, I hereby  confirm that the selected examination date and session and will be fully responsible in completing the selected examination. I am aware that the paid fee will not be refunded if I am absent without a valid reason.';
      // if (confirm(text) == true) {
      //   this.exam_declaration_status = true;
      //   this.beforeTabSwitch_3();
      // }
    },

    // call this funciton when submit button is clicked and declaration is confirmed
    showExamDeclarationConfirmButton: function (e) {
      this.exam_declaration_confirmBtn = this.exam_declaration_confirmBtn != true
    },

    agreeExamDeclarationModal () {
      this.exam_declaration_status = this.exam_declaration_status != true
      this.$refs['exam-information-declaration'].hide()
      this.beforeTabSwitch_3()
    },

    displayPersonalInfromationDeclarationModal () {
      this.$refs['personal-information-declaration'].show()
      return false
    },

    showPersonalDeclarationOKButton: function (e) {
      this.personal_declaration_status =
        this.personal_declaration_status != true
    },

    hidePersonalDeclarationModal () {
      if (confirm('Are you sure to submit?')) {
        if (this.personal_declaration_status == true) {
          this.$refs['personal-information-declaration'].hide()

          // call consultant creation/storing async function
          // get all form data
          this.getAllFormsData()
          const submitAllData = this.all_forms_data
          submitAllData.USER_ID = this.user.USER_ID
          submitAllData.PUBLISH_STATUS = 1 // 1: SUBMIT 0:SAVE AS DRAFT
          // this.createNewConsultantData(submitAllData);
          this.submitNewConsultantData(submitAllData)
        } else {
          this.$refs['personal-information-declaration'].hide()
        }
        return true
      }
    },

    submitNewConsultantData: async function (data) {
      try {
        this.overlay_show = true
        const response = await services02module2.createNewConsultant(data)
        if (response) {
          Vue.$toast.open({
            message: response.message,
            type: 'success',
          })
          this.overlay_show = false
          if (this.$refs.wizardForm.activeTabIndex == 3) {
            this.$router.push({ name: 'consultant-profile-Consultant' })
          }
        }
      } catch (error) {
        console.log('creation status: ' + response.data.status)
      }
    },

    onComplete: function () {
      alert('Completed!')
    },

    async fetchUserDetails () {
      try {
        const authUser = await AuthenticatedUserAPI.me()
        // console.log("authUser");
        // console.log(authUser);
        this.distributer_nric_no = authUser.data.USER_NRIC
        this.user_id = authUser.data.user.USER_ID
      } catch (error) {
        console.log(error)
      }
    },

    // async checkAcceptaceDetails(data) {
    //   try {
    //     var acceptanceList = await acceptanceListAPI.getAcceptanceList(data);
    //     this.acceptaceDetailsData = acceptanceList;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // APIs
    getApplicationForm: async function (data) {
      try {
        const response = await services02module2.getConsultantByID(data)
        if (response) {
          this.applicationFormData = response
          this.applicationFormDataLoaded = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    getAllExamDeclaration: async function() {
    const response = await services02module2.getConsulatntDeclaration("CONSULTANT","exam");
    this.examDeclaration = response;
    console.log("ExamDeclaration=",this.examDeclaration);
    //this.regDecCount = this.disRegDecList.length;
    },
     getAllRegDeclaration: async function() {
    const response = await services02module2.getConsulatntDeclaration("CONSULTANT","registration");
    this.regDeclaration = response;
    //this.regDecCount = this.disRegDecList.length;
    },

    isformeditable () {
      if (this.savedConsultantData.PUBLISH_STATUS == 1) {
        this.disable_edit = true
      } else {
        this.disable_edit = false
      }
    },
  },

  created () {
    const data = JSON.parse(localStorage.getItem('user'))
    this.user = data.consultant

    console.log('Current User Data', this.user)
    this.applicationFormData = this.user
    this.applicationFormDataLoaded = true

    this.findConsultantByUserId(this.user.USER_ID)

    // Load general settings
    this.loadGeneralSettings()
    // this.setApplicantParticulars(this.savedConsultantData);
    this.setApplicantParticulars(this.user)
    this.getAllExamDeclaration();
     this.getAllRegDeclaration();
  },

  mounted () {

  },
  beforeCreate () {},
}
</script>

<style lang="scss">
  input::placeholder {
    /* Recent browsers */
    text-transform: none;
  }

  .text-uppercase input {
    text-transform: uppercase !important;
  }

  .text-uppercase label {
    /* Recent browsers */
    text-transform: none;
  }

  .display-inline label {
    display: inline !important;
    padding: 5px;
  }

  .app-layout__main {
    background: #e8e8e8;
  }

  .container {
    max-width: 620px;
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
  }

  /* Style the tabs */
  .tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px; // hide bottom border
  }

  .tabs ul {
    list-style-type: none;
    margin-left: 20px;
  }

  .tabs a {
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
  }

  .tabs a:last-child {
    border-right: 1px solid #ccc;
  }

  /* Change background color of tabs on hover */
  .tabs a:hover {
    background-color: #aaa;
    color: #fff;
  }

  /* Styling for active tab */
  .tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
  }

  /* Style the tab content */
  .tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
  }

  /* Validation message */
  .is-invalid .invalid-feedback{
    display: block;
  }
  </style>

<style scoped>
  /* .text-uppercase {
        text-transform: uppercase;
      } */
  .widthModal {
    width: 80%;
  }

  .width {
    width: 100%;
  }

  .widthName {
    width: 5%;
  }
  .spinner {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    opacity: 0.7;
    background-color: #fff;
    z-index: 99;
  }
  .spinner > img {
    position: absolute;
    top: 100px;
    left: 240px;
    z-index: 100;
  }
</style>
