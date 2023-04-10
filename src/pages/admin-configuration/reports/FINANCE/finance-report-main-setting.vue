 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-money"></i>&nbsp;&nbsp; <b>Finance Management</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>UTC Batch Details Report</span>
            <button
              @click="finance_utc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>PRC Batch Details Report</span>
            <button
              @click="finance_prc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>UTC Batch Details Summary</span>
            <button
              @click="finance_utc_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>PRC Batch Details Summary</span>
            <button
              @click="finance_prc_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Examination Reject Details (UT System)</span>
            <button
              @click="finance_exam_reject_ut_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Examination Reject Details (PRS System)</span>
            <button
              @click="finance_exam_reject_prs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Variation/ Exemption Reject Report (UT System)</span>
            <button
              @click="finance_exemption_reject_ut_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Variation/ Exemption Reject Report (PRS System)</span>
            <button
              @click="finance_exemption_reject_prs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Approved UTC Variation</span>
            <button
              @click="finance_approved_utc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Approved PRC Variation</span>
            <button
              @click="finance_approved_prc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>UTC Variation/Exemption Summary List (UT System)</span>
            <button
              @click="finance_utc_exemption_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>PRC Variation/Exemption Summary List (PRS System)</span>
            <button
              @click="finance_prc_exemption_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Candidate Exam Replacement Report (UT System)</span>
            <button
              @click="finance_candidate_exam_ut_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Candidate Exam Replacement Report (PRS System)</span>
            <button
              @click="finance_candidate_exam_prs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Prepayment Movement Report (UT System)</span>
            <button
              @click="finance_prepayment_ut_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Prepayment Movement Report (PRS System)</span>
            <button
              @click="finance_prepayment_prs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Prepayment Refund Report</span>
            <button
              @click="finance_prepayment_refund_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Finance Cute Result Details (UT System)</span>
            <button
              @click="finance_cute_result_ut_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Finance Cute Result Details (PRS System)</span>
            <button
              @click="finance_cute_result_prs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>AMSF Collection</span>
            <button
              @click="finance_amsf_collection_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
            <br>
           <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Spacing from "../../../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../../../app/module0/services06";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing },
mounted(){
 this.usertype = localStorage.getItem("user");
 console.log("USER TYPE=",this.usertype);
},
  // DATA SCHEMA
  data() {
    return {
    usertype:'',
    };
  },
  methods: {
       back() {
    this.$router.push("/fimm/report-main-setting");
    },
    finance_utc_report() {
    this.$router.push("/fimm/finance-utc-report");
    },
    finance_prc_report() {
      this.$router.push("/fimm/finance-prc-report");
    },
    finance_utc_summary_report() {
      this.$router.push("/fimm/finance-utc-summary-report");
    },
   finance_prc_summary_report() {
      this.$router.push("/fimm/finance-prc-summary-report");
    },
    finance_exam_reject_ut_report() {
      this.$router.push("/fimm/finance-exam-reject-ut-report");
    },
     finance_exam_reject_prs_report() {
      this.$router.push("/fimm/finance-exam-reject-prs-report");
    },
     finance_exemption_reject_ut_report() {
      this.$router.push("/fimm/finance-exemption-reject-ut-report");
    },
    finance_exemption_reject_prs_report() {
      this.$router.push("/fimm/finance-exemption-reject-prs-report");
    },
   finance_approved_utc_report() {
      this.$router.push("/fimm/finance-approved-utc-report");
    },
     finance_approved_prc_report() {
      this.$router.push("/fimm/finance-approved-prc-report");
    },
    finance_utc_exemption_summary_report() {
      this.$router.push("/fimm/finance-utc-exemption-summary-report");
    },
    finance_prc_exemption_summary_report() {
      this.$router.push("/fimm/finance-prc-exemption-summary-report");
    },
    finance_candidate_exam_ut_report() {
      this.$router.push("/fimm/finance-candidate-exam-ut-report");
    },
     finance_candidate_exam_prs_report() {
      this.$router.push("/fimm/finance-candidate-exam-prs-report");
    },
    finance_prepayment_ut_report() {
      this.$router.push("/fimm/finance-prepayment-ut-report");
    },
     finance_prepayment_prs_report() {
      this.$router.push("/fimm/finance-prepayment-prs-report");
    },
     finance_prepayment_refund_report() {
      this.$router.push("/fimm/finance-prepayment-refund-report");
    },
     finance_cute_result_ut_report() {
      this.$router.push("/fimm/finance-cute-result-ut-report");
    },
     finance_cute_result_prs_report() {
      this.$router.push("/fimm/finance-cute-result-prs-report");
    },
    finance_amsf_collection_report() {
      this.$router.push("/fimm/finance-amsf-collection-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
