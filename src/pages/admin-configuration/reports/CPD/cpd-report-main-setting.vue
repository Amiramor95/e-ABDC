 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Reports</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon fa fa-list"></i>&nbsp;&nbsp; <b>Continuing Professional Development</b>
        </h5>
        <hr />
        <div class="ml-5">
           <div>
            <span>List of CPD Program (Secretariat)</span>
            <button
              @click="cpd_program_secretariat_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>List of CPD Program (Secretariat) - Repeated</span>
            <button
              @click="cpd_program_repeated_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>List of Evaluation Report</span>
            <button
              @click="evaluation_report"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
          <div>
            <span>List of FPAM Modules</span>
            <button
              @click="cpd_fpam_module"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Obtaining Academic or Professional Qualifications</span>
            <button
              @click="academic"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Reading Approved Financial Literatures</span>
            <button
              @click="reading_app"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Teaching or Speaking on Program Approved by FIMM</span>
            <button
              @click="teaching"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Waiver From CPD Requirements</span>
            <button
              @click="waiver"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Writing and Publishing Books & Articles</span>
            <button
              @click="writing"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Participant Record (Consultant)</span>
            <button
              @click="record_consultant"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
           <div>
            <span>List of Participant Record (CPD Program)</span>
            <button
              @click="record_cpd"
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
    cpd_program_secretariat_report() {
    this.$router.push("/fimm/cpd-program-secretariat-report");
    },
    cpd_program_repeated_report() {
      this.$router.push("/fimm/cpd-program-repeated-report");
    },
    evaluation_report() {
      this.$router.push("/fimm/cpd-evaluation-report");
    },
    cpd_fpam_module() {
      this.$router.push("/fimm/cpd-fpam-report");
    },
    academic() {
      this.$router.push("/fimm/cpd-academic-report");
    },
     reading_app() {
      this.$router.push("/fimm/cpd-reading-report");
    },
     teaching() {
      this.$router.push("/fimm/cpd-teaching-report");
    },
     waiver() {
      this.$router.push("/fimm/cpd-waiver-report");
    },
     writing() {
      this.$router.push("/fimm/cpd-writing-report");
    },
     record_consultant() {
      this.$router.push("/fimm/cpd-record-consultant-report");
    },
     record_cpd() {
      this.$router.push("/fimm/cpd-record-report");
    },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
