<template>
  <div>
    <div class="min-500">
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
              disabled
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as ExamAPI from '../../services/exam'
import Exemption from './exams/exemption_consultant'
import ExamBooking from './exams/exam_booking_consultant'

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
  },

  mounted () {
    if (this.savedConsultantExamData.license_exemption) {
      console.log('exempted', this.savedConsultantExamData.license_exemption)
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
