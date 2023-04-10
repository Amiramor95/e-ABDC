 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i>&nbsp;&nbsp; <b>FUND MANAGEMENT REPORT LISTS</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>Daily NAV Report</span>
            <button
              @click="fund_daily_nav_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Daily NAV Report - Admin Report</span>
            <button
              @click="fund_daily_nav_admin_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Audit Trail Report</span>
            <button
              @click="fund_audit_trail_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Historical NAV Report</span>
            <button
              @click="fund_historical_nav_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Historical NAV Report - Details</span>
            <button
              @click="fund_historical_nav_detail_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>NAV Movement</span>
            <button
              @click="fund_nav_movement_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Historical NAV Report</span>
            <button
              @click="fund_historical_nav_user_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - New Funds</span>
            <button
              @click="fund_data_new_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - Closed Funds</span>
            <button
              @click="fund_data_closed_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - EPF Funds</span>
            <button
              @click="fund_data_epf_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - SRI/ESG & Shariah Funds</span>
            <button
              @click="fund_data_sri_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - Status</span>
            <button
              @click="fund_data_status_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Data - All</span>
            <button
              @click="fund_data_all_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>FMS User Summary</span>
            <button
              @click="fund_user_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>FMS User Summary(FIMM)</span>
            <button
              @click="fund_user_summary_fimm_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Event Log</span>
            <button
              @click="fund_event_log_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>UTMC Contact Person</span>
            <button
              @click="fund_user_contact_person_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Newspaper/Publication Contact Person</span>
            <button
              @click="fund_newspaper_contact_person_report"
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
    fund_daily_nav_report() {
    this.$router.push("/fimm/fund-daily-nav-report");
    },
    fund_daily_nav_admin_report() {
      this.$router.push("/fimm/fund-daily-nav-admin-report");
    },
    fund_audit_trail_report() {
      this.$router.push("/fimm/fund-audit-trail-report");
    },
    fund_historical_nav_report() {
      this.$router.push("/fimm/fund-historical-nav-report");
    },
    fund_historical_nav_detail_report() {
      this.$router.push("/fimm/fund-historical-nav-detail-report");
    },
     fund_nav_movement_report() {
      this.$router.push("/fimm/fund-nav-movement-report");
    },
     fund_historical_nav_user_report() {
      this.$router.push("/fimm/fund-historical-nav-user-report");
    },
    fund_data_new_report() {
      this.$router.push("/fimm/fund-data-new-report");
    },
     fund_data_closed_report() {
      this.$router.push("/fimm/fund-data-closed-report");
    },
     fund_data_epf_report() {
      this.$router.push("/fimm/fund-data-epf-report");
    },
     fund_data_sri_report() {
      this.$router.push("/fimm/fund-data-sri-report");
    },
     fund_data_status_report() {
      this.$router.push("/fimm/fund-data-status-report");
    },
     fund_data_all_report() {
      this.$router.push("/fimm/fund-data-all-report");
    },
    fund_user_summary_report() {
      this.$router.push("/fimm/fund-user-summary-report");
    },
     fund_user_summary_fimm_report() {
      this.$router.push("/fimm/fund-user-summary-fimm-report");
    },
     fund_event_log_report() {
      this.$router.push("/fimm/fund-event-log-report");
    },
    fund_user_contact_person_report() {
      this.$router.push("/fimm/fund-utmc-contact-person-report");
    },
    fund_newspaper_contact_person_report() {
      this.$router.push("/fimm/fund-newspaper-contact-person-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
