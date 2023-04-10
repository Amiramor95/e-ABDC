 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i>&nbsp;&nbsp; <b>ANNUAL FEES REPORT LISTS</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>AMSF AUM for year X</span>
            <button
              @click="amsf_aum_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>AMSF Gross Sales for year X</span>
            <button
              @click="amsf_gross_sale_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Total Submission Year X</span>
            <button
              @click="amsf_total_submission_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Summary Report UTF Subscription Fees for YX (UTMC)</span>
            <button
              @click="amsf_summary_utmc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report UTF Subscription Fees for YX (IUTA)</span>
            <button
              @click="amsf_summary_iuta_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report Annual Membership Fees/Annual Fee Payment (UTMC-PRP) Year X</span>
            <button
              @click="amsf_summary_utmc_prp_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report Annual Membership Fees/Annual Fee Payment (PRP) Year X</span>
            <button
              @click="amsf_summary_prp_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report Annual Membership Fees/Annual Fee Payment (IUTA-IPRA) Year X</span>
            <button
              @click="amsf_summary_iuta_iprp_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report Annual Membership Fees/Annual Fee Payment (UTMC-IPRA)  Year X</span>
            <button
              @click="amsf_summary_utmc_iprp_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary Report Annual Membership Fees/Annual Fee Payment (CUTA/CPRA) Year X</span>
            <button
              @click="amsf_summary_cuta_cpra_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>AUM & TGS Report</span>
            <button
              @click="amsf_aum_tgs_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <!-- <div>
            <span>Membership Fees Dues</span>
            <button
              @click="amsf_membership_fees_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fee Waiver/Discount</span>
            <button
              @click="amsf_fee_waiver_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Collection summary</span>
            <button
              @click="amsf_collection_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Debtors outstanding summary</span>
            <button
              @click="amsf_debtors_outstanding_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Debtors Statement</span>
            <button
              @click="amsf_debtors_statement_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div> -->
           <div>
            <span>Form A1 *External Distributor (UTMC,PRP)</span>
            <button
              @click="amsf_a1form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Form A2 *External Distributor (UTMC,PRP)</span>
            <button
              @click="amsf_a2form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Form B1 *External Distributor (IUTA,CPRA,CUTA,IPRA)</span>
            <button
              @click="amsf_b1form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Form B2 *External Distributor (IUTA,CPRA,CUTA,IPRA)</span>
            <button
              @click="amsf_b2form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Form C1 *External Distributor (UTMC,PRP)</span>
            <button
              @click="amsf_c1form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Form C2 *External Distributor (UTMC,PRP)</span>
            <button
              @click="amsf_c2form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Form D1 *External Distributor (IUTA,CPRA,CUTA,IPRA)</span>
            <button
              @click="amsf_d1form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Form D2 *External Distributor (IUTA,CPRA,CUTA,IPRA)</span>
            <button
              @click="amsf_d2form_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Asset Under Management (AUM) & Total Gross Sales (TGS) Report * External Distributor</span>
            <button
              @click="amsf_aum_tgs_distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Total AMSF for year X (AUM)</span>
            <button
              @click="amsf_total_aum_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Total AMSF for year X (Sales)</span>
            <button
              @click="amsf_total_sales_report"
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
    amsf_aum_report() {
    this.$router.push("/fimm/amsf-aum-report");
    },
    amsf_gross_sale_report() {
      this.$router.push("/fimm/amsf-gross-sale-report");
    },
    amsf_total_submission_report() {
      this.$router.push("/fimm/amsf-total-submission-report");
    },
    amsf_summary_utmc_report() {
      this.$router.push("/fimm/amsf-summary-utmc-report");
    },
    amsf_summary_iuta_report() {
      this.$router.push("/fimm/amsf-summary-iuta-report");
    },
    amsf_summary_utmc_prp_report() {
      this.$router.push("/fimm/amsf-summary-utmc-prp-report");
    },
    amsf_summary_prp_report() {
      this.$router.push("/fimm/amsf-summary-prp-report");
    },
    amsf_summary_iuta_iprp_report() {
      this.$router.push("/fimm/amsf-summary-iuta-iprp-report");
    },
    amsf_summary_utmc_iprp_report() {
      this.$router.push("/fimm/amsf-summary-utmc-iprp-report");
    },
    amsf_summary_cuta_cpra_report() {
      this.$router.push("/fimm/amsf-summary-cuta-cpra-report");
    },
    amsf_aum_tgs_report() {
      this.$router.push("/fimm/amsf-aum-tgs-report");
    },
    amsf_membership_fees_report() {
      this.$router.push("/fimm/amsf-membership-fees-report");
    },
    amsf_fee_waiver_report() {
      this.$router.push("/fimm/amsf-fee-waiver-report");
    },
    amsf_collection_summary_report() {
      this.$router.push("/fimm/amsf-collection-summary-report");
    },
    amsf_debtors_outstanding_summary_report() {
      this.$router.push("/fimm/amsf-debtors-outstanding-summary-report");
    },
    amsf_debtors_statement_report() {
      this.$router.push("/fimm/amsf-debtors-statement-report");
    },
    amsf_a1form_distributor_report() {
      this.$router.push("/fimm/amsf-a1form-distributor-report");
    },
    amsf_a2form_distributor_report() {
      this.$router.push("/fimm/amsf-a2form-distributor-report");
    },
    amsf_b1form_distributor_report() {
      this.$router.push("/fimm/amsf-b1form-distributor-report");
    },
    amsf_b2form_distributor_report() {
      this.$router.push("/fimm/amsf-b2form-distributor-report");
    },
    amsf_c1form_distributor_report() {
      this.$router.push("/fimm/amsf-c1form-distributor-report");
    },
    amsf_c2form_distributor_report() {
      this.$router.push("/fimm/amsf-c2form-distributor-report");
    },
    amsf_d1form_distributor_report() {
      this.$router.push("/fimm/amsf-d1form-distributor-report");
    },
    amsf_d2form_distributor_report() {
      this.$router.push("/fimm/amsf-d2form-distributor-report");
    },
    amsf_aum_tgs_distributor_report() {
      this.$router.push("/fimm/amsf-aum-tgs-distributor-report");
    },
    amsf_total_aum_report() {
      this.$router.push("/fimm/amsf-total-aum-report");
    },
     amsf_total_sales_report() {
      this.$router.push("/fimm/amsf-total-sales-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
