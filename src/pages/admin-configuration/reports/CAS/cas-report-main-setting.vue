 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-balance-scale"></i>&nbsp;&nbsp; <b>Consultant Alert Reports</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>UTC Tagging List</span>
            <button
              @click="utc_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Enquiry Report</span>
            <button
              @click="enquiry_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>Total number of complaints received by FIMM</span>
            <button
              @click="total_complain"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>The total number of UTS consultants sanctioned by FIMM based on Distributors </span>
            <button
              @click="fimm_distributor"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>Breakdown of Complaints Reviewed</span>
            <button
              @click="cas_complain_reviewed"
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
    utc_report() {
    this.$router.push("/fimm/cas-utc-tagging-list-report");
    },
    enquiry_report() {
      this.$router.push("/fimm/cas-enquiry-report");
    },
    total_complain() {
      this.$router.push("/fimm/total-complain-fimm");
    },
    fimm_distributor() {
      this.$router.push("/fimm/sanctioned-fimm-distributor");
    },
     cas_complain_reviewed() {
      this.$router.push("/fimm/cas-complain-reviewed");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
