 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Dashboard Settings</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon vuestic-iconset vuestic-iconset-dashboard"></i>&nbsp;&nbsp; <b>CPD Dashboard  Setting</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>CPD Module Dashboard Setting</span>
            <button
              @click="cpd_dashboard"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>CPD List Of Statistic</span>
            <button
              @click="cpd_dashboard_list"
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
    this.$router.push("/fimm/dashboard-main-setting");
    },
    cpd_dashboard() {
    this.$router.push("/fimm/cpd-dashboard-setting");
    },
    cpd_dashboard_list() {
      this.$router.push("/fimm/cpd-dashboard-list");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
