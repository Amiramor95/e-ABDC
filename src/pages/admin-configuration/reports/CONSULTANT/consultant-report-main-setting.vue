 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i>&nbsp;&nbsp; <b>CONSULTANT MANAGEMENT REPORT LISTS</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>Consultants Details Report</span>
            <button
              @click="consultant_detail_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Consultants Registration Report</span>
            <button
              @click="consultant_registration_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Consultants Registration Summary</span>
            <button
              @click="consultant_registration_sum_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Consultants Termination Report</span>
            <button
              @click="consultant_termination_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Consultants Termination Summary</span>
            <button
              @click="consultant_termination_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Active Consultants Report</span>
            <button
              @click="consultant_active_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Active Consultants Summary</span>
            <button
              @click="consultant_active_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Consultants Bankruptcy Report</span>
            <button
              @click="consultant_bankruptcy_report"
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
    consultant_detail_report() {
    this.$router.push("/fimm/consultant-details-report");
    },
    consultant_registration_report() {
      this.$router.push("/fimm/consultant-registration-report");
    },
    consultant_registration_sum_report() {
      this.$router.push("/fimm/consultant-registration-summary-report");
    },
    consultant_termination_report() {
      this.$router.push("/fimm/consultant-termination-report");
    },
    consultant_termination_summary_report() {
      this.$router.push("/fimm/consultant-termination-summary-report");
    },
     consultant_active_report() {
      this.$router.push("/fimm/consultant-active-report");
    },
     consultant_active_summary_report() {
      this.$router.push("/fimm/consultant-active-summary-report");
    },
     consultant_bankruptcy_report() {
      this.$router.push("/fimm/consultant-bankruptcy-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
