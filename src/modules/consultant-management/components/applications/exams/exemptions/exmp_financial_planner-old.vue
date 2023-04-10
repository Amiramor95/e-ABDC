<template>
  <div>
    <h6>Financial Planner</h6>
    <b-form-group class label="Upload document:" description="Active Membership of the Association/Organisation">
      <b-form-file v-model="FINANCIAL_PLANNER_ACTIVE_DOCS" class></b-form-file>
    </b-form-group>

    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>a) FPAM -CFP/IFP/Both</strong>
      </div>

      <div class="col-md-12">
          <!-- Module 1 -->
          <file-details ref="financial_planner_fpam_module1" label_date="Module 1 Completion Date:" description_file="Module 1"></file-details>

          <!-- Module 3 -->
          <file-details ref="financial_planner_fpam_module3" label_date="Module 3 Completion Date:" description_file="Module 3"></file-details>

          <!-- CFP/IFP -Certified -->
          <file-details ref="financial_planner_cfp_ifp" label_date="CFP/IFP-Certified Completion Date:" description_file="CFP/IFP-Certified"></file-details>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>b) MFPC</strong>
      </div>
      <div class="col-md-12">
        <p>
          <span>i) RFP/Shariah RFP - Partial Completion</span>
        </p>
        <file-details ref="financial_planner_mfpc_module1" label_date="Module 1 Completion Date:" description_file="Module 1"></file-details>
        <file-details ref="financial_planner_mfpc_module3" label_date="Module 3 Completion Date:" description_file="Module 3"></file-details>
        <file-details ref="financial_planner_mfpc_module6" label_date="Module 6 Completion Date:" description_file="Module 6"></file-details>
      </div>

      <div class="col-md-12">
        <p>
          <span>ii) RFP/Shairah RFP - Certified</span>
        </p>
        <file-details ref="financial_planner_rfp_module1" label_date="Certified Date:" description_file="Certification document"></file-details>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>c) MFPAA</strong>
      </div>
      <div class="col-md-12">
        <file-details ref="financial_planner_mfpaa_module1" label_date="Completion Date:" description_file></file-details>
      </div>
    </div>
  </div>
</template>

<script>
import FileDetails from "./exmp_financial_planner_cert_upload.vue";

export default {
  name: "exemption-category-financial-planner",
  props: {
    consultantExemptionData: Object,
  },

  components: {
    FileDetails,
  },
  data() {
    return {
      model: {
        FP_MEMBERSHIP_DOC_ID: null,
        FP_FPAM_MODULE1_DATE: null,
        FP_FPAM_MODULE1_DOC_ID: null,
        FP_FPAM_MODULE3_DATE: null,
        FP_FPAM_MODULE3_DOC_ID: null,
        FP_FPAM_CERTIFY_DATE: null,
        FP_FPAM_CERTIFY_DOC_ID: null,
        FP_MFPC_MODULE1_DATE: null,
        FP_MFPC_MODULE1_DOC_ID: null,
        FP_MFPC_MODULE3_DATE: null,
        FP_MFPC_MODULE3_DOC_ID: null,
        FP_MFPC_MODULE6_DATE: null,
        FP_MFPC_MODULE6_DOC_ID: null,
        FP_MFPC_CERTIFY_DATE: null,
        FP_MFPC_CERTIFY_DOC_ID: null,
      }
    };
  },

  created(){
    if(this.consultantExemptionData){
      this.model = _.cloneDeep(this.consultantExemptionData);
    }
  },

  methods: {
    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        FP_MEMBERSHIP_DOC_ID: this.model.FP_MEMBERSHIP_DOC_ID,
        FP_FPAM_MODULE1_DATE: this.model.FP_FPAM_MODULE1_DATE,
        FP_FPAM_MODULE1_DOC_ID: this.model.FP_FPAM_MODULE1_DOC_ID,
        FP_FPAM_MODULE3_DATE: this.model.FP_FPAM_MODULE3_DATE,
        FP_FPAM_MODULE3_DOC_ID: this.model.FP_FPAM_MODULE3_DOC_ID,
        FP_FPAM_CERTIFY_DATE: this.model.FP_FPAM_CERTIFY_DATE,
        FP_FPAM_CERTIFY_DOC_ID: this.model.FP_FPAM_CERTIFY_DOC_ID,
        FP_MFPC_MODULE1_DATE: this.model.FP_MFPC_MODULE1_DATE,
        FP_MFPC_MODULE1_DOC_ID: this.model.FP_MFPC_MODULE1_DOC_ID,
        FP_MFPC_MODULE3_DATE: this.model.FP_MFPC_MODULE3_DATE,
        FP_MFPC_MODULE3_DOC_ID: this.model.FP_MFPC_MODULE3_DOC_ID,
        FP_MFPC_MODULE6_DATE: this.model.FP_MFPC_MODULE6_DATE,
        FP_MFPC_MODULE6_DOC_ID: this.model.FP_MFPC_MODULE6_DOC_ID,
        FP_MFPC_CERTIFY_DATE: this.model.FP_MFPC_CERTIFY_DATE,
        FP_MFPC_CERTIFY_DOC_ID: this.model.FP_MFPC_CERTIFY_DOC_ID,
      };
      return dataToSave;
    },
  },
  computed: {
    //code to get docs and date selected from file-details component
    getDataFromFileDetailsComponent() {
      this.model.FP_MEMBERSHIP_DOC_ID = this.$refs.financial_planner_fpam_module1.file_upload;
      this.model.FP_FPAM_MODULE1_DATE = this.$refs.financial_planner_fpam_module1.date_selected;
      this.model.FP_FPAM_MODULE1_DOC_ID = this.$refs.financial_planner_fpam_module1.file_upload;
      this.model.FP_FPAM_MODULE3_DATE = this.$refs.financial_planner_fpam_module2.date_selected;
      this.model.FP_FPAM_MODULE3_DOC_ID = this.$refs.financial_planner_fpam_module2.file_upload;
      this.model.FP_FPAM_CERTIFY_DATE = this.$refs.financial_planner_cfp_ifp.date_selected;
      this.model.FP_FPAM_CERTIFY_DOC_ID = this.$refs.financial_planner_cfp_ifp.file_upload;
      this.model.FP_MFPC_MODULE1_DATE = this.$refs.financial_planner_mfpc_module1.date_selected;
      this.model.FP_MFPC_MODULE1_DOC_ID = this.$refs.financial_planner_mfpc_module1.file_upload;
      this.model.FP_MFPC_MODULE3_DATE = this.$refs.financial_planner_mfpc_module1.date_selected;
      this.model.FP_MFPC_MODULE3_DOC_ID = this.$refs.financial_planner_mfpc_module1.file_upload;
      this.model.FP_MFPC_MODULE6_DATE = this.$refs.financial_planner_mfpc_module1.date_selected;
      this.model.FP_MFPC_MODULE6_DOC_ID = this.$refs.financial_planner_mfpc_module1.file_upload;
      this.model.FP_MFPC_CERTIFY_DATE = this.$refs.financial_planner_rfp_module1.date_selected;
      this.model.FP_MFPC_CERTIFY_DOC_ID = this.$refs.financial_planner_rfp_module1.file_upload;
    },
  },
};
</script>

<style></style>
