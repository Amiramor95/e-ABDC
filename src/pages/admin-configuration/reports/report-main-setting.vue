 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon fa fa-eye" aria-hidden="true"></i>
&nbsp;&nbsp; <b>Reports</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span class="text_style">Admin Management</span>
            <button
              @click="admin_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span class="text_style">Distributor Management</span>
            <button
              @click="distributor_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span class="text_style">Consultant Management</span>
            <button
              @click="consultant_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span class="text_style">Consultant Alert Reports</span>
            <button
              @click="consultant_alert_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span class="text_style">Continuing Professional Development</span>
            <button
              @click="cpd_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span class="text_style">FINANCE MANAGEMENT</span>
            <button
              @click="finance_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span class="text_style">FUND MANAGEMENT</span>
            <button
              @click="fund_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span class="text_style">ANNUAL FEES</span>
            <button
              @click="annual_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Spacing from "../../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../../app/module0/services06";

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
   admin_report() {
      this.$router.push("/fimm/admin-report-main-setting");
    },
    finance_report() {
    this.$router.push("/fimm/finance-report-main-setting");
    },
    consultant_alert_report() {
      this.$router.push("/fimm/cas-report-main-setting");
    },
    cpd_report() {
      this.$router.push("/fimm/cpd-report-main-setting");
    },
    consultant_report() {
      this.$router.push("/fimm/consultant-report-main-setting");
    },
     distributor_report() {
      this.$router.push("/fimm/distributor-report-main-setting");
    },
     fund_report() {
      this.$router.push("/fimm/fund-report-main-setting");
    },
     annual_report() {
      this.$router.push("/fimm/annual-report-main-setting");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
.text_style{
  text-transform: uppercase;
}
</style>
