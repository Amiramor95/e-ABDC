<template>
  <div>
    <div v-if="savedConsultantExamData.CONSULTANT_APPLICATION_TYPE==2">
      <!-- Refer cm_CONSULTANT_APPLICATION_TYPES (2 = Re-register) -->

      <div v-if="!checkReregister">
        <b-card>
          <div class="text-center">
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <p>Confirming Re-register and Checking CPD Point</p>
          </div>
        </b-card>
      </div>
    </div>

    <div v-else>
      <div v-if="!checkExamCertificateData">
        <b-card>
          <div class="text-center">
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <p v-if="!consultant_exempted && selected_sessions.length<=0">Checking Consultant Examination Certificate</p>
            <p v-else>Loading Data</p>
          </div>
        </b-card>
      </div>
    </div>

    <div class="min-500" v-if="checkExamCertificateData || checkReregister">
      <div class="row pt-5">
        <div class="col-md-12">
          <h5 v-if="!consultant_exempted">Examination Type: {{examtype.EXAM_TYPE_NAME}}</h5>

          <div>
            <b-form-checkbox
              class="mt-4"
              id="inp_exempted"
              v-model="consultant_exempted"
              name="inp_exempted"
              @change="setIsExemptionQualified"
            >
              I am Qualified for Exemption
            </b-form-checkbox>
          </div>
        </div>
      </div>

      <div v-if="consultant_exempted">
        <exemption ref="exemption" :savedConsultantData="savedConsultantExamData"
          :consultantExemptionData="savedConsultantExamData.license_exemption">
        </exemption>
      </div>

      <!-- <div v-if="!examCertificateData || consultantReregisterData"> -->
      <div v-else>
        <exam-booking :savedConsultantExamData="savedConsultantExamData"
          :examType="examtype"
          ref="exam_booking"></exam-booking>
      </div>
    </div>

    <b-modal v-model="examCertificateModal1" centered title="">
      <div class="d-block text-center">
        <h5>You have a valid Examination Certificate!</h5>
        <h5>You may proceed to registration without sitting the examination again.</h5>
      </div>
    </b-modal>

    <b-modal v-model="examCertificateModal2" centered title="">
      <div class="d-block text-center">
        <h5>Examination Required!</h5>
        <h5>Please proceed to select your preferred examination sessions.</h5>
      </div>
    </b-modal>

    <b-modal v-model="consultantReregisterModal" centered title="">
      <div class="d-block text-center">
        <h5>You have fulfilled the CPD requirement!</h5>
        <h5>You may proceed to registration without sitting the examination again.</h5>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as ExamAPI from '../../services/exam'
import Exemption from './exams/exemption'
import ExamBooking from './exams/exam_booking'
import * as services04Module2 from '../../../../app/module2/services04'
import * as acceptanceListAPI from '@/app/module2/services02'

export default {
  ...mapState({
    examination_form_data: (state) => state.consultant.applicant_details,
  }),
  props: {
    savedConsultantExamData: Object,
  },
  components: {
    Exemption,
    ExamBooking,
  },
  data () {
    return {
      currentUser: '',
      examtype: '',
      checkExamCertificateData: false,
      examCertificateData: '',
      examCertificateModal1: false,
      examCertificateModal2: false,
      consultant_exempted: false,

      consultantReregisterData: '',
      checkReregister: false,
      consultantReregisterModal: false,

      selected_sessions: [],
    }
  },

  created () {
    const data = JSON.parse(localStorage.getItem('user'))
    this.currentUser = data.consultant
  },

  methods: {
    setIsExemptionQualified (event) {
      // console.log(event);
      this.$emit('exemptionClicked', event)
    },

    async checkExamCertificate () {
      try {
        const response = await ExamAPI.get_exams_result(this.savedConsultantExamData.CONSULTANT_ID)
        this.examCertificateData = response.data
        if (this.examCertificateData) {
          this.checkExamCertificateData = true
          this.examCertificateModal1 = true
        } else {
          this.getExamType()
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getExamType () {
      try {
        const response = await ExamAPI.getConsultantExamType(this.currentUser.USER_ID)
        if (response) {
          this.examtype = response.data
          this.getBookedExamLists()
        }
      } catch (error) {
        console.log(error)
      }
    },

    getBookedExamLists () {
      ExamAPI
        .get_booked_exams_sessions(this.savedConsultantExamData.CONSULTANT_ID, 1) // Initial New Booking
        .then(response => {
          this.selected_sessions = response.data
          this.checkExamCertificateData = true
          if (!this.consultant_exempted && this.selected_sessions.length <= 0) {
            this.examCertificateModal2 = true
          } else {
            this.examCertificateModal2 = false
          }
        })
    },

    async checkConsultantReregister () {
      try {
        const response = await services04Module2.consultantReregisterCheck(this.savedConsultantExamData.CONSULTANT_NRIC)
        this.consultantReregisterData = response.data
        localStorage.setItem('ReregisterAndCPDCheck', false)
        if (this.consultantReregisterData.cpd >= 16 && this.consultantReregisterData.year < 3) { // cpd_management DB -> checking CONSULTANT_CPD and termination Date
          this.checkReregister = true
          this.consultantReregisterModal = true
          localStorage.setItem('ReregisterAndCPDCheck', true)
        } else if (this.consultantReregisterData.cpd < 16 && this.consultantReregisterData.year < 3) {
          this.checkReregister = true
          this.examCertificateModal2 = true
        } else if (this.consultantReregisterData.year >= 3) {
          this.checkReregister = true
          this.examCertificateModal2 = true
        } else if (this.consultantReregisterData.year < 1) {
          this.checkReregister = true
          this.consultantReregisterModal = true
          localStorage.setItem('ReregisterAndCPDCheck', true)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // get data to save
    getDataToSave () {
      if (this.consultant_exempted == true) {
        const exemption_data = this.$refs.exemption.getDataToSave()
        const dataToSave = {
          EXEMPTION: this.consultant_exempted,
          ...exemption_data,
        }
        return dataToSave
      } else if (this.consultant_exempted == false) {
        const examination_data = this.$refs.exam_booking.getDataToSave()
        const dataToSave = {
          EXEMPTION: this.consultant_exempted,
          ...examination_data,
        }
        return dataToSave
      }
    },

    // Validate Exemption Datas
    validateThirdTab () {
      if (this.consultant_exempted == true) {
        var validateExemptionDatas = this.$refs.exemption
        return validateExemptionDatas.validateExemptionDatas()
      } else {
        var validateExamSessionDatas = this.$refs.exam_booking
        return validateExamSessionDatas.validateExamSessionDatas()
      }
    },
  },

  mounted () {
    if (this.savedConsultantExamData.license_exemption) {
      this.consultant_exempted = true
    }
  },
}
</script>
<style lang="scss">
.table thead th {
  font-weight: bold;
  font-size: 1rem;
}

.min-500 {
  min-height: 600px;
}
</style>
