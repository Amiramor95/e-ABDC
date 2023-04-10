 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i>&nbsp;&nbsp; <b>DISTRIBUTOR MANAGEMENT REPORT LISTS</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>Distributor Information Report</span>
            <button
              @click="distributor_information_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Distributor Type Summary</span>
            <button
              @click="distributor_type_summary_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Distribution Points Report</span>
            <button
              @click="distributor_point_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Consultants by Distribution Point</span>
            <button
              @click="distributor_consultant_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Fund Lodgement Report</span>
            <button
              @click="distributor_fund_lodgement_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>SMS Report</span>
            <button
              @click="distributor_sms_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Pre-Registration Bankruptcy Check Report</span>
            <button
              @click="distributor_prebankruptcy_report"
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
    distributor_information_report() {
    this.$router.push("/fimm/distributor-information-report");
    },
    distributor_type_summary_report() {
      this.$router.push("/fimm/distributor-type-summary-report");
    },
    distributor_point_report() {
      this.$router.push("/fimm/distributor-point-report");
    },
    distributor_consultant_report() {
      this.$router.push("/fimm/distributor-consultant-report");
    },
    distributor_fund_lodgement_report() {
      this.$router.push("/fimm/distributor-fund-lodgement-report");
    },
     distributor_sms_report() {
      this.$router.push("/fimm/distributor-sms-report");
    },
     distributor_prebankruptcy_report() {
      this.$router.push("/fimm/distributor-prebankruptcy-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
