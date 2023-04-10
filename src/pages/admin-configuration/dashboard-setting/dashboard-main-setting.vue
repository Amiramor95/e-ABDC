 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Dashboard Settings</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon vuestic-iconset vuestic-iconset-dashboard"></i>&nbsp;&nbsp; <b>Dashboard Main Setting</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Main Dashboard Setting</span>
            <button
              @click="main_original_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Admin Dashboard Setting</span>
            <button
              @click="main_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Distributor Module Dashboard Setting</span>
            <button
              @click="distributor_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Consultant Module Dashboard Setting</span>
            <button
              @click="consultant_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Funds Management Module Dashboard Setting</span>
            <button
              @click="funds_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Finance Module Dashboard Setting</span>
            <button
              @click="finance_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Annual Fees Module Dashboard Setting</span>
            <button
              @click="annual_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Consultant Alert Module Dashboard Setting</span>
            <button
              @click="consultant_alert_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>CPD Dashboard Setting</span>
            <button
              @click="cpd_dashboard"
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
    main_dashboard() {
      this.$router.push("/fimm/admin-dashboard-main-setting");
    },
    distributor_dashboard() {
    this.$router.push("/fimm/distributor_main_setting");
    },
    consultant_dashboard() {
      this.$router.push("/fimm/consultant-dashboard-main-setting");
    },
    funds_dashboard() {
      this.$router.push("/fimm/fund-dashboard-main-setting");
    },
    finance_dashboard() {
      this.$router.push("/fimm/finance-dashboard-main-setting");
    },
    annual_dashboard() {
      this.$router.push("/fimm/afms-dashboard-main-setting");
    },
    consultant_alert_dashboard() {
      this.$router.push("/fimm/consultant-alert-main-setting");
    },
    cpd_dashboard() {
      this.$router.push("/fimm/cpd-dashboard-main-setting");
    },
     main_original_dashboard() {
      this.$router.push("/fimm/main-dashboard-main-setting");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
