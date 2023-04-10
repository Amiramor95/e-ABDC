 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">ANNUAL FEES MANAGEMENT</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-bank"></i>&nbsp;&nbsp; <b>DECLARATION</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>ANNUAL FEE INVOICE SETTING</span>
            <button
              @click="annualInvoice"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>ANNUAL FEES PERIOD SETTING</span>
            <button
              @click="annualPeriod"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>AMSF/ANNUAL FEES SUBMISSION DECLARATION</span>
            <button
              @click="annualdeclaration"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
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
  mounted() {
    this.getPasswordSetting();
    this.getUserIdSetting();
  },
  watch: {
    selectedMinLength: function(val) {
      if (val == false) {
        this.passwordSetting.MIN_LENGTH = 0;
      }
    },
    selectedMaxLength: function(val) {
      if (val == false) {
        this.passwordSetting.MAX_LENGTH = 0;
      }
    }
  },
  // DATA SCHEMA
  data() {
    return {

    };
  },
  methods: {
        back() {
          this.$router.go(-1);
        },
        annualdeclaration() {
        this.$router.push("/fimm/amsf_declaration");
        },
        annualInvoice() {
        this.$router.push("/fimm/annualFee-invoice-configuration");
        },
        annualPeriod() {
        this.$router.push("/fimm/annualFee-configuration");
        },

        
       
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
