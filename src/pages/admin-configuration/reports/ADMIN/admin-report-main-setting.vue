 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i>&nbsp;&nbsp; <b>ADMIN REPORT LISTS</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>List of User</span>
            <button
              @click="admin_user_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Summary: List of User</span>
            <button
              @click="admin_user_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>View Event Log & User Log</span>
            <button
              @click="admin_event_log_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>User Matrix - Authorization</span>
            <button
              @click="admin_user_matrix_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Distributor User Matrix</span>
            <button
              @click="admin_distributor_usermatrix_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>FIMM User Matrix</span>
            <button
              @click="admin_fimm_matrix_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Distributor Report Matrix</span>
            <button
              @click="admin_distributor_report_matrix"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>FIMM Report Matrix</span>
            <button
              @click="admin_fimm_report_matrix"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Screen Management</span>
            <button
              @click="admin_screen_management_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>SMS Log</span>
            <button
              @click="admin_sms_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Summary : SMS Log</span>
            <button
              @click="admin_summary_sms_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Address Management</span>
            <button
              @click="admin_address_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Calendar Management</span>
            <button
              @click="admin_calendar_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Announcement Management</span>
            <button
              @click="admin_announcement_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Circular Management</span>
            <button
              @click="admin_circular_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Template</span>
            <button
              @click="admin_templatelist_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Declaration Report</span>
            <button
              @click="admin_declaration_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>ID Masking Management</span>
            <button
              @click="admin_id_masking_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Approval Report</span>
            <button
              @click="admin_approval_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Salutation Listing</span>
            <button
              @click="admin_salutation_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Fee Management Report</span>
            <button
              @click="admin_fee_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <!-- <div>
            <span>Listing of Code Table</span>
            <button
              @click="admin_finance_code_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div> -->
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
    admin_user_report() {
    this.$router.push("/fimm/admin-user-report");
    },
    admin_sms_report() {
      this.$router.push("/fimm/admin-sms-log-report");
    },
    admin_summary_sms_report() {
      this.$router.push("/fimm/admin-summary-sms-log-report");
    },
    admin_screen_management_report() {
      this.$router.push("/fimm/admin-screen-management-report");
    },
    admin_address_report() {
      this.$router.push("/fimm/admin-address-report");
    },
     admin_calendar_report() {
      this.$router.push("/fimm/admin-calendar-management-report");
    },
     admin_salutation_report() {
      this.$router.push("/fimm/admin-salutation-report");
    },
     admin_declaration_report() {
      this.$router.push("/fimm/admin-declaration-report");
    },
     admin_fee_report() {
      this.$router.push("/fimm/admin-fee-management-report");
    },
     admin_circular_report() {
      this.$router.push("/fimm/admin-circular-management-report");
    },
     admin_announcement_report() {
      this.$router.push("/fimm/admin-announcement-management-report");
    },
     admin_user_matrix_report() {
      this.$router.push("/fimm/admin-user-matrix-report");
    },
     admin_distributor_usermatrix_report() {
      this.$router.push("/fimm/admin-distributor-matrix-report");
    },
     admin_fimm_matrix_report() {
      this.$router.push("/fimm/admin-fimm-matrix-report");
    },
     admin_distributor_report_matrix() {
      this.$router.push("/fimm/admin-distributor-report-matrix");
    },
     admin_fimm_report_matrix() {
      this.$router.push("/fimm/admin-fimm-report-matrix");
    },
    admin_user_summary_report() {
      this.$router.push("/fimm/admin-user-summary-report");
    },
    admin_event_log_report() {
      this.$router.push("/fimm/admin-event-log-report");
    },
    admin_templatelist_report() {
      this.$router.push("/fimm/admin-templatelist-report");
    },
    admin_id_masking_report() {
      this.$router.push("/fimm/admin-id-masking-report");
    },
     admin_approval_report() {
      this.$router.push("/fimm/admin-approval-report");
    },
     admin_finance_code_report() {
      this.$router.push("/fimm/admin-financecode-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
