<template>
  <div class="update-profile">
    <div v-if="!currentConsultantDataLoaded">
      <b-card>
        <div class="text-center">
          <b-spinner variant="success" label="Spinning"></b-spinner>
          <p>Loading Data</p>
        </div>
      </b-card>
    </div>

    <div v-else>
      <profile-data
        :general_settings="general_settings"
        :applicant_details="applicant_details"
        :currentConsultantData="currentConsultantData"
        :citizenship="general_settings.CITIZENSHIPS"
        :gender="general_settings.GENDERS"
        :race="general_settings.RACES"
        :qualification="general_settings.CONSULTANT_QUALIFICATIONS"
        :currentConsultantLicenseData="currentConsultantData.license"
        :staffpositions="general_settings.STAFF_POSITIONS"
        :consultant_exemption_data="consultantExemptionData">
        ref="profileData"
      </profile-data>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import * as services02module2 from '../../../app/module2/services02'
import ProfileData from './profile-datas/consultant_profile_datas'

export default {
  data () {
    return {
      currentUser: '',
      currentConsultantData: '',
      currentConsultantDataLoaded: false,
      consultantExemptionData: false,
    }
  },

  components: {
    ProfileData,
    // PersonalAddresses,
  },

  /* ---------------- Start computed ---------------------- */
  computed: {
    ...mapGetters({
      general_settings: 'getGeneralSettings',
      applicant_details: 'getApplicantDetails',
    }),
    ...mapState({
      personal_particulars: (state) => state.consultant.applicant_details,
    }),
  },

  /* ---------------- Start created ---------------------- */
  created () {
    const data = JSON.parse(localStorage.getItem('user'))
    this.currentUser = data.consultant

    this.findConsultantByUserId(this.currentUser.USER_ID)

    // Load general settings
    this.loadGeneralSettings()
    this.setApplicantParticulars(this.currentUser)
  },

  /* -------------------------------------------------------------------------- */
  /*                                startmethods                                */
  /* -------------------------------------------------------------------------- */
  methods: {
    ...mapActions({
      loadGeneralSettings: 'setGeneral',
    }),

    ...mapMutations({
      setApplicantParticulars: 'setApplicantParticulars',
    }),

    findConsultantByUserId (userId) {
      services02module2.findConsultantByUserIdForProfileUpdateApproval(userId).then((response) => {
        this.currentConsultantData = response
        if (this.currentConsultantData.license_exemption) {
          this.consultantExemptionData = true
        } else {
          this.consultantExemptionData = false
        }
        this.currentConsultantDataLoaded = true
      })
    },
  },
}
</script>
<style>
  .update-profile ul > li:before {
    display: none !important;
  }
</style>
