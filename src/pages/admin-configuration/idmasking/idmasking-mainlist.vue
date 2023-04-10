 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">ID MASKING SETTING</h4>
      </div>
      
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-map-o"></i>&nbsp;&nbsp; <b>ID MASKING SETTING</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>DISTRIBUTOR ID MASKING SETTING</span>
            <button
              @click="distributor"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>CONSULTANT ID MASKING SETTING</span>
            <button
              @click="consultant"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>TRAINING PROVIDER ID MASKING SETTING</span>
            <button
              @click="provider"
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
  // DATA SCHEMA
  data() {
    return {

    };
  },
  methods: {
    distributor() {
      this.$router.push("/fimm/distributor-idmasking");
    },
    consultant() {
      this.$router.push("/fimm/consultant-idmasking");
    },
    provider() {
      this.$router.push("/fimm/trainingprovider-idmasking");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
