
 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">CONSULTANT</h4>
      </div>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-bank"></i>&nbsp;&nbsp; <b>PRS FAMILIARISATION PROGRAM</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>UNIT TRUST CONSULTANT</span>
           <button
                  v-if="visiblePRSFamiliarization == false"
                  v-b-toggle.collapse-8
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePRSFamiliarization == true"
                  v-b-toggle.collapse-8
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                 <b-collapse v-model="visiblePRSFamiliarization" class="mt-4" id="collapse-8">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description ">START DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_START_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">END DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_END_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">EFFECTIVE DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_EFFECTIVE_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitPRS"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
          </div>
           <div>
            <span>FORMER UNIT TRUST CONSULTANT</span>
            <button
                  v-if="visiblePRSFamiliarizationformer == false"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePRSFamiliarizationformer == true"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse v-model="visiblePRSFamiliarizationformer" class="mt-4" id="collapse-9">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                          
                        <span class="col mt-3 description">START DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_FORMER_START_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">END DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_FORMER_END_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">EFFECTIVE DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_PRS_FORMER_EFFECTIVE_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitPRSFORMER"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
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
import Vudal from "vudal";
import * as servicesModule0 from "../../../app/module0/services02";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue"
import FullCalendar from "@fullcalendar/vue";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing, FullCalendar,
    Vudal,},
  mounted() {
     this.getAllPRS();
     this.getAllPRSFORMER();
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
         visiblePRSFamiliarization: false,
         visiblePRSFamiliarizationformer: false,
         CONSULTANT_PRS_FAMILIARISATION_ID: "",
         model:{
            CONSULTANT_PRS_START_DATE: '',
            CONSULTANT_PRS_END_DATE: '',
            CONSULTANT_PRS_EFFECTIVE_DATE: '',

            CONSULTANT_PRS_FORMER_START_DATE: '',
            CONSULTANT_PRS_FORMER_END_DATE: '',
            CONSULTANT_PRS_FORMER_EFFECTIVE_DATE: '',
         }

    };
  },
  methods: {
        back() {
        this.$router.push("/fimm/consultant-configuration");
        },
        registration_declaration_consult() {
        this.$router.push("/fimm/registration_declaration_consultant");
        },
        exam_declaration() {
        this.$router.push("/fimm/exam_declaration_consultant");
        },
           //PRS Familiriazation
    getAllPRS: async function () {
      const response = await servicesModule0.getPrsById();
      this.CONSULTANT_PRS_FAMILIARISATION_ID = response.CONSULTANT_PRS_FAMILIARISATION_ID;
      this.model.CONSULTANT_PRS_START_DATE = response.CONSULTANT_PRS_START_DATE;
      this.model.CONSULTANT_PRS_END_DATE = response.CONSULTANT_PRS_END_DATE;
     this.model.CONSULTANT_PRS_EFFECTIVE_DATE = response.CONSULTANT_PRS_EFFECTIVE_DATE;

    },
    getAllPRSFORMER: async function () {
      const response = await servicesModule0.getPrsFormerById();
      this.CONSULTANT_PRS_FORMER_FAMILIARISATION_ID = response.CONSULTANT_PRS_FORMER_FAMILIARISATION_ID;
      this.model.CONSULTANT_PRS_FORMER_START_DATE = response.CONSULTANT_PRS_FORMER_START_DATE;
      this.model.CONSULTANT_PRS_FORMER_END_DATE = response.CONSULTANT_PRS_FORMER_END_DATE;
     this.model.CONSULTANT_PRS_FORMER_EFFECTIVE_DATE = response.CONSULTANT_PRS_FORMER_EFFECTIVE_DATE;

    },

    async submitPRS() {
      let app = this;
      var param = app.model;

        var startdate= moment(this.model.CONSULTANT_PRS_START_DATE).unix();
        var enddate= moment(this.model.CONSULTANT_PRS_END_DATE).unix();
        if(startdate > enddate)
        {
          alert("Start Date Cannot Bigger Than End Date");
        }
       else{
          const data = new FormData();
           data.append("CONSULTANT_PRS_FAMILIARISATION_ID", this.CONSULTANT_PRS_FAMILIARISATION_ID);
          data.append("CONSULTANT_PRS_START_DATE", moment(this.model.CONSULTANT_PRS_START_DATE).format("YYYY-MM-DD"));
          data.append("CONSULTANT_PRS_END_DATE", moment(this.model.CONSULTANT_PRS_END_DATE).format("YYYY-MM-DD"));
           data.append("CONSULTANT_PRS_EFFECTIVE_DATE", moment(this.model.CONSULTANT_PRS_EFFECTIVE_DATE).format("YYYY-MM-DD"));
          try {
            // eslint-disable-next-line no-unused-vars
           const response = await servicesModule0.createPrs(data);
            this.getAllPRS();
            // this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error);
          }
       }
    },
     async submitPRSFORMER() {

      let app = this;
      var param = app.model;

        var startdate= moment(this.model.CONSULTANT_PRS_FORMER_START_DATE).unix();
        var enddate= moment(this.model.CONSULTANT_PRS_FORMER_END_DATE).unix();
        if(startdate > enddate)
        {
          alert("Start Date Cannot Bigger Than End Date");
        }
       else{
          const data = new FormData();
          data.append("CONSULTANT_PRS_FORMER_START_DATE", moment(this.model.CONSULTANT_PRS_FORMER_START_DATE).format("YYYY-MM-DD"));
          data.append("CONSULTANT_PRS_FORMER_END_DATE", moment(this.model.CONSULTANT_PRS_FORMER_END_DATE).format("YYYY-MM-DD"));
           data.append("CONSULTANT_PRS_FORMER_EFFECTIVE_DATE", moment(this.model.CONSULTANT_PRS_FORMER_EFFECTIVE_DATE).format("YYYY-MM-DD"));
          try {
            // eslint-disable-next-line no-unused-vars
           const response = await servicesModule0.createPrsFormer(data);
            this.getAllPRSFORMER();
            // this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error);
          }
       }
    },

  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
.mt-3{
    top: 20px;
}
</style>
