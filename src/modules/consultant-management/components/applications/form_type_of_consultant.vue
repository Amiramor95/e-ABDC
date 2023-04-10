<template>
  <div>
    <div v-if="!checkacceptaceDetails">
      <b-card>
        <div class="text-center">
          <b-spinner variant="success" label="Spinning"></b-spinner>
          <p>Checking Consultant Acceptance List</p>
        </div>
      </b-card>
    </div>

    <div v-else>
      <div v-if="acceptaceDetailsData">
        <div class="row">
          <div class="col-lg-8 col-md-12">
            <h5>Agent Type:</h5>
            <b-form-group id="input-group-category" class="required"
              :state="validateAgent('CANDIDATE_CATEGORY')"
              aria-describedby="agent-required-msg"
            >
              <b-form-radio-group
                v-model="model.CANDIDATE_CATEGORY"
                :options="agent_types"
                name="radio-agent-type"
              ></b-form-radio-group>

              <b-form-invalid-feedback id="agent-required-msg">
                Please select one agent type.
              </b-form-invalid-feedback>
            </b-form-group>


            <!-- <div v-if="model.CANDIDATE_CATEGORY == 1">
              <section-agent-position
                ref="staff_position"
                :savedConsultantLicenseData="savedConsultantLicenseData"
              ></section-agent-position>
            </div> -->

            <div v-if="model.CANDIDATE_CATEGORY == 1">
                <b-form-group
                  label="Select your position:"
                  label-for="positions"
                  label-cols-lg="3"
                  label-cols-md="2"
                  description=""
                >

                  <select id="positions" class="form-control col-lg-9 col-md-10 p-0"
                      v-model="model.CANDIDATE_POSITION_CATEGORY" placeholder="Select a position">
                        <option
                            v-for="position in general_settings.STAFF_POSITIONS"
                            v-bind:key="position.ID"
                            :value="position.ID"
                          >
                            {{position.NAME}}
                          </option>
                  </select>
                </b-form-group>

                <div v-if="model.CANDIDATE_POSITION_CATEGORY">
                  <b-form-group
                    label="Position:"
                    label-cols-lg="3"
                    label-cols-md="2"
                    label-for="input-1"
                    description=""
                    v-if="model.CANDIDATE_POSITION_CATEGORY === 3"
                  >
                    <b-form-input
                      id="positions"
                      v-model="model.CANDIDATE_POSITION"
                      placeholder="Position's name"
                      class="col-lg-9 col-md-10 text-uppercase"
                    ></b-form-input>
                  </b-form-group>
                </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-8 col-md-12">
            <!--  License type  -->
            <h5 class>Choose your License:</h5>
            <b-form-group
              id="input-group-license-type"
              label="License Type:"
              label-cols-lg="3"
              label-cols-md="2"
              label-for="input-1"
              description
              class="required"
            >
              <b-form-select
                v-model="model.CONSULTANT_TYPE_ID"
                class="col-lg-9 bgcolor"
                @change="getDistributorsAndDistributorPointsList"
                :state="validateLicense('CONSULTANT_TYPE_ID')"
                aria-describedby="license-required-msg"
              >
                <template>
                  <option
                    v-for="license in LICENSE_TYPES"
                    v-bind:key="license.CONSULTANT_TYPE_ID"
                    :value="license.CONSULTANT_TYPE_ID"
                  >
                    {{license.TYPE_FULL_NAME}}
                  </option>
                </template>
              </b-form-select>

              <b-form-invalid-feedback id="license-required-msg">
                Please select on license before proceeding next.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-8 col-md-12">
            <h5 class>Choose your preferred Distributor:</h5>

            <b-form-group
              id="input-group-1"
              label="List of Distributors:"
              label-cols-lg="3"
              label-cols-md="2"
              label-for="input-1"
              description
              class="required"
            >
              <b-form-select v-model="model.DISTRIBUTOR_ID" class="col-lg-9"
              :state="validateDistributor('DISTRIBUTOR_ID')"
              aria-describedby="distributor-required-msg"
              @change="checkDistributorPointsAndType">
                <template>
                  <option
                    v-for="distributor in DISTRIBUTORS"
                    v-bind:key="distributor.DISTRIBUTOR_ID"
                    :value="distributor.DISTRIBUTOR_ID"
                  >
                    {{ distributor.DIST_NAME }}
                  </option>
                </template>
              </b-form-select>

              <b-form-invalid-feedback id="distributor-required-msg">
                Please select one preferred distributor.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Distribution Point:"
              label-cols-lg="3"
              label-cols-md="2"
              label-for="input-1"
              description
            >
              <b-form-select v-model="model.DIST_POINT_ID" class="col-lg-9">
                <template>
                  <option
                    v-for="distributor_point in DISTRIBUTOR_POINTS"
                    v-bind:key="distributor_point.DIST_POINT_ID"
                    :value="distributor_point.DIST_POINT_ID"
                  >
                    {{ distributor_point.DIST_POINT_NAME }}
                  </option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>
        </div>

        <div class="row mt-5" v-if="cmsrl_load">
          <div class="col-lg-8 col-md-12">
            <h5 class>CMSRL:</h5>

            <b-form-group>
              <b-form-radio-group
                id="chk-is-cmsrl"
                v-model="model.CMSRL"
                :options="cmsrl"
                name="chk-is-cmsrl"
              ></b-form-radio-group>
            </b-form-group>

            <div v-if="model.CMSRL!=null">
              <section-cmsrl-true
                getCMSRLData="updateCMSRLData"
                :savedConsultantData="formDataModel"
                :savedConsultantLicenseData="savedConsultantLicenseData"
                :distributorCmsrlData="distributorCmsrlData"
                ref="cmsrl_datas_true"
                v-if="model.CMSRL === 1"
              ></section-cmsrl-true>

              <section-cmsrl-false v-if="model.CMSRL === 0"
              :savedConsultantData="formDataModel"
              :savedConsultantLicenseData="savedConsultantLicenseData"
              :distributorCmsrlData="distributorCmsrlData"
              ref="cmsrl_datas_false">
              </section-cmsrl-false>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="checkAcceptaceModal1" centered title="">
      <div class="d-block text-center">
          <h5>We are unable to find your distributor.</h5>
          <h5>Please contact your preferred distributor to upload your information.</h5>
      </div>
    </b-modal>
  </div>
</template>

<script>
/*
Component flow

- Create formDataModel
- Create inputsModel
- Show loading
- APIsDependenciesCounter = 0
- Load APIs - inputs data
- Watch for props/parent data loaded - formDataModel
- When data loaded ->
- Map loaded Dependencies data to inputsModel - dropdowns/ checkboxes
- Map loaded ConsultantApplication data to formDataModel
- Update form UI
- Hide loading

Events
- data_loaded
- model_updated

*/
import { mapActions, mapGetters, mapState } from "vuex";
import SectionAgentPosition from "./type-of-consultant/agent_position.vue";
import SectionCmsrlTrue from "./type-of-consultant/cmsrl_true.vue";
import SectionCmsrlFalse from "./type-of-consultant/cmsrl_false.vue";
import * as DistributorAPI from "../../../../app/module2/services02";
import * as AuthenticatedUserAPI from "../../services/auth";
import * as acceptanceListAPI from "@/app/module2/services02";
import * as services04Module2 from "../../../../app/module2/services04";

import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  ...mapState({
    type_consultant_data: (state) => state.consultant.applicant_details,
  }),
  components: {
    SectionAgentPosition,
    SectionCmsrlTrue,
    SectionCmsrlFalse,
  },
  props: {
    // The parameters the component accepts
    parentDataLoaded: Boolean,
    formDataModel: Object, //nthing done for component data commmunication
    // getCMSRLData: Function,
    savedConsultantLicenseData: Object,
    general_settings: Object,
  },
  computed: {
    // ...mapGetters({
    //   general_settings: "getGeneralSettings",
    // }),

    //get STAFF_POSITION
    staff_postion() {
      return this.$refs.staff_position.selected_position;
    },
  },
  data: function () {
    return {
      //new code
      cmsrl_load: false,
      consultant_nric: null, //fetching form api
      distributor_id: null,
      distributor_pointer_id: null, //fetching form api
      is_cmsrl: null,
      distributorTypeData: '',
      distributorCmsrlData: '',

      user: JSON.parse(localStorage.getItem("user")),
      formDataDependencyCounter: 0,

      checkacceptaceDetails: false,
      acceptaceDetailsData: '',
      checkAcceptaceModal1: false,

      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION2                            */
      /* -------------------------------------------------------------------------- */
      visibleCategoryStaff: false,
      visibleConsultant: false,
      visibleCMSRL_Yes: false,
      visibleCMSRL_No: false,
      visibleUTS: false,
      visiblePRS: false,

      // section 2 //for agent types
      agent_types: [
        {
          text: "Staff",
          value: 1,
        },
        {
          text: "Consultant",
          value: 2,
        },
      ],

      //for cmsrl options
      cmsrl: [
        {
          text: "Yes",
          value: 1,
        },
        {
          text: "No",
          value: 0,
        },
      ],

      options: [],

      LICENSE_TYPES: [], //fetching api data
      DISTRIBUTORS: [], //fetching api data
      DISTRIBUTOR_POINTS: [], //fetching api data

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */
        CONSULTANT_TYPE_ID: '', //selected with option

        CANDIDATE_CATEGORY: '',
        CANDIDATE_POSITION_CATEGORY: '',
        CANDIDATE_POSITION: '',

        DISTRIBUTOR_ID: '',
        DIST_POINT_ID: '',

        CMSRL: '',

        UTS: false, // not used in post methods
        PRS: false, // not used in post methods
      },
      inputsModel: {
        /* -------------------------------------------------------------------------- */
        /*                             DROPDOWN_MODEL                                 */
        /* -------------------------------------------------------------------------- */
        DISTRIBUTOR_MODEL: null,
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },

  validations: {
    model: {
      CANDIDATE_CATEGORY: { required },
      CONSULTANT_TYPE_ID: { required },
      DISTRIBUTOR_ID: { required },
    }
  },

  methods: {
    //newly edited
    /*
    1. Checking Applicant IC wiht Acceptance List
    2. get Nric NO of the user
    3. check Nric no to the table Acceptance_Details of distributor db  to get acceptance_candidate_id
    4. match candidate_acceptance_id with distributor_id  and get distributor id
    5. get distributor name form distributor table and list out options
      */

    async checkAcceptanceList(){
      try {
        if(this.formDataModel.CONSULTANT_NRIC){
          const response = await acceptanceListAPI.getAcceptanceList(this.formDataModel.CONSULTANT_NRIC, '');
          this.acceptaceDetailsData = response;
        }else{
          const response = await acceptanceListAPI.getAcceptanceList('', this.formDataModel.CONSULTANT_PASSPORT_NO);
          this.acceptaceDetailsData = response;
        }

        if(this.acceptaceDetailsData){
          this.checkacceptaceDetails = true;
        }else{
          this.checkacceptaceDetails = true;
          this.checkAcceptaceModal1 = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getConstultantType() {
      try {
        const res_consultantType = await DistributorAPI.getConsultantType();
        //console.log('Consultant Type Datas', res_consultantType)
        this.LICENSE_TYPES = res_consultantType;
      } catch (error) {
        console.log(error);
      }
    },

    async getNRICNo() {
      try {
        // const authUser = await AuthenticatedUserAPI.me();
        // this.consultant_nric = authUser.data.user.USER_NRIC;
        if(this.formDataModel.CONSULTANT_NRIC){
          this.consultant_nric = this.formDataModel.CONSULTANT_NRIC;
        }else{
          this.consultant_nric = this.formDataModel.CONSULTANT_PASSPORT_NO;
        }
        this.getDistributorsAndDistributorPointsList();
      } catch (error) {
        console.log(error);
      }
    },

    getDistributorsAndDistributorPointsList() {
      this.cmsrl_load = false;
      if(this.consultant_nric && this.model.CONSULTANT_TYPE_ID){
        this.getDistributorsByNRICNoAndLicenseType(
          this.consultant_nric,
          this.model.CONSULTANT_TYPE_ID
        ).then(response=>{
          this.DISTRIBUTORS=response});

        if(this.model.DISTRIBUTOR_ID){
          this.checkDistributorPointsAndType(this.model.DISTRIBUTOR_ID);
        }
      }
    },

    getDistributorsByNRICNoAndLicenseType(nric_number, license_type) {
      return new Promise( (resolve, reject) => {
        if(this.formDataModel.CONSULTANT_NRIC){
          DistributorAPI.getDistributorByNRIC(
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }else{
          DistributorAPI.getDistributorByPASSPORT(
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }
      })
    },

    async checkDistributorPointsAndType(distId){
      if(distId){
          this.getDistributorPointsByNRICNoAndLicenseType(
            distId,
            this.consultant_nric,
            this.model.CONSULTANT_TYPE_ID
          ).then(response=>{
            this.DISTRIBUTOR_POINTS=response
          });

        this.checkDistributorType(distId);
      }else if(this.model.DISTRIBUTOR_ID){
        this.getDistributorPointsByNRICNoAndLicenseType(
            this.model.DISTRIBUTOR_ID,
            this.consultant_nric,
            this.model.CONSULTANT_TYPE_ID
          ).then(response=>{
            this.DISTRIBUTOR_POINTS=response
          });

        this.checkDistributorType(this.model.DISTRIBUTOR_ID);
      }
    },

    getDistributorPointsByNRICNoAndLicenseType(distId, nric_number, license_type) {
      return new Promise( (resolve, reject) => {
        if(this.formDataModel.CONSULTANT_NRIC){
          DistributorAPI.getDistributorPointsByNRIC(
            distId,
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }else{
          DistributorAPI.getDistributorPointsByPASSPORT(
            distId,
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }
      })
    },

    //Checking Distributor Type
    async checkDistributorType(distId){
      if(distId){
        try{
          const response = await services04Module2.getDistributorType(distId);
          this.distributorTypeData = response;
          if(this.distributorTypeData.CMSRL == false){
            this.cmsrl_load = false;
          }else{
            this.getDistributorCmsrlDetails(distId);
            this.cmsrl_load = true;
          }
        }catch(error){
          console.log(error);
        }
      }
    },

    async getDistributorCmsrlDetails(distId){
      if(distId){
        try{
          const response = await services04Module2.getDistributorCmsrlDatas(distId);
          this.distributorCmsrlData = response;
        }catch(error){
          console.log(error);
        }
      }
    },

    // async getDistributorPointsByNRICNoAndLicenseType(
    //   nric_number,
    //   license_type
    // ) {
    //   try {
    //     const response = await DistributorAPI.getDistributorPointsByNRIC(
    //       nric_number,
    //       license_type
    //     );
    //     this.DISTRIBUTOR_POINTS = response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    //Form Data Validations
    validateSecondTab() {
      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return;
      }else{
        return true;
      }
    },

    validateAgent(CANDIDATE_CATEGORY){
      const { $dirty, $error } = this.$v.model[CANDIDATE_CATEGORY];
      return $dirty ? !$error : null;
    },

    validateLicense(CONSULTANT_TYPE_ID){
      const { $dirty, $error } = this.$v.model[CONSULTANT_TYPE_ID];
      return $dirty ? !$error : null;
    },

    validateDistributor(DISTRIBUTOR_ID) {
      const { $dirty, $error } = this.$v.model[DISTRIBUTOR_ID];
      return $dirty ? !$error : null;
    },

    //get data to save
    getDataToSave() {
      //const agent_position = this.$refs.staff_position.getDataToSave();
      if(this.cmsrl_load){
        if(this.model.CMSRL == 1){
          const cmsrl_datas_true = this.$refs.cmsrl_datas_true.getDataToSave();
          this.$refs.cmsrl_datas_true.uploadCMSRLCertificate();
          let dataToSave = {
            CANDIDATE_CATEGORY: this.model.CANDIDATE_CATEGORY,
            CANDIDATE_POSITION_CATEGORY: this.model.CANDIDATE_POSITION_CATEGORY,
            CANDIDATE_POSITION: this.model.CANDIDATE_POSITION,

            CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
            DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
            DIST_POINT_ID: this.model.DIST_POINT_ID,

            CMSRL: this.model.CMSRL,
            ...cmsrl_datas_true,
          };
          return dataToSave;
        }else{
          const cmsrl_datas_false = this.$refs.cmsrl_datas_false.getDataToSave();
          this.$refs.cmsrl_datas_false.uploadApprenticenshipCertificate();
          let dataToSave = {
            CANDIDATE_CATEGORY: this.model.CANDIDATE_CATEGORY,
            CANDIDATE_POSITION_CATEGORY: this.model.CANDIDATE_POSITION_CATEGORY,
            CANDIDATE_POSITION: this.model.CANDIDATE_POSITION,

            CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
            DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
            DIST_POINT_ID: this.model.DIST_POINT_ID,

            CMSRL: this.model.CMSRL,
            ...cmsrl_datas_false,
          };
          return dataToSave;
        }
      }else{
        let dataToSave = {
          CANDIDATE_CATEGORY: this.model.CANDIDATE_CATEGORY,
          CANDIDATE_POSITION_CATEGORY: this.model.CANDIDATE_POSITION_CATEGORY,
          CANDIDATE_POSITION: this.model.CANDIDATE_POSITION,

          CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
          DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
          DIST_POINT_ID: this.model.DIST_POINT_ID,
        };
        return dataToSave;
      }
    },
  },

  created() {
    this.getConstultantType();

    //for save as draft
    const vm = this;
    // Event.$on("CONSULTANT:SAVE_DATA", function () {
    //   //if event is triggered
    //   alert("save as draft on from type triggered");
    //   vm.getDataToSave();
    //   //sate should be maintained and form should be binded with state
    // });

    // console.log("props observed on license form (2nd component )");
    // console.log(this.savedConsultantLicenseData);

    if(this.savedConsultantLicenseData){
      this.model = _.cloneDeep(this.savedConsultantLicenseData);
      //console.log('Model clone Deep Data Consultant Type', this.model);
    }

    if(this.savedConsultantLicenseData){
      this.checkDistributorPointsAndType(this.savedConsultantLicenseData.DISTRIBUTOR_ID);
    }
  },

  mounted() {
    this.getNRICNo();
  },

  computed: {
    // all for data population
    // setCmsrl() {
    //   if (this.savedConsultantLicenseData.CMSRL == 1) {
    //     this.is_cmsrl == "1";
    //     this.cmsrl =true;
    //   } else {
    //     this.is_cmsrl == "0";
    //     this.cmsrl =true;
    //   }
    // },

    getNircComputed() {
      this.getNRICNo();
    },
  },
  updated() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
    });
  },
};
</script>

<style lang="scss">
.no-shadow {
  /* remove shadows by xomisse */
  -moz-box-shadow: none;
  -goog-ms-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
