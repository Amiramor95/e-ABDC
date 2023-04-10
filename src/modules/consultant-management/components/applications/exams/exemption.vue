<template>
  <div>
    <b-card class="mt-5 mb-5 no-shadow">
      <h5 class="mb-4">Exemption</h5>

      <div class="row">
        <div class="col-xl-10">
          <b-form-group label="Exemption Category:" label-for="exemption-category" description>
            <b-form-select
              ref="selectExemption"
              id="exemption-category"
              v-model="model.EXEMPTION_CATEGORY_ID"
              placeholder="Select a category"
              :state="validateExemptionCategoryData('EXEMPTION_CATEGORY_ID')"
              aria-describedby="exemption-required-msg"
            >
              <template>
                <option
                  v-for="exemption in this.filterExemption()"
                  v-bind:key="exemption.EXEMPTION_CATEGORY_ID"
                  :value="exemption.EXEMPTION_CATEGORY_ID"
                >
                  {{exemption.NAME}}
                </option>
              </template>
            </b-form-select>

            <b-form-invalid-feedback id="exemption-required-msg">
              Please select any one Exemption Category.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>

      <div class="row mb-5" v-if="model.EXEMPTION_CATEGORY_ID">
        <div class="col-xl-10">
          <exemption-category-ceo ref="exmp_ceo"
            v-if="model.EXEMPTION_CATEGORY_ID === 3"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-ceo>

          <exemption-category-director ref="exmp_director"
            v-if="model.EXEMPTION_CATEGORY_ID === 4"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-director>

          <exemption-category-financial-planner ref="exmp_financial_planner"
            v-if="model.EXEMPTION_CATEGORY_ID === 2"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-financial-planner>

          <exemption-category-fund-manager ref="exmp_fund_manager"
            v-if="model.EXEMPTION_CATEGORY_ID === 1"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-fund-manager>

          <exemption-category-insurance-agent ref="exmp_insurance_agent"
            v-if="model.EXEMPTION_CATEGORY_ID === 5"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-insurance-agent>

          <exemption-category-unit-trust-consultant ref="exmp_unit_trust_consultant"
            v-if="model.EXEMPTION_CATEGORY_ID === 6"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-unit-trust-consultant>

          <exemption-category-pioneer-consultant ref="exmp_pioneer_consultant"
            v-if="model.EXEMPTION_CATEGORY_ID === 7"
            :consultantExemptionData="consultantExemptionData" :savedConsultantData="savedConsultantData"></exemption-category-pioneer-consultant>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import ExemptionCategoryCeo from './exemptions/exmp_ceo.vue'
import ExemptionCategoryDirector from './exemptions/exmp_director.vue'
import ExemptionCategoryFinancialPlanner from './exemptions/exmp_financial_planner.vue'
import ExemptionCategoryFundManager from './exemptions/exmp_fund_manager.vue'
import ExemptionCategoryInsuranceAgent from './exemptions/exmp_insurance_agent.vue'
import ExemptionCategoryUnitTrustConsultant from './exemptions/exmp_unit_trust_consultant.vue'
import ExemptionCategoryPioneerConsultant from './exemptions/exmp_pioneer_consultant.vue'
export default {
  mixins: [validationMixin],
  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object,
  },

  components: {
    ExemptionCategoryCeo,
    ExemptionCategoryDirector,
    ExemptionCategoryFinancialPlanner,
    ExemptionCategoryFundManager,
    ExemptionCategoryInsuranceAgent,
    ExemptionCategoryUnitTrustConsultant,
    ExemptionCategoryPioneerConsultant,
  },

  computed: {
    ...mapGetters({ general_settings: 'getGeneralSettings' }),
  },

  data () {
    return {
      model: {
        EXEMPTION_CATEGORY_ID: '',
      },
    }
  },

  validations: {
    model: {
      EXEMPTION_CATEGORY_ID: { required },
    },
  },

  created () {
    if (this.consultantExemptionData) {
      this.model = _.cloneDeep(this.consultantExemptionData)
    }
  },

  methods: {
    filterExemption () {
      const exemptionDatas = this.$store.getters.getGeneralSettings.EXEMPTION_CATEGORIES
      if (this.isLicenseUTSType()) {
        return exemptionDatas.slice(0, 4)
      }
      return exemptionDatas
    },
    isLicenseUTSType () {
      const licenses = this.$store.getters.getApplicantDetails.LICENSE_TYPE
      let flag = false
      licenses.forEach((x) => {
        if (x === 'UTS') {
          flag = true
          return true
        }
      })
      return flag
    },
    // Validate All Datas
    validateExemptionCategoryData (EXEMPTION_CATEGORY_ID) {
      const { $dirty, $error } = this.$v.model[EXEMPTION_CATEGORY_ID]
      return $dirty ? !$error : null
    },

    validateExemptionDatas () {
      if (this.model.EXEMPTION_CATEGORY_ID) {
        if (this.model.EXEMPTION_CATEGORY_ID === 1) {
          // fund manager
          var validateFMDatas = this.$refs.exmp_fund_manager
          return validateFMDatas.validateFMDatas()
        } else if (this.model.EXEMPTION_CATEGORY_ID === 2) {
          // financial planner
          var validateFPDatas = this.$refs.exmp_financial_planner
          return validateFPDatas.validateFPDatas()
        } else if (this.model.EXEMPTION_CATEGORY_ID === 4) {
          // Director
          var validateDirectorDatas = this.$refs.exmp_director
          return validateDirectorDatas.validateDirectorDatas()
        } else if (this.model.EXEMPTION_CATEGORY_ID === 5) {
          // insurance agent
          var validatePRSFP_IA_Datas = this.$refs.exmp_insurance_agent
          return validatePRSFP_IA_Datas.validatePRSFP_IA_Datas()
        } else if (this.model.EXEMPTION_CATEGORY_ID === 6) {
          // unit trust consultant
          var validatePRSFP_UTC_Datas = this.$refs.exmp_unit_trust_consultant
          return validatePRSFP_UTC_Datas.validatePRSFP_UTC_Datas()
        } else if (this.model.EXEMPTION_CATEGORY_ID === 7) {
          // pioneer consultant
          var validatePRSFP_PC_Datas = this.$refs.exmp_pioneer_consultant
          return validatePRSFP_PC_Datas.validatePRSFP_PC_Datas()
        } else {
          return true
        }
      } else {
        this.$v.model.$touch()
        if (this.$v.model.$anyError) {
          return false
        } else {
          return true
        }
      }
    },

    getDataToSave () {
      if (this.model.EXEMPTION_CATEGORY_ID === 1) {
        // fund manager
        this.$refs.exmp_fund_manager.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_fund_manager.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 2) {
        // financial planner
        this.$refs.exmp_financial_planner.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_financial_planner.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 3) {
        // ceo
        this.$refs.exmp_ceo.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_ceo.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 4) {
        // director
        this.$refs.exmp_director.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_director.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 5) {
        // insurance agent
        this.$refs.exmp_insurance_agent.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_insurance_agent.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 6) {
        // unit trust consultant
        this.$refs.exmp_unit_trust_consultant.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_unit_trust_consultant.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else if (this.model.EXEMPTION_CATEGORY_ID === 7) {
        // pioneer consultant
        this.$refs.exmp_pioneer_consultant.saveExemptionDocuments()
        const data_to_save = this.$refs.exmp_pioneer_consultant.getDataToSave()
        data_to_save.EXEMPTION_CATEGORY_ID = this.model.EXEMPTION_CATEGORY_ID
        return data_to_save
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
